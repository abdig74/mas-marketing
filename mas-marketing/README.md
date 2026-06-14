# MAS Marketing — Website

Single-page agency site. Static HTML/CSS/JS, **no build step**.

## Run locally
Open `index.html`, or serve the folder:
```
npx serve .        # or: python3 -m http.server
```

## Deploy
Pick one (both allow commercial use; neither needs a build command — serve folder root):

**Cloudflare Pages** — recommended (unlimited bandwidth, fastest global edge, no surprise bills)
```
npx wrangler pages deploy .
```
Or: Cloudflare dashboard → Pages → connect this repo, build command = none, output = /.

**Netlify** — easiest handoff + free built-in form handling
```
npx netlify deploy --prod
```
Or drag this folder onto https://app.netlify.com/drop

Then add the custom domain + (auto) SSL in the host dashboard.

## Client handoff checklist
- [ ] Domain registered in the **client's** name at their registrar
- [ ] Site deployed under an account the **client owns** (you added as collaborator), so they keep it if they leave
- [ ] Contact form switched off `mailto:` to Netlify Forms / Formspree (see CLAUDE.md) + real inbox set
- [ ] `assets/og-image.png` reviewed (1200x630 share card — swap for a custom one if desired)
- [ ] Analytics added (Cloudflare Web Analytics is free + cookie-banner-free)

## Adding photos & clips
See **content.slots.json** (what goes where) and **CLAUDE.md** (how to wire it).
Drop tile images in `assets/work/`, section media in `assets/media/`, then either
edit by hand per CLAUDE.md or point Claude Code at this folder — the manifest is its task list.

## Still to replace (placeholders)
- All media slots (labeled with ratios in the UI and in content.slots.json)
- Portfolio copy + metrics in `js/main.js` (`projects[]`) — currently template text
- `hello@masmarketing.com` contact address
