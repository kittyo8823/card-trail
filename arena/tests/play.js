// 自動で遊んで、エラーがないか・画面を撮る：node tests/play.js [出力先]
const {chromium}=require('playwright'),path=require('path');
const out=process.argv[2]||path.join(__dirname,'out');require('fs').mkdirSync(out,{recursive:true});
(async()=>{const b=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--autoplay-policy=no-user-gesture-required']});const p=await b.newPage({viewport:{width:960,height:540}});const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error')er.push(m.text())});
await p.route('**/fonts.googleapis.com/**',r=>r.abort());if(process.env.AREA)await p.addInitScript(a=>{window.FORCE=a},process.env.AREA);await p.goto('file://'+path.resolve(__dirname,'../index.html'));await p.waitForTimeout(800);
await p.screenshot({path:out+'/title.png'});
await p.mouse.click(480,300);await p.waitForTimeout(1500);
// 近くの敵へ向かって戦う
for(let s=0;s<30;s++){await p.evaluate(()=>{const P=GM.P;const e=GM.EN.filter(e=>!e.dead).sort((a,b)=>Math.hypot(a.x-P.x,a.z-P.z)-Math.hypot(b.x-P.x,b.z-P.z))[0];if(e)P.tgt=e;P.hp=P.mhp});await p.waitForTimeout(250);if(s%6===3)await p.keyboard.press('q');if(s===10)await p.keyboard.press('e');if(s===15)await p.keyboard.press('r');if(s===8)await p.keyboard.press('w')}
await p.screenshot({path:out+'/play.png'});
const st=await p.evaluate(()=>({mode:GM.MODE,hp:GM.P.hp,en:GM.EN.length,it:GM.IT.length}));
// 全部倒してボス
await p.evaluate(()=>{for(const e of GM.EN)e.hp=1});await p.waitForTimeout(100);await p.evaluate(()=>{for(const e of GM.EN.slice())if(!e.dead){e.hp=0;e.dead=1;e.dT=0}});await p.waitForTimeout(2500);
await p.evaluate(()=>{const b=GM.BOSS;if(b){GM.P.x=b.x-4;GM.P.z=b.z;GM.P.tgt=b}});await p.waitForTimeout(1500);await p.screenshot({path:out+'/boss.png'});
const bs=await p.evaluate(()=>GM.BOSS&&GM.BOSS.d.n);
console.log(JSON.stringify({st,boss:bs,er:er.slice(0,8)}));await b.close()})();
