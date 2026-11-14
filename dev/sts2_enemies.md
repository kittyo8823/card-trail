# スレスパ2（Slay the Spire 2）のザコ敵・エリートの調べ（2026-11-14）

- 出典：sts2.untapped.gg の敵ページ（Enemies → 各 Encounter。行動の順番・特性・数値はここが一番くわしい）。補助に brokenbuilds.gg/slay-the-spire-2/encounters。mobalytics.gg は Cloudflare の確認画面で読めなかった。
- 早期アクセスなので数値は変わりうる。brokenbuilds（やや古い版のデータ）と食い違う所は untapped を正とした（例：Byrdonis の Swoop は brokenbuilds 16／untapped 17、Bygone Effigy の Slashes は 15／13）。
- 数値の書き方：`13（A9:15）` ＝通常13、アセンション9以上で15。HP の `〔A8+:…〕` はアセンション8以上。A8 だけ変わる値は `（A8+:…）`。
- 行動の書き方：`A → B → C を繰り返し`。最初の1回だけの行動は「初手」。ランダムは確率と制限（連続なし＝同じ行動を2回続けない、2連続まで、待ち＝使った後そのターン数は選ばれない）。
- 敵の英語名は原作のまま。（ ）の日本語は意味をつかむための仮の訳。
- 「弱い組（Easy）」＝各層の最初の数戦に出る組。「通常（Hard）」＝その後のザコ戦。
- 見た目は untapped にある敵の絵を見て書いた。絵そのものはリポジトリに入れていない（会話の中で一覧画像を見せた）。

## 用語（この調べで出てくる効果。本作の用語に合わせた）
| 原作 | ここでの呼び方 | 中身 |
|---|---|---|
| Strength | 筋力 | 攻撃のダメージ+。 |
| Weak | 脆弱 | 攻撃のダメージ-25%。 |
| Vulnerable | 弱体 | 攻撃で受けるダメージ+50%。 |
| Frail | 虚弱 | カードで得るブロック-25%。 |
| Ritual | 儀式 | 毎ターン終わりに筋力を得る。 |
| Plating | 装甲 | プレイヤーのターン終わりにその値のブロックを得る。毎ターン1ずつ減る。 |
| Artifact | アーティファクト | 次の悪い効果を無効にする（その回数）。 |
| Thorns | 棘 | 攻撃されると相手にダメージを返す。 |
| Vigor | 気合 | 次の攻撃のダメージ+。 |
| Intangible | 実体なし | そのターン受けるダメージ・失うHPを1にする。 |
| Slippery | ぬめり | 次にHPを失う時、1だけにする（値の回数）。 |
| Minion | 手下 | 親玉が死ぬと戦闘から去る。 |
| Illusion | 幻 | 死んでも次のターンに全回復で戻る（本体を倒すしかない）。 |
| Dazed | めまい（状態カード） | 使えない。エセリアル。 |
| Slimed | 粘液（状態カード） | 1枚引く。廃棄。 |
| Infection | 感染（状態カード） | 使えない。ターン終わりに手札にあると3ダメージ。 |
| Toxic | 毒の札（状態カード） | ターン終わりに手札にあると5ダメージ。廃棄。 |
| Burn | 火傷（状態カード） | 使えない。ターン終わりに手札にあると2ダメージ。 |
| Wound | 傷（状態カード） | 使えない。 |

---

# 1層A：草木の層（Overgrowth）

## 弱い組（最初の数戦）
### Fuzzy Wurm Crawler（毛むくじゃらの這い虫）　HP 55-57〔A8+:58-59〕
- 行動：攻撃4（A9:6）→ Inhale（吸い込み）筋力+7 → Acid Goop（酸）攻撃4（A9:6）を繰り返し。3ターン目から急に痛くなる。
- 見た目：紫の長い毛に覆われた太いイモムシ。前に大きく開いた丸い口と、白い牙のような突起。
### Shrinker Beetle（縮める甲虫）　HP 38-40〔A8+:40-42〕
- 初手 Shrinker：縮小1（プレイヤーの攻撃ダメージ-30%、3ターン）。その後 Chomp 7（A9:8）→ Stomp 13（A9:14）を繰り返し。
- 見た目：黄色い甲羅のコガネムシ。数珠のような長い触角、緑の頭。
### A Lone Nibbit（ニビット1匹）　HP 42-46〔A8+:44-48〕
- 行動：Butt（頭突き）12（A9:13）→ 攻撃6（A9:7）＋ブロック5（A8+:6）→ Hiss（威嚇）筋力+2（A9:3）を繰り返し。
- 見た目：青緑のサンショウウオのような四つ足。背中に黄緑のひれ、小さな歯の並ぶ口。
### Slimes（スライムの群れ・弱）　合計 HP 44-61
- 下の4種のスライムから組む（通常の「Swarm of Slimes」と同じ種類）。
### Wrigglers（イベント「深い茂み」の戦闘）　Wriggler×4、各 HP 17-21
- Nasty Bite 6（A9:7）と Wriggle（感染1枚を捨て札へ＋筋力2）を交互。2体ずつ逆の順で始まる。

