import fs from 'fs'
import { execFileSync } from 'child_process'

const file = process.argv[2]
const payload = JSON.parse(fs.readFileSync(file, 'utf-8'))

const envContent = fs.readFileSync('/Users/tykijones/Documents/bigfive-jp/.env.local', 'utf-8')
const env = {}
for (const line of envContent.split('\n')) {
  const m = line.match(/^([A-Z_]+)=(.*)$/)
  if (m) env[m[1]] = m[2]
}

const body = JSON.stringify({
  overview: payload.overview,
  life_advice: payload.life_advice,
  career: payload.career,
  romance: payload.romance,
  overall_advice: payload.overall_advice,
})
const bodyFile = '/tmp/_sb_update_body.json'
fs.writeFileSync(bodyFile, body)

const url = `${env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/narratives?combination_key=eq.${encodeURIComponent(payload.combination_key)}`

const out = execFileSync('curl', [
  '-4', '-s', '-w', '\nHTTP_STATUS:%{http_code}', '--max-time', '15',
  '-X', 'PATCH', url,
  '-H', `apikey: ${env.SUPABASE_SERVICE_ROLE_KEY}`,
  '-H', `Authorization: Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
  '-H', 'Content-Type: application/json',
  '-H', 'Prefer: return=minimal',
  '--data-binary', `@${bodyFile}`,
], { encoding: 'utf-8' })

fs.unlinkSync(bodyFile)
console.log(payload.combination_key, out.trim())
