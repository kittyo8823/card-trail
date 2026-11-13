// 細かさ「2」の見本：74x44 で描き、2倍（148x88）に拡大して 2px のドットにする。色はくすんだ色の表から選ぶ（安っぽさを避ける：星形の衝撃を使わず、光はにじみと短い火花の線で表す）
function hmMk(pal,f){const w=74,h=44,c=document.createElement('canvas');c.width=w;c.height=h;const g=c.getContext('2d');f(g,w,h);
 const d=g.getImageData(0,0,w,h),a=d.data,P=pal.map(s=>[parseInt(s.slice(1,3),16),parseInt(s.slice(3,5),16),parseInt(s.slice(5,7),16)]);
 const BY=[0,8,2,10,12,4,14,6,3,11,1,9,15,7,13,5];for(let i=0;i<a.length;i+=4){const px=(i/4)%w,py=(i/4/w)|0,dz=(BY[(py%4)*4+px%4]/16-.47)*14;let b=0,bd=1e9;for(let k=0;k<P.length;k++){const p=P[k],e=(a[i]+dz-p[0])**2*.3+(a[i+1]+dz-p[1])**2*.59+(a[i+2]+dz-p[2])**2*.11;if(e<bd){bd=e;b=k}}a[i]=P[b][0];a[i+1]=P[b][1];a[i+2]=P[b][2];a[i+3]=255}
 g.putImageData(d,0,0);const o=document.createElement('canvas');o.width=148;o.height=88;const q=o.getContext('2d');q.imageSmoothingEnabled=false;q.drawImage(c,0,0,148,88);return o}
const HMP=(g,pts,col)=>{g.beginPath();pts.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]));g.closePath();g.fillStyle=col;g.fill()};
const artStrikeM=()=>hmMk(['#14131c','#1e1c28','#2a2734','#3a3442','#4e4250','#6a5458','#8a6a5e','#a8846c','#c8a888','#e2ccae','#3c4250','#5a6272','#848c9a','#b4b8c0','#dcdee0','#5a4424','#8a6c34','#b8984e','#2e1e14','#4a3220'],(g,W,H)=>{
 let q=g.createLinearGradient(0,0,0,H);q.addColorStop(0,'#1a1924');q.addColorStop(.6,'#3a3242');q.addColorStop(1,'#6a5458');g.fillStyle=q;g.fillRect(0,0,W,H);
 g.fillStyle='#2a2734';g.beginPath();g.moveTo(0,H*.72);for(let i=0;i<=W;i+=2)g.lineTo(i,H*.7-Math.sin(i*.12)*1.6);g.lineTo(W,H);g.lineTo(0,H);g.fill();g.fillStyle='#1e1c28';g.fillRect(W*.82,H*.5,4,H*.2);g.fillRect(W*.8,H*.48,8,2);
 // 振り抜いた軌跡：くすんだ暖色が後ろへ薄れていく
 const hx=W*.24,hy=H*.94,A=-.8,L=44;for(let a=A-1.15;a<=A-.03;a+=.01){const t=(a-(A-1.15))/1.12;for(let k=0;k<1+t*t*7;k++){const r=L*.88-k,x=hx+Math.cos(a)*r,y=hy+Math.sin(a)*r;g.fillStyle=k<1?'#e2ccae':k<3?'#c8a888':'#8a6a5e';g.globalAlpha=Math.min(1,.2+t);g.fillRect(x,y,1,1)}}g.globalAlpha=1;
 const gl=g.createRadialGradient(hx+Math.cos(A)*L*.9,hy+Math.sin(A)*L*.9,1,hx+Math.cos(A)*L*.9,hy+Math.sin(A)*L*.9,16);gl.addColorStop(0,'rgba(226,204,174,.55)');gl.addColorStop(1,'rgba(226,204,174,0)');g.fillStyle=gl;g.fillRect(0,0,W,H);
 // 剣（刃は上面が明るく、下面が暗い。鍔はくすんだ真鍮、柄は革）
 g.save();g.translate(hx,hy);g.rotate(A);HMP(g,[[6,-2.2],[39,-1.8],[44,0],[39,1.8],[6,2.2]],'#5a6272');HMP(g,[[6,-2.2],[39,-1.8],[44,0],[6,0]],'#b4b8c0');HMP(g,[[8,-.6],[37,-.5],[37,.1],[8,.1]],'#848c9a');g.fillStyle='#dcdee0';g.fillRect(18,-2,12,1);
 HMP(g,[[4,-7],[6,-7],[6,7],[4,7]],'#8a6c34');g.fillStyle='#b8984e';g.fillRect(4,-7,1,14);HMP(g,[[-8,-1.6],[4,-1.6],[4,1.6],[-8,1.6]],'#4a3220');g.fillStyle='#2e1e14';for(let k=-7;k<3;k+=3)g.fillRect(k,-1.6,1,3.2);HMP(g,[[-11,-2.4],[-8,-2.4],[-8,2.4],[-11,2.4]],'#8a6c34');g.restore();
 // 切っ先の先に散る短い火花の線
 const tx=hx+Math.cos(A)*44,ty=hy+Math.sin(A)*44;g.strokeStyle='#c8a888';g.lineWidth=.8;for(const[a,l]of[[-.2,5],[.5,4],[-.9,4],[1.1,3]]){g.beginPath();g.moveTo(tx+Math.cos(a)*3,ty+Math.sin(a)*3);g.lineTo(tx+Math.cos(a)*(3+l),ty+Math.sin(a)*(3+l));g.stroke()}});
