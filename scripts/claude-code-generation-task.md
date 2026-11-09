# Claude Code Task: Narrative Batch Generation

## Setup (one-time)

1. Run `npx tsx scripts/generate-combinations.ts` to produce `scripts/combinations.json`
   — a worklist of all 3,125 combinations, each with a `done: false` flag.
2. Confirm `scripts/master-prompt.md` contains the finalized master prompt (v2, locked).
3. Confirm your Supabase credentials are available as env vars
   (`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` or equivalent) so Claude Code can
   insert directly via the Supabase client or CLI.
4. Confirm these reference docs are present in `scripts/`:
   - `bigfive_career.md`
   - `bigfive_romance.md`
   - `bigfive_life.md`
   - `bigfive_interactions.md` (trait-combination interaction findings — this one is
     especially relevant to the OVERVIEW section's core instruction to describe the
     combination as a whole rather than five traits stacked side by side)
5. `scripts/used-phrases.json` is a running list of distinctive phrases already
   used across ALL batches so far — unlike the per-session drift check, this
   persists across `/clear` and across days. It's created automatically by the
   first batch if it doesn't exist yet. This exists because a spot-check across
   80 generated rows found the same distinctive phrase ("誰にも借りない...")
   reused verbatim across two different combinations from different batches —
   the within-session drift check didn't catch it because the two occurrences
   weren't in the same session. The strict add-time bar in step 3 below (only
   track specific techniques/metaphors/scenes, never bare trait-adjective
   pairings) is the primary defense against the list filling up with
   generic entries — periodic pruning (e.g., every 5-10 batches, asking
   Claude Code to review scripts/used-phrases.json for entries that are
   actually generic/common and remove them) is a backstop, not a substitute
   for being selective at add time.

## Per-batch instructions (give this to Claude Code at the start of each session)

