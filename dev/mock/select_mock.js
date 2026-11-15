// キャラ選択画面の見本3案（ゲームには入れていない）。撮影: node dev/mock/select_mock_shot.js 出力先.png
// 共通の部品：キャラを足元の中心 (cx,gy) に倍率 sc で描く／顔の切り抜き
const smC=(c,cx,gy,sc)=>{ctx.save();if(c.s==='neb'){ctx.translate(cx,gy);ctx.scale(sc,sc);nebPaint(ctx,0,0,T,{})}else if(c.s==='seres'){ctx.translate(cx,gy);ctx.scale(sc*.75,sc*.75);serDraw(-20,0,{},{kn:1,knm:1},1)}else{const im=SPR[c.s],w=im.bw||im.width;ctx.imageSmoothingEnabled=false;ctx.drawImage(im,Math.round(cx-w*sc/2-(im.ox||0)*sc),Math.round(gy-ftY(im,c.s)*sc),Math.round(im.width*sc),Math.round(im.height*sc))}ctx.restore()};
const smFace=(q,x,y,w,h,a)=>{const pi=SPR[q.s+'_b']||SPR[q.s],sh=pi.height*.5,sw=Math.min(pi.width,sh*w/h);ctx.save();ctx.globalAlpha=a;ctx.imageSmoothingEnabled=false;ctx.drawImage(pi,Math.max(0,(pi.width-sw)/2),0,sw,sh,x,y,w,h);ctx.restore()};
const smGrad=(x0,y0,x1,y1,cs)=>{const g=ctx.createLinearGradient(x0,y0,x1,y1);cs.forEach((c,i)=>g.addColorStop(i/(cs.length-1),c));return g};
const smPoly=(pts,f)=>{ctx.fillStyle=f;ctx.beginPath();pts.forEach(p=>ctx.lineTo(p[0],p[1]));ctx.closePath();ctx.fill()};
const smHeart=(x,y,c)=>{ctx.fillStyle=c;for(const[a,b,w]of[[1,0,2],[4,0,2],[0,1,7],[0,2,7],[1,3,5],[2,4,3],[3,5,1]])ctx.fillRect(x+a*2,y+b*2,w*2,2)};
const smAsc=(x,y,w,c)=>{const ac=ASC?'#ff6a6a':'#9a92c8';ctx.fillStyle='rgba(10,8,22,.8)';ctx.fillRect(x,y,w,30);ctx.fillStyle=ac;ctx.fillRect(x,y,w,1);ctx.fillRect(x,y+29,w,1);txt('◀',x+14,y+21,ac,'center',13);txt('▶',x+w-14,y+21,ac,'center',13);txt(ASC?'アセンション '+ASC:'アセンションなし',x+w/2-40,y+15,'#e8e4ff','center',12);txt('標準の難易度',x+w/2-40,y+26,'#8a82b8','center',8);for(let k=0;k<=10;k++){ctx.fillStyle=k===0?'#8a82b8':'#3a3458';ctx.fillRect(x+w/2+16+k*10,y+12,7,5)}};
const smGo=(x,y,w,c)=>{const col=c.col||'#8a7aa8';ctx.fillStyle=col;smPoly([[x+10,y],[x+w,y],[x+w-10,y+30],[x,y+30]],col);ctx.fillStyle='rgba(255,255,255,.25)';smPoly([[x+10,y],[x+w,y],[x+w-2,y+6],[x+8,y+6]],'rgba(255,255,255,.25)');txt('出発する',x+w/2,y+21,'#fff','center',15)};
window.SELV={
// 案A 肖像の回廊：下に大きな肖像の札を横一列。選んだ札は持ち上がって光る。上は左にキャラ、右に情報
A(){const L=CHV(),c=CH[L[SEL]],col=c.col||'#8a7aa8';ctx.fillStyle='#07050d';ctx.fillRect(0,0,640,360);
 {const g=ctx.createRadialGradient(170,200,10,170,200,260);g.addColorStop(0,col+'55');g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(0,0,640,360)}
 ctx.fillStyle='rgba(255,255,255,.04)';smPoly([[120,0],[220,0],[300,240],[40,240]],'rgba(255,255,255,.045)');
 ctx.fillStyle='rgba(0,0,0,.5)';ctx.beginPath();ctx.ellipse(170,236,80,10,0,0,6.3);ctx.fill();smC(c,170,236,1.25);
 // 情報（右上）：大きな名前、色の細い線、HP・得意・レリック・説明
 txt('CHARACTER '+(SEL+1)+' / '+L.length,350,46,col,'left',10);txt(c.n,350,82,'#fff','left',30);ctx.fillStyle=smGrad(350,0,630,0,[col,col+'00']);ctx.fillRect(350,92,270,2);
 smHeart(350,104,'#e8505b');txt(String(c.hp),372,116,'#ff9a9a','left',14);txt(c.key.replace('得意：',''),412,116,'#cfc8ee','left',10);
 ctx.drawImage(rIcon(c.rel),350,126,26,26);txt(RL[c.rel][0],384,138,'#ffd23f','left',12);txt(RL[c.rel][1],384,151,'#a8a0c8','left',9);
 wrap(c.st,24).forEach((l,i)=>txt(l,350,176+i*15,'#e8e4ff','left',11));txt(c.dkt,350,224,'#8a82b8','left',8);
 // 肖像の札：全員を下に横一列（1枚 78×64）
 const n=L.length,w=78,gap=8,x0=Math.round(320-(n*w+(n-1)*gap)/2);L.forEach((j,i)=>{const q=CH[j],on=i===SEL,x=x0+i*(w+gap),y=on?246:252,h=on?66:60,qc=q.col||'#8a7aa8';
  if(on){const g=ctx.createRadialGradient(x+w/2,y+h/2,4,x+w/2,y+h/2,60);g.addColorStop(0,qc+'66');g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(x-30,y-30,w+60,h+60)}
  ctx.fillStyle='#08060f';ctx.fillRect(x-2,y-2,w+4,h+4);ctx.fillStyle=on?qc:'#2a2440';ctx.fillRect(x-1,y-1,w+2,h+2);ctx.fillStyle=smGrad(0,y,0,y+h,['#1c1830','#0c0a16']);ctx.fillRect(x,y,w,h);
  smFace(q,x+4,y+3,w-8,h-18,on?1:.5);ctx.fillStyle='rgba(6,4,12,.85)';ctx.fillRect(x,y+h-15,w,15);txt(q.n.length>5?q.n.slice(0,5):q.n,x+w/2,y+h-4,on?'#fff':'#8a82b8','center',9);if(on){ctx.fillStyle=qc;ctx.fillRect(x,y+h-15,w,1)}});
 txt('◀ 戻る',28,24,'#cfc8ee','left',12);txt('？キャラ説明',28,342,'#9adfa8','left',11);smAsc(146,320,370,c);smGo(526,320,100,c)},
// 案B 斜めの斬撃：キャラの色の太い斜めの帯で画面を割り、背景に大きな名前の影。情報は斜めの暗い板。仲間は右上に斜めの札で並ぶ
B(){const L=CHV(),c=CH[L[SEL]],col=c.col||'#8a7aa8';ctx.fillStyle=smGrad(0,0,0,360,['#0a0812','#120e1e','#06050a']);ctx.fillRect(0,0,640,360);
 smPoly([[150,0],[330,0],[200,360],[20,360]],col+'2a');smPoly([[300,0],[338,0],[208,360],[170,360]],col+'55');smPoly([[334,0],[342,0],[212,360],[204,360]],col+'cc');
 ctx.save();ctx.globalAlpha=.07;txt(c.n,30,300,'#ffffff','left',110);ctx.restore();
 for(let k=0;k<22;k++){const t=(T*.12+k*.137)%1;ctx.globalAlpha=.5*Math.sin(t*3.14);ctx.fillStyle=c.lt||'#fff';ctx.fillRect(40+((k*73)%260),330-t*300,2,2)}ctx.globalAlpha=1;
 ctx.fillStyle='rgba(0,0,0,.5)';ctx.beginPath();ctx.ellipse(170,300,92,12,0,0,6.3);ctx.fill();smC(c,170,300,1.45);
 // 斜めの情報板
 smPoly([[372,72],[630,72],[622,300],[348,300]],'rgba(8,6,16,.82)');smPoly([[372,72],[630,72],[629,76],[371,76]],col);
 txt(c.n,384,112,'#fff','left',30);txt(c.key.replace('得意：','得意　'),386,132,c.lt||'#cfc8ee','left',10);
 smHeart(386,146,'#e8505b');txt('HP '+c.hp,406,158,'#ff9a9a','left',13);
 ctx.fillStyle='rgba(255,255,255,.06)';ctx.fillRect(382,170,234,34);ctx.drawImage(rIcon(c.rel),386,174,26,26);txt(RL[c.rel][0],418,186,'#ffd23f','left',12);txt(RL[c.rel][1],418,199,'#a8a0c8','left',9);
 wrap(c.st,22).forEach((l,i)=>txt(l,382,226+i*15,'#e8e4ff','left',11));txt(c.dkt,380,290,'#8a82b8','left',8);
 // 仲間：右上に斜めの札
 L.forEach((j,i)=>{const q=CH[j],on=i===SEL,x=360+i*38,y=on?16:20,qc=q.col||'#8a7aa8';smPoly([[x+8,y],[x+40,y],[x+32,y+40],[x,y+40]],on?qc:'#2a2440');smPoly([[x+9,y+2],[x+38,y+2],[x+31,y+38],[x+2,y+38]],'#100c1c');ctx.save();ctx.beginPath();ctx.moveTo(x+9,y+2);ctx.lineTo(x+38,y+2);ctx.lineTo(x+31,y+38);ctx.lineTo(x+2,y+38);ctx.closePath();ctx.clip();smFace(q,x+2,y+2,36,36,on?1:.45);ctx.restore()});
 txt('◀ 戻る',22,28,'#cfc8ee','left',12);txt('？キャラ説明',22,342,'#9adfa8','left',11);smAsc(146,320,370,c);smGo(526,320,100,c)},
// 案C 紋章の舞台：中央に回る紋章の円とキャラ。名前は上の中央に大きく、左に能力、右に説明。仲間は下に丸いメダルで弧を描く
C(){const L=CHV(),c=CH[L[SEL]],col=c.col||'#8a7aa8';ctx.fillStyle='#06050b';ctx.fillRect(0,0,640,360);
 {const g=ctx.createRadialGradient(320,170,10,320,170,240);g.addColorStop(0,col+'40');g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(0,0,640,360)}
 // 紋章：二重の輪・回る刻み・中の星形の線
 ctx.save();ctx.translate(320,168);ctx.strokeStyle=col+'aa';ctx.lineWidth=2;ctx.beginPath();ctx.arc(0,0,92,0,6.3);ctx.stroke();ctx.strokeStyle=col+'55';ctx.lineWidth=1;ctx.beginPath();ctx.arc(0,0,82,0,6.3);ctx.stroke();ctx.beginPath();ctx.arc(0,0,60,0,6.3);ctx.stroke();
 ctx.rotate(T*.15);for(let k=0;k<36;k++){const a=k/36*6.283;ctx.fillStyle=k%3?col+'88':col;ctx.fillRect(Math.cos(a)*87-1,Math.sin(a)*87-1,k%3?2:3,k%3?2:3)}
 ctx.rotate(-T*.3);ctx.strokeStyle=col+'44';ctx.beginPath();for(let k=0;k<6;k++){const a=k/6*6.283*2;ctx.lineTo(Math.cos(a)*60,Math.sin(a)*60)}ctx.closePath();ctx.stroke();ctx.restore();
 ctx.fillStyle=col+'33';ctx.beginPath();ctx.ellipse(320,262,96,14,0,0,6.3);ctx.fill();ctx.strokeStyle=col+'88';ctx.beginPath();ctx.ellipse(320,262,96,14,0,0,6.3);ctx.stroke();smC(c,320,262,1.2);
 // 名前（上の中央、両脇に飾り線）
 txt(c.n,320,52,'#fff','center',28);ctx.fillStyle=smGrad(150,0,300,0,[col+'00',col]);ctx.fillRect(150,42,110,1);ctx.fillStyle=smGrad(380,0,490,0,[col,col+'00']);ctx.fillRect(380,42,110,1);txt(c.key.replace('得意：',''),320,70,c.lt||'#cfc8ee','center',10);
 // 左：HPとレリック／右：説明と初期デッキ
 smHeart(30,116,'#e8505b');txt('HP '+c.hp,52,128,'#ff9a9a','left',14);ctx.drawImage(rIcon(c.rel),30,142,28,28);txt(RL[c.rel][0],64,154,'#ffd23f','left',12);wrap(RL[c.rel][1],12).forEach((l,i)=>txt(l,64,168+i*12,'#a8a0c8','left',9));
 wrap(c.st,13).forEach((l,i)=>txt(l,452,116+i*15,'#e8e4ff','left',11));txt('初期デッキ',452,206,'#8a82b8','left',9);wrap(c.dkt,16).forEach((l,i)=>txt(l,452,220+i*12,'#a8a0c8','left',9));
 txt('◀',196,176,c.lt||'#fff','center',26);txt('▶',444,176,c.lt||'#fff','center',26);
 // 仲間：下の弧に丸いメダル
 const n=L.length;L.forEach((j,i)=>{const q=CH[j],on=i===SEL,u=(i-(n-1)/2),x=320+u*46,y=292+u*u*2.2,r=on?19:15,qc=q.col||'#8a7aa8';ctx.fillStyle='#08060f';ctx.beginPath();ctx.arc(x,y,r+3,0,6.3);ctx.fill();ctx.fillStyle=on?qc:'#3a3458';ctx.beginPath();ctx.arc(x,y,r+1.5,0,6.3);ctx.fill();ctx.fillStyle='#14102a';ctx.beginPath();ctx.arc(x,y,r,0,6.3);ctx.fill();ctx.save();ctx.beginPath();ctx.arc(x,y,r-1,0,6.3);ctx.clip();smFace(q,x-r,y-r,r*2,r*2,on?1:.45);ctx.restore()});
 txt('◀ 戻る',22,28,'#cfc8ee','left',12);txt('？キャラ説明',22,342,'#9adfa8','left',11);smAsc(146,320,370,c);smGo(526,320,100,c)}};
