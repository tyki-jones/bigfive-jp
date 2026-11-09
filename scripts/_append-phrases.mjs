import fs from 'fs'

const file = '/Users/tykijones/Documents/bigfive-jp/scripts/used-phrases.json'
const newPhrasesFile = process.argv[2]
const newPhrases = JSON.parse(fs.readFileSync(newPhrasesFile, 'utf-8'))
const d = JSON.parse(fs.readFileSync(file, 'utf-8'))
const set = new Set(d)
let added = 0
for (const p of newPhrases) {
  if (!set.has(p)) { d.push(p); set.add(p); added++ }
}
fs.writeFileSync(file, JSON.stringify(d, null, 2))
console.log('added:', added, 'total:', d.length)
