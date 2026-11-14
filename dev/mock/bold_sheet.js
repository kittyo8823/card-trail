// 使い方: node mock/bold_sheet.js 出力先.png（はっきり方式でユウキングの全カードを並べる）
const {chromium}=require('playwright'),fs=require('fs');(async()=>{const br=await chromium.launch(),pg=await br.newPage({viewport:{width:640,height:360}}),er=[];pg.on('pageerror',e=>er.push(e.message));await pg.route('**/fonts.googleapis.com/**',r=>r.abort());await pg.goto('file://'+__dirname+'/../index.html');await pg.waitForTimeout(400);
for(const f of['bold.js','bold5.js'])await pg.addScriptTag({path:__dirname+'/'+f});
const r=await pg.evaluate(()=>{const miss=[];const L=C.map((c,i)=>i).filter(i=>(C[i].k||0)===0&&C[i].t<3&&!C[i].fa&&HART[C[i].n]).sort((a,b)=>C[a].r-C[b].r);
 for(const i of L){const n=C[i].n;if(BD[n])HAC[n]=hmMk(BD[n],C[i].t,C[i]);else if(BOS[n])HAC[n]=hmMk(BO.make(BOS[n],n),C[i].t,C[i]);else miss.push(n)}
 const rows=Math.ceil(L.length/10),W=1000,H=rows*114+8,cv=document.getElementById('c');draw=()=>{};cv.width=W*2;cv.height=H*2;ctx.setTransform(2,0,0,2,0,0);ctx.fillStyle='#0a0814';ctx.fillRect(0,0,W,H);LPC=[];L.forEach((i,k)=>card(6+(k%10)*99,6+Math.floor(k/10)*114,{i,u:0}));return{miss,d:cv.toDataURL('image/png')}});
fs.writeFileSync(process.argv[2],Buffer.from(r.d.split(',')[1],'base64'));console.log(r.miss.join(' '),er);await br.close()})();
