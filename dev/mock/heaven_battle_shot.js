const {chromium}=require('playwright'),path=require('path'),fs=require('fs');
const groups=JSON.parse(process.argv[2]),out=process.argv[3];
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:640,height:360}});const er=[];p.on('pageerror',e=>er.push(e.message));await p.goto('file://'+path.resolve('dev/index.html'));await p.waitForTimeout(600);await p.evaluate(()=>{window.requestAnimationFrame=()=>0});
const shots=[];for(const [g,kind] of groups){const d=await p.evaluate(([g,kind])=>{newRun(0);P.v3='h';P.act=3;go('map');fight(g,kind);B.bn=null;B.tut=null;for(let i=0;i<30;i++)update(.05);ctx.setTransform(K,0,0,K,0,0);btns=[];draw();return cv.toDataURL()},[g,kind]);shots.push(d)}
const fsx=require('fs');shots.forEach((d,i)=>fsx.writeFileSync(out+i+'.png',Buffer.from(d.split(',')[1],'base64')));console.log(er);await b.close()})();
