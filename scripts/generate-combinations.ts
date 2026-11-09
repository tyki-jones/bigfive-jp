// scripts/generate-combinations.ts
// Deterministically enumerates all 3,125 Big Five band combinations.
// Run once with `npx tsx scripts/generate-combinations.ts` to produce
// combinations.json — the master worklist for the Claude Code generation task.

import { writeFileSync } from "fs";

const LEVELS = ["very_low", "low", "medium", "high", "very_high"] as const;
type Level = (typeof LEVELS)[number];

interface Combination {
  combination_key: string;
  openness: Level;
  conscientiousness: Level;
  extraversion: Level;
  agreeableness: Level;
  neuroticism: Level;
  done: boolean; // tracks whether this combination has been generated + inserted
}

const combinations: Combination[] = [];

for (const openness of LEVELS) {
  for (const conscientiousness of LEVELS) {
    for (const extraversion of LEVELS) {
      for (const agreeableness of LEVELS) {
        for (const neuroticism of LEVELS) {
          // Trait order matches your locked combination_key format:
          // openness, conscientiousness, extraversion, agreeableness, neuroticism
          // joined with "-" — same format as responses.combination_key
          // (levels like "very_low" already contain "_", so "-" keeps keys splittable).
          const combination_key = [
            openness,
            conscientiousness,
            extraversion,
            agreeableness,
            neuroticism,
          ].join("-");

          combinations.push({
            combination_key,
            openness,
            conscientiousness,
            extraversion,
            agreeableness,
            neuroticism,
            done: false,
          });
        }
      }
    }
  }
}

console.log(`Generated ${combinations.length} combinations.`); // should log 3125

// Shuffle before writing. The nested-loop generation order groups combinations
// that share openness/conscientiousness/extraversion together (since those are
// the outer loop variables), meaning sequential batches would otherwise consist
// of items that are 3/5 traits identical — a real risk for templated, repetitive
// output across a batch (confirmed in practice: batch 1's shared "限られた人間
// 関係と慣れた環境の中で" opening across all 25 items). Shuffling ensures each
// batch draws a heterogeneous spread across the full trait space instead.
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const shuffled = shuffle(combinations);

writeFileSync(
  "scripts/combinations.json",
  JSON.stringify(shuffled, null, 2)
);

console.log("Written to scripts/combinations.json");