// node fxshot.js '[["hgrif"],1,0]' out.png  -> 敵の組・種類・使う行動番号。敵のターンを進めながら数コマ撮る
const {chromium}=require('playwright'),path=require('path'),fs=require('fs');
const [g,kind,mi,who]=JSON.parse(process.argv[2]),out=process.argv[3];
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:640,height:360}});const er=[];p.on('pageerror',e=>er.push(e.message));await p.goto('file://'+path.resolve('dev/index.html'));await p.waitForTimeout(600);await p.evaluate(()=>{window.requestAnimationFrame=()=>0});
await p.evaluate(([g,kind,mi,who])=>{newRun(0);P.v3='h';P.act=3;P.mhp=P.hp=999;go('map');fight(g,kind);B.bn=null;B.tut=null;for(let i=0;i<20;i++)update(.05);const e=B.en.find(x=>x.k===(who||g[0]))||B.en[0];for(const x of B.en)if(x!==e){x.it={lb:'待機'};x.stn=0}e.i=mi;e.it=e.mv[mi];B.hand=[];endTurn()},[g,kind,mi,who]);
const shots=[];let t=0;for(let f=0;f<60;f++){const d=await p.evaluate(()=>{update(.05);ctx.setTransform(K,0,0,K,0,0);btns=[];draw();return cv.toDataURL()});t+=.05;if(f>=8&&f%4===0&&shots.length<12)shots.push(d)}
shots.forEach((d,i)=>fs.writeFileSync('/tmp/claude-0/ser/fx'+i+'.png',Buffer.from(d.split(',')[1],'base64')));console.log(shots.length,er);await b.close()})();
