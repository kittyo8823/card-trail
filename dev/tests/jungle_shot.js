// 密林の遺跡の戦闘画面を撮る: node tests/jungle_shot.js '[[["jfang","jmask"],0],[["jking"],2]]' 出力の頭
const {chromium}=require('playwright'),path=require('path'),fs=require('fs');
const groups=JSON.parse(process.argv[2]),out=process.argv[3]||'jg';
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:640,height:360}});const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error')er.push(m.text())});await p.route('**/fonts.googleapis.com/**',r=>r.abort());await p.goto('file://'+path.resolve(__dirname,'../index.html'));await p.waitForTimeout(600);await p.evaluate(()=>{window.requestAnimationFrame=()=>0});
for(let i=0;i<groups.length;i++){const[g,kind,act]=groups[i];const d=await p.evaluate(([g,kind,act])=>{newRun(0);P.v2='j';P.act=2;go('map');fight(g,kind);B.bn=null;B.tut=null;for(let k=0;k<30;k++)update(.05);if(act){for(let k=0;k<act;k++){endTurn();for(let j=0;j<120;j++)update(.05)}}ctx.setTransform(K,0,0,K,0,0);btns=[];draw();return cv.toDataURL()},[g,kind,act||0]);fs.writeFileSync(out+i+'.png',Buffer.from(d.split(',')[1],'base64'))}
console.log(JSON.stringify(er));await b.close()})();
