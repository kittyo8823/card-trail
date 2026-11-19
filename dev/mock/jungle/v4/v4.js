// ===== Ver4.66 楽師の背景を奥行きのある舞台に・大顎の背景に密林・大顎の必殺を作り直し =====
// 鼓腹の楽師：密林を切り開いた儀式の舞台。手前から奥の舞台へ、たいまつの柱が遠近で並ぶ参道。舞台の上に太鼓と彫り柱、奥に崩れた神殿の壁、さらに奥の密林は霧でかすむ
const JDT=[];
BFULL.jdrum=(x)=>{const R=(px,py,w,h,cl)=>{x.fillStyle=cl;x.fillRect(BF.F(px),BF.F(py),Math.max(2,BF.F(w)),Math.max(2,BF.F(h)))},rn=bgRng(917),ST=['#6a5e4e','#544a3c','#3e362c','#2a241e'],RD=['#8a2a24','#6a1e1a'],OC=['#b88a40','#8a6428'],TE=['#2e7a6a','#1e5a4e'],WD=['#5a3a26','#3e2618'],VX=320,VY=128;
 BF.sky(x,'#07080a','#10100e','#1c1612');
 // 奥から順に：遠い密林（霧で明るくかすむ）→ 中の密林 → 近い密林
 for(const[n,y0,r0,c,hz]of[[22,96,26,'#1e2a24',.0],[18,84,34,'#16201a',.0],[14,70,44,'#0f1612',0]]){for(let k=0;k<n;k++){const cx=rn()*680-20,r=r0*(.7+rn()*.6);x.fillStyle=c;x.beginPath();x.arc(BF.F(cx),BF.F(y0+rn()*24),r,0,6.3);x.fill();R(cx-r*.15,y0,r*.3,140,c)}for(let y=y0-30;y<y0+60;y+=2){x.fillStyle='rgba(120,110,90,.035)';x.fillRect(0,y,640,2)}}
 BF.gl(x,VX,VY,260,90,'rgba(255,150,70,.22)');
 // 奥の崩れた神殿の壁（舞台の背後）
 for(let i=0;i<3;i++){const w=260-i*60,y=VY-20-i*16;R(VX-w/2,y,w,16,i%2?ST[2]:ST[1]);R(VX-w/2,y,w,2,ST[0]);for(let j=0;j<w;j+=14)R(VX-w/2+j,y+2,2,14,ST[3])}R(VX-130,VY-4,260,40,ST[2]);for(let j=0;j<10;j++)R(VX-128+rn()*250,VY-24+rn()*50,6+rn()*14,3,'#3e5a32');
 // 床：参道の石畳を遠近で（奥ほど細く）
 x.fillStyle='#24180f';x.fillRect(0,VY+30,640,360);for(let i=0;i<14;i++){const t=i/13,y=VY+32+Math.pow(t,1.7)*178;R(0,y,640,2,'#1a110a')}
 for(let k=-9;k<=9;k++){x.strokeStyle='#1a110a';x.lineWidth=2;x.beginPath();x.moveTo(VX+k*10,VY+32);x.lineTo(VX+k*70,360);x.stroke()}
 // 参道の赤土の帯と金の縁（遠近）
 x.fillStyle='#3a1e12';x.beginPath();x.moveTo(VX-34,VY+34);x.lineTo(VX+34,VY+34);x.lineTo(VX+150,360);x.lineTo(VX-150,360);x.fill();x.strokeStyle=OC[1];x.lineWidth=2;for(const d of[-1,1]){x.beginPath();x.moveTo(VX+d*34,VY+34);x.lineTo(VX+d*150,360);x.stroke()}
 for(let i=0;i<7;i++){const t=i/6,y=VY+40+Math.pow(t,1.6)*160,s=.3+t*.9;x.strokeStyle=RD[1];x.lineWidth=Math.max(2,3*s);x.beginPath();x.ellipse(VX,y,34*s+t*60,5*s,0,0,6.3);x.stroke()}
 // 舞台：奥にせり上がる石の台、手前に段
 x.fillStyle=ST[1];x.beginPath();x.moveTo(VX-120,VY+26);x.lineTo(VX+120,VY+26);x.lineTo(VX+140,VY+44);x.lineTo(VX-140,VY+44);x.fill();R(VX-140,VY+44,280,8,ST[2]);for(let i=0;i<3;i++)R(VX-60+i*6,VY+52+i*4,120-i*12,4,i%2?ST[2]:ST[1]);
 // 舞台の上：二本の彫り柱と大太鼓、垂れ幕
 for(const px of[VX-66,VX+66]){R(px-7,VY-60,14,88,WD[0]);R(px-7,VY-60,3,88,'#6a4632');for(let y=VY-52;y<VY+20;y+=16){R(px-6,y,12,8,WD[1]);R(px-4,y+2,2,2,'#d8a040');R(px+2,y+2,2,2,'#d8a040')}for(let j=0;j<4;j++)R(px-8+j*5,VY-68-(j%2)*4,3,10,j%2?TE[0]:RD[0]);R(px-6,VY-40,12,30,RD[1])}
 x.fillStyle=WD[1];x.beginPath();x.ellipse(VX,VY-14,44,40,0,0,6.3);x.fill();x.fillStyle='#c8a060';x.beginPath();x.ellipse(VX,VY-14,38,35,0,0,6.3);x.fill();x.fillStyle='#a8844a';x.beginPath();x.ellipse(VX,VY-14,28,26,0,0,6.3);x.fill();for(let k=0;k<2;k++){x.strokeStyle=RD[0];x.lineWidth=2;x.beginPath();x.arc(VX,VY-14,10+k*10,0,6.3);x.stroke()}
 for(let k=0;k<12;k++){const a=k/12*6.283;x.strokeStyle='#3e2618';x.lineWidth=2;x.beginPath();x.moveTo(VX+Math.cos(a)*38,VY-14+Math.sin(a)*35);x.lineTo(VX+Math.cos(a)*45,VY-14+Math.sin(a)*41);x.stroke()}
 BF.gl(x,VX,VY-14,80,60,'rgba(255,170,80,.16)');
 // 舞台の脇の火鉢
 for(const px of[VX-100,VX+100]){R(px-6,VY+14,12,12,'#3a2a1a');R(px-7,VY+12,14,3,OC[1]);BF.gl(x,px,VY+6,30,26,'rgba(255,140,50,.35)')}
 // 参道のたいまつの柱（手前ほど大きく、奥へ遠近で並ぶ）と、柱の仮面
 JDT.length=0;for(const d of[-1,1])for(let i=0;i<5;i++){const t=i/4,s=.35+(1-t)*.9,px=VX+d*(60+(1-t)*220),by=VY+40+(1-t)*150,h=80*s;R(px-4*s,by-h,8*s,h,WD[0]);R(px-4*s,by-h,2,h,'#6a4632');R(px-6*s,by-h*.62,12*s,10*s,RD[1]);R(px-4*s,by-h*.6,3*s,3*s,'#e0b050');R(px+1*s,by-h*.6,3*s,3*s,'#e0b050');for(let j=0;j<3;j++)R(px-6*s+j*5*s,by-h-6*s,3*s,8*s,j%2?TE[0]:RD[0]);R(px-5*s,by-h-2,10*s,3,OC[1]);BF.gl(x,px,by-h-8*s,46*s,40*s,'rgba(255,140,50,.28)');JDT.push([px,by-h-3,s])}
 // 霧：舞台と手前の間
 for(let y=VY+10;y<VY+80;y+=2){x.fillStyle='rgba(140,110,80,'+(.05*Math.sin((y-VY-10)/70*Math.PI)).toFixed(3)+')';x.fillRect(0,y,640,2)}
 // 手前の大きな葉（暗い影）と羽根飾りの杭
 for(const[cx,cy,rot]of[[-10,10,.6],[60,-10,.9],[650,10,2.5],[590,-12,2.2]]){x.save();x.translate(cx,cy);x.rotate(rot);x.fillStyle='#0a100c';x.beginPath();x.ellipse(40,0,60,18,0,0,6.3);x.fill();x.restore()}
 for(let k=0;k<10;k++){const fx=k<5?rn()*90:550+rn()*90,fy=212+rn()*30;for(let j=0;j<6;j++){const a=-2.6+j*.4,L=20+rn()*18;x.strokeStyle=j%2?'#0e1a10':'#16261a';x.lineWidth=3;x.beginPath();x.moveTo(fx,fy);x.quadraticCurveTo(fx+Math.cos(a)*L*.6,fy+Math.sin(a)*L*.8,fx+Math.cos(a)*L,fy+Math.sin(a)*L*.4);x.stroke()}}
 BF.vig(x,.6)};
