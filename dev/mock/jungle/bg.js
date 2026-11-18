// ===== Ver4.63 密林の遺跡の背景（3つの版：0 段の神殿と石の大顔／1 崩れたアーチと滝／2 大樹の根が呑み込んだ門）。2px単位 =====
function bgJungle(v){v=v||0;const c=MKC(640,360),x=c.getContext('2d'),rn=bgRng(733+v*29),R=(px,py,w,h,cl)=>{x.fillStyle=cl;x.fillRect(BF.F(px),BF.F(py),Math.max(2,BF.F(w)),Math.max(2,BF.F(h)))},
 K0='#060c0a',K1='#0c1612',K2='#13201a',K3='#1a2c22',K4='#24382c',ST=['#5a5e52','#46493f','#33362e','#24261f'],MO=['#4a6a3a','#3a5a32','#2a4426'],GD=['#b08a34','#7a5e22'];
 BF.sky(x,'#0a1410','#13241c','#1e3428');
 // いちばん奥：霧にかすむ木々の影と、天井の葉の隙間から差す光
 BF.gl(x,320,40,300,120,'rgba(150,200,140,.25)');
 for(let k=0;k<26;k++){const tx=rn()*660-10,w=10+rn()*16,h=120+rn()*80;R(tx,206-h,w,h,k%2?'#16261e':'#1a2c22');for(let j=0;j<5;j++){const r=16+rn()*22;x.fillStyle=k%2?'#1a2e22':'#1e3426';x.beginPath();x.arc(BF.F(tx+w/2+(rn()-.5)*40),BF.F(206-h-rn()*20+j*10),r,0,6.3);x.fill()}}
 BF.shaft(x,250,272,300,340,0,206,'rgba(190,220,160,.10)','rgba(220,240,190,.08)');BF.shaft(x,380,394,420,452,0,206,'rgba(190,220,160,.08)','rgba(220,240,190,.06)');BF.shaft(x,120,130,150,170,0,206,'rgba(190,220,160,.06)','rgba(220,240,190,.05)');
 // 奥の霧
 for(let y=120;y<206;y+=2){x.fillStyle='rgba(120,170,140,'+((y-120)/86*.12).toFixed(3)+')';x.fillRect(0,y,640,2)}
 // 中景：段の神殿（版ごとに違う置き物）
 const temple=(cx,base,n,w0,dh)=>{for(let i=0;i<n;i++){const w=w0-i*w0/n*.7,y=base-(i+1)*dh;R(cx-w/2,y,w,dh,i%2?ST[2]:ST[1]);R(cx-w/2,y,w,2,ST[0]);for(let j=0;j<w;j+=16)R(cx-w/2+j,y+2,2,dh-2,ST[3]);for(let j=0;j<5;j++)R(cx-w/2+rn()*w,y+rn()*dh,6+rn()*14,2+rn()*4,MO[1])}
  R(cx-10,base-n*dh,20,n*dh,ST[2]);for(let i=0;i<n*dh;i+=6)R(cx-10,base-n*dh+i,20,2,ST[1])};
 if(v===0){temple(320,206,6,300,18);
  // 頂上の石の大顔（蔦に覆われ、目の奥がほのかに光る）
  const fy=206-6*18-56;R(290,fy,60,56,ST[1]);R(290,fy,60,4,ST[0]);R(296,fy+14,16,8,K1);R(328,fy+14,16,8,K1);R(300,fy+16,6,4,'#8aa050');R(332,fy+16,6,4,'#8aa050');R(314,fy+24,12,14,ST[2]);R(302,fy+42,36,6,K1);for(let j=0;j<6;j++)R(304+j*6,fy+42,2,6,ST[2]);
  BF.gl(x,303,fy+18,20,12,'rgba(160,220,100,.35)');BF.gl(x,335,fy+18,20,12,'rgba(160,220,100,.35)');for(let j=0;j<8;j++){let vx=290+rn()*60,vy=fy;x.fillStyle=MO[j%3];for(let s=0;s<20;s++){vy+=2;vx+=Math.sin(s*.6+j)*1.4;x.fillRect(BF.F(vx),BF.F(vy),2,2)}}}
 else if(v===1){temple(470,206,4,180,20);
  // 崩れた石のアーチと、奥の滝
  R(96,30,40,176,'#2a3a34');for(let y=30;y<206;y+=2){const a=.25+.2*Math.sin(y*.3);x.fillStyle='rgba(180,220,210,'+a.toFixed(3)+')';x.fillRect(100+(y*7%30),y,2,2);x.fillRect(110+(y*13%24),y,2,2)}BF.gl(x,116,200,60,14,'rgba(170,220,210,.3)');
  for(const ax of[200,330]){R(ax,96,26,110,ST[1]);R(ax,96,26,2,ST[0]);for(let y=100;y<206;y+=14)R(ax,y,26,2,ST[3])}x.fillStyle=ST[1];x.beginPath();x.moveTo(200,98);x.quadraticCurveTo(278,30,356,98);x.lineTo(330,98);x.quadraticCurveTo(278,56,226,98);x.fill();R(300,60,30,14,ST[2]);x.fillStyle=ST[2];x.fillRect(330,64,24,10)}
 else{temple(200,206,5,220,18);
  // 大樹の根が呑み込んだ門
  R(420,70,70,136,ST[2]);R(432,100,46,106,K1);R(420,70,70,6,ST[0]);for(let j=0;j<4;j++)R(424+j*16,80,10,10,ST[1]);
  for(let j=0;j<9;j++){let rx=380+j*16,ry=0;x.fillStyle=j%2?'#3a2c1e':'#2e2418';for(let s=0;s<110;s++){ry+=2;rx+=Math.sin(s*.05+j)*1.2+(j<4?.3:-.3);x.fillRect(BF.F(rx),BF.F(ry),6-(s>80?2:0),2)}}
  x.fillStyle='#2e2418';x.fillRect(360,0,180,20);BF.gl(x,455,150,30,40,'rgba(255,170,80,.18)')}
 // 手前の柱（苔と根）とたいまつ
 for(const[px,pw]of[[16,34],[590,34]]){R(px,0,pw,206,ST[2]);R(px,0,4,206,ST[1]);R(px+pw-4,0,4,206,ST[3]);for(let y=10;y<206;y+=26)R(px,y,pw,2,ST[3]);for(let j=0;j<10;j++)R(px+rn()*pw,rn()*200,4+rn()*8,2+rn()*6,MO[j%3]);for(let j=0;j<3;j++)R(px+6+j*8,40+j*30,4,30,GD[1])}
 for(const tx of[124,516]){R(tx-3,104,6,40,'#3a2a1a');R(tx-6,100,12,6,GD[1]);BF.gl(x,tx,92,70,60,'rgba(255,150,60,.25)')}
 // 垂れ下がる蔦と葉
 for(let k=0;k<22;k++){const vx=rn()*640,ln=30+rn()*110;let px=vx;for(let y=0;y<ln;y+=2){px+=Math.sin(y*.08+k)*.6;x.fillStyle=y%10<2?'#2a4a2a':'#203a22';x.fillRect(BF.F(px),y,2,2);if(y%14===0){x.fillStyle=MO[k%3];x.fillRect(BF.F(px)+(k%2?2:-6),y,6,4)}}}
 for(let k=0;k<30;k++){const lx=rn()*640,ly=rn()*16;x.fillStyle=k%2?'#1a3020':'#223a26';x.beginPath();x.ellipse(BF.F(lx),BF.F(ly),14+rn()*20,8+rn()*8,rn()*3,0,6.3);x.fill()}
 // 床：苔むした石畳と根、金の筋の入った敷石、水たまり
 R(0,200,640,160,'#1a2218');for(let y=206;y<360;y+=14){R(0,y,640,2,'#121810');for(let i=(y/14%2)*20;i<640;i+=40){R(i,y,2,14,'#121810');if(rn()<.35)R(i+4,y+4,10+rn()*20,4,MO[2])}}
 R(0,200,640,6,'#2a3a26');for(let i=0;i<640;i+=4)if(rn()<.5)R(i,198,2,2+rn()*4,MO[i%3]);
 for(let k=0;k<5;k++){const gx=60+k*130+rn()*30;R(gx,222+(k%2)*30,40,2,GD[1])}
 for(let k=0;k<4;k++){let rx=rn()*640,ry=206;x.fillStyle='#2e2418';for(let s=0;s<60;s++){rx+=2;ry+=Math.sin(s*.15+k)*.8+.2;x.fillRect(BF.F(rx),BF.F(ry),4,2)}}
 for(const[wx,wy,ww]of[[230,250,70],[470,300,90]]){x.fillStyle='rgba(90,140,130,.25)';x.beginPath();x.ellipse(wx,wy,ww,8,0,0,6.3);x.fill();x.fillStyle='rgba(190,230,220,.15)';x.fillRect(wx-ww*.5,wy-2,ww*.4,2)}
 // 手前のシダ
 for(let k=0;k<14;k++){const fx=k<7?rn()*120:520+rn()*120,fy=206+rn()*20;for(let j=0;j<7;j++){const a=-2.6+j*.35,L=18+rn()*16;x.strokeStyle=j%2?'#2a4426':'#36542e';x.lineWidth=2;x.beginPath();x.moveTo(fx,fy);x.quadraticCurveTo(fx+Math.cos(a)*L*.6,fy+Math.sin(a)*L*.8,fx+Math.cos(a)*L,fy+Math.sin(a)*L*.4);x.stroke()}}
 BF.vig(x,.6);c.ak='j';return c}
