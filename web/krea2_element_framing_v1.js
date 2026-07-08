const { app } = window.comfyAPI.app;
window.__k2efFramingV1Build = "v1_element_framing_angle_card_20260629";

const CANVAS_NODE = "Krea2ElementFramingV1Canvas";
const PROMPT_NODE = "Krea2ElementFramingV1Prompt";
let k2cfPyssssAutocompletePromise = null;

function k2cfLoadPyssssAutocomplete() {
  if (!k2cfPyssssAutocompletePromise) {
    const urls = [
      "/extensions/comfyui-custom-scripts/js/common/autocomplete.js",
      "/extensions/ComfyUI-Custom-Scripts/js/common/autocomplete.js"
  ];
    k2cfPyssssAutocompletePromise = urls.reduce(
      (promise, url) => promise.catch(() => import(url)),
      Promise.reject()
    ).catch((err) => {
      console.info("[Krea2 BBOX] ComfyUI-Custom-Scripts autocomplete is not available.", err);
      return null;
    });
  }
  return k2cfPyssssAutocompletePromise;
}

function k2cfAttachPyssssAutocomplete(textarea) {
  if (!textarea || textarea.__k2cfPyssssAutocomplete) return;
  textarea.__k2cfPyssssAutocomplete = "pending";
  k2cfLoadPyssssAutocomplete().then((mod) => {
    if (!mod?.TextAreaAutoComplete) {
      textarea.__k2cfPyssssAutocomplete = false;
      return;
    }
    new mod.TextAreaAutoComplete(textarea);
    textarea.__k2cfPyssssAutocomplete = true;
  }).catch((err) => {
    textarea.__k2cfPyssssAutocomplete = false;
    console.warn("[Krea2 BBOX] Failed to attach autocomplete.", err);
  });
}
// Prompt Effect display preset catalog; duplicate legacy aliases are backend-only.
window.KREA2_BBOX_EFFECT_PRESETS_RESTORED = [
  {
    "name": "Realistic Photo",
    "category": "Photo",
    "chip": "Real",
    "tone": "photo-look",
    "text": "photorealistic image, natural lighting, realistic skin texture, lifelike details, accurate materials, clean high-resolution photo quality"
  },
  {
    "name": "35mm Film",
    "category": "Camera FX",
    "chip": "Film",
    "tone": "camera-fx",
    "text": "analog 35mm film photo, visible film grain, subtle halation, natural color, soft contrast, realistic skin texture"
  },
  {
    "name": "Cinematic Photo",
    "category": "Photo",
    "chip": "Cine",
    "tone": "cine",
    "text": "cinematic film still, dramatic lighting, controlled contrast, strong depth, realistic atmosphere, detailed composition, filmic photo look"
  },
  {
    "name": "Soft Portrait",
    "category": "Photo",
    "chip": "Port",
    "tone": "portrait",
    "text": "soft portrait photography, flattering natural light, natural skin texture, shallow depth of field, gentle contrast, clean facial details"
  },
  {
    "name": "Milky Portrait",
    "category": "Photo",
    "chip": "Milky",
    "tone": "portrait",
    "text": "white milky tone, pale milky cream palette with soft portrait photography, natural soft skin texture, shallow depth of field, gentle contrast, smooth tonal gradation, clean facial details, delicate calm mood"
  },
  {
    "name": "Glow Portrait",
    "category": "Photo",
    "chip": "Glow",
    "tone": "portrait",
    "text": "dreamy photographic atmosphere, soft milky cream palette, soft portrait photography, natural soft skin texture, shallow depth of field, gentle contrast, smooth tonal gradation, clean facial details, luminous soft glow, soft radiant highlights, airy subtle haze, gentle bloom effect, calm realistic emotional mood, flash, illuminated subject, crisp catchlight,"
  },
  {
    "name": "B&W Soft",
    "category": "Photo",
    "chip": "B&W Soft",
    "tone": "bw",
    "text": "soft black and white photography, monochrome grayscale tones, no color, gentle contrast, soft film grain, natural skin texture"
  },
  {
    "name": "B&W Glow",
    "category": "Photo",
    "chip": "B&W Glow",
    "tone": "bw",
    "thumbnail": "bandw_glow.webp",
    "text": "pure black and white glow portrait, monochrome grayscale photography, no color, soft monochrome tones, luminous soft glow, flash, illuminated subject, crisp catchlight, bright gentle highlights, natural soft skin texture, shallow depth of field, gentle contrast, smooth tonal gradation, clean facial details, airy subtle haze, calm realistic emotional mood"
  },
  {
    "name": "B&W Strong",
    "category": "Photo",
    "chip": "B&W Strong",
    "tone": "bw",
    "text": "strong black and white photography, monochrome grayscale tones, no color, high contrast, deep blacks, bright whites, dramatic film grain"
  },
  {
    "name": "Film Noir",
    "category": "Photo",
    "chip": "Film Noir",
    "tone": "bw",
    "text": "film noir photography, black and white tones, dramatic shadows, low-key lighting, high contrast, mysterious cinematic atmosphere"
  },
  {
    "name": "Noir Photo",
    "category": "Photo",
    "chip": "Noir",
    "tone": "bw",
    "text": "modern noir photography, monochrome contrast, deep shadows, sharp highlights, moody urban cinematic lighting"
  },
  {
    "name": "Flash Photo",
    "category": "Camera FX",
    "chip": "Flash",
    "tone": "camera-fx",
    "text": "flash photo, light to medium on-camera flash, clear illuminated subject, crisp catchlight, natural surroundings, balanced shadows, casual photographic snapshot realism"
  },
  {
    "name": "Direct Flash",
    "category": "Camera FX",
    "chip": "Direct",
    "tone": "camera-fx",
    "text": "direct flash photo, frontal camera flash, clear subject illumination, crisp highlights, visible catchlight, balanced contrast, sharp casual photographic look"
  },
  {
    "name": "Disposable Flash",
    "category": "Camera FX",
    "chip": "Disposable",
    "tone": "camera-fx",
    "text": "disposable camera flash photo, casual point-and-shoot look, medium frontal flash, slight film grain, natural snapshot framing, imperfect but realistic camera texture"
  },
  {
    "name": "Paparazzi Flash",
    "category": "Camera FX",
    "chip": "Paparazzi",
    "tone": "camera-fx",
    "text": "paparazzi flash photography, strong camera flash burst, candid subject illumination, crisp highlights, energetic snapshot feeling, press-photo style realism"
  },
  {
    "name": "Dark Flash",
    "category": "Camera FX",
    "chip": "DF",
    "tone": "Flash",
    "thumbnail": "dark_flash.webp",
    "text": "dark flash photo, on-camera flash in a low-light environment, illuminated foreground subject, deeper surrounding shadows, grainy high ISO texture, dramatic snapshot realism"
  },
  {
    "name": "Red Eye Flash",
    "category": "Camera FX",
    "chip": "RE",
    "tone": "Flash",
    "thumbnail": "red_eye_flash.webp",
    "text": "red-eye flash photo effect, on-camera flash causing visible red pupils, direct frontal flash, snapshot realism, strong catchlight, photographic camera artifact"
  },
  {
    "name": "Polaroid",
    "category": "Camera FX",
    "chip": "Pola",
    "tone": "camera-fx",
    "text": "instant polaroid photo look, soft focus, muted colors, slight overexposure, nostalgic film texture, casual snapshot framing"
  },
  {
    "name": "Vintage Photo",
    "category": "Photo",
    "chip": "Vintage",
    "tone": "film",
    "text": "vintage photograph look, faded tones, subtle film grain, soft contrast, nostalgic atmosphere, natural imperfections"
  },
  {
    "name": "Long Exposure",
    "category": "Camera FX",
    "chip": "Long",
    "tone": "camera-fx",
    "text": "long exposure photography, motion blur trails, smooth light streaks, stable subject focus, atmospheric night photo look"
  },
  {
    "name": "Directional Blur",
    "category": "Camera FX",
    "chip": "DB",
    "tone": "Motion",
    "thumbnail": "directional_blur.webp",
    "text": "directional blur effect, one-way motion streaks, fast moving photographic smear, dynamic speed lines, realistic camera motion atmosphere"
  },
  {
    "name": "Toy Camera",
    "category": "Camera FX",
    "chip": "Toy",
    "tone": "camera-fx",
    "text": "toy camera photo, plastic lens softness, strong vignette, imperfect focus, saturated colors, playful lo-fi snapshot look"
  },
  {
    "name": "Lomography",
    "category": "Camera FX",
    "chip": "Lomo",
    "tone": "camera-fx",
    "text": "lomography photo, vivid saturated colors, heavy vignette, cross-processed film tones, high contrast, spontaneous analog snapshot style"
  },
  {
    "name": "Night Vision",
    "category": "Camera FX",
    "chip": "Night",
    "tone": "camera-fx",
    "text": "night vision camera footage, green monochrome image, infrared glow, high noise, low-light surveillance look, harsh electronic contrast"
  },
  {
    "name": "Security Camera",
    "category": "Camera FX",
    "chip": "CCTV",
    "tone": "camera-fx",
    "text": "security camera footage, fixed wide-angle view, low-resolution video look, surveillance camera feel, flat lighting, documentary realism"
  },
  {
    "name": "Thermal Camera",
    "category": "Camera FX",
    "chip": "Thermal",
    "tone": "camera-fx",
    "text": "thermal camera image, false-color heatmap palette, glowing warm subjects, cooler surrounding tones, infrared temperature-vision look"
  },
  {
    "name": "Film Negative",
    "category": "Camera FX",
    "chip": "Neg",
    "tone": "camera-fx",
    "text": "film negative look, inverted colors, cyan and orange reversed tones, high contrast negative film scan, surreal photographic inversion"
  },
  {
    "name": "VHS",
    "category": "Camera FX",
    "chip": "VHS",
    "tone": "camera-fx",
    "text": "VHS camcorder footage, analog video noise, scan lines, color bleed, soft low-resolution image, dated home-video recording look"
  },
  {
    "name": "Glitch Effect",
    "category": "Camera FX",
    "chip": "GE",
    "tone": "Digital",
    "thumbnail": "glitch_effect.webp",
    "text": "glitch effect, digital noise artifacts, horizontal and vertical pixel distortion, RGB channel shift, broken video signal, corrupted scan lines, photographic digital error atmosphere"
  },
  {
    "name": "Hex Tile",
    "category": "Finish",
    "chip": "HT",
    "tone": "Finish",
    "thumbnail": "hex_tile.webp",
    "text": "hex tile pattern, repeating honeycomb geometry, subtle tiled surface texture, photographic material detail, clean real-world patterned background"
  },
  {
    "name": "Kaleidoscope",
    "category": "Finish",
    "chip": "KA",
    "tone": "Pattern",
    "thumbnail": "kaleidoscope.webp",
    "text": "kaleidoscope pattern effect, mirrored repeating geometric shapes, colorful symmetrical background mood, photographic color texture, abstract real-world surface feel"
  },
  {
    "name": "HDR Photo",
    "category": "Photo",
    "chip": "HDR",
    "tone": "photo-look",
    "text": "HDR photography, wide dynamic range, crisp detail, balanced highlights and shadows, realistic textures, clear photo quality"
  },
  {
    "name": "iPhone Photo",
    "category": "Camera FX",
    "chip": "Phone",
    "tone": "camera-fx",
    "text": "iPhone-style photo, natural phone camera look, realistic exposure, casual framing, sharp details, authentic everyday snapshot"
  },
  {
    "name": "Flip Phone",
    "category": "Camera FX",
    "chip": "Flip",
    "tone": "camera-fx",
    "thumbnail": "flip_phone.webp",
    "text": "flip phone camera photo, early 2000s low-resolution mobile snapshot, tiny sensor noise, JPEG compression artifacts, chroma noise, soft blur, mild defocus, imperfect focus, low contrast, muted colors, slight color shift, uneven white balance, casual accidental snapshot feel"
  },
  {
    "name": "Tilt-Shift",
    "category": "Camera FX",
    "chip": "Tilt",
    "tone": "camera-fx",
    "text": "tilt-shift photography, selective focus, miniature-like depth, soft blurred edges, crisp central subject, stylized photo realism"
  },
  {
    "name": "Lens Distortion",
    "category": "Camera FX",
    "chip": "LD",
    "tone": "Lens",
    "thumbnail": "lens_distortion.webp",
    "text": "lens distortion effect, subtle barrel distortion, warped edges, imperfect optical lens look, photographic camera artifact, real-world wide lens feel"
  },
  {
    "name": "Fisheye Lens",
    "category": "Camera FX",
    "chip": "FE",
    "tone": "Lens",
    "thumbnail": "fisheye_lens.webp",
    "text": "fisheye lens effect, strong barrel distortion, curved wide-angle perspective, bulging center, warped edges, photographic ultra-wide lens look, real-world camera artifact"
  },
  {
    "name": "Chromatic Aberration",
    "category": "Camera FX",
    "chip": "CA",
    "tone": "Lens",
    "thumbnail": "chromatic_aberration.webp",
    "text": "chromatic aberration effect, subtle red cyan edge fringing, RGB color separation, optical lens artifact, photographic digital color shift"
  },
  {
    "name": "Silhouette Photo",
    "category": "Photo",
    "chip": "Sil",
    "tone": "photo-look",
    "text": "silhouette photography, dark realistic subject outline, bright backlight, strong contrast, minimal visible detail, dramatic photographic composition"
  },
  {
    "name": "Glamour Photo",
    "category": "Photo",
    "chip": "Glam",
    "tone": "portrait",
    "text": "glamour photography, polished lighting, smooth highlights, refined skin texture, stylish pose, clean magazine-quality finish"
  },
  {
    "name": "Landscape Photo",
    "category": "Photo",
    "chip": "Land",
    "tone": "photo-look",
    "text": "landscape photography, natural atmosphere, deep depth of field, realistic lighting, detailed environment, balanced composition"
  },
  {
    "name": "Street Photo",
    "category": "Photo",
    "chip": "Street",
    "tone": "photo-look",
    "text": "street photography, candid realism, natural light, authentic urban atmosphere, documentary-style composition, realistic detail"
  },
  {
    "name": "Beauty Photo",
    "category": "Photo",
    "chip": "Beauty",
    "tone": "portrait",
    "text": "beauty photography, clean skin detail, flattering light, refined makeup, soft highlights, premium portrait finish"
  },
  {
    "name": "Editorial Portrait",
    "category": "Photo",
    "chip": "Edit",
    "tone": "portrait",
    "text": "editorial portrait photography, refined styling, confident pose, polished lighting, magazine composition, clean detailed skin texture"
  },
  {
    "name": "Candid Portrait",
    "category": "Photo",
    "chip": "Candid",
    "tone": "portrait",
    "text": "candid portrait photography, natural expression, realistic lighting, authentic moment, soft background, clean subject detail"
  },
  {
    "name": "Movie Still",
    "category": "Photo",
    "chip": "Movie",
    "tone": "cine",
    "text": "movie still photography, cinematic framing, realistic production lighting, controlled contrast, atmospheric depth, detailed film scene"
  },
  {
    "name": "Neon Noir",
    "category": "Photo",
    "chip": "Neon",
    "tone": "cine",
    "text": "neon noir photography, dark realistic urban atmosphere, colored neon highlights, moody shadows, cinematic contrast, rain-slick real-world reflections"
  },
  {
    "name": "Action Still",
    "category": "Photo",
    "chip": "Action",
    "tone": "cinematic",
    "text": "cinematic action still, dynamic composition, realistic motion energy, controlled lighting, sharp subject focus, high-energy film atmosphere"
  },
  {
    "name": "Natural Light",
    "category": "Light",
    "chip": "Light",
    "tone": "lighting",
    "text": "natural daylight photography, soft realistic shadows, balanced exposure, authentic atmosphere, gentle color rendering"
  },
  {
    "name": "Studio Light",
    "category": "Light",
    "chip": "Studio",
    "tone": "lighting",
    "text": "professional studio lighting, clean softbox illumination, controlled shadows, sharp details, polished photographic look"
  },
  {
    "name": "Golden Hour",
    "category": "Light",
    "chip": "Gold",
    "tone": "lighting",
    "text": "golden hour lighting, warm sunlight, soft long shadows, glowing highlights, cinematic natural atmosphere"
  },
  {
  "name": "Sunlight",
  "category": "Light",
  "chip": "Sun",
  "tone": "lighting",
  "thumbnail": "sunlight.webp",
  "text": "sunlight, bright natural daylight, realistic light behavior, natural shadows, clear highlights, balanced outdoor illumination"
},
{
  "name": "Side Light",
  "category": "Light",
  "chip": "Side",
  "tone": "lighting",
  "thumbnail": "side_light.webp",
  "text": "side light, directional natural light from one side, realistic shadow falloff, sculpted form, balanced highlights"
},
{
  "name": "Backlight",
  "category": "Light",
  "chip": "Back",
  "tone": "lighting",
  "thumbnail": "backlight.webp",
  "text": "backlight, light behind the subject, glowing rim edge, natural silhouette tendency, realistic atmospheric separation"
},
{
  "name": "Top Light",
  "category": "Light",
  "chip": "Top",
  "tone": "lighting",
  "thumbnail": "top_light.webp",
  "text": "top light, light from above, natural overhead illumination, downward shadows, realistic highlight placement"
},
{
  "name": "Low Sun",
  "category": "Light",
  "chip": "Low",
  "tone": "lighting",
  "thumbnail": "low_sun.webp",
  "text": "low sun angle, warm directional sunlight, long soft-edged shadows, realistic late-day light behavior, natural atmosphere"
},
{
  "name": "Overhead Sun",
  "category": "Light",
  "chip": "Ovr",
  "tone": "lighting",
  "thumbnail": "overhead_sun.webp",
  "text": "overhead sun, high midday sunlight, short crisp shadows, bright clear daylight, realistic outdoor light behavior"
},
  {
    "name": "Light Rays",
    "category": "Light",
    "chip": "LR",
    "tone": "Light",
    "thumbnail": "light_rays.webp",
    "text": "light rays effect, visible beams of light, soft volumetric glow, sunlight shafts through atmosphere, cinematic photographic lighting mood"
  },
  {
    "name": "Low Key",
    "category": "Light",
    "chip": "Low",
    "tone": "lighting",
    "text": "low-key photography, dark background, controlled highlights, deep shadows, dramatic contrast, focused subject lighting"
  },
  {
    "name": "High Key",
    "category": "Light",
    "chip": "High",
    "tone": "lighting",
    "text": "high-key photography, bright clean lighting, soft shadows, airy white background, gentle contrast, polished look"
  },
  {
    "name": "Neon Night",
    "category": "Light",
    "chip": "Neon",
    "tone": "lighting",
    "text": "neon night lighting, colorful urban glow, reflective highlights, cinematic contrast, atmospheric background glow"
  },
  {
    "name": "Clear Sky",
    "category": "Weather",
    "chip": "Clear",
    "tone": "weather",
    "thumbnail": "clear_sky.webp",
    "text": "clear sky weather, clean blue sky, crisp visibility, calm daylight, photorealistic outdoor scenery, realistic natural atmosphere"
  },
  {
    "name": "Cloudy",
    "category": "Weather",
    "chip": "Cloud",
    "tone": "weather",
    "thumbnail": "cloudy.webp",
    "text": "cloudy weather, overcast sky, soft diffused daylight, muted shadows, photorealistic outdoor scenery, realistic natural atmosphere"
  },
  {
    "name": "Rainy",
    "category": "Weather",
    "chip": "Rain",
    "tone": "weather",
    "thumbnail": "rainy.webp",
    "text": "rainy weather, wet surfaces, soft reflections, visible raindrops, damp atmosphere, overcast daylight, photorealistic outdoor scenery, realistic natural atmosphere"
  },
  {
    "name": "Heavy Rain",
    "category": "Weather",
    "chip": "Heavy",
    "tone": "weather",
    "thumbnail": "heavy_rain.webp",
    "text": "heavy rain, strong wet atmosphere, visible rain streaks, glossy wet ground, low visibility, photorealistic outdoor scenery, realistic natural weather mood"
  },
  {
    "name": "After Rain",
    "category": "Weather",
    "chip": "After",
    "tone": "weather",
    "thumbnail": "after_rain.webp",
    "text": "after-rain atmosphere, wet pavement, fresh air, soft reflections, clearing sky, photorealistic outdoor scenery, realistic natural atmosphere"
  },
  {
    "name": "Foggy",
    "category": "Weather",
    "chip": "Fog",
    "tone": "weather",
    "thumbnail": "foggy.webp",
    "text": "foggy weather, misty air, low contrast distance, reduced visibility, atmospheric depth, photorealistic outdoor scenery, realistic natural haze"
  },
  {
    "name": "Snowy",
    "category": "Weather",
    "chip": "Snow",
    "tone": "weather",
    "thumbnail": "snowy.webp",
    "text": "snowy weather, falling snow, cold air, snow-covered ground, soft winter light, photorealistic outdoor scenery, realistic natural atmosphere"
  },
  {
    "name": "Stormy",
    "category": "Weather",
    "chip": "Storm",
    "tone": "weather",
    "thumbnail": "stormy.webp",
    "text": "stormy weather, dark clouds, dramatic sky, strong wind mood, tense atmosphere, photorealistic outdoor scenery, realistic natural lighting"
  },
  {
    "name": "Heat Haze",
    "category": "Weather",
    "chip": "Heat",
    "tone": "weather",
    "thumbnail": "heat_haze.webp",
    "text": "heat haze, shimmering hot air, dry atmosphere, harsh sunlight, washed distant contrast, photorealistic outdoor scenery, realistic summer heat mood"
  },
  {
    "name": "Product Photo",
    "category": "Photo",
    "chip": "Product",
    "tone": "commercial",
    "text": "professional product photography, clean background, sharp details, controlled reflections, accurate materials, commercial lighting"
  },
  {
    "name": "Food Photo",
    "category": "Photo",
    "chip": "Food",
    "tone": "commercial",
    "text": "professional food photography, appetizing lighting, natural texture, shallow depth of field, clean composition, rich detail"
  },
  {
    "name": "Fashion Editorial",
    "category": "Photo",
    "chip": "Fashion",
    "tone": "commercial",
    "text": "fashion editorial photography, stylish pose, refined wardrobe, studio-quality lighting, polished magazine look"
  },
  {
    "name": "Architecture",
    "category": "Photo",
    "chip": "Arch",
    "tone": "commercial",
    "text": "architectural photography, clean lines, accurate perspective, balanced lighting, sharp structural details, realistic materials"
  },
  {
    "name": "Interior Design",
    "category": "Photo",
    "chip": "Interior",
    "tone": "commercial",
    "text": "interior design photography, balanced room lighting, clean composition, realistic materials, inviting atmosphere, polished details"
  },
  {
    "name": "Anime Clean",
    "category": "Art",
    "chip": "Anime",
    "tone": "illustration",
    "text": "clean anime illustration, crisp line art, polished character design, smooth cel shading, vibrant but controlled colors"
  },
  {
    "name": "Anime Soft",
    "category": "Art",
    "chip": "Anime",
    "tone": "illustration",
    "text": "soft anime illustration, gentle lighting, delicate line art, pastel color palette, smooth shading, calm atmosphere"
  },
  {
    "name": "Anime in Photo",
    "category": "Art",
    "chip": "A+Photo",
    "tone": "illustration",
    "thumbnail": "anime_in_photo.webp",
    "text": "anime-style character in a realistic photographic background, illustrated character with clean anime features, real-world photo environment, natural photographic lighting, realistic depth and perspective, believable scene integration, clear contrast between animated subject and real background"
  },
  {
    "name": "Manga B&W",
    "category": "Art",
    "chip": "Manga",
    "tone": "illustration",
    "text": "black and white manga style, monochrome screentone shading, clean ink lines, high readability, comic panel look"
  },
  {
    "name": "Illustration",
    "category": "Art",
    "chip": "Illust",
    "tone": "illustration",
    "text": "high-quality digital illustration, polished details, clean composition, controlled lighting, appealing color harmony"
  },
  {
    "name": "Painterly",
    "category": "Art",
    "chip": "Paint",
    "tone": "illustration",
    "text": "painterly digital art, visible brush texture, soft edges, rich lighting, expressive color transitions"
  },
  {
    "name": "Watercolor",
    "category": "Art",
    "chip": "Water",
    "tone": "illustration",
    "text": "watercolor illustration, soft paper texture, translucent washes, gentle colors, delicate hand-painted look"
  },
  {
    "name": "Oil Painting",
    "category": "Art",
    "chip": "Oil",
    "tone": "illustration",
    "text": "oil painting style, rich brush strokes, textured paint surface, dramatic lighting, classical painted atmosphere"
  },
  {
    "name": "Comic",
    "category": "Art",
    "chip": "Comic",
    "tone": "illustration",
    "text": "western comic book style, bold outlines, dynamic shading, vivid colors, high-contrast graphic look"
  },
  {
    "name": "Pixelate",
    "category": "Art",
    "chip": "Pixel",
    "tone": "illustration",
    "text": "pixelated mosaic effect, chunky visible pixel blocks, low-resolution digital look, simplified colors, crisp square pixels, stylized retro image texture"
  },
  {
    "name": "Concept Art",
    "category": "Art",
    "chip": "Concept",
    "tone": "illustration",
    "text": "concept art style, detailed environment design, cinematic lighting, strong composition, polished production artwork"
  },
  {
    "name": "Dreamy",
    "category": "Mood",
    "chip": "Dream",
    "tone": "mood",
    "text": "dreamy photographic atmosphere, soft glow, gentle contrast, subtle haze, delicate highlights, calm realistic emotional mood"
  },
  {
    "name": "Dark Fantasy",
    "category": "Mood",
    "chip": "Dark",
    "tone": "mood",
    "text": "dark fantasy atmosphere, cinematic realistic shadows, mysterious lighting, ornate real-world texture, moody photographic composition"
  },
  {
    "name": "High Detail",
    "category": "Mood",
    "chip": "Detail",
    "tone": "mood",
    "text": "highly detailed realistic image, crisp textures, sharp subject definition, refined materials, clean photographic lighting, intricate visual detail"
  },
  {
    "name": "Minimal Clean",
    "category": "Mood",
    "chip": "Minimal",
    "tone": "mood",
    "text": "minimal clean photographic style, simple composition, uncluttered background, balanced spacing, refined modern real-world presentation"
  },
  {
    "name": "Retro Pop",
    "category": "Mood",
    "chip": "Retro",
    "tone": "mood",
    "text": "retro pop style, bold color palette, graphic shapes, playful composition, clean vintage-inspired visual design"
  },
  {
    "name": "Paper Print",
    "category": "Finish",
    "chip": "Paper",
    "tone": "finish",
    "thumbnail": "paper_print.webp",
    "text": "printed on paper, realistic paper grain, matte texture, soft ink absorption, tactile photographic print finish"
  },
  {
    "name": "Matte Print",
    "category": "Finish",
    "chip": "Matte",
    "tone": "finish",
    "thumbnail": "matte_print.webp",
    "text": "matte print finish, realistic non-reflective surface, soft contrast, smooth paper texture, photographic material feel"
  },
  {
    "name": "Glossy Print",
    "category": "Finish",
    "chip": "Glossy",
    "tone": "finish",
    "thumbnail": "glossy_print.webp",
    "text": "glossy print finish, realistic reflective coating, crisp contrast, polished photo paper surface"
  },
  {
    "name": "Canvas Texture",
    "category": "Finish",
    "chip": "Canvas",
    "tone": "finish",
    "thumbnail": "canvas_texture.webp",
    "text": "canvas texture, realistic woven fabric surface, subtle textile grain, tactile material finish"
  },
  {
    "name": "Fabric Print",
    "category": "Finish",
    "chip": "Fabric",
    "tone": "finish",
    "thumbnail": "fabric_print.webp",
    "text": "printed on fabric, realistic soft cloth texture, woven fibers, gentle ink diffusion, textile surface finish"
  },
  {
    "name": "Metal Print",
    "category": "Finish",
    "chip": "Metal",
    "tone": "finish",
    "thumbnail": "metal_print.webp",
    "text": "printed on metal, realistic glossy metallic surface, reflective highlights, sleek hard material finish"
  },
  {
    "name": "Glass Print",
    "category": "Finish",
    "chip": "Glass",
    "tone": "finish",
    "thumbnail": "glass_print.webp",
    "text": "behind glass, realistic glossy glass surface, subtle reflections, polished transparent finish"
  },
  {
    "name": "Glass Distortion",
    "category": "Finish",
    "chip": "GD",
    "tone": "Finish",
    "thumbnail": "glass_distortion.webp",
    "text": "glass distortion effect, warped refraction, subtle transparent ripples, reflective glass surface, photographic material detail, real-world distorted texture"
  },
  {
    "name": "Wet Surface",
    "category": "Finish",
    "chip": "Wet",
    "tone": "finish",
    "thumbnail": "wet_surface.webp",
    "text": "wet surface effect, realistic water droplets, glossy highlights, damp reflective texture, fresh moisture finish"
  },
  {
    "name": "Water Droplets",
    "category": "Finish",
    "chip": "Drops",
    "tone": "finish",
    "thumbnail": "water_droplets.webp",
    "text": "water droplets on surface, realistic clear beads of moisture, glossy highlights, fresh wet photographic finish"
  },
  {
    "name": "Dusty Surface",
    "category": "Finish",
    "chip": "Dust",
    "tone": "finish",
    "thumbnail": "dusty_surface.webp",
    "text": "dusty surface effect, realistic fine dust particles, muted texture, aged dry finish, subtle grime"
  },
  {
    "name": "Fractal Noise",
    "category": "Finish",
    "chip": "FN",
    "tone": "Noise",
    "thumbnail": "fractal_noise.webp",
    "text": "fractal noise texture, cloudy procedural grain, smoky abstract background detail, organic noise pattern, photographic atmospheric surface texture"
  },
  {
    "name": "Scratched Print",
    "category": "Finish",
    "chip": "Scratch",
    "tone": "finish",
    "thumbnail": "scratched_print.webp",
    "text": "scratched print surface, realistic fine scratches, worn texture, distressed physical finish"
  },
  {
    "name": "Vintage Paper",
    "category": "Finish",
    "chip": "Vintage",
    "tone": "finish",
    "thumbnail": "vintage_paper.webp",
    "text": "vintage paper texture, realistic aged paper grain, faded ink, warm yellowed surface, old printed finish"
  },
  {
    "name": "Stone Surface",
    "category": "Finish",
    "chip": "Stone",
    "tone": "finish",
    "thumbnail": "stone_surface.webp",
    "text": "stone surface texture, realistic rough mineral grain, cool hard material finish, natural stone detail"
  },
  {
    "name": "Marble Finish",
    "category": "Finish",
    "chip": "Marble",
    "tone": "finish",
    "thumbnail": "marble_finish.webp",
    "text": "marble surface finish, realistic subtle veining, polished stone texture, elegant mineral material"
  },
  {
    "name": "Concrete Finish",
    "category": "Finish",
    "chip": "Concrete",
    "tone": "finish",
    "thumbnail": "concrete_finish.webp",
    "text": "concrete surface texture, realistic rough gray material, fine grain, industrial matte finish"
  },
  {
    "name": "Rusty Metal",
    "category": "Finish",
    "chip": "Rust",
    "tone": "finish",
    "thumbnail": "rusty_metal.webp",
    "text": "rusty metal surface, realistic oxidized texture, reddish brown corrosion, worn industrial finish"
  },
  {
    "name": "Aged Metal",
    "category": "Finish",
    "chip": "Aged",
    "tone": "finish",
    "thumbnail": "aged_metal.webp",
    "text": "aged metal finish, realistic tarnished surface, subtle scratches, oxidized patina, weathered material"
  },
  {
    "name": "Patina Finish",
    "category": "Finish",
    "chip": "Patina",
    "tone": "finish",
    "thumbnail": "patina_finish.webp",
    "text": "patina surface finish, realistic green-blue oxidized metal, aged copper look, weathered decorative texture"
  },
  {
    "name": "Wood Grain",
    "category": "Finish",
    "chip": "Wood",
    "tone": "finish",
    "thumbnail": "wood_grain.webp",
    "text": "wood grain texture, realistic natural wooden surface, warm organic material finish, visible grain lines"
  },
  {
    "name": "Leather Finish",
    "category": "Finish",
    "chip": "Leather",
    "tone": "finish",
    "thumbnail": "leather_finish.webp",
    "text": "leather surface texture, realistic subtle grain, soft worn material, tactile premium finish"
  },
  {
    "name": "Ceramic Glaze",
    "category": "Finish",
    "chip": "Ceramic",
    "tone": "finish",
    "thumbnail": "ceramic_glaze.webp",
    "text": "ceramic glazed surface, realistic smooth glossy coating, subtle reflections, crafted material finish"
  },
  {
    "name": "Plastic Finish",
    "category": "Finish",
    "chip": "Plastic",
    "tone": "finish",
    "thumbnail": "plastic_finish.webp",
    "text": "plastic surface finish, realistic smooth synthetic texture, clean highlights, modern manufactured material"
  },
  {
    "name": "Slime Finish",
    "category": "Finish",
    "chip": "Slime",
    "tone": "finish",
    "thumbnail": "slime_finish.webp",
    "text": "slime surface finish, realistic glossy translucent gel texture, sticky wet highlights, soft gooey material look"
  },
  {
    "name": "Gel Finish",
    "category": "Finish",
    "chip": "Gel",
    "tone": "finish",
    "thumbnail": "gel_finish.webp",
    "text": "gel surface finish, realistic translucent glossy material, smooth jelly-like highlights, soft elastic texture"
  },
  {
    "name": "Liquid Gloss",
    "category": "Finish",
    "chip": "Liquid",
    "tone": "finish",
    "thumbnail": "liquid_gloss.webp",
    "text": "liquid glossy finish, realistic wet reflective coating, smooth flowing highlights, polished fluid surface"
  },
  {
    "name": "Gummy Finish",
    "category": "Finish",
    "chip": "Gummy",
    "tone": "finish",
    "thumbnail": "gummy_finish.webp",
    "text": "gummy material finish, realistic soft translucent candy texture, rounded glossy surface, playful elastic look"
  },
  {
    "name": "Wax Finish",
    "category": "Finish",
    "chip": "Wax",
    "tone": "finish",
    "thumbnail": "wax_finish.webp",
    "text": "wax surface finish, realistic soft semi-gloss texture, smooth melted material, subtle warm highlights"
  },
  {
    "name": "Fantasy Color",
    "category": "Color Theme",
    "chip": "FC",
    "tone": "color-theme",
    "thumbnail": "fantasy_color.webp",
    "text": "fantasy color theme, magical saturated palette, glowing photographic color grading, whimsical real-world atmosphere"
  },
{
    "name": "Red Theme",
    "category": "Color Theme",
    "chip": "Red",
    "tone": "color-theme",
    "thumbnail": "red_theme.webp",
    "text": "red color theme, cohesive red palette, warm red color grading, strong visual unity"
  },
  {
    "name": "Blue Theme",
    "category": "Color Theme",
    "chip": "Blue",
    "tone": "color-theme",
    "thumbnail": "blue_theme.webp",
    "text": "blue color theme, cohesive blue palette, cool calm color grading, unified blue atmosphere"
  },
  {
    "name": "Pink Theme",
    "category": "Color Theme",
    "chip": "Pink",
    "tone": "color-theme",
    "thumbnail": "pink_theme.webp",
    "text": "pink color theme, cohesive pink palette, soft rosy color grading, harmonious pink atmosphere"
  },
  {
    "name": "Purple Theme",
    "category": "Color Theme",
    "chip": "Purple",
    "tone": "color-theme",
    "thumbnail": "purple_theme.webp",
    "text": "purple color theme, cohesive violet palette, rich purple color grading, elegant moody atmosphere"
  },
  {
    "name": "Green Theme",
    "category": "Color Theme",
    "chip": "Green",
    "tone": "color-theme",
    "thumbnail": "green_theme.webp",
    "text": "green color theme, cohesive green palette, fresh natural color grading, balanced green atmosphere"
  },
  {
    "name": "Yellow Theme",
    "category": "Color Theme",
    "chip": "Yellow",
    "tone": "color-theme",
    "thumbnail": "yellow_theme.webp",
    "text": "yellow color theme, cohesive yellow palette, bright sunny color grading, warm cheerful atmosphere"
  },
  {
    "name": "Orange Theme",
    "category": "Color Theme",
    "chip": "Orange",
    "tone": "color-theme",
    "thumbnail": "orange_theme.webp",
    "text": "orange color theme, cohesive orange palette, warm energetic color grading, vivid orange atmosphere"
  },
  {
    "name": "Cyan Theme",
    "category": "Color Theme",
    "chip": "Cyan",
    "tone": "color-theme",
    "thumbnail": "cyan_theme.webp",
    "text": "cyan color theme, cohesive cyan palette, clear cool color grading, bright aquatic atmosphere"
  },
  {
    "name": "Teal Theme",
    "category": "Color Theme",
    "chip": "Teal",
    "tone": "color-theme",
    "thumbnail": "teal_theme.webp",
    "text": "teal color theme, cohesive teal palette, cinematic blue-green color grading, polished atmosphere"
  },
  {
    "name": "Magenta Theme",
    "category": "Color Theme",
    "chip": "Magenta",
    "tone": "color-theme",
    "thumbnail": "magenta_theme.webp",
    "text": "magenta color theme, cohesive magenta palette, bold pink-purple color grading, vibrant atmosphere"
  },
  {
    "name": "Warm Theme",
    "category": "Color Theme",
    "chip": "Warm",
    "tone": "color-theme",
    "thumbnail": "warm_theme.webp",
    "text": "warm color theme, amber highlights, warm color grading, inviting golden atmosphere"
  },
  {
    "name": "Cool Theme",
    "category": "Color Theme",
    "chip": "Cool",
    "tone": "color-theme",
    "thumbnail": "cool_theme.webp",
    "text": "cool color theme, blue cool palette, clean cool color grading, calm atmospheric mood"
  },
  {
    "name": "Pastel Theme",
    "category": "Color Theme",
    "chip": "Pastel",
    "tone": "color-theme",
    "thumbnail": "pastel_theme.webp",
    "text": "pastel color theme, soft low-saturation palette, gentle airy atmosphere, delicate color grading"
  },
  {
    "name": "Neon Theme",
    "category": "Color Theme",
    "chip": "Neon",
    "tone": "color-theme",
    "thumbnail": "neon_theme.webp",
    "text": "neon color theme, electric saturated palette, glowing highlights, energetic futuristic color grading"
  },
  {
    "name": "Muted Theme",
    "category": "Color Theme",
    "chip": "Muted",
    "tone": "color-theme",
    "thumbnail": "muted_theme.webp",
    "text": "muted color theme, desaturated palette, subdued color grading, calm understated atmosphere"
  },
  {
    "name": "Monochrome Theme",
    "category": "Color Theme",
    "chip": "Monochro",
    "tone": "color-theme",
    "thumbnail": "monochrome_theme.webp",
    "text": "monochrome color theme, black and white palette, clean grayscale color grading, strong tonal contrast"
  },
  {
    "name": "Sepia Theme",
    "category": "Color Theme",
    "chip": "Sepia",
    "tone": "color-theme",
    "thumbnail": "sepia_theme.webp",
    "text": "sepia color theme, warm brown palette, vintage sepia color grading, nostalgic atmosphere"
  },
  {
    "name": "Gold Theme",
    "category": "Color Theme",
    "chip": "Gold",
    "tone": "color-theme",
    "thumbnail": "gold_theme.webp",
    "text": "gold color theme, golden palette, warm metallic highlights, premium luminous color grading"
  },
  {
    "name": "Silver Theme",
    "category": "Color Theme",
    "chip": "Silver",
    "tone": "color-theme",
    "thumbnail": "silver_theme.webp",
    "text": "silver color theme, cool metallic palette, clean silver-gray color grading, polished atmosphere"
  },
  {
    "name": "Dark Theme",
    "category": "Color Theme",
    "chip": "Dark",
    "tone": "color-theme",
    "thumbnail": "dark_theme.webp",
    "text": "dark color theme, deep shadow palette, low brightness color grading, moody dramatic atmosphere"
  },
  {
    "name": "Bright Theme",
    "category": "Color Theme",
    "chip": "Bright",
    "tone": "color-theme",
    "thumbnail": "bright_theme.webp",
    "text": "bright color theme, high-key luminous palette, clean bright color grading, airy atmosphere"
  },
  {
    "name": "Earth Theme",
    "category": "Color Theme",
    "chip": "Earth",
    "tone": "color-theme",
    "thumbnail": "earth_theme.webp",
    "text": "earth color theme, natural brown and green palette, organic grounded color grading, warm natural atmosphere"
  },
  {
    "name": "Cream Theme",
    "category": "Color Theme",
    "chip": "Cream",
    "tone": "color-theme",
    "thumbnail": "cream_theme.webp",
    "text": "cream color theme, soft cream palette, warm gentle color grading, light elegant atmosphere"
  },
  {
    "name": "Black & White",
    "category": "Color Theme",
    "chip": "B&W",
    "tone": "color-theme",
    "thumbnail": "black_white.webp",
    "text": "black and white color theme, pure monochrome palette, strong tonal contrast, clean graphic color grading"
  },
  {
    "name": "Crazy Color",
    "category": "Color Theme",
    "chip": "CC",
    "tone": "color-theme",
    "thumbnail": "crazy_color.webp",
    "text": "crazy color theme, playful clashing palette, unexpected color combinations, photographic color grading, energetic real-world atmosphere"
  },
  {
    "name": "Candy Color",
    "category": "Color Theme",
    "chip": "CC",
    "tone": "color-theme",
    "thumbnail": "candy_color.webp",
    "text": "candy color theme, sweet bright palette, playful pastel-neon colors, photographic color grading, cheerful glossy atmosphere"
  },
  {
    "name": "Pop Color",
    "category": "Color Theme",
    "chip": "PC",
    "tone": "color-theme",
    "thumbnail": "pop_color.webp",
    "text": "pop color theme, bold bright palette, saturated colors, photographic color grading, energetic real-world atmosphere"
  },
  {
    "name": "Dreamy Color",
    "category": "Color Theme",
    "chip": "DC",
    "tone": "color-theme",
    "thumbnail": "dreamy_color.webp",
    "text": "dreamy color theme, soft luminous palette, gentle haze, photographic pastel color grading, realistic atmospheric mood"
  },
  {
    "name": "Acid Color",
    "category": "Color Theme",
    "chip": "AC",
    "tone": "color-theme",
    "thumbnail": "acid_color.webp",
    "text": "acid color theme, intense fluorescent palette, surreal high-energy photographic color grading, experimental real-world atmosphere"
  },
  {
    "name": "Cyber Color",
    "category": "Color Theme",
    "chip": "CC",
    "tone": "color-theme",
    "thumbnail": "cyber_color.webp",
    "text": "cyber color theme, neon cyan and magenta palette, dark futuristic contrast, photographic digital glow atmosphere"
  },
  {
    "name": "Rainbow Color",
    "category": "Color Theme",
    "chip": "RC",
    "tone": "color-theme",
    "thumbnail": "rainbow_color.webp",
    "text": "rainbow color theme, full-spectrum colorful palette, photographic multicolor grading, vibrant real-world atmosphere"
  },
  {
    "name": "Holographic Color",
    "category": "Color Theme",
    "chip": "HC",
    "tone": "color-theme",
    "thumbnail": "holographic_color.webp",
    "text": "holographic color theme, iridescent pastel palette, shifting rainbow highlights, glossy photographic color grading"
  },
  {
    "name": "Vaporwave Color",
    "category": "Color Theme",
    "chip": "VC",
    "tone": "color-theme",
    "thumbnail": "vaporwave_color.webp",
    "text": "vaporwave color theme, pink cyan purple palette, retro digital photographic color grading, nostalgic surreal atmosphere"
  },
  {
    "name": "Stardust Fantasy",
    "category": "Color Theme",
    "chip": "SF",
    "tone": "color-theme",
    "thumbnail": "stardust_fantasy.webp",
    "text": "stardust fantasy atmosphere, soft blue lavender and pink palette, fine sparkling light particles, gentle photographic color grading, magical real-world background mood"
  },
  {
    "name": "Shooting Star Fantasy",
    "category": "Color Theme",
    "chip": "SS",
    "tone": "color-theme",
    "thumbnail": "shooting_star_fantasy.webp",
    "text": "shooting star fantasy atmosphere, deep blue and violet palette, bright streaks of light, dreamy night-sky glow, photographic color grading, energetic real-world background mood"
  },
  {
    "name": "Galaxy Atmosphere",
    "category": "Color Theme",
    "chip": "GA",
    "tone": "color-theme",
    "thumbnail": "galaxy_atmosphere.webp",
    "text": "galaxy atmosphere, deep purple blue and magenta palette, subtle cosmic glow, soft nebula-like gradients, photographic color grading, mysterious real-world background mood"
  },
  {
    "name": "Aurora Mood",
    "category": "Color Theme",
    "chip": "AM",
    "tone": "color-theme",
    "thumbnail": "aurora_mood.webp",
    "text": "aurora mood, green cyan violet and blue palette, flowing luminous gradients, atmospheric sky-like glow, photographic color grading, calm real-world background mood"
  },
  {
    "name": "Dreamland Color",
    "category": "Color Theme",
    "chip": "DL",
    "tone": "color-theme",
    "thumbnail": "dreamland_color.webp",
    "text": "dreamland color atmosphere, soft pastel rainbow palette, glowing haze, gentle photographic color grading, airy real-world background mood"
  },
  {
    "name": "Heart Magic Color",
    "category": "Color Theme",
    "chip": "HM",
    "tone": "color-theme",
    "thumbnail": "heart_magic_color.webp",
    "text": "heart magic color atmosphere, soft pink and violet palette, subtle sweet glow, gentle sparkle accents, photographic color grading, romantic real-world background mood"
  },
  {
    "name": "Harajuku Decora Mood",
    "category": "Color Theme",
    "chip": "HD",
    "tone": "color-theme",
    "thumbnail": "harajuku_decora_mood.webp",
    "text": "harajuku decora mood, colorful real-world street fashion atmosphere, pink and pastel color accents, playful accessory-like color pops, photographic color grading"
  },
  {
    "name": "Pastel Kawaii Mood",
    "category": "Color Theme",
    "chip": "PK",
    "tone": "color-theme",
    "thumbnail": "pastel_kawaii_mood.webp",
    "text": "pastel kawaii mood, soft pink mint lavender and cream palette, cute gentle atmosphere, clean photographic color grading, sweet real-world background mood"
  },
  {
    "name": "Pop Kawaii Color",
    "category": "Color Theme",
    "chip": "PK",
    "tone": "color-theme",
    "thumbnail": "pop_kawaii_color.webp",
    "text": "pop kawaii color atmosphere, bright pink cyan yellow and lavender palette, cheerful colorful accents, photographic color grading, playful real-world background mood"
  },
  {
    "name": "Japanese Mood",
    "category": "Color Theme",
    "chip": "JP",
    "tone": "color-theme",
    "thumbnail": "japanese_mood.webp",
    "text": "japanese mood color atmosphere, vermilion indigo warm gold and soft paper tones, quiet traditional ambience, photographic color grading, calm real-world background mood"
  },
  {
    "name": "Sakura Japan Color",
    "category": "Color Theme",
    "chip": "SA",
    "tone": "color-theme",
    "thumbnail": "sakura_japan_color.webp",
    "text": "sakura japan color atmosphere, pale cherry blossom pink, soft white, warm spring light, gentle Japanese mood, photographic color grading, airy real-world background mood"
  },
  {
    "name": "Samurai Drama Color",
    "category": "Color Theme",
    "chip": "SD",
    "tone": "color-theme",
    "thumbnail": "samurai_drama_color.webp",
    "text": "samurai drama color atmosphere, deep black, dark red, muted gold and smoky neutral tones, period drama tension, cinematic photographic color grading"
  },
  {
    "name": "Western Desert Color",
    "category": "Color Theme",
    "chip": "WD",
    "tone": "color-theme",
    "thumbnail": "western_desert_color.webp",
    "text": "western desert color atmosphere, dusty sand, burnt orange, leather brown and sunset gold palette, dry frontier mood, photographic color grading, real-world background atmosphere"
  },
  {
    "name": "Indian Festival Color",
    "category": "Color Theme",
    "chip": "IF",
    "tone": "color-theme",
    "thumbnail": "indian_festival_color.webp",
    "text": "indian festival color atmosphere, saffron magenta turquoise and gold palette, festive color richness, photographic color grading, vibrant real-world background mood"
  },
  {
    "name": "Arabian Night Color",
    "category": "Color Theme",
    "chip": "AN",
    "tone": "color-theme",
    "thumbnail": "arabian_night_color.webp",
    "text": "arabian night color atmosphere, deep blue violet gold and warm lantern glow, night-market fantasy mood, photographic color grading, mysterious real-world background atmosphere"
  },
  {
    "name": "Egyptian Gold Color",
    "category": "Color Theme",
    "chip": "EG",
    "tone": "color-theme",
    "thumbnail": "egyptian_gold_color.webp",
    "text": "egyptian gold color atmosphere, desert sand, turquoise, black accents and aged gold palette, ancient monument mood, photographic color grading, warm real-world background atmosphere"
  },
  {
    "name": "Chinese Lantern Color",
    "category": "Color Theme",
    "chip": "CL",
    "tone": "color-theme",
    "thumbnail": "chinese_lantern_color.webp",
    "text": "chinese lantern color atmosphere, rich red, warm gold, deep night tones and lantern glow, festive street mood, photographic color grading, real-world background atmosphere"
  },
  {
    "name": "Korean Pastel Color",
    "category": "Color Theme",
    "chip": "KP",
    "tone": "color-theme",
    "thumbnail": "korean_pastel_color.webp",
    "text": "korean pastel color atmosphere, soft pink mint sky blue and cream palette, clean modern gentle mood, photographic color grading, airy real-world background atmosphere"
  },
  {
    "name": "Nordic Winter Color",
    "category": "Color Theme",
    "chip": "NW",
    "tone": "color-theme",
    "thumbnail": "nordic_winter_color.webp",
    "text": "nordic winter color atmosphere, white blue silver and pale gray palette, cold quiet snow mood, photographic color grading, clean real-world background atmosphere"
  },
  {
    "name": "Tropical Island Color",
    "category": "Color Theme",
    "chip": "TI",
    "tone": "color-theme",
    "thumbnail": "tropical_island_color.webp",
    "text": "tropical island color atmosphere, turquoise ocean, lush green, sunlit yellow and coral accents, bright vacation mood, photographic color grading, real-world background atmosphere"
  },
  {
    "name": "Virtual Diva Teal",
    "category": "Color Theme",
    "chip": "VD",
    "tone": "color-theme",
    "thumbnail": "virtual_diva_teal.webp",
    "text": "virtual diva teal color atmosphere, teal cyan black and soft neon accents, digital stage-like color mood, clean photographic color grading, vivid real-world background atmosphere"
  },
  {
    "name": "Heterochromia Eyes",
    "category": "Color Theme",
    "chip": "HE",
    "tone": "color-theme",
    "thumbnail": "heterochromia_eyes.webp",
    "text": "heterochromia eyes, natural realistic iris detail, different eye colors, one blue eye and one amber or green eye, subtle photographic color accent, clean real-world portrait detail"
  }
  ];

const EFFECT_NODE = "Krea2PromptEffect";
const EFFECT_NODE_BBOX = "Krea2BBOXPromptEffect";

const K2CF_CANVAS_DEFAULT_SIZE = [830, 980];
const K2CF_PROMPT_DEFAULT_SIZE = [540, 990];
const K2CF_PROMPT_LEGACY_BUG_SIZES = [[400, 572]];

const K2CF_PROMPT_HEIGHT_CAPTURE_MODE = "resize_grip_v31";

const SLOTS = [
  ["red", "RED", "#ff3b30", "red_prompt", "red_type", "red_framing", "red_angle"],
  ["blue", "BLUE", "#2f80ff", "blue_prompt", "blue_type", "blue_framing", "blue_angle"],
  ["yellow", "YELLOW", "#ffd91a", "yellow_prompt", "yellow_type", "yellow_framing", "yellow_angle"],
  ["green", "GREEN", "#35b84b", "green_prompt", "green_type", "green_framing", "green_angle"],
  ["magenta", "MAGENTA", "#d943c8", "magenta_prompt", "magenta_type", "magenta_framing", "magenta_angle"],
];
const FRAMING_OPTIONS = [
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
  "Macro detail"
];

const ANGLE_OPTIONS = [
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
  "Foreground frame"
];

const EFFECT_WIDGETS = ["prompt_in", "enable_effect", "category", "preset", "mode", "custom_preset", "style_boost"];
const EFFECT_STYLE_BOOST_TEXT = {
  Photo: "natural photo look, realistic lighting, real-world materials, camera-based detail",
  Anime: "anime style, clean linework, cel-shaded color, illustrated character look",
};
const EFFECT_PRESETS = [
  {
    "name": "Realistic Photo",
    "category": "Photo",
    "chip": "Real",
    "tone": "photo-look",
    "text": "photorealistic image, natural lighting, realistic skin texture, lifelike details, accurate materials, clean high-resolution photo quality"
  },
  {
    "name": "35mm Film",
    "category": "Camera FX",
    "chip": "Film",
    "tone": "camera-fx",
    "text": "analog 35mm film photo, visible film grain, subtle halation, natural color, soft contrast, realistic skin texture"
  },
  {
    "name": "Cinematic Photo",
    "category": "Photo",
    "chip": "Cine",
    "tone": "cine",
    "text": "cinematic film still, dramatic lighting, controlled contrast, strong depth, realistic atmosphere, detailed composition, filmic photo look"
  },
  {
    "name": "Soft Portrait",
    "category": "Photo",
    "chip": "Port",
    "tone": "portrait",
    "text": "soft portrait photography, flattering natural light, natural skin texture, shallow depth of field, gentle contrast, clean facial details"
  },
  {
    "name": "Milky Portrait",
    "category": "Photo",
    "chip": "Milky",
    "tone": "portrait",
    "text": "white milky tone, pale milky cream palette with soft portrait photography, natural soft skin texture, shallow depth of field, gentle contrast, smooth tonal gradation, clean facial details, delicate calm mood"
  },
  {
    "name": "Glow Portrait",
    "category": "Photo",
    "chip": "Glow",
    "tone": "portrait",
    "text": "dreamy photographic atmosphere, soft milky cream palette, soft portrait photography, natural soft skin texture, shallow depth of field, gentle contrast, smooth tonal gradation, clean facial details, luminous soft glow, soft radiant highlights, airy subtle haze, gentle bloom effect, calm realistic emotional mood, flash, illuminated subject, crisp catchlight,"
  },
  {
    "name": "B&W Soft",
    "category": "Photo",
    "chip": "B&W Soft",
    "tone": "bw",
    "text": "soft black and white photography, monochrome grayscale tones, no color, gentle contrast, soft film grain, natural skin texture"
  },
  {
    "name": "B&W Glow",
    "category": "Photo",
    "chip": "B&W Glow",
    "tone": "bw",
    "thumbnail": "bandw_glow.webp",
    "text": "pure black and white glow portrait, monochrome grayscale photography, no color, soft monochrome tones, luminous soft glow, flash, illuminated subject, crisp catchlight, bright gentle highlights, natural soft skin texture, shallow depth of field, gentle contrast, smooth tonal gradation, clean facial details, airy subtle haze, calm realistic emotional mood"
  },
  {
    "name": "B&W Strong",
    "category": "Photo",
    "chip": "B&W Strong",
    "tone": "bw",
    "text": "strong black and white photography, monochrome grayscale tones, no color, high contrast, deep blacks, bright whites, dramatic film grain"
  },
  {
    "name": "Film Noir",
    "category": "Photo",
    "chip": "Film Noir",
    "tone": "bw",
    "text": "film noir photography, black and white tones, dramatic shadows, low-key lighting, high contrast, mysterious cinematic atmosphere"
  },
  {
    "name": "Noir Photo",
    "category": "Photo",
    "chip": "Noir",
    "tone": "bw",
    "text": "modern noir photography, monochrome contrast, deep shadows, sharp highlights, moody urban cinematic lighting"
  },
  {
    "name": "Flash Photo",
    "category": "Camera FX",
    "chip": "Flash",
    "tone": "camera-fx",
    "text": "flash photo, light to medium on-camera flash, clear illuminated subject, crisp catchlight, natural surroundings, balanced shadows, casual photographic snapshot realism"
  },
  {
    "name": "Direct Flash",
    "category": "Camera FX",
    "chip": "Direct",
    "tone": "camera-fx",
    "text": "direct flash photo, frontal camera flash, clear subject illumination, crisp highlights, visible catchlight, balanced contrast, sharp casual photographic look"
  },
  {
    "name": "Disposable Flash",
    "category": "Camera FX",
    "chip": "Disposable",
    "tone": "camera-fx",
    "text": "disposable camera flash photo, casual point-and-shoot look, medium frontal flash, slight film grain, natural snapshot framing, imperfect but realistic camera texture"
  },
  {
    "name": "Paparazzi Flash",
    "category": "Camera FX",
    "chip": "Paparazzi",
    "tone": "camera-fx",
    "text": "paparazzi flash photography, strong camera flash burst, candid subject illumination, crisp highlights, energetic snapshot feeling, press-photo style realism"
  },
  {
    "name": "Dark Flash",
    "category": "Camera FX",
    "chip": "DF",
    "tone": "Flash",
    "thumbnail": "dark_flash.webp",
    "text": "dark flash photo, on-camera flash in a low-light environment, illuminated foreground subject, deeper surrounding shadows, grainy high ISO texture, dramatic snapshot realism"
  },
  {
    "name": "Red Eye Flash",
    "category": "Camera FX",
    "chip": "RE",
    "tone": "Flash",
    "thumbnail": "red_eye_flash.webp",
    "text": "red-eye flash photo effect, on-camera flash causing visible red pupils, direct frontal flash, snapshot realism, strong catchlight, photographic camera artifact"
  },
  {
    "name": "Polaroid",
    "category": "Camera FX",
    "chip": "Pola",
    "tone": "camera-fx",
    "text": "instant polaroid photo look, soft focus, muted colors, slight overexposure, nostalgic film texture, casual snapshot framing"
  },
  {
    "name": "Vintage Photo",
    "category": "Photo",
    "chip": "Vintage",
    "tone": "film",
    "text": "vintage photograph look, faded tones, subtle film grain, soft contrast, nostalgic atmosphere, natural imperfections"
  },
  {
    "name": "Long Exposure",
    "category": "Camera FX",
    "chip": "Long",
    "tone": "camera-fx",
    "text": "long exposure photography, motion blur trails, smooth light streaks, stable subject focus, atmospheric night photo look"
  },
  {
    "name": "Directional Blur",
    "category": "Camera FX",
    "chip": "DB",
    "tone": "Motion",
    "thumbnail": "directional_blur.webp",
    "text": "directional blur effect, one-way motion streaks, fast moving photographic smear, dynamic speed lines, realistic camera motion atmosphere"
  },
  {
    "name": "Toy Camera",
    "category": "Camera FX",
    "chip": "Toy",
    "tone": "camera-fx",
    "text": "toy camera photo, plastic lens softness, strong vignette, imperfect focus, saturated colors, playful lo-fi snapshot look"
  },
  {
    "name": "Lomography",
    "category": "Camera FX",
    "chip": "Lomo",
    "tone": "camera-fx",
    "text": "lomography photo, vivid saturated colors, heavy vignette, cross-processed film tones, high contrast, spontaneous analog snapshot style"
  },
  {
    "name": "Night Vision",
    "category": "Camera FX",
    "chip": "Night",
    "tone": "camera-fx",
    "text": "night vision camera footage, green monochrome image, infrared glow, high noise, low-light surveillance look, harsh electronic contrast"
  },
  {
    "name": "Security Camera",
    "category": "Camera FX",
    "chip": "CCTV",
    "tone": "camera-fx",
    "text": "security camera footage, fixed wide-angle view, low-resolution video look, surveillance camera feel, flat lighting, documentary realism"
  },
  {
    "name": "Thermal Camera",
    "category": "Camera FX",
    "chip": "Thermal",
    "tone": "camera-fx",
    "text": "thermal camera image, false-color heatmap palette, glowing warm subjects, cooler surrounding tones, infrared temperature-vision look"
  },
  {
    "name": "Film Negative",
    "category": "Camera FX",
    "chip": "Neg",
    "tone": "camera-fx",
    "text": "film negative look, inverted colors, cyan and orange reversed tones, high contrast negative film scan, surreal photographic inversion"
  },
  {
    "name": "VHS",
    "category": "Camera FX",
    "chip": "VHS",
    "tone": "camera-fx",
    "text": "VHS camcorder footage, analog video noise, scan lines, color bleed, soft low-resolution image, dated home-video recording look"
  },
  {
    "name": "Glitch Effect",
    "category": "Camera FX",
    "chip": "GE",
    "tone": "Digital",
    "thumbnail": "glitch_effect.webp",
    "text": "glitch effect, digital noise artifacts, horizontal and vertical pixel distortion, RGB channel shift, broken video signal, corrupted scan lines, photographic digital error atmosphere"
  },
  {
    "name": "Hex Tile",
    "category": "Finish",
    "chip": "HT",
    "tone": "Finish",
    "thumbnail": "hex_tile.webp",
    "text": "hex tile pattern, repeating honeycomb geometry, subtle tiled surface texture, photographic material detail, clean real-world patterned background"
  },
  {
    "name": "Kaleidoscope",
    "category": "Finish",
    "chip": "KA",
    "tone": "Pattern",
    "thumbnail": "kaleidoscope.webp",
    "text": "kaleidoscope pattern effect, mirrored repeating geometric shapes, colorful symmetrical background mood, photographic color texture, abstract real-world surface feel"
  },
  {
    "name": "HDR Photo",
    "category": "Photo",
    "chip": "HDR",
    "tone": "photo-look",
    "text": "HDR photography, wide dynamic range, crisp detail, balanced highlights and shadows, realistic textures, clear photo quality"
  },
  {
    "name": "iPhone Photo",
    "category": "Camera FX",
    "chip": "Phone",
    "tone": "camera-fx",
    "text": "iPhone-style photo, natural phone camera look, realistic exposure, casual framing, sharp details, authentic everyday snapshot"
  },
  {
    "name": "Flip Phone",
    "category": "Camera FX",
    "chip": "Flip",
    "tone": "camera-fx",
    "thumbnail": "flip_phone.webp",
    "text": "flip phone camera photo, early 2000s low-resolution mobile snapshot, tiny sensor noise, JPEG compression artifacts, chroma noise, soft blur, mild defocus, imperfect focus, low contrast, muted colors, slight color shift, uneven white balance, casual accidental snapshot feel"
  },
  {
    "name": "Tilt-Shift",
    "category": "Camera FX",
    "chip": "Tilt",
    "tone": "camera-fx",
    "text": "tilt-shift photography, selective focus, miniature-like depth, soft blurred edges, crisp central subject, stylized photo realism"
  },
  {
    "name": "Lens Distortion",
    "category": "Camera FX",
    "chip": "LD",
    "tone": "Lens",
    "thumbnail": "lens_distortion.webp",
    "text": "lens distortion effect, subtle barrel distortion, warped edges, imperfect optical lens look, photographic camera artifact, real-world wide lens feel"
  },
  {
    "name": "Fisheye Lens",
    "category": "Camera FX",
    "chip": "FE",
    "tone": "Lens",
    "thumbnail": "fisheye_lens.webp",
    "text": "fisheye lens effect, strong barrel distortion, curved wide-angle perspective, bulging center, warped edges, photographic ultra-wide lens look, real-world camera artifact"
  },
  {
    "name": "Chromatic Aberration",
    "category": "Camera FX",
    "chip": "CA",
    "tone": "Lens",
    "thumbnail": "chromatic_aberration.webp",
    "text": "chromatic aberration effect, subtle red cyan edge fringing, RGB color separation, optical lens artifact, photographic digital color shift"
  },
  {
    "name": "Silhouette Photo",
    "category": "Photo",
    "chip": "Sil",
    "tone": "photo-look",
    "text": "silhouette photography, dark realistic subject outline, bright backlight, strong contrast, minimal visible detail, dramatic photographic composition"
  },
  {
    "name": "Glamour Photo",
    "category": "Photo",
    "chip": "Glam",
    "tone": "portrait",
    "text": "glamour photography, polished lighting, smooth highlights, refined skin texture, stylish pose, clean magazine-quality finish"
  },
  {
    "name": "Landscape Photo",
    "category": "Photo",
    "chip": "Land",
    "tone": "photo-look",
    "text": "landscape photography, natural atmosphere, deep depth of field, realistic lighting, detailed environment, balanced composition"
  },
  {
    "name": "Street Photo",
    "category": "Photo",
    "chip": "Street",
    "tone": "photo-look",
    "text": "street photography, candid realism, natural light, authentic urban atmosphere, documentary-style composition, realistic detail"
  },
  {
    "name": "Beauty Photo",
    "category": "Photo",
    "chip": "Beauty",
    "tone": "portrait",
    "text": "beauty photography, clean skin detail, flattering light, refined makeup, soft highlights, premium portrait finish"
  },
  {
    "name": "Editorial Portrait",
    "category": "Photo",
    "chip": "Edit",
    "tone": "portrait",
    "text": "editorial portrait photography, refined styling, confident pose, polished lighting, magazine composition, clean detailed skin texture"
  },
  {
    "name": "Candid Portrait",
    "category": "Photo",
    "chip": "Candid",
    "tone": "portrait",
    "text": "candid portrait photography, natural expression, realistic lighting, authentic moment, soft background, clean subject detail"
  },
  {
    "name": "Movie Still",
    "category": "Photo",
    "chip": "Movie",
    "tone": "cine",
    "text": "movie still photography, cinematic framing, realistic production lighting, controlled contrast, atmospheric depth, detailed film scene"
  },
  {
    "name": "Neon Noir",
    "category": "Photo",
    "chip": "Neon",
    "tone": "cine",
    "text": "neon noir photography, dark realistic urban atmosphere, colored neon highlights, moody shadows, cinematic contrast, rain-slick real-world reflections"
  },
  {
    "name": "Action Still",
    "category": "Photo",
    "chip": "Action",
    "tone": "cinematic",
    "text": "cinematic action still, dynamic composition, realistic motion energy, controlled lighting, sharp subject focus, high-energy film atmosphere"
  },
  {
    "name": "Natural Light",
    "category": "Light",
    "chip": "Light",
    "tone": "lighting",
    "text": "natural daylight photography, soft realistic shadows, balanced exposure, authentic atmosphere, gentle color rendering"
  },
  {
    "name": "Studio Light",
    "category": "Light",
    "chip": "Studio",
    "tone": "lighting",
    "text": "professional studio lighting, clean softbox illumination, controlled shadows, sharp details, polished photographic look"
  },
  {
    "name": "Golden Hour",
    "category": "Light",
    "chip": "Gold",
    "tone": "lighting",
    "text": "golden hour lighting, warm sunlight, soft long shadows, glowing highlights, cinematic natural atmosphere"
  },
  {
  "name": "Sunlight",
  "category": "Light",
  "chip": "Sun",
  "tone": "lighting",
  "thumbnail": "sunlight.webp",
  "text": "sunlight, bright natural daylight, realistic light behavior, natural shadows, clear highlights, balanced outdoor illumination"
},
{
  "name": "Side Light",
  "category": "Light",
  "chip": "Side",
  "tone": "lighting",
  "thumbnail": "side_light.webp",
  "text": "side light, directional natural light from one side, realistic shadow falloff, sculpted form, balanced highlights"
},
{
  "name": "Backlight",
  "category": "Light",
  "chip": "Back",
  "tone": "lighting",
  "thumbnail": "backlight.webp",
  "text": "backlight, light behind the subject, glowing rim edge, natural silhouette tendency, realistic atmospheric separation"
},
{
  "name": "Top Light",
  "category": "Light",
  "chip": "Top",
  "tone": "lighting",
  "thumbnail": "top_light.webp",
  "text": "top light, light from above, natural overhead illumination, downward shadows, realistic highlight placement"
},
{
  "name": "Low Sun",
  "category": "Light",
  "chip": "Low",
  "tone": "lighting",
  "thumbnail": "low_sun.webp",
  "text": "low sun angle, warm directional sunlight, long soft-edged shadows, realistic late-day light behavior, natural atmosphere"
},
{
  "name": "Overhead Sun",
  "category": "Light",
  "chip": "Ovr",
  "tone": "lighting",
  "thumbnail": "overhead_sun.webp",
  "text": "overhead sun, high midday sunlight, short crisp shadows, bright clear daylight, realistic outdoor light behavior"
},
  {
    "name": "Light Rays",
    "category": "Light",
    "chip": "LR",
    "tone": "Light",
    "thumbnail": "light_rays.webp",
    "text": "light rays effect, visible beams of light, soft volumetric glow, sunlight shafts through atmosphere, cinematic photographic lighting mood"
  },
  {
    "name": "Low Key",
    "category": "Light",
    "chip": "Low",
    "tone": "lighting",
    "text": "low-key photography, dark background, controlled highlights, deep shadows, dramatic contrast, focused subject lighting"
  },
  {
    "name": "High Key",
    "category": "Light",
    "chip": "High",
    "tone": "lighting",
    "text": "high-key photography, bright clean lighting, soft shadows, airy white background, gentle contrast, polished look"
  },
  {
    "name": "Neon Night",
    "category": "Light",
    "chip": "Neon",
    "tone": "lighting",
    "text": "neon night lighting, colorful urban glow, reflective highlights, cinematic contrast, atmospheric background glow"
  },
  {
    "name": "Clear Sky",
    "category": "Weather",
    "chip": "Clear",
    "tone": "weather",
    "thumbnail": "clear_sky.webp",
    "text": "clear sky weather, clean blue sky, crisp visibility, calm daylight, photorealistic outdoor scenery, realistic natural atmosphere"
  },
  {
    "name": "Cloudy",
    "category": "Weather",
    "chip": "Cloud",
    "tone": "weather",
    "thumbnail": "cloudy.webp",
    "text": "cloudy weather, overcast sky, soft diffused daylight, muted shadows, photorealistic outdoor scenery, realistic natural atmosphere"
  },
  {
    "name": "Rainy",
    "category": "Weather",
    "chip": "Rain",
    "tone": "weather",
    "thumbnail": "rainy.webp",
    "text": "rainy weather, wet surfaces, soft reflections, visible raindrops, damp atmosphere, overcast daylight, photorealistic outdoor scenery, realistic natural atmosphere"
  },
  {
    "name": "Heavy Rain",
    "category": "Weather",
    "chip": "Heavy",
    "tone": "weather",
    "thumbnail": "heavy_rain.webp",
    "text": "heavy rain, strong wet atmosphere, visible rain streaks, glossy wet ground, low visibility, photorealistic outdoor scenery, realistic natural weather mood"
  },
  {
    "name": "After Rain",
    "category": "Weather",
    "chip": "After",
    "tone": "weather",
    "thumbnail": "after_rain.webp",
    "text": "after-rain atmosphere, wet pavement, fresh air, soft reflections, clearing sky, photorealistic outdoor scenery, realistic natural atmosphere"
  },
  {
    "name": "Foggy",
    "category": "Weather",
    "chip": "Fog",
    "tone": "weather",
    "thumbnail": "foggy.webp",
    "text": "foggy weather, misty air, low contrast distance, reduced visibility, atmospheric depth, photorealistic outdoor scenery, realistic natural haze"
  },
  {
    "name": "Snowy",
    "category": "Weather",
    "chip": "Snow",
    "tone": "weather",
    "thumbnail": "snowy.webp",
    "text": "snowy weather, falling snow, cold air, snow-covered ground, soft winter light, photorealistic outdoor scenery, realistic natural atmosphere"
  },
  {
    "name": "Stormy",
    "category": "Weather",
    "chip": "Storm",
    "tone": "weather",
    "thumbnail": "stormy.webp",
    "text": "stormy weather, dark clouds, dramatic sky, strong wind mood, tense atmosphere, photorealistic outdoor scenery, realistic natural lighting"
  },
  {
    "name": "Heat Haze",
    "category": "Weather",
    "chip": "Heat",
    "tone": "weather",
    "thumbnail": "heat_haze.webp",
    "text": "heat haze, shimmering hot air, dry atmosphere, harsh sunlight, washed distant contrast, photorealistic outdoor scenery, realistic summer heat mood"
  },
  {
    "name": "Product Photo",
    "category": "Photo",
    "chip": "Product",
    "tone": "commercial",
    "text": "professional product photography, clean background, sharp details, controlled reflections, accurate materials, commercial lighting"
  },
  {
    "name": "Food Photo",
    "category": "Photo",
    "chip": "Food",
    "tone": "commercial",
    "text": "professional food photography, appetizing lighting, natural texture, shallow depth of field, clean composition, rich detail"
  },
  {
    "name": "Fashion Editorial",
    "category": "Photo",
    "chip": "Fashion",
    "tone": "commercial",
    "text": "fashion editorial photography, stylish pose, refined wardrobe, studio-quality lighting, polished magazine look"
  },
  {
    "name": "Architecture",
    "category": "Photo",
    "chip": "Arch",
    "tone": "commercial",
    "text": "architectural photography, clean lines, accurate perspective, balanced lighting, sharp structural details, realistic materials"
  },
  {
    "name": "Interior Design",
    "category": "Photo",
    "chip": "Interior",
    "tone": "commercial",
    "text": "interior design photography, balanced room lighting, clean composition, realistic materials, inviting atmosphere, polished details"
  },
  {
    "name": "Anime Clean",
    "category": "Art",
    "chip": "Anime",
    "tone": "illustration",
    "text": "clean anime illustration, crisp line art, polished character design, smooth cel shading, vibrant but controlled colors"
  },
  {
    "name": "Anime Soft",
    "category": "Art",
    "chip": "Anime",
    "tone": "illustration",
    "text": "soft anime illustration, gentle lighting, delicate line art, pastel color palette, smooth shading, calm atmosphere"
  },
  {
    "name": "Anime in Photo",
    "category": "Art",
    "chip": "A+Photo",
    "tone": "illustration",
    "thumbnail": "anime_in_photo.webp",
    "text": "anime-style character in a realistic photographic background, illustrated character with clean anime features, real-world photo environment, natural photographic lighting, realistic depth and perspective, believable scene integration, clear contrast between animated subject and real background"
  },
  {
    "name": "Manga B&W",
    "category": "Art",
    "chip": "Manga",
    "tone": "illustration",
    "text": "black and white manga style, monochrome screentone shading, clean ink lines, high readability, comic panel look"
  },
  {
    "name": "Illustration",
    "category": "Art",
    "chip": "Illust",
    "tone": "illustration",
    "text": "high-quality digital illustration, polished details, clean composition, controlled lighting, appealing color harmony"
  },
  {
    "name": "Painterly",
    "category": "Art",
    "chip": "Paint",
    "tone": "illustration",
    "text": "painterly digital art, visible brush texture, soft edges, rich lighting, expressive color transitions"
  },
  {
    "name": "Watercolor",
    "category": "Art",
    "chip": "Water",
    "tone": "illustration",
    "text": "watercolor illustration, soft paper texture, translucent washes, gentle colors, delicate hand-painted look"
  },
  {
    "name": "Oil Painting",
    "category": "Art",
    "chip": "Oil",
    "tone": "illustration",
    "text": "oil painting style, rich brush strokes, textured paint surface, dramatic lighting, classical painted atmosphere"
  },
  {
    "name": "Comic",
    "category": "Art",
    "chip": "Comic",
    "tone": "illustration",
    "text": "western comic book style, bold outlines, dynamic shading, vivid colors, high-contrast graphic look"
  },
  {
    "name": "Pixelate",
    "category": "Art",
    "chip": "Pixel",
    "tone": "illustration",
    "text": "pixelated mosaic effect, chunky visible pixel blocks, low-resolution digital look, simplified colors, crisp square pixels, stylized retro image texture"
  },
  {
    "name": "Concept Art",
    "category": "Art",
    "chip": "Concept",
    "tone": "illustration",
    "text": "concept art style, detailed environment design, cinematic lighting, strong composition, polished production artwork"
  },
  {
    "name": "Dreamy",
    "category": "Mood",
    "chip": "Dream",
    "tone": "mood",
    "text": "dreamy photographic atmosphere, soft glow, gentle contrast, subtle haze, delicate highlights, calm realistic emotional mood"
  },
  {
    "name": "Dark Fantasy",
    "category": "Mood",
    "chip": "Dark",
    "tone": "mood",
    "text": "dark fantasy atmosphere, cinematic realistic shadows, mysterious lighting, ornate real-world texture, moody photographic composition"
  },
  {
    "name": "High Detail",
    "category": "Mood",
    "chip": "Detail",
    "tone": "mood",
    "text": "highly detailed realistic image, crisp textures, sharp subject definition, refined materials, clean photographic lighting, intricate visual detail"
  },
  {
    "name": "Minimal Clean",
    "category": "Mood",
    "chip": "Minimal",
    "tone": "mood",
    "text": "minimal clean photographic style, simple composition, uncluttered background, balanced spacing, refined modern real-world presentation"
  },
  {
    "name": "Retro Pop",
    "category": "Mood",
    "chip": "Retro",
    "tone": "mood",
    "text": "retro pop style, bold color palette, graphic shapes, playful composition, clean vintage-inspired visual design"
  },
  {
    "name": "Paper Print",
    "category": "Finish",
    "chip": "Paper",
    "tone": "finish",
    "thumbnail": "paper_print.webp",
    "text": "printed on paper, realistic paper grain, matte texture, soft ink absorption, tactile photographic print finish"
  },
  {
    "name": "Matte Print",
    "category": "Finish",
    "chip": "Matte",
    "tone": "finish",
    "thumbnail": "matte_print.webp",
    "text": "matte print finish, realistic non-reflective surface, soft contrast, smooth paper texture, photographic material feel"
  },
  {
    "name": "Glossy Print",
    "category": "Finish",
    "chip": "Glossy",
    "tone": "finish",
    "thumbnail": "glossy_print.webp",
    "text": "glossy print finish, realistic reflective coating, crisp contrast, polished photo paper surface"
  },
  {
    "name": "Canvas Texture",
    "category": "Finish",
    "chip": "Canvas",
    "tone": "finish",
    "thumbnail": "canvas_texture.webp",
    "text": "canvas texture, realistic woven fabric surface, subtle textile grain, tactile material finish"
  },
  {
    "name": "Fabric Print",
    "category": "Finish",
    "chip": "Fabric",
    "tone": "finish",
    "thumbnail": "fabric_print.webp",
    "text": "printed on fabric, realistic soft cloth texture, woven fibers, gentle ink diffusion, textile surface finish"
  },
  {
    "name": "Metal Print",
    "category": "Finish",
    "chip": "Metal",
    "tone": "finish",
    "thumbnail": "metal_print.webp",
    "text": "printed on metal, realistic glossy metallic surface, reflective highlights, sleek hard material finish"
  },
  {
    "name": "Glass Print",
    "category": "Finish",
    "chip": "Glass",
    "tone": "finish",
    "thumbnail": "glass_print.webp",
    "text": "behind glass, realistic glossy glass surface, subtle reflections, polished transparent finish"
  },
  {
    "name": "Glass Distortion",
    "category": "Finish",
    "chip": "GD",
    "tone": "Finish",
    "thumbnail": "glass_distortion.webp",
    "text": "glass distortion effect, warped refraction, subtle transparent ripples, reflective glass surface, photographic material detail, real-world distorted texture"
  },
  {
    "name": "Wet Surface",
    "category": "Finish",
    "chip": "Wet",
    "tone": "finish",
    "thumbnail": "wet_surface.webp",
    "text": "wet surface effect, realistic water droplets, glossy highlights, damp reflective texture, fresh moisture finish"
  },
  {
    "name": "Water Droplets",
    "category": "Finish",
    "chip": "Drops",
    "tone": "finish",
    "thumbnail": "water_droplets.webp",
    "text": "water droplets on surface, realistic clear beads of moisture, glossy highlights, fresh wet photographic finish"
  },
  {
    "name": "Dusty Surface",
    "category": "Finish",
    "chip": "Dust",
    "tone": "finish",
    "thumbnail": "dusty_surface.webp",
    "text": "dusty surface effect, realistic fine dust particles, muted texture, aged dry finish, subtle grime"
  },
  {
    "name": "Fractal Noise",
    "category": "Finish",
    "chip": "FN",
    "tone": "Noise",
    "thumbnail": "fractal_noise.webp",
    "text": "fractal noise texture, cloudy procedural grain, smoky abstract background detail, organic noise pattern, photographic atmospheric surface texture"
  },
  {
    "name": "Scratched Print",
    "category": "Finish",
    "chip": "Scratch",
    "tone": "finish",
    "thumbnail": "scratched_print.webp",
    "text": "scratched print surface, realistic fine scratches, worn texture, distressed physical finish"
  },
  {
    "name": "Vintage Paper",
    "category": "Finish",
    "chip": "Vintage",
    "tone": "finish",
    "thumbnail": "vintage_paper.webp",
    "text": "vintage paper texture, realistic aged paper grain, faded ink, warm yellowed surface, old printed finish"
  },
  {
    "name": "Stone Surface",
    "category": "Finish",
    "chip": "Stone",
    "tone": "finish",
    "thumbnail": "stone_surface.webp",
    "text": "stone surface texture, realistic rough mineral grain, cool hard material finish, natural stone detail"
  },
  {
    "name": "Marble Finish",
    "category": "Finish",
    "chip": "Marble",
    "tone": "finish",
    "thumbnail": "marble_finish.webp",
    "text": "marble surface finish, realistic subtle veining, polished stone texture, elegant mineral material"
  },
  {
    "name": "Concrete Finish",
    "category": "Finish",
    "chip": "Concrete",
    "tone": "finish",
    "thumbnail": "concrete_finish.webp",
    "text": "concrete surface texture, realistic rough gray material, fine grain, industrial matte finish"
  },
  {
    "name": "Rusty Metal",
    "category": "Finish",
    "chip": "Rust",
    "tone": "finish",
    "thumbnail": "rusty_metal.webp",
    "text": "rusty metal surface, realistic oxidized texture, reddish brown corrosion, worn industrial finish"
  },
  {
    "name": "Aged Metal",
    "category": "Finish",
    "chip": "Aged",
    "tone": "finish",
    "thumbnail": "aged_metal.webp",
    "text": "aged metal finish, realistic tarnished surface, subtle scratches, oxidized patina, weathered material"
  },
  {
    "name": "Patina Finish",
    "category": "Finish",
    "chip": "Patina",
    "tone": "finish",
    "thumbnail": "patina_finish.webp",
    "text": "patina surface finish, realistic green-blue oxidized metal, aged copper look, weathered decorative texture"
  },
  {
    "name": "Wood Grain",
    "category": "Finish",
    "chip": "Wood",
    "tone": "finish",
    "thumbnail": "wood_grain.webp",
    "text": "wood grain texture, realistic natural wooden surface, warm organic material finish, visible grain lines"
  },
  {
    "name": "Leather Finish",
    "category": "Finish",
    "chip": "Leather",
    "tone": "finish",
    "thumbnail": "leather_finish.webp",
    "text": "leather surface texture, realistic subtle grain, soft worn material, tactile premium finish"
  },
  {
    "name": "Ceramic Glaze",
    "category": "Finish",
    "chip": "Ceramic",
    "tone": "finish",
    "thumbnail": "ceramic_glaze.webp",
    "text": "ceramic glazed surface, realistic smooth glossy coating, subtle reflections, crafted material finish"
  },
  {
    "name": "Plastic Finish",
    "category": "Finish",
    "chip": "Plastic",
    "tone": "finish",
    "thumbnail": "plastic_finish.webp",
    "text": "plastic surface finish, realistic smooth synthetic texture, clean highlights, modern manufactured material"
  },
  {
    "name": "Slime Finish",
    "category": "Finish",
    "chip": "Slime",
    "tone": "finish",
    "thumbnail": "slime_finish.webp",
    "text": "slime surface finish, realistic glossy translucent gel texture, sticky wet highlights, soft gooey material look"
  },
  {
    "name": "Gel Finish",
    "category": "Finish",
    "chip": "Gel",
    "tone": "finish",
    "thumbnail": "gel_finish.webp",
    "text": "gel surface finish, realistic translucent glossy material, smooth jelly-like highlights, soft elastic texture"
  },
  {
    "name": "Liquid Gloss",
    "category": "Finish",
    "chip": "Liquid",
    "tone": "finish",
    "thumbnail": "liquid_gloss.webp",
    "text": "liquid glossy finish, realistic wet reflective coating, smooth flowing highlights, polished fluid surface"
  },
  {
    "name": "Gummy Finish",
    "category": "Finish",
    "chip": "Gummy",
    "tone": "finish",
    "thumbnail": "gummy_finish.webp",
    "text": "gummy material finish, realistic soft translucent candy texture, rounded glossy surface, playful elastic look"
  },
  {
    "name": "Wax Finish",
    "category": "Finish",
    "chip": "Wax",
    "tone": "finish",
    "thumbnail": "wax_finish.webp",
    "text": "wax surface finish, realistic soft semi-gloss texture, smooth melted material, subtle warm highlights"
  },
  {
    "name": "Fantasy Color",
    "category": "Color Theme",
    "chip": "FC",
    "tone": "color-theme",
    "thumbnail": "fantasy_color.webp",
    "text": "fantasy color theme, magical saturated palette, glowing photographic color grading, whimsical real-world atmosphere"
  },
{
    "name": "Red Theme",
    "category": "Color Theme",
    "chip": "Red",
    "tone": "color-theme",
    "thumbnail": "red_theme.webp",
    "text": "red color theme, cohesive red palette, warm red color grading, strong visual unity"
  },
  {
    "name": "Blue Theme",
    "category": "Color Theme",
    "chip": "Blue",
    "tone": "color-theme",
    "thumbnail": "blue_theme.webp",
    "text": "blue color theme, cohesive blue palette, cool calm color grading, unified blue atmosphere"
  },
  {
    "name": "Pink Theme",
    "category": "Color Theme",
    "chip": "Pink",
    "tone": "color-theme",
    "thumbnail": "pink_theme.webp",
    "text": "pink color theme, cohesive pink palette, soft rosy color grading, harmonious pink atmosphere"
  },
  {
    "name": "Purple Theme",
    "category": "Color Theme",
    "chip": "Purple",
    "tone": "color-theme",
    "thumbnail": "purple_theme.webp",
    "text": "purple color theme, cohesive violet palette, rich purple color grading, elegant moody atmosphere"
  },
  {
    "name": "Green Theme",
    "category": "Color Theme",
    "chip": "Green",
    "tone": "color-theme",
    "thumbnail": "green_theme.webp",
    "text": "green color theme, cohesive green palette, fresh natural color grading, balanced green atmosphere"
  },
  {
    "name": "Yellow Theme",
    "category": "Color Theme",
    "chip": "Yellow",
    "tone": "color-theme",
    "thumbnail": "yellow_theme.webp",
    "text": "yellow color theme, cohesive yellow palette, bright sunny color grading, warm cheerful atmosphere"
  },
  {
    "name": "Orange Theme",
    "category": "Color Theme",
    "chip": "Orange",
    "tone": "color-theme",
    "thumbnail": "orange_theme.webp",
    "text": "orange color theme, cohesive orange palette, warm energetic color grading, vivid orange atmosphere"
  },
  {
    "name": "Cyan Theme",
    "category": "Color Theme",
    "chip": "Cyan",
    "tone": "color-theme",
    "thumbnail": "cyan_theme.webp",
    "text": "cyan color theme, cohesive cyan palette, clear cool color grading, bright aquatic atmosphere"
  },
  {
    "name": "Teal Theme",
    "category": "Color Theme",
    "chip": "Teal",
    "tone": "color-theme",
    "thumbnail": "teal_theme.webp",
    "text": "teal color theme, cohesive teal palette, cinematic blue-green color grading, polished atmosphere"
  },
  {
    "name": "Magenta Theme",
    "category": "Color Theme",
    "chip": "Magenta",
    "tone": "color-theme",
    "thumbnail": "magenta_theme.webp",
    "text": "magenta color theme, cohesive magenta palette, bold pink-purple color grading, vibrant atmosphere"
  },
  {
    "name": "Warm Theme",
    "category": "Color Theme",
    "chip": "Warm",
    "tone": "color-theme",
    "thumbnail": "warm_theme.webp",
    "text": "warm color theme, amber highlights, warm color grading, inviting golden atmosphere"
  },
  {
    "name": "Cool Theme",
    "category": "Color Theme",
    "chip": "Cool",
    "tone": "color-theme",
    "thumbnail": "cool_theme.webp",
    "text": "cool color theme, blue cool palette, clean cool color grading, calm atmospheric mood"
  },
  {
    "name": "Pastel Theme",
    "category": "Color Theme",
    "chip": "Pastel",
    "tone": "color-theme",
    "thumbnail": "pastel_theme.webp",
    "text": "pastel color theme, soft low-saturation palette, gentle airy atmosphere, delicate color grading"
  },
  {
    "name": "Neon Theme",
    "category": "Color Theme",
    "chip": "Neon",
    "tone": "color-theme",
    "thumbnail": "neon_theme.webp",
    "text": "neon color theme, electric saturated palette, glowing highlights, energetic futuristic color grading"
  },
  {
    "name": "Muted Theme",
    "category": "Color Theme",
    "chip": "Muted",
    "tone": "color-theme",
    "thumbnail": "muted_theme.webp",
    "text": "muted color theme, desaturated palette, subdued color grading, calm understated atmosphere"
  },
  {
    "name": "Monochrome Theme",
    "category": "Color Theme",
    "chip": "Monochro",
    "tone": "color-theme",
    "thumbnail": "monochrome_theme.webp",
    "text": "monochrome color theme, black and white palette, clean grayscale color grading, strong tonal contrast"
  },
  {
    "name": "Sepia Theme",
    "category": "Color Theme",
    "chip": "Sepia",
    "tone": "color-theme",
    "thumbnail": "sepia_theme.webp",
    "text": "sepia color theme, warm brown palette, vintage sepia color grading, nostalgic atmosphere"
  },
  {
    "name": "Gold Theme",
    "category": "Color Theme",
    "chip": "Gold",
    "tone": "color-theme",
    "thumbnail": "gold_theme.webp",
    "text": "gold color theme, golden palette, warm metallic highlights, premium luminous color grading"
  },
  {
    "name": "Silver Theme",
    "category": "Color Theme",
    "chip": "Silver",
    "tone": "color-theme",
    "thumbnail": "silver_theme.webp",
    "text": "silver color theme, cool metallic palette, clean silver-gray color grading, polished atmosphere"
  },
  {
    "name": "Dark Theme",
    "category": "Color Theme",
    "chip": "Dark",
    "tone": "color-theme",
    "thumbnail": "dark_theme.webp",
    "text": "dark color theme, deep shadow palette, low brightness color grading, moody dramatic atmosphere"
  },
  {
    "name": "Bright Theme",
    "category": "Color Theme",
    "chip": "Bright",
    "tone": "color-theme",
    "thumbnail": "bright_theme.webp",
    "text": "bright color theme, high-key luminous palette, clean bright color grading, airy atmosphere"
  },
  {
    "name": "Earth Theme",
    "category": "Color Theme",
    "chip": "Earth",
    "tone": "color-theme",
    "thumbnail": "earth_theme.webp",
    "text": "earth color theme, natural brown and green palette, organic grounded color grading, warm natural atmosphere"
  },
  {
    "name": "Cream Theme",
    "category": "Color Theme",
    "chip": "Cream",
    "tone": "color-theme",
    "thumbnail": "cream_theme.webp",
    "text": "cream color theme, soft cream palette, warm gentle color grading, light elegant atmosphere"
  },
  {
    "name": "Black & White",
    "category": "Color Theme",
    "chip": "B&W",
    "tone": "color-theme",
    "thumbnail": "black_white.webp",
    "text": "black and white color theme, pure monochrome palette, strong tonal contrast, clean graphic color grading"
  },
  {
    "name": "Crazy Color",
    "category": "Color Theme",
    "chip": "CC",
    "tone": "color-theme",
    "thumbnail": "crazy_color.webp",
    "text": "crazy color theme, playful clashing palette, unexpected color combinations, photographic color grading, energetic real-world atmosphere"
  },
  {
    "name": "Candy Color",
    "category": "Color Theme",
    "chip": "CC",
    "tone": "color-theme",
    "thumbnail": "candy_color.webp",
    "text": "candy color theme, sweet bright palette, playful pastel-neon colors, photographic color grading, cheerful glossy atmosphere"
  },
  {
    "name": "Pop Color",
    "category": "Color Theme",
    "chip": "PC",
    "tone": "color-theme",
    "thumbnail": "pop_color.webp",
    "text": "pop color theme, bold bright palette, saturated colors, photographic color grading, energetic real-world atmosphere"
  },
  {
    "name": "Dreamy Color",
    "category": "Color Theme",
    "chip": "DC",
    "tone": "color-theme",
    "thumbnail": "dreamy_color.webp",
    "text": "dreamy color theme, soft luminous palette, gentle haze, photographic pastel color grading, realistic atmospheric mood"
  },
  {
    "name": "Acid Color",
    "category": "Color Theme",
    "chip": "AC",
    "tone": "color-theme",
    "thumbnail": "acid_color.webp",
    "text": "acid color theme, intense fluorescent palette, surreal high-energy photographic color grading, experimental real-world atmosphere"
  },
  {
    "name": "Cyber Color",
    "category": "Color Theme",
    "chip": "CC",
    "tone": "color-theme",
    "thumbnail": "cyber_color.webp",
    "text": "cyber color theme, neon cyan and magenta palette, dark futuristic contrast, photographic digital glow atmosphere"
  },
  {
    "name": "Rainbow Color",
    "category": "Color Theme",
    "chip": "RC",
    "tone": "color-theme",
    "thumbnail": "rainbow_color.webp",
    "text": "rainbow color theme, full-spectrum colorful palette, photographic multicolor grading, vibrant real-world atmosphere"
  },
  {
    "name": "Holographic Color",
    "category": "Color Theme",
    "chip": "HC",
    "tone": "color-theme",
    "thumbnail": "holographic_color.webp",
    "text": "holographic color theme, iridescent pastel palette, shifting rainbow highlights, glossy photographic color grading"
  },
  {
    "name": "Vaporwave Color",
    "category": "Color Theme",
    "chip": "VC",
    "tone": "color-theme",
    "thumbnail": "vaporwave_color.webp",
    "text": "vaporwave color theme, pink cyan purple palette, retro digital photographic color grading, nostalgic surreal atmosphere"
  },
  {
    "name": "Stardust Fantasy",
    "category": "Color Theme",
    "chip": "SF",
    "tone": "color-theme",
    "thumbnail": "stardust_fantasy.webp",
    "text": "stardust fantasy atmosphere, soft blue lavender and pink palette, fine sparkling light particles, gentle photographic color grading, magical real-world background mood"
  },
  {
    "name": "Shooting Star Fantasy",
    "category": "Color Theme",
    "chip": "SS",
    "tone": "color-theme",
    "thumbnail": "shooting_star_fantasy.webp",
    "text": "shooting star fantasy atmosphere, deep blue and violet palette, bright streaks of light, dreamy night-sky glow, photographic color grading, energetic real-world background mood"
  },
  {
    "name": "Galaxy Atmosphere",
    "category": "Color Theme",
    "chip": "GA",
    "tone": "color-theme",
    "thumbnail": "galaxy_atmosphere.webp",
    "text": "galaxy atmosphere, deep purple blue and magenta palette, subtle cosmic glow, soft nebula-like gradients, photographic color grading, mysterious real-world background mood"
  },
  {
    "name": "Aurora Mood",
    "category": "Color Theme",
    "chip": "AM",
    "tone": "color-theme",
    "thumbnail": "aurora_mood.webp",
    "text": "aurora mood, green cyan violet and blue palette, flowing luminous gradients, atmospheric sky-like glow, photographic color grading, calm real-world background mood"
  },
  {
    "name": "Dreamland Color",
    "category": "Color Theme",
    "chip": "DL",
    "tone": "color-theme",
    "thumbnail": "dreamland_color.webp",
    "text": "dreamland color atmosphere, soft pastel rainbow palette, glowing haze, gentle photographic color grading, airy real-world background mood"
  },
  {
    "name": "Heart Magic Color",
    "category": "Color Theme",
    "chip": "HM",
    "tone": "color-theme",
    "thumbnail": "heart_magic_color.webp",
    "text": "heart magic color atmosphere, soft pink and violet palette, subtle sweet glow, gentle sparkle accents, photographic color grading, romantic real-world background mood"
  },
  {
    "name": "Harajuku Decora Mood",
    "category": "Color Theme",
    "chip": "HD",
    "tone": "color-theme",
    "thumbnail": "harajuku_decora_mood.webp",
    "text": "harajuku decora mood, colorful real-world street fashion atmosphere, pink and pastel color accents, playful accessory-like color pops, photographic color grading"
  },
  {
    "name": "Pastel Kawaii Mood",
    "category": "Color Theme",
    "chip": "PK",
    "tone": "color-theme",
    "thumbnail": "pastel_kawaii_mood.webp",
    "text": "pastel kawaii mood, soft pink mint lavender and cream palette, cute gentle atmosphere, clean photographic color grading, sweet real-world background mood"
  },
  {
    "name": "Pop Kawaii Color",
    "category": "Color Theme",
    "chip": "PK",
    "tone": "color-theme",
    "thumbnail": "pop_kawaii_color.webp",
    "text": "pop kawaii color atmosphere, bright pink cyan yellow and lavender palette, cheerful colorful accents, photographic color grading, playful real-world background mood"
  },
  {
    "name": "Japanese Mood",
    "category": "Color Theme",
    "chip": "JP",
    "tone": "color-theme",
    "thumbnail": "japanese_mood.webp",
    "text": "japanese mood color atmosphere, vermilion indigo warm gold and soft paper tones, quiet traditional ambience, photographic color grading, calm real-world background mood"
  },
  {
    "name": "Sakura Japan Color",
    "category": "Color Theme",
    "chip": "SA",
    "tone": "color-theme",
    "thumbnail": "sakura_japan_color.webp",
    "text": "sakura japan color atmosphere, pale cherry blossom pink, soft white, warm spring light, gentle Japanese mood, photographic color grading, airy real-world background mood"
  },
  {
    "name": "Samurai Drama Color",
    "category": "Color Theme",
    "chip": "SD",
    "tone": "color-theme",
    "thumbnail": "samurai_drama_color.webp",
    "text": "samurai drama color atmosphere, deep black, dark red, muted gold and smoky neutral tones, period drama tension, cinematic photographic color grading"
  },
  {
    "name": "Western Desert Color",
    "category": "Color Theme",
    "chip": "WD",
    "tone": "color-theme",
    "thumbnail": "western_desert_color.webp",
    "text": "western desert color atmosphere, dusty sand, burnt orange, leather brown and sunset gold palette, dry frontier mood, photographic color grading, real-world background atmosphere"
  },
  {
    "name": "Indian Festival Color",
    "category": "Color Theme",
    "chip": "IF",
    "tone": "color-theme",
    "thumbnail": "indian_festival_color.webp",
    "text": "indian festival color atmosphere, saffron magenta turquoise and gold palette, festive color richness, photographic color grading, vibrant real-world background mood"
  },
  {
    "name": "Arabian Night Color",
    "category": "Color Theme",
    "chip": "AN",
    "tone": "color-theme",
    "thumbnail": "arabian_night_color.webp",
    "text": "arabian night color atmosphere, deep blue violet gold and warm lantern glow, night-market fantasy mood, photographic color grading, mysterious real-world background atmosphere"
  },
  {
    "name": "Egyptian Gold Color",
    "category": "Color Theme",
    "chip": "EG",
    "tone": "color-theme",
    "thumbnail": "egyptian_gold_color.webp",
    "text": "egyptian gold color atmosphere, desert sand, turquoise, black accents and aged gold palette, ancient monument mood, photographic color grading, warm real-world background atmosphere"
  },
  {
    "name": "Chinese Lantern Color",
    "category": "Color Theme",
    "chip": "CL",
    "tone": "color-theme",
    "thumbnail": "chinese_lantern_color.webp",
    "text": "chinese lantern color atmosphere, rich red, warm gold, deep night tones and lantern glow, festive street mood, photographic color grading, real-world background atmosphere"
  },
  {
    "name": "Korean Pastel Color",
    "category": "Color Theme",
    "chip": "KP",
    "tone": "color-theme",
    "thumbnail": "korean_pastel_color.webp",
    "text": "korean pastel color atmosphere, soft pink mint sky blue and cream palette, clean modern gentle mood, photographic color grading, airy real-world background atmosphere"
  },
  {
    "name": "Nordic Winter Color",
    "category": "Color Theme",
    "chip": "NW",
    "tone": "color-theme",
    "thumbnail": "nordic_winter_color.webp",
    "text": "nordic winter color atmosphere, white blue silver and pale gray palette, cold quiet snow mood, photographic color grading, clean real-world background atmosphere"
  },
  {
    "name": "Tropical Island Color",
    "category": "Color Theme",
    "chip": "TI",
    "tone": "color-theme",
    "thumbnail": "tropical_island_color.webp",
    "text": "tropical island color atmosphere, turquoise ocean, lush green, sunlit yellow and coral accents, bright vacation mood, photographic color grading, real-world background atmosphere"
  },
  {
    "name": "Virtual Diva Teal",
    "category": "Color Theme",
    "chip": "VD",
    "tone": "color-theme",
    "thumbnail": "virtual_diva_teal.webp",
    "text": "virtual diva teal color atmosphere, teal cyan black and soft neon accents, digital stage-like color mood, clean photographic color grading, vivid real-world background atmosphere"
  },
  {
    "name": "Heterochromia Eyes",
    "category": "Color Theme",
    "chip": "HE",
    "tone": "color-theme",
    "thumbnail": "heterochromia_eyes.webp",
    "text": "heterochromia eyes, natural realistic iris detail, different eye colors, one blue eye and one amber or green eye, subtle photographic color accent, clean real-world portrait detail"
  },
  {
      "name": "Classroom",
      "category": "Background",
      "tone": "background",
      "thumbnail": "classroom.webp",
      "text": "photorealistic empty classroom background, clean school interior, desks and blackboard, natural indoor lighting, practical everyday scene, no people"
    },
    {
      "name": "Train Interior",
      "category": "Background",
      "tone": "background",
      "thumbnail": "train_interior.webp",
      "text": "photorealistic train interior background, commuter rail carriage, seats and windows, clean public transport scene, natural available light, no people"
    },
    {
      "name": "Bus Interior",
      "category": "Background",
      "tone": "background",
      "thumbnail": "bus_interior.webp",
      "text": "photorealistic bus interior background, rows of seats, aisle and windows, everyday public transport setting, realistic lighting, no people"
    },
    {
      "name": "Living Room",
      "category": "Background",
      "tone": "background",
      "thumbnail": "living_room.webp",
      "text": "photorealistic living room background, comfortable home interior, sofa and warm practical decor, natural window light, clean everyday setting, no people"
    },
    {
      "name": "Kitchen",
      "category": "Background",
      "tone": "background",
      "thumbnail": "kitchen.webp",
      "text": "photorealistic kitchen background, clean home kitchen, counters and cabinets, practical indoor lighting, realistic everyday interior, no people"
    },
    {
      "name": "Bathroom",
      "category": "Background",
      "tone": "background",
      "thumbnail": "bathroom.webp",
      "text": "photorealistic bathroom background, clean residential bathroom, tiles and mirror, soft indoor lighting, realistic private interior, no people"
    },
    {
      "name": "Shower Room",
      "category": "Background",
      "tone": "background",
      "thumbnail": "shower_room.webp",
      "text": "photorealistic shower room background, clean tiled shower space, glass and bathroom fixtures, soft realistic lighting, no people"
    },
    {
      "name": "Bedroom",
      "category": "Background",
      "tone": "background",
      "thumbnail": "bedroom.webp",
      "text": "photorealistic bedroom background, simple bed and calm room decor, soft natural light, realistic home interior, no people"
    },
    {
      "name": "Dining Room",
      "category": "Background",
      "tone": "background",
      "thumbnail": "dining_room.webp",
      "text": "photorealistic dining room background, dining table and chairs, clean home interior, balanced indoor lighting, no people"
    },
    {
      "name": "Modern Hotel",
      "category": "Background",
      "tone": "background",
      "thumbnail": "modern_hotel.webp",
      "text": "photorealistic modern hotel room background, clean upscale interior, bed and soft ambient lighting, realistic travel setting, no people"
    },
    {
      "name": "Cafe",
      "category": "Background",
      "tone": "background",
      "thumbnail": "cafe.webp",
      "text": "photorealistic cafe background, cozy coffee shop interior, tables and warm lighting, realistic everyday location, no people"
    },
    {
      "name": "Office",
      "category": "Background",
      "tone": "background",
      "thumbnail": "office.webp",
      "text": "photorealistic office background, modern workplace interior, desks and clean business setting, balanced indoor light, no people"
    },
    {
      "name": "Library",
      "category": "Background",
      "tone": "background",
      "thumbnail": "library.webp",
      "text": "photorealistic library background, bookshelves and quiet reading space, warm indoor lighting, realistic calm atmosphere, no people"
    },
    {
      "name": "Art Museum",
      "category": "Background",
      "tone": "background",
      "thumbnail": "art_museum.webp",
      "text": "photorealistic art museum background, clean gallery hall, framed artworks and spacious interior, soft exhibition lighting, no people"
    },
    {
      "name": "Gallery Room",
      "category": "Background",
      "tone": "background",
      "thumbnail": "gallery_room.webp",
      "text": "photorealistic gallery room background, minimalist exhibition space, white walls and polished floor, controlled indoor lighting, no people"
    },
    {
      "name": "City Street",
      "category": "Background",
      "tone": "background",
      "thumbnail": "city_street.webp",
      "text": "photorealistic city street background, everyday urban street, buildings and sidewalk, natural daylight, practical real-world scene, no people"
    },
    {
      "name": "Shopping Mall",
      "category": "Background",
      "tone": "background",
      "thumbnail": "shopping_mall.webp",
      "text": "photorealistic shopping mall background, clean indoor commercial space, storefronts and polished floor, bright practical lighting, no people"
    },
    {
      "name": "Airport",
      "category": "Background",
      "tone": "background",
      "thumbnail": "airport.webp",
      "text": "photorealistic airport terminal background, clean travel concourse, glass and signage, bright indoor lighting, no people"
    },
    {
      "name": "Rooftop",
      "category": "Background",
      "tone": "background",
      "thumbnail": "rooftop.webp",
      "text": "photorealistic rooftop background, open city rooftop space, skyline view and practical outdoor lighting, realistic urban setting, no people"
    },
    {
      "name": "European Street",
      "category": "Background",
      "tone": "background",
      "thumbnail": "european_street.webp",
      "text": "photorealistic European street background, classic building facades, sidewalk and calm travel atmosphere, natural daylight, no people"
    },
    {
      "name": "Paris Street",
      "category": "Background",
      "tone": "background",
      "thumbnail": "paris_street.webp",
      "text": "photorealistic Paris street background, elegant urban architecture, sidewalk cafe feeling, natural daylight, realistic travel scene, no people"
    },
    {
      "name": "New York Street",
      "category": "Background",
      "tone": "background",
      "thumbnail": "new_york_street.webp",
      "text": "photorealistic New York street background, dense urban blocks, storefronts and sidewalk, realistic city daylight, no people"
    },
    {
      "name": "Street Snap",
      "category": "Background",
      "tone": "background",
      "thumbnail": "street_snap.webp",
      "text": "photorealistic street snapshot background, casual outdoor urban location, natural available light, everyday documentary atmosphere, no people"
    },
    {
      "name": "Graffiti Wall",
      "category": "Background",
      "tone": "background",
      "thumbnail": "graffiti_wall.webp",
      "text": "photorealistic graffiti wall background, colorful painted urban wall, street texture and practical daylight, realistic location, no people"
    },
    {
      "name": "Back Alley",
      "category": "Background",
      "tone": "background",
      "thumbnail": "back_alley.webp",
      "text": "photorealistic back alley background, narrow urban passage, textured walls and pavement, natural practical lighting, realistic street scene, no people"
    },
    {
      "name": "Underpass",
      "category": "Background",
      "tone": "background",
      "thumbnail": "underpass.webp",
      "text": "photorealistic underpass background, concrete urban passage, overhead structure and street texture, realistic available light, no people"
    },
    {
      "name": "Night Street",
      "category": "Background",
      "tone": "background",
      "thumbnail": "night_street.webp",
      "text": "photorealistic night street background, urban street lights, reflective pavement and evening atmosphere, realistic low light scene, no people"
    },
    {
      "name": "Industrial Street",
      "category": "Background",
      "tone": "background",
      "thumbnail": "industrial_street.webp",
      "text": "photorealistic industrial street background, warehouse exterior, loading doors and concrete walls, neutral daylight, realistic practical location, no people"
    },
    {
      "name": "Convenience Store",
      "category": "Background",
      "tone": "background",
      "thumbnail": "convenience_store.webp",
      "text": "photorealistic convenience store background, bright retail aisles, shelves and refrigerated cases, clean indoor lighting, no people"
    },
    {
      "name": "Japanese Room",
      "category": "Background",
      "tone": "background",
      "thumbnail": "japanese_room.webp",
      "text": "photorealistic traditional Japanese tatami room background, shoji screens, tatami floor, wooden interior and alcove, warm calm lighting, no people"
    }
,
  {
    "name": "Forest Path",
    "category": "Background",
    "tone": "background",
    "thumbnail": "forest_path.webp",
    "text": "photorealistic forest path background, green woodland trail, mossy trees and natural sunlight, calm outdoor nature setting, no people"
  }
,
  {
    "name": "Restaurant",
    "category": "Background",
    "tone": "background",
    "thumbnail": "restaurant.webp",
    "text": "photorealistic restaurant background, warm dining room interior, tables, chairs and ambient lighting, realistic indoor location, no people"
  }
,
  {
    "name": "Bar",
    "category": "Background",
    "tone": "background",
    "thumbnail": "bar.webp",
    "text": "photorealistic bar background, warm dim lounge interior, wooden counter, stools and bottle shelves, realistic moody indoor lighting, no people"
  }
,
  {
    "name": "School Hallway",
    "category": "Background",
    "tone": "background",
    "thumbnail": "school_hallway.webp",
    "text": "Japanese school hallway after school background, Classroom doors, lockers, windows with soft afternoon light, quiet empty corridor atmosphere"
  }
,
  {
    "name": "Gym Room",
    "category": "Background",
    "tone": "background",
    "thumbnail": "gym_room.webp",
    "text": "photorealistic gymnasium background, indoor sports hall, polished wooden floor, court lines, basketball hoops and bright window light, no people"
  }
,
  {
    "name": "Subway Station",
    "category": "Background",
    "tone": "background",
    "thumbnail": "subway_station.webp",
    "text": "photorealistic subway station background, underground train platform, tiled walls, station signs and practical fluorescent lighting, no people"
  }
,
  {
    "name": "Supermarket",
    "category": "Background",
    "tone": "background",
    "thumbnail": "supermarket.webp",
    "text": "supermarket aisle background, product shelves, bright practical lighting, everyday shopping atmosphere, no main human subject"
  }
,
  {
    "name": "Riverbank",
    "category": "Background",
    "tone": "background",
    "thumbnail": "riverbank.webp",
    "text": "riverbank background, walkway, railing, water, open sky, calm outdoor atmosphere, no main human subject"
  }
,
  {
    "name": "Harbor",
    "category": "Background",
    "tone": "background",
    "thumbnail": "harbor.webp",
    "text": "harbor background, boats, water, warehouses, seaside industrial atmosphere, no main human subject"
  }
,
  {
    "name": "Greenhouse",
    "category": "Background",
    "tone": "background",
    "thumbnail": "greenhouse.webp",
    "text": "greenhouse background, glass roof, plants, soft daylight, calm botanical atmosphere, no main human subject"
  }
,
  {
    "name": "Kyoto Temple",
    "category": "Background",
    "tone": "background",
    "thumbnail": "kyoto_temple.webp",
    "text": "traditional Kyoto temple background, wooden architecture, garden, calm Japanese atmosphere, no main human subject"
  }
,
  {
    "name": "Beach",
    "category": "Background",
    "tone": "background",
    "thumbnail": "beach.webp",
    "text": "beach background, sand, ocean, bright natural daylight, no main human subject"
  }
,
  {
    "name": "Tropical Beach",
    "category": "Background",
    "tone": "background",
    "thumbnail": "tropical_beach.webp",
    "text": "tropical beach background, white sand, blue ocean, palm trees, bright resort atmosphere, no main human subject"
  }
,
  {
    "name": "Ocean Cottage",
    "category": "Background",
    "tone": "background",
    "thumbnail": "ocean_cottage.webp",
    "text": "oceanfront cottage veranda background, sea view, wooden deck, calm resort atmosphere, no main human subject"
  }
,
  {
    "name": "Beach Bungalow",
    "category": "Background",
    "tone": "background",
    "thumbnail": "beach_bungalow.webp",
    "text": "beach bungalow room background, wooden interior, ocean light, relaxed tropical resort mood, no main human subject"
  }
,
  {
    "name": "Resort Pool",
    "category": "Background",
    "tone": "background",
    "thumbnail": "resort_pool.webp",
    "text": "resort swimming pool background, clear blue water, poolside chairs, bright vacation atmosphere, no main human subject"
  }
,
  {
    "name": "Public Pool",
    "category": "Background",
    "tone": "background",
    "thumbnail": "public_pool.webp",
    "text": "public swimming pool background, blue pool lanes, tiled floor, clean daytime facility atmosphere, no main human subject"
  }
,
  {
    "name": "Aquarium",
    "category": "Background",
    "tone": "background",
    "thumbnail": "aquarium.webp",
    "text": "aquarium background, large blue fish tank, soft underwater light, calm indoor atmosphere, no main human subject"
  }
,
  {
    "name": "Ship Deck",
    "category": "Background",
    "tone": "background",
    "thumbnail": "ship_deck.webp",
    "text": "large ship deck background, ocean view, railings, open sky, cinematic travel atmosphere, no main human subject"
  }
,
  {
    "name": "Factory Line",
    "category": "Background",
    "tone": "background",
    "thumbnail": "factory_line.webp",
    "text": "factory production line background, industrial machines, conveyor belt, practical work lighting, no main human subject"
  }
,
  {
    "name": "Workshop",
    "category": "Background",
    "tone": "background",
    "thumbnail": "workshop.webp",
    "text": "industrial workshop background, tools, workbench, metal parts, realistic factory atmosphere, no main human subject"
  }
,
  {
    "name": "Abandoned Building",
    "category": "Background",
    "tone": "background",
    "thumbnail": "abandoned_building.webp",
    "text": "abandoned building background, cracked walls, broken windows, dusty floor, quiet ruined atmosphere, no main human subject"
  }
,
  {
    "name": "Ruins Interior",
    "category": "Background",
    "tone": "background",
    "thumbnail": "ruins_interior.webp",
    "text": "ruined interior background, weathered walls, debris, aged concrete, dramatic abandoned space, no main human subject"
  }
,
  {
    "name": "Old Warehouse",
    "category": "Background",
    "tone": "background",
    "thumbnail": "old_warehouse.webp",
    "text": "old warehouse background, large empty space, concrete floor, metal beams, dim industrial atmosphere, no main human subject"
  }
,
  {
    "name": "Fantasy Castle",
    "category": "Background",
    "tone": "background",
    "thumbnail": "fantasy_castle.webp",
    "text": "fantasy castle background, stone towers, grand courtyard, atmospheric adventure setting"
  }
,
  {
    "name": "Magic Forest",
    "category": "Background",
    "tone": "background",
    "thumbnail": "magic_forest.webp",
    "text": "magical forest background, glowing plants, ancient trees, misty fantasy atmosphere"
  }
,
  {
    "name": "RPG Town",
    "category": "Background",
    "tone": "background",
    "thumbnail": "rpg_town.webp",
    "text": "fantasy RPG town background, stone streets, wooden shops, adventure game atmosphere"
  }
,
  {
    "name": "Dungeon Hall",
    "category": "Background",
    "tone": "background",
    "thumbnail": "dungeon_hall.webp",
    "text": "fantasy dungeon hall background, stone walls, torch light, mysterious adventure setting"
  }
,
  {
    "name": "Ancient Ruins",
    "category": "Background",
    "tone": "background",
    "thumbnail": "ancient_ruins.webp",
    "text": "ancient ruins background, broken stone pillars, overgrown plants, adventure exploration atmosphere"
  }
,
  {
    "name": "MMO Field",
    "category": "Background",
    "tone": "background",
    "thumbnail": "mmo_field.webp",
    "text": "3D fantasy game field background, open grassland, distant mountains, adventure MMO atmosphere"
  }
,
  {
    "name": "Rock Stage",
    "category": "Background",
    "tone": "background",
    "thumbnail": "rock_stage.webp",
    "text": "rock concert stage background, amplifiers, spotlights, stage truss, dramatic live music atmosphere, no main human subject"
  }
,
  {
    "name": "Idol Stage",
    "category": "Background",
    "tone": "background",
    "thumbnail": "idol_stage.webp",
    "text": "idol performance stage background, colorful lights, LED screen, polished stage floor, bright concert atmosphere, no main human subject"
  }
,
  {
    "name": "Rooftop Stage",
    "category": "Background",
    "tone": "background",
    "thumbnail": "rooftop_stage.webp",
    "text": "rooftop stage background, small outdoor platform, city skyline, casual local event atmosphere, no main human subject"
  }
,
  {
    "name": "Beer Garden",
    "category": "Background",
    "tone": "background",
    "thumbnail": "beer_garden.webp",
    "text": "beer garden background, outdoor tables, warm lanterns, relaxed evening terrace atmosphere, no main human subject"
  }
,
  {
    "name": "Live House",
    "category": "Background",
    "tone": "background",
    "thumbnail": "live_house.webp",
    "text": "small live house stage background, dark walls, microphone stand, stage lights, intimate music venue atmosphere, no main human subject"
  }
,
  {
    "name": "Theater Stage",
    "category": "Background",
    "tone": "background",
    "thumbnail": "theater_stage.webp",
    "text": "theater stage background, curtains, warm stage lights, classic performance space, no main human subject"
  }
,
  {
    "name": "Dance Studio",
    "category": "Background",
    "tone": "background",
    "thumbnail": "dance_studio.webp",
    "text": "dance studio background, mirror wall, wooden floor, practice room lighting, no main human subject"
  }
,
  {
    "name": "Studio Plain",
    "category": "Background",
    "tone": "background",
    "thumbnail": "studio_plain.webp",
    "text": "plain studio background, neutral wall, simple clean space, uncluttered composition, no main human subject"
  },
  {
    "name": "Window Portrait",
    "category": "Background",
    "tone": "background",
    "thumbnail": "window_portrait.webp",
    "text": "Window-side portrait setting, large window with soft natural daylight, sheer curtains, simple chair or small table near the window, calm indoor portrait atmosphere, clean realistic room"
  },
  {
    "name": "Convenience Counter",
    "category": "Background",
    "tone": "background",
    "thumbnail": "convenience_counter.webp",
    "text": "Japanese convenience store checkout counter, bright fluorescent lighting, cashier counter, register area, product shelves behind the counter, everyday retail interior, background setting"
  },
  {
    "name": "Photo Studio",
    "category": "Background",
    "tone": "background",
    "thumbnail": "photo_studio.webp",
    "text": "Professional photography studio interior, white seamless backdrop, strobes, softboxes, light stands, reflector boards, clean open shooting space, background setting"
  },
  {
    "name": "Retro Arcade",
    "category": "Background",
    "tone": "background",
    "thumbnail": "retro_arcade.webp",
    "text": "Japanese 2000s game arcade interior, sit-down arcade cabinets, fighting game machines, dim lighting, glowing CRT screens, colorful buttons and joysticks, background setting"
  },
  {
    "name": "Purikura Booth",
    "category": "Background",
    "tone": "background",
    "thumbnail": "purikura_booth.webp",
    "text": "Realistic Japanese purikura booth background, Close portrait-booth distance, pastel white and pink backdrop, side glossy panels and short entrance curtain edge, No floor, no machine"
  },
  {
    "name": "Girl Room",
    "category": "Background",
    "tone": "background",
    "thumbnail": "girl_room.webp",
    "text": "Cute teenage girl bedroom, pastel bedding, plush toys, small study desk, cute stationery, mirror, soft curtains, warm cozy lighting, background setting"
  },
  {
    "name": "Boy Room",
    "category": "Background",
    "tone": "background",
    "thumbnail": "boy_room.webp",
    "text": "Teenage boy bedroom, simple blue-toned decor, study desk, manga books, plastic model kits, sports poster, casual bedding, practical room atmosphere, background setting"
  },
  {
    "name": "Family Living",
    "category": "Background",
    "tone": "background",
    "thumbnail": "family_living.webp",
    "text": "Ordinary family living room, sofa, television, low table, shelves, warm ceiling light, comfortable everyday domestic atmosphere, background setting"
  },
  {
    "name": "Harajuku Shop",
    "category": "Background",
    "tone": "background",
    "thumbnail": "harajuku_shop.webp",
    "text": "Harajuku kawaii fashion shop interior, colorful clothing racks, cute accessories, pop pastel decor, bright retail lighting, realistic boutique atmosphere, background setting"
  },
  {
    "name": "Traditional Tea Room",
    "category": "Background",
    "tone": "background",
    "thumbnail": "traditional_tea_room.webp",
    "text": "Small traditional Japanese chashitsu tea room, Tatami mats, low nijiriguchi entrance near the floor, tokonoma alcove, simple wood and plaster walls, soft shoji daylight, or modern objects, background setting"
  },
  {
    "name": "Fireworks",
    "category": "Background",
    "tone": "background",
    "thumbnail": "fireworks.webp",
    "text": "Japanese summer fireworks festival background, Colorful fireworks over a riverside or town skyline, subtle lanterns and festival stalls below, realistic night atmosphere"
  },
  {
    "name": "Summer Festival Stalls",
    "category": "Background",
    "tone": "background",
    "thumbnail": "summer_festival_stalls.webp",
    "text": "Realistic Japanese summer matsuri night street, Rows of yatai food stalls, warm lanterns, steam, cooking equipment, festival crowd atmosphere, background setting"
  },
  {
    "name": "Painting Classroom",
    "category": "Background",
    "tone": "background",
    "thumbnail": "painting_classroom.webp",
    "text": "Realistic painting classroom background, Easels, art supplies and canvases around, Empty small platform and plain stool in the center, no central model"
  },
  {
    "name": "School Infirmary",
    "category": "Background",
    "tone": "background",
    "thumbnail": "school_infirmary.webp",
    "text": "Japanese school infirmary background, White beds with privacy curtains, medicine cabinet, desk, clean quiet room, soft daylight"
  },
  {
    "name": "Shrine Grounds",
    "category": "Background",
    "tone": "background",
    "thumbnail": "shrine_grounds.webp",
    "text": "Japanese shrine grounds background, Torii gate, stone path, trees, lanterns, temizuya basin, traditional shrine buildings, calm daytime atmosphere"
  },
  {
    "name": "Shopping Arcade",
    "category": "Background",
    "tone": "background",
    "thumbnail": "shopping_arcade.webp",
    "text": "Japanese shopping arcade background, Covered local shotengai street, small shops, storefront awnings, bicycles, warm everyday atmosphere"
  },
  {
    "name": "Karaoke Room",
    "category": "Background",
    "tone": "background",
    "thumbnail": "karaoke_room.webp",
    "text": "Japanese karaoke room background, Private room with sofas, low table, wall monitor, microphones, song remote, colorful realistic lighting"
  },
  {
    "name": "Family Restaurant",
    "category": "Background",
    "tone": "background",
    "thumbnail": "family_restaurant.webp",
    "text": "Japanese family restaurant booth background, Table seat with bench sofas, menus without readable text, drink bar area in the distance, warm casual lighting"
  },
  {
    "name": "School Rooftop",
    "category": "Background",
    "tone": "background",
    "thumbnail": "school_rooftop.webp",
    "text": "Japanese school rooftop background, Rooftop fence, concrete floor, stairwell door, distant city and sky, calm after-school atmosphere"
  },
  {
    "name": "Park Bench",
    "category": "Background",
    "tone": "background",
    "thumbnail": "park_bench.webp",
    "text": "Japanese park bench background, Simple bench in a neighborhood park, trees, path, grass, soft daylight, calm everyday atmosphere"
  },
  {
    "name": "Hair Salon",
    "category": "Background",
    "tone": "background",
    "thumbnail": "hair_salon.webp",
    "text": "Japanese hair salon background, Styling chairs, large mirrors, shampoo station, clean shelves, hair tools, bright realistic salon lighting"
  },
  {
    "name": "Old Sento",
    "category": "Background",
    "tone": "background",
    "thumbnail": "old_sento_changing_room.webp",
    "text": "Old Japanese sento changing room background, Wooden lockers, wicker baskets, bench, scale, old fans, warm worn Showa-era public bath atmosphere"
  },
  {
    "name": "Outdoor Onsen",
    "category": "Background",
    "tone": "background",
    "thumbnail": "outdoor_onsen.webp",
    "text": "Typical Japanese outdoor onsen background, Stone hot spring bath, steam, wooden ryokan details, mountains or forest scenery behind, calm natural atmosphere"
  },
  {
    "name": "Station Rotary",
    "category": "Background",
    "tone": "background",
    "thumbnail": "station_rotary.webp",
    "text": "Japanese station rotary background, Bus stops, taxi area, station entrance, streetlights, everyday waiting-place atmosphere"
  },
  {
    "name": "Railroad Crossing",
    "category": "Background",
    "tone": "background",
    "thumbnail": "railroad_crossing.webp",
    "text": "Small Japanese railroad crossing background, Crossing gate, tracks, quiet residential street, houses and utility poles"
  },
  {
    "name": "Convenience Store Front Close",
    "category": "Background",
    "tone": "background",
    "thumbnail": "convenience_store_front_close.webp",
    "text": "Japanese convenience store front entrance background at night, Camera very close to the storefront, automatic glass doors, bright interior, vending machines and small entrance area"
  },
  {
    "name": "Wagashi Shop",
    "category": "Background",
    "tone": "background",
    "thumbnail": "wagashi_shop.webp",
    "text": "Traditional Japanese wagashi shop interior background, Glass display case, sweets, wooden shelves, wrapping counter, warm calm lighting"
  },
  {
    "name": "Ryokan Hallway",
    "category": "Background",
    "tone": "background",
    "thumbnail": "ryokan_hallway.webp",
    "text": "Japanese ryokan hallway background, Tatami or wooden corridor, shoji screens, lantern lights, quiet traditional inn atmosphere"
  },
  {
    "name": "Bus Stop",
    "category": "Background",
    "tone": "background",
    "thumbnail": "bus_stop.webp",
    "text": "Japanese bus stop background, Roadside shelter, bench, timetable board, local street or countryside road, calm waiting atmosphere"
  },
  {
    "name": "Riverside",
    "category": "Background",
    "tone": "background",
    "thumbnail": "riverside.webp",
    "text": "Japanese riverside embankment background, Wide river, grassy levee, walking path, bridge, open sky, quiet everyday atmosphere"
  },
  {
    "name": "Night Alley",
    "category": "Background",
    "tone": "background",
    "thumbnail": "night_alley.webp",
    "text": "Japanese night alley background, Narrow street, small restaurant lights, vending machine glow, wet pavement, quiet dramatic mood"
  },
  {
    "name": "Hospital Waiting Room",
    "category": "Background",
    "tone": "background",
    "thumbnail": "hospital_waiting_room.webp",
    "text": "Japanese hospital waiting room background, Rows of chairs, reception counter, clean walls, quiet modern clinic atmosphere"
  },
  {
    "name": "Hospital Room",
    "category": "Background",
    "tone": "background",
    "thumbnail": "hospital_room.webp",
    "text": "Japanese hospital patient room background, Single bed, privacy curtain, bedside table, window daylight, calm medical room"
  },
  {
    "name": "Coin Laundry",
    "category": "Background",
    "tone": "background",
    "thumbnail": "coin_laundry.webp",
    "text": "Japanese coin laundry background, Washing machines, dryers, folding table, bench, clean fluorescent lighting"
  },
  {
    "name": "Apartment Entrance",
    "category": "Background",
    "tone": "background",
    "thumbnail": "apartment_entrance.webp",
    "text": "Japanese apartment entrance background, Lobby, mailboxes, glass doors, intercom panel, tiled floor, clean everyday residential atmosphere"
  },
  {
    "name": "School Festival Classroom",
    "category": "Background",
    "tone": "background",
    "thumbnail": "school_festival_classroom.webp",
    "text": "Japanese school festival classroom background, Decorated classroom, desks, handmade paper decorations, booth setup, lively culture festival mood"
  },
  {
    "name": "Old Kissaten",
    "category": "Background",
    "tone": "background",
    "thumbnail": "old_kissaten.webp",
    "text": "Old Japanese kissaten cafe interior background, Wood paneling, red or brown chairs, small tables, counter, warm lamps, nostalgic Showa-era atmosphere"
  },
  {
    "name": "School Gym",
    "category": "Background",
    "tone": "background",
    "thumbnail": "school_gym.webp",
    "text": "Japanese school gymnasium background, Wooden floor, basketball hoops, stage curtain, wall bars, high windows, quiet school event atmosphere"
  },
  {
    "name": "Ticket Gate Closeup",
    "category": "Background",
    "tone": "background",
    "thumbnail": "ticket_gate_closeup.webp",
    "text": "Japanese ticket gate close-up background, Camera very close to automatic ticket gates, IC card readers and gate flaps visible, station concourse behind"
  },
  {
    "name": "Movie Theater Seats",
    "category": "Background",
    "tone": "background",
    "thumbnail": "movie_theater_seats.webp",
    "text": "Movie theater seat background, Close front-facing view of empty cinema chairs, armrests and cup holders visible, dark auditorium behind, no screen shown"
  },
  {
    "name": "Drugstore",
    "category": "Background",
    "tone": "background",
    "thumbnail": "drugstore.webp",
    "text": "Japanese drugstore interior background, Aisles of medicine, cosmetics and daily goods, bright fluorescent lighting, clean shelves, everyday shop atmosphere"
  },
  {
    "name": "Luxury Hotel Front",
    "category": "Background",
    "tone": "background",
    "thumbnail": "luxury_hotel_front.webp",
    "text": "Luxury hotel front desk background, Close view of elegant reception counter, marble or wood finishes, warm lobby lighting, flowers, polished high-end atmosphere"
  },
  {
    "name": "Cheap Motel Front",
    "category": "Background",
    "tone": "background",
    "thumbnail": "cheap_motel_front.webp",
    "text": "Cheap American motel front desk background, Worn reception counter, old key rack, tired fluorescent light, dated decor, worn service counter details"
  },
  {
    "name": "Airport Lobby",
    "category": "Background",
    "tone": "background",
    "thumbnail": "airport_lobby.webp",
    "text": "Airport lobby background, Check-in counters, waiting seats, glass walls, luggage carts, bright modern terminal lighting, travel atmosphere"
  },
  {
    "name": "Cherry Blossom Avenue",
    "category": "Background",
    "tone": "background",
    "thumbnail": "cherry_blossom_avenue.webp",
    "text": "Japanese cherry blossom avenue background, Rows of sakura trees in bloom, path or small street, soft spring daylight, petals, calm seasonal atmosphere"
  },
  {
    "name": "Campsite",
    "category": "Background",
    "tone": "background",
    "thumbnail": "campsite.webp",
    "text": "Japanese campsite background, Tent, simple camp chairs, fire pit, forest or lakeside scenery, soft evening light, relaxed outdoor atmosphere"
  },
  {
    "name": "Observation Deck",
    "category": "Background",
    "tone": "background",
    "thumbnail": "observation_deck.webp",
    "text": "Japanese observation deck background, Railing, coin binoculars, wide city or mountain view, open sky, calm sightseeing atmosphere"
  },
  {
    "name": "Livehouse Dressing Room",
    "category": "Background",
    "tone": "background",
    "thumbnail": "livehouse_dressing_room.webp",
    "text": "Live house dressing room vanity background, Makeup table with many round bulbs around mirrors, simple chair, small backstage room, worn walls, cables and bags"
  },
  {
    "name": "1970s Spaceship",
    "category": "Background",
    "tone": "background",
    "thumbnail": "1970s_spaceship_bridge.webp",
    "text": "1970s science fiction spaceship bridge background, Analog control panels, chunky buttons, round colored lamps, retro monitors, central captain chair, classic movie set feeling"
  },
  {
    "name": "Western Saloon",
    "category": "Background",
    "tone": "background",
    "thumbnail": "western_saloon.webp",
    "text": "Western saloon set background, Large wooden bar counter, round tables, bottles, swinging saloon doors visible, dusty old western town atmosphere"
  },
  {
    "name": "Western Swinging Doors",
    "category": "Background",
    "tone": "background",
    "thumbnail": "western_swinging_doors.webp",
    "text": "Western saloon swinging doors background, Classic half-height wooden swing doors very large and close to camera, dusty street outside, saloon interior edges visible"
  },
  {
    "name": "Edo Nagaya",
    "category": "Background",
    "tone": "background",
    "thumbnail": "edo_nagaya_alley.webp",
    "text": "Edo period nagaya alley set background, Narrow wooden tenement lane, lattice windows, sliding doors, buckets, stone path, old jidaigeki drama set feeling"
  },
  {
    "name": "Detective Office",
    "category": "Background",
    "tone": "background",
    "thumbnail": "detective_office.webp",
    "text": "Classic detective office set background, Old wooden desk, venetian blinds, file cabinets, desk lamp, papers, smoky noir lighting, private investigator room"
  },
  {
    "name": "Pirate Ship Deck",
    "category": "Background",
    "tone": "background",
    "thumbnail": "pirate_ship_deck.webp",
    "text": "Pirate ship deck background, Wooden deck, mast, ropes, barrels, cannon, ocean and sky behind, adventure movie set atmosphere"
  },
  {
    "name": "Medieval Castle Hall",
    "category": "Background",
    "tone": "background",
    "thumbnail": "medieval_castle_hall.webp",
    "text": "Medieval castle great hall background, Stone walls, long wooden table, banners, candle stands, large fireplace, heavy dramatic atmosphere"
  },
  {
    "name": "Interrogation Room",
    "category": "Background",
    "tone": "background",
    "thumbnail": "interrogation_room.webp",
    "text": "Old Japanese police drama interrogation room background, Small plain table with a desk lamp and a bowl of katsudon, two metal folding chairs facing each other, bare concrete walls, harsh dim light"
  },
  {
    "name": "News Studio",
    "category": "Background",
    "tone": "background",
    "thumbnail": "news_studio.webp",
    "text": "Television news studio background, Anchor desk, studio lights, camera area, large abstract monitor wall with, polished broadcast set"
  },
  {
    "name": "1970s Drama Set",
    "category": "Background",
    "tone": "background",
    "thumbnail": "1970s_family_drama_set.webp",
    "text": "1970s family drama living room TV set background, Retro sofa, low table, old wallpaper, warm lamps, visible studio cameras and lighting stands, clearly a filming set"
  },
  {
    "name": "Old Japanese Rural Village",
    "category": "Background",
    "tone": "background",
    "thumbnail": "old_japanese_rural_village.webp",
    "text": "Old Japanese rural village background, Camera close to a poor wooden farmhouse, the house large in frame, rough vegetable field beside it, dirt path, simple farm tools"
  },
  {
    "name": "Track And Field Stadium",
    "category": "Background",
    "tone": "background",
    "thumbnail": "track_and_field_stadium.webp",
    "text": "Track and field stadium background, Red running track lanes, starting blocks, field area, stadium seats, daytime athletic competition atmosphere, No main athlete or logos"
  },
  {
    "name": "Baseball Dugout",
    "category": "Background",
    "tone": "background",
    "thumbnail": "baseball_dugout.webp",
    "text": "Baseball dugout front background, Close view near the team bench, dugout roof, bench, bats, helmets, field and grass visible beyond"
  },
  {
    "name": "Boxing Gym",
    "category": "Background",
    "tone": "background",
    "thumbnail": "boxing_gym.webp",
    "text": "Boxing gym background, Boxing ring, punching bags, speed bag, worn mats, old posters without readable text, gritty training atmosphere"
  },
  {
    "name": "Concert Hall Piano",
    "category": "Background",
    "tone": "background",
    "thumbnail": "concert_hall_piano.webp",
    "text": "Concert hall grand piano seat background, Close view of a grand piano and piano bench on stage, polished floor, warm stage lights, empty audience seats behind"
  },
  {
    "name": "Broadcast Room",
    "category": "Background",
    "tone": "background",
    "thumbnail": "broadcast_room.webp",
    "text": "Japanese broadcast room background, Close view of microphones, audio mixer, headphones, monitors, soundproof walls, compact school or studio booth atmosphere"
  },
  {
    "name": "Station Stairs Escalator",
    "category": "Background",
    "tone": "background",
    "thumbnail": "station_stairs_escalator.webp",
    "text": "Japanese station stairs and escalator background, Close view of stairs beside an escalator, handrails, tiled walls, station lighting, commuter flow atmosphere"
  },
  {
    "name": "Elevator Interior",
    "category": "Background",
    "tone": "background",
    "thumbnail": "elevator_interior.webp",
    "text": "Elevator interior background, Close view inside a modern elevator, metal walls, handrail, mirror panel, control buttons without readable text, clean confined atmosphere"
  },
  {
    "name": "Department Store Rooftop",
    "category": "Background",
    "tone": "background",
    "thumbnail": "department_store_rooftop.webp",
    "text": "Showa-era department store rooftop amusement park background, Small old rides, coin-operated children machines, railings, city view, worn nostalgic rooftop atmosphere"
  },
  {
    "name": "Game Show Set",
    "category": "Background",
    "tone": "background",
    "thumbnail": "game_show_set.webp",
    "text": "Japanese TV game show set background, Contestant podiums, colorful panels, quiz board, bright studio lights, flashy entertainment atmosphere"
  },
  {
    "name": "Luxury Limo Rear Seat",
    "category": "Background",
    "tone": "background",
    "thumbnail": "luxury_limo_rear_seat.webp",
    "text": "Luxury limousine rear seat background, Spacious leather back seat, privacy divider, ambient lights, polished trim, champagne glasses without labels, elegant night ride atmosphere"
  },
  {
    "name": "Meeting Room",
    "category": "Background",
    "tone": "background",
    "thumbnail": "meeting_room.webp",
    "text": "Modern meeting room background, Large conference table, chairs, wall monitor, whiteboard, glass partitions, clean office lighting"
  },
  {
    "name": "Record Shop",
    "category": "Background",
    "tone": "background",
    "thumbnail": "record_shop.webp",
    "text": "Record shop interior background, Rows of vinyl bins, album shelves with unreadable covers, listening counter, posters without readable text, warm indie shop atmosphere"
  },
  {
    "name": "Street Live",
    "category": "Background",
    "tone": "background",
    "thumbnail": "shutter_street_live.webp",
    "text": "Street live performance in front of a closed shop shutter, Metal shutter close behind, microphone stand, guitar case, portable speaker, night street lights, background setting"
  },
  {
    "name": "Command Room",
    "category": "Background",
    "tone": "background",
    "thumbnail": "operations_command_room.webp",
    "text": "Operations command room background, Large central table, wall maps without readable text, monitors, radios, tactical boards, dim focused lighting, serious mission control atmosphere"
  },
  {
    "name": "Gyudon Counter",
    "category": "Background",
    "tone": "background",
    "thumbnail": "gyudon_counter.webp",
    "text": "Japanese gyudon chain restaurant interior background, Eye-level view centered on a long counter, stools, kitchen area behind, menu boards without readable text"
  },
  {
    "name": "Hamburger Shop",
    "category": "Background",
    "tone": "background",
    "thumbnail": "hamburger_shop.webp",
    "text": "Generic hamburger fast food restaurant interior background, Front counter, order registers, menu boards without readable text, booths and tray area, bright clean casual atmosphere, No brand logos"
  },
  {
    "name": "Pop Diner",
    "category": "Background",
    "tone": "background",
    "thumbnail": "bright_pop_diner.webp",
    "text": "Bright pop 1950s American diner interior background, Chrome counter, red and turquoise vinyl stools, colorful booths, jukebox, checker floor, cheerful retro atmosphere"
  }
  ];
const EFFECT_CATEGORIES = ["All", "Photo", "Camera FX", "Art", "Light", "Weather", "Background", "Mood", "Color Theme", "Finish", "Custom"];
const EFFECT_PRESET_ALIASES = {"Black White":"B&W Strong","Realistic":"Realistic Photo","Cinematic":"Cinematic Photo","Base Style":"Photo","Photo Look":"Photo","Portrait":"Photo","Commercial":"Photo","Lighting":"Light","Illustration":"Art","Custom Preset":"Custom"};
function k2fxUniqueList(values) {
  return Array.from(new Set(values.filter(Boolean)));
}
function k2fxThumbnailBaseFromScriptUrl(url) {
  try {
    return new URL("./thumbnails/", url).pathname;
  } catch (_) {
    return "";
  }
}
function k2fxDetectThumbnailBases() {
  const urls = [];
  try {
    if (document.currentScript?.src) urls.push(document.currentScript.src);
  } catch (_) {}
  try {
    for (const script of Array.from(document.scripts || [])) {
      const src = script?.src || "";
      if (src.includes("/extensions/") && src.endsWith("/krea2_element_framing_v1.js")) urls.push(src);
    }
  } catch (_) {}
  try {
    const stack = String(new Error().stack || "");
    const matches = stack.match(/https?:\/\/[^\s)]+\/extensions\/[^/]+\/krea2_element_framing_v1\.js/g) || [];
    urls.push(...matches);
  } catch (_) {}
  return k2fxUniqueList(urls.map(k2fxThumbnailBaseFromScriptUrl));
}
const EFFECT_THUMBNAIL_BASE_CANDIDATES = k2fxUniqueList([
  ...k2fxDetectThumbnailBases(),
  "/extensions/Krea2-BBOX-Prompter/thumbnails/",
  "/extensions/Krea2-BBOX-Prompter-Suite/thumbnails/"
  ]);
const EFFECT_THUMBNAIL_CACHE_VERSION = "20260703_flip_phone";
function k2fxPresetSlug(name) {
  return String(name || "").toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || "preset";
}
function k2fxThumbnailFile(preset) {
  const file = preset?.thumbnail || `${k2fxPresetSlug(preset?.name)}.webp`;
  return file;
}
function k2fxThumbnailUrls(preset) {
  const file = k2fxThumbnailFile(preset);
  return EFFECT_THUMBNAIL_BASE_CANDIDATES.map((base) => `${base}${file}?v=${EFFECT_THUMBNAIL_CACHE_VERSION}`);
}


const PRESETS = {
  "1024 x 1024": [1024, 1024],
  "1536 x 1536": [1536, 1536],
  "2048 x 2048": [2048, 2048],
  "1024 x 1344": [1024, 1344],
  "1024 x 1536": [1024, 1536],
  "1152 x 1536": [1152, 1536],
  "1536 x 2048": [1536, 2048],
  "1344 x 1024": [1344, 1024],
  "1536 x 1024": [1536, 1024],
  "1536 x 1152": [1536, 1152],
  "2048 x 1536": [2048, 1536],
};

const USER_PRESET_COLOR = "#35D0C8";
const USER_PRESET_KEY = "krea2_element_framing_v1_custom_latent_presets";
const CAMERA_SET_KEY = "krea2_element_framing_v1_camera_sets";
const CANVAS_PRESET_KEY = "krea2_element_framing_v1_canvas_presets";
const SCENE_PRESET_KEY = "krea2_element_framing_v1_scene_presets";
const PROMPT_SLOT_PRESET_KEY = "krea2_element_framing_v1_prompt_slot_presets";
const PROMPT_LANGUAGE_KEY = "krea2_element_framing_v1_prompt_ui_language";
const CANVAS_LANGUAGE_KEY = "krea2_element_framing_v1_canvas_ui_language";
const CANVAS_GRID_KEY = "krea2_element_framing_v1_canvas_grid";
const EFFECT_THUMB_SIZE_KEY = "krea2_element_framing_v1_effect_thumb_size";
const EFFECT_CUSTOM_PRESET_API = "/krea2_bbox_prompt_effect/custom_presets";
const DEFAULT_WIDTH = 1024;
const DEFAULT_HEIGHT = 1024;
const DEFAULT_PRESET = "1024 x 1024";

const I18N = {
  en: {
    showBoxes: "◉ Show Boxes",
    hideBoxes: "◎ Hide Boxes",
    drawBox: "▭ Draw Box",
    resetCanvas: "Reset Canvas",
    latentSize: "LATENT SIZE",
    compositionGuide: "COMPOSITION GUIDE",
    cameraSettings: "CAMERA SETTINGS",
    uiLanguage: "UI Language",
    preset: "Preset",
    width: "Width",
    height: "Height",
    saveCustom: "Save Custom",
    deleteCustom: "Delete Custom",
    userPresetHelp: "User presets use #35D0C8 and are stored locally.",
    grid: "Grid",
    guideHelp: "Guide only. It does not add prompt text by itself.",
    cameraHelp: "Blank = model decides. Select preset or type custom. Values are saved.",
    cameraCustomNote: "Custom values are temporary and are not saved as camera presets.",
    cameraSet: "Camera Set",
    canvasPreset: "Canvas Preset",
    canvasPresetNote: "Saves size, boxes, guide, UI language, and camera values together.",
    scenePreset: "Scene Preset",
    scenePresetHelp: "Save or load the main scene/background prompt as a local preset.",
    scenePresetSelectHelp: "Choose a saved scene/background preset.",
    sceneSaveHelp: "Save the current scene/background prompt as a preset.",
    sceneLoadHelp: "Load the selected scene/background preset into the text box.",
    sceneDeleteHelp: "Delete the selected scene/background preset.",
    promptPreset: "Preset",
    savePreset: "Save Preset",
    loadPreset: "Load",
    deletePreset: "Delete",
    none: "(None)",
    save: "Save",
    saveSet: "Save Set",
    deleteSet: "Delete Set",
    iso: "ISO",
    shutter: "Shutter",
    aperture: "Aperture",
    focal: "Focal",
    custom: "Custom",
    scene: "SCENE / BACKGROUND",
    background: "BACKGROUND",
    scenePlaceholder: "Describe the overall scene and background. Leave blank if not needed.",
    backgroundPlaceholder: "Describe the background/environment. Recommended for stable generation.",
    prompt: "Prompt",
    clearPrompt: "Clear this prompt",
    elementType: "Type",
    elementTypeHelp: "Choose what this colored box describes. Object is for subjects; Text is for letters, logos, signs, or speech bubbles.",
    framing: "Framing",
    framingHelp: "Choose how the subject should be framed inside this colored box.",
    angle: "Angle",
    angleHelp: "Choose the viewing direction or camera perspective for this colored box.",
    slotHeaderHelp: "{label} box prompt. Click to open or close this section.",
    slotPromptHelp: "Write what should appear in this colored box. Keep boxes simple and avoid overlapping instructions.",
    enterPrompt: "Enter prompt for {label} box..."
  },
  ja: {
    showBoxes: "◉ ボックス表示",
    hideBoxes: "◎ ボックス非表示",
    drawBox: "▭ ボックス作成",
    resetCanvas: "リセット",
    latentSize: "ラテントサイズ",
    compositionGuide: "構図ガイド",
    cameraSettings: "カメラ設定",
    uiLanguage: "UI言語",
    preset: "プリセット",
    width: "幅",
    height: "高さ",
    saveCustom: "カスタム保存",
    deleteCustom: "削除",
    userPresetHelp: "ユーザープリセットは #35D0C8 で表示され、ローカルに保存されます。",
    grid: "グリッド",
    guideHelp: "表示ガイドのみです。プロンプト文には追加されません。",
    cameraHelp: "空欄ならモデルに任せます。プリセット選択またはカスタム入力できます。",
    cameraCustomNote: "カスタム値は一時的な入力で、カメラプリセットとしては保存されません。",
    cameraSet: "カメラセット",
    canvasPreset: "キャンバスプリセット",
    canvasPresetNote: "サイズ、ボックス、ガイド、UI言語、カメラ値をまとめて保存します。",
    scenePreset: "シーンプリセット",
    scenePresetHelp: "シーン / 背景プロンプトをローカルプリセットとして保存・読込します。",
    scenePresetSelectHelp: "保存済みのシーン / 背景プリセットを選びます。",
    sceneSaveHelp: "現在のシーン / 背景プロンプトをプリセット保存します。",
    sceneLoadHelp: "選択したシーン / 背景プリセットを入力欄へ読み込みます。",
    sceneDeleteHelp: "選択したシーン / 背景プリセットを削除します。",
    promptPreset: "プリセット",
    savePreset: "プリセット保存",
    loadPreset: "読込",
    deletePreset: "削除",
    none: "(なし)",
    save: "保存",
    saveSet: "セット保存",
    deleteSet: "削除",
    iso: "ISO",
    shutter: "シャッター",
    aperture: "絞り",
    focal: "焦点距離",
    custom: "カスタム",
    scene: "シーン / 背景",
    background: "背景",
    scenePlaceholder: "全体のシーンと背景を入力。不要なら空欄。",
    backgroundPlaceholder: "背景・環境を入力。安定化に推奨。",
    prompt: "プロンプト",
    clearPrompt: "このプロンプトを消去",
    elementType: "タイプ",
    elementTypeHelp: "この色ボックスで指定する対象を選びます。Objectは被写体、Textは文字・ロゴ・看板・吹き出し向けです。",
    framing: "フレーミング",
    framingHelp: "この色ボックス内で、被写体をどの範囲で写すかを選びます。",
    angle: "アングル",
    angleHelp: "この色ボックスに対する視点・カメラ角度を選びます。",
    slotHeaderHelp: "{label} ボックスのプロンプト欄です。クリックで開閉します。",
    slotPromptHelp: "この色ボックス内に出したい内容を書きます。指示はシンプルにし、ボックス同士の矛盾や重なりを避けてください。",
    enterPrompt: "{label} ボックスのプロンプトを入力..."
  }
};

function getComfyUILocale() {
  const appObj = window.comfyAPI?.app?.app || app;
  const candidates = [];
  try { candidates.push(appObj?.ui?.settings?.getSettingValue?.("Comfy.Locale")); } catch (_) {}
  try { candidates.push(appObj?.ui?.settings?.getSettingValue?.("Comfy.Language")); } catch (_) {}
  try { candidates.push(appObj?.ui?.settings?.getSettingValue?.("locale")); } catch (_) {}
  try { candidates.push(appObj?.ui?.settings?.getSettingValue?.("language")); } catch (_) {}
  try { candidates.push(appObj?.ui?.settings?.settings?.Comfy?.Locale?.value); } catch (_) {}
  try { candidates.push(appObj?.ui?.settings?.settings?.Comfy?.Language?.value); } catch (_) {}
  try { candidates.push(appObj?.ui?.locale); } catch (_) {}
  try { candidates.push(appObj?.locale); } catch (_) {}
  const found = candidates.find((v) => typeof v === "string" && v.trim());
  return (found || navigator.language || "en").toLowerCase();
}
function resolveLang(value) {
  if (value === "Japanese 日本語") return "ja";
  if (value === "English") return "en";
  const lang = getComfyUILocale();
  return lang.startsWith("ja") ? "ja" : "en";
}
function tr(lang, key) {
  return (I18N[lang] && I18N[lang][key]) || I18N.en[key] || key;
}

function k2cfCreateWorkflowStorageId() {
  return `k2cf_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

function k2cfSetWorkflowStorageId(graph, value = null) {
  if (!graph) return "default_graph";
  graph.extra = graph.extra || {};
  const nextValue = value || graph.extra.k2cf_state_id || graph.__k2cfStateId || k2cfCreateWorkflowStorageId();
  graph.extra.k2cf_state_id = String(nextValue);
  Object.defineProperty(graph, "__k2cfStateId", {
    value: String(nextValue),
    writable: true,
    configurable: true,
    enumerable: false,
  });
  return String(nextValue);
}

function k2cfWorkflowStorageId(node) {
  const graph = node?.graph || app?.graph;
  if (graph) {
    if (!graph.__k2cfStateId) k2cfSetWorkflowStorageId(graph);
    return String(graph.__k2cfStateId);
  }
  return "default_graph";
}

function k2cfNodeStorageKey(node, kind) {
  const nodeId = node?.id ?? "unknown";
  return `krea2_element_framing_v1_${kind}_${k2cfWorkflowStorageId(node)}_${nodeId}`;
}

function k2cfNodeFallbackStorageKey(node, kind) {
  const nodeId = node?.id ?? "unknown";
  const nodeType = node?.type || node?.comfyClass || "node";
  return `krea2_element_framing_v1_${kind}_${nodeType}_${nodeId}`;
}

function k2cfReadStorageJson(storage, key) {
  try {
    const value = JSON.parse(storage.getItem(key) || "null");
    return value || null;
  } catch (_) {
    return null;
  }
}

function k2cfReadSessionJson(key) {
  try { return k2cfReadStorageJson(sessionStorage, key); } catch (_) { return null; }
}

function k2cfReadBrowserLocalJson(key) {
  try { return k2cfReadStorageJson(localStorage, key); } catch (_) { return null; }
}

function k2cfPickLatestState(states) {
  const valid = states.filter((state) => state && typeof state === "object");
  if (!valid.length) return null;
  valid.sort((a, b) => Number(b.saved_at || 0) - Number(a.saved_at || 0));
  return valid[0];
}

function k2cfHasEffectTextHeights(state) {
  if (!state?.text_heights || typeof state.text_heights !== "object") return false;
  return Object.values(state.text_heights).some((value) => Number(value) > 0);
}

function k2cfLocalStateKeys(node, kind) {
  const keys = [k2cfNodeStorageKey(node, kind)];
  if (kind === "prompt_ui" || kind === "effect" || kind.endsWith("_node_size")) keys.push(k2cfNodeFallbackStorageKey(node, kind));
  return keys;
}

function k2cfReadLocalState(node, kind) {
  // Prompt/canvas widget values must come only from workflow node/widget state.
  // Browser local/session fallback can resurrect stale prompt text or stale latent sizes
  // (for example 1024 x 1536) when ComfyUI rebuilds a tab.
  // Effect uses session-only fallback for UI state such as selected effect and text box heights.
  if (kind === "prompt" || kind === "canvas") return null;
  const states = [];
  for (const key of k2cfLocalStateKeys(node, kind)) {
    states.push(k2cfReadSessionJson(key));
    states.push(k2cfReadBrowserLocalJson(key));
  }
  return k2cfPickLatestState(states);
}

function k2cfWriteLocalState(node, kind, data) {
  // Do not persist prompt/canvas widget values outside the workflow. This prevents stale
  // browser storage from overriding freshly typed prompts or current latent size after tab switches.
  if (kind === "prompt" || kind === "canvas") return;
  const value = JSON.stringify(data);
  for (const key of k2cfLocalStateKeys(node, kind)) {
    try { sessionStorage.setItem(key, value); } catch (_) {}
    if (kind === "prompt_ui" || kind === "effect" || kind.endsWith("_node_size")) {
      try { localStorage.setItem(key, value); } catch (_) {}
    }
  }
}

function k2cfBestSavedState(node, kind) {
  const propName = kind === "prompt" ? "k2cfPromptState" : (kind === "effect" ? "k2cfEffectState" : "k2cfCanvasState");
  const workflowCandidates = [
    node?.properties?.[propName],
    kind === "prompt" ? node?.__k2cfConfiguredPromptState : (kind === "effect" ? node?.__k2cfConfiguredEffectState : node?.__k2cfConfiguredCanvasState)
  ].filter((state) => Array.isArray(state?.widgets_values) && (
    k2cfHasMeaningfulState(state.widgets_values) ||
    (kind === "effect" && k2cfHasEffectTextHeights(state))
  ));
  if (kind === "effect") {
    const localState = k2cfReadLocalState(node, kind);
    const effectCandidates = workflowCandidates.slice();
    if (Array.isArray(localState?.widgets_values) && (
      k2cfHasMeaningfulState(localState.widgets_values) ||
      k2cfHasEffectTextHeights(localState)
    )) {
      effectCandidates.push(localState);
    }
    return k2cfPickLatestState(effectCandidates);
  }
  if (workflowCandidates.length) {
    workflowCandidates.sort((a, b) => Number(b.saved_at || 0) - Number(a.saved_at || 0));
    const picked = workflowCandidates[0];
    if (kind === "prompt") picked.widgets_values = k2cfSanitizePromptValues(picked.widgets_values);
    return picked;
  }

  if (kind === "prompt" && node?.__k2cfSkipLocalPromptState) return null;
  if (kind === "canvas" && node?.__k2cfSkipLocalCanvasState) return null;

  const localState = k2cfReadLocalState(node, kind);
  if (Array.isArray(localState?.widgets_values) && (
    k2cfHasMeaningfulState(localState.widgets_values) ||
    (kind === "effect" && k2cfHasEffectTextHeights(localState))
  )) {
    if (kind === "prompt") localState.widgets_values = k2cfSanitizePromptValues(localState.widgets_values);
    return localState;
  }
  return null;
}

function k2cfWidgetValues(node, widgetNames) {
  return widgetNames.map((name) => {
    const w = widget(node, name);
    return w?.value === undefined || w?.value === null ? "" : w.value;
  });
}

function k2cfHasMeaningfulState(values) {
  if (!Array.isArray(values)) return false;
  return values.some((v) => {
    if (v === undefined || v === null) return false;
    const s = String(v).trim();
    if (!s) return false;
    if (k2cfLooksLikePromptUiState(s)) return k2cfPromptUiHasMeaningfulState(s);
    if (s === '{"boxes":[]}') return false;
    if (s === '{"iso":"","shutter":"","aperture":"","focal_length":""}') return false;
    if (s === '{"sets":[],"selected":""}') return false;
    if (s === "Auto") return false;
    if (s === "Thirds") return false;
    if (s === DEFAULT_PRESET) return false;
    if (s === "1536" || s === "1024") return false;
    return true;
  });
}

function k2cfJsonHasBoxes(value) {
  try {
    const data = JSON.parse(String(value || ""));
    return Array.isArray(data?.boxes) && data.boxes.length > 0;
  } catch (_) {
    return false;
  }
}

function k2cfJsonHasValues(value) {
  try {
    const data = JSON.parse(String(value || ""));
    if (!data || typeof data !== "object") return false;
    return Object.values(data).some((v) => {
      if (Array.isArray(v)) return v.length > 0;
      if (v && typeof v === "object") return Object.keys(v).length > 0;
      return String(v ?? "").trim() !== "";
    });
  } catch (_) {
    return false;
  }
}

function k2cfReadJsonObject(value) {
  if (value && typeof value === "object") return value;
  try {
    const data = JSON.parse(String(value || ""));
    return data && typeof data === "object" ? data : null;
  } catch (_) {
    return null;
  }
}

function k2cfLooksLikePromptUiState(value) {
  const data = k2cfReadJsonObject(value);
  if (!data || typeof data !== "object") return false;
  return String(data.version || "").startsWith("prompt_ui_") ||
    data.textHeights !== undefined ||
    data.slotOpen !== undefined ||
    data.slotPreset !== undefined ||
    data.slotValues !== undefined ||
    data.scenePreset !== undefined ||
    data.nodeSize !== undefined ||
    data.wrapSize !== undefined;
}

function k2cfDefaultTextHeightForKey(key) {
  return 125;
}

function k2cfMaxPromptTextHeightForKey(key) {
  // Guard against ComfyUI tab/app restore reflow saving a huge textarea height.
  // Keep the prompt node usable and prevent SCENE from pushing color slots off-screen.
  return 360;
}

function k2cfPromptTextHeightInRange(key, h) {
  const value = Math.round(Number(h) || 0);
  return Number.isFinite(value) && value >= 45 && value <= k2cfMaxPromptTextHeightForKey(key);
}

function k2cfSanitizePromptTextHeights(heights = {}) {
  const out = {};
  if (!heights || typeof heights !== "object") return out;
  for (const [key, value] of Object.entries(heights)) {
    const next = Math.round(Number(value) || 0);
    if (k2cfPromptTextHeightInRange(key, next)) out[key] = next;
  }
  return out;
}

function k2cfIsLikelyDefaultTextHeight(key, h) {
  const value = Math.round(Number(h) || 0);
  if (!Number.isFinite(value) || value < 45) return false;
  return Math.abs(value - k2cfDefaultTextHeightForKey(key)) <= 18;
}

function k2cfPromptTextHeightMeaningful(key, h, manual = false) {
  const value = Math.round(Number(h) || 0);
  if (!k2cfPromptTextHeightInRange(key, value)) return false;
  return Boolean(manual) || !k2cfIsLikelyDefaultTextHeight(key, value);
}

function k2cfPromptUiHasMeaningfulState(value) {
  const data = k2cfReadJsonObject(value);
  if (!data || typeof data !== "object") return false;
  const heights = data.textHeights && typeof data.textHeights === "object" ? data.textHeights : {};
  const manual = data.textHeightManual && typeof data.textHeightManual === "object" ? data.textHeightManual : {};
  if (Object.entries(heights).some(([key, h]) => k2cfPromptTextHeightMeaningful(key, h, manual[key]))) return true;
  if (String(data.scenePreset || "").trim()) return true;
  const slotPreset = data.slotPreset && typeof data.slotPreset === "object" ? data.slotPreset : {};
  if (Object.values(slotPreset).some((v) => String(v || "").trim())) return true;
  const slotValues = data.slotValues && typeof data.slotValues === "object" ? data.slotValues : {};
  for (const value of Object.values(slotValues)) {
    if (!value || typeof value !== "object") continue;
    if (String(value.type || "obj") !== "obj") return true;
    if (String(value.framing || "Auto") !== "Auto") return true;
    if (String(value.angle || "Auto") !== "Auto") return true;
  }
  if (k2cfNormalizeNodeSize(data.nodeSize)) return true;
  if (data.wrapSize && (Number(data.wrapSize.h || 0) >= 45 || Number(data.wrapSize.w || 0) >= 80)) return true;
  const defaults = { red: true, blue: true, yellow: true, green: false, magenta: false };
  const slotOpen = data.slotOpen && typeof data.slotOpen === "object" ? data.slotOpen : {};
  return Object.keys(defaults).some((k) => slotOpen[k] !== undefined && Boolean(slotOpen[k]) !== defaults[k]);
}

function k2cfElementPixelHeight(el) {
  if (!el) return 0;
  // Native textarea resize can appear as inline style, offsetHeight, or computed height depending on browser/front-end timing.
  const candidates = [];
  const inlineHeight = Math.round(parseFloat(el.style?.height || "0") || 0);
  if (inlineHeight > 0) candidates.push(inlineHeight);
  const offset = Math.round(el.offsetHeight || 0);
  if (offset > 0) candidates.push(offset);
  try {
    const computed = Math.round(parseFloat(window.getComputedStyle(el).height || "0") || 0);
    if (computed > 0) candidates.push(computed);
  } catch (_) {}
  try {
    const rect = Math.round(el.getBoundingClientRect().height || 0);
    if (rect > 0) candidates.push(rect);
  } catch (_) {}
  return candidates.length ? Math.max(...candidates) : 0;
}

function k2cfElementPixelWidth(el) {
  if (!el) return 0;
  const candidates = [];
  const inlineWidth = Math.round(parseFloat(el.style?.width || "0") || 0);
  if (inlineWidth > 0) candidates.push(inlineWidth);
  const offset = Math.round(el.offsetWidth || 0);
  if (offset > 0) candidates.push(offset);
  try {
    const computed = Math.round(parseFloat(window.getComputedStyle(el).width || "0") || 0);
    if (computed > 0) candidates.push(computed);
  } catch (_) {}
  try {
    const rect = Math.round(el.getBoundingClientRect().width || 0);
    if (rect > 0) candidates.push(rect);
  } catch (_) {}
  return candidates.length ? Math.max(...candidates) : 0;
}

function k2cfNormalizeNodeSize(size) {
  if (!Array.isArray(size) || size.length < 2) return null;
  const w = Math.round(Number(size[0]) || 0);
  const h = Math.round(Number(size[1]) || 0);
  if (!Number.isFinite(w) || !Number.isFinite(h) || w < 80 || h < 60) return null;
  return [w, h];
}

function k2cfSameNodeSize(a, b, tolerance = 1) {
  const aa = k2cfNormalizeNodeSize(a);
  const bb = k2cfNormalizeNodeSize(b);
  return !!aa && !!bb && Math.abs(aa[0] - bb[0]) <= tolerance && Math.abs(aa[1] - bb[1]) <= tolerance;
}
function k2cfIsLegacyBugNodeSize(kind, size) {
  const current = k2cfNormalizeNodeSize(size);
  if (kind !== "prompt" || !current) return false;
  return K2CF_PROMPT_LEGACY_BUG_SIZES.some((legacy) => k2cfSameNodeSize(current, legacy));
}

function k2cfMaybeUpgradeLegacyBugNodeSize(node, kind, defaultSize = null) {
  const desired = k2cfNormalizeNodeSize(defaultSize);
  if (!node || !desired || !k2cfIsLegacyBugNodeSize(kind, node.__k2cfConfiguredSize || node.size)) return;
  const explicitSizeState = k2cfReadNodeSizeState(node, kind);
  if (explicitSizeState) return;
  node.__k2cfConfiguredSize = desired.slice();
  node.__k2cfPreferredNodeSize = desired.slice();
  node.__k2cfLastSavedNodeSize = desired.slice();
  k2cfApplyNodeSize(node, desired);
}


function k2cfNodeSizeProp(kind) {
  return kind === "prompt" ? "k2cfPromptNodeSize" : "k2cfCanvasNodeSize";
}

function k2cfReadNodeSizeState(node, kind) {
  const prop = node?.properties?.[k2cfNodeSizeProp(kind)];
  const configuredProp = kind === "prompt" ? node?.__k2cfConfiguredPromptNodeSize : node?.__k2cfConfiguredCanvasNodeSize;
  const local = k2cfReadLocalState(node, `${kind}_node_size`);
  const states = [prop, configuredProp, local].filter((state) => k2cfNormalizeNodeSize(state?.size));
  return k2cfPickLatestState(states);
}

function k2cfSavedOrConfiguredNodeSize(node, kind) {
  return k2cfNormalizeNodeSize(k2cfReadNodeSizeState(node, kind)?.size) ||
    k2cfNormalizeNodeSize(node?.__k2cfConfiguredSize) ||
    null;
}

function k2cfPreferredNodeSize(node, kind, defaultSize = null) {
  // Do not use defaultSize as a restore target. Defaults are only for first creation; persisted/configured/manual size wins.
  return k2cfNormalizeNodeSize(node?.__k2cfPreferredNodeSize) ||
    k2cfSavedOrConfiguredNodeSize(node, kind) ||
    k2cfNormalizeNodeSize(node?.size);
}

function k2cfMaybeInitializeNodeSize(node, kind, defaultSize = null) {
  const desired = k2cfNormalizeNodeSize(defaultSize);
  if (!node || !desired || k2cfSavedOrConfiguredNodeSize(node, kind) || node.__k2cfInitialSizeApplied) return;
  const current = k2cfNormalizeNodeSize(node.size);
  const tooSmall = !current || current[0] < Math.round(desired[0] * 0.75) || current[1] < Math.round(desired[1] * 0.65);
  if (!tooSmall) return;
  node.__k2cfInitialSizeApplied = true;
  k2cfApplyNodeSize(node, desired);
  try { app.graph?.setDirtyCanvas?.(true, true); } catch (_) {}
}

function k2cfGuardNodeAutoSize(node, ms = 1800) {
  if (!node) return;
  const until = (typeof performance !== "undefined" ? performance.now() : Date.now()) + ms;
  node.__k2cfIgnoreAutoNodeSizeUntil = Math.max(Number(node.__k2cfIgnoreAutoNodeSizeUntil || 0), until);
}

function k2cfNodeAutoSizeGuarded(node) {
  if (!node) return false;
  const now = typeof performance !== "undefined" ? performance.now() : Date.now();
  return now < Number(node.__k2cfIgnoreAutoNodeSizeUntil || 0);
}


function k2cfLikelyManualNodeResize(node) {
  const appObj = window.comfyAPI?.app?.app || app;
  const canvas = appObj?.canvas || app?.canvas || appObj?.graphcanvas || null;
  if (!canvas || !node) return false;
  return canvas.resizing_node === node ||
    canvas.node_resizing === node ||
    canvas.node_being_resized === node ||
    canvas.selected_resizing_node === node ||
    canvas.current_node_resizing === node;
}

function k2cfCommitNodeSizeState(node, kind, size, savedAt = Date.now()) {
  const normalized = k2cfNormalizeNodeSize(size);
  if (!node || !normalized) return null;
  const state = { version: "node_size_v19", size: normalized, saved_at: savedAt };
  node.__k2cfPreferredNodeSize = normalized.slice();
  node.__k2cfLastSavedNodeSize = normalized.slice();
  node.properties = node.properties || {};
  node.properties[k2cfNodeSizeProp(kind)] = state;
  k2cfWriteLocalState(node, `${kind}_node_size`, state);
  return state;
}

function k2cfSaveNodeSize(node, kind, markDirty = false, force = false) {
  const size = k2cfNormalizeNodeSize(node?.size);
  if (!node || !size || node.__k2cfRestoringNodeSize) return;
  // ComfyUI 0.26 workflow-tab restore can auto-fit DOM widgets shortly after the node is rebuilt.
  // Do not let that transient auto-size overwrite the user's last manual size.
  if (!force && k2cfNodeAutoSizeGuarded(node) && !k2cfLikelyManualNodeResize(node)) return;
  if (k2cfSameNodeSize(size, node.__k2cfLastSavedNodeSize)) return;
  k2cfCommitNodeSizeState(node, kind, size);
  if (markDirty) {
    try { app.graph?.setDirtyCanvas?.(true, true); } catch (_) {}
  }
}

function k2cfApplyNodeSize(node, size) {
  const desired = k2cfNormalizeNodeSize(size);
  if (!node || !desired) return;
  const current = k2cfNormalizeNodeSize(node.size);
  if (current && k2cfSameNodeSize(current, desired)) return;
  node.__k2cfRestoringNodeSize = true;
  try {
    if (typeof node.setSize === "function") node.setSize(desired.slice());
    else node.size = desired.slice();
  } catch (_) {
    node.size = desired.slice();
  } finally {
    node.__k2cfRestoringNodeSize = false;
  }
}

function k2cfRestoreNodeSize(node, kind, defaultSize = null) {
  const desired = k2cfPreferredNodeSize(node, kind, defaultSize);
  if (!node || !desired) return;
  node.__k2cfPreferredNodeSize = desired.slice();
  if (!node.__k2cfLastSavedNodeSize) node.__k2cfLastSavedNodeSize = desired.slice();
  k2cfGuardNodeAutoSize(node, 1800);
  k2cfApplyNodeSize(node, desired);
}

function k2cfScheduleNodeSizeRestore(node, kind, defaultSize = null) {
  if (!node) return;
  const desired = k2cfNormalizeNodeSize(node.__k2cfPreferredNodeSize) || k2cfSavedOrConfiguredNodeSize(node, kind);
  if (!desired) return;
  node.__k2cfPreferredNodeSize = desired.slice();
  k2cfGuardNodeAutoSize(node, 2200);
  const restore = () => {
    if (!node.graph && !app?.graph?._nodes?.includes?.(node)) return;
    const current = k2cfNormalizeNodeSize(node.size);
    const preferred = k2cfNormalizeNodeSize(node.__k2cfPreferredNodeSize) || k2cfSavedOrConfiguredNodeSize(node, kind) || desired;
    if (preferred && (!current || !k2cfSameNodeSize(current, preferred))) {
      k2cfGuardNodeAutoSize(node, 500);
      k2cfApplyNodeSize(node, preferred);
    }
  };
  try { requestAnimationFrame(() => restore()); } catch (_) { setTimeout(restore, 0); }
  try { requestAnimationFrame(() => requestAnimationFrame(restore)); } catch (_) {}
  for (const ms of [0, 60, 180, 420, 900, 1600, 2400]) setTimeout(restore, ms);
}

function k2cfInstallNodeSizePersistence(node, kind, defaultSize = null) {
  if (!node || node.__k2cfNodeSizePersistenceInstalled) return;
  node.__k2cfNodeSizePersistenceInstalled = true;
  node.__k2cfNodeSizeKind = kind;
  node.__k2cfNodeSizeDefault = defaultSize;
  const preferred = k2cfSavedOrConfiguredNodeSize(node, kind);
  if (preferred) {
    node.__k2cfPreferredNodeSize = preferred.slice();
    node.__k2cfLastSavedNodeSize = preferred.slice();
  }
  node.__k2cfNodeSizeSnapshot = (markDirty = false, force = false) => k2cfSaveNodeSize(node, kind, markDirty, force);

  const oldComputeSize = node.computeSize;
  if (typeof oldComputeSize === "function" && !node.__k2cfComputeSizePatched) {
    node.computeSize = function () {
      const computed = k2cfNormalizeNodeSize(oldComputeSize.apply(this, arguments)) || k2cfNormalizeNodeSize(this.size) || [80, 60];
      const preferredSize = k2cfPreferredNodeSize(this, kind, defaultSize);
      if (!preferredSize) return computed;
      // Auto-fit should never be allowed to shrink below the persisted user size.
      return [Math.max(computed[0], preferredSize[0]), Math.max(computed[1], preferredSize[1])];
    };
    node.__k2cfComputeSizePatched = true;
  }

  const oldSetSize = node.setSize;
  if (typeof oldSetSize === "function" && !node.__k2cfSetSizePatched) {
    node.setSize = function () {
      const result = oldSetSize.apply(this, arguments);
      if (this.__k2cfRestoringNodeSize) return result;
      const current = k2cfNormalizeNodeSize(this.size);
      const preferredSize = k2cfPreferredNodeSize(this, kind, defaultSize);
      if (k2cfNodeAutoSizeGuarded(this) && !k2cfLikelyManualNodeResize(this)) {
        if (preferredSize && current && !k2cfSameNodeSize(current, preferredSize)) {
          setTimeout(() => k2cfScheduleNodeSizeRestore(this, kind, defaultSize), 0);
        }
        return result;
      }
      k2cfSaveNodeSize(this, kind, true, k2cfLikelyManualNodeResize(this));
      return result;
    };
    node.__k2cfSetSizePatched = true;
  }

  const oldOnResize = node.onResize;
  node.onResize = function () {
    const result = oldOnResize?.apply(this, arguments);
    if (this.__k2cfRestoringNodeSize) return result;
    if (k2cfNodeAutoSizeGuarded(this) && !k2cfLikelyManualNodeResize(this)) {
      const preferredSize = k2cfPreferredNodeSize(this, kind, defaultSize);
      if (preferredSize && !k2cfSameNodeSize(this.size, preferredSize)) {
        setTimeout(() => k2cfScheduleNodeSizeRestore(this, kind, defaultSize), 0);
      }
      return result;
    }
    k2cfSaveNodeSize(this, kind, true, k2cfLikelyManualNodeResize(this));
    return result;
  };

  // Poll briefly after creation because some ComfyUI 0.26 tab switches mutate node.size directly.
  let lastSize = k2cfNormalizeNodeSize(node.size);
  let ticks = 0;
  const interval = setInterval(() => {
    if (!node.graph && !app?.graph?._nodes?.includes?.(node)) { clearInterval(interval); return; }
    const current = k2cfNormalizeNodeSize(node.size);
    if (current && lastSize && !k2cfSameNodeSize(current, lastSize)) {
      if (k2cfNodeAutoSizeGuarded(node)) k2cfScheduleNodeSizeRestore(node, kind, defaultSize);
      else k2cfSaveNodeSize(node, kind, true);
      lastSize = current;
    }
    if (++ticks > 120) clearInterval(interval);
  }, 250);
}

function k2cfIsDefaultValue(name, value) {
  const s = String(value ?? "").trim();
  if (!s) return true;
  if (name === "width") return s === String(DEFAULT_WIDTH);
  if (name === "height") return s === String(DEFAULT_HEIGHT);
  if (name === "preset") return s === DEFAULT_PRESET;
  if (name === "layout_data") return !k2cfJsonHasBoxes(s);
  if (name === "camera_data") return !k2cfJsonHasValues(s) || s === '{"iso":"","shutter":"","aperture":"","focal_length":""}';
  if (name === "camera_set_data" || name === "canvas_preset_data") return !k2cfJsonHasValues(s) || s === '{"sets":[],"selected":""}';
  if (name === "grid_mode") return s === "Thirds";
  if (name === "ui_language") return s === "Auto";
  if (name === "prompt_ui_data") return !k2cfPromptUiHasMeaningfulState(s);
  if (name.endsWith("_prompt") || name === "scene") return !s;
  if (name.endsWith("_type")) return !s || s === "obj";
  return !s;
}

function k2cfMergeWithPrevious(widgetNames, values, previousValues) {
  if (!Array.isArray(values) || !Array.isArray(previousValues)) return values;
  return values.map((value, i) => {
    const name = widgetNames[i];
    const previous = previousValues[i];
    if (previous === undefined || previous === null) return value;
    if (k2cfIsDefaultValue(name, value) && !k2cfIsDefaultValue(name, previous)) return previous;
    return value;
  });
}

function k2cfIsEffectDefaultValue(name, value) {
  const s = String(value ?? "").trim();
  if (!s) return true;
  if (name === "enable_effect") return s === "true";
  if (name === "category") return s === "Photo";
  if (name === "preset") return s === "Realistic Photo";
  if (name === "mode") return s === "Preset";
  if (name === "custom_preset") return !s;
  return !s;
}

function k2cfMergeEffectWithPrevious(widgetNames, values, previousValues) {
  if (!Array.isArray(values) || !Array.isArray(previousValues)) return values;
  return values.map((value, i) => {
    const name = widgetNames[i];
    const previous = previousValues[i];
    if (previous === undefined || previous === null) return value;
    if (k2cfIsEffectDefaultValue(name, value) && !k2cfIsEffectDefaultValue(name, previous)) return previous;
    return value;
  });
}

function k2cfPersistWidgetSnapshot(node, kind, widgetNames, version = "v15") {
  const previous = k2cfBestSavedState(node, kind);
  const currentWidgetValues = k2cfWidgetValues(node, widgetNames);
  const values = kind === "prompt"
    ? k2cfSanitizePromptValues(currentWidgetValues)
    : kind === "effect"
      ? k2cfMergeEffectWithPrevious(widgetNames, currentWidgetValues, previous?.widgets_values)
    : k2cfMergeWithPrevious(widgetNames, currentWidgetValues, previous?.widgets_values);
  const hasEffectTextHeights = kind === "effect" && k2cfHasEffectTextHeights(previous);
  if (!k2cfHasMeaningfulState(values) && !hasEffectTextHeights) return;
  node.properties = node.properties || {};
  const state = { version, widgets_values: values.slice(), saved_at: Date.now() };
  if (kind === "effect" && k2cfHasEffectTextHeights(previous)) {
    state.text_heights = Object.assign({}, previous.text_heights);
  }
  if (kind === "prompt") node.properties.k2cfPromptState = state;
  if (kind === "effect") node.properties.k2cfEffectState = state;
  if (kind === "canvas") node.properties.k2cfCanvasState = state;
  k2cfWriteLocalState(node, kind, state);
}

function applyConfiguredValuesToWidgets(node, widgetNames, values) {
  if (!Array.isArray(values)) return;
  widgetNames.forEach((name, i) => {
    const w = widget(node, name);
    if (w && values[i] !== undefined && values[i] !== null) {
      w.value = values[i];
      w.serialize = true;
      w.options = w.options || {};
      w.options.serialize = true;
    }
  });
}

function installNodePersistenceHooks(node, syncFn, widgetNames, tag) {
  if (!node || node[`__${tag}PersistenceInstalled`]) return;
  node[`__${tag}PersistenceInstalled`] = true;
  node[`__${tag}Sync`] = syncFn;

  const kind = tag.startsWith("k2cfPrompt") ? "prompt" : (tag.startsWith("k2cfEffect") ? "effect" : "canvas");

  const snapshot = () => {
    try { node.__k2cfPromptUiSnapshot?.(); } catch (_) {}
    try { node.__k2cfNodeSizeSnapshot?.(); } catch (_) {}
    const previous = k2cfBestSavedState(node, kind);
    syncFn?.(false);
    const latest = kind === "effect" ? k2cfBestSavedState(node, kind) : previous;
    const currentValues = k2cfWidgetValues(node, widgetNames);
    const values = kind === "prompt"
      ? (node.__k2cfAllowDefaultOverwrite
        ? k2cfSanitizePromptValues(currentValues)
        : k2cfSanitizePromptValues(k2cfMergeWithPrevious(widgetNames, currentValues, previous?.widgets_values)))
      : kind === "effect"
        ? (node.__k2cfAllowDefaultOverwrite
          ? currentValues
          : k2cfMergeEffectWithPrevious(widgetNames, currentValues, previous?.widgets_values))
      : (node.__k2cfAllowDefaultOverwrite
        ? currentValues
        : k2cfMergeWithPrevious(widgetNames, currentValues, previous?.widgets_values));
    if (kind !== "prompt" && !node.__k2cfAllowDefaultOverwrite && !k2cfHasMeaningfulState(values) && previous) {
      applyConfiguredValuesToWidgets(node, widgetNames, previous.widgets_values);
      node.properties = node.properties || {};
      if (kind === "prompt") node.properties.k2cfPromptState = previous;
      if (kind === "effect") node.properties.k2cfEffectState = previous;
      if (kind === "canvas") node.properties.k2cfCanvasState = previous;
      k2cfWriteLocalState(node, kind, previous);
      return previous.widgets_values.slice();
    }
    node.properties = node.properties || {};
    const state = { version: "v15", widgets_values: values.slice(), saved_at: Date.now() };
    if (kind === "effect") {
      const textHeightSource = k2cfHasEffectTextHeights(latest) ? latest : previous;
      if (k2cfHasEffectTextHeights(textHeightSource)) state.text_heights = Object.assign({}, textHeightSource.text_heights);
    }
    if (kind === "prompt") node.properties.k2cfPromptState = state;
    if (kind === "effect") node.properties.k2cfEffectState = state;
    if (kind === "canvas") node.properties.k2cfCanvasState = state;
    k2cfWriteLocalState(node, kind, state);
    return values;
  };

  const applySnapshotToSerializedData = (data) => {
    const values = snapshot();
    if (data) {
      data.widgets_values = values;
      data.properties = Object.assign({}, data.properties || {}, node.properties || {});
      const size = k2cfNormalizeNodeSize(node.size);
      if (size) data.size = size.slice();
    }
    return values;
  };

  const oldOnSerialize = node.onSerialize;
  node.onSerialize = function (data) {
    const result = oldOnSerialize?.apply(this, arguments);
    if (data) applySnapshotToSerializedData(data);
    return result;
  };

  const oldSerialize = node.serialize;
  if (oldSerialize && !node[`__${tag}SerializePatched`]) {
    node.serialize = function () {
      const data = oldSerialize.apply(this, arguments);
      if (data) applySnapshotToSerializedData(data);
      return data;
    };
    node[`__${tag}SerializePatched`] = true;
  }

  const appObj = window.comfyAPI?.app?.app || app;
  const snapshotGraphNodes = () => {
    try {
      for (const n of appObj?.graph?._nodes || app?.graph?._nodes || []) {
        n.__k2cfPromptUiSnapshot?.(false, false);
        n.__k2cfNodeSizeSnapshot?.(false);
        n.__k2cfCanvasSync?.(false);
        n.__k2cfPromptSync?.(false);
      }
    } catch (_) {}
  };
  if (appObj && !window.__k2cfQueuePersistenceInstalledV19) {
    const originalQueuePrompt = appObj.queuePrompt?.bind(appObj);
    if (originalQueuePrompt) {
      appObj.queuePrompt = function () {
        snapshotGraphNodes();
        return originalQueuePrompt(...arguments);
      };
      window.__k2cfQueuePersistenceInstalledV19 = true;
    }
  }
  if (appObj && !window.__k2cfGraphToPromptPersistenceInstalledV19) {
    const originalGraphToPrompt = appObj.graphToPrompt?.bind(appObj);
    if (originalGraphToPrompt) {
      appObj.graphToPrompt = function () {
        snapshotGraphNodes();
        return originalGraphToPrompt(...arguments);
      };
      window.__k2cfGraphToPromptPersistenceInstalledV19 = true;
    }
  }
}

function k2cfSnapshotAllPromptUi(markDirty = false, allowShrink = false) {
  const appObj = window.comfyAPI?.app?.app || app;
  const nodes = appObj?.graph?._nodes || app?.graph?._nodes || [];
  for (const n of nodes) {
    try { n.__k2cfPromptUiSnapshot?.(markDirty, allowShrink); } catch (_) {}
    try { n.__k2cfNodeSizeSnapshot?.(markDirty); } catch (_) {}
    try { n.__k2cfCanvasSync?.(false); } catch (_) {}
    try { n.__k2cfPromptSync?.(false); } catch (_) {}
    try { n.__k2cfEffectSync?.(false); } catch (_) {}
  }
}

function k2cfInstallPromptUiLifecycleHooks() {
  if (window.__k2cfPromptUiLifecycleInstalledV19) return;
  window.__k2cfPromptUiLifecycleInstalledV19 = true;
  const snapshot = () => k2cfSnapshotAllPromptUi(true);
  window.addEventListener("pagehide", snapshot, true);
  window.addEventListener("beforeunload", snapshot, true);
  window.addEventListener("blur", snapshot, true);
  document.addEventListener("visibilitychange", () => { if (document.hidden) snapshot(); }, true);
  // ComfyUI 0.26 workflow tabs can swap graphs without firing textarea blur/serialize first.
  // Capture before any tab click removes/recreates the DOM widget.
  document.addEventListener("pointerdown", snapshot, true);
  document.addEventListener("mouseup", snapshot, true);
  document.addEventListener("keyup", snapshot, true);
  document.addEventListener("focusout", snapshot, true);
  window.addEventListener("resize", snapshot, true);
}

function k2cfInstallWorkflowLoadHook() {
  const appObj = window.comfyAPI?.app?.app || app;
  if (!appObj || window.__k2cfWorkflowLoadHookInstalledV25) return;
  for (const name of ["loadGraphData", "loadGraph", "loadWorkflow"]) {
    const original = appObj[name];
    if (typeof original !== "function" || original.__k2cfPatched) continue;
    appObj[name] = function () {
      try { k2cfSetWorkflowStorageId(this.graph || app?.graph); } catch (_) {}
      return original.apply(this, arguments);
    };
    appObj[name].__k2cfPatched = true;
  }
  window.__k2cfWorkflowLoadHookInstalledV25 = true;
}

const CAMERA_OPTIONS = {
  iso: ["", "100", "200", "400", "800", "1600", "3200", "6400"],
  shutter: ["", "1/30", "1/60", "1/125", "1/250", "1/500", "1/1000"],
  aperture: ["", "f/1.4", "f/1.8", "f/2.0", "f/2.8", "f/4", "f/5.6", "f/8", "f/11"],
  focal_length: ["", "16mm", "20mm", "24mm", "28mm", "35mm", "50mm", "85mm", "105mm", "135mm", "200mm"],
};

const TYPE_OPTIONS = [["obj", "Object"],["text", "Text"]];

const CANVAS_WIDGETS = ["width", "height", "preset", "layout_data", "camera_data", "grid_mode", "ui_language", "camera_set_data", "canvas_preset_data"];
const PROMPT_WIDGETS = [
  "scene", "background",
  "red_prompt", "blue_prompt", "yellow_prompt", "green_prompt", "magenta_prompt",
  "red_type", "blue_type", "yellow_type", "green_type", "magenta_type",
  "prompt_ui_data",
  "red_framing", "blue_framing", "yellow_framing", "green_framing", "magenta_framing",
  "red_angle", "blue_angle", "yellow_angle", "green_angle", "magenta_angle",
];

function k2cfIsLegacyRedTestResidue(values) {
  if (!Array.isArray(values) || values.length < 2) return false;
  if (String(values[2] ?? "").trim() !== "1111") return false;
  for (const i of [0, 2, 3, 4, 5, 6, 7, 8, 9, 10]) {
    if (String(values[i] ?? "").trim()) return false;
  }
  return true;
}

function k2cfSanitizePromptValues(values) {
  if (!Array.isArray(values)) return values;
  const next = values.slice();
  if (k2cfIsLegacyRedTestResidue(next)) next[2] = "";
  if (typeof next[11] === "string" && next[11].trim().startsWith("{")) {
    try {
      const ui = JSON.parse(next[11]);
      const pv = ui?.promptValues;
      if (pv && String(pv.red_prompt ?? "").trim() === "1111") {
        const others = ["scene", "blue_prompt", "yellow_prompt", "green_prompt", "magenta_prompt", "red_type", "blue_type", "yellow_type", "green_type", "magenta_type"];
        if (others.every((k) => !String(pv[k] ?? "").trim())) {
          pv.red_prompt = "";
          next[11] = JSON.stringify(ui);
        }
      }
    } catch (_) {}
  }
  return next;
}

function widget(node, name) {
  return node.widgets?.find((w) => w.name === name);
}

function hideWidget(w) {
  if (!w) return;
  w.serialize = true;
  w.options = w.options || {};
  w.options.serialize = true;
  w.options.hidden = true;
  w.hidden = true;
  w.type = "hidden";
  w.computeSize = () => [0, -4];
}

function hideWidgetsByName(node, names) {
  for (const name of names) hideWidget(widget(node, name));
}

function stop(ev) {
  ev.stopPropagation();
}

function k2cfIsWheelInteractiveTarget(target) {
  const el = target?.closest?.("input, textarea, select, button, option, [contenteditable='true'], .k2fx-wrap, .k2cf-overlay, .k2cf-screen");
  return !!el;
}

function k2cfIsPointerInteractiveTarget(target) {
  const el = target?.closest?.("input, textarea, select, button, option, [contenteditable='true'], .k2fx-wrap, .k2cf-overlay, .k2cf-screen, .k2cf-slot-head");
  return !!el;
}

function k2cfGraphCanvas() {
  return app?.canvas?.canvas || window.comfyAPI?.app?.app?.canvas?.canvas;
}

function k2cfForwardWheelToGraph(ev) {
  if (k2cfIsWheelInteractiveTarget(ev.target)) return;
  const canvasEl = k2cfGraphCanvas();
  if (!canvasEl) return;
  ev.preventDefault();
  ev.stopPropagation();
  const forwarded = new WheelEvent("wheel", {
    bubbles: true,
    cancelable: true,
    view: window,
    deltaX: ev.deltaX,
    deltaY: ev.deltaY,
    deltaZ: ev.deltaZ,
    deltaMode: ev.deltaMode,
    clientX: ev.clientX,
    clientY: ev.clientY,
    screenX: ev.screenX,
    screenY: ev.screenY,
    ctrlKey: ev.ctrlKey,
    shiftKey: ev.shiftKey,
    altKey: ev.altKey,
    metaKey: ev.metaKey,
  });
  canvasEl.dispatchEvent(forwarded);
}

function k2cfAllowWheelZoomOnEmptySpace(wrap) {
  wrap?.addEventListener?.("wheel", k2cfForwardWheelToGraph, { passive: false, capture: true });
}

function k2cfForwardMouseEventToGraph(type, ev, canvasEl) {
  const forwarded = new MouseEvent(type, {
    bubbles: true,
    cancelable: true,
    view: window,
    button: ev.button,
    buttons: ev.buttons,
    clientX: ev.clientX,
    clientY: ev.clientY,
    screenX: ev.screenX,
    screenY: ev.screenY,
    ctrlKey: ev.ctrlKey,
    shiftKey: ev.shiftKey,
    altKey: ev.altKey,
    metaKey: ev.metaKey,
  });
  canvasEl.dispatchEvent(forwarded);
}

function k2cfPanGraphBy(dx, dy) {
  const graphCanvas = app?.canvas || window.comfyAPI?.app?.app?.canvas;
  const ds = graphCanvas?.ds;
  if (!ds?.offset) return false;
  const scale = Number(ds.scale) || 1;
  ds.offset[0] += dx / scale;
  ds.offset[1] += dy / scale;
  graphCanvas.setDirty?.(true, true);
  graphCanvas.draw?.(true, true);
  return true;
}

function k2cfSetPanCursor(active) {
  document.body.style.cursor = active ? "grabbing" : "";
}

let k2cfMiddlePanStartedAt = 0;

function k2cfStartMiddlePan(ev, moveType, upType, cancelType) {
  if (ev.button !== 1) return false;
  if (k2cfIsPointerInteractiveTarget(ev.target)) return false;
  const canvasEl = k2cfGraphCanvas();
  if (!canvasEl) return false;
  const now = Date.now();
  if (now - k2cfMiddlePanStartedAt < 80) return true;
  k2cfMiddlePanStartedAt = now;
  ev.preventDefault();
  ev.stopPropagation();
  let lastX = ev.clientX;
  let lastY = ev.clientY;
  k2cfSetPanCursor(true);
  const directMove = (moveEv) => {
    moveEv.preventDefault();
    moveEv.stopPropagation();
    const dx = moveEv.clientX - lastX;
    const dy = moveEv.clientY - lastY;
    lastX = moveEv.clientX;
    lastY = moveEv.clientY;
    if (!k2cfPanGraphBy(dx, dy)) k2cfForwardMouseEventToGraph("mousemove", moveEv, canvasEl);
  };
  const directUp = (upEv) => {
    upEv.preventDefault();
    upEv.stopPropagation();
    k2cfSetPanCursor(false);
    window.removeEventListener(moveType, directMove, true);
    window.removeEventListener(upType, directUp, true);
    if (cancelType) window.removeEventListener(cancelType, directUp, true);
  };
  window.addEventListener(moveType, directMove, true);
  window.addEventListener(upType, directUp, true);
  if (cancelType) window.addEventListener(cancelType, directUp, true);
  return true;
}

function k2cfAllowGraphPanOnEmptySpace(wrap) {
  wrap?.addEventListener?.("pointerdown", (ev) => {
    k2cfStartMiddlePan(ev, "pointermove", "pointerup", "pointercancel");
  }, true);
  wrap?.addEventListener?.("auxclick", (ev) => {
    if (ev.button === 1 && !k2cfIsPointerInteractiveTarget(ev.target)) {
      ev.preventDefault();
      ev.stopPropagation();
    }
  }, true);
  wrap?.addEventListener?.("mousedown", (ev) => {
    if (ev.button !== 0 && ev.button !== 1) return;
    if (k2cfIsPointerInteractiveTarget(ev.target)) return;
    const canvasEl = k2cfGraphCanvas();
    if (!canvasEl) return;
    ev.preventDefault();
    ev.stopPropagation();
    if (k2cfStartMiddlePan(ev, "mousemove", "mouseup")) return;
    k2cfForwardMouseEventToGraph("mousedown", ev, canvasEl);

    const forwardMove = (moveEv) => {
      moveEv.preventDefault();
      moveEv.stopPropagation();
      k2cfForwardMouseEventToGraph("mousemove", moveEv, canvasEl);
    };
    const stopForwarding = (upEv) => {
      upEv.preventDefault();
      upEv.stopPropagation();
      k2cfForwardMouseEventToGraph("mouseup", upEv, canvasEl);
      window.removeEventListener("mousemove", forwardMove, true);
      window.removeEventListener("mouseup", stopForwarding, true);
    };
    window.addEventListener("mousemove", forwardMove, true);
    window.addEventListener("mouseup", stopForwarding, true);
  }, true);
}

function button(text, title) {
  const el = document.createElement("button");
  el.className = "k2cf-btn";
  el.textContent = text;
  el.title = title || "";
  el.addEventListener("pointerdown", stop);
  return el;
}

function ensureStyle() {
  const existingStyle = document.getElementById("krea2-bbox-prompter-suite-style-v1");
  const effectSizeCss = `.k2fx-sizebar{display:flex;justify-content:flex-end;align-items:center;gap:6px;margin-top:-4px;color:#aaa;font-size:10.5px}.k2fx-sizebar input{width:110px;accent-color:#35d0c8}.k2fx-sizebar output{width:36px;text-align:right;color:#ddd}`;
  const effectStyleBoostCss = `/* k2fx-styleboost-toggle-v2 */.k2fx-styleboost{display:flex;justify-content:flex-end;align-items:center;gap:8px;margin-top:-2px;color:#aaa;font-size:10.5px}.k2fx-styleboost-label{color:#35d0c8;font-weight:700;margin-right:2px}.k2fx-boost-toggle{display:flex;align-items:center;gap:5px;color:#bbb;font-size:11px;white-space:nowrap;cursor:pointer}.k2fx-boost-toggle input{display:none}.k2fx-boost-switch{width:32px;height:17px;border-radius:99px;background:#444;border:1px solid #666;position:relative;display:inline-block;box-sizing:border-box}.k2fx-boost-switch::after{content:"";position:absolute;width:13px;height:13px;border-radius:50%;left:1px;top:1px;background:#bbb;transition:left .12s ease,background .12s ease}.k2fx-boost-toggle input:checked + .k2fx-boost-switch{background:#138f8b;border-color:#35d0c8}.k2fx-boost-toggle input:checked + .k2fx-boost-switch::after{left:16px;background:#fff}.k2fx-boost-toggle.active{color:#fff}`;
  const effectTextareaResizeCss = `/* k2fx-textarea-resize-v3 */.k2fx-textarea-box{position:relative;display:block;min-width:0}.k2fx-textarea-box textarea{display:block;width:100%;resize:none!important;max-height:360px}.k2fx-preview,.k2fx-custom{max-height:360px}.k2fx-preview{min-height:42px}.k2fx-custom{min-height:70px}.k2fx-resize-grip{position:absolute;right:4px;bottom:4px;width:16px;height:16px;cursor:nwse-resize;z-index:3;border-radius:3px}.k2fx-resize-grip::before{content:"";position:absolute;right:3px;bottom:3px;width:8px;height:8px;border-right:2px solid #777;border-bottom:2px solid #777}.k2fx-resize-grip:hover::before{border-color:#35d0c8}`;
  const panCursorCss = `.k2cf-scene,.k2cf-slot-card,.k2cf-slot-body,.k2cf-slot-side,.k2cf-panel,.k2cf-panels{cursor:grab}.k2cf-scene textarea,.k2cf-slot-card textarea,.k2cf-slot-card select,.k2cf-slot-card button,.k2cf-panel input,.k2cf-panel select,.k2cf-panel button,.k2cf-slot-head{cursor:auto}`;
  if (existingStyle) {
    existingStyle.textContent = existingStyle.textContent
      .replace(/\.k2cf-wrap,\.k2cf-prompt-wrap(?:,[^{]+)?\{pointer-events:none\}/g, "")
      .replace(/\.k2cf-wrap input,[^{]+?\{pointer-events:auto\}/g, "");
    if (!existingStyle.textContent.includes("k2fx-sizebar")) existingStyle.textContent += effectSizeCss;
    if (!existingStyle.textContent.includes("k2fx-styleboost-toggle-v2")) existingStyle.textContent += effectStyleBoostCss;
    if (!existingStyle.textContent.includes("k2fx-textarea-resize-v3")) existingStyle.textContent += effectTextareaResizeCss;
    if (!existingStyle.textContent.includes("k2cf-slot-body,.k2cf-slot-side,.k2cf-panel")) existingStyle.textContent += panCursorCss;
    if (!existingStyle.textContent.includes("--k2fx-thumb-w")) {
      existingStyle.textContent += `.k2fx-grid{grid-template-columns:repeat(auto-fill,minmax(calc(var(--k2fx-thumb-w, 110px) + 12px),1fr))}.k2fx-thumb{width:var(--k2fx-thumb-w, 110px);height:calc(var(--k2fx-thumb-w, 110px) * .6667);max-width:100%}`;
    }
    return;
  }
  const style = document.createElement("style");
  style.id = "krea2-bbox-prompter-suite-style-v1";
  style.textContent = `
    .k2cf-wrap{display:flex;flex-direction:column;gap:8px;color:#ddd;font:12px sans-serif;height:100%;min-height:0;overflow:hidden}
    .k2cf-toolbar{display:flex;justify-content:space-between;gap:10px;align-items:center;flex-wrap:wrap}
    .k2cf-tools,.k2cf-sizebar{display:flex;align-items:center;gap:7px;flex-wrap:wrap}
    .k2cf-monitor{background:#070707;border:1px solid #2d2d2d;border-radius:10px;padding:9px;min-height:590px;display:flex;align-items:center;justify-content:center;overflow:hidden;flex:1;min-width:0}
    .k2cf-screen{position:relative;background:#111;border:2px solid #222;border-radius:9px;overflow:hidden;line-height:0;max-width:100%;max-height:100%;box-shadow:inset 0 0 0 2px rgba(255,255,255,.03)}
    .k2cf-bg,.k2cf-overlay{display:block}.k2cf-bg{background:#202424}.k2cf-overlay{position:absolute;inset:0;touch-action:none;cursor:crosshair}
    .k2cf-guide{position:absolute;inset:0;pointer-events:none}
    .k2cf-guide.thirds{background-image:linear-gradient(90deg,transparent 32.9%,rgba(255,255,255,.22) 33%,rgba(255,255,255,.22) 33.2%,transparent 33.3%,transparent 66.4%,rgba(255,255,255,.22) 66.6%,rgba(255,255,255,.22) 66.8%,transparent 67%),linear-gradient(0deg,transparent 32.9%,rgba(255,255,255,.18) 33%,rgba(255,255,255,.18) 33.2%,transparent 33.3%,transparent 66.4%,rgba(255,255,255,.18) 66.6%,rgba(255,255,255,.18) 66.8%,transparent 67%)}
    .k2cf-guide.cross{background-image:linear-gradient(90deg,transparent 49.8%,rgba(255,255,255,.25) 50%,rgba(255,255,255,.25) 50.2%,transparent 50.4%),linear-gradient(0deg,transparent 49.8%,rgba(255,255,255,.22) 50%,rgba(255,255,255,.22) 50.2%,transparent 50.4%)}
    .k2cf-guide.diagonal{background-image:linear-gradient(34deg,transparent 49.7%,rgba(255,255,255,.16) 50%,transparent 50.3%),linear-gradient(146deg,transparent 49.7%,rgba(255,255,255,.16) 50%,transparent 50.3%)}
    .k2cf-panels{display:grid;grid-template-columns:minmax(150px,.62fr) minmax(280px,1.38fr);gap:8px;flex:0 0 auto}
    .k2cf-panel{background:#181818;border:1px solid #333;border-radius:7px;padding:5px;min-width:0}
    .k2cf-panel h4{margin:0 0 4px;color:#35d0c8;font-size:11px}
    .k2cf-camera-panel{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));align-items:flex-start;gap:10px}
    .k2cf-compact-group{display:flex;flex-direction:column;gap:6px;min-width:0}
    .k2cf-section-label{color:#35d0c8;font-size:11px;font-weight:700;line-height:1}
    .k2cf-note{color:#8f9b9b;font-size:10.5px;line-height:1.25;max-width:100%;overflow-wrap:anywhere}
    .k2cf-camera-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(70px,82px));gap:5px;justify-content:start}
    .k2cf-camera-head{display:flex;gap:8px;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;margin-bottom:5px}
    .k2cf-camera-setbar,.k2cf-canvas-presetbar{display:flex;gap:5px;align-items:center;flex-wrap:wrap;min-width:0}
    .k2cf-canvas-presetbar select{flex:1 1 82px;min-width:74px;max-width:120px}
    .k2cf-canvas-presetbar .k2cf-btn{flex:0 1 auto}
    .k2cf-camera-setbar select{min-width:120px}
    .k2cf-inline-label{font-size:11px;color:#bbb;white-space:nowrap}
    .k2cf-camera-cell{min-width:0}.k2cf-camera-cell>div:first-child{font-size:10px;color:#bbb;margin-bottom:2px}
    .k2cf-rowline{display:flex;gap:5px;align-items:center;flex-wrap:wrap}
    .k2cf-combo-stack{display:flex;flex-direction:column;gap:3px;align-items:stretch;min-width:0}
    .k2cf-btn{background:#303030;color:#ddd;border:1px solid #555;border-radius:5px;padding:3px 8px;cursor:pointer;white-space:nowrap}.k2cf-btn:hover{border-color:#aaa}.k2cf-btn.primary{background:#167d86;border-color:#35d0c8;color:white}.k2cf-btn:disabled{opacity:.35;cursor:not-allowed}
    .k2cf-sw{width:24px;height:24px;border-radius:5px;border:2px solid #666;cursor:pointer}.k2cf-sw.active{border-color:#fff;box-shadow:inset 0 0 0 2px #111}
    .k2cf-num{width:68px;background:#202020;color:#eee;border:1px solid #555;border-radius:5px;padding:3px 5px;text-align:right;box-sizing:border-box}
    .k2cf-select,.k2cf-combo{background:#202020;color:#eee;border:1px solid #555;border-radius:5px;padding:3px 5px;box-sizing:border-box;max-width:100%}.k2cf-combo{width:82px}.k2cf-select.user-preset{color:${USER_PRESET_COLOR};border-color:${USER_PRESET_COLOR}}
    .k2cf-input{background:#202020;color:#eee;border:1px solid #555;border-radius:5px;padding:3px 5px;box-sizing:border-box;width:88px;min-width:72px;max-width:92px}
    .k2cf-help{display:none;color:#aaa;font-size:10.5px;margin-top:3px}
    .k2cf-panel select{max-width:100%}.k2cf-help .user{color:${USER_PRESET_COLOR}}
    .k2cf-prompt-wrap{display:flex;flex-direction:column;gap:8px;min-height:0;overflow:auto}
    .k2cf-prompt-top{display:flex;gap:8px;align-items:center;justify-content:space-between;flex-wrap:nowrap}
    .k2cf-language-select{width:72px;min-width:72px}
    .k2cf-presetbar{display:flex;gap:5px;align-items:center;justify-content:flex-end;flex-wrap:wrap;font-size:11px}
    .k2cf-presetbar label{color:#35d0c8;font-weight:700;font-size:11px}
    .k2cf-small-select{width:92px;background:#202020;color:#eee;border:1px solid #555;border-radius:5px;padding:3px 5px;box-sizing:border-box;font-size:11px}
    .k2cf-small-btn{background:#303030;color:#ddd;border:1px solid #555;border-radius:5px;padding:3px 7px;cursor:pointer;font-size:11px;line-height:1.1}.k2cf-small-btn:hover{border-color:#aaa}
    .k2cf-scene,.k2cf-slot-card{background:#181818;border:1px solid #333;border-radius:8px;padding:9px}
    .k2cf-scene label,.k2cf-slot-head{display:flex;align-items:center;justify-content:space-between;font-weight:700;margin-bottom:6px}
    .k2cf-slot-head{cursor:pointer}.k2cf-slot-head-left{display:flex;align-items:center;gap:0}.k2cf-foldmark{font-size:11px;color:#aaa;margin-left:8px}
    .k2cf-slot-card.collapsed .k2cf-slot-body{display:none}
    .k2cf-slot-card.collapsed{padding-bottom:6px}
    .k2cf-scene,.k2cf-slot-card,.k2cf-slot-body,.k2cf-slot-side,.k2cf-panel,.k2cf-panels{cursor:grab}
    .k2cf-scene textarea,.k2cf-slot-card textarea,.k2cf-slot-card select,.k2cf-slot-card button,.k2cf-panel input,.k2cf-panel select,.k2cf-panel button,.k2cf-slot-head{cursor:auto}
    .k2cf-dot{display:inline-block;width:11px;height:11px;border-radius:99px;margin-right:7px}
    .k2cf-text{width:100%;min-height:125px;resize:vertical;background:#151515;color:#eee;border:1px solid #3f3f3f;border-radius:5px;padding:8px;box-sizing:border-box;font:12px monospace}
    .k2cf-scene .k2cf-text{min-height:125px}
    .k2cf-slot-body{display:grid;grid-template-columns:1fr 132px;gap:8px;align-items:start}
    .k2cf-slot-side{display:flex;flex-direction:column;gap:7px;align-items:stretch}
    .k2cf-type{width:92px;max-width:92px;height:28px;background:#202020;color:#ddd;border:1px solid #555;border-radius:5px;padding:3px 6px;font-size:12px;box-sizing:border-box}.k2cf-framing{width:170px;max-width:170px;height:28px;background:#202020;color:#ddd;border:1px solid #555;border-radius:5px;padding:3px 6px;font-size:12px;box-sizing:border-box}
    .k2cf-iconbtn{background:#242424;color:#ddd;border:1px solid #555;border-radius:5px;width:26px;height:24px;cursor:pointer}.k2cf-iconbtn:hover{border-color:#aaa}
    .k2fx-wrap{display:flex;flex-direction:column;gap:9px;color:#ddd;font:12px sans-serif;height:100%;min-height:0;overflow:auto;background:#111;border:1px solid #333;border-radius:8px;padding:9px;box-sizing:border-box}.k2fx-io{display:flex;align-items:center;gap:7px;background:#161616;border:1px solid #333;border-radius:6px;padding:4px 7px;color:#bfeeea;font-size:11px;font-weight:700}.k2fx-io .dot{width:9px;height:9px;border-radius:50%;background:#4cff68;box-shadow:0 0 0 1px #193 inset}.k2fx-io .name{color:#ddd;font-weight:600}
    .k2fx-top{display:grid;grid-template-columns:auto 1fr auto;gap:7px;align-items:center}.k2fx-title{font-weight:700;color:#35d0c8;white-space:nowrap}.k2fx-search{min-width:0;background:#202020;color:#eee;border:1px solid #555;border-radius:6px;padding:5px 7px;box-sizing:border-box}.k2fx-switch-label{gap:6px}.k2fx-switch-label input{display:none}.k2fx-switch{width:34px;height:18px;border-radius:99px;background:#444;border:1px solid #666;position:relative;display:inline-block;vertical-align:middle;box-sizing:border-box}.k2fx-switch::after{content:"";position:absolute;width:14px;height:14px;border-radius:50%;left:1px;top:1px;background:#bbb;transition:left .12s ease,background .12s ease}.k2fx-switch-label input:checked + .k2fx-switch{background:#138f8b;border-color:#35d0c8}.k2fx-switch-label input:checked + .k2fx-switch::after{left:17px;background:#fff}.k2fx-toggle{display:flex;align-items:center;gap:5px;color:#bbb;font-size:11px;white-space:nowrap}
    ${effectSizeCss}
    ${effectStyleBoostCss}
    .k2fx-tabs{display:flex;gap:5px;flex-wrap:wrap}.k2fx-tab{background:#242424;color:#ddd;border:1px solid #444;border-radius:999px;padding:4px 9px;cursor:pointer;font-size:11px}.k2fx-tab.active{border-color:#35d0c8;color:#fff;background:#12606a}
    .k2fx-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(calc(var(--k2fx-thumb-w, 110px) + 12px),1fr));gap:7px}.k2fx-card{background:#1b1b1b;border:1px solid #3a3a3a;border-radius:8px;padding:6px;cursor:pointer;min-width:0}.k2fx-card:hover{border-color:#888}.k2fx-card.active{border-color:#35d0c8;box-shadow:0 0 0 1px rgba(53,208,200,.45) inset}.k2fx-custom-notice{grid-column:1/-1;border:1px dashed #3a3a3a;border-radius:8px;padding:12px;color:#aaa;background:#181818;font-size:12px}.k2fx-thumb{width:var(--k2fx-thumb-w, 110px);height:calc(var(--k2fx-thumb-w, 110px) * .6667);border-radius:7px;border:1px solid #333;background:linear-gradient(135deg,#1e1e1e,#4b4b4b);background-size:cover;background-position:center;display:flex;align-items:center;justify-content:center;color:#fff;font-size:14px;font-weight:800;letter-spacing:.03em;margin:0 auto 6px;max-width:100%}.k2fx-thumb.has-img{color:transparent;text-shadow:none}.k2fx-thumb.has-img::after{content:""}.k2fx-card[data-tone="Strong"] .k2fx-thumb{background:linear-gradient(135deg,#050505,#dcdcdc)}.k2fx-card[data-tone="Soft"] .k2fx-thumb{background:linear-gradient(135deg,#777,#eee)}.k2fx-card[data-tone="Analog"] .k2fx-thumb{background:linear-gradient(135deg,#3a2f24,#c0a777)}.k2fx-card[data-tone="Dramatic"] .k2fx-thumb{background:linear-gradient(135deg,#0b0c10,#8d6d42)}
    .k2fx-name{font-weight:700;font-size:12px;color:#eee;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.k2fx-desc{color:#aaa;font-size:10.5px;line-height:1.25;margin-top:3px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}.k2fx-footer{display:flex;flex-direction:column;gap:6px}.k2fx-footer:not(.show){display:none}.k2fx-custom{display:block;width:100%;min-height:70px;resize:none;background:#151515;color:#eee;border:1px solid #444;border-radius:6px;padding:7px;box-sizing:border-box;font:11px monospace}.k2fx-preview{display:block;width:100%;min-height:42px;max-height:240px;resize:none;background:#151515;border:1px solid #333;border-radius:7px;color:#aaa;font:10.5px monospace;padding:7px;box-sizing:border-box;overflow:auto;white-space:pre-wrap;user-select:text}.k2fx-custom-presetbar{display:flex;gap:5px;align-items:center;flex-wrap:wrap}.k2fx-custom-presetbar label{color:#35d0c8;font-weight:700;font-size:11px}.k2fx-custom-presetbar select{flex:1 1 150px;min-width:120px;background:#202020;color:#eee;border:1px solid #555;border-radius:5px;padding:3px 5px}.k2fx-custom-presetbar button{background:#2b2b2b;color:#eee;border:1px solid #555;border-radius:5px;padding:3px 7px;cursor:pointer;font-size:11px}.k2fx-custom-presetbar button:hover{border-color:#35d0c8}
    ${effectTextareaResizeCss}
  `;
  document.head.appendChild(style);
}

function getUserPresets() {
  try {
    const raw = localStorage.getItem(USER_PRESET_KEY);
    const arr = JSON.parse(raw || "[]");
    return Array.isArray(arr) ? arr.filter((p) => p && p.label && p.width && p.height) : [];
  } catch (_) {
    return [];
  }
}

function setUserPresets(presets) {
  localStorage.setItem(USER_PRESET_KEY, JSON.stringify(presets));
}

function option(value, label, user = false) {
  const opt = document.createElement("option");
  opt.value = value;
  opt.textContent = label;
  if (user) opt.dataset.userPreset = "1";
  return opt;
}

function selectWithCustom(options, value) {
  const wrap = document.createElement("div");
  wrap.className = "k2cf-combo-stack";
  const select = document.createElement("select");
  select.className = "k2cf-combo";
  for (const v of options) select.appendChild(option(v, v || "--"));
  const input = document.createElement("input");
  input.className = "k2cf-input";
  input.placeholder = "Custom";
  input.value = value && !options.includes(value) ? value : "";
  select.value = options.includes(value) ? value : "";
  wrap.append(select, input);
  const get = () => input.value.trim() || select.value;
  const set = (v) => {
    if (options.includes(v)) {
      select.value = v;
      input.value = "";
    } else {
      select.value = "";
      input.value = v || "";
    }
  };
  return { wrap, select, input, get, set };
}

function k2cfInstallDebugHelpers() {
  if (window.__k2cfDebugHelpersInstalledV19) return;
  window.__k2cfDebugHelpersInstalledV19 = true;
  window.__k2cfSnapshotPromptState = () => k2cfSnapshotAllPromptUi(true, true);
  window.__k2cfResetPromptHeightCache = () => {
    for (const store of [localStorage, sessionStorage]) {
      for (const key of Object.keys(store)) {
        if (String(key).toLowerCase().includes("k2cf") || String(key).toLowerCase().includes("krea2")) store.removeItem(key);
      }
    }
    location.reload();
  };
  window.__k2cfDumpPromptState = () => {
    const appObj = window.comfyAPI?.app?.app || app;
    const nodes = (appObj?.graph?._nodes || app?.graph?._nodes || []).filter((n) => n?.type === PROMPT_NODE || n?.comfyClass === PROMPT_NODE);
    return nodes.map((n) => {
      const promptUiWidget = widget(n, "prompt_ui_data");
      const textareas = Array.from(document.querySelectorAll(".k2cf-prompt-wrap textarea")).map((el) => ({
        placeholder: el.placeholder,
        offsetHeight: el.offsetHeight,
        styleHeight: el.style.height,
        appliedHeight: el.dataset.k2cfAppliedHeight || "",
      }));
      return {
        id: n.id,
        type: n.type || n.comfyClass,
        size: Array.isArray(n.size) ? n.size.slice() : n.size,
        serializedSize: n.properties?.k2cfPromptNodeSize || null,
        promptUiProperty: n.properties?.k2cfPromptUiState || null,
        promptUiWidget: k2cfReadJsonObject(promptUiWidget?.value) || promptUiWidget?.value || null,
        promptUiLocal: k2cfReadLocalState(n, "prompt_ui"),
        widgetsValuesLength: Array.isArray(n.widgets_values) ? n.widgets_values.length : null,
        textareas,
      };
    });
  };
}

app.registerExtension({
  name: "krea2.element.framing.v1",
  beforeRegisterNodeDef(nodeType, nodeData) {
    if (nodeData.name !== CANVAS_NODE && nodeData.name !== PROMPT_NODE && nodeData.name !== EFFECT_NODE && nodeData.name !== EFFECT_NODE_BBOX) return;
    k2cfInstallWorkflowLoadHook();
    k2cfInstallPromptUiLifecycleHooks();
    k2cfInstallDebugHelpers();

    const oldConfigure = nodeType.prototype.onConfigure;
    nodeType.prototype.onConfigure = function (info) {
      this.__k2cfConfiguredWidgetValues = Array.isArray(info?.widgets_values) ? info.widgets_values.slice() : null;
      this.__k2cfConfiguredSize = k2cfNormalizeNodeSize(info?.size);
      this.__k2cfConfiguredCanvasState = info?.properties?.k2cfCanvasState || null;
      this.__k2cfConfiguredEffectState = info?.properties?.k2cfEffectState || null;
      this.__k2cfConfiguredPromptState = info?.properties?.k2cfPromptState || null;
      this.__k2cfConfiguredPromptUiState = info?.properties?.k2cfPromptUiState || null;
      this.__k2cfConfiguredCanvasNodeSize = info?.properties?.k2cfCanvasNodeSize || null;
      this.__k2cfConfiguredPromptNodeSize = info?.properties?.k2cfPromptNodeSize || null;
      this.__k2cfSkipLocalCanvasState =
        !k2cfHasMeaningfulState(this.__k2cfConfiguredWidgetValues) &&
        !k2cfHasMeaningfulState(this.__k2cfConfiguredCanvasState?.widgets_values);
      this.__k2cfSkipLocalPromptState =
        !k2cfHasMeaningfulState(this.__k2cfConfiguredWidgetValues) &&
        !k2cfHasMeaningfulState(this.__k2cfConfiguredPromptState?.widgets_values);
      const result = oldConfigure?.apply(this, arguments);
      if (this.__k2cfApplyConfiguredValues) this.__k2cfApplyConfiguredValues(this.__k2cfConfiguredWidgetValues);
      if (this.__k2cfHydrateFromWidgets) {
        requestAnimationFrame(() => this.__k2cfHydrateFromWidgets?.());
      }
      if (this.__k2cfNodeSizeKind) {
        const kind = this.__k2cfNodeSizeKind;
        const defaultSize = this.__k2cfNodeSizeDefault || (kind === "canvas" ? K2CF_CANVAS_DEFAULT_SIZE : K2CF_PROMPT_DEFAULT_SIZE);
        k2cfScheduleNodeSizeRestore(this, kind, defaultSize);
      }
      return result;
    };

    const oldCreated = nodeType.prototype.onNodeCreated;
    nodeType.prototype.onNodeCreated = function () {
      oldCreated?.apply(this, arguments);
      ensureStyle();
      if (nodeData.name === CANVAS_NODE) setupCanvasNode(this);
      if (nodeData.name === PROMPT_NODE) setupPromptNode(this);
      if (nodeData.name === EFFECT_NODE || nodeData.name === EFFECT_NODE_BBOX) setupEffectNode(this);
    };
  },
});


function setupEffectNode(node) {
  node.resizable = true;
  node.serialize_widgets = true;
  const widgets = {};
  for (const name of EFFECT_WIDGETS) widgets[name] = widget(node, name);
  Object.values(widgets).forEach(hideWidget);
  const configuredWidgetValues = Array.isArray(node.__k2cfConfiguredWidgetValues)
    ? node.__k2cfConfiguredWidgetValues.slice()
    : null;
  const configuredStateValues = Array.isArray(node.__k2cfConfiguredEffectState?.widgets_values)
    ? node.__k2cfConfiguredEffectState.widgets_values.slice()
    : null;
  const configuredValues = k2cfHasMeaningfulState(configuredWidgetValues)
    ? configuredWidgetValues
    : configuredStateValues;
  let hydrateEffectUiFromWidgets = null;
  node.__k2cfApplyConfiguredValues = (values) => {
    applyConfiguredValuesToWidgets(node, EFFECT_WIDGETS, values);
    hydrateEffectUiFromWidgets?.();
  };
  applyConfiguredValuesToWidgets(node, EFFECT_WIDGETS, configuredValues);
  const savedEffectState = k2cfBestSavedState(node, "effect");
  if (savedEffectState) applyConfiguredValuesToWidgets(node, EFFECT_WIDGETS, savedEffectState.widgets_values);
  const effectTextHeights = Object.assign(
    {},
    node.__k2cfConfiguredEffectState?.text_heights || {},
    savedEffectState?.text_heights || {}
  );

  const wrap = document.createElement("div");
  wrap.className = "k2fx-wrap";
  wrap.addEventListener("pointerdown", stop);
  wrap.addEventListener("wheel", stop, {passive:false});

  const ioRow = document.createElement("div");
  ioRow.className = "k2fx-io";
  const ioDot = document.createElement("span");
  ioDot.className = "dot";
  const ioText = document.createElement("span");
  ioText.textContent = "IN";
  const ioName = document.createElement("span");
  ioName.className = "name";
  ioName.textContent = "prompt_in";
  ioRow.append(ioDot, ioText, ioName);

  const top = document.createElement("div");
  top.className = "k2fx-top";
  const title = document.createElement("div");
  title.className = "k2fx-title";
  title.textContent = "Prompt Effect";
  const search = document.createElement("input");
  search.className = "k2fx-search";
  search.placeholder = "Search presets...";
  search.title = "Filter effect presets by name, category, or prompt text.";
  const toggleLabel = document.createElement("label");
  toggleLabel.className = "k2fx-toggle k2fx-switch-label";
  toggleLabel.title = "Enable or disable Prompt Effect without removing the node.";
  const enabled = document.createElement("input");
  enabled.type = "checkbox";
  enabled.checked = widgets.enable_effect?.value !== false;
  const switchUi = document.createElement("span");
  switchUi.className = "k2fx-switch";
  const switchText = document.createElement("span");
  switchText.textContent = "Enable";
  toggleLabel.append(enabled, switchUi, switchText);
  top.append(title, search, toggleLabel);
  const thumbSizeMin = 80;
  const thumbSizeMax = 180;
  const readThumbSize = () => Math.min(thumbSizeMax, Math.max(thumbSizeMin, Number(localStorage.getItem(EFFECT_THUMB_SIZE_KEY)) || 135));
  const sizeBar = document.createElement("label");
  sizeBar.className = "k2fx-sizebar";
  sizeBar.title = "Change thumbnail card size in the Prompt Effect gallery.";
  const sizeText = document.createElement("span");
  sizeText.textContent = "Size";
  const sizeSlider = document.createElement("input");
  sizeSlider.type = "range";
  sizeSlider.min = String(thumbSizeMin);
  sizeSlider.max = String(thumbSizeMax);
  sizeSlider.step = "5";
  sizeSlider.value = String(readThumbSize());
  const sizeValue = document.createElement("output");
  function applyThumbSize(value) {
    const size = Math.min(thumbSizeMax, Math.max(thumbSizeMin, Number(value) || 135));
    wrap.style.setProperty("--k2fx-thumb-w", `${size}px`);
    sizeSlider.value = String(size);
    sizeValue.textContent = `${size}`;
    localStorage.setItem(EFFECT_THUMB_SIZE_KEY, String(size));
  }
  sizeBar.append(sizeText, sizeSlider, sizeValue);
  applyThumbSize(sizeSlider.value);

  const normalizeStyleBoost = (value) => {
    const v = String(value || "").trim().toLowerCase();
    if (v === "photo") return "Photo";
    if (v === "anime") return "Anime";
    return "";
  };
  let activeStyleBoost = normalizeStyleBoost(widgets.style_boost?.value);
  const styleBoostBar = document.createElement("div");
  styleBoostBar.className = "k2fx-styleboost";
  styleBoostBar.title = "Optional short style booster appended after the selected effect prompt.";
  const styleBoostLabel = document.createElement("span");
  styleBoostLabel.className = "k2fx-styleboost-label";
  styleBoostLabel.textContent = "Style Boost";
  const makeBoostToggle = (label, title) => {
    const wrapLabel = document.createElement("label");
    wrapLabel.className = "k2fx-boost-toggle";
    wrapLabel.title = title;
    const input = document.createElement("input");
    input.type = "checkbox";
    const slider = document.createElement("span");
    slider.className = "k2fx-boost-switch";
    const text = document.createElement("span");
    text.textContent = label;
    wrapLabel.append(input, slider, text);
    return { wrapLabel, input };
  };
  const boostPhotoControl = makeBoostToggle("Photo", "Append a short realistic photo booster.");
  const boostAnimeControl = makeBoostToggle("Anime", "Append a short anime style booster.");
  const boostPhoto = boostPhotoControl.input;
  const boostAnime = boostAnimeControl.input;
  styleBoostBar.append(styleBoostLabel, boostPhotoControl.wrapLabel, boostAnimeControl.wrapLabel);

  const tabs = document.createElement("div");
  tabs.className = "k2fx-tabs";
  let activeCategory = widgets.category?.value || "Photo";
  activeCategory = EFFECT_PRESET_ALIASES[activeCategory] || activeCategory;
  if (!EFFECT_CATEGORIES.includes(activeCategory)) activeCategory = "Photo";
  const grid = document.createElement("div");
  grid.className = "k2fx-grid";
  let footer = null;

  const custom = document.createElement("textarea");
  custom.className = "k2fx-custom";
  custom.placeholder = "Custom effect prompt...";
  custom.title = "Write a custom effect prompt. Save it from the Custom tab if needed.";
  custom.value = widgets.custom_preset?.value || "";
  k2cfAttachPyssssAutocomplete(custom);
  const customPresetBar = document.createElement("div");
  customPresetBar.className = "k2fx-custom-presetbar";
  const customPresetLabel = document.createElement("label");
  customPresetLabel.textContent = "Preset";
  customPresetLabel.title = "Local Custom presets are stored in user_presets.";
  const customPresetSelect = document.createElement("select");
  customPresetSelect.title = "Choose a saved local Custom effect preset.";
  const customCopy = document.createElement("button");
  customCopy.textContent = "Copy to Custom";
  customCopy.title = "Copy the selected built-in preset prompt into Custom so you can edit and save your own version.";
  const customSave = document.createElement("button");
  customSave.textContent = "Save";
  customSave.title = "Save the current Custom effect prompt to local user_presets JSON.";
  const customLoad = document.createElement("button");
  customLoad.textContent = "Load";
  customLoad.title = "Load the selected Custom effect preset into the Custom prompt box.";
  const customDelete = document.createElement("button");
  customDelete.textContent = "Delete";
  customDelete.title = "Delete the selected Custom effect preset from local user_presets JSON.";
  customPresetBar.append(customPresetLabel, customPresetSelect, customCopy, customSave, customLoad, customDelete);
  let customEffectPresets = [];

  const preview = document.createElement("textarea");
  preview.className = "k2fx-preview";
  preview.readOnly = true;
  preview.title = "Selected effect prompt. Drag the corner to make this box taller; select text to copy.";
  const effectTextHeightBounds = {
    prompt: [42, 360],
    preview: [42, 360],
    custom: [70, 360],
  };
  const validEffectTextHeight = (key, value) => {
    const [min, max] = effectTextHeightBounds[key] || [42, 360];
    const raw = Number(value) || 0;
    if (!Number.isFinite(raw) || raw <= 0) return 0;
    const next = Math.round(raw);
    return Number.isFinite(next) ? Math.max(min, Math.min(max, next)) : 0;
  };
  const applyEffectTextHeight = (key, el) => {
    const h = validEffectTextHeight(key, effectTextHeights[key]);
    if (!h) return;
    el.style.height = `${h}px`;
    el.dataset.k2fxAppliedHeight = `${h}px`;
  };
  const isEffectTextResizePoint = (el, ev) => {
    const r = el.getBoundingClientRect();
    return ev.clientX >= r.right - 28 && ev.clientX <= r.right + 8 &&
      ev.clientY >= r.bottom - 28 && ev.clientY <= r.bottom + 8;
  };
  function writeEffectState(markDirty = false) {
    node.widgets_values = EFFECT_WIDGETS.map((n) => widgets[n]?.value ?? "");
    node.properties = node.properties || {};
    node.properties.k2cfEffectState = {
      version: "v16",
      widgets_values: node.widgets_values.slice(),
      text_heights: Object.assign({}, effectTextHeights),
      saved_at: Date.now(),
    };
    k2cfWriteLocalState(node, "effect", node.properties.k2cfEffectState);
    if (markDirty) {
      try { app.graph?.setDirtyCanvas?.(true, true); } catch (_) {}
    }
  }
  const saveEffectTextHeight = (key, el, markDirty = true) => {
    const rect = el.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const h = validEffectTextHeight(key, rect.height || el.offsetHeight || parseFloat(el.style.height || "0"));
    if (!h) return;
    if (Math.abs(Number(effectTextHeights[key] || 0) - h) <= 2) {
      if (markDirty) writeEffectState(true);
      return;
    }
    effectTextHeights[key] = h;
    el.dataset.k2fxAppliedHeight = `${h}px`;
    writeEffectState(markDirty);
  };
  const installEffectTextResize = (key, el, gripEl = null) => {
    applyEffectTextHeight(key, el);
    let drag = null;
    const stopDrag = () => {
      if (drag) saveEffectTextHeight(key, el, true);
      drag = null;
      document.removeEventListener("pointermove", moveDrag, true);
      document.removeEventListener("pointerup", stopDrag, true);
      document.removeEventListener("pointercancel", stopDrag, true);
    };
    const moveDrag = (ev) => {
      if (!drag) return;
      ev.preventDefault();
      ev.stopPropagation();
      const [min, max] = effectTextHeightBounds[key] || [42, 360];
      const next = Math.max(min, Math.min(max, drag.height + ev.clientY - drag.y));
      el.style.height = `${Math.round(next)}px`;
      saveEffectTextHeight(key, el, false);
    };
    const downTarget = gripEl || el;
    downTarget.addEventListener("pointerdown", (ev) => {
      if (!gripEl && !isEffectTextResizePoint(el, ev)) return;
      ev.preventDefault();
      ev.stopPropagation();
      drag = { y: ev.clientY, height: el.getBoundingClientRect().height };
      try { downTarget.setPointerCapture?.(ev.pointerId); } catch (_) {}
      document.addEventListener("pointermove", moveDrag, true);
      document.addEventListener("pointerup", stopDrag, true);
      document.addEventListener("pointercancel", stopDrag, true);
    }, true);
  };
  const makeEffectTextareaBox = (key, el) => {
    const box = document.createElement("div");
    box.className = `k2fx-textarea-box k2fx-${key}-box`;
    const grip = document.createElement("div");
    grip.className = "k2fx-resize-grip";
    grip.title = "Drag to resize this prompt box.";
    box.append(el, grip);
    installEffectTextResize(key, el, grip);
    return box;
  };
  const previewBox = makeEffectTextareaBox("preview", preview);
  const customBox = makeEffectTextareaBox("custom", custom);

  const DEFAULT_EFFECT_PRESET = "Realistic Photo";
  const normalizeEffectPreset = (name) => {
    const raw = name || DEFAULT_EFFECT_PRESET;
    const v = EFFECT_PRESET_ALIASES[raw] || raw;
    return EFFECT_PRESETS.some((p)=>p.name===v) ? v : DEFAULT_EFFECT_PRESET;
  };
  let currentPreset = normalizeEffectPreset(widgets.preset?.value);
  const selectedPreset = () => {
    currentPreset = normalizeEffectPreset(currentPreset || widgets.preset?.value);
    return currentPreset;
  };
  const styleBoostText = () => EFFECT_STYLE_BOOST_TEXT[activeStyleBoost] || "";
  const effectWithStyleBoost = (text) => {
    const base = String(text || "").trim();
    const boost = styleBoostText();
    if (!boost) return base;
    if (base.toLowerCase().includes(boost.toLowerCase())) return base;
    return base ? `${base}, ${boost}` : boost;
  };
  function renderStyleBoostButtons() {
    boostPhoto.checked = activeStyleBoost === "Photo";
    boostAnime.checked = activeStyleBoost === "Anime";
    boostPhotoControl.wrapLabel.classList.toggle("active", activeStyleBoost === "Photo");
    boostAnimeControl.wrapLabel.classList.toggle("active", activeStyleBoost === "Anime");
    boostPhoto.setAttribute("aria-pressed", activeStyleBoost === "Photo" ? "true" : "false");
    boostAnime.setAttribute("aria-pressed", activeStyleBoost === "Anime" ? "true" : "false");
  }
  function setStyleBoost(value) {
    const next = normalizeStyleBoost(value);
    activeStyleBoost = activeStyleBoost === next ? "" : next;
    renderStyleBoostButtons();
    sync();
  }
  hydrateEffectUiFromWidgets = () => {
    currentPreset = normalizeEffectPreset(widgets.preset?.value);
    activeCategory = EFFECT_PRESET_ALIASES[widgets.category?.value] || widgets.category?.value || "Photo";
    if (!EFFECT_CATEGORIES.includes(activeCategory)) activeCategory = "Photo";
    activeStyleBoost = normalizeStyleBoost(widgets.style_boost?.value);
    custom.value = widgets.custom_preset?.value || "";
    enabled.checked = widgets.enable_effect?.value !== false;
    render();
    preview.value = currentEffectText() || "Effect disabled or custom text is blank.";
  };
  function setWidgetValue(name, value) {
    if (!widgets[name]) return;
    widgets[name].value = value;
    widgets[name].serialize = true;
    widgets[name].options = widgets[name].options || {};
    widgets[name].options.serialize = true;
  }
  const isCustomMode = () => ["Custom", "Custom Preset"].includes(widgets.mode?.value || "Preset");
  function currentEffectText() {
    if (!enabled.checked) return "";
    if (isCustomMode()) return effectWithStyleBoost(custom.value || "");
    const preset = EFFECT_PRESETS.find((p) => p.name === selectedPreset());
    return effectWithStyleBoost(preset?.text || "");
  }
  function sync() {
    setWidgetValue("enable_effect", Boolean(enabled.checked));
    setWidgetValue("category", activeCategory || "Photo");
    if (!isCustomMode()) setWidgetValue("preset", selectedPreset());
    setWidgetValue("custom_preset", custom.value || "");
    setWidgetValue("style_boost", activeStyleBoost || "");
    writeEffectState(false);
    custom.classList.toggle("show", isCustomMode());
    footer?.classList.toggle("show", isCustomMode());
    preview.value = currentEffectText() || "Effect disabled or custom text is blank.";
    try { app.graph?.setDirtyCanvas?.(true, true); } catch (_) {}
  }
  function refreshCustomPresetSelect(selected = "") {
    customPresetSelect.innerHTML = "";
    customPresetSelect.appendChild(option("", "(None)"));
    for (const p of customEffectPresets) customPresetSelect.appendChild(option(p.name, p.name));
    customPresetSelect.value = customEffectPresets.some((p) => p.name === selected) ? selected : "";
  }
  async function loadCustomEffectPresets(selected = "") {
    try {
      const res = await fetch(EFFECT_CUSTOM_PRESET_API, {cache: "no-store"});
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      customEffectPresets = Array.isArray(data.presets) ? data.presets : [];
      refreshCustomPresetSelect(selected || customPresetSelect.value);
    } catch (err) {
      customEffectPresets = [];
      refreshCustomPresetSelect("");
      console.warn("[Krea2 BBOX] Failed to load custom effect presets", err);
    }
  }
  async function saveCustomEffectPreset() {
    const current = customPresetSelect.value || "";
    const name = String(prompt("Custom effect preset name", current || "My Effect") || "").trim();
    if (!name) return;
    const text = String(custom.value || "").trim();
    if (!text) {
      alert("Custom effect prompt is blank.");
      return;
    }
    const selectNames = Array.from(customPresetSelect.options).map((opt) => String(opt.value || "").trim()).filter(Boolean);
    const exists = selectNames.includes(name) || customEffectPresets.some((p) => String(p?.name || "").trim() === name);
    if (exists && !confirm(`Preset "${name}" already exists.\nOverwrite it?`)) return;
    let data = null;
    try {
      const res = await fetch(EFFECT_CUSTOM_PRESET_API, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name, text}),
      });
      data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || `HTTP ${res.status}`);
    } catch (err) {
      alert(`Failed to save custom preset.\n${err?.message || err}`);
      return;
    }
    customEffectPresets = Array.isArray(data.presets) ? data.presets : [];
    refreshCustomPresetSelect(name);
    await loadCustomEffectPresets(name);
  }
  async function deleteCustomEffectPreset() {
    const name = customPresetSelect.value || "";
    if (!name) return;
    const res = await fetch(`${EFFECT_CUSTOM_PRESET_API}/delete`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({name}),
    });
    if (!res.ok) {
      alert("Failed to delete custom preset.");
      return;
    }
    const data = await res.json();
    customEffectPresets = Array.isArray(data.presets) ? data.presets : [];
    refreshCustomPresetSelect("");
  }
  function selectPreset(name) {
    currentPreset = normalizeEffectPreset(name);
    setWidgetValue("preset", currentPreset);
    setWidgetValue("mode", "Preset");
    render();
    sync();
  }
  function selectCustom() {
    setWidgetValue("preset", selectedPreset());
    setWidgetValue("mode", "Custom");
    activeCategory = "Custom";
    render();
    sync();
  }
  function copySelectedPresetToCustom() {
    const preset = EFFECT_PRESETS.find((p) => p.name === selectedPreset());
    if (!preset?.text) return;
    custom.value = preset.text;
    selectCustom();
  }
  function renderTabs() {
    tabs.innerHTML = "";
    for (const cat of EFFECT_CATEGORIES) {
      const b = document.createElement("button");
      b.className = "k2fx-tab" + (activeCategory === cat ? " active" : "");
      b.textContent = cat;
      b.addEventListener("click", () => { activeCategory = cat; if (cat === "Custom") setWidgetValue("mode", "Custom"); else if (isCustomMode()) setWidgetValue("mode", "Preset"); render(); sync(); });
      tabs.appendChild(b);
    }
  }
  function renderCards() {
    const q = String(search.value || "").trim().toLowerCase();
    grid.innerHTML = "";
    const list = activeCategory === "Custom" ? [] : EFFECT_PRESETS.filter((p) => {
      const catOk = activeCategory === "All" || p.category === activeCategory || (Array.isArray(p.categories) && p.categories.includes(activeCategory));
      const qOk = !q || (p.name + " " + p.category + " " + p.text).toLowerCase().includes(q);
      return catOk && qOk;
    });
    for (const p of list) {
      const card = document.createElement("div");
      card.className = "k2fx-card" + (!isCustomMode() && selectedPreset() === p.name ? " active" : "");
      card.dataset.tone = p.tone || "";
      const thumb = document.createElement("div");
      thumb.className = "k2fx-thumb";
      thumb.textContent = p.chip;
      const imgUrls = k2fxThumbnailUrls(p);
      let imgUrlIndex = 0;
      thumb.style.backgroundImage = `url("${imgUrls[imgUrlIndex]}")`;
      thumb.classList.add("has-img");
      // If an image is missing, fall back to the original text/gradient card.
      const probe = new Image();
      probe.onerror = () => {
        imgUrlIndex += 1;
        if (imgUrlIndex < imgUrls.length) {
          thumb.style.backgroundImage = `url("${imgUrls[imgUrlIndex]}")`;
          probe.src = imgUrls[imgUrlIndex];
          return;
        }
        thumb.style.backgroundImage = "";
        thumb.classList.remove("has-img");
      };
      probe.src = imgUrls[imgUrlIndex];
      const name = document.createElement("div");
      name.className = "k2fx-name";
      name.textContent = p.name;
      const desc = document.createElement("div");
      desc.className = "k2fx-desc";
      desc.textContent = p.text;
      card.append(thumb, name, desc);
      card.addEventListener("click", () => selectPreset(p.name));
      grid.appendChild(card);
    }
    if (activeCategory === "Custom") {
      const notice = document.createElement("div");
      notice.className = "k2fx-custom-notice";
      notice.textContent = "Custom tab is blank. Type your own effect text in Custom Preset.";
      grid.appendChild(notice);
    }
  }
  function render() {
    renderTabs();
    renderCards();
    renderStyleBoostButtons();
    custom.classList.toggle("show", isCustomMode());
    footer?.classList.toggle("show", isCustomMode());
  }

  search.addEventListener("input", () => { renderCards(); });
  enabled.addEventListener("change", sync);
  boostPhoto.addEventListener("change", () => setStyleBoost("Photo"));
  boostAnime.addEventListener("change", () => setStyleBoost("Anime"));
  sizeSlider.addEventListener("input", () => applyThumbSize(sizeSlider.value));
  custom.addEventListener("input", sync);
  custom.addEventListener("change", sync);
  customCopy.addEventListener("click", copySelectedPresetToCustom);
  customLoad.addEventListener("click", () => {
    const found = customEffectPresets.find((p) => p.name === customPresetSelect.value);
    if (!found) return;
    custom.value = found.text || "";
    selectCustom();
  });
  customSave.addEventListener("click", () => { saveCustomEffectPreset(); });
  customDelete.addEventListener("click", () => { deleteCustomEffectPreset(); });

  wrap.append(ioRow, previewBox, top, sizeBar, styleBoostBar, tabs, grid);
  footer = document.createElement("div");
  footer.className = "k2fx-footer";
  footer.append(customBox, customPresetBar);
  wrap.appendChild(footer);

  node.addDOMWidget("krea2_prompt_effect_ui", "Krea2PromptEffectUI", wrap, {
    serialize:false,
    hideOnZoom:false,
    getMinHeight:()=>260,
  });

  if (!widgets.preset?.value || widgets.preset.value === "None") setWidgetValue("preset", currentPreset);
  if (!widgets.mode?.value) setWidgetValue("mode", "Preset");
  render();
  preview.value = currentEffectText() || "Effect disabled or custom text is blank.";
  loadCustomEffectPresets();
  k2cfPersistWidgetSnapshot(node, "effect", EFFECT_WIDGETS, "v15");
  writeEffectState(false);
  installNodePersistenceHooks(node, sync, EFFECT_WIDGETS, "k2cfEffect");
}

function setupCanvasNode(node) {
  node.resizable = true;
  node.serialize_widgets = true;
  const widgets = {};
  for (const name of CANVAS_WIDGETS) widgets[name] = widget(node, name);
  Object.values(widgets).forEach(hideWidget);
  const configuredWidgetValues = Array.isArray(node.__k2cfConfiguredWidgetValues)
    ? node.__k2cfConfiguredWidgetValues.slice()
    : null;
  const configuredStateValues = Array.isArray(node.__k2cfConfiguredCanvasState?.widgets_values)
    ? node.__k2cfConfiguredCanvasState.widgets_values.slice()
    : null;
  const configuredValues = k2cfHasMeaningfulState(configuredWidgetValues)
    ? configuredWidgetValues
    : configuredStateValues;
  if (!k2cfHasMeaningfulState(configuredValues)) {
    applyConfiguredValuesToWidgets(node, CANVAS_WIDGETS, [
      DEFAULT_WIDTH,
      DEFAULT_HEIGHT,
      DEFAULT_PRESET,
      '{"boxes":[],"activeSlot":"red","hideBoxes":false,"drawMode":false}',
      '{"iso":"","shutter":"","aperture":"","focal_length":""}',
      'Thirds',
      'Auto',
      '{"sets":[],"selected":""}',
      '{"sets":[],"selected":""}'
    ]);
  }
  let isHydrating = false;
  node.__k2cfApplyConfiguredValues = (values) => applyConfiguredValuesToWidgets(node, CANVAS_WIDGETS, values);
  applyConfiguredValuesToWidgets(node, CANVAS_WIDGETS, configuredValues);
  const savedCanvasState = k2cfBestSavedState(node, "canvas");
  if (savedCanvasState) applyConfiguredValuesToWidgets(node, CANVAS_WIDGETS, savedCanvasState.widgets_values);

  const state = { activeSlot: "red", boxes: [], selectedId: null, drawing: null, moving: null, resizing: null, hideBoxes: false, drawMode: false };
  const controls = {};
  try { controls.cameraSetData = JSON.parse(widgets.camera_set_data?.value || localStorage.getItem(CAMERA_SET_KEY) || '{"sets":[],"selected":""}'); } catch (_) { controls.cameraSetData = {sets:[], selected:""}; }
  if (!Array.isArray(controls.cameraSetData.sets)) controls.cameraSetData.sets = [];
  try { controls.canvasPresetData = JSON.parse(widgets.canvas_preset_data?.value || localStorage.getItem(CANVAS_PRESET_KEY) || '{"sets":[],"selected":""}'); } catch (_) { controls.canvasPresetData = {sets:[], selected:""}; }
  if (!Array.isArray(controls.canvasPresetData.sets)) controls.canvasPresetData.sets = [];
  function getCameraSets() {
    return controls.cameraSetData.sets || [];
  }
  function saveCameraSets() {
    localStorage.setItem(CAMERA_SET_KEY, JSON.stringify(controls.cameraSetData));
  }
  function getCanvasPresets() {
    return controls.canvasPresetData.sets || [];
  }
  function saveCanvasPresets() {
    localStorage.setItem(CANVAS_PRESET_KEY, JSON.stringify(controls.canvasPresetData));
  }

  function row(children){ const r=document.createElement("div"); r.className="k2cf-rowline"; for(const c of children) r.appendChild(c); return r; }
  function help(html){ const d=document.createElement("div"); d.className="k2cf-help"; d.innerHTML=html; return d; }
  function setWidget(name, value) {
    const w = widgets[name];
    if (!w) return;
    w.value = value;
    w.serialize = true;
    w.options = w.options || {};
    w.options.serialize = true;
  }
  function sync(allowDefaultOverwrite = true) {
    if (isHydrating) return;
    const previous = k2cfBestSavedState(node, "canvas");
    node.__k2cfSkipLocalCanvasState = false;
    node.__k2cfAllowDefaultOverwrite = allowDefaultOverwrite;
    if (controls.width) setWidget("width", Math.max(1, Number(controls.width.value) || 1));
    if (controls.height) setWidget("height", Math.max(1, Number(controls.height.value) || 1));
    if (controls.preset) setWidget("preset", controls.preset.value || "Custom");
    if (controls.grid) setWidget("grid_mode", controls.grid.value || "Thirds");
    if (controls.ui_language) setWidget("ui_language", controls.ui_language.value || "Auto");
    try {
      localStorage.setItem(CANVAS_GRID_KEY, controls.grid?.value || "Thirds");
      localStorage.setItem(CANVAS_LANGUAGE_KEY, controls.ui_language?.value || "Auto");
    } catch (_) {}
    if (controls.cameraSetData) setWidget("camera_set_data", JSON.stringify(controls.cameraSetData));
    if (controls.canvasPresetData) setWidget("canvas_preset_data", JSON.stringify(controls.canvasPresetData));
    const camera = {
      iso: controls.iso?.get() || "",
      shutter: controls.shutter?.get() || "",
      aperture: controls.aperture?.get() || "",
      focal_length: controls.focal_length?.get() || "",
    };
    setWidget("camera_data", JSON.stringify(camera));
    setWidget("layout_data", JSON.stringify({
      boxes: state.boxes,
      activeSlot: state.activeSlot,
      hideBoxes: state.hideBoxes,
      drawMode: state.drawMode
    }));
    const rawValues = CANVAS_WIDGETS.map((n) => widgets[n]?.value ?? "");
    const values = allowDefaultOverwrite ? rawValues : k2cfMergeWithPrevious(CANVAS_WIDGETS, rawValues, previous?.widgets_values);
    node.widgets_values = values.slice();
    applyConfiguredValuesToWidgets(node, CANVAS_WIDGETS, node.widgets_values);
    if (!allowDefaultOverwrite) {
      try {
        const layout = JSON.parse(widgets.layout_data?.value || "{}");
        if (Array.isArray(layout.boxes) && layout.boxes.length > 0 && state.boxes.length === 0) {
          state.boxes = layout.boxes;
          if (layout.activeSlot) state.activeSlot = layout.activeSlot;
          if (typeof layout.hideBoxes === "boolean") state.hideBoxes = layout.hideBoxes;
          if (typeof layout.drawMode === "boolean") state.drawMode = layout.drawMode;
        }
      } catch (_) {}
    }
    node.properties = node.properties || {};
    node.properties.k2cfCanvasState = {
      version: "v27",
      widgets_values: node.widgets_values.slice(),
      saved_at: Date.now()
    };
    k2cfWriteLocalState(node, "canvas", node.properties.k2cfCanvasState);
    node.__k2cfConfiguredWidgetValues = null;
    try { app.graph?.setDirtyCanvas?.(true, true); } catch (_) {}
  }

  try {
    const data = JSON.parse(widgets.layout_data?.value || '{"boxes":[]}');
    state.boxes = Array.isArray(data.boxes) ? data.boxes : [];
    if (data.activeSlot) state.activeSlot = data.activeSlot;
    if (typeof data.hideBoxes === "boolean") state.hideBoxes = data.hideBoxes;
    if (typeof data.drawMode === "boolean") state.drawMode = data.drawMode;
  } catch (_) { state.boxes = []; }
  requestAnimationFrame(() => { ensureNormalizedBoxes(); remapBoxesForCurrentCanvas(); resizeCanvases(); drawOverlay(); });

  const wrap = document.createElement("div");
  wrap.className = "k2cf-wrap";
  k2cfAllowWheelZoomOnEmptySpace(wrap);
  k2cfAllowGraphPanOnEmptySpace(wrap);
  const toolbar = document.createElement("div");
  toolbar.className = "k2cf-toolbar";
  const tools = document.createElement("div");
  tools.className = "k2cf-tools";
  const showBtn = button("◉ Show Boxes", "Show or hide all D-boxes");
  const drawBtn = button("▭ Draw Box", "Draw D-box");
  drawBtn.addEventListener("click", () => { state.drawMode = true; drawBtn.classList.add("primary"); sync(); });
  const resetCanvasBtn = button("Reset Canvas", "Reset D-boxes, latent size, guide, and camera settings. Prompts are not changed.");
  function applyCanvasLabels() {
    const lang = resolveLang(controls.ui_language?.value || "Auto");
    showBtn.textContent = state.hideBoxes ? tr(lang, "hideBoxes") : tr(lang, "showBoxes");
    drawBtn.textContent = tr(lang, "drawBox");
    resetCanvasBtn.textContent = tr(lang, "resetCanvas");
    const headers = wrap.querySelectorAll("h4");
    if (headers[0]) headers[0].textContent = tr(lang, "latentSize");
    if (headers[1]) headers[1].textContent = tr(lang, "cameraSettings");
    if (gridLabelTop) gridLabelTop.textContent = "Grid";
    if (languageLabel) languageLabel.textContent = tr(lang, "uiLanguage");
  }
  for (const [key, label, color] of SLOTS) {
    const sw = document.createElement("button");
    sw.className = `k2cf-sw${key === state.activeSlot ? " active" : ""}`;
    sw.dataset.slot = key;
    sw.style.background = color;
    sw.title = label;
    sw.addEventListener("click", () => {
      state.activeSlot = key;
      tools.querySelectorAll(".k2cf-sw").forEach((x) => x.classList.toggle("active", x.dataset.slot === key));
      sync();
    });
    tools.appendChild(sw);
  }
  showBtn.addEventListener("click", () => {
    state.hideBoxes = !state.hideBoxes;
    showBtn.textContent = state.hideBoxes ? tr(resolveLang(controls.ui_language?.value || "Auto"), "hideBoxes") : tr(resolveLang(controls.ui_language?.value || "Auto"), "showBoxes");
    drawOverlay();
    sync();
  });
  resetCanvasBtn.addEventListener("click", () => {
    state.boxes = [];
    state.selectedId = null;
    setSize(DEFAULT_WIDTH, DEFAULT_HEIGHT, DEFAULT_PRESET);
    if (controls.grid) controls.grid.value = "Thirds";
    if (controls.iso) controls.iso.set("");
    if (controls.shutter) controls.shutter.set("");
    if (controls.aperture) controls.aperture.set("");
    if (controls.focal_length) controls.focal_length.set("");
    if (controls.cameraSetSelect) controls.cameraSetSelect.value = "";
    controls.cameraSetData.selected = "";
    if (controls.canvasPresetSelect) controls.canvasPresetSelect.value = "";
    controls.canvasPresetData.selected = "";
    if (controls.ui_language) controls.ui_language.value = "Auto";
    state.activeSlot = "red";
    state.hideBoxes = false;
    state.drawMode = false;
    drawBtn.classList.remove("primary");
    saveCameraSets();
    saveCanvasPresets();
    applyCanvasLabels();
    updateGuide();
    writeBoxes();
    sync();
  });
  tools.prepend(showBtn, drawBtn, resetCanvasBtn);
  const langSelect = document.createElement("select");
  langSelect.className = "k2cf-select";
  langSelect.title = "Choose Canvas UI language. Auto follows the node setting.";
  for (const v of ["Auto", "English", "Japanese 日本語"]) langSelect.appendChild(option(v, v));
  langSelect.value = widgets.ui_language?.value || "Auto";
  controls.ui_language = langSelect;
  const gridTop = document.createElement("select");
  gridTop.className = "k2cf-select";
  gridTop.title = "Choose the canvas guide overlay.";
  for (const g of ["Off", "Thirds", "Center Cross"]) gridTop.appendChild(option(g, g));
  gridTop.value = widgets.grid_mode?.value || "Thirds";
  controls.grid = gridTop;
  const gridBox = document.createElement("div");
  gridBox.className = "k2cf-rowline";
  const gridLabelTop = document.createElement("span");
  gridLabelTop.textContent = "Grid";
  gridBox.append(gridLabelTop, gridTop);

  const languageBox = document.createElement("div");
  languageBox.className = "k2cf-rowline";
  const languageLabel = document.createElement("span");
  languageLabel.textContent = tr(resolveLang(langSelect.value), "uiLanguage");
  languageBox.append(languageLabel, langSelect);
  toolbar.append(tools, gridBox, languageBox);
  gridTop.addEventListener("change", () => { updateGuide(); sync(); });
  langSelect.addEventListener("change", () => { applyCanvasLabels(); sync(); });
  wrap.appendChild(toolbar);

  const monitor = document.createElement("div");
  monitor.className = "k2cf-monitor";
  const screen = document.createElement("div");
  screen.className = "k2cf-screen";
  const bg = document.createElement("canvas");
  bg.className = "k2cf-bg";
  const guide = document.createElement("div");
  guide.className = "k2cf-guide thirds";
  const overlay = document.createElement("canvas");
  overlay.className = "k2cf-overlay";
  screen.append(bg, guide, overlay);
  monitor.append(screen);
  wrap.append(monitor);

  const panels = document.createElement("div");
  panels.className = "k2cf-panels";

  const sizePanel = document.createElement("div");
  sizePanel.className = "k2cf-panel";
  sizePanel.innerHTML = `<h4>${tr(resolveLang(controls.ui_language?.value || "Auto"), "latentSize")}</h4>`;
  const preset = document.createElement("select");
  preset.className = "k2cf-select";
  preset.title = "Choose the latent canvas size preset.";
  const width = document.createElement("input");
  width.className = "k2cf-num";
  width.type = "number";
  width.title = "Custom latent canvas width.";
  const height = document.createElement("input");
  height.className = "k2cf-num";
  height.type = "number";
  height.title = "Custom latent canvas height.";
  controls.preset = preset; controls.width = width; controls.height = height;
  function fillPresetSelect(selected) {
    preset.innerHTML = "";
    const presetGroups = [
      ["1024 x 1024", "1536 x 1536", "2048 x 2048"],
      ["1024 x 1344", "1024 x 1536", "1152 x 1536", "1536 x 2048"],
      ["1344 x 1024", "1536 x 1024", "1536 x 1152", "2048 x 1536"]
  ];
    let sepIndex = 0;
    for (const group of presetGroups) {
      if (sepIndex++ > 0) {
        const sep = option(`__sep_${sepIndex}`, "────────");
        sep.disabled = true;
        preset.appendChild(sep);
      }
      for (const p of group) preset.appendChild(option(p, p));
    }
    const sep = option("__sep_custom", "────────");
    sep.disabled = true;
    preset.appendChild(sep);
    preset.appendChild(option("Custom", "Custom"));
    for (const p of getUserPresets()) preset.appendChild(option(`User:${p.width}x${p.height}`, `User: ${p.width} x ${p.height}`, true));
    selected = selected || widgets.preset?.value || DEFAULT_PRESET;
    if (selected && !Array.from(preset.options).some((opt) => opt.value === selected)) {
      const m = String(selected).match(/^User:(\d+)x(\d+)$/);
      if (m) preset.appendChild(option(selected, `User: ${m[1]} x ${m[2]}`, true));
    }
    preset.value = selected;
    if (preset.value !== selected) preset.value = "Custom";
    updatePresetStyle();
  }
  function updatePresetStyle() {
    preset.classList.toggle("user-preset", preset.value.startsWith("User:"));
  }
  fillPresetSelect();
  width.value = String(widgets.width?.value || DEFAULT_WIDTH);
  height.value = String(widgets.height?.value || DEFAULT_HEIGHT);
  function setSize(w, h, presetValue = "Custom") {
    const oldW = Math.max(1, Number(width.value) || 1);
    const oldH = Math.max(1, Number(height.value) || 1);
    w = Math.max(1, Number(w) || 1);
    h = Math.max(1, Number(h) || 1);
    if (oldW && oldH && (oldW !== w || oldH !== h)) {
      ensureNormalizedBoxes();
    }
    width.value = String(w); height.value = String(h); preset.value = presetValue; updatePresetStyle();
    remapBoxesForCurrentCanvas();
    resizeCanvases(); writeBoxes();
  }
  preset.addEventListener("change", () => {
    const v = preset.value;
    updatePresetStyle();
    if (PRESETS[v]) setSize(PRESETS[v][0], PRESETS[v][1], v);
    else if (v.startsWith("User:")) {
      const m = v.match(/User:(\d+)x(\d+)/);
      if (m) setSize(Number(m[1]), Number(m[2]), v);
    } else sync();
  });
  function commitCustomSize() {
    setSize(width.value, height.value, "Custom");
  }
  for (const el of [width, height]) {
    el.addEventListener("input", () => {
      preset.value = "Custom";
      updatePresetStyle();
    });
    el.addEventListener("change", commitCustomSize);
    el.addEventListener("blur", commitCustomSize);
    el.addEventListener("keydown", (ev) => {
      if (ev.key === "Enter") {
        commitCustomSize();
        el.blur();
      }
    });
    el.addEventListener("pointerdown", stop);
  }
  const saveCustom = button("Save Custom", "Save current custom latent size");
  saveCustom.classList.add("primary");
  const deleteCustom = button("Delete Custom", "Delete selected user preset");
  saveCustom.addEventListener("click", () => {
    commitCustomSize();
    const w = Math.max(1, Number(width.value) || 1), h = Math.max(1, Number(height.value) || 1);
    const users = getUserPresets().filter((p) => !(Number(p.width) === w && Number(p.height) === h));
    users.push({ label: `${w} x ${h}`, width: w, height: h });
    setUserPresets(users);
    fillPresetSelect(`User:${w}x${h}`);
    sync();
  });
  deleteCustom.addEventListener("click", () => {
    if (!preset.value.startsWith("User:")) return;
    const m = preset.value.match(/User:(\d+)x(\d+)/);
    if (!m) return;
    const users = getUserPresets().filter((p) => !(Number(p.width) === Number(m[1]) && Number(p.height) === Number(m[2])));
    setUserPresets(users);
    fillPresetSelect("Custom");
    sync();
  });
  const presetLabel = document.createElement("div");
  presetLabel.textContent = tr(resolveLang(controls.ui_language?.value || "Auto"), "preset");
  const customLabel = document.createElement("div");
  customLabel.textContent = "Custom Size";
  const widthLabel = document.createElement("span");
  widthLabel.textContent = "W";
  const heightLabel = document.createElement("span");
  heightLabel.textContent = "H";
  sizePanel.append(
    presetLabel,
    row([preset]),
    customLabel,
    row([widthLabel, width, document.createTextNode("×"), heightLabel, height]),
    row([saveCustom, deleteCustom]),
    help(`User presets use <span class="user">${USER_PRESET_COLOR}</span> and are stored locally.`)
  );
  const canvasPresetLabel = document.createElement("div");
  canvasPresetLabel.textContent = tr(resolveLang(controls.ui_language?.value || "Auto"), "canvasPreset");
  const canvasPresetSelect = document.createElement("select");
  canvasPresetSelect.className = "k2cf-select";
  controls.canvasPresetSelect = canvasPresetSelect;
  function refreshCanvasPresetSelect() {
    canvasPresetSelect.innerHTML = "";
    canvasPresetSelect.appendChild(option("", "(None)"));
    for (const set of getCanvasPresets()) canvasPresetSelect.appendChild(option(set.name, set.name));
    canvasPresetSelect.value = controls.canvasPresetData.selected || "";
  }
  function snapshotCanvasPreset(name) {
    return {
      name,
      width: Math.max(1, Number(width.value) || DEFAULT_WIDTH),
      height: Math.max(1, Number(height.value) || DEFAULT_HEIGHT),
      preset: preset.value || DEFAULT_PRESET,
      boxes: JSON.parse(JSON.stringify(state.boxes || [])),
      activeSlot: state.activeSlot || "red",
      hideBoxes: !!state.hideBoxes,
      drawMode: !!state.drawMode,
      grid: controls.grid?.value || "Thirds",
      ui_language: controls.ui_language?.value || "Auto",
      camera: {
        iso: controls.iso?.get() || "",
        shutter: controls.shutter?.get() || "",
        aperture: controls.aperture?.get() || "",
        focal_length: controls.focal_length?.get() || "",
      },
      cameraSetSelected: controls.cameraSetData.selected || "",
    };
  }
  function applyCanvasPreset(set) {
    if (!set) return;
    state.boxes = Array.isArray(set.boxes) ? JSON.parse(JSON.stringify(set.boxes)) : [];
    state.activeSlot = set.activeSlot || "red";
    state.hideBoxes = !!set.hideBoxes;
    state.drawMode = set.drawMode !== false;
    drawBtn.classList.toggle("primary", state.drawMode);
    if (controls.grid) controls.grid.value = set.grid || "Thirds";
    if (controls.ui_language) controls.ui_language.value = set.ui_language || "Auto";
    if (controls.iso) controls.iso.set(set.camera?.iso || "");
    if (controls.shutter) controls.shutter.set(set.camera?.shutter || "");
    if (controls.aperture) controls.aperture.set(set.camera?.aperture || "");
    if (controls.focal_length) controls.focal_length.set(set.camera?.focal_length || "");
    controls.cameraSetData.selected = set.cameraSetSelected || "";
    if (controls.cameraSetSelect) controls.cameraSetSelect.value = controls.cameraSetData.selected;
    setSize(set.width || DEFAULT_WIDTH, set.height || DEFAULT_HEIGHT, set.preset || DEFAULT_PRESET);
    updateGuide();
    applyCanvasLabels();
    writeBoxes();
    sync();
  }
  canvasPresetSelect.addEventListener("change", () => {
    controls.canvasPresetData.selected = canvasPresetSelect.value || "";
    const found = getCanvasPresets().find((s) => s.name === canvasPresetSelect.value);
    if (found) applyCanvasPreset(found);
    saveCanvasPresets();
    sync();
  });
  const saveCanvasPreset = button("Save Preset", "Save all Canvas inputs as a preset");
  const loadCanvasPreset = button("Load", "Load selected Canvas preset");
  const deleteCanvasPreset = button(tr(resolveLang(controls.ui_language?.value || "Auto"), "deletePreset"), "Delete selected Canvas preset");
  saveCanvasPreset.addEventListener("click", () => {
    const name = prompt("Canvas preset name", canvasPresetSelect.value || "My Canvas Preset");
    if (!name) return;
    controls.canvasPresetData.sets = getCanvasPresets().filter((s) => s.name !== name);
    controls.canvasPresetData.sets.push(snapshotCanvasPreset(name));
    controls.canvasPresetData.selected = name;
    saveCanvasPresets();
    refreshCanvasPresetSelect();
    sync();
  });
  loadCanvasPreset.addEventListener("click", () => {
    const found = getCanvasPresets().find((s) => s.name === canvasPresetSelect.value);
    if (found) applyCanvasPreset(found);
  });
  deleteCanvasPreset.addEventListener("click", () => {
    const name = canvasPresetSelect.value;
    if (!name) return;
    controls.canvasPresetData.sets = getCanvasPresets().filter((s) => s.name !== name);
    controls.canvasPresetData.selected = "";
    saveCanvasPresets();
    refreshCanvasPresetSelect();
    sync();
  });
  refreshCanvasPresetSelect();
  canvasPresetLabel.className = "k2cf-section-label";


  const cameraPanel = document.createElement("div");
  cameraPanel.className = "k2cf-panel k2cf-camera-panel";
  const cameraGroup = document.createElement("div");
  cameraGroup.className = "k2cf-compact-group";
  const cameraLabel = document.createElement("div");
  cameraLabel.className = "k2cf-section-label";
  cameraLabel.textContent = tr(resolveLang(controls.ui_language?.value || "Auto"), "cameraSettings");
  const cameraNote = document.createElement("div");
  cameraNote.className = "k2cf-note";
  cameraNote.textContent = tr(resolveLang(controls.ui_language?.value || "Auto"), "cameraCustomNote");
  let cameraData = {};
  try { cameraData = JSON.parse(widgets.camera_data?.value || "{}"); } catch (_) {}
  const cameraSetBar = document.createElement("div");
  cameraSetBar.className = "k2cf-camera-setbar";
  const cameraSetSelect = document.createElement("select");
  cameraSetSelect.className = "k2cf-select";
  controls.cameraSetSelect = cameraSetSelect;
  function refreshCameraSetSelect() {
    cameraSetSelect.innerHTML = "";
    cameraSetSelect.appendChild(option("", "(None)"));
    for (const set of getCameraSets()) cameraSetSelect.appendChild(option(set.name, set.name));
    cameraSetSelect.value = controls.cameraSetData.selected || "";
  }
  const saveSetBtn = button("Save Set", "Save current camera settings as a named set");
  const deleteSetBtn = button("Delete Set", "Delete selected camera set");
  cameraSetBar.append(cameraSetSelect, saveSetBtn, deleteSetBtn);
  const canvasPresetBar = document.createElement("div");
  canvasPresetBar.className = "k2cf-canvas-presetbar";
  canvasPresetBar.append(canvasPresetSelect, saveCanvasPreset, loadCanvasPreset, deleteCanvasPreset);

  const cameraRows = document.createElement("div");
  cameraRows.className = "k2cf-camera-grid";
  for (const [label, name] of [["ISO", "iso"], ["Shutter", "shutter"], ["Aperture", "aperture"], ["Focal", "focal_length"]]) {
    const combo = selectWithCustom(CAMERA_OPTIONS[name], cameraData[name] || "");
    combo.select.addEventListener("change", () => { controls.cameraSetData.selected = ""; refreshCameraSetSelect(); sync(); });
    combo.input.addEventListener("input", () => { controls.cameraSetData.selected = ""; refreshCameraSetSelect(); sync(); });
    controls[name] = combo;
    const cell = document.createElement("div");
    cell.className = "k2cf-camera-cell";
    cell.innerHTML = `<div>${label}</div>`;
    cell.appendChild(combo.wrap);
    cameraRows.appendChild(cell);
  }
  function currentCameraValues() {
    return {
      iso: controls.iso?.get() || "",
      shutter: controls.shutter?.get() || "",
      aperture: controls.aperture?.get() || "",
      focal_length: controls.focal_length?.get() || "",
    };
  }
  cameraSetSelect.addEventListener("change", () => {
    const found = getCameraSets().find((s) => s.name === cameraSetSelect.value);
    controls.cameraSetData.selected = cameraSetSelect.value || "";
    if (found) {
      controls.iso.set(found.iso || "");
      controls.shutter.set(found.shutter || "");
      controls.aperture.set(found.aperture || "");
      controls.focal_length.set(found.focal_length || "");
    }
    saveCameraSets();
    sync();
  });
  saveSetBtn.addEventListener("click", () => {
    const name = prompt("Camera set name", cameraSetSelect.value || "My Camera Set");
    if (!name) return;
    const values = currentCameraValues();
    controls.cameraSetData.sets = getCameraSets().filter((s) => s.name !== name);
    controls.cameraSetData.sets.push({ name, ...values });
    controls.cameraSetData.selected = name;
    saveCameraSets();
    refreshCameraSetSelect();
    sync();
  });
  deleteSetBtn.addEventListener("click", () => {
    const name = cameraSetSelect.value;
    if (!name) return;
    controls.cameraSetData.sets = getCameraSets().filter((s) => s.name !== name);
    controls.cameraSetData.selected = "";
    saveCameraSets();
    refreshCameraSetSelect();
    sync();
  });
  refreshCameraSetSelect();
  const canvasPresetGroup = document.createElement("div");
  canvasPresetGroup.className = "k2cf-compact-group";
  const canvasPresetNote = document.createElement("div");
  canvasPresetNote.className = "k2cf-note";
  canvasPresetNote.textContent = tr(resolveLang(controls.ui_language?.value || "Auto"), "canvasPresetNote");
  canvasPresetGroup.append(canvasPresetLabel, canvasPresetBar, canvasPresetNote);
  cameraGroup.append(cameraLabel, cameraRows, cameraNote);
  cameraPanel.append(cameraGroup, canvasPresetGroup);
  panels.append(sizePanel, cameraPanel);
  wrap.append(panels);

  const bgCtx = bg.getContext("2d"), overlayCtx = overlay.getContext("2d");
  function currentSize() { return [Math.max(1, Number(width.value) || DEFAULT_WIDTH), Math.max(1, Number(height.value) || DEFAULT_HEIGHT)]; }
  function makeBg() {
    const [w, h] = currentSize();
    bgCtx.fillStyle = "#242828"; bgCtx.fillRect(0, 0, w, h);
    const grd = bgCtx.createLinearGradient(0, 0, w, h);
    grd.addColorStop(0, "rgba(255,255,255,.08)"); grd.addColorStop(1, "rgba(0,0,0,.22)");
    bgCtx.fillStyle = grd; bgCtx.fillRect(0, 0, w, h);
  }
  function resizeCanvases() {
    const [w, h] = currentSize();
    bg.width = overlay.width = w; bg.height = overlay.height = h; makeBg(); fit(); drawOverlay();
  }
  function fit() {
    const [w, h] = currentSize();
    const maxW = Math.max(1, monitor.clientWidth - 30);
    const maxH = Math.max(1, monitor.clientHeight - 30);
    const scale = Math.min(maxW / w, maxH / h, 1);
    screen.style.width = `${Math.round(w * scale)}px`;
    screen.style.height = `${Math.round(h * scale)}px`;
    for (const canvas of [bg, overlay]) { canvas.style.width = screen.style.width; canvas.style.height = screen.style.height; }
  }
  function updateGuide() {
    guide.className = "k2cf-guide";
    const v = controls.grid?.value || "Thirds";
    if (v === "Thirds") guide.classList.add("thirds");
    if (v === "Center Cross") guide.classList.add("cross");
  }
  function colorFor(slot) { return SLOTS.find((s) => s[0] === slot)?.[2] || "#fff"; }
  function normBox(b) { return [Math.min(b.x1,b.x2), Math.min(b.y1,b.y2), Math.max(b.x1,b.x2), Math.max(b.y1,b.y2)]; }
  function drawOverlay() {
    overlayCtx.clearRect(0, 0, overlay.width, overlay.height);
    if (state.hideBoxes) return;
    for (const b of state.boxes) drawBox(b, b.id === state.selectedId);
    if (state.drawing) drawBox(state.drawing, true);
  }
  function drawBox(b, selected=false) {
    const [x1,y1,x2,y2] = normBox(b), color = colorFor(b.slot);
    overlayCtx.save();
    overlayCtx.globalAlpha = selected ? 0.23 : 0.14; overlayCtx.fillStyle = color; overlayCtx.fillRect(x1,y1,x2-x1,y2-y1);
    overlayCtx.globalAlpha = 1; overlayCtx.lineWidth = selected ? 4 : 3; overlayCtx.strokeStyle = selected ? "#fff" : color; overlayCtx.strokeRect(x1,y1,x2-x1,y2-y1);
    overlayCtx.fillStyle = color; overlayCtx.fillRect(x1, Math.max(0,y1-28), 76, 28);
    overlayCtx.fillStyle = "#fff"; overlayCtx.font = "bold 18px sans-serif"; overlayCtx.fillText(String(b.slot||"").toUpperCase(), x1+8, Math.max(18,y1-8));
    overlayCtx.fillStyle = color; overlayCtx.beginPath(); overlayCtx.arc(x2, y1, 18, 0, Math.PI*2); overlayCtx.fill();
    overlayCtx.fillStyle = "#fff"; overlayCtx.font = "bold 24px sans-serif"; overlayCtx.fillText("×", x2-7, y1+8);
    overlayCtx.restore();
  }
  function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }
  function point(ev) {
    const r = overlay.getBoundingClientRect();
    const f = frameBounds();
    return { x: clamp((ev.clientX-r.left)*overlay.width/Math.max(r.width,1), f.minX, f.maxX),
             y: clamp((ev.clientY-r.top)*overlay.height/Math.max(r.height,1), f.minY, f.maxY) };
  }
  function frameBounds() {
    const [w, h] = currentSize();
    const m = Math.max(28, Math.round(Math.min(w, h) * 0.018));
    return { minX: m, minY: m, maxX: Math.max(m, w - m), maxY: Math.max(m, h - m) };
  }
  function clampBox(b) {
    const f = frameBounds();
    b.x1 = clamp(b.x1, f.minX, f.maxX); b.x2 = clamp(b.x2, f.minX, f.maxX);
    b.y1 = clamp(b.y1, f.minY, f.maxY); b.y2 = clamp(b.y2, f.minY, f.maxY);
  }
  function addNormalizedBoxData(b) {
    const [w, h] = currentSize();
    const [x1, y1, x2, y2] = normBox(b);
    b.nx1 = w ? x1 / w : 0;
    b.ny1 = h ? y1 / h : 0;
    b.nx2 = w ? x2 / w : 0;
    b.ny2 = h ? y2 / h : 0;
  }
  function restoreBoxFromNormalized(b) {
    const [w, h] = currentSize();
    if ([b.nx1, b.ny1, b.nx2, b.ny2].every((v) => Number.isFinite(Number(v)))) {
      b.x1 = Number(b.nx1) * w;
      b.y1 = Number(b.ny1) * h;
      b.x2 = Number(b.nx2) * w;
      b.y2 = Number(b.ny2) * h;
      clampBox(b);
    }
  }
  function ensureNormalizedBoxes() {
    for (const b of state.boxes) {
      if (![b.nx1, b.ny1, b.nx2, b.ny2].every((v) => Number.isFinite(Number(v)))) {
        addNormalizedBoxData(b);
      }
    }
  }
  function remapBoxesForCurrentCanvas() {
    ensureNormalizedBoxes();
    for (const b of state.boxes) restoreBoxFromNormalized(b);
  }
  function moveWithin(b, d) {
    const f = frameBounds(), bw=d.x2-d.x1, bh=d.y2-d.y1;
    const maxX = Math.max(f.minX, f.maxX - bw), maxY = Math.max(f.minY, f.maxY - bh);
    const x1 = clamp(d.x1, f.minX, maxX), y1 = clamp(d.y1, f.minY, maxY);
    b.x1=x1; b.y1=y1; b.x2=x1+bw; b.y2=y1+bh; clampBox(b);
  }
  function positionHint(b) {
    const [w,h] = currentSize(), [x1,y1,x2,y2] = normBox(b);
    const cx = ((x1+x2)/2)/w, cy = ((y1+y2)/2)/h;
    const x = cx < .34 ? "left" : cx > .66 ? "right" : "center";
    const y = cy < .34 ? "upper" : cy > .66 ? "lower" : "middle";
    return `${y}-${x} area, centered around ${Math.round(cx*100)}% from the left and ${Math.round(cy*100)}% from the top`;
  }
  function writeBoxes() {
    state.boxes.forEach((b,i)=>{ const [x1,y1,x2,y2]=normBox(b); b.x1=x1;b.y1=y1;b.x2=x2;b.y2=y2;addNormalizedBoxData(b);b.bbox=[Math.round(x1),Math.round(y1),Math.round(x2),Math.round(y2)];b.position_hint=positionHint(b);b.z=i; });
    sync(); drawOverlay();
  }
  function hitTest(p) {
    for (let i=state.boxes.length-1;i>=0;i--) {
      const b=state.boxes[i], [x1,y1,x2,y2]=normBox(b);
      if (Math.abs(p.x-x2)<=24 && Math.abs(p.y-y1)<=24) return { box:b, handle:"delete" };
      const near=14, handles={nw:[x1,y1],ne:[x2,y1],sw:[x1,y2],se:[x2,y2]};
      for (const [handle,[hx,hy]] of Object.entries(handles)) if (Math.abs(p.x-hx)<=near && Math.abs(p.y-hy)<=near) return {box:b,handle};
      if (p.x>=x1&&p.x<=x2&&p.y>=y1&&p.y<=y2) return {box:b,handle:"move"};
    }
    return null;
  }
  overlay.addEventListener("pointerdown", (ev)=>{
    if(ev.button!==0)return; ev.preventDefault(); ev.stopPropagation(); overlay.setPointerCapture(ev.pointerId);
    const p=point(ev), hit=hitTest(p);
    if(!state.drawMode && hit){
      if(hit.handle==="delete"){ state.boxes=state.boxes.filter((b)=>b.id!==hit.box.id); state.selectedId=null; writeBoxes(); return; }
      state.selectedId=hit.box.id;
      if(hit.handle==="move") state.moving={id:hit.box.id,x:p.x,y:p.y,box:{...hit.box}};
      else state.resizing={id:hit.box.id,handle:hit.handle};
      drawOverlay(); return;
    }
    state.drawing={id:`box_${Date.now()}`,slot:state.activeSlot,x1:p.x,y1:p.y,x2:p.x,y2:p.y};
  });
  overlay.addEventListener("pointermove", (ev)=>{
    const p=point(ev);
    if(state.drawing){ state.drawing.x2=p.x; state.drawing.y2=p.y; clampBox(state.drawing); drawOverlay(); return; }
    if(state.moving){ const b=state.boxes.find((x)=>x.id===state.moving.id); if(!b)return; const dx=p.x-state.moving.x, dy=p.y-state.moving.y; moveWithin(b,{x1:state.moving.box.x1+dx,x2:state.moving.box.x2+dx,y1:state.moving.box.y1+dy,y2:state.moving.box.y2+dy}); drawOverlay(); return; }
    if(state.resizing){ const b=state.boxes.find((x)=>x.id===state.resizing.id); if(!b)return; if(state.resizing.handle.includes("n"))b.y1=p.y;if(state.resizing.handle.includes("s"))b.y2=p.y;if(state.resizing.handle.includes("w"))b.x1=p.x;if(state.resizing.handle.includes("e"))b.x2=p.x;clampBox(b);drawOverlay(); }
  });
  overlay.addEventListener("pointerup", ()=>{
    if(state.drawing){ const [x1,y1,x2,y2]=normBox(state.drawing); if(Math.abs(x2-x1)>8&&Math.abs(y2-y1)>8){ state.drawing.x1=x1;state.drawing.y1=y1;state.drawing.x2=x2;state.drawing.y2=y2;state.selectedId=state.drawing.id;state.boxes.push(state.drawing); state.drawMode=false; drawBtn.classList.remove("primary"); } state.drawing=null; writeBoxes(); }
    if(state.moving||state.resizing){ state.moving=null;state.resizing=null;writeBoxes(); }
  });
  document.addEventListener("keydown", (ev)=>{
    if(ev.key!=="Delete"&&ev.key!=="Backspace")return;
    const tag=ev.target?.tagName?.toLowerCase();
    if(tag==="input"||tag==="textarea"||ev.target?.isContentEditable)return;
    if(state.selectedId){ state.boxes=state.boxes.filter((b)=>b.id!==state.selectedId); state.selectedId=null; writeBoxes(); ev.preventDefault(); ev.stopPropagation(); }
  }, true);

  function hydrateCanvasFromWidgets() {
    isHydrating = true;
    const savedState = k2cfBestSavedState(node, "canvas");
    if (savedState) applyConfiguredValuesToWidgets(node, CANVAS_WIDGETS, savedState.widgets_values);
    try {
      width.value = String(widgets.width?.value || DEFAULT_WIDTH);
      height.value = String(widgets.height?.value || DEFAULT_HEIGHT);
      fillPresetSelect(widgets.preset?.value || DEFAULT_PRESET);

      let storedGrid = "Thirds";
      let storedLanguage = "Auto";
      try {
        storedGrid = localStorage.getItem(CANVAS_GRID_KEY) || "Thirds";
        storedLanguage = localStorage.getItem(CANVAS_LANGUAGE_KEY) || "Auto";
      } catch (_) {}
      if (controls.grid) controls.grid.value = widgets.grid_mode?.value || storedGrid;
      if (controls.ui_language) controls.ui_language.value = widgets.ui_language?.value || storedLanguage;

      try {
        const camera = JSON.parse(widgets.camera_data?.value || "{}");
        controls.iso?.set(camera.iso || "");
        controls.shutter?.set(camera.shutter || "");
        controls.aperture?.set(camera.aperture || "");
        controls.focal_length?.set(camera.focal_length || "");
      } catch (_) {}

      try {
        controls.cameraSetData = JSON.parse(widgets.camera_set_data?.value || localStorage.getItem(CAMERA_SET_KEY) || '{"sets":[],"selected":""}');
        if (!Array.isArray(controls.cameraSetData.sets)) controls.cameraSetData.sets = [];
        refreshCameraSetSelect?.();
      } catch (_) {}

      try {
        controls.canvasPresetData = JSON.parse(widgets.canvas_preset_data?.value || localStorage.getItem(CANVAS_PRESET_KEY) || '{"sets":[],"selected":""}');
        if (!Array.isArray(controls.canvasPresetData.sets)) controls.canvasPresetData.sets = [];
        refreshCanvasPresetSelect?.();
      } catch (_) {}

      try {
        const layout = JSON.parse(widgets.layout_data?.value || '{"boxes":[]}');
        state.boxes = Array.isArray(layout.boxes) ? layout.boxes : [];
        if (layout.activeSlot) state.activeSlot = layout.activeSlot;
        if (typeof layout.hideBoxes === "boolean") state.hideBoxes = layout.hideBoxes;
        if (typeof layout.drawMode === "boolean") state.drawMode = layout.drawMode;
      } catch (_) {
        state.boxes = [];
      }

      tools.querySelectorAll(".k2cf-sw").forEach((x) => x.classList.toggle("active", x.dataset.slot === state.activeSlot));
      drawBtn.classList.toggle("primary", state.drawMode);
      updateGuide();
      resizeCanvases();
      applyCanvasLabels();
      drawOverlay();
    } finally {
      isHydrating = false;
    }
  }

  node.__k2cfHydrateFromWidgets = hydrateCanvasFromWidgets;
  hydrateCanvasFromWidgets();
  if (k2cfHasMeaningfulState(configuredValues)) {
    applyConfiguredValuesToWidgets(node, CANVAS_WIDGETS, configuredValues);
    node.properties = node.properties || {};
    node.properties.k2cfCanvasState = {
      version: "widgets_values",
      widgets_values: configuredValues.slice(),
      saved_at: Date.now()
    };
    hydrateCanvasFromWidgets();
  }
  k2cfPersistWidgetSnapshot(node, "canvas", CANVAS_WIDGETS, "v15");
  installNodePersistenceHooks(node, sync, CANVAS_WIDGETS, "k2cfCanvas");
  node.addDOMWidget("krea2_canvas_ui", "Krea2CanvasUI", wrap, { serialize:false, hideOnZoom:false, getMinHeight:()=>260 });
  k2cfInstallNodeSizePersistence(node, "canvas", K2CF_CANVAS_DEFAULT_SIZE);
  k2cfMaybeInitializeNodeSize(node, "canvas", K2CF_CANVAS_DEFAULT_SIZE);
  k2cfScheduleNodeSizeRestore(node, "canvas", K2CF_CANVAS_DEFAULT_SIZE);
  const oldResize=node.onResize; node.onResize=function(){ const r = oldResize?.apply(this,arguments); requestAnimationFrame(fit); return r; };
}

function setupPromptNode(node) {
  node.resizable = true;
  node.serialize_widgets = true;
  const widgets = {};
  for (const name of PROMPT_WIDGETS) widgets[name] = widget(node, name);
  Object.values(widgets).forEach(hideWidget);
  requestAnimationFrame(() => hideWidgetsByName(node, PROMPT_WIDGETS));
  setTimeout(() => hideWidgetsByName(node, PROMPT_WIDGETS), 0);
  setTimeout(() => hideWidgetsByName(node, PROMPT_WIDGETS), 200);
  const configuredWidgetValues = Array.isArray(node.__k2cfConfiguredWidgetValues)
    ? k2cfSanitizePromptValues(node.__k2cfConfiguredWidgetValues.slice())
    : null;
  const configuredStateValues = Array.isArray(node.__k2cfConfiguredPromptState?.widgets_values)
    ? k2cfSanitizePromptValues(node.__k2cfConfiguredPromptState.widgets_values.slice())
    : null;
  const configuredValues = k2cfHasMeaningfulState(configuredWidgetValues)
    ? configuredWidgetValues
    : configuredStateValues;
  let isHydrating = false;
  node.__k2cfApplyConfiguredValues = (values) => applyConfiguredValuesToWidgets(node, PROMPT_WIDGETS, values);
  applyConfiguredValuesToWidgets(node, PROMPT_WIDGETS, configuredValues);
  const savedPromptState = k2cfBestSavedState(node, "prompt");
  if (savedPromptState) applyConfiguredValuesToWidgets(node, PROMPT_WIDGETS, savedPromptState.widgets_values);

  const controls = {};
  function setWidget(name, value) {
    const w = widgets[name];
    if (!w) return;
    w.value = value;
    w.serialize = true;
    w.options = w.options || {};
    w.options.serialize = true;
  }
  function sync(allowDefaultOverwrite = true) {
    if (isHydrating) return;
    try { captureCurrentTextHeights(false); } catch (_) {}
    const previous = k2cfBestSavedState(node, "prompt");
    node.__k2cfSkipLocalPromptState = false;
    node.__k2cfAllowDefaultOverwrite = allowDefaultOverwrite;
    for (const name of PROMPT_WIDGETS) if (controls[name]) setWidget(name, controls[name].value ?? "");
    const rawValues = k2cfSanitizePromptValues(PROMPT_WIDGETS.map((n) => widgets[n]?.value ?? ""));
    const values = allowDefaultOverwrite ? rawValues : k2cfSanitizePromptValues(k2cfMergeWithPrevious(PROMPT_WIDGETS, rawValues, previous?.widgets_values));
    node.widgets_values = values.slice();
    applyConfiguredValuesToWidgets(node, PROMPT_WIDGETS, node.widgets_values);
    node.properties = node.properties || {};
    node.properties.k2cfPromptState = {
      version: "v27",
      widgets_values: node.widgets_values.slice(),
      saved_at: Date.now()
    };
    k2cfWriteLocalState(node, "prompt", node.properties.k2cfPromptState);
    node.__k2cfConfiguredWidgetValues = null;
    try { app.graph?.setDirtyCanvas?.(true, true); } catch (_) {}
  }

  const defaultPromptUiState = () => ({
    version: "prompt_ui_element_v1",
    heightCaptureMode: K2CF_PROMPT_HEIGHT_CAPTURE_MODE,
    textHeights: { red_prompt: 125, blue_prompt: 125, yellow_prompt: 125, green_prompt: 125, magenta_prompt: 125 },
    textHeightManual: { red_prompt: true, blue_prompt: true, yellow_prompt: true, green_prompt: true, magenta_prompt: true },
    slotOpen: { red: true, blue: true, yellow: false, green: false, magenta: false },
    scenePreset: "",
    slotPreset: {},
    slotValues: {},
    saved_at: Date.now(),
  });
  const promptUiWidgetState = k2cfReadJsonObject(widgets.prompt_ui_data?.value);
  const workflowPromptUiCandidates = [
    node.properties?.k2cfPromptUiState,
    node.__k2cfConfiguredPromptUiState,
    promptUiWidgetState
  ].filter((state) => k2cfPromptUiHasMeaningfulState(state));
  const localPromptUiState = k2cfReadLocalState(node, "prompt_ui");
  const promptUiCandidates = workflowPromptUiCandidates
    .concat([localPromptUiState].filter((state) => k2cfPromptUiHasMeaningfulState(state)));
  const storedPromptUiState = k2cfPickLatestState(promptUiCandidates) || {};
  const promptUiState = defaultPromptUiState();
  Object.assign(promptUiState, storedPromptUiState);
  const storedHeightCaptureMode = storedPromptUiState.heightCaptureMode || "";
  const canRestoreStoredTextHeights = storedHeightCaptureMode === K2CF_PROMPT_HEIGHT_CAPTURE_MODE;
  promptUiState.textHeights = Object.assign({}, defaultPromptUiState().textHeights, canRestoreStoredTextHeights ? k2cfSanitizePromptTextHeights(storedPromptUiState.textHeights || {}) : {});
  promptUiState.textHeightManual = Object.assign({}, canRestoreStoredTextHeights ? (storedPromptUiState.textHeightManual || {}) : {});
  promptUiState.slotOpen = Object.assign({}, defaultPromptUiState().slotOpen, storedPromptUiState.slotOpen || {});
  promptUiState.slotPreset = Object.assign({}, storedPromptUiState.slotPreset || {});
  promptUiState.slotValues = Object.assign({}, storedPromptUiState.slotValues || {});
  function capturePromptSlotValues() {
    promptUiState.slotValues = promptUiState.slotValues || {};
    for (const [slot, label, color, promptName, typeName, framingName, angleName] of SLOTS) {
      promptUiState.slotValues[slot] = {
        type: controls[typeName]?.value || widgets[typeName]?.value || "obj",
        framing: controls[framingName]?.value || widgets[framingName]?.value || "Auto",
        angle: controls[angleName]?.value || widgets[angleName]?.value || "Auto",
      };
    }
  }
  function selectValueWithStored(widgetValue, storedValue, fallback) {
    const w = String(widgetValue || fallback);
    const s = String(storedValue || fallback);
    return w !== fallback ? w : s;
  }
  function savePromptUiState(markDirty = true) {
    capturePromptSlotValues();
    promptUiState.saved_at = Date.now();
    node.properties = node.properties || {};
    node.properties.k2cfPromptUiState = {
      version: "prompt_ui_element_v1",
      heightCaptureMode: K2CF_PROMPT_HEIGHT_CAPTURE_MODE,
      textHeights: Object.assign({}, promptUiState.textHeights),
      textHeightManual: Object.assign({}, promptUiState.textHeightManual || {}),
      slotOpen: Object.assign({}, promptUiState.slotOpen),
      scenePreset: promptUiState.scenePreset || "",
      slotPreset: Object.assign({}, promptUiState.slotPreset),
      slotValues: Object.assign({}, promptUiState.slotValues || {}),
      saved_at: promptUiState.saved_at,
    };
    const serializedPromptUiState = JSON.stringify(node.properties.k2cfPromptUiState);
    setWidget("prompt_ui_data", serializedPromptUiState);
    node.widgets_values = k2cfSanitizePromptValues(PROMPT_WIDGETS.map((n) => widgets[n]?.value ?? ""));
    k2cfWriteLocalState(node, "prompt_ui", node.properties.k2cfPromptUiState);
    if (markDirty) {
      try { app.graph?.setDirtyCanvas?.(true, true); } catch (_) {}
    }
  }
  function mergePromptUiState(state) {
    if (!state || typeof state !== "object") return;
    const defaults = defaultPromptUiState();
    const previousSlotOpen = promptUiState.slotOpen || {};
    const previousSlotPreset = promptUiState.slotPreset || {};
    const previousSlotValues = promptUiState.slotValues || {};
    const previousHeights = promptUiState.textHeights || {};
    const previousManual = promptUiState.textHeightManual || {};
    Object.assign(promptUiState, state);
    const canRestoreStateHeights = state.heightCaptureMode === K2CF_PROMPT_HEIGHT_CAPTURE_MODE;
    const sanitized = canRestoreStateHeights ? k2cfSanitizePromptTextHeights(state.textHeights || {}) : {};
    const manual = canRestoreStateHeights && state.textHeightManual && typeof state.textHeightManual === "object" ? state.textHeightManual : {};
    const restoredHeights = Object.assign({}, previousHeights);
    const restoredManual = Object.assign({}, previousManual);
    for (const [key, value] of Object.entries(sanitized)) {
      // v29: Restore only heights captured by bottom-right resize-grip dragging.
      // Older manual flags may have been created by ComfyUI tab/app reflow, so ignore them.
      if (manual[key]) {
        restoredHeights[key] = value;
        restoredManual[key] = true;
      }
    }
    promptUiState.textHeights = restoredHeights;
    promptUiState.textHeightManual = restoredManual;
    promptUiState.slotOpen = Object.assign({}, defaults.slotOpen, previousSlotOpen, state.slotOpen || {});
    promptUiState.slotPreset = Object.assign({}, previousSlotPreset, state.slotPreset || {});
    promptUiState.slotValues = Object.assign({}, previousSlotValues, state.slotValues || {});
  }
  function refreshPromptUiState() {
    const states = [
      node.properties?.k2cfPromptUiState,
      node.__k2cfConfiguredPromptUiState,
      k2cfReadJsonObject(widgets.prompt_ui_data?.value),
      k2cfReadLocalState(node, "prompt_ui")
  ].filter((state) => k2cfPromptUiHasMeaningfulState(state));
    if (!states.length) return;
    states.sort((a, b) => Number(a.saved_at || 0) - Number(b.saved_at || 0));
    for (const state of states) mergePromptUiState(state);
  }
  function readPresetList(key) {
    try {
      const arr = JSON.parse(localStorage.getItem(key) || "[]");
      return Array.isArray(arr) ? arr.filter((p) => p && p.name) : [];
    } catch (_) {
      return [];
    }
  }
  function writePresetList(key, values) {
    try { localStorage.setItem(key, JSON.stringify(values)); } catch (_) {}
  }
  function recordTextHeight(key, h, allowShrink = false, manual = false) {
    const next = Math.round(Number(h) || 0);
    if (!manual) return false;
    if (!k2cfPromptTextHeightInRange(key, next)) return false;
    const current = Math.round(Number(promptUiState.textHeights?.[key] || 0) || 0);
    if (current && !allowShrink && next < current - 3) return false;
    if (current && Math.abs(current - next) <= 3 && promptUiState.textHeightManual?.[key]) return false;
    promptUiState.textHeights[key] = next;
    promptUiState.textHeightManual = promptUiState.textHeightManual || {};
    promptUiState.textHeightManual[key] = true;
    return true;
  }

  function saveObservedTextHeight(key, el, allowShrink = false, manual = false, markDirty = true) {
    const observed = k2cfElementPixelHeight(el);
    const applied = Math.round(parseFloat(String(el.dataset.k2cfAppliedHeight || "0").replace("px", "")) || 0);
    // v28: text area size is persisted only after an actual manual size change.
    // A plain click/focus in the textarea should not save the current/default height.
    const changedByUser = Math.abs(Math.round(observed || 0) - Math.round(applied || 0)) > 4;
    const changed = recordTextHeight(key, observed, allowShrink, Boolean((manual || changedByUser) && changedByUser));
    if (changed) {
      const px = `${Math.round(observed)}px`;
      el.dataset.k2cfAppliedHeight = px;
      savePromptUiState(markDirty);
    }
    return changed;
  }

  function applySavedTextHeight(key, el) {
    const stored = Math.round(Number(promptUiState.textHeights?.[key] || 0) || 0);
    const manual = Boolean(promptUiState.textHeightManual?.[key]);
    const h = manual && k2cfPromptTextHeightInRange(key, stored) ? stored : k2cfDefaultTextHeightForKey(key);
    const px = `${Math.round(h)}px`;
    el.style.height = px;
    el.dataset.k2cfAppliedHeight = px;
    el.__k2cfHeightHydrated = true;
  }

  function applyAllSavedTextHeights() {
    applySavedTextHeight("scene", sceneText);
    applySavedTextHeight("background", backgroundText);
    for (const [, , , promptName] of SLOTS) {
      if (controls[promptName]) applySavedTextHeight(promptName, controls[promptName]);
    }
  }

  function scheduleApplyAllSavedTextHeights() {
    applyAllSavedTextHeights();
    try { requestAnimationFrame(() => applyAllSavedTextHeights()); } catch (_) {}
    try { requestAnimationFrame(() => requestAnimationFrame(() => applyAllSavedTextHeights())); } catch (_) {}
    setTimeout(() => applyAllSavedTextHeights(), 80);
    setTimeout(() => applyAllSavedTextHeights(), 240);
  }

  function bindTextHeight(key, el) {
    applySavedTextHeight(key, el);
    let heightTimer = null;
    let isResizeGripDrag = false;
    let lastPointerAt = 0;

    const eventPoint = (ev) => {
      const t = ev?.touches?.[0] || ev?.changedTouches?.[0] || ev;
      return {
        x: Number(t?.clientX || 0),
        y: Number(t?.clientY || 0),
      };
    };

    const isResizeGripEvent = (ev) => {
      try {
        const rect = el.getBoundingClientRect();
        const p = eventPoint(ev);
        if (!rect || !p.x || !p.y) return false;
        // Native textarea resize handle is bottom-right in ComfyUI/Chromium.
        // Only this area is allowed to create persistent manual height.
        return p.x >= rect.right - 28 && p.x <= rect.right + 8 &&
               p.y >= rect.bottom - 28 && p.y <= rect.bottom + 8;
      } catch (_) {
        return false;
      }
    };

    const canShrinkNow = () => Boolean(isResizeGripDrag) && (Date.now() - lastPointerAt < 3500);

    const saveHeight = (force = false, allowShrink = false, manual = false) => {
      if (!force && !isResizeGripDrag) return;
      saveObservedTextHeight(key, el, allowShrink || canShrinkNow(), Boolean(manual && isResizeGripDrag));
    };

    const startWatchingHeight = (ev) => {
      if (!isResizeGripEvent(ev)) return;
      isResizeGripDrag = true;
      lastPointerAt = Date.now();
      saveHeight(true, canShrinkNow(), true);
      if (heightTimer) window.clearInterval(heightTimer);
      heightTimer = window.setInterval(() => saveHeight(true, canShrinkNow(), true), 120);
    };

    const stopWatchingHeight = () => {
      if (!isResizeGripDrag) return;
      if (heightTimer) {
        window.clearInterval(heightTimer);
        heightTimer = null;
      }
      setTimeout(() => saveHeight(true, canShrinkNow(), true), 0);
      setTimeout(() => {
        saveHeight(true, canShrinkNow(), true);
        isResizeGripDrag = false;
      }, 160);
    };

    if (window.MutationObserver) {
      const mo = new MutationObserver(() => {
        if (isResizeGripDrag) saveHeight(false, false, true);
      });
      mo.observe(el, { attributes: true, attributeFilter: ["style"] });
    }

    el.addEventListener("pointerdown", startWatchingHeight);
    el.addEventListener("mousedown", startWatchingHeight);
    el.addEventListener("touchstart", startWatchingHeight, { passive: true });

    // Text edits must not persist visual height. Text value sync is handled separately.
    el.addEventListener("input", () => {});
    el.addEventListener("change", () => {});
    el.addEventListener("keyup", () => {});
    el.addEventListener("blur", () => {});

    window.addEventListener("pointerup", stopWatchingHeight);
    window.addEventListener("mouseup", stopWatchingHeight);
    window.addEventListener("touchend", stopWatchingHeight);
  }

  const wrap = document.createElement("div");
  wrap.className = "k2cf-prompt-wrap";
  k2cfAllowWheelZoomOnEmptySpace(wrap);
  k2cfAllowGraphPanOnEmptySpace(wrap);
  const promptLangBar = document.createElement("div");
  promptLangBar.className = "k2cf-prompt-top";
  const promptLangGroup = document.createElement("div");
  promptLangGroup.className = "k2cf-rowline";
  const promptLangLabel = document.createElement("span");
  const promptLangSelect = document.createElement("select");
  promptLangSelect.className = "k2cf-select k2cf-language-select";
  for (const v of ["Auto", "English", "Japanese 日本語"]) promptLangSelect.appendChild(option(v, v));
  try {
    promptLangSelect.value = localStorage.getItem(PROMPT_LANGUAGE_KEY) || "Auto";
  } catch (_) {
    promptLangSelect.value = "Auto";
  }
  promptLangGroup.append(promptLangLabel, promptLangSelect);

  const scene = document.createElement("div");
  scene.className = "k2cf-scene";
  const sceneLabel = document.createElement("label");
  sceneLabel.textContent = tr(resolveLang(promptLangSelect.value), "scene");
  const sceneText = document.createElement("textarea");
  sceneText.className = "k2cf-text";
  sceneText.placeholder = tr(resolveLang(promptLangSelect.value), "scenePlaceholder");
  sceneText.value = widgets.scene?.value || "";
  controls.scene = sceneText;
  k2cfAttachPyssssAutocomplete(sceneText);

  const backgroundText = document.createElement("textarea");
  backgroundText.className = "k2cf-text";
  backgroundText.placeholder = tr(resolveLang(promptLangSelect.value), "backgroundPlaceholder");
  backgroundText.value = widgets.background?.value || "";
  controls.background = backgroundText;
  k2cfAttachPyssssAutocomplete(backgroundText);
  sceneText.addEventListener("input", sync);
  backgroundText.addEventListener("input", sync);
  sceneText.addEventListener("change", sync);
  sceneText.addEventListener("blur", sync);
  sceneText.addEventListener("compositionend", sync);
  sceneText.addEventListener("change", sync);
  sceneText.addEventListener("blur", sync);
  sceneText.addEventListener("compositionend", sync);
  bindTextHeight("scene", sceneText);
  const scenePresetBar = document.createElement("div");
  scenePresetBar.className = "k2cf-presetbar";
  const scenePresetLabel = document.createElement("label");
  const scenePresetSelect = document.createElement("select");
  scenePresetSelect.className = "k2cf-small-select";
  const sceneSave = document.createElement("button");
  sceneSave.className = "k2cf-small-btn";
  const sceneLoad = document.createElement("button");
  sceneLoad.className = "k2cf-small-btn";
  const sceneDelete = document.createElement("button");
  sceneDelete.className = "k2cf-small-btn";
  scenePresetBar.append(scenePresetLabel, scenePresetSelect, sceneSave, sceneLoad, sceneDelete);
  promptLangBar.append(promptLangGroup, scenePresetBar);
  wrap.appendChild(promptLangBar);
  scene.append(sceneLabel, sceneText);
  wrap.appendChild(scene);
  const promptCards = [];
  const promptPresetSelects = [];
  function selectedPresetValue(select, fallback = "") {
    return select?.value || fallback || "";
  }
  function applyPromptLabels() {
    const lang = resolveLang(promptLangSelect.value);
    promptLangLabel.textContent = "UI";
    sceneLabel.textContent = tr(lang, "scene");
    if (typeof backgroundLabel !== "undefined" && backgroundLabel) backgroundLabel.textContent = tr(lang, "background");
    sceneText.placeholder = tr(lang, "scenePlaceholder");
    if (typeof backgroundText !== "undefined" && backgroundText) backgroundText.placeholder = tr(lang, "backgroundPlaceholder");
    scenePresetLabel.textContent = tr(lang, "scenePreset");
    scenePresetLabel.title = tr(lang, "scenePresetHelp");
    scenePresetSelect.title = tr(lang, "scenePresetSelectHelp");
    sceneSave.textContent = tr(lang, "save");
    sceneSave.title = tr(lang, "sceneSaveHelp");
    sceneLoad.textContent = tr(lang, "loadPreset");
    sceneLoad.title = tr(lang, "sceneLoadHelp");
    sceneDelete.textContent = tr(lang, "deletePreset");
    sceneDelete.title = tr(lang, "sceneDeleteHelp");
    for (const item of promptCards) {
      item.promptLabel.textContent = tr(lang, "prompt");
      if (item.head) item.head.title = tr(lang, "slotHeaderHelp").replace("{label}", item.label);
      if (item.ta) item.ta.title = tr(lang, "slotPromptHelp");
      if (item.typeSelect) item.typeSelect.title = tr(lang, "elementTypeHelp");
      if (item.typeLabel) item.typeLabel.textContent = tr(lang, "elementType");
      if (item.typeLabel) item.typeLabel.title = tr(lang, "elementTypeHelp");
      if (item.framingSelect) item.framingSelect.title = tr(lang, "framingHelp");
      if (item.framingLabel) item.framingLabel.textContent = tr(lang, "framing");
      if (item.framingLabel) item.framingLabel.title = tr(lang, "framingHelp");
      if (item.angleSelect) item.angleSelect.title = tr(lang, "angleHelp");
      if (item.angleLabel) item.angleLabel.textContent = tr(lang, "angle");
      if (item.angleLabel) item.angleLabel.title = tr(lang, "angleHelp");
      item.ta.placeholder = tr(lang, "enterPrompt").replace("{label}", item.label);
      if (item.del) item.del.title = tr(lang, "clearPrompt");
      if (item.presetLabel) item.presetLabel.textContent = tr(lang, "promptPreset");
      if (item.save) item.save.textContent = tr(lang, "save");
      if (item.load) item.load.textContent = tr(lang, "loadPreset");
      if (item.deletePreset) item.deletePreset.textContent = tr(lang, "deletePreset");
      if (item.applyOpen) item.applyOpen();
    }
  }
  promptLangSelect.addEventListener("change", () => {
    try { localStorage.setItem(PROMPT_LANGUAGE_KEY, promptLangSelect.value || "Auto"); } catch (_) {}
    applyPromptLabels();
    refreshScenePresets();
    refreshPromptSlotPresets();
    sync();
  });

  function refreshScenePresets() {
    const presets = readPresetList(SCENE_PRESET_KEY);
    const selected = promptUiState.scenePreset || "";
    scenePresetSelect.innerHTML = "";
    scenePresetSelect.appendChild(option("", tr(resolveLang(promptLangSelect.value), "none")));
    for (const p of presets) scenePresetSelect.appendChild(option(p.name, p.name));
    scenePresetSelect.value = presets.some((p) => p.name === selected) ? selected : "";
    promptUiState.scenePreset = scenePresetSelect.value;
  }
  scenePresetSelect.addEventListener("change", () => {
    promptUiState.scenePreset = scenePresetSelect.value || "";
    savePromptUiState();
  });
  sceneSave.addEventListener("click", () => {
    const name = prompt("Scene preset name", scenePresetSelect.value || "Scene Preset");
    if (!name) return;
    const presets = readPresetList(SCENE_PRESET_KEY).filter((p) => p.name !== name);
    presets.push({ name, text: sceneText.value || "", height: promptUiState.textHeights.scene || k2cfElementPixelHeight(sceneText) });
    writePresetList(SCENE_PRESET_KEY, presets);
    promptUiState.scenePreset = name;
    promptUiState.textHeights.scene = presets[presets.length - 1].height;
    promptUiState.textHeightManual.scene = true;
    refreshScenePresets();
    savePromptUiState();
  });
  sceneLoad.addEventListener("click", () => {
    const selected = scenePresetSelect.value;
    const preset = readPresetList(SCENE_PRESET_KEY).find((p) => p.name === selected);
    if (!preset) return;
    sceneText.value = preset.text || "";
    if (Number(preset.height) >= 45) {
      promptUiState.textHeights.scene = Number(preset.height);
      promptUiState.textHeightManual.scene = true;
      applySavedTextHeight("scene", sceneText);
      applySavedTextHeight("background", backgroundText);
    }
    sync();
    savePromptUiState();
  });
  sceneDelete.addEventListener("click", () => {
    const selected = scenePresetSelect.value;
    if (!selected) return;
    writePresetList(SCENE_PRESET_KEY, readPresetList(SCENE_PRESET_KEY).filter((p) => p.name !== selected));
    promptUiState.scenePreset = "";
    refreshScenePresets();
    savePromptUiState();
  });
  refreshScenePresets();

  function refreshPromptSlotPresets() {
    const presets = readPresetList(PROMPT_SLOT_PRESET_KEY);
    for (const select of promptPresetSelects) {
      const slot = select.dataset.slot || "";
      const selected = promptUiState.slotPreset?.[slot] || "";
      select.innerHTML = "";
      select.appendChild(option("", tr(resolveLang(promptLangSelect.value), "none")));
      for (const p of presets) select.appendChild(option(p.name, p.name));
      select.value = presets.some((p) => p.name === selected) ? selected : "";
      promptUiState.slotPreset[slot] = select.value;
    }
  }

  for (const [slot, label, color, promptName, typeName, framingName, angleName] of SLOTS) {
    const card = document.createElement("div");
    card.className = "k2cf-slot-card";
    const head = document.createElement("div");
    head.className = "k2cf-slot-head";
    head.title = tr(resolveLang(promptLangSelect.value), "slotHeaderHelp").replace("{label}", label);
    const left = document.createElement("div");
    left.className = "k2cf-slot-head-left";
    left.innerHTML = `<span class="k2cf-dot" style="background:${color}"></span>${label}`;
    const foldMark = document.createElement("span");
    foldMark.className = "k2cf-foldmark";
    left.appendChild(foldMark);
    head.append(left);

    const body = document.createElement("div");
    body.className = "k2cf-slot-body";
    const ta = document.createElement("textarea");
    ta.className = "k2cf-text";
    ta.placeholder = tr(resolveLang(promptLangSelect.value), "enterPrompt").replace("{label}", label);
    ta.title = tr(resolveLang(promptLangSelect.value), "slotPromptHelp");
    ta.value = widgets[promptName]?.value || "";
    controls[promptName] = ta;
    k2cfAttachPyssssAutocomplete(ta);
    const typeSelect = document.createElement("select");
    typeSelect.className = "k2cf-type";
    typeSelect.title = tr(resolveLang(promptLangSelect.value), "elementTypeHelp");
    for (const [value, text] of TYPE_OPTIONS) typeSelect.appendChild(option(value, text));
    typeSelect.value = widgets[typeName]?.value || "obj";
    controls[typeName] = typeSelect;
    const framingSelect = document.createElement("select");
    framingSelect.className = "k2cf-framing";
    framingSelect.title = tr(resolveLang(promptLangSelect.value), "framingHelp");
    for (const value of FRAMING_OPTIONS) framingSelect.appendChild(option(value, value));
    framingSelect.value = widgets[framingName]?.value || "Auto";
    controls[framingName] = framingSelect;
    const angleSelect = document.createElement("select");
    angleSelect.className = "k2cf-framing";
    angleSelect.title = tr(resolveLang(promptLangSelect.value), "angleHelp");
    for (const value of ANGLE_OPTIONS) angleSelect.appendChild(option(value, value));
    angleSelect.value = widgets[angleName]?.value || "Auto";
    controls[angleName] = angleSelect;
    ta.addEventListener("input", sync);
    ta.addEventListener("change", sync);
    ta.addEventListener("blur", sync);
    ta.addEventListener("compositionend", sync);
    bindTextHeight(promptName, ta);
    typeSelect.addEventListener("change", () => { sync(); savePromptUiState(); });
    framingSelect.addEventListener("change", () => { sync(); savePromptUiState(); });
    angleSelect.addEventListener("change", () => { sync(); savePromptUiState(); });
    const presetRow = document.createElement("div");
    presetRow.className = "k2cf-presetbar";
    const promptPresetSelect = document.createElement("select");
    promptPresetSelect.className = "k2cf-small-select";
    promptPresetSelect.dataset.slot = slot;
    const promptPresetLabel = document.createElement("label");
    presetRow.append(promptPresetSelect, promptPresetLabel);
    const presetButtons = document.createElement("div");
    presetButtons.className = "k2cf-presetbar";
    const promptSave = document.createElement("button");
    promptSave.className = "k2cf-small-btn";
    const promptLoad = document.createElement("button");
    promptLoad.className = "k2cf-small-btn";
    const promptDelete = document.createElement("button");
    promptDelete.className = "k2cf-small-btn";
    presetButtons.append(promptSave, promptLoad, promptDelete);
    const side = document.createElement("div");
    side.className = "k2cf-slot-side";
    const typeRow = document.createElement("div");
    typeRow.className = "k2cf-presetbar";
    const typeLabel = document.createElement("label");
    typeLabel.textContent = "Type";
    typeLabel.title = tr(resolveLang(promptLangSelect.value), "elementTypeHelp");
    typeLabel.style.minWidth = "34px";
    typeLabel.style.color = "#ddd";
    const framingRow = document.createElement("div");
    framingRow.className = "k2cf-presetbar";
    const framingLabel = document.createElement("label");
    framingLabel.textContent = "Framing";
    framingLabel.title = tr(resolveLang(promptLangSelect.value), "framingHelp");
    framingLabel.style.minWidth = "56px";
    framingLabel.style.color = "#ddd";
    const angleRow = document.createElement("div");
    angleRow.className = "k2cf-presetbar";
    const angleLabel = document.createElement("label");
    angleLabel.textContent = "Angle";
    angleLabel.title = tr(resolveLang(promptLangSelect.value), "angleHelp");
    angleLabel.style.minWidth = "56px";
    angleLabel.style.color = "#ddd";
    typeRow.append(typeLabel, typeSelect);
    framingRow.append(framingLabel, framingSelect);
    angleRow.append(angleLabel, angleSelect);
    side.append(typeRow, framingRow, angleRow);
    body.append(ta, side);

    function applyOpen() {
      const open = promptUiState.slotOpen[slot] !== false;
      card.classList.toggle("collapsed", !open);
      foldMark.textContent = open ? "▼" : "▶";
    }
    head.addEventListener("click", (ev) => {
      promptUiState.slotOpen[slot] = !(promptUiState.slotOpen[slot] !== false);
      applyOpen();
      savePromptUiState();
    });
    promptPresetSelect.addEventListener("change", () => {
      promptUiState.slotPreset[slot] = selectedPresetValue(promptPresetSelect);
      savePromptUiState();
    });
    promptSave.addEventListener("click", () => {
      const current = selectedPresetValue(promptPresetSelect, `${label} Preset`);
      const name = prompt("Prompt preset name", current);
      if (!name) return;
      const presets = readPresetList(PROMPT_SLOT_PRESET_KEY).filter((p) => p.name !== name);
      const height = promptUiState.textHeights[promptName] || k2cfElementPixelHeight(ta);
      presets.push({ name, text: ta.value || "", height });
      writePresetList(PROMPT_SLOT_PRESET_KEY, presets);
      promptUiState.slotPreset[slot] = name;
      promptUiState.textHeights[promptName] = height;
      promptUiState.textHeightManual[promptName] = true;
      refreshPromptSlotPresets();
      savePromptUiState();
    });
    promptLoad.addEventListener("click", () => {
      const selected = selectedPresetValue(promptPresetSelect);
      const preset = readPresetList(PROMPT_SLOT_PRESET_KEY).find((p) => p.name === selected);
      if (!preset) return;
      ta.value = preset.text || "";
      if (Number(preset.height) >= 45) {
        promptUiState.textHeights[promptName] = Number(preset.height);
        promptUiState.textHeightManual[promptName] = true;
        applySavedTextHeight(promptName, ta);
      }
      sync();
      savePromptUiState();
    });
    promptDelete.addEventListener("click", () => {
      const selected = selectedPresetValue(promptPresetSelect);
      if (!selected) return;
      writePresetList(PROMPT_SLOT_PRESET_KEY, readPresetList(PROMPT_SLOT_PRESET_KEY).filter((p) => p.name !== selected));
      for (const item of SLOTS) promptUiState.slotPreset[item[0]] = "";
      refreshPromptSlotPresets();
      savePromptUiState();
    });
    applyOpen();
    const promptLabelHidden = document.createElement("span");
    promptLabelHidden.textContent = tr(resolveLang(promptLangSelect.value), "prompt");
    promptLabelHidden.style.display = "none";
    promptCards.push({
      label,
      head,
      ta,
      typeSelect,
      framingSelect,
      angleSelect,
      typeLabel,
      framingLabel,
      angleLabel,
      promptLabel: promptLabelHidden,
      applyOpen,
    });
    card.append(head, body);
    wrap.appendChild(card);
  }
  refreshPromptSlotPresets();

  function captureCurrentTextHeights(markDirty = false, allowShrink = false) {
    let changed = false;
    const capture = (key, el) => {
      if (!el) return;
      if (recordTextHeight(key, k2cfElementPixelHeight(el), allowShrink, allowShrink)) changed = true;
    };
    capture("scene", sceneText);
    for (const [, , , promptName] of SLOTS) capture(promptName, controls[promptName]);
    if (changed) savePromptUiState(markDirty);
  }

  function hydratePromptFromWidgets() {
    isHydrating = true;
    refreshPromptUiState();
    const savedState = k2cfBestSavedState(node, "prompt");
    if (savedState) applyConfiguredValuesToWidgets(node, PROMPT_WIDGETS, savedState.widgets_values);
    try {
      sceneText.value = widgets.scene?.value || "";
      for (const [slot, label, color, promptName, typeName, framingName, angleName] of SLOTS) {
        const stored = promptUiState.slotValues?.[slot] || {};
        if (controls[promptName]) controls[promptName].value = widgets[promptName]?.value || "";
        const nextType = selectValueWithStored(widgets[typeName]?.value, stored.type, "obj");
        const nextFraming = selectValueWithStored(widgets[framingName]?.value, stored.framing, "Auto");
        const nextAngle = selectValueWithStored(widgets[angleName]?.value, stored.angle, "Auto");
        if (controls[typeName]) controls[typeName].value = nextType;
        if (controls[framingName]) controls[framingName].value = nextFraming;
        if (controls[angleName]) controls[angleName].value = nextAngle;
        setWidget(typeName, nextType);
        setWidget(framingName, nextFraming);
        setWidget(angleName, nextAngle);
      }
      applyPromptLabels();
      scheduleApplyAllSavedTextHeights();
    } finally {
      isHydrating = false;
    }
  }

  node.__k2cfPromptUiSnapshot = (markDirty = false, allowShrink = false) => captureCurrentTextHeights(markDirty, allowShrink);
  node.__k2cfHydrateFromWidgets = hydratePromptFromWidgets;

  node.addDOMWidget("krea2_prompt_ui", "Krea2PromptUI", wrap, {
    serialize:false,
    hideOnZoom:false,
    getMinHeight:()=>160,
    afterResize:()=>{ captureCurrentTextHeights(false, false); scheduleApplyAllSavedTextHeights(); },
  });
  k2cfMaybeUpgradeLegacyBugNodeSize(node, "prompt", K2CF_PROMPT_DEFAULT_SIZE);
  k2cfInstallNodeSizePersistence(node, "prompt", K2CF_PROMPT_DEFAULT_SIZE);
  k2cfMaybeInitializeNodeSize(node, "prompt", K2CF_PROMPT_DEFAULT_SIZE);
  k2cfScheduleNodeSizeRestore(node, "prompt", K2CF_PROMPT_DEFAULT_SIZE);
  hydratePromptFromWidgets();
  if (k2cfHasMeaningfulState(configuredValues)) {
    applyConfiguredValuesToWidgets(node, PROMPT_WIDGETS, configuredValues);
    node.properties = node.properties || {};
    node.properties.k2cfPromptState = {
      version: "widgets_values",
      widgets_values: configuredValues.slice(),
      saved_at: Date.now()
    };
    hydratePromptFromWidgets();
  }
  k2cfPersistWidgetSnapshot(node, "prompt", PROMPT_WIDGETS, "v15");
  installNodePersistenceHooks(node, sync, PROMPT_WIDGETS, "k2cfPrompt");
}


window.__k2cfResetPromptHeightCacheV29 = function() {
  const appObj = window.comfyAPI?.app?.app || app;
  const nodes = appObj?.graph?._nodes || app?.graph?._nodes || [];
  for (const n of nodes) {
    if (n?.comfyClass !== PROMPT_NODE && n?.type !== PROMPT_NODE) continue;
    try {
      if (n.properties?.k2cfPromptUiState) {
        n.properties.k2cfPromptUiState.textHeights = {};
        n.properties.k2cfPromptUiState.textHeightManual = {};
        n.properties.k2cfPromptUiState.heightCaptureMode = K2CF_PROMPT_HEIGHT_CAPTURE_MODE;
      }
      if (typeof n.__k2cfHydrateFromWidgets === "function") n.__k2cfHydrateFromWidgets();
    } catch (_) {}
  }
  for (const s of [localStorage, sessionStorage]) {
    try {
      Object.keys(s)
        .filter((k) => k.toLowerCase().includes("k2cf") || k.toLowerCase().includes("krea2"))
        .forEach((k) => {
          const raw = s.getItem(k);
          if (raw && raw.includes("textHeights")) s.removeItem(k);
        });
    } catch (_) {}
  }
  try { app.graph?.setDirtyCanvas?.(true, true); } catch (_) {}
  return true;
};



