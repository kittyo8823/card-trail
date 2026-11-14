// 魔女と影の悪魔の見本を戦闘画面の位置に置いて撮る: node dev/mock/witch_shot.js 出力先.png
const {chromium}=require('playwright'),path=require('path'),fs=require('fs');
(async()=>{const out=process.argv[2]||'witch.png';const b=await chromium.launch();const p=await b.newPage({viewport:{width:640,height:360},deviceScaleFactor:2});const er=[];p.on('pageerror',e=>er.push(e.message));
await p.route('**/fonts.googleapis.com/**',r=>r.abort());await p.goto('file://'+path.resolve(__dirname,'../index.html'));await p.waitForTimeout(500);
await p.evaluate(code=>{eval(code);const W=paint(SD.witch[0],SD.witch[1],SD.witch[3],SD.witch[2]),D=paint(SD.wdemon[0],SD.wdemon[1],SD.wdemon[3],SD.wdemon[2]);
 const cv=document.createElement('canvas');cv.width=640;cv.height=240;cv.id='sh';cv.style.cssText='position:fixed;left:0;top:0;width:640px;height:240px;z-index:99;image-rendering:pixelated';document.body.appendChild(cv);const g=cv.getContext('2d');g.imageSmoothingEnabled=false;
 g.drawImage(BGB2,0,0);
 // 影の悪魔の足元の暗いにじみ
 // 悪魔は魔女の後ろ（左上）に浮かび、腕を前へ回す。足元に紫のにじみ
 const gr=g.createRadialGradient(95,120,6,95,120,110);gr.addColorStop(0,'rgba(70,30,110,.4)');gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.fillRect(0,0,260,240);
 g.fillStyle='rgba(0,0,0,.3)';g.beginPath();g.ellipse(124,208,26,5,0,0,7);g.fill();
 g.globalAlpha=.92;g.drawImage(D,-6,188-D.height);g.globalAlpha=1;g.drawImage(W,98,208-W.height);
 for(const k of['imp','knight']){const im=SPR[k];g.drawImage(im,k==='imp'?420:520,208-im.height)}
},fs.readFileSync(path.join(__dirname,'witch.js'),'utf8'));
await p.locator('#sh').screenshot({path:out});console.log(er);await b.close()})();
