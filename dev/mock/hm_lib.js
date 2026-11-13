// ===== カードの絵・細かさ2（Ver3.15〜、ユーザー採用）：74x44 で描き、くすんだ色の表に寄せて（ディザあり）2倍の 2px ドットに。
// 決まり：衝撃を星形にしない（光のにじみと短い火花の線）・おもちゃのような彩度の高い色を使わない・キャラは全身を描かず手や腕だけ
const HMPAL=['#0e0d12','#17151e','#211e2a','#2c2836','#3a3442','#4e4250','#6a5458','#8a6a5e','#a8846c','#c8a888','#e2ccae',
 '#2a3038','#3c4450','#5a6272','#848c9a','#b4b8c0','#dcdee0','#5a4424','#8a6c34','#b8984e','#2e1e14','#4a3220','#6a4a30',
 '#3a1414','#5a1e1c','#7e2a24','#a63a2c','#c8583a','#d88a48','#e8b070','#2a3426','#3e4a34','#5a6a48','#283a40','#3a5058','#5a7078','#86a0a4','#2a2a44','#3e3e66','#6a6a98'];
const HMPP=HMPAL.map(s=>[parseInt(s.slice(1,3),16),parseInt(s.slice(3,5),16),parseInt(s.slice(5,7),16)]),HMBY=[0,8,2,10,12,4,14,6,3,11,1,9,15,7,13,5];
function hmMk(f){const w=74,h=44,c=document.createElement('canvas');c.width=w;c.height=h;const g=c.getContext('2d');f(g,w,h);const d=g.getImageData(0,0,w,h),a=d.data,P=HMPP;
 for(let i=0;i<a.length;i+=4){const px=(i>>2)%w,py=((i>>2)/w)|0,dz=(HMBY[(py&3)*4+(px&3)]/16-.47)*14;let b=0,bd=1e9;for(let k=0;k<P.length;k++){const p=P[k],e=(a[i]+dz-p[0])**2*.3+(a[i+1]+dz-p[1])**2*.59+(a[i+2]+dz-p[2])**2*.11;if(e<bd){bd=e;b=k}}a[i]=P[b][0];a[i+1]=P[b][1];a[i+2]=P[b][2];a[i+3]=255}
 g.putImageData(d,0,0);const o=document.createElement('canvas');o.width=148;o.height=88;const q=o.getContext('2d');q.imageSmoothingEnabled=false;q.drawImage(c,0,0,148,88);return o}
