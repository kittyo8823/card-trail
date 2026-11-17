const {chromium}=require('playwright'),path=require('path'),fs=require('fs');const G=JSON.parse(fs.readFileSync('/tmp/claude-0/ser/g12.json'));
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:640,height:360},deviceScaleFactor:1});const er=[];p.on('pageerror',e=>er.push(e.message));await p.goto('file://'+path.resolve('dev/index.html'));await p.waitForTimeout(400);await p.evaluate(()=>{window.requestAnimationFrame=()=>0});
const shots=[];
for(const [a,sc] of [[1,0],[1,9999],[2,0]]){
const d=await p.evaluate(([G,a,sc])=>{
 const gi=(rows,dc,lc,pad)=>{const n=rows.length,N=n+(pad||0)*2,c=MKC(N,N),x=c.getContext('2d'),A=hx3(dc),L=hx3(lc);rows.forEach((r,y)=>[...r].forEach((ch,i)=>{if(ch==='.')return;const t=(+ch-1)/3;x.fillStyle='rgb('+A.map((v,k)=>Math.round(v+(L[k]-v)*t)).join(',')+')';x.fillRect(i+(pad||0),y+(pad||0),1,1)}));return c};
 const CC={};const g=(k,d,l,pad)=>CC[k+d+l]||(CC[k+d+l]=gi(G[k],d,l,pad));
 window.mMon=(e,d,l)=>e?g('e',d,l):g('b',d,l,1);
 const tk={2:'s',3:'r',4:'q',5:'c'};const oT=window.micT;window.micT=(t,d,l)=>tk[t]?g(tk[t],d,l):oT(t,d,l);
 MPSZ.e=28/24;MPSZ.n=1;
 newRun(0);P.nw=1;for(let i=1;i<a;i++)startAct();P.anA=P.act;AIN=null;CUR.f=0;CUR.j=MP[0].findIndex(n=>n);P.path=['0,'+CUR.j];go('map');AIN=null;MSC=sc;ctx.setTransform(K,0,0,K,0,0);btns=[];draw();return cv.toDataURL()},[G,a,sc]);
shots.push(d)}
await p.evaluate(()=>0);
const imgs=shots.map((d,i)=>{const f='/tmp/claude-0/ser/mm'+i+'.png';fs.writeFileSync(f,Buffer.from(d.split(',')[1],'base64'));return f});
console.log(er,imgs);await b.close()})();
