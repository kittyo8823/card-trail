// 使い方: node mock/hart_basic2_shot.js 出力先.png（見本その2の斬撃・防御だけを撮る）
const {chromium}=require('playwright');(async()=>{const br=await chromium.launch(),pg=await br.newPage({viewport:{width:640,height:360},deviceScaleFactor:2}),er=[];pg.on('pageerror',e=>er.push(e.message));await pg.route('**/fonts.googleapis.com/**',r=>r.abort());await pg.goto('file://'+__dirname+'/../index.html');await pg.waitForTimeout(400);
await pg.addScriptTag({path:__dirname+'/hart_basic2.js'});
await pg.evaluate(()=>{newRun(0);go('map');HART['斬撃']=artStrike2;HART['防御']=artDefend2;const o=draw;draw=function(){o();ctx.fillStyle='#0a0814';ctx.fillRect(0,0,640,360);cardAt({i:CI('斬撃'),u:0},200,180,2.4,0,1);cardAt({i:CI('防御'),u:0},440,180,2.4,0,1)}});
await pg.waitForTimeout(500);await pg.screenshot({path:process.argv[2]});console.log(er);await br.close()})();