const artDefendM=()=>hmMk(['#101418','#182026','#202c34','#2a3a44','#364a54','#4a5e66','#5a6268','#7c848a','#a2a8ac','#c8ccce','#2e2016','#46301e','#5e4228','#7a5834','#94704a','#5a4424','#8a6c34','#b8984e','#e2ccae','#c8a888'],(g,W,H)=>{
 let q=g.createLinearGradient(0,0,0,H);q.addColorStop(0,'#141a20');q.addColorStop(1,'#2a3a44');g.fillStyle=q;g.fillRect(0,0,W,H);
 for(let r=0;r*6<H;r++){const o=r%2?0:6;for(let x=-o;x<W;x+=12){g.fillStyle='#101418';g.fillRect(x,r*6,12,.7);g.fillRect(x,r*6,.7,6)}}
 const sx=W*.44,sy=H*.52;g.save();g.translate(sx,sy);g.rotate(-.14);
 const sh=[[-15,-19],[15,-19],[15,1],[10,11],[0,20],[-10,11],[-15,1]];HMP(g,sh,'#5a6268');const inn=[[-12,-16],[12,-16],[12,.5],[8,9],[0,16.5],[-8,9],[-12,.5]];HMP(g,inn,'#5e4228');
 g.save();g.beginPath();inn.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]));g.closePath();g.clip();for(let k=-12;k<12;k+=5){g.fillStyle='#46301e';g.fillRect(k+4,-17,.8,36);g.fillStyle='#7a5834';g.fillRect(k+.6,-17,1.4,36)}g.fillStyle='rgba(16,20,24,.35)';g.beginPath();g.moveTo(3,-17);g.lineTo(13,-17);g.lineTo(13,18);g.lineTo(-3,18);g.fill();g.restore();
 HMP(g,[[-15,-19],[15,-19],[12,-16],[-12,-16]],'#a2a8ac');HMP(g,[[-15,-19],[-12,-16],[-12,.5],[-15,1]],'#7c848a');
 g.fillStyle='#5a6268';g.fillRect(-13,-6,26,3);g.fillStyle='#7c848a';g.fillRect(-13,-6,26,1);g.beginPath();g.arc(0,-4.5,4,0,7);g.fillStyle='#7c848a';g.fill();g.fillStyle='#c8ccce';g.fillRect(-1.6,-6.4,2,2);g.restore();
 // 右上から打ち込まれる刃
 g.save();g.translate(W*.86,H*.04);g.rotate(2.35);HMP(g,[[0,-1.8],[26,-1.5],[30,0],[26,1.5],[0,1.8]],'#4a5e66');HMP(g,[[0,-1.8],[26,-1.5],[30,0],[0,0]],'#7c848a');g.restore();
 // 当たった所：にじむ光と、はじける短い火花の線（星形にしない）
 const ix=W*.62,iy=H*.3,gl=g.createRadialGradient(ix,iy,.5,ix,iy,11);gl.addColorStop(0,'rgba(226,204,174,.9)');gl.addColorStop(.4,'rgba(200,168,136,.45)');gl.addColorStop(1,'rgba(200,168,136,0)');g.fillStyle=gl;g.fillRect(0,0,W,H);
 g.strokeStyle='#e2ccae';g.lineWidth=.8;for(const[a,l]of[[-.6,7],[.1,6],[.8,5],[-1.4,5],[2.6,4],[1.6,4]]){g.beginPath();g.moveTo(ix+Math.cos(a)*3,iy+Math.sin(a)*3);g.lineTo(ix+Math.cos(a)*(3+l),iy+Math.sin(a)*(3+l));g.stroke()}});
