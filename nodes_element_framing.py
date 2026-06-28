import json
import hashlib
from math import gcd

MAX_RESOLUTION = 16384
REGIONS = ("red", "blue", "yellow", "green", "magenta")
ELEMENT_TYPES = ("obj", "text")
FRAMING_OPTIONS = (
    "Auto",
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
EMPTY_LAYOUT_DATA = '{"boxes":[]}'
EMPTY_CAMERA_DATA = '{"iso":"","shutter":"","aperture":"","focal_length":""}'
EMPTY_SET_DATA = '{"sets":[],"selected":""}'
EMPTY_PROMPT_UI_DATA = ''

PRESET_SIZES = {
    "1024 x 1024": (1024, 1024),
    "1536 x 1536": (1536, 1536),
    "2048 x 2048": (2048, 2048),
    "1024 x 1536": (1024, 1536),
    "1152 x 1536": (1152, 1536),
    "1536 x 2048": (1536, 2048),
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


def _append_framing_hint(desc, framing):
    desc = _clean(desc)
    framing = _normalize_framing(framing)
    hint = _clean(FRAMING_DESC_MAP.get(framing, ""))
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
                    "1024 x 1024", "1536 x 1536", "2048 x 2048", "1024 x 1536", "1152 x 1536",
                    "1536 x 2048", "1536 x 1024", "1536 x 1152", "2048 x 1536", "Custom"
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
            }
        }

    RETURN_TYPES = ("KREA2_ELEMENT_PROMPT_DATA",)
    RETURN_NAMES = ("prompt_ui_data",)
    FUNCTION = "execute"
    CATEGORY = "Krea2/BBOX Prompter Suite"

    def execute(self, scene, background, red_prompt, blue_prompt, yellow_prompt, green_prompt, magenta_prompt,
                red_type="obj", blue_type="obj", yellow_type="obj", green_type="obj", magenta_type="obj",
                prompt_ui_data="", red_framing="Auto", blue_framing="Auto", yellow_framing="Auto",
                green_framing="Auto", magenta_framing="Auto"):
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


