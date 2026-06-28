# Thumbnail Specification

Prompt Effect thumbnails are local WebP files used by `✨ Krea2 BBOX Prompt Effect`.

## Folder

```text
web/thumbnails/
```

## File format

```text
.webp
```

## Size

Recommended source size:

```text
192 x 128 px
```

UI display size:

```text
80-92 px wide
```

Recommended card width:

```text
100-112 px
```

## Naming

Use snake_case based on the preset name.

Examples:

```text
realistic_photo.webp
35mm_film.webp
cinematic_photo.webp
bw_soft.webp
bw_strong.webp
flash_photo.webp
direct_flash.webp
disposable_flash.webp
paparazzi_flash.webp
product_photo.webp
food_photo.webp
anime_clean.webp
dark_fantasy.webp
```

The current implementation uses `bandw_soft.webp` and `bandw_strong.webp` for compatibility with the existing manifest.

## Manifest

File:

```text
web/thumbnails/manifest.json
```

Example entry:

```json
{
  "name": "35mm Film",
  "file": "35mm_film.webp",
  "category": "Photo",
  "chip": "Film",
  "tone": "film"
}
```

## Visual direction

Use category-specific thumbnails rather than copying Easy Use's cat-based motif.

Recommended subject direction:

```text
Photo: portraits, street scenes, film-like scenes
Flash: direct-flash portraits and party snapshots
Commercial: products, food, architecture, interiors
Art: original anime-like character, watercolor landscape, painterly scene
Light: lighting-focused portrait or environment
Mood: silhouette, dark fantasy, dreamy, vintage
```

## Avoid

```text
- No cats as the universal motif
- No copied Easy Use style assets
- No text inside the image
- No logos
- No watermarks
- No brand marks
- No external URL dependency
```

## Fallback behavior

If a thumbnail file is missing, the UI should fall back to the old gradient/text card.

## Replacement policy

The included thumbnails are test-stage placeholders. They can be replaced before public release as long as filenames and manifest entries stay consistent.
