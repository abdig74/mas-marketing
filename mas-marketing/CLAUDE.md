# MAS Marketing — Site Guide (for Claude Code)

Single-page marketing site. **Vanilla HTML/CSS/JS, no build step, no framework.**
Open `index.html` directly or deploy the folder as-is.

## Structure
```
index.html            markup + slot IDs (data-slot="...")
css/styles.css        all styles (CSS variables at top)
js/main.js            scroll engine, portfolio, case overlay, marquee, form
assets/
  logo-mas.png        MM mark (used in nav, hero, footer, favicon)
  og-image.png        1200x630 social share card
  clients/*.png       real client logos (trusted-by marquee) — DO NOT recolor
  work/               <- drop portfolio tile images here
  media/              <- drop section clips/photos here
content.slots.json    asset manifest — source of truth for what-goes-where
```

## Brand tokens (do not drift)
- Red `#FA1A0A` · Midnight `#070b18` · Off-white `#f4f1ea`
- Fonts: Archivo (display/body), Fraunces (italic accents), Space Mono (labels)
- Keep all animations intact: pinned horizontal divisions, FLIP filtering,
  scroll-linked manifesto, parallax tiles, scale-from-card case overlay, custom cursor.

## How to place media (follow content.slots.json)

### 1. Static slots (sections 1, 2, 4)
Each placeholder is `<div class="ph" data-slot="NAME" ...>`. Find by `data-slot` and
replace the WHOLE `.ph` div with real media, keeping the grid class it sat in:
- **image slot** → `<img class="slot-fill" src="assets/media/FILE.webp" alt="...">`
- **video slot** → `<video class="slot-fill" src="assets/media/FILE.mp4" autoplay muted loop playsinline poster="assets/media/FILE.jpg"></video>`
Add this once to css/styles.css so fills cover correctly:
```css
.slot-fill{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;border-radius:inherit}
.ph:has(.slot-fill){border:none}
```
Wrap fill + keep the existing tile/box if it provides border-radius; or apply radius on the media.

### 2. Portfolio tiles (section 3)
In `js/main.js`, the `projects[]` array drives the grid. Add `img:'assets/work/FILE.webp'`
to the matching project (by `client`). The ghost letter auto-hides and the image
parallaxes. Example: `{client:'Disney+', img:'assets/work/disney.webp', logo:'disney', ...}`.

### 3. Case-study overlay (phase 2, optional)
`buildCase()` generates hero + gallery placeholders via `phHTML()`. To use real media,
add a `media` field per project: `media:{hero:'...', wide:'...', still:'...', clip:'...'}`
and have `buildCase` emit `<img>/<video>` when present instead of the `.ph` placeholder.

## Image prep
- Convert to **webp** (photos) / **mp4 h.264** (video, muted, ~1080p, short loops).
- Tiles ~1200px wide; hero/campaign ~1920px; squares ~900px. Compress.
- If a cover crop is off-center, set `style="object-position:50% 30%"` on the media.
- Never recolor client logos in `assets/clients/`.

## Contact form
Currently a `mailto:` (see `#send` handler in main.js). To switch:
- **Netlify Forms**: add `data-netlify="true"` + a hidden `form-name`, wrap fields in a real `<form>`.
- **Formspree**: POST fields to `https://formspree.io/f/XXXX`.
Update the `hello@masmarketing.com` address regardless.

## Deploy
- **Cloudflare Pages**: `npx wrangler pages deploy .`
- **Netlify**: `netlify deploy --prod` (or drag the folder to app.netlify.com/drop)
No build command. Output dir is the folder root.
