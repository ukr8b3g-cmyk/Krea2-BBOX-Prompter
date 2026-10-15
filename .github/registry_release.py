"""Release-tag identity and package checks; never imports the custom node."""
from __future__ import annotations

import argparse
import base64
import hashlib
import io
import json
import os
from pathlib import Path, PurePosixPath
import re
import subprocess
import time
import urllib.error
import urllib.parse
import urllib.request
import zipfile

try:
    import tomllib
except ModuleNotFoundError:  # Local validation with Python 3.10; CI uses 3.12.
    from pip._vendor import tomli as tomllib


def require(condition, message):
    if not condition:
        raise ValueError(message)


def get_json(url, token=None, absent=False):
    headers = {"Accept": "application/json", "Cache-Control": "no-cache"}
    if token:
        require(url.startswith("https://api.github.com/"), "Wrong credential destination")
        headers["Authorization"] = "Bearer " + token
    try:
        with urllib.request.urlopen(urllib.request.Request(url, headers=headers), timeout=30) as response:
            require(response.status == 200, "Unexpected API status")
            return json.load(response)
    except urllib.error.HTTPError as error:
        if absent and error.code == 404:
            require(json.load(error) == {}, "Unexpected Registry absence response")
            return None
        raise ValueError("API request failed with HTTP " + str(error.code)) from None


def stable_version(tag):
    require(isinstance(tag, str) and re.fullmatch(r"v?(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)", tag),
            "Use an explicit stable release tag, e.g. v1.2.3")
    return tag.removeprefix("v")


def check_metadata(config, policy, tag):
    project = config["project"]
    comfy = config["tool"]["comfy"]
    version = stable_version(tag)
    require(project["version"] == version, "Tag and pyproject.toml versions differ")
    require(project["name"] == policy["node"], "Registry node identity changed")
    require(comfy["PublisherId"] == policy["publisher"], "Publisher identity changed")
    require(project["urls"]["Repository"].rstrip("/") == policy["repository"], "Repository identity changed")
    require(comfy.get("includes", []) == policy["includes"], "Review changed package includes")
    require(project.get("license") == policy["license"], "Review changed license declaration")
    return version


def resolve_release(policy, tag, require_published=True):
    version = stable_version(tag)
    repo = policy["repository"].removeprefix("https://github.com/")
    require(repo == os.environ["GITHUB_REPOSITORY"], "Workflow repository differs")
    api = "https://api.github.com/repos/" + repo
    token = os.environ.get("GITHUB_TOKEN")
    encoded_tag = urllib.parse.quote(tag, safe="")
    if require_published:
        release = get_json(api + "/releases/tags/" + encoded_tag, token)
        require(release["tag_name"] == tag and not release["draft"] and not release["prerelease"],
                "A published non-draft, non-prerelease Release is required")
    ref = get_json(api + "/git/ref/tags/" + encoded_tag, token)["object"]
    for _ in range(8):
        if ref["type"] == "commit":
            break
        require(ref["type"] == "tag", "Tag does not resolve to a commit")
        ref = get_json(api + "/git/tags/" + ref["sha"], token)["object"]
    require(ref["type"] == "commit" and re.fullmatch(r"[0-9a-f]{40}", ref["sha"]), "Invalid tag commit")
    content = get_json(api + "/contents/pyproject.toml?ref=" + ref["sha"], token)
    require(content["encoding"] == "base64", "Unexpected metadata encoding")
    check_metadata(tomllib.loads(base64.b64decode(content["content"]).decode("utf-8")), policy, tag)
    required_workflows = policy.get("required_workflows", [])
    if required_workflows:
        runs = get_json(api + "/actions/runs?head_sha=" + ref["sha"] + "&per_page=100", token)["workflow_runs"]
        for name in required_workflows:
            matching = [run for run in runs if run["name"] == name and run["head_sha"] == ref["sha"]
                        and run["head_repository"]["full_name"] == repo and run["event"] == "push"]
            require(bool(matching) and matching[0]["status"] == "completed" and matching[0]["conclusion"] == "success",
                    "Required source CI has not succeeded: " + name)
    return {"tag": tag, "version": version, "sha": ref["sha"]}


