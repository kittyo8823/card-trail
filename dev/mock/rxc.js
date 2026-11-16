// Ver3.90 レア攻撃カードごとの専用演出（ユーザー指定：名前に合った、カードごとに違う演出。暗転は使わない）
// RXC[カード名]=[長さ(秒),描く関数(f,p,X)]。p は 0〜1。X は道具（x,y 狙った敵の中心・es 全ての敵・px,py 自分）
const RXC={};
function rxX(f){const E=f.ev||(f.ev={}),c=(a,b,v)=>Math.max(a,Math.min(b,v));
 const X={x:f.x,y:f.y,es:f.ex.es&&f.ex.es.length?f.ex.es:[[f.x,f.y]],px:118,py:156,gy:208,E,c,
  ez:v=>{v=c(0,1,v);return v*v*(3-2*v)},ei:v=>{v=c(0,1,v);return v*v},eo:v=>{v=c(0,1,v);return 1-(1-v)*(1-v)},
  win:(p,a,b)=>c(0,1,(p-a)/(b-a)),
  once:(k,fn)=>{if(!E[k]){E[k]=1;fn()}},sh:n=>{shk=Math.max(shk,n)},
  add:fn=>{ctx.save();ctx.globalCompositeOperation='lighter';fn();ctx.restore()},
  G:(x,y,r,col,a)=>rxGlow(x,y,r,col,a),
  L:(x0,y0,x1,y1,w,col,a)=>{if(a<=0)return;ctx.save();ctx.globalAlpha=Math.min(1,a);ctx.lineCap='round';ln(x0,y0,x1,y1,w,col);ctx.restore()},
  R:(x,y,rx,ry,w,col,a,a0,a1)=>{if(a<=0||rx<=0)return;ctx.save();ctx.globalAlpha=Math.min(1,a);ctx.strokeStyle=col;ctx.lineWidth=w;ctx.beginPath();ctx.ellipse(x,y,rx,Math.max(.1,ry),0,a0||0,a1==null?6.3:a1);ctx.stroke();ctx.restore()},
  F:(pts,col,a)=>{if(a<=0)return;ctx.save();ctx.globalAlpha=Math.min(1,a);ctx.fillStyle=col;ctx.beginPath();pts.forEach((q,i)=>ctx[i?'lineTo':'moveTo'](q[0],q[1]));ctx.fill();ctx.restore()},
  S:(x,y,u,n,sd,c1,c2,sp)=>rxSpk(x,y,u,n,sd,c1,c2,sp),
  C:(x,y,R,a0,a1,w,col,a,cw)=>rxCres(x,y,R,a0,a1,w,col,a,cw),
  B:(x0,y0,x1,y1,sd,w,col,a)=>{if(a<=0)return;ctx.save();ctx.globalAlpha=Math.min(1,a);bolt(x0,y0,x1,y1,sd,w,col);ctx.restore()},
  Fl:(a,col)=>{if(a<=0)return;ctx.save();flash(a,col);ctx.restore()},
  // 光る線（白い芯つき）
  Bm:(x0,y0,x1,y1,w,col,a)=>{if(a<=0)return;ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=Math.min(1,a);ctx.lineCap='round';ln(x0,y0,x1,y1,w,col);ln(x0,y0,x1,y1,Math.max(1,w*.3),'#fff');ctx.restore()},
  // 細長い刃・槍（先が尖った菱形）
  Bl:(x,y,an,L,w,col,a)=>{if(a<=0)return;ctx.save();ctx.translate(x,y);ctx.rotate(an);ctx.globalAlpha=Math.min(1,a);ctx.fillStyle=col;ctx.beginPath();ctx.moveTo(L*.55,0);ctx.lineTo(0,-w/2);ctx.lineTo(-L*.45,0);ctx.lineTo(0,w/2);ctx.fill();ctx.fillStyle='#fff';ctx.globalAlpha*=.8;ctx.beginPath();ctx.moveTo(L*.5,0);ctx.lineTo(0,-w/6);ctx.lineTo(-L*.35,0);ctx.lineTo(0,w/6);ctx.fill();ctx.restore()}};
 return X}
function rxN(f,p){const d=RXC[f.ex.n];if(!d)return;ctx.save();ctx.globalAlpha=1;d[1](f,p,rxX(f));ctx.restore()}

/* ===== ユウキング ===== */
// 粉砕：上から巨大な光の塊が叩きつけられ、地面が割れて破片が飛ぶ
RXC['粉砕']=[1.3,(f,p,X)=>{const{x,y,gy}=X,u=X.ei(p/.16);
 if(p<.18)X.add(()=>{const h=40+u*(gy-60);ctx.globalAlpha=.85;const g=ctx.createLinearGradient(0,gy-h-40,0,gy);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'#ff7a3a');ctx.fillStyle=g;ctx.fillRect(x-46,gy-h-40,92,h+40);ctx.fillStyle='#fff';ctx.globalAlpha=.6;ctx.fillRect(x-10,gy-h,20,h)});
 if(p>=.16){X.once('h',()=>X.sh(16));const v=(p-.16)/.84;X.Fl(.5*(1-v/.15),'#fff6e0');X.add(()=>{X.G(x,gy-10,60+v*160,'#ff6a2a',1.1-v*1.3)});
  for(let k=0;k<9;k++){const an=Math.PI+k/8*Math.PI,L=(40+hs(k)*90)*X.eo(v*3);let px=x,py=gy;ctx.save();ctx.globalAlpha=Math.max(0,1-v*1.2);ctx.strokeStyle='#ffb070';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(px,py);for(let s=1;s<=4;s++){px=x+Math.cos(an)*L*s/4+(hs(k*7+s)-.5)*10;py=gy+Math.abs(Math.sin(an))*L*s/4*.18;ctx.lineTo(px,py)}ctx.stroke();ctx.restore()}
  for(let k=0;k<14;k++){const vx=(hs(k+3)-.5)*240,vy=-120-hs(k+5)*160,t=v*1.2,xx=x+vx*t,yy=gy+vy*t+300*t*t,s=3+hs(k)*5;if(yy>gy+4)continue;X.F([[xx-s,yy],[xx,yy-s],[xx+s*.8,yy-s*.2],[xx+s*.3,yy+s*.6]],k%2?'#5a4a40':'#8a6a50',1-v)}}}];
