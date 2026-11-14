// 少女と首なし騎士の2通りを1枚に並べて撮る: node dev/mock/dknight_shot.js 出力先.png
const {chromium}=require('playwright'),path=require('path'),fs=require('fs');
(async()=>{const out=process.argv[2]||'dknight.png';const b=await chromium.launch();const p=await b.newPage({viewport:{width:960,height:320},deviceScaleFactor:2});const er=[];p.on('pageerror',e=>er.push(e.message));
await p.route('**/fonts.googleapis.com/**',r=>r.abort());await p.goto('file://'+path.resolve(__dirname,'../index.html'));await p.waitForTimeout(500);
await p.evaluate(code=>{eval(code);const P=k=>paint(SD[k][0],SD[k][1],SD[k][3],SD[k][2]);
 const cv=document.createElement('canvas');cv.width=960;cv.height=290;cv.id='sh';cv.style.cssText='position:fixed;left:0;top:0;width:960px;height:290px;z-index:99;image-rendering:pixelated';document.body.appendChild(cv);const g=cv.getContext('2d');g.imageSmoothingEnabled=false;
 const glow=(x,y,r,c)=>{const gg=g.createRadialGradient(x,y,0,x,y,r);gg.addColorStop(0,c);gg.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gg;g.fillRect(x-r,y-r,r*2,r*2)};
 const G=238,sd=(x,w)=>{g.fillStyle='rgba(0,0,0,.35)';g.beginPath();g.ellipse(x,G,w,5,0,0,7);g.fill()};
 const panel=(i,bg,gk,kk,fc,ttl)=>{const ox=i*480;g.save();g.beginPath();g.rect(ox,0,478,290);g.clip();g.translate(ox,0);g.drawImage(bg,-60,0,640,260);
  const Gi=P(gk),K=P(kk),kx=170,ky=G-K.height;glow(kx+22*3,ky+(5+4)*3,40,fc);sd(80,22);g.drawImage(Gi,30,G-Gi.height);sd(kx+70,40);g.drawImage(K,kx,ky);g.restore();
  g.fillStyle='rgba(8,6,16,.85)';g.fillRect(ox,260,478,30);g.fillStyle='#f0e8d8';g.font='16px DotGothic16,sans-serif';g.textAlign='center';g.fillText(ttl,ox+240,281)};
 panel(0,BGB2,'g1','k1','rgba(80,150,255,.5)','案1 喪服の少女と黒鉄の騎士');
 panel(1,BGB1,'g2','k2','rgba(220,80,160,.45)','案2 白い外套の少女と白銀の騎士');
},fs.readFileSync(path.join(__dirname,'dknight.js'),'utf8'));
await p.locator('#sh').screenshot({path:out});console.log(er);await b.close()})();
