# ШАВЕРНО — КСО для большого экрана

Self-ordering kiosk UI for a large portrait screen (**1080×1920**), rebuilt in
**Vue 3 + Vite** from the Claude Design handoff (`project/Большое КСО.dc.html`).

The canvas is a fixed 1080×1920 frame scaled to fit any viewport
(`App.vue` → `scale`), matching the kiosk target.

## Flow

Welcome / language (fullscreen looping video + 5 glass flag-spheres + ♿) →
order type (Здесь / С собой) → menu (video banner, category rail, product grid,
sticky cart, floating cart balls, bottom toolbar) → product detail (size
segmented control, required "Мясо" group, add-ons, inline upsell) → combo
builder (preview row + surcharge) → cart (order-type, bonuses, sticky upsell) →
payment (cash / card / SBP-QR + loyalty bonus slider) → confirmation (order
number + tracking QR). Plus: idle "Вы ещё с нами?" dialog, loyalty auth
(phone + OTP), light/dark themes, 5 languages (RU/EN/ZH/DE/TR), accessibility
"lower screen" mode.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/
npm run preview  # serve the built bundle
```

## Project structure

- `src/data.js` — menu, modifiers, combo, nutrition, video URLs, prices
- `src/i18n.js` — translations (5 languages)
- `src/store.js` — reactive state + all actions (ported from the prototype's `DCLogic`)
- `src/components/` — one component per screen + shared `ImageSlot`, `Flag`, `VideoBg`
- `src/main.js` — app bootstrap + `v-press` directive (press feedback)

### Images

Menu/category photos are config-driven: each item in `src/data.js` has an
optional `img` URL; when empty the UI falls back to the item's emoji. Drop in
real photo URLs (or local asset paths) to replace the placeholders.

## Deploy (GitHub Pages)

A workflow at `.github/workflows/deploy.yml` builds and deploys to GitHub Pages
on every push to `main`.

1. Create a GitHub repo and push this project.
2. Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Push to `main` (or run the workflow manually). The site URL appears in the
   Actions run / Pages settings.

`vite.config.js` uses `base: './'`, so the build works at a domain root or a
Pages project subpath without changes.
