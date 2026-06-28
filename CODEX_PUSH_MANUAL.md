# Codex Push Manual

Target repository:

```text
https://github.com/ukr8b3g-cmyk/Krea2-BBOX-Prompter
```

This node is still in test stage. The goal of this push is to make the node installable and testable from GitHub, not to declare a stable release.

---

## What Codex should do

1. Unpack the provided ZIP.
2. Confirm the folder name is:

```text
Krea2-BBOX-Prompter-Suite
```

3. Confirm the following files exist:

```text
__init__.py
nodes_element_framing.py
web/krea2_element_framing_v1.js
web/thumbnails/manifest.json
web/thumbnails/*.webp
README.md
INSTALL.md
THUMBNAIL_SPEC.md
CODEX_PUSH_MANUAL.md
```

4. Run syntax checks.
5. Commit and push to GitHub.

---

## Do not do these

Do not rename Python class IDs unless explicitly instructed.

Do not remove:

```text
Krea2BBOXPromptEffect
Krea2ElementFramingV1Canvas
Krea2ElementFramingV1Prompt
Krea2ElementJSONExportV1
```

Do not replace local thumbnails with external URLs.

Do not add auto-download logic for thumbnails.

Do not commit Python cache files:

```text
__pycache__/
*.pyc
```

---

## Local validation commands

From inside the extracted folder:

```powershell
python -m py_compile nodes_element_framing.py
node --check web/krea2_element_framing_v1.js
```

If `node` is not installed, skip the JS syntax check but mention it in the commit message or PR note.

---

## Git setup and push

If the repository is empty or not cloned yet:

```powershell
git clone https://github.com/ukr8b3g-cmyk/Krea2-BBOX-Prompter.git
cd Krea2-BBOX-Prompter
```

Copy the contents of `Krea2-BBOX-Prompter-Suite/` into the repository root or keep the suite folder as the repo root depending on the repository layout selected by the owner.

Recommended repository root layout:

```text
Krea2-BBOX-Prompter/
├─ __init__.py
├─ nodes_element_framing.py
├─ web/
├─ README.md
├─ INSTALL.md
├─ THUMBNAIL_SPEC.md
└─ CODEX_PUSH_MANUAL.md
```

If the repository is meant to be installed directly as a ComfyUI custom node, the repo root should contain `__init__.py` and `nodes_element_framing.py`.

---

## Suggested .gitignore

Create `.gitignore` if missing:

```gitignore
__pycache__/
*.pyc
.DS_Store
Thumbs.db
*.tmp
*.bak
```

---

## Commit commands

```powershell
git status
git add .
git status
git commit -m "Add Krea2 BBOX Prompter Suite test node"
git push origin main
```

If the default branch is `master`, use:

```powershell
git push origin master
```

---

## Post-push validation

After pushing, clone fresh into a temporary ComfyUI `custom_nodes` test folder:

```powershell
cd <ComfyUI>/custom_nodes
git clone https://github.com/ukr8b3g-cmyk/Krea2-BBOX-Prompter.git
```

Restart ComfyUI and confirm the following nodes appear:

```text
📐 Krea2 BBOX Canvas
📝 Krea2 BBOX Prompter
📦 Krea2 BBOX Export
✨ Krea2 BBOX Prompt Effect
```

Then test this connection:

```text
Canvas.framing_data → Export.framing_data
Prompter.prompt_ui_data → Export.prompt_ui_data
Export.prompt_text → BBOX Prompt Effect.prompt_in
BBOX Prompt Effect.prompt_out → CLIP Text Encode.text
Export.width/height → Empty Latent Image.width/height
```

---

## Notes for future thumbnail replacement

Current thumbnails are provisional WebP files for functional testing.

When replacing them:

1. Keep filenames stable when possible.
2. Keep each file near 5-25 KB.
3. Use 192 x 128 px WebP.
4. Do not include logos, watermarks, UI text, or brand marks.
5. Update `web/thumbnails/manifest.json` if any filename changes.
