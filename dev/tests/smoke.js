// 自動プレイによる動作確認: node tests/smoke.js [ラン数/キャラ]
// 3キャラそれぞれでランを最後まで進め、JSエラー・進行不能がないかを調べる。
// 戦闘画面のスクリーンショットを tests/out/battle.png に保存する。
const {chromium}=require('playwright'),path=require('path'),fs=require('fs');
const URL='file://'+path.resolve(__dirname,'../index.html'),OUT=path.join(__dirname,'out'),RUNS=+process.argv[2]||3;
(async()=>{fs.mkdirSync(OUT,{recursive:true});const br=await chromium.launch();const pg=await br.newPage({viewport:{width:1280,height:720}});
const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.route('**/fonts.googleapis.com/**',r=>r.abort());
await pg.goto(URL);await pg.waitForTimeout(300);let bad=0;
for(const cl of[0,1,2,3,4,6])for(let run=0;run<RUNS;run++){
const res=await pg.evaluate(async cl=>{const sleep=ms=>new Promise(r=>setTimeout(r,ms));
newRun(cl);P.mhp=P.hp=400;NE.opts[0][1]();if(S==='pick'){PICK.cb&&PICK.cb(PICK.list[0])}if(S==='conf'){P.deck[CONF.i].u=1;CONF.done()}if(S==='reward'){P.deck.push({i:RW.cards[0],u:0});after()}
let steps=0,stuck=0,lastSig='';
while(steps++<15000){if(S==='battle'&&B.ph==='lv'){startAct();continue}if(S==='over'||S==='win'||(S==='battle'&&B.ph==='L'))break;
 if(S==='map'){const a=avail();enter(a[a.length*Math.random()|0]);}
 else if(S==='battle'){const b=B;
  if(b.ph==='p'&&!b.vt){if(b.dsc>0){discardCard(0)}else{let done=0;for(let i=0;i<b.hand.length;i++){const c=cd(b.hand[i]);if(!c.un&&(c.X||b.me>=c.c)&&!(has('choker')&&b.pl>=6)&&!b.hand[i].sld&&!(c.ms&&b.pl>0)&&!(c.solo&&b.hand.length>1)&&!(c.pay&&P.gold<c.pay)&&b.pl<cLim()&&!(c.hp&&P.hp<=c.hp+5)){const al=alive();play(i,b.en.indexOf(al[al.length*Math.random()|0]));done=1;break}}if(!done)endTurn()}}
  update(0.05);if(Math.random()<.02&&P.pot.length&&b.ph==='p'&&!b.vt)usePot(0);if(B.turn>60){if(B.en.some(e=>e.k==='eye')){P.hp=0;lose()}else return{err:'60ターン以上つづく戦闘'}}}
 else if(S==='reward'){if(RW.pot)givePot(RW.pot);P.deck.push({i:RW.cards[0],u:0});after()}
 else if(S==='btr'){if(BT.pick<0){BT.pick=0;BT.t0=T;if(BT.anc!=null){if(anDo(BT.rs[0]))continue}else gain(BT.rs[0])}btNext()}
 else if(S==='act')startAct();
 else if(S==='rest'){P.hp=Math.min(P.mhp,P.hp+Math.floor(P.mhp*.3));go('map')}
 else if(S==='shop'){go('map')}
 else if(S==='event'){const ch=EV.ch;ch[ch.length*Math.random()|0][1]();}
 else if(S==='pick'){if(PICK.cb){const cb=PICK.cb,l=PICK.list;PICK=null;cb(l[0])}else{S=PICK.back;PICK=null}}
 else if(S==='conf'){P.deck[CONF.i].u=1;const d=CONF.done;CONF=null;d()}
 else if(S==='eyein')eyeGo();
 else return {err:'未対応の画面 '+S};
 draw();
 const sig=S+(B?B.ph+B.turn+B.hand.length+B.me:'')+(CUR?CUR.f:'');if(sig===lastSig){if(++stuck>400)return{err:'進行不能 '+sig}}else{stuck=0;lastSig=sig}
 if(steps%50===0)await sleep(0)}
return {S,act:P.act,floor:P.floors,deck:P.deck.length,relics:P.relics.length}},cl);
if(res.err)bad++;console.log('キャラ'+cl,JSON.stringify(res));await pg.waitForTimeout(1000)}
await pg.evaluate(()=>{newRun(2);go('map');fight(['gargoyle','mage','imp'],0);B.bn=null;PS.str=2;PS.ki=4;PS.weak=1;B.blk=8;B.en.forEach(e=>{e.vuln=1;e.poison=3})});
await pg.waitForTimeout(400);await pg.screenshot({path:path.join(OUT,'battle.png')});
console.log('ページエラー:',errs.length?errs:'なし');await br.close();process.exit(errs.length||bad?1:0)})();