## 通常の組
### Cubex Construct（立方の構造体）　HP 65〔A8+:70〕
- 開始時：ブロック13、アーティファクト1。
- 初手 Charge Up 筋力+2。その後 Repeater Blast 7（A9:8）＋筋力2 → Repeater Blast 同 → Expel 5（A9:6）×2 を繰り返し（攻撃のたびに強くなる）。
- 見た目：浮かんでいる古い石の板（墓石のような長方形）。中ほどに菱形の宝石、下の台座に青い光の玉。
### Fogmog（霧のキノコ）　HP 74〔A8+:78〕　＋ Eye with Teeth
- 初手 Illusory Spores：Eye with Teeth を呼ぶ → 2手目 Thwack 8（A9:9）＋筋力1。その後ランダム：40%で［攻撃8＋筋力1 → 攻撃14（A9:16）→ Thwack］、60%で［攻撃14 → Thwack］。
- Eye with Teeth：HP 6、幻（倒しても次のターン戻る）。毎ターン Distract：めまい3枚を捨て札へ。
- 見た目：赤茶のキノコの傘に明るい緑の斑点、肌色の太い胴に細い手足、胴に縦の切れ目の顔。Eye with Teeth は白い花の真ん中に目、緑の細い蔓が四方に伸びる。
### Inklets（墨の子）　1体 HP 11-17〔A8+:12-18〕、3体で 33-51
- 開始時：ぬめり1。
- 初手 Jab 3（A9:4）（1体は Whirlwind から）。その後ランダム50%：［Piercing Gaze 10（A9:11）→ Jab］か［Whirlwind 2（A9:3）×3 → Jab］。
- 見た目：真っ黒な小さい影。猫のような耳、白く光る細い目。
### Mawler（噛み裂くもの）　HP 72〔A8+:76〕
- 初手 Claw 4（A9:5）×2。その後ランダム各33%：Rip and Tear 14（A9:16）（連続なし）、Roar 弱体3（1戦闘1回）、Claw（連続なし）。
- 見た目：青い四つ足の恐竜（ワニとオオカミの間）。大きな口に歯、背中に小さなとげ、尾の先に骨のような飾り。
### A Pair of Nibbits（ニビット2匹）　各 HP 42-46
- 前の1匹：攻撃6＋ブロック5 → Hiss 筋力+2 → Butt 12 を繰り返し。後ろの1匹：Hiss → Butt → 攻撃6＋ブロック5（1つずれた順）。
### Overgrowth Crawlers　Shrinker Beetle ＋ Fuzzy Wurm Crawler（合計 93-97）
### Ruby Raiders（紅玉の盗賊団）　合計 HP 56-81（下の5人から3人。合計HPからの推定）
- Axe Raider（斧）HP 20-22：攻撃5（A9:6）＋ブロック5（A9:6）を2回 → Big Swing 12（A9:13）を繰り返し。見た目：緑青色のとげの鎧、片刃の大斧と紋章の盾。
- Brute Raider（大男）HP 30-33：Beat 7（A9:8）→ Roar 筋力+3 を繰り返し。見た目：赤茶の革鎧の大男、角のある兜、腕にとげの腕輪。
- Assassin Raider（暗殺者）HP 18-23：毎ターン Killshot 10（A9:11）。見た目：細身、灰色の尖った頭巾、細い剣、青い裏地のマント。
- Crossbow Raider（弩）HP 18-21：Reload ブロック3 → Fire! 14（A9:16）を繰り返し。見た目：つば広の帽子と羽根飾り、弩を構える。
- Tracker Raider（追跡者）HP 21-25：初手 Track 虚弱2。その後毎ターン Unleash the Hounds 1×8（A9:9）。見た目：毛皮をかぶった猫背の男が黒い猪犬を連れる。
### Swarm of Slimes（スライムの群れ）　合計 HP 76-89
- Twig Slime M（小枝スライム中）HP 26-28：初手 Sticky Shot 粘液1枚を捨て札へ。その後ランダム50%：Pokey Pounce 11（A9:12）（2連続まで）／Sticky Shot（連続なし）。
- Leaf Slime M（葉スライム中）HP 32-35：Sticky Shot 粘液2枚 → Clump Shot 8（A9:9）を繰り返し。
- Twig Slime S（小）HP 7-11：毎ターン Tackle 4（A9:5）。
- Leaf Slime S（小）HP 11-15：ランダム50%で Tackle 3（A9:4）／Goop 粘液1枚（どちらも連続なし）。
- 見た目：Leaf は青灰色の平たい塊の上に苔のような緑が乗り、横長の大きな目が1つ。Twig は黄緑の透けた丸い塊に枯れ枝が何本も刺さり、中に赤い斑点。
### Strangler and Friend（絞め蛇と仲間）　Slithering Strangler ＋ スライム1体か Jaxfruit（合計 67-90）
- Slithering Strangler HP 53-55：初手 Constrict 締め付け3（生きている間、プレイヤーのターン終わりにダメージ）。その後ランダム50%：［Thwack 7（A9:8）＋ブロック5 → Constrict］か［Lash 12（A9:13）→ Constrict］。
- 見た目：赤茶の太い蛇が S 字にとぐろ。体に白いとげ、頭は灰色の兜のような尖った形。
### Overgrowth Flora（草木の花）　Snapping Jaxfruit ＋ Flyconid（合計 78-82）
- Snapping Jaxfruit HP 31-33：毎ターン Energy Orb 3（A9:4）＋筋力2（放っておくと一番危ない）。見た目：赤い丸い実（ザクロのような網目）、上に赤い葉と2本の芽。
- Flyconid HP 47-49：初手ランダム50%で Frail Spores 8（A9:9）＋虚弱2／Smash 11（A9:12）。その後ランダム各33%：Vulnerable Spores 弱体2（使ったら3ターン待ち）、Frail Spores（2ターン待ち）、Smash（連続なし）。見た目：黄色いキノコが3つ咲いた植物、細い茎に緑の点、下に緑の根。
### Shroom and Slime　Leaf Slime M ＋ Flyconid ＋ Twig Slime M（合計 73-84）
### Vine Shambler（蔓の歩くもの）　HP 61〔A8+:64〕
- 行動：Swipe 6（A9:7）×2 → Grasping Vines 8（A9:9）＋もつれ1（このターン攻撃カードのコスト+1）→ Chomp 16（A9:18）を繰り返し。
- 見た目：黄土色の蔓と草の束でできた四つ足の獣。大きな口に歯、緑の葉が点々と付く。

