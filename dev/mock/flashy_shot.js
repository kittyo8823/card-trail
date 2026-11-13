// 使い方: node mock/flashy_shot.js 出力先.png（派手な描き方の見本6枚をカードの枠で撮る）
const {chromium}=require('playwright'),fs=require('fs');(async()=>{const br=await chromium.launch(),pg=await br.newPage({viewport:{width:640,height:360}}),er=[];pg.on('pageerror',e=>er.push(e.message));await pg.route('**/fonts.googleapis.com/**',r=>r.abort());await pg.goto('file://'+__dirname+'/../index.html');await pg.waitForTimeout(400);
await pg.addScriptTag({path:__dirname+'/flashy.js'});
const d=await pg.evaluate(()=>{const L=Object.keys(FXS);L.forEach(n=>{const c=C.find(x=>x.n===n);HART[n]=()=>hmMk(FXS[n],c.t);delete HAC[n]});const W=640,H=420,cv=document.getElementById('c');draw=()=>{};cv.width=W*2;cv.height=H*2;ctx.setTransform(2,0,0,2,0,0);ctx.fillStyle='#0a0814';ctx.fillRect(0,0,W,H);L.forEach((n,k)=>cardAt({i:CI(n),u:0},110+(k%3)*210,110+Math.floor(k/3)*205,1.85,0,1));return cv.toDataURL('image/png')});
fs.writeFileSync(process.argv[2],Buffer.from(d.split(',')[1],'base64'));console.log(er);await br.close()})();
