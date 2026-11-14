// スレスパ2寄りの見本（追加しない）：主役1つを大きく斜めに・背景は2色の流れと大きなぼかしの形・明るさの順番・色は2〜3色・勢いは大きな形・輪郭なし（縁の光で浮かせる）
const BD={};
const bP=(g,pts,c)=>{g.beginPath();pts.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]));g.closePath();g.fillStyle=c;g.fill()};
const bW=(g,c1,c2,a)=>{const q=g.createLinearGradient(0,0,74*Math.cos(a||0)+20,44);q.addColorStop(0,c1);q.addColorStop(1,c2);g.fillStyle=q;g.fillRect(0,0,74,44)};
const bB=(g,x,y,rx,ry,rot,rgb,al)=>{g.save();g.translate(x,y);g.rotate(rot);g.scale(1,ry/rx);const q=g.createRadialGradient(0,0,0,0,0,rx);q.addColorStop(0,'rgba('+rgb+','+al+')');q.addColorStop(1,'rgba('+rgb+',0)');g.fillStyle=q;g.fillRect(-rx,-rx,rx*2,rx*2);g.restore()};
// 三日月の形（太い動きの形）
const bCres=(g,x0,y0,x1,y1,bulge,th,c)=>{const mx=(x0+x1)/2,my=(y0+y1)/2,dx=x1-x0,dy=y1-y0,L=Math.hypot(dx,dy),nx=-dy/L,ny=dx/L;g.beginPath();g.moveTo(x0,y0);g.quadraticCurveTo(mx+nx*bulge,my+ny*bulge,x1,y1);g.quadraticCurveTo(mx+nx*(bulge-th),my+ny*(bulge-th),x0,y0);g.fillStyle=c;g.fill()};
// 斬撃：長剣が斜めに振り抜かれ、後ろに大きな三日月の軌跡（赤と鉄色）
BD['斬撃']=g=>{bW(g,'#3a1414','#a63a2c');bB(g,52,14,40,18,-.5,'232,140,90',.45);bB(g,10,40,26,14,0,'20,10,20',.6);
 bCres(g,-4,46,78,-2,-24,12,'rgba(242,220,204,.35)');bCres(g,-4,46,78,-2,-22,7,'rgba(242,220,204,.85)');bCres(g,4,44,74,0,-21,2.4,'#ffffff');
 g.save();g.translate(30,30);g.rotate(-.62);bP(g,[[-6,-2.6],[44,-2.2],[52,0],[44,2.2],[-6,2.6]],'#848c9a');bP(g,[[-6,-2.6],[44,-2.2],[52,0],[-6,0]],'#dcdee0');bP(g,[[-6,-2.6],[44,-2.2],[52,0],[44,-1.2],[-6,-1.6]],'#ffffff');
 g.fillStyle='#8a6c34';g.fillRect(-9,-7,3,14);g.fillStyle='#c8b060';g.fillRect(-9,-7,3,2);g.fillStyle='#4a3220';g.fillRect(-22,-2,13,4);g.restore()};
// 毒の刃：短剣が下へ突き下ろされ、刃を覆う毒が大きな雫になって落ちる（紫と緑）
BD['毒の刃']=g=>{bW(g,'#2a1e3a','#4a2a6a');bB(g,46,16,34,18,.3,'150,80,190',.5);bB(g,20,40,24,8,0,'20,10,30',.6);
 g.save();g.translate(16,8);g.rotate(.55);bP(g,[[0,-4.4],[42,-1.6],[50,0],[42,1.6],[0,4.4]],'#848c9a');bP(g,[[0,-4.4],[42,-1.6],[50,0],[0,0]],'#dcdee0');bP(g,[[0,-4.4],[42,-1.6],[50,0],[42,-.8],[0,-3]],'#ffffff');
 bP(g,[[12,1.4],[42,.6],[48,.2],[42,1.6],[30,3.4],[26,6],[23,3.6],[16,4]],'#4a7a34');bP(g,[[14,1.8],[40,1],[30,2.4],[18,2.8]],'#9aa860');
 g.fillStyle='#8a6c34';g.fillRect(-3,-7,3,14);g.fillStyle='#4a3220';g.fillRect(-14,-2.4,11,4.8);g.restore();
 for(const[x,y,r]of[[33,30,2.4],[42,36,1.8],[28,40,1.4]]){g.fillStyle='#4a7a34';g.beginPath();g.moveTo(x,y-r*2.6);g.quadraticCurveTo(x+r*1.3,y-r*.2,x,y+r);g.quadraticCurveTo(x-r*1.3,y-r*.2,x,y-r*2.6);g.fill();g.fillStyle='#9aa860';g.fillRect(x-r*.5,y-r*.8,r*.6,r*.6)}};