// 背景の動き：たいまつの炎、舞う蛍、ゆっくり落ちる葉、床を這う霧
function jgBgAnim(){for(const tx of[124,516]){const f=Math.sin(T*13+tx)*.5+Math.sin(T*7.3+tx*.3)*.5,g=ctx.createRadialGradient(tx,92,4,tx,92,90);g.addColorStop(0,'rgba(255,160,60,'+(.12+.07*f)+')');g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(tx-90,2,180,180);
  const h=16+f*3;ctx.fillStyle='#e0601e';ctx.beginPath();ctx.moveTo(tx-6,100);ctx.lineTo(tx+f*2,100-h);ctx.lineTo(tx+6,100);ctx.fill();ctx.fillStyle='#ffb040';ctx.beginPath();ctx.moveTo(tx-3,100);ctx.lineTo(tx+f,100-h*.6);ctx.lineTo(tx+3,100);ctx.fill();for(let k=0;k<3;k++){const u=(T*.9+k/3)%1;ctx.globalAlpha=1-u;sq(tx+Math.sin(T*4+k)*3,98-h-u*24,2,'#ffb040')}ctx.globalAlpha=1}
 for(let k=0;k<16;k++){const ph=(T*.25+k*.37)%1,x=40+((k*97)%560)+Math.sin(T*.7+k*2)*16,y=80+((k*53)%120)+Math.cos(T*.5+k)*10;ctx.globalAlpha=Math.max(0,Math.sin(ph*Math.PI*2))*.8;ctx.fillStyle='#d8f080';ctx.fillRect(Math.round(x),Math.round(y),2,2);ctx.globalAlpha*=.3;ctx.fillRect(Math.round(x)-2,Math.round(y)-2,6,6)}
 for(let k=0;k<6;k++){const q=(T*.04+k/6)%1,x=60+((k*137)%520)+Math.sin(T*.9+k*2)*20,y=-10+q*220;ctx.save();ctx.translate(Math.round(x),Math.round(y));ctx.rotate(Math.sin(T*1.4+k)*.8);ctx.globalAlpha=.7;ctx.fillStyle=k%2?'#4a6a3a':'#5a7a40';ctx.fillRect(-3,-1,6,2);ctx.fillRect(-2,-2,4,4);ctx.restore()}
 for(let k=0;k<3;k++){const y=196+k*8,ox=(T*(5+k*3)+k*200)%900-260,g=ctx.createLinearGradient(0,y-8,0,y+8);g.addColorStop(0,'rgba(120,170,140,0)');g.addColorStop(.5,'rgba(120,170,140,.10)');g.addColorStop(1,'rgba(120,170,140,0)');ctx.fillStyle=g;ctx.fillRect(ox,y-8,520,16)}ctx.globalAlpha=1}
