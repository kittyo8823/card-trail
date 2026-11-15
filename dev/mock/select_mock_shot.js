// キャラ選択画面の見本3案を撮る: node dev/mock/select_mock_shot.js 出力先.png [キャラの並びの番号]
const {chromium}=require('playwright'),path=require('path'),fs=require('fs'),{execSync}=require('child_process');
(async()=>{const out=process.argv[2]||'select_mock.png',sel=+(process.argv[3]||2);const b=await chromium.launch();const p=await b.newPage({viewport:{width:640,height:360},deviceScaleFactor:2});const er=[];p.on('pageerror',e=>er.push(e.message));await p.route('**/fonts.googleapis.com/**',r=>r.abort());await p.goto('file://'+path.resolve(__dirname,'../index.html'));await p.waitForTimeout(500);
await p.evaluate(([code,sel])=>{eval(code);go('select');SEL=sel;SELT=-9;window.__d=draw;window.draw=()=>{}},[fs.readFileSync(path.join(__dirname,'select_mock.js'),'utf8'),sel]);
const tmp=fs.mkdtempSync('/tmp/claude-0/sm');for(const k of['A','B','C']){await p.evaluate(k=>{btns=[];SELV[k]()},k);await p.waitForTimeout(80);await p.screenshot({path:tmp+'/'+k+'.png'})}
console.log(er);await b.close();
execSync(`python3 -c "
from PIL import Image,ImageDraw,ImageFont
ims=[Image.open('${tmp}/%s.png'%k) for k in 'ABC'];W,H=ims[0].size;o=Image.new('RGB',(W,H*3+50*3),(10,8,18));d=ImageDraw.Draw(o);f=ImageFont.truetype('/usr/share/fonts/opentype/ipafont-gothic/ipag.ttf',30)
for n,(im,t) in enumerate(zip(ims,['案A 肖像の回廊（下に大きな肖像の札）','案B 斜めの斬撃（キャラの色の帯と斜めの情報板）','案C 紋章の舞台（中央に回る紋章、下に丸いメダル）'])):d.text((16,n*(H+50)+10),t,fill=(240,232,216),font=f);o.paste(im,(0,n*(H+50)+50))
o.save('${out}')"`)})();
