// 幽霊騎士の主の少女3通り（案a〜c）を騎士と並べて撮る: node dev/mock/girls3_shot.js 出力先.png
const {chromium}=require('playwright'),path=require('path'),fs=require('fs'),{execSync}=require('child_process');
(async()=>{const out=process.argv[2]||'dknight2.gif',tmp=fs.mkdtempSync('/tmp/claude-0/dk');const b=await chromium.launch();const p=await b.newPage({viewport:{width:480,height:260},deviceScaleFactor:2});const er=[];p.on('pageerror',e=>er.push(e.message));
await p.route('**/fonts.googleapis.com/**',r=>r.abort());await p.goto('file://'+path.resolve(__dirname,'../index.html'));await p.waitForTimeout(500);
await p.evaluate(([code,ks,kk,ws])=>{window.WSET=ws;window.GKS=ks;window.KKS=kk;eval(code);
window.SPR_=(e,x,y0,y1,T,c)=>{x/=2;y0/=2;y1/=2;e.globalCompositeOperation='lighter';e.globalAlpha=.35;e.fillStyle=c[0];e.fillRect(Math.round(x)-2,Math.round(y1),5,Math.round(y0-y1));e.globalAlpha=.85;e.fillStyle=c[1];e.fillRect(Math.round(x)-1,Math.round(y1),3,Math.round(y0-y1));e.fillStyle=c[2];e.fillRect(Math.round(x),Math.round(y1),1,Math.round(y0-y1));e.globalAlpha=1;e.globalCompositeOperation='source-over'};
window.WFX2=[
// 槍1 菱形の穂先：まっすぐ立てた細い光の槍
({e,X,Y,T})=>{const x=X(46),c=['#2a6ad8','#7ab8ff','#e0f4ff'];SPR_(e,x,232,Y(-8),T,c);const hx=x/2,hy=Y(-8)/2;e.globalCompositeOperation='lighter';e.globalAlpha=.9;e.fillStyle='#7ab8ff';e.beginPath();e.moveTo(hx,hy-14);e.lineTo(hx+4,hy-2);e.lineTo(hx,hy+3);e.lineTo(hx-4,hy-2);e.fill();e.fillStyle='#e8f8ff';e.beginPath();e.moveTo(hx,hy-11);e.lineTo(hx+1.6,hy-2);e.lineTo(hx,hy+1);e.lineTo(hx-1.6,hy-2);e.fill();e.globalAlpha=.5;e.fillStyle='#5aa0ff';e.fillRect(Math.round(hx)-3,Math.round(232/2)-1,7,2);e.globalAlpha=1;e.globalCompositeOperation='source-over'},
// 槍2 光の旗：穂先の下から光の帯がなびく
({e,X,Y,T})=>{const x=X(46),c=['#2a6ad8','#7ab8ff','#e0f4ff'];SPR_(e,x,232,Y(-8),T,c);const hx=x/2,hy=Y(-8)/2;e.globalCompositeOperation='lighter';e.fillStyle='#a8d8ff';e.beginPath();e.moveTo(hx,hy-12);e.lineTo(hx+3,hy-1);e.lineTo(hx-3,hy-1);e.fill();for(let k=0;k<3;k++){const sh_=k*1.6;e.globalAlpha=[.4,.55,.75][k];e.fillStyle=['#2a5ac8','#4a8ae8','#9ad0ff'][k];e.beginPath();for(let j=0;j<=8;j++){const u=j/8;e.lineTo(hx-1-u*20,hy+1+sh_+Math.sin(T*2+u*4)*2*u)}e.lineTo(hx-24,hy+8+Math.sin(T*2+4)*2);e.lineTo(hx-19,hy+12-sh_+Math.sin(T*2+4)*2);for(let j=8;j>=0;j--){const u=j/8;e.lineTo(hx-1-u*20,hy+16-sh_+Math.sin(T*2+u*4)*2*u)}e.fill()}e.globalAlpha=1;e.globalCompositeOperation='source-over'},
// 槍3 三叉の穂先（改）：太い光の柄に節の輪、三日月の口金から外へ反る両刃と長い中央の刃。穂先のまわりに光のにじみ、柄に沿って昇る光の粒、石突きの下に光の割れ目
({e,X,Y,T})=>{const x=Math.round(X(46)/2),yb=Math.round(232/2),yt=Math.round(Y(3)/2),L=(c,a,f)=>{e.globalAlpha=a;e.fillStyle=c;f();e.globalAlpha=1},P=(pts,c,a)=>L(c,a,()=>{e.beginPath();for(const[u,v]of pts)e.lineTo(u,v);e.fill()});
 e.globalCompositeOperation='lighter';
 // にじみ
 for(const[r,a]of[[18,.10],[11,.16],[6,.22]])L('#3a7ae8',a,()=>{e.beginPath();e.ellipse(x,yt-6,r,r*1.2,0,0,6.3);e.fill()});
 // 柄
 L('#1e4ab0',.55,()=>e.fillRect(x-2,yt,5,yb-yt));L('#5a9aff',.9,()=>e.fillRect(x-1,yt,3,yb-yt));L('#e8f6ff',.9,()=>e.fillRect(x,yt,1,yb-yt));
 for(let y=yt+8;y<yb-6;y+=14)L('#a8d8ff',.9,()=>{e.fillRect(x-3,y,7,1);e.fillRect(x-2,y+1,5,1)});
 // 三日月の口金
 P([[x-9,yt-2],[x-6,yt+2],[x,yt+3],[x+6,yt+2],[x+9,yt-2],[x+5,yt],[x,yt+1],[x-5,yt]],'#7ab8ff',.95);
 // 両側の刃：外へ反ってから上へ、内側に返し
 for(const sg of[-1,1]){P([[x+sg*6,yt-1],[x+sg*11,yt-6],[x+sg*12,yt-14],[x+sg*10,yt-19],[x+sg*9,yt-13],[x+sg*7,yt-7],[x+sg*4,yt-3]],'#5a9aff',.95);P([[x+sg*8,yt-6],[x+sg*10.6,yt-12],[x+sg*10,yt-17],[x+sg*9,yt-12]],'#e0f4ff',.95);P([[x+sg*9.4,yt-9],[x+sg*7,yt-12],[x+sg*8.6,yt-11]],'#a8d8ff',.9)}
 // 中央の長い刃
 P([[x,yt-30],[x+3,yt-14],[x+2,yt-2],[x-2,yt-2],[x-3,yt-14]],'#5a9aff',.95);P([[x,yt-27],[x+1.2,yt-14],[x+.6,yt-3],[x-.6,yt-3],[x-1.2,yt-14]],'#f0faff',.95);
 // 口金の宝珠
 L('#e8f6ff',1,()=>e.fillRect(x-1,yt-1,3,2));
 // 昇る光の粒
 for(let k=0;k<8;k++){const u=(k/8+T/6.283)%1,py=yb-u*(yb-yt+20),px=x+Math.sin(u*9+k)*4;L('#a8d8ff',(1-u)*.9,()=>e.fillRect(Math.round(px),Math.round(py),1,1))}
 // 石突きの下：光の割れ目
 for(const[dx,dy,w]of[[-8,0,6],[3,1,7],[-3,-1,5]])L('#5a9aff',.7,()=>e.fillRect(x+dx,yb+dy,w,1));L('#a8d8ff',.6,()=>{e.beginPath();e.ellipse(x,yb,10,2,0,0,6.3);e.fill()});
 e.globalCompositeOperation='source-over'},
// 槍4 光の輪：穂先のまわりを光の輪が回り、足元に光の陣
({e,X,Y,T})=>{const x=X(46),c=['#2a6ad8','#7ab8ff','#e0f4ff'];SPR_(e,x,232,Y(-8),T,c);const hx=x/2,hy=Y(-8)/2;e.globalCompositeOperation='lighter';e.fillStyle='#b8e0ff';e.beginPath();e.moveTo(hx,hy-12);e.lineTo(hx+3,hy-1);e.lineTo(hx-3,hy-1);e.fill();e.globalAlpha=.8;e.strokeStyle='#7ab8ff';e.lineWidth=1;e.beginPath();e.ellipse(hx,hy-4,8,2.6,Math.sin(T)*.3,0,6.3);e.stroke();e.globalAlpha=.5;e.strokeStyle='#5aa0ff';e.beginPath();e.ellipse(hx,232/2,14,3,0,0,6.3);e.stroke();e.beginPath();e.ellipse(hx,232/2,9,2,0,0,6.3);e.stroke();e.globalAlpha=1;e.globalCompositeOperation='source-over'}];
window.WFX=[

// 霊炎の大剣：手から前へ伸びる青い炎の刃
({e,X,Y,T,flm})=>{const x0=X(45),y0=Y(24);for(let j=0;j<12;j++){const u=j/11,x=x0+u*60,y=y0+u*44;flm(x,y,16*(1-u*.5),j*.7)}e.globalCompositeOperation='lighter';e.globalAlpha=.6;e.fillStyle='#d8f0ff';e.beginPath();e.moveTo(x0/2,y0/2);e.lineTo((x0+62)/2,(y0+46)/2);e.lineTo((x0+4)/2,(y0-3)/2);e.fill();e.globalAlpha=1;e.globalCompositeOperation='source-over'},
// 霊の鎖：胸から伸びる青い鎖が前へうねる
({e,X,Y,T})=>{for(const[c,ph]of[[0,0],[1,2]]){for(let j=0;j<22;j++){const u=j/21,x=X(30)+u*120,y=Y(20+c*6)+Math.sin(u*5+T*2+ph)*14*u+u*20;e.globalAlpha=.9;e.fillStyle=j%2?'#4a8ae0':'#a8d8ff';if(j%2)e.fillRect(Math.round(x/2)-2,Math.round(y/2)-1,4,3);else{e.fillRect(Math.round(x/2)-2,Math.round(y/2)-2,4,1);e.fillRect(Math.round(x/2)-2,Math.round(y/2)+1,4,1);e.fillRect(Math.round(x/2)-2,Math.round(y/2)-2,1,4);e.fillRect(Math.round(x/2)+1,Math.round(y/2)-2,1,4)}}}e.globalAlpha=1},
// 浮かぶ霊剣：周りに光の剣がいくつも浮かび、切っ先を敵へ向ける
({e,X,Y,T})=>{for(let k=0;k<5;k++){const cx=X(52)+Math.cos(k*1.3+T)*8,cy=Y(-2+k*9)+Math.sin(T*1.5+k)*4;e.globalAlpha=.85;e.fillStyle='#4a8ae0';e.beginPath();e.moveTo(cx/2-12,cy/2-2.4);e.lineTo(cx/2+12,cy/2);e.lineTo(cx/2-12,cy/2+2.4);e.fill();e.fillStyle='#b8e0ff';e.beginPath();e.moveTo(cx/2-11,cy/2-1);e.lineTo(cx/2+9,cy/2);e.lineTo(cx/2-11,cy/2+.6);e.fill();e.fillStyle='#e0f4ff';e.fillRect(Math.round(cx/2)-13,Math.round(cy/2)-3,2,6)}e.globalAlpha=1},
// 鬼火の球と光の盾：手のひらに青い炎の球、奥の手に六角の光の盾
({e,X,Y,T,flm})=>{for(let k=0;k<3;k++){const a=T+k*2.1;flm(X(52)+Math.cos(a)*16,Y(22)+Math.sin(a)*12,14,k)}const cx=X(4)/2,cy=Y(20)/2;e.globalAlpha=.45;e.fillStyle='#5aa0ff';e.beginPath();for(let k=0;k<6;k++){const a=k/6*6.283;e.lineTo(cx+Math.cos(a)*14,cy+Math.sin(a)*17)}e.fill();e.globalAlpha=.8;e.strokeStyle='#c8e8ff';e.lineWidth=1;e.stroke();e.globalAlpha=1}
];const P=k=>paint(SD[k][0],SD[k][1],SD[k][3],SD[k][2]);window.GS=(window.GKS||['ga','gb','gc']).map(P);window.GI=GS[0];window.KS=(window.KKS||['k3']).map(P);window.KI=KS[0];
 const cv=document.createElement('canvas');cv.width=480;cv.height=260;cv.id='sh';cv.style.cssText='position:fixed;left:0;top:0;width:480px;height:260px;z-index:99;image-rendering:pixelated';document.body.appendChild(cv);window.G2=cv.getContext('2d');G2.imageSmoothingEnabled=false},[fs.readFileSync(path.join(__dirname,'dknight.js'),'utf8')+fs.readFileSync(path.join(__dirname,'girls3.js'),'utf8'),process.argv[3]?process.argv[3].split(','):null,process.argv[5]?process.argv[5].split(','):null,process.argv[6]||null]);
const NK=Math.max(process.argv[3]?process.argv[3].split(',').length:3,process.argv[5]?process.argv[5].split(',').length:1);for(let n=0;n<NK;n++){const f=4;await p.evaluate(n=>{GI=GS[n%GS.length];KI=KS[n%KS.length];window.CUR=n},n);await p.evaluate(f=>{const g=G2,T=f/16*6.283,GY=232;g.drawImage(BGB1,-60,-8,640,260);
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
 {const W_=window.WSET==='spear'?WFX2:window.WSET==='spear3'?[WFX2[2]]:WFX;if(W_&&W_[window.CUR])W_[window.CUR]({e,X,Y,T,flm,kx,ky})}g.imageSmoothingEnabled=false;g.drawImage(E,0,0,480,260);glow(X(30),Y(6.4),16,'rgba(140,210,255,.7)');
 for(let k=0;k<10;k++){const u=(k/10+T/6.283*.6)%1,x=kx+40+((k*37)%90),y=ky+130-u*120;g.globalAlpha=(1-u)*.8;g.fillStyle='#9ad0ff';g.fillRect(Math.round(x),Math.round(y),2,2)}g.globalAlpha=1},f);
 await p.locator('#sh').screenshot({path:path.join(tmp,'g'+n+'.png')})}
await b.close();execSync(`python3 -c "
from PIL import Image,ImageDraw,ImageFont
ims=[Image.open('${tmp}/g%d.png'%n).convert('RGB').crop((0,0,700,520)) for n in range(${NK})]
W,H=ims[0].size;o=Image.new('RGB',(W*len(ims),H+44),(10,8,18));d=ImageDraw.Draw(o)
f=ImageFont.truetype('/usr/share/fonts/opentype/ipafont-gothic/ipag.ttf',26)
for n,(im,t) in enumerate(zip(ims,'${process.argv[4]||'案a 白い聖女,案b 喪の巡礼者,案c 墓所の歌い手'}'.split(','))):o.paste(im,(n*W,0));d.text((n*W+W//2,H+22),t,fill=(240,232,216),font=f,anchor='mm')
o.save('${out}')"`);console.log(er)})();