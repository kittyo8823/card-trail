// ===== Ver4.53 天上の聖堂のボスごとの背景（BFULL：丸ごと描く） =====
// 至高の御顔：雲の上の玉座の間。奥に巨大な光の後光（刃の輪が三重）、左右に何段も並ぶ赤子の顔の浮き彫りの壁、金の大階段、空に浮く光輪
BFULL.hface=(x)=>{const R=(...a)=>BF.R(x,...a),rn=bgRng(611),GD=['#c89a3a','#8a6424','#5a401a'];
 BF.sky(x,'#0a0610','#1e1424','#2a1c22');
 BF.gl(x,320,96,300,200,'rgba(200,150,80,.38)');BF.gl(x,320,96,130,110,'rgba(255,220,160,.35)');
 for(const[rr,n,c]of[[120,36,GD[2]],[96,28,GD[1]],[74,22,GD[0]]])for(let k=0;k<n;k++){const a=k/n*6.283+rr*.01,a2=a+3.14/n;x.fillStyle=k%2?c:'#3a2a1a';x.beginPath();x.moveTo(320+Math.cos(a)*(rr-18),96+Math.sin(a)*(rr-18));x.lineTo(320+Math.cos(a2)*rr,96+Math.sin(a2)*rr);x.lineTo(320+Math.cos(a+6.283/n)*(rr-18),96+Math.sin(a+6.283/n)*(rr-18));x.fill()}
 x.fillStyle='#e8d098';x.beginPath();x.arc(320,96,40,0,6.3);x.fill();BF.gl(x,320,96,70,70,'rgba(255,240,200,.45)');
 BF.rays(x,320,[[270,14,.16],[296,10,.24],[318,12,.26],[342,10,.22],[364,14,.16]],'rgba(255,230,170,A)',230);
 // 左右の壁：赤子の顔の浮き彫りが段に並ぶ
 for(const s of[-1,1]){const x0=s<0?0:470;R(x0,0,170,210,'#2a1e22');for(let row=0;row<5;row++)for(let c=0;c<4;c++){const fx=x0+18+c*40+(row%2)*20,fy=18+row*38;if(fx>x0+160)continue;x.fillStyle='#4a3a34';x.beginPath();x.ellipse(fx,fy,11,13,0,0,6.3);x.fill();x.fillStyle='#6e5a4c';x.beginPath();x.ellipse(fx-2,fy-2,8,10,0,0,6.3);x.fill();R(fx-6,fy-2,4,2,'#2a1e1a');R(fx+2,fy-2,4,2,'#2a1e1a');R(fx-2,fy+6,4,2,'#3a2a24');R(fx-14,fy-17,28,2,GD[2])}
  for(let y=0;y<210;y+=38)R(x0,y+30,170,4,GD[1]);R(s<0?166:470,0,4,210,GD[0])}
 // 金の大階段
 for(let k=0;k<9;k++){const y=206-k*7,w=250-k*18;R(320-w/2,y,w,7,k%2?'#4a3a2c':'#5a4634');R(320-w/2,y,w,2,GD[k%2?1:0])}
 // 浮く光輪
 for(let k=0;k<6;k++){const hx=150+k*68,hy=30+(k%3)*16;x.strokeStyle=GD[0];x.lineWidth=2;x.beginPath();x.ellipse(hx,hy,12,3,0,0,6.3);x.stroke();BF.gl(x,hx,hy,22,8,'rgba(255,220,150,.3)')}
 // 床：雲と金の大理石
 let g=x.createLinearGradient(0,206,0,360);g.addColorStop(0,'#4a3a3a');g.addColorStop(1,'#140c10');x.fillStyle=g;x.fillRect(0,206,640,154);R(0,206,640,2,GD[0]);
 x.strokeStyle='rgba(20,12,16,.6)';x.lineWidth=2;for(let k=-10;k<=10;k++){x.beginPath();x.moveTo(320+k*34,208);x.lineTo(320+k*130,360);x.stroke()}
 for(let k=0;k<24;k++){const cx=rn()*640,cy=214+rn()*30;x.fillStyle=k%2?'#5e5058':'#4c4048';x.beginPath();x.ellipse(cx,cy,30+rn()*40,6,0,0,6.3);x.fill()}
 BF.gl(x,320,240,240,30,'rgba(255,210,140,.25)');BF.vig(x,.6)};

