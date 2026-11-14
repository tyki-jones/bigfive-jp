-- Question set v2: replaces all 60 questions (same IDs 1–60).
-- Generated from docs/questions-v2-draft.json. Run once in the Supabase SQL editor.
-- Responses saved before this keep question_set = 'v1'; the v1 questions they answered
-- are archived in docs/questions-v1.json.

begin;

alter table questions add column if not exists facet text;

insert into questions (id, text_jp, trait, facet, reverse_scored, pool) values
  (1, '初めて会う人ともすぐに打ち解けられる。', 'extraversion', '社交性', false, 'core'),
  (2, '目立つ役割はできれば人に任せたい。', 'extraversion', '自己主張', true, 'core'),
  (3, '話し合いでは自分の意見をはっきり言う。', 'extraversion', '自己主張', false, 'core'),
  (4, '動き出すまでに、エンジンがかかるのが遅い。', 'extraversion', '活動性', true, 'core'),
  (5, '空いた時間にはつい何か予定を入れてしまう。', 'extraversion', '活動性', false, 'core'),
  (6, '大勢でいるより一人で過ごすほうが落ち着く。', 'extraversion', '社交性', true, 'core'),
  (7, '飲み会やパーティーには喜んで参加する。', 'extraversion', '社交性', false, 'core'),
  (8, '会議や授業では指名されるまで発言しない。', 'extraversion', '自己主張', true, 'core'),
  (9, 'グループでは自然とまとめ役になる。', 'extraversion', '自己主張', false, 'core'),
  (10, 'どちらかというと、もの静かなタイプだ。', 'extraversion', '活動性', true, 'core'),
  (11, '周りから元気で明るい人だと言われる。', 'extraversion', '活動性', false, 'core'),
  (12, '自分から人に話しかけることは少ない。', 'extraversion', '社交性', true, 'core'),
  (13, '先のことを考えて心配になることがよくある。', 'neuroticism', '不安', false, 'core'),
  (14, '毎日の生活におおむね満足している。', 'neuroticism', '落ち込み', true, 'core'),
  (15, '理由もなく気分が沈む日がある。', 'neuroticism', '落ち込み', false, 'core'),
  (16, '腹が立ってもすぐに冷静になれる。', 'neuroticism', '感情の起伏', true, 'core'),
  (17, 'ささいなことで気分が大きく変わる。', 'neuroticism', '感情の起伏', false, 'core'),
  (18, 'たいていのことは「なんとかなる」と考えられる。', 'neuroticism', '不安', true, 'core'),
  (19, '大事な場面の前は緊張して落ち着かなくなる。', 'neuroticism', '不安', false, 'core'),
  (20, '自分のことをわりと気に入っている。', 'neuroticism', '落ち込み', true, 'core'),
  (21, '失敗すると何日も引きずってしまう。', 'neuroticism', '落ち込み', false, 'core'),
  (22, '気分はいつもだいたい一定だ。', 'neuroticism', '感情の起伏', true, 'core'),
  (23, 'カッとなって強い口調になってしまうことがある。', 'neuroticism', '感情の起伏', false, 'core'),
  (24, '予定外のことが起きても、あわてずに対応できる。', 'neuroticism', '不安', true, 'core'),
  (25, '知らない分野の話を聞くと、もっと詳しく知りたくなる。', 'openness', '知的好奇心', false, 'core'),
  (26, '美術館や展示会は退屈に感じる。', 'openness', '美的感受性', true, 'core'),
  (27, '音楽や絵に心を強く動かされる。', 'openness', '美的感受性', false, 'core'),
  (28, '自由に考えるより、答えが決まっている課題のほうが取り組みやすい。', 'openness', '想像力', true, 'core'),
  (29, '空想にふけって時間を忘れることがある。', 'openness', '想像力', false, 'core'),
  (30, '理屈よりすぐに役立つ話のほうが好きだ。', 'openness', '知的好奇心', true, 'core'),
  (31, '物事の「なぜ」を考えるのが好きだ。', 'openness', '知的好奇心', false, 'core'),
  (32, '映画や本は映像や文章が美しくなくても、話の筋が面白ければ十分だ。', 'openness', '美的感受性', true, 'core'),
  (33, '季節の移り変わりや景色の美しさによく目が留まる。', 'openness', '美的感受性', false, 'core'),
  (34, '現実離れした話は、ばかばかしく感じる。', 'openness', '想像力', true, 'core'),
  (35, '新しい企画やアイデアを練るのに夢中になる。', 'openness', '想像力', false, 'core'),
  (36, '新しい方法を試すより慣れたやり方を続けたい。', 'openness', '知的好奇心', true, 'core'),
  (37, '持ち物や部屋はきちんと整理しておく。', 'conscientiousness', '秩序', false, 'core'),
  (38, '締め切りぎりぎりになってあわてることが多い。', 'conscientiousness', '勤勉性', true, 'core'),
  (39, '始めたことは最後までやり遂げる。', 'conscientiousness', '勤勉性', false, 'core'),
  (40, 'お金や時間を深く考えずに使ってしまう。', 'conscientiousness', '責任感', true, 'core'),
  (41, '約束の時間は必ず守る。', 'conscientiousness', '責任感', false, 'core'),
  (42, '物をどこに置いたか、よく忘れる。', 'conscientiousness', '秩序', true, 'core'),
  (43, '予定は前もって立てておく。', 'conscientiousness', '秩序', false, 'core'),
  (44, '作業の途中で、ほかのことに気を取られやすい。', 'conscientiousness', '勤勉性', true, 'core'),
  (45, 'やるべきことがあるとすぐに取りかかる。', 'conscientiousness', '勤勉性', false, 'core'),
  (46, '面倒な手続きや連絡はつい人任せにしてしまう。', 'conscientiousness', '責任感', true, 'core'),
  (47, '人に頼まれたことは忘れずにやる。', 'conscientiousness', '責任感', false, 'core'),
  (48, '書類やメールがつい溜まりっぱなしになる。', 'conscientiousness', '秩序', true, 'core'),
  (49, '困っている人を見ると手を貸したくなる。', 'agreeableness', '思いやり', false, 'core'),
  (50, '言い合いになると相手を言い負かしたくなる。', 'agreeableness', '礼儀', true, 'core'),
  (51, '意見が違う相手にも、ていねいに接する。', 'agreeableness', '礼儀', false, 'core'),
  (52, '人の親切には、何か裏があるのではと考えてしまう。', 'agreeableness', '信頼', true, 'core'),
  (53, 'たいていの人は、根は善い人だと思う。', 'agreeableness', '信頼', false, 'core'),
  (54, '他人のもめごとからは距離を置く。', 'agreeableness', '思いやり', true, 'core'),
  (55, '人の悩みを聞くと、自分のことのように気になる。', 'agreeableness', '思いやり', false, 'core'),
  (56, '人の欠点が目につくと、つい指摘してしまう。', 'agreeableness', '礼儀', true, 'core'),
  (57, '人の話は最後まで聞くようにしている。', 'agreeableness', '礼儀', false, 'core'),
  (58, '人を信用するまでに時間がかかる。', 'agreeableness', '信頼', true, 'core'),
  (59, '人に何かを任せるときは、相手を信じて任せる。', 'agreeableness', '信頼', false, 'core'),
  (60, '人の相談に乗るのは正直わずらわしい。', 'agreeableness', '思いやり', true, 'core')
on conflict (id) do update set
  text_jp        = excluded.text_jp,
  trait          = excluded.trait,
  facet          = excluded.facet,
  reverse_scored = excluded.reverse_scored,
  pool           = excluded.pool;

commit;

-- Check: expect 5 rows, each with 12 questions and 6 reversed.
select trait, count(*) as questions, count(*) filter (where reverse_scored) as reversed
from questions group by trait order by trait;
