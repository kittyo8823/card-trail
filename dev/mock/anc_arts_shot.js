// 使い方: node mock/anc_arts_shot.js 出力先.png（6枚を並べて撮る）
const {chromium}=require('playwright');(async()=>{const br=await chromium.launch(),pg=await br.newPage({viewport:{width:640,height:360},deviceScaleFactor:2}),er=[];pg.on('pageerror',e=>er.push(e.message));await pg.route('**/fonts.googleapis.com/**',r=>r.abort());await pg.goto('file://'+__dirname+'/../index.html');await pg.waitForTimeout(400);
await pg.addScriptTag({path:__dirname+'/anc_arts.js'});
await pg.evaluate(()=>{newRun(0);go('map');faArt('sai');for(let i=0;i<6;i++)FAA['anc'+i]=ANCF[i]();const o=draw;draw=function(){o();ctx.fillStyle='#0a0814';ctx.fillRect(0,0,640,360);ACN.forEach((n,i)=>cardAt({i:CI(n),u:0},60+(i%3)*110+(i>=3?330-330:0)+(i>=3?0:0),0,0,0,0))}});
await pg.evaluate(()=>{const o=draw;draw=function(){o();ctx.fillStyle='#0a0814';ctx.fillRect(0,0,640,360);ACN.forEach((n,i)=>cardAt({i:CI(n),u:0},56+i*105,180,1.1,0,1))}});
await pg.waitForTimeout(500);await pg.screenshot({path:process.argv[2]});console.log(er);await br.close()})();
