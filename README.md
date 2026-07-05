# Mohammed Irfan — Interactive Neo-Brutalist Portfolio

🔗 **Live Site:** https://irf4n.vercel.app/

A high-fidelity developer portfolio showcasing backend engineering expertise, custom liquid animations, and interactive mapping — built with a bold neo-brutalist visual identity.

---

## Overview

This is an interactive, responsive developer portfolio built to showcase my project work, professional experience, and technical skills. It combines a hand-drawn, sticker-style neo-brutalist aesthetic with functional details like an interactive map, custom canvas animations, and a fully theme-aware dark mode.

The entire site was built in about **24 hours** as a focused sprint project. I'm a Computer Science Engineering graduate from Coimbatore, Tamil Nadu, currently job-hunting and actively learning new skills — this portfolio is both a personal showcase and a hands-on exercise in frontend design and animation work outside my usual backend-focused comfort zone.

**A note on how this was built:** This project was not built entirely from scratch by me alone. I used AI assistance (Claude) throughout the process to help design, debug, and refine the site, and I drew visual and structural inspiration from other developer portfolios I came across online. The core ideas, content, personal branding, and final decisions are mine, but I want to be transparent that this was a collaborative, reference-driven build rather than a 100% solo, from-first-principles design.

---

## Design & Theme

### Aesthetic
**Neo-brutalist**, characterized by:
- Bold black outlines on every card, button, and container
- Hard-edged offset shadows (no blur) — giving cards a stacked, sticker-like depth
- Flat, saturated color-block sections instead of gradients or soft shading
- Playful hand-drawn accents (like the cursive "Creator of" label and doodle arrows) mixed with a monospace/technical font for structure

### Color Scheme

**Light Mode (default on load):**
| Element | Color |
|---|---|
| Background | White / light grid-paper texture |
| Text | Black |
| Primary accent | Mint green (`#7FE8C0`-ish) |
| Secondary accents | Yellow, pink, sky blue (used for keyword highlights) |
| Borders | Solid black |

**Dark Mode (toggled via the ink-spill animation):**
| Element | Color |
|---|---|
| Background | Near-black (`#0d0d0d` – `#1a1a1a`) |
| Text | White / off-white |
| Primary accent | Mint green (kept consistent with light mode for brand continuity) |
| Section fills | Bold solid yellow / pink / mint blocks (Architecture, Methodologies, project cards) with **black text** on top for contrast |
| Shadows | Offset dark-gray or color-matched darker shade of each card's accent, instead of pure black (so shadows stay visible against the dark background) |
| Borders | Solid black or off-white, depending on the card's fill color |

The rule followed throughout: **light text on dark backgrounds, dark text on bright color-fill cards** — never the reverse, to keep every section readable.

### Typography
A monospace/technical font is used for tags, badges, and section labels (reinforcing the "engineering" feel), paired with a bold sans-serif for headings and a clean sans-serif for body copy.

---

## Features

- **Smart Sticky Navigation** — Top navbar with smooth scrolling and precise scroll-offset alignment, so clicking any nav item (About, Journey, Skills, AgriTwin, Travel-X) lands exactly on the right section. The navbar hides on scroll-down and reappears immediately on scroll-up, from anywhere on the page.
- **Ink Spill Dark Mode Toggle** — A canvas-based, hand-crafted animation resembling an ink bottle tipping over and spilling, with the ink organically spreading across the screen to transition between light and dark themes. Respects `prefers-reduced-motion` for accessibility.
- **Skills Grid with Interactive Icons** — Custom inline SVG icons for each skill category (Frontend, Backend, Languages, Cloud & DevOps, Databases, Tools & More, Architecture, Methodologies), each with a subtle hover-triggered micro-animation.
- **Interactive Mapping** — A Leaflet-powered map with custom markers showing my education (KGiSL Institute of Technology) and internship locations (Fnext Solutions, Vulture Lines Tech Management), styled with a pirate-map illustration theme for the "My Journey" section.
- **Tiled Canvas Background** — A subtle, repeating paper-grain texture overlay across the site for tactile visual depth.
- **Fully Responsive Layout** — Built to work across desktop and mobile viewports.

---

## Images Used

| Image | Purpose |
|---|---|
| Profile photo / avatar illustration | Hero section — stylized illustrated avatar of me |
| Pirate map illustration (clean) | Background artwork for the "My Journey" interactive map section |
| Skill icons | Small inline SVGs representing each technology/skill tag |
| Social icons | GitHub, LinkedIn icons in the header/footer |
| AgriTwin preview | Project card thumbnail for the AgriTwin section |
| Travel-X preview | Project card thumbnail for the Travel-X section |
| Favicon | Custom "MI" monogram icon used as the browser tab icon |

All images are organized under `assets/images/` in dedicated subfolders (see Folder Structure below).

---

## Tech Stack

- **Libraries:** Leaflet.js (interactive map), Font Awesome & Devicon (brand/tech logos)
- **Styling:** Vanilla CSS3 (no framework — custom neo-brutalist design system built from scratch)
- **Logic:** Vanilla JavaScript (ES6+), Canvas 2D Context (for the ink-spill animation)
- **Fonts:** Custom web fonts (see `assets/fonts/`)

No build tools or frameworks — this is a static HTML/CSS/JS site by design, so it runs anywhere without a bundler.

---

## Folder Structure

```
portfolio/
├── index.html
├── assets/
│   ├── images/
│   │   ├── profile/       (profile photo, avatar illustration, pirate map artwork, etc.)
│   │   ├── icons/         (skill icons, social icons)
│   │   └── projects/      (AgriTwin and Travel-X preview images)
│   └── fonts/             (custom fonts)
├── css/
│   └── styles.css         (core styling rules)
├── js/
│   └── script.js          (routing offsets, map settings, and canvas ink-spill animation)
├── favicon.png             (browser favicon logo source)
├── README.md
└── .gitignore
```

---

## Running Locally

1. Clone this repository:
   ```bash
   git clone https://github.com/Irf4n8/Main-Portfolio.git
   ```
2. Open `index.html` directly in any web browser (`file:///` protocol), or serve it locally using an editor extension like VS Code's **Live Server** for the best experience (recommended, since some browsers restrict local file access for canvas/fetch operations).

---

## Deployment

- **Live URL:** *[Pending Deployment — will be added once hosted]*

---

## About Me

I'm a Computer Science Engineering graduate from Coimbatore, Tamil Nadu, currently seeking full-stack and backend engineering roles while continuously picking up new skills. This portfolio reflects both my technical background and my willingness to step outside my comfort zone to learn frontend design and animation work.

- **GitHub:** [Irf4n8](https://github.com/Irf4n8)
- **LinkedIn:** *[Add your LinkedIn link]*
- **Email:** mohammedirfan24082004@gmail.com
