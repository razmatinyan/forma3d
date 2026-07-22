# RULES.md

Hard rules. Breaking one of these is a defect, not a style disagreement.

Each rule exists because it was violated once and cost time.

## Writing

**No em-dashes or en-dashes. Anywhere.** Not in copy, not in comments, not in commit messages, not in docs. Use a hyphen, a comma, a period, or restructure the sentence.

```bash
npm run check   # verifies this and the other conventions below
```

**Headings and single-line labels take no terminal period.** Section titles, form labels, placeholders, and validation messages end clean. Running prose keeps normal punctuation. Armenian uses `։` (U+0589) as its full stop, so check for both characters.

**Banned vocabulary in user-facing copy:** unlock, elevate, seamless, journey, dive into, delve, showcase, foster, underscore, testament, pivotal, vibrant, landscape (figurative), "in today's ...". No rule-of-three padding. No `-ing` clauses bolted on for depth ("...ensuring", "...highlighting").

**Product names stay in English in every locale:** `3D's Max`, `Adobe Photoshop`, `Architectural Visualization`, `Game Dev Modeling`. Descriptions around them are translated.

## Code

**Near-zero comments.** Default to none and let naming explain. When genuinely unavoidable (a workaround, a spec quirk, a non-obvious ordering constraint) use one short `//` line. No block comments, no JSDoc, no section banners, no `<!-- -->` in templates.

**No hardcoded user-facing text in components.** It goes in `i18n/locales/*.json`, all three, every time.

**All three locale files stay at identical key counts.** Adding a key to one means adding it to all three.

**Internal links go through `localePath()`.** A bare `href="#courses"` breaks on `/courses/*` routes and ignores the active locale.

**No `uppercase` class.** One deliberate exception: the `SiteLangSwitcher` trigger, which renders a two-letter locale code. That file should be the only match.

**No WebGL, no 3D canvas.** A Three.js hero existed and was removed: it cost a dependency, a render loop, and mobile battery while saying nothing about the courses.

## Git

**Short commit messages.** One conventional-commit subject line. No explanatory body paragraphs. If context matters for the future it belongs in `DESIGN.md` or `docs/`, not the commit log.

**Never add `Co-Authored-By`, "Generated with", or any AI attribution** to commits or pull requests.

## Process

**Do not run `npm run build` while a dev server is running.** Both write to `node_modules/.cache/nuxt/.nuxt` and the build will break the running dev server. Check port 3000 first.

**State a caveat once.** After it is acknowledged, drop it. Do not re-list known issues (placeholder data, missing og-image, console email provider) on every response.
