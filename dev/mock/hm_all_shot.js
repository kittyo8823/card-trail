// 使い方: node mock/hm_all_shot.js 出力先の頭 [開始番号]（ユウキングの絵を20枚ずつ、絵だけ並べて撮る）
const {chromium}=require('playwright');(async()=>{const br=await chromium.launch(),pg=await br.newPage({viewport:{width:800,height:500}}),er=[];pg.on('pageerror',e=>er.push(e.message));await pg.goto('about:blank');
for(const f of['hm_lib.js','hm_cards0.js'])await pg.addScriptTag({path:__dirname+'/'+f});
const n=await pg.evaluate(()=>{document.body.style.cssText='margin:0;background:#000;color:#ccc;font:10px sans-serif';const ks=Object.keys(HMC0);ks.forEach(k=>{const d=document.createElement('div');d.style.cssText='display:inline-block;margin:2px;width:148px';const c=hmMk(HMC0[k]);d.appendChild(c);const t=document.createElement('div');t.textContent=k;d.appendChild(t);document.body.appendChild(d)});return ks.length});
const h=await pg.evaluate(()=>document.body.scrollHeight);await pg.setViewportSize({width:800,height:h});await pg.screenshot({path:process.argv[2]+'.png'});console.log(n,er);await br.close()})();
