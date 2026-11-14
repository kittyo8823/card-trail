// Ver3.37 追加したザコ敵の動作確認: node tests/newenemy.js
// 追加した組み合わせで1戦ずつ自動で戦い、JSエラー・進行不能・特性が働いたかを調べる。
const {chromium}=require('playwright'),path=require('path');
const URL='file://'+path.resolve(__dirname,'../index.html');
const G=[[1,['caterp']],[1,['shroom']],[1,['kodama','kodama','kodama']],[1,['bear','shroom']],[1,['ubone','ubone']],[1,['uleech','uleech','ulens']],[1,['uclam','ubone']],[1,['ucrab']],[1,['ucrab','ubone']],
 [2,['doll','doll','doll']],[2,['rbeetle']],[2,['mole']],[2,['pill','imp']],[3,['rscroll','rscroll','rscroll']],[3,['mowl']],[3,['bshield','gunner']],[3,['sculpt','drone']],[3,['mowl','rscroll']]];
(async()=>{const br=await chromium.launch();const pg=await br.newPage({viewport:{width:1280,height:720}});const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.route('**/fonts.googleapis.com/**',r=>r.abort());await pg.goto(URL);await pg.waitForTimeout(400);let bad=0;
for(const[act,ks]of G)for(const cl of[0,1]){const res=await pg.evaluate(({act,ks,cl})=>{newRun(cl);P.mhp=P.hp=300;P.gold=200;P.act=act;if(act===1)P.v1=ks[0][0]==='u'?'s':'f';go('map');
 const log={},pp=window.pop;window.pop=(e,s,c)=>{const k=String(s).replace(/[+\-0-9]+/g,'');log[k]=(log[k]||0)+1;return pp(e,s,c)};
 fight(ks,0);const g0=P.gold;let steps=0;
 while(steps++<20000&&S==='battle'&&!['V','L'].includes(B.ph)){const b=B;
  if(b.ph==='p'&&!b.vt){if(b.dsc>0)discardCard(0);else{let done=0;for(let i=0;i<b.hand.length;i++){const c=cd(b.hand[i]);if(!c.un&&!c.X&&b.me>=c.c&&!b.hand[i].sld&&b.pl<cLim()&&!(c.pay)&&!(c.hp)){const al=alive();if(!al.length)break;play(i,b.en.indexOf(al[al.length*Math.random()|0]));done=1;break}}if(!done)endTurn()}}
  update(0.05);if(B.turn>50)return{err:'50ターン以上',ks}}
 window.pop=pp;return{ks:ks.join('+'),cl,ph:B.ph,turn:B.turn,hp:P.hp,mhp:P.mhp,gold:P.gold-g0,fled:B.en.filter(e=>e.fled).length,log}},{act,ks,cl});
 if(res.err)bad++;console.log(JSON.stringify(res))}
console.log('ページエラー:',errs.length?errs:'なし');await br.close();process.exit(errs.length||bad?1:0)})();
