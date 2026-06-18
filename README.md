# For Precious 🕯️

A one-page birthday site for Precious — built with React, TypeScript, Vite,
Framer Motion (scroll-linked transitions, the wax-seal letter, the candle),
and Three.js via React Three Fiber (the ambient sparkle backdrop).

## Run it locally

You'll need [Node.js](https://nodejs.org) 18 or newer.

```bash
npm install
npm run dev
```

Open the local URL it prints (usually `http://localhost:5173`). Edits to any
file hot-reload instantly.

## Add real photos

1. Drop your images into `public/photos/`.
2. Open `src/data/photos.ts` and set each entry's `src` to the filename, e.g.
   `src: '/photos/first-date.jpg'`.
3. Update the `caption`, `alt`, and optional `date` for each one. `alt` text
   should describe the photo for screen readers.
4. `size` can be `'lg' | 'md' | 'sm'` — it controls how tall that photo's
   frame is in the staggered grid. Mix sizes for the most natural layout.

Until you add a real `src`, each card shows an elegant placeholder frame, so
the page still looks intentional if you ship it before the photos are ready.

## Edit the love letter

Open `src/components/LoveLetter.tsx` — the `paragraphs` array near the top
holds the letter body, and the salutation/signature are in the JSX just
below it. Nothing else needs to change; the envelope and layout adapt
automatically to longer or shorter text.

## Customize the look

All colors, fonts, and spacing are defined as CSS variables at the top of
`src/index.css`:

- `--ink`, `--ink-deep`, `--oxblood`, `--plum` — the background palette
- `--gold`, `--gold-bright`, `--rose` — accents
- `--parchment`, `--parchment-dim` — text colors
- `--font-display` (Cormorant), `--font-body` (Lora), `--font-script` (Italianno)

Change a value once here and it updates everywhere. Fonts are loaded from
Google Fonts in `index.html` if you want to swap them for something else.

## Build & deploy

```bash
npm run build
```

This outputs a static `dist/` folder you can deploy anywhere — the quickest
options are dragging the folder into [Netlify Drop](https://app.netlify.com/drop),
or running `npx vercel` from this directory.

## A note on performance

The sparkle background automatically turns itself off if the visitor's
device has "reduce motion" enabled in their OS accessibility settings — that
check is in `src/components/Background.tsx` if you ever want to adjust it.
