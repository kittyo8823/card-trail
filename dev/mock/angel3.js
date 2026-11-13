// 天使のボスの見本3（追加しない）：金の金属装飾＋青緑の琺瑯・彫像のような顔・細長い腕と金の爪・鱗の尾。オリジナル
function angelBoss3(){const w=170,h=106,c=document.createElement('canvas');c.width=w*2;c.height=h*2;const g=c.getContext('2d');g.scale(2,2);g.translate(0,13);
 const path=pts=>{g.beginPath();pts.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]));g.closePath()};
 const P=(pts,col)=>{path(pts);g.fillStyle=col;g.fill()};
 const L=(pts,col,lw)=>{g.beginPath();pts.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]));g.strokeStyle=col;g.lineWidth=lw;g.lineCap='round';g.stroke()};
 const G=(x,y,r,rgb,a)=>{const q=g.createRadialGradient(x,y,0,x,y,r);q.addColorStop(0,'rgba('+rgb+','+a+')');q.addColorStop(1,'rgba('+rgb+',0)');g.fillStyle=q;g.fillRect(x-r,y-r,r*2,r*2)};
 // 金属の金：暗→金→白い照り→金
 const gold=(x0,y0,x1,y1)=>{const q=g.createLinearGradient(x0,y0,x1,y1);q.addColorStop(0,'#4a2e0c');q.addColorStop(.35,'#b8862a');q.addColorStop(.5,'#fff0b0');q.addColorStop(.62,'#d8a440');q.addColorStop(1,'#5a3a10');return q};
 const GP=(pts,x0,y0,x1,y1)=>{path(pts);g.fillStyle=gold(x0,y0,x1,y1);g.fill();g.strokeStyle='#3a220a';g.lineWidth=.5;g.stroke()};
 const enamel=(pts,x0,y0,x1,y1)=>{path(pts);const q=g.createLinearGradient(x0,y0,x1,y1);q.addColorStop(0,'#0e4a52');q.addColorStop(.45,'#2a9aa0');q.addColorStop(.55,'#8ee0d8');q.addColorStop(1,'#0a3440');g.fillStyle=q;g.fill()};
 const scroll=(x,y,r,s)=>{g.beginPath();for(let t=0;t<9;t+=.3){const rr=r*(1-t/10);const px=x+Math.cos(t*s)*rr,py=y+Math.sin(t*s)*rr;t?g.lineTo(px,py):g.moveTo(px,py)}g.strokeStyle='#ffe28a';g.lineWidth=.7;g.stroke()};
 const gem=(x,y,r,c1,c2)=>{G(x,y,r*2.2,'200,80,220',.35);g.fillStyle=c1;g.beginPath();g.ellipse(x,y,r,r*1.3,0,0,7);g.fill();g.fillStyle=c2;g.fillRect(x-r*.5,y-r*.8,r*.5,r*.5)};
 const hx=74,hy=34;
 G(hx,hy,70,'255,214,140',.25);
 // とげの太陽の光輪
 for(let i=0;i<24;i++){const a=i/24*6.283,r1=24,r2=i%2?30:38;GP([[hx+Math.cos(a-.05)*r1,hy+Math.sin(a-.05)*r1],[hx+Math.cos(a)*r2,hy+Math.sin(a)*r2],[hx+Math.cos(a+.05)*r1,hy+Math.sin(a+.05)*r1]],hx,hy-r2,hx+r2,hy)}
 g.beginPath();g.arc(hx,hy,25,0,7);g.strokeStyle='#5a3a10';g.lineWidth=2.4;g.stroke();g.strokeStyle='#ffe9a0';g.lineWidth=.8;g.stroke();
 // 金の刃の翼（後ろ向きに広がる層）
 for(const[ox,oy,dir]of[[hx-10,48,-1],[hx+10,48,1]])for(let k=0;k<6;k++){const a=-2.75+k*.26,ln=56-k*5,ux=Math.cos(a)*dir*-1,uy=Math.sin(a),px=-uy,py=ux;const tip=[ox+ux*ln,oy+uy*ln],m=[ox+ux*ln*.7,oy+uy*ln*.7];GP([[ox+px*3,oy+py*3],[m[0]+px*5,m[1]+py*5],tip,[m[0]-px*2,m[1]-py*2],[ox-px*3,oy-py*3]],m[0]+px*5,m[1]+py*5,m[0]-px*2,m[1]-py*2);for(let j=1;j<5;j++){const t=j/5*.9;L([[ox+ux*ln*t+px*4,oy+uy*ln*t+py*4],[ox+ux*ln*(t+.06)-px*1,oy+uy*ln*(t+.06)-py*1]],'#5a3a10',.5)}}
 // 鱗の尾（右下へうねる）
 const tp=[];for(let i=0;i<=40;i++){const t=i/40;tp.push([hx+6+t*86,74+Math.sin(t*5)*8+t*12,6*(1-t)+1])}
 for(let i=tp.length-2;i>=0;i--){const[x,y,r]=tp[i];g.fillStyle=i%2?'#b82838':'#e8e4dc';g.beginPath();g.ellipse(x,y,r+.6,r,0,0,7);g.fill();g.fillStyle=gold(x,y-r,x,y+r);g.fillRect(x-.6,y-r,1.2,r*2);if(i%3==0)GP([[x-1,y-r],[x+2,y-r-4-r*.6],[x+2,y-r]],x,y-r-5,x+2,y-r)}
 // 細長い腕×4（灰白の肌＋金の輪＋長い金の爪）
 const arm=(pts,claw)=>{L(pts,'#5a5664',4.2);L(pts,'#cfcad4',3);L(pts.map(p=>[p[0]-.6,p[1]-.8]),'#f2eef4',1);
  for(let i=1;i<pts.length;i++){const[x,y]=pts[i-1],[X,Y]=pts[i];for(const t of[.35,.6]){const rx=x+(X-x)*t,ry=y+(Y-y)*t;g.fillStyle=gold(rx-3,ry,rx+3,ry);g.beginPath();g.ellipse(rx,ry,2.6,1.4,Math.atan2(Y-y,X-x)+1.57,0,7);g.fill()}}
  const[ex,ey]=pts[pts.length-1];for(const[dx,dy]of claw)GP([[ex,ey-1],[ex+dx,ey+dy],[ex+1,ey+1.2]],ex,ey,ex+dx,ey+dy)};
 arm([[hx-8,58],[hx-26,66],[hx-38,58]],[[-22,-10],[-24,-4],[-18,2]]);
 arm([[hx-6,64],[hx-22,80],[hx-42,82]],[[-20,6],[-22,12],[-14,14]]);
 arm([[hx+10,58],[hx+28,68],[hx+40,60]],[[18,-14],[22,-8]]);
 arm([[hx+8,66],[hx+24,84],[hx+44,88]],[[16,8],[20,2]]);
 // 胴：金の胸当てと琺瑯の板、宝石
 GP([[hx-14,50],[hx+14,50],[hx+10,72],[hx,86],[hx-10,72]],hx-14,60,hx+14,60);
 enamel([[hx-10,54],[hx-2,54],[hx-2,70],[hx-7,68]],hx-10,54,hx-2,70);enamel([[hx+2,54],[hx+10,54],[hx+7,68],[hx+2,70]],hx+2,54,hx+10,70);
 for(let i=0;i<5;i++)gem(hx,58+i*5,1.2,'#7a2a9a','#e8b0ff');gem(hx,52,2.6,'#8a2aa8','#f4c8ff');
 scroll(hx-7,62,3,1);scroll(hx+7,62,3,-1);
 // 頭飾り：琺瑯の頭巾＋金の縁の大きな楕円枠
 enamel([[hx-20,40],[hx-18,14],[hx-8,4],[hx+8,4],[hx+18,14],[hx+20,40],[hx+12,52],[hx-12,52]],hx-20,20,hx+20,20);
 for(let i=0;i<7;i++){g.fillStyle=i%2?'#b82838':'#e8e4dc';g.fillRect(hx-20+i*.2,12+i*5,3,4);g.fillRect(hx+17-i*.2,12+i*5,3,4)}
 g.beginPath();g.ellipse(hx,28,14,19,0,0,7);g.lineWidth=4;g.strokeStyle=gold(hx-14,10,hx+14,46);g.stroke();
 for(let i=0;i<12;i++){const a=i/12*6.283;scroll(hx+Math.cos(a)*16.5,28+Math.sin(a)*21.5,2,i%2?1:-1)}
 // 顔：彫像のような灰白の肌、閉じた目、静かな口
 g.save();g.beginPath();g.ellipse(hx,28,12,17,0,0,7);g.clip();
 let q=g.createRadialGradient(hx-4,22,2,hx,28,20);q.addColorStop(0,'#f4f0f4');q.addColorStop(.5,'#bdb6c4');q.addColorStop(1,'#4a4454');g.fillStyle=q;g.fillRect(hx-14,8,28,40);
 P([[hx-1,22],[hx+1,22],[hx+3,33],[hx,35],[hx-3,33]],'rgba(255,255,255,.35)');P([[hx+1,24],[hx+3,33],[hx+1,35]],'rgba(60,50,70,.45)');
 for(const s of[-1,1]){P([[hx+s*2,24],[hx+s*9,23],[hx+s*9,27],[hx+s*3,27]],'rgba(70,60,80,.45)');L([[hx+s*3,25.5],[hx+s*6,26.6],[hx+s*8.6,25.2]],'#2a2030',.8);L([[hx+s*3,21.6],[hx+s*8,20.6]],'#6a6070',.7)}
 P([[hx-4,39],[hx,38],[hx+4,39],[hx,41]],'#8a6c78');L([[hx-4,39],[hx,39.6],[hx+4,39]],'#3a2030',.7);
 P([[hx-12,8],[hx+12,8],[hx+10,16],[hx-10,16]],'rgba(40,30,50,.35)');
 g.restore();
 // 冠：金の扇と琺瑯の玉
 for(let i=-3;i<=3;i++){const a=-1.57+i*.28;GP([[hx+Math.cos(a-.08)*12,2+Math.sin(a-.08)*12+12],[hx+Math.cos(a)*24,Math.sin(a)*21+12],[hx+Math.cos(a+.08)*12,2+Math.sin(a+.08)*12+12]],hx-4,-12,hx+4,0)}
 gem(hx,2,2.4,'#b82838','#ffd0d0');
 for(let i=0;i<20;i++){g.fillStyle='rgba(255,236,180,.9)';g.fillRect((i*47+3)%w,(i*31+5)%h,1,1)}
 // 2px ドット化（色は少し段階を落とすだけ）
 const s=document.createElement('canvas');s.width=w;s.height=h;const sg=s.getContext('2d');sg.imageSmoothingEnabled=true;sg.drawImage(c,0,0,w,h);
 const d=sg.getImageData(0,0,w,h),a=d.data;for(let i=0;i<a.length;i+=4){if(a[i+3]<60){a[i+3]=0;continue}for(let k=0;k<3;k++)a[i+k]=Math.round(a[i+k]/24)*24;a[i+3]=255}sg.putImageData(d,0,0);
 const o=document.createElement('canvas');o.width=w*2;o.height=h*2;const oq=o.getContext('2d');oq.imageSmoothingEnabled=false;oq.drawImage(s,0,0,w*2,h*2);return o}
