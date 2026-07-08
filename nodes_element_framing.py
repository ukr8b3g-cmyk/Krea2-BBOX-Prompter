import json
import hashlib
import re
from pathlib import Path
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


EFFECT_CATEGORIES = (
    'All',
    'Photo',
    'Camera FX',
    'Art',
    'Light',
    'Weather',
    'Background',
    'Mood',
    'Color Theme',
    'Finish',
    'Custom',
)
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
    'B&W Glow',
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
    'Hex Tile',
    'Kaleidoscope',
    'HDR Photo',
    'iPhone Photo',
    'Flip Phone',
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
    'Light Rays',
    'Low Key',
    'High Key',
    'Neon Night',
    'Clear Sky',
    'Cloudy',
    'Rainy',
    'Heavy Rain',
    'After Rain',
    'Foggy',
    'Snowy',
    'Stormy',
    'Heat Haze',
    'Product Photo',
    'Food Photo',
    'Fashion Editorial',
    'Architecture',
    'Interior Design',
    'Anime Clean',
    'Anime Soft',
    'Anime in Photo',
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
    'Retro Pop',
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
    'Earth Theme',
    'Cream Theme',
    'Black & White',
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
    'Classroom',
    'Train Interior',
    'Bus Interior',
    'Living Room',
    'Kitchen',
    'Bathroom',
    'Shower Room',
    'Bedroom',
    'Dining Room',
    'Modern Hotel',
    'Cafe',
    'Office',
    'Library',
    'Art Museum',
    'Gallery Room',
    'City Street',
    'Shopping Mall',
    'Airport',
    'Rooftop',
    'European Street',
    'Paris Street',
    'New York Street',
    'Street Snap',
    'Graffiti Wall',
    'Back Alley',
    'Underpass',
    'Night Street',
    'Industrial Street',
    'Convenience Store',
    'Japanese Room',
    'Forest Path',
    'Restaurant',
    'Bar',
    'School Hallway',
    'Gym Room',
    'Subway Station',
    'Supermarket',
    'Riverbank',
    'Harbor',
    'Greenhouse',
    'Kyoto Temple',
    'Beach',
    'Tropical Beach',
    'Ocean Cottage',
    'Beach Bungalow',
    'Resort Pool',
    'Public Pool',
    'Aquarium',
    'Ship Deck',
    'Factory Line',
    'Workshop',
    'Abandoned Building',
    'Ruins Interior',
    'Old Warehouse',
    'Fantasy Castle',
    'Magic Forest',
    'RPG Town',
    'Dungeon Hall',
    'Ancient Ruins',
    'MMO Field',
    'Rock Stage',
    'Idol Stage',
    'Rooftop Stage',
    'Beer Garden',
    'Live House',
    'Theater Stage',
    'Dance Studio',
    'Studio Plain',
)
EFFECT_PRESET_TEXT = {
    "Realistic Photo": "photorealistic image, natural lighting, realistic skin texture, lifelike details, accurate materials, clean high-resolution photo quality",
    "35mm Film": "analog 35mm film photo, visible film grain, subtle halation, natural color, soft contrast, realistic skin texture",
    "Cinematic Photo": "cinematic film still, dramatic lighting, controlled contrast, strong depth, realistic atmosphere, detailed composition, filmic photo look",
    "Soft Portrait": "soft portrait photography, flattering natural light, natural skin texture, shallow depth of field, gentle contrast, clean facial details",
    "Milky Portrait": "white milky tone, pale milky cream palette with soft portrait photography, natural soft skin texture, shallow depth of field, gentle contrast, smooth tonal gradation, clean facial details, delicate calm mood",
    "Glow Portrait": "dreamy photographic atmosphere, soft milky cream palette, soft portrait photography, natural soft skin texture, shallow depth of field, gentle contrast, smooth tonal gradation, clean facial details, luminous soft glow, soft radiant highlights, airy subtle haze, gentle bloom effect, calm realistic emotional mood, flash, illuminated subject, crisp catchlight,",
    "B&W Soft": "soft black and white photography, monochrome grayscale tones, no color, gentle contrast, soft film grain, natural skin texture",
    "B&W Glow": "pure black and white glow portrait, monochrome grayscale photography, no color, soft monochrome tones, luminous soft glow, flash, illuminated subject, crisp catchlight, bright gentle highlights, natural soft skin texture, shallow depth of field, gentle contrast, smooth tonal gradation, clean facial details, airy subtle haze, calm realistic emotional mood",
    "B&W Strong": "strong black and white photography, monochrome grayscale tones, no color, high contrast, deep blacks, bright whites, dramatic film grain",
    "Film Noir": "film noir photography, black and white tones, dramatic shadows, low-key lighting, high contrast, mysterious cinematic atmosphere",
    "Noir Photo": "modern noir photography, monochrome contrast, deep shadows, sharp highlights, moody urban cinematic lighting",
    "Flash Photo": "flash photo, light to medium on-camera flash, clear illuminated subject, crisp catchlight, natural surroundings, balanced shadows, casual photographic snapshot realism",
    "Direct Flash": "direct flash photo, frontal camera flash, clear subject illumination, crisp highlights, visible catchlight, balanced contrast, sharp casual photographic look",
    "Disposable Flash": "disposable camera flash photo, casual point-and-shoot look, medium frontal flash, slight film grain, natural snapshot framing, imperfect but realistic camera texture",
    "Paparazzi Flash": "paparazzi flash photography, strong camera flash burst, candid subject illumination, crisp highlights, energetic snapshot feeling, press-photo style realism",
    "Dark Flash": "dark flash photo, on-camera flash in a low-light environment, illuminated foreground subject, deeper surrounding shadows, grainy high ISO texture, dramatic snapshot realism",
    "Red Eye Flash": "red-eye flash photo effect, on-camera flash causing visible red pupils, direct frontal flash, snapshot realism, strong catchlight, photographic camera artifact",
    "Polaroid": "instant polaroid photo look, soft focus, muted colors, slight overexposure, nostalgic film texture, casual snapshot framing",
    "Vintage Photo": "vintage photograph look, faded tones, subtle film grain, soft contrast, nostalgic atmosphere, natural imperfections",
    "Long Exposure": "long exposure photography, motion blur trails, smooth light streaks, stable subject focus, atmospheric night photo look",
    "Directional Blur": "directional blur effect, one-way motion streaks, fast moving photographic smear, dynamic speed lines, realistic camera motion atmosphere",
    "Toy Camera": "toy camera photo, plastic lens softness, strong vignette, imperfect focus, saturated colors, playful lo-fi snapshot look",
    "Lomography": "lomography photo, vivid saturated colors, heavy vignette, cross-processed film tones, high contrast, spontaneous analog snapshot style",
    "Night Vision": "night vision camera footage, green monochrome image, infrared glow, high noise, low-light surveillance look, harsh electronic contrast",
    "Security Camera": "security camera footage, fixed wide-angle view, low-resolution video look, surveillance camera feel, flat lighting, documentary realism",
    "Thermal Camera": "thermal camera image, false-color heatmap palette, glowing warm subjects, cooler surrounding tones, infrared temperature-vision look",
    "Film Negative": "film negative look, inverted colors, cyan and orange reversed tones, high contrast negative film scan, surreal photographic inversion",
    "VHS": "VHS camcorder footage, analog video noise, scan lines, color bleed, soft low-resolution image, dated home-video recording look",
    "Glitch Effect": "glitch effect, digital noise artifacts, horizontal and vertical pixel distortion, RGB channel shift, broken video signal, corrupted scan lines, photographic digital error atmosphere",
    "Hex Tile": "hex tile pattern, repeating honeycomb geometry, subtle tiled surface texture, photographic material detail, clean real-world patterned background",
    "Kaleidoscope": "kaleidoscope pattern effect, mirrored repeating geometric shapes, colorful symmetrical background mood, photographic color texture, abstract real-world surface feel",
    "HDR Photo": "HDR photography, wide dynamic range, crisp detail, balanced highlights and shadows, realistic textures, clear photo quality",
    "iPhone Photo": "iPhone-style photo, natural phone camera look, realistic exposure, casual framing, sharp details, authentic everyday snapshot",
    "Flip Phone": "flip phone camera photo, early 2000s low-resolution mobile snapshot, tiny sensor noise, JPEG compression artifacts, chroma noise, soft blur, mild defocus, imperfect focus, low contrast, muted colors, slight color shift, uneven white balance, casual accidental snapshot feel",
    "Tilt-Shift": "tilt-shift photography, selective focus, miniature-like depth, soft blurred edges, crisp central subject, stylized photo realism",
    "Lens Distortion": "lens distortion effect, subtle barrel distortion, warped edges, imperfect optical lens look, photographic camera artifact, real-world wide lens feel",
    "Fisheye Lens": "fisheye lens effect, strong barrel distortion, curved wide-angle perspective, bulging center, warped edges, photographic ultra-wide lens look, real-world camera artifact",
    "Chromatic Aberration": "chromatic aberration effect, subtle red cyan edge fringing, RGB color separation, optical lens artifact, photographic digital color shift",
    "Silhouette Photo": "silhouette photography, dark realistic subject outline, bright backlight, strong contrast, minimal visible detail, dramatic photographic composition",
    "Glamour Photo": "glamour photography, polished lighting, smooth highlights, refined skin texture, stylish pose, clean magazine-quality finish",
    "Landscape Photo": "landscape photography, natural atmosphere, deep depth of field, realistic lighting, detailed environment, balanced composition",
    "Street Photo": "street photography, candid realism, natural light, authentic urban atmosphere, documentary-style composition, realistic detail",
    "Beauty Photo": "beauty photography, clean skin detail, flattering light, refined makeup, soft highlights, premium portrait finish",
    "Editorial Portrait": "editorial portrait photography, refined styling, confident pose, polished lighting, magazine composition, clean detailed skin texture",
    "Candid Portrait": "candid portrait photography, natural expression, realistic lighting, authentic moment, soft background, clean subject detail",
    "Movie Still": "movie still photography, cinematic framing, realistic production lighting, controlled contrast, atmospheric depth, detailed film scene",
    "Neon Noir": "neon noir photography, dark realistic urban atmosphere, colored neon highlights, moody shadows, cinematic contrast, rain-slick real-world reflections",
    "Action Still": "cinematic action still, dynamic composition, realistic motion energy, controlled lighting, sharp subject focus, high-energy film atmosphere",
    "Natural Light": "natural daylight photography, soft realistic shadows, balanced exposure, authentic atmosphere, gentle color rendering",
    "Studio Light": "professional studio lighting, clean softbox illumination, controlled shadows, sharp details, polished photographic look",
    "Golden Hour": "golden hour lighting, warm sunlight, soft long shadows, glowing highlights, cinematic natural atmosphere",
    "Sunlight": "sunlight, bright natural daylight, realistic light behavior, natural shadows, clear highlights, balanced outdoor illumination",
    "Side Light": "side light, directional natural light from one side, realistic shadow falloff, sculpted form, balanced highlights",
    "Backlight": "backlight, light behind the subject, glowing rim edge, natural silhouette tendency, realistic atmospheric separation",
    "Top Light": "top light, light from above, natural overhead illumination, downward shadows, realistic highlight placement",
    "Low Sun": "low sun angle, warm directional sunlight, long soft-edged shadows, realistic late-day light behavior, natural atmosphere",
    "Overhead Sun": "overhead sun, high midday sunlight, short crisp shadows, bright clear daylight, realistic outdoor light behavior",
    "Light Rays": "light rays effect, visible beams of light, soft volumetric glow, sunlight shafts through atmosphere, cinematic photographic lighting mood",
    "Low Key": "low-key photography, dark background, controlled highlights, deep shadows, dramatic contrast, focused subject lighting",
    "High Key": "high-key photography, bright clean lighting, soft shadows, airy white background, gentle contrast, polished look",
    "Neon Night": "neon night lighting, colorful urban glow, reflective highlights, cinematic contrast, atmospheric background glow",
    "Clear Sky": "clear sky weather, clean blue sky, crisp visibility, calm daylight, photorealistic outdoor scenery, realistic natural atmosphere",
    "Cloudy": "cloudy weather, overcast sky, soft diffused daylight, muted shadows, photorealistic outdoor scenery, realistic natural atmosphere",
    "Rainy": "rainy weather, wet surfaces, soft reflections, visible raindrops, damp atmosphere, overcast daylight, photorealistic outdoor scenery, realistic natural atmosphere",
    "Heavy Rain": "heavy rain, strong wet atmosphere, visible rain streaks, glossy wet ground, low visibility, photorealistic outdoor scenery, realistic natural weather mood",
    "After Rain": "after-rain atmosphere, wet pavement, fresh air, soft reflections, clearing sky, photorealistic outdoor scenery, realistic natural atmosphere",
    "Foggy": "foggy weather, misty air, low contrast distance, reduced visibility, atmospheric depth, photorealistic outdoor scenery, realistic natural haze",
    "Snowy": "snowy weather, falling snow, cold air, snow-covered ground, soft winter light, photorealistic outdoor scenery, realistic natural atmosphere",
    "Stormy": "stormy weather, dark clouds, dramatic sky, strong wind mood, tense atmosphere, photorealistic outdoor scenery, realistic natural lighting",
    "Heat Haze": "heat haze, shimmering hot air, dry atmosphere, harsh sunlight, washed distant contrast, photorealistic outdoor scenery, realistic summer heat mood",
    "Product Photo": "professional product photography, clean background, sharp details, controlled reflections, accurate materials, commercial lighting",
    "Food Photo": "professional food photography, appetizing lighting, natural texture, shallow depth of field, clean composition, rich detail",
    "Fashion Editorial": "fashion editorial photography, stylish pose, refined wardrobe, studio-quality lighting, polished magazine look",
    "Architecture": "architectural photography, clean lines, accurate perspective, balanced lighting, sharp structural details, realistic materials",
    "Interior Design": "interior design photography, balanced room lighting, clean composition, realistic materials, inviting atmosphere, polished details",
    "Anime Clean": "clean anime illustration, crisp line art, polished character design, smooth cel shading, vibrant but controlled colors",
    "Anime Soft": "soft anime illustration, gentle lighting, delicate line art, pastel color palette, smooth shading, calm atmosphere",
    "Anime in Photo": "anime-style character in a realistic photographic background, illustrated character with clean anime features, real-world photo environment, natural photographic lighting, realistic depth and perspective, believable scene integration, clear contrast between animated subject and real background",
    "Manga B&W": "black and white manga style, monochrome screentone shading, clean ink lines, high readability, comic panel look",
    "Illustration": "high-quality digital illustration, polished details, clean composition, controlled lighting, appealing color harmony",
    "Painterly": "painterly digital art, visible brush texture, soft edges, rich lighting, expressive color transitions",
    "Watercolor": "watercolor illustration, soft paper texture, translucent washes, gentle colors, delicate hand-painted look",
    "Oil Painting": "oil painting style, rich brush strokes, textured paint surface, dramatic lighting, classical painted atmosphere",
    "Comic": "western comic book style, bold outlines, dynamic shading, vivid colors, high-contrast graphic look",
    "Pixelate": "pixelated mosaic effect, chunky visible pixel blocks, low-resolution digital look, simplified colors, crisp square pixels, stylized retro image texture",
    "Concept Art": "concept art style, detailed environment design, cinematic lighting, strong composition, polished production artwork",
    "Dreamy": "dreamy photographic atmosphere, soft glow, gentle contrast, subtle haze, delicate highlights, calm realistic emotional mood",
    "Dark Fantasy": "dark fantasy atmosphere, cinematic realistic shadows, mysterious lighting, ornate real-world texture, moody photographic composition",
    "High Detail": "highly detailed realistic image, crisp textures, sharp subject definition, refined materials, clean photographic lighting, intricate visual detail",
    "Minimal Clean": "minimal clean photographic style, simple composition, uncluttered background, balanced spacing, refined modern real-world presentation",
    "Retro Pop": "retro pop style, bold color palette, graphic shapes, playful composition, clean vintage-inspired visual design",
    "Paper Print": "printed on paper, realistic paper grain, matte texture, soft ink absorption, tactile photographic print finish",
    "Matte Print": "matte print finish, realistic non-reflective surface, soft contrast, smooth paper texture, photographic material feel",
    "Glossy Print": "glossy print finish, realistic reflective coating, crisp contrast, polished photo paper surface",
    "Canvas Texture": "canvas texture, realistic woven fabric surface, subtle textile grain, tactile material finish",
    "Fabric Print": "printed on fabric, realistic soft cloth texture, woven fibers, gentle ink diffusion, textile surface finish",
    "Metal Print": "printed on metal, realistic glossy metallic surface, reflective highlights, sleek hard material finish",
    "Glass Print": "behind glass, realistic glossy glass surface, subtle reflections, polished transparent finish",
    "Glass Distortion": "glass distortion effect, warped refraction, subtle transparent ripples, reflective glass surface, photographic material detail, real-world distorted texture",
    "Wet Surface": "wet surface effect, realistic water droplets, glossy highlights, damp reflective texture, fresh moisture finish",
    "Water Droplets": "water droplets on surface, realistic clear beads of moisture, glossy highlights, fresh wet photographic finish",
    "Dusty Surface": "dusty surface effect, realistic fine dust particles, muted texture, aged dry finish, subtle grime",
    "Fractal Noise": "fractal noise texture, cloudy procedural grain, smoky abstract background detail, organic noise pattern, photographic atmospheric surface texture",
    "Scratched Print": "scratched print surface, realistic fine scratches, worn texture, distressed physical finish",
    "Vintage Paper": "vintage paper texture, realistic aged paper grain, faded ink, warm yellowed surface, old printed finish",
    "Stone Surface": "stone surface texture, realistic rough mineral grain, cool hard material finish, natural stone detail",
    "Marble Finish": "marble surface finish, realistic subtle veining, polished stone texture, elegant mineral material",
    "Concrete Finish": "concrete surface texture, realistic rough gray material, fine grain, industrial matte finish",
    "Rusty Metal": "rusty metal surface, realistic oxidized texture, reddish brown corrosion, worn industrial finish",
    "Aged Metal": "aged metal finish, realistic tarnished surface, subtle scratches, oxidized patina, weathered material",
    "Patina Finish": "patina surface finish, realistic green-blue oxidized metal, aged copper look, weathered decorative texture",
    "Wood Grain": "wood grain texture, realistic natural wooden surface, warm organic material finish, visible grain lines",
    "Leather Finish": "leather surface texture, realistic subtle grain, soft worn material, tactile premium finish",
    "Ceramic Glaze": "ceramic glazed surface, realistic smooth glossy coating, subtle reflections, crafted material finish",
    "Plastic Finish": "plastic surface finish, realistic smooth synthetic texture, clean highlights, modern manufactured material",
    "Slime Finish": "slime surface finish, realistic glossy translucent gel texture, sticky wet highlights, soft gooey material look",
    "Gel Finish": "gel surface finish, realistic translucent glossy material, smooth jelly-like highlights, soft elastic texture",
    "Liquid Gloss": "liquid glossy finish, realistic wet reflective coating, smooth flowing highlights, polished fluid surface",
    "Gummy Finish": "gummy material finish, realistic soft translucent candy texture, rounded glossy surface, playful elastic look",
    "Wax Finish": "wax surface finish, realistic soft semi-gloss texture, smooth melted material, subtle warm highlights",
    "Fantasy Color": "fantasy color theme, magical saturated palette, glowing photographic color grading, whimsical real-world atmosphere",
    "Red Theme": "red color theme, cohesive red palette, warm red color grading, strong visual unity",
    "Blue Theme": "blue color theme, cohesive blue palette, cool calm color grading, unified blue atmosphere",
    "Pink Theme": "pink color theme, cohesive pink palette, soft rosy color grading, harmonious pink atmosphere",
    "Purple Theme": "purple color theme, cohesive violet palette, rich purple color grading, elegant moody atmosphere",
    "Green Theme": "green color theme, cohesive green palette, fresh natural color grading, balanced green atmosphere",
    "Yellow Theme": "yellow color theme, cohesive yellow palette, bright sunny color grading, warm cheerful atmosphere",
    "Orange Theme": "orange color theme, cohesive orange palette, warm energetic color grading, vivid orange atmosphere",
    "Cyan Theme": "cyan color theme, cohesive cyan palette, clear cool color grading, bright aquatic atmosphere",
    "Teal Theme": "teal color theme, cohesive teal palette, cinematic blue-green color grading, polished atmosphere",
    "Magenta Theme": "magenta color theme, cohesive magenta palette, bold pink-purple color grading, vibrant atmosphere",
    "Warm Theme": "warm color theme, amber highlights, warm color grading, inviting golden atmosphere",
    "Cool Theme": "cool color theme, blue cool palette, clean cool color grading, calm atmospheric mood",
    "Pastel Theme": "pastel color theme, soft low-saturation palette, gentle airy atmosphere, delicate color grading",
    "Neon Theme": "neon color theme, electric saturated palette, glowing highlights, energetic futuristic color grading",
    "Muted Theme": "muted color theme, desaturated palette, subdued color grading, calm understated atmosphere",
    "Monochrome Theme": "monochrome color theme, black and white palette, clean grayscale color grading, strong tonal contrast",
    "Sepia Theme": "sepia color theme, warm brown palette, vintage sepia color grading, nostalgic atmosphere",
    "Gold Theme": "gold color theme, golden palette, warm metallic highlights, premium luminous color grading",
    "Silver Theme": "silver color theme, cool metallic palette, clean silver-gray color grading, polished atmosphere",
    "Dark Theme": "dark color theme, deep shadow palette, low brightness color grading, moody dramatic atmosphere",
    "Bright Theme": "bright color theme, high-key luminous palette, clean bright color grading, airy atmosphere",
    "Earth Theme": "earth color theme, natural brown and green palette, organic grounded color grading, warm natural atmosphere",
    "Cream Theme": "cream color theme, soft cream palette, warm gentle color grading, light elegant atmosphere",
    "Black & White": "black and white color theme, pure monochrome palette, strong tonal contrast, clean graphic color grading",
    "Crazy Color": "crazy color theme, playful clashing palette, unexpected color combinations, photographic color grading, energetic real-world atmosphere",
    "Candy Color": "candy color theme, sweet bright palette, playful pastel-neon colors, photographic color grading, cheerful glossy atmosphere",
    "Pop Color": "pop color theme, bold bright palette, saturated colors, photographic color grading, energetic real-world atmosphere",
    "Dreamy Color": "dreamy color theme, soft luminous palette, gentle haze, photographic pastel color grading, realistic atmospheric mood",
    "Acid Color": "acid color theme, intense fluorescent palette, surreal high-energy photographic color grading, experimental real-world atmosphere",
    "Cyber Color": "cyber color theme, neon cyan and magenta palette, dark futuristic contrast, photographic digital glow atmosphere",
    "Rainbow Color": "rainbow color theme, full-spectrum colorful palette, photographic multicolor grading, vibrant real-world atmosphere",
    "Holographic Color": "holographic color theme, iridescent pastel palette, shifting rainbow highlights, glossy photographic color grading",
    "Vaporwave Color": "vaporwave color theme, pink cyan purple palette, retro digital photographic color grading, nostalgic surreal atmosphere",
    "Stardust Fantasy": "stardust fantasy atmosphere, soft blue lavender and pink palette, fine sparkling light particles, gentle photographic color grading, magical real-world background mood",
    "Shooting Star Fantasy": "shooting star fantasy atmosphere, deep blue and violet palette, bright streaks of light, dreamy night-sky glow, photographic color grading, energetic real-world background mood",
    "Galaxy Atmosphere": "galaxy atmosphere, deep purple blue and magenta palette, subtle cosmic glow, soft nebula-like gradients, photographic color grading, mysterious real-world background mood",
    "Aurora Mood": "aurora mood, green cyan violet and blue palette, flowing luminous gradients, atmospheric sky-like glow, photographic color grading, calm real-world background mood",
    "Dreamland Color": "dreamland color atmosphere, soft pastel rainbow palette, glowing haze, gentle photographic color grading, airy real-world background mood",
    "Heart Magic Color": "heart magic color atmosphere, soft pink and violet palette, subtle sweet glow, gentle sparkle accents, photographic color grading, romantic real-world background mood",
    "Harajuku Decora Mood": "harajuku decora mood, colorful real-world street fashion atmosphere, pink and pastel color accents, playful accessory-like color pops, photographic color grading",
    "Pastel Kawaii Mood": "pastel kawaii mood, soft pink mint lavender and cream palette, cute gentle atmosphere, clean photographic color grading, sweet real-world background mood",
    "Pop Kawaii Color": "pop kawaii color atmosphere, bright pink cyan yellow and lavender palette, cheerful colorful accents, photographic color grading, playful real-world background mood",
    "Japanese Mood": "japanese mood color atmosphere, vermilion indigo warm gold and soft paper tones, quiet traditional ambience, photographic color grading, calm real-world background mood",
    "Sakura Japan Color": "sakura japan color atmosphere, pale cherry blossom pink, soft white, warm spring light, gentle Japanese mood, photographic color grading, airy real-world background mood",
    "Samurai Drama Color": "samurai drama color atmosphere, deep black, dark red, muted gold and smoky neutral tones, period drama tension, cinematic photographic color grading",
    "Western Desert Color": "western desert color atmosphere, dusty sand, burnt orange, leather brown and sunset gold palette, dry frontier mood, photographic color grading, real-world background atmosphere",
    "Indian Festival Color": "indian festival color atmosphere, saffron magenta turquoise and gold palette, festive color richness, photographic color grading, vibrant real-world background mood",
    "Arabian Night Color": "arabian night color atmosphere, deep blue violet gold and warm lantern glow, night-market fantasy mood, photographic color grading, mysterious real-world background atmosphere",
    "Egyptian Gold Color": "egyptian gold color atmosphere, desert sand, turquoise, black accents and aged gold palette, ancient monument mood, photographic color grading, warm real-world background atmosphere",
    "Chinese Lantern Color": "chinese lantern color atmosphere, rich red, warm gold, deep night tones and lantern glow, festive street mood, photographic color grading, real-world background atmosphere",
    "Korean Pastel Color": "korean pastel color atmosphere, soft pink mint sky blue and cream palette, clean modern gentle mood, photographic color grading, airy real-world background atmosphere",
    "Nordic Winter Color": "nordic winter color atmosphere, white blue silver and pale gray palette, cold quiet snow mood, photographic color grading, clean real-world background atmosphere",
    "Tropical Island Color": "tropical island color atmosphere, turquoise ocean, lush green, sunlit yellow and coral accents, bright vacation mood, photographic color grading, real-world background atmosphere",
    "Virtual Diva Teal": "virtual diva teal color atmosphere, teal cyan black and soft neon accents, digital stage-like color mood, clean photographic color grading, vivid real-world background atmosphere",
    "Heterochromia Eyes": "heterochromia eyes, natural realistic iris detail, different eye colors, one blue eye and one amber or green eye, subtle photographic color accent, clean real-world portrait detail",
    "Classroom": "photorealistic empty classroom background, clean school interior, desks and blackboard, natural indoor lighting, practical everyday scene, no people",
    "Train Interior": "photorealistic train interior background, commuter rail carriage, seats and windows, clean public transport scene, natural available light, no people",
    "Bus Interior": "photorealistic bus interior background, rows of seats, aisle and windows, everyday public transport setting, realistic lighting, no people",
    "Living Room": "photorealistic living room background, comfortable home interior, sofa and warm practical decor, natural window light, clean everyday setting, no people",
    "Kitchen": "photorealistic kitchen background, clean home kitchen, counters and cabinets, practical indoor lighting, realistic everyday interior, no people",
    "Bathroom": "photorealistic bathroom background, clean residential bathroom, tiles and mirror, soft indoor lighting, realistic private interior, no people",
    "Shower Room": "photorealistic shower room background, clean tiled shower space, glass and bathroom fixtures, soft realistic lighting, no people",
    "Bedroom": "photorealistic bedroom background, simple bed and calm room decor, soft natural light, realistic home interior, no people",
    "Dining Room": "photorealistic dining room background, dining table and chairs, clean home interior, balanced indoor lighting, no people",
    "Modern Hotel": "photorealistic modern hotel room background, clean upscale interior, bed and soft ambient lighting, realistic travel setting, no people",
    "Cafe": "photorealistic cafe background, cozy coffee shop interior, tables and warm lighting, realistic everyday location, no people",
    "Office": "photorealistic office background, modern workplace interior, desks and clean business setting, balanced indoor light, no people",
    "Library": "photorealistic library background, bookshelves and quiet reading space, warm indoor lighting, realistic calm atmosphere, no people",
    "Art Museum": "photorealistic art museum background, clean gallery hall, framed artworks and spacious interior, soft exhibition lighting, no people",
    "Gallery Room": "photorealistic gallery room background, minimalist exhibition space, white walls and polished floor, controlled indoor lighting, no people",
    "City Street": "photorealistic city street background, everyday urban street, buildings and sidewalk, natural daylight, practical real-world scene, no people",
    "Shopping Mall": "photorealistic shopping mall background, clean indoor commercial space, storefronts and polished floor, bright practical lighting, no people",
    "Airport": "photorealistic airport terminal background, clean travel concourse, glass and signage, bright indoor lighting, no people",
    "Rooftop": "photorealistic rooftop background, open city rooftop space, skyline view and practical outdoor lighting, realistic urban setting, no people",
    "European Street": "photorealistic European street background, classic building facades, sidewalk and calm travel atmosphere, natural daylight, no people",
    "Paris Street": "photorealistic Paris street background, elegant urban architecture, sidewalk cafe feeling, natural daylight, realistic travel scene, no people",
    "New York Street": "photorealistic New York street background, dense urban blocks, storefronts and sidewalk, realistic city daylight, no people",
    "Street Snap": "photorealistic street snapshot background, casual outdoor urban location, natural available light, everyday documentary atmosphere, no people",
    "Graffiti Wall": "photorealistic graffiti wall background, colorful painted urban wall, street texture and practical daylight, realistic location, no people",
    "Back Alley": "photorealistic back alley background, narrow urban passage, textured walls and pavement, natural practical lighting, realistic street scene, no people",
    "Underpass": "photorealistic underpass background, concrete urban passage, overhead structure and street texture, realistic available light, no people",
    "Night Street": "photorealistic night street background, urban street lights, reflective pavement and evening atmosphere, realistic low light scene, no people",
    "Industrial Street": "photorealistic industrial street background, warehouse exterior, loading doors and concrete walls, neutral daylight, realistic practical location, no people",
    "Convenience Store": "photorealistic convenience store background, bright retail aisles, shelves and refrigerated cases, clean indoor lighting, no people",
    "Japanese Room": "photorealistic traditional Japanese tatami room background, shoji screens, tatami floor, wooden interior and alcove, warm calm lighting, no people",
    "Forest Path": "photorealistic forest path background, green woodland trail, mossy trees and natural sunlight, calm outdoor nature setting, no people",
    "Restaurant": "photorealistic restaurant background, warm dining room interior, tables, chairs and ambient lighting, realistic indoor location, no people",
    "Bar": "photorealistic bar background, warm dim lounge interior, wooden counter, stools and bottle shelves, realistic moody indoor lighting, no people",
    "School Hallway": "Japanese school hallway after school background, Classroom doors, lockers, windows with soft afternoon light, quiet empty corridor atmosphere",
    "Gym Room": "photorealistic gymnasium background, indoor sports hall, polished wooden floor, court lines, basketball hoops and bright window light, no people",
    "Subway Station": "photorealistic subway station background, underground train platform, tiled walls, station signs and practical fluorescent lighting, no people",
    "Supermarket": "supermarket aisle background, product shelves, bright practical lighting, everyday shopping atmosphere, no main human subject",
    "Riverbank": "riverbank background, walkway, railing, water, open sky, calm outdoor atmosphere, no main human subject",
    "Harbor": "harbor background, boats, water, warehouses, seaside industrial atmosphere, no main human subject",
    "Greenhouse": "greenhouse background, glass roof, plants, soft daylight, calm botanical atmosphere, no main human subject",
    "Kyoto Temple": "traditional Kyoto temple background, wooden architecture, garden, calm Japanese atmosphere, no main human subject",
    "Beach": "beach background, sand, ocean, bright natural daylight, no main human subject",
    "Tropical Beach": "tropical beach background, white sand, blue ocean, palm trees, bright resort atmosphere, no main human subject",
    "Ocean Cottage": "oceanfront cottage veranda background, sea view, wooden deck, calm resort atmosphere, no main human subject",
    "Beach Bungalow": "beach bungalow room background, wooden interior, ocean light, relaxed tropical resort mood, no main human subject",
    "Resort Pool": "resort swimming pool background, clear blue water, poolside chairs, bright vacation atmosphere, no main human subject",
    "Public Pool": "public swimming pool background, blue pool lanes, tiled floor, clean daytime facility atmosphere, no main human subject",
    "Aquarium": "aquarium background, large blue fish tank, soft underwater light, calm indoor atmosphere, no main human subject",
    "Ship Deck": "large ship deck background, ocean view, railings, open sky, cinematic travel atmosphere, no main human subject",
    "Factory Line": "factory production line background, industrial machines, conveyor belt, practical work lighting, no main human subject",
    "Workshop": "industrial workshop background, tools, workbench, metal parts, realistic factory atmosphere, no main human subject",
    "Abandoned Building": "abandoned building background, cracked walls, broken windows, dusty floor, quiet ruined atmosphere, no main human subject",
    "Ruins Interior": "ruined interior background, weathered walls, debris, aged concrete, dramatic abandoned space, no main human subject",
    "Old Warehouse": "old warehouse background, large empty space, concrete floor, metal beams, dim industrial atmosphere, no main human subject",
    "Fantasy Castle": "fantasy castle background, stone towers, grand courtyard, atmospheric adventure setting",
    "Magic Forest": "magical forest background, glowing plants, ancient trees, misty fantasy atmosphere",
    "RPG Town": "fantasy RPG town background, stone streets, wooden shops, adventure game atmosphere",
    "Dungeon Hall": "fantasy dungeon hall background, stone walls, torch light, mysterious adventure setting",
    "Ancient Ruins": "ancient ruins background, broken stone pillars, overgrown plants, adventure exploration atmosphere",
    "MMO Field": "3D fantasy game field background, open grassland, distant mountains, adventure MMO atmosphere",
    "Rock Stage": "rock concert stage background, amplifiers, spotlights, stage truss, dramatic live music atmosphere, no main human subject",
    "Idol Stage": "idol performance stage background, colorful lights, LED screen, polished stage floor, bright concert atmosphere, no main human subject",
    "Rooftop Stage": "rooftop stage background, small outdoor platform, city skyline, casual local event atmosphere, no main human subject",
    "Beer Garden": "beer garden background, outdoor tables, warm lanterns, relaxed evening terrace atmosphere, no main human subject",
    "Live House": "small live house stage background, dark walls, microphone stand, stage lights, intimate music venue atmosphere, no main human subject",
    "Theater Stage": "theater stage background, curtains, warm stage lights, classic performance space, no main human subject",
    "Dance Studio": "dance studio background, mirror wall, wooden floor, practice room lighting, no main human subject",
    "Studio Plain": "plain studio background, neutral wall, simple clean space, uncluttered composition, no main human subject",
    "Window Portrait": "Window-side portrait setting, large window with soft natural daylight, sheer curtains, simple chair or small table near the window, calm indoor portrait atmosphere, clean realistic room",
    "Convenience Counter": "Japanese convenience store checkout counter, bright fluorescent lighting, cashier counter, register area, product shelves behind the counter, everyday retail interior, background setting",
    "Photo Studio": "Professional photography studio interior, white seamless backdrop, strobes, softboxes, light stands, reflector boards, clean open shooting space, background setting",
    "Retro Arcade": "Japanese 2000s game arcade interior, sit-down arcade cabinets, fighting game machines, dim lighting, glowing CRT screens, colorful buttons and joysticks, background setting",
    "Purikura Booth": "Realistic Japanese purikura booth background, Close portrait-booth distance, pastel white and pink backdrop, side glossy panels and short entrance curtain edge, No floor, no machine",
    "Girl Room": "Cute teenage girl bedroom, pastel bedding, plush toys, small study desk, cute stationery, mirror, soft curtains, warm cozy lighting, background setting",
    "Boy Room": "Teenage boy bedroom, simple blue-toned decor, study desk, manga books, plastic model kits, sports poster, casual bedding, practical room atmosphere, background setting",
    "Family Living": "Ordinary family living room, sofa, television, low table, shelves, warm ceiling light, comfortable everyday domestic atmosphere, background setting",
    "Harajuku Shop": "Harajuku kawaii fashion shop interior, colorful clothing racks, cute accessories, pop pastel decor, bright retail lighting, realistic boutique atmosphere, background setting",
    "Traditional Tea Room": "Small traditional Japanese chashitsu tea room, Tatami mats, low nijiriguchi entrance near the floor, tokonoma alcove, simple wood and plaster walls, soft shoji daylight, or modern objects, background setting",
    "Fireworks": "Japanese summer fireworks festival background, Colorful fireworks over a riverside or town skyline, subtle lanterns and festival stalls below, realistic night atmosphere",
    "Summer Festival Stalls": "Realistic Japanese summer matsuri night street, Rows of yatai food stalls, warm lanterns, steam, cooking equipment, festival crowd atmosphere, background setting",
    "Painting Classroom": "Realistic painting classroom background, Easels, art supplies and canvases around, Empty small platform and plain stool in the center, no central model",
    "School Infirmary": "Japanese school infirmary background, White beds with privacy curtains, medicine cabinet, desk, clean quiet room, soft daylight",
    "Shrine Grounds": "Japanese shrine grounds background, Torii gate, stone path, trees, lanterns, temizuya basin, traditional shrine buildings, calm daytime atmosphere",
    "Shopping Arcade": "Japanese shopping arcade background, Covered local shotengai street, small shops, storefront awnings, bicycles, warm everyday atmosphere",
    "Karaoke Room": "Japanese karaoke room background, Private room with sofas, low table, wall monitor, microphones, song remote, colorful realistic lighting",
    "Family Restaurant": "Japanese family restaurant booth background, Table seat with bench sofas, menus without readable text, drink bar area in the distance, warm casual lighting",
    "School Rooftop": "Japanese school rooftop background, Rooftop fence, concrete floor, stairwell door, distant city and sky, calm after-school atmosphere",
    "Park Bench": "Japanese park bench background, Simple bench in a neighborhood park, trees, path, grass, soft daylight, calm everyday atmosphere",
    "Hair Salon": "Japanese hair salon background, Styling chairs, large mirrors, shampoo station, clean shelves, hair tools, bright realistic salon lighting",
    "Old Sento": "Old Japanese sento changing room background, Wooden lockers, wicker baskets, bench, scale, old fans, warm worn Showa-era public bath atmosphere",
    "Outdoor Onsen": "Typical Japanese outdoor onsen background, Stone hot spring bath, steam, wooden ryokan details, mountains or forest scenery behind, calm natural atmosphere",
    "Station Rotary": "Japanese station rotary background, Bus stops, taxi area, station entrance, streetlights, everyday waiting-place atmosphere",
    "Railroad Crossing": "Small Japanese railroad crossing background, Crossing gate, tracks, quiet residential street, houses and utility poles",
    "Convenience Store Front Close": "Japanese convenience store front entrance background at night, Camera very close to the storefront, automatic glass doors, bright interior, vending machines and small entrance area",
    "Wagashi Shop": "Traditional Japanese wagashi shop interior background, Glass display case, sweets, wooden shelves, wrapping counter, warm calm lighting",
    "Ryokan Hallway": "Japanese ryokan hallway background, Tatami or wooden corridor, shoji screens, lantern lights, quiet traditional inn atmosphere",
    "Bus Stop": "Japanese bus stop background, Roadside shelter, bench, timetable board, local street or countryside road, calm waiting atmosphere",
    "Riverside": "Japanese riverside embankment background, Wide river, grassy levee, walking path, bridge, open sky, quiet everyday atmosphere",
    "Night Alley": "Japanese night alley background, Narrow street, small restaurant lights, vending machine glow, wet pavement, quiet dramatic mood",
    "Hospital Waiting Room": "Japanese hospital waiting room background, Rows of chairs, reception counter, clean walls, quiet modern clinic atmosphere",
    "Hospital Room": "Japanese hospital patient room background, Single bed, privacy curtain, bedside table, window daylight, calm medical room",
    "Coin Laundry": "Japanese coin laundry background, Washing machines, dryers, folding table, bench, clean fluorescent lighting",
    "Apartment Entrance": "Japanese apartment entrance background, Lobby, mailboxes, glass doors, intercom panel, tiled floor, clean everyday residential atmosphere",
    "School Festival Classroom": "Japanese school festival classroom background, Decorated classroom, desks, handmade paper decorations, booth setup, lively culture festival mood",
    "Old Kissaten": "Old Japanese kissaten cafe interior background, Wood paneling, red or brown chairs, small tables, counter, warm lamps, nostalgic Showa-era atmosphere",
    "School Gym": "Japanese school gymnasium background, Wooden floor, basketball hoops, stage curtain, wall bars, high windows, quiet school event atmosphere",
    "Ticket Gate Closeup": "Japanese ticket gate close-up background, Camera very close to automatic ticket gates, IC card readers and gate flaps visible, station concourse behind",
    "Movie Theater Seats": "Movie theater seat background, Close front-facing view of empty cinema chairs, armrests and cup holders visible, dark auditorium behind, no screen shown",
    "Drugstore": "Japanese drugstore interior background, Aisles of medicine, cosmetics and daily goods, bright fluorescent lighting, clean shelves, everyday shop atmosphere",
    "Luxury Hotel Front": "Luxury hotel front desk background, Close view of elegant reception counter, marble or wood finishes, warm lobby lighting, flowers, polished high-end atmosphere",
    "Cheap Motel Front": "Cheap American motel front desk background, Worn reception counter, old key rack, tired fluorescent light, dated decor, worn service counter details",
    "Airport Lobby": "Airport lobby background, Check-in counters, waiting seats, glass walls, luggage carts, bright modern terminal lighting, travel atmosphere",
    "Cherry Blossom Avenue": "Japanese cherry blossom avenue background, Rows of sakura trees in bloom, path or small street, soft spring daylight, petals, calm seasonal atmosphere",
    "Campsite": "Japanese campsite background, Tent, simple camp chairs, fire pit, forest or lakeside scenery, soft evening light, relaxed outdoor atmosphere",
    "Observation Deck": "Japanese observation deck background, Railing, coin binoculars, wide city or mountain view, open sky, calm sightseeing atmosphere",
    "Livehouse Dressing Room": "Live house dressing room vanity background, Makeup table with many round bulbs around mirrors, simple chair, small backstage room, worn walls, cables and bags",
    "1970s Spaceship": "1970s science fiction spaceship bridge background, Analog control panels, chunky buttons, round colored lamps, retro monitors, central captain chair, classic movie set feeling",
    "Western Saloon": "Western saloon set background, Large wooden bar counter, round tables, bottles, swinging saloon doors visible, dusty old western town atmosphere",
    "Western Swinging Doors": "Western saloon swinging doors background, Classic half-height wooden swing doors very large and close to camera, dusty street outside, saloon interior edges visible",
    "Edo Nagaya": "Edo period nagaya alley set background, Narrow wooden tenement lane, lattice windows, sliding doors, buckets, stone path, old jidaigeki drama set feeling",
    "Detective Office": "Classic detective office set background, Old wooden desk, venetian blinds, file cabinets, desk lamp, papers, smoky noir lighting, private investigator room",
    "Pirate Ship Deck": "Pirate ship deck background, Wooden deck, mast, ropes, barrels, cannon, ocean and sky behind, adventure movie set atmosphere",
    "Medieval Castle Hall": "Medieval castle great hall background, Stone walls, long wooden table, banners, candle stands, large fireplace, heavy dramatic atmosphere",
    "Interrogation Room": "Old Japanese police drama interrogation room background, Small plain table with a desk lamp and a bowl of katsudon, two metal folding chairs facing each other, bare concrete walls, harsh dim light",
    "News Studio": "Television news studio background, Anchor desk, studio lights, camera area, large abstract monitor wall with, polished broadcast set",
    "1970s Drama Set": "1970s family drama living room TV set background, Retro sofa, low table, old wallpaper, warm lamps, visible studio cameras and lighting stands, clearly a filming set",
    "Old Japanese Rural Village": "Old Japanese rural village background, Camera close to a poor wooden farmhouse, the house large in frame, rough vegetable field beside it, dirt path, simple farm tools",
    "Track And Field Stadium": "Track and field stadium background, Red running track lanes, starting blocks, field area, stadium seats, daytime athletic competition atmosphere, No main athlete or logos",
    "Baseball Dugout": "Baseball dugout front background, Close view near the team bench, dugout roof, bench, bats, helmets, field and grass visible beyond",
    "Boxing Gym": "Boxing gym background, Boxing ring, punching bags, speed bag, worn mats, old posters without readable text, gritty training atmosphere",
    "Concert Hall Piano": "Concert hall grand piano seat background, Close view of a grand piano and piano bench on stage, polished floor, warm stage lights, empty audience seats behind",
    "Broadcast Room": "Japanese broadcast room background, Close view of microphones, audio mixer, headphones, monitors, soundproof walls, compact school or studio booth atmosphere",
    "Station Stairs Escalator": "Japanese station stairs and escalator background, Close view of stairs beside an escalator, handrails, tiled walls, station lighting, commuter flow atmosphere",
    "Elevator Interior": "Elevator interior background, Close view inside a modern elevator, metal walls, handrail, mirror panel, control buttons without readable text, clean confined atmosphere",
    "Department Store Rooftop": "Showa-era department store rooftop amusement park background, Small old rides, coin-operated children machines, railings, city view, worn nostalgic rooftop atmosphere",
    "Game Show Set": "Japanese TV game show set background, Contestant podiums, colorful panels, quiz board, bright studio lights, flashy entertainment atmosphere",
    "Luxury Limo Rear Seat": "Luxury limousine rear seat background, Spacious leather back seat, privacy divider, ambient lights, polished trim, champagne glasses without labels, elegant night ride atmosphere",
    "Meeting Room": "Modern meeting room background, Large conference table, chairs, wall monitor, whiteboard, glass partitions, clean office lighting",
    "Record Shop": "Record shop interior background, Rows of vinyl bins, album shelves with unreadable covers, listening counter, posters without readable text, warm indie shop atmosphere",
    "Street Live": "Street live performance in front of a closed shop shutter, Metal shutter close behind, microphone stand, guitar case, portable speaker, night street lights, background setting",
    "Command Room": "Operations command room background, Large central table, wall maps without readable text, monitors, radios, tactical boards, dim focused lighting, serious mission control atmosphere",
    "Gyudon Counter": "Japanese gyudon chain restaurant interior background, Eye-level view centered on a long counter, stools, kitchen area behind, menu boards without readable text",
    "Hamburger Shop": "Generic hamburger fast food restaurant interior background, Front counter, order registers, menu boards without readable text, booths and tray area, bright clean casual atmosphere, No brand logos",
    "Pop Diner": "Bright pop 1950s American diner interior background, Chrome counter, red and turquoise vinyl stools, colorful booths, jukebox, checker floor, cheerful retro atmosphere",
}
EFFECT_PRESET_CATEGORY = {
    "Realistic Photo": "Photo",
    "35mm Film": "Camera FX",
    "Cinematic Photo": "Photo",
    "Soft Portrait": "Photo",
    "Milky Portrait": "Photo",
    "Glow Portrait": "Photo",
    "B&W Soft": "Photo",
    "B&W Glow": "Photo",
    "B&W Strong": "Photo",
    "Film Noir": "Photo",
    "Noir Photo": "Photo",
    "Flash Photo": "Camera FX",
    "Direct Flash": "Camera FX",
    "Disposable Flash": "Camera FX",
    "Paparazzi Flash": "Camera FX",
    "Dark Flash": "Camera FX",
    "Red Eye Flash": "Camera FX",
    "Polaroid": "Camera FX",
    "Vintage Photo": "Photo",
    "Long Exposure": "Camera FX",
    "Directional Blur": "Camera FX",
    "Toy Camera": "Camera FX",
    "Lomography": "Camera FX",
    "Night Vision": "Camera FX",
    "Security Camera": "Camera FX",
    "Thermal Camera": "Camera FX",
    "Film Negative": "Camera FX",
    "VHS": "Camera FX",
    "Glitch Effect": "Camera FX",
    "Hex Tile": "Finish",
    "Kaleidoscope": "Finish",
    "HDR Photo": "Photo",
    "iPhone Photo": "Camera FX",
    "Flip Phone": "Camera FX",
    "Tilt-Shift": "Camera FX",
    "Lens Distortion": "Camera FX",
    "Fisheye Lens": "Camera FX",
    "Chromatic Aberration": "Camera FX",
    "Silhouette Photo": "Photo",
    "Glamour Photo": "Photo",
    "Landscape Photo": "Photo",
    "Street Photo": "Photo",
    "Beauty Photo": "Photo",
    "Editorial Portrait": "Photo",
    "Candid Portrait": "Photo",
    "Movie Still": "Photo",
    "Neon Noir": "Photo",
    "Action Still": "Photo",
    "Natural Light": "Light",
    "Studio Light": "Light",
    "Golden Hour": "Light",
    "Sunlight": "Light",
    "Side Light": "Light",
    "Backlight": "Light",
    "Top Light": "Light",
    "Low Sun": "Light",
    "Overhead Sun": "Light",
    "Light Rays": "Light",
    "Low Key": "Light",
    "High Key": "Light",
    "Neon Night": "Light",
    "Clear Sky": "Weather",
    "Cloudy": "Weather",
    "Rainy": "Weather",
    "Heavy Rain": "Weather",
    "After Rain": "Weather",
    "Foggy": "Weather",
    "Snowy": "Weather",
    "Stormy": "Weather",
    "Heat Haze": "Weather",
    "Product Photo": "Photo",
    "Food Photo": "Photo",
    "Fashion Editorial": "Photo",
    "Architecture": "Photo",
    "Interior Design": "Photo",
    "Anime Clean": "Art",
    "Anime Soft": "Art",
    "Anime in Photo": "Art",
    "Manga B&W": "Art",
    "Illustration": "Art",
    "Painterly": "Art",
    "Watercolor": "Art",
    "Oil Painting": "Art",
    "Comic": "Art",
    "Pixelate": "Art",
    "Concept Art": "Art",
    "Dreamy": "Mood",
    "Dark Fantasy": "Mood",
    "High Detail": "Mood",
    "Minimal Clean": "Mood",
    "Retro Pop": "Mood",
    "Paper Print": "Finish",
    "Matte Print": "Finish",
    "Glossy Print": "Finish",
    "Canvas Texture": "Finish",
    "Fabric Print": "Finish",
    "Metal Print": "Finish",
    "Glass Print": "Finish",
    "Glass Distortion": "Finish",
    "Wet Surface": "Finish",
    "Water Droplets": "Finish",
    "Dusty Surface": "Finish",
    "Fractal Noise": "Finish",
    "Scratched Print": "Finish",
    "Vintage Paper": "Finish",
    "Stone Surface": "Finish",
    "Marble Finish": "Finish",
    "Concrete Finish": "Finish",
    "Rusty Metal": "Finish",
    "Aged Metal": "Finish",
    "Patina Finish": "Finish",
    "Wood Grain": "Finish",
    "Leather Finish": "Finish",
    "Ceramic Glaze": "Finish",
    "Plastic Finish": "Finish",
    "Slime Finish": "Finish",
    "Gel Finish": "Finish",
    "Liquid Gloss": "Finish",
    "Gummy Finish": "Finish",
    "Wax Finish": "Finish",
    "Fantasy Color": "Color Theme",
    "Red Theme": "Color Theme",
    "Blue Theme": "Color Theme",
    "Pink Theme": "Color Theme",
    "Purple Theme": "Color Theme",
    "Green Theme": "Color Theme",
    "Yellow Theme": "Color Theme",
    "Orange Theme": "Color Theme",
    "Cyan Theme": "Color Theme",
    "Teal Theme": "Color Theme",
    "Magenta Theme": "Color Theme",
    "Warm Theme": "Color Theme",
    "Cool Theme": "Color Theme",
    "Pastel Theme": "Color Theme",
    "Neon Theme": "Color Theme",
    "Muted Theme": "Color Theme",
    "Monochrome Theme": "Color Theme",
    "Sepia Theme": "Color Theme",
    "Gold Theme": "Color Theme",
    "Silver Theme": "Color Theme",
    "Dark Theme": "Color Theme",
    "Bright Theme": "Color Theme",
    "Earth Theme": "Color Theme",
    "Cream Theme": "Color Theme",
    "Black & White": "Color Theme",
    "Crazy Color": "Color Theme",
    "Candy Color": "Color Theme",
    "Pop Color": "Color Theme",
    "Dreamy Color": "Color Theme",
    "Acid Color": "Color Theme",
    "Cyber Color": "Color Theme",
    "Rainbow Color": "Color Theme",
    "Holographic Color": "Color Theme",
    "Vaporwave Color": "Color Theme",
    "Stardust Fantasy": "Color Theme",
    "Shooting Star Fantasy": "Color Theme",
    "Galaxy Atmosphere": "Color Theme",
    "Aurora Mood": "Color Theme",
    "Dreamland Color": "Color Theme",
    "Heart Magic Color": "Color Theme",
    "Harajuku Decora Mood": "Color Theme",
    "Pastel Kawaii Mood": "Color Theme",
    "Pop Kawaii Color": "Color Theme",
    "Japanese Mood": "Color Theme",
    "Sakura Japan Color": "Color Theme",
    "Samurai Drama Color": "Color Theme",
    "Western Desert Color": "Color Theme",
    "Indian Festival Color": "Color Theme",
    "Arabian Night Color": "Color Theme",
    "Egyptian Gold Color": "Color Theme",
    "Chinese Lantern Color": "Color Theme",
    "Korean Pastel Color": "Color Theme",
    "Nordic Winter Color": "Color Theme",
    "Tropical Island Color": "Color Theme",
    "Virtual Diva Teal": "Color Theme",
    "Heterochromia Eyes": "Color Theme",
    "Classroom": "Background",
    "Train Interior": "Background",
    "Bus Interior": "Background",
    "Living Room": "Background",
    "Kitchen": "Background",
    "Bathroom": "Background",
    "Shower Room": "Background",
    "Bedroom": "Background",
    "Dining Room": "Background",
    "Modern Hotel": "Background",
    "Cafe": "Background",
    "Office": "Background",
    "Library": "Background",
    "Art Museum": "Background",
    "Gallery Room": "Background",
    "City Street": "Background",
    "Shopping Mall": "Background",
    "Airport": "Background",
    "Rooftop": "Background",
    "European Street": "Background",
    "Paris Street": "Background",
    "New York Street": "Background",
    "Street Snap": "Background",
    "Graffiti Wall": "Background",
    "Back Alley": "Background",
    "Underpass": "Background",
    "Night Street": "Background",
    "Industrial Street": "Background",
    "Convenience Store": "Background",
    "Japanese Room": "Background",
    "Forest Path": "Background",
    "Restaurant": "Background",
    "Bar": "Background",
    "School Hallway": "Background",
    "Gym Room": "Background",
    "Subway Station": "Background",
    "Supermarket": "Background",
    "Riverbank": "Background",
    "Harbor": "Background",
    "Greenhouse": "Background",
    "Kyoto Temple": "Background",
    "Beach": "Background",
    "Tropical Beach": "Background",
    "Ocean Cottage": "Background",
    "Beach Bungalow": "Background",
    "Resort Pool": "Background",
    "Public Pool": "Background",
    "Aquarium": "Background",
    "Ship Deck": "Background",
    "Factory Line": "Background",
    "Workshop": "Background",
    "Abandoned Building": "Background",
    "Ruins Interior": "Background",
    "Old Warehouse": "Background",
    "Fantasy Castle": "Background",
    "Magic Forest": "Background",
    "RPG Town": "Background",
    "Dungeon Hall": "Background",
    "Ancient Ruins": "Background",
    "MMO Field": "Background",
    "Rock Stage": "Background",
    "Idol Stage": "Background",
    "Rooftop Stage": "Background",
    "Beer Garden": "Background",
    "Live House": "Background",
    "Theater Stage": "Background",
    "Dance Studio": "Background",
    "Studio Plain": "Background",
    "Window Portrait": "Background",
    "Convenience Counter": "Background",
    "Photo Studio": "Background",
    "Retro Arcade": "Background",
    "Purikura Booth": "Background",
    "Girl Room": "Background",
    "Boy Room": "Background",
    "Family Living": "Background",
    "Harajuku Shop": "Background",
    "Traditional Tea Room": "Background",
    "Fireworks": "Background",
    "Summer Festival Stalls": "Background",
    "Painting Classroom": "Background",
    "School Infirmary": "Background",
    "Shrine Grounds": "Background",
    "Shopping Arcade": "Background",
    "Karaoke Room": "Background",
    "Family Restaurant": "Background",
    "School Rooftop": "Background",
    "Park Bench": "Background",
    "Hair Salon": "Background",
    "Old Sento": "Background",
    "Outdoor Onsen": "Background",
    "Station Rotary": "Background",
    "Railroad Crossing": "Background",
    "Convenience Store Front Close": "Background",
    "Wagashi Shop": "Background",
    "Ryokan Hallway": "Background",
    "Bus Stop": "Background",
    "Riverside": "Background",
    "Night Alley": "Background",
    "Hospital Waiting Room": "Background",
    "Hospital Room": "Background",
    "Coin Laundry": "Background",
    "Apartment Entrance": "Background",
    "School Festival Classroom": "Background",
    "Old Kissaten": "Background",
    "School Gym": "Background",
    "Ticket Gate Closeup": "Background",
    "Movie Theater Seats": "Background",
    "Drugstore": "Background",
    "Luxury Hotel Front": "Background",
    "Cheap Motel Front": "Background",
    "Airport Lobby": "Background",
    "Cherry Blossom Avenue": "Background",
    "Campsite": "Background",
    "Observation Deck": "Background",
    "Livehouse Dressing Room": "Background",
    "1970s Spaceship": "Background",
    "Western Saloon": "Background",
    "Western Swinging Doors": "Background",
    "Edo Nagaya": "Background",
    "Detective Office": "Background",
    "Pirate Ship Deck": "Background",
    "Medieval Castle Hall": "Background",
    "Interrogation Room": "Background",
    "News Studio": "Background",
    "1970s Drama Set": "Background",
    "Old Japanese Rural Village": "Background",
    "Track And Field Stadium": "Background",
    "Baseball Dugout": "Background",
    "Boxing Gym": "Background",
    "Concert Hall Piano": "Background",
    "Broadcast Room": "Background",
    "Station Stairs Escalator": "Background",
    "Elevator Interior": "Background",
    "Department Store Rooftop": "Background",
    "Game Show Set": "Background",
    "Luxury Limo Rear Seat": "Background",
    "Meeting Room": "Background",
    "Record Shop": "Background",
    "Street Live": "Background",
    "Command Room": "Background",
    "Gyudon Counter": "Background",
    "Hamburger Shop": "Background",
    "Pop Diner": "Background",
}

