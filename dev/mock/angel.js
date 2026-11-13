// 天使のボスの見本（追加しない・見るだけ）。オリジナル：白銀の装甲＋金の縁取り・仮面の顔・とがった光輪・三対の刃の翼・錫杖・浮いた体
function angelBoss(){const w=150,h=100,c=document.createElement('canvas');c.width=w;c.height=h;const g=c.getContext('2d');
 const P=(pts,col)=>{g.beginPath();pts.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]));g.closePath();g.fillStyle=col;g.fill()};
 const L=(pts,col,lw)=>{g.beginPath();pts.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]));g.strokeStyle=col;g.lineWidth=lw;g.stroke()};
 const G=(x,y,r,rgb,a)=>{const q=g.createRadialGradient(x,y,0,x,y,r);q.addColorStop(0,'rgba('+rgb+','+a+')');q.addColorStop(1,'rgba('+rgb+',0)');g.fillStyle=q;g.fillRect(x-r,y-r,r*2,r*2)};
 const cx=75,hy=22;
 G(cx,34,46,'255,220,140',.28);
 // 光輪：二重の金の輪＋とげ
 for(let i=0;i<20;i++){const a=i/20*6.283,r1=15,r2=i%2?19:24;const x0=cx-3,y0=hy-1;P([[x0+Math.cos(a-.09)*r1,y0+Math.sin(a-.09)*r1],[x0+Math.cos(a)*r2,y0+Math.sin(a)*r2],[x0+Math.cos(a+.09)*r1,y0+Math.sin(a+.09)*r1]],i%2?'#a87824':'#f0cc60')}
 g.beginPath();g.arc(cx-3,hy-1,15,0,7);g.strokeStyle='#8a5c18';g.lineWidth=3;g.stroke();g.strokeStyle='#ffe08a';g.lineWidth=1.2;g.stroke();
 // 翼：根元から扇状に刃の羽（座標で直接描く）
 const wing=(ox,oy,dir,a0,a1,n,len,c1,c2)=>{for(let k=0;k<n;k++){const a=a0+(a1-a0)*k/(n-1),ln=len*(1-Math.abs(k-(n-1)*.35)/(n*1.6)),ux=Math.cos(a)*dir,uy=Math.sin(a),px=-uy,py=ux,wd=3.4;
  const tip=[ox+ux*ln,oy+uy*ln],m=[ox+ux*ln*.78,oy+uy*ln*.78];
  P([[ox+px*wd*.6,oy+py*wd*.6],[m[0]+px*wd,m[1]+py*wd],tip,[m[0]-px*wd*.7,m[1]-py*wd*.7],[ox-px*wd*.6,oy-py*wd*.6]],k%2?c1:c2);
  L([[ox+ux*ln*.15,oy+uy*ln*.15],[m[0],m[1]]],'#c89a3c',.7)}};
 // 奥の翼（暗め）→ 手前（明るい）
 wing(cx-4,40,-1,-2.3,-1.25,7,58,'#6e7488','#8a90a4');wing(cx+6,40,1,-2.3,-1.25,7,58,'#6e7488','#8a90a4');
 wing(cx-4,42,-1,-3.1,-2.35,7,62,'#b4bccc','#d2d8e4');wing(cx+6,42,1,-3.1,-2.35,7,62,'#b4bccc','#d2d8e4');
 wing(cx-4,46,-1,-3.75,-3.2,5,42,'#e4e8f0','#ffffff');wing(cx+6,46,1,-3.75,-3.2,5,42,'#e4e8f0','#ffffff');
 // 下：紺の布の裾＋白い板＋金の鎖
 P([[cx-10,56],[cx+12,56],[cx+18,80],[cx+6,86],[cx-4,82],[cx-16,86],[cx-18,78]],'#1e2a48');
 for(const[x,d]of[[cx-12,-1],[cx-2,0],[cx+9,1]]){P([[x-4,58],[x+4,58],[x+5+d*3,82],[x+d*3,87],[x-5+d*3,82]],d>0?'#a4acc0':'#dfe4ee');L([[x-4,58],[x-5+d*3,82],[x+d*3,87],[x+5+d*3,82],[x+4,58]],'#c89a3c',.8)}
 for(const x of[cx-14,cx-3,cx+12]){for(let i=0;i<5;i++){g.fillStyle=i%2?'#f0cc60':'#8a5c18';g.fillRect(x-1,88+i*2,2,1.6)}G(x,99,3,'255,230,150',.8)}
 // 胴：白銀の胸当て（右側を影）
 P([[cx-10,32],[cx+13,32],[cx+15,42],[cx+9,57],[cx-7,57],[cx-12,42]],'#e8ecf4');P([[cx+3,32],[cx+13,32],[cx+15,42],[cx+9,57],[cx+3,57]],'#9aa2b8');
 L([[cx-10,32],[cx+13,32],[cx+15,42],[cx+9,57],[cx-7,57],[cx-12,42],[cx-10,32]],'#a87824',1.2);
 L([[cx-6,40],[cx,36],[cx+7,40]],'#f0cc60',.9);L([[cx-4,50],[cx+1,46],[cx+6,50]],'#f0cc60',.9);
 P([[cx,41],[cx+4,44],[cx,50],[cx-3,44]],'#f0cc60');G(cx+.5,45,6,'255,236,170',.8);g.fillStyle='#fff8dc';g.fillRect(cx,44,1.4,2);
 // 肩当て：重なる羽の形
 for(const[x,d,col]of[[cx-11,-1,'#e8ecf4'],[cx+14,1,'#b4bccc']]){for(let j=0;j<3;j++)P([[x-3*d,30+j*2],[x+7*d,29+j*3],[x+9*d,33+j*3],[x+1*d,35+j*2]],j%2?col:'#ffffff');L([[x-3*d,30],[x+7*d,29],[x+9*d,33]],'#c89a3c',.8)}
 // 首・頭：仮面（右寄せの斜め顔）
 P([[cx,27],[cx+5,27],[cx+5,33],[cx,33]],'#7a8298');
 P([[cx-5,13],[cx+5,10],[cx+10,15],[cx+10,24],[cx+5,30],[cx-1,31],[cx-5,25]],'#f4f6fa');P([[cx+4,10],[cx+10,15],[cx+10,24],[cx+5,30],[cx+4,30]],'#b4bccc');
 g.fillStyle='#141c30';g.fillRect(cx-2,19,10,2);G(cx+5,20,5,'255,214,110',1);g.fillStyle='#ffe89a';g.fillRect(cx+2,19,5,1.2);
 L([[cx+1,24],[cx+8,24]],'#a87824',.7);L([[cx+3,11],[cx+2,18]],'#c89a3c',.7);
 // 冠：後ろへ流れる金の角
 for(let i=0;i<4;i++)P([[cx-5+i*3,13-i*.8],[cx-13+i*3,3+i*1.6],[cx-2+i*3,12-i*.8]],i%2?'#a87824':'#f0cc60');
 // 奥の手：光の玉
 P([[cx-9,36],[cx-15,41],[cx-21,45],[cx-19,48],[cx-12,44]],'#9aa2b8');G(cx-22,44,10,'255,240,190',.95);g.fillStyle='#ffffff';g.beginPath();g.arc(cx-22,44,2.6,0,7);g.fill();
 // 前の腕と錫杖
 g.fillStyle='#8a5c18';g.fillRect(cx+24,6,2.6,90);g.fillStyle='#f0cc60';g.fillRect(cx+24,6,1,90);
 P([[cx+25,-1],[cx+29,7],[cx+25,12],[cx+21,7]],'#f0cc60');P([[cx+17,6],[cx+33,6],[cx+31,9],[cx+19,9]],'#c89a3c');G(cx+25,7,11,'255,230,150',.7);
 P([[cx+12,34],[cx+18,36],[cx+25,46],[cx+22,49],[cx+15,41]],'#d2d8e4');P([[cx+21,45],[cx+28,44],[cx+29,50],[cx+22,51]],'#e8ecf4');L([[cx+21,45],[cx+28,44]],'#c89a3c',.8);
 for(let i=0;i<16;i++){g.fillStyle='rgba(255,236,180,.9)';g.fillRect((i*37+5)%w,(i*53+7)%h,1,1)}
 const d=g.getImageData(0,0,w,h),a=d.data,P2=HMPP;for(let i=0;i<a.length;i+=4){if(a[i+3]<50){a[i+3]=0;continue}const al=a[i+3]/255;if(al<1){/*薄い光は明るく*/}let b=0,bd=1e9;for(let k=0;k<P2.length;k++){const p=P2[k],e=(a[i]-p[0])**2*.3+(a[i+1]-p[1])**2*.59+(a[i+2]-p[2])**2*.11;if(e<bd){bd=e;b=k}}a[i]=P2[b][0];a[i+1]=P2[b][1];a[i+2]=P2[b][2];a[i+3]=a[i+3]>150?255:a[i+3]>90?170:90}g.putImageData(d,0,0);
 const o=document.createElement('canvas');o.width=w*2;o.height=h*2;const q=o.getContext('2d');q.imageSmoothingEnabled=false;q.translate(w*2,0);q.scale(-1,1);q.drawImage(c,0,0,w*2,h*2);return o}
