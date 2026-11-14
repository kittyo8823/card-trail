// 少年とゴーレムの見本を戦闘画面の位置に置いて撮る: node dev/mock/golem_shot.js 出力先.png
const {chromium}=require('playwright'),path=require('path'),fs=require('fs');
(async()=>{const out=process.argv[2]||'golem.png';const b=await chromium.launch();const p=await b.newPage({viewport:{width:640,height:360},deviceScaleFactor:2});const er=[];p.on('pageerror',e=>er.push(e.message));
await p.route('**/fonts.googleapis.com/**',r=>r.abort());await p.goto('file://'+path.resolve(__dirname,'../index.html'));await p.waitForTimeout(500);
await p.evaluate(code=>{eval(code);const W=paint(SD.gboy[0],SD.gboy[1],SD.gboy[3],SD.gboy[2]),D=paint(SD.golem[0],SD.golem[1],SD.golem[3],SD.golem[2]);
 const cv=document.createElement('canvas');cv.width=640;cv.height=240;cv.id='sh';cv.style.cssText='position:fixed;left:0;top:0;width:640px;height:240px;z-index:99;image-rendering:pixelated';document.body.appendChild(cv);const g=cv.getContext('2d');g.imageSmoothingEnabled=false;
 g.drawImage(BGB1,0,0);
 // ゴーレムは少年の前に立つ。溶岩の光のにじみ
 const gr=g.createRadialGradient(248,150,6,248,150,100);gr.addColorStop(0,'rgba(255,110,40,.18)');gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.fillRect(100,40,240,200);
 g.fillStyle='rgba(0,0,0,.3)';g.beginPath();g.ellipse(100,208,24,5,0,0,7);g.fill();g.beginPath();g.ellipse(248,208,60,7,0,0,7);g.fill();
 g.drawImage(W,60,208-W.height);g.drawImage(D,168,210-D.height);
 for(const k of['goblin','ogre']){const im=SPR[k];g.drawImage(im,k==='goblin'?420:510,208-im.height)}
},fs.readFileSync(path.join(__dirname,'golem.js'),'utf8'));
await p.locator('#sh').screenshot({path:out});console.log(er);await b.close()})();
