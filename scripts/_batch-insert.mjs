import { createClient } from '@supabase/supabase-js'
import fs from 'fs'

const file = process.argv[2]
const payload = JSON.parse(fs.readFileSync(file, 'utf-8'))

const envContent = fs.readFileSync('/Users/tykijones/Documents/bigfive-jp/.env.local', 'utf-8')
const env = {}
for (const line of envContent.split('\n')) {
  const m = line.match(/^([A-Z_]+)=(.*)$/)
  if (m) env[m[1]] = m[2]
}
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY)

const { error } = await supabase.from('narratives').insert({
  combination_key: payload.combination_key,
  overview: payload.overview,
  life_advice: payload.life_advice,
  career: payload.career,
  romance: payload.romance,
  overall_advice: payload.overall_advice,
})

if (error) {
  console.error('INSERT ERROR', error)
  process.exit(1)
} else {
  console.log('INSERTED', payload.combination_key)
}
