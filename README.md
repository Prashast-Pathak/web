# AM Analytics — Landing Page

A production-grade, multi-file landing page with **layered parallax 3D scene**.

## 📁 Project Structure

```
am-analytics/
├── index.html              ← Main page (entry point)
│
├── css/
│   ├── variables.css       ← Design tokens (colors, fonts, spacing)
│   ├── reset.css           ← CSS reset + base styles + reveal classes
│   ├── nav.css             ← Navigation (sticky, scrolled state, mobile)
│   ├── hero.css            ← Hero section + parallax layers
│   ├── sections.css        ← All content sections below hero
│   └── footer.css          ← Footer styles
│
├── js/
│   ├── parallax.js         ← Scroll + mouse-driven layer parallax
│   ├── nav.js              ← Nav scroll behavior + mobile menu
│   └── animations.js       ← Scroll reveal, counters, chart bars
│
└── assets/
    └── images/
        ├── sky.png          ← Layer 1: Purple sky/clouds (background)
        ├── forest.png       ← Layer 2: Dark forest silhouette (middle)
        └── mountains.png    ← Layer 3: Red mountains (foreground)
```

## 🎨 Design System

| Token | Value |
|-------|-------|
| Primary Font | Playfair Display (serif, display) |
| Body Font    | DM Sans |
| Mono Font    | DM Mono |
| Accent Color | `#f0a020` (gold) |
| Background   | `#1a1040` (deep purple/navy) |

## 🔧 How the Parallax Works

Three PNG images are stacked as `position: absolute` layers inside `.parallax-scene`:

| Layer | File | Speed | Blend Mode |
|-------|------|-------|------------|
| Sky (bg)     | sky.png       | slowest (0.08×)  | normal |
| Forest (mid) | forest.png    | medium (0.22×)   | multiply ← removes white bg |
| Mountains    | mountains.png | fastest (0.42×)  | multiply ← removes white bg |

`mix-blend-mode: multiply` makes white backgrounds **transparent** so layers blend naturally.

Mouse movement adds subtle left/right drift to each layer at different intensities.

## 🚀 How to Run

Just open `index.html` in any modern browser — no build step required.

For best results, serve from a local server:
```bash
# Python
python3 -m http.server 8080

# Node
npx serve .
```

Then visit: `http://localhost:8080`

## ✏️ Customization

- **Colors**: Edit `css/variables.css` — all colors are CSS custom properties
- **Content**: Edit `index.html` — all copy is clearly labelled with comments
- **Parallax speed**: Edit `js/parallax.js` → `LAYERS` array → `speedY` values
- **Sections**: Add/remove sections in `index.html` + `css/sections.css`
