// 天使のボスの見本2（追加しない）：大きな仮面の顔がいくつも付いた不気味な天使。オリジナル
function angelBoss2(){const w=150,h=104,c=document.createElement('canvas');c.width=w;c.height=h;const g=c.getContext('2d');
 const P=(pts,col)=>{g.beginPath();pts.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]));g.closePath();g.fillStyle=col;g.fill()};
 const L=(pts,col,lw)=>{g.beginPath();pts.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]));g.strokeStyle=col;g.lineWidth=lw;g.stroke()};
 const G=(x,y,r,rgb,a)=>{const q=g.createRadialGradient(x,y,0,x,y,r);q.addColorStop(0,'rgba('+rgb+','+a+')');q.addColorStop(1,'rgba('+rgb+',0)');g.fillStyle=q;g.fillRect(x-r,y-r,r*2,r*2)};
 // 顔：陶器の仮面。eye=0 見開いた虚ろな目、1 閉じた目。笑みは横に長すぎる
 const face=(x,y,rx,ry,rot,eye,frame)=>{g.save();g.translate(x,y);g.rotate(rot);
  if(frame){for(let i=0;i<18;i++){const a=i/18*6.283;P([[Math.cos(a-.12)*rx*1.08,Math.sin(a-.12)*ry*1.08],[Math.cos(a)*rx*1.35,Math.sin(a)*ry*1.3],[Math.cos(a+.12)*rx*1.08,Math.sin(a+.12)*ry*1.08]],i%2?'#8a5c18':'#e8c460')}}
  g.beginPath();g.ellipse(0,0,rx*1.08,ry*1.08,0,0,7);g.fillStyle='#a87824';g.fill();
  const q=g.createRadialGradient(-rx*.3,-ry*.35,1,0,0,rx*1.1);q.addColorStop(0,'#fbf7ee');q.addColorStop(.6,'#e2dccc');q.addColorStop(1,'#9a9284');g.fillStyle=q;g.beginPath();g.ellipse(0,0,rx,ry,0,0,7);g.fill();
  // 鼻筋と頬の影
  P([[-.04*rx,-.25*ry],[.06*rx,-.25*ry],[.12*rx,.18*ry],[-.1*rx,.18*ry]],'rgba(150,140,120,.45)');
  const ey=-.12*ry,ex=.38*rx,ew=.26*rx,eh=.07*ry;
  for(const s of[-1,1]){if(eye){L([[s*ex-ew,ey],[s*ex,ey+eh*.9],[s*ex+ew,ey]],'#2a1c18',Math.max(1,rx*.06))}
   else{g.fillStyle='#0c0810';g.beginPath();g.ellipse(s*ex,ey,ew,eh*1.5,-s*.18,0,7);g.fill();g.fillStyle='#ffe08a';g.fillRect(s*ex-.5,ey-.4,1,1)}
   // 目から垂れる金の筋
   L([[s*ex,ey+eh*1.4],[s*ex+s*.03*rx,ey+ry*.55]],'rgba(168,120,36,.8)',Math.max(.7,rx*.04))}
  // 横に長すぎる薄い笑み
  // 小さく閉じた唇（かすかに微笑む）
  P([[-.26*rx,.42*ry],[0,.38*ry],[.26*rx,.42*ry],[0,.52*ry]],'#b89c8c');L([[-.26*rx,.42*ry],[0,.46*ry],[.26*rx,.42*ry]],'#4a2c28',Math.max(.8,rx*.05));
  // ひび
  L([[.5*rx,-.7*ry],[.32*rx,-.45*ry],[.42*rx,-.3*ry],[.28*rx,-.05*ry]],'#5a5048',.7);
  g.restore()};
 const cx=72;
 G(cx,42,60,'255,214,140',.22);
 // 翼：顔の周りから広がる、金の骨と白い刃の羽
 const fan=(ox,oy,dir,a0,a1,n,len,c1,c2)=>{for(let k=0;k<n;k++){const a=a0+(a1-a0)*k/(n-1),ln=len*(.75+.25*Math.sin(k/(n-1)*3.14)),ux=Math.cos(a)*dir,uy=Math.sin(a),px=-uy,py=ux,wd=3.2,tip=[ox+ux*ln,oy+uy*ln],m=[ox+ux*ln*.75,oy+uy*ln*.75];P([[ox+px*1.5,oy+py*1.5],[m[0]+px*wd,m[1]+py*wd],tip,[m[0]-px*wd*.6,m[1]-py*wd*.6],[ox-px*1.5,oy-py*1.5]],k%2?c1:c2);L([[ox,oy],[m[0],m[1]]],'#a87824',.8)}};
 fan(cx-6,44,-1,-2.4,-1.0,8,62,'#5e6478','#7a8094');fan(cx+6,44,1,-2.4,-1.0,8,62,'#5e6478','#7a8094');
 fan(cx-8,50,-1,-3.4,-2.3,6,56,'#c8ccd8','#eef0f6');fan(cx+8,50,1,-3.4,-2.3,6,56,'#c8ccd8','#eef0f6');
 // 下半身：長く垂れる裾が細い金の帯に裂けていく
 P([[cx-14,62],[cx+14,62],[cx+10,86],[cx-10,86]],'#1a2038');
 for(let i=0;i<7;i++){const x=cx-12+i*4;L([[x,64],[x+(i-3)*1.4,92+(i%2)*6]],i%2?'#e8c460':'#8a5c18',1.4)}
 // 細長い腕（金の骨）＋長い指
 const arm=(sx,sy,ex,ey,hx,hy)=>{L([[sx,sy],[ex,ey],[hx,hy]],'#8a5c18',2.6);L([[sx,sy],[ex,ey],[hx,hy]],'#e8c460',1);for(let f=-2;f<=2;f++)L([[hx,hy],[hx+(hx-ex)*.25+f*1.6,hy+(hy-ey)*.25+5]],'#d8ccb4',1)};
 arm(cx-14,48,cx-30,58,cx-36,72);arm(cx+14,48,cx+30,58,cx+36,72);
 // 両翼の付け根の顔（外向き）
 face(cx-32,32,8,12,-.4,0,0);face(cx+32,32,8,12,.4,1,0);
 // 胸の顔（大きく見開いた目）
 face(cx,60,9,11,0,1,0);
 // 中心の巨大な顔＋とげの光輪
 face(cx,27,14,21,0,0,1);
 // 光の粒
 for(let i=0;i<18;i++){g.fillStyle='rgba(255,236,180,.9)';g.fillRect((i*41+3)%w,(i*29+5)%h,1,1)}
 const d=g.getImageData(0,0,w,h),a=d.data,P2=HMPP;for(let i=0;i<a.length;i+=4){if(a[i+3]<50){a[i+3]=0;continue}let b=0,bd=1e9;for(let k=0;k<P2.length;k++){const p=P2[k],e=(a[i]-p[0])**2*.3+(a[i+1]-p[1])**2*.59+(a[i+2]-p[2])**2*.11;if(e<bd){bd=e;b=k}}a[i]=P2[b][0];a[i+1]=P2[b][1];a[i+2]=P2[b][2];a[i+3]=a[i+3]>150?255:a[i+3]>90?170:90}g.putImageData(d,0,0);
 const o=document.createElement('canvas');o.width=w*2;o.height=h*2;const q=o.getContext('2d');q.imageSmoothingEnabled=false;q.drawImage(c,0,0,w*2,h*2);return o}
