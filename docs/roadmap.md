# Big Five JP: Roadmap

Draft for discussion. Last updated: 2026-11-15.

## Vision

**A free Japanese Big Five test that is more accurate and more useful than the alternatives:**
research-based questions written for Japanese respondents, scores compared with real Japanese data,
and results written to be read and acted on (work, relationships, daily life).

What this means in practice:

| Principle | In practice |
|---|---|
| Accuracy first | Own questions (v2), save every answer, check question quality, replace the borrowed Saito averages with our own |
| Results worth reading | 3,125 written narratives; later, softer sub-trait detail |
| Respect for users | No sign-up, nothing that identifies a person, results not public or searchable |
| Sustainable | Low running cost; ads only once there is traffic and enough content to support them |

## Where we are (Nov 2026)

- Live on Vercel (`…vercel.app`). Survey, results page with narratives, share button.
- Question set **v2** live: 60 original questions, 3 sub-traits per trait, 6 reversed per trait.
- Every response saves individual answers, question set and page times.
- Scores still use the Saito (2001) averages, which were measured on different questions → percentiles are approximate.
- Known gaps: anyone with the public key can read all responses; no sitemap / robots / `lang="ja"`;
  results pages could be indexed by Google; 163 narratives contain banned comparison phrases.

## Phases

Each phase depends on the one before it. Within a phase, the order is the suggested order.

### Phase 0: Make the live site safe (now, before promoting it)

1. **Lock down responses:** read results on the server with a private key; remove public read access in Supabase.
2. **Search basics:** `lang="ja"`, `robots.txt`, sitemap, and "don't index" on results pages.
3. **Domain decision** (see open decisions). If buying one: connect it, update `NEXT_PUBLIC_SITE_URL`, redirect the `vercel.app` address.
4. **Google Search Console:** verify, submit the sitemap, request indexing.
5. **About / privacy page:** what the test is, what is saved (anonymous answers), that it is not a medical diagnosis.

### Phase 1: Polish for first visitors (next 1–2 months)

1. **Share preview image** for X / LINE (the card shown when a link is shared).
2. **Fix the 163 narratives** with banned comparison phrases (「多くの人は…」 etc.).
3. **Confirm before leaving** a half-finished survey.
4. **Results feedback:** one optional question on the results page: 「この結果は、あなたに当てはまっていると思いますか？」.
5. **Visitor analytics** (e.g. Vercel Analytics): visits, survey completion rate, where people drop off.
6. **Note on the results page** that percentiles are provisional until we have our own data.

### Phase 2: Grow traffic (alongside Phase 1, ongoing)

1. **Content pages** for search: one page per trait (what it means, what high/low looks like), "What is the Big Five?", FAQ.
   These bring in search traffic and are required before ads are approved.
2. Share the test where the audience is (X, note, Reddit-like communities); track which brings completions.

### Phase 3: Check the questions (at ~300–500 v2 responses)

1. **Analysis script** in `scripts/`: careless-answer filter, per-question checks, consistency per trait (target ≥ .70), sub-trait grouping.
2. **Rewrite weak questions** (a few per round); test candidates as unscored extra questions first (`pool = 'trial'`).
3. Optional: **attention check** question; **anonymous retake ID** to measure stability over time.

### Phase 4: Own scoring data (at ~1,000–2,000 v2 responses)

1. **Replace the Saito averages** with our own percentile table.
2. **Sub-trait detail** on results (soft wording: e.g. 外向性の中では「自己主張」が強め).
3. Remove the "provisional" note.

### Phase 5: Monetize (once traffic is steady, ~1,000+ visits/month)

1. Move to a hosting plan that allows commercial use (Vercel Pro, or a host whose free plan allows it).
2. Update the privacy page for ads and cookies.
3. Apply for ads (AdSense usually needs your own domain and enough original content: see Phases 0 and 2).
4. Place ads where they don't interrupt the survey (results page and content pages only).

### Later ideas (not scheduled)

- Compatibility / compare results with a friend
- English version
- Paid detailed report (PDF)
- Results by age group once there is enough data

## Open decisions

| Decision | Options | Affects |
|---|---|---|
| Main goal for the next 6 months | Traffic / accuracy research / revenue | Order of Phases 2–5 |
| Own domain? | `.com` (~¥2,000/yr) / `.jp` (~¥4,000/yr) / stay on `vercel.app` | Phase 0 step 3, ads approval |
| Collect age group / gender? | Yes (optional fields) / No | Norms by group, sanity checks; adds questions |
| When to add ads | At a traffic threshold / never / from the start | Phase 5, hosting cost |

## Data milestones

| v2 responses (after removing careless ones) | Unlocks |
|---|---|
| ~300–500 | Question quality checks (Phase 3) |
| ~500+ | Sub-trait structure check |
| ~1,000–2,000 | Own percentiles (Phase 4) |
| Several thousand | Averages by age / gender, reliable sub-trait scores |
