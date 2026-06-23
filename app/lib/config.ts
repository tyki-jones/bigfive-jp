// Central configuration for the Big Five personality test
// To expand from 3 to 5 levels later, add 'very_low' and 'very_high' to TRAIT_LEVELS
// and update LEVEL_THRESHOLDS accordingly

export const TRAITS = [
    'openness',
    'conscientiousness',
    'extraversion',
    'agreeableness',
    'neuroticism',
  ] as const
  
  export const TRAIT_LEVELS = [
    'low',
    'medium',
    'high',
  ] as const
  
  export const TRAIT_LABELS_JP: Record<string, string> = {
    openness: '開放性',
    conscientiousness: '誠実性',
    extraversion: '外向性',
    agreeableness: '協調性',
    neuroticism: '神経症傾向',
  }
  
  export const LEVEL_LABELS_JP: Record<string, string> = {
    low: '低い',
    medium: '普通',
    high: '高い',
  }
  
  // Percentile thresholds for each level
  // To expand to 5 levels later, add very_low (0-10) and very_high (90-100)
  export const LEVEL_THRESHOLDS = {
    low: { min: 0, max: 33 },
    medium: { min: 34, max: 66 },
    high: { min: 67, max: 100 },
  }
  
  export type Trait = typeof TRAITS[number]
  export type TraitLevel = typeof TRAIT_LEVELS[number]