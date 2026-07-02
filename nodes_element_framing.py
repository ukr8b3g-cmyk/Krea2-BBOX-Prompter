import json
import hashlib
from math import gcd

MAX_RESOLUTION = 16384
REGIONS = ("red", "blue", "yellow", "green", "magenta")
ELEMENT_TYPES = ("obj", "text")
FRAMING_OPTIONS = (
    "Auto",
    "Cowboy shot",
    "Full body",
    "Upper body",
    "Bust-up",
    "Headshot",
    "Close-up",
    "Lower body",
    "Full object",
    "Detail shot",
    "Macro detail",
)
FRAMING_DESC_MAP = {
    "Auto": "",
    "Cowboy shot": "cowboy shot, framed from head to mid-thigh, full upper body visible, thighs partially visible",
    "Full body": "shown as a full-body view",
    "Upper body": "shown as an upper-body view",
    "Bust-up": "shown as a bust-up portrait",
    "Headshot": "shown as a headshot portrait",
    "Close-up": "shown in a close-up view",
    "Lower body": "focused on the lower body",
    "Full object": "showing the full object",
    "Detail shot": "shown as a detail shot",
    "Macro detail": "shown as a macro detail view",
}
ANGLE_OPTIONS = (
    "Auto",
    "Front view",
    "3/4 right",
    "3/4 left",
    "Eye level",
    "POV",
    "Top POV",
    "Side view",
    "Profile right",
    "Profile left",
    "Slight low",
    "Low angle",
    "Slight high",
    "High angle",
    "Top-down view",
    "Three-quarter view",
    "Dutch angle",
    "Over-the-shoulder",
    "Rear view",
    "Wide angle",
    "Telephoto",
    "Worm view",
    "Bird view",
    "Foreground frame",
)
ANGLE_DESC_MAP = {
    "Auto": "",
    "Front view": "front view, facing the camera, subject clearly visible",
    "3/4 right": "slight three-quarter view from the right, natural angled view, both front and side visible",
    "3/4 left": "slight three-quarter view from the left, natural angled view, both front and side visible",
    "Eye level": "eye-level camera angle, neutral natural viewpoint, camera at subject eye height",
    "POV": "point-of-view angle, immersive perspective, subject seen from viewer perspective",
    "Top POV": "top-down point-of-view angle, viewer looking down from above, immersive overhead perspective, subject seen from the viewer's position",
    "Side view": "side view, profile angle, subject viewed from the side",
    "Profile right": "side profile right, subject facing right, clear right-facing profile",
    "Profile left": "side profile left, subject facing left, clear left-facing profile",
    "Slight low": "slight low angle, camera a little below the subject, subtly looking upward",
    "Low angle": "low angle shot, camera below the subject, looking up at the subject",
    "Slight high": "slight high angle, camera a little above the subject, subtly looking downward",
    "High angle": "high angle shot, viewed from above, camera above the subject, looking down",
    "Top-down view": "top-down view, overhead shot, camera directly above the subject",
    "Three-quarter view": "three-quarter view, subject turned slightly, partial front and side visible",
    "Dutch angle": "dutch angle, tilted camera, diagonal composition",
    "Over-the-shoulder": "over-the-shoulder view, camera behind one subject, foreground shoulder visible",
    "Rear view": "from behind, rear view, back of the subject visible",
    "Wide angle": "wide-angle perspective, spacious view, exaggerated foreground scale, expanded sense of space",
    "Telephoto": "telephoto compression, compressed depth, background appears closer, flattened perspective",
    "Worm view": "worm's-eye view, extreme low angle, camera near the ground looking upward",
    "Bird view": "bird's-eye view, high elevated viewpoint, looking down from above",
    "Foreground frame": "framed through foreground, foreground objects partially framing the subject, added depth and presence",
}
EMPTY_LAYOUT_DATA = '{"boxes":[]}'
EMPTY_CAMERA_DATA = '{"iso":"","shutter":"","aperture":"","focal_length":""}'
EMPTY_SET_DATA = '{"sets":[],"selected":""}'
EMPTY_PROMPT_UI_DATA = ''

PRESET_SIZES = {
    "1024 x 1024": (1024, 1024),
    "1536 x 1536": (1536, 1536),
    "2048 x 2048": (2048, 2048),
    "1024 x 1344": (1024, 1344),
    "1024 x 1536": (1024, 1536),
    "1152 x 1536": (1152, 1536),
    "1536 x 2048": (1536, 2048),
    "1344 x 1024": (1344, 1024),
    "1536 x 1024": (1536, 1024),
    "1536 x 1152": (1536, 1152),
    "2048 x 1536": (2048, 1536),
}

BBOX_MODES = ("normalized_1000", "pixel")
OUTPUT_FORMATS = ("compact", "pretty")
EXPORT_OUTPUT_MODES = ("json_with_safety_hint", "pure_json")


def _text(default="", multiline=True):
    return ("STRING", {"default": default, "multiline": multiline, "dynamicPrompts": False})


def _hidden_text(default=""):
    return ("STRING", {"default": default, "multiline": True, "dynamicPrompts": False})


def _clean(value):
    return str(value or "").strip()


def _safe_json_loads(data, fallback):
    try:
        parsed = json.loads(str(data or ""))
        return parsed if isinstance(parsed, type(fallback)) else fallback
    except Exception:
        return fallback


def _resolve_size(preset, width, height):
    if preset in PRESET_SIZES:
        return PRESET_SIZES[preset]
    return (int(width), int(height))


def _aspect_ratio(width, height):
    try:
        w = max(1, int(width))
        h = max(1, int(height))
        d = gcd(w, h)
        return f"{w // d}:{h // d}"
    except Exception:
        return "1:1"


def _layout_boxes(layout):
    boxes = layout.get("boxes", []) if isinstance(layout, dict) else []
    if not isinstance(boxes, list):
        return []
    cleaned = [b for b in boxes if isinstance(b, dict)]
    return sorted(cleaned, key=lambda b: int(b.get("z", 0) or 0))


def _bbox_px(box, width, height):
    try:
        vals = box.get("bbox")
        if not isinstance(vals, list) or len(vals) < 4:
            vals = [box.get("x1"), box.get("y1"), box.get("x2"), box.get("y2")]
        x1, y1, x2, y2 = [float(v) for v in vals[:4]]
    except Exception:
        return None
    x1, x2 = min(x1, x2), max(x1, x2)
    y1, y2 = min(y1, y2), max(y1, y2)
    x1 = max(0, min(float(width), x1))
    x2 = max(0, min(float(width), x2))
    y1 = max(0, min(float(height), y1))
    y2 = max(0, min(float(height), y2))
    if x1 >= x2 or y1 >= y2:
        return None
    return [round(x1), round(y1), round(x2), round(y2)]


def _bbox_norm_1000(bbox, width, height):
    if not bbox or width <= 0 or height <= 0:
        return None
    x1, y1, x2, y2 = bbox
    return [
        round(x1 / width * 1000),
        round(y1 / height * 1000),
        round(x2 / width * 1000),
        round(y2 / height * 1000),
    ]


def _out_bbox(box, width, height, mode):
    px = _bbox_px(box, width, height)
    if not px:
        return None
    return px if mode == "pixel" else _bbox_norm_1000(px, width, height)


def _position_hint_from_bbox(box, width, height):
    px = _bbox_px(box, width, height)
    if not px or width <= 0 or height <= 0:
        return ""
    x1, y1, x2, y2 = px
    cx = ((x1 + x2) / 2.0) / float(width)
    cy = ((y1 + y2) / 2.0) / float(height)
    bw = max(0.0, (x2 - x1) / float(width))
    bh = max(0.0, (y2 - y1) / float(height))
    area = bw * bh

    xword = "left" if cx < 0.34 else ("right" if cx > 0.66 else "center")
    yword = "upper" if cy < 0.34 else ("lower" if cy > 0.66 else "middle")

    if xword == "center" and yword == "middle":
        pos = "center area"
    elif xword == "center":
        pos = f"{yword}-center area"
    elif yword == "middle":
        pos = f"middle-{xword} area"
    else:
        pos = f"{yword}-{xword} area"

    if area >= 0.55:
        size = "dominant area"
    elif area >= 0.25:
        size = "large area"
    elif area >= 0.10:
        size = "medium-sized area"
    else:
        size = "small area"

    return f"positioned in the {pos}, occupying a {size}"


