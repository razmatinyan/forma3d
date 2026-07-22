# Nuxt

Nuxt 4.4, Vue 3.5, Nitro. Conventions and behaviour specific to this project.

## srcDir is `app/`

Nuxt 4 moved the application into `app/`. Only these sit at the repo root:

```
nuxt.config.ts  i18n/  server/  shared/  public/  stubs/  scripts/  docs/
```

`~/` and `@/` resolve to `app/`. `~~/` and `@@/` resolve to the repo root, which is how `nitro.alias` points at `~~/stubs/nodemailer.mjs`.

## What is auto-imported and what is not

**Auto-imported, never import these:**
- Vue reactivity: `ref`, `computed`, `watch`, `onMounted`, `onBeforeUnmount`
- Nuxt composables: `useState`, `useHead`, `useSeoMeta`, `useRoute`, `useRouter`, `createError`, `useRuntimeConfig`
- i18n: `useI18n`, `useLocalePath`, `useSwitchLocalePath`, `useLocaleHead`
- Everything in `app/composables/`: `useGSAP`, `useJsonLd`, `useLocaleDate`, `useLocaleNumber`
- Every component under `app/components/`

**Must be imported explicitly:**
- `app/data/*` &rarr; `import { courses } from '~/data/course'`
- `app/types/*` &rarr; `import type { LocaleCode } from '~/types/i18n'`
- `shared/*` &rarr; `import { registrationSchema } from '#shared/registration'`
- Third-party: `reka-ui`, `@vueuse/core`, `gsap/*`, `@/lib/utils`

`app/data/` is deliberately not auto-imported. Data is structural and an explicit import makes the dependency visible at the top of the file.

## Component naming

`nuxt.config.ts` sets:

```ts
components: [{ path: '~/components/common', pathPrefix: false }, '~/components']
```

That single line is why naming differs by directory:

| File | Tag |
| --- | --- |
| `components/common/MetricCard.vue` | `<MetricCard>` (pathPrefix disabled) |
| `components/site/SiteHeader.vue` | `<SiteHeader>` (directory and file share a segment) |
| `components/section/SectionHero.vue` | `<SectionHero>` (same) |
| `components/form/RegistrationForm.vue` | `<FormRegistrationForm>` (prefixed) |
| `components/ui/select/SelectTrigger.vue` | `<SelectTrigger>` (shadcn config) |

If a new component resolves to an unexpected tag, this is why.

## The `shared/` directory

Nuxt 4 feature. Code in `shared/` is importable from **both** the Vue app and Nitro server routes via the `#shared/` alias.

`shared/registration.ts` holds the zod schema used by the form and by `/api/register`, so client and server validation cannot drift. `shared/emailCopy.ts` holds per-locale email strings, because `useI18n()` does not exist inside a Nitro handler.

Keep `shared/` free of anything browser-only or Nitro-only.

## SSR and hydration

The server render and the first client render must produce identical markup. Things that broke it here:

- **`Intl` in a `computed()`** resolved different locales on each side. Use `useLocaleFormat.ts`, which serializes the server result into the payload.
- **Multi-line inline `style` attributes** normalize differently. Put gradients and shadows in `@layer components`.
- **Reading `matchMedia` during setup.** If a value must depend on viewport, start it `false` and set it in `onMounted`, so the first client render matches the server.

`useState` is the tool for any value that must be computed once on the server and reused on the client.

## Pages and routing

- `app/pages/index.vue` &rarr; `/`
- `app/pages/courses/[slug].vue` &rarr; `/courses/:slug`, param via `useRoute().params.slug`
- `app/pages/privacy.vue` &rarr; `/privacy`

i18n wraps all of these: Armenian unprefixed, `/ru` and `/en` prefixed. Always build internal links with `localePath()`.

Unknown course slugs throw a real 404:

```ts
if (!course.value) {
  throw createError({ statusCode: 404, statusMessage: 'Course not found', fatal: true })
}
```

**Creating a new directory under `app/pages/` requires a dev server restart.** The route will 404 until then even though the file exists.

## Server routes

`server/api/register.post.ts` is a Nitro handler. Available there: `defineEventHandler`, `readBody`, `getRequestIP`, `createError`, and `useEmail()` from the email module. **Not** available: `useI18n`, anything from `app/`, or browser globals.

Return errors with `createError({ statusCode, statusMessage })`. The handler uses 400 for validation, 422 for honeypot hits, 429 for rate limiting, and 502 when the admin notification fails.

## Plugins

`app/plugins/scroll-refresh.client.ts`. The `.client` suffix means it never runs on the server, which is required because it touches `document.fonts`.

## Modules

| Module | Provides |
| --- | --- |
| `@nuxtjs/i18n` | Locale routing, `useI18n`, `localePath`, `useLocaleHead` |
| `@nuxt/fonts` | Self-hosts Manrope and Noto Sans Armenian, downloaded at build |
| `@nuxt/icon` | `<Icon name="collection:name" />` |
| `shadcn-nuxt` | Registers `app/components/ui` |
| `@razmatinyan/nuxt-email` | `useEmail()` in server routes, Vue email templates |

Only the `solar` icon collection is installed locally. `simple-icons` and `circle-flags` resolve through the Iconify API at build time, so the build has a network dependency. Verify an icon name exists before using it.

## Head and SEO

`app/app.vue` applies `useLocaleHead()` for `lang`, hreflang alternates, and canonical. Pages add their own `useSeoMeta()`. Structured data goes through `useJsonLd()` on the home page and an inline `useHead` script block on course pages.

`useSeoMeta` values are passed as getters so they react to locale changes:

```ts
useSeoMeta({ title: () => t('meta.title') })
```

## Build

```bash
npm run dev            # do not run build while this is up, they share a build dir
npm run build
npm run preview
```

Local builds use the `node-server` preset. To reproduce another platform:

```bash
NITRO_PRESET=cloudflare-module npm run build
```

Presets differ in ways that matter. `cloudflare-module` forbids externals, which is why `stubs/nodemailer.mjs` exists. The project currently deploys to Vercel.

After changing `nuxt.config.ts` or `package.json` the dev server does a full restart, and the first request afterwards recompiles everything. A slow or failing request during that window is not necessarily a defect.
