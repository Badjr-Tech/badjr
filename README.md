# BaDjR Tech — Website

## Stack
- React 18 + Vite
- Zero external UI dependencies
- Mobile-responsive (hamburger nav, stacking layouts)
- Fonts: Caveat Brush (logo), DM Serif Display (headings), DM Sans (body)

## Development
```bash
npm install
npm run dev
```

## Deploy to Vercel
### Option A — CLI
```bash
npm i -g vercel
vercel
```
### Option B — GitHub
1. Push this folder to a GitHub repo
2. Go to vercel.com → New Project → Import repo
3. Vercel auto-detects Vite — click Deploy

## TODO (before launch)
- [ ] Replace placeholder projects in `src/App.jsx` (search `// TODO`)
- [ ] Add Alexander Backfish bio in TEAM array
- [ ] Add real location if not fully remote
- [ ] Hook up contact form to a backend (Formspree, Resend, etc.)