// 案D（スレスパ2のキャラ選択画面の作りを参考）：画面いっぱいのキャラ色の背景の絵（筆で塗ったような霧・炎・光）に、
// キャラを右に大きく寄せて画面からはみ出させる。左に半透明の情報の板、下の中央に難易度の箱と小さな顔の列、左下に戻る・右下に出発
const SMT={0:{c:['#3a0a08','#7a1a10','#c0401a','#ff8a3a'],k:'flame'},1:{c:['#06140a','#12301a','#2a6a34','#7ae08a'],k:'mist'},2:{c:['#060818','#121a3a','#2a3a7a','#e8ecff'],k:'moon'},3:{c:['#100618','#2a1240','#5a2a8a','#d8a8ff'],k:'page'},4:{c:['#061408','#123a1a','#2a8a40','#c8ffd0'],k:'mist'},6:{c:['#020c18','#08243a','#1a6a9a','#a8f0ff'],k:'star'},10:{c:['#06081a','#14183a','#5a6aa8','#f4f6ff'],k:'ray'}};
const smBg=(j,t)=>{const th=SMT[j]||SMT[0],[c0,c1,c2,c3]=th.c;ctx.fillStyle=smGrad(0,0,640,360,[c0,c1,c0]);ctx.fillRect(0,0,640,360);
 let s=j*977+13;const rr=()=>(s=(s*1103515245+12345)&0x7fffffff)/0x7fffffff;
 ctx.save();ctx.filter='blur(14px)';for(let k=0;k<14;k++){const x=rr()*640,y=rr()*360,r=60+rr()*120;ctx.globalAlpha=.25+rr()*.25;ctx.fillStyle=k%3?c1:c2;ctx.beginPath();ctx.ellipse(x+Math.sin(t*.3+k)*8,y,r,r*.6,rr()*3,0,6.3);ctx.fill()}ctx.restore();
 // 筆の跡のような大きな帯
 ctx.save();ctx.filter='blur(3px)';for(let k=0;k<7;k++){ctx.globalAlpha=.18+rr()*.15;ctx.strokeStyle=k%2?c2:c3;ctx.lineWidth=18+rr()*30;ctx.lineCap='round';ctx.beginPath();const x0=260+rr()*380,y0=rr()*360;ctx.moveTo(x0,y0);ctx.bezierCurveTo(x0+60-rr()*120,y0-80,x0+rr()*160-80,y0-160,x0+rr()*100-50,y0-260);ctx.stroke()}ctx.restore();
 ctx.save();ctx.globalCompositeOperation='lighter';
 if(th.k==='flame'){for(let k=0;k<26;k++){const u=(t*.25+k*.071)%1,x=300+((k*97)%340)+Math.sin(u*9+k)*14,y=380-u*420;ctx.globalAlpha=(1-u)*.8;ctx.fillStyle=k%3?'#ff9a4a':'#ffd070';ctx.fillRect(x|0,y|0,2,3)}}
 else if(th.k==='moon'){const g=ctx.createRadialGradient(560,70,4,560,70,90);g.addColorStop(0,'rgba(230,236,255,.35)');g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(470,-20,180,180);ctx.globalCompositeOperation='source-over';ctx.fillStyle='#eef0ff';ctx.beginPath();ctx.arc(560,70,26,0,6.3);ctx.fill();ctx.fillStyle=c1;ctx.beginPath();ctx.arc(570,63,24,0,6.3);ctx.fill();ctx.globalCompositeOperation='lighter';for(let k=0;k<24;k++){const u=(t*.12+k*.083)%1,x=(k*131)%640+u*120,y=u*380;ctx.globalAlpha=.7;ctx.fillStyle=k%2?'#f0a8c8':'#ffd8e8';ctx.fillRect(x|0,y|0,3,2)}}
 else if(th.k==='ray'){for(let k=0;k<8;k++){ctx.globalAlpha=.08;ctx.fillStyle='#e8ecff';ctx.beginPath();ctx.moveTo(480+k*18,-10);ctx.lineTo(380+k*40,370);ctx.lineTo(410+k*40,370);ctx.closePath();ctx.fill()}for(let k=0;k<20;k++){const u=(t*.15+k*.05)%1;ctx.globalAlpha=(1-u)*.8;ctx.fillStyle='#f4f6ff';ctx.fillRect(320+((k*83)%300),370-u*380,2,2)}}
 else{for(let k=0;k<30;k++){const u=(t*.1+k*.033)%1;ctx.globalAlpha=Math.sin(u*3.14)*.6;ctx.fillStyle=c3;ctx.fillRect((k*137)%640,370-u*400,2,2)}}
 ctx.restore()};
