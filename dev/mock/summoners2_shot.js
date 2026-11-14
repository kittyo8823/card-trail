// 新キャラ案3つ（その2）を1枚に並べて撮る: node dev/mock/summoners2_shot.js 出力先.png
const {chromium}=require('playwright'),path=require('path'),fs=require('fs');
(async()=>{const out=process.argv[2]||'summoners2.png';const b=await chromium.launch();const p=await b.newPage({viewport:{width:960,height:420},deviceScaleFactor:2});const er=[];p.on('pageerror',e=>er.push(e.message));
await p.route('**/fonts.googleapis.com/**',r=>r.abort());await p.goto('file://'+path.resolve(__dirname,'../index.html'));await p.waitForTimeout(500);
await p.evaluate(code=>{eval(code);const P=k=>paint(SD[k][0],SD[k][1],SD[k][3],SD[k][2]);
 const cv=document.createElement('canvas');cv.width=960;cv.height=280;cv.id='sh';cv.style.cssText='position:fixed;left:0;top:0;width:960px;height:280px;z-index:99;image-rendering:pixelated';document.body.appendChild(cv);const g=cv.getContext('2d');g.imageSmoothingEnabled=false;
 const bgs=[BGB1,BGB2,BGB3];const glow=(x,y,r,c)=>{const gg=g.createRadialGradient(x,y,0,x,y,r);gg.addColorStop(0,c);gg.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gg;g.fillRect(x-r,y-r,r*2,r*2)};
 const panel=(i,f,ttl)=>{g.save();g.beginPath();g.rect(i*320,0,318,280);g.clip();g.drawImage(bgs[i],i*320-40,10,640,240);g.translate(i*320,0);f();g.restore();g.fillStyle='rgba(8,6,16,.85)';g.fillRect(i*320,250,318,30);g.fillStyle='#f0e8d8';g.font='16px DotGothic16,sans-serif';g.textAlign='center';g.fillText(ttl,i*320+160,271)};
 const G=218,sd=(x,w)=>{g.fillStyle='rgba(0,0,0,.35)';g.beginPath();g.ellipse(x,G,w,5,0,0,7);g.fill()};
 panel(1,()=>{const K=P('gkeep'),C=P('coffin');sd(165,40);g.drawImage(C,118,G-C.height);sd(70,22);g.drawImage(K,12,G-K.height);glow(12+31*3,G-K.height+(27+2)*3,20,'rgba(255,170,60,.5)');for(const[x,y]of[[178,G-138],[191,G-138]])glow(x,y,8,'rgba(120,200,255,.7)')},'案E 墓守と棺の騎士');
 panel(0,()=>{const K=P('bkeep'),S=P('swarm');g.globalAlpha=.55;g.drawImage(S,100,G-S.height);g.globalAlpha=1;let sd0=7;const rn=()=>(sd0=(sd0*16807)%2147483647)/2147483647;for(let k=0;k<420;k++){const x=100+rn()*S.width,y=G-S.height+rn()*S.height,c=S.getContext('2d').getImageData(Math.floor(x-100),Math.floor(y-(G-S.height)),1,1).data;if(!c[3])continue;g.fillStyle=rn()<.5?'#e0a830':'#2a1a0a';g.fillRect(Math.round(x),Math.round(y),2,2)}for(const[x,y]of[[148,G-128],[166,G-128]])glow(x,y,8,'rgba(255,190,60,.8)');sd(70,22);g.drawImage(K,12,G-K.height)},'案D 養蜂家と蜂の巨人');
 panel(2,()=>{const D=P('dancer'),M=P('nomask');glow(175,G-90,90,'rgba(150,40,90,.3)');g.drawImage(M,100,G-M.height-14);sd(70,22);g.drawImage(D,12,G-D.height)},'案F 舞姫と大きな能面');
},fs.readFileSync(path.join(__dirname,'summoners2.js'),'utf8'));
await p.locator('#sh').screenshot({path:out});console.log(er);await b.close()})();
