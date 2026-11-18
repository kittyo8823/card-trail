const {chromium}=require('playwright'),path=require('path'),fs=require('fs');
const keys=process.argv[2].split(','),out=process.argv[3],cols=+(process.argv[4]||5);
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:640,height:360}});const er=[];p.on('pageerror',e=>er.push(e.message));await p.goto('file://'+path.resolve('dev/index.html'));await p.waitForTimeout(500);await p.evaluate(()=>{window.requestAnimationFrame=()=>0});
await p.evaluate(fs.readFileSync('dev/mock/heaven_e.js','utf8')+';0');
const d=await p.evaluate(([keys,cols])=>{const ims=keys.map(k=>{const s=SD[k];const im=paint(s[0],s[1],s[3],s[2]);return [k,NOFL.test(k)?im:flipC(im)]});
 const cw=Math.max(...ims.map(a=>a[1].width))+20,ch=Math.max(...ims.map(a=>a[1].height))+30,rows=Math.ceil(ims.length/cols),c=MKC(cw*cols,ch*rows),x=c.getContext('2d');
 x.fillStyle='#1c1820';x.fillRect(0,0,c.width,c.height);x.imageSmoothingEnabled=false;
 ims.forEach(([k,im],i)=>{const cx=(i%cols)*cw,cy=Math.floor(i/cols)*ch;x.drawImage(im,cx+(cw-im.width)/2,cy+ch-20-im.height);x.fillStyle='#ccc';x.font='10px sans-serif';x.fillText(k,cx+4,cy+ch-6)});return c.toDataURL()},[keys,cols]);
fs.writeFileSync(out,Buffer.from(d.split(',')[1],'base64'));console.log(er);await b.close()})();
