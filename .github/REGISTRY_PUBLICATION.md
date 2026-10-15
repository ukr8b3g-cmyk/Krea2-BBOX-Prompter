# Registry publication

Publishing a stable (non-draft, non-prerelease) GitHub Release publishes that
Release tag's exact commit to Comfy Registry. The tag must be `vX.Y.Z` or
`X.Y.Z`, with the same version in `pyproject.toml`. Repository, publisher,
includes and license declarations are checked against `registry-policy.json`.
Review and update that policy explicitly when those declarations change.

The optional Create a stable GitHub Release workflow requires an existing
stable Git tag, validates its source, creates a new Release and directly calls
the Registry publisher. It does not rely on a GITHUB_TOKEN-created Release
triggering another workflow. Normal configuration pushes run offline checks
only; they never create a Release or publish a Registry package.

For an already published stable Release, select the publisher workflow on
main and enter its exact release_tag to resume manually. An existing Registry
version is reported and skipped, including pending or flagged versions.
HTTP/authentication/network errors stop publication. All publication routes
share one concurrency group. The CLI publish command is attempted once only.
If it fails, inspect the Registry first: a version may already be reserved.

The existing REGISTRY_ACCESS_TOKEN repository secret is used only for the
publication step. A missing value fails explicitly. No new credentials or
broader GitHub permissions are required. GitHub contents access is read-only
for the publisher; only the optional Release creation job needs contents:write.

The source must be clean and tracked. Packaging respects the source tag's
.comfyignore and includes, verifies all archived file paths, byte sizes and
SHA256 hashes against those source bytes, and verifies the repacked/public ZIP.
Product code is not imported by these checks. Existing license/material terms
continue to apply; the Registry policy does not grant additional rights.

Offline mock tests and static checks do not prove a real publish. This setup
change does not republish an existing version or change a product version.
