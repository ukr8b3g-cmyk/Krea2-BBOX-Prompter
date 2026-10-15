"""Offline tests: no Registry publish, credentials or product imports."""
import base64
import copy
import hashlib
import io
import json
import os
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch
import urllib.error
import zipfile

import registry_release as release

POLICY = {"node": "example-node", "publisher": "owner", "repository": "https://github.com/owner/repo",
          "includes": ["web"], "license": {"file": "LICENSE"}}
CONFIG = {"project": {"name": "example-node", "version": "1.2.3", "license": {"file": "LICENSE"},
                      "urls": {"Repository": "https://github.com/owner/repo"}},
          "tool": {"comfy": {"PublisherId": "owner", "includes": ["web"]}}}
TOML = '''[project]
name = "example-node"
version = "1.2.3"
license = {file = "LICENSE"}
[project.urls]
Repository = "https://github.com/owner/repo"
[tool.comfy]
PublisherId = "owner"
includes = ["web"]
'''


class Response(io.BytesIO):
    status = 200


class APIAndReleaseTests(unittest.TestCase):
    def test_valid_json(self):
        with patch.object(release.urllib.request, "urlopen", return_value=Response(b'{"id":"ok"}')):
            self.assertEqual(release.get_json("https://api.comfy.org/test"), {"id": "ok"})

    def test_only_json_404_means_absence(self):
        for status in [401, 403, 409, 429, 500, 503]:
            error = urllib.error.HTTPError("url", status, "failed", {}, io.BytesIO(b"{}"))
            with self.subTest(status=status), patch.object(release.urllib.request, "urlopen", side_effect=error):
                with self.assertRaises(ValueError):
                    release.get_json("https://api.comfy.org/test", absent=True)
        error = urllib.error.HTTPError("url", 404, "missing", {}, io.BytesIO(b"{}"))
        with patch.object(release.urllib.request, "urlopen", side_effect=error):
            self.assertIsNone(release.get_json("https://api.comfy.org/test", absent=True))

    def test_html_and_nonempty_404_fail(self):
        for body in [b"<html>denied</html>", b'{"error":"unauthorized"}']:
            error = urllib.error.HTTPError("url", 404, "missing", {}, io.BytesIO(body))
            with self.subTest(body=body), patch.object(release.urllib.request, "urlopen", side_effect=error):
                with self.assertRaises((ValueError, json.JSONDecodeError)):
                    release.get_json("https://api.comfy.org/test", absent=True)

    def test_network_failure_propagates(self):
        with patch.object(release.urllib.request, "urlopen", side_effect=urllib.error.URLError("offline")):
            with self.assertRaises(urllib.error.URLError):
                release.get_json("https://api.comfy.org/test", absent=True)

    def test_github_credential_cannot_be_sent_to_registry(self):
        with patch.object(release.urllib.request, "urlopen") as opened:
            with self.assertRaises(ValueError):
                release.get_json("https://api.comfy.org/test", token="test-token")
            opened.assert_not_called()

    def test_stable_tag_validation(self):
        self.assertEqual(release.stable_version("v1.2.3"), "1.2.3")
        self.assertEqual(release.stable_version("1.2.3"), "1.2.3")
        for tag in ["main", "v1.2.3-rc1", "v1.2.3\nBAD=x", "v1.2.3/other", "--help", "", "v01.2.3", "v1.02.3"]:
            with self.subTest(tag=tag), self.assertRaises(ValueError):
                release.stable_version(tag)

    def test_metadata_matches(self):
        self.assertEqual(release.check_metadata(CONFIG, POLICY, "v1.2.3"), "1.2.3")

    def test_metadata_changes_require_review(self):
        for path, value in [(('project', 'version'), '2.0.0'), (('project', 'name'), 'other'),
                            (('project', 'license'), {'file': 'OTHER'}),
                            (('tool', 'comfy', 'PublisherId'), 'other'),
                            (('tool', 'comfy', 'includes'), ['.'])]:
            changed = copy.deepcopy(CONFIG)
            parent = changed
            for key in path[:-1]:
                parent = parent[key]
            parent[path[-1]] = value
            with self.subTest(path=path), self.assertRaises(ValueError):
                release.check_metadata(changed, POLICY, "v1.2.3")

    def test_annotated_tag_resolves_exact_commit(self):
        responses = [{"tag_name": "v1.2.3", "draft": False, "prerelease": False},
                     {"object": {"type": "tag", "sha": "a" * 40}},
                     {"object": {"type": "commit", "sha": "b" * 40}},
                     {"encoding": "base64", "content": base64.b64encode(TOML.encode()).decode()}]
        with patch.dict(os.environ, {"GITHUB_REPOSITORY": "owner/repo"}), patch.object(release, "get_json", side_effect=responses) as read:
            result = release.resolve_release(POLICY, "v1.2.3")
            self.assertEqual(result["sha"], "b" * 40)
            self.assertIn("ref=" + "b" * 40, read.call_args.args[0])

    def test_draft_and_prerelease_are_rejected(self):
        for draft, prerelease in [(True, False), (False, True)]:
            with patch.dict(os.environ, {"GITHUB_REPOSITORY": "owner/repo"}), patch.object(release, "get_json", return_value={"tag_name": "v1.2.3", "draft": draft, "prerelease": prerelease}):
                with self.assertRaises(ValueError):
                    release.resolve_release(POLICY, "v1.2.3")

    def test_required_source_ci_must_succeed(self):
        policy = {**POLICY, "required_workflows": ["Bridge validation"]}
        prefix = [{"tag_name": "v1.2.3", "draft": False, "prerelease": False},
                  {"object": {"type": "commit", "sha": "b" * 40}},
                  {"encoding": "base64", "content": base64.b64encode(TOML.encode()).decode()}]
        for status, conclusion in [("in_progress", None), ("completed", "failure"), ("completed", "success")]:
            run = {"name": "Bridge validation", "head_sha": "b" * 40,
                   "head_repository": {"full_name": "owner/repo"}, "event": "push",
                   "status": status, "conclusion": conclusion}
            with self.subTest(status=status, conclusion=conclusion), patch.dict(os.environ, {"GITHUB_REPOSITORY": "owner/repo"}), patch.object(release, "get_json", side_effect=prefix + [{"workflow_runs": [run]}]):
                if conclusion == "success":
                    self.assertEqual(release.resolve_release(policy, "v1.2.3")["sha"], "b" * 40)
                else:
                    with self.assertRaisesRegex(ValueError, "Required source CI"):
                        release.resolve_release(policy, "v1.2.3")

    def test_missing_source_ci_is_rejected(self):
        policy = {**POLICY, "required_workflows": ["Bridge validation"]}
        responses = [{"tag_name": "v1.2.3", "draft": False, "prerelease": False},
                     {"object": {"type": "commit", "sha": "b" * 40}},
                     {"encoding": "base64", "content": base64.b64encode(TOML.encode()).decode()},
                     {"workflow_runs": []}]
        with patch.dict(os.environ, {"GITHUB_REPOSITORY": "owner/repo"}), patch.object(release, "get_json", side_effect=responses):
            with self.assertRaisesRegex(ValueError, "Required source CI"):
                release.resolve_release(policy, "v1.2.3")

    def test_wrong_release_tag_is_rejected(self):
        with patch.dict(os.environ, {"GITHUB_REPOSITORY": "owner/repo"}), patch.object(release, "get_json", return_value={"tag_name": "v9.9.9", "draft": False, "prerelease": False}):
            with self.assertRaises(ValueError):
                release.resolve_release(POLICY, "v1.2.3")

    def test_existing_node_accepts_a_new_version(self):
        node = {"id": POLICY["node"], "publisher": {"id": "owner"}, "repository": POLICY["repository"]}
        with patch.object(release, "get_json", side_effect=[node, None]):
            self.assertTrue(release.registry_preflight(POLICY, "1.2.3"))

    def test_new_node_can_publish(self):
        with patch.object(release, "get_json", side_effect=[None, None]):
            self.assertTrue(release.registry_preflight(POLICY, "1.2.3"))

    def test_existing_versions_require_inspection_and_never_republish(self):
        node = {"id": POLICY["node"], "publisher": {"id": "owner"}, "repository": POLICY["repository"]}
        for status in ["NodeVersionStatusPending", "NodeVersionStatusActive", "NodeVersionStatusFlagged", "FutureUnknownStatus"]:
            version = {"node_id": POLICY["node"], "version": "1.2.3", "status": status}
            with self.subTest(status=status), patch.object(release, "get_json", side_effect=[node, version]):
                with self.assertRaisesRegex(ValueError, "no republish"):
                    release.registry_preflight(POLICY, "1.2.3")

    def test_pending_existing_version_writes_warning_and_summary(self):
        node = {"id": POLICY["node"], "publisher": {"id": "owner"}, "repository": POLICY["repository"]}
        version = {"node_id": POLICY["node"], "version": "1.2.3", "status": "NodeVersionStatusPending"}
        with tempfile.TemporaryDirectory() as directory:
            summary = Path(directory) / "summary.md"
            with patch.dict(os.environ, {"GITHUB_STEP_SUMMARY": str(summary)}), patch.object(release, "get_json", side_effect=[node, version]), patch("builtins.print") as printed:
                with self.assertRaises(ValueError):
                    release.registry_preflight(POLICY, "1.2.3")
                self.assertTrue(any("::warning::" in str(call) for call in printed.call_args_list))
            self.assertIn("No publication attempted", summary.read_text(encoding="utf-8"))

    def test_foreign_publisher_is_rejected(self):
        node = {"id": POLICY["node"], "publisher": {"id": "other"}, "repository": POLICY["repository"]}
        with patch.object(release, "get_json", return_value=node):
            with self.assertRaises(ValueError):
                release.registry_preflight(POLICY, "1.2.3")


class PackageTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.root = Path(self.temp.name)
        (self.root / "web").mkdir()
        self.content = {"__init__.py": b"product bytes", "LICENSE": b"license bytes", "web/icon.svg": b"svg bytes", "private.txt": b"excluded"}
        for name, data in self.content.items():
            (self.root / name).write_bytes(data)
        self.rows = sorted([[name, len(data), hashlib.sha256(data).hexdigest()] for name, data in self.content.items() if name != "private.txt"])

    def tearDown(self):
        self.temp.cleanup()

    def archive(self, content):
        stream = io.BytesIO()
        with zipfile.ZipFile(stream, "w") as archive:
            for name, data in content.items():
                archive.writestr(name, data)
        stream.seek(0)
        return stream

    def test_manifest_respects_exclusion_and_preserves_assets(self):
        with patch.object(release, "git", return_value=("\0".join(self.content) + "\0").encode()):
            self.assertEqual(release.expected_manifest(self.root, ["web"], ignored=lambda p: p == "private.txt"), self.rows)

    def test_includes_override_ignore_as_in_pinned_cli(self):
        with patch.object(release, "git", return_value=b"web/icon.svg\0"):
            self.assertEqual(len(release.expected_manifest(self.root, ["web"], ignored=lambda _: True)), 1)

    def test_empty_git_index_is_rejected(self):
        with patch.object(release, "git", return_value=b""):
            with self.assertRaises(ValueError):
                release.expected_manifest(self.root, [], ignored=lambda _: False)

    def test_exact_archive_passes(self):
        release.audit_archive(self.archive({k: v for k, v in self.content.items() if k != "private.txt"}), self.rows)

    def test_extra_missing_and_changed_bytes_fail(self):
        expected = {k: v for k, v in self.content.items() if k != "private.txt"}
        for content in [dict(self.content), {"LICENSE": b"license bytes"}, {**expected, "LICENSE": b"changed"}]:
            with self.subTest(content=list(content)), self.assertRaises(ValueError):
                release.audit_archive(self.archive(content), self.rows)

    def test_unsafe_paths_are_rejected(self):
        for name in ["../escape", "/absolute", "web\\escape", "web/../escape"]:
            with self.subTest(name=name), self.assertRaises(ValueError):
                release.audit_archive(self.archive({name: b"x"}), [])

    def test_flagged_public_record_is_reported_without_retry(self):
        record = {"node_id": POLICY["node"], "version": "1.2.3", "status": "NodeVersionStatusFlagged",
                  "downloadUrl": "https://cdn.comfy.org/owner/example-node/1.2.3/node.zip"}
        payload = self.archive({k: v for k, v in self.content.items() if k != "private.txt"}).getvalue()
        with patch.object(release, "get_json", return_value=record), patch.object(release.urllib.request, "urlopen", return_value=Response(payload)) as opened:
            with self.assertRaisesRegex(ValueError, "needs review"):
                release.verify_public(POLICY, "1.2.3", self.rows)
            self.assertEqual(opened.call_count, 1)

    def test_unexpected_download_host_is_rejected(self):
        record = {"node_id": POLICY["node"], "version": "1.2.3", "status": "NodeVersionStatusActive", "downloadUrl": "https://other.invalid/file"}
        with patch.object(release, "get_json", return_value=record), patch.object(release.urllib.request, "urlopen") as opened:
            with self.assertRaises(ValueError):
                release.verify_public(POLICY, "1.2.3", self.rows)
            opened.assert_not_called()