JGBA.jdrum=()=>{for(let k=0;k<3;k++){const u=((T*.6+k/3)%1);ctx.globalAlpha=(1-u)*.25;ctx.strokeStyle='#ffcc80';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(320,114,12+u*40,11+u*36,0,0,6.3);ctx.stroke()}ctx.globalAlpha=1;
 for(const[px,py,s]of JDT){const f=Math.sin(T*12+px)*.5+Math.sin(T*7+px*.3)*.5,h=(10+f*3)*s;ctx.fillStyle='#e0601e';ctx.beginPath();ctx.moveTo(px-5*s,py);ctx.lineTo(px+f*2*s,py-h);ctx.lineTo(px+5*s,py);ctx.fill();ctx.fillStyle='#ffb040';ctx.beginPath();ctx.moveTo(px-2.5*s,py);ctx.lineTo(px+f*s,py-h*.6);ctx.lineTo(px+2.5*s,py);ctx.fill();const u=(T*.9+px*.01)%1;ctx.globalAlpha=1-u;sq(px+Math.sin(T*4+px)*3*s,py-h-u*20*s,2,'#ffb040');ctx.globalAlpha=1}
 for(const px of[220,420]){const f=Math.sin(T*10+px)*.5+.5;ctx.fillStyle='#e0601e';ctx.beginPath();ctx.moveTo(px-5,140);ctx.lineTo(px+f*2,128-f*3);ctx.lineTo(px+5,140);ctx.fill()}};