// 瞬閃・雷切：太い稲妻が落ちてくる所を刀が横一文字に斬り、稲妻が二つに裂ける（紺と黄）
BD['瞬閃・雷切']=g=>{bW(g,'#1e2a5a','#2a2a44');bB(g,30,8,36,12,0,'90,120,200',.6);bB(g,50,30,20,16,0,'240,210,120',.4);
 const bolt=(pts,w,c)=>{g.strokeStyle=c;g.lineWidth=w;g.lineJoin='miter';g.lineCap='butt';g.beginPath();pts.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]));g.stroke()};
 const up=[[44,-2],[38,8],[46,12],[40,21]],dn=[[48,27],[42,34],[50,38],[44,48]];
 for(const pts of[up,dn]){bolt(pts,6,'rgba(232,176,112,.55)');bolt(pts,3.4,'#e8b070');bolt(pts,1.4,'#ffffff')}
 bB(g,44,24,12,6,-.15,'255,240,200',.8);
 g.save();g.translate(36,24.5);g.rotate(-.12);g.fillStyle='#dcdee0';g.beginPath();g.moveTo(-34,1.4);g.quadraticCurveTo(0,-2.4,38,-1.6);g.lineTo(38,0);g.quadraticCurveTo(0,0,-34,2.8);g.fill();g.fillStyle='#ffffff';g.beginPath();g.moveTo(-34,1.4);g.quadraticCurveTo(0,-2.4,38,-1.6);g.lineTo(38,-1);g.quadraticCurveTo(0,-1.4,-34,2);g.fill();
 g.fillStyle='#c8b060';g.fillRect(-36,-1.4,2,6);g.fillStyle='#17151e';g.fillRect(-48,0,12,3.4);for(let i=0;i<4;i++){g.fillStyle='#2e4486';g.fillRect(-47+i*3,.4,1.4,2.6)}g.restore();
 bCres(g,0,34,74,16,-6,3,'rgba(240,244,255,.7)')};
// 火球の頁：画面いっぱいの火の玉が左下の開いた本から放たれる（橙と焦げ茶）
BD['火球の頁']=g=>{bW(g,'#2e1e14','#58161e');bB(g,48,20,34,22,0,'232,120,50',.5);
 const fx=48,fy=19;const lay=[['#7e2a24',1.25],['#c8583a',1],['#d88a48',.76],['#e8b070',.52],['#f2dccc',.3]];
 for(const[c,s]of lay)bP(g,[[fx+18*s,fy-2*s],[fx+12*s,fy-14*s],[fx-4*s,fy-17*s],[fx-20*s,fy-12*s],[fx-38*s,fy-18*s],[fx-28*s,fy-5*s],[fx-46*s,fy+4*s],[fx-26*s,fy+8*s],[fx-34*s,fy+20*s],[fx-10*s,fy+15*s],[fx+8*s,fy+14*s],[fx+17*s,fy+7*s]],c);
 g.save();g.translate(8,40);g.rotate(-.35);bP(g,[[-12,0],[0,3],[0,-6],[-12,-9]],'#c8a888');bP(g,[[12,0],[0,3],[0,-6],[12,-9]],'#e2ccae');bP(g,[[-13,1],[0,4.6],[13,1],[13,2.6],[0,6.2],[-13,2.6]],'#58161e');g.restore();bB(g,10,32,12,8,0,'255,200,120',.5)};
// ベンチプレス：見上げた視点で、たわむバーと巨大なプレートが画面からはみ出す（緑と鉄色）
BD['ベンチプレス']=g=>{bW(g,'#17151e','#2e5a2a');bB(g,37,2,40,10,0,'220,236,190',.55);bB(g,37,40,30,10,0,'14,13,18',.5);
 g.strokeStyle='#3c4450';g.lineWidth=5.4;g.beginPath();g.moveTo(-4,14);g.quadraticCurveTo(37,26,78,14);g.stroke();g.strokeStyle='#b4b8c0';g.lineWidth=3.4;g.stroke();g.strokeStyle='#ffffff';g.lineWidth=1.2;g.beginPath();g.moveTo(-4,13);g.quadraticCurveTo(37,25,78,13);g.stroke();
 for(const[x,d]of[[20,-1],[54,1]])for(let k=0;k<3;k++){const xx=x+d*k*5.4,hh=19-k*3.6;bP(g,[[xx-2.6,14-hh],[xx+2.6,14-hh],[xx+2.6,14+hh],[xx-2.6,14+hh]],k===0?'#5a6272':'#4e4250');bP(g,[[xx+(d<0?-2.6:1.2),14-hh],[xx+(d<0?-1.2:2.6),14-hh],[xx+(d<0?-1.2:2.6),14+hh],[xx+(d<0?-2.6:1.2),14+hh]],'#9aa860')}
 bB(g,37,22,10,6,0,'130,224,120',.5)};