// 叡智の花冠：蔓に覆われた天上の温室。白い花弁が舞い、緑金の光が差す。尖頭アーチの骨組みに蔓、床には根と苔、奥に巨大な花の窓
BFULL.hbloom=(x)=>{const R=(...a)=>BF.R(x,...a),rn=bgRng(622),VN=['#3a5a3a','#2a4430','#4e7448'],GD=['#b89a4a','#7a6430'];
 BF.sky(x,'#060a08','#122018','#1e2a20');
 BF.gl(x,320,90,280,180,'rgba(150,200,120,.25)');BF.gl(x,320,90,110,90,'rgba(220,240,180,.25)');
 // 奥の花の窓（花弁の放射）
 for(let k=0;k<16;k++){const a=k/16*6.283,c=Math.cos(a),s2=Math.sin(a);x.fillStyle=k%2?'#6e7a5e':'#4e5a44';x.beginPath();x.moveTo(320+c*14-s2*10,90+s2*14+c*10);x.lineTo(320+c*80,90+s2*80);x.lineTo(320+c*14+s2*10,90+s2*14-c*10);x.fill()}
 x.fillStyle='#b8b890';x.beginPath();x.arc(320,90,14,0,6.3);x.fill();BF.gl(x,320,90,40,40,'rgba(240,250,200,.35)');
 BF.rays(x,320,[[280,12,.14],[304,10,.2],[330,10,.18],[356,12,.14]],'rgba(220,255,190,A)',210);
 // 温室の骨組み：尖頭アーチ（金）に蔓が絡む
 for(const s of[-1,1])for(let k=0;k<3;k++){const ax=320+s*(110+k*80),w=60+k*14,top=60-k*12;x.strokeStyle=GD[k%2];x.lineWidth=4;x.beginPath();x.moveTo(ax-w/2,206);x.lineTo(ax-w/2,top+40);x.quadraticCurveTo(ax-w/2,top,ax,top-20);x.quadraticCurveTo(ax+w/2,top,ax+w/2,top+40);x.lineTo(ax+w/2,206);x.stroke();
  for(let j=0;j<14;j++){const py=206-j*12,px=ax-w/2+Math.sin(j*1.3+k)*4;x.fillStyle=VN[j%3];x.beginPath();x.ellipse(px,py,5,3,j,0,6.3);x.fill();x.beginPath();x.ellipse(ax+w/2+Math.sin(j*1.7)*4,py-6,5,3,-j,0,6.3);x.fill()}}
 // 垂れ下がる蔓と白い花
 for(let k=0;k<14;k++){const vx=40+k*44+rn()*10,ln=40+rn()*80;for(let y=0;y<ln;y+=4)R(vx+Math.sin(y*.1+k)*3,y,2,4,VN[k%3]);x.fillStyle='#e0dcc8';x.beginPath();x.arc(vx,ln,4,0,6.3);x.fill();R(vx-1,ln-1,2,2,'#c8a040')}
 // 床：苔と根、白い花弁
 let g=x.createLinearGradient(0,206,0,360);g.addColorStop(0,'#2a3a2a');g.addColorStop(1,'#0c140e');x.fillStyle=g;x.fillRect(0,206,640,154);R(0,206,640,2,'#5a7a4a');
 for(let k=0;k<16;k++){x.strokeStyle=k%2?'#3a3024':'#2a2418';x.lineWidth=3;x.beginPath();const sx=rn()*640;x.moveTo(sx,208);x.quadraticCurveTo(sx+rn()*80-40,260,sx+rn()*160-80,360);x.stroke()}
 for(let k=0;k<60;k++){const px=rn()*640,py=212+rn()*140;x.fillStyle=k%3?'rgba(90,140,80,.5)':'#d8d4c0';x.fillRect(BF.F(px),BF.F(py),k%3?4:4,2)}
 BF.gl(x,320,236,220,26,'rgba(200,240,170,.18)');BF.vig(x,.62)};

