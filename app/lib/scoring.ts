import { supabase } from './supabase'
import { TRAITS, LEVEL_THRESHOLDS, TRAIT_LEVELS } from './config'
import type { Trait, TraitLevel } from './config'

// Published Japanese Big Five norms (Wada 1996 + subsequent studies)
// Mean and SD on a 12-84 raw score scale
const JAPANESE_NORMS: Record<Trait, { mean: number; sd: number }> = {
  extraversion:       { mean: 46, sd: 11 },
  neuroticism:        { mean: 48, sd: 11 },
  openness:           { mean: 52, sd: 10 },
  conscientiousness:  { mean: 50, sd: 10 },
  agreeableness:      { mean: 50, sd: 10 },
}

// Cumulative normal distribution approximation
function normCDF(z: number): number {
  const t = 1 / (1 + 0.2316419 * Math.abs(z))
  const d = 0.3989423 * Math.exp(-z * z / 2)
  const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.7814779 + t * (-1.8212560 + t * 1.3302744))))
  return z > 0 ? 1 - p : p
}

function rawToPercentile(raw: number, trait: Trait): number {
  const { mean, sd } = JAPANESE_NORMS[trait]
  const z = (raw - mean) / sd
  return Math.round(normCDF(z) * 100)
}

function percentileToLevel(percentile: number): TraitLevel {
  for (const level of TRAIT_LEVELS) {
    const { min, max } = LEVEL_THRESHOLDS[level]
    if (percentile >= min && percentile <= max) return level
  }
  return 'medium'
}

export function calculateScores(
  answers: Record<number, number>,
  questions: { id: number; trait: string; reverse_scored: boolean }[]
): Record<Trait, { raw: number; percentile: number; level: TraitLevel }> {
  const rawScores: Record<string, number> = {}
  const counts: Record<string, number> = {}

  TRAITS.forEach(trait => {
    rawScores[trait] = 0
    counts[trait] = 0
  })

  questions.forEach(q => {
    const answer = answers[q.id]
    if (answer === undefined) return
    const score = q.reverse_scored ? 8 - answer : answer
    rawScores[q.trait] += score
    counts[q.trait]++
  })

  const result = {} as Record<Trait, { raw: number; percentile: number; level: TraitLevel }>
  TRAITS.forEach(trait => {
    const raw = rawScores[trait]
    const percentile = rawToPercentile(raw, trait)
    const level = percentileToLevel(percentile)
    result[trait] = { raw, percentile, level }
  })

  return result
}

export function buildCombinationKey(
  scores: Record<Trait, { level: TraitLevel }>
): string {
  return TRAITS.map(trait => scores[trait].level).join('-')
}

export async function saveResponse(
  scores: Record<Trait, { raw: number; percentile: number; level: TraitLevel }>
): Promise<string | null> {
  const rawScores: Record<string, number> = {}
  TRAITS.forEach(trait => { rawScores[trait] = scores[trait].raw })

  const combinationKey = buildCombinationKey(scores)

  const { data, error } = await supabase
    .from('responses')
    .insert({
      raw_scores: rawScores,
      combination_key: combinationKey,
    })
    .select('id')
    .single()

  if (error) {
    console.error('Error saving response:', error)
    return null
  }

  return data.id
}