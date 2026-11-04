// ホストが落ちたときのテスト：node tests/mphost.js ［3人で遊び、途中でホストのページを閉じる→2人目がホストを引き継ぐ→元ホストが新しいページから再接続する］
// 自前の静的サーバーで index.html を配り、tests/mp-mock.js（claude.ai の room の代わり）で1人目=送信可、2人目以降=閲覧者（presence で送る）としてボット同士で遊ばせ、
// 予測中の画面は、予測前（確定済み）の状態で比べる。
// 環境変数 LAT=ミリ秒 で通信の遅れを再現できる。全員の戦闘状態（敵・味方のHP・手札など）が一致し続けるかを比べる。ずれ・ページエラーがあれば終了コード1
const {chromium}=require('playwright');const http=require('http'),fs=require('fs'),path=require('path');
const N=3;
const BOT=`window.__bot=setInterval(()=>{try{
 if(!MPR||!MPR.started)return;const now=Date.now();if(window.__bt&&now-window.__bt<250)return;window.__bt=now;
 if(PM)PM=null;
 if(S==='neow'){NE.opts[(MPR.me.charCodeAt(0))%NE.opts.length][1]();return}
 if(S==='map'){if(P.nw===0&&CUR.f===-1&&P.act===1){P.nw=1;NE.t0=T;go('neow');return}const v=MPR.votes[LK];if(!v||v.f!==CUR.f+1||v.a!==P.act){const a=avail();if(a.length)enter(a[(MPR.me.charCodeAt(1)+CUR.f)%a.length])}return}
 if(S==='battle'&&MPB&&MPB.on){const b=B;if(b.ph!=='p'||b.dn||b.down||b.vt)return;if(b.dsc>0){discardCard(0);return}
  for(let i=0;i<b.hand.length;i++){const c=cd(b.hand[i]);if(!c.un&&(c.X||b.me>=c.c)&&!b.hand[i].sld&&!(c.ms&&b.pl>0)&&!(c.solo&&b.hand.length>1)&&!(c.pay&&P.gold<c.pay)&&b.pl<cLim()&&!(c.hp&&P.hp<=c.hp+5)){const al=alive();play(i,b.en.indexOf(al[(i+b.turn)%al.length]));return}}
  if(P.pot.length&&Math.random()<.05){usePot(0);return}endTurn();return}
 if(S==='reward'){if(RW.pot)givePot(RW.pot);if(RW.cards&&RW.cards.length)P.deck.push({i:RW.cards[0],u:0});after();return}
 if(S==='btr'){if(BT.pick<0){BT.pick=0;BT.t0=T;gain(BT.rs[0])}btNext();return}
 if(S==='act'){startAct();return}
 if(S==='rest'){P.hp=Math.min(P.mhp,P.hp+Math.floor(P.mhp*.3));go('map');return}
 if(S==='shop'){go('map');return}
 if(S==='event'){const ch=EV.ch;ch[ch.length*Math.random()|0][1]();return}
 if(S==='pick'){if(PICK.cb){const cb=PICK.cb,l=PICK.list;PICK=null;cb(l[0])}else{S=PICK.back;PICK=null}return}
 if(S==='conf'){P.deck[CONF.i].u=1;const d=CONF.done;CONF=null;d();return}
 if(S==='eyein'){eyeGo();return}
}catch(e){window.__err=(window.__err||'')+e.message+'|'}},60)`;
const SIG=`(()=>{if(!MPB||!MPB.on||!SB)return null;const pd=MPB.pred&&MPB.pred.length,c=pd?MPB.snaps[0]:{sb:SB,pl:PL};if(c.sb.ph!=='p'||Object.keys(MPB.q).length)return null;
 return {k:MPB.id+':'+c.sb.turn+':'+MPB.next,s:c.sb.en.map(e=>e.k+e.hp+'/'+e.blk+'s'+e.str+(e.dead?'X':'')).join(',')+'|'+c.pl.map(q=>q.B?q.P.hp+'/'+q.B.blk+'/'+q.B.me+'/'+q.B.hand.map(o=>o.i).join('.')+'/'+q.B.dr.length+'/'+q.B.dis.length+(q.B.down?'D':'')+(q.B.dn?'d':''):'-').join('|')}})()`;;
