# 質問セット v2（下書き）

Status: **draft, not in the database yet.** Machine-readable version: [questions-v2-draft.json](questions-v2-draft.json)
(same IDs, with `trait`, `facet`, `reverse_scored`, `text_jp`).

All 60 questions are original wording written for this project. None are copied or translated
from a licensed inventory (BFI-2/BFI-2-J, NEO), so they can be used commercially.

## 設計方針

| Rule | Why |
|---|---|
| 12 per trait = 3 sub-traits (下位特性) × 4 questions | Each question covers a different side of the trait, so questions don't feel repeated; also enables sub-trait scores |
| Each sub-trait: 2 normal + 2 reversed → 6/6 per trait | Cancels the habit of agreeing with everything (old set: openness 0 reversed, neuroticism 1) |
| Reversed questions describe the *other pole*, mostly without 「〜ない」 | Negated sentences are a known source of misreading |
| Short, one idea each (avg 20 characters), no 「私は」 | Shorter questions give more consistent answers; 「私は」 moves to the instructions |
| Concrete situations or behaviour, no ability claims (「頭の回転が速い」 etc.) | Ability claims are where wanting to look good / modesty distort answers most |
| No comparison with other people (「他の人より」「〜方だ」) | Avoids the reference-group effect |
| Anger moved to 神経症傾向 (感情の起伏); 協調性 covers how you treat others | Old set put 「怒りっぽい」「かんしゃく」 under agreeableness, overlapping with emotional stability |
| Checked for near-duplicates (character overlap) and repeated sentence endings | So questions don't read alike |

## 指示文（案）

> それぞれの文が、ふだんのあなたにどのくらい当てはまるかを選んでください。
> 深く考えすぎず、最初に思い浮かんだ答えを選んでください。

## 表示順

Unchanged survey logic: 6 pages × 10 questions, 2 per trait per page in ID order.
IDs are ordered so every page has **one normal + one reversed** question per trait, and the
two come from **different sub-traits**. Each sub-trait appears once in pages 1–3 and once in pages 4–6.

## 質問一覧

### 外向性 (extraversion): 下位特性 社交性 ・ 自己主張 ・ 活動性

| ID | 表示 | 下位特性 | 逆転 | 質問 |
|---|---|---|---|---|
| 1 | Q1 | 社交性 |  | 初めて会う人とも、すぐに打ち解けられる。 |
| 2 | Q2 | 自己主張 | R | 目立つ役割は、できれば人に任せたい。 |
| 3 | Q11 | 自己主張 |  | 話し合いでは、自分の意見をはっきり言う。 |
| 4 | Q12 | 活動性 | R | 動き出すまでに、エンジンがかかるのが遅い。 |
| 5 | Q21 | 活動性 |  | 空いた時間には、つい何か予定を入れてしまう。 |
| 6 | Q22 | 社交性 | R | 大勢でいるより、一人で過ごすほうが落ち着く。 |
| 7 | Q31 | 社交性 |  | 飲み会やパーティーには、喜んで参加する。 |
| 8 | Q32 | 自己主張 | R | 会議や授業では、指名されるまで発言しない。 |
| 9 | Q41 | 自己主張 |  | グループでは、自然とまとめ役になる。 |
| 10 | Q42 | 活動性 | R | どちらかというと、もの静かなタイプだ。 |
| 11 | Q51 | 活動性 |  | 周りから、元気で明るい人だと言われる。 |
| 12 | Q52 | 社交性 | R | 自分から人に話しかけることは少ない。 |

### 神経症傾向 (neuroticism): 下位特性 不安 ・ 落ち込み ・ 感情の起伏

| ID | 表示 | 下位特性 | 逆転 | 質問 |
|---|---|---|---|---|
| 13 | Q3 | 不安 |  | 先のことを考えて、心配になることがよくある。 |
| 14 | Q4 | 落ち込み | R | 毎日の生活に、おおむね満足している。 |
| 15 | Q13 | 落ち込み |  | 理由もなく、気分が沈む日がある。 |
| 16 | Q14 | 感情の起伏 | R | 腹が立っても、すぐに冷静になれる。 |
| 17 | Q23 | 感情の起伏 |  | ささいなことで、気分が大きく変わる。 |
| 18 | Q24 | 不安 | R | たいていのことは「なんとかなる」と考えられる。 |
| 19 | Q33 | 不安 |  | 大事な場面の前は、緊張して落ち着かなくなる。 |
| 20 | Q34 | 落ち込み | R | 自分のことを、わりと気に入っている。 |
| 21 | Q43 | 落ち込み |  | 失敗すると、何日も引きずってしまう。 |
| 22 | Q44 | 感情の起伏 | R | 気分は、いつもだいたい一定だ。 |
| 23 | Q53 | 感情の起伏 |  | カッとなって、強い口調になってしまうことがある。 |
| 24 | Q54 | 不安 | R | 予定外のことが起きても、あわてずに対応できる。 |

### 開放性 (openness): 下位特性 知的好奇心 ・ 美的感受性 ・ 想像力