## エリート
### Bygone Effigy（いにしえの像）　HP 127〔A8+:132〕
- 開始時：Slow（プレイヤーがカードを使うたび、そのターンこの敵が攻撃で受けるダメージ+10%）。
- 行動：1ターン目 Sleep（何もしない）→ 2ターン目 Wake 筋力+10 → 以後毎ターン Slashes 13（A9:15）（筋力込みで23〜）。
- 見た目：苔むした緑灰色の石像。台座の上に立つ男が大きな鎌を掲げ、盾を持つ。
### Byrdonis（ビルドニス・鳥）　HP 81-84〔A8+:90〕
- 開始時：Territorial（縄張り：毎ターン終わりに筋力+1）。
- 行動：Swoop 17（A9:19）→ Peck 3（A9:4）×3 を繰り返し（筋力が毎ターン増えるので、Peck が後になるほど痛い）。
- 見た目：明るい緑の羽の大きな鳥（ダチョウ型）。ピンクの曲がったくちばし、黒い爪の脚、長い緑の尾羽。
### Phrog Parasite（寄生ガエル）　HP 61-64〔A8+:66-68〕
- 開始時：Infested 4（死ぬと Wriggler が4体出てくる）。
- 行動：Infect 感染3枚を捨て札へ → Lash 4（A9:5）×4 を繰り返し。
- 出てきた Wriggler（HP 17-21）：出たターンは気絶。その後 Nasty Bite 6（A9:7）と Wriggle（感染1枚＋筋力2）を交互（2体ずつ逆の順）。
- 見た目：黄色い丸い体から茶色のミミズのような触手が何本も生え、表面に黄色い目玉のような突起。Wriggler は口の周りにミミズ状の触手が並び、中に牙。

---

# 1層B：地下の船着き場（Underdocks）

## 弱い組
### Corpse Slugs（死肉ナメクジ2匹）　各 HP 25-27〔A8+:27-29〕
- 開始時：Ravenous 4（A9:5）（他の敵が死ぬとすぐ食べ、気絶する代わりに筋力を得る）。
- 3つの行動 Goop 虚弱2 → Whip Slap 3×2 → Glomp 8（A9:9）を繰り返し。1匹ずつ始まりがずれる。
- 見た目：青いナメクジ、背に黄色の筋、頭にピンクの細い触手の房。
### Seapunk（海のちんぴら）　HP 44-46〔A8+:47-49〕
- 行動：Sea Kick 11（A9:13）→ Spinning Kick 2×4 → Bubble Burp ブロック7（A8+:8）＋筋力1（A9:2）を繰り返し。
- 見た目：緑の海藻のかたまりの体、頭から先に葉の付いた細い茎が何本も伸びる。四角く開いた口。
### Sludge Spinner（ヘドロの回転体）　HP 37-39〔A8+:41-42〕
- 初手 Oil Spray 8（A9:9）＋脆弱1。その後ランダム各33%（どれも連続なし）：Oil Spray、Slam 11（A9:12）、Rage 6（A9:7）＋筋力3。
- 見た目：虹色の油膜のような傘（クラゲかコマ）に赤い目、下から黒い触手。
### Toadpoles（オタマジャクシ2匹）　各 HP 21-25
- 前：Spiken 棘2 → Spike Spit（棘-2）3（A9:4）×3 → Whirl 7（A9:8）を繰り返し。後ろ：Whirl から始まる同じ順。
- 見た目：灰緑の細長いオタマジャクシ、大きなオレンジの目、背に赤い点線。

