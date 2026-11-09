import { supabase } from '../../lib/supabase'
import { TRAITS, TRAIT_LABELS_JP, LEVEL_LABELS_JP } from '../../lib/config'
import type { Trait, TraitLevel } from '../../lib/config'
import { rawToPercentile } from '../../lib/scoring'
import { notFound } from 'next/navigation'
import ShareSection from './ShareSection'

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
          以下はあなたのビッグファ性格診断の結果です。各特性のスコアは日本人の平均と比較した百分位数で表されています。
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