// 命刈りの鎌：巨大な鎌の弧が敵をまとめて刈り、赤い命の光が自分へ戻る
RXC['命刈りの鎌']=[1.6,(f,p,X)=>{const{es,px,py}=X,mx=es.reduce((s,e)=>s+e[0],0)/es.length,my=es.reduce((s,e)=>s+e[1],0)/es.length,u=X.ez(p/.3);
 if(p<.5){const a0=.25,a1=a0+u*2.6,fa=1-Math.max(0,p-.32)/.18;ctx.save();ctx.globalAlpha=fa;ctx.fillStyle='#4a0a12';ctx.beginPath();ctx.arc(mx,my-120,160,Math.max(a0,a1-.9),a1);ctx.arc(mx+Math.cos(a1-.45)*26,my-120+Math.sin(a1-.45)*26,150,a1,Math.max(a0,a1-.9),true);ctx.fill();ctx.restore();X.add(()=>{X.C(mx,my-120,160,Math.max(a0,a1-.9),a1,30,'#a01a2a',fa,0);X.C(mx,my-120,160,Math.max(a0,a1-.5),a1,12,'#ff5a6a',fa,1)})}
 if(p>.22)X.once('h',()=>X.sh(9));
 es.forEach((e,i)=>{const v=X.win(p,.22+i*.04,.5);if(v>0&&v<1)X.add(()=>X.G(e[0],e[1],30+v*50,'#c01a2a',1-v));
  for(let k=0;k<5;k++){const w=X.win(p,.45+i*.04+k*.03,.9+k*.02);if(w<=0||w>=1)continue;const cx=(e[0]+px)/2,cy=Math.min(e[1],py)-70-k*8,t=X.ez(w),xx=(1-t)*(1-t)*e[0]+2*(1-t)*t*cx+t*t*px,yy=(1-t)*(1-t)*e[1]+2*(1-t)*t*cy+t*t*py;X.add(()=>X.G(xx,yy,10,'#ff3a4a',1-w*.5))}});
 if(p>.85)X.add(()=>X.G(px,py,40,'#ff4a5a',(1-p)/.15))}];
// 貪食：上下から牙の列が敵に噛みつき、血の滴を吸い上げる
RXC['貪食']=[1.3,(f,p,X)=>{const{x,y,px,py}=X,o=p<.18?1-X.ei(p/.18):p<.35?0:X.ez((p-.35)/.2)*.4,a=p<.6?1:1-(p-.6)/.25;
 if(a>0)for(const s of[-1,1]){const yy=y+s*(14+o*60),pts=[[x-60,yy+s*28]];for(let k=0;k<=8;k++){const xx=x-56+k*14;pts.push([xx,yy+s*(k%2?-2:12)]);}pts.push([x+60,yy+s*28]);X.F(pts,'#3a0810',a);const t2=[];for(let k=0;k<=8;k++){const xx=x-56+k*14;t2.push([xx,yy+s*(k%2?-14:8)])}t2.push([x+56,yy+s*20],[x-56,yy+s*20]);X.F(t2,'#e8d8c8',a*.9)}
 if(p>.18){X.once('h',()=>X.sh(8));const v=(p-.18)/.82;X.add(()=>X.G(x,y,40+v*40,'#a01020',.9-v));for(let k=0;k<8;k++){const w=X.win(p,.35+k*.04,.75+k*.03);if(w<=0||w>=1)continue;const t=X.ez(w);X.add(()=>X.G(x+(px-x)*t,y+(py-y)*t-Math.sin(t*3.14)*50,8,'#ff2a3a',1))}}}];
// 盾の一撃・極：光の大盾が飛んでいき叩きつけ、砕けて破片が散る
RXC['盾の一撃・極']=[1.2,(f,p,X)=>{const{x,y,px,py}=X,u=X.ei(p/.2),sx=px+(x-30-px)*u,sy=py+(y-py)*u,shp=(cx,cy,s,a)=>X.F([[cx-14*s,cy-22*s],[cx+14*s,cy-22*s],[cx+16*s,cy+2*s],[cx,cy+26*s],[cx-16*s,cy+2*s]],'#ffb04a',a);
 if(p<.2){shp(sx,sy,1.4,.9);X.add(()=>{X.G(sx,sy,40,'#ff8a2a',.7);for(let k=1;k<4;k++)shp(sx-k*18,sy,1.3,.15)})}
 else{X.once('h',()=>X.sh(12));const v=(p-.2)/.8;X.add(()=>X.G(x-20,y,50+v*120,'#ffb04a',1-v*1.3));for(let k=0;k<10;k++){const an=hs(k+11)*6.28,d=v*(60+hs(k)*80),cx=x-30+Math.cos(an)*d,cy=y+Math.sin(an)*d+v*v*60,s=5+hs(k+2)*6,r=v*8+k;X.F([[cx+Math.cos(r)*s,cy+Math.sin(r)*s],[cx+Math.cos(r+2.2)*s,cy+Math.sin(r+2.2)*s],[cx+Math.cos(r+4)*s*.6,cy+Math.sin(r+4)*s*.6]],k%2?'#ffd08a':'#c87a2a',1-v)}}}];
// 巨人殺し：画面の天井から地面まで届く一本の縦の斬撃が、敵を真っ二つにする
RXC['巨人殺し']=[1.2,(f,p,X)=>{const{x,y,gy}=X,u=X.ez(p/.12);
 X.add(()=>{X.Bm(x,24,x,24+(gy+10-24)*u,10*(1-Math.max(0,p-.15)/.4),'#ff6a2a',1-Math.max(0,p-.2)/.4)});
 if(p>.12){X.once('h',()=>X.sh(10));const v=(p-.12)/.88;X.add(()=>{for(const s of[-1,1]){const g=ctx.createLinearGradient(x,0,x+s*80,0);g.addColorStop(0,'rgba(255,140,60,'+(.6*(1-v))+')');g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(Math.min(x,x+s*80*X.eo(v*2)),24,80*X.eo(v*2),gy-24)}});X.S(x,y,v/.6,16,5,'#ffb04a','#fff',150)}}];
// 灰の王：足元から炎が王冠のように立ち上り、灰が舞い上がる
RXC['灰の王']=[1.5,(f,p,X)=>{const{x,y,gy}=X,u=X.eo(p/.25),a=p<.6?1:1-(p-.6)/.4;
 for(let k=0;k<9;k++){const ox=(k-4)*13,h=(40+(k%2?20:50)+Math.sin(T*14+k)*8)*u,w=9;X.add(()=>{ctx.globalAlpha=a*.85;const g=ctx.createLinearGradient(0,gy,0,gy-h);g.addColorStop(0,'#ff5a1a');g.addColorStop(.6,'#a02a10');g.addColorStop(1,'rgba(40,10,0,0)');ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(x+ox-w,gy);ctx.quadraticCurveTo(x+ox-w*.4,gy-h*.6,x+ox,gy-h);ctx.quadraticCurveTo(x+ox+w*.4,gy-h*.6,x+ox+w,gy);ctx.fill()})}
 if(p>.2)X.once('h',()=>X.sh(7));for(let k=0;k<26;k++){const t=(p*1.3+hs(k))%1,xx=x+(hs(k+4)-.5)*120+Math.sin(t*8+k)*10,yy=gy-t*200;ctx.save();ctx.globalAlpha=a*Math.sin(t*3.14)*.8;ctx.fillStyle=k%3?'#8a8480':'#ff8a3a';ctx.fillRect(xx,yy,2,2);ctx.restore()}
 X.add(()=>X.G(x,gy-30,60+u*40,'#ff4a1a',a*.6))}];