## 通常の組
### Many Corpse Slugs　Corpse Slug 3匹（合計 75-81）
### Cultists（教団員2人）　合計 89-94
- Calcified Cultist（石化した教団員）HP 38-41：初手 Incantation 儀式2 → 以後毎ターン Dark Strike 9（A9:11）。
- Damp Cultist（湿った教団員）HP 51-53：初手 Incantation 儀式5（A9:6）→ 以後毎ターン Dark Strike 1（A9:3）（儀式で毎ターン一気に強くなる）。
- 見た目：鳥の頭蓋骨のような白い顔、青灰色のぼろ衣。片手に鉤、片手に槍。
### Underdocks Wildlife　Calcified Cultist ＋ Seapunk（合計 82-87）
### Fossil Stalker（化石の忍び寄るもの）　HP 51-53〔A8+:54-56〕
- 開始時：Suck 3（防がれずに攻撃が当たるたび筋力を得る）。
- 初手 Latch 12（A9:14）。その後ランダム各33%（どれも2連続まで）：Latch、Tackle 9（A9:11）＋虚弱1、Lash 3（A9:4）×2。
- 見た目：ハチの巣のような穴だらけの骨色の塊に、赤い細い脚と触手。
### Two Gremlins in a Trenchcoat（コートの中の小鬼2匹）　Gremlin Merc HP 47-49〔A8+:51-53〕
- 開始時：Thievery 20（攻撃のたび金20を盗む）、Surprise（倒すと中から Fat Gremlin と Sneaky Gremlin が出る）。
- 行動：Gimme 7（A8+:8）×2 → Double Smash 6（A8+:7）×2＋脆弱2 → Hehe 8（A8+:9）＋筋力2 を繰り返し。どれも金20を盗む。
- Fat Gremlin HP 13-17：出たターン気絶 → 以後逃げる。Sneaky Gremlin HP 10-14：出たターン気絶 → 以後毎ターン Tackle 9（A9:10）。
- 見た目：Merc は赤茶の角付き頭巾にロングコート、短剣。Fat は赤くて丸い小鬼が袋を頭に担ぐ。Sneaky は赤紫の小鬼、角とマフラー、短剣。
### Haunted Ship（呪われた船）　HP 63〔A8+:67〕
- 初手 Haunt 脆弱3＋めまい5枚を捨て札へ。その後 Swipe 13（A9:14）→ Stomp 4（A9:5）×3 を繰り返し。
- 見た目：壊れた船の甲板（金貨が積もる）を背負ったヤドカリのような怪物。多い脚、望遠鏡のような目。
### Living Fog（生きた霧）　HP 80〔A8+:82〕　＋ Gas Bomb
- 初手 Advanced Gas 8（A9:9）＋スモッグ1（1ターンにスキルは1枚だけ）。その後 Bloat（Gas Bomb を呼ぶ＋5（A9:6））→ Super Gas Blast 8（A9:9）を繰り返し。
- Gas Bomb：HP 7〔A8+:8〕、手下。次のターン Explode 8（A9:9）で自爆。
- 見た目：紫の霧のかたまりに縦に裂けた口と歯、紫の玉が縁に並ぶ。Gas Bomb は灰色の煙の形。
### Punch Construct（拳の構造体）　HP 55〔A8+:60〕
- 開始時：アーティファクト1。
- 行動：READY ブロック10 → Fast Punch 5（A9:6）×2＋虚弱1 → Strong Punch 14（A9:16）を繰り返し。
- 見た目：骨色の木の人形のような体、青いバイザーの頭、拳を構える。
- イベント「Punch Off」では2体（片方は Fast Punch から）。
### Sewer Clam（下水の二枚貝）　HP 56〔A8+:58〕
- 開始時：装甲8（A8+:9）。
- 行動：Jet 10（A9:11）→ Pressurize 筋力+4 を繰り返し。
- 見た目：紫のひだのある大きな二枚貝、上にオレンジの枝サンゴ。
### Two-Tailed Rats（二股尾のネズミ3匹）　各 HP 17-21
- 1匹ずつ初手が違う（Screech 虚弱1／Scratch 8（A9:9）／Disease Bite 6（A9:7））。その後は確率の変わるランダム：Scratch（連続なし）、Disease Bite（連続なし）、Screech（3ターン待ち）、Call for Backup ネズミを1匹呼ぶ（1戦闘1回）。
- 見た目：灰色の毛の痩せたネズミ、細長い鼻、二股の長い尾。