def registry_preflight(policy, version):
    base = "https://api.comfy.org/nodes/" + policy["node"]
    node = get_json(base, absent=True)
    if node is not None:
        require(node["id"] == policy["node"] and node["publisher"]["id"] == policy["publisher"],
                "Existing Registry node belongs to another publisher")
        require(node["repository"].rstrip("/") == policy["repository"], "Existing Registry repository differs")
    existing = get_json(base + "/versions/" + version, absent=True)
    if existing is not None:
        require(node is not None and existing["node_id"] == policy["node"] and existing["version"] == version,
                "Inconsistent existing Registry version")
        status = existing.get("status", "unknown")
        if not isinstance(status, str) or not re.fullmatch(r"[A-Za-z0-9_]+", status):
            status = "unknown"
        message = "Registry " + version + " already exists (" + status + "). No publication attempted."
        if status == "NodeVersionStatusPending":
            print("::warning::" + message + " Await Registry review.")
        else:
            print("::error::" + message)
        summary = os.environ.get("GITHUB_STEP_SUMMARY")
        if summary:
            with open(summary, "a", encoding="utf-8") as report:
                report.write(message + "\n\nExisting package equality has not been verified. Inspect the existing version; do not republish.\n")
        raise ValueError("Existing Registry version requires inspection; no republish: " + status)
    print("Target version absent; initial or subsequent publication may proceed.")
    return True


def git(root, *args):
    return subprocess.check_output(["git", "-C", str(root), *args])


def clean_source(root, release, policy):
    require(git(root, "rev-parse", "HEAD").decode().strip() == release["sha"], "Wrong source commit")
    require(not git(root, "status", "--porcelain", "--untracked-files=all", "--ignored"), "Source is not pristine")
    config = tomllib.loads((root / "pyproject.toml").read_text(encoding="utf-8"))
    check_metadata(config, policy, release["tag"])
    license_value = config["project"]["license"]
    if isinstance(license_value, dict) and "file" in license_value:
        require((root / license_value["file"]).is_file(), "License file missing")
    return config


def expected_manifest(root, includes, ignored=None):
    # Match comfy-cli 1.22.0's git-tracked/.comfyignore policy independently;
    # force-included directories must also contain only tracked files.
    tracked = [p for p in git(root, "ls-files", "-z").decode().split("\0") if p]
    require(bool(tracked), "Refuse CLI's walk-everything fallback")
    if ignored is None:
        from pathspec import PathSpec  # Installed by the pinned comfy-cli.
        ignore_file = root / ".comfyignore"
        patterns = ignore_file.read_text(encoding="utf-8").splitlines() if ignore_file.exists() else []
        ignored = PathSpec.from_lines("gitwildmatch", patterns).match_file
    for prefix in includes:
        path = PurePosixPath(prefix)
        require(prefix and not path.is_absolute() and ".." not in path.parts and prefix != ".", "Unsafe includes")
        require((root / prefix).exists(), "Included package path missing")
    rows = []
    for name in tracked:
        path = root / name
        require(not path.is_symlink() and path.is_file(), "Missing file, symlink or submodule: " + name)
        forced = any(name == prefix or name.startswith(prefix + "/") for prefix in includes)
        if name == "node.zip" or (ignored(name) and not forced):
            continue
        data = path.read_bytes()
        rows.append([name, len(data), hashlib.sha256(data).hexdigest()])
    return sorted(rows)


