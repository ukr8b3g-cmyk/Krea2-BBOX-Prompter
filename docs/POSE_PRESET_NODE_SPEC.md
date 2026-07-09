# Pose Preset Node Integration Spec

## Snapshot

Current repository state was preserved before this spec work.

- Snapshot branch: `snapshot/pre-pose-presets-json-20260709`
- Restore command:

```bash
git fetch origin
git checkout main
git reset --hard origin/snapshot/pre-pose-presets-json-20260709
```

Use `git reset --hard` only when you intentionally want to discard later changes.

## Goal

Add pose presets as a first-class preset system for Krea2 BBOX Prompter while keeping the repository cloneable as a single package.

Users should be able to install everything with:

```bash
cd ComfyUI/custom_nodes
git clone https://github.com/ukr8b3g-cmyk/Krea2-BBOX-Prompter.git
```

No separate preset repository, submodule, external CDN, or runtime download should be required.

## Design Summary

Pose presets should be externalized into JSON files, similar to the proposed background preset system.

Python should not maintain a large fixed list of pose names. The browser UI loads pose preset metadata from JSON, then writes only plain prompt text into the existing prompt widgets or pose-specific hidden widget data.

This avoids `Value not in list` errors when presets are added or renamed.

## File Layout

```text
Krea2-BBOX-Prompter/
  nodes_element_framing.py
  web/
    krea2_element_framing_v1.js
    presets/
      background_presets.json
      pose_presets.json
    thumbnails/
      background/
        train_platform.webp
      pose/
        standing_front.webp
        sitting_chair.webp
        hand_peace_sign.webp
```

Recommended image size for runtime thumbnails:

```text
192 x 128 webp
```

Source images may be larger, but committed runtime thumbnails should stay lightweight.

## pose_presets.json Schema

```json
[
  {
    "id": "standing_front",
    "name": "Standing Front",
    "category": "Full Body",
    "thumbnail": "pose/standing_front.webp",
    "target": "body",
    "mode": "append",
    "prompt": "standing front pose, full body, neutral posture"
  }
]
```

### Required Fields

- `id`: stable lowercase identifier. Use snake_case.
- `name`: UI display name.
- `category`: UI grouping.
- `thumbnail`: relative path under `web/thumbnails/`.
- `prompt`: short Krea2-friendly pose text.

### Optional Fields

- `target`: `body`, `upper_body`, `hand`, `two_hands`, `face`, `camera`, `custom`.
- `mode`: `append` or `replace`.
- `tags`: array of search/filter keywords.
- `bbox_hint`: optional short placement hint.
- `negative`: optional text to avoid unwanted pose details.

## Initial Categories

```text
Full Body
Upper Body
Sitting
Lying Down
Back View
Hand Gesture
Two-Hand Gesture
Action
Dance
Camera Facing
```

## UI Behavior

1. JS loads `web/presets/pose_presets.json`.
2. JS renders pose cards grouped by category.
3. User selects a target color slot: red, blue, yellow, green, or magenta.
4. User clicks a pose card.
5. JS inserts the pose prompt into the selected slot prompt.
6. Python receives normal prompt text and exports JSON as before.

Default insert behavior:

```text
existing prompt + ", " + pose prompt
```

If `mode` is `replace`, replace only the pose-related portion when possible. If safe replacement is not implemented, append instead.

## Python Requirements

Keep Python simple.

Do not add every pose name to Python constants.

Python should only handle:

- existing prompt strings
- exported layout JSON
- optional hidden UI state if needed

Recommended optional hidden state:

```python
pose_ui_data = '{"selected_slot":"red","selected_pose":"standing_front"}'
```

This state is for UI restoration only. It should not be required for prompt export.

## JS Requirements

Add a shared preset loader:

```js
async function k2cfLoadPresetJson(path, fallback = []) {
  try {
    const res = await fetch(path, { cache: "no-store" });
    if (!res.ok) return fallback;
    const data = await res.json();
    return Array.isArray(data) ? data : fallback;
  } catch (err) {
    console.warn("[Krea2 BBOX] Failed to load preset JSON:", path, err);
    return fallback;
  }
}
```

Candidate paths:

```text
/extensions/Krea2-BBOX-Prompter/presets/pose_presets.json
/extensions/Krea2-BBOX-Prompter-Suite/presets/pose_presets.json
```

Use the same folder-name fallback logic already used for thumbnails.

## Thumbnail Rules

- Format: WebP.
- Runtime size: 192 x 128.
- No text embedded in images.
- No logo.
- Clear pose silhouette.
- Prefer simple background.
- For hand gestures, show hands clearly.

## Prompt Rules

Pose prompt text must be short. Avoid long style descriptions.

Good:

```text
standing front pose, full body, neutral posture
```

Bad:

```text
an extremely detailed cinematic masterpiece image of a beautiful character standing in front view with dramatic lighting and ultra high resolution
```

Reason: pose presets are additive. Long preset text weakens the user prompt.

## Compatibility

- Existing workflows should continue to load.
- Existing prompt export should remain unchanged unless the user applies a pose preset.
- Missing JSON should not break the node. UI should show a warning and continue.
- Missing thumbnails should show a neutral placeholder.

## Minimum Implementation Steps

1. Create `web/presets/pose_presets.json`.
2. Create `web/thumbnails/pose/`.
3. Add preset JSON loader to JS.
4. Add pose panel/card UI to the prompt node UI.
5. Insert selected pose prompt into the active color slot.
6. Add fallback behavior for missing JSON/images.
7. Test existing workflows.
8. Update README Japanese and English sections.

## Test Checklist

```text
- Fresh clone loads in ComfyUI.
- Existing workflow opens without Value not in list errors.
- Pose preset JSON missing: node still loads.
- Pose thumbnail missing: placeholder appears.
- Clicking pose card appends prompt to selected slot.
- Red/blue/yellow/green/magenta slots all work.
- Save workflow, reload workflow, prompt text remains.
- Browser Ctrl+F5 reflects new JS.
- No remote image/CDN request is required.
```

## Recommended First Presets

```text
Standing Front
Standing Back View
Standing Side View
Sitting on Chair
Sitting on Floor
Lying on Side
Walking Pose
Running Pose
Peace Sign
Thumbs Up
Open Palm
Pointing Forward
Two Hands Heart
Prayer Gesture
Hands on Hips
```

## Non-Goals

- Do not implement strict pose control.
- Do not treat pose presets as masks.
- Do not require ControlNet/OpenPose.
- Do not add remote downloads at runtime.

Pose presets are prompt helpers only. Final pose still depends on Krea2, the full prompt, BBOX layout, and model behavior.
