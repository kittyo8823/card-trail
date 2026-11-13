// 古の者のフルアートカードの絵（ユーザー採用：骨鯨の見本の1枚目の作り。大きく斜めに動く主役・光の筋・飛び散る粒）
function ancMk(seed,bg,fn){const W=168,H=212,cv=document.createElement('canvas');cv.width=W;cv.height=H;const g=cv.getContext('2d');let s=seed;const r=()=>(s=(s*1103515245+12345)&0x7fffffff)/0x7fffffff;
 let q=g.createLinearGradient(0,0,0,H);bg.forEach((c,i)=>q.addColorStop(i/(bg.length-1),c));g.fillStyle=q;g.fillRect(0,0,W,H);
 const glow=(x,y,R,c,a)=>{const k=g.createRadialGradient(x,y,1,x,y,R);k.addColorStop(0,c.replace('A',a));k.addColorStop(1,c.replace('A',0));g.fillStyle=k;g.fillRect(x-R,y-R,R*2,R*2)};
 const poly=(pts,c)=>{g.fillStyle=c;g.beginPath();pts.forEach(p=>g.lineTo(p[0],p[1]));g.closePath();g.fill()};
 fn(g,r,glow,poly,W,H);
 {const B=document.createElement('canvas');B.width=42;B.height=53;const bx=B.getContext('2d');bx.filter='blur(2px)';bx.drawImage(cv,0,0,42,53);g.globalCompositeOperation='screen';g.globalAlpha=.55;g.drawImage(B,0,0,W,H);g.globalAlpha=1;g.globalCompositeOperation='source-over'}
 let vg=g.createRadialGradient(W/2,H*.5,60,W/2,H*.5,150);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,0,.45)');g.fillStyle=vg;g.fillRect(0,0,W,H);return cv}
