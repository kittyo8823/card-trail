// ？？？の画面を古の者の画面と同じ作りにした案（見本）。撮影：node dev/mock/neow_anc_shot.js 出力先
const {chromium}=require('playwright'),path=require('path');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:640,height:360},deviceScaleFactor:2});await p.goto('file://'+path.resolve(__dirname,'../index.html'));await p.waitForTimeout(600);
await p.evaluate(()=>{startGame();newRun(0);neowGen();NE.opts=['カードを1枚選んで複製する','100ゴールドを得る','ランダムなレリックを1つ得る','【代償】HPが半分 ＋ ランダムなボスレリック'].map(l=>[l,()=>{}]);NE.t0=T-5;go('neow');S='mock';const sel=1;
/* 選択肢の種類ごとのアイコン（8×8 の点・1点2px）。代償のある選択肢は得る側（＋の後ろ）で決める */
const G={card:["oooooo..","oaaaao..","oaaaao..","oaaaao..","owwwwo..","owwwwo..","oooooo..","........"],coin:["..oooo..",".oyyyyo.","oyywyyyo","oywyyyyo","oyyyyyyo","oyyyyyyo",".oyyyyo.","..oooo.."],heart:[".rr..rr.","rwrrrrrr","rrrrrrrr","rrrrrrrr",".rrrrrr.","..rrrr..","...rr...","........"],potion:["...cc...","...gg...","..gggg..",".gppppg.","gppwpppg","gppppppg",".gppppg.","..gggg.."],relic:["..oooo..",".obbbbo.","obwbbbbo","obbbbbbo",".obbbbo.","..obbo..","...oo...","........"],up:["...gg...","..gggg..",".gggggg.","gggggggg","...gg...","...gg...","...gg...","........"],x:["r.....r.",".r...r..","..r.r...","...r....","..r.r...",".r...r..","r.....r.","........"],energy:["....yy..","...yy...","..yyy...",".yyyyy..","...yy...","..yy....",".yy.....","........"],elite:["w......w","w.wwww.w",".wwwwww.",".wkwwkw.",".wwwwww.","..wkkw..","..wwww..","........"],bag:["..oo....","...o....",".oyyyo..","oyyyyyo.","oyywyyo.","oyyyyyo.",".ooooo..","........"],swap:[".pppp...","p....p..","p.....p.","......p.","p.....p.","pp...p..","p.ppp...","........"]};
const GC={o:'#2a2440',a:'#4a7ac8',w:'#f6f2ff',y:'#ffd23f',r:'#e05050',c:'#8a6a4a',g:'#9af6ff',p:'#ff6ad0',b:'#5ff6ff',k:'#1a1430'};
window.nKind=l=>{const t=l.includes('＋')?l.split('＋').pop():l;return t.includes('強化')?['card','up']:t.includes('消す')?['card','x']:t.includes('複製')?['card2']:t.includes('書き換え')?['card','swap']:t.includes('エリート')?['elite']:t.includes('ショップ')?['bag']:t.includes('エナジー')?['energy']:t.includes('レリック')?['relic']:t.includes('ポーション')?['potion']:t.includes('ゴールド')?['coin']:t.includes('最大HP')?['heart']:['card']};
window.nIcon=(ks,cx,cy)=>{const one=(k,ox,oy,sc)=>{const g=G[k];g.forEach((r,j)=>[...r].forEach((ch,i)=>{if(ch==='.')return;ctx.fillStyle=k==='up'&&ch==='g'?'#7dff9a':GC[ch];ctx.fillRect(Math.round(ox+i*sc),Math.round(oy+j*sc),sc,sc)}))};
 if(ks[0]==='card2'){one('card',cx-9,cy-9,2);one('card',cx-4,cy-5,2);return}one(ks[0],cx-8,cy-8,2);if(ks[1])one(ks[1],cx-1,cy-2,1.25)};
/* 古の者と同じ作り：レリックと同じ陰影付きのドット絵（古の者の絵 ANIC とレリックの絵）を枠なしで置く */
window.nIco=l=>{const t=l.includes('＋')?l.split('＋').pop():l,A=k=>ANIC[k],Rr=k=>rIcon(k);return t.includes('強化')?Rr('stsw'):t.includes('消す')?A('ash'):t.includes('複製')?A('page'):t.includes('書き換え')?A('sand'):t.includes('エリート')?Rr('skull'):t.includes('ショップ')?Rr('coffer'):t.includes('エナジー')?Rr('lamp'):t.includes('ボスレリック')?Rr('crown'):t.includes('レアなレリック')?Rr('ruby'):t.includes('レリック')?Rr('pandora'):t.includes('ポーション')?Rr('bottle'):t.includes('ゴールド')?Rr('purse'):t.includes('最大HP')?Rr('heart'):t.includes('レア')?A('seed'):A('acard')};
window.drawMock=()=>{ctx.drawImage(NEB,0,0);const cx=320,cy=104+Math.sin(T*1.3)*4,cb=SPR.qcube;
 const cg=ctx.createRadialGradient(cx,cy,10,cx,cy,150);cg.addColorStop(0,'rgba(95,246,255,.28)');cg.addColorStop(1,'rgba(95,246,255,0)');ctx.fillStyle=cg;ctx.fillRect(cx-150,cy-150,300,300);
 for(let k=0;k<90;k++){const a=k/90*6.283+T*.5;ctx.fillStyle=k%7?'#5ff6ff':'#ff4fd8';ctx.fillRect(Math.round(cx+Math.cos(a)*140),Math.round(cy+Math.sin(a)*28),2,2)}
 ctx.drawImage(cb,Math.round(cx-cb.width/2),Math.round(cy-cb.height/2));
 let g=ctx.createLinearGradient(0,180,0,360);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,.8)');ctx.fillStyle=g;ctx.fillRect(0,180,640,180);topbar();
 const qx=170,qy=196;ctx.fillStyle='rgba(6,10,16,.92)';anRR(qx,qy,300,26,6);ctx.fill();ctx.strokeStyle='rgba(95,246,255,.35)';ctx.lineWidth=1;anRR(qx+.5,qy+.5,299,25,6);ctx.stroke();txt('……観測対象を確認。選択を一つ、許可する。',qx+10,qy+17,'#e8f6ff','left',11);
 NE.opts.forEach((o,i)=>{const R=o[0].startsWith('【代償】'),l=o[0].replace('【代償】',''),m=l.match(/^(.*?)(（.*）)?$/),y=230+i*32,x=140,w=360,h=28,me=sel===i;
  ctx.fillStyle=me?'rgba(20,40,52,.96)':'rgba(6,10,14,.9)';anRR(x,y,w,h,6);ctx.fill();ctx.strokeStyle=me?'#5ff6ff':R?'rgba(255,110,110,.35)':'rgba(95,246,255,.22)';anRR(x+.5,y+.5,w-1,h-1,6);ctx.stroke();
  const ix=x+16,iy=y+14;ctx.imageSmoothingEnabled=false;ctx.drawImage(nIco(o[0]),x+6,y+2,24,24);
  if(R)txt('代償',x+34,y+18,'#ff8a8a','left',10);txt(m[1],x+(R?62:34),y+18,'#ffd23f','left',12);ctx.globalAlpha=1});
 txt('？？？',20,336,'#e8f6ff','left',26);txt('宙に浮かぶ立方体',22,352,'#8ab8c8','left',10);
 btn(512,282,116,30,'これを選ぶ',()=>{},'#2a6a8a',14)};
const d0=draw;draw=function(){btns=[];LPC=[];ENI=[];if(S==='mock'){drawMock();return}d0()}});
await p.waitForTimeout(500);await p.screenshot({path:process.argv[2]||'neow_anc.png'});await b.close()})()