SELV.D=()=>{const L=CHV(),j=L[SEL],c=CH[j],col=c.col||'#8a7aa8';smBg(j,T);
 // キャラ：右に大きく、足元は画面の外
 smC(c,450,j===10?470:460,j===10?3.1:3.3);
 // 左が読めるように、左から暗くするにじみ、四すみも暗く
 ctx.fillStyle=smGrad(0,0,400,0,['rgba(0,0,0,.55)','rgba(0,0,0,.25)','rgba(0,0,0,0)']);ctx.fillRect(0,0,400,360);
 {const g=ctx.createRadialGradient(400,170,140,400,170,430);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,.6)');ctx.fillStyle=g;ctx.fillRect(0,0,640,360)}
 // 情報の板
 const px=66,py=86,pw=230,ph=148;ctx.fillStyle='rgba(12,6,8,.62)';ctx.beginPath();ctx.roundRect(px,py,pw,ph,8);ctx.fill();ctx.strokeStyle='rgba(255,220,180,.12)';ctx.stroke();
 txt(c.n,px+14,py+34,'#f4d89a','left',c.n.length>6?22:26);smHeart(px+15,py+46,'#e8505b');txt(c.hp+'/'+c.hp,px+33,py+56,'#ff9a9a','left',11);ctx.fillStyle='#d8b050';ctx.beginPath();ctx.arc(px+82,py+52,5,0,6.3);ctx.fill();txt('99',px+92,py+56,'#e8d090','left',11);
 wrap(c.st,20).slice(0,3).forEach((l,i)=>txt(l,px+14,py+76+i*14,'#e8e4ff','left',10));
 ctx.drawImage(rIcon(c.rel),px+12,py+116,24,24);txt(RL[c.rel][0],px+42,py+126,'#c8b8a0','left',10);txt(RL[c.rel][1],px+42,py+139,'#e8e4ff','left',9);
 // 難易度の箱（中央下）
 const ax=226,ay=262;ctx.fillStyle='rgba(12,6,8,.7)';ctx.beginPath();ctx.roundRect(ax,ay,190,32,6);ctx.fill();ctx.fillStyle='#e07a2a';ctx.beginPath();ctx.arc(ax+16,ay+16,10,0,6.3);ctx.fill();txt(String(ASC),ax+16,ay+21,'#fff','center',12);txt(ASC?'アセンション '+ASC:'アセンションなし',ax+32,ay+14,'#f4d89a','left',10);txt(ASC?ASCD[ASC]:'変化なしで遊ぶ',ax+32,ay+27,'#e8e4ff','left',8);smPoly([[ax+196,ay+9],[ax+208,ay+16],[ax+196,ay+23]],'#e0b030');
 // 顔の列（下の中央）
 const n=L.length,w=30,g2=6,x0=Math.round(320-(n*w+(n-1)*g2)/2);L.forEach((k,i)=>{const q=CH[k],on=i===SEL,x=x0+i*(w+g2),y=304;ctx.fillStyle=on?'#e8a040':'#1a1418';ctx.fillRect(x-2,y-2,w+4,w+4);ctx.fillStyle=on?'#5a2a10':'#0c0a10';ctx.fillRect(x,y,w,w);smFace(q,x+1,y+1,w-2,w-2,on?1:.45)});
 // 戻る（左下）・出発（右下）：旗の形
 smPoly([[0,252],[60,252],[70,270],[60,288],[0,288]],'#8a2a1a');smPoly([[0,252],[60,252],[63,257],[0,257]],'#b84a2a');txt('↶',32,279,'#fff','center',22);
 smPoly([[640,252],[580,252],[570,270],[580,288],[640,288]],'#2a3a4a');smPoly([[640,252],[580,252],[577,257],[640,257]],'#4a6070');txt('✓',612,280,'#fff','center',22)};