EFFECT_STYLE_BOOST_TEXT = {
    "Photo": "natural photo look, realistic lighting, real-world materials, camera-based detail",
    "Anime": "anime style, clean linework, cel-shaded color, illustrated character look",
}


def _normalize_style_boost(value):
    v = _clean(value).lower()
    if v == "photo":
        return "Photo"
    if v == "anime":
        return "Anime"
    return ""


def _append_style_boost(effect, style_boost):
    base = _clean(effect)
    boost = EFFECT_STYLE_BOOST_TEXT.get(_normalize_style_boost(style_boost), "")
    if not boost:
        return base
    if boost.lower() in base.lower():
        return base
    return f"{base}, {boost}" if base else boost

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
                "style_boost": ("STRING", {"default": "", "multiline": False, "dynamicPrompts": False}),
            }
        }

    # Keep effect_text as a compatibility output. Existing workflows may still have it connected.
    # The visible UI should use prompt_out for generation; effect_text is only the effect fragment.
    RETURN_TYPES = ("STRING", "STRING")
    RETURN_NAMES = ("prompt_out", "effect_text")
    FUNCTION = "execute"
    CATEGORY = "Krea2/BBOX Prompter Suite"

    def execute(self, prompt_in="", enable_effect=True, category="Photo", preset="Realistic Photo", mode="Preset", custom_preset="", style_boost=""):
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
            effect = _append_style_boost(effect, style_boost)
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