def audit_archive(archive_path, expected):
    rows = []
    with zipfile.ZipFile(archive_path) as archive:
        require(archive.testzip() is None, "Archive CRC failure")
        entries = archive.infolist()
        require(len(entries) == len({e.filename for e in entries}), "Duplicate archive entry")
        for entry in entries:
            path = PurePosixPath(entry.filename)
            require(not entry.is_dir() and not path.is_absolute() and ".." not in path.parts
                    and "\\" not in entry.filename and str(path) == entry.filename,
                    "Unsafe archive entry")
            data = archive.read(entry)
            rows.append([entry.filename, len(data), hashlib.sha256(data).hexdigest()])
    require(sorted(rows) == expected, "Archive file set, size or SHA256 differs from release source")
    print("Verified exact " + str(len(rows)) + "-file set, sizes and SHA256 hashes.")


def verify_public(policy, version, expected):
    endpoint = "https://api.comfy.org/nodes/" + policy["node"] + "/versions/" + version
    record = None
    for attempt in range(6):
        record = get_json(endpoint, absent=True)
        if record is not None:
            break
        if attempt != 5:
            time.sleep(2)
    require(record is not None, "Published Registry version not visible; inspect before retrying")
    require(record["node_id"] == policy["node"] and record["version"] == version, "Wrong public Registry identity")
    url = "https://cdn.comfy.org/" + policy["publisher"] + "/" + policy["node"] + "/" + version + "/node.zip"
    require(record["downloadUrl"] == url, "Unexpected public package URL")
    with urllib.request.urlopen(url, timeout=120) as response:
        require(response.status == 200, "Package download failed")
        payload = response.read()
    audit_archive(io.BytesIO(payload), expected)
    print(json.dumps({"version": version, "status": record["status"], "download_url": url,
                      "zip_sha256": hashlib.sha256(payload).hexdigest()}))
    if record["status"] == "NodeVersionStatusPending":
        print("::warning::Upload and package verification completed; Registry review is pending, not active distribution.")
        summary = os.environ.get("GITHUB_STEP_SUMMARY")
        if summary:
            with open(summary, "a", encoding="utf-8") as report:
                report.write("Upload and public ZIP verified. Registry status: Pending. Await review; do not republish.\n")
    require(record["status"] in ("NodeVersionStatusPending", "NodeVersionStatusActive"),
            "Registry version needs review: " + record["status"] + "; do not republish")


def output(values):
    with open(os.environ["GITHUB_OUTPUT"], "a", encoding="utf-8") as stream:
        for key, value in values.items():
            stream.write(key + "=" + str(value) + "\n")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("command", choices=["resolve", "release-source", "source", "manifest", "audit", "preflight", "public"])
    parser.add_argument("--policy", required=True)
    parser.add_argument("--tag", required=True)
    parser.add_argument("--source", default="source")
    parser.add_argument("--manifest", default=os.path.join(os.environ.get("RUNNER_TEMP", "."), "registry-manifest.json"))
    args = parser.parse_args()
    policy = json.loads(Path(args.policy).read_text(encoding="utf-8"))
    if args.command in ("resolve", "release-source"):
        release = resolve_release(policy, args.tag, require_published=args.command == "resolve")
        output(release)
        return
    version = stable_version(args.tag)
    root = Path(args.source).resolve()
    if args.command == "preflight":
        output({"publish": str(registry_preflight(policy, version)).lower()})
    elif args.command == "source":
        clean_source(root, {"sha": os.environ["SOURCE_SHA"], "tag": args.tag}, policy)
    elif args.command == "manifest":
        config = clean_source(root, {"sha": os.environ["SOURCE_SHA"], "tag": args.tag}, policy)
        Path(args.manifest).write_text(json.dumps(expected_manifest(root, config["tool"]["comfy"].get("includes", []))), encoding="utf-8")
    elif args.command == "audit":
        audit_archive(root / "node.zip", json.loads(Path(args.manifest).read_text(encoding="utf-8")))
    elif args.command == "public":
        verify_public(policy, version, json.loads(Path(args.manifest).read_text(encoding="utf-8")))


if __name__ == "__main__":
    main()