class WorkflowTests(unittest.TestCase):
    def test_publisher_has_no_push_and_requires_release_tag(self):
        root = Path(__file__).parent
        text = (root / "workflows" / "publish_registry.yml").read_text(encoding="utf-8")
        self.assertNotIn("  push:", text)
        self.assertIn("types: [published]", text)
        self.assertIn("!github.event.release.prerelease", text)
        self.assertIn("!github.event.release.draft", text)
        self.assertIn("  workflow_call:", text)
        self.assertIn("      release_tag:", text)
        self.assertIn("group: comfy-registry-${{ github.repository }}-${{ needs.resolve.outputs.version }}", text)
        self.assertIn("needs: resolve", text)
        self.assertNotIn("\nconcurrency:", text)
        self.assertIn("contents: read", text)
        self.assertNotIn("contents: write", text)
        self.assertNotIn("secrets: inherit", text)

    def test_release_calls_publisher_without_push_trigger(self):
        text = (Path(__file__).parent / "workflows" / "release.yml").read_text(encoding="utf-8")
        self.assertNotIn("  push:", text)
        self.assertIn("needs: release", text)
        self.assertIn("uses: ./.github/workflows/publish_registry.yml", text)
        self.assertIn("--verify-tag", text)
        self.assertIn("release_tag: ${{ needs.release.outputs.release_tag }}", text)

    def test_external_actions_are_sha_pinned(self):
        import re
        for path in (Path(__file__).parent / "workflows").glob("*.yml"):
            # Existing unrelated workflows are not part of this configuration.
            if path.name not in {"publish_registry.yml", "release.yml", "registry_validation.yml"}:
                continue
            for action in re.findall(r"uses:\s+(\S+)", path.read_text(encoding="utf-8")):
                if not action.startswith("./"):
                    self.assertRegex(action, r"^[\w-]+/[\w-]+@[0-9a-f]{40}$")


if __name__ == "__main__":
    unittest.main()
