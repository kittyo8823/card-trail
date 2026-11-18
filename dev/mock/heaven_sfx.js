// ===== Ver4.59 効果音の作り直し（ユーザー指定：光の弾・光線の音がチュンチュン・ぴゅんぴゅんで安っぽい／必殺の溜めの音が全員同じ） =====
// 部品：nsw 音の高さが動く帯域ノイズ（風切り・うねり）／swl だんだん大きくなる音のふくらみ／shm 倍音のずれた金属・鐘の響き（音程は動かさない）／thp 低い衝撃／amN 揺れながら鳴るノイズ（羽ばたき・震え）
let NBF=null;const nbuf=()=>{if(NBF&&NBF.ctx===AC)return NBF.b;const L=AC.sampleRate*2,b=AC.createBuffer(1,L,AC.sampleRate),a=b.getChannelData(0);for(let i=0;i<L;i++)a[i]=Math.random()*2-1;NBF={ctx:AC,b};return b};
function nsw(d,v,f0,f1,q,dl,ty,at){const t=AC.currentTime+(dl||0),s=AC.createBufferSource(),f=AC.createBiquadFilter(),g=AC.createGain();s.buffer=nbuf();s.loop=true;f.type=ty||'bandpass';f.Q.value=q||1;f.frequency.setValueAtTime(f0,t);f.frequency.exponentialRampToValueAtTime(f1,t+d);g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(v,t+(at||.01));g.gain.exponentialRampToValueAtTime(.0001,t+d);s.connect(f);f.connect(g);g.connect(MG);s.start(t);s.stop(t+d+.05)}
function swl(d,v,f0,f1,q,dl,ty){const t=AC.currentTime+(dl||0),s=AC.createBufferSource(),f=AC.createBiquadFilter(),g=AC.createGain();s.buffer=nbuf();s.loop=true;f.type=ty||'lowpass';f.Q.value=q||1;f.frequency.setValueAtTime(f0,t);f.frequency.exponentialRampToValueAtTime(f1,t+d);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+d*.92);g.gain.linearRampToValueAtTime(.0001,t+d+.08);s.connect(f);f.connect(g);g.connect(MG);s.start(t);s.stop(t+d+.1)}
function shm(fs,d,v,dl,sw){const t=AC.currentTime+(dl||0);fs.forEach((f,k)=>{const o=AC.createOscillator(),g=AC.createGain();o.type='sine';o.frequency.value=f;g.gain.setValueAtTime(.0001,t);if(sw){g.gain.exponentialRampToValueAtTime(v/(k+1),t+d*.9);g.gain.linearRampToValueAtTime(.0001,t+d)}else{g.gain.linearRampToValueAtTime(v/(k+1),t+.004);g.gain.exponentialRampToValueAtTime(.0001,t+d/(1+k*.3))}o.connect(g);g.connect(MG);o.start(t);o.stop(t+d+.05)})}
function thp(f0,f1,d,v,dl){const t=AC.currentTime+(dl||0),o=AC.createOscillator(),g=AC.createGain();o.type='sine';o.frequency.setValueAtTime(f0,t);o.frequency.exponentialRampToValueAtTime(f1,t+d*.6);g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(v,t+.008);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(MG);o.start(t);o.stop(t+d+.05)}
function amN(d,v,fc,rate,dl,q,sw){const t=AC.currentTime+(dl||0),s=AC.createBufferSource(),f=AC.createBiquadFilter(),g=AC.createGain(),m=AC.createGain(),l=AC.createOscillator(),lg=AC.createGain();s.buffer=nbuf();s.loop=true;f.type='bandpass';f.frequency.value=fc;f.Q.value=q||1.2;l.frequency.value=rate;lg.gain.value=.5;l.connect(lg);lg.connect(m.gain);m.gain.value=.5;g.gain.setValueAtTime(.0001,t);if(sw)g.gain.exponentialRampToValueAtTime(v,t+d*.9);else g.gain.linearRampToValueAtTime(v,t+.05);g.gain.linearRampToValueAtTime(.0001,t+d);s.connect(f);f.connect(m);m.connect(g);g.connect(MG);s.start(t);s.stop(t+d+.05);l.start(t);l.stop(t+d+.05)}
function drn(fs,d,v,dl,lp,ty){const t=AC.currentTime+(dl||0),f=AC.createBiquadFilter(),g=AC.createGain();f.type='lowpass';f.frequency.setValueAtTime(lp[0],t);f.frequency.exponentialRampToValueAtTime(lp[1],t+d);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+d*.9);g.gain.linearRampToValueAtTime(.0001,t+d+.08);f.connect(g);g.connect(MG);for(const fr of fs)for(const dt of[-7,7]){const o=AC.createOscillator();o.type=ty||'sawtooth';o.frequency.value=fr;o.detune.value=dt;o.connect(f);o.start(t);o.stop(t+d+.1)}}
// 敵ごとの必殺・強攻撃の溜めの音（約1.2秒）
const CHGT={dragon:'fire',hound:'fire',king:'quake',colony:'quake',behemoth:'quake',gateS:'quake',golem:'quake',mothP:'wing',hgrif:'wing',maiden:'water',userp:'water',udrown:'water',ugeel:'water',phrog:'water',ulight:'bell',scales:'bell',hser:'bell',reaper:'metal',gateP:'metal',archdemon:'dark',archdemon2:'dark',necro:'dark',spek:'dark',lanA:'dark',lanB:'dark',lanC:'dark',auA2:'dark',gilL:'mech',gilR:'mech',deus:'mech',protoA:'mech',protoB:'mech',protoC:'mech',magik:'mech',colossus:'mech',oracle:'mech',mowl:'mech',chronos:'clock',eye:'heart',eye2:'heart',auA1:'heart',auA3:'heart',hface:'holy',hshld:'holy',judge:'holy',hbloom:'petal',hgiant:'abyss',nob:'beast',oni:'beast'};
function chgSfx(e){if(!AC||muted||QT)return;const ty=CHGT[e.k]||(e.el===2?'dark':'beast'),D=1.2;
 if(ty==='fire'){swl(D,.32,250,2600,.8);swl(D,.2,90,400,1);drn([55],D,.06,0,[150,600])}
 else if(ty==='quake'){drn([41,41.6],D,.12,0,[90,220],'triangle');swl(D,.35,80,320,1);for(let k=0;k<8;k++)nsw(.06,.12+k*.02,2400,1800,3,k*.13+.1)}
 else if(ty==='wing'){amN(D,.28,1100,14,0,1.5,1);amN(D,.16,2600,19,.1,2,1);swl(D,.12,600,3000,2,0,'bandpass')}
 else if(ty==='water'){swl(D,.3,300,1600,.7);amN(D,.16,700,6,0,2,1);nsw(.5,.1,4000,1500,2,.75)}
 else if(ty==='bell'){shm([220,220*2.76,220*5.4,440*1.19],D,.08,0,1);swl(D,.12,1500,6000,1,0,'highpass');shm([330,330*2.76],1.6,.09,D-.05)}
 else if(ty==='metal'){shm([780,780*1.41,780*2.17,780*3.1],D,.05,0,1);nsw(D,.18,600,5200,4,0,'bandpass',D*.8)}
 else if(ty==='dark'){drn([55,58.3,82.4],D,.07,0,[120,900]);swl(D,.14,300,1200,3,0,'bandpass');amN(D,.08,400,3,0,1,1)}
 else if(ty==='mech'){drn([65],D,.06,0,[200,2600],'square');for(let k=0;k<12;k++)nsw(.03,.18,3200,2600,4,D*(1-Math.pow(1-k/12,1.6))*.95);swl(D,.12,400,3200,6,0,'bandpass')}
 else if(ty==='clock'){for(let k=0;k<14;k++)nsw(.025,.22,4200,3600,6,D*(1-Math.pow(1-k/14,1.8))*.95);shm([110,110*2.76],D,.06,0,1);shm([523,523*2.76,523*5.4],2,.07,D)}
 else if(ty==='heart'){for(let k=0;k<6;k++){const dl=D*(1-Math.pow(1-k/6,1.5));thp(70,40,.25,.35+k*.06,dl);thp(60,36,.22,.25+k*.05,dl+.16)}drn([46,48.7],D,.06,0,[100,400])}
 else if(ty==='holy'){drn([440,554,659,880],D,.012,0,[500,3000]);swl(D,.1,2000,9000,1,0,'highpass');shm([880,1320*1.004,1760],D,.03,0,1)}
 else if(ty==='petal'){amN(D,.2,1800,4,0,.8,1);nsw(D,.16,800,5000,1.5,0,'bandpass',D*.8);for(let k=0;k<6;k++)shm([1567*(1+k*.12),2349*(1+k*.1)],.6,.03,k*.18)}
 else if(ty==='abyss'){drn([36.7,38.9,55],D,.1,0,[80,500]);swl(D,.3,60,500,1);amN(D,.12,300,7,0,2,1);nsw(D,.1,200,1400,6,0,'bandpass',D*.8)}
 else{drn([73,77],D,.08,0,[150,800]);swl(D,.2,200,900,1.5,0,'bandpass');amN(D,.1,500,24,0,1,1)}}
