// ===== Ver4.65 密林の遺跡のボスごとの背景（丸ごと描く BFULL） =====
// 鼓腹の楽師：密林の奥の、儀式の円形の広場。段になった石の観客席、奥の二本の彫り柱に張られた巨大な太鼓の皮、羽根と骨の鳴子、仮面の柱の列、床の中央に焚き火の輪と赤土の円の紋
BFULL.jdrum=(x)=>{const R=(px,py,w,h,cl)=>{x.fillStyle=cl;x.fillRect(BF.F(px),BF.F(py),Math.max(2,BF.F(w)),Math.max(2,BF.F(h)))},rn=bgRng(907),ST=['#6a5e4e','#544a3c','#3e362c','#2a241e'],RD=['#8a2a24','#6a1e1a'],OC=['#b88a40','#8a6428'],TE=['#2e7a6a','#1e5a4e'],WD=['#5a3a26','#3e2618'];
 BF.sky(x,'#0a0a0c','#1a1210','#2a1a12');
 // 奥の密林の影と、焚き火に照らされる下の方
 for(let k=0;k<30;k++){const cx=rn()*660-10,r=30+rn()*40;x.fillStyle=k%2?'#121a14':'#16201a';x.beginPath();x.arc(BF.F(cx),BF.F(40+rn()*50),r,0,6.3);x.fill()}
 BF.gl(x,320,180,320,150,'rgba(255,120,40,.22)');
 // 段の観客席（奥へ向かって弧を描く石の段）
 for(let i=0;i<6;i++){const y=118+i*14,w=640-i*0;x.fillStyle=i%2?ST[2]:ST[1];x.beginPath();x.ellipse(320,y+60,380-i*20,70-i*4,0,Math.PI,0);x.lineTo(700,y+60);x.lineTo(-60,y+60);x.fill();x.strokeStyle=ST[0];x.lineWidth=2;x.beginPath();x.ellipse(320,y+60,380-i*20,70-i*4,0,Math.PI,0);x.stroke()}
 for(let k=0;k<40;k++){const a=Math.PI+rn()*Math.PI,i=Math.floor(rn()*6);R(320+Math.cos(a)*(380-i*20),118+i*14+60+Math.sin(a)*(70-i*4),4+rn()*8,2+rn()*3,'#3e5a32')}
 // 奥の二本の彫り柱と巨大な太鼓の皮
 for(const px of[226,414]){R(px-14,18,28,170,WD[0]);R(px-14,18,4,170,'#6a4632');for(let y=30;y<180;y+=26){R(px-12,y,24,14,WD[1]);R(px-8,y+4,4,4,'#d8a040');R(px+4,y+4,4,4,'#d8a040');R(px-6,y+10,12,2,RD[1])}for(let j=0;j<5;j++)R(px-16+j*8,10-(j%2)*6,4,12,j%2?TE[0]:RD[0])}
 x.fillStyle=WD[1];x.beginPath();x.ellipse(320,92,82,72,0,0,6.3);x.fill();x.fillStyle='#c8a060';x.beginPath();x.ellipse(320,92,72,64,0,0,6.3);x.fill();x.fillStyle='#a8844a';x.beginPath();x.ellipse(320,92,56,50,0,0,6.3);x.fill();
 for(let k=0;k<3;k++){x.strokeStyle=RD[0];x.lineWidth=3;x.beginPath();x.arc(320,92,14+k*14,0,6.3);x.stroke()}for(let k=0;k<8;k++){const a=k/8*6.283;R(320+Math.cos(a)*36-2,92+Math.sin(a)*32-2,4,4,'#2a1a10')}
 for(let k=0;k<16;k++){const a=k/16*6.283;x.strokeStyle='#3e2618';x.lineWidth=2;x.beginPath();x.moveTo(320+Math.cos(a)*74,92+Math.sin(a)*66);x.lineTo(320+Math.cos(a)*84,92+Math.sin(a)*74);x.stroke()}
 BF.gl(x,320,92,110,90,'rgba(255,170,80,.18)');
 // 張られた綱と、ぶら下がる羽根と骨の鳴子
 for(const[x0,x1]of[[0,226],[414,640]]){for(let s=0;s<=20;s++){const t=s/20,px=x0+(x1-x0)*t,py=30+Math.sin(t*Math.PI)*26;R(px,py,2,2,'#5a4a3a');if(s%4===2){for(let j=0;j<8;j++)R(px,py+j*2,2,2,'#5a4a3a');R(px-2,py+16,6,4,s%8===2?'#d8ccb0':OC[0]);R(px-1,py+20,4,6,s%8===2?TE[0]:RD[0])}}}
 // 仮面の柱の列（左右）
 for(const[px,s]of[[60,1],[130,.8],[510,.8],[580,1]]){const h=110*s,w=22*s,top=206-h;R(px-w/2,top,w,h,WD[0]);R(px-w/2,top,3,h,'#6a4632');for(let j=0;j<3;j++){const y=top+6+j*h/3;R(px-w/2+2,y,w-4,h/3-8,j%2?RD[1]:WD[1]);R(px-w/4,y+4,w/6,4,'#e0b050');R(px+w/12,y+4,w/6,4,'#e0b050');R(px-w/4,y+h/6,w/2,3,'#120806')}for(let j=0;j<4;j++)R(px-w/2-4+j*(w+8)/3,top-10+(j%2)*4,4,12,j%2?TE[0]:RD[0])}
 // 床：赤土の円の紋と焚き火の輪
 R(0,200,640,160,'#2a1c14');for(let y=206;y<360;y+=12){R(0,y,640,2,'#1e140e')}R(0,200,640,6,'#3a2a1c');
 for(let k=0;k<3;k++){x.strokeStyle=k===1?OC[1]:RD[1];x.lineWidth=4;x.beginPath();x.ellipse(320,250,260-k*60,40-k*9,0,0,6.3);x.stroke()}for(let k=0;k<12;k++){const a=k/12*6.283;R(320+Math.cos(a)*230-3,250+Math.sin(a)*35-2,6,4,OC[0])}
 for(let k=0;k<10;k++){const a=k/10*6.283;R(320+Math.cos(a)*40-5,212+Math.sin(a)*7-3,10,6,ST[1])}R(306,206,28,8,'#3a1a10');
 BF.gl(x,320,200,90,40,'rgba(255,140,50,.35)');
 // 手前の羽根飾りの杭と葉
 for(const px of[24,616]){R(px-3,150,6,70,WD[0]);for(let j=0;j<5;j++)R(px-8+j*4,140-(j%2)*8,3,16,j%2?TE[0]:RD[0])}
 for(let k=0;k<12;k++){const fx=k<6?rn()*100:540+rn()*100,fy=208+rn()*20;for(let j=0;j<6;j++){const a=-2.6+j*.4,L=16+rn()*14;x.strokeStyle=j%2?'#1e3420':'#2a4426';x.lineWidth=2;x.beginPath();x.moveTo(fx,fy);x.quadraticCurveTo(fx+Math.cos(a)*L*.6,fy+Math.sin(a)*L*.8,fx+Math.cos(a)*L,fy+Math.sin(a)*L*.4);x.stroke()}}
 BF.vig(x,.55)};
