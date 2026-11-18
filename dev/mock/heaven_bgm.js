// ===== 天上の聖堂の曲（Ver4.52 ユーザー指定） =====
// h3：通常・エリート。不気味さと神聖さの両立、荘厳な鐘。ニ短調、72BPM・16分＝1歩、24小節で1周。
//   深い教会の鐘（うなりのある倍音）、低い合唱とオルガンの持続音、音程のずれたオルゴールの分散和音、少年の独唱のような旋律、息のさざめき、遠いティンパニ
// h3x：ボス。神聖なワルツ（3拍子・138BPM・8分＝1歩、32小節で1周）。ホ短調→最後はホ長調。パイプオルガンと大合唱、金管の主題、チェンバロの刻み、
//   鐘の連打（転調鐘）、ティンパニ・シンバル、弦のトレモロ。今までの曲にない「荘厳で豪華な舞踏」
const HB={};
// 大鐘：うなりのある教会の鐘の倍音（ハム・プライム・短3度・5度・ノミナル…）。長く鳴る
function hBigBell(m,t,v){const out=amBus(),f=mf(m);[[.5,.7,9],[1,1,7],[1.19,.55,5],[1.5,.35,4],[2,.5,4],[2.51,.22,3],[3.01,.18,2.4],[4.07,.1,1.6]].forEach(([r,a,d],k)=>{for(const dt of[-1.5,1.5]){const o=AC.createOscillator(),g=AC.createGain();o.type='sine';o.frequency.value=f*r*(1+dt/1200);g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(v*a/2,t+.004);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(out);o.start(t);o.stop(t+d+.05)}});mnoise(.06,v*.5,2400,t)}
// 小さな鐘（明るい鐘の連打用）
function hBell(m,t,v){const out=amBus(),f=mf(m);[[1,1,2.2],[2,.4,1.4],[2.76,.3,1.2],[5.4,.12,.6]].forEach(([r,a,d])=>{const o=AC.createOscillator(),g=AC.createGain();o.type='sine';o.frequency.value=f*r;aEnv(g,t,v*a,.003,d);o.connect(g);g.connect(out);o.start(t);o.stop(t+d+.05)})}
// オルゴール（少し音程をずらして不気味に）＋こだま
function hBox(m,t,v,dt){const out=amBus(),f=mf(m)*(1+(dt||0)/1200);for(const[dl,a]of[[0,1],[.42,.35],[.84,.14]]){[[1,1,1.4],[3,.18,.5],[4.2,.08,.3]].forEach(([r,aa,d])=>{const o=AC.createOscillator(),g=AC.createGain();o.type='sine';o.frequency.value=f*r;aEnv(g,t+dl,v*a*aa,.002,d);o.connect(g);g.connect(out);o.start(t+dl);o.stop(t+dl+d+.05)})}}
// 少年の独唱のような声（ア の母音・ゆっくりしたビブラート）
function hVox(m,t,d,v){const out=amBus(),g=AC.createGain(),f1=AC.createBiquadFilter(),f2=AC.createBiquadFilter(),mx=AC.createGain(),o=AC.createOscillator(),lf=AC.createOscillator(),lg=AC.createGain();
 o.type='sawtooth';o.frequency.value=mf(m);lf.frequency.value=5.2;lg.gain.setValueAtTime(0,t);lg.gain.linearRampToValueAtTime(mf(m)*.012,t+Math.min(.6,d*.5));lf.connect(lg);lg.connect(o.frequency);
 f1.type=f2.type='bandpass';f1.frequency.value=820;f2.frequency.value=1250;f1.Q.value=f2.Q.value=6;mx.gain.value=3;o.connect(f1);o.connect(f2);f1.connect(mx);f2.connect(mx);mx.connect(g);
 g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(v,t+Math.min(.25,d*.3));g.gain.setValueAtTime(v,t+d*.8);g.gain.linearRampToValueAtTime(.0001,t+d+.2);g.connect(out);o.start(t);o.stop(t+d+.3);lf.start(t);lf.stop(t+d+.3)}
