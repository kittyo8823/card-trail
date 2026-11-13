// 使い方: node tests/card_sheet.js 出力先.png（ユウキングのカードをすべてカードの枠に入れて10列で並べる。k を変えれば他のキャラも）
const {chromium}=require('playwright');(async()=>{const br=await chromium.launch(),pg=await br.newPage({viewport:{width:640,height:360},deviceScaleFactor:2}),er=[];pg.on('pageerror',e=>er.push(e.message));await pg.route('**/fonts.googleapis.com/**',r=>r.abort());await pg.goto('file:///home/user/card-trail/dev/index.html');await pg.waitForTimeout(400);
// ユウキングのカードをすべて、カードの枠に入れて 8列で並べる（1枚の大きな画像）
const n=await pg.evaluate(()=>{const L=C.map((c,i)=>i).filter(i=>(C[i].k||0)===0&&C[i].t<3&&C[i].r>=-1&&!C[i].fa).sort((a,b)=>C[a].r-C[b].r);const cols=10,rows=Math.ceil(L.length/cols),cv=document.getElementById('c');window.__L=L;window.__rows=rows;return L.length});
const rows=await pg.evaluate(()=>__rows);const H=rows*114+8;await pg.setViewportSize({width:1000,height:Math.ceil(H)});
await pg.evaluate((H)=>{const cv=document.getElementById('c');document.body.style.display='block';cv.style.width='1000px';cv.style.height=H+'px';cv.width=2000;cv.height=H*2;K=2;window.fit=()=>{};draw=function(){ctx.setTransform(2,0,0,2,0,0);ctx.fillStyle='#0a0814';ctx.fillRect(0,0,1000,H);__L.forEach((i,k)=>card(6+(k%10)*99,6+Math.floor(k/10)*114,{i,u:0}))}},H);
await pg.waitForTimeout(800);await pg.screenshot({path:process.argv[2]});console.log(n,er);await br.close()})();
