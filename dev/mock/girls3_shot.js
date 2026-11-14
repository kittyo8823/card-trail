// 幽霊騎士の主の少女3通り（案a〜c）を騎士と並べて撮る: node dev/mock/girls3_shot.js 出力先.png
const {chromium}=require('playwright'),path=require('path'),fs=require('fs'),{execSync}=require('child_process');
(async()=>{const out=process.argv[2]||'dknight2.gif',tmp=fs.mkdtempSync('/tmp/claude-0/dk');const b=await chromium.launch();const p=await b.newPage({viewport:{width:480,height:260},deviceScaleFactor:2});const er=[];p.on('pageerror',e=>er.push(e.message));
await p.route('**/fonts.googleapis.com/**',r=>r.abort());await p.goto('file://'+path.resolve(__dirname,'../index.html'));await p.waitForTimeout(500);
await p.evaluate(([code,ks])=>{window.GKS=ks;eval(code);const P=k=>paint(SD[k][0],SD[k][1],SD[k][3],SD[k][2]);window.GS=(window.GKS||['ga','gb','gc']).map(P);window.GI=GS[0];window.KI=P('k3');
 const cv=document.createElement('canvas');cv.width=480;cv.height=260;cv.id='sh';cv.style.cssText='position:fixed;left:0;top:0;width:480px;height:260px;z-index:99;image-rendering:pixelated';document.body.appendChild(cv);window.G2=cv.getContext('2d');G2.imageSmoothingEnabled=false},[fs.readFileSync(path.join(__dirname,'dknight.js'),'utf8')+fs.readFileSync(path.join(__dirname,'girls3.js'),'utf8'),process.argv[3]?process.argv[3].split(','):null]);
const NK=process.argv[3]?process.argv[3].split(',').length:3;for(let n=0;n<NK;n++){const f=4;await p.evaluate(n=>{GI=GS[n]},n);await p.evaluate(f=>{const g=G2,T=f/16*6.283,GY=232;g.drawImage(BGB1,-60,-8,640,260);
 const glow=(x,y,r,c)=>{const gg=g.createRadialGradient(x,y,0,x,y,r);gg.addColorStop(0,c);gg.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gg;g.fillRect(x-r,y-r,r*2,r*2)};
 g.fillStyle='rgba(0,0,0,.35)';g.beginPath();g.ellipse(80,GY,22,5,0,0,7);g.fill();g.drawImage(GI,30,GY-GI.height);
 const fy=Math.round(Math.sin(T)*3),kx=150,ky=GY-178+fy;
 // 効果は半分の解像度の別キャンバスに描いて2倍に引き伸ばす（ドット絵の粗さにそろえる）
 const E=window.EC||(window.EC=document.createElement('canvas'));E.width=240;E.height=130;const e=E.getContext('2d');e.clearRect(0,0,240,130);
 const flm=(x,y,s,ph,dn)=>{x/=2;y/=2;s=s*1.6/2;e.globalCompositeOperation=dn?'source-over':'lighter';for(let k=0;k<3;k++){const h=s*(1-k*.25)*(1+.3*Math.sin(T*2+ph+k))*(dn?-1:1),w=s*.7*(1-k*.25);e.globalAlpha=dn?[.55,.6,.45][k]:[.35,.45,.6][k];e.fillStyle=dn?['#1a3488','#2a5ec8','#5a96e8'][k]:['#1a4ab8','#3a8aff','#a8d8ff'][k];e.beginPath();e.moveTo(x-w,y);e.quadraticCurveTo(x-w*.6+Math.sin(T*2+ph)*1.5,y-h*.6,x+Math.sin(T*2.4+ph)*2,y-h);e.quadraticCurveTo(x+w*.6+Math.sin(T*2+ph)*1.5,y-h*.6,x+w,y);e.closePath();e.fill()}e.globalAlpha=1;e.globalCompositeOperation='source-over'};
 g.fillStyle='rgba(20,40,90,.25)';g.beginPath();g.ellipse(kx+66,GY,34,5,0,0,7);g.fill();
 // 下半身：下向きの炎を背骨に沿って重ね、先へいくほど細く、左右にゆらめく
 for(let j=0;j<9;j++){const u=j/8,sx=kx+70+Math.sin(T*1.5+u*4)*(3+u*10)+(j%2?-1:1)*(10*(1-u)),sy=ky+120+u*62;flm(sx,sy,22*(1-u*.65),j*.9,1)}
 for(let j=0;j<5;j++){const u=j/4;flm(kx+70+Math.sin(T*1.5+u*4)*(3+u*10),ky+118+u*50,30*(1-u*.6),j*1.7+3,1)}
 g.imageSmoothingEnabled=false;g.drawImage(E,0,0,480,260);e.clearRect(0,0,240,130);
 g.drawImage(KI,kx,ky);
 const U=3,X=a=>kx+a*U+2,Y=b=>ky+(b+4)*U+2;
 flm(X(24),Y(13),14,0);flm(X(33),Y(13),10,1.3);flm(X(14),Y(13),9,2.1);flm(X(38.6),Y(20),9,.7);flm(X(23),Y(36),12,1.9);flm(X(31),Y(36),10,2.7);flm(X(13),Y(35),9,3.4);
 g.imageSmoothingEnabled=false;g.drawImage(E,0,0,480,260);glow(X(30),Y(6.4),16,'rgba(140,210,255,.7)');
 for(let k=0;k<10;k++){const u=(k/10+T/6.283*.6)%1,x=kx+40+((k*37)%90),y=ky+130-u*120;g.globalAlpha=(1-u)*.8;g.fillStyle='#9ad0ff';g.fillRect(Math.round(x),Math.round(y),2,2)}g.globalAlpha=1},f);
 await p.locator('#sh').screenshot({path:path.join(tmp,'g'+n+'.png')})}
await b.close();execSync(`python3 -c "
from PIL import Image,ImageDraw,ImageFont
ims=[Image.open('${tmp}/g%d.png'%n).convert('RGB').crop((0,60,660,520)) for n in range(${NK})]
W,H=ims[0].size;o=Image.new('RGB',(W*len(ims),H+44),(10,8,18));d=ImageDraw.Draw(o)
f=ImageFont.truetype('/usr/share/fonts/opentype/ipafont-gothic/ipag.ttf',26)
for n,(im,t) in enumerate(zip(ims,'${process.argv[4]||'案a 白い聖女,案b 喪の巡礼者,案c 墓所の歌い手'}'.split(','))):o.paste(im,(n*W,0));d.text((n*W+W//2,H+22),t,fill=(240,232,216),font=f,anchor='mm')
o.save('${out}')"`);console.log(er)})();