/* ===== 坂井 ===== */
// 致死の連鎖：鎖が波打って敵へ伸び、巻きついて締め上げる
RXC['致死の連鎖']=[1.3,(f,p,X)=>{const{x,y,px,py}=X,u=X.ez(p/.25),lk=(cx,cy,an,a)=>X.R(cx,cy,5,2.6,2,'#9adfaa',a,0,6.3)||0;
 const n=22,ex=px+(x-px)*u,ey=py+(y-py)*u,a=p<.7?1:1-(p-.7)/.3;
 for(let k=0;k<n;k++){const t=k/n;if(t>u)break;const xx=px+(x-px)*t,yy=py+(y-py)*t+Math.sin(t*12-p*30)*10*(1-u*.7);ctx.save();ctx.translate(xx,yy);ctx.rotate(Math.atan2(y-py,x-px)+(k%2?1.57:0));ctx.globalAlpha=a;ctx.strokeStyle=k%2?'#5aa86a':'#b8f0c4';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(0,0,5,2.6,0,0,6.3);ctx.stroke();ctx.restore()}
 if(p>.25){const v=X.win(p,.25,.5),r=46-v*22;for(let k=0;k<16;k++){const an=k/16*6.28+p*4;ctx.save();ctx.translate(x+Math.cos(an)*r,y+Math.sin(an)*r*.6);ctx.rotate(an+(k%2?1.57:0));ctx.globalAlpha=a;ctx.strokeStyle=k%2?'#5aa86a':'#b8f0c4';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(0,0,5,2.6,0,0,6.3);ctx.stroke();ctx.restore()}
  if(v>=1){X.once('h',()=>X.sh(8));X.add(()=>X.G(x,y,50,'#3ad86a',a*.8))}}}];
// 無音の殺意：音もなく細い一線が走り、一拍おいて敵だけが白く切れる（控えめ）
RXC['無音の殺意']=[1.4,(f,p,X)=>{const{x,y}=X,u=X.ez(p/.08),an=-.35,L=170;
 X.L(x-Math.cos(an)*L,y-Math.sin(an)*L,x-Math.cos(an)*L+Math.cos(an)*2*L*u,y-Math.sin(an)*L+Math.sin(an)*2*L*u,1,'#e8ffe8',p<.4?.9:.9*(1-(p-.4)/.15));
 if(p>.45){X.once('h',()=>X.sh(5));const v=(p-.45)/.55;X.add(()=>{X.Bm(x-Math.cos(an)*60,y-Math.sin(an)*60,x+Math.cos(an)*60,y+Math.sin(an)*60,6*(1-v),'#58f08a',1-v);X.G(x,y,30+v*30,'#58f08a',.6*(1-v))})}}];
// 影縫い・千鳥：敵の影に短剣が千鳥（ジグザグ）に突き立ち、糸で縫い止める
RXC['影縫い・千鳥']=[1.3,(f,p,X)=>{const{x,gy}=X,n=7,pts=[];for(let k=0;k<n;k++)pts.push([x-54+k*18,gy+(k%2?8:-6)]);
 X.F([[x-70,gy],[x,gy-10],[x+70,gy],[x,gy+12]],'#081a10',.6*(1-Math.max(0,p-.75)/.25));
 pts.forEach((q,k)=>{const t=X.win(p,k*.05,k*.05+.08);if(t<=0)return;const yy=q[1]-60*(1-X.ei(t));X.Bl(q[0],yy-12,1.57,26,5,'#2a5a3a',1-Math.max(0,p-.8)/.2);if(t>=1)X.once('k'+k,()=>X.sh(2))});
 const m=Math.floor(X.c(0,n-1,(p-.05)/.05));ctx.save();ctx.globalAlpha=1-Math.max(0,p-.75)/.25;ctx.strokeStyle='#8af0a8';ctx.lineWidth=1.5;ctx.beginPath();for(let k=0;k<=m;k++)ctx[k?'lineTo':'moveTo'](pts[k][0],pts[k][1]);ctx.stroke();ctx.restore();
 if(p>.45)X.add(()=>X.G(x,gy,60,'#3ad86a',.5*(1-(p-.45)/.5)))}];
// 終幕：左右から幕が閉じ、隙間に一閃、幕が落ちる（派手）
RXC['終幕']=[1.7,(f,p,X)=>{const{x,y}=X,cl=p<.3?X.ez(p/.3):p<.55?1:1-X.ei((p-.55)/.2),dr=p>.55?X.ei((p-.55)/.3)*300:0;
 for(const s of[-1,1]){const w=330*cl;ctx.save();ctx.translate(0,dr);const x0=s<0?-10:650,x1=s<0?-10+w:650-w,g=ctx.createLinearGradient(x0,0,x1,0);g.addColorStop(0,'#2a0408');g.addColorStop(1,'#6a0a14');ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(x0,24);ctx.lineTo(x1,24);for(let k=0;k<=8;k++)ctx.lineTo(x1+s*Math.sin(k*1.3+T*3)*6*(1-cl*.5),24+k*30);ctx.lineTo(x0,264);ctx.fill();ctx.fillStyle='rgba(0,0,0,.3)';for(let k=1;k<7;k++){const xx=x0+(x1-x0)*k/7;ctx.fillRect(xx-2,24,4,240)}ctx.restore()}
 if(p>.32&&p<.6){X.once('h',()=>X.sh(14));const v=(p-.32)/.28;X.add(()=>{X.Bm(x-200,y+40,x+200,y-40,14*(1-v),'#58f08a',1-v);X.G(x,y,80*(1-v)+20,'#fff',1-v)})}}];