// 深淵の大公：堕ちた聖堂の地下の身廊。黒い大理石の柱が奥へ連なり、天井から金と黒の逆さの尖塔が垂れる。壁の縦の裂け目から赤い光が漏れ、床は黒い水鏡。左に倒れた天使像の首、右に傾いた柱
BFULL.hgiant=(x)=>{const R=(...a)=>BF.R(x,...a),rn=bgRng(647),GD=['#a8823a','#6a4e22'],MB=['#16101a','#221a28','#30263a'];
 BF.sky(x,'#030204','#0c0810','#140a12');
 // 奥の祭壇（崩れて赤く光る）
 BF.gl(x,330,150,140,70,'rgba(170,20,40,.45)');R(296,120,68,86,'#1c1218');for(let k=0;k<6;k++)R(298+k*11,110-((k*7)%14),9,12+((k*7)%14),'#1c1218');R(310,140,40,4,GD[1]);R(320,124,20,60,'#3a0c14');BF.gl(x,330,150,40,50,'rgba(255,60,70,.4)');
 // 柱の列（遠近で小さく）。柱頭は金
 for(const s of[-1,1])for(let k=5;k>=0;k--){const d=k/5,cx=330+s*(30+(1-d)*250),w=8+(1-d)*30,top=60-(1-d)*60,bot=150+(1-d)*58;R(cx-w/2,top,w,bot-top,MB[1+(k%2)]);R(cx-w/2,top,w*.25,bot-top,MB[2]);R(cx-w/2-3,top,w+6,4,GD[1]);R(cx-w/2-3,top,w+6,2,GD[0]);R(cx-w/2-3,bot-4,w+6,4,MB[0])}
 // 壁の縦の裂け目から漏れる赤い光
 for(const[cx,top,h]of[[150,40,90],[210,70,60],[460,60,80],[520,30,110]]){x.fillStyle='#ff2a3a';for(let y=0;y<h;y+=4)x.fillRect(BF.F(cx+((y*13)%5)-2),top+y,2,4);BF.gl(x,cx,top+h/2,20,h*.6,'rgba(220,30,50,.4)')}
 // 天井から垂れる逆さの尖塔（金と黒）
 for(const[cx,ln,w]of[[90,90,22],[200,60,16],[262,40,12],[400,46,12],[470,70,18],[580,100,24]]){x.fillStyle=MB[2];x.beginPath();x.moveTo(cx-w/2,0);x.lineTo(cx+w/2,0);x.lineTo(cx,ln);x.fill();x.fillStyle=GD[1];x.beginPath();x.moveTo(cx-w/2,0);x.lineTo(cx-w/2+3,0);x.lineTo(cx,ln);x.fill();for(let y=10;y<ln-10;y+=16)R(cx-(w/2)*(1-y/ln),y,w*(1-y/ln),2,GD[0])}
 // 鎖と吊られた檻
 for(const[cx,ln]of[[330,58],[240,30]]){for(let y=0;y<ln;y+=6)R(cx-2,y,4,4,y%12?GD[1]:'#3a2a2a');R(cx-10,ln,20,24,'#2a2026');for(let k=0;k<5;k++)R(cx-9+k*4,ln,2,24,GD[1]);R(cx-10,ln,20,2,GD[0]);R(cx-10,ln+22,20,2,GD[0])}
 // 倒れた天使像の首（左）と傾いた柱（右）
 x.fillStyle='#4a4048';x.beginPath();x.ellipse(70,192,34,22,-.3,0,6.3);x.fill();x.fillStyle='#5e5460';x.beginPath();x.ellipse(64,188,28,17,-.3,0,6.3);x.fill();R(52,184,10,3,'#1a1218');R(70,180,10,3,'#1a1218');R(60,194,14,3,'#2a2026');R(84,176,2,30,'#2a2026');x.strokeStyle='#7a1a2a';x.lineWidth=2;x.beginPath();x.ellipse(52,168,16,5,-.3,0,6.3);x.stroke();
 x.save();x.translate(588,206);x.rotate(.22);R(-14,-180,28,180,MB[2]);R(-14,-180,7,180,'#3e3448');R(-17,-184,34,5,GD[1]);x.restore();
 // 床：黒い水鏡（柱と赤い光が映る）
 let g=x.createLinearGradient(0,206,0,360);g.addColorStop(0,'#1a1218');g.addColorStop(1,'#050306');x.fillStyle=g;x.fillRect(0,206,640,154);R(0,206,640,2,GD[1]);
 for(const s of[-1,1])for(let k=0;k<6;k++){const d=k/5,cx=330+s*(30+(1-d)*250),w=8+(1-d)*30;x.fillStyle='rgba(60,46,70,.35)';x.fillRect(BF.F(cx-w/2),208,BF.F(w),BF.F(30+(1-d)*80))}
 for(const cx of[150,210,460,520]){x.fillStyle='rgba(220,30,50,.25)';for(let y=0;y<90;y+=6)x.fillRect(BF.F(cx-2+Math.sin(y*.3)*3),210+y,2,3)}
 BF.gl(x,330,226,120,18,'rgba(200,30,50,.3)');
 for(let k=0;k<14;k++){const y=214+k*10+k*k*.6;R(0,y,640,2,'rgba(80,60,90,'+(.14-k*.008).toFixed(3)+')')}
 for(let k=0;k<10;k++){const fx=rn()*640,fy=226+rn()*120;x.fillStyle='rgba(180,170,190,.5)';x.beginPath();x.ellipse(BF.F(fx),BF.F(fy),6+rn()*5,2,rn()*.6-.3,0,6.3);x.fill()}
 for(let k=0;k<30;k++)R(rn()*640,rn()*200,2,2,'rgba(255,80,100,.5)');
 BF.vig(x,.72)};
