// 鱗の帝国の試し描きを戦闘の配置で撮る: node dev/mock/lizard_shot.js 出力先.png
const {chromium}=require('playwright'),path=require('path'),fs=require('fs');
(async()=>{const out=process.argv[2]||'lizard.png';const b=await chromium.launch();const p=await b.newPage({viewport:{width:640,height:360},deviceScaleFactor:2});const er=[];p.on('pageerror',e=>er.push(e.message));
await p.route('**/fonts.googleapis.com/**',r=>r.abort());await p.goto('file://'+path.resolve(__dirname,'../index.html'));await p.waitForTimeout(500);
await p.evaluate(code=>{eval(code);const mk=k=>flipC(paint(SD[k][0],SD[k][1],SD[k][3],SD[k][2]));
 const cv=document.createElement('canvas');cv.width=640;cv.height=360;cv.id='sh';cv.style.cssText='position:fixed;left:0;top:0;width:640px;height:360px;z-index:99;image-rendering:pixelated';document.body.appendChild(cv);const g=cv.getContext('2d');g.imageSmoothingEnabled=false;
 g.drawImage(bgScale(),0,0);const G=208;
 const sd=(cx,w)=>{g.fillStyle='rgba(0,0,0,.35)';g.beginPath();g.ellipse(cx,G,w,5,0,0,7);g.fill()};
 const pl=SPR.pl;sd(120,22);g.drawImage(pl,120-pl.width/2,G-pl.height+4);
 const A=[['legg',248,0],['lserp',362,0],['lcharm',448,0],['lrider',548,-36]];
 for(const[k,cx,dy]of A){const im=mk(k);sd(cx,im.width*.35);g.drawImage(im,cx-im.width/2,G-im.height+dy)}
},fs.readFileSync(path.join(__dirname,'lizard.js'),'utf8'));
await p.locator('#sh').screenshot({path:out});console.log(er);await b.close()})();
