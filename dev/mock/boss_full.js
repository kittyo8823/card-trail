// Ver3.75 ボスの背景を丸ごと描く版（ユーザー指定：半透明の描き足しはやめ、はっきりした形で。層の雰囲気は色で残す）
// BFULL[ボス](x) が 640x360 を最初から描く。光の筋は半透明でなく、2pxの市松（ディザ）で描く
const BF={F:v=>Math.floor(v/2)*2};
BF.R=(x,px,py,w,h,c)=>{x.fillStyle=c;x.fillRect(BF.F(px),BF.F(py),Math.max(2,BF.F(w+1)),Math.max(2,BF.F(h+1)))};
BF.sky=(x,c0,c1,c2)=>{for(let y=0;y<360;y+=2){const t=y/360,c=t<.5?BF.mix(c0,c1,t*2):BF.mix(c1,c2,(t-.5)*2);x.fillStyle=c;x.fillRect(0,y,640,2)}};
BF.mix=(a,b,t)=>{const p=s=>[1,3,5].map(i=>parseInt(s.slice(i,i+2),16)),A=p(a),B=p(b);return'#'+A.map((v,i)=>Math.round(v+(B[i]-v)*t).toString(16).padStart(2,'0')).join('')};
// 市松の光の筋（台形：上 x0..x1 → 下 x2..x3、y0..y1）
BF.shaft=(x,x0,x1,x2,x3,y0,y1,c,c2)=>{for(let y=BF.F(y0);y<y1;y+=2){const t=(y-y0)/(y1-y0),a=x0+(x2-x0)*t,b=x1+(x3-x1)*t;for(let px=BF.F(a);px<b;px+=2){const k=((px>>1)+(y>>1))&1,e=Math.min(px-a,b-px);if(k&&(e>6||((px>>1)&1)))x.fillStyle=c,x.fillRect(px,y,2,2);else if(c2&&e>10&&!k&&(y>>1)%3===0)x.fillStyle=c2,x.fillRect(px,y,2,2)}}};
// 石柱（3段の陰影）
BF.col=(x,cx,top,bot,w,c,broken)=>{const[L,M,D]=c;BF.R(x,cx-w/2,top,w,bot-top,M);BF.R(x,cx-w/2,top,w*.3,bot-top,L);BF.R(x,cx+w/2-w*.25,top,w*.25,bot-top,D);for(let y=top+14;y<bot;y+=20)BF.R(x,cx-w/2,y,w,2,D);BF.R(x,cx-w/2-6,bot-8,w+12,8,M);BF.R(x,cx-w/2-6,bot-8,w+12,2,L);if(broken){for(let k=0;k<w;k+=4)BF.R(x,cx-w/2+k,top-((k*7)%11),4,(k*7)%11+2,M)}else{BF.R(x,cx-w/2-6,top-8,w+12,8,M);BF.R(x,cx-w/2-6,top-8,w+12,2,L)}};
const BFULL={};
// ===== ゴーレムキング：月夜の森の奥、崩れた王の広間（はっきりした石組み・大きな玉座・崩れた巨像）
BFULL.king=(x)=>{const R=(...a)=>BF.R(x,...a),rn=bgRng(301),ST=['#6a7484','#4c5462','#323844'],MS=['#3e6a46','#2c5236'];
 BF.sky(x,'#06101a','#0e2230','#0a1418');
 // 月と遠い木々
 R(470,40,40,40,'#d8e0d0');R(474,44,32,32,'#e8eee0');R(476,46,10,8,'#c8d0c0');
 for(let i=0;i<40;i++){const tx=rn()*640,th=60+rn()*80;R(tx,200-th,6,th,'#081418');R(tx-10,200-th,26,20,'#0a1a1e')}
 // 奥の壁（崩れた上端・窓のアーチ）
 for(let px=40;px<600;px+=4){const h=150+Math.sin(px*.03)*18+((px*13)%30<6?-30:0);R(px,200-h,4,h,ST[2])}
 for(const ax of[150,320,490]){R(ax-28,80,56,90,'#0a1a20');R(ax-24,72,48,8,'#0a1a20');R(ax-20,66,40,6,'#0a1a20');for(let k=0;k<3;k++)R(ax-24+k*18,120+k*10,6,6,'#2a4a5a')}
 for(let px=40;px<600;px+=24)for(let y=60;y<200;y+=12)R(px+((y/12)%2?12:0),y,2,10,'#262c36');
 // 大きな玉座（中央奥）
 const cx=320;R(cx-60,110,120,96,ST[1]);R(cx-60,110,120,6,ST[0]);R(cx-48,40,96,74,ST[2]);R(cx-48,40,96,6,ST[0]);R(cx-44,46,16,64,ST[1]);R(cx+28,46,16,64,ST[1]);R(cx-76,120,24,86,ST[0]);R(cx+52,120,24,86,ST[0]);R(cx-76,120,24,4,'#8a94a4');R(cx+52,120,24,4,'#8a94a4');
 R(cx-10,24,20,18,ST[0]);R(cx-16,30,6,10,ST[1]);R(cx+10,30,6,10,ST[1]);R(cx-30,58,60,6,'#8a7a4a');R(cx-6,52,12,14,'#a8945a');
 for(let k=0;k<5;k++)R(cx-80+k*36,206,40,8,k%2?ST[1]:ST[0]);
 // 柱（左右）
 BF.col(x,40,70,212,26,ST,1);BF.col(x,120,100,212,22,ST,0);BF.col(x,540,60,212,28,ST,0);BF.col(x,612,110,212,22,ST,1);
 // 苔とつた
 for(let i=0;i<40;i++){const px=rn()*640,py=40+rn()*170;R(px,py,6,4,MS[i%2])}for(const vx of[60,128,548,604]){for(let y=70;y<200;y+=6)R(vx+Math.round(Math.sin(y*.2)*3),y,2,6,MS[1])}
 // 床（石畳）
 for(let y=212;y<360;y+=2){x.fillStyle=BF.mix('#2a3038','#141a20',(y-212)/148);x.fillRect(0,y,640,2)}
 for(let y=218;y<360;y+=16)for(let px=((y/16)%2)*20;px<640;px+=40)R(px,y,38,2,'#1a2028');
 for(let i=0;i<30;i++)R(rn()*640,216+rn()*130,4,2,MS[i%2]);
 // 崩れた巨像の頭（左手前）
 const hx=170,hy=196;R(hx,hy,60,30,ST[1]);R(hx,hy,60,6,ST[0]);R(hx+48,hy,12,30,ST[2]);R(hx+10,hy+10,10,6,'#141820');R(hx+34,hy+10,10,6,'#141820');R(hx+18,hy+22,24,4,'#141820');R(hx-6,hy-8,20,10,ST[1]);R(hx+40,hy-12,16,12,ST[1]);
 for(let i=0;i<14;i++)R(rn()*640,210+rn()*20,6+rn()*10,4+rn()*4,ST[rn()<.5?1:2])};