/* ===== 坪内丸 ===== */
// 斬鉄剣：画面を横切る完全な直線が一本。遅れて鉄を断つ火花が線に沿って走る
RXC['斬鉄剣']=[1.3,(f,p,X)=>{const{x,y}=X,an=.42,x0=x-Math.cos(an)*260,y0=y-Math.sin(an)*260,x1=x+Math.cos(an)*260,y1=y+Math.sin(an)*260,u=X.ez(p/.06);
 X.add(()=>X.Bm(x0,y0,x0+(x1-x0)*u,y0+(y1-y0)*u,p<.3?3:3*(1-(p-.3)/.3),'#cfe8ff',p<.3?1:1-(p-.3)/.3));
 if(p>.22){X.once('h',()=>X.sh(9));const v=(p-.22)/.78;for(let k=0;k<30;k++){const t=hs(k),sx=x0+(x1-x0)*(.3+t*.4),sy=y0+(y1-y0)*(.3+t*.4),an2=an+1.57*(k%2?1:-1)+(hs(k+3)-.5),d=v*(30+hs(k+5)*60);X.L(sx+Math.cos(an2)*d*.6,sy+Math.sin(an2)*d*.6+v*v*30,sx+Math.cos(an2)*d,sy+Math.sin(an2)*d+v*v*40,1.5,k%3?'#ffc070':'#fff',1-v)}
  X.add(()=>X.G(x,y,40,'#9ad0ff',.8*(1-v/.4)))}}];
// 一騎当千：四方八方から無数の斬撃が一瞬で重なり、最後に大きな一閃
RXC['一騎当千']=[1.4,(f,p,X)=>{const{x,y}=X;
 for(let k=0;k<14;k++){const t0=k*.035,v=X.win(p,t0,t0+.14);if(v<=0||v>=1)continue;const an=hs(k+21)*6.28,R=40+hs(k)*20;ctx.save();ctx.translate(x+Math.cos(an)*10,y+Math.sin(an)*10);ctx.rotate(an);X.add(()=>X.C(0,-R*.5,R,.3,.3+2.4*X.eo(v*2),9,'#7ec8ff',1-v,1));ctx.restore();if(v>.2)X.once('k'+k,()=>X.sh(3))}
 const v=X.win(p,.52,.85);if(v>0&&v<1){X.once('h',()=>X.sh(11));ctx.save();ctx.translate(x,y);ctx.rotate(-.2);X.add(()=>X.C(0,-60,120,.15,.15+2.8*X.eo(v*2),26,'#9ad8ff',1-v,1));ctx.restore();X.add(()=>X.G(x,y,60+v*80,'#7ec8ff',1-v))}}];
// 奥義・無間：幾重もの輪が限りなく敵へ縮み続け、最後に青黒い虚空がはじける
RXC['奥義・無間']=[1.6,(f,p,X)=>{const{x,y}=X;
 if(p<.6)for(let k=0;k<8;k++){const t=((p*2.2+k/8)%1),r=(1-t)*140;X.R(x,y,r,r*.62,1.5+t*2,k%2?'#7ec8ff':'#1a2a6a',Math.sin(t*3.14)*(1-p/.6*.3))}
 if(p>.55){X.once('h',()=>X.sh(13));const v=(p-.55)/.45;ctx.save();ctx.globalAlpha=1-v;const g=ctx.createRadialGradient(x,y,0,x,y,30+v*110);g.addColorStop(0,'#000');g.addColorStop(.7,'#0a1840');g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(x-150,y-150,300,300);ctx.restore();X.R(x,y,30+v*130,(30+v*130)*.6,3,'#9ad8ff',1-v);X.S(x,y,v/.7,20,9,'#7ec8ff','#fff',180)}}];
// 王者の一閃：黄金の幅広い光の帯が横一文字に敵を貫き、金の粒が舞う
RXC['王者の一閃']=[1.4,(f,p,X)=>{const{x,y,px}=X,u=X.ez(p/.14),xe=px+(660-px)*u,a=p<.35?1:1-(p-.35)/.35;
 X.add(()=>{const g=ctx.createLinearGradient(0,y-26,0,y+26);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(.5,'#ffd25a');g.addColorStop(1,'rgba(0,0,0,0)');ctx.globalAlpha=a*.85;ctx.fillStyle=g;ctx.fillRect(px,y-26*(1+(1-a)),xe-px,52*(1+(1-a)));ctx.fillStyle='#fff';ctx.globalAlpha=a;ctx.fillRect(px,y-3*a,xe-px,6*a)});
 if(p>.12){X.once('h',()=>X.sh(10));X.add(()=>X.G(x,y,60,'#ffe08a',a));for(let k=0;k<24;k++){const t=(p-.12)*1.2,xx=x-100+hs(k)*260,yy=y+(hs(k+1)-.5)*60-t*40*hs(k+2);ctx.save();ctx.globalAlpha=Math.max(0,1-t*1.2)*.9;ctx.fillStyle=k%2?'#ffd25a':'#fff2c0';ctx.fillRect(xx,yy,2,2);ctx.restore()}}}];
// 散華：花びらの嵐が全ての敵を吹き抜け、それぞれで花が散る
RXC['散華']=[1.6,(f,p,X)=>{const{es,px}=X;
 for(let k=0;k<46;k++){const t=X.win(p,hs(k)*.25,hs(k)*.25+.6);if(t<=0||t>=1)continue;const xx=px+t*560,yy=90+hs(k+1)*130+Math.sin(t*9+k)*14,r=t*12+k;ctx.save();ctx.translate(xx,yy);ctx.rotate(r);ctx.globalAlpha=Math.sin(t*3.14);ctx.fillStyle=k%3?'#e8a8c8':'#c8d8ff';ctx.beginPath();ctx.ellipse(0,0,4,2,0,0,6.3);ctx.fill();ctx.restore()}
 es.forEach((e,i)=>{const t0=.15+(e[0]-px)/560*.6,v=X.win(p,t0,t0+.4);if(v<=0||v>=1)return;X.once('h'+i,()=>X.sh(5));X.add(()=>X.G(e[0],e[1],30+v*40,'#e88ab8',1-v));for(let k=0;k<12;k++){const an=k/12*6.28,d=v*50;ctx.save();ctx.translate(e[0]+Math.cos(an)*d,e[1]+Math.sin(an)*d+v*v*30);ctx.rotate(an+v*6);ctx.globalAlpha=1-v;ctx.fillStyle=k%2?'#f0b8d0':'#fff';ctx.beginPath();ctx.ellipse(0,0,4,2,0,0,6.3);ctx.fill();ctx.restore()}})}];

