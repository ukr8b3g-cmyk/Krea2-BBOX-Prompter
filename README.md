# Krea2 BBOX Prompter Suite

<img width="1722" height="868" alt="Krea2 BBOX Prompter Suite" src="https://github.com/user-attachments/assets/4da38a62-cc7d-46b9-8b78-cdad7053eac3" />

[日本語はこちら](#日本語)

Krea2 BBOX Prompter Suite is a ComfyUI custom-node suite for manually placing BBOX regions and converting them into a Krea2-oriented JSON prompt.

Draw the layout, write a prompt for each color slot, export the result, and optionally append a style effect or one of the 592 local background presets.

> BBOX regions are layout guidance, not strict masks. Final placement still depends on the model, prompt wording, and scene context.

## Latest update — v1.0.2

- Prefer workflow Effect, prompt UI and node-size state over browser caches, including caches with newer timestamps.
- Reset workflow cache identity after loading and cancel obsolete delayed size restoration, preserving the configured size and later manual resizing.
- Restore the reported legacy 11-value Effect format without shifting prompt text and boolean inputs.
- Keep custom node displays out of the Workflow Overview parameter editor, which can overwrite their canvas width.
- Preserve the cloneable, read-only serialization fixes from v1.0.1 and existing node IDs.

After updating, reload the ComfyUI browser with Ctrl + F5.

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

### Dynamic Canvas size

Krea2 BBOX Canvas provides optional `width` and `height` input sockets for dynamic sizing. Connected values override the corresponding Preset or Custom Size dimension at execution. Each socket is independent, so connecting only one dimension keeps the other dimension from the current Preset or Custom Size.

When the connected source exposes predictable frontend values, including ComfyUI's built-in Resolution Selector, the Custom Size fields and Canvas preview follow those values live without disabling the fields. BBOX positions are remapped proportionally as the aspect ratio changes. The saved local Preset and Custom Size values return when the sockets are disconnected. Other sources that cannot be evaluated in the frontend still apply at execution.

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

### Missing media warnings in older workflows

Prompt Effect and Background Effect thumbnails are local, display-only previews; these nodes process text and have no image input. If the Issues panel names `Load Image - image`, inspect that Load Image node. An unused, disconnected loader can reference a missing file and show a warning even though generation succeeds. Remove the loader if it is no longer needed.

Updating this extension does not remove nodes from existing workflow JSON or rewrite workflows embedded in older images. Save a cleaned workflow separately; editing an image's embedded workflow requires a separate metadata update.

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
    python -B -m unittest discover -s tests -v
    node --test tests/test_frontend_cloneable_state.mjs

---

## 日本語

Krea2 BBOX Prompter Suiteは、ComfyUI上でBBOXを手動配置し、Krea2向けのJSONプロンプトへ変換するカスタムノード集です。

Canvasで構図を作り、色スロットごとにプロンプトを書き、ExportでJSON化します。必要に応じて、Prompt Effectや592件のBackground Effectを追加できます。

> BBOXは厳密なマスクではなく、Krea2へのレイアウト補助です。最終結果はモデル・プロンプト・シーン全体の解釈に依存します。

## 最新の更新 — v1.0.2

- Effect・プロンプトUI・ノードサイズは、ブラウザー保存値の日時が新しくてもWorkflow内の状態を優先します。
- 読み込み後にWorkflowの保存先IDを同期し、古い遅延サイズ復元を無効化します。保存サイズと、その後の手動リサイズを維持します。
- 報告された旧11値形式のEffectを読み替え、プロンプトと有効／無効の値がずれる問題に対応しました。
- Workflow Overviewのパラメータ編集がキャンバス上の表示幅を上書きしないよう、カスタム表示をその編集対象から外しました。
- v1.0.1の複製可能・読み取り専用の保存処理と、既存ノードIDを維持します。

更新後はComfyUIのブラウザーでCtrl + F5を押してください。

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

### Canvasサイズの動的入力

Krea2 BBOX Canvasには、動的サイズ指定用のOptional `width` / `height`入力ソケットがあります。接続した値は実行時に、対応するPresetまたはCustom Sizeの寸法を上書きします。片方だけ接続した場合、未接続側には現在のPresetまたはCustom Sizeの値が使われます。

ComfyUI標準のResolution Selectorなど、Frontendで値を事前計算できる接続元では、入力欄を無効化せずにCustom Sizeの表示値とCanvasプレビューがリアルタイムで追従します。アスペクト比が変わるとBBOXも相対位置を維持して再配置されます。ソケットを切断すると、保存済みのローカルPreset／Custom Sizeへ戻ります。Frontendで値を解決できない接続元は、従来どおり実行時に適用されます。

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

### 古いワークフローのメディア不足警告

Prompt EffectとBackground Effectの見本画像は表示専用のローカル画像です。両ノードは文字列を処理し、画像入力を持ちません。問題一覧が「画像を読み込む（Load Image）- image」を指している場合は、そのLoad Imageノードを確認してください。未接続の不要なノードでも、存在しない画像ファイルを指定していれば、生成は成功する一方で警告が出る場合があります。不要であれば、そのLoad Imageノードを削除します。

この拡張の更新だけでは、既存のワークフローJSONや過去画像に埋め込まれたワークフローは書き換わりません。不要ノードを除いたワークフローを別途保存してください。元画像からも読み込めるようにする場合は、埋め込みメタデータの更新が別途必要です。

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

## Registry metadata and distribution

`pyproject.toml` identifies the Comfy Registry package as `krea2-bbox-prompter`, version `1.0.2`, with PublisherId `ukr8b3g-cmyk`. Stable GitHub Releases trigger the guarded Registry publication workflow. Package upload and Registry moderation are separate; check the version's Registry status before assuming it is Active.

The suite runs inside an existing ComfyUI environment. Its Python node logic uses the standard library; the custom-preset routes use ComfyUI's `PromptServer` and its `aiohttp` dependency. No extra Python packages, `torch` reinstall, or model download is required by this suite. Pose Gesture V1 and ComfyUI-Custom-Scripts are separate extensions and are not bundled.

`.comfyignore` excludes user-created `user_presets/`, caches, tests, development documentation, and duplicate workflow ZIPs from the Registry archive. Runtime Python files, all of `web/` (JavaScript, preset JSON, manifest, and thumbnails), and workflow JSON examples remain included. Back up your local `user_presets/` before replacing or removing an installation folder.

### Registry・配布設定

RegistryのノードIDは`krea2-bbox-prompter`、パッケージ版は`1.0.2`、PublisherIdは`ukr8b3g-cmyk`です。正式なGitHub Releaseの公開後に、重複公開を防ぐ検証付きのRegistry公開処理が動きます。アップロードとRegistry審査は別の状態なので、ActiveかどうかはRegistryの当該バージョンで確認してください。

既存のComfyUI環境で動作し、カスタムプリセット用ルートはComfyUIの`PromptServer`と`aiohttp`を使います。このSuiteのために追加パッケージや`torch`を再インストールする必要はありません。Pose Gesture V1とComfyUI-Custom-Scriptsは別拡張で、同梱しません。

`user_presets/`はユーザー作成データのため配布対象外です。インストールフォルダを置換・削除する前にバックアップしてください。実行に必要なPython、`web/`以下のJS・JSON・画像は配布対象に残します。

## License

Original code and documentation by ukr8b3g-cmyk are available under the [MIT License](LICENSE).

Third-party software, models, assets, and separately installed extensions retain their own licenses and terms; this repository does not relicense them under MIT. In particular, ComfyUI and the optional ComfyUI-Custom-Scripts autocomplete integration are external components. Krea2 model/service terms are separate from this extension's license.

ukr8b3g-cmykによる自作コード・ドキュメントは[MIT License](LICENSE)です。第三者のソフトウェア・モデル・素材・別途導入する拡張には、それぞれのライセンス・利用条件が適用されます。本リポジトリのMIT表記でそれらを再許諾するものではありません。

## Repository

https://github.com/ukr8b3g-cmyk/Krea2-BBOX-Prompter