// ===== 泉の乙女像：崩れた遺跡の中の噴水。壊れた天井から光が流れ込む（森の夜の色）
BFULL.maiden=(x)=>{const R=(...a)=>BF.R(x,...a),rn=bgRng(311),ST=['#5e6e74','#44525a','#2c383e'],MS=['#3a6a4a','#2a5038'];
 BF.sky(x,'#081418','#0e2228','#0a181c');
 // 奥の壁と、穴の空いた天井
 R(0,0,640,40,ST[2]);for(let px=0;px<640;px+=2){const h=40+Math.abs(Math.sin(px*.04))*16;R(px,0,2,h,ST[2])}
 for(const[hx,hw]of[[150,70],[330,90],[520,60]]){R(hx-hw/2,0,hw,46,'#1c3a48');R(hx-hw/2+6,0,hw-12,30,'#2a5868');R(hx-hw/2+14,0,hw-28,16,'#4a8898')}
 R(0,46,640,166,'#1a2a30');for(let px=0;px<640;px+=32)for(let y=50;y<212;y+=14)R(px+((y/14)%2?16:0),y,2,12,'#14222a');
 // 光の筋（市松）
 BF.shaft(x,120,180,170,280,40,212,'#bfe8e8','#e8fff8');BF.shaft(x,290,370,300,440,40,212,'#c8eef0','#f0fff8');BF.shaft(x,495,545,470,560,40,212,'#bfe8e8','#e8fff8');
 // 柱
 BF.col(x,40,60,212,30,ST,1);BF.col(x,250,90,212,22,ST,0);BF.col(x,420,80,212,24,ST,1);BF.col(x,610,60,212,30,ST,0);
 for(const vx of[50,256,606])for(let y=70;y<206;y+=6)R(vx+Math.round(Math.sin(y*.25)*4),y,2,6,MS[1]);
 // 噴水（三段の水盤、落ちる水）
 const fx=330;R(fx-90,176,180,30,ST[1]);R(fx-90,176,180,6,ST[0]);R(fx-90,200,180,6,ST[2]);R(fx-50,140,100,10,ST[1]);R(fx-50,140,100,4,ST[0]);R(fx-10,110,20,66,ST[1]);R(fx-26,104,52,8,ST[0]);
 for(let k=-1;k<=1;k+=2){for(let y=112;y<176;y+=2){const t=(y-112)/64;R(fx+k*(14+t*44),y,4,2,y%4?'#a8e0ec':'#e0f8ff')}for(let y=148;y<190;y+=2){const t=(y-148)/42;R(fx+k*(52+t*30),y,4,2,y%4?'#a8e0ec':'#e0f8ff')}}
 R(fx-84,180,168,6,'#6ab8c8');R(fx-84,180,168,2,'#c8f0f8');
 // 床（水たまりと割れた石畳）
 for(let y=212;y<360;y+=2){x.fillStyle=BF.mix('#24343a','#101c20',(y-212)/148);x.fillRect(0,y,640,2)}
 for(let y=218;y<360;y+=14)for(let px=((y/14)%2)*18;px<640;px+=36)R(px,y,34,2,'#18262c');
 R(160,226,340,34,'#2a5a68');R(176,232,308,20,'#3a7a88');for(let i=0;i<20;i++)R(180+rn()*300,234+rn()*16,10+rn()*20,2,'#8ad0dc');
 for(let i=0;i<8;i++){const px=190+rn()*280,py=236+rn()*16;R(px-6,py,12,4,MS[0]);if(i%3===0)R(px-2,py-2,4,2,'#e8c8d8')}
 for(let i=0;i<16;i++)R(rn()*640,212+rn()*14,6+rn()*10,4,ST[1+(i%2)])};
