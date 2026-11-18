// 密林の遺跡の攻撃演出の途中を撮る: node tests/jungle_fx.js '[["jking",4,2,1.6]]' 出力の頭   （[敵,行動番号,種類,秒]）
const {chromium}=require('playwright'),path=require('path'),fs=require('fs');
const L=JSON.parse(process.argv[2]),out=process.argv[3]||'jf';
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:640,height:360}});const er=[];p.on('pageerror',e=>er.push(e.message));await p.route('**/fonts.googleapis.com/**',r=>r.abort());await p.goto('file://'+path.resolve(__dirname,'../index.html'));await p.waitForTimeout(600);await p.evaluate(()=>{window.requestAnimationFrame=()=>0});
for(let i=0;i<L.length;i++){const[k,mi,kind,sec]=L[i];const d=await p.evaluate(([k,mi,kind,sec])=>{newRun(0);P.v2='j';P.act=2;P.mhp=P.hp=999;go('map');fight(Array.isArray(k)?k:[k],kind);B.bn=null;B.tut=null;for(let j=0;j<20;j++)update(.05);const e=B.en.find(x=>!x.dead&&x.el===kind)||B.en[0];e.i=mi;e.it=xIt(e);B.hand.length=0;endTurn();for(let j=0;j<Math.round(sec/.05);j++)update(.05);ctx.setTransform(K,0,0,K,0,0);btns=[];draw();return cv.toDataURL()},[k,mi,kind,sec]);fs.writeFileSync(out+i+'.png',Buffer.from(d.split(',')[1],'base64'))}
console.log(JSON.stringify(er));await b.close()})();
