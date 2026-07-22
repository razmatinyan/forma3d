# Forma 3D

Trilingual landing site for a 3D modeling school in Yerevan. Nuxt 4, Vue 3, Tailwind v4.

## Setup

```bash
npm install
npm run dev        # http://localhost:3000
```

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build. Do not run while `dev` is up, they share a build directory. |
| `npm run preview` | Serve the production build |
| `npm run check` | Project conventions: dashes, uppercase, locale parity, punctuation |

## Locales

Armenian at `/` (default, unprefixed), Russian at `/ru`, English at `/en`. Every user-facing string lives in `i18n/locales/`, in all three files.

## Before deploying

`app/data/site.ts` holds placeholder business data. Phone, email, Instagram, address, price, schedule, and start date are invented. Replace them, and add `public/og-image.jpg` at 1200x630.

The email provider is set to `console` in `nuxt.config.ts`, so the registration form captures nothing until it is switched to Resend with a verified sending domain.

## Documentation

| File | Contents |
| --- | --- |
| [`AGENTS.md`](AGENTS.md) | Start here, for AI agents and new contributors |
| [`RULES.md`](RULES.md) | Hard rules, enforced by `npm run check` |
| [`DESIGN.md`](DESIGN.md) | The UI contract |
| [`docs/architecture.md`](docs/architecture.md) | Where everything lives |
| [`docs/workflows.md`](docs/workflows.md) | Recipes for routine tasks |
| [`docs/i18n.md`](docs/i18n.md) | Translation rules and traps |
| [`docs/gotchas.md`](docs/gotchas.md) | Debugging notes that cost real time |
