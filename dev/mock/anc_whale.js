// 響骨のフルアートカード絵の見本：星の海から骨の鯨が身をひねって飛び出し、歌の波紋を放つ
function ancWhale(){const W=168,H=212,cv=document.createElement('canvas');cv.width=W;cv.height=H;const g=cv.getContext('2d');
 // 空：深い青から下は雲海の明るさ
 let q=g.createLinearGradient(0,0,0,H);q.addColorStop(0,'#04061a');q.addColorStop(.55,'#101c4a');q.addColorStop(1,'#2a3a78');g.fillStyle=q;g.fillRect(0,0,W,H);
 let s=7;const r=()=>(s=(s*1103515245+12345)&0x7fffffff)/0x7fffffff;
 for(let i=0;i<90;i++){const x=r()*W,y=r()*H*.8,a=.3+r()*.7;g.fillStyle='rgba(220,235,255,'+a+')';g.fillRect(x,y,r()<.15?2:1,r()<.15?2:1)}
 const glow=(x,y,R,c,a)=>{const k=g.createRadialGradient(x,y,1,x,y,R);k.addColorStop(0,c.replace('A',a));k.addColorStop(1,c.replace('A',0));g.fillStyle=k;g.fillRect(x-R,y-R,R*2,R*2)};
 // 背骨の通り道：右上の尾から、大きく弧を描いて左下の頭へ（手前に向かって大きくなる）
 const P=t=>{const u=1-t;return[u*u*u*160+3*u*u*t*150+3*u*t*t*30+t*t*t*48,u*u*u*150+3*u*u*t*6+3*u*t*t*130+t*t*t*62]};
 g.save();g.translate(10,34);g.scale(.92,.92);
 // 速さの筋（通り道に沿った光の帯）
 for(let k=0;k<7;k++){g.strokeStyle='rgba(140,200,255,'+(.05+k*.012)+')';g.lineWidth=10-k;g.beginPath();for(let t=0;t<=.88;t+=.02){const[x,y]=P(t),o=(k-3)*5*(1-t);if(t===0)g.moveTo(x+o,y-o);else g.lineTo(x+o,y-o)}g.stroke()}
 // 歌の波紋（頭の前から広がる）
 const hx=16,hy=24;for(let i=0;i<6;i++){g.strokeStyle='rgba(170,220,255,'+(.5-i*.07)+')';g.lineWidth=2.4-i*.3;g.beginPath();g.ellipse(hx,hy,12+i*14,7+i*9,-1.0,Math.PI*.5,Math.PI*1.9);g.stroke()}
 glow(hx,hy,60,'rgba(150,210,255,A)',.35);
 const bone='#e8f0ff',bd='#3a4a7a';
 // 肋骨と背骨（尾→頭の順に描き、手前ほど太い）
 const N=22;for(let i=0;i<N;i++){const t=i/N*.86+.02,[x,y]=P(t),[x2,y2]=P(t+.01),ang=Math.atan2(y2-y,x2-x),sz=2+t*7;
  if(t>.25&&t<.8){const L=(10+t*40)*(t<.7?1:(.8-t)*10),sw=Math.sin(t*20)*.15;for(const sd of[1,-.55]){const a=ang+Math.PI/2*sd+sw;g.strokeStyle=bd;g.lineWidth=sz*.55+1.4;g.beginPath();g.moveTo(x,y);g.quadraticCurveTo(x+Math.cos(a)*L*.6+Math.cos(ang)*L*.25,y+Math.sin(a)*L*.6+Math.sin(ang)*L*.25,x+Math.cos(a)*L+Math.cos(ang)*L*.1,y+Math.sin(a)*L+Math.sin(ang)*L*.1);g.stroke();g.strokeStyle=sd>0?bone:'#a8b8e0';g.lineWidth=sz*.55;g.stroke()}}
  g.save();g.translate(x,y);g.rotate(ang);g.fillStyle=bd;g.fillRect(-sz/2-1,-sz/2-1,sz+2,sz+2);g.fillStyle=bone;g.fillRect(-sz/2,-sz/2,sz,sz);g.fillStyle='#fff';g.fillRect(-sz/2,-sz/2,sz,1);g.restore()}
 // 尾びれ（右上で大きくしなる）
 {const[x,y]=P(0);g.save();g.translate(x,y);g.rotate(1.9);for(const d of[-1,1]){g.fillStyle=bd;g.beginPath();g.moveTo(0,0);g.quadraticCurveTo(10,d*6,26,d*22);g.quadraticCurveTo(12,d*12,0,d*3);g.fill();g.strokeStyle=bone;g.lineWidth=1;for(let k=0;k<4;k++){g.beginPath();g.moveTo(1,d);g.lineTo(9+k*5,d*(5+k*5));g.stroke()}}g.restore()}
 // 胸びれ（手前に大きく広がる）
 {const[x,y]=P(.8);g.strokeStyle=bd;g.lineWidth=4;g.beginPath();g.moveTo(x,y);g.quadraticCurveTo(x+30,y-4,x+58,y+14);g.stroke();g.strokeStyle=bone;g.lineWidth=2.4;g.stroke();for(let k=1;k<5;k++){const t=k/5;g.fillStyle=bone;g.fillRect(x+58*t*t-2,y+14*t*t-4*t-2,4,4)}}
 // 頭骨：左下、口を大きく開けて歌う
 {const x=48,y=58;g.save();g.translate(x,y);g.rotate(1.1);g.scale(1.45,1.45);
  g.fillStyle=bd;g.beginPath();g.moveTo(14,-14);g.quadraticCurveTo(-10,-22,-38,-8);g.lineTo(-36,-1);g.quadraticCurveTo(-8,-6,16,4);g.fill();
  let k=g.createLinearGradient(0,-20,0,4);k.addColorStop(0,'#ffffff');k.addColorStop(1,'#a8b8e0');g.fillStyle=k;g.beginPath();g.moveTo(12,-12);g.quadraticCurveTo(-10,-19,-35,-7);g.lineTo(-33,-3);g.quadraticCurveTo(-8,-8,14,2);g.fill();
  g.fillStyle=bd;g.beginPath();g.moveTo(14,6);g.quadraticCurveTo(-8,8,-34,20);g.lineTo(-32,25);g.quadraticCurveTo(-6,14,16,12);g.fill();g.fillStyle='#c8d4f0';g.beginPath();g.moveTo(13,7);g.quadraticCurveTo(-8,9,-32,21);g.lineTo(-31,23);g.quadraticCurveTo(-6,13,15,10);g.fill();
  g.fillStyle='#0a1030';g.beginPath();g.ellipse(4,-7,4,3,0,0,7);g.fill();g.fillStyle='#9ff0ff';g.fillRect(3,-8,3,2);g.restore();glow(44+4*Math.cos(1.1)+7*Math.sin(1.1),54+4*Math.sin(1.1)-7*Math.cos(1.1),10,'rgba(160,240,255,A)',.9)}
 g.restore();
 // 雲海を割る飛沫（下）
 for(let i=0;i<9;i++){g.fillStyle='rgba(60,80,150,'+(.55+i*.04)+')';g.beginPath();g.ellipse(r()*W,H-8+r()*14,30+r()*30,10+r()*6,0,0,7);g.fill()}
 for(let i=0;i<26;i++){const a=-Math.PI*(.15+r()*.7),d=10+r()*50;g.fillStyle='rgba(220,235,255,'+(.4+r()*.5)+')';g.fillRect(60+Math.cos(a)*d,196+Math.sin(a)*d*.8,2,2)}
 // 渦を巻いてついてくる光の魚
 for(let i=0;i<16;i++){const t=.1+i*.05,[x,y]=P(Math.min(.95,t)),o=Math.sin(i*1.7)*16;g.fillStyle='rgba(150,230,255,.18)';g.beginPath();g.arc(x+o,y-o*.6,4,0,7);g.fill();g.fillStyle='#c8f4ff';g.fillRect(x+o-1,y-o*.6-1,3,2)}
 // 光のにじみと周りを暗く
 {const B=document.createElement('canvas');B.width=42;B.height=53;const bx=B.getContext('2d');bx.filter='blur(2px)';bx.drawImage(cv,0,0,42,53);g.globalCompositeOperation='screen';g.globalAlpha=.55;g.drawImage(B,0,0,W,H);g.globalAlpha=1;g.globalCompositeOperation='source-over'}
 let vg=g.createRadialGradient(W/2,H*.5,60,W/2,H*.5,150);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,0,.45)');g.fillStyle=vg;g.fillRect(0,0,W,H);return cv}
