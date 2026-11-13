// 使い方: node mock/hart_mid5_shot.js 出力先.png（見本5枚を並べて撮る）
const {chromium}=require('playwright');(async()=>{const br=await chromium.launch(),pg=await br.newPage({viewport:{width:640,height:360},deviceScaleFactor:2}),er=[];pg.on('pageerror',e=>er.push(e.message));await pg.route('**/fonts.googleapis.com/**',r=>r.abort());await pg.goto('file://'+__dirname+'/../index.html');await pg.waitForTimeout(400);
await pg.addScriptTag({path:__dirname+'/hart_mid.js'});await pg.addScriptTag({path:__dirname+'/hart_mid5.js'});
await pg.evaluate(()=>{newRun(0);go('map');const L=[['兜割り',artKabuto],['鉄壁',artTeppeki],['大回転',artDaikaiten],['粉砕',artFunsai],['魔の力',artManochikara]];L.forEach(([n,f])=>{HART[n]=f;delete HAC[n]});const o=draw;draw=function(){o();ctx.fillStyle='#0a0814';ctx.fillRect(0,0,640,360);L.forEach(([n],k)=>cardAt({i:CI(n),u:0},70+k*125,180,1.45,0,1))}});
await pg.waitForTimeout(500);await pg.screenshot({path:process.argv[2]});console.log(er);await br.close()})();