def _load_background_presets_from_json():
    presets = {}
    try:
        path = Path(__file__).resolve().parent / "web" / "background_presets.json"
        data = json.loads(path.read_text(encoding="utf-8-sig"))
    except Exception:
        return presets
    items = data if isinstance(data, list) else data.get("presets", []) if isinstance(data, dict) else []
    for item in items:
        if not isinstance(item, dict):
            continue
        name = _clean(item.get("name", ""))
        text = _clean(item.get("text", ""))
        if name and text:
            presets[name] = text
    return presets


BACKGROUND_PRESET_TEXT = _load_background_presets_from_json()


def _background_preset_names_from_web():
    if BACKGROUND_PRESET_TEXT:
        return set(BACKGROUND_PRESET_TEXT)
    names = set()
    try:
        js_path = Path(__file__).resolve().parent / "web" / "krea2_element_framing_v1.js"
        text = js_path.read_text(encoding="utf-8")
    except Exception:
        return names

    for match in re.finditer(r'\{\s*"name":\s*"([^"]+)"[\s\S]*?\n\s*\}', text):
        block = match.group(0)
        name = match.group(1)
        if '"category": "Background"' in block and name in EFFECT_PRESET_TEXT:
            names.add(name)
    return names


BACKGROUND_PRESET_NAMES = _background_preset_names_from_web()


