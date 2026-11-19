// ===== Ver4.67 楽師はVer4.65の舞台に奥行きを足し、大顎はVer4.65の背景に密林らしさだけ足す =====
BFULL.jdrum=(x)=>{const R=(px,py,w,h,cl)=>{x.fillStyle=cl;x.fillRect(BF.F(px),BF.F(py),Math.max(2,BF.F(w)),Math.max(2,BF.F(h)))},rn=bgRng(907),ST=['#6a5e4e','#544a3c','#3e362c','#2a241e'],RD=['#8a2a24','#6a1e1a'],OC=['#b88a40','#8a6428'],TE=['#2e7a6a','#1e5a4e'],WD=['#5a3a26','#3e2618'];
 BF.sky(x,'#0a0a0c','#1a1210','#2a1a12');
 // 奥の密林の影と、焚き火に照らされる下の方
 for(const[n,y0,r0,c]of[[24,70,22,'#1e2a24'],[20,58,30,'#17211b'],[16,44,40,'#111814']]){for(let k=0;k<n;k++){const cx=rn()*680-20,r=r0*(.7+rn()*.6);x.fillStyle=c;x.beginPath();x.arc(BF.F(cx),BF.F(y0+rn()*24),r,0,6.3);x.fill()}for(let y=y0-20;y<y0+50;y+=2){x.fillStyle='rgba(130,110,90,.03)';x.fillRect(0,y,640,2)}}
 BF.gl(x,320,180,320,150,'rgba(255,120,40,.22)');
 // 段の観客席（奥へ向かって弧を描く石の段）
 for(let i=0;i<6;i++){const y=118+i*14,w=640-i*0;x.fillStyle=i%2?ST[2]:ST[1];x.beginPath();x.ellipse(320,y+60,380-i*20,70-i*4,0,Math.PI,0);x.lineTo(700,y+60);x.lineTo(-60,y+60);x.fill();x.strokeStyle=ST[0];x.lineWidth=2;x.beginPath();x.ellipse(320,y+60,380-i*20,70-i*4,0,Math.PI,0);x.stroke()}
 for(let k=0;k<40;k++){const a=Math.PI+rn()*Math.PI,i=Math.floor(rn()*6);R(320+Math.cos(a)*(380-i*20),118+i*14+60+Math.sin(a)*(70-i*4),4+rn()*8,2+rn()*3,'#3e5a32')}
 // 奥の二本の彫り柱と巨大な太鼓の皮
 for(const px of[226,414]){R(px-14,18,28,170,WD[0]);R(px-14,18,4,170,'#6a4632');for(let y=30;y<180;y+=26){R(px-12,y,24,14,WD[1]);R(px-8,y+4,4,4,'#d8a040');R(px+4,y+4,4,4,'#d8a040');R(px-6,y+10,12,2,RD[1])}for(let j=0;j<5;j++)R(px-16+j*8,10-(j%2)*6,4,12,j%2?TE[0]:RD[0])}
 for(let y=100;y<200;y+=2){x.fillStyle='rgba(150,120,90,'+(.07*Math.sin((y-100)/100*Math.PI)).toFixed(3)+')';x.fillRect(0,y,640,2)}BF.gl(x,320,96,120,96,'rgba(255,190,110,.2)');x.fillStyle=WD[1];x.beginPath();x.ellipse(320,96,66,58,0,0,6.3);x.fill();x.fillStyle='#c8a060';x.beginPath();x.ellipse(320,96,58,51,0,0,6.3);x.fill();x.fillStyle='#a8844a';x.beginPath();x.ellipse(320,96,44,39,0,0,6.3);x.fill();
 for(let k=0;k<3;k++){x.strokeStyle=RD[0];x.lineWidth=3;x.beginPath();x.arc(320,96,11+k*11,0,6.3);x.stroke()}for(let k=0;k<8;k++){const a=k/8*6.283;R(320+Math.cos(a)*29-2,96+Math.sin(a)*26-2,4,4,'#2a1a10')}
 for(let k=0;k<16;k++){const a=k/16*6.283;x.strokeStyle='#3e2618';x.lineWidth=2;x.beginPath();x.moveTo(320+Math.cos(a)*59,96+Math.sin(a)*52);x.lineTo(320+Math.cos(a)*67,96+Math.sin(a)*59);x.stroke()}
 BF.gl(x,320,96,90,72,'rgba(255,170,80,.18)');
 // 張られた綱と、ぶら下がる羽根と骨の鳴子
 for(const[x0,x1]of[[0,226],[414,640]]){for(let s=0;s<=20;s++){const t=s/20,px=x0+(x1-x0)*t,py=30+Math.sin(t*Math.PI)*26;R(px,py,2,2,'#5a4a3a');if(s%4===2){for(let j=0;j<8;j++)R(px,py+j*2,2,2,'#5a4a3a');R(px-2,py+16,6,4,s%8===2?'#d8ccb0':OC[0]);R(px-1,py+20,4,6,s%8===2?TE[0]:RD[0])}}}
 // 仮面の柱の列（左右）
 for(const[px,s]of[[60,1],[124,.78],[178,.58],[462,.58],[516,.78],[580,1]]){const h=110*s,w=22*s,top=206-h;R(px-w/2,top,w,h,WD[0]);R(px-w/2,top,3,h,'#6a4632');for(let j=0;j<3;j++){const y=top+6+j*h/3;R(px-w/2+2,y,w-4,h/3-8,j%2?RD[1]:WD[1]);R(px-w/4,y+4,w/6,4,'#e0b050');R(px+w/12,y+4,w/6,4,'#e0b050');R(px-w/4,y+h/6,w/2,3,'#120806')}for(let j=0;j<4;j++)R(px-w/2-4+j*(w+8)/3,top-10+(j%2)*4,4,12,j%2?TE[0]:RD[0])}
 // 床：赤土の円の紋と焚き火の輪
 R(0,200,640,160,'#2a1c14');for(let i=0;i<12;i++){const t=i/11;R(0,206+Math.pow(t,1.6)*150,640,2,'#1e140e')}for(let k=-10;k<=10;k++){x.strokeStyle='#1e140e';x.lineWidth=2;x.beginPath();x.moveTo(320+k*16,204);x.lineTo(320+k*90,360);x.stroke()}R(0,200,640,6,'#3a2a1c');
 for(let k=0;k<3;k++){x.strokeStyle=k===1?OC[1]:RD[1];x.lineWidth=4;x.beginPath();x.ellipse(320,250,260-k*60,40-k*9,0,0,6.3);x.stroke()}for(let k=0;k<12;k++){const a=k/12*6.283;R(320+Math.cos(a)*230-3,250+Math.sin(a)*35-2,6,4,OC[0])}
 for(let k=0;k<10;k++){const a=k/10*6.283;R(320+Math.cos(a)*40-5,212+Math.sin(a)*7-3,10,6,ST[1])}R(306,206,28,8,'#3a1a10');
 BF.gl(x,320,200,90,40,'rgba(255,140,50,.35)');
 // 手前の羽根飾りの杭と葉
 for(const px of[24,616]){R(px-3,150,6,70,WD[0]);for(let j=0;j<5;j++)R(px-8+j*4,140-(j%2)*8,3,16,j%2?TE[0]:RD[0])}
 for(let k=0;k<12;k++){const fx=k<6?rn()*100:540+rn()*100,fy=208+rn()*20;for(let j=0;j<6;j++){const a=-2.6+j*.4,L=16+rn()*14;x.strokeStyle=j%2?'#1e3420':'#2a4426';x.lineWidth=2;x.beginPath();x.moveTo(fx,fy);x.quadraticCurveTo(fx+Math.cos(a)*L*.6,fy+Math.sin(a)*L*.8,fx+Math.cos(a)*L,fy+Math.sin(a)*L*.4);x.stroke()}}
 for(const[cx,cy,rot]of[[-14,6,.6],[56,-14,.9],[654,6,2.5],[594,-16,2.2]]){x.save();x.translate(cx,cy);x.rotate(rot);x.fillStyle='#0a100c';x.beginPath();x.ellipse(40,0,58,16,0,0,6.3);x.fill();x.restore()}
 BF.vig(x,.58)};
