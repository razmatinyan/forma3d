# Gotchas

Every entry here cost real debugging time. Check this file when something behaves strangely.

## Building breaks a running dev server

`npm run build` writes to `node_modules/.cache/nuxt/.nuxt`, the same directory the dev server uses. Running a build while dev is up pulls the floor out from under it and localhost stops responding.

Check port 3000 before building. On Windows:

```powershell
Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue
```

## A local build does not reproduce the deploy

Locally Nitro uses the `node-server` preset, which permits externals. Cloudflare's `cloudflare-module` preset forbids them, which is why `nodemailer` resolution failed there and passed locally. To reproduce a platform build, set the preset explicitly:

```bash
NITRO_PRESET=cloudflare-module npm run build
```

`stubs/nodemailer.mjs` exists for this. `nodemailer` is an optional peer of `@razmatinyan/nuxt-email` that cannot work on Workers anyway, since it needs raw TCP sockets.

## New pages directories need a dev restart

Creating `app/pages/courses/` did not register the route until the dev server restarted. Every course URL 404ed while the file sat on disk. If a new route 404s and the file exists, restart before debugging further.

## Animations that silently never run

`gsap.matchMedia()` only invokes its callback when at least one query **matches**. `motion()` originally passed only `(prefers-reduced-motion: reduce)`, so on a normal machine nothing matched and every animation was skipped with no error.

`motion()` now injects an always-true `all: 'all'` key. Do not remove it.

This class of bug passes build, typecheck, and SSR checks cleanly. Only looking at the page catches it.

## Overlay animations that never run

reka-ui emits `data-state="open"`, not `data-open`. Tailwind v4 compiles `data-open:` to an attribute-presence selector that never matches. Use `data-[state=open]:` and `data-[state=closed]:`.

The shadcn CLI generated the wrong form for Sheet, so the mobile drawer was silently static too.

## Hydration mismatches from Intl

`Intl.DateTimeFormat` inside a `computed()` runs on both server and client and can resolve different locales, replacing Armenian dates with English ones during hydration. Use `useLocaleFormat.ts`.

## Hydration mismatches from multi-line inline styles

A `style="..."` attribute spanning several lines carries newlines and tabs that server and client normalize differently. Vue compares the strings verbatim and reports a mismatch even though the computed styles are identical.

Put gradients and inset shadows in `@layer components` in `app/assets/css/tailwind.css`. `DESIGN.md` requires this anyway.

## Card reveals break the grid

Animating a card moves its borders, and the borders are what make a section read as one machined panel. Animate `> *` so the contents arrive inside a stable frame.

## `ref` on a component is not a DOM node

`ref="root"` on `<FrameSection>` gives the component instance, so `root.value.querySelectorAll` throws at runtime while typechecking fine. Put the ref on a plain `div`.

## Capitalized components are not void elements

`<input>` needs no closing tag. `<Input>` is a Vue component and does: write `<Input ... />`. Writing `<Input ... >` produces "Element is missing end tag", which the IDE catches before any build does.

## Bash mangles Vue template literals

Writing Vue files through `node -e "..."` in bash corrupts `${...}` inside template literals: the shell expands them first and you get `{{ t() }}` with the argument silently gone.

Write a `.mjs` script to a file and run it, or use the editing tools directly.

## Armenian punctuation is not ASCII

The Armenian full stop is `։` (U+0589), not `.`. A regex checking for `.` skips Armenian entirely and produces inconsistent punctuation across locales.

## i18n v10 renamed `iso` to `language`

Using the old `iso` key means no `lang` attribute on `<html>`, no hreflang alternates, and no canonical. It fails silently. `baseUrl` must also be set or alternate links cannot be built.

## Icons are not all local

Only the `solar` collection is installed locally. `simple-icons` and `circle-flags` resolve through the Iconify API at build time. Verify a name exists before using it, and be aware this adds a network dependency to the build.
