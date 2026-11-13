// 初期カード「斬撃」「防御」の細かいイラストの見本（命刈りの鎌と同じ 148x88・1px の細かさ）。HART に入れればカードに出る
function hbMk(W,H){const c=document.createElement('canvas');c.width=W;c.height=H;return c}
function hbSky(x,W,H,cols,lim){const px=(a,b,col)=>{x.fillStyle=col;x.fillRect(a|0,b|0,1,1)};for(let y=0;y<H;y++){const u=Math.min(1,y/(H*lim))*(cols.length-1),k=Math.min(cols.length-2,Math.floor(u)),f=u-k;for(let i=0;i<W;i++){const d=((i+y*2)%4)/4;px(i,y,cols[f>d?k+1:k])}}}
const artStrike=(W,H)=>{const c=hbMk(W,H),x=c.getContext('2d');const px=(a,b,col)=>{x.fillStyle=col;x.fillRect(a|0,b|0,1,1)},R=(a,b,w,h,col)=>{x.fillStyle=col;x.fillRect(a|0,b|0,w|0,h|0)};let sd=11;const rn=()=>(sd=(sd*16807)%2147483647)/2147483647;
 // 夕暮れの戦場：上は群青、下は赤茶。ディザで段を作る
 hbSky(x,W,H,['#0c0a1a','#161230','#241a3a','#3a2440','#5a3040','#7a4236'],.8);
 // 遠くの崩れた砦と丘
 x.fillStyle='#1a1020';x.beginPath();x.moveTo(0,H*.7);for(let i=0;i<=W;i+=3)x.lineTo(i,H*.66-Math.sin(i*.06)*3-Math.sin(i*.17)*1.5);x.lineTo(W,H);x.lineTo(0,H);x.fill();
 for(const[tx,tw,th]of[[W*.08,8,16],[W*.15,5,10],[W*.86,10,20],[W*.95,5,12]]){R(tx-tw/2,H*.66-th,tw,th,'#140a18');for(let k=0;k<tw;k+=3)R(tx-tw/2+k,H*.66-th-2,2,2,'#140a18');R(tx-tw/2,H*.66-th,1,th,'#2a1a2c')}
 // 手前の地面と草
 x.fillStyle='#0c0610';x.beginPath();x.moveTo(0,H*.84);x.quadraticCurveTo(W*.4,H*.78,W,H*.86);x.lineTo(W,H);x.lineTo(0,H);x.fill();for(let i=0;i<W;i+=2){const h=2+((i*7)%4);R(i,H-h-((i*5)%5),1,h,'#180c14')}
 // 剣：柄は左下、切っ先は右上。振り抜いた瞬間
 const hx=W*.3,hy=H*.9,tx2=W*.74,ty2=H*.08,L=Math.hypot(tx2-hx,ty2-hy),ux=(tx2-hx)/L,uy=(ty2-hy)/L,nx=-uy,ny=ux,A1=Math.atan2(uy,ux);
 // 斬撃の光の弧：切っ先が通った道。左から振り上げて今の位置まで、刃に近いほど太く明るい
 for(let a=A1-1.25;a<=A1-.03;a+=.003){const t=(a-(A1-1.25))/1.22,w=1+t*t*10;for(let k=0;k<w;k++){const rr=L*.86-k,X=hx+Math.cos(a)*rr,Y=hy+Math.sin(a)*rr,q=k/w;let col=q<.15?'#ffffff':q<.38?'#fff4c8':q<.66?'#ffc864':'#d06a3a';if(q>.66&&((X+Y)|0)%2)continue;if(t<.3&&((X*3+Y*5)|0)%4<(3-t*10))continue;px(X,Y,col)}}
 {const g=x.createRadialGradient(tx2,ty2+10,2,tx2,ty2+10,60);g.addColorStop(0,'rgba(255,220,140,.3)');g.addColorStop(1,'rgba(255,220,140,0)');x.fillStyle=g;x.fillRect(0,0,W,H)}
 for(let t=10;t<L;t+=.5){const X=hx+ux*t,Y=hy+uy*t,w=t>L-7?Math.max(0,(L-t)/7*2.5):2.5;for(let j=-3;j<=3;j++){if(Math.abs(j)>w)continue;const col=j<=-2?'#f4f6ff':j===-1?'#d8dcea':j===0?'#8a92ac':j===1?'#b4bccf':'#6a7290';px(X+nx*j,Y+ny*j,col)}}
 for(let k=-7;k<=7;k++)for(let j=0;j<3;j++){const X=hx+ux*(9+j)+nx*k,Y=hy+uy*(9+j)+ny*k;px(X,Y,j===0?'#ffe08a':j===1?'#d0a040':'#7a5418')}
 for(let t=-1;t<9;t+=.5)for(let j=-1;j<=1;j++){const X=hx+ux*t+nx*j,Y=hy+uy*t+ny*j;px(X,Y,((t*2|0)%3===0)?'#2a160c':j<0?'#8a5a32':'#5a3a20')}
 for(let k=-2;k<=2;k++)for(let j=-2;j<=2;j++)if(k*k+j*j<=4)px(hx-ux*3+nx*k,hy-uy*3+ny*j,k+j<0?'#ffe08a':'#a87824');
 // 刃の光る筋と飛び散る火花
 for(let i=0;i<34;i++){const a=-1.2+rn()*1.6,d=4+rn()*22,X=W*.76+Math.cos(a)*d,Y=H*.14+Math.sin(a)*d*.8;px(X,Y,rn()<.5?'#fff4c8':'#ffb050');if(rn()<.4)px(X+1,Y,'#ffd890')}
 for(let i=0;i<9;i++){const y=H*.12+i*7,l=8+rn()*16;R(W*.04+rn()*20,y,l,1,'rgba(255,240,200,'+(.15+rn()*.2)+')')}
 return c};
