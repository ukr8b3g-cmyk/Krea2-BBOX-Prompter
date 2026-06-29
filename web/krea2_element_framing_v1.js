const { app } = window.comfyAPI.app;
window.__k2efFramingV1Build = "v1_element_framing_angle_card_20260629";

const CANVAS_NODE = "Krea2ElementFramingV1Canvas";
const PROMPT_NODE = "Krea2ElementFramingV1Prompt";
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
    "name": "B&W Soft",
    "category": "Photo",
    "chip": "B&W Soft",
    "tone": "bw",
    "text": "soft black and white photography, monochrome grayscale tones, no color, gentle contrast, soft film grain, natural skin texture"
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
    "text": "nighttime photography, dark environment, on-camera flash, dramatic shadows, illuminated foreground, deep blacks, grainy high ISO texture, unexpected direct light, photographic snapshot realism"
  },
  {
    "name": "Direct Flash",
    "category": "Camera FX",
    "chip": "Direct",
    "tone": "camera-fx",
    "text": "direct flash photo, harsh frontal light, strong shadows, crisp subject detail, bright specular highlights, dark background, sharp focus, edgy photographic camera look"
  },
  {
    "name": "Disposable Flash",
    "category": "Camera FX",
    "chip": "Disposable",
    "tone": "camera-fx",
    "text": "disposable camera flash photo, harsh frontal flash, casual snapshot framing, grainy film texture, illuminated foreground, deep shadows, nostalgic point-and-shoot realism"
  },
  {
    "name": "Paparazzi Flash",
    "category": "Camera FX",
    "chip": "Paparazzi",
    "tone": "camera-fx",
    "text": "paparazzi flash photography, strong repeated camera flash, bright foreground subject, deep dark background, high contrast, candid celebrity-style night snapshot, photographic realism"
  },
  {
    "name": "Red Eye Flash",
    "category": "Camera FX",
    "chip": "RE",
    "tone": "Flash",
    "thumbnail": "red_eye_flash.webp",
    "text": "red-eye flash photo effect, on-camera flash causing visible red pupils, direct frontal flash, dark environment, snapshot realism, strong catchlight, photographic camera artifact"
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
    "text": "thermal camera image, false-color heatmap palette, glowing warm subjects, cool dark background, infrared temperature-vision look"
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
    "name": "Tilt-Shift",
    "category": "Camera FX",
    "chip": "Tilt",
    "tone": "camera-fx",
    "text": "tilt-shift photography, selective focus, miniature-like depth, soft blurred edges, crisp central subject, stylized photo realism"
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
    "text": "neon night lighting, colorful urban glow, reflective highlights, cinematic contrast, atmospheric dark background"
  },
  {
    "name": "Cyberpunk",
    "category": "Light",
    "chip": "Cyber",
    "tone": "lighting",
    "text": "cyberpunk night photography mood, neon lights, futuristic city atmosphere, realistic urban texture, high contrast, saturated reflections, cinematic moody lighting"
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
    "name": "Soft Theme",
    "category": "Color Theme",
    "chip": "Soft",
    "tone": "color-theme",
    "thumbnail": "soft_theme.webp",
    "text": "soft color theme, gentle low-contrast palette, smooth soft color grading, calm delicate atmosphere"
  },
  {
    "name": "Vivid Theme",
    "category": "Color Theme",
    "chip": "Vivid",
    "tone": "color-theme",
    "thumbnail": "vivid_theme.webp",
    "text": "vivid color theme, highly saturated palette, bold color grading, energetic visual impact"
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
    "name": "Lavender Theme",
    "category": "Color Theme",
    "chip": "Lavender",
    "tone": "color-theme",
    "thumbnail": "lavender_theme.webp",
    "text": "lavender color theme, soft lavender palette, gentle violet color grading, dreamy calm atmosphere"
  },
  {
    "name": "Mint Theme",
    "category": "Color Theme",
    "chip": "Mint",
    "tone": "color-theme",
    "thumbnail": "mint_theme.webp",
    "text": "mint color theme, fresh mint palette, light green-blue color grading, clean airy atmosphere"
  },
  {
    "name": "Peach Theme",
    "category": "Color Theme",
    "chip": "Peach",
    "tone": "color-theme",
    "thumbnail": "peach_theme.webp",
    "text": "peach color theme, soft peach palette, warm delicate color grading, friendly gentle atmosphere"
  },
  {
    "name": "Rose Theme",
    "category": "Color Theme",
    "chip": "Rose",
    "tone": "color-theme",
    "thumbnail": "rose_theme.webp",
    "text": "rose color theme, romantic rose palette, soft red-pink color grading, elegant warm atmosphere"
  },
  {
    "name": "Aqua Theme",
    "category": "Color Theme",
    "chip": "Aqua",
    "tone": "color-theme",
    "thumbnail": "aqua_theme.webp",
    "text": "aqua color theme, clear aqua palette, fresh watery color grading, bright clean atmosphere"
  },
  {
    "name": "Pastel Pink",
    "category": "Color Theme",
    "chip": "PP",
    "tone": "color-theme",
    "thumbnail": "pastel_pink.webp",
    "text": "pastel pink color theme, very soft pink palette, gentle rosy color grading, airy delicate mood"
  },
  {
    "name": "Pastel Blue",
    "category": "Color Theme",
    "chip": "PB",
    "tone": "color-theme",
    "thumbnail": "pastel_blue.webp",
    "text": "pastel blue color theme, very soft blue palette, gentle cool color grading, calm airy mood"
  },
  {
    "name": "Pastel Purple",
    "category": "Color Theme",
    "chip": "PP",
    "tone": "color-theme",
    "thumbnail": "pastel_purple.webp",
    "text": "pastel purple color theme, very soft violet palette, delicate dreamy color grading, gentle atmosphere"
  },
  {
    "name": "Pastel Green",
    "category": "Color Theme",
    "chip": "PG",
    "tone": "color-theme",
    "thumbnail": "pastel_green.webp",
    "text": "pastel green color theme, very soft green palette, fresh gentle color grading, light natural mood"
  },
  {
    "name": "Pastel Yellow",
    "category": "Color Theme",
    "chip": "PY",
    "tone": "color-theme",
    "thumbnail": "pastel_yellow.webp",
    "text": "pastel yellow color theme, very soft yellow palette, light sunny color grading, cheerful gentle mood"
  },
  {
    "name": "Pastel Orange",
    "category": "Color Theme",
    "chip": "PO",
    "tone": "color-theme",
    "thumbnail": "pastel_orange.webp",
    "text": "pastel orange color theme, very soft orange palette, warm gentle color grading, cozy light mood"
  },
  {
    "name": "Pastel Mint",
    "category": "Color Theme",
    "chip": "PM",
    "tone": "color-theme",
    "thumbnail": "pastel_mint.webp",
    "text": "pastel mint color theme, soft mint palette, clean fresh color grading, light airy atmosphere"
  },
  {
    "name": "Pastel Lavender",
    "category": "Color Theme",
    "chip": "PL",
    "tone": "color-theme",
    "thumbnail": "pastel_lavender.webp",
    "text": "pastel lavender color theme, soft lavender palette, delicate violet color grading, dreamy airy mood"
  },
  {
    "name": "Pastel Peach",
    "category": "Color Theme",
    "chip": "PP",
    "tone": "color-theme",
    "thumbnail": "pastel_peach.webp",
    "text": "pastel peach color theme, soft peach palette, warm gentle color grading, delicate friendly mood"
  },
  {
    "name": "Pastel Rose",
    "category": "Color Theme",
    "chip": "PR",
    "tone": "color-theme",
    "thumbnail": "pastel_rose.webp",
    "text": "pastel rose color theme, soft rose palette, gentle romantic color grading, airy elegant mood"
  },
  {
    "name": "Pastel Aqua",
    "category": "Color Theme",
    "chip": "PA",
    "tone": "color-theme",
    "thumbnail": "pastel_aqua.webp",
    "text": "pastel aqua color theme, soft aqua palette, clean watery color grading, light refreshing mood"
  },
  {
    "name": "Pastel Cream",
    "category": "Color Theme",
    "chip": "PC",
    "tone": "color-theme",
    "thumbnail": "pastel_cream.webp",
    "text": "pastel cream color theme, soft cream palette, warm light color grading, gentle elegant mood"
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
    "name": "Red & Blue",
    "category": "Color Theme",
    "chip": "R&B",
    "tone": "color-theme",
    "thumbnail": "red_blue.webp",
    "text": "red and blue color theme, bold dual-color palette, strong warm-cool contrast, dynamic color grading"
  },
  {
    "name": "Pink & Blue",
    "category": "Color Theme",
    "chip": "P&B",
    "tone": "color-theme",
    "thumbnail": "pink_blue.webp",
    "text": "pink and blue color theme, playful dual-color palette, soft warm-cool contrast, vibrant color harmony"
  },
  {
    "name": "Purple & Cyan",
    "category": "Color Theme",
    "chip": "P&C",
    "tone": "color-theme",
    "thumbnail": "purple_cyan.webp",
    "text": "purple and cyan color theme, vivid dual-color palette, electric cool contrast, futuristic color grading"
  },
  {
    "name": "Orange & Teal",
    "category": "Color Theme",
    "chip": "O&T",
    "tone": "color-theme",
    "thumbnail": "orange_teal.webp",
    "text": "orange and teal color theme, cinematic complementary palette, warm-cool contrast, polished color grading"
  },
  {
    "name": "Yellow & Purple",
    "category": "Color Theme",
    "chip": "Y&P",
    "tone": "color-theme",
    "thumbnail": "yellow_purple.webp",
    "text": "yellow and purple color theme, bold complementary palette, playful contrast, vivid graphic atmosphere"
  },
  {
    "name": "Green & Magenta",
    "category": "Color Theme",
    "chip": "G&M",
    "tone": "color-theme",
    "thumbnail": "green_magenta.webp",
    "text": "green and magenta color theme, high-contrast complementary palette, energetic stylized color grading"
  },
  {
    "name": "Black & Red",
    "category": "Color Theme",
    "chip": "B&R",
    "tone": "color-theme",
    "thumbnail": "black_red.webp",
    "text": "black and red color theme, dark dramatic palette, intense red accents, bold high-contrast atmosphere"
  },
  {
    "name": "Black & Gold",
    "category": "Color Theme",
    "chip": "B&G",
    "tone": "color-theme",
    "thumbnail": "black_gold.webp",
    "text": "black and gold color theme, luxury dark palette, golden highlights, premium dramatic color grading"
  },
  {
    "name": "White & Blue",
    "category": "Color Theme",
    "chip": "W&B",
    "tone": "color-theme",
    "thumbnail": "white_blue.webp",
    "text": "white and blue color theme, clean bright palette, crisp blue accents, fresh minimal color grading"
  },
  {
    "name": "Pastel Pink & Blue",
    "category": "Color Theme",
    "chip": "P&B",
    "tone": "color-theme",
    "thumbnail": "pastel_pink_blue.webp",
    "text": "pastel pink and blue color theme, soft dual pastel palette, gentle warm-cool balance, airy atmosphere"
  },
  {
    "name": "Pastel Mint & Lavender",
    "category": "Color Theme",
    "chip": "P&L",
    "tone": "color-theme",
    "thumbnail": "pastel_mint_lavender.webp",
    "text": "pastel mint and lavender color theme, soft dreamy dual palette, fresh delicate color harmony"
  },
  {
    "name": "Pastel Peach & Cream",
    "category": "Color Theme",
    "chip": "P&C",
    "tone": "color-theme",
    "thumbnail": "pastel_peach_cream.webp",
    "text": "pastel peach and cream color theme, warm soft dual palette, cozy gentle color grading"
  },
  {
    "name": "Pastel Yellow & Green",
    "category": "Color Theme",
    "chip": "P&G",
    "tone": "color-theme",
    "thumbnail": "pastel_yellow_green.webp",
    "text": "pastel yellow and green color theme, soft sunny natural palette, fresh cheerful color grading"
  },
  {
    "name": "Pastel Aqua & Pink",
    "category": "Color Theme",
    "chip": "P&P",
    "tone": "color-theme",
    "thumbnail": "pastel_aqua_pink.webp",
    "text": "pastel aqua and pink color theme, soft playful dual palette, fresh rosy color harmony"
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
    "name": "Fantasy Color",
    "category": "Color Theme",
    "chip": "FC",
    "tone": "color-theme",
    "thumbnail": "fantasy_color.webp",
    "text": "fantasy color theme, magical saturated palette, glowing photographic color grading, whimsical real-world atmosphere"
  }
];