// ===== 時の機神クロノス：機神の時計塔の内部（巨大な文字盤・噛み合う歯車・振り子。3層の青と光る線は残す）
BFULL.chronos=(x)=>{const R=(...a)=>BF.R(x,...a),rn=bgRng(321),BR=['#c8a85a','#9a7c3c','#5e4a24'],CY='#4ae0f0';
 BF.sky(x,'#040812','#0a1428','#060a16');
 const gear=(cx,cy,r,n,c,ang)=>{const[L,M,D]=c;x.fillStyle=D;x.beginPath();for(let k=0;k<n*2;k++){const t=k/(n*2)*6.283+ang,rr=k%2?r:r*1.16;x.lineTo(BF.F(cx+Math.cos(t)*rr),BF.F(cy+Math.sin(t)*rr))}x.fill();x.fillStyle=M;x.beginPath();x.arc(cx,cy,r*.92,0,6.3);x.fill();x.fillStyle=D;x.beginPath();x.arc(cx,cy,r*.7,0,6.3);x.fill();x.fillStyle=M;for(let k=0;k<6;k++){const t=k/6*6.283+ang;x.save();x.translate(cx,cy);x.rotate(t);x.fillRect(0,-3,r*.7,6);x.restore()}x.fillStyle=L;x.beginPath();x.arc(cx,cy,r*.18,0,6.3);x.fill();x.fillStyle=L;x.fillRect(BF.F(cx-r*.9),BF.F(cy-r*.9)+2,2,2)};
 // 奥の塔の壁（縦の柱と光る線）
 for(let px=0;px<640;px+=80){R(px,0,20,212,'#0e1a30');R(px+18,0,2,212,CY)}
 gear(80,70,70,14,['#7a6a40','#5a4c2c','#3a3020'],.2);gear(190,150,46,10,['#7a6a40','#5a4c2c','#3a3020'],.5);gear(560,60,80,16,['#7a6a40','#5a4c2c','#3a3020'],.1);gear(470,170,40,9,['#7a6a40','#5a4c2c','#3a3020'],.3);gear(620,190,50,10,['#7a6a40','#5a4c2c','#3a3020'],0);
 // 巨大な文字盤
 const cx=320,cy=100,r=92;x.fillStyle='#14203a';x.beginPath();x.arc(cx,cy,r+10,0,6.3);x.fill();x.fillStyle=BR[1];x.beginPath();x.arc(cx,cy,r+6,0,6.3);x.fill();x.fillStyle='#1a2a48';x.beginPath();x.arc(cx,cy,r,0,6.3);x.fill();x.fillStyle='#22365a';x.beginPath();x.arc(cx,cy,r*.72,0,6.3);x.fill();x.fillStyle='#1a2a48';x.beginPath();x.arc(cx,cy,r*.66,0,6.3);x.fill();
 const RN=['XII','I','II','III','IV','V','VI','VII','VIII','IX','X','XI'];for(let k=0;k<12;k++){const t=k/12*6.283-1.571;x.fillStyle=BR[0];x.font='bold 12px serif';x.textAlign='center';x.fillText(RN[k],cx+Math.cos(t)*r*.84,cy+Math.sin(t)*r*.84+4)}
 for(let k=0;k<60;k++){const t=k/60*6.283;R(cx+Math.cos(t)*(r-4)-1,cy+Math.sin(t)*(r-4)-1,2,2,k%5?'#3a5070':CY)}
 x.strokeStyle=BR[0];x.lineWidth=6;x.beginPath();x.moveTo(cx,cy);x.lineTo(cx+Math.cos(-2.2)*r*.5,cy+Math.sin(-2.2)*r*.5);x.stroke();x.lineWidth=4;x.beginPath();x.moveTo(cx,cy);x.lineTo(cx+Math.cos(-.6)*r*.78,cy+Math.sin(-.6)*r*.78);x.stroke();x.fillStyle=BR[0];x.beginPath();x.arc(cx,cy,8,0,6.3);x.fill();x.fillStyle=CY;x.fillRect(cx-2,cy-2,4,4);
 // 振り子（文字盤の下）
 R(cx-2,cy+r+6,4,70,BR[1]);x.fillStyle=BR[1];x.beginPath();x.arc(cx,cy+r+80,14,0,6.3);x.fill();x.fillStyle=BR[0];x.beginPath();x.arc(cx-3,cy+r+77,6,0,6.3);x.fill();
 // 床（3層の光る格子）
 for(let y=212;y<360;y+=2){x.fillStyle=BF.mix('#0a1428','#04060e',(y-212)/148);x.fillRect(0,y,640,2)}
 R(0,212,640,2,CY);for(let i=-14;i<=14;i++){const x0=320+i*26,x1=320+i*120;for(let yy=214;yy<360;yy+=2)x.fillStyle='#163a50',x.fillRect(BF.F(x0+(x1-x0)*(yy-212)/148),yy,2,2)}for(let y=220,dy=4;y<360;dy*=1.3,y+=dy)R(0,y,640,2,'#163a50');
 // 床の歯車の溝・時の輪
 for(const[px,py,rr]of[[120,250,30],[520,270,40]]){x.strokeStyle=BR[2];x.lineWidth=4;x.beginPath();x.ellipse(px,py,rr*1.6,rr*.4,0,0,6.3);x.stroke()}
 for(let i=0;i<20;i++)R(rn()*640,rn()*200,2,2,rn()<.5?CY:BR[0])};

