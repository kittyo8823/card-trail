// ===== Ver4.63 密林の遺跡の攻撃演出（XA：行動の瞬間／EFX：エリートの強攻撃／BFX：ボスの必殺） =====
// 部品：jgVine 地面から伸びる蔓／jgSpore 胞子の粒／jgMud 泥の塊／jgLeaf 葉
function jgVine(x0,y0,x1,y1,c,c2,dl,d,w){xLash(x0,y0,x1,y1,c,w||5,dl,d,6);xLash(x0,y0,x1,y1,c2,Math.max(1,(w||5)*.4),dl,d,6)}
function jgSpore(x,y,s,c,a){ctx.globalAlpha=a;ctx.fillStyle=c;ctx.fillRect(Math.round(x)-s,Math.round(y)-s,s*2,s*2);ctx.globalAlpha=a*.4;ctx.fillRect(Math.round(x)-s-1,Math.round(y)-1,s*2+2,2)}
function jgMud(x,y,s,a){ctx.globalAlpha=a;ctx.fillStyle='#3a3220';ctx.beginPath();ctx.ellipse(Math.round(x),Math.round(y),s,s*.8,0,0,6.3);ctx.fill();ctx.fillStyle='#6a6038';ctx.fillRect(Math.round(x-s*.4),Math.round(y-s*.4),2,2)}
function jgLeaf(x,y,a,c,s){ctx.save();ctx.translate(Math.round(x),Math.round(y));ctx.rotate(a);ctx.fillStyle=c;ctx.beginPath();ctx.moveTo(-s,0);ctx.quadraticCurveTo(0,-s*.6,s,0);ctx.quadraticCurveTo(0,s*.6,-s,0);ctx.fill();ctx.restore()}
function jgSlash(x,y,r,a0,a1,c,dl,d,w){xfAdd(dl,d,u=>{ctx.globalAlpha=(1-u);ctx.strokeStyle=c;ctx.lineWidth=(w||3)*(1-u*.6);ctx.beginPath();ctx.arc(x,y,r+u*6,a0,a0+(a1-a0)*Math.min(1,u*4));ctx.stroke()})}
function jgSpikes(x,n,c,c2,dl,hh){for(let j=0;j<n;j++)hxSpike(x-(n-1)*7+j*14,(hh||30)+(j%2)*12,c,c2,dl+j*.03,.5)}
Object.assign(XA,{
 // 牙果：上下の牙が噛み合わさる／熟すと赤い汁の光がにじむ
 jfang(e,m){const E=XEP(e),Pp=XPL();if(m.a){const h=m.h||1;for(let k=0;k<h;k++){const ht=eHT2(e,k);xfAdd(ht-.14,.32,u=>{const c=Math.min(1,u/.45)*12;ctx.globalAlpha=u>.6?(1-u)/.4:1;for(let j=0;j<5;j++){sq(Pp.x-12+j*6,Pp.y-18+c,3,'#e0d8c0');sq(Pp.x-12+j*6,Pp.y+10-c,3,'#d0c8b0')}});xBurst(Pp.x,Pp.y,'#a02030',10,ht,3)}}
  if(m.vig){xGlow(E.x,E.y,E.w*.6,'rgba(200,40,40,1)',0,.8);xRing(E.x,E.y,'#a02030',8,E.w*.6,0,.6,3)}},
 // 根の巫子：地面から根の棘が突き上げる／種を投げて芽吹かせる／呪いの根の黒い渦
 jroot(e,m){const E=XEP(e),Pp=XPL();if(m.a){const ht=eHT2(e,0);jgSpikes(Pp.x,3,'#3a2416','#6a8a4a',ht-.1,28);xBurst(Pp.x,Pp.y+20,'#5a3a22',10,ht,3)}
  if(m.smn){xProj(E.x+E.w*.3,E.top+6,E.x-E.w*.9,200,.05,.5,40,(x,y)=>{sq(x,y,4,'#8a6a3a');sq(x-1,y-3,2,'#5a7a3a')})}
  if(m.wk){for(let j=0;j<3;j++)jgVine(Pp.x-30+j*30,208,Pp.x+(j-1)*6,Pp.y-6,'#1e2416','#4a3a5a',.15+j*.06,.8,4)}},
 jseed(e,m){const E=XEP(e),Pp=XPL();if(m.bm){const ht=eHT2(e,0);xProj(E.x,E.y,Pp.x,Pp.y,ht-.3,.3,30,(x,y)=>{sq(x,y,5,'#8a6a3a');sq(x+1,y-1,2,'#ffb050')});xGlow(Pp.x,Pp.y,40,'rgba(255,160,60,1)',ht,.4);xBurst(Pp.x,Pp.y,'#ffb050',14,ht,3);xBurst(Pp.x,Pp.y,'#6a4a20',10,ht+.05,4)}},
 // 殻負い：体当たりの土煙と石のかけら
 jshell(e,m){const E=XEP(e),Pp=XPL();if(m.a){const h=m.h||1;for(let k=0;k<h;k++){const ht=eHT2(e,k);if(h===1){xGhost(e,-24,0,ht-.15,.25);xRing(Pp.x,Pp.y+20,'#8a8a7a',8,60,ht,.45,4)}xBurst(Pp.x,Pp.y,'#7a7a72',12,ht,3);xBurst(Pp.x,Pp.y+16,'#3a6a5a',6,ht+.04,2)}}},
 // 灯角の獣：角の実が強く光って目がくらむ／角で引っかく
 jlant(e,m){const E=XEP(e),Pp=XPL(),hx=E.x-E.w*.3,hy=E.top+6;if(m.smg){xGlow(hx,hy,60,'rgba(255,200,90,1)',0,.7);xfAdd(.25,.6,u=>{ctx.globalCompositeOperation='lighter';ctx.globalAlpha=Math.sin(u*Math.PI)*.35;ctx.fillStyle='#ffe0a0';ctx.fillRect(-20,24,680,206)})}
  if(m.a){const h=m.h||1;for(let k=0;k<h;k++){const ht=eHT2(e,k);jgSlash(Pp.x+6,Pp.y-6,18,k%2?-.6:3.6,k%2?1.6:1.6,'#d8a040',ht-.04,.3,3);xBurst(Pp.x,Pp.y,'#5a4a64',8,ht,2)}}},
 // 鰭翼の蛇：滑空して噛みつく残像／舞い上がる風の輪
 jserp(e,m){const E=XEP(e),Pp=XPL();if(m.a){const ht=eHT2(e,0);xGhost(e,-30,10,ht-.2,.25);xGhost(e,-60,20,ht-.12,.25);xBurst(Pp.x,Pp.y,'#8a4a2a',10,ht,3)}if(m.sor){for(let j=0;j<3;j++)xRing(E.x,E.y+j*6,'#8aa0c8',6,40+j*10,j*.1,.6,2)}},
 // 棘玉：棘を逆立てる／棘を一斉に放つ
 jthorn(e,m){const E=XEP(e),Pp=XPL();if(m.tg){xRing(E.x,E.y,'#c8b888',E.w*.3,E.w*.6,0,.5,2);xGlow(E.x,E.y,E.w*.5,'rgba(200,220,110,1)',0,.6)}
  if(m.a){const ht=eHT2(e,0),n=m.tl?9:4;for(let j=0;j<n;j++){const a=-1+j/(n-1)*2,sx=E.x+Math.cos(a+Math.PI)*10,sy=E.y+Math.sin(a)*10;xProj(sx,sy,Pp.x+(j-n/2)*3,Pp.y-8+(j%3)*6,ht-.25+j*.01,.25,6,(x,y,u)=>{ctx.globalAlpha=1;ctx.strokeStyle='#c8b888';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+8,y-1);ctx.stroke()})}xBurst(Pp.x,Pp.y,'#a89868',10,ht,2)}},
 // 石面の跳ね手：跳びかかる残像と石の粉
 jmask(e,m){const Pp=XPL();if(m.a){const h=m.h||1;for(let k=0;k<h;k++){const ht=eHT2(e,k);xGhost(e,-20,-12,ht-.16,.22);jgSlash(Pp.x+4,Pp.y-4,14,k%2?-.4:3.4,1.4,'#a89070',ht-.03,.25,2);xBurst(Pp.x,Pp.y,'#8a8478',8,ht,2)}}},
 // 蔓の絞め手：鞭の蔓／汚染の蔓が足元から絡みつく
 jvine(e,m){const E=XEP(e),Pp=XPL();if(m.a){const ht=eHT2(e,0);jgVine(E.x-E.w*.4,E.y-4,Pp.x+6,Pp.y-6,'#2e4426','#6a8a40',ht-.2,.45,6);xBurst(Pp.x,Pp.y,'#4a6a36',10,ht,3)}
  if(m.tai){for(let j=0;j<4;j++)jgVine(Pp.x-36+j*24,208,Pp.x+(j-1.5)*5,Pp.y-4+j*4,'#3e5a30','#9ac060',.2+j*.07,.9,4);for(let j=0;j<16;j++)xProj(Pp.x,200,Pp.x+(j%8-4)*8,Pp.y-30-(j%5)*6,.4+j*.02,.6,10,(x,y,u)=>jgSpore(x,y,1,'#9ac060',1-u))}},
 // 苔の塊：胞子を吐く／苔むすと緑の光
 jmoss(e,m){const E=XEP(e),Pp=XPL();if(m.a){const h=m.h||1;for(let k=0;k<h;k++){const ht=eHT2(e,k);for(let j=0;j<6;j++)xProj(E.x-E.w*.2,E.top+E.h*.5,Pp.x+(j-3)*4,Pp.y-6+(j%3)*5,ht-.3+j*.02,.3,24,(x,y)=>jgSpore(x,y,2,j%2?'#a8c060':'#e8f0a0',1));xBurst(Pp.x,Pp.y,'#a8c060',8,ht,2)}}
  if(m.b){xGlow(E.x,E.y,E.w*.6,'rgba(120,180,80,1)',0,.7)}},
 // 縞爪の狩人：三本爪の斬撃／身を沈める（気合）／捨て身の跳躍は残像を残す
 jhunt(e,m){const E=XEP(e),Pp=XPL();if(m.a&&!m.sx){const h=m.h||1;for(let k=0;k<h;k++){const ht=eHT2(e,k);if(m.lb==='捨て身の跳躍'){for(let j=1;j<5;j++)xGhost(e,-j*20,-Math.sin(j/5*Math.PI)*40,ht-.3+j*.05,.3)}for(let j=0;j<3;j++)jgSlash(Pp.x+8,Pp.y-12+j*7,20,k%2?-.5:3.5,k%2?1.2:1.2,'#e8d8b0',ht-.05+j*.02,.3,3);xBurst(Pp.x,Pp.y,'#8a4a22',12,ht,3)}}
  if(m.vig){xfAdd(0,.8,u=>{const E2=XEP(e);ctx.globalAlpha=Math.sin(u*Math.PI)*.8;for(let j=0;j<10;j++){const t=(u*2+j/10)%1;sq(E2.x+(hs(j)-.5)*E2.w,E2.top+E2.h-t*E2.h,2,'#ffb030')}})}},
 // 莢の母：酸を吐く（緑の雫）／莢を産み落とす
 jpod(e,m){const E=XEP(e),Pp=XPL(),hx=E.x-E.w*.4,hy=E.top+E.h*.2;if(m.a&&!m.sx){const ht=eHT2(e,0);for(let j=0;j<5;j++)xProj(hx,hy,Pp.x+(j-2)*5,Pp.y-6+(j%2)*6,ht-.34+j*.02,.34,30,(x,y)=>{sq(x,y,3,'#a8c040');sq(x,y+3,2,'#6a8a20')});xBurst(Pp.x,Pp.y,'#a8c040',12,ht,3);if(m.vu)xfAdd(ht,.8,u=>{ctx.globalAlpha=(1-u)*.8;for(let j=0;j<6;j++)sq(Pp.x-12+j*5,Pp.y+u*30+(j%3)*4,2,'#a8c040')})}
  if(m.smn){for(let j=0;j<2;j++)xProj(E.x,E.y+10,E.x-E.w*.6-j*40,200,.1+j*.1,.5,30,(x,y)=>{sq(x,y,5,'#a07a3a');sq(x-1,y-2,2,'#d8b060')})}},
 jegg(e,m){},
 jgrub(e,m){const Pp=XPL();if(m.a){const ht=eHT2(e,0);xBurst(Pp.x,Pp.y,'#c8b8a0',8,ht,2)}},
 // 枝垂れの影：上から枝の腕が振り下ろされる
 jshd(e,m){const E=XEP(e),Pp=XPL();if(m.a&&!m.sx){const h=m.h||1;for(let k=0;k<h;k++){const ht=eHT2(e,k);jgVine(Pp.x+20-k*10,30,Pp.x+(k-1)*6,Pp.y-4,'#141a24','#2e3848',ht-.18,.4,4);xBurst(Pp.x,Pp.y,'#5af0d0',6,ht,2)}}
  if(m.vig){xGlow(E.x,E.top+E.h*.15,26,'rgba(90,240,208,1)',0,.7)}},
 // 冠角の獣王：角の突進の衝撃／森の怒り（帯電：緑の稲光が手札へ）／咆哮の輪
 jking(e,m){const E=XEP(e),Pp=XPL();if(m.a&&!m.nm){const h=m.h||1;for(let k=0;k<h;k++){const ht=eHT2(e,k);if(h===1){xGhost(e,-30,0,ht-.18,.25);xGhost(e,-56,0,ht-.1,.25);xRing(Pp.x,Pp.y+18,'#c8b896',10,80,ht,.5,4)}jgSlash(Pp.x+10,Pp.y-8,22,k%2?-.6:3.6,1.4,'#c8b896',ht-.04,.3,4);xBurst(Pp.x,Pp.y,'#6a5038',14,ht,3);for(let j=0;j<6;j++)xProj(Pp.x,Pp.y,Pp.x+(hs(j+k)-.5)*80,Pp.y-30-hs(j+3)*30,ht,.6,0,(x,y,u)=>{ctx.globalAlpha=1-u;jgLeaf(x,y,u*8+j,j%2?'#3e5a32':'#e0d8c8',4)})}}
  if(m.gal){const hx=E.x-E.w*.3,hy=E.top+4;xGlow(hx,hy,60,'rgba(170,240,120,1)',0,.8);for(let j=0;j<3;j++){const tx=280+j*40;xfAdd(.2+j*.1,.5,u=>{ctx.globalAlpha=1-u;ctx.strokeStyle=j%2?'#c8f090':'#f0fff0';ctx.lineWidth=2;ctx.beginPath();let x=hx,y=hy;ctx.moveTo(x,y);for(let s=1;s<=8;s++){x=hx+(tx-hx)*s/8+(hs(s+j*9)-.5)*20;y=hy+(250-hy)*s/8;ctx.lineTo(x,y)}ctx.stroke()})}}
  if(m.vig){xRing(E.x,E.y,'#c8b896',10,120,0,.8,4);xRing(E.x,E.y,'#3e5a32',8,90,.1,.7,3);shk=Math.max(shk,6)}},
 // 千根の母樹：根の鞭／種の雨／根を張る（汚染の蔓が足元から）／棘の蔓
 jmother(e,m){const E=XEP(e),Pp=XPL();if(m.a&&!m.nm){const h=m.h||1;for(let k=0;k<h;k++){const ht=eHT2(e,k);jgVine(E.x-E.w*.3,200,Pp.x+6,Pp.y-6+k*6,'#4a463e','#8a8274',ht-.22,.45,7);xBurst(Pp.x,Pp.y,'#6a6458',12,ht,3)}if(m.wk)for(let j=0;j<3;j++)jgSpikes(Pp.x,3,'#2e5a52','#8a2a24',eHT2(e,0)-.08,24)}
  if(m.smn){for(let j=0;j<10;j++)xProj(E.x-10+j*4,E.top,E.x-E.w*.7-hs(j)*120,200,.05+j*.04,.6,50,(x,y)=>{sq(x,y,3,'#8a2a24');sq(x,y-2,2,'#d05040')})}
  if(m.tai){for(let j=0;j<5;j++)jgVine(Pp.x-48+j*24,208,Pp.x+(j-2)*5,Pp.y-4+j*3,'#4a463e','#9ac060',.2+j*.06,.9,5)}},
 // 沼の大顎：泥の礫／巨大な顎で噛みつく／泥をまとう
 jmaw(e,m){const E=XEP(e),Pp=XPL(),mx=E.x-E.w*.15,my=E.top+E.h*.55;if(m.a&&!m.nm){const h=m.h||1;for(let k=0;k<h;k++){const ht=eHT2(e,k);if(h>1){for(let j=0;j<3;j++)xProj(mx,my,Pp.x+(j-1)*8,Pp.y-6+j*4,ht-.32+j*.03,.32,40,(x,y)=>jgMud(x,y,4,1));xBurst(Pp.x,Pp.y,'#4a4228',10,ht,3)}else{xfAdd(ht-.22,.5,u=>{const c=u<.45?u/.45:1;ctx.globalAlpha=u>.6?(1-u)/.4:1;ctx.fillStyle='#4a4228';ctx.beginPath();ctx.ellipse(Pp.x,Pp.y-40+c*28,30,10,0,0,6.3);ctx.fill();ctx.beginPath();ctx.ellipse(Pp.x,Pp.y+36-c*28,30,10,0,0,6.3);ctx.fill();for(let j=0;j<6;j++){sq(Pp.x-20+j*8,Pp.y-32+c*28,3,'#d8ccb0');sq(Pp.x-20+j*8,Pp.y+30-c*28,3,'#d8ccb0')}});xBurst(Pp.x,Pp.y,'#5a1a1a',14,ht,3)}}}
  if(m.tg||m.b){xfAdd(0,.9,u=>{const E2=XEP(e);ctx.globalAlpha=Math.sin(u*Math.PI)*.8;for(let j=0;j<14;j++){const t=(u*1.5+j/14)%1;jgMud(E2.x+(hs(j)-.5)*E2.w,E2.top+E2.h-t*E2.h*.8,2+hs(j+1)*3,1)}})}}
});
// エリートの強攻撃
Object.assign(EFX,{
 jhunt:{c:'#ffb030',t:'slam',a:[.2,.3],ch(o,p){const cx=o.x+o.w*.2,cy=o.y+o.h*.3;pc(cx,cy,2+p*4,'rgba(255,176,48,.6)');ctx.globalAlpha=p*.8;for(let k=0;k<14;k++){const an=hs(k)*6.283,r=(1-((p*1.4+hs(k+2))%1))*50;sq(cx+Math.cos(an)*r,cy+Math.sin(an)*r*.6,2,k%2?'#ffb030':'#8a4a22')}ctx.globalAlpha=1},
  hit(f,p){const X=f.x,Y=f.y,en=p<.6?1:Math.max(0,1-(p-.6)/.4);flash(.35*(1-p/.15),'#ffd890');ctx.globalAlpha=en;for(let k=0;k<4;k++){ctx.strokeStyle=k%2?'#e8d8b0':'#ffb030';ctx.lineWidth=5-k;ctx.beginPath();const a0=3.6+k*.08;ctx.arc(X+10,Y-14+k*8,30+p*20,a0,a0+Math.min(1,p*5)*2.2);ctx.stroke()}for(let k=0;k<12;k++){const a=k/12*6.283,r=10+p*60;sq(X+Math.cos(a)*r,Y+Math.sin(a)*r*.6,2,'#8a4a22')}ctx.globalAlpha=1}},
 jpod:{c:'#a8c040',t:'orb',a:[.1,.2],ch(o,p){const cx=o.x+o.w*.1,cy=o.y+o.h*.2;pc(cx,cy,3+p*8,'rgba(168,192,64,.5)');pc(cx,cy,2+p*3,'#d8f080');ctx.globalAlpha=p;for(let k=0;k<10;k++){const t=(T*1.5+k/10)%1;sq(cx+(hs(k)-.5)*30,cy+t*30,2,'#a8c040')}ctx.globalAlpha=1},
  hit(f,p){const X=f.x,Y=f.y,en=p<.6?1:Math.max(0,1-(p-.6)/.4);flash(.3*(1-p/.15),'#d8f080');ctx.globalAlpha=en;for(let k=0;k<26;k++){const a=hs(k)*6.283,r=6+p*(30+hs(k+1)*40);sq(X+Math.cos(a)*r,Y+Math.sin(a)*r*.6+p*20,k%3?3:4,k%2?'#a8c040':'#6a8a20')}ctx.fillStyle='#6a8a20';ctx.globalAlpha=en*.5;ctx.beginPath();ctx.ellipse(X,208,20+p*40,4+p*4,0,0,6.3);ctx.fill();ctx.globalAlpha=1}},
 jshd:{c:'#5af0d0',t:'slam',a:[.5,.15],ch(o,p){const cx=o.x+o.w*.5,cy=o.y+o.h*.12;pc(cx,cy,2+p*4,'rgba(90,240,208,.5)');ctx.globalAlpha=p*.6;ctx.fillStyle='#0a0e14';ctx.fillRect(-20,24,680,206);ctx.globalAlpha=1},
  hit(f,p){const X=f.x,Y=f.y,en=p<.6?1:Math.max(0,1-(p-.6)/.4);flash(.3*(1-p/.15),'#a0fff0');ctx.globalAlpha=en;for(let k=0;k<5;k++){ctx.strokeStyle=k%2?'#2e3848':'#141a24';ctx.lineWidth=6-k;ctx.beginPath();const x0=X-40+k*20;ctx.moveTo(x0,24);const t=Math.min(1,p*4);ctx.quadraticCurveTo(x0+10,(24+Y)/2,X+(k-2)*5,24+(Y-24)*t);ctx.stroke()}for(let k=0;k<8;k++)sq(X+(hs(k)-.5)*40,Y+(hs(k+1)-.5)*30,2,'#5af0d0');ctx.globalAlpha=1}}
});
// ボスの必殺
BFX.jking={tn:'rgba(20,30,10,',ch(o){const p=o.p;for(let k=0;k<30;k++){const a=hs(k)*6.283+T*(1+p*2),r=(40+hs(k+1)*80)*(1-p*.5);ctx.globalAlpha=.3+p*.6;jgLeaf(o.cx+Math.cos(a)*r,o.cy+Math.sin(a)*r*.5,a*2,k%3?'#3e5a32':'#e0d8c8',4)}ctx.globalAlpha=p;for(let k=0;k<6;k++){ctx.strokeStyle='#c8f090';ctx.lineWidth=1;ctx.beginPath();let x=o.cx,y=o.cy-30;ctx.moveTo(x,y);for(let s=1;s<5;s++){x+=(hs(k*7+s+Math.floor(T*12))-.5)*20;y-=8;ctx.lineTo(x,y)}ctx.stroke()}ctx.globalAlpha=1},
 hit(f,p){const X=f.x,Y=f.y,en=p<.7?1:Math.max(0,1-(p-.7)/.3);flash(.5*(1-p/.15),'#e8ffd0');ctx.globalAlpha=en;for(let k=0;k<3;k++){ctx.strokeStyle=k===1?'#e0d8c8':'#c8b896';ctx.lineWidth=8-k*2;ctx.beginPath();ctx.moveTo(X+120-p*120,Y-20+k*14);ctx.lineTo(X-10,Y-10+k*10);ctx.stroke()}for(let w=0;w<3;w++)ell(X,208,20+p*130-w*20,5+p*20,28,3,w%2?'#c8b896':'#3e5a32');for(let k=0;k<30;k++){const a=hs(k)*3.14+3.14,r=p*(60+hs(k+2)*80);jgLeaf(X+Math.cos(a)*r,Y+Math.sin(a)*r*.7,p*10+k,k%3?'#3e5a32':'#e0d8c8',4)}ctx.globalAlpha=1}};