/* ===== 名無し ===== */
// 禁書・終焉の頁：無数の頁が舞い上がって敵を取り囲み、紫の炎で一斉に燃え上がる
RXC['禁書・終焉の頁']=[1.8,(f,p,X)=>{const{es,px,py}=X;
 es.forEach((e,i)=>{for(let k=0;k<9;k++){const t=X.win(p,k*.02+i*.03,.4+k*.02),an=k/9*6.28+p*5,r=50-X.ez((p-.35)/.15)*20;let xx,yy;if(t<1){const q=X.ez(t);xx=px+(e[0]+Math.cos(an)*r-px)*q;yy=py-80*Math.sin(q*3.14)+(e[1]+Math.sin(an)*r*.6-py)*q}else{xx=e[0]+Math.cos(an)*r;yy=e[1]+Math.sin(an)*r*.6}
  const burn=X.win(p,.5+k*.01,.8);if(burn>=1)continue;ctx.save();ctx.translate(xx,yy);ctx.rotate(an+p*3);ctx.globalAlpha=t>0?1-burn:0;ctx.fillStyle=burn>0?'#c9a0ff':'#e8dcc0';ctx.fillRect(-5,-7,10,14);ctx.fillStyle='rgba(60,40,30,.5)';ctx.fillRect(-3,-4,6,1);ctx.fillRect(-3,-1,6,1);ctx.fillRect(-3,2,4,1);ctx.restore()}
  const v=X.win(p,.5,1);if(v>0){X.once('h'+i,()=>X.sh(8));X.add(()=>{X.G(e[0],e[1],40+v*60,'#9a4aff',1-v);for(let k=0;k<6;k++){const h=(50+hs(k+i)*40)*(1-v*.5);ctx.globalAlpha=(1-v)*.7;ctx.fillStyle='#7a3ad8';ctx.beginPath();ctx.moveTo(e[0]-30+k*12,e[1]+30);ctx.quadraticCurveTo(e[0]-26+k*12+Math.sin(T*12+k)*6,e[1]+30-h*.6,e[0]-24+k*12,e[1]+30-h);ctx.quadraticCurveTo(e[0]-20+k*12,e[1]+30-h*.5,e[0]-18+k*12,e[1]+30);ctx.fill()}})}})}];
// 隕星の頁：空から燃える隕石が尾を引いて落ち、着弾で爆ぜて土煙が上がる
RXC['隕星の頁']=[1.5,(f,p,X)=>{const{x,y,gy}=X,u=X.ei(p/.3),sx=x+220,sy=-40,mx=sx+(x-sx)*u,my=sy+(y-sy)*u;
 if(p<.3){for(let k=0;k<10;k++){const t=k/10;X.add(()=>X.G(mx+(sx-x)*t*.25,my+(sy-y)*t*.25,22*(1-t),k<3?'#ffe6a0':'#c060ff',.8*(1-t)))}X.add(()=>X.G(mx,my,16,'#fff',1))}
 else{X.once('h',()=>X.sh(15));const v=(p-.3)/.7;X.Fl(.4*(1-v/.12),'#fff0d0');X.add(()=>{X.G(x,y,50+v*150,'#ff9a4a',1-v*1.2);X.G(x,y,30+v*60,'#c060ff',.9-v)});X.R(x,gy,40+v*160,10+v*30,3,'#ffd8a0',1-v);
  for(let k=0;k<10;k++){const xx=x+(hs(k)-.5)*140,h=v*80*(.5+hs(k+2));ctx.save();ctx.globalAlpha=(1-v)*.6;ctx.fillStyle='#6a5a60';ctx.beginPath();ctx.ellipse(xx,gy-h*.5,12+v*14,8+h*.4,0,0,6.3);ctx.fill();ctx.restore()}}}];
// 魔力爆縮：周りの光が一点へ吸い込まれて潰れ、巨大な球となって弾ける
RXC['魔力爆縮']=[1.6,(f,p,X)=>{const{es}=X,mx=es.reduce((s,e)=>s+e[0],0)/es.length,my=es.reduce((s,e)=>s+e[1],0)/es.length;
 if(p<.45){for(let k=0;k<40;k++){const t=((p*2.5+hs(k))%1),an=hs(k+1)*6.28,r=(1-X.ei(t))*240;X.add(()=>X.L(mx+Math.cos(an)*r,my+Math.sin(an)*r*.7,mx+Math.cos(an)*(r+14),my+Math.sin(an)*(r+14)*.7,2,'#c9a0ff',t))}X.add(()=>X.G(mx,my,10+p*40,'#e0c0ff',p/.45))}
 else{X.once('h',()=>X.sh(16));const v=(p-.45)/.55;X.Fl(.5*(1-v/.1),'#f0e0ff');X.add(()=>{ctx.globalAlpha=1-v;const g=ctx.createRadialGradient(mx,my,0,mx,my,40+v*260);g.addColorStop(0,'rgba(255,255,255,.9)');g.addColorStop(.5,'rgba(160,90,255,.6)');g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(mx-320,my-320,640,640)});X.R(mx,my,40+v*260,(40+v*260)*.7,4*(1-v)+1,'#e8d0ff',1-v)}}];
// 終焉の儀：敵の足元に巨大な輪が描かれ、輪から黒紫の柱が噴き上がる
RXC['終焉の儀']=[1.7,(f,p,X)=>{const{es,gy}=X,mx=es.reduce((s,e)=>s+e[0],0)/es.length,W=Math.max(120,(es[es.length-1][0]-es[0][0])/2+90),u=X.ez(p/.3);
 X.R(mx,gy,W,24,2,'#c9a0ff',p<.75?1:1-(p-.75)/.25,-1.57,-1.57+6.3*u);X.R(mx,gy,W*.8,18,1.5,'#7a4ad8',p<.75?1:1-(p-.75)/.25,1.57,1.57+6.3*u);
 for(let k=0;k<12;k++){const an=k/12*6.28;if(k/12>u)break;X.L(mx+Math.cos(an)*W*.8,gy+Math.sin(an)*18,mx+Math.cos(an)*W,gy+Math.sin(an)*24,1.5,'#c9a0ff',p<.75?1:1-(p-.75)/.25)}
 if(p>.35)es.forEach((e,i)=>{const v=X.win(p,.35+i*.05,.95);if(v<=0||v>=1)return;X.once('h'+i,()=>X.sh(7));const h=X.eo(v*3)*200,w=26*(1-v*.5);ctx.save();ctx.globalAlpha=1-v;const g=ctx.createLinearGradient(e[0]-w,0,e[0]+w,0);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(.5,'#2a0a40');g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(e[0]-w,gy-h,w*2,h);ctx.restore();X.add(()=>X.Bm(e[0],gy,e[0],gy-h,3,'#a060ff',1-v))})}];

/* ===== ホーリー大輔 ===== */
// 発光の杖・極：頭上に緑の玉が昇り、全ての敵へ光線を撃ち下ろす
RXC['発光の杖・極']=[1.5,(f,p,X)=>{const{es,px}=X,ox=px+10,oy=50+(1-X.eo(p/.25))*60;
 X.add(()=>{X.G(ox,oy,30+Math.sin(T*20)*4,'#5aff7a',p<.8?1:(1-p)/.2);X.G(ox,oy,12,'#fff',p<.8?1:(1-p)/.2)});
 es.forEach((e,i)=>{const v=X.win(p,.28+i*.06,.75+i*.04);if(v<=0||v>=1)return;X.once('h'+i,()=>X.sh(6));X.Bm(ox,oy,e[0],e[1],8*(1-v),'#5aff7a',1-v);X.add(()=>X.G(e[0],e[1],30+v*50,'#5aff7a',1-v))})}];