def _append_position_hint(desc, box, width, height, enable=True):
    desc = _clean(desc)
    if not enable:
        return desc
    hint = _position_hint_from_bbox(box, width, height)
    if not hint:
        return desc
    if desc:
        return f"{desc}, {hint}"
    return hint


def _normalize_framing(value):
    value = _clean(value)
    return value if value in FRAMING_OPTIONS else "Auto"


def _normalize_angle(value):
    value = _clean(value)
    return value if value in ANGLE_OPTIONS else "Auto"


def _append_framing_hint(desc, framing):
    desc = _clean(desc)
    framing = _normalize_framing(framing)
    hint = _clean(FRAMING_DESC_MAP.get(framing, ""))
    if not hint:
        return desc
    if desc:
        return f"{desc}, {hint}"
    return hint


def _append_angle_hint(desc, angle):
    desc = _clean(desc)
    angle = _normalize_angle(angle)
    hint = _clean(ANGLE_DESC_MAP.get(angle, ""))
    if not hint:
        return desc
    if desc:
        return f"{desc}, {hint}"
    return hint


def _json_dumps(obj, output_format):
    if output_format == "pretty":
        return json.dumps(obj, ensure_ascii=False, indent=2)
    return json.dumps(obj, ensure_ascii=False, separators=(",", ":"))


def _prompt_ui_data(scene, background, slot_values):
    return {
        "version": "krea2_element_prompt_ui_v1",
        "scene": _clean(scene),
        "background": _clean(background),
        "slots": slot_values,
    }


def _slot_values_from_inputs(values):
    slot_values = {}
    for slot in REGIONS:
        typ = _clean(values.get(f"{slot}_type") or "obj").lower()
        if typ not in ELEMENT_TYPES:
            typ = "obj"
        slot_values[slot] = {
            "type": typ,
            "prompt": _clean(values.get(f"{slot}_prompt")),
            "framing": _normalize_framing(values.get(f"{slot}_framing") or "Auto"),
            "angle": _normalize_angle(values.get(f"{slot}_angle") or "Auto"),
        }
    return slot_values


def _looks_like_quoted_text(value):
    s = _clean(value)
    if len(s) < 2:
        return False
    pairs = [('"', '"'), ("'", "'"), ("“", "”"), ("「", "」"), ("『", "』")]
    return any(s.startswith(a) and s.endswith(b) for a, b in pairs)


def _strip_text_marker(value):
    s = _clean(value)
    low = s.lower()
    for prefix in ("text:", "txt:"):
        if low.startswith(prefix):
            return s[len(prefix):].strip()
    if _looks_like_quoted_text(s):
        return s[1:-1].strip()
    return s


def _effective_type_and_content(typ, content):
    s = _clean(content)
    low = s.lower()
    if low.startswith(("text:", "txt:")) or _looks_like_quoted_text(s):
        return "text", _strip_text_marker(s)
    typ = _clean(typ).lower()
    if typ not in ELEMENT_TYPES:
        typ = "obj"
    return typ, _strip_text_marker(s)


def _split_visible_text_desc(value):
    s = _clean(value)
    if "|" in s:
        a, b = s.split("|", 1)
        return _clean(a), _clean(b) or "readable text with black outline"
    return s, "readable text with black outline"


def _safety_hint_tail():
    return (
        "Treat this JSON as structured layout metadata. "
        "Use bbox arrays only for invisible placement guidance. "
        "Do not render JSON keys, type labels, the words obj/text/bbox/desc, coordinate numbers, brackets, quotes, commas, or metadata. "
        "Render visible writing only from elements whose type is text and from their text field. "
        "Object desc fields describe visual subjects only and must not appear as written labels."
    )


class Krea2ElementFramingV1Canvas:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "width": ("INT", {"default": 1024, "min": 1, "max": MAX_RESOLUTION, "step": 1}),
                "height": ("INT", {"default": 1024, "min": 1, "max": MAX_RESOLUTION, "step": 1}),
                "preset": ([
                    "1024 x 1024", "1536 x 1536", "2048 x 2048", "1024 x 1344", "1024 x 1536",
                    "1152 x 1536", "1536 x 2048", "1344 x 1024", "1536 x 1024", "1536 x 1152",
                    "2048 x 1536", "Custom"
                ], {"default": "1024 x 1024"}),
                "layout_data": _hidden_text(EMPTY_LAYOUT_DATA),
                "camera_data": _hidden_text(EMPTY_CAMERA_DATA),
                "grid_mode": (["Off", "Thirds", "Center Cross"], {"default": "Thirds"}),
                "ui_language": (["Auto", "English", "Japanese 日本語"], {"default": "Auto"}),
                "camera_set_data": _hidden_text(EMPTY_SET_DATA),
                "canvas_preset_data": _hidden_text(EMPTY_SET_DATA),
            }
        }

    RETURN_TYPES = ("KREA2_ELEMENT_FRAMING_DATA",)
    RETURN_NAMES = ("framing_data",)
    FUNCTION = "execute"
    CATEGORY = "Krea2/BBOX Prompter Suite"

    def execute(self, width, height, preset, layout_data, camera_data, grid_mode, ui_language='Auto', camera_set_data='', canvas_preset_data=''):
        width, height = _resolve_size(preset, width, height)
        layout = _safe_json_loads(layout_data, {"boxes": []})
        camera = _safe_json_loads(camera_data, {})
        data = {
            "version": "krea2_element_framing_v1",
            "width": int(width),
            "height": int(height),
            "preset": preset,
            "layout": layout,
            "camera": camera,
            "grid_mode": grid_mode,
            "ui_language": ui_language,
            "camera_set_data": _safe_json_loads(camera_set_data, {"sets": [], "selected": ""}),
            "canvas_preset_data": _safe_json_loads(canvas_preset_data, {"sets": [], "selected": ""}),
        }
        return (json.dumps(data, ensure_ascii=False, separators=(",", ":")),)

    @classmethod
    def IS_CHANGED(cls, *args, **kwargs):
        payload = json.dumps([args, kwargs], ensure_ascii=False, sort_keys=True)
        return hashlib.sha256(payload.encode("utf-8")).hexdigest()


class Krea2ElementFramingV1Prompt:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "scene": _text(""),
                "background": _text(""),
                "red_prompt": _text(""),
                "blue_prompt": _text(""),
                "yellow_prompt": _text(""),
                "green_prompt": _text(""),
                "magenta_prompt": _text(""),
                "red_type": (["obj", "text"], {"default": "obj"}),
                "blue_type": (["obj", "text"], {"default": "obj"}),
                "yellow_type": (["obj", "text"], {"default": "obj"}),
                "green_type": (["obj", "text"], {"default": "obj"}),
                "magenta_type": (["obj", "text"], {"default": "obj"}),
                "prompt_ui_data": _hidden_text(EMPTY_PROMPT_UI_DATA),
                "red_framing": (FRAMING_OPTIONS, {"default": "Auto"}),
                "blue_framing": (FRAMING_OPTIONS, {"default": "Auto"}),
                "yellow_framing": (FRAMING_OPTIONS, {"default": "Auto"}),
                "green_framing": (FRAMING_OPTIONS, {"default": "Auto"}),
                "magenta_framing": (FRAMING_OPTIONS, {"default": "Auto"}),
                "red_angle": (ANGLE_OPTIONS, {"default": "Auto"}),
                "blue_angle": (ANGLE_OPTIONS, {"default": "Auto"}),
                "yellow_angle": (ANGLE_OPTIONS, {"default": "Auto"}),
                "green_angle": (ANGLE_OPTIONS, {"default": "Auto"}),
                "magenta_angle": (ANGLE_OPTIONS, {"default": "Auto"}),
            }
        }

    RETURN_TYPES = ("KREA2_ELEMENT_PROMPT_DATA",)
    RETURN_NAMES = ("prompt_ui_data",)
    FUNCTION = "execute"
    CATEGORY = "Krea2/BBOX Prompter Suite"

    def execute(self, scene, background, red_prompt, blue_prompt, yellow_prompt, green_prompt, magenta_prompt,
                red_type="obj", blue_type="obj", yellow_type="obj", green_type="obj", magenta_type="obj",
                prompt_ui_data="", red_framing="Auto", blue_framing="Auto", yellow_framing="Auto",
                green_framing="Auto", magenta_framing="Auto", red_angle="Auto", blue_angle="Auto",
                yellow_angle="Auto", green_angle="Auto", magenta_angle="Auto"):
        slot_values = _slot_values_from_inputs(locals())
        data = _prompt_ui_data(scene, background, slot_values)
        return (json.dumps(data, ensure_ascii=False, separators=(",", ":")),)

    @classmethod
    def IS_CHANGED(cls, *args, **kwargs):
        payload = json.dumps([args, kwargs], ensure_ascii=False, sort_keys=True)
        return hashlib.sha256(payload.encode("utf-8")).hexdigest()