## エリート
### Phantasmal Gardeners（幻の庭師4体）　各 HP 26-31〔A8+:27-32〕
- 開始時：Skittish 6（A8+:7）（毎ターン最初に攻撃を受けた時ブロック+6）。
- 4つの行動 Flail 1×3 → Enlarge 筋力+2（A9:3）→ Bite 5 → Lash 7 を繰り返し。4体が1つずつずれて始まる（毎ターン4種が全部出る）。
- 見た目：錆びた鉄管のような細長い体、上に赤い歯の並んだくちばしの頭、青緑のひれ。
### Skulking Colony（忍び寄る群体）　HP 75〔A8+:80〕
- 開始時：Hardened Shell 20（1ターンに失うHPは20まで）。
- 行動：Zoom 14（A9:16）→ Zoom 14 → Inertia 9（A9:11）＋筋力2（A9:4）→ Piercing Stabs 7（A9:8）×2 を繰り返し。
- 見た目：赤茶と紫のサンゴや貝が積み重なった体、青い枝サンゴの脚。
### Terror Eel（恐怖のウナギ）　HP 140〔A8+:150〕
- 開始時：Shriek（初めてHPが半分以下になると気絶）。
- 行動：Crash 16（A9:18）→ Thrash 3（A9:4）×3＋気合6 を繰り返し。気絶した後 Terrorize：弱体99 → Crash に戻る。
- 見た目：灰青色の太いウナギ、体中に赤い目玉の模様、背に黄と黒の縞のとげ、尖った長い口に歯。

---

# 2層：巣（Hive）

## 弱い組
### Bowlbugs（器虫）　合計 HP 66-86（Rock ＋ Egg か Nectar の2匹。合計HPからの推定）
- Bowlbug (Rock) 岩 HP 45-48：開始時 Imbalanced（攻撃を完全に防がれると気絶）。毎ターン Headbutt 15（A9:16）。防がれたら次のターンは気絶。
- Bowlbug (Egg) 卵 HP 21-22：毎ターン Bite 7（A9:8）＋ブロック7（A9:8）。
- Bowlbug (Nectar) 蜜 HP 35-38：Thrash 3 → Buff 筋力+15（A9:16）→ 以後ずっと Thrash 3（3ターン目から18）。
- Bowlbug (Silk) 糸 HP 40-43：Toxic Spit 脆弱1 → Thrash 4（A9:5）×2 を繰り返し（通常の組だけ）。
- 見た目：丸い甲虫が背中に大きなものを背負う（青緑の卵／オレンジの蜜／灰色の岩／白い糸玉）。大きな水色の片目、黄色いくちばし。体の色は種類ごとに違う（黄緑・赤紫・赤・薄桃）。
### Exoskeletons（抜け殻3匹）　各 HP 24-28〔A8+:25-29〕
- 開始時：Hard to Kill 9（1回に受けるダメージ・失うHPは9まで）。
- 1匹ずつ初手が違う（Skitter／Mandibles → Enrage／Enrage）。その後ランダム50%：Skitter 1×3（A9:×4）（連続なし）か［Mandibles 8（A9:9）→ Enrage 筋力+2］。
- 見た目：茶色く半透明の、セミの抜け殻のような虫。細長い脚と触角。
### Thieving Hopper（盗むバッタ）　HP 79〔A8+:84〕
- 開始時：Escape Artist（4ターン後に逃げる）。
- 行動（1回ずつ）：Thievery 17（A9:19）＋カード1枚を盗む → Flutter 羽ばたき5（攻撃で受けるダメージ半分）→ Hat Trick 21（A9:23）→ Nab 14（A9:16）→ Escape（逃げる）。
- 見た目：細長い緑と黄のバッタ（カマキリに近い）、黒と黄の縞の腹、長い触角。
### Tunneler（穴掘り）　HP 87〔A8+:92〕
- 行動：Bite 13（A9:15）→ Burrow 潜る＋ブロック32（A8+:37）→ 潜っている間 Attack from Below 23（A9:26）を繰り返し。潜っている間はブロックが消えず、ブロックを全部削られると気絶 → Bite に戻る。
- 見た目：地面から上半身を出した赤紫の大きな甲虫、黒い長い触角、ピンクの顔。

