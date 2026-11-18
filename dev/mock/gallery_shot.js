// 絵画の回廊の試し描きを撮る: node dev/mock/gallery_shot.js 出力先.png
const {chromium}=require('playwright'),path=require('path'),fs=require('fs');
(async()=>{const out=process.argv[2]||'gallery.png';const b=await chromium.launch();const p=await b.newPage({viewport:{width:640,height:360},deviceScaleFactor:2});const er=[];p.on('pageerror',e=>er.push(e.message));
await p.route('**/fonts.googleapis.com/**',r=>r.abort());await p.goto('file://'+path.resolve(__dirname,'../index.html'));await p.waitForTimeout(500);
await p.evaluate(code=>{eval(code);const ks=['gscream','garm','glady'],im=ks.map(k=>flipC(paint(SD[k][0],SD[k][1],SD[k][3],SD[k][2])));
 const cv=document.createElement('canvas');cv.width=480;cv.height=240;cv.id='sh';cv.style.cssText='position:fixed;left:0;top:0;width:480px;height:240px;z-index:99;image-rendering:pixelated';document.body.appendChild(cv);const g=cv.getContext('2d');g.imageSmoothingEnabled=false;
 g.fillStyle='#3a1418';g.fillRect(0,0,480,180);g.fillStyle='#2a1c14';g.fillRect(0,180,480,60);g.fillStyle='#4a3420';g.fillRect(0,176,480,4);
 const xs=[90,240,390];im.forEach((m,i)=>{g.fillStyle='rgba(0,0,0,.35)';g.beginPath();g.ellipse(xs[i],206,m.width*.4,5,0,0,7);g.fill();g.drawImage(m,xs[i]-m.width/2,(i===1?206:192)-m.height)});
},fs.readFileSync(path.join(__dirname,'gallery.js'),'utf8'));
await p.locator('#sh').screenshot({path:out});console.log(er);await b.close()})();