BFX.jmother={tn:'rgba(14,24,18,',ch(o){const p=o.p;ctx.globalAlpha=.25*p;ctx.fillStyle='#1e4038';ctx.fillRect(-20,24,680,206);ctx.globalAlpha=p;for(let k=0;k<8;k++){const x=40+k*24,t=Math.min(1,p*1.4);ctx.strokeStyle=k%2?'#4a463e':'#6a6458';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(x,208);ctx.quadraticCurveTo(x+10,208-30*t,x+4,208-60*t*(.6+hs(k)*.4));ctx.stroke()}ctx.globalAlpha=1},
 hit(f,p){const X=f.x,Y=f.y,en=p<.7?1:Math.max(0,1-(p-.7)/.3);flash(.35*(1-p/.15),'#c8f070');ctx.globalAlpha=en;for(let k=0;k<10;k++){const a=k/10*6.283+p*2,r=50-Math.min(1,p*2)*30;ctx.strokeStyle=k%2?'#4a463e':'#8a8274';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(X+Math.cos(a)*90,208);ctx.quadraticCurveTo(X+Math.cos(a)*r*1.5,Y,X+Math.cos(a+1)*r*.5,Y-10+Math.sin(a)*r*.4);ctx.stroke()}for(let k=0;k<14;k++)sq(X+(hs(k)-.5)*60,Y+(hs(k+3)-.5)*40,2,'#c8f070');ctx.globalAlpha=1}};
