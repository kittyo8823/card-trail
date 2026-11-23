const fs=require('fs'),path=require('path'),{chromium}=require('playwright');
const h=fs.readFileSync(path.join(__dirname,'../../card-trail/dev/index.html'),'utf8');
const a=h.indexOf('/* ===== 音 ===== */'),z=h.indexOf('/* ===== 描画ヘルパー ===== */');
const src=h.slice(a,z);fs.writeFileSync('/tmp/claude-0/-home-user-card-trail/d68964cb-fc35-54f5-b8a9-4e42844d05e9/scratchpad/audio.js',src);
const page=`<script>let S='game',QT=0,P=null,B=null,RNG=null;${src}</script>`;
fs.writeFileSync('/tmp/claude-0/-home-user-card-trail/d68964cb-fc35-54f5-b8a9-4e42844d05e9/scratchpad/a.html',page);
(async()=>{const b=await chromium.launch({args:['--autoplay-policy=no-user-gesture-required']});const p=await b.newPage();const er=[];p.on('pageerror',e=>er.push(e.message));
await p.goto('file:///tmp/claude-0/-home-user-card-trail/d68964cb-fc35-54f5-b8a9-4e42844d05e9/scratchpad/a.html');
for(const k of ['b','x','b1s','b1x','b2','j2','j2x','b3','x3','h3','h3x','t','m']){await p.evaluate(k=>{if(!AC)newAC();bgm(k)},k);await p.waitForTimeout(1500);}
const s=await p.evaluate(()=>{const r=[];for(const k of ['spa','spk','hkn','horb','ea','pk','wn','ls','ps','cl','tn','te'])try{sfx(k)}catch(e){r.push(k+':'+e.message)}return r});
console.log(src.length,JSON.stringify(er),s);await b.close()})();
