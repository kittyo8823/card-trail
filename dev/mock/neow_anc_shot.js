// ？？？の画面を古の者の画面と同じ作りにした案（見本）。撮影：node dev/mock/neow_anc_shot.js 出力先
const {chromium}=require('playwright'),path=require('path');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:640,height:360},deviceScaleFactor:2});await p.goto('file://'+path.resolve(__dirname,'../index.html'));await p.waitForTimeout(600);
await p.evaluate(()=>{startGame();newRun(0);neowGen();NE.t0=T-5;go('neow');S='mock';const sel=1;
window.drawMock=()=>{ctx.drawImage(NEB,0,0);const cx=320,cy=104+Math.sin(T*1.3)*4,cb=SPR.qcube;
 const cg=ctx.createRadialGradient(cx,cy,10,cx,cy,150);cg.addColorStop(0,'rgba(95,246,255,.28)');cg.addColorStop(1,'rgba(95,246,255,0)');ctx.fillStyle=cg;ctx.fillRect(cx-150,cy-150,300,300);
 for(let k=0;k<90;k++){const a=k/90*6.283+T*.5;ctx.fillStyle=k%7?'#5ff6ff':'#ff4fd8';ctx.fillRect(Math.round(cx+Math.cos(a)*140),Math.round(cy+Math.sin(a)*28),2,2)}
 ctx.drawImage(cb,Math.round(cx-cb.width/2),Math.round(cy-cb.height/2));
 let g=ctx.createLinearGradient(0,180,0,360);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,.8)');ctx.fillStyle=g;ctx.fillRect(0,180,640,180);topbar();
 const qx=170,qy=196;ctx.fillStyle='rgba(6,10,16,.92)';anRR(qx,qy,300,26,6);ctx.fill();ctx.strokeStyle='rgba(95,246,255,.35)';ctx.lineWidth=1;anRR(qx+.5,qy+.5,299,25,6);ctx.stroke();txt('……観測対象を確認。選択を一つ、許可する。',qx+10,qy+17,'#e8f6ff','left',11);
 NE.opts.forEach((o,i)=>{const R=o[0].startsWith('【代償】'),l=o[0].replace('【代償】',''),m=l.match(/^(.*?)(（.*）)?$/),y=230+i*32,x=140,w=360,h=28,me=sel===i;
  ctx.fillStyle=me?'rgba(20,40,52,.96)':'rgba(6,10,14,.9)';anRR(x,y,w,h,6);ctx.fill();ctx.strokeStyle=me?'#5ff6ff':R?'rgba(255,110,110,.35)':'rgba(95,246,255,.22)';anRR(x+.5,y+.5,w-1,h-1,6);ctx.stroke();
  const ix=x+16,iy=y+14;ctx.fillStyle=R?'#7a2a3a':'#1e4a5a';ctx.beginPath();ctx.moveTo(ix,iy-9);ctx.lineTo(ix+9,iy);ctx.lineTo(ix,iy+9);ctx.lineTo(ix-9,iy);ctx.fill();txt(R?'!':String(i+1),ix,iy+4,R?'#ffb0b0':'#9af6ff','center',10);
  if(R)txt('代償',x+34,y+18,'#ff8a8a','left',10);txt(m[1],x+(R?62:34),y+18,'#ffd23f','left',12);ctx.globalAlpha=1});
 txt('？？？',20,336,'#e8f6ff','left',26);txt('宙に浮かぶ立方体',22,352,'#8ab8c8','left',10);
 btn(512,282,116,30,'これを選ぶ',()=>{},'#2a6a8a',14)};
const d0=draw;draw=function(){btns=[];LPC=[];ENI=[];if(S==='mock'){drawMock();return}d0()}});
await p.waitForTimeout(500);await p.screenshot({path:process.argv[2]||'neow_anc.png'});await b.close()})()
