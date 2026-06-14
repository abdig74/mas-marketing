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
  media/clips/        §1 Clips & Photos (hero-reel, vertical-clip, photo-1/2, campaign-film, still-1/2)
  media/about/        §2 Who (who-photo)
  media/divisions/    §4 Divisions (div-marketing, div-fam, div-ai, div-distro)
  work/               Selected Work tile images (per projects[] entry)
  work/cases/         case-study gallery media (phase 2)
content.slots.json    asset manifest — source of truth for what-goes-where
```

## Brand tokens (do not drift)
- Red `#FA1A0A` · Midnight `#070b18` · Off-white `#f4f1ea`
- Fonts: Archivo (display/body), Fraunces (italic accents), Space Mono (labels)
- Keep all animations intact: pinned horizontal divisions, FLIP filtering,
  scroll-linked manifesto, parallax tiles, scale-from-card case overlay, custom cursor.

## How to place media (follow content.slots.json)

### 1. Static slots (sections 1, 2, 4) — via the MEDIA config (no HTML edits)
The placeholders (`<div class="ph" data-slot="NAME">`) are hydrated from the `MEDIA`
object near the top of `js/main.js`. **You don't touch the HTML.** Just set the `src`
(and `poster` for videos) for the matching slot key:
```js
'hero-reel': {type:'video', src:'assets/media/clips/reel.mp4', poster:'assets/media/clips/reel.jpg'},
'who-photo': {type:'image', src:'assets/media/about/team.webp'},
```
`hydrateSlots()` runs on load and swaps the placeholder for a `.slot-fill` `<img>`/`<video>`.
Rules:
- Empty `src` ⇒ the placeholder stays (safe default).
- A bad/missing path ⇒ `onerror` removes the media and the placeholder shows again — never a broken icon.
- The `.slot-fill` + `.ph:has(.slot-fill)` CSS (already in styles.css) handles cover-fit, inherited
  radius, and hides the placeholder chrome (icon/label/dims/grid).
- Drop files in the folder noted per slot: `media/clips/` (§1), `media/about/` (§2), `media/divisions/` (§4).

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
The `#send` handler in main.js POSTs JSON `{name,email,need,message}` to **Formspree**.
**To activate:** create a form at formspree.io and replace `REPLACE_ID` in the
`https://formspree.io/f/REPLACE_ID` URL with your form id. Field ids are `f-name`,
`f-email`, `f-div`, `f-msg`; only email + message are required. The button text
reflects sending / success / error state.

## Deploy
- **Cloudflare Pages**: `npx wrangler pages deploy .`
- **Netlify**: `netlify deploy --prod` (or drag the folder to app.netlify.com/drop)
No build command. Output dir is the folder root.