BFULL.jmaw=(x)=>{const R=(px,py,w,h,cl)=>{x.fillStyle=cl;x.fillRect(BF.F(px),BF.F(py),Math.max(2,BF.F(w)),Math.max(2,BF.F(h)))},rn=bgRng(1201),ST=['#868a7a','#6a6e60','#4e5248','#36392f'],MO=['#3e5a32','#2e4628'],GL='#c8f070';
 BF.sky(x,'#0c1210','#16201c','#24302a');
 for(let k=0;k<26;k++){const cx=rn()*680-20,r=22+rn()*30;x.fillStyle=k%2?'#1a2620':'#1e2c24';x.beginPath();x.arc(BF.F(cx),BF.F(66+rn()*30),r,0,6.3);x.fill();R(cx-3,66,6,140,'#18241e')}
 // いちばん奥：霧の中の巨大な門（光る目の刻まれた梁）
 const gate=(cx,base,w,h,c,eye)=>{R(cx-w/2,base-h,w*.22,h,c);R(cx+w/2-w*.22,base-h,w*.22,h,c);R(cx-w/2-w*.06,base-h-h*.18,w*1.12,h*.2,c);R(cx-w*.28,base-h+h*.02,w*.56,h*.98,'rgba(10,14,12,.55)');if(eye){for(const ex of[-.14,.14]){R(cx+ex*w-w*.04,base-h-h*.12,w*.08,h*.06,'#141810');BF.gl(x,cx+ex*w,base-h-h*.09,w*.12,w*.08,'rgba(200,240,112,.4)');R(cx+ex*w-w*.02,base-h-h*.11,w*.04,h*.03,GL)}}};
 gate(320,170,220,140,'#2a302a',1);
 for(let y=60;y<206;y+=2){x.fillStyle='rgba(150,190,170,'+(((y-60)/146)*.18).toFixed(3)+')';x.fillRect(0,y,640,2)}
 // 霧の奥へ連なる門の列（左右に交互、手前ほど大きく濃い）
 for(let i=0;i<4;i++){const s=.35+i*.18,c=ST[3-Math.min(3,i)];gate(140-i*28,190+i*4,110*s*2,120*s*1.4,i<2?'#3a403a':c,0);gate(500+i*28,190+i*4,110*s*2,120*s*1.4,i<2?'#3a403a':c,0)}
 // 苔と垂れる蔦
 for(let k=0;k<18;k++){let vx=rn()*640,vy=0;const ln=20+rn()*80;for(let y=0;y<ln;y+=2){vx+=Math.sin(y*.1+k)*.5;R(vx,y,2,2,y%8<2?MO[0]:MO[1])}}
 // 水へ下りる石段（中央）と折れた柱
 for(let i=0;i<5;i++){const w=180-i*24,y=200-i*8;R(320-w/2,y,w,8,i%2?ST[2]:ST[1]);R(320-w/2,y,w,2,ST[0])}
 for(const[px,h,br]of[[200,80,1],[440,110,0],[96,60,1],[560,90,1]]){R(px-10,206-h,20,h,ST[2]);R(px-10,206-h,4,h,ST[1]);if(br){x.fillStyle=ST[2];x.beginPath();x.moveTo(px-10,206-h);x.lineTo(px-2,206-h-10);x.lineTo(px+4,206-h-4);x.lineTo(px+10,206-h);x.fill()}else R(px-14,206-h-6,28,6,ST[1]);R(px-10,206-h*.4,20,6,MO[0])}
 // 床：浅い水と、水面に映る門の目の光
 R(0,200,640,160,'#18201c');for(let y=206;y<360;y+=4){x.fillStyle='rgba(120,160,150,'+(.04+.04*Math.sin(y*.3)).toFixed(3)+')';x.fillRect(0,y,640,2)}
 R(0,198,640,6,'#2a342c');for(const ex of[289,351])for(let k=0;k<8;k++)R(ex-6+Math.sin(k)*3,230+k*10,12-k,2,'rgba(200,240,112,'+(.3-k*.03).toFixed(2)+')');
 for(let k=0;k<10;k++){const sx=rn()*640,sy=214+rn()*130;R(sx,sy,10+rn()*20,4,ST[3]);R(sx,sy,6,2,MO[0])}
 for(let k=0;k<8;k++){const fx=k<4?rn()*90:550+rn()*90,fy=206+rn()*14;for(let j=0;j<5;j++){x.strokeStyle=j%2?'#1e3420':'#2a4426';x.lineWidth=2;x.beginPath();x.moveTo(fx,fy);x.lineTo(fx+(j-2)*4,fy-16-rn()*14);x.stroke()}}
 // 密林らしさ：両端の細めの樹の幹、門を這う根、渡る蔓、天井の葉、睡蓮と葦、手前の葉の影
 for(const[px,d]of[[0,1],[640,-1]]){x.fillStyle='#2c241a';x.beginPath();x.moveTo(px,0);x.lineTo(px+d*40,0);x.quadraticCurveTo(px+d*30,140,px+d*44,200);x.lineTo(px+d*70,212);x.lineTo(px,212);x.fill();for(let j=0;j<3;j++){x.strokeStyle='#20190f';x.lineWidth=2;x.beginPath();x.moveTo(px+d*(8+j*10),0);x.quadraticCurveTo(px+d*(10+j*8),120,px+d*(14+j*12),206);x.stroke()}for(let j=0;j<6;j++)R(px+d*(6+rn()*28)-(d<0?8:0),rn()*190,6+rn()*8,3+rn()*5,MO[j%2])}
 for(const[cx,w]of[[140,90],[500,90],[112,70],[528,70]])for(let j=0;j<2;j++){let rx=cx-w/2+j*w*.6,ry=110;x.fillStyle='#2c241a';for(let q=0;q<70;q+=2){rx+=Math.sin(q*.09+j+cx)*.9;x.fillRect(BF.F(rx),BF.F(ry+q),3,2)}}
 for(let k=0;k<2;k++){x.strokeStyle=k?'#2a3a22':'#22301c';x.lineWidth=3;x.beginPath();x.moveTo(80+k*40,0);x.quadraticCurveTo(320,80+k*24,560-k*40,0);x.stroke();for(let s=1;s<9;s++){const t=s/9,px=(1-t)*(1-t)*(80+k*40)+2*(1-t)*t*320+t*t*(560-k*40),py=2*(1-t)*t*(80+k*24);x.fillStyle=MO[(s+k)%2];x.beginPath();x.ellipse(px,py+4,6,3,s,0,6.3);x.fill()}}
 for(let k=0;k<36;k++){x.fillStyle=k%3?'#16261a':'#1e3222';x.beginPath();x.ellipse(BF.F(rn()*640),BF.F(rn()*22),14+rn()*22,7+rn()*8,rn()*3,0,6.3);x.fill()}
 for(let k=0;k<16;k++){const px=rn()*640,py=216+rn()*130;x.fillStyle=k%2?'#2a4428':'#345230';x.beginPath();x.ellipse(px,py,8+rn()*6,3+rn()*2,0,.3,6.0);x.lineTo(px,py);x.fill();if(k%5===0){R(px-2,py-3,4,3,'#d8c8d0');R(px-1,py-4,2,2,'#f0e0e8')}}
 for(let k=0;k<10;k++){const fx=k<5?150+rn()*70:430+rn()*70,fy=206+rn()*14;for(let j=0;j<4;j++){x.strokeStyle=j%2?'#2a4426':'#3a5a30';x.lineWidth=2;x.beginPath();x.moveTo(fx+j*2,fy);x.lineTo(fx+j*2+(j-2)*3,fy-14-rn()*16);x.stroke()}}
 for(const[cx,cy,rot,L]of[[-20,236,-.5,80],[660,246,3.6,80],[-10,16,.7,64],[650,20,2.4,64]]){x.save();x.translate(cx,cy);x.rotate(rot);x.fillStyle='#0a120c';x.beginPath();x.moveTo(0,0);x.quadraticCurveTo(L*.5,-L*.32,L,0);x.quadraticCurveTo(L*.5,L*.32,0,0);x.fill();x.restore()}
 BF.vig(x,.6)};
JGBA.jdrum=()=>{for(let k=0;k<3;k++){const u=((T*.6+k/3)%1);ctx.globalAlpha=(1-u)*.25;ctx.strokeStyle='#ffcc80';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(320,96,16+u*48,14+u*43,0,0,6.3);ctx.stroke()}ctx.globalAlpha=1;
  const f=Math.sin(T*11)*.5+Math.sin(T*6.7)*.5;const g=ctx.createRadialGradient(320,196,4,320,196,110);g.addColorStop(0,'rgba(255,150,60,'+(.22+.08*f)+')');g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(210,90,220,140);
  for(let k=0;k<5;k++){const h=14+f*4+(k%2)*6;ctx.fillStyle=k%2?'#ffb040':'#e0601e';ctx.beginPath();ctx.moveTo(308+k*6,208);ctx.lineTo(310+k*6+f*2,208-h);ctx.lineTo(314+k*6,208);ctx.fill()}for(let k=0;k<6;k++){const u=(T*.8+k/6)%1;ctx.globalAlpha=1-u;sq(320+Math.sin(T*3+k)*14,196-u*60,2,'#ffb040')}ctx.globalAlpha=1};
