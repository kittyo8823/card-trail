// 使い方: node mock/soft_boss.js 出力先.png（第3層のボスを、天使の見本3のような滑らかな陰影＋金属の照り＋光のにじみで描き直して比べる）
const {chromium}=require('playwright'),fs=require('fs');(async()=>{const br=await chromium.launch(),pg=await br.newPage({viewport:{width:640,height:360}}),er=[];pg.on('pageerror',e=>er.push(e.message));await pg.route('**/fonts.googleapis.com/**',r=>r.abort());await pg.goto('file://'+__dirname+'/../index.html');await pg.waitForTimeout(400);
await pg.addScriptTag({path:__dirname+'/angel3.js'});
const d=await pg.evaluate(()=>{
 // paint の陰影を3段→なめらか（端からの距離で連続に明暗）＋中ほどに金属の照りの帯。輪郭は少し弱く
 let src=paint.toString();
 src=src.replace('let f=0;const a=Math.min(u,l),b=Math.min(d,r);if(a<hw)f+=.27;else if(a<hw*2.4)f+=.1;if(b<sw)f-=.27;else if(b<sw*2.4)f-=.11;',
  'let f=0;const a=Math.min(u,l),b=Math.min(d,r),A=hw*7,B=sw*7;f+=.5*Math.max(0,1-a/A)**1.6;f-=.55*Math.max(0,1-b/B)**1.3;const m=(u+1)/(u+d+2);if(m>.38&&m<.5)f+=.22*(1-Math.abs(m-.44)/.06);')
  .replace(/u<hw\*3/,'u<hw*7').replace(/l<hw\*3/,'l<hw*7').replace(/d<sw\*3/,'d<sw*7').replace(/r<sw\*3/,'r<sw*7').replace('pshade(v,-.72)','pshade(v,-.6)');
 const paintSoft=eval('('+src+')');
 const bloom=im=>{const w=im.width,h=im.height,o=MKC(w,h),g=o.getContext('2d'),b=MKC(w,h),bg=b.getContext('2d'),dd=im.getContext('2d').getImageData(0,0,w,h),a=dd.data;
  for(let i=0;i<a.length;i+=4){const mx=Math.max(a[i],a[i+1],a[i+2]),mn=Math.min(a[i],a[i+1],a[i+2]);if(!(a[i+3]&&mx>200&&(mx-mn>90||mn>235)))a[i+3]=0}bg.putImageData(dd,0,0);
  g.filter='blur(6px)';g.globalAlpha=.9;g.drawImage(b,0,0);g.filter='blur(2px)';g.drawImage(b,0,0);g.filter='none';g.globalAlpha=1;g.drawImage(im,0,0);g.globalCompositeOperation='lighter';g.globalAlpha=.35;g.filter='blur(3px)';g.drawImage(b,0,0);return o};
 const W=640,H=360,ks=['deus','chronos','protoA','scales','*'],cv=document.getElementById('c');draw=()=>{};cv.width=W*2;cv.height=H*3;ctx.setTransform(1,0,0,1,0,0);ctx.imageSmoothingEnabled=false;ctx.fillStyle='#000';ctx.fillRect(0,0,cv.width,cv.height);
 ks.forEach((k,i)=>{ctx.save();ctx.translate((i%2)*W,Math.floor(i/2)*H);ctx.beginPath();ctx.rect(0,0,W,H);ctx.clip();ctx.drawImage(bgbFor(3),0,0,W,H);const pl=SPR.pl||SPR[CH[0].s];ctx.drawImage(pl,90,208-pl.height);
  let im;if(k==='*')im=angelBoss3();else{const s=SD[k],p=paintSoft(s[0],s[1],s[3],s[2]);im=bloom(NOFL.test(k)?p:flipC(p))}
  const y=k==='*'?208-im.height+14:208-im.height;ctx.drawImage(im,Math.round(465-im.width/2),y);txt(k==='*'?'天使の見本3':(E[k]&&E[k].n||k)+'（なめらか版）',465,236,'#fff','center',11);ctx.restore()});return cv.toDataURL('image/png')});
fs.writeFileSync(process.argv[2],Buffer.from(d.split(',')[1],'base64'));console.log(er);await br.close()})();
