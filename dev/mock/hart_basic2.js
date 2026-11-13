// 初期カード「斬撃」「防御」の見本その2：本家の描き方を参考（構図・形はまねしない）。主役1つを大きく斜めに、平塗り＋2〜3段の影、背景は大きな色の形だけ、主役に暗い縁取り
function hb2(W,H,f){const c=document.createElement('canvas');c.width=W;c.height=H;const g=c.getContext('2d');f(g,W,H);return c}
const P2=(g,pts,fill,ol,lw)=>{g.beginPath();pts.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]));g.closePath();if(fill){g.fillStyle=fill;g.fill()}if(ol){g.strokeStyle=ol;g.lineWidth=lw||2;g.lineJoin='round';g.stroke()}};
const artStrike2=(W,H)=>hb2(W,H,(g)=>{
 // 背景：群青の地に、振りの向きに流れる大きな帯
 g.fillStyle='#231c46';g.fillRect(0,0,W,H);
 for(const[c,o]of[['#2f2660',0],['#3c3278',18],['#4a3e8e',34]]){g.fillStyle=c;g.beginPath();g.moveTo(-10,H*.95-o);g.quadraticCurveTo(W*.5,H*.2-o,W+10,-10-o*.4);g.lineTo(W+10,-40);g.lineTo(-10,-40);g.closePath();g.fill()}
 const gl=g.createRadialGradient(W*.62,H*.42,4,W*.62,H*.42,70);gl.addColorStop(0,'rgba(255,190,110,.45)');gl.addColorStop(1,'rgba(255,190,110,0)');g.fillStyle=gl;g.fillRect(0,0,W,H);
 // 斬撃の白い三日月
 g.fillStyle='#fff6dc';g.beginPath();g.moveTo(W*.06,H*.22);g.quadraticCurveTo(W*.55,H*.02,W*.96,H*.9);g.quadraticCurveTo(W*.5,H*.2,W*.06,H*.22);g.fill();
 g.fillStyle='#ffd27a';g.beginPath();g.moveTo(W*.12,H*.28);g.quadraticCurveTo(W*.55,H*.14,W*.9,H*.92);g.quadraticCurveTo(W*.52,H*.26,W*.12,H*.28);g.fill();
 // 剣：右上から左下へ振り下ろす長剣（柄は左下で枠の外へ）
 const ol='#1a1430';g.save();g.translate(W*.36,H*.76);g.rotate(-.62);
 P2(g,[[0,-6],[96,-5],[110,0],[96,5],[0,6]],'#9aa6c2',ol,2.2);P2(g,[[0,-6],[96,-5],[110,0],[2,0]],'#e8eef8');P2(g,[[4,-1.2],[88,-1],[88,1],[4,1.2]],'#6a7898');
 P2(g,[[-4,-17],[4,-17],[5,17],[-3,17]],'#e0a840',ol,2.2);P2(g,[[-4,-17],[0,-17],[0,17],[-3,17]],'#ffd27a');
 P2(g,[[-30,-4.5],[-4,-4.5],[-4,4.5],[-30,4.5]],'#7a4424',ol,2.2);for(let k=-28;k<-6;k+=5)P2(g,[[k,-4.5],[k+2.5,-4.5],[k+1,4.5],[k-1.5,4.5]],'#4a2814');
 P2(g,[[-38,-6],[-30,-6],[-30,6],[-38,6]],'#e0a840',ol,2.2);g.restore();
 // 光の粒（四方に光る星）
 for(const[x,y,s]of[[W*.72,H*.2,5],[W*.86,H*.48,3.5],[W*.2,H*.14,3]]){P2(g,[[x,y-s*2],[x+s*.5,y-s*.5],[x+s*2,y],[x+s*.5,y+s*.5],[x,y+s*2],[x-s*.5,y+s*.5],[x-s*2,y],[x-s*.5,y-s*.5]],'#fff6dc')}});
