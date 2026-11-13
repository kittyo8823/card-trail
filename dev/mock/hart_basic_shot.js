// 使い方: node mock/hart_basic_shot.js 出力先.png（左に今の斬撃・防御・命刈りの鎌、右に見本の斬撃・防御）
const {chromium}=require('playwright');(async()=>{const br=await chromium.launch(),pg=await br.newPage({viewport:{width:640,height:360},deviceScaleFactor:2}),er=[];pg.on('pageerror',e=>er.push(e.message));await pg.route('**/fonts.googleapis.com/**',r=>r.abort());await pg.goto('file://'+__dirname+'/../index.html');await pg.waitForTimeout(400);
await pg.addScriptTag({path:__dirname+'/hart_basic.js'});
await pg.evaluate(()=>{newRun(0);go('map');const A=[CI('斬撃'),CI('防御'),CI('命刈りの鎌')];const o=draw;draw=function(){o();ctx.fillStyle='#0a0814';ctx.fillRect(0,0,640,360);
 A.forEach((i,k)=>cardAt({i,u:0},90+k*150,92,1.55,0,1));HART['斬撃']=artStrike;HART['防御']=artDefend;cardAt({i:A[0],u:0},90,270,1.55,0,1);cardAt({i:A[1],u:0},240,270,1.55,0,1);delete HART['斬撃'];delete HART['防御'];delete HAC['斬撃'];delete HAC['防御'];
 ctx.fillStyle='#fff';ctx.font='12px sans-serif';ctx.fillText('上：今（右は命刈りの鎌）',400,250);ctx.fillText('下：見本',400,270)}});
await pg.waitForTimeout(500);await pg.screenshot({path:process.argv[2]});console.log(er);await br.close()})();
