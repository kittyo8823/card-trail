const TIC={};function tintI(im,col){const k=(im.__id||(im.__id=Math.random()))+col;if(TIC[k])return TIC[k];const c=document.createElement('canvas');c.width=im.width;c.height=im.height;const g=c.getContext('2d');g.drawImage(im,0,0);g.globalCompositeOperation='source-in';g.fillStyle=col;g.fillRect(0,0,c.width,c.height);return TIC[k]=c}
const NCOL={0:['#7a2a22','#b04a38','#3a0e0a'],1:['#4a0a14','#8a1a2a','#1a0206'],2:['#8a6a1a','#d0a840','#3a2a06'],3:['#a0501a','#e08a3a','#401a06'],4:['#3a2a5a','#6a5a9a','#140a24'],5:['#5a3a1a','#9a6a38','#22140a'],7:['#4a0a14','#8a1a2a','#1a0206'],8:['#2a0006','#6a0a1a','#0a0002']};
window.NODEV={
 A:{bg:(x,y,r,n,th)=>{const red=n.t===1||n.t>=7||n.au;let g=ctx.createRadialGradient(x,y,2,x,y,r+6);g.addColorStop(0,red?'rgba(140,30,20,.28)':'rgba(90,60,30,.22)');g.addColorStop(1,'rgba(90,60,30,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,r+6,0,7);ctx.fill();
   // 墨のにじみ（不揃いな輪）
   ctx.strokeStyle=red?'rgba(120,20,16,.55)':'rgba(70,44,20,.45)';ctx.lineWidth=1.2;ctx.beginPath();for(let a=0;a<6.4;a+=.3){const rr=r-1+Math.sin(a*3+x)*1.2;ctx.lineTo(x+Math.cos(a)*rr,y+Math.sin(a)*rr)}ctx.stroke()},
  ic:(x,y,n,im)=>{const red=n.t===1||n.t>=7||n.au;ctx.globalAlpha*=.9;ctx.drawImage(tintI(im,red?'#7a1410':'#3a2412'),x-12,y-12);ctx.globalAlpha/=.9}},
 B:{bg:(x,y,r,n,th)=>{const c=NCOL[n.au?1:n.t]||NCOL[0],L=14;ctx.fillStyle='rgba(0,0,0,.35)';ctx.beginPath();ctx.arc(x+1.5,y+2.5,r+1,0,7);ctx.fill();
   ctx.fillStyle=c[2];ctx.beginPath();for(let i=0;i<=L*2;i++){const a=i/(L*2)*6.283,rr=(i%2?r+.5:r+2.2);ctx.lineTo(x+Math.cos(a)*rr,y+Math.sin(a)*rr)}ctx.fill();
   let g=ctx.createRadialGradient(x-r*.4,y-r*.45,1,x,y,r+1);g.addColorStop(0,c[1]);g.addColorStop(.6,c[0]);g.addColorStop(1,c[2]);ctx.fillStyle=g;ctx.beginPath();for(let i=0;i<=L*2;i++){const a=i/(L*2)*6.283,rr=(i%2?r-.5:r+1.2);ctx.lineTo(x+Math.cos(a)*rr,y+Math.sin(a)*rr)}ctx.fill();
   ctx.strokeStyle='rgba(0,0,0,.35)';ctx.lineWidth=1;ctx.beginPath();ctx.arc(x,y,r-3.5,0,7);ctx.stroke();ctx.strokeStyle='rgba(255,255,255,.18)';ctx.beginPath();ctx.arc(x,y,r-3.5,3.4,5.2);ctx.stroke()},
  ic:(x,y,n,im)=>{const c=NCOL[n.au?1:n.t]||NCOL[0];ctx.drawImage(tintI(im,'rgba(0,0,0,.45)'),x-11,y-10);ctx.drawImage(tintI(im,'#f4e4c4'),x-12,y-12)}}};
const nzOct=(x,y,r)=>{ctx.beginPath();for(let i=0;i<8;i++){const a=Math.PI/8+i*Math.PI/4;ctx.lineTo(x+Math.cos(a)*r,y+Math.sin(a)*r)}ctx.closePath()};
NODEV.A={bg:(x,y,r,n,th)=>{const red=n.t===1||n.t>=7||n.au;ctx.fillStyle='rgba(0,0,0,.45)';nzOct(x+1.5,y+2.5,r+1.5);ctx.fill();
  let g=ctx.createLinearGradient(x-r,y-r,x+r,y+r);g.addColorStop(0,red?'#7a3a3e':'#6a6470');g.addColorStop(.5,red?'#4a1a20':'#3e3a46');g.addColorStop(1,red?'#1e0608':'#16141c');ctx.fillStyle=g;nzOct(x,y,r+1.5);ctx.fill();
  g=ctx.createRadialGradient(x,y-2,2,x,y,r);g.addColorStop(0,red?'#2a0a0e':'#1c1a24');g.addColorStop(1,red?'#14040a':'#0c0a12');ctx.fillStyle=g;nzOct(x,y,r-1.8);ctx.fill();
  ctx.strokeStyle='rgba(255,255,255,.22)';ctx.lineWidth=1;ctx.beginPath();for(let i=4;i<=7;i++){const a=Math.PI/8+i*Math.PI/4;ctx.lineTo(x+Math.cos(a)*(r+1),y+Math.sin(a)*(r+1))}ctx.stroke();
  ctx.fillStyle=red?'#ff5a5a':'#c8a050';ctx.beginPath();ctx.moveTo(x,y-r-4);ctx.lineTo(x+2.5,y-r-1.5);ctx.lineTo(x,y-r+1);ctx.lineTo(x-2.5,y-r-1.5);ctx.fill()},
 ic:(x,y,n,im)=>{ctx.drawImage(im,x-12,y-12)}};
NODEV.B.ic=(x,y,n,im)=>{ctx.drawImage(tintI(im,'rgba(0,0,0,.5)'),x-11,y-10);ctx.drawImage(im,x-12,y-12)};
const nzPale=(k)=>({bg:(x,y,r,n,th)=>{const red=n.t===1||n.t>=7||n.au;ctx.save();ctx.globalAlpha*=k.ra;pc(x,y,r+1,red?'#7a1020':th.ring);ctx.globalAlpha=ctx.globalAlpha/k.ra*k.da;pc(x,y,r-1,n.t===8?'#140006':th.nb);ctx.restore()},
 ic:(x,y,n,im)=>{ctx.save();ctx.filter='saturate('+k.s+') brightness('+k.b+')';ctx.globalAlpha*=k.ia;ctx.drawImage(im,x-12,y-12);ctx.restore()}});
NODEV.P1=nzPale({ra:.55,da:.55,s:.6,b:1.05,ia:.85});NODEV.P2=nzPale({ra:.35,da:.35,s:.4,b:1.1,ia:.7});
// 地図ごとの色で2色刷りにした絵（暗い色d〜明るい色l）
const NZDTC={};function nzDuo(im,d,l,inv){const k=(im.__id||(im.__id=Math.random()))+d+l+(inv?'i':'');if(NZDTC[k])return NZDTC[k];const c=document.createElement('canvas');c.width=im.width;c.height=im.height;const g=c.getContext('2d');g.filter='grayscale(1) contrast(1.1)'+(inv?' invert(1)':'');g.drawImage(im,0,0);g.filter='none';g.globalCompositeOperation='multiply';g.fillStyle=l;g.fillRect(0,0,c.width,c.height);g.globalCompositeOperation='screen';g.fillStyle=d;g.fillRect(0,0,c.width,c.height);g.globalCompositeOperation='destination-in';g.drawImage(im,0,0);return NZDTC[k]=c}
const NZSP=[{c0:'#f0dcb4',c1:'#b8946a',sh:'90,60,30',d:'#3a2010',l:'#fff4e0',rd:'#6a1008',rl:'#ffe8e0',gl:'255,230,180',inv:1},
 {c0:'#9a90b0',c1:'#4e4664',sh:'0,0,0',d:'#1e1830',l:'#f0e8ff',rd:'#3a0a14',rl:'#ffc8d0',gl:'200,180,255'},
 {c0:'#4aa8a8',c1:'#14404a',sh:'0,0,0',d:'#062026',l:'#dcfff8',rd:'#3a0a14',rl:'#ffd0d8',gl:'110,240,230'},
 {c0:'#a04050',c1:'#4a1018',sh:'0,0,0',d:'#200408',l:'#ffe0e4',rd:'#200408',rl:'#ffe0e4',gl:'255,120,140'}];
NODEV.S={bg:(x,y,r,n,th)=>{const p=NZSP[Math.max(0,(P.act||1)-1)]||NZSP[0],red=n.t===1||n.t>=7||n.au;
  let g=ctx.createRadialGradient(x,y+4,2,x,y+4,r+6);g.addColorStop(0,'rgba('+p.sh+',.35)');g.addColorStop(1,'rgba('+p.sh+',0)');ctx.fillStyle=g;ctx.fillRect(x-r-8,y-r-4,r*2+16,r*2+16);
  g=ctx.createRadialGradient(x,y,1,x,y,r+5);g.addColorStop(0,'rgba('+p.gl+',.28)');g.addColorStop(1,'rgba('+p.gl+',0)');ctx.fillStyle=g;ctx.fillRect(x-r-6,y-r-6,r*2+12,r*2+12);
  g=ctx.createRadialGradient(x-r*.35,y-r*.4,1,x,y,r+.5);g.addColorStop(0,red?'#e8a8a0':p.c0);g.addColorStop(1,red?'#6a2028':p.c1);ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.fill();
  ctx.strokeStyle='rgba(255,255,255,.28)';ctx.lineWidth=1;ctx.beginPath();ctx.arc(x,y,r-1,3.5,5.4);ctx.stroke()},
 ic:(x,y,n,im)=>{const p=NZSP[Math.max(0,(P.act||1)-1)]||NZSP[0],red=n.t===1||n.t>=7||n.au;ctx.drawImage(nzDuo(im,red?p.rd:p.d,red?p.rl:p.l,p.inv),x-12,y-12);ctx.save();ctx.globalAlpha*=.22;ctx.drawImage(im,x-12,y-12);ctx.restore()}};
