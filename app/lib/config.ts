// Central configuration for the Big Five personality test
// Trait levels are now 5 — very_low, low, medium, high, very_high

export const TRAITS = [
  'openness',
  'conscientiousness',
  'extraversion',
  'agreeableness',
  'neuroticism',
] as const

export const TRAIT_LEVELS = [
  'very_low',
  'low',
  'medium',
  'high',
  'very_high',
] as const

export const TRAIT_LABELS_JP: Record<string, string> = {
  openness: '開放性',
  conscientiousness: '誠実性',
  extraversion: '外向性',
  agreeableness: '協調性',
  neuroticism: '神経症傾向',
}

export const LEVEL_LABELS_JP: Record<string, string> = {
  very_low: 'かなり低い',
  low: '低い',
  medium: '普通',
  high: '高い',
  very_high: 'かなり高い',
}

// Percentile thresholds for each level
export const LEVEL_THRESHOLDS = {
  very_low:  { min: 0,  max: 10 },
  low:       { min: 11, max: 33 },
  medium:    { min: 34, max: 66 },
  high:      { min: 67, max: 89 },
  very_high: { min: 90, max: 100 },
}

export type Trait = typeof TRAITS[number]
export type TraitLevel = typeof TRAIT_LEVELS[number]

// Version of the question wording, saved with every response so answers to
// different question sets are never mixed. Bump this when the questions change.
// v1 = original questions (docs/questions-v1.json); v2 = docs/questions-v2-draft.json.
export const QUESTION_SET = 'v2'