// 息のさざめき（ささやく合唱）
function hBreath(t,d,v){if(!NB||NB.ctx!==AC)mnoise(.01,0,1000,t);const s=AC.createBufferSource(),f=AC.createBiquadFilter(),g=AC.createGain(),out=amBus();s.buffer=NB.b;s.loop=true;f.type='bandpass';f.frequency.value=1600;f.Q.value=1.5;g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(v,t+d*.5);g.gain.linearRampToValueAtTime(.0001,t+d);s.connect(f);f.connect(g);g.connect(out);s.start(t);s.stop(t+d+.05)}
// シンバルのふくらみ
function hCym(t,d,v){if(!NB||NB.ctx!==AC)mnoise(.01,0,1000,t);const s=AC.createBufferSource(),f=AC.createBiquadFilter(),g=AC.createGain(),out=amBus();s.buffer=NB.b;s.loop=true;f.type='highpass';f.frequency.value=5000;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+d);g.gain.exponentialRampToValueAtTime(.0001,t+d+1.6);s.connect(f);f.connect(g);g.connect(out);s.start(t);s.stop(t+d+1.7)}

// ---- h3（通常・エリート）Ver4.55：ボス曲（ユーザーが用意した録音）の雰囲気に合わせて作り直し。ト短調（ラ♭が混じる不気味な響き）・80BPM・24小節。
// 新しい音色：撥弦のハープ（カルプラス・ストロング）`hHarp`、チェレスタ（FM）`hCel`、厚い合唱（4声のずれ＋3つの母音の響き）`hOoh`、儀式の大太鼓 `hTaiko`、弦の刻み `hBow`
const HKS={};
function hHarp(m,t,v){const out=amBus(),k=AC.sampleRate+'_'+m;if(!HKS[k]||HKS[k].ctx!==AC){const sr=AC.sampleRate,N=Math.round(sr/mf(m)),L=Math.floor(sr*2.2),b=AC.createBuffer(1,L,sr),d=b.getChannelData(0),buf=new Float32Array(N);for(let i=0;i<N;i++)buf[i]=Math.random()*2-1;let p=0;for(let i=0;i<L;i++){const a=buf[p],q=buf[(p+1)%N];d[i]=a;buf[p]=(a+q)*.4985;p=(p+1)%N}HKS[k]={ctx:AC,b}}
 const s=AC.createBufferSource(),f=AC.createBiquadFilter(),g=AC.createGain();s.buffer=HKS[k].b;f.type='lowpass';f.frequency.value=3200;g.gain.value=v;s.connect(f);f.connect(g);g.connect(out);s.start(t)}
function hCel(m,t,v){const out=amBus(),o=AC.createOscillator(),md=AC.createOscillator(),mg=AC.createGain(),g=AC.createGain();o.type='sine';o.frequency.value=mf(m);md.type='sine';md.frequency.value=mf(m)*3.5;mg.gain.setValueAtTime(mf(m)*2.2,t);mg.gain.exponentialRampToValueAtTime(1,t+.6);md.connect(mg);mg.connect(o.frequency);aEnv(g,t,v,.003,1.8);o.connect(g);g.connect(out);o.start(t);o.stop(t+1.9);md.start(t);md.stop(t+1.9)}
function hOoh(ns,t,d,v){const out=amBus(),g=AC.createGain(),mx=AC.createGain();g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(v,t+Math.min(.8,d*.4));g.gain.setValueAtTime(v,t+d*.8);g.gain.linearRampToValueAtTime(.0001,t+d+.8);mx.gain.value=2.2;mx.connect(g);g.connect(out);
 const fs=[[400,5],[800,6],[2600,8]].map(([fr,q])=>{const f=AC.createBiquadFilter();f.type='bandpass';f.frequency.value=fr;f.Q.value=q;f.connect(mx);return f});
 for(const n of ns)for(const dt of[-11,-4,4,11]){const o=AC.createOscillator(),lf=AC.createOscillator(),lg=AC.createGain();o.type='sawtooth';o.frequency.value=mf(n);o.detune.value=dt;lf.frequency.value=4.6+dt*.03;lg.gain.value=mf(n)*.006;lf.connect(lg);lg.connect(o.frequency);for(const f of fs)o.connect(f);o.start(t);o.stop(t+d+.9);lf.start(t);lf.stop(t+d+.9)}}
