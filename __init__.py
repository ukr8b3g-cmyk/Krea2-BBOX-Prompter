import json
from pathlib import Path

from .nodes_element_framing import NODE_CLASS_MAPPINGS, NODE_DISPLAY_NAME_MAPPINGS

WEB_DIRECTORY = './web'

_PRESET_DIR = Path(__file__).resolve().parent / "user_presets"
_EFFECT_PRESET_FILE = _PRESET_DIR / "prompt_effect_custom_presets.json"
_MAX_NAME_LEN = 80
_MAX_TEXT_LEN = 12000


def _safe_effect_presets():
    try:
        data = json.loads(_EFFECT_PRESET_FILE.read_text(encoding="utf-8"))
    except FileNotFoundError:
        return []
    except Exception:
        return []
    if not isinstance(data, list):
        return []
    out = []
    for item in data:
        if not isinstance(item, dict):
            continue
        name = str(item.get("name") or "").strip()[:_MAX_NAME_LEN]
        text = str(item.get("text") or "").strip()[:_MAX_TEXT_LEN]
        if name and text:
            out.append({"name": name, "text": text})
    return out


def _write_effect_presets(presets):
    _PRESET_DIR.mkdir(parents=True, exist_ok=True)
    tmp = _EFFECT_PRESET_FILE.with_suffix(".json.tmp")
    tmp.write_text(json.dumps(presets, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    tmp.replace(_EFFECT_PRESET_FILE)


try:
    from aiohttp import web
    from server import PromptServer

    @PromptServer.instance.routes.get("/krea2_bbox_prompt_effect/custom_presets")
    async def krea2_get_custom_effect_presets(request):
        return web.json_response({
            "presets": _safe_effect_presets(),
            "path": str(_EFFECT_PRESET_FILE),
        })

    @PromptServer.instance.routes.post("/krea2_bbox_prompt_effect/custom_presets")
    async def krea2_save_custom_effect_preset(request):
        body = await request.json()
        name = str(body.get("name") or "").strip()[:_MAX_NAME_LEN]
        text = str(body.get("text") or "").strip()[:_MAX_TEXT_LEN]
        if not name or not text:
            return web.json_response({"error": "name and text are required"}, status=400)
        presets = [p for p in _safe_effect_presets() if p["name"] != name]
        presets.append({"name": name, "text": text})
        presets.sort(key=lambda p: p["name"].lower())
        _write_effect_presets(presets)
        return web.json_response({
            "presets": presets,
            "path": str(_EFFECT_PRESET_FILE),
        })

    @PromptServer.instance.routes.post("/krea2_bbox_prompt_effect/custom_presets/delete")
    async def krea2_delete_custom_effect_preset(request):
        body = await request.json()
        name = str(body.get("name") or "").strip()
        presets = [p for p in _safe_effect_presets() if p["name"] != name]
        _write_effect_presets(presets)
        return web.json_response({
            "presets": presets,
            "path": str(_EFFECT_PRESET_FILE),
        })
except Exception:
    pass


__all__ = ['NODE_CLASS_MAPPINGS', 'NODE_DISPLAY_NAME_MAPPINGS', 'WEB_DIRECTORY']
