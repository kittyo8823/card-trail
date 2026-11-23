// Card Trail（dev/index.html）からキャラ・敵の絵、敵データ、レリックの絵を書き出す
// node tools/extract.js [Card Trail の index.html]  → src/assets.json
const {chromium}=require('playwright'),path=require('path'),fs=require('fs');
const SRC=path.resolve(process.argv[2]||path.join(__dirname,'../../card-trail/dev/index.html'));
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:640,height:360}});const er=[];p.on('pageerror',e=>er.push(e.message));
await p.route('**/fonts.googleapis.com/**',r=>r.abort());await p.goto('file://'+SRC);await p.waitForTimeout(800);
const d=await p.evaluate(()=>{window.requestAnimationFrame=()=>0;
 const url=c=>c&&c.toDataURL?c.toDataURL():null;
 // 層（場所）ごとの敵
 const AR=[
  {k:'forest',n:'黒い森',f:FI,el:['nob','hound','colony','phrog'],bo:BOSSG[0],bgm:'b',bx:'x'},
  {k:'sunk',n:'沈没都市',f:FIS,el:ELS,bo:BOSSGS,bgm:'b1s',bx:'b1x'},
  {k:'hall',n:'地下の広間',f:FI2,el:['oni','necro','behemoth',['lanA','lanB','lanC']],bo:BOSSG[1],bgm:'b2',bx:'x'},
  {k:'jungle',n:'密林の遺跡',f:FI2J,el:ELJ,bo:BOSSGJ,bgm:'j2',bx:'j2x'},
  {k:'temple',n:'機神の神殿',f:FI3,el:['magik','spek','judge'],bo:BOSSG[2],bgm:'b3',bx:'x3'},
  {k:'heaven',n:'天上の聖堂',f:FI3H,el:ELH,bo:BOSSGH,bgm:'h3',bx:'h3x'}];
 const keys=new Set();const fl=a=>a.flat(9).filter(x=>typeof x==='string');
 for(const a of AR){a.nm=[...new Set(fl(a.f))];a.el=a.el.map(x=>Array.isArray(x)?x:[x]);a.bo=a.bo.map(x=>Array.isArray(x)?x:[x]);a.el=a.el.map(g=>g.filter(k=>E[k]));a.el=a.el.filter(g=>g.length);for(const k of [...a.nm,...fl(a.el),...fl(a.bo)])keys.add(k);delete a.f}
 const en={},spr={};
 for(const k of keys){const e=E[k];if(!e)continue;const s=SPR[k];if(!s)continue;spr[k]=url(s);
  const mv=(e.mv||[]).map(m=>{const r={};for(const q of ['a','h','b','st','wk','vu','ps','nm','lb','hl','ab','smn'])if(m[q]!==undefined)r[q]=m[q];return r});
  en[k]={n:e.n,hp:e.hp,el:e.el||0,cat:ECAT[k]||'hum',st:(typeof AST!=='undefined'&&AST[k])||'',fly:e.fly?1:0,mv,w:s.width,h:s.height}}
 // 自キャラ
 for(const k of ['pl_wp','sm_wp'])if(SPR[k])spr[k]=url(SPR[k]);
 const CHS=[['pl','ユウキング'],['si','坂井'],['sm','坪内丸'],['nn','名無し'],['hori','ホーリー大輔'],['neb','ネブラ'],['seres','セレス']];const ch={};
 for(const[k,n]of CHS){const s=SPR[k];ch[k]={n,img:url(s),w:s?s.width:0,h:s?s.height:0}}
 // レリックの絵
 const rl={};for(const k in RL){try{const c=rIcon(k);rl[k]={n:RL[k][0],x:RL[k][1],r:RL[k][2],img:url(c)}}catch(e){}}
 return {AR,en,spr,ch,rl}});
fs.writeFileSync(path.join(__dirname,'../src/assets.json'),JSON.stringify(d));
console.log('enemies',Object.keys(d.en).length,'relics',Object.keys(d.rl).length,'chars',Object.values(d.ch).filter(c=>c.img).length,'errors',JSON.stringify(er).slice(0,500));await b.close()})();
