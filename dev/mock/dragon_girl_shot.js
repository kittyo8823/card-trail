// 少女と黒龍の見本を戦闘画面の位置に置いて撮る: node dev/mock/dragon_girl_shot.js 出力先.png
const {chromium}=require('playwright'),path=require('path'),fs=require('fs');
(async()=>{const out=process.argv[2]||'dragon_girl.png';const b=await chromium.launch();const p=await b.newPage({viewport:{width:640,height:360},deviceScaleFactor:2});const er=[];p.on('pageerror',e=>er.push(e.message));
await p.route('**/fonts.googleapis.com/**',r=>r.abort());await p.goto('file://'+path.resolve(__dirname,'../index.html'));await p.waitForTimeout(500);
await p.evaluate(code=>{eval(code);const P=k=>paint(SD[k][0],SD[k][1],SD[k][3],SD[k][2]),G=P('bgirl'),DB=P('bdragB'),DF=P('bdragF');
 const cv=document.createElement('canvas');cv.width=640;cv.height=240;cv.id='sh';cv.style.cssText='position:fixed;left:0;top:0;width:640px;height:240px;z-index:99;image-rendering:pixelated';document.body.appendChild(cv);const g=cv.getContext('2d');g.imageSmoothingEnabled=false;
 g.drawImage(BGB2,0,0);g.fillStyle='rgba(0,0,0,.35)';g.beginPath();g.ellipse(150,210,130,8,0,0,7);g.fill();
 const X=10,Y=212-DB.height;g.drawImage(DB,X,Y);g.drawImage(G,X+34*3-57,208-G.height);g.drawImage(DF,X,Y);
 {const x=X+80*3+2,y=Y+(6.6+4)*3+2,gg=g.createRadialGradient(x,y,0,x,y,14);gg.addColorStop(0,'rgba(255,170,60,.55)');gg.addColorStop(1,'rgba(255,120,30,0)');g.fillStyle=gg;g.fillRect(x-14,y-14,28,28)}
 for(const k of['imp','knight']){const im=SPR[k];g.drawImage(im,k==='imp'?440:530,208-im.height)}
},fs.readFileSync(path.join(__dirname,'dragon_girl.js'),'utf8'));
await p.locator('#sh').screenshot({path:out});console.log(er);await b.close()})();