| ID | 表示 | 下位特性 | 逆転 | 質問 |
|---|---|---|---|---|
| 25 | Q5 | 知的好奇心 |  | 知らない分野の話を聞くと、もっと詳しく知りたくなる。 |
| 26 | Q6 | 美的感受性 | R | 美術館や展示会は、退屈に感じる。 |
| 27 | Q15 | 美的感受性 |  | 音楽や絵に、心を強く動かされる。 |
| 28 | Q16 | 想像力 | R | 自由に考えるより、答えが決まっている課題のほうが取り組みやすい。 |
| 29 | Q25 | 想像力 |  | 空想にふけって、時間を忘れることがある。 |
| 30 | Q26 | 知的好奇心 | R | 理屈より、すぐに役立つ話のほうが好きだ。 |
| 31 | Q35 | 知的好奇心 |  | 物事の「なぜ」を考えるのが好きだ。 |
| 32 | Q36 | 美的感受性 | R | 映画や本は、映像や文章が美しくなくても、話の筋が面白ければ十分だ。 |
| 33 | Q45 | 美的感受性 |  | 季節の移り変わりや景色の美しさに、よく目が留まる。 |
| 34 | Q46 | 想像力 | R | 現実離れした話は、ばかばかしく感じる。 |
| 35 | Q55 | 想像力 |  | 新しい企画やアイデアを練るのに、夢中になる。 |
| 36 | Q56 | 知的好奇心 | R | 新しい方法を試すより、慣れたやり方を続けたい。 |

### 誠実性 (conscientiousness): 下位特性 秩序 ・ 勤勉性 ・ 責任感

| ID | 表示 | 下位特性 | 逆転 | 質問 |
|---|---|---|---|---|
| 37 | Q7 | 秩序 |  | 持ち物や部屋は、きちんと整理しておく。 |
| 38 | Q8 | 勤勉性 | R | 締め切りぎりぎりになって、あわてることが多い。 |
| 39 | Q17 | 勤勉性 |  | 始めたことは、最後までやり遂げる。 |
| 40 | Q18 | 責任感 | R | お金や時間を、深く考えずに使ってしまう。 |
| 41 | Q27 | 責任感 |  | 約束の時間は、必ず守る。 |
| 42 | Q28 | 秩序 | R | 物をどこに置いたか、よく忘れる。 |
| 43 | Q37 | 秩序 |  | 予定は前もって立てておく。 |
| 44 | Q38 | 勤勉性 | R | 作業の途中で、ほかのことに気を取られやすい。 |
| 45 | Q47 | 勤勉性 |  | やるべきことがあると、すぐに取りかかる。 |
| 46 | Q48 | 責任感 | R | 面倒な手続きや連絡は、つい人任せにしてしまう。 |
| 47 | Q57 | 責任感 |  | 人に頼まれたことは、忘れずにやる。 |
| 48 | Q58 | 秩序 | R | 書類やメールが、つい溜まりっぱなしになる。 |

### 協調性 (agreeableness): 下位特性 思いやり ・ 礼儀 ・ 信頼

| ID | 表示 | 下位特性 | 逆転 | 質問 |
|---|---|---|---|---|
| 49 | Q9 | 思いやり |  | 困っている人を見ると、手を貸したくなる。 |
| 50 | Q10 | 礼儀 | R | 言い合いになると、相手を言い負かしたくなる。 |
| 51 | Q19 | 礼儀 |  | 意見が違う相手にも、ていねいに接する。 |
| 52 | Q20 | 信頼 | R | 人の親切には、何か裏があるのではと考えてしまう。 |
| 53 | Q29 | 信頼 |  | たいていの人は、根は善い人だと思う。 |
| 54 | Q30 | 思いやり | R | 他人のもめごとからは、距離を置く。 |
| 55 | Q39 | 思いやり |  | 人の悩みを聞くと、自分のことのように気になる。 |
| 56 | Q40 | 礼儀 | R | 人の欠点が目につくと、つい指摘してしまう。 |
| 57 | Q49 | 礼儀 |  | 人の話は、最後まで聞くようにしている。 |
| 58 | Q50 | 信頼 | R | 人を信用するまでに、時間がかかる。 |
| 59 | Q59 | 信頼 |  | 人に何かを任せるときは、相手を信じて任せる。 |
| 60 | Q60 | 思いやり | R | 人の相談に乗るのは、正直わずらわしい。 |

## 導入時に必要な変更（未実施）

1. **Database:** add `facet text` to `questions`; replace the 60 rows (same IDs 1–60 keeps the survey order logic working).
2. **Store item-level answers:** `responses` currently saves only the 5 trait totals. Add `answers jsonb`
   so we can later check each question's quality and build our own norms. Without it, neither is possible.
3. **Scoring:** raw range stays 12–84 per trait (12 questions × 1–7), so the code keeps working.
   But the Saito (2001) averages were never measured on these questions, so percentiles are approximate until we have our own data.
4. **Sub-trait scores:** 4 questions each is too few for reliable percentiles. Show them as the person's
   relative emphasis *within* a trait (e.g. 外向性の中では「自己主張」が強め), not as numbers vs. other people.
5. **After ~300–500 responses:** check each trait's internal consistency (target α ≥ .70) and each question's
   correlation with its trait; rewrite weak questions. After a few thousand: replace the Saito averages with our own.
6. **Optional attention check:** one extra, unscored question such as 「この質問には、真ん中の円を選んでください」 (the scale only labels its two ends)
   to filter careless answers out of the data used for norms.