// 部品
const hP=(g,pts,c)=>{g.beginPath();pts.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]));g.closePath();g.fillStyle=c;g.fill()};
const hL=(g,x1,y1,x2,y2,c,w)=>{g.strokeStyle=c;g.lineWidth=w||1;g.beginPath();g.moveTo(x1,y1);g.lineTo(x2,y2);g.stroke()};
const hG=(g,x,y,r,rgb,a)=>{const q=g.createRadialGradient(x,y,.5,x,y,r);q.addColorStop(0,'rgba('+rgb+','+a+')');q.addColorStop(1,'rgba('+rgb+',0)');g.fillStyle=q;g.fillRect(x-r,y-r,r*2,r*2)};
const hBg=(g,cs,rad)=>{const W=74,H=44;let q=rad?g.createRadialGradient(W*rad[0],H*rad[1],2,W*rad[0],H*rad[1],60):g.createLinearGradient(0,0,0,H);cs.forEach((c,i)=>q.addColorStop(i/(cs.length-1),c));g.fillStyle=q;g.fillRect(0,0,W,H)};
const hGround=(g,y,c1,c2)=>{g.fillStyle=c1;g.fillRect(0,y,74,44-y);g.fillStyle=c2;for(let i=0;i<74;i+=3)g.fillRect(i,y+((i*5)%3),2,1)};
const hSpk=(g,x,y,n,l,c,a0,sp)=>{for(let k=0;k<n;k++){const a=(a0||0)+(sp||6.283)*(k/n)+((k*7)%5)*.08,L=l*(.6+((k*3)%4)*.15);hL(g,x+Math.cos(a)*2.5,y+Math.sin(a)*2.5,x+Math.cos(a)*(2.5+L),y+Math.sin(a)*(2.5+L),c||'#e2ccae',.8)}};
const hHit=(g,x,y,r)=>{hG(g,x,y,r||9,'226,204,174',.8);hSpk(g,x,y,7,5)};
const hArc=(g,cx,cy,r,a0,a1,w,sy)=>{const n=Math.abs(a1-a0)/.012;for(let i=0;i<=n;i++){const t=i/n,a=a0+(a1-a0)*t;for(let k=0;k<1+t*t*(w||7);k++){const rr=r-k,x=cx+Math.cos(a)*rr,y=cy+Math.sin(a)*rr*(sy||1);g.globalAlpha=Math.min(1,.15+t);g.fillStyle=k<1?'#e2ccae':k<3?'#c8a888':'#8a6a5e';g.fillRect(x,y,1,1)}}g.globalAlpha=1};
const hDust=(g,x,y,n,w,c)=>{for(let i=0;i<n;i++){g.fillStyle=c||'rgba(138,106,94,.55)';g.beginPath();g.ellipse(x-w/2+i*w/n,y-((i*3)%3),3.5,1.6,0,0,7);g.fill()}};
const hSpeed=(g,ys,x0,x1,c)=>{for(const y of ys)hL(g,x0,y,x1,y,c||'rgba(200,168,136,.4)',.6)};
// 剣：(x,y) が柄頭側、a の向きへ刃。L 長さ、w 刃の半分の太さ
function hSword(g,x,y,a,L,w,o){o=o||{};w=w||2.2;g.save();g.translate(x,y);g.rotate(a);const b=L*.22,bc=o.bc||['#5a6272','#b4b8c0','#848c9a','#dcdee0'];
 hP(g,[[b,-w],[L-w*2.2,-w*.85],[L,0],[L-w*2.2,w*.85],[b,w]],bc[0]);hP(g,[[b,-w],[L-w*2.2,-w*.85],[L,0],[b,0]],bc[1]);hP(g,[[b+2,-w*.25],[L-w*3,-w*.2],[L-w*3,w*.1],[b+2,w*.1]],bc[2]);g.fillStyle=bc[3];g.fillRect(b+L*.12,-w,L*.3,.8);
 const gw=o.gw||w*3.2;hP(g,[[b-2,-gw],[b,-gw],[b,gw],[b-2,gw]],o.gc||'#8a6c34');g.fillStyle='#b8984e';g.fillRect(b-2,-gw,.9,gw*2);
 hP(g,[[1.5,-w*.75],[b-2,-w*.75],[b-2,w*.75],[1.5,w*.75]],'#4a3220');g.fillStyle='#2e1e14';for(let k=2.5;k<b-2;k+=2.5)g.fillRect(k,-w*.75,.8,w*1.5);hP(g,[[-1.5,-w],[1.5,-w],[1.5,w],[-1.5,w]],'#8a6c34');g.restore()}
// 斧：(x,y) 柄の下端、a の向き、L 柄の長さ
function hAxe(g,x,y,a,L,s){s=s||1;g.save();g.translate(x,y);g.rotate(a);hP(g,[[0,-1.2],[L,-1.2],[L,1.2],[0,1.2]],'#4a3220');g.fillStyle='#6a4a30';g.fillRect(0,-1.2,L,.8);
 g.translate(L-6*s,0);hP(g,[[-2*s,-1.5],[4*s,-1.5],[7*s,-9*s],[9*s,-8*s],[8*s,1],[9*s,9*s],[7*s,10*s],[4*s,2],[-2*s,2]],'#5a6272');hP(g,[[4*s,-1.5],[7*s,-9*s],[9*s,-8*s],[8*s,0],[4*s,0]],'#b4b8c0');g.fillStyle='#dcdee0';g.fillRect(8*s,-7*s,1,13*s);g.restore()}