## 通常の組
### Bowlbug Swarm（器虫の群れ）　Rock・Egg・Nectar・Silk（合計 101-129）
### An Automaton Pair（自動人形2体・Chomper）　各 HP 60-64〔A8+:63-67〕
- 開始時：アーティファクト2。
- 1体目：Clamp 8（A9:9）×2 → Screech めまい3枚を捨て札へ を繰り返し。2体目は Screech から（毎ターンどちらか片方が攻撃）。
- 見た目：金色の機械の虫。大きなハサミのような顎、青い玉の目、4本の機械の脚。
### Many Exoskeletons　抜け殻4匹（合計 96-112）
### Hunter Killer（狩り殺すもの）　HP 121〔A8+:126〕
- 初手 Tenderizing Goop：Tender 1（カードを使うたび、そのターン筋力・敏捷-1）。その後ランダム50%：Bite 17（A9:19）（連続なし）／Puncture 7（A9:8）×3（2連続まで）。
- 見た目：赤いスズメバチのような虫。半透明の羽、口から黄色い輪、長いとげの尾。
### Louse Progenitor（シラミの祖）　HP 134-136〔A8+:138-141〕
- 開始時：Curl Up 14（A8+:18）（初めてダメージを受けた時丸まってブロック。1戦闘1回）。
- 行動：Web Cannon 9（A9:10）＋虚弱2 → Curl and Grow ブロック14（A8+:18）＋筋力+5 → Pounce 14（A9:16）を繰り返し。
- 見た目：青と黄土色の毛が生えた大きなダンゴムシ。腹に黄色いとげの脚、頭から緑の蔓。
### Mass of Mytes（ダニの群れ2匹）　各 HP 61-67〔A8+:64-69〕
- 1匹目：Toxic Cornucopia 毒の札2枚を手札へ → Bite 13（A9:15）→ Suck 4（A9:6）＋筋力2（A9:3）を繰り返し。2匹目は Suck から。
- 見た目：オレンジ色の大きなダニ。長い曲がった脚、甲羅の下に白い牙。
### Ovicopter（卵の飛ぶもの）　HP 124-130〔A8+:126-132〕
- 初手 Lay Eggs：Tough Egg を3つ産む。その後 Smash 16（A9:17）→ Tenderizer 7（A9:8）＋弱体2 → 仲間が2体以下なら Lay Eggs、そうでなければ Nutritional Paste 筋力+3（A9:4）を繰り返し。
- Tough Egg HP 14-18：数ターン後 Hatchling（HP 19-21）にかえる。Hatchling は毎ターン Nibble 4（A9:5）。
- 見た目：頭蓋骨のような白い顔のハエ。半透明の羽、オレンジの脚で青緑の卵を抱える。卵は青緑のぶよぶよした丸。Hatchling は白い幼虫に羽とオレンジの脚。
### Slumber Party（眠りの会）　Bowlbug Rock ＋ Bowlbug Silk ＋ Slumbering Beetle（合計 171-177）
- Slumbering Beetle HP 86〔A8+:89〕：開始時 装甲15（A8+:18）、Slumber 3（3ターンたつか、3回HPを失うと起きる）。眠っている間は Snore（何もしない）。起きたら毎ターン Roll Out 16（A9:18）＋筋力2。
- 見た目：紫の大きなカブトムシ、緑の斑点、前に長い角。
### Spiny Toad（とげのヒキガエル）　HP 116-119〔A8+:121-124〕
- 行動：Protruding Spikes 棘+5 → Spike Explosion 23（A9:25）（棘-5）→ Tongue Lash 17（A9:19）を繰り返し。
- 見た目：緑の大きなヒキガエル、黒い角ととげ、オレンジの目、体に赤い斑点。
### The Obscura（暗がり）　HP 123〔A8+:129〕　＋ Parafright
- 初手 Illusion：Parafright を呼ぶ。その後ランダム各33%（どれも連続なし）：Piercing Gaze 10（A9:11）、Sail 筋力+3、Hardening Strike 6（A9:7）＋ブロック6（A9:7）。
- Parafright：HP 21、幻（倒しても次のターン戻る）。毎ターン Slam 16（A9:17）。
- 見た目：水色のナマコかウミウシ。白いいぼがたくさんあり、頭の先が光る。Parafright は青い光の渦の霊。
### Mysterious Knight（イベント「ランタンの鍵」）　HP 101〔A8+:108〕
- 開始時：筋力6、装甲6。行動は Flail Knight と同じ（下）。

## エリート
### The Decimillipede（大ムカデ）　3つの節、各 HP 40-46〔A8+:46-52〕
- 開始時：Reattach 25（他の節が生きていれば、倒れても2ターン後にHP25で復活）。3つ全部をほぼ同時に倒す必要がある。
- 3つの行動 Bulk 6（A9:7）＋筋力2 → Writhe 5（A9:6）×2 → Constrict 8（A9:9）＋脆弱1 を繰り返し。節ごとに1つずつずれる。復活した後はランダムな行動から再開。
- 見た目：紺色の硬い節とオレンジの腹の巨大なムカデ。地面の穴から弧を描いて出入りする（頭・胴・尾の3つ）。
### Entomancer（虫使い）　HP 145〔A8+:155〕
- 開始時：Personal Hive 1（攻撃を受けるたび、めまいを山札に入れる）。
- 行動：Beeeees! 3×7（A9:×8）→ Spear! 18（A9:20）→ Pheromone Spit を繰り返し。Pheromone Spit は1〜2回目が Personal Hive+1・筋力+1、3回目から筋力+2。
- 見た目：黄色と黒のまだらの大きな塊（蜂の巣）を背負った人。先に輪の付いた杖を持つ。
### Infested Prism（虫の巣くう角錐）　HP 161〔A8+:171〕
- 開始時：Vital Spark 2（A9:3）（スキルカードすべてに Tainted 2 がつく）。
- 行動：Jab 15（A9:17）→ Radiate 11（A9:13）＋ブロック11（A9:13）→ Whirlwind 5（A9:6）×3 → Pulsate 8（A9:10）＋ブロック20（A8+:22）＋Vital Spark+2（A9:3）を繰り返し。
- 見た目：赤い三角錐（ピラミッド）に光る一つ目、周りに青い結晶のかけらが浮く。