class Krea2ElementJSONExportV1:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "framing_data": ("KREA2_ELEMENT_FRAMING_DATA",),
                "prompt_ui_data": ("KREA2_ELEMENT_PROMPT_DATA",),
                "bbox_mode": (BBOX_MODES, {"default": "normalized_1000"}),
                # Compatibility widgets: older workflows saved these values.
                # Keep them in the widget list so ComfyUI does not raise "Value not in list".
                # Export still emits compact JSON only; these are accepted and ignored.
                "output_format": (("compact", "pretty"), {"default": "compact"}),
                "output_mode": (("json_with_safety_hint", "pure_json"), {"default": "json_with_safety_hint"}),
                "skip_empty": ("BOOLEAN", {"default": True}),
                "auto_position_hint": ("BOOLEAN", {"default": True}),
            }
        }

    RETURN_TYPES = ("STRING", "INT", "INT")
    RETURN_NAMES = ("prompt_text", "width", "height")
    FUNCTION = "execute"
    CATEGORY = "Krea2/BBOX Prompter Suite"

    def execute(self, framing_data, prompt_ui_data, bbox_mode="normalized_1000", output_format="compact", output_mode="json_with_safety_hint", skip_empty=True, auto_position_hint=True):
        fdat = _safe_json_loads(framing_data, {})
        pdat = _safe_json_loads(prompt_ui_data, {})
        width = int(fdat.get("width") or 1024)
        height = int(fdat.get("height") or 1024)
        layout = fdat.get("layout") if isinstance(fdat.get("layout"), dict) else {"boxes": []}
        boxes = _layout_boxes(layout)
        slots = pdat.get("slots") if isinstance(pdat.get("slots"), dict) else {}
        elements = []
        for box in boxes:
            slot = _clean(box.get("slot")).lower()
            if slot not in REGIONS:
                continue
            meta = slots.get(slot) if isinstance(slots.get(slot), dict) else {}
            typ = _clean(meta.get("type") or "obj").lower()
            content = _clean(meta.get("prompt"))
            framing = _normalize_framing(meta.get("framing") or "Auto")
            angle = _normalize_angle(meta.get("angle") or "Auto")
            typ, content = _effective_type_and_content(typ, content)
            bbox = _out_bbox(box, width, height, bbox_mode)
            if not bbox:
                continue
            if skip_empty and not content:
                continue
            if typ == "text":
                visible_text, text_desc = _split_visible_text_desc(content)
                if skip_empty and not visible_text:
                    continue
                elements.append({
                    "type": "text",
                    "bbox": bbox,
                    "text": visible_text,
                    "desc": _append_position_hint(text_desc, box, width, height, auto_position_hint),
                })
            else:
                object_desc = _append_framing_hint(content, framing)
                object_desc = _append_angle_hint(object_desc, angle)
                elements.append({
                    "type": "obj",
                    "bbox": bbox,
                    "desc": _append_position_hint(object_desc, box, width, height, auto_position_hint),
                })
        out = {
            "aspect_ratio": _aspect_ratio(width, height),
            "high_level_description": _clean(pdat.get("scene")),
            "compositional_deconstruction": {
                "background": _clean(pdat.get("background")),
                "elements": elements,
            },
        }
        return (_json_dumps(out, "compact"), width, height)

    @classmethod
    def IS_CHANGED(cls, *args, **kwargs):
        payload = json.dumps([args, kwargs], ensure_ascii=False, sort_keys=True)
        return hashlib.sha256(payload.encode("utf-8")).hexdigest()