const EFFECT_NODE = "Krea2PromptEffect";
const EFFECT_NODE_BBOX = "Krea2BBOXPromptEffect";

const K2CF_CANVAS_DEFAULT_SIZE = [830, 980];
const K2CF_PROMPT_DEFAULT_SIZE = [540, 990];
const K2CF_PROMPT_LEGACY_BUG_SIZES = [[400, 572]];

const K2CF_PROMPT_HEIGHT_CAPTURE_MODE = "resize_grip_v29";

const SLOTS = [
  ["red", "RED", "#ff3b30", "red_prompt", "red_type", "red_framing", "red_angle"],
  ["blue", "BLUE", "#2f80ff", "blue_prompt", "blue_type", "blue_framing", "blue_angle"],
  ["yellow", "YELLOW", "#ffd91a", "yellow_prompt", "yellow_type", "yellow_framing", "yellow_angle"],
  ["green", "GREEN", "#35b84b", "green_prompt", "green_type", "green_framing", "green_angle"],
  ["magenta", "MAGENTA", "#d943c8", "magenta_prompt", "magenta_type", "magenta_framing", "magenta_angle"]
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

const EFFECT_WIDGETS = ["prompt_in", "enable_effect", "category", "preset", "mode", "custom_preset"];
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
    "name": "B&W Soft",
    "category": "Photo",
    "chip": "B&W Soft",
    "tone": "bw",
    "text": "soft black and white photography, monochrome grayscale tones, no color, gentle contrast, soft film grain, natural skin texture"
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
    "text": "nighttime photography, dark environment, on-camera flash, dramatic shadows, illuminated foreground, deep blacks, grainy high ISO texture, unexpected direct light, photographic snapshot realism"
  },
  {
    "name": "Direct Flash",
    "category": "Camera FX",
    "chip": "Direct",
    "tone": "camera-fx",
    "text": "direct flash photo, harsh frontal light, strong shadows, crisp subject detail, bright specular highlights, dark background, sharp focus, edgy photographic camera look"
  },
  {
    "name": "Disposable Flash",
    "category": "Camera FX",
    "chip": "Disposable",
    "tone": "camera-fx",
    "text": "disposable camera flash photo, harsh frontal flash, casual snapshot framing, grainy film texture, illuminated foreground, deep shadows, nostalgic point-and-shoot realism"
  },
  {
    "name": "Paparazzi Flash",
    "category": "Camera FX",
    "chip": "Paparazzi",
    "tone": "camera-fx",
    "text": "paparazzi flash photography, strong repeated camera flash, bright foreground subject, deep dark background, high contrast, candid celebrity-style night snapshot, photographic realism"
  },
  {
    "name": "Red Eye Flash",
    "category": "Camera FX",
    "chip": "RE",
    "tone": "Flash",
    "thumbnail": "red_eye_flash.webp",
    "text": "red-eye flash photo effect, on-camera flash causing visible red pupils, direct frontal flash, dark environment, snapshot realism, strong catchlight, photographic camera artifact"
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
    "text": "thermal camera image, false-color heatmap palette, glowing warm subjects, cool dark background, infrared temperature-vision look"
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
    "name": "Tilt-Shift",
    "category": "Camera FX",
    "chip": "Tilt",
    "tone": "camera-fx",
    "text": "tilt-shift photography, selective focus, miniature-like depth, soft blurred edges, crisp central subject, stylized photo realism"
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
    "text": "neon night lighting, colorful urban glow, reflective highlights, cinematic contrast, atmospheric dark background"
  },
  {
    "name": "Cyberpunk",
    "category": "Light",
    "chip": "Cyber",
    "tone": "lighting",
    "text": "cyberpunk night photography mood, neon lights, futuristic city atmosphere, realistic urban texture, high contrast, saturated reflections, cinematic moody lighting"
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
    "name": "Soft Theme",
    "category": "Color Theme",
    "chip": "Soft",
    "tone": "color-theme",
    "thumbnail": "soft_theme.webp",
    "text": "soft color theme, gentle low-contrast palette, smooth soft color grading, calm delicate atmosphere"
  },
  {
    "name": "Vivid Theme",
    "category": "Color Theme",
    "chip": "Vivid",
    "tone": "color-theme",
    "thumbnail": "vivid_theme.webp",
    "text": "vivid color theme, highly saturated palette, bold color grading, energetic visual impact"
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
    "name": "Lavender Theme",
    "category": "Color Theme",
    "chip": "Lavender",
    "tone": "color-theme",
    "thumbnail": "lavender_theme.webp",
    "text": "lavender color theme, soft lavender palette, gentle violet color grading, dreamy calm atmosphere"
  },
  {
    "name": "Mint Theme",
    "category": "Color Theme",
    "chip": "Mint",
    "tone": "color-theme",
    "thumbnail": "mint_theme.webp",
    "text": "mint color theme, fresh mint palette, light green-blue color grading, clean airy atmosphere"
  },
  {
    "name": "Peach Theme",
    "category": "Color Theme",
    "chip": "Peach",
    "tone": "color-theme",
    "thumbnail": "peach_theme.webp",
    "text": "peach color theme, soft peach palette, warm delicate color grading, friendly gentle atmosphere"
  },
  {
    "name": "Rose Theme",
    "category": "Color Theme",
    "chip": "Rose",
    "tone": "color-theme",
    "thumbnail": "rose_theme.webp",
    "text": "rose color theme, romantic rose palette, soft red-pink color grading, elegant warm atmosphere"
  },
  {
    "name": "Aqua Theme",
    "category": "Color Theme",
    "chip": "Aqua",
    "tone": "color-theme",
    "thumbnail": "aqua_theme.webp",
    "text": "aqua color theme, clear aqua palette, fresh watery color grading, bright clean atmosphere"
  },
  {
    "name": "Pastel Pink",
    "category": "Color Theme",
    "chip": "PP",
    "tone": "color-theme",
    "thumbnail": "pastel_pink.webp",
    "text": "pastel pink color theme, very soft pink palette, gentle rosy color grading, airy delicate mood"
  },
  {
    "name": "Pastel Blue",
    "category": "Color Theme",
    "chip": "PB",
    "tone": "color-theme",
    "thumbnail": "pastel_blue.webp",
    "text": "pastel blue color theme, very soft blue palette, gentle cool color grading, calm airy mood"
  },
  {
    "name": "Pastel Purple",
    "category": "Color Theme",
    "chip": "PP",
    "tone": "color-theme",
    "thumbnail": "pastel_purple.webp",
    "text": "pastel purple color theme, very soft violet palette, delicate dreamy color grading, gentle atmosphere"
  },
  {
    "name": "Pastel Green",
    "category": "Color Theme",
    "chip": "PG",
    "tone": "color-theme",
    "thumbnail": "pastel_green.webp",
    "text": "pastel green color theme, very soft green palette, fresh gentle color grading, light natural mood"
  },
  {
    "name": "Pastel Yellow",
    "category": "Color Theme",
    "chip": "PY",
    "tone": "color-theme",
    "thumbnail": "pastel_yellow.webp",
    "text": "pastel yellow color theme, very soft yellow palette, light sunny color grading, cheerful gentle mood"
  },
  {
    "name": "Pastel Orange",
    "category": "Color Theme",
    "chip": "PO",
    "tone": "color-theme",
    "thumbnail": "pastel_orange.webp",
    "text": "pastel orange color theme, very soft orange palette, warm gentle color grading, cozy light mood"
  },
  {
    "name": "Pastel Mint",
    "category": "Color Theme",
    "chip": "PM",
    "tone": "color-theme",
    "thumbnail": "pastel_mint.webp",
    "text": "pastel mint color theme, soft mint palette, clean fresh color grading, light airy atmosphere"
  },
  {
    "name": "Pastel Lavender",
    "category": "Color Theme",
    "chip": "PL",
    "tone": "color-theme",
    "thumbnail": "pastel_lavender.webp",
    "text": "pastel lavender color theme, soft lavender palette, delicate violet color grading, dreamy airy mood"
  },
  {
    "name": "Pastel Peach",
    "category": "Color Theme",
    "chip": "PP",
    "tone": "color-theme",
    "thumbnail": "pastel_peach.webp",
    "text": "pastel peach color theme, soft peach palette, warm gentle color grading, delicate friendly mood"
  },
  {
    "name": "Pastel Rose",
    "category": "Color Theme",
    "chip": "PR",
    "tone": "color-theme",
    "thumbnail": "pastel_rose.webp",
    "text": "pastel rose color theme, soft rose palette, gentle romantic color grading, airy elegant mood"
  },
  {
    "name": "Pastel Aqua",
    "category": "Color Theme",
    "chip": "PA",
    "tone": "color-theme",
    "thumbnail": "pastel_aqua.webp",
    "text": "pastel aqua color theme, soft aqua palette, clean watery color grading, light refreshing mood"
  },
  {
    "name": "Pastel Cream",
    "category": "Color Theme",
    "chip": "PC",
    "tone": "color-theme",
    "thumbnail": "pastel_cream.webp",
    "text": "pastel cream color theme, soft cream palette, warm light color grading, gentle elegant mood"
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
    "name": "Red & Blue",
    "category": "Color Theme",
    "chip": "R&B",
    "tone": "color-theme",
    "thumbnail": "red_blue.webp",
    "text": "red and blue color theme, bold dual-color palette, strong warm-cool contrast, dynamic color grading"
  },
  {
    "name": "Pink & Blue",
    "category": "Color Theme",
    "chip": "P&B",
    "tone": "color-theme",
    "thumbnail": "pink_blue.webp",
    "text": "pink and blue color theme, playful dual-color palette, soft warm-cool contrast, vibrant color harmony"
  },
  {
    "name": "Purple & Cyan",
    "category": "Color Theme",
    "chip": "P&C",
    "tone": "color-theme",
    "thumbnail": "purple_cyan.webp",
    "text": "purple and cyan color theme, vivid dual-color palette, electric cool contrast, futuristic color grading"
  },
  {
    "name": "Orange & Teal",
    "category": "Color Theme",
    "chip": "O&T",
    "tone": "color-theme",
    "thumbnail": "orange_teal.webp",
    "text": "orange and teal color theme, cinematic complementary palette, warm-cool contrast, polished color grading"
  },
  {
    "name": "Yellow & Purple",
    "category": "Color Theme",
    "chip": "Y&P",
    "tone": "color-theme",
    "thumbnail": "yellow_purple.webp",
    "text": "yellow and purple color theme, bold complementary palette, playful contrast, vivid graphic atmosphere"
  },
  {
    "name": "Green & Magenta",
    "category": "Color Theme",
    "chip": "G&M",
    "tone": "color-theme",
    "thumbnail": "green_magenta.webp",
    "text": "green and magenta color theme, high-contrast complementary palette, energetic stylized color grading"
  },
  {
    "name": "Black & Red",
    "category": "Color Theme",
    "chip": "B&R",
    "tone": "color-theme",
    "thumbnail": "black_red.webp",
    "text": "black and red color theme, dark dramatic palette, intense red accents, bold high-contrast atmosphere"
  },
  {
    "name": "Black & Gold",
    "category": "Color Theme",
    "chip": "B&G",
    "tone": "color-theme",
    "thumbnail": "black_gold.webp",
    "text": "black and gold color theme, luxury dark palette, golden highlights, premium dramatic color grading"
  },
  {
    "name": "White & Blue",
    "category": "Color Theme",
    "chip": "W&B",
    "tone": "color-theme",
    "thumbnail": "white_blue.webp",
    "text": "white and blue color theme, clean bright palette, crisp blue accents, fresh minimal color grading"
  },
  {
    "name": "Pastel Pink & Blue",
    "category": "Color Theme",
    "chip": "P&B",
    "tone": "color-theme",
    "thumbnail": "pastel_pink_blue.webp",
    "text": "pastel pink and blue color theme, soft dual pastel palette, gentle warm-cool balance, airy atmosphere"
  },
  {
    "name": "Pastel Mint & Lavender",
    "category": "Color Theme",
    "chip": "P&L",
    "tone": "color-theme",
    "thumbnail": "pastel_mint_lavender.webp",
    "text": "pastel mint and lavender color theme, soft dreamy dual palette, fresh delicate color harmony"
  },
  {
    "name": "Pastel Peach & Cream",
    "category": "Color Theme",
    "chip": "P&C",
    "tone": "color-theme",
    "thumbnail": "pastel_peach_cream.webp",
    "text": "pastel peach and cream color theme, warm soft dual palette, cozy gentle color grading"
  },
  {
    "name": "Pastel Yellow & Green",
    "category": "Color Theme",
    "chip": "P&G",
    "tone": "color-theme",
    "thumbnail": "pastel_yellow_green.webp",
    "text": "pastel yellow and green color theme, soft sunny natural palette, fresh cheerful color grading"
  },
  {
    "name": "Pastel Aqua & Pink",
    "category": "Color Theme",
    "chip": "P&P",
    "tone": "color-theme",
    "thumbnail": "pastel_aqua_pink.webp",
    "text": "pastel aqua and pink color theme, soft playful dual palette, fresh rosy color harmony"
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
    "name": "Fantasy Color",
    "category": "Color Theme",
    "chip": "FC",
    "tone": "color-theme",
    "thumbnail": "fantasy_color.webp",
    "text": "fantasy color theme, magical saturated palette, glowing photographic color grading, whimsical real-world atmosphere"
  }
];
const EFFECT_CATEGORIES = ["All", "Photo", "Camera FX", "Art", "Light", "Mood", "Color Theme", "Finish", "Custom"];
const EFFECT_PRESET_ALIASES = {"Black White":"B&W Strong","Realistic":"Realistic Photo","Cinematic":"Cinematic Photo","Base Style":"Photo","Photo Look":"Photo","Portrait":"Photo","Commercial":"Photo","Lighting":"Light","Illustration":"Art","Custom Preset":"Custom"};
const EFFECT_THUMBNAIL_BASE = "/extensions/Krea2-BBOX-Prompter-Suite/thumbnails/";
function k2fxPresetSlug(name) {
  return String(name || "").toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || "preset";
}
function k2fxThumbnailUrl(preset) {
  const file = preset?.thumbnail || `${k2fxPresetSlug(preset?.name)}.webp`;
  return `${EFFECT_THUMBNAIL_BASE}${file}`;
}


