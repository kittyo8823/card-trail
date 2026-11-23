// 見せる用の1枚：node tests/shot.js 出力.png [場所]
const {chromium}=require('playwright'),path=require('path');
(async()=>{const b=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader']});const p=await b.newPage({viewport:{width:960,height:540}});const er=[];p.on('pageerror',e=>er.push(e.message));
await p.addInitScript(a=>{window.FORCE=a},process.argv[3]||'jungle');await p.goto('file://'+path.resolve(__dirname,'../index.html'));await p.waitForTimeout(1500);
await p.mouse.click(480,300);await p.waitForTimeout(800);
await p.evaluate(()=>{const P=GM.P;const es=GM.EN.filter(e=>!e.dead&&!e.tier).slice(0,4);es.forEach((e,i)=>{e.x=P.x+3+i*1.6;e.z=P.z-1.5+(i%2)*2.5;e.st='chase'});GM.drop('wp',P.x-2.5,P.z+3,GM.mkWeapon(1,3))});
await p.mouse.move(700,250);for(let i=0;i<8;i++){await p.waitForTimeout(200)}await p.keyboard.press('q');await p.waitForTimeout(120);
await p.screenshot({path:process.argv[2]});console.log(JSON.stringify(er));await b.close()})();
