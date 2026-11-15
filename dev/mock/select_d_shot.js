// キャラ選択画面 案D（スレスパ2の作りを参考）を数キャラ分撮る: node dev/mock/select_d_shot.js 出力先.png 並びの番号,番号,...
const {chromium}=require('playwright'),path=require('path'),fs=require('fs'),{execSync}=require('child_process');
(async()=>{const out=process.argv[2]||'select_d.png',ss=(process.argv[3]||'0,2,5').split(',').map(Number);const b=await chromium.launch();const p=await b.newPage({viewport:{width:640,height:360},deviceScaleFactor:2});const er=[];p.on('pageerror',e=>er.push(e.message));await p.route('**/fonts.googleapis.com/**',r=>r.abort());await p.goto('file://'+path.resolve(__dirname,'../index.html'));await p.waitForTimeout(500);
await p.evaluate(code=>{eval(code);go('select');SELT=-9;window.draw=()=>{}},fs.readFileSync(path.join(__dirname,'select_mock.js'),'utf8'));
const tmp=fs.mkdtempSync('/tmp/claude-0/sd');for(const[n,s]of ss.entries()){await p.evaluate(s=>{btns=[];SEL=s;SELV.D()},s);await p.waitForTimeout(80);await p.screenshot({path:tmp+'/'+n+'.png'})}
console.log(er);await b.close();
execSync(`python3 -c "
from PIL import Image
ims=[Image.open('${tmp}/%d.png'%k) for k in range(${ss.length})];W,H=ims[0].size;o=Image.new('RGB',(W,H*len(ims)+12*(len(ims)-1)),(10,8,18))
for n,im in enumerate(ims):o.paste(im,(0,n*(H+12)))
o.save('${out}')"`)})();