const PRESETS = {
  "1024 x 1024": [1024, 1024],
  "1536 x 1536": [1536, 1536],
  "2048 x 2048": [2048, 2048],
  "1024 x 1536": [1024, 1536],
  "1152 x 1536": [1152, 1536],
  "1536 x 2048": [1536, 2048],
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
    framing: "Framing",
    angle: "Angle",
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
    framing: "フレーミング",
    angle: "アングル",
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

function k2cfLocalStateKeys(node, kind) {
  const keys = [k2cfNodeStorageKey(node, kind)];
  if (kind === "prompt_ui" || kind.endsWith("_node_size")) keys.push(k2cfNodeFallbackStorageKey(node, kind));
  return keys;
}

function k2cfReadLocalState(node, kind) {
  // Prompt/canvas widget values must come only from workflow node/widget state.
  // Browser local/session fallback can resurrect stale prompt text or stale latent sizes
  // (for example 1024 x 1536) when ComfyUI rebuilds a tab.
  if (kind === "prompt" || kind === "canvas" || kind === "effect") return null;
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
    if (kind === "prompt_ui" || kind.endsWith("_node_size")) {
      try { localStorage.setItem(key, value); } catch (_) {}
    }
  }
}

function k2cfBestSavedState(node, kind) {
  const propName = kind === "prompt" ? "k2cfPromptState" : (kind === "effect" ? "k2cfEffectState" : "k2cfCanvasState");
  const workflowCandidates = [
    node?.properties?.[propName],
    kind === "prompt" ? node?.__k2cfConfiguredPromptState : (kind === "effect" ? node?.__k2cfConfiguredEffectState : node?.__k2cfConfiguredCanvasState),
  ].filter((state) => Array.isArray(state?.widgets_values) && k2cfHasMeaningfulState(state.widgets_values));
  if (workflowCandidates.length) {
    workflowCandidates.sort((a, b) => Number(b.saved_at || 0) - Number(a.saved_at || 0));
    const picked = workflowCandidates[0];
    if (kind === "prompt") picked.widgets_values = k2cfSanitizePromptValues(picked.widgets_values);
    return picked;
  }

  if (kind === "prompt" && node?.__k2cfSkipLocalPromptState) return null;
  if (kind === "canvas" && node?.__k2cfSkipLocalCanvasState) return null;

  const localState = k2cfReadLocalState(node, kind);
  if (Array.isArray(localState?.widgets_values) && k2cfHasMeaningfulState(localState.widgets_values)) {
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
  return key === "scene" ? 125 : 76;
}

function k2cfMaxPromptTextHeightForKey(key) {
  // Guard against ComfyUI tab/app restore reflow saving a huge textarea height.
  // Keep the prompt node usable and prevent SCENE from pushing color slots off-screen.
  return key === "scene" ? 260 : 220;
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
  if (!k2cfHasMeaningfulState(values)) return;
  node.properties = node.properties || {};
  const state = { version, widgets_values: values.slice(), saved_at: Date.now() };
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
  "red_angle", "blue_angle", "yellow_angle", "green_angle", "magenta_angle"
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
  if (existingStyle) {
    if (!existingStyle.textContent.includes("k2fx-sizebar")) existingStyle.textContent += effectSizeCss;
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
    .k2cf-dot{display:inline-block;width:11px;height:11px;border-radius:99px;margin-right:7px}
    .k2cf-text{width:100%;min-height:76px;resize:vertical;background:#151515;color:#eee;border:1px solid #3f3f3f;border-radius:5px;padding:8px;box-sizing:border-box;font:12px monospace}
    .k2cf-scene .k2cf-text{min-height:125px}
    .k2cf-slot-body{display:grid;grid-template-columns:1fr 132px;gap:8px;align-items:start}
    .k2cf-slot-side{display:flex;flex-direction:column;gap:7px;align-items:stretch}
    .k2cf-type{width:92px;max-width:92px;height:28px;background:#202020;color:#ddd;border:1px solid #555;border-radius:5px;padding:3px 6px;font-size:12px;box-sizing:border-box}.k2cf-framing{width:170px;max-width:170px;height:28px;background:#202020;color:#ddd;border:1px solid #555;border-radius:5px;padding:3px 6px;font-size:12px;box-sizing:border-box}
    .k2cf-iconbtn{background:#242424;color:#ddd;border:1px solid #555;border-radius:5px;width:26px;height:24px;cursor:pointer}.k2cf-iconbtn:hover{border-color:#aaa}
    .k2fx-wrap{display:flex;flex-direction:column;gap:9px;color:#ddd;font:12px sans-serif;height:100%;min-height:0;overflow:auto;background:#111;border:1px solid #333;border-radius:8px;padding:9px;box-sizing:border-box}.k2fx-io{display:flex;align-items:center;gap:7px;background:#161616;border:1px solid #333;border-radius:6px;padding:4px 7px;color:#bfeeea;font-size:11px;font-weight:700}.k2fx-io .dot{width:9px;height:9px;border-radius:50%;background:#4cff68;box-shadow:0 0 0 1px #193 inset}.k2fx-io .name{color:#ddd;font-weight:600}
    .k2fx-top{display:grid;grid-template-columns:auto 1fr auto;gap:7px;align-items:center}.k2fx-title{font-weight:700;color:#35d0c8;white-space:nowrap}.k2fx-search{min-width:0;background:#202020;color:#eee;border:1px solid #555;border-radius:6px;padding:5px 7px;box-sizing:border-box}.k2fx-switch-label{gap:6px}.k2fx-switch-label input{display:none}.k2fx-switch{width:34px;height:18px;border-radius:99px;background:#444;border:1px solid #666;position:relative;display:inline-block;vertical-align:middle;box-sizing:border-box}.k2fx-switch::after{content:"";position:absolute;width:14px;height:14px;border-radius:50%;left:1px;top:1px;background:#bbb;transition:left .12s ease,background .12s ease}.k2fx-switch-label input:checked + .k2fx-switch{background:#138f8b;border-color:#35d0c8}.k2fx-switch-label input:checked + .k2fx-switch::after{left:17px;background:#fff}.k2fx-toggle{display:flex;align-items:center;gap:5px;color:#bbb;font-size:11px;white-space:nowrap}
    ${effectSizeCss}
    .k2fx-tabs{display:flex;gap:5px;flex-wrap:wrap}.k2fx-tab{background:#242424;color:#ddd;border:1px solid #444;border-radius:999px;padding:4px 9px;cursor:pointer;font-size:11px}.k2fx-tab.active{border-color:#35d0c8;color:#fff;background:#12606a}
    .k2fx-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(calc(var(--k2fx-thumb-w, 110px) + 12px),1fr));gap:7px}.k2fx-card{background:#1b1b1b;border:1px solid #3a3a3a;border-radius:8px;padding:6px;cursor:pointer;min-width:0}.k2fx-card:hover{border-color:#888}.k2fx-card.active{border-color:#35d0c8;box-shadow:0 0 0 1px rgba(53,208,200,.45) inset}.k2fx-custom-notice{grid-column:1/-1;border:1px dashed #3a3a3a;border-radius:8px;padding:12px;color:#aaa;background:#181818;font-size:12px}.k2fx-thumb{width:var(--k2fx-thumb-w, 110px);height:calc(var(--k2fx-thumb-w, 110px) * .6667);border-radius:7px;border:1px solid #333;background:linear-gradient(135deg,#1e1e1e,#4b4b4b);background-size:cover;background-position:center;display:flex;align-items:center;justify-content:center;color:#fff;font-size:14px;font-weight:800;letter-spacing:.03em;margin:0 auto 6px;max-width:100%}.k2fx-thumb.has-img{color:transparent;text-shadow:none}.k2fx-thumb.has-img::after{content:""}.k2fx-card[data-tone="Strong"] .k2fx-thumb{background:linear-gradient(135deg,#050505,#dcdcdc)}.k2fx-card[data-tone="Soft"] .k2fx-thumb{background:linear-gradient(135deg,#777,#eee)}.k2fx-card[data-tone="Analog"] .k2fx-thumb{background:linear-gradient(135deg,#3a2f24,#c0a777)}.k2fx-card[data-tone="Dramatic"] .k2fx-thumb{background:linear-gradient(135deg,#0b0c10,#8d6d42)}
    .k2fx-name{font-weight:700;font-size:12px;color:#eee;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.k2fx-desc{color:#aaa;font-size:10.5px;line-height:1.25;margin-top:3px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}.k2fx-footer{display:flex;flex-direction:column;gap:5px}.k2fx-custom{display:block;width:100%;min-height:70px;resize:vertical;background:#151515;color:#eee;border:1px solid #444;border-radius:6px;padding:7px;box-sizing:border-box;font:11px monospace}.k2fx-preview{background:#151515;border:1px solid #333;border-radius:7px;color:#aaa;font:10.5px monospace;padding:7px;max-height:72px;overflow:auto;white-space:pre-wrap}
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
  const toggleLabel = document.createElement("label");
  toggleLabel.className = "k2fx-toggle k2fx-switch-label";
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

  const tabs = document.createElement("div");
  tabs.className = "k2fx-tabs";
  let activeCategory = widgets.category?.value || "Photo";
  activeCategory = EFFECT_PRESET_ALIASES[activeCategory] || activeCategory;
  if (!EFFECT_CATEGORIES.includes(activeCategory)) activeCategory = "Photo";
  const grid = document.createElement("div");
  grid.className = "k2fx-grid";

  const custom = document.createElement("textarea");
  custom.className = "k2fx-custom";
  custom.placeholder = "Custom effect prompt...";
  custom.value = widgets.custom_preset?.value || "";

  const preview = document.createElement("div");
  preview.className = "k2fx-preview";

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
  hydrateEffectUiFromWidgets = () => {
    currentPreset = normalizeEffectPreset(widgets.preset?.value);
    activeCategory = EFFECT_PRESET_ALIASES[widgets.category?.value] || widgets.category?.value || "Photo";
    if (!EFFECT_CATEGORIES.includes(activeCategory)) activeCategory = "Photo";
    custom.value = widgets.custom_preset?.value || "";
    enabled.checked = widgets.enable_effect?.value !== false;
    render();
    preview.textContent = currentEffectText() || "Effect disabled or custom text is blank.";
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
    if (isCustomMode()) return custom.value || "";
    const preset = EFFECT_PRESETS.find((p) => p.name === selectedPreset());
    return preset?.text || "";
  }
  function sync() {
    setWidgetValue("enable_effect", Boolean(enabled.checked));
    setWidgetValue("category", activeCategory || "Photo");
    if (!isCustomMode()) setWidgetValue("preset", selectedPreset());
    setWidgetValue("custom_preset", custom.value || "");
    node.widgets_values = EFFECT_WIDGETS.map((n) => widgets[n]?.value ?? "");
    node.properties = node.properties || {};
    node.properties.k2cfEffectState = {
      version: "v15",
      widgets_values: node.widgets_values.slice(),
      saved_at: Date.now(),
    };
    k2cfWriteLocalState(node, "effect", node.properties.k2cfEffectState);
    custom.classList.toggle("show", isCustomMode());
    preview.textContent = currentEffectText() || "Effect disabled or custom text is blank.";
    try { app.graph?.setDirtyCanvas?.(true, true); } catch (_) {}
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
      const imgUrl = k2fxThumbnailUrl(p);
      thumb.style.backgroundImage = `url("${imgUrl}")`;
      thumb.classList.add("has-img");
      // If an image is missing, fall back to the original text/gradient card.
      const probe = new Image();
      probe.onerror = () => { thumb.style.backgroundImage = ""; thumb.classList.remove("has-img"); };
      probe.src = imgUrl;
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
  function render() { renderTabs(); renderCards(); custom.classList.toggle("show", isCustomMode()); }

  search.addEventListener("input", () => { renderCards(); });
  enabled.addEventListener("change", sync);
  sizeSlider.addEventListener("input", () => applyThumbSize(sizeSlider.value));
  custom.addEventListener("input", sync);
  custom.addEventListener("change", sync);

  wrap.append(ioRow, top, sizeBar, tabs, grid);
  const footer = document.createElement("div");
  footer.className = "k2fx-footer";
  footer.append(custom, preview);
  wrap.appendChild(footer);

  node.addDOMWidget("krea2_prompt_effect_ui", "Krea2PromptEffectUI", wrap, {
    serialize:false,
    hideOnZoom:false,
    getMinHeight:()=>260,
  });

  if (!widgets.preset?.value || widgets.preset.value === "None") setWidgetValue("preset", currentPreset);
  if (!widgets.mode?.value) setWidgetValue("mode", "Preset");
  render();
  preview.textContent = currentEffectText() || "Effect disabled or custom text is blank.";
  k2cfPersistWidgetSnapshot(node, "effect", EFFECT_WIDGETS, "v15");
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
  for (const v of ["Auto", "English", "Japanese 日本語"]) langSelect.appendChild(option(v, v));
  langSelect.value = widgets.ui_language?.value || "Auto";
  controls.ui_language = langSelect;
  const gridTop = document.createElement("select");
  gridTop.className = "k2cf-select";
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
  const width = document.createElement("input");
  width.className = "k2cf-num";
  width.type = "number";
  const height = document.createElement("input");
  height.className = "k2cf-num";
  height.type = "number";
  controls.preset = preset; controls.width = width; controls.height = height;
  function fillPresetSelect(selected) {
    preset.innerHTML = "";
    const presetGroups = [
      ["1024 x 1024", "1536 x 1536", "2048 x 2048"],
      ["1024 x 1536", "1152 x 1536", "1536 x 2048"],
      ["1536 x 1024", "1536 x 1152", "2048 x 1536"],
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
    textHeights: {},
    slotOpen: { red: true, blue: true, yellow: true, green: false, magenta: false },
    scenePreset: "",
    slotPreset: {},
    slotValues: {},
    saved_at: Date.now(),
  });
  const promptUiWidgetState = k2cfReadJsonObject(widgets.prompt_ui_data?.value);
  const promptUiCandidates = [
    node.properties?.k2cfPromptUiState,
    node.__k2cfConfiguredPromptUiState,
    promptUiWidgetState,
    k2cfReadLocalState(node, "prompt_ui"),
  ].filter((state) => k2cfPromptUiHasMeaningfulState(state));
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
      k2cfReadLocalState(node, "prompt_ui"),
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
    const changed = recordTextHeight(key, observed, allowShrink, Boolean(manual && changedByUser));
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
    applySavedTextHeight("scene", sceneText); if (typeof backgroundText !== "undefined" && backgroundText) applySavedTextHeight("background", backgroundText); applySavedTextHeight("background", backgroundText);
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

    if (window.ResizeObserver) {
      const ro = new ResizeObserver(() => {
        if (isResizeGripDrag) saveHeight(false, false, true);
      });
      ro.observe(el);
    }
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

  const backgroundText = document.createElement("textarea");
  backgroundText.className = "k2cf-text";
  backgroundText.placeholder = tr(resolveLang(promptLangSelect.value), "backgroundPlaceholder");
  backgroundText.value = widgets.background?.value || "";
  controls.background = backgroundText;
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
    sceneSave.textContent = tr(lang, "save");
    sceneLoad.textContent = tr(lang, "loadPreset");
    sceneDelete.textContent = tr(lang, "deletePreset");
    for (const item of promptCards) {
      item.promptLabel.textContent = tr(lang, "prompt");
      if (item.typeSelect) item.typeSelect.title = tr(lang, "elementType");
      if (item.typeLabel) item.typeLabel.textContent = tr(lang, "elementType");
      if (item.framingSelect) item.framingSelect.title = tr(lang, "framing");
      if (item.framingLabel) item.framingLabel.textContent = tr(lang, "framing");
      if (item.angleSelect) item.angleSelect.title = tr(lang, "angle");
      if (item.angleLabel) item.angleLabel.textContent = tr(lang, "angle");
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
      applySavedTextHeight("scene", sceneText); if (typeof backgroundText !== "undefined" && backgroundText) applySavedTextHeight("background", backgroundText); applySavedTextHeight("background", backgroundText);
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
    ta.value = widgets[promptName]?.value || "";
    controls[promptName] = ta;
    const typeSelect = document.createElement("select");
    typeSelect.className = "k2cf-type";
    typeSelect.title = tr(resolveLang(promptLangSelect.value), "elementType");
    for (const [value, text] of TYPE_OPTIONS) typeSelect.appendChild(option(value, text));
    typeSelect.value = widgets[typeName]?.value || "obj";
    controls[typeName] = typeSelect;
    const framingSelect = document.createElement("select");
    framingSelect.className = "k2cf-framing";
    framingSelect.title = tr(resolveLang(promptLangSelect.value), "framing");
    for (const value of FRAMING_OPTIONS) framingSelect.appendChild(option(value, value));
    framingSelect.value = widgets[framingName]?.value || "Auto";
    controls[framingName] = framingSelect;
    const angleSelect = document.createElement("select");
    angleSelect.className = "k2cf-framing";
    angleSelect.title = tr(resolveLang(promptLangSelect.value), "angle");
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
    typeLabel.style.minWidth = "34px";
    typeLabel.style.color = "#ddd";
    const framingRow = document.createElement("div");
    framingRow.className = "k2cf-presetbar";
    const framingLabel = document.createElement("label");
    framingLabel.textContent = "Framing";
    framingLabel.style.minWidth = "56px";
    framingLabel.style.color = "#ddd";
    const angleRow = document.createElement("div");
    angleRow.className = "k2cf-presetbar";
    const angleLabel = document.createElement("label");
    angleLabel.textContent = "Angle";
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