// 斬撃その2：剣を枠からはみ出すほど大きく手前に。刃が画面を斜めに横切り、柄と鍔は左下で大きく見える
const artStrikeM2=()=>hmMk(['#14131c','#1e1c28','#2a2734','#3a3442','#4e4250','#6a5458','#8a6a5e','#a8846c','#c8a888','#e2ccae','#3c4250','#5a6272','#848c9a','#b4b8c0','#dcdee0','#5a4424','#8a6c34','#b8984e','#2e1e14','#4a3220'],(g,W,H)=>{
 let q=g.createLinearGradient(0,0,W,H);q.addColorStop(0,'#3a3242');q.addColorStop(.5,'#2a2734');q.addColorStop(1,'#14131c');g.fillStyle=q;g.fillRect(0,0,W,H);
 // 振りの流れ：画面いっぱいの大きな弧の帯
 for(const[r,c,al]of[[70,'#6a5458',.5],[62,'#8a6a5e',.55],[56,'#a8846c',.5],[52,'#c8a888',.45]]){g.strokeStyle=c;g.globalAlpha=al;g.lineWidth=r===70?10:r===62?6:3;g.beginPath();g.arc(W*.12,H*1.25,r,-1.75,-.42);g.stroke()}g.globalAlpha=1;
 const A=-.46;g.save();g.translate(W*.17,H*.84);g.rotate(A);
 // 刃：太く長く、枠の右上へ突き抜ける
 HMP(g,[[14,-6],[96,-5],[96,5],[14,6]],'#5a6272');HMP(g,[[14,-6],[96,-5],[96,0],[14,0]],'#b4b8c0');HMP(g,[[16,-1.4],[96,-1.2],[96,.6],[16,.6]],'#848c9a');g.fillStyle='#dcdee0';g.fillRect(30,-6,40,1.4);g.fillStyle='#3c4250';g.fillRect(14,5,82,1);
 // 刃こぼれと傷
 g.fillStyle='#3c4250';for(const[x,y]of[[42,-5.6],[58,-5.4],[74,4.6]])g.fillRect(x,y,2,1);
 // 鍔：大きな真鍮の十字
 HMP(g,[[8,-16],[14,-15],[14,15],[8,16]],'#8a6c34');g.fillStyle='#b8984e';g.fillRect(8,-16,2,32);g.fillStyle='#5a4424';g.fillRect(13,-15,1,30);g.fillStyle='#b8984e';g.fillRect(9,-1.5,4,3);
 // 柄（革巻き）と柄頭
 HMP(g,[[-10,-3.6],[8,-3.6],[8,3.6],[-10,3.6]],'#4a3220');g.fillStyle='#2e1e14';for(let k=-9;k<8;k+=3.5)g.fillRect(k,-3.6,1.2,7.2);g.fillStyle='#6a4a30';g.fillRect(-10,-3.6,18,1);
 HMP(g,[[-17,-5],[-10,-5],[-10,5],[-17,5]],'#8a6c34');g.fillStyle='#b8984e';g.fillRect(-17,-5,7,1.4);g.restore();
 // 刃に沿って走る光と、右上に散る短い火花の線
 const gl=g.createRadialGradient(W*.8,H*.18,1,W*.8,H*.18,20);gl.addColorStop(0,'rgba(226,204,174,.5)');gl.addColorStop(1,'rgba(226,204,174,0)');g.fillStyle=gl;g.fillRect(0,0,W,H);
 g.strokeStyle='#e2ccae';g.lineWidth=.8;for(const[x,y,a,l]of[[W*.78,H*.12,-.9,5],[W*.86,H*.22,-.2,6],[W*.7,H*.08,-1.6,4],[W*.92,H*.36,.3,4]]){g.beginPath();g.moveTo(x,y);g.lineTo(x+Math.cos(a)*l,y+Math.sin(a)*l);g.stroke()}});