// 徹夜の果て：敵の向こうの地平から朝日が昇り、白い朝の光が全てを焼く
RXC['徹夜の果て']=[1.8,(f,p,X)=>{const{x,y,gy}=X,u=X.eo(p/.5),sy=gy+40-u*110,a=p<.75?1:1-(p-.75)/.25;
 X.add(()=>{ctx.globalAlpha=a*.55;const g=ctx.createLinearGradient(0,gy-140,0,gy);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'#ff9a4a');ctx.fillStyle=g;ctx.fillRect(x-260,gy-140,520,140);X.G(x+30,sy,60+u*30,'#ffd27a',a);X.G(x+30,sy,24,'#fff',a)});
 for(let k=0;k<12;k++){const an=-3.14+k/11*3.14;X.add(()=>X.L(x+30+Math.cos(an)*40,sy+Math.sin(an)*40,x+30+Math.cos(an)*(80+u*160),sy+Math.sin(an)*(80+u*160),3,'#ffe0a0',a*u*.5))}
 if(p>.5){X.once('h',()=>X.sh(9));const v=(p-.5)/.5;X.Fl(.35*(1-v/.3),'#fff4e0');X.add(()=>X.G(x,y,40+v*60,'#ffd27a',1-v))}}];
// 肉体言語：地面をうねる重い衝撃の波が、全ての敵を順に突き上げる
RXC['肉体言語']=[1.5,(f,p,X)=>{const{es,px,gy}=X;
 for(let w=0;w<3;w++){const v=X.win(p,w*.08,w*.08+.55);if(v<=0||v>=1)continue;const xx=px+v*540;X.add(()=>{X.R(xx,gy,18+w*6,6,4-w,'#5aff7a',1-v*.6);ctx.globalAlpha=(1-v)*.6;const g=ctx.createLinearGradient(xx-60,0,xx,0);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'#5aff7a');ctx.fillStyle=g;ctx.fillRect(xx-60,gy-6,60,12)});if(w===0&&v>.05)X.once('s',()=>X.sh(6))}
 es.forEach((e,i)=>{const t0=(e[0]-px)/540*.55,v=X.win(p,t0,t0+.35);if(v<=0||v>=1)return;X.once('h'+i,()=>X.sh(9));for(let k=0;k<5;k++){const xx=e[0]+(k-2)*12,h=(1-Math.abs(k-2)/3)*60*Math.sin(v*3.14);X.F([[xx-6,gy],[xx,gy-h],[xx+6,gy]],'#6a7a60',1-v)}X.add(()=>X.G(e[0],gy-20,40,'#5aff7a',1-v))})}];
// 爆発的瞬発力：一瞬で踏み込む速さの筋が走り、着いた先で大爆発
RXC['爆発的瞬発力']=[1.3,(f,p,X)=>{const{x,y,px,py}=X,u=X.ei(p/.1);
 for(let k=0;k<10;k++){const yy=py-30+k*7,a=p<.25?1:1-(p-.25)/.2;X.add(()=>X.L(px+(x-px)*Math.max(0,u-.5-hs(k)*.3),yy,px+(x-px)*u,yy+(y-py)*u*.2,2,'#c8ffd0',a*.8))}
 if(p>.1){X.once('h',()=>X.sh(14));const v=(p-.1)/.9;X.Fl(.35*(1-v/.1),'#fff');X.add(()=>{X.G(x,y,40+v*170,'#ff9a3a',1.2-v*1.4);X.G(x,y,30+v*80,'#fff8d0',1-v*2)});X.R(x,y,30+v*180,(30+v*180)*.7,5*(1-v)+1,'#ffd08a',1-v);X.S(x,y,v/.6,24,4,'#ffb04a','#fff',220)}}];
// デンプシーロール：∞の字の残像を描きながら、左右から交互に連打が入る
RXC['デンプシーロール']=[1.6,(f,p,X)=>{const{x,y}=X,cx=x-60,cy=y+6;
 ctx.save();ctx.globalAlpha=p<.75?.7:.7*(1-(p-.75)/.25);ctx.strokeStyle='#8affa0';ctx.lineWidth=3;ctx.beginPath();const m=Math.min(1,p/.7)*6.28*2;for(let t=Math.max(0,m-4);t<=m;t+=.08){const xx=cx+Math.sin(t)*30,yy=cy+Math.sin(t*2)*12;ctx[t<=Math.max(0,m-4)+.01?'moveTo':'lineTo'](xx,yy)}ctx.stroke();ctx.restore();
 for(let k=0;k<8;k++){const t0=.08+k*.08,v=X.win(p,t0,t0+.18);if(v<=0||v>=1)continue;const s=k%2?1:-1,hx=x+s*14,hy=y-6+(k%3)*6;if(v>.05)X.once('k'+k,()=>X.sh(k===7?11:4));X.add(()=>{X.G(hx,hy,(k===7?40:20)+v*40,'#5aff7a',1-v);X.R(hx,hy,8+v*30,(8+v*30)*.7,2,'#fff',1-v)})}}];

/* ===== ネブラ ===== */
// 流星：無数の流れ星が斜めに降り注ぎ、いくつかが敵に当たる
RXC['流星']=[1.5,(f,p,X)=>{const{x,y}=X;
 for(let k=0;k<16;k++){const t0=hs(k)*.5,v=X.win(p,t0,t0+.3);if(v<=0||v>=1)continue;const hit=k%3===0,tx=hit?x+(hs(k+1)-.5)*40:x+(hs(k+1)-.5)*400,ty=hit?y:200+hs(k+2)*20,sx=tx+180,sy=ty-260,mx=sx+(tx-sx)*v,my=sy+(ty-sy)*v;X.Bm(mx+(sx-tx)*.3,my+(sy-ty)*.3,mx,my,4,k%2?'#5ab8ff':'#ffe14a',.9);X.add(()=>X.G(mx,my,10,k%2?'#8ad0ff':'#fff0a0',1));if(v>.9&&hit){X.once('k'+k,()=>X.sh(5))}}
 for(let k=0;k<16;k+=3){const v=X.win(p,hs(k)*.5+.3,hs(k)*.5+.6);if(v>0&&v<1)X.add(()=>X.G(x+(hs(k+1)-.5)*40,y,20+v*40,'#7ad0ff',1-v))}}];