EFFECT_CATEGORIES = ('All', 'Photo', 'Art', 'Light', 'Mood', 'Custom', 'Custom Preset', 'Photo Look', 'Base Style', 'Portrait', 'Cinematic', 'Illustration', 'Lighting', 'Commercial')
EFFECT_PRESETS = (
    'None',
    'Custom Preset',
    'Realistic Photo',
    '35mm Film',
    'Cinematic Photo',
    'Soft Portrait',
    'B&W Soft',
    'B&W Strong',
    'Film Noir',
    'Noir Photo',
    'Flash Photo',
    'Direct Flash',
    'Disposable Flash',
    'Paparazzi Flash',
    'Polaroid',
    'Vintage Photo',
    'Long Exposure',
    'HDR Photo',
    'iPhone Photo',
    'Tilt-Shift',
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
    'Concept Art',
    'Dreamy',
    'Dark Fantasy',
    'High Detail',
    'Minimal Clean',
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
    'B&W Soft': 'soft black and white photography, monochrome grayscale tones, no color, gentle contrast, soft film grain, natural skin texture',
    'B&W Strong': 'strong black and white photography, monochrome grayscale tones, no color, high contrast, deep blacks, bright whites, dramatic film grain',
    'Film Noir': 'film noir photography, black and white tones, dramatic shadows, low-key lighting, high contrast, mysterious cinematic atmosphere',
    'Noir Photo': 'modern noir photography, monochrome contrast, deep shadows, sharp highlights, moody urban cinematic lighting',
    'Flash Photo': 'on-camera flash photography, bright direct flash, sharp subject edges, crisp shadows, candid snapshot realism, natural skin texture',
    'Direct Flash': 'direct flash photo, hard frontal light, crisp shadows, strong highlights, candid party snapshot look, realistic skin texture',
    'Disposable Flash': 'disposable camera flash photo, harsh frontal flash, casual snapshot framing, film grain, imperfect exposure, nostalgic realism',
    'Paparazzi Flash': 'paparazzi flash photography, strong camera flash, dark background, sharp highlights, candid celebrity street photo atmosphere',
    'Polaroid': 'instant polaroid photo look, soft focus, muted colors, slight overexposure, nostalgic film texture, casual snapshot framing',
    'Vintage Photo': 'vintage photograph look, faded tones, subtle film grain, soft contrast, nostalgic atmosphere, natural imperfections',
    'Long Exposure': 'long exposure photography, motion blur trails, smooth light streaks, stable subject focus, atmospheric night photo look',
    'HDR Photo': 'HDR photography, wide dynamic range, crisp detail, balanced highlights and shadows, realistic textures, clear photo quality',
    'iPhone Photo': 'iPhone-style photo, natural phone camera look, realistic exposure, casual framing, sharp details, authentic everyday snapshot',
    'Tilt-Shift': 'tilt-shift photography, selective focus, miniature-like depth, soft blurred edges, crisp central subject, stylized photo realism',
    'Silhouette Photo': 'silhouette photography, dark subject outline, bright backlight, strong contrast, minimal visible detail, dramatic graphic composition',
    'Glamour Photo': 'glamour photography, polished lighting, smooth highlights, refined skin texture, stylish pose, clean magazine-quality finish',
    'Landscape Photo': 'landscape photography, natural atmosphere, deep depth of field, realistic lighting, detailed environment, balanced composition',
    'Street Photo': 'street photography, candid realism, natural light, authentic urban atmosphere, documentary-style composition, realistic detail',
    'Beauty Photo': 'beauty photography, clean skin detail, flattering light, refined makeup, soft highlights, premium portrait finish',
    'Editorial Portrait': 'editorial portrait photography, refined styling, confident pose, polished lighting, magazine composition, clean detailed skin texture',
    'Candid Portrait': 'candid portrait photography, natural expression, realistic lighting, authentic moment, soft background, clean subject detail',
    'Movie Still': 'movie still photography, cinematic framing, realistic production lighting, controlled contrast, atmospheric depth, detailed film scene',
    'Neon Noir': 'neon noir photography, dark urban atmosphere, colored neon highlights, moody shadows, cinematic contrast, rain-slick reflections',
    'Action Still': 'cinematic action still, dynamic composition, dramatic motion, controlled lighting, sharp subject focus, high-energy film atmosphere',
    'Natural Light': 'natural daylight photography, soft realistic shadows, balanced exposure, authentic atmosphere, gentle color rendering',
    'Studio Light': 'professional studio lighting, clean softbox illumination, controlled shadows, sharp details, polished photographic look',
    'Golden Hour': 'golden hour lighting, warm sunlight, soft long shadows, glowing highlights, cinematic natural atmosphere',
    'Low Key': 'low-key photography, dark background, controlled highlights, deep shadows, dramatic contrast, focused subject lighting',
    'High Key': 'high-key photography, bright clean lighting, soft shadows, airy white background, gentle contrast, polished look',
    'Neon Night': 'neon night lighting, colorful urban glow, reflective highlights, cinematic contrast, atmospheric dark background',
    'Cyberpunk': 'cyberpunk visual style, neon lights, futuristic city atmosphere, high contrast, saturated reflections, moody lighting',
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
    'Concept Art': 'concept art style, detailed environment design, cinematic lighting, strong composition, polished production artwork',
    'Dreamy': 'dreamy visual atmosphere, soft glow, gentle contrast, subtle haze, delicate highlights, calm emotional mood',
    'Dark Fantasy': 'dark fantasy atmosphere, dramatic shadows, mysterious lighting, ornate details, moody cinematic composition',
    'High Detail': 'highly detailed image, crisp textures, sharp subject definition, refined materials, clean lighting, intricate visual detail',
    'Minimal Clean': 'minimal clean style, simple composition, uncluttered background, balanced spacing, refined modern visual presentation',
    'Retro Pop': 'retro pop style, bold color palette, graphic shapes, playful composition, clean vintage-inspired visual design',
    'Black White': 'strong black and white photography, monochrome grayscale tones, no color, achromatic, high contrast, deep blacks, bright whites, dramatic film grain',
    'Realistic': 'photorealistic image, natural lighting, realistic skin texture, lifelike details, accurate materials, clean high-resolution photo quality',
    'Cinematic': 'cinematic film still, dramatic lighting, controlled contrast, strong depth, realistic atmosphere, detailed composition, filmic photo look',
}
EFFECT_PRESET_CATEGORY = {
    'None': 'All',
    'Realistic Photo': 'Photo',
    '35mm Film': 'Photo',
    'Cinematic Photo': 'Photo',
    'Soft Portrait': 'Photo',
    'B&W Soft': 'Photo',
    'B&W Strong': 'Photo',
    'Film Noir': 'Photo',
    'Noir Photo': 'Photo',
    'Flash Photo': 'Photo',
    'Direct Flash': 'Photo',
    'Disposable Flash': 'Photo',
    'Paparazzi Flash': 'Photo',
    'Polaroid': 'Photo',
    'Vintage Photo': 'Photo',
    'Long Exposure': 'Photo',
    'HDR Photo': 'Photo',
    'iPhone Photo': 'Photo',
    'Tilt-Shift': 'Photo',
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
    'Concept Art': 'Art',
    'Dreamy': 'Mood',
    'Dark Fantasy': 'Mood',
    'High Detail': 'Mood',
    'Minimal Clean': 'Mood',
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
    "Krea2PromptEffect": Krea2PromptEffect,
    "Krea2BBOXPromptEffect": Krea2BBOXPromptEffect,
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "Krea2ElementFramingV1Canvas": "📐 Krea2 BBOX Canvas",
    "Krea2ElementFramingV1Prompt": "📝 Krea2 BBOX Prompter",
    "Krea2ElementJSONExportV1": "📦 Krea2 BBOX Export",
    "Krea2PromptEffect": "✨ Krea2 Prompt Effect",
    "Krea2BBOXPromptEffect": "✨ Krea2 BBOX Prompt Effect",
}
