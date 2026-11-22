// 層の2種類の強さを比べる：node tests/area_cmp.js
// 同じデッキ（キャラごとに固定）で、地下の広間と密林の遺跡（2層）、機神の神殿と天上の聖堂（3層）の通常戦・エリート・ボスを自動で戦わせ、受けたダメージとターン数を比べる
const {chromium}=require('playwright'),path=require('path');(async()=>{const b=await chromium.launch();const p=await b.newPage();const er=[];p.on('pageerror',e=>er.push(e.message));await p.goto('file://'+path.resolve(__dirname,'../index.html'));await p.waitForTimeout(600);
const r=await p.evaluate(async()=>{localStorage.setItem('cardtower_tut','1');
 const mkDeck=(cl,act)=>{let s=cl*97+act*13+1;const rnd=()=>(s=(s*1103515245+12345)&0x7fffffff)/0x7fffffff;const pool=C.map((c,i)=>[c,i]).filter(([c])=>(c.k||0)===cl&&c.r>=0&&c.r<=1&&!c.un).map(a=>a[1]);const n=act===2?7:12,d=[];for(let k=0;k<n;k++)d.push({i:pool[Math.floor(rnd()*pool.length)],u:rnd()<(act===2?.4:.7)?1:0});return d};
 const run1=(cl,act,v,ks,kind,deck)=>{newRun(cl);P.act=act;if(act===2)P.v2=v;else P.v3=v;P.deck=P.deck.map(o=>({...o,u:act===3?1:0})).concat(deck.map(o=>({...o})));P.mhp=P.hp=9999;fight(ks,kind);let t=0;
  for(let s=0;s<20000&&S==='battle'&&B.ph!=='L'&&t<60;s++){if(B.ph==='p'&&!B.vt&&!B.dsc){const al=alive();let done=0;for(let i=0;i<B.hand.length&&!done;i++){const o=B.hand[i],c=cd(o);if(c.un||o.sld||(!c.X&&B.me<c.c)||B.pl>=cLim()||(typeof jgSkOk==='function'&&!jgSkOk(c,B))||(c.ms&&B.pl>0)||(c.pay&&P.gold<c.pay))continue;const tg=al.slice().sort((a,b)=>a.hp-b.hp)[0];play(i,B.en.indexOf(tg));done=1}if(!done){endTurn();t++}}else if(B.dsc>0)discardCard(0);update(.05)}
  return {dmg:9999-P.hp,t,win:S!=='battle'||B.ph==='V'||B.ph==='D'}};
 const out={};const avg=a=>a.reduce((x,y)=>x+y,0)/a.length;
 const cases=[[2,'d',FI2[1].concat(FI2[2]),['oni','necro','behemoth',['lanA','lanB','lanC']],BOSSG[1]],[2,'j',FI2J[1].concat(FI2J[2]),ELJ,BOSSGJ],[3,'t',FI3[1].concat(FI3[2]),['magik','spek','judge'],BOSSG[2]],[3,'h',FI3H[1].concat(FI3H[2]),ELH,BOSSGH]];
 for(const [act,v,nm,el,bs] of cases){const key=act+v,R={n:[],e:[],b:[]};
  for(const cl of [0,1,2]){const deck=mkDeck(cl,act);
   for(const g of nm){const ks=Array.isArray(g)?g:[g];const x=run1(cl,act,v,ks,0,deck);R.n.push(x)}
   for(const g of el){const ks=Array.isArray(g)?g:[g];for(let k=0;k<2;k++)R.e.push(run1(cl,act,v,ks,1,deck))}
   for(const g of bs){const ks=Array.isArray(g)?g:[g];R.b.push(run1(cl,act,v,ks,2,deck))}
   await new Promise(r=>setTimeout(r,0))}
  out[key]=Object.fromEntries(['n','e','b'].map(k=>[k,{件:R[k].length,被ダメ:Math.round(avg(R[k].map(x=>x.dmg))),ターン:+avg(R[k].map(x=>x.t)).toFixed(1),長期:R[k].filter(x=>x.t>=60).length}]))}
 return out});
console.log(JSON.stringify(r,null,1));if(er.length)console.log(er.slice(0,3));await b.close()})()