// 盾（上がまっすぐで下がとがる）
function hShield(g,x,y,s,r,o){o=o||{};g.save();g.translate(x,y);g.rotate(r||0);g.scale(s,s);const sh=[[-15,-19],[15,-19],[15,1],[10,11],[0,20],[-10,11],[-15,1]],inn=[[-12,-16],[12,-16],[12,.5],[8,9],[0,16.5],[-8,9],[-12,.5]];
 hP(g,sh,o.rim||'#5a6268');hP(g,inn,o.f||'#5e4228');g.save();g.beginPath();inn.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]));g.closePath();g.clip();
 if(!o.plain)for(let k=-12;k<12;k+=5){g.fillStyle=o.d||'#46301e';g.fillRect(k+4,-17,.8,36);g.fillStyle=o.l||'#7a5834';g.fillRect(k+.6,-17,1.4,36)}g.fillStyle='rgba(16,20,24,.35)';g.beginPath();g.moveTo(3,-17);g.lineTo(13,-17);g.lineTo(13,18);g.lineTo(-3,18);g.fill();g.restore();
 hP(g,[[-15,-19],[15,-19],[12,-16],[-12,-16]],'#a2a8ac');hP(g,[[-15,-19],[-12,-16],[-12,.5],[-15,1]],'#7c848a');g.fillStyle='#5a6268';g.fillRect(-13,-6,26,3);g.fillStyle='#7c848a';g.fillRect(-13,-6,26,1);g.beginPath();g.arc(0,-4.5,4,0,7);g.fillStyle='#7c848a';g.fill();g.fillStyle='#c8ccce';g.fillRect(-1.6,-6.4,2,2);g.restore()}
// 籠手の拳
function hFist(g,x,y,s,r,glow){g.save();g.translate(x,y);g.rotate(r||0);g.scale(s,s);hP(g,[[-10,-6],[9,-7],[11,-2],[11,6],[7,10],[-8,10],[-11,4]],'#3c4450');hP(g,[[-10,-6],[9,-7],[10,-3],[-11,-1]],'#848c9a');
 for(let k=0;k<4;k++){const X=-9+k*5;hP(g,[[X,-7],[X+4.5,-7.5],[X+4.5,-2.5],[X,-2]],'#5a6272');g.fillStyle='#b4b8c0';g.fillRect(X+.5,-7.2,3.5,1)}hP(g,[[-11,-1],[-6,-3],[-5,3],[-10,5]],'#5a6272');
 g.fillStyle='#2a3038';g.fillRect(-8,2,16,1);g.fillRect(-8,6,16,1);hP(g,[[-8,10],[7,10],[8,16],[-9,16]],'#2a3038');g.fillStyle='#5a6272';g.fillRect(-8,11,15,1);
 if(glow){g.strokeStyle=glow;g.lineWidth=.7;g.beginPath();g.moveTo(-6,0);g.lineTo(-2,1.5);g.lineTo(3,0);g.lineTo(7,2);g.stroke()}g.restore()}
// 腕（籠手と前腕）：(x,y) 手の位置、a 肘から手への向き
function hArm(g,x,y,a,L){g.save();g.translate(x,y);g.rotate(a);hP(g,[[-L,-3.5],[0,-3],[0,3],[-L,3.8]],'#5a6272');hP(g,[[-L,-3.5],[0,-3],[0,0],[-L,0]],'#b4b8c0');for(let k=-L+4;k<0;k+=5){g.fillStyle='#3c4450';g.fillRect(k,-3.4,.8,7)}hP(g,[[-2,-4],[3,-3.5],[3,3.5],[-2,4]],'#848c9a');g.restore()}
// 角付きの兜（敵）
function hHelm(g,x,y,s){g.save();g.translate(x,y);g.scale(s,s);hP(g,[[-16,8],[-15,-2],[-10,-9],[0,-12],[10,-9],[15,-2],[16,8]],'#3c4450');hP(g,[[-15,-2],[-10,-9],[0,-12],[0,8],[-16,8]],'#5a6272');g.fillStyle='#848c9a';g.fillRect(-9,-8,6,1);g.fillStyle='#17151e';g.fillRect(-12,1,24,2);
 for(const d of[-1,1]){g.fillStyle='#c8a888';g.beginPath();g.moveTo(d*14,-3);g.quadraticCurveTo(d*24,-6,d*26,-18);g.quadraticCurveTo(d*21,-8,d*14,1);g.fill()}g.restore()}
