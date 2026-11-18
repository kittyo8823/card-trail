const {chromium}=require('playwright'),path=require('path');
(async()=>{const b=await chromium.launch();const p=await b.newPage();const er=[];p.on('pageerror',e=>er.push(e.message));await p.goto('file://'+path.resolve(__dirname,'../index.html'));await p.waitForTimeout(600);await p.evaluate(()=>{window.requestAnimationFrame=()=>0});
const r=await p.evaluate(()=>{const out={};const st=()=>{B.bn=null;for(let i=0;i<10;i++)update(.05)};
 newRun(0);P.v3='h';P.act=3;go('map');
 // stock
 fight(['hcher'],0);st();let e=B.en[0];hitE(e,999,0,0,1);if(e.hp<=0)killE(e);out.stock=[B.en.length,B.en[0].dead,B.en[0].stk,B.en[0].blk];
 // illusion
 fight(['hilu','hshld','hilu'],1);st();e=B.en.find(x=>x.k==='hilu');hitE(e,999,0,0,1);if(e.hp<=0)killE(e);out.ilu1=[e.dead,e.rtc,e.hp];enemyAct(e);out.ilu2=[e.dead,e.rtc,e.hp===e.mh];
 const sh=B.en.find(x=>x.k==='hshld');hitE(sh,9999,0,0,1);if(sh.hp<=0)killE(sh);out.ilu3=B.en.map(x=>x.dead);
 // tender / entangle / constrict / steal / sch / esc
 fight(['hdance'],0);st();e=B.en[0];PS.str=0;enemyAct(e);out.steal=[PS.str,e.str,e.stS];hitE(e,9999,0,0,1);if(e.hp<=0)killE(e);out.steal2=PS.str;
 fight(['htwR','htwB'],0);st();e=B.en.find(x=>x.k==='htwR');e.it=e.mv[0];enemyAct(e);out.tnd=PS.tnd;const s0=PS.str;B.me=9;const ci=B.hand.findIndex(o=>cd(o).c>=0&&!cd(o).un);play(ci,0);out.tnd2=[s0,PS.str,B.tndL];
 fight(['hring'],0);st();e=B.en[0];e.it=e.mv[0];enemyAct(e);out.tng=PS.tng;const at=B.hand.find(o=>C[o.i].t===0);out.tngC=at?[C[at.i].c,cd(at).c]:null;
 fight(['hray'],0);st();e=B.en[0];e.it=e.mv[0];enemyAct(e);out.cst=e.cst;
 fight(['hcens'],0);st();e=B.en[0];e.it=e.mv[0];const h0=B.hand.length;enemyAct(e);out.sch=[h0,B.hand.length,B.hand.slice(-2).map(o=>C[o.i].n)];
 fight(['hbrute'],0);st();e=B.en[0];e.it=e.mv[0];const a0=e.mv[0].a;enemyAct(e);out.esc=[a0,e.mv[0].a,E.hbrute.mv[0].a];
 // slow
 fight(['hstat'],0);st();e=B.en[0];B.pl=3;out.slw=xMul(C[0],e);
 // artifact
 fight(['hgrif'],0);st();e=B.en[0];const wc=C.findIndex(c=>c.vu&&c.t===0&&c.k===0);B.hand.push({i:wc,u:0});B.me=9;play(B.hand.length-1,0);out.art=[e.art,e.vuln,C[wc].n];
 return out});
console.log(JSON.stringify(r,null,0));console.log(er);await b.close()})();
