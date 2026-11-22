// キャラの別の見た目の見本：node dev/mock/skin_shot.js 出力先（上段＝今、下段＝別の見た目）
const {chromium}=require('playwright'),path=require('path');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:980,height:440},deviceScaleFactor:1});const er=[];p.on('pageerror',e=>er.push(e.message));await p.goto('file://'+path.resolve(__dirname,'../index.html'));await p.waitForTimeout(600);
const u=await p.evaluate(()=>{const c=document.createElement('canvas');c.width=980;c.height=440;const g=c.getContext('2d');g.fillStyle='#1a1624';g.fillRect(0,0,980,440);g.imageSmoothingEnabled=false;
 const nm=['ユウキング','坂井','坪内丸','名無し','ホーリー大輔','ネブラ','セレス'],ks=['pl','si','sm','nn','hori','neb','seres'];
 const P=k=>{const d=SD[k];return paint(d[0],d[1],d[3],d[2])};
 for(let v=0;v<2;v++){SKV=v;NEBV=v;ks.forEach((k,i)=>{const x=10+i*138,y=10+v*205;let im;
  if(k==='nn'){const b2=P('grim'),o=P('oji');g.drawImage(b2,x+4,y+10,b2.width*.6,b2.height*.6);g.drawImage(o,x+30,y+190-o.height);return}
  if(k==='neb'){g.save();nebPaint(g,x+65,y+190,.6,{nh:1,v});g.restore();return}
  im=P(k);g.drawImage(im,x+(130-im.width)/2,y+190-im.height)});}
 SKV=0;NEBV=0;g.fillStyle='#fff';g.font='14px sans-serif';nm.forEach((n,i)=>g.fillText(n,14+i*138,432));return c.toDataURL()});
require('fs').writeFileSync(process.argv[2],Buffer.from(u.split(',')[1],'base64'));if(er.length)console.log(er);await b.close()})()