// 血のしずくと飛び散り
function hBlood(g,x,y,n,sp,seed){let s=seed||3;const r=()=>(s=s*16807%2147483647)/2147483647;for(let i=0;i<n;i++){const a=r()*6.283,d=r()*sp,X=x+Math.cos(a)*d,Y=y+Math.sin(a)*d*.7,z=.6+r()*1.4;g.fillStyle=r()<.5?'#7e2a24':'#5a1e1c';g.beginPath();g.ellipse(X,Y,z,z*1.3,0,0,7);g.fill();if(r()<.3){g.fillStyle='#a63a2c';g.fillRect(X-.4,Y-.6,.8,.8)}}}
function hDrop(g,x,y,s){g.fillStyle='#7e2a24';g.beginPath();g.moveTo(x,y-3*s);g.quadraticCurveTo(x+2.2*s,y,x,y+1.6*s);g.quadraticCurveTo(x-2.2*s,y,x,y-3*s);g.fill();g.fillStyle='#a63a2c';g.fillRect(x-.8*s,y-.4*s,.8,.8)}
// 炎（くすんだ橙）
function hFlame(g,x,y,w,h,seed){let s=seed||5;const r=()=>(s=s*16807%2147483647)/2147483647;for(const[c,k]of[['#7e2a24',1],['#c8583a',.75],['#d88a48',.5],['#e8b070',.28]])for(let i=0;i<4;i++){const ox=(r()-.5)*w*.6,hh=h*k*(.7+r()*.4),ww=w*k*.45;g.fillStyle=c;g.beginPath();g.moveTo(x+ox-ww,y);g.quadraticCurveTo(x+ox-ww*.6,y-hh*.6,x+ox+(r()-.5)*ww,y-hh);g.quadraticCurveTo(x+ox+ww*.6,y-hh*.5,x+ox+ww,y);g.fill()}}
// 立ちのぼる煙・気配
function hSmoke(g,x,y,n,c1,c2,h){for(let k=0;k<n;k++){const x0=x-n*1.8+k*3.6;g.strokeStyle=k%2?c1:c2;g.lineWidth=3-k%2;g.beginPath();g.moveTo(x0,y);g.bezierCurveTo(x0+Math.sin(k)*6,y-h*.4,x0-Math.cos(k)*7,y-h*.7,x0+Math.sin(k*2)*5,y-h);g.stroke()}}
function hEmb(g,pts,c){for(const[x,y]of pts){g.fillStyle=c||'#c8583a';g.fillRect(x,y,1,1);g.fillStyle='#7e2a24';g.fillRect(x,y+1,1,1)}}
// ひび
function hCrack(g,x,y,dirs,len){g.strokeStyle='#0e0d12';g.lineWidth=.9;for(const a of dirs){let X=x,Y=y;g.beginPath();g.moveTo(X,Y);for(let i=0;i<4;i++){X+=Math.cos(a+((i*7)%3-1)*.35)*len/4;Y+=Math.sin(a+((i*5)%3-1)*.35)*len/4;g.lineTo(X,Y)}g.stroke()}}
// 光の筋
function hRays(g,x,y,n,rgb,a,L){for(let i=0;i<n;i++){const an=i/n*6.283+.2;g.fillStyle='rgba('+rgb+','+a+')';g.beginPath();g.moveTo(x,y);g.lineTo(x+Math.cos(an-.08)*L,y+Math.sin(an-.08)*L);g.lineTo(x+Math.cos(an+.08)*L,y+Math.sin(an+.08)*L);g.fill()}}
// 小物
function hDrum(g,x,y){g.fillStyle='#4a3220';g.beginPath();g.ellipse(x,y+6,13,4,0,0,7);g.fill();g.fillRect(x-13,y-4,26,10);g.fillStyle='#7e2a24';g.fillRect(x-13,y-2,26,2);g.fillRect(x-13,y+3,26,2);for(let k=-12;k<13;k+=4)hL(g,x+k,y-2,x+k+2,y+5,'#b8984e',.6);g.fillStyle='#c8a888';g.beginPath();g.ellipse(x,y-4,13,4,0,0,7);g.fill();g.fillStyle='#a8846c';g.beginPath();g.ellipse(x+2,y-3.5,9,2.5,0,0,7);g.fill()}
function hCoin(g,x,y,r){g.fillStyle='#8a6c34';g.beginPath();g.ellipse(x,y,r,r*.55,0,0,7);g.fill();g.fillStyle='#b8984e';g.beginPath();g.ellipse(x,y-.6,r*.8,r*.4,0,0,7);g.fill();g.fillStyle='#5a4424';g.fillRect(x-r*.3,y-.8,r*.6,.8)}
function hSkull(g,x,y,s){g.save();g.translate(x,y);g.scale(s,s);hP(g,[[-6,-6],[6,-6],[7,0],[4,4],[4,7],[-4,7],[-4,4],[-7,0]],'#c8a888');hP(g,[[0,-6],[6,-6],[7,0],[4,4],[4,7],[0,7]],'#a8846c');g.fillStyle='#17151e';g.fillRect(-4.5,-2,3,3);g.fillRect(1.5,-2,3,3);g.fillRect(-.6,2,1.2,1.5);for(let k=-3;k<4;k+=2)g.fillRect(k,5,.8,2);g.restore()}
function hHorn(g,x,y,s,r){g.save();g.translate(x,y);g.rotate(r||0);g.scale(s,s);g.fillStyle='#a8846c';g.beginPath();g.moveTo(0,-1.5);g.quadraticCurveTo(12,-3,20,-9);g.lineTo(23,-3);g.quadraticCurveTo(12,4,0,1.5);g.fill();g.fillStyle='#8a6a5e';g.beginPath();g.moveTo(0,0);g.quadraticCurveTo(12,1,22,-5);g.lineTo(23,-3);g.quadraticCurveTo(12,4,0,1.5);g.fill();for(const k of[6,13])hL(g,k,-2,k+1,2.5,'#8a6c34',1);g.restore()}
function hWaves(g,x,y,n,a0,a1,c){for(let i=1;i<=n;i++){g.strokeStyle=c||'rgba(200,168,136,'+(.6-i*.1)+')';g.lineWidth=1;g.beginPath();g.arc(x,y,i*5,a0,a1);g.stroke()}}
function hClaw(g,x,y,a,L,n){for(let k=0;k<n;k++){const ox=Math.cos(a+1.57)*(k-(n-1)/2)*4,oy=Math.sin(a+1.57)*(k-(n-1)/2)*4;hL(g,x+ox,y+oy,x+ox+Math.cos(a)*L,y+oy+Math.sin(a)*L,'#5a1e1c',2);hL(g,x+ox,y+oy,x+ox+Math.cos(a)*L,y+oy+Math.sin(a)*L,'#c8583a',.7)}}
function hCandle(g,x,y,h){g.fillStyle='#c8a888';g.fillRect(x-1.5,y-h,3,h);g.fillStyle='#a8846c';g.fillRect(x+.5,y-h,1,h);hG(g,x,y-h-2,5,'232,176,112',.6);g.fillStyle='#e8b070';g.fillRect(x-.5,y-h-3,1,2.5)}
function hRune(g,x,y,r,c){g.strokeStyle=c||'#7e2a24';g.lineWidth=.8;g.beginPath();g.ellipse(x,y,r,r*.35,0,0,7);g.stroke();g.beginPath();g.ellipse(x,y,r*.7,r*.24,0,0,7);g.stroke();for(let i=0;i<8;i++){const a=i/8*6.283;g.fillStyle=c||'#a63a2c';g.fillRect(x+Math.cos(a)*r*.85,y+Math.sin(a)*r*.3,1,1)}}
function hMedal(g,x,y){hP(g,[[x-4,y-12],[x-1,y-12],[x+1,y-4],[x-2,y-4]],'#7e2a24');hP(g,[[x+1,y-12],[x+4,y-12],[x+2,y-4],[x-1,y-4]],'#5a1e1c');g.fillStyle='#8a6c34';g.beginPath();g.arc(x,y,5,0,7);g.fill();g.fillStyle='#b8984e';g.beginPath();g.arc(x-.5,y-.5,3.6,0,7);g.fill();hL(g,x-3,y-2,x+2,y+3,'#5a4424',.7);hL(g,x+1,y-3,x-1,y+1,'#5a4424',.6)}
function hChains(g,x1,y1,x2,y2){const n=Math.hypot(x2-x1,y2-y1)/3;for(let i=0;i<n;i++){const t=i/n,X=x1+(x2-x1)*t,Y=y1+(y2-y1)*t;g.strokeStyle=i%2?'#5a6272':'#848c9a';g.lineWidth=.9;g.beginPath();g.ellipse(X,Y,1.8,1.1,Math.atan2(y2-y1,x2-x1)+(i%2?1.57:0),0,7);g.stroke()}}
function hHeart(g,x,y,s,c){g.save();g.translate(x,y);g.scale(s,s);g.fillStyle=c||'#7e2a24';g.beginPath();g.moveTo(0,4);g.bezierCurveTo(-7,-1,-4,-7,0,-3);g.bezierCurveTo(4,-7,7,-1,0,4);g.fill();g.restore()}
