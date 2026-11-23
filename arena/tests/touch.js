// スマホ（横向き）で指の操作を試す：node tests/touch.js 出力.png
const {chromium,devices}=require('playwright'),path=require('path');
(async()=>{const b=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader']});const c=await b.newContext({...devices['iPhone 13 landscape']});const p=await c.newPage();const er=[];p.on('pageerror',e=>er.push(e.message));
await p.addInitScript(()=>{window.FORCE='jungle'});await p.goto('file://'+path.resolve(__dirname,'../index.html'));await p.waitForTimeout(1500);
const pe=(t,x,y,id)=>p.evaluate(([t,x,y,id])=>{const el=document.getElementById('ui');(t==='pointerup'?window:el).dispatchEvent(new PointerEvent(t,{pointerId:id,pointerType:'touch',clientX:x,clientY:y,bubbles:true}))},[t,x,y,id]);
await pe('pointerdown',600,200,1);await pe('pointerup',600,200,1);await p.waitForTimeout(800);
const x0=await p.evaluate(()=>GM.P.x);await pe('pointerdown',120,280,2);for(let i=0;i<10;i++){await pe('pointermove',120+i*8,280-i*2,2);await p.waitForTimeout(60)}await p.waitForTimeout(700);
const x1=await p.evaluate(()=>GM.P.x);
await p.evaluate(()=>{const P=GM.P;GM.EN.filter(e=>!e.tier).slice(0,3).forEach((e,i)=>{e.x=P.x+2.5+i;e.z=P.z+(i-1)*1.5;e.st='chase'});GM.drop('wp',P.x+.8,P.z+.5,GM.mkWeapon(1,3))});await p.waitForTimeout(300);
const [W,H]=await p.evaluate(()=>[innerWidth,innerHeight]),U=Math.min(W/700,H/400);await pe('pointerdown',W-72*U-88*U,H-60*U-58*U,3);await pe('pointerup',W-72*U-88*U,H-60*U-58*U,3);await p.waitForTimeout(150);
const cd=await p.evaluate(()=>GM.P.cd.slice());await p.screenshot({path:process.argv[2]});await pe('pointerup',200,260,2);
console.log(JSON.stringify({moved:+(x1-x0).toFixed(2),cd,er}));await b.close()})();