EFFECT_CATEGORIES = ('All', 'Photo', 'Camera FX', 'SNS', 'Art', 'Light', 'Mood', 'Color Theme', 'Finish', 'Custom', 'Custom Preset', 'Photo Look', 'Base Style', 'Portrait', 'Cinematic', 'Illustration', 'Lighting', 'Commercial')
EFFECT_PRESETS = (
    'None',
    'Custom Preset',
    'Realistic Photo',
    '35mm Film',
    'Cinematic Photo',
    'Soft Portrait',
    'Milky Portrait',
    'Glow Portrait',
    'B&W Soft',
    'B&W Strong',
    'Film Noir',
    'Noir Photo',
    'Flash Photo',
    'Direct Flash',
    'Disposable Flash',
    'Paparazzi Flash',
    'Dark Flash',
    'Red Eye Flash',
    'Polaroid',
    'Vintage Photo',
    'Long Exposure',
    'Directional Blur',
    'Toy Camera',
    'Lomography',
    'Night Vision',
    'Security Camera',
    'Thermal Camera',
    'Film Negative',
    'VHS',
    'Glitch Effect',
    'Insta Feed',
    'TikTok',
    'YT Thumb',
    'YT Vlog',
    'FB Post',
    'Hex Tile',
    'Kaleidoscope',
    'HDR Photo',
    'iPhone Photo',
    'Tilt-Shift',
    'Lens Distortion',
    'Fisheye Lens',
    'Chromatic Aberration',
    'Silhouette Photo',
    'Glamour Photo',
    'Landscape Photo',
    'Street Photo',
    'Beauty Photo',
    'Editorial Portrait',
    'Candid Portrait',
    'Movie Still',
    'Neon Noir',
    'Action Still',
    'Natural Light',
    'Studio Light',
    'Golden Hour',
    'Sunlight',
    'Side Light',
    'Backlight',
    'Top Light',
    'Low Sun',
    'Overhead Sun',
    'Long Shadow',
    'Overcast',
    'Dappled Light',
    'Window Shadow',
    'Light Rays',
    'Low Key',
    'High Key',
    'Neon Night',
    'Cyberpunk',
    'Product Photo',
    'Food Photo',
    'Fashion Editorial',
    'Architecture',
    'Interior Design',
    'Anime Clean',
    'Anime Soft',
    'Manga B&W',
    'Illustration',
    'Painterly',
    'Watercolor',
    'Oil Painting',
    'Comic',
    'Pixelate',
    'Concept Art',
    'Dreamy',
    'Dark Fantasy',
    'High Detail',
    'Minimal Clean',
    'Paper Print',
    'Matte Print',
    'Glossy Print',
    'Canvas Texture',
    'Fabric Print',
    'Metal Print',
    'Glass Print',
    'Glass Distortion',
    'Wet Surface',
    'Water Droplets',
    'Dusty Surface',
    'Fractal Noise',
    'Scratched Print',
    'Vintage Paper',
    'Stone Surface',
    'Marble Finish',
    'Concrete Finish',
    'Rusty Metal',
    'Aged Metal',
    'Patina Finish',
    'Wood Grain',
    'Leather Finish',
    'Ceramic Glaze',
    'Plastic Finish',
    'Slime Finish',
    'Gel Finish',
    'Liquid Gloss',
    'Gummy Finish',
    'Wax Finish',
    'Fantasy Color',
    'Red Theme',
    'Blue Theme',
    'Pink Theme',
    'Purple Theme',
    'Green Theme',
    'Yellow Theme',
    'Orange Theme',
    'Cyan Theme',
    'Teal Theme',
    'Magenta Theme',
    'Warm Theme',
    'Cool Theme',
    'Pastel Theme',
    'Neon Theme',
    'Muted Theme',
    'Monochrome Theme',
    'Sepia Theme',
    'Gold Theme',
    'Silver Theme',
    'Dark Theme',
    'Bright Theme',
    'Soft Theme',
    'Vivid Theme',
    'Earth Theme',
    'Cream Theme',
    'Lavender Theme',
    'Mint Theme',
    'Peach Theme',
    'Rose Theme',
    'Aqua Theme',
    'Pastel Pink',
    'Pastel Blue',
    'Pastel Purple',
    'Pastel Green',
    'Pastel Yellow',
    'Pastel Orange',
    'Pastel Mint',
    'Pastel Lavender',
    'Pastel Peach',
    'Pastel Rose',
    'Pastel Aqua',
    'Pastel Cream',
    'Black & White',
    'Red & Blue',
    'Pink & Blue',
    'Purple & Cyan',
    'Orange & Teal',
    'Yellow & Purple',
    'Green & Magenta',
    'Black & Red',
    'Black & Gold',
    'White & Blue',
    'Pastel Pink & Blue',
    'Pastel Mint & Lavender',
    'Pastel Peach & Cream',
    'Pastel Yellow & Green',
    'Pastel Aqua & Pink',
    'Crazy Color',
    'Candy Color',
    'Pop Color',
    'Dreamy Color',
    'Acid Color',
    'Cyber Color',
    'Rainbow Color',
    'Holographic Color',
    'Vaporwave Color',
    'Stardust Fantasy',
    'Shooting Star Fantasy',
    'Galaxy Atmosphere',
    'Aurora Mood',
    'Dreamland Color',
    'Heart Magic Color',
    'Harajuku Decora Mood',
    'Pastel Kawaii Mood',
    'Pop Kawaii Color',
    'Japanese Mood',
    'Sakura Japan Color',
    'Samurai Drama Color',
    'Western Desert Color',
    'Indian Festival Color',
    'Arabian Night Color',
    'Egyptian Gold Color',
    'Chinese Lantern Color',
    'Korean Pastel Color',
    'Nordic Winter Color',
    'Tropical Island Color',
    'Virtual Diva Teal',
    'Heterochromia Eyes',
    'Retro Pop',
    'Black White',
    'Realistic',
    'Cinematic',
)
EFFECT_PRESET_TEXT = {
    'None': '',
    'Custom Preset': '',
    'Realistic Photo': 'photorealistic image, natural lighting, realistic skin texture, lifelike details, accurate materials, clean high-resolution photo quality',
    '35mm Film': 'analog 35mm film photo, visible film grain, subtle halation, natural color, soft contrast, realistic skin texture',
    'Cinematic Photo': 'cinematic film still, dramatic lighting, controlled contrast, strong depth, realistic atmosphere, detailed composition, filmic photo look',
    'Soft Portrait': 'soft portrait photography, flattering natural light, natural skin texture, shallow depth of field, gentle contrast, clean facial details',
    'Milky Portrait': 'white milky tone, pale milky cream palette with soft portrait photography, natural soft skin texture, shallow depth of field, gentle contrast, smooth tonal gradation, clean facial details, delicate calm mood',
    'Glow Portrait': 'dreamy photographic atmosphere, soft milky cream palette, soft portrait photography, natural soft skin texture, shallow depth of field, gentle contrast, smooth tonal gradation, clean facial details, luminous soft glow, soft radiant highlights, airy subtle haze, gentle bloom effect, calm realistic emotional mood',
    'B&W Soft': 'soft black and white photography, monochrome grayscale tones, no color, gentle contrast, soft film grain, natural skin texture',
    'B&W Strong': 'strong black and white photography, monochrome grayscale tones, no color, high contrast, deep blacks, bright whites, dramatic film grain',
    'Film Noir': 'film noir photography, black and white tones, dramatic shadows, low-key lighting, high contrast, mysterious cinematic atmosphere',
    'Noir Photo': 'modern noir photography, monochrome contrast, deep shadows, sharp highlights, moody urban cinematic lighting',
    'Flash Photo': 'flash photo, light to medium on-camera flash, clear illuminated subject, crisp catchlight, natural surroundings, balanced shadows, casual photographic snapshot realism',
    'Direct Flash': 'direct flash photo, frontal camera flash, clear subject illumination, crisp highlights, visible catchlight, balanced contrast, sharp casual photographic look',
    'Disposable Flash': 'disposable camera flash photo, casual point-and-shoot look, medium frontal flash, slight film grain, natural snapshot framing, imperfect but realistic camera texture',
    'Paparazzi Flash': 'paparazzi flash photography, strong camera flash burst, candid subject illumination, crisp highlights, energetic snapshot feeling, press-photo style realism',
    'Dark Flash': 'dark flash photo, on-camera flash in a low-light environment, illuminated foreground subject, deeper surrounding shadows, grainy high ISO texture, dramatic snapshot realism',
    'Red Eye Flash': 'red-eye flash photo effect, on-camera flash causing visible red pupils, direct frontal flash, snapshot realism, strong catchlight, photographic camera artifact',
    'Polaroid': 'instant polaroid photo look, soft focus, muted colors, slight overexposure, nostalgic film texture, casual snapshot framing',
    'Vintage Photo': 'vintage photograph look, faded tones, subtle film grain, soft contrast, nostalgic atmosphere, natural imperfections',
    'Long Exposure': 'long exposure photography, motion blur trails, smooth light streaks, stable subject focus, atmospheric night photo look',
    'Directional Blur': 'directional blur effect, one-way motion streaks, fast moving photographic smear, dynamic speed lines, realistic camera motion atmosphere',
    'Toy Camera': 'toy camera photo, plastic lens softness, strong vignette, imperfect focus, saturated colors, playful lo-fi snapshot look',
    'Lomography': 'lomography photo, vivid saturated colors, heavy vignette, cross-processed film tones, high contrast, spontaneous analog snapshot style',
    'Night Vision': 'night vision camera footage, green monochrome image, infrared glow, high noise, low-light surveillance look, harsh electronic contrast',
    'Security Camera': 'security camera footage, fixed wide-angle view, low-resolution video look, surveillance camera feel, flat lighting, documentary realism',
    'Thermal Camera': 'thermal camera image, false-color heatmap palette, glowing warm subjects, cooler surrounding tones, infrared temperature-vision look',
    'Film Negative': 'film negative look, inverted colors, cyan and orange reversed tones, high contrast negative film scan, surreal photographic inversion',
    'VHS': 'VHS camcorder footage, analog video noise, scan lines, color bleed, soft low-resolution image, dated home-video recording look',
    'Glitch Effect': 'glitch effect, digital noise artifacts, horizontal and vertical pixel distortion, RGB channel shift, broken video signal, corrupted scan lines, photographic digital error atmosphere',
    'Insta Feed': 'photorealistic instagram-style lifestyle photo, clean composition, bright natural light, polished color grading, slightly vibrant colors, casual modern mood, social media feed aesthetic',
    'TikTok': 'photorealistic tiktok-style short video frame, energetic composition, bold colors, high contrast, trendy social media look, dynamic pose, lively casual atmosphere',
    'YT Thumb': 'photorealistic youtube thumbnail style, clear main subject, bold lighting, strong contrast, vivid colors, attention-grabbing composition, clean readable visual focus',
    'YT Vlog': 'photorealistic youtube vlog frame, casual handheld camera feel, natural indoor or outdoor light, authentic everyday moment, wide-angle smartphone look, relaxed lifestyle mood',
    'FB Post': 'photorealistic facebook-style social post photo, natural everyday scene, balanced lighting, friendly casual mood, realistic colors, simple clean composition',
    'HDR Photo': 'HDR photography, wide dynamic range, crisp detail, balanced highlights and shadows, realistic textures, clear photo quality',
    'iPhone Photo': 'iPhone-style photo, natural phone camera look, realistic exposure, casual framing, sharp details, authentic everyday snapshot',
    'Tilt-Shift': 'tilt-shift photography, selective focus, miniature-like depth, soft blurred edges, crisp central subject, stylized photo realism',
    'Lens Distortion': 'lens distortion effect, subtle barrel distortion, warped edges, imperfect optical lens look, photographic camera artifact, real-world wide lens feel',
    'Fisheye Lens': 'fisheye lens effect, strong barrel distortion, curved wide-angle perspective, bulging center, warped edges, photographic ultra-wide lens look, real-world camera artifact',
    'Chromatic Aberration': 'chromatic aberration effect, subtle red cyan edge fringing, RGB color separation, optical lens artifact, photographic digital color shift',
    'Silhouette Photo': 'silhouette photography, dark realistic subject outline, bright backlight, strong contrast, minimal visible detail, dramatic photographic composition',
    'Glamour Photo': 'glamour photography, polished lighting, smooth highlights, refined skin texture, stylish pose, clean magazine-quality finish',
    'Landscape Photo': 'landscape photography, natural atmosphere, deep depth of field, realistic lighting, detailed environment, balanced composition',
    'Street Photo': 'street photography, candid realism, natural light, authentic urban atmosphere, documentary-style composition, realistic detail',
    'Beauty Photo': 'beauty photography, clean skin detail, flattering light, refined makeup, soft highlights, premium portrait finish',
    'Editorial Portrait': 'editorial portrait photography, refined styling, confident pose, polished lighting, magazine composition, clean detailed skin texture',
    'Candid Portrait': 'candid portrait photography, natural expression, realistic lighting, authentic moment, soft background, clean subject detail',
    'Movie Still': 'movie still photography, cinematic framing, realistic production lighting, controlled contrast, atmospheric depth, detailed film scene',
    'Neon Noir': 'neon noir photography, dark realistic urban atmosphere, colored neon highlights, moody shadows, cinematic contrast, rain-slick real-world reflections',
    'Action Still': 'cinematic action still, dynamic composition, realistic motion energy, controlled lighting, sharp subject focus, high-energy film atmosphere',
    'Natural Light': 'natural daylight photography, soft realistic shadows, balanced exposure, authentic atmosphere, gentle color rendering',
    'Studio Light': 'professional studio lighting, clean softbox illumination, controlled shadows, sharp details, polished photographic look',
    'Golden Hour': 'golden hour lighting, warm sunlight, soft long shadows, glowing highlights, cinematic natural atmosphere',
    'Sunlight': 'sunlight, bright natural daylight, realistic light behavior, natural shadows, clear highlights, balanced outdoor illumination',
    'Side Light': 'side light, directional natural light from one side, realistic shadow falloff, sculpted form, balanced highlights',
    'Backlight': 'backlight, light behind the subject, glowing rim edge, natural silhouette tendency, realistic atmospheric separation',
    'Top Light': 'top light, light from above, natural overhead illumination, downward shadows, realistic highlight placement',
    'Low Sun': 'low sun angle, warm directional sunlight, long soft-edged shadows, realistic late-day light behavior, natural atmosphere',
    'Overhead Sun': 'overhead sun, high midday sunlight, short crisp shadows, bright clear daylight, realistic outdoor light behavior',
    'Long Shadow': 'long shadows, low-angle sunlight, extended shadow shapes across the ground, warm directional light, realistic scene depth',
    'Overcast': 'overcast light, soft diffused sky illumination, low contrast natural shadows, even realistic daylight, calm muted atmosphere',
    'Dappled Light': 'dappled sunlight, scattered patches of light and shade, tree-filtered natural light, realistic outdoor shadow pattern',
    'Window Shadow': 'window light and shadow, sunlight entering through a window, rectangular shadow pattern, realistic indoor light behavior',
    'Light Rays': 'light rays effect, visible beams of light, soft volumetric glow, sunlight shafts through atmosphere, cinematic photographic lighting mood',
    'Low Key': 'low-key photography, dark background, controlled highlights, deep shadows, dramatic contrast, focused subject lighting',
    'High Key': 'high-key photography, bright clean lighting, soft shadows, airy white background, gentle contrast, polished look',
    'Neon Night': 'neon night lighting, colorful urban glow, reflective highlights, cinematic contrast, atmospheric background glow',
    'Cyberpunk': 'cyberpunk night photography mood, neon lights, futuristic city atmosphere, realistic urban texture, high contrast, saturated reflections, cinematic moody lighting',
    'Product Photo': 'professional product photography, clean background, sharp details, controlled reflections, accurate materials, commercial lighting',
    'Food Photo': 'professional food photography, appetizing lighting, natural texture, shallow depth of field, clean composition, rich detail',
    'Fashion Editorial': 'fashion editorial photography, stylish pose, refined wardrobe, studio-quality lighting, polished magazine look',
    'Architecture': 'architectural photography, clean lines, accurate perspective, balanced lighting, sharp structural details, realistic materials',
    'Interior Design': 'interior design photography, balanced room lighting, clean composition, realistic materials, inviting atmosphere, polished details',
    'Anime Clean': 'clean anime illustration, crisp line art, polished character design, smooth cel shading, vibrant but controlled colors',
    'Anime Soft': 'soft anime illustration, gentle lighting, delicate line art, pastel color palette, smooth shading, calm atmosphere',
    'Manga B&W': 'black and white manga style, monochrome screentone shading, clean ink lines, high readability, comic panel look',
    'Illustration': 'high-quality digital illustration, polished details, clean composition, controlled lighting, appealing color harmony',
    'Painterly': 'painterly digital art, visible brush texture, soft edges, rich lighting, expressive color transitions',
    'Watercolor': 'watercolor illustration, soft paper texture, translucent washes, gentle colors, delicate hand-painted look',
    'Oil Painting': 'oil painting style, rich brush strokes, textured paint surface, dramatic lighting, classical painted atmosphere',
    'Comic': 'western comic book style, bold outlines, dynamic shading, vivid colors, high-contrast graphic look',
    'Pixelate': 'pixelated mosaic effect, chunky visible pixel blocks, low-resolution digital look, simplified colors, crisp square pixels, stylized retro image texture',
    'Concept Art': 'concept art style, detailed environment design, cinematic lighting, strong composition, polished production artwork',
    'Dreamy': 'dreamy photographic atmosphere, soft glow, gentle contrast, subtle haze, delicate highlights, calm realistic emotional mood',
    'Dark Fantasy': 'dark fantasy atmosphere, cinematic realistic shadows, mysterious lighting, ornate real-world texture, moody photographic composition',
    'High Detail': 'highly detailed realistic image, crisp textures, sharp subject definition, refined materials, clean photographic lighting, intricate visual detail',
    'Minimal Clean': 'minimal clean photographic style, simple composition, uncluttered background, balanced spacing, refined modern real-world presentation',
    'Paper Print': 'printed on paper, realistic paper grain, matte texture, soft ink absorption, tactile photographic print finish',
    'Matte Print': 'matte print finish, realistic non-reflective surface, soft contrast, smooth paper texture, photographic material feel',
    'Glossy Print': 'glossy print finish, realistic reflective coating, crisp contrast, polished photo paper surface',
    'Canvas Texture': 'canvas texture, realistic woven fabric surface, subtle textile grain, tactile material finish',
    'Fabric Print': 'printed on fabric, realistic soft cloth texture, woven fibers, gentle ink diffusion, textile surface finish',
    'Metal Print': 'printed on metal, realistic glossy metallic surface, reflective highlights, sleek hard material finish',
    'Glass Print': 'behind glass, realistic glossy glass surface, subtle reflections, polished transparent finish',
    'Glass Distortion': 'glass distortion effect, warped refraction, subtle transparent ripples, reflective glass surface, photographic material detail, real-world distorted texture',
    'Hex Tile': 'hex tile pattern, repeating honeycomb geometry, subtle tiled surface texture, photographic material detail, clean real-world patterned background',
    'Kaleidoscope': 'kaleidoscope pattern effect, mirrored repeating geometric shapes, colorful symmetrical background mood, photographic color texture, abstract real-world surface feel',
    'Wet Surface': 'wet surface effect, realistic water droplets, glossy highlights, damp reflective texture, fresh moisture finish',
    'Water Droplets': 'water droplets on surface, realistic clear beads of moisture, glossy highlights, fresh wet photographic finish',
    'Dusty Surface': 'dusty surface effect, realistic fine dust particles, muted texture, aged dry finish, subtle grime',
    'Fractal Noise': 'fractal noise texture, cloudy procedural grain, smoky abstract background detail, organic noise pattern, photographic atmospheric surface texture',
    'Scratched Print': 'scratched print surface, realistic fine scratches, worn texture, distressed physical finish',
    'Vintage Paper': 'vintage paper texture, realistic aged paper grain, faded ink, warm yellowed surface, old printed finish',
    'Stone Surface': 'stone surface texture, realistic rough mineral grain, cool hard material finish, natural stone detail',
    'Marble Finish': 'marble surface finish, realistic subtle veining, polished stone texture, elegant mineral material',
    'Concrete Finish': 'concrete surface texture, realistic rough gray material, fine grain, industrial matte finish',
    'Rusty Metal': 'rusty metal surface, realistic oxidized texture, reddish brown corrosion, worn industrial finish',
    'Aged Metal': 'aged metal finish, realistic tarnished surface, subtle scratches, oxidized patina, weathered material',
    'Patina Finish': 'patina surface finish, realistic green-blue oxidized metal, aged copper look, weathered decorative texture',
    'Wood Grain': 'wood grain texture, realistic natural wooden surface, warm organic material finish, visible grain lines',
    'Leather Finish': 'leather surface texture, realistic subtle grain, soft worn material, tactile premium finish',
    'Ceramic Glaze': 'ceramic glazed surface, realistic smooth glossy coating, subtle reflections, crafted material finish',
    'Plastic Finish': 'plastic surface finish, realistic smooth synthetic texture, clean highlights, modern manufactured material',
    'Slime Finish': 'slime surface finish, realistic glossy translucent gel texture, sticky wet highlights, soft gooey material look',
    'Gel Finish': 'gel surface finish, realistic translucent glossy material, smooth jelly-like highlights, soft elastic texture',
    'Liquid Gloss': 'liquid glossy finish, realistic wet reflective coating, smooth flowing highlights, polished fluid surface',
    'Gummy Finish': 'gummy material finish, realistic soft translucent candy texture, rounded glossy surface, playful elastic look',
    'Wax Finish': 'wax surface finish, realistic soft semi-gloss texture, smooth melted material, subtle warm highlights',
    'Red Theme': 'red color theme, cohesive red palette, warm red color grading, strong visual unity',
    'Blue Theme': 'blue color theme, cohesive blue palette, cool calm color grading, unified blue atmosphere',
    'Pink Theme': 'pink color theme, cohesive pink palette, soft rosy color grading, harmonious pink atmosphere',
    'Purple Theme': 'purple color theme, cohesive violet palette, rich purple color grading, elegant moody atmosphere',
    'Green Theme': 'green color theme, cohesive green palette, fresh natural color grading, balanced green atmosphere',
    'Yellow Theme': 'yellow color theme, cohesive yellow palette, bright sunny color grading, warm cheerful atmosphere',
    'Orange Theme': 'orange color theme, cohesive orange palette, warm energetic color grading, vivid orange atmosphere',
    'Cyan Theme': 'cyan color theme, cohesive cyan palette, clear cool color grading, bright aquatic atmosphere',
    'Teal Theme': 'teal color theme, cohesive teal palette, cinematic blue-green color grading, polished atmosphere',
    'Magenta Theme': 'magenta color theme, cohesive magenta palette, bold pink-purple color grading, vibrant atmosphere',
    'Warm Theme': 'warm color theme, amber highlights, warm color grading, inviting golden atmosphere',
    'Cool Theme': 'cool color theme, blue cool palette, clean cool color grading, calm atmospheric mood',
    'Pastel Theme': 'pastel color theme, soft low-saturation palette, gentle airy atmosphere, delicate color grading',
    'Neon Theme': 'neon color theme, electric saturated palette, glowing highlights, energetic futuristic color grading',
    'Muted Theme': 'muted color theme, desaturated palette, subdued color grading, calm understated atmosphere',
    'Monochrome Theme': 'monochrome color theme, black and white palette, clean grayscale color grading, strong tonal contrast',
    'Sepia Theme': 'sepia color theme, warm brown palette, vintage sepia color grading, nostalgic atmosphere',
    'Gold Theme': 'gold color theme, golden palette, warm metallic highlights, premium luminous color grading',
    'Silver Theme': 'silver color theme, cool metallic palette, clean silver-gray color grading, polished atmosphere',
    'Dark Theme': 'dark color theme, deep shadow palette, low brightness color grading, moody dramatic atmosphere',
    'Bright Theme': 'bright color theme, high-key luminous palette, clean bright color grading, airy atmosphere',
    'Soft Theme': 'soft color theme, gentle low-contrast palette, smooth soft color grading, calm delicate atmosphere',
    'Vivid Theme': 'vivid color theme, highly saturated palette, bold color grading, energetic visual impact',
    'Earth Theme': 'earth color theme, natural brown and green palette, organic grounded color grading, warm natural atmosphere',
    'Cream Theme': 'cream color theme, soft cream palette, warm gentle color grading, light elegant atmosphere',
    'Lavender Theme': 'lavender color theme, soft lavender palette, gentle violet color grading, dreamy calm atmosphere',
    'Mint Theme': 'mint color theme, fresh mint palette, light green-blue color grading, clean airy atmosphere',
    'Peach Theme': 'peach color theme, soft peach palette, warm delicate color grading, friendly gentle atmosphere',
    'Rose Theme': 'rose color theme, romantic rose palette, soft red-pink color grading, elegant warm atmosphere',
    'Aqua Theme': 'aqua color theme, clear aqua palette, fresh watery color grading, bright clean atmosphere',
    'Pastel Pink': 'pastel pink color theme, very soft pink palette, gentle rosy color grading, airy delicate mood',
    'Pastel Blue': 'pastel blue color theme, very soft blue palette, gentle cool color grading, calm airy mood',
    'Pastel Purple': 'pastel purple color theme, very soft violet palette, delicate dreamy color grading, gentle atmosphere',
    'Pastel Green': 'pastel green color theme, very soft green palette, fresh gentle color grading, light natural mood',
    'Pastel Yellow': 'pastel yellow color theme, very soft yellow palette, light sunny color grading, cheerful gentle mood',
    'Pastel Orange': 'pastel orange color theme, very soft orange palette, warm gentle color grading, cozy light mood',
    'Pastel Mint': 'pastel mint color theme, soft mint palette, clean fresh color grading, light airy atmosphere',
    'Pastel Lavender': 'pastel lavender color theme, soft lavender palette, delicate violet color grading, dreamy airy mood',
    'Pastel Peach': 'pastel peach color theme, soft peach palette, warm gentle color grading, delicate friendly mood',
    'Pastel Rose': 'pastel rose color theme, soft rose palette, gentle romantic color grading, airy elegant mood',
    'Pastel Aqua': 'pastel aqua color theme, soft aqua palette, clean watery color grading, light refreshing mood',
    'Pastel Cream': 'pastel cream color theme, soft cream palette, warm light color grading, gentle elegant mood',
    'Black & White': 'black and white color theme, pure monochrome palette, strong tonal contrast, clean graphic color grading',
    'Red & Blue': 'red and blue color theme, bold dual-color palette, strong warm-cool contrast, dynamic color grading',
    'Pink & Blue': 'pink and blue color theme, playful dual-color palette, soft warm-cool contrast, vibrant color harmony',
    'Purple & Cyan': 'purple and cyan color theme, vivid dual-color palette, electric cool contrast, futuristic color grading',
    'Orange & Teal': 'orange and teal color theme, cinematic complementary palette, warm-cool contrast, polished color grading',
    'Yellow & Purple': 'yellow and purple color theme, bold complementary palette, playful contrast, vivid graphic atmosphere',
    'Green & Magenta': 'green and magenta color theme, high-contrast complementary palette, energetic stylized color grading',
    'Black & Red': 'black and red color theme, dark dramatic palette, intense red accents, bold high-contrast atmosphere',
    'Black & Gold': 'black and gold color theme, luxury dark palette, golden highlights, premium dramatic color grading',
    'White & Blue': 'white and blue color theme, clean bright palette, crisp blue accents, fresh minimal color grading',
    'Pastel Pink & Blue': 'pastel pink and blue color theme, soft dual pastel palette, gentle warm-cool balance, airy atmosphere',
    'Pastel Mint & Lavender': 'pastel mint and lavender color theme, soft dreamy dual palette, fresh delicate color harmony',
    'Pastel Peach & Cream': 'pastel peach and cream color theme, warm soft dual palette, cozy gentle color grading',
    'Pastel Yellow & Green': 'pastel yellow and green color theme, soft sunny natural palette, fresh cheerful color grading',
    'Pastel Aqua & Pink': 'pastel aqua and pink color theme, soft playful dual palette, fresh rosy color harmony',
    'Crazy Color': 'crazy color theme, playful clashing palette, unexpected color combinations, photographic color grading, energetic real-world atmosphere',
    'Candy Color': 'candy color theme, sweet bright palette, playful pastel-neon colors, photographic color grading, cheerful glossy atmosphere',
    'Pop Color': 'pop color theme, bold bright palette, saturated colors, photographic color grading, energetic real-world atmosphere',
    'Dreamy Color': 'dreamy color theme, soft luminous palette, gentle haze, photographic pastel color grading, realistic atmospheric mood',
    'Acid Color': 'acid color theme, intense fluorescent palette, surreal high-energy photographic color grading, experimental real-world atmosphere',
    'Cyber Color': 'cyber color theme, neon cyan and magenta palette, dark futuristic contrast, photographic digital glow atmosphere',
    'Rainbow Color': 'rainbow color theme, full-spectrum colorful palette, photographic multicolor grading, vibrant real-world atmosphere',
    'Holographic Color': 'holographic color theme, iridescent pastel palette, shifting rainbow highlights, glossy photographic color grading',
    'Vaporwave Color': 'vaporwave color theme, pink cyan purple palette, retro digital photographic color grading, nostalgic surreal atmosphere',
    'Stardust Fantasy': 'stardust fantasy atmosphere, soft blue lavender and pink palette, fine sparkling light particles, gentle photographic color grading, magical real-world background mood',
    'Shooting Star Fantasy': 'shooting star fantasy atmosphere, deep blue and violet palette, bright streaks of light, dreamy night-sky glow, photographic color grading, energetic real-world background mood',
    'Galaxy Atmosphere': 'galaxy atmosphere, deep purple blue and magenta palette, subtle cosmic glow, soft nebula-like gradients, photographic color grading, mysterious real-world background mood',
    'Aurora Mood': 'aurora mood, green cyan violet and blue palette, flowing luminous gradients, atmospheric sky-like glow, photographic color grading, calm real-world background mood',
    'Dreamland Color': 'dreamland color atmosphere, soft pastel rainbow palette, glowing haze, gentle photographic color grading, airy real-world background mood',
    'Heart Magic Color': 'heart magic color atmosphere, soft pink and violet palette, subtle sweet glow, gentle sparkle accents, photographic color grading, romantic real-world background mood',
    'Harajuku Decora Mood': 'harajuku decora mood, colorful real-world street fashion atmosphere, pink and pastel color accents, playful accessory-like color pops, photographic color grading',
    'Pastel Kawaii Mood': 'pastel kawaii mood, soft pink mint lavender and cream palette, cute gentle atmosphere, clean photographic color grading, sweet real-world background mood',
    'Pop Kawaii Color': 'pop kawaii color atmosphere, bright pink cyan yellow and lavender palette, cheerful colorful accents, photographic color grading, playful real-world background mood',
    'Japanese Mood': 'japanese mood color atmosphere, vermilion indigo warm gold and soft paper tones, quiet traditional ambience, photographic color grading, calm real-world background mood',
    'Sakura Japan Color': 'sakura japan color atmosphere, pale cherry blossom pink, soft white, warm spring light, gentle Japanese mood, photographic color grading, airy real-world background mood',
    'Samurai Drama Color': 'samurai drama color atmosphere, deep black, dark red, muted gold and smoky neutral tones, period drama tension, cinematic photographic color grading',
    'Western Desert Color': 'western desert color atmosphere, dusty sand, burnt orange, leather brown and sunset gold palette, dry frontier mood, photographic color grading, real-world background atmosphere',
    'Indian Festival Color': 'indian festival color atmosphere, saffron magenta turquoise and gold palette, festive color richness, photographic color grading, vibrant real-world background mood',
    'Arabian Night Color': 'arabian night color atmosphere, deep blue violet gold and warm lantern glow, night-market fantasy mood, photographic color grading, mysterious real-world background atmosphere',
    'Egyptian Gold Color': 'egyptian gold color atmosphere, desert sand, turquoise, black accents and aged gold palette, ancient monument mood, photographic color grading, warm real-world background atmosphere',
    'Chinese Lantern Color': 'chinese lantern color atmosphere, rich red, warm gold, deep night tones and lantern glow, festive street mood, photographic color grading, real-world background atmosphere',
    'Korean Pastel Color': 'korean pastel color atmosphere, soft pink mint sky blue and cream palette, clean modern gentle mood, photographic color grading, airy real-world background atmosphere',
    'Nordic Winter Color': 'nordic winter color atmosphere, white blue silver and pale gray palette, cold quiet snow mood, photographic color grading, clean real-world background atmosphere',
    'Tropical Island Color': 'tropical island color atmosphere, turquoise ocean, lush green, sunlit yellow and coral accents, bright vacation mood, photographic color grading, real-world background atmosphere',
    'Virtual Diva Teal': 'virtual diva teal color atmosphere, teal cyan black and soft neon accents, digital stage-like color mood, clean photographic color grading, vivid real-world background atmosphere',
    'Heterochromia Eyes': 'heterochromia eyes, natural realistic iris detail, different eye colors, one blue eye and one amber or green eye, subtle photographic color accent, clean real-world portrait detail',
    'Fantasy Color': 'fantasy color theme, magical saturated palette, glowing photographic color grading, whimsical real-world atmosphere',
    'Retro Pop': 'retro pop style, bold color palette, graphic shapes, playful composition, clean vintage-inspired visual design',
    'Black White': 'strong black and white photography, monochrome grayscale tones, no color, achromatic, high contrast, deep blacks, bright whites, dramatic film grain',
    'Realistic': 'photorealistic image, natural lighting, realistic skin texture, lifelike details, accurate materials, clean high-resolution photo quality',
    'Cinematic': 'cinematic film still, dramatic lighting, controlled contrast, strong depth, realistic atmosphere, detailed composition, filmic photo look',
}
EFFECT_PRESET_CATEGORY = {
    'None': 'All',
    'Realistic Photo': 'Photo',
    '35mm Film': 'Camera FX',
    'Cinematic Photo': 'Photo',
    'Soft Portrait': 'Photo',
    'Milky Portrait': 'Photo',
    'Glow Portrait': 'Photo',
    'B&W Soft': 'Photo',
    'B&W Strong': 'Photo',
    'Film Noir': 'Photo',
    'Noir Photo': 'Photo',
    'Flash Photo': 'Camera FX',
    'Direct Flash': 'Camera FX',
    'Disposable Flash': 'Camera FX',
    'Paparazzi Flash': 'Camera FX',
    'Dark Flash': 'Camera FX',
    'Red Eye Flash': 'Camera FX',
    'Polaroid': 'Camera FX',
    'Vintage Photo': 'Photo',
    'Long Exposure': 'Camera FX',
    'Directional Blur': 'Camera FX',
    'Toy Camera': 'Camera FX',
    'Lomography': 'Camera FX',
    'Night Vision': 'Camera FX',
    'Security Camera': 'Camera FX',
    'Thermal Camera': 'Camera FX',
    'Film Negative': 'Camera FX',
    'VHS': 'Camera FX',
    'Glitch Effect': 'Camera FX',
    'Insta Feed': 'SNS',
    'TikTok': 'SNS',
    'YT Thumb': 'SNS',
    'YT Vlog': 'SNS',
    'FB Post': 'SNS',
    'HDR Photo': 'Photo',
    'iPhone Photo': 'Camera FX',
    'Tilt-Shift': 'Camera FX',
    'Lens Distortion': 'Camera FX',
    'Fisheye Lens': 'Camera FX',
    'Chromatic Aberration': 'Camera FX',
    'Silhouette Photo': 'Photo',
    'Glamour Photo': 'Photo',
    'Landscape Photo': 'Photo',
    'Street Photo': 'Photo',
    'Beauty Photo': 'Photo',
    'Editorial Portrait': 'Photo',
    'Candid Portrait': 'Photo',
    'Movie Still': 'Photo',
    'Neon Noir': 'Photo',
    'Action Still': 'Photo',
    'Natural Light': 'Light',
    'Studio Light': 'Light',
    'Golden Hour': 'Light',
    'Sunlight': 'Light',
    'Side Light': 'Light',
    'Backlight': 'Light',
    'Top Light': 'Light',
    'Low Sun': 'Light',
    'Overhead Sun': 'Light',
    'Long Shadow': 'Light',
    'Overcast': 'Light',
    'Dappled Light': 'Light',
    'Window Shadow': 'Light',
    'Light Rays': 'Light',
    'Low Key': 'Light',
    'High Key': 'Light',
    'Neon Night': 'Light',
    'Cyberpunk': 'Light',
    'Product Photo': 'Photo',
    'Food Photo': 'Photo',
    'Fashion Editorial': 'Photo',
    'Architecture': 'Photo',
    'Interior Design': 'Photo',
    'Anime Clean': 'Art',
    'Anime Soft': 'Art',
    'Manga B&W': 'Art',
    'Illustration': 'Art',
    'Painterly': 'Art',
    'Watercolor': 'Art',
    'Oil Painting': 'Art',
    'Comic': 'Art',
    'Pixelate': 'Art',
    'Concept Art': 'Art',
    'Dreamy': 'Mood',
    'Dark Fantasy': 'Mood',
    'High Detail': 'Mood',
    'Minimal Clean': 'Mood',
    'Paper Print': 'Finish',
    'Matte Print': 'Finish',
    'Glossy Print': 'Finish',
    'Canvas Texture': 'Finish',
    'Fabric Print': 'Finish',
    'Metal Print': 'Finish',
    'Glass Print': 'Finish',
    'Glass Distortion': 'Finish',
    'Hex Tile': 'Finish',
    'Kaleidoscope': 'Finish',
    'Wet Surface': 'Finish',
    'Water Droplets': 'Finish',
    'Dusty Surface': 'Finish',
    'Fractal Noise': 'Finish',
    'Scratched Print': 'Finish',
    'Vintage Paper': 'Finish',
    'Stone Surface': 'Finish',
    'Marble Finish': 'Finish',
    'Concrete Finish': 'Finish',
    'Rusty Metal': 'Finish',
    'Aged Metal': 'Finish',
    'Patina Finish': 'Finish',
    'Wood Grain': 'Finish',
    'Leather Finish': 'Finish',
    'Ceramic Glaze': 'Finish',
    'Plastic Finish': 'Finish',
    'Slime Finish': 'Finish',
    'Gel Finish': 'Finish',
    'Liquid Gloss': 'Finish',
    'Gummy Finish': 'Finish',
    'Wax Finish': 'Finish',
    'Fantasy Color': 'Color Theme',
    'Red Theme': 'Color Theme',
    'Blue Theme': 'Color Theme',
    'Pink Theme': 'Color Theme',
    'Purple Theme': 'Color Theme',
    'Green Theme': 'Color Theme',
    'Yellow Theme': 'Color Theme',
    'Orange Theme': 'Color Theme',
    'Cyan Theme': 'Color Theme',
    'Teal Theme': 'Color Theme',
    'Magenta Theme': 'Color Theme',
    'Warm Theme': 'Color Theme',
    'Cool Theme': 'Color Theme',
    'Pastel Theme': 'Color Theme',
    'Neon Theme': 'Color Theme',
    'Muted Theme': 'Color Theme',
    'Monochrome Theme': 'Color Theme',
    'Sepia Theme': 'Color Theme',
    'Gold Theme': 'Color Theme',
    'Silver Theme': 'Color Theme',
    'Dark Theme': 'Color Theme',
    'Bright Theme': 'Color Theme',
    'Soft Theme': 'Color Theme',
    'Vivid Theme': 'Color Theme',
    'Earth Theme': 'Color Theme',
    'Cream Theme': 'Color Theme',
    'Lavender Theme': 'Color Theme',
    'Mint Theme': 'Color Theme',
    'Peach Theme': 'Color Theme',
    'Rose Theme': 'Color Theme',
    'Aqua Theme': 'Color Theme',
    'Pastel Pink': 'Color Theme',
    'Pastel Blue': 'Color Theme',
    'Pastel Purple': 'Color Theme',
    'Pastel Green': 'Color Theme',
    'Pastel Yellow': 'Color Theme',
    'Pastel Orange': 'Color Theme',
    'Pastel Mint': 'Color Theme',
    'Pastel Lavender': 'Color Theme',
    'Pastel Peach': 'Color Theme',
    'Pastel Rose': 'Color Theme',
    'Pastel Aqua': 'Color Theme',
    'Pastel Cream': 'Color Theme',
    'Black & White': 'Color Theme',
    'Red & Blue': 'Color Theme',
    'Pink & Blue': 'Color Theme',
    'Purple & Cyan': 'Color Theme',
    'Orange & Teal': 'Color Theme',
    'Yellow & Purple': 'Color Theme',
    'Green & Magenta': 'Color Theme',
    'Black & Red': 'Color Theme',
    'Black & Gold': 'Color Theme',
    'White & Blue': 'Color Theme',
    'Pastel Pink & Blue': 'Color Theme',
    'Pastel Mint & Lavender': 'Color Theme',
    'Pastel Peach & Cream': 'Color Theme',
    'Pastel Yellow & Green': 'Color Theme',
    'Pastel Aqua & Pink': 'Color Theme',
    'Crazy Color': 'Color Theme',
    'Candy Color': 'Color Theme',
    'Pop Color': 'Color Theme',
    'Dreamy Color': 'Color Theme',
    'Acid Color': 'Color Theme',
    'Cyber Color': 'Color Theme',
    'Rainbow Color': 'Color Theme',
    'Holographic Color': 'Color Theme',
    'Vaporwave Color': 'Color Theme',
    'Japanese Mood': 'Color Theme',
    'Sakura Japan Color': 'Color Theme',
    'Samurai Drama Color': 'Color Theme',
    'Western Desert Color': 'Color Theme',
    'Indian Festival Color': 'Color Theme',
    'Arabian Night Color': 'Color Theme',
    'Egyptian Gold Color': 'Color Theme',
    'Chinese Lantern Color': 'Color Theme',
    'Korean Pastel Color': 'Color Theme',
    'Nordic Winter Color': 'Color Theme',
    'Tropical Island Color': 'Color Theme',
    'Virtual Diva Teal': 'Color Theme',
    'Heterochromia Eyes': 'Color Theme',
    'Stardust Fantasy': 'Color Theme',
    'Shooting Star Fantasy': 'Color Theme',
    'Galaxy Atmosphere': 'Color Theme',
    'Aurora Mood': 'Color Theme',
    'Dreamland Color': 'Color Theme',
    'Heart Magic Color': 'Color Theme',
    'Harajuku Decora Mood': 'Color Theme',
    'Pastel Kawaii Mood': 'Color Theme',
    'Pop Kawaii Color': 'Color Theme',
    'Retro Pop': 'Mood',
    'Black White': 'Photo',
    'Realistic': 'Photo',
    'Cinematic': 'Photo',
}

