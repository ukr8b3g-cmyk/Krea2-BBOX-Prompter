# Krea2 BBOX Prompter Suite

<img width="1722" height="868" alt="Krea2 BBOX Prompter Suite" src="https://github.com/user-attachments/assets/4da38a62-cc7d-46b9-8b78-cdad7053eac3" />

[日本語はこちら](#日本語)

Krea2 BBOX Prompter Suite is a ComfyUI custom-node suite for manually placing BBOX regions and converting them into a Krea2-oriented JSON prompt.

Draw the layout, write a prompt for each color slot, export the result, and optionally append a style effect or one of the 592 local background presets.

> BBOX regions are layout guidance, not strict masks. Final placement still depends on the model, prompt wording, and scene context.

## At a glance

| Node | Purpose | Main output |
| --- | --- | --- |
| Krea2 BBOX Canvas | Set the image size and draw colored BBOX regions | framing_data |
| Krea2 BBOX Prompter | Write Scene, Background, Object, and Text prompts | prompt_ui_data |
| Krea2 BBOX Export | Combine layout and prompts into Krea2 JSON | prompt_text, width, height |
| Krea2 BBOX Prompt Effect | Append photo, art, lighting, weather, color, finish, or mood text | prompt_out, effect_text |
| Krea2 Background Effect | Append a selected background preset or custom background text | prompt_out, background_text |

## Highlights

- Five color slots: RED, BLUE, YELLOW, GREEN, and MAGENTA.
- Object and Text slot types with framing and camera-angle hints.
- Optional automatic position hints derived from each BBOX.
- 592 Background Effect presets with local WebP thumbnails.
- Optional Photo or Anime Style Boost on the Prompt Effect node.
- Custom Prompt Effect presets saved locally.
- No LLM, OCR, image analysis, or automatic BBOX detection.
- No model download is performed by this extension.

## Quick start

### Install from GitHub

The Suite and Pose Gesture V1 are intentionally installed as two independent custom-node folders. For a new installation:

    cd ComfyUI/custom_nodes
    git clone https://github.com/ukr8b3g-cmyk/Krea2-BBOX-Prompter.git Krea2-BBOX-Prompter-Suite
    git clone https://github.com/ukr8b3g-cmyk/custom_nodes-krea2_bbox_pose_gesture_v1.git krea2_bbox_pose_gesture_v1_node

If `krea2_bbox_pose_gesture_v1_node` already exists, keep it and do not clone it again. Pose Gesture V1 remains a separate extension, so its node ID and existing workflows are unchanged. This setup does not merge the V1 source into the Suite.

For an existing Git clone:

    cd ComfyUI/custom_nodes/Krea2-BBOX-Prompter-Suite
    git pull

Restart ComfyUI. If the old interface remains, hard-refresh the browser with Ctrl + F5.

If you install from a ZIP, extract it once and make sure the Python files are directly inside the extension folder. Avoid a double-nested folder such as:

    custom_nodes/Krea2-BBOX-Prompter-Suite/Krea2-BBOX-Prompter-Suite/

### Five-minute workflow

1. Add Krea2 BBOX Canvas and choose the generation size.
2. Draw one or more BBOX regions.
3. Add Krea2 BBOX Prompter and write Scene, Background, and slot prompts.
4. Connect Canvas.framing_data and Prompter.prompt_ui_data to Krea2 BBOX Export.
5. Send Export.prompt_text to Krea2 BBOX Prompt Effect or CLIP Text Encode.
6. Connect Export.width and Export.height to EmptyLatentImage.
7. Optionally use Krea2 Background Effect when a preset background should be appended.

Recommended Export defaults:

    bbox_mode: normalized_1000
    output_format: compact
    output_mode: json_with_safety_hint
    skip_empty: true
    auto_position_hint: true

The output_format and output_mode widgets remain for old workflow compatibility. Current output is compact JSON.

## Writing prompts

### Scene and Background

Use Scene for the overall image intent and Background for the environment.

    Scene:
    A professional office portrait composition.

    Background:
    A bright modern office with soft daylight, clean desks, and glass walls.

Do not leave both fields empty. BBOX coordinates alone do not provide enough scene context.

### Object slots

Use Object for people, objects, and visible scene elements. Write a short description rather than a single label.

    a young adult woman in a business suit, natural seated pose, upper-body view

Framing and Angle can add phrases such as Upper body, Full body, Front view, or Low angle.

### Text slots

Use Text only when the generated image should contain visible writing. The preferred format is:

    visible text | appearance description

Example:

    SALE | large red text with a white outline

The part before the separator becomes the text field. The part after it becomes the visual description.

### BBOX guidance

Start with one or two boxes. Avoid strong overlap unless the overlap is intentional. The BBOX order is [x1, y1, x2, y2].

BBOX placement is guidance for Krea2, not a pixel-accurate mask. If the result is weak, adjust the box, the prompt wording, and the amount of scene context together.

## Prompt Effect and Background Effect

### Krea2 BBOX Prompt Effect

Use Krea2 BBOX Prompt Effect for general visual direction. Categories include:

    Photo
    Camera FX
    Art
    Light
    Weather
    Background
    Color Theme
    Finish
    Custom

Style Boost is optional and off by default. Photo and Anime are mutually exclusive. The selected boost is appended to the editable effect text.

The older Krea2 Prompt Effect node is retained for compatibility. Use Krea2 BBOX Prompt Effect for new workflows.

### Krea2 Background Effect

Background Effect is a separate, background-focused node. It loads 592 presets from the bundled local data and appends the selected text to prompt_in.

Use it when you want a ready-made environment description without changing the BBOX JSON. The node has no model-specific dependency and does not require a separate download.

### Custom effects

Select Custom, edit the effect text, and save it as a local preset. Built-in presets are read-only; use Copy to Custom before changing one.

Custom presets are stored at:

    user_presets/prompt_effect_custom_presets.json

The file is created when the first custom effect is saved.

## Output connections

    Canvas.framing_data
              |
    Prompter.prompt_ui_data
              v
    Krea2 BBOX Export.prompt_text
              |
              v
    Krea2 BBOX Prompt Effect.prompt_in
              |
              v
    CLIP Text Encode.text

Export.width and Export.height should be connected to the corresponding EmptyLatentImage inputs.

Background Effect can receive a prompt string through prompt_in and returns prompt_out plus background_text.

## Limitations and practical notes

- Krea2 may not follow every BBOX exactly.
- Short labels can be interpreted as visible text; use descriptive Object prompts.
- Conflicting framing or angle hints can weaken the result.
- Text rendering depends on the model and prompt context.
- This suite does not translate Japanese, expand short prompts with an LLM, read images, run OCR, or detect BBOX regions automatically.
- After updating the front-end JavaScript, restart ComfyUI and press Ctrl + F5.
- Optional autocomplete is used only when ComfyUI-Custom-Scripts is already installed; it is not required.

## Technical reference

### Node IDs

    Krea2ElementFramingV1Canvas
    Krea2ElementFramingV1Prompt
    Krea2ElementJSONExportV1
    Krea2BBOXPromptEffect
    Krea2BackgroundEffect

Legacy compatibility ID:

    Krea2PromptEffect

### Main data types

    framing_data: KREA2_ELEMENT_FRAMING_DATA
    prompt_ui_data: KREA2_ELEMENT_PROMPT_DATA
    prompt_text: STRING
    width: INT
    height: INT

### JSON shape

Export produces a compact JSON string with:

    aspect_ratio
    high_level_description
    compositional_deconstruction.background
    compositional_deconstruction.elements

Each element contains type, bbox, and desc. Text elements also contain text.

### Coordinate modes

normalized_1000 converts Canvas coordinates to the 0–1000 range and is the recommended default.

pixel keeps the original Canvas coordinates for debugging or fixed-size workflows.

### Bundled data

    web/background_presets.json
    web/thumbnails/*.webp
    web/thumbnails/manifest.json
    web/krea2_element_framing_v1.js

Thumbnails are loaded locally. The extension does not depend on GitHub raw URLs, CDNs, or startup downloads.

### Validation

    python -c "compile(open('nodes_element_framing.py', encoding='utf-8').read(), 'nodes_element_framing.py', 'exec')"
    node --check web/krea2_element_framing_v1.js

---

## 日本語

Krea2 BBOX Prompter Suiteは、ComfyUI上でBBOXを手動配置し、Krea2向けのJSONプロンプトへ変換するカスタムノード集です。

Canvasで構図を作り、色スロットごとにプロンプトを書き、ExportでJSON化します。必要に応じて、Prompt Effectや592件のBackground Effectを追加できます。

> BBOXは厳密なマスクではなく、Krea2へのレイアウト補助です。最終結果はモデル・プロンプト・シーン全体の解釈に依存します。

## できること

- RED / BLUE / YELLOW / GREEN / MAGENTAの5スロットでBBOXを配置
- Scene / Background / Object / Textの入力
- FramingとAngleによる構図補助
- BBOX位置からの自動位置ヒント
- Krea2向けJSONプロンプトの生成
- 写真、アート、照明、天候、色、仕上げ、ムードのPrompt Effect
- 592件のローカル背景プリセットを使うBackground Effect
- Photo / Anime Style Boost
- カスタム効果プリセットの保存
- LLM、OCR、画像解析、自動BBOX検出なし

## 最短の使い方

1. Krea2 BBOX Canvasで画像サイズを決めます。
2. CanvasにBBOXを描きます。
3. Krea2 BBOX PrompterでScene、Background、各スロットのプロンプトを書きます。
4. CanvasとPrompterをKrea2 BBOX Exportへ接続します。
5. Export.prompt_textをPrompt EffectまたはCLIP Text Encodeへ接続します。
6. Export.width / heightをEmptyLatentImageへ接続します。
7. 必要ならBackground Effectで背景プリセットを追加します。

推奨初期値：

    bbox_mode: normalized_1000
    output_format: compact
    output_mode: json_with_safety_hint
    skip_empty: true
    auto_position_hint: true

### ObjectとText

Objectには短い単語ではなく、画像として描写したい内容を書きます。

    a young adult woman in a business suit, natural seated pose

Textは画像内に実際の文字を表示したい場合だけ使います。

    SALE | large red text with a white outline

区切り記号の前が表示文字、後ろが見た目の説明です。

### Prompt EffectとBackground Effect

Prompt Effectは写真・アート・照明などの方向性を追加します。Style Boostは初期オフで、PhotoとAnimeから一方だけ選択できます。

Background Effectは背景専用の別ノードです。web/background_presets.jsonの592件から選び、prompt_inへ背景文を追加します。BBOX JSON自体は変更しません。

### インストール

SuiteとPose Gesture V1は、衝突を避けるため別々のカスタムノードとして導入します。新規導入時は以下を実行してください。

    cd ComfyUI/custom_nodes
    git clone https://github.com/ukr8b3g-cmyk/Krea2-BBOX-Prompter.git Krea2-BBOX-Prompter-Suite
    git clone https://github.com/ukr8b3g-cmyk/custom_nodes-krea2_bbox_pose_gesture_v1.git krea2_bbox_pose_gesture_v1_node

すでに`krea2_bbox_pose_gesture_v1_node`がある場合は、そのまま使用し、再cloneや削除は行いません。Pose Gesture V1はSuiteへ取り込まず独立した拡張として読み込まれるため、ノードIDと既存ワークフローは変更されません。

既存のGitクローンを更新：

    cd ComfyUI/custom_nodes/Krea2-BBOX-Prompter-Suite
    git pull

ComfyUIを再起動し、古いUIが残る場合はブラウザーでCtrl + F5を押します。ZIPの場合は一度だけ展開し、フォルダが二重にならないようにしてください。

## 制限

- BBOX位置は厳密に固定されません。
- 短い日本語ラベルは画像内の文字として解釈されることがあります。
- FramingやAngleの矛盾は結果を弱めます。
- 日本語翻訳、LLMによるプロンプト拡張、画像解析、OCR、自動BBOX検出は行いません。
- フロントエンド更新後はComfyUI再起動とCtrl + F5が必要です。

## 技術仕様

### ノードID

    Krea2ElementFramingV1Canvas
    Krea2ElementFramingV1Prompt
    Krea2ElementJSONExportV1
    Krea2BBOXPromptEffect
    Krea2BackgroundEffect

旧互換：

    Krea2PromptEffect

### ファイル

    web/background_presets.json
    web/thumbnails/*.webp
    web/thumbnails/manifest.json
    web/krea2_element_framing_v1.js
    user_presets/prompt_effect_custom_presets.json

### 座標

normalized_1000はCanvas座標を0～1000へ正規化します。pixelは元のピクセル座標を保持します。BBOXの順番は[x1, y1, x2, y2]です。

### 依存関係

この拡張自体はモデルをダウンロードしません。ComfyUIとKrea2を使う環境が別途必要です。ComfyUI-Custom-Scriptsのオートコンプリートは任意です。

## License

See the repository license and distribution terms.

## Repository

https://github.com/ukr8b3g-cmyk/Krea2-BBOX-Prompter