const bez=(a,b,c,d)=>t=>{const u=1-t;return[u*u*u*a[0]+3*u*u*t*b[0]+3*u*t*t*c[0]+t*t*t*d[0],u*u*u*a[1]+3*u*u*t*b[1]+3*u*t*t*c[1]+t*t*t*d[1]]};
const ANCF=[
// 0 灯甲：灯をともした社を背負う大亀が、暗い水の中を斜め上へ泳ぎ上がる。灯の光が尾を引く
()=>ancMk(11,['#020a0c','#06242a','#0c3a3a','#041416'],(g,r,glow,poly,W,H)=>{
 for(let i=0;i<5;i++){g.fillStyle='rgba(180,240,220,.05)';g.beginPath();g.moveTo(60+i*28,0);g.lineTo(80+i*28,0);g.lineTo(20+i*40,H);g.lineTo(0+i*40,H);g.fill()}
 for(let i=0;i<40;i++){const x=r()*W,y=r()*H;g.strokeStyle='rgba(180,240,230,'+(.15+r()*.3)+')';g.lineWidth=1;g.beginPath();g.arc(x,y,1+r()*2.5,0,7);g.stroke()}
 g.save();g.translate(68,124);g.rotate(-.5);g.scale(.9,.9);
 // 灯の光の尾（後ろ＝左下へ流れる）
 const LT=[[-40,-24],[-20,-36],[2,-40],[24,-35],[42,-22]];for(const[x,y]of LT)for(let k=0;k<6;k++){g.strokeStyle='rgba(255,200,110,'+(.16-k*.022)+')';g.lineWidth=5-k*.6;g.beginPath();g.moveTo(x,y);g.quadraticCurveTo(x-40,y+8+k*2,x-120,y+26+k*5);g.stroke()}
 const fin=(x,y,s,a,c1,c2)=>{g.save();g.translate(x,y);g.rotate(a);g.scale(s,s);let q=g.createLinearGradient(0,0,0,60);q.addColorStop(0,c1);q.addColorStop(1,c2);g.fillStyle=q;g.beginPath();g.moveTo(-8,0);g.bezierCurveTo(14,10,22,34,10,62);g.bezierCurveTo(4,40,-4,20,-14,6);g.closePath();g.fill();g.strokeStyle='rgba(255,255,220,.12)';g.lineWidth=1;g.beginPath();g.moveTo(-6,4);g.bezierCurveTo(8,14,12,34,8,54);g.stroke();g.restore()};
 // 奥のひれ
 fin(-44,6,.7,.9,'#2e4430','#14201a');fin(30,2,.8,-.2,'#344c34','#18241a');
 // 甲羅：ひと続きのなだらかな山
 let q=g.createRadialGradient(-10,-34,4,0,-6,80);q.addColorStop(0,'#9aaa6a');q.addColorStop(.45,'#5a6e40');q.addColorStop(1,'#1e2a18');g.fillStyle=q;g.beginPath();g.moveTo(-62,6);g.bezierCurveTo(-58,-30,-22,-46,6,-43);g.bezierCurveTo(36,-40,56,-22,60,0);g.bezierCurveTo(40,12,-30,16,-62,6);g.fill();
 // 腹側の明るい縁
 q=g.createLinearGradient(0,0,0,16);q.addColorStop(0,'rgba(200,190,140,0)');q.addColorStop(1,'rgba(200,190,140,.55)');g.fillStyle=q;g.beginPath();g.moveTo(-60,6);g.bezierCurveTo(-30,14,40,10,58,0);g.bezierCurveTo(40,16,-30,20,-60,6);g.fill();
 // 甲の模様（うすい筋だけ）
 g.strokeStyle='rgba(20,30,14,.35)';g.lineWidth=1.2;for(const k of[-36,-12,14,38]){g.beginPath();g.moveTo(k*.9,8);g.quadraticCurveTo(k,-16,k*.6,-38);g.stroke()}g.beginPath();g.moveTo(-54,-8);g.bezierCurveTo(-20,-22,30,-22,56,-6);g.stroke();
 g.fillStyle='rgba(255,255,220,.18)';g.beginPath();g.moveTo(-30,-30);g.bezierCurveTo(-14,-40,10,-41,24,-36);g.bezierCurveTo(6,-34,-14,-32,-30,-30);g.fill();
 // 苔の垂れ
 for(let i=0;i<16;i++){const t=i/15,x=-58+t*114,y=6+Math.sin(t*Math.PI)*-2+ (t<.5?0:-t*4);g.strokeStyle=['rgba(120,170,80,.6)','rgba(80,130,60,.6)'][i%2];g.lineWidth=1.5;g.beginPath();g.moveTo(x,y);g.quadraticCurveTo(x-3,y+6,x-6,y+10+(i%3)*3);g.stroke()}
 // 首と頭：ひと続き
 q=g.createLinearGradient(60,-30,90,4);q.addColorStop(0,'#8a9a64');q.addColorStop(1,'#2e3a22');g.fillStyle=q;g.beginPath();g.moveTo(48,-10);g.bezierCurveTo(66,-18,82,-30,98,-28);g.bezierCurveTo(108,-27,116,-20,114,-13);g.bezierCurveTo(110,-6,98,-6,88,-6);g.bezierCurveTo(76,-4,64,4,52,8);g.closePath();g.fill();
 g.fillStyle='rgba(255,255,220,.2)';g.beginPath();g.moveTo(66,-18);g.bezierCurveTo(80,-28,96,-30,106,-26);g.bezierCurveTo(94,-26,80,-22,66,-18);g.fill();
 glow(103,-20,11,'rgba(255,200,110,A)',.9);g.fillStyle='#ffe0a0';g.beginPath();g.ellipse(103,-20,2.6,1.6,-.2,0,7);g.fill();
 for(let i=0;i<3;i++){g.strokeStyle='rgba(110,150,90,.6)';g.lineWidth=1.2;g.beginPath();g.moveTo(106-i*4,-8);g.quadraticCurveTo(100-i*4,6,90-i*5,14+i*3);g.stroke()}
 // 手前のひれ（大きく掻く）
 fin(36,6,1.05,-.55,'#7a8e58','#26341e');fin(-46,8,.85,.5,'#6a7e4e','#22301c');
 // 社と灯
 g.fillStyle='#3a2414';g.fillRect(-10,-56,20,14);g.fillStyle='#5a3a24';g.beginPath();g.moveTo(-15,-55);g.lineTo(0,-66);g.lineTo(15,-55);g.fill();g.fillStyle='#ffd890';g.fillRect(-4,-52,8,8);glow(0,-48,26,'rgba(255,200,110,A)',.55);
 for(const[x,y]of LT){g.fillStyle='rgba(60,40,20,.8)';g.fillRect(x-.5,y,1,7);g.fillStyle='#ffd890';g.fillRect(x-2,y-4,4,5);glow(x,y-2,12,'rgba(255,200,110,A)',.7)}
 g.restore();
 for(let i=0;i<30;i++){const x=r()*W,y=r()*H;g.fillStyle='rgba(255,220,140,'+(.3+r()*.6)+')';g.fillRect(x,y,r()<.2?2:1,r()<.2?2:1)}}),
// 1 骨鯨：星の海から骨の鯨が身をひねって飛び出し、歌の波紋を放つ
()=>ancMk(7,['#04061a','#0a1236','#101c4a','#2a3a78'],(g,r,glow,poly,W,H)=>{
 for(let i=0;i<90;i++){const x=r()*W,y=r()*H*.8,a=.3+r()*.7;g.fillStyle='rgba(220,235,255,'+a+')';g.fillRect(x,y,r()<.15?2:1,r()<.15?2:1)}
 const P=bez([150,18],[170,120],[20,40],[44,150]);
 for(let k=0;k<7;k++){g.strokeStyle='rgba(140,200,255,'+(.05+k*.012)+')';g.lineWidth=10-k;g.beginPath();for(let t=0;t<=.88;t+=.02){const[x,y]=P(t),o=(k-3)*5*(1-t);if(t===0)g.moveTo(x+o,y-o);else g.lineTo(x+o,y-o)}g.stroke()}
 const hx=40,hy=158;for(let i=0;i<5;i++){g.strokeStyle='rgba(170,220,255,'+(.42-i*.07)+')';g.lineWidth=2.2-i*.3;g.beginPath();g.ellipse(hx-6,hy+6,18+i*16,10+i*9,-.6,Math.PI*.55,Math.PI*1.75);g.stroke()}
 glow(hx,hy,60,'rgba(150,210,255,A)',.35);
 const bone='#e8f0ff',bd='#3a4a7a',N=22;
 for(let i=0;i<N;i++){const t=i/N*.86+.02,[x,y]=P(t),[x2,y2]=P(t+.01),ang=Math.atan2(y2-y,x2-x),sz=2+t*7;
  if(t>.25&&t<.8){const L=(10+t*40)*(t<.7?1:(.8-t)*10),sw=Math.sin(t*20)*.15;for(const sd of[1,-.55]){const a=ang+Math.PI/2*sd+sw;g.beginPath();g.moveTo(x,y);g.quadraticCurveTo(x+Math.cos(a)*L*.6+Math.cos(ang)*L*.25,y+Math.sin(a)*L*.6+Math.sin(ang)*L*.25,x+Math.cos(a)*L+Math.cos(ang)*L*.1,y+Math.sin(a)*L+Math.sin(ang)*L*.1);g.strokeStyle=sd>0?bone:'#a8b8e0';g.lineWidth=sz*.55;g.stroke()}}
  g.save();g.translate(x,y);g.rotate(ang);g.fillStyle=bone;g.fillRect(-sz/2,-sz/2,sz,sz);g.fillStyle='#fff';g.fillRect(-sz/2,-sz/2,sz,1);g.restore()}
 {const[x,y]=P(0);g.save();g.translate(x,y);g.rotate(-.5);for(const d of[-1,1]){g.fillStyle='rgba(170,200,255,.45)';g.beginPath();g.moveTo(0,0);g.quadraticCurveTo(10,d*6,26,d*22);g.quadraticCurveTo(12,d*12,0,d*3);g.fill();g.strokeStyle=bone;g.lineWidth=1;for(let k=0;k<4;k++){g.beginPath();g.moveTo(1,d);g.lineTo(9+k*5,d*(5+k*5));g.stroke()}}g.restore()}
 {const[x,y]=P(.78);g.beginPath();g.moveTo(x,y);g.quadraticCurveTo(x+30,y+10,x+56,y+40);g.strokeStyle=bone;g.lineWidth=2.4;g.stroke();for(let k=1;k<5;k++){const t=k/5;g.fillStyle=bone;g.fillRect(x+56*t*t+t*8-2,y+40*t*t-2,4,4)}}
 {g.save();g.translate(44,150);g.rotate(-.55);
  let k=g.createLinearGradient(0,-20,0,4);k.addColorStop(0,'#ffffff');k.addColorStop(1,'#a8b8e0');g.fillStyle=k;g.beginPath();g.moveTo(12,-12);g.quadraticCurveTo(-10,-19,-35,-7);g.lineTo(-33,-3);g.quadraticCurveTo(-8,-8,14,2);g.fill();
  g.fillStyle='#c8d4f0';g.beginPath();g.moveTo(13,7);g.quadraticCurveTo(-8,9,-32,21);g.lineTo(-31,23);g.quadraticCurveTo(-6,13,15,10);g.fill();
  g.fillStyle='#0a1030';g.beginPath();g.ellipse(4,-7,4,3,0,0,7);g.fill();g.fillStyle='#9ff0ff';g.fillRect(3,-8,3,2);g.restore();glow(48,143,10,'rgba(160,240,255,A)',.9)}
 for(let i=0;i<9;i++){g.fillStyle='rgba(60,80,150,'+(.55+i*.04)+')';g.beginPath();g.ellipse(r()*W,H-8+r()*14,30+r()*30,10+r()*6,0,0,7);g.fill()}
 for(let i=0;i<26;i++){const a=-Math.PI*(.15+r()*.7),d=10+r()*50;g.fillStyle='rgba(220,235,255,'+(.4+r()*.5)+')';g.fillRect(60+Math.cos(a)*d,196+Math.sin(a)*d*.8,2,2)}
 for(let i=0;i<16;i++){const t=.1+i*.05,[x,y]=P(Math.min(.95,t)),o=Math.sin(i*1.7)*16;g.fillStyle='rgba(150,230,255,.18)';g.beginPath();g.arc(x+o,y-o*.6,4,0,7);g.fill();g.fillStyle='#c8f4ff';g.fillRect(x+o-1,y-o*.6-1,3,2)}}),
// 2 刻蛇：傾いた砂時計に巻きつき、こちらへ襲いかかる大蛇。砂が弧を描いて飛び散る
()=>ancMk(23,['#120804','#3a1c0a','#5a2e10','#1a0c04'],(g,r,glow,poly,W,H)=>{
 for(let i=0;i<4;i++){g.strokeStyle='rgba(255,200,120,'+(.25-i*.05)+')';g.lineWidth=1.5;g.beginPath();g.arc(96,80,30+i*22,0,7);g.stroke();for(let k=0;k<12;k++){const a=k/12*6.283;g.fillStyle='rgba(255,210,140,.3)';g.fillRect(96+Math.cos(a)*(30+i*22)-1,80+Math.sin(a)*(30+i*22)-1,2,2)}}
 g.strokeStyle='rgba(255,220,150,.5)';g.lineWidth=2;g.beginPath();g.moveTo(96,80);g.lineTo(96+Math.cos(-1.1)*70,80+Math.sin(-1.1)*70);g.stroke();g.beginPath();g.moveTo(96,80);g.lineTo(96+Math.cos(2.4)*48,80+Math.sin(2.4)*48);g.stroke();
 glow(96,80,90,'rgba(255,170,80,A)',.3);
 // 砂時計（傾いている）
 g.save();g.translate(100,78);g.rotate(.4);g.fillStyle='#2a1808';g.fillRect(-26,-58,52,6);g.fillRect(-26,52,52,6);let q=g.createLinearGradient(-26,0,26,0);q.addColorStop(0,'#5a3a10');q.addColorStop(.5,'#e8b860');q.addColorStop(1,'#3a2408');g.fillStyle=q;g.fillRect(-25,-57,50,3);g.fillRect(-25,53,50,3);
 g.fillStyle='rgba(200,230,255,.1)';g.strokeStyle='rgba(230,245,255,.55)';g.lineWidth=1.2;g.beginPath();g.moveTo(-22,-52);g.quadraticCurveTo(-20,-10,-3,0);g.quadraticCurveTo(-20,10,-22,52);g.lineTo(22,52);g.quadraticCurveTo(20,10,3,0);g.quadraticCurveTo(20,-10,22,-52);g.closePath();g.fill();g.stroke();
 g.fillStyle='#e0b060';g.beginPath();g.moveTo(-18,-30);g.quadraticCurveTo(0,-26,18,-30);g.quadraticCurveTo(10,-8,0,-2);g.quadraticCurveTo(-10,-8,-18,-30);g.fill();g.fillRect(-1,0,2,36);g.beginPath();g.moveTo(-20,51);g.quadraticCurveTo(0,26,20,51);g.fill();g.restore();
 // 舞い上がる砂
 for(let i=0;i<70;i++){const t=r(),a=-2.6+t*3.2,d=40+t*70+r()*10;g.fillStyle='rgba(255,'+(190+r()*50|0)+',110,'+(.3+r()*.6)+')';g.fillRect(96+Math.cos(a)*d,80+Math.sin(a)*d*.8,r()<.3?2:1,r()<.3?2:1)}
 // 体：砂時計に巻きついてから、左下の手前へ
 const pts=[];const A=bez([150,10],[40,40],[170,120],[90,128]),B2=bez([90,128],[40,132],[30,150],[52,168]);for(let t=0;t<=1;t+=.02)pts.push(A(t));for(let t=.02;t<=1;t+=.02)pts.push(B2(t));
 const n=pts.length;g.lineCap='round';for(const[c,m,o]of[['#2a5a3a',1,0],['#4a8a5a',.62,0],['#9aca8a',.2,0]])for(let i=0;i<n-1;i++){const[x,y]=pts[i],[x2,y2]=pts[i+1],w=4+i/n*15,a=Math.atan2(y2-y,x2-x)-Math.PI/2,sh=c==='#9aca8a'?w*.22:c==='#4a8a5a'?w*.12:0;g.strokeStyle=c;g.lineWidth=w*m+o;g.beginPath();g.moveTo(x+Math.cos(a)*sh,y+Math.sin(a)*sh);g.lineTo(x2+Math.cos(a)*sh,y2+Math.sin(a)*sh);g.stroke()}
 for(let i=0;i<n-1;i++){const[x,y]=pts[i],[x2,y2]=pts[i+1],w=4+i/n*15;
  if(i%2===0){g.fillStyle='rgba(230,200,120,.55)';const a=Math.atan2(y2-y,x2-x)+Math.PI/2;g.fillRect(x+Math.cos(a)*w*.25-1,y+Math.sin(a)*w*.25-1,2,2)}}
 // 頭：大きく口を開けて、こちらへ
 g.save();g.translate(52,170);g.rotate(2.2);q=g.createRadialGradient(-6,-6,2,0,0,22);q.addColorStop(0,'#7aaa7a');q.addColorStop(1,'#1e3a2a');g.fillStyle=q;g.beginPath();g.ellipse(0,0,22,15,0,0,7);g.fill();
 g.fillStyle='#2a0806';g.beginPath();g.moveTo(10,-6);g.lineTo(34,-16);g.lineTo(34,16);g.lineTo(10,6);g.fill();g.fillStyle='#f0e8d0';poly([[18,-9],[22,-8],[20,0]],'#f0e8d0');poly([[18,9],[22,8],[20,0]],'#f0e8d0');
 g.fillStyle='#1e3a2a';g.beginPath();g.moveTo(8,-8);g.lineTo(36,-18);g.lineTo(30,-10);g.lineTo(10,-3);g.fill();g.beginPath();g.moveTo(8,8);g.lineTo(36,18);g.lineTo(30,10);g.lineTo(10,3);g.fill();g.restore();
 for(const[ex,ey]of[[44,160],[58,158]]){glow(ex,ey,10,'rgba(255,220,80,A)',.95);g.fillStyle='#ffe060';g.beginPath();g.ellipse(ex,ey,3,2,0,0,7);g.fill();g.fillStyle='#000';g.fillRect(ex-.5,ey-2,1,4)}}),
// 3 灰鳳：翼を大きく広げて急降下する火の鳥。炎の尾と火の粉
()=>ancMk(31,['#0a0202','#2a0806','#5a1a08','#1a0402'],(g,r,glow,poly,W,H)=>{
 glow(84,96,110,'rgba(255,120,40,A)',.45);
 // 炎の尾（上へ流れる）
 for(let k=0;k<9;k++){const x0=84+(k-4)*5;let q=g.createLinearGradient(0,0,0,110);q.addColorStop(0,'rgba(255,90,20,0)');q.addColorStop(1,'rgba(255,'+(140+k*10)+',40,.5)');g.strokeStyle=q;g.lineWidth=7-Math.abs(k-4);g.beginPath();g.moveTo(x0,110);g.bezierCurveTo(x0+(k-4)*8,70,x0-(k-4)*14+Math.sin(k)*10,30,x0+(k-4)*24,-10);g.stroke()}
 // 翼：刃のような羽を3段、左右へ大きく
 for(const d of[-1,1])for(let row=0;row<3;row++)for(let k=0;k<8-row;k++){const L=(84-k*6)*(1-row*.2),a=-.25-k*.17-row*.06,W2=6-row*1.2;g.save();g.translate(84+d*10,96+row*5);g.scale(d,1);g.rotate(a);
  let q=g.createLinearGradient(0,0,L,0);q.addColorStop(0,row===0?'#ffe08a':'#ffb040');q.addColorStop(.6,row===2?'#c83a10':'#ff7a20');q.addColorStop(1,'rgba(120,20,0,.2)');g.fillStyle=q;g.beginPath();g.moveTo(0,-W2/2);g.lineTo(L*.8,-W2*.7);g.lineTo(L,0);g.lineTo(L*.8,W2*.4);g.lineTo(0,W2/2);g.fill();g.restore()}
 // 胴と頭（下へ向かって突っ込む）
 let q=g.createLinearGradient(84,80,84,140);q.addColorStop(0,'#ffe8a0');q.addColorStop(1,'#ff6a1a');g.fillStyle=q;g.beginPath();g.moveTo(74,86);g.quadraticCurveTo(84,76,94,86);g.lineTo(90,122);g.lineTo(84,134);g.lineTo(78,122);g.closePath();g.fill();
 g.fillStyle='#fff4d0';g.beginPath();g.ellipse(84,134,7,9,0,0,7);g.fill();poly([[80,140],[88,140],[84,154]],'#ffd040');poly([[84,141],[88,140],[84,152]],'#c88a10');
 for(const d of[-1,1]){g.strokeStyle='#ffd040';g.lineWidth=1.5;g.beginPath();g.moveTo(84+d*3,128);g.quadraticCurveTo(84+d*14,118,84+d*22,108);g.stroke()}
 glow(84,134,18,'rgba(255,240,180,A)',.9);g.fillStyle='#200400';g.fillRect(80,132,2,2);g.fillRect(86,132,2,2);
 // 火の粉（外へ飛び散る）
 for(let i=0;i<70;i++){const a=r()*6.283,d=20+r()*90;g.fillStyle='rgba(255,'+(140+r()*110|0)+',60,'+(.3+r()*.7)+')';g.fillRect(84+Math.cos(a)*d,110+Math.sin(a)*d*.9,r()<.3?2:1,r()<.3?3:1)}}),
// 4 晶樹：大地を割って伸びる水晶の樹。破片が四方へはじけ、実が光る
()=>ancMk(41,['#020a0a','#062420','#0a3a34','#020c0c'],(g,r,glow,poly,W,H)=>{
 glow(84,110,100,'rgba(110,240,230,A)',.35);
 for(let i=0;i<20;i++){const a=-Math.PI/2+(r()-.5)*2.6,L=60+r()*80;g.strokeStyle='rgba(140,255,240,'+(.06+r()*.12)+')';g.lineWidth=1+r()*3;g.beginPath();g.moveTo(84,130);g.lineTo(84+Math.cos(a)*L,130+Math.sin(a)*L);g.stroke()}
 // 根（光る筋）
 for(let i=0;i<9;i++){const a=(i/8)*Math.PI;g.strokeStyle='rgba(120,255,230,.5)';g.lineWidth=2;g.beginPath();g.moveTo(84,170);g.quadraticCurveTo(84+Math.cos(a)*40,174+Math.sin(a)*8,84+Math.cos(a)*90,186+Math.sin(a)*20);g.stroke()}
 // 幹：傾いた結晶の柱
 const sp=(x,y,w,h,a,c1,c2)=>{g.save();g.translate(x,y);g.rotate(a);let q=g.createLinearGradient(-w/2,0,w/2,0);q.addColorStop(0,c1);q.addColorStop(1,c2);g.fillStyle=q;g.beginPath();g.moveTo(-w/2+1.5,0);g.lineTo(-w/2+1.5,-h);g.lineTo(0,-h-w*.8);g.lineTo(w/2-1.5,-h);g.lineTo(w/2-1.5,0);g.fill();g.fillStyle='rgba(255,255,255,.35)';g.fillRect(-w/2+3,-h,2,h);g.restore()};
 sp(84,176,22,120,.05,'#c8fff4','#2a9a90');sp(70,176,14,86,-.32,'#9af0e4','#1e7a72');sp(100,176,14,92,.36,'#9af0e4','#1e7a72');sp(60,176,9,56,-.6,'#7ae8d8','#146a62');sp(110,176,9,60,.66,'#7ae8d8','#146a62');
 // 枝と実
 for(let k=0;k<6;k++){const d=k%2?1:-1,y=78+k*14,L=40-k*3;g.strokeStyle='#9af0e4';g.lineWidth=2;g.beginPath();g.moveTo(84,y);g.lineTo(84+d*L,y-14-k);g.stroke();const fx=84+d*L,fy=y-14-k;glow(fx,fy,12,'rgba(160,255,240,A)',.9);poly([[fx,fy-6],[fx+4,fy],[fx,fy+6],[fx-4,fy]],'#e8fffc')}
 // はじける破片
 for(let i=0;i<34;i++){const a=r()*6.283,d=30+r()*80,x=84+Math.cos(a)*d,y=110+Math.sin(a)*d,s=2+r()*4;g.save();g.translate(x,y);g.rotate(a);poly([[0,-s],[s*.5,0],[0,s],[-s*.5,0]],'rgba(200,255,245,'+(.4+r()*.5)+')');g.restore();g.strokeStyle='rgba(160,255,240,.18)';g.lineWidth=1;g.beginPath();g.moveTo(x,y);g.lineTo(x-Math.cos(a)*12,y-Math.sin(a)*12);g.stroke()}
 for(let i=0;i<8;i++){g.fillStyle='rgba(10,40,36,.7)';g.beginPath();g.ellipse(r()*W,182+r()*24,30+r()*20,7,0,0,7);g.fill()}}),
// 5 書殻：本で巻かれた殻を背負う大きなカタツムリ。殻は渦を巻き、頁が流れとなって舞い上がる
()=>ancMk(53,['#0c0a14','#1e1a30','#2e2a44','#0e0c16'],(g,r,glow,poly,W,H)=>{
 // 殻から吹き出し、左上へ渦を巻いて流れる頁
 const PP=bez([96,70],[120,-10],[10,0],[4,110]);for(let k=0;k<6;k++){g.strokeStyle='rgba(255,230,170,'+(.04+k*.02)+')';g.lineWidth=16-k*2.4;g.beginPath();for(let t=0;t<=1;t+=.02){const[x,y]=PP(t);g.lineTo(x,y)}g.stroke()}
 for(let i=0;i<60;i++){const t=r(),[x,y]=PP(t),sp=4+t*26,a=r()*6.283;g.save();g.translate(x+Math.cos(a)*sp*r(),y+Math.sin(a)*sp*r());g.rotate(r()*6.283);g.globalAlpha=.45+t*.55;const z=.7+t*.9;g.fillStyle='#f0e4c8';g.fillRect(-4*z,-5*z,8*z,10*z);g.fillStyle='#8a7a5a';g.fillRect(-2*z,-3*z,5*z,1);g.fillRect(-2*z,0,5*z,1);g.restore()}g.globalAlpha=1;
 // 体（左下へ滑るように）と光る跡
 g.strokeStyle='rgba(200,180,255,.25)';g.lineWidth=10;g.beginPath();g.moveTo(170,176);g.quadraticCurveTo(110,170,40,172);g.stroke();
 let q=g.createLinearGradient(0,140,0,180);q.addColorStop(0,'#c8c0d8');q.addColorStop(1,'#4a4462');g.fillStyle=q;g.beginPath();g.moveTo(138,170);g.quadraticCurveTo(80,179,28,164);g.quadraticCurveTo(18,151,31,142);g.quadraticCurveTo(60,152,138,152);g.fill();
 for(const[x,y,a]of[[34,142,-1.9],[44,144,-1.6]]){g.strokeStyle='#8a82a2';g.lineWidth=3;g.beginPath();g.moveTo(x,y);const ex=x+Math.cos(a)*30,ey=y+Math.sin(a)*30;g.quadraticCurveTo(x-6,y-14,ex,ey);g.stroke();glow(ex,ey,12,'rgba(255,240,170,A)',.95);g.fillStyle='#fff0b0';g.beginPath();g.arc(ex,ey,2.5,0,7);g.fill()}
 // 殻：本の背の色が渦を巻く
 const cx=96,cy=100;{const k=g.createRadialGradient(cx,cy,4,cx,cy,58);k.addColorStop(0,'#3a2a20');k.addColorStop(1,'rgba(40,30,50,.6)');g.fillStyle=k;g.beginPath();g.arc(cx,cy,57,0,7);g.fill()}
 const BC=['#a83a3a','#3a6aa8','#c8a040','#3a8a5a','#7a4aa0','#d07a30','#2a4a7a','#8a2a4a'];for(let i=0;i<300;i++){const t=i/300,a=t*6.283*5,R=56*(1-t)+3;g.fillStyle=BC[i%8];g.save();g.translate(cx+Math.cos(a)*R,cy+Math.sin(a)*R);g.rotate(a);g.fillRect(-1.5,-5*(1-t*.7),3,10*(1-t*.7));g.restore()}
 glow(cx-6,cy-6,40,'rgba(255,230,170,A)',.35);
 g.fillStyle='#4a3020';g.fillRect(cx-7,cy-74,14,16);poly([[cx-10,cy-73],[cx,cy-82],[cx+10,cy-73]],'#3a2a1a');g.fillStyle='#ffd890';g.fillRect(cx-3,cy-70,6,6);glow(cx,cy-67,14,'rgba(255,200,110,A)',.7);
 for(let i=0;i<30;i++){g.fillStyle='rgba(255,240,200,'+(.3+r()*.5)+')';g.fillRect(r()*W,r()*H,1,1)}})];