---

# 3層：栄光（Glory）

## 弱い組
### Devoted Sculptor（献身の彫刻家）　HP 162〔A8+:172〕
- 初手 Forbidden Incantation 儀式9。以後毎ターン Savage 12（A9:15）（2ターン目21、3ターン目30…と急に強くなる）。
- 見た目：鳥のくちばしの仮面、青いローブ、背中に大きな石材を背負う。
### Scrolls of Biting（噛む巻物3つ）　各 HP 30-37〔A8+:33-39〕
- 開始時：Paper Cuts 2（防がれずに攻撃が当たると最大HP-1）。
- 1つずつ初手が違う（More Teeth／Chomp／Chew）。その後ランダム50%：［Chomp 14（A9:16）→ More Teeth 筋力+2 → Chew 5（A9:6）×2］か Chew（2連続まで）。
- 見た目：紫の巻物が開いて口になり、中にオレンジの牙が並ぶ。両端に木の軸。
### Turret Operator（砲台の操作手）　Living Shield ＋ Turret Operator（合計 96〔A8+:116〕）
- Living Shield（生きた盾）HP 55〔A8+:65〕：Rampart 25（プレイヤーのターン開始時、Turret Operator にブロック25）。仲間がいる間は毎ターン Shield Slam 6、いなくなると毎ターン Smash 16（A9:18）＋筋力3。見た目：緑の鎧の兵士が大きな木の盾を立てる。
- Turret Operator HP 41〔A8+:51〕：Unload! 3（A9:4）×5 を2回 → Reload 筋力+1 を繰り返し。見た目：灰色の大きなネズミ顔の男がガトリング砲を抱える。

## 通常の組
### Axebots（斧ロボ）　HP 70-78〔A8+:76-86〕
- 開始時：Stock 2（倒すと新しい Axebot がその場に出る。2回まで）。
- 行動：Hammer Uppercut 12（A9:14）＋脆弱2＋虚弱2 → The One-Two 9（A9:10）×2 を繰り返し。出直した Axebot は初手 Boot Up（ブロック10（A9:15）＋筋力3（A9:4）、2回目の出直しは筋力6（A9:8））。
- 見た目：赤茶の丸い機械の人型。片腕が両刃の斧、頭に格子の窓。
### Construct Menagerie（構造体の見世物）　Punch Construct 1体 ＋ Cubex Construct 2体（合計 185〔A8+:200〕。数は合計HPからの推定）
### Fabricator（製造機）　HP 150〔A8+:155〕　＋ ロボ
- 仲間が2体以下の時、ランダム50%：Fabricate（Zapbot か Stabbot を1体、Guardbot か Noisebot を1体呼ぶ）／Fabricating Strike 18（A9:21）＋Zapbot か Stabbot を呼ぶ。仲間が3体以上なら Disintegrate 11（A9:13）。
- Guardbot HP 16-20：毎ターン Guard ブロック15。Noisebot HP 18-23：毎ターンめまいを捨て札と山札に1枚ずつ。Stabbot HP 18-23：毎ターン Stab 11（A9:12）＋虚弱1。Zapbot HP 18-23：High Voltage 2（毎ターン終わりに筋力+2）、毎ターン Zap 14（A9:15）。
- 見た目：Fabricator は頭巾の小人が金色の丸い機械（4本のクモの脚、クレーンのアーム）に乗る。ロボはどれも丸い体に赤い三角の目（Guardbot は青い三角の盾2枚、Noisebot は2つのスピーカーと双眼鏡のような目、Stabbot は赤茶のとげ3本、Zapbot は金色で翼と青い電気の脚）。
### Frog Knight（カエルの騎士）　HP 191〔A8+:199〕
- 開始時：装甲15（A8+:19）。
- 行動：Tongue Lash 13（A9:14）＋虚弱2 → Strike Down Evil 21（A9:23）→ For the Queen 筋力+5 を繰り返し。初めてHPが半分を切ると Beetle Charge 35（A9:40）を1回してから Tongue Lash に戻る。
- 見た目：鎧を着たカエルが紫の大きなカブトムシにまたがり、三叉の槍を掲げる。
### A Lone Globe Head（球頭）　HP 148〔A8+:158〕
- 開始時：Galvanic 6（プレイヤーのパワーカードが Galvanized＝帯電する。詳しい効果は未確認）。
- 行動：Shocking Slap 13（A9:14）＋虚弱2 → Channel Lightning 6（A9:7）×3 → 攻撃16（A9:17）＋筋力2 を繰り返し。
- 見た目：頭が青い電気の球の、猫背の男。白っぽい上着、大きな黒い手袋とブーツ。
### Lost and Forgotten（失われたもの・忘れられたもの）　合計 199〔A8+:210〕
- The Lost HP 93〔A8+:99〕：Debilitating Smog（プレイヤーの筋力-2、自分は筋力+2）→ Eye Lasers 4（A9:5）×2 を繰り返し。倒すと奪った筋力が戻る。
- The Forgotten HP 106〔A8+:111〕：Miasma（プレイヤーの敏捷-2、自分はブロック8・敏捷+2）→ Dread 15（A9:17）（使うたび+2）を繰り返し。倒すと奪った敏捷が戻る。
- 見た目：The Lost は茶色の陶器の香炉のような吊るされた仮面、上から煙。The Forgotten は灰色の石の仮面（大きな丸いゴーグルの目）、煙。
### Many Scrolls of Biting　噛む巻物4つ（合計 120-148）
### Owl Magistrate（フクロウの判事）　HP 231〔A8+:247〕
- 行動：Magistrate Scrutiny 16（A9:17）→ Peck Assault 4×6 → Judicial Flight 飛翔1（着地するまで攻撃で受けるダメージ半分）→ Verdict 33（A9:36）＋弱体4 を繰り返し。
- 見た目：赤茶の法服をまとった大きなフクロウ、白く長い羽、緑の目。
### Slimed Berserker（粘液まみれの狂戦士）　HP 261〔A8+:281〕
- 行動：Vomit Ichor 粘液10枚を捨て札へ → Furious Pummeling 4（A9:5）×4 → Leeching Hug 脆弱3＋筋力+3 → 攻撃30（A9:33）を繰り返し。
- 見た目：青緑のぶよぶよした巨大な塊、腕のような突起がいくつも伸びる。