function hTaiko(t,v,lo){const out=amBus(),o=AC.createOscillator(),g=AC.createGain();o.type='sine';o.frequency.setValueAtTime(lo?70:110,t);o.frequency.exponentialRampToValueAtTime(lo?38:60,t+.35);g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(v,t+.01);g.gain.exponentialRampToValueAtTime(.0001,t+(lo?1.1:.6));o.connect(g);g.connect(out);o.start(t);o.stop(t+1.2);mnoise(.12,v*.5,lo?160:300,t)}
function hBow(m,t,d,v){const out=amBus(),f=AC.createBiquadFilter(),g=AC.createGain();f.type='lowpass';f.Q.value=1;f.frequency.setValueAtTime(600,t);f.frequency.linearRampToValueAtTime(1800,t+.04);f.frequency.exponentialRampToValueAtTime(700,t+d);g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(v,t+.02);g.gain.exponentialRampToValueAtTime(.0001,t+d+.05);f.connect(g);g.connect(out);for(const dt of[-7,7]){const o=AC.createOscillator();o.type='sawtooth';o.frequency.value=mf(m);o.detune.value=dt;o.connect(f);o.start(t);o.stop(t+d+.1)}}
const H3R=[43,39,48,50,43,44,41,50, 39,46,44,43,48,44,50,50, 43,39,48,50,43,44,50,43];
const H3C={43:[55,58,62],39:[55,58,63],48:[55,60,63],50:[54,57,62],44:[56,60,63],41:[57,60,65],46:[58,62,65]};
// チェレスタの旋律（9〜16小節）と独唱の旋律（17〜24小節）：[小節,歩,音,長さ]
const H3M=[[8,0,74,4],[8,4,75,4],[8,8,74,8],[9,0,70,8],[9,8,72,4],[9,12,74,4],[10,0,75,6],[10,6,74,2],[10,8,72,4],[10,12,70,4],[11,0,69,8],[11,8,66,8],[12,0,67,6],[12,6,69,2],[12,8,70,8],[13,0,68,8],[13,8,72,8],[14,0,74,8],[14,8,75,4],[14,12,74,4],[15,0,74,16]];
const H3V=[[16,0,67,8],[16,8,70,8],[17,0,75,12],[17,12,74,4],[18,0,72,8],[18,8,75,4],[18,12,74,4],[19,0,74,16],[20,0,67,8],[20,8,69,4],[20,12,70,4],[21,0,72,8],[21,8,68,8],[22,0,67,8],[22,8,66,8],[23,0,67,16]];
function h3Step(n,t){const i=n%384,bar=i>>4,s=i&15,r=H3R[bar],ch=H3C[r]||H3C[43],D=bsp*16,sec=bar<8?0:bar<16?1:2,lp=Math.floor(n/384);
 // 大鐘（最初は2小節ごと、中盤からは毎小節）
 if(s===0&&(bar%2===0||sec>0))hBigBell(r-12,t,sec===0?.08:.1);
 // 合唱と低い持続音
 if(s===0){hOoh(sec===2?ch.concat([ch[0]+12]):ch,t,D,sec===0?.012:.018);aOrgan([r-12],t,D,.03)}
 // ハープの16分の分散和音（上がって下がる）
 {const A=[ch[0],ch[1],ch[2],ch[0]+12,ch[1]+12,ch[2]+12,ch[0]+24,ch[2]+12];const k=s<8?s:15-s;if(sec!==1||s%2===0)hHarp(A[k%8]+(sec===2?12:0),t,sec===1?.09:.12)}
 // 中盤からの弦の刻み（8分）と儀式の大太鼓
 if(sec>0&&!(s&1)){const B=[r-12,r-5,r,r-5,r-12,r-5,r+2,r-5][s>>1];hBow(B,t,bsp*1.6,.04)}
 if(sec>0){if(s===0)hTaiko(t,.22,1);if(s===8)hTaiko(t,.16,1);if(sec===2&&(s===6||s===14))hTaiko(t,.1,0);if(sec===2&&s===12&&bar%2)hTaiko(t,.12,0)}
 // 旋律
 for(const q of H3M)if(q[0]===bar&&q[1]===s){hCel(q[2],t,.07);hCel(q[2]+12,t+.01,.025)}
 for(const q of H3V)if(q[0]===bar&&q[1]===s){hVox(q[2],t,bsp*q[3],.05);hCel(q[2]+12,t,.03)}
 // 区切り：シンバルのふくらみ・小さな鐘の下降
 if(bar%8===7&&s===8)hCym(t,bsp*8,.05);if(s===12&&bar%4===3)for(let k=0;k<5;k++)hBell(ch[2]+24-k*2,t+k*bsp*.6,.025);
 if(s===0&&bar%4===1)hBreath(t,D*2,.015)}