// 石門の大顎：密林に呑まれた、水に沈む門の谷。両脇に巨大な樹の幹と板根、門を覆う根と太い蔓、天井の葉、霧の奥の巨大な門の光る目、浅い水に睡蓮と葦、手前に大きな葉
BFULL.jmaw=(x)=>{const R=(px,py,w,h,cl)=>{x.fillStyle=cl;x.fillRect(BF.F(px),BF.F(py),Math.max(2,BF.F(w)),Math.max(2,BF.F(h)))},rn=bgRng(1201),ST=['#868a7a','#6a6e60','#4e5248','#36392f'],MO=['#3e5a32','#2e4628','#4a6a3a'],GL='#c8f070',TR=['#3a3024','#2c241a','#20190f'];
 BF.sky(x,'#0a100c','#14201a','#1e2c24');
 // 遠い密林の影（霧でかすむ）
 for(let k=0;k<24;k++){const cx=rn()*680-20,r=24+rn()*30;x.fillStyle='#1c2a22';x.beginPath();x.arc(BF.F(cx),BF.F(70+rn()*30),r,0,6.3);x.fill();R(cx-4,70,8,130,'#1a261e')}
 const gate=(cx,base,w,h,c,eye)=>{R(cx-w/2,base-h,w*.22,h,c);R(cx+w/2-w*.22,base-h,w*.22,h,c);R(cx-w/2-w*.06,base-h-h*.18,w*1.12,h*.2,c);R(cx-w*.28,base-h+h*.02,w*.56,h*.98,'rgba(10,14,12,.55)');if(eye){for(const ex of[-.14,.14]){R(cx+ex*w-w*.04,base-h-h*.12,w*.08,h*.06,'#141810');BF.gl(x,cx+ex*w,base-h-h*.09,w*.12,w*.08,'rgba(200,240,112,.4)');R(cx+ex*w-w*.02,base-h-h*.11,w*.04,h*.03,GL)}}};
 gate(320,170,220,140,'#2a302a',1);
 for(let y=50;y<206;y+=2){x.fillStyle='rgba(150,190,170,'+(((y-50)/156)*.16).toFixed(3)+')';x.fillRect(0,y,640,2)}
 BF.shaft(x,360,372,392,410,0,206,'rgba(190,230,170,.07)','rgba(220,250,200,.05)');BF.shaft(x,230,238,252,266,0,206,'rgba(190,230,170,.06)','rgba(220,250,200,.04)');
 // 奥へ連なる門の列（根が這う）
 for(let i=0;i<3;i++){const s=.4+i*.2;for(const cx of[150-i*30,490+i*30]){const w=110*s*2,h=120*s*1.4,base=192+i*4;gate(cx,base,w,h,i<1?'#363c34':ST[3-i],0);for(let j=0;j<3;j++){let rx=cx-w/2+j*w*.4,ry=base-h-h*.18;x.fillStyle=TR[1];for(let q=0;q<h*.8;q+=2){rx+=Math.sin(q*.08+j+i)*.9;x.fillRect(BF.F(rx),BF.F(ry+q),3,2)}}R(cx-w/2,base-h-h*.2,w*1.1,4,MO[1])}}
 // 両脇の巨大な樹の幹と板根
 for(const[px,d]of[[0,1],[640,-1]]){x.fillStyle=TR[0];x.beginPath();x.moveTo(px,0);x.lineTo(px+d*96,0);x.quadraticCurveTo(px+d*70,120,px+d*84,170);x.quadraticCurveTo(px+d*120,196,px+d*150,212);x.lineTo(px,212);x.fill();
  for(let j=0;j<6;j++){x.strokeStyle=j%2?TR[1]:TR[2];x.lineWidth=3;x.beginPath();x.moveTo(px+d*(10+j*13),0);x.quadraticCurveTo(px+d*(14+j*10),120,px+d*(20+j*18),206);x.stroke()}
  for(let j=0;j<12;j++)R(px+d*(10+rn()*70)-(d<0?10:0),rn()*190,6+rn()*10,3+rn()*6,MO[j%3])}
 // 太い蔓（両端から垂れる・弧を描いて渡る）
 for(let k=0;k<3;k++){x.strokeStyle=k%2?'#2a3a22':'#22301c';x.lineWidth=4;x.beginPath();x.moveTo(60+k*30,0);x.quadraticCurveTo(320,90+k*26,580-k*30,0);x.stroke();for(let s=1;s<10;s++){const t=s/10,px=(1-t)*(1-t)*(60+k*30)+2*(1-t)*t*320+t*t*(580-k*30),py=2*(1-t)*t*(90+k*26);x.fillStyle=MO[(s+k)%3];x.beginPath();x.ellipse(px,py+4,6,3,s,0,6.3);x.fill()}}
 for(let k=0;k<16;k++){let vx=60+rn()*520,vy=0;const ln=30+rn()*110;for(let y=0;y<ln;y+=2){vx+=Math.sin(y*.1+k)*.5;R(vx,y,2,2,y%8<2?MO[0]:MO[1]);if(y%16===0)R(vx+(k%2?2:-6),y,6,3,MO[2])}}
 // 天井の葉
 for(let k=0;k<40;k++){x.fillStyle=k%3?'#16261a':'#1e3222';x.beginPath();x.ellipse(BF.F(rn()*640),BF.F(rn()*26),14+rn()*24,7+rn()*9,rn()*3,0,6.3);x.fill()}
 // 水へ下りる石段と折れた柱
 for(let i=0;i<5;i++){const w=180-i*24,y=200-i*8;R(320-w/2,y,w,8,i%2?ST[2]:ST[1]);R(320-w/2,y,w,2,ST[0]);R(320-w/2+rn()*w*.6,y,10+rn()*20,3,MO[0])}
 for(const[px,h,br]of[[210,80,1],[440,110,0]]){R(px-10,206-h,20,h,ST[2]);R(px-10,206-h,4,h,ST[1]);if(br){x.fillStyle=ST[2];x.beginPath();x.moveTo(px-10,206-h);x.lineTo(px-2,206-h-10);x.lineTo(px+4,206-h-4);x.lineTo(px+10,206-h);x.fill()}else R(px-14,206-h-6,28,6,ST[1]);R(px-10,206-h*.4,20,6,MO[0]);let rx=px-8,ry=206-h;x.fillStyle=TR[1];for(let q=0;q<h;q+=2){rx+=Math.sin(q*.12)*1.2;x.fillRect(BF.F(rx),BF.F(ry+q),3,2)}}
 // 床：浅い水、映る目の光、睡蓮と葦
 R(0,200,640,160,'#16201a');for(let y=206;y<360;y+=4){x.fillStyle='rgba(120,160,150,'+(.04+.04*Math.sin(y*.3)).toFixed(3)+')';x.fillRect(0,y,640,2)}
 R(0,198,640,6,'#24302a');for(const ex of[289,351])for(let k=0;k<8;k++)R(ex-6+Math.sin(k)*3,230+k*10,12-k,2,'rgba(200,240,112,'+(.3-k*.03).toFixed(2)+')');
 for(let k=0;k<18;k++){const px=rn()*640,py=214+rn()*140;x.fillStyle=k%2?'#2a4428':'#345230';x.beginPath();x.ellipse(px,py,8+rn()*6,3+rn()*2,0,.3,6.0);x.lineTo(px,py);x.fill();if(k%5===0){R(px-2,py-3,4,3,'#d8c8d0');R(px-1,py-4,2,2,'#f0e0e8')}}
 for(let k=0;k<12;k++){const fx=k<6?120+rn()*80:440+rn()*80,fy=206+rn()*16;for(let j=0;j<4;j++){x.strokeStyle=j%2?'#2a4426':'#3a5a30';x.lineWidth=2;x.beginPath();x.moveTo(fx+j*2,fy);x.lineTo(fx+j*2+(j-2)*3,fy-16-rn()*16);x.stroke()}}
 // 手前の大きな葉（暗い影）
 for(const[cx,cy,rot,L]of[[-20,230,-.5,90],[40,300,-.2,80],[660,240,3.6,90],[600,310,3.4,80],[-10,20,.7,70],[650,24,2.4,70]]){x.save();x.translate(cx,cy);x.rotate(rot);x.fillStyle='#0a120c';x.beginPath();x.moveTo(0,0);x.quadraticCurveTo(L*.5,-L*.32,L,0);x.quadraticCurveTo(L*.5,L*.32,0,0);x.fill();x.strokeStyle='#14201a';x.lineWidth=2;x.beginPath();x.moveTo(0,0);x.lineTo(L*.95,0);x.stroke();x.restore()}
 BF.vig(x,.6)};