(async()=>{const root=path.resolve(__dirname,'..');const srv=http.createServer((q,r)=>{const f=path.join(root,decodeURIComponent(q.url.split('?')[0]));fs.readFile(f,(e,d)=>{if(e){r.writeHead(404);r.end();return}r.writeHead(200,{'Content-Type':f.endsWith('.html')?'text/html':'application/javascript'});r.end(d)})}).listen(0);const PORT=srv.address().port;const br=await chromium.launch();const ctx=await br.newContext({viewport:{width:640,height:360}});const errs=[];
 await ctx.addInitScript({path:path.join(__dirname,'mp-mock.js')});
 const open=async(i,viewer)=>{const pg=await ctx.newPage();if(viewer)await pg.addInitScript('window.__viewer=true');pg.on('pageerror',e=>errs.push(i+':'+e.message));await pg.goto('http://localhost:'+PORT+'/index.html');return pg};
 let pages=[await open(0,0),await open(1,1),await open(2,1)];await pages[0].waitForTimeout(800);
 await pages[0].evaluate(()=>{S='title';mpCreate()});await pages[0].waitForTimeout(500);const code=await pages[0].evaluate(()=>MPR.code);
 for(let i=1;i<3;i++)await pages[i].evaluate(([c,i])=>{S='title';MPR={cls:i};mpJoin(c,0)},[code,i]);await pages[0].waitForTimeout(3500);
 await pages[0].evaluate(()=>mpStartGame());await pages[0].waitForTimeout(800);
 for(let i=1;i<3;i++)await pages[i].evaluate(()=>{window.rjSave=()=>{}});
 for(const pg of pages)await pg.evaluate(BOT);
 const st=async()=>Promise.all(pages.map(pg=>pg.evaluate(()=>S+'/'+(P?P.act+'-'+(CUR?CUR.f:'')+' hp'+P.hp:'')+(MPR&&MPR.started?' H'+(MPR.host?1:0)+' hk'+MPR.hk+' g'+PL.map(q=>q.gone).join(''):'')+(window.__err?' ERR '+window.__err.slice(0,160):'')).catch(e=>'closed')));
 for(let t=0;t<24;t+=3){await pages[1].waitForTimeout(3000);console.log(t+'s',(await st()).join(' || '))}
 const info=await pages[0].evaluate(()=>localStorage.getItem('cardtower_mprj'));console.log('host info',info);
 await pages[0].close();pages=pages.slice(1);console.log('HOST crashed');
 let took=0,prog0=null;for(let t=0;t<80;t+=4){await pages[0].waitForTimeout(4000);const s2=await st();console.log('after '+t+'s',s2.join(' || '));if(!took&&s2[0].includes('H1')){took=1;prog0=s2[0]}}
 const prog1=(await st())[0];console.log('progressed after takeover:',prog0!==prog1);
 const pg=await open(9,1);await pg.waitForTimeout(800);await pg.evaluate(i=>{localStorage.setItem('cardtower_mprj',JSON.stringify({...JSON.parse(i),t:Date.now()}));S='title';mpRejoin()},info);pages.push(pg);
 let back=0;for(let t=0;t<120;t+=4){await pages[0].waitForTimeout(4000);const s2=await st();console.log('rejoin '+t+'s',s2.join(' || '));if(!back&&/^(map|battle|neow|over|win)/.test(s2[2])){back=1;await pg.evaluate(BOT)}if(back&&t>50)break}
 const g=await pages[0].evaluate(()=>PL.map(q=>q.gone).join(''));console.log('took',took,'back',back,'gone',g,'errors',errs.slice(0,8));await br.close();srv.close();process.exit(took&&back&&!errs.length?0:1)})();