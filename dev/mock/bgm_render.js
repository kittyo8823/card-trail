// node rend.js 曲の関数名 1歩の秒数 歩数 出力.mp3
const {chromium}=require('playwright'),path=require('path'),fs=require('fs'),{execSync}=require('child_process');
const [fn,sp,steps,out]=process.argv.slice(2);
(async()=>{const b=await chromium.launch();const p=await b.newPage();const er=[];p.on('pageerror',e=>er.push(e.message));await p.goto('file://'+path.resolve('dev/index.html'));await p.waitForTimeout(500);
const code=fs.readFileSync('dev/mock/heaven_bgm.js','utf8');
const d=await p.evaluate(async([code,fn,sp,steps])=>{(0,eval)(code);const SR=32000,dur=sp*steps+6,ctx=new OfflineAudioContext(2,Math.ceil(SR*dur),SR);AC=ctx;BG=ctx.createGain();BG.gain.value=1;BG.connect(ctx.destination);AMB=null;NB=null;bsp=sp;
 const f=window[fn];for(let n=0;n<steps;n++)f(n,.1+n*sp);const buf=await ctx.startRendering();const L=buf.getChannelData(0),R=buf.getChannelData(1);let mx=0;for(let i=0;i<L.length;i++)mx=Math.max(mx,Math.abs(L[i]),Math.abs(R[i]));
 const n=L.length,ab=new ArrayBuffer(44+n*4),dv=new DataView(ab),ws=(o,s)=>{for(let i=0;i<s.length;i++)dv.setUint8(o+i,s.charCodeAt(i))};ws(0,'RIFF');dv.setUint32(4,36+n*4,true);ws(8,'WAVEfmt ');dv.setUint32(16,16,true);dv.setUint16(20,1,true);dv.setUint16(22,2,true);dv.setUint32(24,SR,true);dv.setUint32(28,SR*4,true);dv.setUint16(32,4,true);dv.setUint16(34,16,true);ws(36,'data');dv.setUint32(40,n*4,true);
 for(let i=0;i<n;i++){dv.setInt16(44+i*4,Math.max(-1,Math.min(1,L[i]))*32767,true);dv.setInt16(46+i*4,Math.max(-1,Math.min(1,R[i]))*32767,true)}
 let s='';const u=new Uint8Array(ab);for(let i=0;i<u.length;i+=32768)s+=String.fromCharCode.apply(null,u.subarray(i,i+32768));return [btoa(s),mx]},[code,fn,+sp,+steps]);
fs.writeFileSync(out+'.wav',Buffer.from(d[0],'base64'));console.log('peak',d[1],er);
execSync(`ffmpeg -y -loglevel error -i ${out}.wav -b:a 128k ${out}`);await b.close()})();