// 敵の飛び道具・光線の当たる音（音程を動かす純音をやめ、ノイズのうねり・金属の響き・低い衝撃で）
function eFxS(k){const n=AC.currentTime;
 if(k==='emagic'){thp(130,55,.35,.32);nsw(.32,.3,3600,500,3,0,'bandpass');for(let i=0;i<6;i++)nsw(.05,.08,7000,6000,4,.03+i*.03);shm([660,990*1.01],.25,.03);return 1}
 if(k==='ebeam'){thp(90,45,.4,.3);amN(.36,.28,1800,40,0,6);nsw(.4,.16,5200,900,2,0,'bandpass');swl(.12,.18,600,4000,1,0,'lowpass');return 1}
 if(k==='eholy'){thp(110,60,.32,.22);nsw(.3,.24,7000,2500,2.5,0,'bandpass');shm([1320,1987,2970,3720],.7,.045);return 1}
 if(k==='eice'){nsw(.08,.3,8000,5000,2,0,'highpass');for(let i=0;i<7;i++)nsw(.04,.12,5000+((i*1700)%4000),4000,8,.02+i*.025);shm([2093*1.02,2794,3520*1.01],.4,.03,.02);thp(160,90,.2,.15);return 1}
 if(k==='eshadow'){thp(70,32,.5,.3);nsw(.45,.26,1400,220,3,0,'bandpass');amN(.4,.08,300,9,0,1);return 1}
 if(k==='ecurse'){thp(60,30,.55,.28);nsw(.5,.2,900,200,4,0,'bandpass');shm([233,247*1.01],.6,.04);return 1}
 if(k==='ebolt'){nsw(.08,.5,6000,3000,1,0,'highpass');amN(.35,.3,2200,60,.02,1.5);thp(80,38,.4,.35,.01);return 1}
 return 0}