// 千根の母樹：巨大な樹のうろの中の聖域。四方の壁は樹皮、根が滝のように垂れ、赤い種の莢が光り、天井の穴から光の筋。床は絡んだ根と苔と水たまり
BFULL.jmother=(x)=>{const R=(px,py,w,h,cl)=>{x.fillStyle=cl;x.fillRect(BF.F(px),BF.F(py),Math.max(2,BF.F(w)),Math.max(2,BF.F(h)))},rn=bgRng(733),BK=['#3e3a30','#322e26','#26241e','#1a1814'],LF=['#2e5a52','#1e4038','#3e7a62'],PD='#8a2a24';
 BF.sky(x,'#101614','#1a2420','#22302a');
 // 奥：うろの内壁（縦の樹皮のすじ）
 for(let px=0;px<640;px+=8){const c=BK[(px/8+Math.floor(rn()*2))%4];R(px,0,8,206,c);if(rn()<.3)R(px+2,rn()*200,2,20+rn()*40,BK[3])}
 // うろの中央の大きな裂け目の奥に、さらに奥の光る空洞
 x.fillStyle='#0e1412';x.beginPath();x.moveTo(250,206);x.quadraticCurveTo(240,60,320,20);x.quadraticCurveTo(400,60,390,206);x.fill();BF.gl(x,320,120,90,120,'rgba(170,230,160,.25)');
 for(let k=0;k<20;k++){const t=(k+.5)/20;R(300+rn()*40,30+t*170,2,2,'#c8f0a0')}
 // 天井の穴からの光の筋
 BF.gl(x,330,0,140,70,'rgba(200,240,190,.35)');BF.shaft(x,290,310,350,380,0,206,'rgba(200,240,190,.12)','rgba(230,255,220,.09)');BF.shaft(x,170,180,200,226,0,206,'rgba(200,240,190,.07)','rgba(230,255,220,.05)');BF.shaft(x,450,462,480,500,0,206,'rgba(200,240,190,.07)','rgba(230,255,220,.05)');
 // 垂れ下がる根の滝
 for(let k=0;k<26;k++){let rx=rn()*640,ry=0;const ln=60+rn()*150,w=2+Math.floor(rn()*3)*2;x.fillStyle=k%3?BK[1]:BK[2];for(let s=0;s<ln;s+=2){rx+=Math.sin(s*.04+k)*.8;x.fillRect(BF.F(rx),s,w,2);if(s%22===0&&rn()<.5){let bx=rx,by=s;for(let q=0;q<14;q+=2){bx+=(k%2?1:-1);by+=2;x.fillRect(BF.F(bx),BF.F(by),2,2)}}}}
 // 葉の天井
 for(let k=0;k<34;k++){x.fillStyle=LF[k%3];x.beginPath();x.ellipse(BF.F(rn()*640),BF.F(rn()*22),12+rn()*20,6+rn()*8,rn()*3,0,6.3);x.fill()}
 // 垂れ下がる赤い種の莢（ほのかに光る）
 for(let k=0;k<14;k++){const px=20+rn()*600,len=20+rn()*70;for(let s=0;s<len;s+=2)R(px,s,2,2,'#4a463e');x.fillStyle=PD;x.beginPath();x.ellipse(px+1,len+6,5,8,0,0,6.3);x.fill();R(px-1,len+2,2,4,'#d05040');BF.gl(x,px,len+6,16,16,'rgba(220,80,60,.25)')}
 // 両側の巨大な根の柱
 for(const[px,d]of[[40,1],[600,-1]]){for(let j=0;j<5;j++){let rx=px+j*8*d,ry=0;x.fillStyle=j%2?BK[1]:BK[0];for(let s=0;s<206;s+=2){rx+=Math.sin(s*.03+j)*.9*d;x.fillRect(BF.F(rx),s,10,2)}}}
 // 床：絡んだ根と苔、水たまり、白い小花
 R(0,200,640,160,'#1e2620');R(0,198,640,8,'#2e3a2c');
 for(let k=0;k<14;k++){let rx=rn()*640,ry=200+rn()*10;x.fillStyle=k%2?BK[2]:BK[3];for(let s=0;s<90;s++){rx+=(k%2?2:-2);ry+=Math.sin(s*.12+k)*.8+.25;x.fillRect(BF.F(rx),BF.F(ry),6,4)}}
 for(let k=0;k<30;k++)R(rn()*640,206+rn()*150,8+rn()*14,4,LF[k%3]);for(const[wx,wy,ww]of[[200,260,80],[460,300,100]]){x.fillStyle='rgba(120,180,160,.25)';x.beginPath();x.ellipse(wx,wy,ww,8,0,0,6.3);x.fill();x.fillStyle='rgba(220,255,230,.18)';x.fillRect(wx-ww*.4,wy-2,ww*.3,2)}
 for(let k=0;k<26;k++){const fx=rn()*640,fy=204+rn()*30;R(fx,fy,2,2,'#e0e8d8');R(fx+2,fy-2,2,2,'#f0f0e0')}
 BF.vig(x,.55)};
