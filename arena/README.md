# 戦場（仮題）

Card Trail のキャラ・敵・曲を使った、見下ろし視点の3Dアクション・ローグライク。`index.html` を開けば遊べる（1ファイル）。

## 作り方
- `src/game.js` … ゲーム本体（three.js）
- `src/assets.json` … Card Trail から書き出した絵（キャラ・敵の SPR、レリックの絵）と敵データ・層ごとの敵の組み合わせ
- `node tools/extract.js [Card Trail の index.html]` … 上の assets.json を作り直す（Playwright を使う）
- `node tools/build.js [Card Trail の index.html]` … Card Trail の「音」の区切り（曲の譜面・関数・埋め込み音源）をそのまま切り出し、game.js と合わせて `index.html` を作る
- 準備：`npm i`（three・esbuild）。Card Trail の場所は既定で `../card-trail/dev/index.html`
- 確認：`node tests/play.js 出力先`（自動で戦ってエラーを見る）、`node tests/shot.js 出力.png jungle`

## 今あるもの（最初の小さな版）
- ユウキングだけ。区切られた戦場（56×40）を右クリック／左クリックで移動・攻撃、Q 斬り払い・W 鉄壁・E 踏み込み・R 大回転、HP と魔力、小地図（押すとそこへ移動）
- 武器（長剣・刀・大剣 × 炎・氷・雷・血、★1〜3）を拾って持ち替え、同じ武器や砥石で強化。レリック＝装備（6枠）
- 3層（黒い森／沈没都市 → 地下の広間／密林の遺跡 → 機神の神殿／天上の聖堂）。敵を全滅させると主（ボス）、倒すと次の層への光。死んだら最初から
