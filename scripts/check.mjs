// Project conventions check. Run with: node scripts/check.mjs
import fs from 'node:fs'
import path from 'node:path'

const EM_DASH = /[—–]/
const LOCALES = ['en', 'ru', 'hy']
const SCAN = ['app', 'i18n', 'shared', 'server', 'docs']
const EXT = new Set(['.vue', '.ts', '.mjs', '.json', '.css', '.md'])

let failed = 0

function fail(label, detail) {
	failed++
	console.log(`FAIL  ${label}`)
	if (detail) console.log(detail.split('\n').map(l => `        ${l}`).join('\n'))
}
function pass(label) {
	console.log(`ok    ${label}`)
}

function walk(dir, acc = []) {
	if (!fs.existsSync(dir)) return acc
	for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
		const p = path.join(dir, e.name)
		if (e.isDirectory()) walk(p, acc)
		else if (EXT.has(path.extname(p))) acc.push(p)
	}
	return acc
}

const files = SCAN.flatMap(d => walk(d))

// 1. no em or en dashes
{
	const hits = []
	for (const f of files) {
		if (f.endsWith(path.join('scripts', 'check.mjs'))) continue
		const lines = fs.readFileSync(f, 'utf8').split(/\r?\n/)
		lines.forEach((line, i) => {
			if (EM_DASH.test(line)) hits.push(`${f.split(path.sep).join('/')}:${i + 1}`)
		})
	}
	hits.length ? fail('no em or en dashes', hits.join('\n')) : pass('no em or en dashes')
}

// 2. uppercase class only in the language switcher
{
	const hits = files
		.filter(f => f.endsWith('.vue') && /uppercase(?![-\w])/.test(fs.readFileSync(f, 'utf8')))
		.map(f => f.split(path.sep).join('/'))
	const stray = hits.filter(f => !f.endsWith('SiteLangSwitcher.vue'))
	stray.length ? fail('uppercase only in SiteLangSwitcher', stray.join('\n')) : pass('uppercase only in SiteLangSwitcher')
}

// 3. locale key parity
{
	function keys(o, prefix = '', acc = new Set()) {
		for (const k of Object.keys(o)) {
			const v = o[k]
			const n = prefix ? `${prefix}.${k}` : k
			if (typeof v === 'string') acc.add(n)
			else if (v && typeof v === 'object') keys(v, n, acc)
		}
		return acc
	}
	const sets = Object.fromEntries(
		LOCALES.map(l => [l, keys(JSON.parse(fs.readFileSync(`i18n/locales/${l}.json`, 'utf8')))]),
	)
	const problems = []
	for (const l of LOCALES.slice(1)) {
		const missing = [...sets.en].filter(k => !sets[l].has(k))
		const extra = [...sets[l]].filter(k => !sets.en.has(k))
		if (missing.length) problems.push(`${l} missing: ${missing.join(', ')}`)
		if (extra.length) problems.push(`${l} extra: ${extra.join(', ')}`)
	}
	problems.length
		? fail('locale key parity', problems.join('\n'))
		: pass(`locale key parity (${sets.en.size} keys)`)
}

// 4. headings and labels carry no terminal stop
{
	const LEAF = new Set(['title', 'eyebrow', 'label', 'placeholder', 'linkText', 'button'])
	const problems = []
	for (const l of LOCALES) {
		const json = JSON.parse(fs.readFileSync(`i18n/locales/${l}.json`, 'utf8'))
		;(function walkJson(o, prefix) {
			for (const k of Object.keys(o)) {
				const v = o[k]
				const n = prefix ? `${prefix}.${k}` : k
				if (typeof v === 'string') {
					const leaf = n.split('.').pop()
					const isLabel = LEAF.has(leaf) || n.startsWith('register.form.errors.')
					// ։ is the Armenian full stop
					if (isLabel && /[.։]\s*$/.test(v) && (v.match(/[.!?։]/g) || []).length === 1) {
						problems.push(`${l}: ${n}`)
					}
				}
				else if (v && typeof v === 'object') { walkJson(v, n) }
			}
		})(json, '')
	}
	problems.length
		? fail('no terminal stop on headings and labels', problems.join('\n'))
		: pass('no terminal stop on headings and labels')
}

// 5. internal links go through localePath
{
	const hits = []
	for (const f of files.filter(f => f.endsWith('.vue') && !f.includes(`components${path.sep}ui`))) {
		fs.readFileSync(f, 'utf8').split(/\r?\n/).forEach((line, i) => {
			if (!/(?:to|href)="\/[^"]*"/.test(line)) return
			if (/localePath|https?:|mailto:|tel:/.test(line)) return
			hits.push(`${f.split(path.sep).join('/')}:${i + 1}`)
		})
	}
	hits.length
		? fail('internal links use localePath', hits.join('\n'))
		: pass('internal links use localePath')
}

// 6. no hardcoded three.js or webgl
{
	const hits = files
		.filter(f => !f.startsWith('docs') && /from 'three'|useThreeScene|ThreeStage/.test(fs.readFileSync(f, 'utf8')))
		.map(f => f.split(path.sep).join('/'))
	hits.length ? fail('no three.js', hits.join('\n')) : pass('no three.js')
}

console.log()
console.log(failed ? `${failed} check(s) failed` : 'all checks passed')
process.exit(failed ? 1 : 0)