// 雷霆：空が白く光り、巨大な一本の雷が敵を撃ち抜く（派手）
RXC['雷霆']=[1.3,(f,p,X)=>{const{x,y,gy}=X;
 if(p<.12)X.Fl(.15+Math.sin(p*120)*.1,'#d8ecff');
 if(p>.1){X.once('h',()=>X.sh(16));const v=(p-.1)/.9;X.Fl(.6*(1-v/.12),'#fff');for(let r=0;r<3;r++)X.add(()=>{const sx=x+(r-1)*70+(r===1?0:(hs(r)-.5)*30);X.B(sx,-10,x,gy-10,7+r*3,(r===1?14:6)*(1-v),'#5ab8ff',1-v*1.3);X.B(sx,-10,x,gy-10,7+r*3,(r===1?5:2)*(1-v),'#fff',1-v*1.3)});X.add(()=>X.G(x,gy-20,60+v*120,'#5ab8ff',1-v));X.R(x,gy,30+v*160,8+v*24,3,'#cfe8ff',1-v)}}];
// 核の暴走：敵の上に不安定な核が現れて脈打ちながら膨らみ、閃光とともに爆発する
RXC['核の暴走']=[1.9,(f,p,X)=>{const{x,y}=X;
 if(p<.5){const r=8+X.ei(p/.5)*30+Math.sin(T*(30+p*60))*4*p*2;X.add(()=>{X.G(x,y,r*2.2,'#ffe14a',.6+p);X.G(x,y,r,'#fff',.9)});for(let k=0;k<3;k++)X.R(x,y,r+8+k*6,(r+8+k*6)*.4,1.5,'#5ab8ff',.6,T*4+k,T*4+k+4)}
 else{X.once('h',()=>X.sh(18));const v=(p-.5)/.5;X.Fl(.7*(1-v/.15),'#fffce0');X.add(()=>{X.G(x,y,60+v*240,'#ffd04a',1.2-v*1.3);X.G(x,y-v*80,40+v*60,'#ff8a3a',.8-v)});X.R(x,y+20,40+v*300,10+v*60,4*(1-v)+1,'#fff0c0',1-v);X.S(x,y,v/.7,30,13,'#ffe14a','#fff',260)}}];

/* ===== セレス ===== */
// 嘆きの叫び：自分から青白い声の波が幾重にも広がり、全ての敵を揺さぶる
RXC['嘆きの叫び']=[1.6,(f,p,X)=>{const{es,px,py}=X;
 for(let k=0;k<6;k++){const v=X.win(p,k*.07,k*.07+.6);if(v<=0||v>=1)continue;const r=30+v*560;ctx.save();ctx.globalAlpha=(1-v)*.7;ctx.strokeStyle=k%2?'#c8d4ff':'#fff';ctx.lineWidth=3*(1-v)+1;ctx.beginPath();for(let a=-.7;a<=.7;a+=.04){const rr=r+Math.sin(a*20+T*30)*4;ctx[a<=-.69?'moveTo':'lineTo'](px+Math.cos(a)*rr,py+Math.sin(a)*rr*.6)}ctx.stroke();ctx.restore()}
 es.forEach((e,i)=>{const t0=(e[0]-px)/560*.6,v=X.win(p,t0,t0+.4);if(v<=0||v>=1)return;X.once('h'+i,()=>X.sh(6));X.add(()=>X.G(e[0]+Math.sin(T*60)*3,e[1],30+v*30,'#a8b8ff',1-v))})}];
// 根絶：霊騎士の槍が何度も突き込まれ、光の槍の跡が残る
RXC['根絶']=[1.4,(f,p,X)=>{const{x,y,px,py}=X;
 for(let k=0;k<5;k++){const t0=k*.1,v=X.win(p,t0,t0+.22);if(v<=0||v>=1)continue;const yo=(k%3-1)*10,ex=x-20+X.eo(v*3)*30;X.Bl(px+40+(ex-px-40)*X.eo(v*2.5),y+yo,0,90,8,'#c8d4ff',1-v);if(v>.3)X.once('k'+k,()=>X.sh(4));X.add(()=>X.G(x,y+yo,20,'#e0e8ff',(1-v)*.8))}}];
// 吊るす：天井から白い縄が降りて敵に絡み、きつく吊り上げる
RXC['吊るす']=[1.6,(f,p,X)=>{const{x,y}=X,u=X.eo(p/.3),ty=y-30,top=24,lift=p>.4?X.ez((p-.4)/.2)*8:0,a=p<.8?1:1-(p-.8)/.2;
 ctx.save();ctx.globalAlpha=a;ctx.strokeStyle='#d8dcc8';ctx.lineWidth=2.5;ctx.beginPath();ctx.moveTo(x,top);for(let k=1;k<=10;k++){const t=k/10;ctx.lineTo(x+Math.sin(t*6+T*4)*4*(1-u),top+(ty-lift-top)*t*u)}ctx.stroke();ctx.restore();
 if(p>.3){const v=X.win(p,.3,.45);X.R(x,ty-lift+8,18-v*4,8,3,'#d8dcc8',a);X.once('h',()=>X.sh(5));if(p>.4)X.add(()=>X.G(x,ty,30,'#c8d4ff',(1-X.win(p,.4,.8))*.8))}}];
// 悲惨：狙った敵から黒い亀裂のような筋が他の敵へ伸び、灰色の霧が広がる
RXC['悲惨']=[1.6,(f,p,X)=>{const{x,y,es}=X;
 X.add(()=>X.G(x,y,30+p*30,'#8a7aa8',.7*(1-p)));
 es.forEach((e,i)=>{if(Math.abs(e[0]-x)<4)return;const v=X.win(p,.1,.5);ctx.save();ctx.globalAlpha=p<.75?.9:.9*(1-(p-.75)/.25);ctx.strokeStyle='#3a2a4a';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(x,y);for(let k=1;k<=12;k++){const t=k/12;if(t>v)break;ctx.lineTo(x+(e[0]-x)*t+(hs(k+i*13)-.5)*14,y+(e[1]-y)*t+(hs(k+i*13+5)-.5)*14)}ctx.stroke();ctx.strokeStyle='#a898c8';ctx.lineWidth=1;ctx.stroke();ctx.restore();if(v>=1){X.once('h'+i,()=>X.sh(3));for(let k=0;k<6;k++){ctx.save();ctx.globalAlpha=(1-X.win(p,.5,1))*.35;ctx.fillStyle='#6a5a7a';ctx.beginPath();ctx.ellipse(e[0]+(hs(k+i)-.5)*40,e[1]+(hs(k+i+3)-.5)*40-p*20,14,9,0,0,6.3);ctx.fill();ctx.restore()}}})}];