```
First, read these four reference files in full and hold them in context for this
entire session (read once, not per-item):
  - scripts/bigfive_career.md
  - scripts/bigfive_romance.md
  - scripts/bigfive_life.md
  - scripts/bigfive_interactions.md

When generating OVERVIEW sections in particular, check bigfive_interactions.md for
any documented findings specific to this combination's actual trait pairing(s) —
not just each trait individually — and let that inform paragraph 3 (the
uniqueness/rarity paragraph) where relevant. Don't force a citation-like reference
to it; use it the same lighter-touch way described in the master prompt's
"参照資料の使い方" sections for the other three docs.

Read scripts/combinations.json. Find the first 50 entries where "done" is false.

For each of these 50 combinations:

1. Generate a narrative using the master prompt in scripts/master-prompt.md,
   substituting the combination's openness/conscientiousness/extraversion/
   agreeableness/neuroticism levels into the {placeholders}. Before drafting,
   read the "First-draft length calibration" note near the end of
   master-prompt.md (under "Notes for the generation script") — first drafts
   have consistently landed well under the target character counts across every
   batch so far, costing several extra edit rounds per combination. Draft toward
   the upper-middle of each field's target range from the start, using the
   per-field sentence-count/length heuristics in that note, rather than writing
   what feels like a "complete" paragraph and checking length after the fact.

2. Parse your own output into the five sections: OVERVIEW, LIFE_ADVICE,
   CAREER, ROMANCE, OVERALL_ADVICE (split on the ---SECTION_NAME--- markers).

3. Validate before inserting:
   - Every section present, ending with ---END--- (flag if truncated)
   - OVERVIEW: 700–900 characters
   - LIFE_ADVICE / CAREER / ROMANCE: 500–700 characters each
   - OVERALL_ADVICE: 200–300 characters
   - No banned comparative phrases: と違って, 他の人より, 多くの人が...できない中で,
     ように振り回される, より優れています, 誰よりも, 他の人以上に
   - No detached third-person framing: この配置, この組み合わせは, こうしたタイプの人
   - No more than 2 em-dashes (——) in the combined output
   - No phrase or sentence repeated within the same field (check each of the
     5 fields individually — e.g., a closing line like "焦らず、少しずつで
     大丈夫です" should not appear twice within the same OVERALL_ADVICE, or
     any other single field)
   - Check scripts/used-phrases.json (create it if it doesn't exist yet,
     starting as an empty array). If this generation reuses a phrase already
     in that list, rewrite that instance with different wording. After a
     generation passes validation, extract any distinctive/memorable phrase
     from it and append it to scripts/used-phrases.json before moving to the
     next combination — but hold additions to a strict bar, tighter than
     "5+ characters, not generic filler":
       ○ ADD: a specific technique or action ("六割の完成度で一度共有する"），
         an unusual metaphor or image ("絵に描いた餅を本物の餅に変えてしまう力"),
         or a phrase anchored to a concrete scene — something that wouldn't
         arise from two different people independently describing the same
         trait level.
       ○ DO NOT ADD: a bare [adjective]+[trait-noun] pairing that just names
         a trait level the obvious way — e.g. "動じない安定感",
         "物おじしない社交性", "静かな独立心", "豊かな内面世界", "静かな強さ".
         These are near-inevitable phrasings that will recur naturally across
         3,125 combinations sharing a trait level; tracking them only
         produces false-positive collisions that force awkward synonym
         rewrites, without protecting against anything a reader would
         actually notice repeated.
       ○ Quick test: could this exact phrase plausibly arise from someone
         else independently describing this trait level, without copying?
         If yes, don't track it.
     86 over-tracked generic entries matching the "don't add" pattern were
     pruned from used-phrases.json on 2026-09-27 for exactly this reason —
     don't reintroduce that category.
   If a generation fails validation, regenerate that one combination before moving on.

4. Insert the validated result into the `narratives` table in Supabase
   (combination_key, overview, life_advice, career, romance, overall_advice).

5. Update that combination's "done" field to true in scripts/combinations.json
   and save the file, so the next session picks up where this one left off.

After all 50 are done, report:
   - How many succeeded on the first try vs. needed regeneration
   - Any combinations that failed validation twice in a row (flag these for
     manual review rather than forcing a third attempt)
   - Total combinations remaining across the whole worklist

## Drift check (end of every batch)

Before closing out the batch, re-read the 3rd-from-last and 2nd-to-last generated
items (not the very last one — pick two from just before the end) and compare them
against the first 2-3 items generated in this same session. Check specifically for:

   - Repetition of phrasing, sentence openers, or paragraph structure that
     wasn't present in the early items
   - Advice/analysis that feels generic or templated compared to how specific
     the early items were
   - Comparative language, detached third-person framing, or em-dash overuse
     creeping back in (the same checks from step 3, but re-applied here
     specifically because late-session drift can reintroduce issues that were
     clean earlier in the session)

If drift is present, regenerate the affected items now, in this session, rather
than letting them into the database as-is. Report whether drift was found and
what (if anything) needed regenerating as a result.
```

## Why batches of 50

Claude Code's context window needs to hold: the master prompt, the three reference
docs (career/romance/life_advice) if referenced in full, 50 rounds of generation +
validation + insertion, and the combinations.json read/write. The batch size is now 50 (previously 25, then 30 and 45). It is a reasonable
starting point — if sessions are running out of context before finishing the batch,
drop to 30.

## Progress tracking

Since `combinations.json` persists `done` status to disk, you can safely:
- Stop and resume across multiple days/sessions
- Run batches in any order (don't need to babysit continuously)
- Check progress at any time with:
  ```
  node -e "const c = require('./scripts/combinations.json'); \
    console.log(c.filter(x => x.done).length + ' / ' + c.length + ' done')"
  ```

## Cost note

This runs under your Claude subscription (Pro/Max), not metered API billing —
confirm with Anthropic's current usage-limit documentation for Claude Code
specifically, since limits and any fair-use caps may differ from chat usage limits.
If you hit a rate/usage ceiling mid-run, that's expected — just resume the next
session or the next day.

## After the full run

1. Verify: `done` count should equal 3,125.
2. Run a stratified spot-check (extremes, mild-leans, all-medium, a few random
   middle-ground ones) reading directly from Supabase.
3. Re-run the validation grep checks across the *entire* table as a final sweep
   (not just per-batch), since cross-batch consistency — not just per-item
   correctness — is worth checking once everything exists together.
