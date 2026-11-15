// キャラ選択画面の一枚絵（試作：ユウキング）。640x360 のキャンバスに描く。動く部分（火の粉・目の光）は selArtFx で毎フレーム
function selArtPl(){const c=MKC(640,360),g=c.getContext('2d');
 const L=(x0,y0,x1,y1,st)=>{const gr=g.createLinearGradient(x0,y0,x1,y1);st.forEach(([o,cl])=>gr.addColorStop(o,cl));return gr};
 const R=(x,y,r0,r1,st)=>{const gr=g.createRadialGradient(x,y,r0,x,y,r1);st.forEach(([o,cl])=>gr.addColorStop(o,cl));return gr};
 const P=(pts,fill,close=1)=>{g.beginPath();g.moveTo(pts[0][0],pts[0][1]);for(let i=1;i<pts.length;i++){const p=pts[i];if(p.length===4)g.quadraticCurveTo(p[0],p[1],p[2],p[3]);else if(p.length===6)g.bezierCurveTo(...p);else g.lineTo(p[0],p[1])}if(close)g.closePath();if(fill){g.fillStyle=fill;g.fill()}};
 // 背景：赤黒い炎
 g.fillStyle=L(0,0,0,360,[[0,'#2a0608'],[.55,'#5a0e14'],[1,'#1a0406']]);g.fillRect(0,0,640,360);
 g.fillStyle=R(210,150,10,320,[[0,'rgba(255,120,60,.55)'],[.35,'rgba(200,40,30,.35)'],[1,'rgba(40,0,0,0)']]);g.fillRect(0,0,640,360);
 // 大きな炎の渦（形で見せる）
 const fl=(x,y,s,a,cl)=>{g.save();g.translate(x,y);g.rotate(a);g.scale(s,s);P([[0,60],[-40,20,-30,-30,0,-80],[-5,-40,20,-20],[10,-50,40,-60],[20,-20,30,10,0,60]],cl);g.restore()};
 g.globalAlpha=.55;fl(60,250,1.6,-.3,'#7a1418');fl(130,330,2.2,-.15,'#8a1a1a');fl(330,300,1.8,.25,'#6a1216');fl(20,120,1.3,-.5,'#6a1014');fl(360,140,1.4,.4,'#5a0e12');
 g.globalAlpha=.5;fl(90,290,1.1,-.25,'#c8382a');fl(300,320,1.2,.2,'#b8302a');fl(40,180,.9,-.4,'#a82a24');g.globalAlpha=1;
 // 後ろの大きな斬撃の三日月
 g.save();g.globalCompositeOperation='lighter';g.translate(215,150);g.rotate(-.5);g.beginPath();g.ellipse(0,0,210,150,0,3.6,6.0);g.ellipse(0,18,190,120,0,6.0,3.6,true);g.closePath();g.fillStyle=L(-200,0,200,0,[[0,'rgba(255,160,90,0)'],[.5,'rgba(255,170,110,.35)'],[1,'rgba(255,230,180,.0)']]);g.fill();g.restore();
 g.save();g.translate(240,330);g.rotate(-.06);g.translate(-240,-330);
 // マント（肩の後ろ）
 P([[60,360],[70,280,110,230],[150,200],[300,200],[350,230,380,300],[400,360]],'#5a0c14');
 P([[70,360],[90,300,120,250],[140,232],[160,360]],'#7a1420');
 // 胴（胸当て）
 const body=[[150,360],[155,290],[175,245],[215,228],[265,228],[300,245],[318,290],[322,360]];
 P(body,L(150,0,322,0,[[0,'#ff9a5a'],[.06,'#8a8e9e'],[.45,'#d8dce8'],[.7,'#f4f6fc'],[1,'#7a7e8e']]));
 g.strokeStyle='#2a2430';g.lineWidth=3;P(body,null);g.stroke();
 // 胸の板の段
 g.strokeStyle='rgba(60,60,80,.55)';g.lineWidth=2;for(const y of[292,322,350]){g.beginPath();g.moveTo(160,y);g.quadraticCurveTo(236,y+12,316,y);g.stroke()}
 // 赤い十字の紋章
 g.fillStyle='#c81e2a';g.fillRect(226,256,22,70);g.fillRect(208,276,58,20);g.fillStyle='#ff5a5a';g.fillRect(226,256,6,70);g.fillRect(208,276,58,5);
 // 首（喉当て）
 P([[195,232],[200,205],[272,205],[278,232]],L(195,0,278,0,[[0,'#6a6e7e'],[.6,'#c8ccd8'],[1,'#5a5e6e']]));
 // 肩当て（手前左・大）
 const pl=(x,y,rx,ry,a,lit)=>{g.save();g.translate(x,y);g.rotate(a);for(let k=2;k>=0;k--){g.beginPath();g.ellipse(0,k*16,rx-k*6,ry,0,Math.PI,0);g.lineTo(rx-k*6,k*16+10);g.lineTo(-(rx-k*6),k*16+10);g.closePath();g.fillStyle=L(-rx,0,rx,0,lit);g.fill();g.strokeStyle='#2a2430';g.lineWidth=3;g.stroke()}
  g.fillStyle='#ffd23f';for(const xx of[-rx*.6,0,rx*.6]){g.fillRect(xx-2,-ry*.55,4,4)}g.restore()};
 pl(150,240,62,40,-.35,[[0,'#ffb070'],[.15,'#8a8e9e'],[.6,'#e8ecf6'],[1,'#8a8e9e']]);
 pl(318,236,52,34,.3,[[0,'#7a7e8e'],[.5,'#e0e4ee'],[.9,'#f8faff'],[1,'#ffb070']]);
 // 兜（少し右を向く）
 g.save();g.translate(236,128);g.rotate(.08);
 // 赤い羽根飾り（後ろへ流れる太い房）
 g.lineCap='round';for(let k=0;k<9;k++){const o=k*7,w=20-k*1.4;g.strokeStyle=['#6a0c18','#8a1420','#a8182a','#c8202e','#e8303c','#ff4a4a','#e8303c','#ff6a6a','#ffb0a0'][k];g.lineWidth=w;g.beginPath();g.moveTo(-4,-74+k*1.5);g.bezierCurveTo(-50-o,-130+o,-150-o*1.2,-110+o*1.5,-215-o*.6,-30+o*2.2);g.stroke()}
 g.strokeStyle='rgba(255,220,200,.6)';g.lineWidth=2;for(let k=0;k<6;k++){const o=k*12;g.beginPath();g.moveTo(-20-o*.3,-90+o*.3);g.bezierCurveTo(-60-o,-120+o,-130-o,-100+o*1.3,-170-o*.5,-40+o*2);g.stroke()}g.lineCap='butt';
 // 兜の本体
 const hm=[[-60,14],[-60,-30],[-60,-76,0,-80],[60,-76,60,-30],[60,14],[54,60],[30,74],[-30,74],[-54,60]];
 P(hm,L(-60,0,60,0,[[0,'#ff9a5a'],[.08,'#9a9eae'],[.35,'#e4e8f2'],[.62,'#ffffff'],[.85,'#c4c8d4'],[1,'#6a6e7e']]));
 g.fillStyle=L(0,-80,0,74,[[0,'rgba(255,255,255,.25)'],[.5,'rgba(0,0,0,0)'],[1,'rgba(20,10,20,.35)']]);P(hm,null);g.fill();
 g.strokeStyle='#221c28';g.lineWidth=4;P(hm,null);g.stroke();
 // 真ん中の稜線
 g.fillStyle='rgba(255,255,255,.85)';g.fillRect(6,-78,5,64);g.fillStyle='rgba(80,80,100,.5)';g.fillRect(11,-78,3,64);
 // のぞき窓（黒い帯）と黄色い目
 P([[-58,-22],[0,-30,58,-22],[58,-2],[0,-10,-58,-2]],'#0c0a12');
 g.fillStyle='#ffd23f';g.fillRect(-36,-20,20,8);g.fillRect(16,-21,20,8);g.fillStyle='#fff6c8';g.fillRect(-32,-19,8,3);g.fillRect(20,-20,8,3);
 g.fillStyle='rgba(30,20,40,.28)';P([[-58,-2],[0,-10,58,-2],[56,20],[0,10,-56,20]],null);g.fill();
 g.fillStyle='rgba(255,255,255,.55)';P([[30,-70],[46,-56,52,-30],[46,-30],[42,-52,26,-66]],null);g.fill();
 // 息穴
 g.fillStyle='#2a2430';for(let r=0;r<3;r++)for(let q=0;q<4;q++)g.fillRect(22+q*7,16+r*8,4,4);
 // 鋲
 g.fillStyle='#ffd23f';for(const[x,y]of[[-50,-40],[-50,30],[48,-40],[48,30]])g.fillRect(x-2,y-2,5,5);
 g.restore();
 // 剣（左の拳で縦に掲げる。兜の左を抜けて上へ）
 g.save();g.translate(118,262);g.rotate(-1.46);
 const bl=330;g.fillStyle='rgba(255,150,90,.35)';P([[0,-12],[bl,-10],[bl+40,0],[bl,10],[0,12]],null);g.fill();
 P([[0,-9],[bl,-7],[bl+34,0],[bl,7],[0,9]],L(0,-9,0,9,[[0,'#ffffff'],[.42,'#e8eef8'],[.5,'#9aa2b8'],[1,'#5a6278']]));
 g.strokeStyle='#1a1624';g.lineWidth=3;g.stroke();g.fillStyle='rgba(110,120,150,.9)';g.fillRect(14,-1,bl-40,2);
 // 鍔（刃に直角）
 g.fillStyle='#ffd23f';g.beginPath();g.moveTo(-4,-40);g.lineTo(8,-36);g.lineTo(8,36);g.lineTo(-4,40);g.lineTo(-10,30);g.lineTo(-10,-30);g.closePath();g.fill();g.strokeStyle='#5a3a10';g.lineWidth=2;g.stroke();g.fillStyle='#fff0a0';g.fillRect(-2,-34,4,68);
 g.fillStyle='#c81e2a';g.beginPath();g.arc(-1,0,5,0,6.3);g.fill();
 // 柄と柄頭
 g.fillStyle='#3a2418';g.fillRect(-56,-6,48,12);g.fillStyle='#5a3a24';for(let x=-54;x<-10;x+=8)g.fillRect(x,-6,3,12);
 g.fillStyle='#ffd23f';g.beginPath();g.arc(-62,0,10,0,6.3);g.fill();g.strokeStyle='#5a3a10';g.stroke();g.restore();
 // 籠手（柄を握る拳）
 g.save();g.translate(117,292);g.rotate(-.08);
 g.fillStyle=L(-30,0,30,0,[[0,'#ff9a5a'],[.12,'#7a7e8e'],[.55,'#eef0f8'],[1,'#6a6e7e']]);g.beginPath();g.roundRect(-30,-24,60,50,12);g.fill();g.strokeStyle='#221c28';g.lineWidth=3;g.stroke();
 g.strokeStyle='rgba(40,40,60,.7)';g.lineWidth=2;for(const y of[-10,4,16]){g.beginPath();g.moveTo(-24,y);g.quadraticCurveTo(0,y+4,26,y);g.stroke()}
 g.fillStyle=L(0,-30,0,-10,[[0,'#f4f6fc'],[1,'#8a8e9e']]);g.beginPath();g.roundRect(-6,-32,26,14,6);g.fill();g.strokeStyle='#221c28';g.stroke();
 g.fillStyle='#ffd23f';g.fillRect(-26,20,52,6);g.restore();
 // 刃のきらめき
 g.save();g.globalCompositeOperation='lighter';const sx=150,sy=20;g.fillStyle=R(sx,sy,0,40,[[0,'rgba(255,255,255,.9)'],[1,'rgba(255,200,150,0)']]);g.fillRect(sx-40,sy-40,80,80);g.fillStyle='#fff';g.fillRect(sx-30,sy-1,60,2);g.fillRect(sx-1,sy-22,2,44);g.restore();
 // 振りの軌跡（剣先から右へ大きく）
 g.save();g.globalCompositeOperation='lighter';g.translate(250,190);g.rotate(-.2);g.beginPath();g.ellipse(0,0,250,200,0,3.75,5.2);g.ellipse(0,26,226,170,0,5.2,3.75,true);g.closePath();g.fillStyle=L(-220,-150,120,-200,[[0,'rgba(255,240,220,.7)'],[.6,'rgba(255,170,110,.3)'],[1,'rgba(255,120,60,0)']]);g.fill();g.restore();
 // 縁の光（後ろの炎）
 g.save();g.globalCompositeOperation='source-atop';g.fillStyle=L(0,0,640,0,[[0,'rgba(255,120,60,.25)'],[.4,'rgba(0,0,0,0)']]);g.fillRect(0,0,640,360);g.restore();
 g.restore();
 // 下を暗く
 g.fillStyle=L(0,250,0,360,[[0,'rgba(10,2,4,0)'],[1,'rgba(10,2,4,.55)']]);g.fillRect(0,250,640,110);
 return c}