const artDefend=(W,H)=>{const c=hbMk(W,H),x=c.getContext('2d');const px=(a,b,col)=>{x.fillStyle=col;x.fillRect(a|0,b|0,1,1)},R=(a,b,w,h,col)=>{x.fillStyle=col;x.fillRect(a|0,b|0,w|0,h|0)};let sd=5;const rn=()=>(sd=(sd*16807)%2147483647)/2147483647;
 // 石造りの壁（暗い青）
 hbSky(x,W,H,['#0a0e1a','#101828','#162236','#1c2a42'],1);
 for(let row=0;row*9<H;row++){const off=row%2?0:9;for(let bx=-off;bx<W;bx+=18){R(bx,row*9,18,1,'#0a0e18');R(bx,row*9,1,9,'#0a0e18');R(bx+1,row*9+1,16,1,'rgba(120,150,200,.08)')}}
 // 上から差す光
 for(let i=0;i<4;i++){const x0=W*.32+i*16;x.fillStyle='rgba(150,190,255,.07)';x.beginPath();x.moveTo(x0,0);x.lineTo(x0+8,0);x.lineTo(x0+22,H);x.lineTo(x0+10,H);x.fill()}
 {const g=x.createRadialGradient(W/2,H*.48,8,W/2,H*.48,62);g.addColorStop(0,'rgba(120,180,255,.35)');g.addColorStop(1,'rgba(120,180,255,0)');x.fillStyle=g;x.fillRect(0,0,W,H)}
 // 盾：上辺がまっすぐで下がとがる形。縁は鋼、中は青い琺瑯、金の山形の紋と中央の鋲
 const sx=W/2,top=H*.08,hw=27,bot=H*.95,mid=H*.5;const inS=(i,j)=>{if(j<top||j>bot)return 0;const w=j<mid?hw:hw*Math.sqrt(Math.max(0,1-Math.pow((j-mid)/(bot-mid),1.6)));return Math.abs(i-sx)<=w};
 for(let j=0;j<H;j++)for(let i=0;i<W;i++){if(!inS(i,j))continue;const e=!inS(i-3,j)||!inS(i+3,j)||!inS(i,j-3)||!inS(i,j+3),e1=!inS(i-1,j)||!inS(i+1,j)||!inS(i,j-1)||!inS(i,j+1);let col;
  if(e){const lt=(i-sx)+(j-mid)*.6<0;col=e1?(lt?'#8a96b0':'#2a3044'):lt?'#c8d0e0':'#6a7488'}else{const s=(i-sx)/hw+(j-mid)/(bot-top)*1.2,d=((i+j)%2)/2;col=s<-.6?'#4a7ad0':s<-.1?(d<.5?'#3a66b8':'#4a72c4'):s<.5?'#2c5098':s<.9?(d<.5?'#203c78':'#2c5098'):'#1a2e5c'}px(i,j,col)}
 // 金の山形の紋
 for(let k=0;k<4;k++)for(let i=-20;i<=20;i++){const j=H*.58-Math.abs(i)*.7+k;if(inS(sx+i,j)&&inS(sx+i,j+4)&&Math.abs(i)<22)px(sx+i,j,k===0?'#ffe08a':k<3?'#d0a040':'#7a5418')}
 // 中央の鋲と縁の鋲
 for(let k=-3;k<=3;k++)for(let j=-3;j<=3;j++){const d=k*k+j*j;if(d<=9)px(sx+k,H*.34+j,d<=2&&k+j<0?'#ffffff':k+j<0?'#e0e6f4':'#7a849c')}
 for(const[a,b]of[[sx-22,top+5],[sx+22,top+5],[sx-22,mid],[sx+22,mid],[sx,top+3],[sx-13,bot-14],[sx+13,bot-14]]){px(a,b,'#e0e6f4');px(a+1,b,'#9aa4bc');px(a,b+1,'#9aa4bc');px(a+1,b+1,'#4a5268')}
 // 傷
 for(const[a,b,l,s]of[[sx+8,H*.22,7,1],[sx-14,H*.42,5,-1],[sx+4,H*.72,6,1]])for(let k=0;k<l;k++){px(a+k*s,b+k*.6,'#16244a');px(a+k*s,b+k*.6-1,'#5a86d8')}
 // 盾の周りの守りの光の粒
 for(let i=0;i<26;i++){const a=rn()*6.283,d=34+rn()*14,X=sx+Math.cos(a)*d,Y=H*.5+Math.sin(a)*d*.7;if(X<0||X>=W||Y<0||Y>=H)continue;px(X,Y,rn()<.5?'#cfe4ff':'#7aa8f0')}
 return c};