// 石門の大顎の必殺「呑み込み」：溜めは足元の水が波立ち、地面がひび割れ、石のかけらが浮き上がる。着弾は左右から苔むした石の牙の列が水を割って突き上がり、閉じて噛み砕く（石の面の明暗・ひび・飛び散る石のかけら・土煙・水しぶき）
function jgSlab(x,y,w,h,a,c){ctx.save();ctx.translate(Math.round(x),Math.round(y));ctx.rotate(a);ctx.fillStyle='#3a3e34';ctx.beginPath();ctx.moveTo(-w/2,0);ctx.lineTo(-w/2,-h*.85);ctx.lineTo(0,-h);ctx.lineTo(w/2,-h*.85);ctx.lineTo(w/2,0);ctx.fill();ctx.fillStyle=c||'#6a6e60';ctx.beginPath();ctx.moveTo(-w/2+3,0);ctx.lineTo(-w/2+3,-h*.83);ctx.lineTo(0,-h+3);ctx.lineTo(w/2-1,-h*.85);ctx.lineTo(w/2-1,0);ctx.fill();ctx.fillStyle='#8a8e7e';ctx.beginPath();ctx.moveTo(-w/2+3,-h*.83);ctx.lineTo(0,-h+3);ctx.lineTo(1,-h*.6);ctx.lineTo(-w/2+3,-h*.5);ctx.fill();ctx.strokeStyle='#2a2e26';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(-2,-h*.7);ctx.lineTo(2,-h*.45);ctx.lineTo(-1,-h*.2);ctx.stroke();ctx.fillStyle='#3e5a32';ctx.fillRect(-w/2+3,-h*.3,w-4,4);ctx.fillRect(-w/2+3,-4,w-4,4);ctx.restore()}
BFX.jmaw={tn:'rgba(14,20,14,',ch(o){const p=o.p,X=110,G=208;ctx.globalAlpha=.25*p;ctx.fillStyle='#0a100a';ctx.fillRect(-20,24,680,206);
  for(const ex of[289,351]){const g=ctx.createRadialGradient(ex,57,1,ex,57,30+p*20);g.addColorStop(0,'rgba(200,240,112,'+(.3+p*.5)+')');g.addColorStop(1,'rgba(0,0,0,0)');ctx.globalAlpha=1;ctx.fillStyle=g;ctx.fillRect(ex-50,7,100,100)}
  for(let k=0;k<4;k++){const u=((T*1.6+k/4)%1);ctx.globalAlpha=(1-u)*.5*p;ctx.strokeStyle='#c8e0d8';ctx.lineWidth=1;ctx.beginPath();ctx.ellipse(X,G,10+u*70,2+u*12,0,0,6.3);ctx.stroke()}
  ctx.globalAlpha=Math.min(1,p*1.5);ctx.strokeStyle='#1a1e16';ctx.lineWidth=2;for(let k=0;k<7;k++){const a=k/7*Math.PI,L=20+p*50;ctx.beginPath();ctx.moveTo(X,G);ctx.lineTo(X+Math.cos(a)*L*.5,G+Math.sin(a)*L*.08+1);ctx.lineTo(X+Math.cos(a)*L,G+Math.sin(a)*L*.14);ctx.stroke()}
  for(let k=0;k<10;k++){const r=hs(k),u=Math.min(1,Math.max(0,p*1.4-r*.4));if(u<=0)continue;ctx.globalAlpha=u;ctx.fillStyle=k%2?'#6a6e60':'#4e5248';const sx=X+(r-.5)*120,sy=G-u*(20+hs(k+3)*50)+Math.sin(T*6+k)*2;ctx.fillRect(Math.round(sx)-3,Math.round(sy)-2,6,4);ctx.fillStyle='#8a8e7e';ctx.fillRect(Math.round(sx)-3,Math.round(sy)-2,6,1)}ctx.globalAlpha=1},
 hit(f,p){const X=f.x,G=208,en=p<.75?1:Math.max(0,1-(p-.75)/.25),rise=Math.min(1,p/.22),cl=p<.22?0:Math.min(1,(p-.22)/.08),hold=p>.3;
  if(p<.16)flash(.35*(1-p/.16),'#d8f0b0');ctx.globalAlpha=en;
  // 水しぶきの柱
  for(let k=0;k<26;k++){const r=hs(k),side=k%2?1:-1,u=Math.min(1,p*2.2),x0=X+side*(40+r*30),vy=-(60+hs(k+5)*70),t=u*.9;const px=x0+side*hs(k+9)*30*t,py=G+vy*t+120*t*t;if(py<G+6){ctx.fillStyle=k%3?'rgba(200,230,220,.8)':'rgba(140,180,170,.8)';ctx.fillRect(Math.round(px),Math.round(py),2,3)}}
  // 左右の石の牙の列：突き上がり→閉じる
  for(const side of[-1,1])for(let j=4;j>=0;j--){const base=X+side*(84-cl*46)+side*j*20,h=(92-j*13)*rise,a=side*(-.12-cl*.62)*(1-j*.12);if(h>2){ctx.globalAlpha=en*.35;ctx.fillStyle='#000';ctx.beginPath();ctx.ellipse(base,G+4,14,3,0,0,6.3);ctx.fill();ctx.globalAlpha=en;jgSlab(base,G+4,26-j*3,h,a)}}
  // 閉じた瞬間の衝撃：土煙・石のかけら・緑の光
  if(hold){const u=(p-.3)/.7;for(let w=0;w<3;w++){const g=ctx.createRadialGradient(X+(w-1)*30,G-14,2,X+(w-1)*30,G-14,30+u*50);g.addColorStop(0,'rgba(120,124,108,'+(.5*(1-u))+')');g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(X-140,G-120,280,160)}
   for(let k=0;k<22;k++){const a=-Math.PI*hs(k),sp=60+hs(k+2)*120,t=u*.8,px=X+Math.cos(a)*sp*t,py=G-30+Math.sin(a)*sp*t+140*t*t;ctx.save();ctx.translate(Math.round(px),Math.round(py));ctx.rotate(t*8+k);ctx.fillStyle=k%3?'#6a6e60':'#4e5248';ctx.fillRect(-3,-2,6,4);ctx.fillStyle='#8a8e7e';ctx.fillRect(-3,-2,6,1);ctx.restore()}
   const g=ctx.createRadialGradient(X,G-30,2,X,G-30,70);g.addColorStop(0,'rgba(200,240,112,'+(.4*(1-u))+')');g.addColorStop(1,'rgba(0,0,0,0)');ctx.globalCompositeOperation='lighter';ctx.fillStyle=g;ctx.fillRect(X-70,G-100,140,140);ctx.globalCompositeOperation='source-over';
   ctx.globalAlpha=en*(1-u);ctx.strokeStyle='#c8e0d8';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(X,G+2,30+u*110,4+u*14,0,0,6.3);ctx.stroke()}
  ctx.globalAlpha=1}};
