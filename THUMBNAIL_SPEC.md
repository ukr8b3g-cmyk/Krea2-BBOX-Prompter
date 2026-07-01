# Thumbnail Specification

This repository uses local WebP thumbnails for the `✨ Krea2 BBOX Prompt Effect` preset gallery.

## Scope of this package

This ZIP only organizes the thumbnail file structure and documentation. It does not change the node UI sizing or Python/JavaScript behavior.

## Folder layout

```text
Krea2-BBOX-Prompter-Suite/
├─ web/
│  ├─ krea2_element_framing_v1.js
│  └─ thumbnails/
│     ├─ manifest.json
│     ├─ realistic_photo.webp
│     ├─ 35mm_film.webp
│     ├─ cinematic_photo.webp
│     └─ ...
└─ docs/
   └─ thumbnail_preview_contact_sheet.jpg
```

## Runtime path

The browser should load thumbnails from the local ComfyUI extension path:

```text
/extensions/Krea2-BBOX-Prompter/thumbnails/<file>.webp
/extensions/Krea2-BBOX-Prompter-Suite/thumbnails/<file>.webp
```

The UI tries both folder-name variants so thumbnails can load from installs named either `Krea2-BBOX-Prompter` or `Krea2-BBOX-Prompter-Suite`.

Do not fetch thumbnail images from GitHub raw URLs or external CDNs at runtime.

## Image format

```text
Format: WebP
Generated source size: larger than final display, cropped/downscaled to 192 x 128 px
Final thumbnail size: 192 x 128 px
Aspect ratio: 3:2
Recommended file size: 5-40 KB per image
Total target size: keep under ~1-2 MB when practical
```

## Display target

The intended visual direction is a compact Easy-Use-like gallery, but with original thumbnails.

```text
Card width: about 92-100 px
Thumbnail display width: about 80-92 px
Thumbnail display height: about 54-64 px
Label: one line, two lines maximum
Prompt text: do not show inside the card; show in a selected-preset preview area
```

## Naming rule

Use snake_case filenames derived from preset names.

Examples:

```text
Realistic Photo     -> realistic_photo.webp
35mm Film           -> 35mm_film.webp
Cinematic Photo     -> cinematic_photo.webp
B&W Soft            -> bandw_soft.webp
B&W Strong          -> bandw_strong.webp
Flash Photo         -> flash_photo.webp
Disposable Flash    -> disposable_flash.webp
Paparazzi Flash     -> paparazzi_flash.webp
Product Photo       -> product_photo.webp
Interior Design     -> interior_design.webp
Dark Fantasy        -> dark_fantasy.webp
```

## Manifest

`web/thumbnails/manifest.json` maps preset names to local thumbnail files. Codex should keep this synchronized when adding or replacing thumbnails.

Example:

```json
{
  "Realistic Photo": "realistic_photo.webp",
  "35mm Film": "35mm_film.webp"
}
```

## Visual direction

Use category-specific images, not a repeated cat mascot or copied Easy Use imagery.

Recommended subjects:

```text
Photo: realistic portrait, film street, cinematic night, black-and-white portrait
Flash: flash portrait, disposable camera snapshot, paparazzi night flash
Commercial: product bottle, food plate, architecture, interior room
Art: anime-style original character, watercolor landscape, dark fantasy castle, neon/cyberpunk street
Mood: silhouette sunset, vintage portrait, dreamy light, dark scene
```

Avoid:

```text
- Text inside thumbnail images
- Logos
- Watermarks
- Brand marks
- Real identifiable people
- Copying Easy Use cat thumbnails
```

## Fallback behavior

If a thumbnail file is missing, the node should fall back to the existing text/gradient card instead of failing.
