# AGENTS.md

Entry point for AI agents working on **Forma 3D**, a trilingual course landing site for a 3D modeling school in Yerevan.

Read this file first. It tells you where everything else is.

## Read before touching anything

| File | When |
| --- | --- |
| `RULES.md` | Always. Hard rules that fail review if broken. |
| `DESIGN.md` | Before any visual change. The UI contract. |
| `docs/architecture.md` | Before adding or moving files. |
| `docs/nuxt.md` | Nuxt 4 specifics: auto-imports, naming, SSR, server routes. |
| `docs/workflows.md` | Before a routine task. Recipes for the common ones. |
| `docs/i18n.md` | Before touching any user-facing string. |
| `docs/gotchas.md` | When something behaves strangely. Every entry cost real debugging time. |

## What this project is

An offline 3D modeling school with one course enrolling and two announced. The site's single job is turning visitors into registrations.

- **Stack:** Nuxt 4, Vue 3, Tailwind v4, shadcn-vue (reka-ui), GSAP, `@nuxtjs/i18n` v10
- **Locales:** Armenian (default, unprefixed), Russian (`/ru`), English (`/en`)
- **Deploy:** Vercel
- **Email:** `@razmatinyan/nuxt-email`, currently the `console` provider

## The three rules that matter most

1. **Every user-facing string lives in all three locale files.** Never hardcode text in a component. Parity is checked, not assumed.
2. **`DESIGN.md` is binding.** If a change contradicts it, update `DESIGN.md` in the same commit rather than diverging silently.
3. **Placeholder data in `app/data/site.ts` is fake.** Phone, email, address, price, and dates are invented. Do not present them as real.

## Before you finish

Run `npm run check`. It verifies dashes, uppercase, locale parity, and terminal punctuation. Then confirm the page still renders in all three languages.
