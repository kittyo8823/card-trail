// 使い方: node mock/newart_shot.js 出力先.png（今の絵と新方針の絵を、カードの枠で左右に並べる）
const {chromium}=require('playwright'),fs=require('fs');(async()=>{const br=await chromium.launch(),pg=await br.newPage({viewport:{width:640,height:360}}),er=[];pg.on('pageerror',e=>er.push(e.message));await pg.route('**/fonts.googleapis.com/**',r=>r.abort());await pg.goto('file://'+__dirname+'/../index.html');await pg.waitForTimeout(400);
await pg.addScriptTag({path:__dirname+'/newart.js'});
const d=await pg.evaluate(()=>{const ks=Object.keys(NA),W=4*99+40,Hh=5*118+10,cv=document.getElementById('c');draw=()=>{};cv.width=W*2;cv.height=Hh*2;ctx.setTransform(2,0,0,2,0,0);ctx.fillStyle='#0a0814';ctx.fillRect(0,0,W,Hh);LPC=[];
 const old={};ks.forEach(n=>{old[n]=hArt(n)});
 ks.forEach((n,j)=>{const i=C.findIndex(c=>c.n===n),cc=C[i],x=(j%2)*(2*99+40)+6,y=Math.floor(j/2)*118+6;HAC[n]=old[n];card(x,y,{i,u:0});HAC[n]=hmMk(NA[n],cc.t,cc);card(x+99,y,{i,u:0})});
 ctx.fillStyle='#8a8a9a';ctx.font='10px sans-serif';return cv.toDataURL('image/png')});
fs.writeFileSync(process.argv[2],Buffer.from(d.split(',')[1],'base64'));console.log(er);await br.close()})();
