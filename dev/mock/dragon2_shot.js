// 使い方: node mock/dragon2_shot.js 出力先.png（今の炎竜と描き直しの見本を、第1層の背景に並べる）
const {chromium}=require('playwright'),fs=require('fs');(async()=>{const br=await chromium.launch(),pg=await br.newPage({viewport:{width:640,height:360}}),er=[];pg.on('pageerror',e=>er.push(e.message));await pg.goto('file://'+__dirname+'/../index.html');await pg.waitForTimeout(400);
await pg.addScriptTag({path:__dirname+'/dragon2.js'});
const d=await pg.evaluate(()=>{const C={a:'#c8382c',b:'#b02a24',d:'#80181a',l:'#e0a050',pl:'#b06a2a',m:'#7a1820',mf:'#4e0c14',bn:'#4a0a10',bn2:'#30060c',h:'#e8dcc0',h2:'#c8bca0',eye:'#ffd23f',fire:'#ff8c2e'},D=DRG2(C),nw=muteC(flipC(paint(D[0],D[1],D[3],170/D[1]))),old=SPR.dragon,W=640,H=360,cv=document.getElementById('c');draw=()=>{};cv.width=W*2;cv.height=H*2;ctx.setTransform(2,0,0,2,0,0);ctx.imageSmoothingEnabled=false;ctx.drawImage(bgbFor(1),0,0,W,H);
 ctx.drawImage(old,170-old.width/2,208-old.height);ctx.drawImage(nw,470-nw.width/2,208-nw.height);txt('今',170,236,'#fff','center',12);txt('描き直し',470,236,'#fff','center',12);return cv.toDataURL('image/png')});
fs.writeFileSync(process.argv[2],Buffer.from(d.split(',')[1],'base64'));console.log(er);await br.close()})();