class Krea2PromptEffect:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "prompt_in": _text(""),
                "enable_effect": ("BOOLEAN", {"default": True}),
                # Use free STRING widgets instead of COMBO widgets.
                # This prevents old workflows from failing with "Value not in list"
                # when they contain legacy values such as Base Style / Custom Preset.
                "category": ("STRING", {"default": "Photo", "multiline": False, "dynamicPrompts": False}),
                "preset": ("STRING", {"default": "Realistic Photo", "multiline": False, "dynamicPrompts": False}),
                "mode": ("STRING", {"default": "Preset", "multiline": False, "dynamicPrompts": False}),
                "custom_preset": _text("", multiline=True),
            }
        }

    # Keep effect_text as a compatibility output. Existing workflows may still have it connected.
    # The visible UI should use prompt_out for generation; effect_text is only the effect fragment.
    RETURN_TYPES = ("STRING", "STRING")
    RETURN_NAMES = ("prompt_out", "effect_text")
    FUNCTION = "execute"
    CATEGORY = "Krea2/BBOX Prompter Suite"

    def execute(self, prompt_in="", enable_effect=True, category="Photo", preset="Realistic Photo", mode="Preset", custom_preset=""):
        prompt_in = _clean(prompt_in)
        mode = _clean(mode) or "Preset"
        preset = _clean(preset) or "Realistic Photo"
        preset = {
            "None": "Realistic Photo",
            "Black White": "B&W Strong",
            "Realistic": "Realistic Photo",
            "Cinematic": "Cinematic Photo",
        }.get(preset, preset)
        effect = ""
        if enable_effect:
            if mode in ("Custom", "Custom Preset") or preset == "Custom Preset":
                effect = _clean(custom_preset)
            else:
                effect = _clean(EFFECT_PRESET_TEXT.get(preset, ""))
        if prompt_in and effect:
            out = f"{prompt_in}\n{effect}"
        else:
            out = prompt_in or effect
        return (out, effect)

    @classmethod
    def IS_CHANGED(cls, *args, **kwargs):
        payload = json.dumps([args, kwargs], ensure_ascii=False, sort_keys=True)
        return hashlib.sha256(payload.encode("utf-8")).hexdigest()


class Krea2BBOXPromptEffect(Krea2PromptEffect):
    CATEGORY = "Krea2/BBOX Prompter Suite"


NODE_CLASS_MAPPINGS = {
    "Krea2ElementFramingV1Canvas": Krea2ElementFramingV1Canvas,
    "Krea2ElementFramingV1Prompt": Krea2ElementFramingV1Prompt,
    "Krea2ElementJSONExportV1": Krea2ElementJSONExportV1,
    "Krea2BBOXPromptEffect": Krea2BBOXPromptEffect,
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "Krea2ElementFramingV1Canvas": "📐 Krea2 BBOX Canvas",
    "Krea2ElementFramingV1Prompt": "📝 Krea2 BBOX Prompter",
    "Krea2ElementJSONExportV1": "📦 Krea2 BBOX Export",
    "Krea2BBOXPromptEffect": "✨ Krea2 BBOX Prompt Effect",
}

