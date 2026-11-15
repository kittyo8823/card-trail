// 案3「夜の背景」をキャラごとの景色に（配置は今のまま）。SELDV[4]
(function(){
const sky=(t,m,b)=>{const g=ctx.createLinearGradient(0,0,0,360);g.addColorStop(0,t);g.addColorStop(.65,m);g.addColorStop(1,b);ctx.fillStyle=g;ctx.fillRect(0,0,640,360)};
const stars=(n,cl,yMax)=>{for(let k=0;k<n;k++){const x=hs(k)*640,y=hs(k+50)*(yMax||220),tw=.4+.6*Math.abs(Math.sin(T*1.5+k));ctx.globalAlpha=tw*(k%5?.5:1);sq(Math.round(x),Math.round(y),k%7?1:2,cl||'#e8ecff')}ctx.globalAlpha=1};
const moon=(x,y,r,cl,glow,cres)=>{const g=ctx.createRadialGradient(x,y,r*.5,x,y,r*4);g.addColorStop(0,glow);g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(x-r*4,y-r*4,r*8,r*8);ctx.fillStyle=cl;ctx.beginPath();ctx.arc(x,y,r,0,6.3);ctx.fill();if(cres){ctx.fillStyle=cres;ctx.beginPath();ctx.arc(x+r*.4,y-r*.25,r*.92,0,6.3);ctx.fill()}};
const fog=(y0,y1,cl)=>{const g=ctx.createLinearGradient(0,y0,0,y1);g.addColorStop(0,cl+'00');g.addColorStop(1,cl+'40');ctx.fillStyle=g;ctx.fillRect(0,y0,640,y1-y0)};
const poly=(pts,cl)=>{ctx.fillStyle=cl;ctx.beginPath();ctx.moveTo(pts[0][0],pts[0][1]);for(const p of pts.slice(1))ctx.lineTo(p[0],p[1]);ctx.fill()};
const ground=(cl,ln)=>{poly([[0,300],[70,293],[300,295],[352,308],[352,360],[0,360]],cl);if(ln){ctx.fillStyle=ln;ctx.fillRect(70,293,230,1)}};
const rise=(n,cl,sz,sp)=>{for(let k=0;k<n;k++){const t=(T*(sp||.1)+hs(k+11))%1;ctx.globalAlpha=.8*Math.sin(t*3.14);sq(Math.round(20+hs(k+3)*330+Math.sin(T+k)*6),Math.round(310-t*280),sz||2,cl)}ctx.globalAlpha=1};
const fall=(n,cl,sz,sp,dx)=>{for(let k=0;k<n;k++){const t=(T*(sp||.1)+hs(k+21))%1;ctx.globalAlpha=.8*Math.sin(t*3.14);sq(Math.round(hs(k+5)*400+t*(dx||0)+Math.sin(T*2+k)*8),Math.round(t*330),sz||2,cl)}ctx.globalAlpha=1};
const spot=()=>{
  ctx.save();ctx.globalCompositeOperation='lighter';const sg=ctx.createLinearGradient(0,0,0,300);sg.addColorStop(0,'rgba(255,255,240,.20)');sg.addColorStop(1,'rgba(255,255,240,.06)');ctx.fillStyle=sg;ctx.beginPath();ctx.moveTo(150,0);ctx.lineTo(230,0);ctx.lineTo(320,300);ctx.lineTo(60,300);ctx.fill();
  const pg=ctx.createRadialGradient(190,300,0,190,300,130);pg.addColorStop(0,'rgba(255,255,230,.25)');pg.addColorStop(1,'rgba(255,255,230,0)');ctx.save();ctx.translate(190,300);ctx.scale(1,.25);ctx.translate(-190,-300);ctx.fillStyle=pg;ctx.beginPath();ctx.arc(190,300,130,0,6.3);ctx.fill();ctx.restore();
  for(let k=0;k<18;k++){const t=(T*.06+hs(k))%1;ctx.globalAlpha=.6*Math.sin(t*3.14);sq(Math.round(120+hs(k+3)*140+t*20),Math.round(20+t*270),1,'#fffbe0')}ctx.restore();ctx.globalAlpha=1;
};
const S={
 // ユウキング：城（塔・とんがり屋根・城門・旗・松明）と赤い月
 pl(){sky('#12040a','#3a0c14','#1a0608');stars(50,'#ffd0c0',140);moon(300,56,16,'#ffb0a0','rgba(255,90,70,.35)');
  const C='#4a1420',C2='#5a1a28',bat=(x,w,y)=>{for(let q=x;q<x+w;q+=10)ctx.fillRect(q,y-6,6,6)},tow=(x,w,y,rf)=>{ctx.fillStyle=C;ctx.fillRect(x,y,w,300-y);if(rf){poly([[x-4,y],[x+w/2,y-w*1.3],[x+w+4,y]],C2);ctx.fillStyle=C;ctx.fillRect(x+w/2-1,y-w*1.3-12,2,12);const f=Math.sin(T*3+x)*2;poly([[x+w/2+1,y-w*1.3-12],[x+w/2+14,y-w*1.3-9+f],[x+w/2+1,y-w*1.3-5]],'#e8303c')}else{ctx.fillStyle=C;bat(x,w,y)}ctx.fillStyle='#ffb050';ctx.fillRect(x+w/2-2,y+20,4,7)};
  tow(10,34,150,1);tow(90,30,110,1);tow(150,44,70,1);tow(240,30,120,1);tow(300,36,160,1);
  ctx.fillStyle=C;ctx.fillRect(0,200,352,100);bat(0,352,200);
  ctx.fillStyle='#200810';ctx.beginPath();ctx.moveTo(150,300);ctx.lineTo(150,250);ctx.arc(172,250,22,3.14,0);ctx.lineTo(194,300);ctx.fill();
  for(const x of[40,120,230,320]){ctx.fillStyle='#a8182a';ctx.fillRect(x,212,14,30);poly([[x,242],[x+7,236],[x+14,242],[x+14,248],[x+7,244],[x,248]],'#a8182a');ctx.fillStyle='#ffd23f';ctx.fillRect(x+5,220,4,4)}
  for(const x of[134,210]){const fl=Math.sin(T*9+x)*1.5;ctx.fillStyle='#ffb050';ctx.fillRect(x,256+fl,4,6);const g=ctx.createRadialGradient(x+2,258,0,x+2,258,20);g.addColorStop(0,'rgba(255,150,60,.5)');g.addColorStop(1,'rgba(255,90,30,0)');ctx.fillStyle=g;ctx.fillRect(x-18,238,40,40)}
  ground('#140406','#ff7a4a50');rise(24,'#ffb060',2,.15)},
 // 坂井：夜のジャングル（大きな葉・つる・蛍・霧・光る目）
 si(){sky('#020804','#08180c','#020604');stars(20,'#c8ffd0',60);
  const leaf=(x,y,l,a,cl)=>{ctx.save();ctx.translate(x,y);ctx.rotate(a);ctx.fillStyle=cl;ctx.beginPath();ctx.moveTo(0,0);ctx.quadraticCurveTo(l*.5,-l*.28,l,0);ctx.quadraticCurveTo(l*.5,l*.28,0,0);ctx.fill();ctx.fillStyle='rgba(0,0,0,.25)';ctx.fillRect(0,-.5,l*.9,1);ctx.restore()};
  for(let i=0;i<5;i++){ctx.fillStyle='#0a1a0e';ctx.fillRect(20+i*72+hs(i)*20,0,8+hs(i+3)*6,300)}
  for(let i=0;i<26;i++)leaf(hs(i)*360,hs(i+40)*260,30+hs(i+9)*40,hs(i+2)*6.28,i%3?'#0e2a16':'#14361e');
  ctx.strokeStyle='#0c2412';ctx.lineWidth=2;for(let i=0;i<6;i++){const x=30+i*60;ctx.beginPath();ctx.moveTo(x,0);ctx.quadraticCurveTo(x+20+Math.sin(T+i)*4,80,x-6,140+hs(i)*40);ctx.stroke()}
  for(let i=0;i<10;i++)leaf(i<5?-10:362,120+i%5*40,60+hs(i)*30,i<5?-.2+hs(i)*.6:3.34-hs(i)*.6,'#123a1c');
  for(const[x,y]of[[60,200],[290,160]]){if(Math.sin(T*.7+x)>-.6){ctx.fillStyle='#e8ff58';ctx.fillRect(x,y,3,2);ctx.fillRect(x+7,y,3,2)}}
  for(let k=0;k<16;k++){const x=(hs(k)*340+Math.sin(T*.6+k)*20),y=(hs(k+7)*220+60+Math.cos(T*.5+k)*14);ctx.globalAlpha=.5+.5*Math.sin(T*3+k*2);const g=ctx.createRadialGradient(x,y,0,x,y,6);g.addColorStop(0,'rgba(200,255,120,.9)');g.addColorStop(1,'rgba(150,255,90,0)');ctx.fillStyle=g;ctx.fillRect(x-6,y-6,12,12)}ctx.globalAlpha=1;
  fog(220,320,'#58d46a');ground('#030a05','#58d46a40')},
 // 坪内丸：竹林・満月・舞う花びら
 sm(){sky('#06061a','#16183a','#08081a');stars(40,'#e8e8ff',150);moon(250,90,34,'#f4f0e0','rgba(200,200,255,.35)');
  for(let i=0;i<14;i++){const x=hs(i+30)*352,w=6+hs(i)*4,d=hs(i+7);ctx.fillStyle=d<.5?'#101430':'#1a2048';ctx.fillRect(Math.round(x),0,w,300);for(let y=20+hs(i)*30;y<300;y+=46){ctx.fillStyle='#0a0c22';ctx.fillRect(Math.round(x)-1,Math.round(y),w+2,2)}
   ctx.fillStyle=d<.5?'#101430':'#1a2048';poly([[x+w,60+i*9],[x+w+22,52+i*9],[x+w+4,66+i*9]],ctx.fillStyle)}
  ground('#0a0a20','#8a9aff50');fall(22,'#ffc8e0',2,.08,-90);fog(240,310,'#8a9aff')},
 // 名無し：古い書庫（天井まで本棚・ろうそく・宙を舞う頁）
 nn(){sky('#0a0614','#1a1028','#0a0612');
  for(const x0 of[0,262]){ctx.fillStyle='#1e1428';ctx.fillRect(x0,20,90,280);for(let y=34;y<290;y+=30){ctx.fillStyle='#120a1a';ctx.fillRect(x0+4,y+22,82,4);for(let q=0;q<11;q++){const w=5+hs(y+q+x0)*3,h=14+hs(q*7+y)*8;ctx.fillStyle=['#5a2a3a','#2a3a5a','#4a3a1a','#3a1a4a','#2a4a3a'][(q+y)%5];ctx.fillRect(x0+6+q*7.5,y+22-h,w,h)}}}
  ctx.fillStyle='#160e20';ctx.fillRect(90,20,172,6);ctx.beginPath();ctx.moveTo(100,26);ctx.quadraticCurveTo(176,-10,252,26);ctx.fill();
  for(const[x,y]of[[100,120],[252,140],[120,240]]){const fl=Math.sin(T*7+x)*1;ctx.fillStyle='#e8dcc0';ctx.fillRect(x,y,4,10);ctx.fillStyle='#ffd27a';ctx.fillRect(x+1,y-4+fl,2,4);const g=ctx.createRadialGradient(x+2,y-2,0,x+2,y-2,26);g.addColorStop(0,'rgba(255,200,110,.35)');g.addColorStop(1,'rgba(255,160,80,0)');ctx.fillStyle=g;ctx.fillRect(x-24,y-28,52,52)}
  for(let k=0;k<9;k++){const t=(T*.05+hs(k))%1,x=60+hs(k+2)*240+Math.sin(T+k)*10,y=280-t*260;ctx.save();ctx.translate(x,y);ctx.rotate(Math.sin(T*1.5+k)*.6);ctx.globalAlpha=.7*Math.sin(t*3.14);ctx.fillStyle='#e8dcc0';ctx.fillRect(-6,-4,12,8);ctx.fillStyle='#b8a888';ctx.fillRect(-4,-2,8,1);ctx.fillRect(-4,1,6,1);ctx.restore()}ctx.globalAlpha=1;
  for(let y=300;y<360;y+=8)for(let x=(y/8%2)*10;x<352;x+=20){ctx.fillStyle='#120a1e';ctx.fillRect(x,y,18,6)}ctx.fillStyle='#c9a0ff40';ctx.fillRect(0,299,352,1)},
 // ネブラ：宇宙の海（星空と星雲が映る水面・光る波・遠くの惑星）
 neb(){sky('#02040c','#061428','#02040c');for(const[x,y,r,cl]of[[120,90,150,'rgba(90,184,255,.2)'],[280,140,110,'rgba(180,90,255,.16)']]){const g=ctx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,cl);g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(x-r,y-r,r*2,r*2)}
  stars(110,'#bfe8ff',200);ctx.fillStyle='#1a3a6a';ctx.beginPath();ctx.arc(290,70,24,0,6.3);ctx.fill();ctx.fillStyle='#2a5a9a';ctx.beginPath();ctx.arc(285,65,19,0,6.3);ctx.fill();ctx.strokeStyle='rgba(191,232,255,.6)';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(290,70,40,7,-.3,0,6.3);ctx.stroke();
  // 水平線と海
  const sea=ctx.createLinearGradient(0,210,0,360);sea.addColorStop(0,'#0a2a4a');sea.addColorStop(1,'#020814');ctx.fillStyle=sea;ctx.fillRect(0,210,640,150);ctx.fillStyle='rgba(191,232,255,.5)';ctx.fillRect(0,210,640,1);
  for(let k=0;k<60;k++){const x=hs(k+300)*640,y=214+hs(k+400)**1.6*140,w=4+hs(k)*18;ctx.globalAlpha=.25+.35*Math.abs(Math.sin(T*1.2+k));ctx.fillStyle=k%4?'#5ab8ff':'#d8f4ff';ctx.fillRect(Math.round(x+Math.sin(T+k)*6),Math.round(y),Math.round(w),1)}ctx.globalAlpha=1;
  // 映る惑星
  ctx.globalAlpha=.3;ctx.fillStyle='#2a5a9a';ctx.fillRect(272,236,36,3);ctx.fillRect(276,242,28,2);ctx.globalAlpha=1;
  ctx.save();ctx.translate(190,298);ctx.scale(1,.2);ctx.strokeStyle='rgba(95,246,255,.6)';ctx.lineWidth=2;for(let k=0;k<3;k++){const u=(T*.4+k/3)%1;ctx.globalAlpha=1-u;ctx.beginPath();ctx.arc(0,0,40+u*120,0,6.3);ctx.stroke()}ctx.restore();ctx.globalAlpha=1;
  for(let k=0;k<5;k++){const t=(T*.04+hs(k+60))%1,x=30+hs(k+61)*300,y=300-t*220;ctx.globalAlpha=.5*Math.sin(t*3.14);ctx.fillStyle='#9af6ff';ctx.beginPath();ctx.arc(x,y,4,3.14,0);ctx.fill();ctx.fillRect(x-3,y,1,5);ctx.fillRect(x,y,1,6);ctx.fillRect(x+2,y,1,5)}ctx.globalAlpha=1},
 // セレス：聖堂（ステンドグラスの窓・柱・アーチ・ろうそく・白い霊火）
 seres(){sky('#06080e','#10162a','#06080c');
  // 奥の大きな窓
  const wx=190,wy=40,ww=110,wh=200;ctx.save();ctx.beginPath();ctx.moveTo(wx-ww/2,wy+wh);ctx.lineTo(wx-ww/2,wy+50);ctx.quadraticCurveTo(wx-ww/2,wy,wx,wy-16);ctx.quadraticCurveTo(wx+ww/2,wy,wx+ww/2,wy+50);ctx.lineTo(wx+ww/2,wy+wh);ctx.closePath();ctx.clip();
  const cols=['#4a7ac8','#8ac4ff','#c8a050','#6a4ab8','#d8ecff','#3a5a9a'];for(let y=wy-20;y<wy+wh;y+=14)for(let x=wx-ww/2;x<wx+ww/2;x+=14){ctx.fillStyle=cols[Math.floor(hs(x*3+y)*6)];ctx.globalAlpha=.55;ctx.fillRect(x,y,13,13)}ctx.globalAlpha=1;
  ctx.strokeStyle='#0a0e1a';ctx.lineWidth=3;ctx.beginPath();ctx.arc(wx,wy+40,26,0,6.3);ctx.stroke();ctx.beginPath();ctx.moveTo(wx,wy-20);ctx.lineTo(wx,wy+wh);ctx.moveTo(wx-ww,wy+100);ctx.lineTo(wx+ww,wy+100);ctx.stroke();ctx.restore();
  // 窓からの光
  ctx.save();ctx.globalCompositeOperation='lighter';const lg=ctx.createLinearGradient(0,60,0,300);lg.addColorStop(0,'rgba(140,190,255,.18)');lg.addColorStop(1,'rgba(140,190,255,0)');ctx.fillStyle=lg;ctx.beginPath();ctx.moveTo(140,60);ctx.lineTo(240,60);ctx.lineTo(300,300);ctx.lineTo(80,300);ctx.fill();ctx.restore();
  // 柱とアーチ
  for(const x of[20,80,282,334]){ctx.fillStyle='#161c30';ctx.fillRect(x-10,20,20,280);ctx.fillStyle='#1e2640';ctx.fillRect(x-10,20,6,280);ctx.fillStyle='#10152a';ctx.fillRect(x-14,290,28,10)}
  ctx.strokeStyle='#161c30';ctx.lineWidth=8;ctx.beginPath();ctx.arc(50,60,30,3.14,0);ctx.stroke();ctx.beginPath();ctx.arc(308,60,26,3.14,0);ctx.stroke();
  // ろうそく
  for(const x of[44,60,110,270,296,316]){const h=8+hs(x)*10,fl=Math.sin(T*8+x);ctx.fillStyle='#e8e4d8';ctx.fillRect(x,296-h,3,h);ctx.fillStyle='#ffe2a0';ctx.fillRect(x,292-h+fl*.6,3,4);const g=ctx.createRadialGradient(x+1,292-h,0,x+1,292-h,14);g.addColorStop(0,'rgba(255,220,150,.4)');g.addColorStop(1,'rgba(255,200,120,0)');ctx.fillStyle=g;ctx.fillRect(x-13,278-h,28,28)}
  for(let k=0;k<5;k++){const x=40+k*65+Math.sin(T+k)*6,y=220-((T*8+k*30)%90);ctx.globalAlpha=.4+.3*Math.sin(T*3+k);const g=ctx.createRadialGradient(x,y,0,x,y,8);g.addColorStop(0,'rgba(255,255,255,.9)');g.addColorStop(1,'rgba(200,220,255,0)');ctx.fillStyle=g;ctx.fillRect(x-8,y-8,16,16)}ctx.globalAlpha=1;
  // 床（石）
  ctx.fillStyle='#0a0e18';ctx.fillRect(0,298,640,62);ctx.fillStyle='#0e1322';for(let y=300;y<360;y+=10)for(let x=(y/10%2)*16;x<640;x+=32)ctx.fillRect(x,y,30,8);ctx.fillStyle='#8ac4ff40';ctx.fillRect(0,298,352,1)},
 // ホーリー大輔：夜のジム（ダンベル棚・ベンチ・鏡・ネオン）＋スポットライト
 hori(){sky('#06080a','#0c1214','#050708');
  // 奥の壁（タイル）
  ctx.fillStyle='#0e1517';ctx.fillRect(0,40,640,260);ctx.fillStyle='#121b1e';for(let y=40;y<300;y+=16)for(let x=(y/16%2)*12;x<640;x+=24)ctx.fillRect(x,y,22,14);
  // 鏡
  for(const x of[14,250]){ctx.fillStyle='#1a2a2e';ctx.fillRect(x,90,88,150);ctx.fillStyle='rgba(180,255,220,.08)';ctx.fillRect(x+4,94,80,142);ctx.fillStyle='rgba(255,255,255,.12)';ctx.beginPath();ctx.moveTo(x+10,94);ctx.lineTo(x+30,94);ctx.lineTo(x+10,140);ctx.fill()}
  // ダンベル棚（左）
  ctx.fillStyle='#1c2628';ctx.fillRect(18,250,80,6);ctx.fillRect(18,272,80,6);ctx.fillRect(20,250,4,48);ctx.fillRect(92,250,4,48);
  for(let i=0;i<4;i++){const x=28+i*18;for(const y of[244,266]){ctx.fillStyle='#2e3a3c';ctx.fillRect(x,y,4,8);ctx.fillRect(x+10,y,4,8);ctx.fillStyle='#3e4a4c';ctx.fillRect(x+4,y+3,6,2)}}
  // プレートとバーベル台（右）
  ctx.fillStyle='#1c2628';ctx.fillRect(262,180,4,118);ctx.fillRect(320,180,4,118);ctx.fillRect(250,196,86,4);ctx.fillStyle='#4a5658';ctx.fillRect(240,190,108,3);for(const x of[240,342]){ctx.fillStyle='#26302f';ctx.fillRect(x-4,178,8,28)}
  for(let i=0;i<3;i++){ctx.fillStyle='#202a2c';ctx.beginPath();ctx.arc(300+i*12,286,12-i*2,0,6.3);ctx.fill()}
  // 床（ゴムのマット）
  ctx.fillStyle='#0a0e10';ctx.fillRect(0,298,640,62);ctx.fillStyle='#10171a';for(let x=0;x<640;x+=44)ctx.fillRect(x,298,42,62);ctx.fillStyle='#7affb030';ctx.fillRect(0,298,352,1);
  // 周りを暗く
  const vg=ctx.createRadialGradient(190,200,80,190,200,320);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,0,.6)');ctx.fillStyle=vg;ctx.fillRect(0,0,640,360)}
};
window.SELDV=window.SELDV||{};
SELDV[4]={bg(c,a,col){(S[c.s]||S.pl)();spot();const g=ctx.createLinearGradient(340,0,400,0);g.addColorStop(0,'rgba(6,6,12,0)');g.addColorStop(1,'rgba(6,6,12,.7)');ctx.fillStyle=g;ctx.fillRect(340,0,300,360)},
 fg(c,a,col){ctx.fillStyle='rgba(232,236,255,.25)';ctx.fillRect(372,170,248,1);for(const x of[372,620]){ctx.fillStyle=col;ctx.fillRect(x-1,169,3,3)}}};
})();
