// 使い方: node mock/scene_sheet.js 出力先.png キャラ番号（場面方式の絵でそのキャラの全カードを並べる。st=状態異常）
const {chromium}=require('playwright'),fs=require('fs');(async()=>{const br=await chromium.launch(),pg=await br.newPage({viewport:{width:640,height:360}}),er=[];pg.on('pageerror',e=>er.push(e.message));await pg.route('**/fonts.googleapis.com/**',r=>r.abort());await pg.goto('file://'+__dirname+'/../index.html');await pg.waitForTimeout(400);

const r=await pg.evaluate((KK)=>{const miss=[];for(const n of new Set([...Object.keys(SCS),...Object.keys(NA)])){const cc=C.find(c=>c.n===n);if(!cc){miss.push(n);continue}HAC[n]=hmMk(NA[n]||S_.make(SCS[n],n),cc.t,cc)}
 const L=C.map((c,i)=>i).filter(i=>KK==='st'?C[i].t>=3&&HART[C[i].n]:(C[i].k||0)===+KK&&C[i].t<3&&!C[i].fa&&HART[C[i].n]).sort((a,b)=>C[a].r-C[b].r);const rows=Math.ceil(L.length/10),W=1000,H=rows*114+8,cv=document.getElementById('c');draw=()=>{};
 cv.width=W*2;cv.height=H*2;ctx.setTransform(2,0,0,2,0,0);ctx.fillStyle='#0a0814';ctx.fillRect(0,0,W,H);LPC=[];L.forEach((i,k)=>{if(!SCS[C[i].n]&&!NA[C[i].n])miss.push('nospec:'+C[i].n);card(6+(k%10)*99,6+Math.floor(k/10)*114,{i,u:0})});return{n:L.length,miss,d:cv.toDataURL('image/png')}},process.argv[3]||'0');
fs.writeFileSync(process.argv[2],Buffer.from(r.d.split(',')[1],'base64'));console.log(r.n,r.miss.join(' '),er);await br.close()})();
