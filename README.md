# Okhai Pharma — React (JSX) project

Standalone Vite + React 19 + Tailwind v4 + Framer Motion project.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Build

```bash
npm run build
npm run preview
```

## Stack

- React 19 (plain JSX, no TypeScript)
- Vite 7
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- Framer Motion (animations)
- @fontsource/fraunces + inter (self-hosted fonts)

## Structure

```
src/
  main.jsx              entry
  App.jsx               root
  styles.css            design tokens (Clinical Mint palette) + Tailwind
  components/
    Home.jsx            full one-page site (Nav, Hero, About, Products,
                        Process, Quality, Leadership, Contact, Footer)
    animated-bg.jsx     reusable animated backgrounds:
                        MeshBlobs, DotGrid, GridLines, FloatingLeaves,
                        SweepBeam, Particles
  assets/               hero & content imagery
```

All colors are semantic tokens in `styles.css`. Edit `--primary`, `--gold`,
`--background`, etc. there to re-theme the site globally.