// ---- h3x（ボス）：神聖なワルツ ----
const H3XR=[52,48,45,47,52,55,50,47,48,50,47,52,45,47,52,52, 52,48,45,47,52,55,50,47,48,50,47,52,45,47,52,52];
const H3XC={52:[64,67,71],48:[60,64,67],45:[57,60,64],47:[59,63,66],55:[55,59,62],50:[62,66,69]};
// 主題（小節,歩(0-5),音,長さ）：金管（前半）／合唱（後半は1オクターブ上を声で）
const H3XM=[[0,0,76,3],[0,3,79,2],[0,5,78,1],[1,0,76,4],[1,4,72,2],[2,0,72,3],[2,3,76,2],[2,5,74,1],[3,0,71,6],[4,0,76,3],[4,3,79,2],[4,5,83,1],[5,0,83,4],[5,4,81,2],[6,0,78,3],[6,3,81,2],[6,5,79,1],[7,0,78,6],
 [8,0,79,2],[8,2,77,2],[8,4,76,2],[9,0,78,3],[9,3,74,3],[10,0,75,2],[10,2,78,2],[10,4,81,2],[11,0,83,6],[12,0,84,3],[12,3,81,3],[13,0,78,3],[13,3,75,3],[14,0,76,6],[15,0,80,6]];
// ボス曲は音が厚いので、専用の小さな出口（音量0.55）を通す
let HXB=null;function h3xStep(n,t){const b0=BG,a0=AMB;if(!HXB||HXB.ctx!==AC||HXB.bg!==b0){const g=AC.createGain();g.gain.value=.55;g.connect(b0);HXB={ctx:AC,bg:b0,g,amb:null}}BG=HXB.g;AMB=HXB.amb;try{h3xS(n,t)}finally{HXB.amb=AMB;BG=b0;AMB=a0}}
function h3xS(n,t){const i=n%192,bar=Math.floor(i/6),s=i%6,lp=Math.floor(n/192),r=H3XR[bar],ch=bar===15||bar===31?[64,68,71]:H3XC[r],B2=bar>=16,b16=bar%16,D=bsp*6;
 // ワルツの伴奏：1拍目に低音（オルガンの足鍵盤＋ピチカート）、2・3拍目に和音（チェンバロと弦の刻み）
 if(s===0){aOrgan([r-24,r-12],t,D*.95,.05);uNote(r-12,t,bsp*1.6,'triangle',.12,700,0,.005);aTimp(r-24,t,b16%4===0?.13:.08)}
 if(s===2||s===4){for(const m of ch)aHarpsi(m,t,.035);aStr(ch.map(m=>m-12),t,bsp*1.4,.03)}
 if(s&1&&B2)for(const m of ch)uNote(m+12,t,bsp*.45,'sawtooth',.008,2400,0,.005);
 // 大合唱とオルガンの和音（後半はさらに厚く）
 if(s===0){aChoir(ch,t,D,B2?.035:.022);aOrgan(ch,t,D,B2?.035:.022);if(B2)aStrO([ch[0]+12,ch[2]+12],t,D,.025)}
 // 主題：前半は金管、後半は合唱の声＋金管のオクターブ下
 for(const q of H3XM)if(q[0]===b16&&q[1]===s){if(!B2)aBrass(q[2],t,bsp*q[3]*.95,.07);else{hVox(q[2],t,bsp*q[3],.06);aBrass(q[2]-12,t,bsp*q[3]*.95,.06)}}
 // 鐘の連打（転調鐘：8つの鐘が下りの音階を鳴らす）。4小節ごと、後半は毎小節の頭に大鐘
 if(b16%4===3){const SC=[88,86,84,83,81,79,78,76];hBell(SC[(s*2+lp)%8],t,.05);hBell(SC[(s*2+1+lp)%8],t+bsp*.5,.04)}
 if(s===0&&(b16%4===0||B2&&b16%2===0))hBigBell(r-12,t,.09);
 // シンバルのふくらみ・ティンパニの連打で区切りを大きく
 if(b16===7&&s===3||b16===15&&s===3)hCym(t,bsp*3,.07);if((b16===7||b16===15)&&s>=3)for(let k=0;k<2;k++)aTimp(r-24,t+k*bsp*.5,.07+s*.012)}