## エリート
### Knight Gang（騎士の一団3人）　合計 276〔A8+:294〕
- Flail Knight（鎖鉄球の騎士）HP 101〔A8+:108〕：初手 Ram 15（A9:17）。その後ランダム各33%：War Chant 筋力+3（連続なし）、Flail 9（A9:10）×2（2連続まで）、Ram（2連続まで）。見た目：紫灰色のとげの鎧、両手に鎖付き鉄球。
- Spectral Knight（霊の騎士）HP 93〔A8+:97〕：初手 Hex 呪縛2（生きている間、手札のカードがすべてエセリアル）→ Soul Slash 15（A9:17）。その後ランダム50%：Soul Slash（2連続まで）／Soul Flame 3（A9:4）×3（連続なし）。見た目：半透明の青緑の騎士、ぼろのマント、大剣。
- Magi Knight（魔術の騎士）HP 82〔A8+:89〕：Power Shield 6（A9:7）＋ブロック5（A8+:9）→ Dampen（生きている間、カードがすべて強化前に戻る）→ 以後 Ram 10（A9:11）→ Defensive ブロック5（A8+:9）→ Magic Bomb 35（A9:40）を繰り返し。見た目：茶色のマントに筒形の兜（細い窓）。
### Mecha Knight（機械の騎士）　HP 300〔A8+:320〕
- 開始時：アーティファクト3。
- 初手 Charge 25（A9:30）。その後 Flamethrower 火傷4枚を手札へ → Windup ブロック15＋筋力+5 → Heavy Cleave 35（A9:40）を繰り返し。
- 見た目：金色の機械の騎士。胸のガラスの筒に緑の液体と頭、片手に剣。
### Soul Nexus（魂の結び目）　HP 234〔A8+:254〕
- 初手 Soul Burn 29（A9:31）。その後ランダム各33%（どれも連続なし）：Soul Burn、Maelstrom 6（A9:7）×4、Drain Life 18（A9:19）＋弱体2＋脆弱2。
- 見た目：赤く光る一つ目の小さな紫の霊体。周りに赤いにじみの光、紫の切れ端が舞う。

---

## 気づいたこと（作る時の参考）
- 行動はほとんど「決まった順番の繰り返し」。ランダムは「連続なし」「2連続まで」「使ったら数ターン待ち」の制限つき。同じ敵が複数出る時は、同じ順番を1つずつずらして始める（毎ターン違う行動が並ぶ）。
- 戦闘の最初の1手だけ特別な行動（バフ・召喚・デバフ）を持つ敵が多い。
- 特性（開始時の効果）で1体ずつ個性を出している：ダメージの上限（Hard to Kill・Hardened Shell）、復活（Reattach・Illusion・Stock）、攻撃を防がれると気絶（Imbalanced）、毎ターン筋力（Territorial・High Voltage）、金やカードを盗んで逃げる（Thievery・Escape Artist）、死ぬと何か出る（Infested・Surprise）など。
- エリートは「1体の強い敵」か「同じ敵の群れ（庭師4体・ムカデ3節）」か「違う役の3人組（騎士）」。
- 第1層は2つの道（草木／船着き場）のどちらかを通る。ボスは草木が Ceremonial Beast・The Kin・Vantom、船着き場が Lagavulin Matriarch・Soul Fysh・Waterfall Giant（この調べでは細かく扱っていない。untapped に同じ形で載っている）。
