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

// Profile questions asked on the page after the 60 questions.
// `value` is what is saved in responses (gender / age_range); `label` is shown to the user.
export const GENDER_OPTIONS = [
  { value: 'man', label: '男性' },
  { value: 'woman', label: '女性' },
  { value: 'other', label: 'その他' },
] as const

export const AGE_RANGE_OPTIONS = [
  { value: '0-10', label: '10歳以下' },
  { value: '11-15', label: '11〜15歳' },
  { value: '16-20', label: '16〜20歳' },
  { value: '21-25', label: '21〜25歳' },
  { value: '26-30', label: '26〜30歳' },
  { value: '31-35', label: '31〜35歳' },
  { value: '36-40', label: '36〜40歳' },
  { value: '41-45', label: '41〜45歳' },
  { value: '46-50', label: '46〜50歳' },
  { value: '51-55', label: '51〜55歳' },
  { value: '56-60', label: '56〜60歳' },
  { value: '61+', label: '61歳以上' },
] as const

export type Gender = typeof GENDER_OPTIONS[number]['value']
export type AgeRange = typeof AGE_RANGE_OPTIONS[number]['value']
