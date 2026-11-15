// 選択画面の飾り案（配置は今のまま、飾りだけ足す）。window.SELDECO={bg,fg}
window.SELDV={
// 案1 金細工の額縁：ゴシックの窓・床の魔法陣・金の額縁と飾り罫
1:{bg(c,a,col){const g=ctx.createLinearGradient(0,0,0,360);g.addColorStop(0,'#0a0812');g.addColorStop(1,'#140e1c');ctx.fillStyle=g;ctx.fillRect(0,0,640,360);
  ctx.strokeStyle='rgba(255,210,120,.05)';ctx.lineWidth=1;for(let k=-20;k<40;k++){ctx.beginPath();ctx.moveTo(k*24,0);ctx.lineTo(k*24+360,360);ctx.moveTo(k*24+360,0);ctx.lineTo(k*24,360);ctx.stroke()}
  // ゴシックの窓（キャラの色のステンドグラス）
  const wx=190,wy=40,ww=150,wh=250;ctx.save();ctx.beginPath();ctx.moveTo(wx-ww/2,wy+wh);ctx.lineTo(wx-ww/2,wy+70);ctx.quadraticCurveTo(wx-ww/2,wy,wx,wy-20);ctx.quadraticCurveTo(wx+ww/2,wy,wx+ww/2,wy+70);ctx.lineTo(wx+ww/2,wy+wh);ctx.closePath();
  const wg=ctx.createLinearGradient(0,wy,0,wy+wh);wg.addColorStop(0,col+'55');wg.addColorStop(1,col+'10');ctx.fillStyle=wg;ctx.fill();ctx.clip();
  ctx.strokeStyle='rgba(10,8,18,.8)';ctx.lineWidth=3;for(let k=-3;k<=3;k++){ctx.beginPath();ctx.moveTo(wx+k*22,wy-30);ctx.lineTo(wx+k*22,wy+wh);ctx.stroke()}for(let y=wy+30;y<wy+wh;y+=34){ctx.beginPath();ctx.moveTo(wx-ww,y);ctx.lineTo(wx+ww,y);ctx.stroke()}
  ctx.beginPath();ctx.arc(wx,wy+40,30,0,6.3);ctx.stroke();ctx.restore();
  ctx.strokeStyle='#c8a050';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(wx-ww/2,wy+wh);ctx.lineTo(wx-ww/2,wy+70);ctx.quadraticCurveTo(wx-ww/2,wy,wx,wy-20);ctx.quadraticCurveTo(wx+ww/2,wy,wx+ww/2,wy+70);ctx.lineTo(wx+ww/2,wy+wh);ctx.stroke();
  // 窓からの光
  const lg=ctx.createLinearGradient(0,60,0,300);lg.addColorStop(0,col+'30');lg.addColorStop(1,col+'00');ctx.fillStyle=lg;ctx.beginPath();ctx.moveTo(130,60);ctx.lineTo(250,60);ctx.lineTo(320,300);ctx.lineTo(60,300);ctx.fill();
  for(let k=0;k<20;k++){const t=(T*.08+hs(k))%1;ctx.globalAlpha=.5*Math.sin(t*3.14);sq(90+hs(k+3)*200,300-t*240,1,'#ffe9a8')}ctx.globalAlpha=1;
  // 床の魔法陣
  ctx.save();ctx.translate(190,298);ctx.scale(1,.2);ctx.strokeStyle='rgba(255,210,120,.7)';ctx.lineWidth=2;ctx.beginPath();ctx.arc(0,0,110,0,6.3);ctx.stroke();ctx.lineWidth=1;ctx.beginPath();ctx.arc(0,0,94,0,6.3);ctx.stroke();
  for(let k=0;k<12;k++){const t=k/12*6.283+T*.3;ctx.fillStyle='#ffd27a';ctx.fillRect(Math.cos(t)*102-2,Math.sin(t)*102-2,4,4)}ctx.beginPath();for(let k=0;k<=6;k++){const t=k/6*6.283*2+T*.2;ctx.lineTo(Math.cos(t)*94,Math.sin(t)*94)}ctx.stroke();ctx.restore()},
 fg(c,a,col){const G='#c8a050',GL='#ffe2a0';
  // 外の額縁（二重線＋角の飾り）
  ctx.strokeStyle=G;ctx.lineWidth=1;ctx.strokeRect(5.5,5.5,629,349);ctx.strokeStyle='rgba(200,160,80,.4)';ctx.strokeRect(9.5,9.5,621,341);
  const cor=(x,y,sx,sy)=>{ctx.save();ctx.translate(x,y);ctx.scale(sx,sy);ctx.fillStyle=G;ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(26,0);ctx.lineTo(22,3);ctx.lineTo(3,3);ctx.lineTo(3,22);ctx.lineTo(0,26);ctx.fill();ctx.fillStyle=GL;ctx.beginPath();ctx.moveTo(8,8);ctx.lineTo(13,3+5);ctx.lineTo(8,13);ctx.lineTo(3+0,8);ctx.closePath();ctx.fill();ctx.strokeStyle=G;ctx.beginPath();ctx.arc(16,16,6,3.14,4.71);ctx.stroke();ctx.restore()};
  cor(4,4,1,1);cor(636,4,-1,1);cor(4,356,1,-1);cor(636,356,-1,-1);
  // 区切りの縦線（菱形つき）
  ctx.fillStyle='rgba(200,160,80,.5)';ctx.fillRect(357,40,1,220);ctx.fillStyle=GL;ctx.save();ctx.translate(357.5,150);ctx.rotate(.785);ctx.fillRect(-3,-3,6,6);ctx.restore();
  // 名前の下線を金の飾り罫に
  ctx.fillStyle='#14101c';ctx.fillRect(372,97,250,4);ctx.fillStyle=G;ctx.fillRect(378,98,236,1);ctx.fillRect(378,100,236,1);for(const x of[374,618]){ctx.save();ctx.translate(x,99.5);ctx.rotate(.785);ctx.fillStyle=GL;ctx.fillRect(-3,-3,6,6);ctx.restore()}ctx.fillStyle=col;ctx.fillRect(470,97,60,4);
  // 説明文の上下に細い飾り
  ctx.fillStyle='rgba(200,160,80,.35)';ctx.fillRect(372,170,248,1);ctx.fillRect(372,230,248,1);
  // 出発ボタンに金の縁
  ctx.strokeStyle=GL;ctx.lineWidth=1;ctx.strokeRect(527.5,315.5,99,37)}},
// 案2 キャラ色の光：後ろで回る光の筋・大きな名前の透かし・足元の光の輪・ガラスの情報板
2:{bg(c,a,col){ctx.fillStyle='#07060c';ctx.fillRect(0,0,640,360);
  const g=ctx.createRadialGradient(190,180,10,190,180,300);g.addColorStop(0,col+'80');g.addColorStop(.5,col+'20');g.addColorStop(1,'#07060c00');ctx.fillStyle=g;ctx.fillRect(0,0,640,360);
  ctx.save();ctx.translate(190,170);ctx.rotate(T*.08);ctx.globalCompositeOperation='lighter';for(let k=0;k<14;k++){ctx.rotate(6.283/14);ctx.fillStyle=k%2?col+'18':col+'0c';ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(-24,-420);ctx.lineTo(24,-420);ctx.fill()}ctx.restore();
  // 名前の大きな透かし（縦書き）
  ctx.save();ctx.globalAlpha=.08;[...c.n].forEach((ch,i)=>txt(ch,40,90+i*70,'#fff','center',64));ctx.restore();
  // 斜めの速い線
  for(let k=0;k<10;k++){const t=(T*.5+hs(k))%1,y=40+hs(k+9)*240;ctx.fillStyle=col+'50';ctx.fillRect(Math.round(-80+t*520),Math.round(y),40+hs(k)*60,1)}
  // 足元の光の輪（脈打つ）
  ctx.save();ctx.translate(190,298);ctx.scale(1,.22);ctx.globalCompositeOperation='lighter';for(let k=0;k<3;k++){const u=(T*.6+k/3)%1;ctx.strokeStyle='rgba(255,255,255,'+(.5*(1-u))+')';ctx.lineWidth=3;ctx.beginPath();ctx.arc(0,0,60+u*90,0,6.3);ctx.stroke()}const rg=ctx.createRadialGradient(0,0,0,0,0,110);rg.addColorStop(0,col+'aa');rg.addColorStop(1,col+'00');ctx.fillStyle=rg;ctx.beginPath();ctx.arc(0,0,110,0,6.3);ctx.fill();ctx.restore()},
 fg(c,a,col){// ガラスの情報板（下に敷く代わりに、縁と光だけ足す）
  ctx.save();ctx.globalCompositeOperation='destination-over';ctx.fillStyle='rgba(255,255,255,.04)';ctx.fillRect(362,40,268,222);ctx.restore();
  ctx.fillStyle=col;ctx.fillRect(362,40,2,222);const g=ctx.createLinearGradient(362,0,460,0);g.addColorStop(0,col+'40');g.addColorStop(1,col+'00');ctx.fillStyle=g;ctx.fillRect(364,40,96,222);
  ctx.fillStyle='rgba(255,255,255,.25)';ctx.fillRect(362,40,268,1);ctx.fillRect(362,261,268,1);
  // 名前の下線を光らせる
  ctx.save();ctx.globalCompositeOperation='lighter';const u=(T*.5)%1,lx=372+u*248;const lg=ctx.createLinearGradient(lx-40,0,lx+40,0);lg.addColorStop(0,'rgba(255,255,255,0)');lg.addColorStop(.5,'rgba(255,255,255,.9)');lg.addColorStop(1,'rgba(255,255,255,0)');ctx.fillStyle=lg;ctx.fillRect(lx-40,97,80,3);ctx.restore();
  // 角の括弧
  ctx.fillStyle=col;for(const[x,y,sx,sy]of[[362,40,1,1],[630,40,-1,1],[362,262,1,-1],[630,262,-1,-1]]){ctx.fillRect(x-(sx<0?10:0),y-(sy<0?2:0),10,2);ctx.fillRect(x-(sx<0?2:0),y-(sy<0?10:0),2,10)}}},
// 案3 夜の塔：星空・遠くの塔の影・月・崖の上に立つ。線は細く上品に
3:{bg(c,a,col){const g=ctx.createLinearGradient(0,0,0,360);g.addColorStop(0,'#05060f');g.addColorStop(.7,'#121630');g.addColorStop(1,'#0a0c18');ctx.fillStyle=g;ctx.fillRect(0,0,640,360);
  for(let k=0;k<90;k++){const x=hs(k)*640,y=hs(k+50)*220,tw=.4+.6*Math.abs(Math.sin(T*1.5+k));ctx.globalAlpha=tw*(k%5?.5:1);sq(Math.round(x),Math.round(y),k%7?1:2,'#e8ecff')}ctx.globalAlpha=1;
  // 月
  const mx=300,my=70;const mg=ctx.createRadialGradient(mx,my,10,mx,my,80);mg.addColorStop(0,col+'60');mg.addColorStop(1,col+'00');ctx.fillStyle=mg;ctx.fillRect(mx-80,my-80,160,160);ctx.fillStyle='#f4f0e0';ctx.beginPath();ctx.arc(mx,my,22,0,6.3);ctx.fill();ctx.fillStyle='#05060f';ctx.beginPath();ctx.arc(mx+9,my-5,20,0,6.3);ctx.fill();
  // 遠くの塔
  ctx.fillStyle='#1c2040';ctx.fillRect(250,110,26,190);ctx.beginPath();ctx.moveTo(244,112);ctx.lineTo(263,70);ctx.lineTo(282,112);ctx.fill();ctx.fillRect(240,150,46,6);ctx.fillRect(238,210,50,6);ctx.fillStyle='#ffd27a';ctx.fillRect(260,130,4,6);ctx.fillRect(266,180,3,5);
  // 遠い山並み
  ctx.fillStyle='#141834';ctx.beginPath();ctx.moveTo(0,250);for(let x=0;x<=360;x+=20)ctx.lineTo(x,236-Math.abs(Math.sin(x*.03))*30-hs(x)*10);ctx.lineTo(360,300);ctx.lineTo(0,300);ctx.fill();
  // 崖（立ち位置）
  ctx.fillStyle='#0c0e1e';ctx.beginPath();ctx.moveTo(0,300);ctx.lineTo(80,292);ctx.lineTo(300,294);ctx.lineTo(352,310);ctx.lineTo(352,360);ctx.lineTo(0,360);ctx.fill();ctx.fillStyle=col+'50';ctx.fillRect(80,292,220,1);
  // 霧
  const fg2=ctx.createLinearGradient(0,240,0,310);fg2.addColorStop(0,'rgba(140,150,220,0)');fg2.addColorStop(1,'rgba(140,150,220,.18)');ctx.fillStyle=fg2;ctx.fillRect(0,240,352,70)},
 fg(c,a,col){ctx.fillStyle='rgba(232,236,255,.5)';ctx.fillRect(16,20,1,300);ctx.fillRect(16,20,40,1);txt('— '+['I','II','III','IV','V','VI','VII'][SEL]+' —',190,316,'rgba(232,236,255,.55)','center',10);
  ctx.fillStyle='rgba(232,236,255,.25)';ctx.fillRect(372,170,248,1);for(const x of[372,620]){ctx.fillStyle=col;ctx.fillRect(x-1,169,3,3)}}}};
