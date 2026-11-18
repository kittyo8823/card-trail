// Ver4.51 3層のもう一つの場所「天上の聖堂」の戦闘背景（雲の上の黄金の聖堂。奥に巨大な薔薇窓の後光、象牙の柱廊、金の縁取りのアーチ、雲の海、白金の大理石の床）。v で置き物が変わる
function bgHeaven(v){v=v||0;const c=MKC(640,360),x=c.getContext('2d'),rn=bgRng(431+v*17),R=(...a)=>BF.R(x,...a),
 K0='#07050c',K1='#110c18',K2='#1c1424',K3='#2a1f30',K4='#3c2e3e',IV=['#9a8e80','#776c62','#4e463e'],GD=['#c89a3a','#8a6424','#5a401a'],CL=['#3a3040','#4c4050','#5e5262'];
 BF.sky(x,'#06040c','#16101e','#2a1e2a');
 // 奥の薔薇窓と後光
 const wx=320,wy=92;BF.gl(x,wx,wy,230,170,'rgba(200,150,70,.45)');BF.gl(x,wx,wy,110,90,'rgba(255,220,140,.5)');
 x.fillStyle=K3;x.beginPath();x.arc(wx,wy,74,0,6.3);x.fill();
 for(let k=0;k<32;k++){const a=k/32*6.283,a2=(k+.5)/32*6.283;x.fillStyle=k%2?GD[1]:GD[2];x.beginPath();x.moveTo(wx+Math.cos(a)*74,wy+Math.sin(a)*74);x.lineTo(wx+Math.cos(a2)*90,wy+Math.sin(a2)*90);x.lineTo(wx+Math.cos(a+6.283/32)*74,wy+Math.sin(a+6.283/32)*74);x.fill()}
 x.fillStyle='#5a3e2a';x.beginPath();x.arc(wx,wy,66,0,6.3);x.fill();
 for(let k=0;k<12;k++){const a=k/12*6.283;x.strokeStyle=GD[0];x.lineWidth=2;x.beginPath();x.moveTo(wx+Math.cos(a)*16,wy+Math.sin(a)*16);x.lineTo(wx+Math.cos(a)*64,wy+Math.sin(a)*64);x.stroke();{const b=a+.26,c1=Math.cos(b),s1=Math.sin(b);x.fillStyle=k%2?'#b07a38':'#8a4a2a';x.beginPath();x.moveTo(wx+c1*22,wy+s1*22);x.lineTo(wx+c1*44-s1*8,wy+s1*44+c1*8);x.lineTo(wx+c1*60,wy+s1*60);x.lineTo(wx+c1*44+s1*8,wy+s1*44-c1*8);x.fill();x.fillStyle=k%2?'#e0b060':'#c07040';x.beginPath();x.moveTo(wx+c1*30,wy+s1*30);x.lineTo(wx+c1*44-s1*3,wy+s1*44+c1*3);x.lineTo(wx+c1*52,wy+s1*52);x.lineTo(wx+c1*44+s1*3,wy+s1*44-c1*3);x.fill()}}
 for(const r2 of[64,40,16]){x.strokeStyle=GD[0];x.lineWidth=2;x.beginPath();x.arc(wx,wy,r2,0,6.3);x.stroke()}
 x.fillStyle='#e8d090';x.beginPath();x.arc(wx,wy,10,0,6.3);x.fill();BF.gl(x,wx,wy,46,46,'rgba(255,230,170,.4)');
 BF.rays(x,wx,[[286,12,.16],[304,8,.22],[322,10,.2],[340,8,.16],[262,6,.1],[372,8,.12]],'rgba(255,220,150,A)',206);
 // 奥の柱廊（遠い順に小さく、上は金の尖頭アーチ）
 const arch=(cx,w,top,bot,c,g)=>{R(cx-w/2,top,w,bot-top,c);x.fillStyle=g;x.beginPath();x.moveTo(cx-w/2-2,top);x.quadraticCurveTo(cx-w/2,top-w*.9,cx,top-w*1.25);x.quadraticCurveTo(cx+w/2,top-w*.9,cx+w/2+2,top);x.lineTo(cx+w/2-3,top);x.quadraticCurveTo(cx+w/2-4,top-w*.8,cx,top-w*1.1);x.quadraticCurveTo(cx-w/2+4,top-w*.8,cx-w/2+3,top);x.fill()};
 for(const s of[-1,1])for(let k=0;k<4;k++){const cx=320+s*(118+k*44),w=12+k*4,top=78-k*14;BF.pil(x,cx,top,w,206-top,k<2?K4:IV[2],k<2?'#5a4a4a':IV[1],k<2?'#7a6450':IV[0],3,s>0?-1:1,0);R(cx-w/2-3,top-6,w+6,4,GD[1]);R(cx-w/2-3,top-6,w+6,2,GD[0])}
 for(const s of[-1,1])for(let k=0;k<3;k++){const ax=320+s*(140+k*44),w=36+k*4,top=86-k*14;x.strokeStyle=k<1?GD[2]:GD[1];x.lineWidth=2;x.beginPath();x.arc(ax,top,w*.5,Math.PI,0);x.stroke()}
 // 手前の大柱（左右の端。象牙と金）
 for(const[cx,s]of[[22,1],[618,-1]]){BF.pil(x,cx,0,40,206,IV[1],IV[0],'#c8b8a0',5,s,0);for(let y=24;y<206;y+=46){R(cx-22,y,44,4,GD[1]);R(cx-22,y,44,2,GD[0])}}
 // 置き物
 if(v===1){// 奥に祈る巨大な天使像の影
  const sx=320,sy=206;x.fillStyle='#2e2230';x.beginPath();x.moveTo(sx-70,sy);x.lineTo(sx-46,120);x.lineTo(sx-30,96);x.lineTo(sx-16,70);x.lineTo(sx+16,70);x.lineTo(sx+30,96);x.lineTo(sx+46,120);x.lineTo(sx+70,sy);x.fill();x.beginPath();x.moveTo(sx-30,100);x.lineTo(sx-120,20);x.lineTo(sx-100,90);x.lineTo(sx-60,130);x.fill();x.beginPath();x.moveTo(sx+30,100);x.lineTo(sx+120,20);x.lineTo(sx+100,90);x.lineTo(sx+60,130);x.fill();R(sx-12,54,24,20,'#2e2230');R(sx-10,60,20,2,GD[1])}
 if(v===2){// 天井から下がる金の鐘と鎖
  for(const[bx,bl]of[[150,70],[230,40],[410,46],[490,76]]){R(bx-1,0,2,bl,GD[2]);x.fillStyle=GD[1];x.beginPath();x.moveTo(bx-12,bl+22);x.quadraticCurveTo(bx-10,bl,bx,bl);x.quadraticCurveTo(bx+10,bl,bx+12,bl+22);x.fill();R(bx-13,bl+20,26,3,GD[0]);R(bx-6,bl+4,3,14,'#e8c070')}}
 if(v===3){// 宙に浮く光輪の列
  for(let k=0;k<5;k++){const hx=200+k*60,hy=40+(k%2)*22;x.strokeStyle=GD[0];x.lineWidth=2;x.beginPath();x.ellipse(hx,hy,14,4,0,0,6.3);x.stroke();BF.gl(x,hx,hy,24,10,'rgba(255,220,150,.35)')}}
 // 雲の海（床の奥）
 for(let k=0;k<30;k++){const cx=rn()*640,cy=172+rn()*30,w=30+rn()*50,h=7+rn()*6;x.fillStyle=CL[0];x.beginPath();x.ellipse(BF.F(cx),BF.F(cy),w,h,0,0,6.3);x.fill();x.fillStyle=CL[2];x.beginPath();x.ellipse(BF.F(cx-w*.15),BF.F(cy-h*.45),w*.6,h*.35,0,0,6.3);x.fill();x.fillStyle=CL[1];x.beginPath();x.ellipse(BF.F(cx+w*.2),BF.F(cy+h*.1),w*.55,h*.5,0,0,6.3);x.fill()}
 BF.gl(x,320,190,260,24,'rgba(220,180,120,.25)');
 // 床：白金の大理石。奥へ消える目地、中央に金の円の紋、窓の照り返し
 let g=x.createLinearGradient(0,206,0,360);g.addColorStop(0,'#4a3e42');g.addColorStop(.35,'#2e2428');g.addColorStop(1,'#140e12');x.fillStyle=g;x.fillRect(0,206,640,154);
 R(0,206,640,2,'#8a7460');R(0,208,640,2,GD[2]);
 x.strokeStyle='rgba(20,12,16,.6)';x.lineWidth=2;for(let k=-10;k<=10;k++){x.beginPath();x.moveTo(320+k*34,208);x.lineTo(320+k*130,360);x.stroke()}
 for(let y=214,dy=6;y<360;y+=dy,dy*=1.35){R(0,y,640,2,'rgba(20,12,16,.55)')}
 x.strokeStyle=GD[1];x.lineWidth=2;x.beginPath();x.ellipse(320,262,170,28,0,0,6.3);x.stroke();x.strokeStyle=GD[2];x.beginPath();x.ellipse(320,262,120,19,0,0,6.3);x.stroke();
 for(let k=0;k<12;k++){const a=k/12*6.283;R(320+Math.cos(a)*145,262+Math.sin(a)*24,4,2,GD[0])}
 BF.gl(x,320,236,200,26,'rgba(255,210,140,.22)');
 for(let k=0;k<30;k++)R(rn()*640,212+rn()*140,2,2,rn()<.5?'rgba(255,230,180,.25)':'rgba(0,0,0,.25)');
 // 落ちている羽根
 for(let k=0;k<7;k++){const fx=60+rn()*520,fy=226+rn()*110,fl=6+rn()*6;x.fillStyle='#b8ae9c';x.beginPath();x.ellipse(BF.F(fx),BF.F(fy),fl,2,rn()*.6-.3,0,6.3);x.fill()}
 BF.vig(x,.62);c.ak='h';return c}