// 石門の大顎：水に沈んだ門の谷。霧の奥へ連なる崩れた石の門の列、遠くの巨大な門に刻まれた光る目、水へ下りる石段、折れた柱と苔、浅い水の床に映る光
BFULL.jmaw=(x)=>{const R=(px,py,w,h,cl)=>{x.fillStyle=cl;x.fillRect(BF.F(px),BF.F(py),Math.max(2,BF.F(w)),Math.max(2,BF.F(h)))},rn=bgRng(1201),ST=['#868a7a','#6a6e60','#4e5248','#36392f'],MO=['#3e5a32','#2e4628'],GL='#c8f070';
 BF.sky(x,'#0c1210','#16201c','#24302a');
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
 BF.vig(x,.6)};
// 背景の動き：ボスごとの背景ではたいまつの代わりに専用の動き
const JGBA={jdrum(){for(let k=0;k<3;k++){const u=((T*.6+k/3)%1);ctx.globalAlpha=(1-u)*.25;ctx.strokeStyle='#ffcc80';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(320,92,20+u*60,18+u*54,0,0,6.3);ctx.stroke()}ctx.globalAlpha=1;
  const f=Math.sin(T*11)*.5+Math.sin(T*6.7)*.5;const g=ctx.createRadialGradient(320,196,4,320,196,110);g.addColorStop(0,'rgba(255,150,60,'+(.22+.08*f)+')');g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(210,90,220,140);
  for(let k=0;k<5;k++){const h=14+f*4+(k%2)*6;ctx.fillStyle=k%2?'#ffb040':'#e0601e';ctx.beginPath();ctx.moveTo(308+k*6,208);ctx.lineTo(310+k*6+f*2,208-h);ctx.lineTo(314+k*6,208);ctx.fill()}for(let k=0;k<6;k++){const u=(T*.8+k/6)%1;ctx.globalAlpha=1-u;sq(320+Math.sin(T*3+k)*14,196-u*60,2,'#ffb040')}ctx.globalAlpha=1},
 jmother(){for(let k=0;k<26;k++){const q=(T*.03+k/26)%1,x=60+((k*97)%520)+Math.sin(T*.6+k)*12,y=206-q*200;ctx.globalAlpha=Math.sin(q*Math.PI)*.7;ctx.fillStyle=k%3?'#d8f0a0':'#f0f0e0';ctx.fillRect(Math.round(x),Math.round(y),2,2)}ctx.globalAlpha=1;
  for(let k=0;k<6;k++){const px=60+k*100,a=.15+.1*Math.sin(T*1.3+k);const g=ctx.createRadialGradient(px,70,2,px,70,24);g.addColorStop(0,'rgba(220,80,60,'+a+')');g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(px-24,46,48,48)}},
 jmaw(){const a=.25+.2*Math.sin(T*1.4);for(const ex of[289,351]){const g=ctx.createRadialGradient(ex,57,1,ex,57,26);g.addColorStop(0,'rgba(200,240,112,'+a+')');g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(ex-26,31,52,52)}
  for(let k=0;k<5;k++){const u=(T*.4+k/5)%1,x=80+((k*131)%480);ctx.globalAlpha=(1-u)*.35;ctx.strokeStyle='#c8e0d8';ctx.lineWidth=1;ctx.beginPath();ctx.ellipse(x,240+((k*37)%90),4+u*20,1+u*4,0,0,6.3);ctx.stroke()}
  for(let k=0;k<6;k++){const u=(T*.7+k/6)%1;ctx.globalAlpha=1-u;sq(96+k*90,u*190,2,'#a8c8c0')}ctx.globalAlpha=1;
  for(let k=0;k<3;k++){const y=150+k*20,ox=(T*(4+k*2)+k*200)%900-260,g=ctx.createLinearGradient(0,y-12,0,y+12);g.addColorStop(0,'rgba(150,190,170,0)');g.addColorStop(.5,'rgba(150,190,170,.10)');g.addColorStop(1,'rgba(150,190,170,0)');ctx.fillStyle=g;ctx.fillRect(ox,y-12,520,24)}}};
