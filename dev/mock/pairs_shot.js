// 「少女＋何か」「少年＋何か」の見本を1枚に並べて撮る: node dev/mock/pairs_shot.js 出力先.png
const {chromium}=require('playwright'),path=require('path'),fs=require('fs');
(async()=>{const out=process.argv[2]||'pairs.png';const b=await chromium.launch();const p=await b.newPage({viewport:{width:960,height:600},deviceScaleFactor:2});const er=[];p.on('pageerror',e=>er.push(e.message));
await p.route('**/fonts.googleapis.com/**',r=>r.abort());await p.goto('file://'+path.resolve(__dirname,'../index.html'));await p.waitForTimeout(500);
await p.evaluate(code=>{eval(code);const P=k=>paint(SD[k][0],SD[k][1],SD[k][3],SD[k][2]);
 const cv=document.createElement('canvas');cv.width=960;cv.height=560;cv.id='sh';cv.style.cssText='position:fixed;left:0;top:0;width:960px;height:560px;z-index:99;image-rendering:pixelated';document.body.appendChild(cv);const g=cv.getContext('2d');g.imageSmoothingEnabled=false;
 const glow=(x,y,r,c)=>{const gg=g.createRadialGradient(x,y,0,x,y,r);gg.addColorStop(0,c);gg.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gg;g.fillRect(x-r,y-r,r*2,r*2)};
 const G=228,sd=(x,w)=>{g.fillStyle='rgba(0,0,0,.35)';g.beginPath();g.ellipse(x,G,w,5,0,0,7);g.fill()};
 const panel=(i,bg,f,ttl)=>{const ox=(i%2)*480,oy=Math.floor(i/2)*280;g.save();g.beginPath();g.rect(ox,oy,478,278);g.clip();g.translate(ox,oy);g.drawImage(bg,-60,-10,640,260);f();g.restore();g.fillStyle='rgba(8,6,16,.85)';g.fillRect(ox,oy+248,478,30);g.fillStyle='#f0e8d8';g.font='16px DotGothic16,sans-serif';g.textAlign='center';g.fillText(ttl,ox+240,oy+269)};
 panel(0,BGB1,()=>{const C=P('wgirl'),W=P('wolf');sd(80,22);g.drawImage(C,22,G-C.height);sd(220,70);g.drawImage(W,120,G-W.height+4);glow(120+53*3+2,G-W.height+4+8*3+2,14,'rgba(120,200,255,.6)')},'少女＋白い大狼');
 panel(1,BGB2,()=>{const C=P('hboy'),H=P('ihand');sd(80,22);g.drawImage(C,22,G-C.height);g.drawImage(H,150,60);g.save();g.translate(330,150);g.scale(-1,1);g.drawImage(H,0,0);g.restore();glow(200,100,40,'rgba(255,140,60,.25)')},'少年＋鉄の両腕');
 panel(2,BGB2,()=>{const C=P('dgirl'),K=P('dknight');sd(200,40);g.drawImage(K,140,G-K.height);glow(140+18*3,G-K.height+8*3,30,'rgba(80,160,255,.5)');sd(80,22);g.drawImage(C,22,G-C.height)},'少女＋首なし騎士');
 panel(3,BGB3,()=>{const C=P('fboy'),F=P('phoenix');glow(200,110,110,'rgba(255,120,40,.3)');g.drawImage(F,110,40);sd(80,22);g.drawImage(C,22,G-C.height)},'少年＋火の鳥');
},fs.readFileSync(path.join(__dirname,'pairs.js'),'utf8'));
await p.locator('#sh').screenshot({path:out});console.log(er);await b.close()})();
