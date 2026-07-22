# Workflows

Recipes for routine tasks, so they do not need re-explaining each time.

## Before starting anything

```bash
git branch --show-current
git status --short
```

Check whether a dev server holds port 3000. If it does, **do not run `npm run build`** during the session. See `docs/gotchas.md`.

## Add a section to the home page

1. `app/components/section/SectionX.vue`, wrapped in `<FrameSection id="x" class="mt-6 scroll-mt-24">`
2. Heading through `<FrameHeading>`, never a hand-rolled `h2`
3. Structure into `app/data/`, prose into all three locale files
4. Register it in `app/pages/index.vue` in the intended order
5. Add a nav entry in `app/data/nav.ts` only if it deserves one. The header holds four and must stay on one line.

## Add a course

1. Append to `courses` in `app/data/course.ts` with `key`, `slug`, `status`, `icon`, `featured`, `mentor`, `pros`
2. Add `courses.items.<key>.title` and `.description` to all three locales
3. Verify the icon exists before using it (see below)
4. The route, catalogue card, and hero list all pick it up automatically

Titles for new courses stay in English per `RULES.md`.

## Add or change copy

1. Edit all three files in `i18n/locales/`
2. Run the parity check in `docs/i18n.md`
3. Run the em-dash check
4. Confirm headings and labels have no terminal period

## Verify an Iconify icon exists

Guessing icon names has failed repeatedly. Check first:

```bash
for q in "solar:gamepad-linear" "simple-icons:instagram"; do
  p=${q%%:*}; i=${q##*:}
  r=$(curl -s "https://api.iconify.design/$p.json?icons=$i" | grep -o not_found)
  [ -z "$r" ] && echo "OK      $q" || echo "MISSING $q"
done
```

There is no 3ds Max glyph in Iconify. `simple-icons:autodesk` stands in as the vendor mark.

## Add an animation

Everything goes through `useGSAP()`.

For a group of cards inside one section, scope it to the section instead of using the global batch:

```ts
const root = ref<HTMLElement | null>(null)
const { gsap, motion, revealFrom, revealTo } = useGSAP()

motion({ reduced: '(prefers-reduced-motion: reduce)' }, (context) => {
  if (context.conditions.reduced || !root.value) return
  gsap.fromTo(root.value.querySelectorAll('.thing > *'), revealFrom, {
    ...revealTo,
    stagger: 0.05,
    clearProps: 'filter',
    scrollTrigger: { trigger: root.value, start: 'top 80%', once: true },
  })
})
```

Target `> *` so the card contents animate and the card itself does not move. Put the `ref` on a plain `div`, never on `<FrameSection>`, which returns a component instance rather than a DOM node.

For scattered single elements, add `data-reveal` to the container and let the global batch handle it.

## Change business data

Everything replaceable is in `app/data/site.ts` behind a comment block. Change it there and nowhere else. Phone, email, Instagram, address, map URL, price, duration, schedule, and next start date are all placeholders.

## Verification

Run these before declaring work finished.

```bash
# conventions: dashes, uppercase, locale parity, terminal stops
npm run check

# routes still render in all three locales
for r in / /ru /en /courses/3ds-max; do
  printf "%-22s " "$r"
  curl -s -o /dev/null -w "HTTP %{http_code}\n" "http://localhost:3000$r"
done

# exactly one h1 per page
curl -s http://localhost:3000/ | grep -o "<h1" | wc -l
```

If no dev server is running, `npm run build` should pass clean and `node .output/server/index.mjs` should render.

## Commit

```bash
git add -A
git commit -m "fix: short subject line"
git push origin main
```

One subject line, no body, no AI attribution. See `RULES.md`.