class Krea2BackgroundEffect:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "prompt_in": _text(""),
                "enable_effect": ("BOOLEAN", {"default": True}),
                "category": ("STRING", {"default": "Background", "multiline": False, "dynamicPrompts": False}),
                "preset": ("STRING", {"default": "Classroom", "multiline": False, "dynamicPrompts": False}),
                "mode": ("STRING", {"default": "Preset", "multiline": False, "dynamicPrompts": False}),
                "custom_preset": _text("", multiline=True),
                "style_boost": ("STRING", {"default": "", "multiline": False, "dynamicPrompts": False}),
            }
        }

    RETURN_TYPES = ("STRING", "STRING")
    RETURN_NAMES = ("prompt_out", "background_text")
    FUNCTION = "execute"
    CATEGORY = "Krea2/BBOX Prompter Suite"

    def execute(self, prompt_in="", enable_effect=True, category="Background", preset="Classroom", mode="Preset", custom_preset="", style_boost=""):
        prompt_in = _clean(prompt_in)
        mode = _clean(mode) or "Preset"
        preset = _clean(preset)
        background = ""
        if enable_effect:
            if mode in ("Custom", "Custom Preset") or preset == "Custom Preset":
                background = _clean(custom_preset)
            elif preset and preset not in ("None", "(None)") and preset in BACKGROUND_PRESET_NAMES:
                background = _clean(BACKGROUND_PRESET_TEXT.get(preset) or EFFECT_PRESET_TEXT.get(preset, ""))
        if prompt_in and background:
            out = f"{prompt_in}\n{background}"
        else:
            out = prompt_in or background
        return (out, background)

    @classmethod
    def IS_CHANGED(cls, *args, **kwargs):
        payload = json.dumps([args, kwargs], ensure_ascii=False, sort_keys=True)
        return hashlib.sha256(payload.encode("utf-8")).hexdigest()


NODE_CLASS_MAPPINGS = {
    "Krea2ElementFramingV1Canvas": Krea2ElementFramingV1Canvas,
    "Krea2ElementFramingV1Prompt": Krea2ElementFramingV1Prompt,
    "Krea2ElementJSONExportV1": Krea2ElementJSONExportV1,
    "Krea2BBOXPromptEffect": Krea2BBOXPromptEffect,
    "Krea2BackgroundEffect": Krea2BackgroundEffect,
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "Krea2ElementFramingV1Canvas": "📐 Krea2 BBOX Canvas",
    "Krea2ElementFramingV1Prompt": "📝 Krea2 BBOX Prompter",
    "Krea2ElementJSONExportV1": "📦 Krea2 BBOX Export",
    "Krea2BBOXPromptEffect": "✨ Krea2 BBOX Prompt Effect",
    "Krea2BackgroundEffect": "🌄 Krea2 Background Effect",
}