const artDefend2=(W,H)=>hb2(W,H,(g)=>{
 // 背景：深い青緑に大きな斜めの帯
 g.fillStyle='#10313a';g.fillRect(0,0,W,H);
 for(const[c,x0,w]of[['#164450',W*.1,26],['#1c5260',W*.42,20],['#164450',W*.78,30]]){g.fillStyle=c;g.beginPath();g.moveTo(x0,0);g.lineTo(x0+w,0);g.lineTo(x0+w-46,H);g.lineTo(x0-46,H);g.fill()}
 // 盾：上辺がまっすぐで下がとがる形、少し傾けて手前に大きく。板張りの木に鋼の縁と鋲
 const ol='#0c1a1e';g.save();g.translate(W*.42,H*.5);g.rotate(-.18);
 const sh=[[-34,-40],[34,-40],[34,2],[24,24],[0,44],[-24,24],[-34,2]];P2(g,sh,'#8a96a8',ol,2.4);
 const inn=[[-28,-34],[28,-34],[28,1],[20,20],[0,37],[-20,20],[-28,1]];P2(g,inn,'#8a5a32');
 g.save();g.beginPath();inn.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]));g.closePath();g.clip();
 for(let k=-28;k<28;k+=11){g.fillStyle='#6e4626';g.fillRect(k+9,-36,2,76);g.fillStyle='#a8743e';g.fillRect(k+1,-36,3,76)}g.fillStyle='rgba(0,0,0,.25)';g.beginPath();g.moveTo(6,-36);g.lineTo(30,-36);g.lineTo(30,40);g.lineTo(-6,40);g.fill();g.restore();
 P2(g,[[-34,-40],[34,-40],[28,-34],[-28,-34]],'#c8d0dc');P2(g,[[-34,-40],[-28,-34],[-28,1],[-34,2]],'#c8d0dc');
 P2(g,[[-30,-12],[30,-12],[30,-4],[-30,-4]],'#8a96a8',ol,1.6);
 g.beginPath();g.arc(0,-8,9,0,7);g.fillStyle='#8a96a8';g.fill();g.strokeStyle=ol;g.lineWidth=2;g.stroke();g.beginPath();g.arc(-2,-10,4,0,7);g.fillStyle='#d8dee8';g.fill();
 for(const[a,b]of[[-30,-36],[30,-36],[-30,-2],[30,-2],[0,33]]){g.fillStyle='#d8dee8';g.fillRect(a-1.5,b-1.5,3,3)}
 g.restore();
 // 右上から打ち込まれる敵の刃と、当たった所の火花
 g.save();g.translate(W*.7,H*.28);g.rotate(2.45);P2(g,[[0,-5],[70,-4],[80,0],[70,4],[0,5]],'#5a5068',ol,2.2);P2(g,[[0,-5],[70,-4],[80,0],[2,0]],'#8a7e9a');g.restore();
 const ix=W*.6,iy=H*.36;P2(g,[[ix,iy-22],[ix+5,iy-6],[ix+20,iy-10],[ix+8,iy+1],[ix+22,iy+12],[ix+4,iy+7],[ix,iy+22],[ix-4,iy+7],[ix-20,iy+12],[ix-8,iy+1],[ix-20,iy-10],[ix-5,iy-6]],'#fff2b0','#c87a20',1.5);
 P2(g,[[ix,iy-10],[ix+3,iy-3],[ix+9,iy],[ix+3,iy+3],[ix,iy+10],[ix-3,iy+3],[ix-9,iy],[ix-3,iy-3]],'#ffffff');
 for(const[x,y,l,a]of[[ix+26,iy-16,10,-.5],[ix+30,iy+6,8,.3],[ix-30,iy-14,9,-2.6],[ix+16,iy+22,7,1]]){g.strokeStyle='#ffd27a';g.lineWidth=2;g.beginPath();g.moveTo(x,y);g.lineTo(x+Math.cos(a)*l,y+Math.sin(a)*l);g.stroke()}});
