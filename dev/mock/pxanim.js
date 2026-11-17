const {chromium}=require('playwright'),path=require('path'),fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:640,height:360}});await p.goto('file://'+path.resolve('dev/index.html'));await p.waitForTimeout(500);await p.evaluate(()=>{window.requestAnimationFrame=()=>0});
const frames=await p.evaluate(()=>{const s=SPR.goblin,W=s.width,H=s.height,sd=s.getContext('2d').getImageData(0,0,W,H).data,G=2,S=3,PAD=6;
 let bot=0,top=H;for(let y=0;y<H;y++)for(let x=0;x<W;x++)if(sd[(y*W+x)*4+3]){bot=Math.max(bot,y);top=Math.min(top,y)}
 const snap=v=>Math.round(v/G)*G,waist=snap(top+(bot-top)*.62),head=snap(top+(bot-top)*.5);
 // 点ごとの部位：0脚 1胴 2頭 3刃（灰色）
 const cls=new Uint8Array(W*H);for(let y=0;y<H;y++)for(let x=0;x<W;x++){const i=(y*W+x)*4;if(!sd[i+3])continue;const r=sd[i],g=sd[i+1],bb=sd[i+2],gr=Math.abs(r-g)<24&&Math.abs(g-bb)<24&&r>100;cls[y*W+x]=y>=waist?0:gr?3:y<head?2:1}
 const eyes=[];for(let y=top;y<head;y++)for(let x=0;x<W;x++){const i=(y*W+x)*4;if(sd[i+3]&&sd[i]>180&&sd[i+1]>150&&sd[i+2]<120)eyes.push([x,y])}
 const out=[];
 for(let f=0;f<72;f++){const t=f/24,c=document.createElement('canvas');c.width=(W+PAD*2)*S*2+30;c.height=(H+PAD*2)*S;const x=c.getContext('2d');x.fillStyle='#1c1a22';x.fillRect(0,0,c.width,c.height);x.imageSmoothingEnabled=false;
  const by=Math.round(Math.sin(t*2.6)*1)*G;x.drawImage(s,PAD*S,(PAD+by)*S,W*S,H*S);
  const br=Math.sin(t*2.6),bl=Math.sin(t*2.6-1.1),dT=br>0?-G:0,dH=dT+(bl>.2?-G:0),dK=dT;
  const id=new ImageData(W,H),d=id.data,put=(sx,sy,dx,dy)=>{if(dy<0||dy>=H||dx<0||dx>=W)return;const si=(sy*W+sx)*4,di=(dy*W+dx)*4;for(let q=0;q<4;q++)d[di+q]=sd[si+q]};
  const C=(xx,yy)=>yy>=0&&yy<H&&sd[(yy*W+xx)*4+3]?cls[yy*W+xx]:-1,S0=(L,o,r1,xx,y)=>{let sy=y-o;if(sy>=r1&&sy<r1-o)sy=r1-1;const c=C(xx,sy);return(c===L||(L===1&&c===3))?sy:-1};
  for(let y=0;y<H;y++)for(let xx=0;xx<W;xx++){let sy=S0(2,dH,head,xx,y);if(sy<0)sy=S0(1,dT,waist,xx,y);if(sy<0&&C(xx,y)===0)sy=y;if(sy>=0)put(xx,sy,xx,y)}
  const c2=new ImageData(W,H);c2.data.set(d);
  if((t%3)<.14)eyes.forEach(([ex,ey])=>{const di=((ey+dH)*W+ex)*4;if(ey+dH>=0){c2.data[di]=0x4e;c2.data[di+1]=0x6a;c2.data[di+2]=0x3a}});
  const tmp=document.createElement('canvas');tmp.width=W;tmp.height=H;tmp.getContext('2d').putImageData(c2,0,0);x.drawImage(tmp,((W+PAD*2)+PAD)*S+30,PAD*S,W*S,H*S);
  out.push(c.toDataURL())}
 return out});
fs.rmSync('/tmp/claude-0/ser/pxa',{recursive:true,force:true});fs.mkdirSync('/tmp/claude-0/ser/pxa',{recursive:true});frames.forEach((d,i)=>fs.writeFileSync('/tmp/claude-0/ser/pxa/f'+String(i).padStart(3,'0')+'.png',Buffer.from(d.split(',')[1],'base64')));await b.close()})();
