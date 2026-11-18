// ===== Ver4.63 密林の遺跡の曲：j2 ザコ・エリート（イ短調・96BPM・32小節）／j2x ボス（ニ短調・132BPM・32小節） =====
// 音色：木琴 jMar（木の打鍵）、丸太の太鼓 jLog、手で叩く太鼓 jDrum（低い胴と高い打面）、振り鳴らし jShk、木の笛は aFlute、合唱は hOoh、ボスは大太鼓 oBD・ティンパニ aTimp・金管 aBrass
function jNz(out,t,d,v,ty,f,q){const s=AC.createBufferSource(),fl=AC.createBiquadFilter(),g=AC.createGain();s.buffer=nbuf();fl.type=ty;fl.frequency.value=f;fl.Q.value=q||1;aEnv(g,t,v,.002,d);s.connect(fl);fl.connect(g);g.connect(out);s.start(t,Math.random()*1.5);s.stop(t+d+.05)}
function jMar(m,t,v){const out=amBus(),f=mf(m);[[1,1,.55],[3.9,.18,.12],[9.2,.05,.05]].forEach(([r,a,d])=>{const o=AC.createOscillator(),g=AC.createGain();o.type='sine';o.frequency.value=f*r;aEnv(g,t,v*a,.003,d);o.connect(g);g.connect(out);o.start(t);o.stop(t+d+.05)});jNz(out,t,.02,v*.25,'bandpass',f*4,2)}
function jLog(m,t,v){const out=amBus(),o=AC.createOscillator(),g=AC.createGain();o.type='sine';o.frequency.setValueAtTime(mf(m)*1.08,t);o.frequency.exponentialRampToValueAtTime(mf(m),t+.04);aEnv(g,t,v,.003,.32);o.connect(g);g.connect(out);o.start(t);o.stop(t+.36);jNz(out,t,.03,v*.3,'bandpass',mf(m)*3,3)}
function jDrum(t,v,f,sl){const out=amBus(),o=AC.createOscillator(),g=AC.createGain();o.type='sine';o.frequency.setValueAtTime(f*1.6,t);o.frequency.exponentialRampToValueAtTime(f,t+.05);aEnv(g,t,v,.002,sl?.12:.32);o.connect(g);g.connect(out);o.start(t);o.stop(t+.36);if(sl)jNz(out,t,.07,v*.7,'bandpass',1800,1.2);else jNz(out,t,.04,v*.25,'lowpass',600,1)}
function jShk(t,v){jNz(amBus(),t,.05,v,'highpass',6000,.7)}
const JGC=[[57,60,64],[60,64,67],[55,59,62],[57,60,64],[53,57,60],[55,59,62],[52,55,59],[57,60,64]];
const JGM=[[69,0,72,0,74,72,69,0],[67,0,0,69,72,0,74,0],[76,0,74,72,74,0,0,0],[72,0,69,67,69,0,0,0],[69,0,72,74,76,0,79,76],[74,0,72,0,74,76,0,0],[76,0,79,76,74,72,74,0],[69,0,0,0,0,0,0,0]];
const JGL=[0,0,7,0,12,0,7,10,0,0,7,0,12,10,7,5];
let J2B=null;function j2Step(n,t){const b0=BG,a0=AMB;if(!J2B||J2B.ctx!==AC||J2B.bg!==b0){const g=AC.createGain();g.gain.value=1.3;g.connect(b0);J2B={ctx:AC,bg:b0,g,amb:null}}BG=J2B.g;AMB=J2B.amb;try{j2S(n,t)}finally{J2B.amb=AMB;BG=b0;AMB=a0}}
function j2S(n,t){const i=n%512,bar=i>>4,s=i&15,sec=bar>>3,ch=JGC[bar%8],r=ch[0]-12,D=bsp*16;
 // 合唱の持続音（小節の頭）
 if(s===0)hOoh(ch.map(x=>x),t,D*.98,sec===0?.022:.028);
 // 太鼓：低い胴は 0・6・10、高い打面は 4・12、終盤は16分の刻みを足す
 if(s===0||s===6||s===10)jDrum(t,.16,s===0?70:82);if(s===4||s===12)jDrum(t,.09,180,1);if(sec===3&&(s===14||s===15))jDrum(t,.06,200,1);
 if(s%2===0)jShk(t,s%4===0?.035:.02);else if(sec>=2)jShk(t,.012);
 // 丸太の太鼓の音型
 if(JGL[s]!==undefined&&(s%2===0||sec>=1)&&!(s===1||s===3))jLog(r+JGL[s],t,.1);
 // 木琴：2番目の区切りから8分の分散和音、4番目は16分
 if(sec>=1&&(s%2===0||sec===3)){const a=[ch[0],ch[1],ch[2],ch[0]+12,ch[2],ch[1]];jMar(a[(s>>(sec===3?0:1))%a.length]+12,t,.07)}
 // 木の笛の旋律（3番目から）
 if(sec>=2&&s%2===0){const m=JGM[bar%8][s>>1];if(m)aFlute(m+(sec===3?12:0),t,bsp*(JGM[bar%8][(s>>1)+1]===0?3.6:1.8),.06)}}
// ボス：ニ短調・132BPM。大太鼓の部族の刻み・ティンパニ・金管の主題・速い木琴・合唱
const JXC=[[50,53,57],[48,52,55],[46,50,53],[45,49,52],[50,53,57],[53,57,60],[48,52,55],[45,49,52]];
const JXM=[[74,0,74,72,74,0,77,0],[76,0,74,0,72,0,69,0],[70,0,72,74,72,70,69,0],[69,0,0,0,73,0,76,0],[74,0,77,0,81,0,79,77],[81,0,79,77,76,0,77,0],[79,0,76,74,72,0,76,0],[74,0,0,0,0,0,73,0]];
let JXB=null;function j2xStep(n,t){const b0=BG,a0=AMB;if(!JXB||JXB.ctx!==AC||JXB.bg!==b0){const g=AC.createGain();g.gain.value=.95;g.connect(b0);JXB={ctx:AC,bg:b0,g,amb:null}}BG=JXB.g;AMB=JXB.amb;try{j2xS(n,t)}finally{JXB.amb=AMB;BG=b0;AMB=a0}}
function j2xS(n,t){const i=n%512,bar=i>>4,s=i&15,sec=bar>>3,ch=JXC[bar%8],r=ch[0]-12,D=bsp*16;
 if(s===0){hOoh(ch,t,D*.98,.03);aTimp(r,t,.2)}if(s===8&&sec>=1)aTimp(r+7,t,.12);
 if(s===0||s===3||s===8||s===11)oBD(t,s===0?.32:.22);if(s===6||s===14)jDrum(t,.12,110);if(s===4||s===12)jDrum(t,.12,200,1);if(sec>=2&&s%2===1)jDrum(t,.04,240,1);jShk(t,s%4===0?.04:.018);
 {const a=[ch[0],ch[2],ch[1]+12,ch[2],ch[0]+12,ch[2],ch[1],ch[2]];jMar(a[s%8]+12,t,s%4===0?.08:.05)}
 if(s%4===0)jLog(r+(s===8?7:0),t,.12);
 // 金管の短い強打（1番目の区切り）→ 主題（2番目から）。笛が重なる
 if(sec===0&&(s===0||s===10))aBrass(ch[0],t,bsp*2,.07);
 if(sec>=1&&s%2===0){const m=JXM[bar%8][s>>1];if(m){const d=bsp*(JXM[bar%8][(s>>1)+1]===0?3.6:1.8);aBrass(m-12,t,d,.06);if(sec>=2)aFlute(m,t,d,.045)}}}
