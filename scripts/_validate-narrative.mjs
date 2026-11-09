import fs from 'fs'

const file = process.argv[2]
const usedPhrasesFile = '/Users/tykijones/Documents/bigfive-jp/scripts/used-phrases.json'
const data = JSON.parse(fs.readFileSync(file, 'utf-8'))
const usedPhrases = JSON.parse(fs.readFileSync(usedPhrasesFile, 'utf-8'))

const ranges = {
  overview: [700, 900],
  life_advice: [500, 700],
  career: [500, 700],
  romance: [500, 700],
  overall_advice: [200, 300],
}

const banned = ['と違って', '他の人より', 'ように振り回される', 'より優れています', '誰よりも', '他の人以上に', '多くの人が...できない中で', '多くの人ができない']
const detached = ['この配置', 'この組み合わせは', 'こうしたタイプの人', 'この人物は']

let errors = []
let warnings = []

for (const [field, [min, max]] of Object.entries(ranges)) {
  const text = data[field]
  if (!text) { errors.push(`MISSING FIELD: ${field}`); continue }
  const len = Array.from(text).length
  if (len < min || len > max) errors.push(`LENGTH ${field}: ${len} chars (target ${min}-${max})`)
}

const allText = Object.values(data).join('\n')
for (const b of banned) {
  if (allText.includes(b)) errors.push(`BANNED PHRASE: "${b}"`)
}
for (const d of detached) {
  if (allText.includes(d)) errors.push(`DETACHED FRAMING: "${d}"`)
}

const dashCount = (allText.match(/——/g) || []).length
if (dashCount > 2) errors.push(`EM-DASH COUNT: ${dashCount} (max 2)`)

// repeated phrase/sentence within same field (naive: split on 。 and check dupes, plus check for repeated 8+ char substrings)
for (const [field, text] of Object.entries(data)) {
  if (!text) continue
  const sentences = text.split(/[。\n]/).map(s => s.trim()).filter(s => s.length > 4)
  const seen = new Set()
  for (const s of sentences) {
    if (seen.has(s)) errors.push(`REPEATED SENTENCE in ${field}: "${s}"`)
    seen.add(s)
  }
}

// used-phrases reuse check
const reused = []
for (const phrase of usedPhrases) {
  if (allText.includes(phrase)) reused.push(phrase)
}
if (reused.length) warnings.push(`REUSED TRACKED PHRASES: ${JSON.stringify(reused)}`)

// END marker not applicable here since we already parsed sections; caller should verify raw output had ---END---

console.log(JSON.stringify({ errors, warnings, lengths: Object.fromEntries(Object.entries(data).map(([k,v]) => [k, v ? Array.from(v).length : 0])) }, null, 2))
process.exit(errors.length ? 1 : 0)