BFX.jmaw={tn:'rgba(24,20,10,',ch(o){const p=o.p,X=110;ctx.globalAlpha=Math.min(1,p*1.3)*.9;ctx.fillStyle='#2a2416';ctx.beginPath();ctx.ellipse(X,208,30+p*60,5+p*10,0,0,6.3);ctx.fill();for(let k=0;k<12;k++){const t=(T*1.2+hs(k))%1;jgMud(X+(hs(k+2)-.5)*(50+p*80),208-t*30*p,2+hs(k)*2,1)}ctx.globalAlpha=1},
 hit(f,p){const X=f.x,Y=f.y,en=p<.7?1:Math.max(0,1-(p-.7)/.3),c=Math.min(1,p/.3);flash(.4*(1-p/.15),'#8a7a4a');ctx.globalAlpha=en;ctx.fillStyle='#4a4228';ctx.beginPath();ctx.ellipse(X,Y-80+c*60,70,26,0,0,6.3);ctx.fill();ctx.beginPath();ctx.ellipse(X,Y+70-c*50,70,22,0,0,6.3);ctx.fill();for(let k=0;k<12;k++){sq(X-56+k*10,Y-56+c*60,4,'#d8ccb0');sq(X-56+k*10,Y+50-c*50,4,'#d8ccb0')}for(let k=0;k<20;k++){const a=hs(k)*6.283,r=p*90;jgMud(X+Math.cos(a)*r,Y+Math.sin(a)*r*.5,3,en)}ctx.globalAlpha=1}};
Object.assign(CHGT,{jhunt:'beast',jpod:'swamp',jshd:'dark',jking:'quake',jmother:'wood',jmaw:'swamp'});
