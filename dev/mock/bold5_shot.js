// 使い方: node mock/bold5_shot.js 出力先.png（上：今の絵／下：スレスパ2寄りの見本）
const {chromium}=require('playwright'),fs=require('fs');(async()=>{const br=await chromium.launch(),pg=await br.newPage({viewport:{width:640,height:360}}),er=[];pg.on('pageerror',e=>er.push(e.message));await pg.route('**/fonts.googleapis.com/**',r=>r.abort());await pg.goto('file://'+__dirname+'/../index.html');await pg.waitForTimeout(400);
await pg.addScriptTag({path:__dirname+'/bold5.js'});
const d=await pg.evaluate(()=>{const ks=Object.keys(BD),W=5*99+8,Hh=2*118+8,cv=document.getElementById('c');draw=()=>{};cv.width=W*2;cv.height=Hh*2;ctx.setTransform(2,0,0,2,0,0);ctx.fillStyle='#0a0814';ctx.fillRect(0,0,W,Hh);LPC=[];
 ks.forEach((n,j)=>{const i=C.findIndex(c=>c.n===n);card(6+j*99,6,{i,u:0});HAC[n]=hmMk(BD[n],C[i].t,C[i]);card(6+j*99,124,{i,u:0})});return cv.toDataURL('image/png')});
fs.writeFileSync(process.argv[2],Buffer.from(d.split(',')[1],'base64'));console.log(er);await br.close()})();
