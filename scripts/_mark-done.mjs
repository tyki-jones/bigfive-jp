import fs from 'fs'

const keys = process.argv.slice(2)
const file = '/Users/tykijones/Documents/bigfive-jp/scripts/combinations.json'
const d = JSON.parse(fs.readFileSync(file, 'utf-8'))
let count = 0
for (const item of d) {
  if (keys.includes(item.combination_key)) { item.done = true; count++ }
}
fs.writeFileSync(file, JSON.stringify(d, null, 2))
console.log('marked done:', count, 'total done now:', d.filter(x=>x.done).length, '/', d.length)
