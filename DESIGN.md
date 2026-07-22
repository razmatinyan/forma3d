# Forma 3D Design System

## Overview

Forma3D is a **technical instrument console** rendered as a marketing surface. The base atmosphere is near-black (`--color-ink` — #070707) overlaid with a 3rem diagonal hairline grid and two soft radial glows — the page reads as a calibrated measuring device, not a dark-mode SaaS page.

Everything lives inside **frame sections**: bordered rectangles with 1px `border-white/10` edges, an inset gradient surface, and four L-shaped corner brackets. The frame is the system's single strongest signature. Content is never loose on the canvas; it is always mounted inside a frame, and frames stack vertically with a uniform 24px gutter.

Brand voltage comes from **indigo** (`--primary` — #818cf8), used with deliberate scarcity: the hero headline's gradient word, status dots, focus rings, the hero frame's corner brackets, and glow shadows. Everything else is a zinc grayscale. There is no second chromatic accent.

Depth is **physical, not floated**. Surfaces use inset top-highlight / bottom-shadow pairs (`--shadow-bezel`, `--shadow-panel`) that simulate machined metal edges rather than drop shadows suggesting elevation above a page. Buttons look pressed into the surface, not resting on it.

Type is a **single family, Manrope**, with hierarchy carried entirely by size, weight, and tracking. The signature typographic move is the **wide-tracked micro-label**: `text-xs font-medium tracking-widest` in zinc-500, used for every eyebrow, stat label, and button. It appears more than 15 times across the system and does more identity work than the headlines.

**Key Characteristics:**

- Near-black canvas (`--color-ink` — #070707) with a fixed three-layer background: a 135° 1px white-3.5% diagonal grid at 3rem, plus radial glows at 20%/10% and 80%/0%.
- `border-white/10` is the universal structural line — 24 usages, more than any other class. Every frame, divider, card edge, and grid cell uses it. Deviating from it fractures the system.
- Frame sections have **zero border radius**. Sharpness at the container level is intentional; radius appears only on inner controls.
- Indigo `#818cf8` is the only chromatic accent, used scarcely.
- Single font family (Manrope). No display face, no serif, no mono.
- Wide-tracked `tracking-widest` micro-labels in zinc-500 are the dominant type texture. Sentence case, never uppercase.
- Inset bezel shadows over drop shadows. Depth reads as machined hardware.
- A fixed decorative backdrop (noise, grid, top glow) sits behind all content via `SiteBackdrop`.

## Colors

### Brand & Accent

- **Indigo / Primary** (`--primary`, `--ring` — #818cf8): The single brand accent. Hero headline gradient origin, status dots, focus rings, hero corner brackets, glow shadows (`shadow-[0_0_1rem_rgba(129,140,248,0.65)]`).
- **Indigo Light** (#c7d2fe — `indigo-200`): The terminal stop of the hero headline gradient (`linear-gradient(to right, #818cf8, #c7d2fe)`). Not used elsewhere.
Indigo is the **only** chromatic accent. The source template carried a warm gold (#e8c382) and umber pairing; both were removed — a warm accent fights the cold instrument aesthetic, and they had decayed to a single scrollbar-hover rule. Text selection and scrollbar hover now use indigo.

### Surface

Surfaces are **gradient recipes, not flat fills**. Use the `@layer components` classes; never re-declare these gradients inline.

- **`.surface-hero`** — `linear-gradient(180deg, rgba(39,39,42,.72), rgba(10,10,10,.88))` + `--shadow-hero`. The hero frame only.
- **`.surface-panel`** — `linear-gradient(180deg, rgba(24,24,27,.86), rgba(10,10,10,.92))` + `--shadow-panel`. The default frame surface. Every non-hero section.
- **`.surface-deep`** — `linear-gradient(to bottom, rgba(24,24,27,.92), rgba(0,0,0,.68))` + `--shadow-deep`. Floating label pills over the hero visual.
- **`.surface-soft`** — `linear-gradient(180deg, rgba(24,24,27,.4), rgba(10,10,10,.6))` + `--shadow-soft`. The lightest frame variant.
- **`.bezel`** — Raised control fill for pills and small chips.
- **`.bezel-strong`** — Higher-contrast bezel with a text shadow, for emphasized controls.
- **Card** (`--card` — #18181b): shadcn surface token. Used by Sheet and Popover only.
- **Border** (`--border`, `--input` — `rgba(255,255,255,0.1)`): Expressed in markup as `border-white/10`. The structural hairline.

Border emphasis ladder: `border-white/5` (barely there) → **`border-white/10` (default)** → `border-white/15` → `border-white/20` (solid button edge) → `border-white/25` (ghost button hover).

### Text

- **White** (#ffffff): All headings (h1, h2) and emphasized values. 22 usages.
- **Zinc 200** (#e4e4e7): Numeric badge glyphs, emphasized inline values.
- **Zinc 300** (#d4d4d8): Micro-label text on dark panels, ghost button label, icons.
- **Zinc 400** (#a1a1aa): Default body and description text.
- **Zinc 500** (#71717a): Captions, eyebrows, stat labels, fine print. The most common text tone after white.
- **Zinc 600** (#52525b): Faintest tier — filename captions, deliberately recessive.
- **Black** (#000000): Text on `.btn-solid` (the light button).

### Semantic

Three status tones, all at the same 400-level saturation as indigo so they sit correctly on the dark canvas:

- **Success** (`--color-success` — #34d399): Emerald, chosen over a pure green to stay cold alongside indigo.
- **Warning** (`--color-warning` — #fbbf24): Amber. The only warm tone in the system — warmth is what makes a warning legible, so it is a deliberate exception rather than a second accent.
- **Danger** (`--color-danger` — #f87171): Red. shadcn's `--destructive` aliases to this so the two systems can't drift.

These are defined but **not yet used** — no surface currently has a status state. Use them when one appears; don't invent new tones.

## Typography

### Font Family

**Manrope** is the only family, declared once:

```
--font-sans: 'Manrope', 'Noto Sans Armenian', ui-sans-serif, system-ui, sans-serif;
```

Locale coverage resolves by **per-glyph fallback**, not by swapping classes. Manrope covers Latin and Cyrillic; Armenian codepoints fall through to Noto Sans Armenian automatically. Never add a locale-reactive font class — it breaks mixed-language content (an Armenian page with a Latin brand name) and risks hydration mismatch.

There is no display face and no monospace face. Technical texture comes from wide tracking at small sizes, not from a mono family or from uppercasing.

### Hierarchy

| Role | Classes | Use |
| --- | --- | --- |
| Hero display | `text-5xl sm:text-6xl lg:text-7xl font-normal leading-[1.2] tracking-tighter text-white` | The h1 only |
| Section heading | `text-3xl sm:text-4xl font-normal leading-[1.25] tracking-tighter text-white` | Every `FrameHeading` h2 |
| Stat value | `text-3xl font-normal tracking-tight text-white` | `MetricCard` values |
| Panel value | `text-2xl font-normal tracking-tight text-white` | Label-pill figures |
| Card title | `text-sm font-medium text-white` | `ProtocolRow`, `CourseModuleCard`, `HeroFeature` h3 |
| Body | `text-sm leading-6 text-zinc-400` | Section descriptions, lede paragraphs |
| Caption | `text-xs leading-5 text-zinc-500` | Card descriptions, captions |
| **Micro-label** | `text-xs font-medium tracking-widest text-zinc-500` | Eyebrows, stat labels, panel headers. **The signature.** |
| Eyebrow (wide) | `text-xs font-medium tracking-[0.32em] text-zinc-500` | `FrameHeading` plain eyebrow only |
| Button | `text-xs font-medium tracking-widest` | `AppButton` at `sm` and `lg` |
| Button (xl) | `text-sm font-medium tracking-widest` | `AppButton` at `xl`, hero primary CTA only |

### Principles

**Weight never exceeds 500.** Headings are `font-normal` (400); labels and titles are `font-medium` (500). There is no bold anywhere in the system. Emphasis comes from size, color, and tracking — never weight. A `font-bold` heading reads as a different product.

**Tracking is bidirectional and load-bearing.** Large type gets `tracking-tighter` (-0.05em) to feel engineered and dense. Small label type gets `tracking-widest` (0.1em) to feel like instrument labeling. The contrast between these two extremes *is* the typographic identity. Mid-size type gets no tracking at all.

**Leading is explicit on every heading**, never inherited from Tailwind's size defaults. Those defaults tighten as type grows (1.2 at `text-3xl`, 1.11 at `text-4xl`), which is backwards for a trilingual site: Armenian and Russian both need more vertical room than English, not less. Headings set `leading-[1.2]` (h1) and `leading-[1.25]` (h2).

This also protects the hero's masked line reveal. Each line sits in an `overflow-hidden` wrapper, and half-leading alone does not clear Manrope's descender depth of roughly 0.21em, so the wrappers carry `pb-[0.15em]`. Tighten the leading or drop that padding and descenders clip on `y g j p q`, Cyrillic `у р ф д`, and Armenian `ը ղ ջ փ ց`.

**Armenian opts out of tight tracking** via `html:lang(hy) h1,h2,h3 { letter-spacing: normal }` — Armenian letterforms break down under negative tracking. This is server-rendered from the i18n `lang` attribute, so it carries no hydration risk.

## Layout

### Spacing System

- **Base unit:** 4px (Tailwind default scale).
- **Section gutter:** `mt-6` (24px) between frame sections. Uniform, no exceptions.
- **Container:** `mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8` (1280px max).
- **Frame padding:** `p-5 sm:p-6` for compact cards (metric, protocol); `p-5 sm:p-8` for headline columns.
- **Pill padding:** `p-3` for floating label pills; `px-3 py-2` for status pills.
- **Hero minimum:** `min-h-[calc(100vh-8rem)]` on the hero grid; `min-h-[38rem]` on its visual column.

The section rhythm is **tight (24px), not airy**. This is deliberate — consecutive frames read as stacked instrument modules in a rack. Widening the gutter to a typical 96px marketing rhythm dissolves the console metaphor.

### Grid & Container

- **Asymmetric two-column splits** are the dominant section layout, and the ratios are deliberately uneven:
  - Hero: `lg:grid-cols-[0.72fr_1.28fr]` — narrow copy, wide visual
  - Facts, FAQ: `lg:grid-cols-[0.8fr_1.2fr]`
  - How it works, CTA, Contact, Register: `lg:grid-cols-[1fr_1fr]`
- **Course bento:** `md:grid-cols-12` with `CourseModuleCard`s spanning 5 / 7 / 7 / 5.
- **Internal division uses borders, not gaps.** Grid cells butt against each other and are separated by `border-b` / `sm:border-r` on `border-white/10`. This is what makes sections read as a single machined panel instead of floating cards. Preserve it.

### Whitespace Philosophy

Dense, not generous. Internal padding is modest (20–32px), gutters are tight, and the frame borders do the visual separation work that whitespace does in editorial systems. The page should feel **instrument-dense** — information-rich and tightly registered.

## Elevation & Depth

| Level | Treatment | Use |
| --- | --- | --- |
| Flat | No border, no shadow | Raw layout wrappers |
| Hairline | 1px `border-white/10` | Every structural division |
| Frame surface | `.surface-panel` + inset bezel | Standard section frames |
| Hero surface | `.surface-hero` + `--shadow-hero` (adds `0 2rem 5rem rgba(0,0,0,.45)`) | Hero frame only |
| Raised control | `.bezel` / `.bezel-strong` | Status pills, numeric badges |
| Floating panel | `.surface-deep` + `--shadow-deep` | Label pills over the hero visual — the only true "floating" layer |

The philosophy is **inset-first**. Every shadow token leads with `inset 0 1px 0 rgba(255,255,255,…)` (a top highlight) and `inset 0 -1px 0 rgba(0,0,0,…)` (a bottom shadow). This carves surfaces rather than lifting them. Outer drop shadows appear on only three tokens (`hero`, `deep`, `bezel-strong`) and are large and very soft — atmospheric, not crisp.

### Decorative Depth

Four fixed decorative layers, all owned by `SiteBackdrop` and `FrameSection` — **never re-implement these locally**:

1. **Noise** — `.noise-bg` inline-SVG fractal turbulence at `opacity-[0.02] mix-blend-screen`, z-50, covering everything.
2. **Body grid** — 3rem diagonal hairlines + two radial glows, applied to `body`.
3. **Overlay grids** — `.grid-overlay` (5rem) and `.grid-overlay-sm` (2rem), used inside frames at low opacity with `mix-blend-overlay`.
4. **Corner brackets** — four absolutely-positioned `h-10 w-10` L-shapes on every `FrameSection`: `indigo-500/40` on the hero, `zinc-300/40` elsewhere. Plus four 2×2 indigo dots on the hero only.

## Shapes

### Border Radius Scale

⚠️ **This project overrides Tailwind's radius defaults.** `@theme inline` derives them from `--radius: 0.75rem`:

| Class | Actual value | Tailwind default | Use |
| --- | --- | --- | --- |
| `rounded-sm` | 8px | 2px | — |
| `rounded-md` | 10px | 6px | — |
| `rounded-lg` | **12px** | 8px | Small buttons (`h-10`), numeric badges |
| `rounded-xl` | **16px** | 12px | Large buttons (`h-12`), label pills, cards, panels |
| `rounded-2xl` | **20px** | 16px | Unused — available for a larger container |
| `rounded-full` | 9999px | 9999px | Status dots, avatars, progress bars, pills |

The scale is derived from `--radius` and is monotonic, but it is **shifted one step up from stock Tailwind** — `rounded-lg` here is what `rounded-xl` is elsewhere. Don't port radius values from other Tailwind projects by name.

**Frame sections themselves are never rounded.** The sharp outer rectangle against rounded inner controls is the intended tension.

### Imagery

- The page currently has **no `<img>` elements at all** — the stock asset gallery and operator headshots from the source template were deleted (fake students on a real school's page is dishonest, and there are no real ones yet). If a real photo returns (staff, workspace, student work), give it explicit `width` / `height`, `loading="lazy"`, `decoding="async"`, and default to `grayscale opacity-80` with `hover:grayscale-0` over 500ms, matching the removed `AssetCard` convention. Color as a hover reward, never a default state.
- There is no photography in a hero role. The hero visual is the course list itself, which is the page's primary conversion path.
- Program identity (3ds Max, Photoshop) is carried by monochrome vendor glyphs from `~/data/course.ts`'s `programIcons` (`simple-icons:autodesk`, `simple-icons:adobephotoshop`), not by screenshots or box art. Iconify has no dedicated 3ds Max mark, so the Autodesk mark stands in for it. Both inherit `currentColor` like every other icon in the system — never swap to the full-color `logos:` collection.

## Components

### Shell

**`SiteBackdrop`** — Fixed decorative layers (noise, grid, top glow). Renders once in the layout. Never duplicate its effects inside a section.

**`SiteHeader`** — `sticky top-0 z-30` bar (not `fixed` — no body padding compensation, no layout shift) with `bg-neutral-950/80 backdrop-blur-xl`. Carries `SiteBrand`, a 4-item icon nav (hidden below `lg`), `SiteLangSwitcher`, a solid CTA that scrolls to `#course`, and a hamburger that opens `SiteMobileNav`.

**`SiteMobileNav`** — shadcn `Sheet`. Requires a `SheetTitle` for accessibility (use `sr-only` if visually hidden). Mirrors the header's language switching inline (a row of `NuxtLink`s, not a nested dropdown) plus the same course CTA.

**`SiteLangSwitcher`** — shadcn `DropdownMenu` over `useSwitchLocalePath()`. Trigger and each item show a `circle-flags:*` icon per locale (`hy` → `am`, `ru` → `ru`, `en` → `uk`) next to the language name. The active locale gets `text-indigo-300`.

**`SiteBrand`** — The "F3D" mark + wordmark + tagline lockup. Used identically in header and footer. Never re-create it inline.

### Frames

**`FrameSection`** — The core container. Props: `as`, `variant` (`hero` | `panel` | `soft`), `overflow`, `entrance`. Renders the surface class, `border border-white/10`, four corner brackets, and owns its own scroll-triggered entrance animation. **Every section must be wrapped in one.**

Set `:entrance="false"` when the section runs its own intro sequence — the hero does this, because a section-level fade competing with the masked line reveal reads as muddy.

**`FrameHeading`** — Optional eyebrow + h2 + optional description. Props: `eyebrow` (optional), `eyebrowStyle` (`plain` | `pill`), `title`, `description`. Owns its SplitText word-reveal and re-splits on locale change. **Never hand-roll a section h2** — you lose the reveal and the revert-on-locale-change handling.

`eyebrow` is optional by deliberate decision, not an oversight. The original spec required one on every `FrameHeading`, but an eyebrow above every single heading is the templated-AI rhythm the anti-slop guidance warns against. On the course page, roughly half the sections carry one (Hero, Course, Facts, How it works) and half don't (FAQ, CTA, Contact, Register) — enough to keep the instrument-label signature legible without it reading as a tic. When `eyebrow` is omitted, the h2's `mt-3` top margin also drops, since it existed to clear the eyebrow line.

### Controls

**`AppButton`** — The only button. Props: `href`, `variant` (`solid` | `ghost`), `size` (`sm` | `lg`), `icon`, `type` (`button` | `submit`), `disabled`.
- `solid`: `.btn-solid` (light `#fafafa → #a3a3a3` gradient), `border-white/20`, black text. Primary CTAs only.
- `ghost`: `.btn-ghost`, `border-white/10`, zinc-300 text, hovering to `border-white/25` + white.
- `sm` = `h-10 rounded-lg px-4 text-xs`; `lg` = `h-12 rounded-xl px-5 text-xs`; `xl` = `h-14 rounded-xl px-7 text-sm`.
- `xl` is the hero primary CTA only. It is the one place button text steps up from `text-xs`, because at 56px tall the smaller label looks stranded.
- Focus: `focus-visible:ring-2 ring-indigo-400 ring-offset-2 ring-offset-black`.
- Polymorphic root: renders `<a>` when `href` is set, otherwise a real `<button>` (using `type`/`disabled`). This is what lets the registration form submit through the same component that styles every link CTA — don't reach for shadcn's `Button` just because you need a native submit control.

Do **not** use shadcn's `Button`. It exists only as a transitive dependency inside `SheetContent`.

**`StatusPill`** — Bezel pill with an indigo dot and a wide-tracked label. Prop `pulse` adds `animate-pulse`. Used for the hero eyebrow.

**`Input`** / **`Label`** / **`Checkbox`** / **`Select`** / **`Accordion`** / **`DropdownMenu`** (shadcn, `~/components/ui/*`) — Themed into the bespoke palette: `surface-panel` popovers, `border-white/10`, indigo focus rings and checked states, `rounded-xl` panels / `rounded-lg` items per the radius scale. `Input` and `Checkbox` back the registration form; `Select` backs the course picker; `Accordion` backs the FAQ; `DropdownMenu` backs `SiteLangSwitcher`.

### Content Cards

**`MetricCard`** — Icon, micro-label, `text-3xl` value, caption. Prop `last` drops the trailing border. Accepts a `params` prop for i18n interpolation so `site.ts` numbers (group size, duration) can populate the translated string instead of being duplicated as text.

**`ProtocolRow`** — Zero-padded index badge (derived from array index, never stored), title, description. Also accepts `params` for interpolation (used by the "confirm your seat" enrollment step to interpolate price).

**`CourseModuleCard`** — Bento cell with a CSS placeholder panel, icon, title, description. Layout classes (`col-span`, borders) are passed in from `~/data/course.ts`. Replaces the source template's `ArchitectureCard`; two of its four icons come from `programIcons` (3ds Max, Photoshop) rather than a generic glyph, since those cards name a specific program.

**`HeroFeature`** — Icon ring, title, description. Hero left column only.

**`FaqItem`** — Wraps one `AccordionItem` with a translated question/answer pair. Also accepts `params` for interpolation. The "software" question additionally renders both `programIcons` inline before the question text.

**`ContactRow`** — Icon chip + label + value, as a full-row link. `value` is optional: pass it to source a site.ts value (phone, email, Instagram) directly, or omit it to fall back to a translated i18n string (used for the address, which is prose).

**`LabelPill`** — `.surface-deep` absolutely-positioned floating panel. Shell only; the body is a slot. Position via a `class` prop.

**`SectionHero` course panel** — The hero's right column. A `.surface-deep` panel listing every course as a link to its detail page, with status and an arrow affordance. This is the hero's visual anchor and its main conversion path, so it should stay the heaviest element in the section.

### Forms

**`RegistrationForm`** (`~/components/form/RegistrationForm.vue`) — The one form in the system, and the reference for any future one: label above input, error below in `text-xs text-red-400`, `aria-invalid` + `aria-describedby` wired per field, honeypot field visually hidden off-canvas (not `display:none`, so bots that skip hidden-input heuristics still fill it). States are `idle` / `submitting` / `success`, with the success state swapping the whole form for a confirmation panel rather than showing a toast. Validates client-side with the same zod schema (`#shared/registration`) the server route uses, so the two cannot drift.

## Motion

All motion routes through `useGSAP()`. Three entry points: `animate()` (unconditional), `motion()` (media-query scoped), and the shared `revealFrom` / `revealTo` presets.

**Every reveal is a blur reveal.** The shared presets are `{ y: 32, opacity: 0, filter: 'blur(12px)' }` → `{ y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.1, ease: 'expo.out' }`. Always pass `clearProps: 'filter'` — a persistent `filter` forces a GPU layer and degrades scroll performance.

- **Section entrance** — `FrameSection` fades and un-blurs at `top 85%`.
- **Headings** — `FrameHeading` uses SplitText `{ type: 'words', mask: 'words' }` with `yPercent: 110`, 0.055s stagger. SplitText instances must be `.revert()`-ed manually; GSAP context revert does not do it.
- **Hero** — masked line reveal on `.hero-line`, then `.reveal-block > *:not(.hero-title)`, then `.label-pill`, then `.connector-line` stroke draw.
- **Opt-in reveals** — add `data-reveal` to an element; a single batched `ScrollTrigger` in `app.vue` handles it. Never write a per-element ScrollTrigger.
- **Reduced motion** — `motion()` receives `context.conditions.reduced`; return early. Content must remain fully visible.

⚠️ `motion()` internally injects an `all: 'all'` condition. GSAP's `matchMedia` only fires its callback when at least one query **matches**, so a lone `prefers-reduced-motion: reduce` condition silently never runs. Don't remove that key.

## Do's and Don'ts

### Do

- Wrap every new section in `FrameSection` and every section heading in `FrameHeading`.
- Use `border-white/10` for every structural line.
- Divide grid cells with borders, not gaps.
- Use the `.surface-*` / `.bezel` / `.btn-*` classes for fills. They exist so gradients live in one place.
- Reach for the `tracking-widest` micro-label for any label, eyebrow, or stat name.
- Keep indigo scarce — accent moments only.
- Put prose in `i18n/locales/en.json` and structure (icons, hrefs, layout classes, keys) in `~/data/*.ts`.
- Add `data-reveal` for entrance animation rather than writing a new ScrollTrigger.
- Give every new `<img>` explicit dimensions, `loading="lazy"`, `decoding="async"`.

### Don't

- Don't round frame sections. Sharp containers, rounded controls.
- Don't use `font-bold`, or any weight above 500.
- Don't introduce a second accent color, or add semantic status colors without a deliberate decision.
- Don't write inline `background: linear-gradient(...)` / `box-shadow: inset ...`. Add a `@layer components` recipe instead.
- Don't use shadcn's `Button`, `Card`, or `Separator` — the bespoke equivalents carry the design.
- Don't add WebGL or a 3D canvas. The hero once carried a Three.js wireframe; it was removed because it cost a dependency, a render loop, and mobile battery while communicating nothing about the courses.
- Don't add a locale-reactive font class. Per-glyph fallback already handles all three locales.
- Don't leave `filter` set after a tween — always `clearProps: 'filter'`.
- Don't hardcode English in a component.
- Don't assume Tailwind's stock radius values by name — this project's scale is shifted one step up.
- Don't add `uppercase`. Micro-labels get their character from wide tracking alone. Uppercasing was removed from the whole system: Armenian and Russian both suffer under it, since Armenian capitals are visually heavier and less familiar than their lowercase forms, and uppercase Cyrillic loses the ascender and descender variety that makes it scannable. **One deliberate exception:** the `SiteLangSwitcher` trigger, which renders a two-letter locale code where capitals are the convention (`HY` / `RU` / `EN`). That file should be the only `uppercase` match in the codebase.

## Responsive Behavior

### Breakpoints

Tailwind defaults. `sm` (640px) carries most of the internal-padding and grid work; `lg` (1024px) carries the structural column changes.

| Name | Width | Key changes |
| --- | --- | --- |
| Mobile | < 640px | Single column throughout; icon nav hidden, hamburger + Sheet; buttons stack `flex-col`; card padding `p-5`; hero h1 `text-5xl` |
| Small | 640–1024px | Card padding grows to `sm:p-6` / `sm:p-8`; metric and asset grids go multi-column with `sm:border-r` dividers; buttons go `sm:flex-row`; hero h1 `text-6xl` |
| Large | ≥ 1024px | Asymmetric two-column splits engage; horizontal nav replaces hamburger; vertical dividers flip from `border-b` to `lg:border-r`; hero h1 `text-7xl` |
| Wide | ≥ 1280px | Container caps at `max-w-7xl`; outer padding stays `lg:px-8` |

### Collapsing Strategy

Two-column sections collapse to single column at `lg`, and **the divider border flips axis** — `border-b border-white/10` on mobile becomes `lg:border-b-0 lg:border-r`. Reproduce this flip in any new split section; a divider stuck on the wrong axis is the most common visual bug in this system.

The course bento collapses from 12-column spans to full width at `md`.

### Touch Targets

`AppButton` is 40px (`sm`) or 48px (`lg`) tall. Nav links and the hamburger meet 44px through padding. Cards are not fully tappable — only their explicit links are.

## Iteration Guide

1. Work on one component at a time. Reference it by filename (`FrameSection.vue`, `MetricCard.vue`).
2. Before adding a component, check whether composition of existing primitives covers it. `FrameSection` + `FrameHeading` + a `v-for` covers most new sections.
3. Never inline a gradient or inset shadow. Add a `@layer components` recipe in `app/assets/css/tailwind.css`.
4. New content: prose → `en.json` (+ `ru.json` / `hy.json`), structure → `~/data/course.ts` or `~/data/site.ts`. A component should read both, hardcode neither. `site.ts` holds the one-off placeholder values (phone, email, price, dates) that aren't translatable; `course.ts` holds arrays and icon maps that repeat across cards.
5. Reach for size and tracking before weight or color when you need emphasis.
6. Dark + zinc + indigo is the whole palette. Don't introduce a fourth tone.
7. New animation goes through `useGSAP()` and must handle reduced motion.
8. Test at 375 / 768 / 1440px, and check `/ru` and `/hy` — Armenian and Russian run longer than English and will expose tight layouts.

## Known Gaps

- **Two parallel token systems.** shadcn's semantic variables (`--primary`, `--card`, `--muted`) coexist with the bespoke `--color-*` / `.surface-*` layer, and only a handful of shadcn primitives (Sheet, Input, Checkbox, Select, Accordion, DropdownMenu, Avatar, Label) consume the shadcn side. Anyone adding a shadcn component must theme it into the bespoke palette manually — check its generated `data-*` state attributes against what reka-ui actually emits (`data-state="open"`, not `data-open`) before trusting the CLI output; four components shipped with dead open/close animations from exactly this mismatch.
- **The semantic tones are unproven.** Success / warning / danger are defined but no surface uses them yet, so they haven't been checked for contrast against `.surface-panel` in context. The registration form's error state uses a plain `text-red-400`, not `--color-danger`, because the two were never reconciled.
- **No general hover convention.** Ghost button, asset image (removed), and `ContactRow` define hover states ad hoc; there is no shared rule for nav links or cards generally.
- **Course module cards are CSS placeholders.** Two of the four carry real program icons, but the panel itself is a gradient-and-glow placeholder rather than artwork.
- **Heading sizes have not been tuned against rendered Manrope** in all three locales at once. The `leading` fix (see Typography) addressed descender clipping, but full-page visual verification at 375/768/1440 across `/`, `/ru`, `/en` is still the user's pass, not an automated one.
- **Dark mode only.** There is no light theme, and the inset-bezel depth model assumes a dark canvas.
- **Email templates (`server/emails/*.vue`) don't share the app's design tokens.** They're plain inline-styled HTML for email-client compatibility, deliberately disconnected from `tailwind.css`. Don't expect Tailwind classes to work there.