// 魂の嵐：青白い魂の火が渦を巻いて敵を取り囲み、一斉に飛び込む
RXC['魂の嵐']=[1.6,(f,p,X)=>{const{x,y}=X;
 for(let k=0;k<14;k++){const an=k/14*6.28+p*12,r=p<.6?70-p*30:Math.max(0,52*(1-X.ei((p-.6)/.15))),xx=x+Math.cos(an)*r,yy=y+Math.sin(an)*r*.6;if(p>.75)continue;X.add(()=>{X.G(xx,yy,9,'#a8c8ff',.9);ctx.globalAlpha=.4;ctx.fillStyle='#e8f0ff';ctx.beginPath();ctx.moveTo(xx-3,yy);ctx.quadraticCurveTo(xx-Math.sin(an)*12,yy+Math.cos(an)*12*.6,xx+3,yy);ctx.fill()})}
 if(p>.72){X.once('h',()=>X.sh(10));const v=(p-.72)/.28;X.add(()=>X.G(x,y,40+v*90,'#c8d8ff',1-v));X.S(x,y,v,18,17,'#c8d4ff','#fff',160)}}];
// 握り潰す：見えない力の輪が敵をぎりぎりと締めつけ、最後に握り潰すように弾ける
RXC['握り潰す']=[1.5,(f,p,X)=>{const{x,y}=X;
 if(p<.55){const v=X.ez(p/.55),r=80-v*46+Math.sin(T*50)*2*v;for(let k=0;k<5;k++){const an=k/5*6.28+v*1.2;X.R(x,y,r,r*.75,4,'#c8d4ff',.4+v*.5,an,an+.9)}X.add(()=>X.G(x,y,r,'#8a9ad8',.3*v))}
 else{X.once('h',()=>X.sh(14));const v=(p-.55)/.45;X.add(()=>X.G(x,y,30+v*100,'#e0e8ff',1-v));for(let k=0;k<10;k++){const an=k/10*6.28,d=20+v*80;X.L(x+Math.cos(an)*d*.5,y+Math.sin(an)*d*.4,x+Math.cos(an)*d,y+Math.sin(an)*d*.75,3,'#c8d4ff',1-v)}}}];
// 時は満ちた：敵を囲む時の環に刻みが一つずつ灯り、満ちた瞬間に鐘のような光の輪が鳴る
RXC['時は満ちた']=[1.8,(f,p,X)=>{const{x,y}=X,n=12,u=X.c(0,1,p/.6),R=56;
 X.R(x,y,R,R*.62,1.5,'#8a94b8',p<.85?.7:.7*(1-(p-.85)/.15));
 for(let k=0;k<n;k++){const an=-1.57+k/n*6.28,on=k/n<u,cx=x+Math.cos(an)*R,cy=y+Math.sin(an)*R*.62;X.L(cx,cy,x+Math.cos(an)*(R-8),y+Math.sin(an)*(R-8)*.62,on?3:1.5,on?'#ffffff':'#6a7490',p<.85?1:1-(p-.85)/.15);if(on)X.add(()=>X.G(cx,cy,8,'#c8d4ff',.6*(p<.85?1:0)))}
 const ha=-1.57+u*6.28;X.L(x,y,x+Math.cos(ha)*(R-12),y+Math.sin(ha)*(R-12)*.62,2.5,'#e8ecff',p<.85?1:0);
 if(p>.6){X.once('h',()=>X.sh(9));const v=(p-.6)/.4;for(let k=0;k<3;k++){const w=X.win(v,k*.12,k*.12+.6);X.R(x,y,R+w*120,(R+w*120)*.62,3*(1-w),'#e8ecff',1-w)}X.add(()=>X.G(x,y,50,'#fff',1-v))}}];
// 百の槍：空から無数の光の槍が雨のように敵へ降り注ぐ
RXC['百の槍']=[1.7,(f,p,X)=>{const{es}=X;
 for(let k=0;k<40;k++){const t0=hs(k)*.6,v=X.win(p,t0,t0+.14),e=es[k%es.length],tx=e[0]+(hs(k+2)-.5)*50,ty=e[1]+(hs(k+3)-.5)*30,an=1.25+(hs(k+4)-.5)*.3,L=320,sx=tx-Math.cos(an)*L,sy=ty-Math.sin(an)*L;if(v<=0)continue;if(v<1)X.Bl(sx+(tx-sx)*v,sy+(ty-sy)*v,an,40,4,'#c8d4ff',1);else{const w=X.win(p,t0+.14,t0+.4);if(w<1){X.Bl(tx-Math.cos(an)*14,ty-Math.sin(an)*14,an,40,4,'#c8d4ff',1-w);X.once('k'+k,()=>X.sh(2))}}}}];

/* ===== 無色・協力 ===== */
// 大逆転：画面の色が一瞬反転し、渦が逆回りに巻き戻って一撃
RXC['大逆転']=[1.4,(f,p,X)=>{const{x,y}=X;
 if(p<.3){ctx.save();ctx.globalCompositeOperation='difference';ctx.globalAlpha=Math.sin(p/.3*3.14)*.9;ctx.fillStyle='#fff';ctx.fillRect(-20,-20,680,400);ctx.restore()}
 for(let k=0;k<3;k++){const r=30+k*24;X.R(x,y,r,r*.6,2,'#ffe14a',p<.6?.8:.8*(1-(p-.6)/.3),-p*14-k,-p*14-k+3.5)}
 if(p>.3){X.once('h',()=>X.sh(12));const v=(p-.3)/.7;X.add(()=>X.G(x,y,40+v*120,'#ffd25a',1-v));X.S(x,y,v/.6,20,23,'#ffe14a','#fff',180)}}];
// 共鳴：敵と敵のあいだに震える光の線が張られ、共に鳴り響いて弾ける
RXC['共鳴']=[1.6,(f,p,X)=>{const{es,px,py}=X,pts=[[px,py],...es];
 for(let i=0;i<pts.length-1;i++){const a=pts[i],b=pts[i+1],v=X.win(p,i*.08,i*.08+.2);if(v<=0)continue;ctx.save();ctx.globalAlpha=p<.75?.9:.9*(1-(p-.75)/.25);ctx.strokeStyle='#ffe6a0';ctx.lineWidth=2;ctx.beginPath();for(let t=0;t<=v;t+=.02){const xx=a[0]+(b[0]-a[0])*t,yy=a[1]+(b[1]-a[1])*t+Math.sin(t*30-T*40)*6*Math.sin(t*3.14);ctx[t?'lineTo':'moveTo'](xx,yy)}ctx.stroke();ctx.restore()}
 es.forEach((e,i)=>{const v=X.win(p,.45+i*.04,.9);if(v<=0||v>=1)return;X.once('h'+i,()=>X.sh(6));for(let k=0;k<3;k++){const w=X.win(v,k*.15,k*.15+.6);X.R(e[0],e[1],10+w*60,(10+w*60)*.7,2,'#ffe6a0',1-w)}X.add(()=>X.G(e[0],e[1],30,'#ffd25a',1-v))})}];
