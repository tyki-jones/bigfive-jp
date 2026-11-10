import { supabase } from '../../lib/supabase'
import { TRAITS, TRAIT_LABELS_JP, LEVEL_LABELS_JP } from '../../lib/config'
import type { Trait, TraitLevel } from '../../lib/config'
import { rawToPercentile } from '../../lib/scoring'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import ShareSection from './ShareSection'

export const metadata: Metadata = {
  title: 'あなたの診断結果',
}

type TraitScore = {
  raw: number
  percentile: number
  level: TraitLevel
}

type Response = {
  id: string
  raw_scores: Record<Trait, number>
  combination_key: string
}

async function getResponse(id: string): Promise<Response | null> {
  const { data, error } = await supabase
    .from('responses')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) return null
  return data
}

type Narrative = {
  overview: string
  life_advice: string
  career: string
  romance: string
  overall_advice: string
}

// Display order and headings for the narrative sections.
const NARRATIVE_SECTIONS: { field: keyof Narrative; title: string }[] = [
  { field: 'overview', title: 'あなたの人物像' },
  { field: 'life_advice', title: '人生と日常' },
  { field: 'career', title: '仕事・キャリア' },
  { field: 'romance', title: '恋愛' },
  { field: 'overall_advice', title: 'あなたへのメッセージ' },
]

// Narratives share the response's combination_key format ("high-very_low-…").
async function getNarrative(combinationKey: string): Promise<Narrative | null> {
  const { data, error } = await supabase
    .from('narratives')
    .select('overview, life_advice, career, romance, overall_advice')
    .eq('combination_key', combinationKey)
    .maybeSingle()

  if (error) console.error('Error loading narrative:', error)
  return data ?? null
}

// Narrative text is plain text with paragraphs separated by blank lines.
function toParagraphs(text: string): string[] {
  return text.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean)
}

function getBarColor(percentile: number): string {
  if (percentile >= 90) return '#1D9E75'
  if (percentile >= 67) return '#4BB896'
  if (percentile >= 34) return '#888'
  if (percentile >= 11) return '#B4B2A9'
  return '#C4C4BC'
}

export default async function ResultsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const response = await getResponse(id)
  if (!response) notFound()

  const scores: Record<Trait, TraitScore> = {} as Record<Trait, TraitScore>
  TRAITS.forEach(trait => {
    const raw = response.raw_scores[trait]
    const percentile = rawToPercentile(raw, trait)
    const combinationParts = response.combination_key.split('-')
    const level = combinationParts[TRAITS.indexOf(trait)] as TraitLevel
    scores[trait] = { raw, percentile, level }
  })

  const narrative = await getNarrative(response.combination_key)

  return (
    <main style={{ minHeight: '100vh', background: '#FAFAF8' }}>
      {/* Header */}
      <div style={{ borderBottom: '0.5px solid #E8E8E4', padding: '20px', textAlign: 'center' }}>
        <p style={{ fontSize: '12px', color: '#888', letterSpacing: '0.08em' }}>BIG FIVE JP</p>
      </div>

      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '40px 20px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '500', color: '#2C2C2A', marginBottom: '8px' }}>
          あなたの診断結果
        </h1>
        <p style={{ fontSize: '14px', color: '#888', marginBottom: '40px', lineHeight: '1.6' }}>
          以下はあなたのビッグファイブ性格診断の結果です。各特性のスコアは日本人の平均と比較した百分位数で表されています。
        </p>

        {/* Trait scores */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {TRAITS.map(trait => {
            const { percentile, level } = scores[trait]
            return (
              <div key={trait}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                  <div>
                    <span style={{ fontSize: '16px', fontWeight: '500', color: '#2C2C2A' }}>
                      {TRAIT_LABELS_JP[trait]}
                    </span>
                    <span style={{ fontSize: '12px', color: '#888', marginLeft: '10px' }}>
                      {LEVEL_LABELS_JP[level]}
                    </span>
                  </div>
                  <span style={{ fontSize: '14px', color: '#888' }}>
                    {percentile}パーセンタイル
                  </span>
                </div>
                <div style={{ height: '6px', background: '#E8E8E4', borderRadius: '3px' }}>
                  <div style={{
                    height: '100%',
                    width: `${percentile}%`,
                    background: getBarColor(percentile),
                    borderRadius: '3px',
                    transition: 'width 0.8s ease',
                  }} />
                </div>
              </div>
            )
          })}
        </div>

        {/* Narrative */}
        {narrative && (
          <div style={{ marginTop: '56px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {NARRATIVE_SECTIONS.map(({ field, title }) => (
              <section key={field} style={{ borderTop: '0.5px solid #E8E8E4', paddingTop: '32px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '500', color: '#2C2C2A', marginBottom: '16px' }}>
                  {title}
                </h2>
                {toParagraphs(narrative[field]).map((paragraph, i) => (
                  <p key={i} style={{ fontSize: '15px', color: '#444441', lineHeight: '1.9', marginBottom: '16px' }}>
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>
        )}

        <ShareSection url={`${process.env.NEXT_PUBLIC_SITE_URL}/results/${id}`} />

        {/* Retake */}
        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <a href="/survey" style={{ fontSize: '14px', color: '#1D9E75', textDecoration: 'none' }}>
            もう一度診断する →
          </a>
        </div>
      </div>
    </main>
  )
}