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
const S={
 // ユウキング：燃える城壁・旗・赤い月・火の粉
 pl(){sky('#12040a','#3a0c14','#1a0608');stars(50,'#ffd0c0',160);moon(290,70,20,'#ffb0a0','rgba(255,90,70,.35)');
  poly([[0,230],[0,170],[20,170],[20,160],[30,160],[30,170],[50,170],[50,160],[60,160],[60,170],[80,170],[80,230]],'#4a1420');
  ctx.fillStyle='#4a1420';ctx.fillRect(220,120,46,180);for(let x=220;x<266;x+=12)ctx.fillRect(x,112,7,8);ctx.fillRect(80,190,260,110);for(let x=80;x<340;x+=16)ctx.fillRect(x,182,9,8);
  ctx.fillStyle='#ffb050';ctx.fillRect(238,150,6,9);ctx.fillRect(130,220,5,7);ctx.fillRect(300,214,5,7);
  ctx.fillStyle='#4a1420';ctx.fillRect(242,72,2,48);const w=Math.sin(T*3)*3;poly([[244,74],[272,78+w],[268,86+w],[244,90]],'#a8182a');
  const fg=ctx.createRadialGradient(190,300,10,190,300,200);fg.addColorStop(0,'rgba(255,110,40,.35)');fg.addColorStop(1,'rgba(255,60,20,0)');ctx.fillStyle=fg;ctx.fillRect(0,100,400,260);
  ground('#140406','#ff7a4a50');rise(30,'#ffb060',2,.15)},
 // 坂井：瓦屋根の街・緑の月・毒の霧
 si(){sky('#030a06','#0c2014','#040a06');stars(60,'#c8ffd0',170);moon(70,70,18,'#d8ffd8','rgba(90,220,110,.3)','#030a06');
  for(let i=0;i<6;i++){const x=i*62-10,h=60+hs(i)*50,y=300-h;poly([[x,y+16],[x+30,y],[x+66,y+16]],'#1c4a2a');ctx.fillStyle='#143420';ctx.fillRect(x+6,y+16,54,h);ctx.fillStyle=hs(i+4)<.5?'#ffd27a':'#58d46a';ctx.fillRect(x+18+hs(i)*20,y+30,4,5)}
  ctx.fillStyle='#10281a';ctx.fillRect(250,90,40,210);poly([[240,94],[270,60],[300,94]],'#10281a');
  ctx.save();ctx.globalAlpha=.35;for(let k=0;k<5;k++){const x=((T*10+k*90)%500)-80;ctx.fillStyle='#58d46a';ctx.beginPath();ctx.ellipse(x,270+k*6,90,10,0,0,6.3);ctx.fill()}ctx.restore();
  ground('#040c06','#58d46a40');fall(14,'#9affa8',1,.05,40)},
 // 坪内丸：竹林・満月・舞う花びら
 sm(){sky('#06061a','#16183a','#08081a');stars(40,'#e8e8ff',150);moon(250,90,34,'#f4f0e0','rgba(200,200,255,.35)');
  for(let i=0;i<14;i++){const x=hs(i+30)*352,w=6+hs(i)*4,d=hs(i+7);ctx.fillStyle=d<.5?'#101430':'#1a2048';ctx.fillRect(Math.round(x),0,w,300);for(let y=20+hs(i)*30;y<300;y+=46){ctx.fillStyle='#0a0c22';ctx.fillRect(Math.round(x)-1,Math.round(y),w+2,2)}
   ctx.fillStyle=d<.5?'#101430':'#1a2048';poly([[x+w,60+i*9],[x+w+22,52+i*9],[x+w+4,66+i*9]],ctx.fillStyle)}
  ground('#0a0a20','#8a9aff50');fall(22,'#ffc8e0',2,.08,-90);fog(240,310,'#8a9aff')},
 // 名無し：古い路地・街灯・宙に浮かぶ文字
 nn(){sky('#0a0614','#1e1430','#0c0814');stars(30,'#e8d8ff',120);
  poly([[0,300],[0,60],[60,50],[60,300]],'#160e24');poly([[300,300],[300,40],[352,50],[352,300]],'#160e24');for(const[x,y]of[[16,90],[30,150],[318,80],[330,170]]){ctx.fillStyle='#ffd27a';ctx.fillRect(x,y,8,10);ctx.fillStyle='#160e24';ctx.fillRect(x+3,y,2,10)}
  ctx.fillStyle='#24183a';ctx.fillRect(110,130,4,170);ctx.fillRect(100,126,24,6);moon(112,140,6,'#ffe2a0','rgba(255,210,120,.45)');
  ctx.save();ctx.translate(190,170);ctx.rotate(T*.15);ctx.strokeStyle='rgba(201,160,255,.35)';ctx.lineWidth=1;ctx.beginPath();ctx.arc(0,0,120,0,6.3);ctx.stroke();ctx.beginPath();ctx.arc(0,0,104,0,6.3);ctx.stroke();for(let k=0;k<12;k++){ctx.rotate(6.283/12);txt('ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃ'[k],0,-110,'rgba(220,190,255,.6)','center',9)}ctx.restore();
  for(let y=300;y<360;y+=8)for(let x=(y/8%2)*10;x<352;x+=20){ctx.fillStyle='#120a1e';ctx.fillRect(x,y,18,6)}ctx.fillStyle='#c9a0ff40';ctx.fillRect(60,299,240,1);rise(16,'#e0c8ff',1,.06)},
 // ネブラ：宇宙・星雲・惑星
 neb(){sky('#02040c','#061428','#02040c');for(const[x,y,r,cl]of[[120,120,160,'rgba(90,184,255,.18)'],[260,200,120,'rgba(180,90,255,.14)'],[60,260,100,'rgba(90,255,220,.1)']]){const g=ctx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,cl);g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(x-r,y-r,r*2,r*2)}
  stars(140,'#bfe8ff',360);ctx.fillStyle='#1a3a6a';ctx.beginPath();ctx.arc(300,80,28,0,6.3);ctx.fill();ctx.fillStyle='#2a5a9a';ctx.beginPath();ctx.arc(294,74,22,0,6.3);ctx.fill();ctx.strokeStyle='rgba(191,232,255,.6)';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(300,80,46,8,-.3,0,6.3);ctx.stroke();
  ctx.save();ctx.translate(190,298);ctx.scale(1,.2);ctx.strokeStyle='rgba(95,246,255,.5)';ctx.lineWidth=2;for(let k=0;k<3;k++){const u=(T*.4+k/3)%1;ctx.globalAlpha=1-u;ctx.beginPath();ctx.arc(0,0,40+u*100,0,6.3);ctx.stroke()}ctx.restore();ctx.globalAlpha=1},
 // セレス：墓地・十字の墓標・白い霊火・霧
 seres(){sky('#04060e','#121a2e','#060810');stars(60,'#e8f0ff',170);moon(270,74,22,'#f0f4ff','rgba(180,210,255,.35)','#060a14');
  ctx.fillStyle='#0e1424';ctx.fillRect(40,130,6,170);ctx.fillRect(20,150,46,6);ctx.fillRect(300,170,5,130);ctx.fillRect(284,186,37,5);
  for(const[x,h]of[[90,40],[130,30],[250,36],[330,28],[10,26]]){ctx.fillStyle='#121a2c';ctx.fillRect(x,300-h,16,h);ctx.beginPath();ctx.arc(x+8,300-h,8,3.14,0);ctx.fill()}
  poly([[150,300],[160,180],[170,160],[180,170],[188,120],[196,170],[206,150],[214,300]],'#0a0e1a');
  for(let k=0;k<6;k++){const x=40+k*55+Math.sin(T+k)*6,y=230-((T*8+k*30)%80);ctx.globalAlpha=.5+.3*Math.sin(T*3+k);const g=ctx.createRadialGradient(x,y,0,x,y,10);g.addColorStop(0,'rgba(255,255,255,.9)');g.addColorStop(1,'rgba(200,220,255,0)');ctx.fillStyle=g;ctx.fillRect(x-10,y-10,20,20)}ctx.globalAlpha=1;
  ground('#06080e','#8ac4ff40');fog(230,320,'#c8d8ff')},
 // ホーリー大輔：夜の街のビル屋上・緑のネオン
 hori(){sky('#04060a','#0e1a1a','#04060a');stars(30,'#d0ffe8',100);
  for(let i=0;i<9;i++){const x=i*42-10,h=90+hs(i+40)*120;ctx.fillStyle=i%2?'#0a1416':'#0e1a1c';ctx.fillRect(x,300-h,40,h);for(let y=300-h+10;y<290;y+=14)for(let q=0;q<3;q++)if(hs(i*31+y+q)>.55){ctx.fillStyle=hs(y+q)>.7?'#7affb0':'#ffe2a0';ctx.fillRect(x+6+q*11,y,5,6)}}
  ctx.globalAlpha=.6+.4*Math.abs(Math.sin(T*2));txt('GYM',300,90,'#7affb0','center',16);ctx.globalAlpha=1;
  ctx.fillStyle='#0a1012';ctx.fillRect(0,296,352,64);ctx.fillStyle='#7affb050';ctx.fillRect(0,296,352,1);for(let x=10;x<352;x+=30){ctx.fillStyle='#0e1618';ctx.fillRect(x,286,2,10)}ctx.fillRect(0,286,352,2)}
};
window.SELDV=window.SELDV||{};
SELDV[4]={bg(c,a,col){(S[c.s]||S.pl)();const g=ctx.createLinearGradient(340,0,400,0);g.addColorStop(0,'rgba(6,6,12,0)');g.addColorStop(1,'rgba(6,6,12,.7)');ctx.fillStyle=g;ctx.fillRect(340,0,300,360)},
 fg(c,a,col){ctx.fillStyle='rgba(232,236,255,.25)';ctx.fillRect(372,170,248,1);for(const x of[372,620]){ctx.fillStyle=col;ctx.fillRect(x-1,169,3,3)}}};
})();
