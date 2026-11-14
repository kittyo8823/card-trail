// 新キャラ案3つを1枚に並べて撮る: node dev/mock/summoners_shot.js 出力先.png
const {chromium}=require('playwright'),path=require('path'),fs=require('fs');
(async()=>{const out=process.argv[2]||'summoners.png';const b=await chromium.launch();const p=await b.newPage({viewport:{width:960,height:420},deviceScaleFactor:2});const er=[];p.on('pageerror',e=>er.push(e.message));
await p.route('**/fonts.googleapis.com/**',r=>r.abort());await p.goto('file://'+path.resolve(__dirname,'../index.html'));await p.waitForTimeout(500);
await p.evaluate(code=>{eval(code);const P=k=>paint(SD[k][0],SD[k][1],SD[k][3],SD[k][2]);
 const cv=document.createElement('canvas');cv.width=960;cv.height=280;cv.id='sh';cv.style.cssText='position:fixed;left:0;top:0;width:960px;height:280px;z-index:99;image-rendering:pixelated';document.body.appendChild(cv);const g=cv.getContext('2d');g.imageSmoothingEnabled=false;
 const bgs=[BGB1,BGB2,BGB3];const glow=(x,y,r,c)=>{const gg=g.createRadialGradient(x,y,0,x,y,r);gg.addColorStop(0,c);gg.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gg;g.fillRect(x-r,y-r,r*2,r*2)};
 const panel=(i,f,ttl)=>{g.save();g.beginPath();g.rect(i*320,0,318,280);g.clip();g.drawImage(bgs[i],i*320-40,10,640,240);g.translate(i*320,0);f();g.restore();g.fillStyle='rgba(8,6,16,.85)';g.fillRect(i*320,250,318,30);g.fillStyle='#f0e8d8';g.font='16px DotGothic16,sans-serif';g.textAlign='center';g.fillText(ttl,i*320+160,271)};
 const G=218,sd=(x,w)=>{g.fillStyle='rgba(0,0,0,.35)';g.beginPath();g.ellipse(x,G,w,5,0,0,7);g.fill()};
 panel(0,()=>{const M=P('miko'),F=P('kfox');glow(150,140,110,'rgba(90,170,230,.35)');g.globalAlpha=.6;g.drawImage(F,90,G-F.height-8);g.globalAlpha=1;sd(80,22);g.drawImage(M,22,G-M.height);for(const[x,y]of[[200,110],[230,150],[175,175],[250,95]]){glow(x,y,14,'rgba(170,230,255,.8)');g.fillStyle='#e8ffff';g.fillRect(x-2,y-2,4,4)}},'案A 狐火の巫女');
 panel(1,()=>{const C=P('cageg'),K=P('cage');sd(110,26);g.drawImage(C,52,G-C.height);g.drawImage(K,110,G-K.height-10);glow(160,G-62,30,'rgba(200,40,70,.4)')},'案B 鳥籠の少女');
 panel(2,()=>{const K=P('kasag'),U=P('kasa');sd(70,22);sd(185,30);g.drawImage(K,12,G-K.height);g.drawImage(U,124,G-U.height)},'案C 唐傘の娘');
},fs.readFileSync(path.join(__dirname,'summoners.js'),'utf8'));
await p.locator('#sh').screenshot({path:out});console.log(er);await b.close()})();
