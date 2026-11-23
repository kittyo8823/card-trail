// 戦場（仮題）：Card Trail のキャラ・敵・曲を使った、見下ろし視点の3Dアクション・ローグライク
// 音（bgm / sfx / newAC / AC / MG / muted / setVol / VOL）は Card Trail の「音」の区切りをそのまま読み込んだ大域の関数を使う
/* global bgm sfx newAC initAudio AC MG muted setVol VOL */
import * as THREE from 'three';
import A from './assets.json';

/* ===== 基本 ===== */
const R=Math.random,RI=n=>R()*n|0,pk=a=>a[RI(a.length)],cl=(v,a,b)=>v<a?a:v>b?b:v,lerp=(a,b,t)=>a+(b-a)*t,hyp=Math.hypot;
const PPU=64;/* 絵の1単位あたりの画素数（キャラの背丈が約2） */
const SW=28,SD=20;/* 戦場の半分の幅・奥行き（x:-SW〜SW, z:-SD〜SD） */
const snd=k=>{try{if(typeof sfx==='function')sfx(k)}catch(e){}};
const music=k=>{try{if(typeof bgm==='function')bgm(k)}catch(e){}};

/* ===== 描画の準備 ===== */
const rd=new THREE.WebGLRenderer({antialias:true});rd.setPixelRatio(Math.min(2,devicePixelRatio||1));rd.shadowMap.enabled=true;rd.shadowMap.type=THREE.PCFSoftShadowMap;
rd.outputColorSpace=THREE.SRGBColorSpace;document.body.appendChild(rd.domElement);rd.domElement.id='gl';
const ui=document.createElement('canvas');ui.id='ui';document.body.appendChild(ui);const g=ui.getContext('2d');
const scene=new THREE.Scene(),cam=new THREE.PerspectiveCamera(38,1,.5,200);
const CAMO=new THREE.Vector3(0,16.5,10.5);/* 見下ろす角度（LoL 風、約57度） */
let W=1,H=1,U=1;function fit(){W=innerWidth;H=innerHeight;rd.setSize(W,H);const d=Math.min(2,devicePixelRatio||1);ui.width=W*d;ui.height=H*d;ui.style.width=W+'px';ui.style.height=H+'px';g.setTransform(d,0,0,d,0,0);cam.aspect=W/H;cam.updateProjectionMatrix();U=Math.min(W/960,H/540)}
addEventListener('resize',fit);fit();

/* ===== 絵（Card Trail の SPR を板として立てる） ===== */
const TX={};
function texOf(url,flip){const k=url.length+':'+url.slice(-40)+(flip?'f':'');if(TX[k])return TX[k];const im=new Image();const t=new THREE.Texture();im.onload=()=>{let src=im;if(flip){const c=document.createElement('canvas');c.width=im.width;c.height=im.height;const x=c.getContext('2d');x.translate(im.width,0);x.scale(-1,1);x.drawImage(im,0,0);src=c}t.image=src;t.needsUpdate=true};im.src=url;
 t.magFilter=THREE.NearestFilter;t.minFilter=THREE.NearestFilter;t.generateMipmaps=false;t.colorSpace=THREE.SRGBColorSpace;return TX[k]=t}
function billboard(url,w,h,sc){const m=new THREE.SpriteMaterial({map:texOf(url,0),transparent:true,alphaTest:.3});const s=new THREE.Sprite(m);s.center.set(.5,.02);s.scale.set(w/PPU*sc,h/PPU*sc,1);s.userData={url,w,h,sc,fl:0};return s}
function setFlip(s,f){if(s.userData.fl===f)return;s.userData.fl=f;s.material.map=texOf(s.userData.url,f);s.material.needsUpdate=true}
// 丸い光（加算）の絵
const GLOW=(()=>{const c=document.createElement('canvas');c.width=c.height=64;const x=c.getContext('2d'),gr=x.createRadialGradient(32,32,0,32,32,32);gr.addColorStop(0,'rgba(255,255,255,1)');gr.addColorStop(.35,'rgba(255,255,255,.45)');gr.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=gr;x.fillRect(0,0,64,64);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return t})();
function glowSpr(col,s,op){const m=new THREE.SpriteMaterial({map:GLOW,color:col,transparent:true,opacity:op==null?1:op,blending:THREE.AdditiveBlending,depthWrite:false});const o=new THREE.Sprite(m);o.scale.set(s,s,1);return o}
// 足元の影
const SHT=(()=>{const c=document.createElement('canvas');c.width=c.height=64;const x=c.getContext('2d'),gr=x.createRadialGradient(32,32,0,32,32,32);gr.addColorStop(0,'rgba(0,0,0,.55)');gr.addColorStop(.7,'rgba(0,0,0,.3)');gr.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=gr;x.fillRect(0,0,64,64);return new THREE.CanvasTexture(c)})();
function shadowOf(r){const m=new THREE.Mesh(new THREE.PlaneGeometry(r*2.2,r*1.3),new THREE.MeshBasicMaterial({map:SHT,transparent:true,depthWrite:false}));m.rotation.x=-Math.PI/2;m.position.y=.02;return m}
// 画像（レリックの絵）を2Dで使う
const IMG={};function img(url){if(!url)return null;if(IMG[url])return IMG[url];const i=new Image();i.src=url;return IMG[url]=i}
const RIC=k=>A.rl[k]&&img(A.rl[k].img);

/* ===== 場所（層）の見た目 ===== */
// 1層：黒い森／沈没都市、2層：地下の広間／密林の遺跡、3層：機神の神殿／天上の聖堂
const LAYERS=[['forest','sunk'],['hall','jungle'],['temple','heaven']];
const TH={
 forest:{g:['#1c2420','#222c25','#19201c'],p:['#2e2a22','#36302a'],fog:0x0b0f16,hemi:[0x8090b8,0x1a1f18,.75],sun:[0xb8c4ff,.9],tint:0xc4ccdc,tree:'dead',deco:'rock',wall:'#2a2e2c'},
 sunk:{g:['#1a2a2e','#1f3236','#16262a'],p:['#2c3a3a','#334444'],fog:0x08161c,hemi:[0x7fb8c8,0x102026,.8],sun:[0x9fd8ff,.8],tint:0xb8d4dc,tree:'coral',deco:'column',wall:'#22383a',water:1},
 hall:{g:['#2a2622','#302b26','#25211d'],p:['#3a342c','#423b32'],fog:0x0e0a08,hemi:[0xc0a080,0x1a120c,.6],sun:[0xffc890,.6],tint:0xe0d0c0,tree:'pillar',deco:'crate',wall:'#3a332c',torch:1,tile:1},
 jungle:{g:['#2b3a24','#33452a','#26341f'],p:['#5a4a32','#62513a'],fog:0x101a10,hemi:[0xc8e0b0,0x203018,.9],sun:[0xfff0c8,1.1],tint:0xffffff,tree:'jungle',deco:'ruin',wall:'#3e4a36'},
 temple:{g:['#20242c','#262b34','#1c2028'],p:['#30343e','#383d48'],fog:0x0a0c14,hemi:[0x90a8e0,0x14161e,.7],sun:[0xc0d8ff,.8],tint:0xd0d8ec,tree:'mech',deco:'crate',wall:'#2c3240',tile:1,glow:0x40e0ff},
 heaven:{g:['#c8c0ae','#d2cab8','#bdb5a3'],p:['#e0d6be','#e8dec8'],fog:0xd8d0e8,hemi:[0xfff4e0,0x9088a0,1.0],sun:[0xfff0d0,1.0],tint:0xffffff,tree:'col',deco:'cloud',wall:'#b8ae9a',tile:1,glow:0xffd88a}};

/* ===== 状態 ===== */
let MODE='title',T=0,STG=0,AREA=null,TM=null;/* TM＝今の場所の見た目 */
let P=null,EN=[],IT=[],FX=[],TXT=[],PRJ=[],TG=[],OBS=[],BOSS=null,PORTAL=null,MSG=null,KILLS=0,GOLD=0,PAUSE=0;
const world=new THREE.Group();scene.add(world);

/* ===== 武器・装備 ===== */
const WB=[{k:'sw',n:'長剣',sp:'pl_wp',atk:14,as:1.15,rg:2.3},{k:'kt',n:'刀',sp:'sm_wp',atk:11,as:1.5,rg:2.1},{k:'gs',n:'大剣',sp:'pl_wp',atk:21,as:.8,rg:2.6}];
const WFX={'':{n:'',c:'#d8d8d8'},fire:{n:'炎の',c:'#ff8a3a',t:'燃焼'},ice:{n:'氷の',c:'#8ad8ff',t:'凍結'},bolt:{n:'雷の',c:'#ffe86a',t:'雷撃'},blood:{n:'血の',c:'#e04050',t:'吸血'}};
function mkWeapon(st,star){const b=pk(WB),f=star>=2?pk(['fire','ice','bolt','blood']):R()<.3?pk(['fire','ice','bolt','blood']):'';const s=star||(R()<.12+st*.06?3:R()<.45?2:1);
 return {b:b.k,n:WFX[f].n+b.n,sp:b.sp,fx:f,star:s,lv:0,atk:Math.round(b.atk*(1+.3*(s-1))*(1+.15*(st-1))),as:b.as,rg:b.rg}}
const wAtk=w=>Math.round(w.atk*(1+.15*w.lv)),wName=w=>w.n+(w.lv?'+'+w.lv:'');
// レリック＝装備（Card Trail のレリックの絵を使う）。効果は見た目に合うものを割り当てた
const EQ={dumb:['攻撃+4',p=>p.atkB+=4],ring:['攻撃+8',p=>p.atkB+=8],boot:['移動の速さ+12%',p=>p.spdM+=.12],heart:['最大HP+60',p=>p.mhpB+=60],apple:['最大HP+40・回復+1/秒',p=>{p.mhpB+=40;p.rgn+=1}],
 fang:['与えたダメージの6%を回復',p=>p.ls+=.06],drip:['攻撃の速さ+20%',p=>p.asM+=.2],lamp:['魔力の回復+50%',p=>p.mrM+=.5],buckler:['受けるダメージ-3',p=>p.arm+=3],anchor:['受けるダメージ-2・最大HP+30',p=>{p.arm+=2;p.mhpB+=30}],
 clover:['会心+10%',p=>p.crit+=.1],torii:['技の待ち時間-15%',p=>p.cdr+=.15],ember:['攻撃で燃焼',p=>p.burn=1],pen:['10回目の攻撃は2倍',p=>p.pen=1],kensei:['会心のダメージ+50%',p=>p.critD+=.5],
 skull:['攻撃+5・会心+5%',p=>{p.atkB+=5;p.crit+=.05}],oni:['攻撃+12%',p=>p.atkM+=.12],flower:['魔力の最大+30',p=>p.mmpB+=30],tea:['回復+2/秒',p=>p.rgn+=2],kunai:['3回目の攻撃で小刀を投げる',p=>p.kunai=1]};
const EQK=Object.keys(EQ).filter(k=>A.rl[k]);

/* ===== キャラ（最初はユウキングだけ） ===== */
const CHR={pl:{hp:80,sk:[
 {k:'Q',n:'斬り払い',d:'前方を大きく斬る',ic:'stsw',mp:15,cd:3},
 {k:'W',n:'鉄壁',d:'4秒間、ダメージを防ぐ盾',ic:'buckler',mp:30,cd:11},
 {k:'E',n:'踏み込み',d:'前へ跳び、通り道の敵を斬る',ic:'boot',mp:20,cd:6},
 {k:'R',n:'大回転',d:'回転して周りの敵を何度も斬る',ic:'burn',mp:60,cd:24}]}};

function recalc(){const p=P;Object.assign(p,{atkB:0,atkM:0,spdM:0,mhpB:0,mmpB:0,rgn:.6,ls:0,asM:0,mrM:0,arm:0,crit:.05,critD:1,cdr:0,burn:0,pen:0,kunai:0});for(const k of p.eq)EQ[k][1](p);
 if(p.w.fx==='blood')p.ls+=.05;const om=p.mhp;p.mhp=p.base*4+p.mhpB;if(om&&p.mhp>om)p.hp+=p.mhp-om;p.hp=Math.min(p.hp,p.mhp);p.mmp=100+p.mmpB;p.atk=Math.round((wAtk(p.w)+p.atkB)*(1+p.atkM));p.spd=5.2*(1+p.spdM);p.as=p.w.as*(1+p.asM)}

/* ===== 戦場を作る ===== */
function pixTex(cols,n,bs){const c=document.createElement('canvas');c.width=c.height=n;const x=c.getContext('2d');x.fillStyle=cols[0];x.fillRect(0,0,n,n);for(let i=0;i<n*n/(bs*bs)*.55;i++){x.fillStyle=pk(cols);x.fillRect(RI(n/bs)*bs,RI(n/bs)*bs,bs,bs)}const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.magFilter=THREE.NearestFilter;t.colorSpace=THREE.SRGBColorSpace;return t}
function tileTex(cols){const n=128,c=document.createElement('canvas');c.width=c.height=n;const x=c.getContext('2d');x.fillStyle=cols[0];x.fillRect(0,0,n,n);for(let i=0;i<500;i++){x.fillStyle=pk(cols);x.fillRect(RI(32)*4,RI(32)*4,4,4)}x.fillStyle='rgba(0,0,0,.28)';for(let i=0;i<n;i+=32){x.fillRect(i,0,2,n);x.fillRect(0,i,n,2)}const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.magFilter=THREE.NearestFilter;t.colorSpace=THREE.SRGBColorSpace;return t}
const LM=(c,o)=>new THREE.MeshLambertMaterial(Object.assign({color:c,flatShading:true},o||{}));
function addMesh(m,x,y,z,cast){m.position.set(x,y,z);if(cast!==false){m.castShadow=true;m.receiveShadow=true}world.add(m);return m}
let LIGHTS=[];
function buildStage(){world.clear();OBS=[];LIGHTS=[];const t=TM;
 scene.fog=new THREE.Fog(t.fog,30,62);scene.background=new THREE.Color(t.fog);
 const hl=new THREE.HemisphereLight(t.hemi[0],t.hemi[1],t.hemi[2]*1.5);world.add(hl);const sun=new THREE.DirectionalLight(t.sun[0],t.sun[1]*1.5);sun.position.set(-14,30,10);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);const sc=sun.shadow.camera;sc.left=-34;sc.right=34;sc.top=26;sc.bottom=-26;sc.near=1;sc.far=80;world.add(sun,sun.target);
 // 地面（戦場の外は暗く）。道は地面の絵に直接描く（戦場の外へははみ出さない）
 const pa=R()*.6-.3,pz=(R()-.5)*SD*.6;AREA.path={a:pa,z:pz};
 const gc=document.createElement('canvas'),PX=12;gc.width=SW*2*PX;gc.height=SD*2*PX;const gx=gc.getContext('2d');gx.fillStyle=t.g[0];gx.fillRect(0,0,gc.width,gc.height);
 for(let i=0;i<gc.width*gc.height/16*.5;i++){gx.fillStyle=pk(t.g);gx.fillRect(RI(gc.width/4)*4,RI(gc.height/4)*4,4,4)}
 if(t.tile){gx.fillStyle='rgba(0,0,0,.22)';for(let i=0;i<gc.width;i+=PX*2)gx.fillRect(i,0,2,gc.height);for(let i=0;i<gc.height;i+=PX*2)gx.fillRect(0,i,gc.width,2)}
 for(let X=0;X<gc.width;X+=4)for(let Y=0;Y<gc.height;Y+=4){const d=onPath(X/PX-SW,Y/PX-SD);if(d<2.4+Math.sin(X*.05)*.3+R()*.35){gx.fillStyle=pk(t.p);gx.fillRect(X,Y,4,4)}}
 const gt=new THREE.CanvasTexture(gc);gt.magFilter=THREE.NearestFilter;gt.colorSpace=THREE.SRGBColorSpace;const gr=new THREE.Mesh(new THREE.PlaneGeometry(SW*2,SD*2),new THREE.MeshLambertMaterial({map:gt}));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;world.add(gr);
 const ot=pixTex(t.g.map(c=>shade(c,-.45)),128,4);ot.repeat.set(30,30);const og=new THREE.Mesh(new THREE.PlaneGeometry(240,240),new THREE.MeshLambertMaterial({map:ot}));og.rotation.x=-Math.PI/2;og.position.y=-.05;world.add(og);
 if(t.water)for(let i=0;i<6;i++){const w=new THREE.Mesh(new THREE.CircleGeometry(1+R()*1.6,12),new THREE.MeshLambertMaterial({color:0x2a6070,transparent:true,opacity:.55}));w.rotation.x=-Math.PI/2;w.scale.y=.6+R()*.4;w.position.set((R()-.5)*SW*1.8,.015,(R()-.5)*SD*1.8);world.add(w)}
 // 外周の壁
 const wm=LM(t.wall);for(let x=-SW;x<=SW;x+=2){for(const z of[-SD-.8,SD+.8]){const h=.6+R()*1.2;addMesh(new THREE.Mesh(new THREE.BoxGeometry(2.1,h,1.4),wm),x,h/2,z)}}
 for(let z=-SD;z<=SD;z+=2){for(const x of[-SW-.8,SW+.8]){const h=.6+R()*1.2;addMesh(new THREE.Mesh(new THREE.BoxGeometry(1.4,h,2.1),wm),x,h/2,z)}}
 // 外の木々（景色）
 for(let i=0;i<70;i++){const a=R()*Math.PI*2,x=Math.cos(a)*(SW+3+R()*10),z=Math.sin(a)*(SD+3+R()*8);prop(t.tree,cl(x,-SW-14,SW+14),cl(z,-SD-12,SD+12),0)}
 // 中の障害物（スタート地点と道は空ける）
 const n=16+RI(6);for(let i=0;i<n;i++){let x,z,k=0;do{x=(R()-.5)*(SW*2-5);z=(R()-.5)*(SD*2-5);k++}while(k<40&&(hyp(x+SW*.7,z)<6||onPath(x,z)<3||OBS.some(o=>hyp(o.x-x,o.z-z)<o.r+3.2)));prop(R()<.55?t.tree:t.deco,x,z,1)}
 if(t.torch)for(let i=0;i<4;i++){const x=(i%2?1:-1)*SW*.55,z=(i<2?-1:1)*SD*.55;const l=new THREE.PointLight(0xffa050,18,14,1.6);l.position.set(x,2.6,z);world.add(l);LIGHTS.push(l);const f=glowSpr(0xff9040,1.8,.9);f.position.set(x,2.6,z);world.add(f);addMesh(new THREE.Mesh(new THREE.CylinderGeometry(.12,.16,2.4,6),LM('#3a2a1c')),x,1.2,z);OBS.push({x,z,r:.4})}
}
function onPath(x,z){const p=AREA.path;if(!p)return 99;const c=Math.cos(-p.a),s=Math.sin(-p.a);/* 道の向きに回した距離 */const dz=(z-p.z)*c-x*s;return Math.abs(dz)}
function shade(hex,k){const c=new THREE.Color(hex);c.multiplyScalar(1+k);return '#'+c.getHexString()}
function prop(ty,x,z,ob){const t=TM,s=.8+R()*.6;let r=0;
 if(ty==='jungle'){addMesh(new THREE.Mesh(new THREE.CylinderGeometry(.18*s,.3*s,1.6*s,6),LM('#4a3626')),x,.8*s,z);const lc=pk(['#2d4a24','#365a2a','#2a4220']);for(let i=0;i<3;i++){const m=new THREE.Mesh(new THREE.IcosahedronGeometry((1+R()*.5)*s,0),LM(lc));addMesh(m,x+(R()-.5)*s,1.9*s+i*.45*s,z+(R()-.5)*s)}r=.5*s}
 else if(ty==='dead'){const tm=LM('#1a1614');addMesh(new THREE.Mesh(new THREE.CylinderGeometry(.12*s,.26*s,3*s,5),tm),x,1.5*s,z);for(let i=0;i<4;i++){const b=new THREE.Mesh(new THREE.CylinderGeometry(.04*s,.09*s,1.4*s,4),tm);b.rotation.z=(R()-.5)*2.2;b.rotation.y=R()*6;addMesh(b,x+(R()-.5)*.6*s,(1.6+R()*1.3)*s,z+(R()-.5)*.6*s)}if(R()<.5){const c=new THREE.Mesh(new THREE.ConeGeometry(1*s,2.8*s,6),LM('#18221c'));addMesh(c,x+.7*s,1.6*s,z+.4*s)}r=.45*s}
 else if(ty==='coral'){const c=pk(['#7a3a4a','#3a6a6a','#5a4a7a']);for(let i=0;i<4;i++){const m=new THREE.Mesh(new THREE.CylinderGeometry(.08*s,.18*s,(1+R()*1.4)*s,5),LM(c));m.rotation.z=(R()-.5)*.8;addMesh(m,x+(R()-.5)*.8*s,.7*s,z+(R()-.5)*.8*s)}r=.6*s}
 else if(ty==='column'||ty==='col'){const h=(ty==='col'?3.4:1.2+R()*2.4)*s,c=ty==='col'?'#ece4d4':'#5a6a6a';addMesh(new THREE.Mesh(new THREE.CylinderGeometry(.45,.5,h,8),LM(c)),x,h/2,z);addMesh(new THREE.Mesh(new THREE.BoxGeometry(1.2,.3,1.2),LM(ty==='col'?'#d8b860':shade(c,-.2))),x,h+.15,z);r=.6}
 else if(ty==='pillar'){const h=3.2;addMesh(new THREE.Mesh(new THREE.BoxGeometry(1.1,h,1.1),LM('#4a4038')),x,h/2,z);r=.75}
 else if(ty==='mech'){const h=2.6+R();addMesh(new THREE.Mesh(new THREE.BoxGeometry(.9,h,.9),LM('#3a4250')),x,h/2,z);const e=new THREE.Mesh(new THREE.BoxGeometry(.95,.12,.95),new THREE.MeshBasicMaterial({color:t.glow}));addMesh(e,x,h*.7,z,false);if(R()<.5){const gr=new THREE.Mesh(new THREE.TorusGeometry(.8,.18,5,10),LM('#5a5040'));gr.rotation.x=Math.PI/2;addMesh(gr,x,.2,z)}r=.65}
 else if(ty==='rock'){const m=new THREE.Mesh(new THREE.DodecahedronGeometry(.8*s,0),LM('#3a3c3a'));m.scale.y=.7;addMesh(m,x,.4*s,z);r=.8*s}
 else if(ty==='ruin'){const w=1.6+R()*1.6,h=.8+R()*1.2,d=1+R()*1.2;const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),LM(pk(['#6a6e62','#5e6458','#727668'])));addMesh(m,x,h/2,z);addMesh(new THREE.Mesh(new THREE.BoxGeometry(w*.7,.12,d*.6),LM('#3e5a2e')),x,h+.06,z);if(ob)OBS.push({x,z,bx:w/2,bz:d/2,r:Math.max(w,d)/2});return}
 else if(ty==='crate'){const w=1.2+R()*.8;addMesh(new THREE.Mesh(new THREE.BoxGeometry(w,w*.8,w),LM(t===TH.temple?'#3a4050':'#5a4630')),x,w*.4,z);if(ob)OBS.push({x,z,bx:w/2,bz:w/2,r:w*.7});return}
 else if(ty==='cloud'){const m=new THREE.Mesh(new THREE.IcosahedronGeometry(1.1*s,1),new THREE.MeshLambertMaterial({color:'#fffaf0',transparent:true,opacity:.75}));m.scale.y=.5;addMesh(m,x,.4,z,false);r=0}
 if(ob&&r)OBS.push({x,z,r})}

/* ===== 当たり（障害物と外周） ===== */
function collide(o,r){for(const b of OBS){if(b.bx){const nx=cl(o.x,b.x-b.bx,b.x+b.bx),nz=cl(o.z,b.z-b.bz,b.z+b.bz),dx=o.x-nx,dz=o.z-nz,d=hyp(dx,dz);if(d<r){if(d<1e-4){o.x+=r;continue}o.x=nx+dx/d*r;o.z=nz+dz/d*r}}else{const dx=o.x-b.x,dz=o.z-b.z,d=hyp(dx,dz),m=b.r+r;if(d<m&&d>1e-4){o.x=b.x+dx/d*m;o.z=b.z+dz/d*m}}}
 o.x=cl(o.x,-SW+r,SW-r);o.z=cl(o.z,-SD+r,SD-r)}

/* ===== 敵 ===== */
const CATS={hum:{sp:2.6,rg:1.4,wu:.55},beast:{sp:3.9,rg:1.5,wu:.45,lunge:1},heavy:{sp:1.8,rg:1.9,wu:.95,aoe:1},blob:{sp:2.4,rg:1.3,wu:.5,hop:1},fly:{sp:3.2,rg:1.5,wu:.5,fly:1},cast:{sp:2.3,rg:7.5,wu:.7,shoot:1},stat:{sp:0,rg:8.5,wu:.8,shoot:1}};
function spawnE(k,x,z,tier){const d=A.en[k];if(!d||!A.spr[k])return null;const c=CATS[d.cat]||CATS.hum,sc=tier===2?2:tier===1?1.4:1;
 const sp=billboard(A.spr[k],d.w,d.h,sc);world.add(sp);const hm=(tier===2?1.15:tier===1?.75:.85)*(1+.18*(STG));const hp=Math.round((d.hp[0]+RI(d.hp[1]-d.hp[0]+1))*hm);
 const r=cl(d.w/PPU*sc*.28,.4,2);const shd=shadowOf(r*1.2);world.add(shd);
 const atk=d.mv.filter(m=>m.a).map(m=>m.a*(m.h||1));const base=atk.length?Math.max(...atk):8;
 const e={k,d,c,tier,x,z,r,hp,mhp:hp,sp,shd,st:'idle',t:0,cd:1+R()*1.5,mi:0,blk:0,buf:1,fx:{},hit:0,dmg:base,fly:c.fly||d.fly,h:d.h/PPU*sc,lb:null,lbt:0,ag:tier>=1?14:10};
 if(tier>=1){e.aura=glowSpr(tier===2?0xff4060:0xffa040,r*4,.35);world.add(e.aura)}EN.push(e);return e}
function nextMove(e){const m=e.d.mv.length?e.d.mv[e.mi%e.d.mv.length]:{a:8};e.mi++;return m}
function eAct(e,dt){const p=P,dx=p.x-e.x,dz=p.z-e.z,dist=hyp(dx,dz),c=e.c;e.t-=dt;e.cd-=dt;
 for(const k in e.fx){const f=e.fx[k];f.t-=dt;if(k==='burn'){f.tk-=dt;if(f.tk<=0){f.tk=.5;hurtE(e,f.v,'#ff8a3a',0,1)}}if(f.t<=0)delete e.fx[k]}
 const slow=e.fx.ice?.55:1;if(e.fx.stun)return;
 if(e.st==='idle'){if(dist<e.ag||e.hp<e.mhp)e.st='chase';else{if(e.t<=0){e.t=1+R()*2;e.wx=e.x+(R()-.5)*3;e.wz=e.z+(R()-.5)*3}if(e.wx!=null&&c.sp)moveE(e,e.wx-e.x,e.wz-e.z,c.sp*.35*dt)}return}
 if(e.st==='chase'){const want=c.shoot?c.rg*.8:c.rg+e.r*.6+.3;if(dist>want&&c.sp)moveE(e,dx,dz,c.sp*slow*dt*(e.tier===2?.85:1));else if(c.shoot&&dist<want*.55&&c.sp)moveE(e,-dx,-dz,c.sp*.6*dt);
  if(e.cd<=0&&dist<(c.shoot?c.rg:c.rg+e.r*.6+.6)){e.mv=nextMove(e);const big=e.tier>=1&&e.mi%3===0;e.big=big;e.st='wind';e.t=(big?1.25:c.wu)*(e.tier===2?1.1:1);e.tx=p.x;e.tz=p.z;
   if(e.mv.lb||e.mv.nm){e.lb=e.mv.nm||e.mv.lb;e.lbt=1.4}
   if(e.mv.a){if(big||c.aoe){const rr=big?(e.tier===2?4.2:3):2.2;addTG(c.shoot||big?p.x:e.x+dx/dist*Math.min(dist,1.5),c.shoot||big?p.z:e.z+dz/dist*Math.min(dist,1.5),rr,e.t,e)}else if(!c.shoot)addTG(e.x+dx/dist*Math.min(dist,c.rg),e.z+dz/dist*Math.min(dist,c.rg),1.1+e.r*.4,e.t,e)}}return}
 if(e.st==='wind'){if(e.t<=0){doMove(e);e.st='rec';e.t=.35;e.cd=(e.tier===2?1.6:2)+R()*.8}return}
 if(e.st==='rec'){if(e.t<=0)e.st='chase'}}
function moveE(e,dx,dz,s){const d=hyp(dx,dz);if(d<1e-3)return;e.x+=dx/d*s;e.z+=dz/d*s;e.walk=(e.walk||0)+s;for(const o of EN)if(o!==e&&!o.dead){const ox=e.x-o.x,oz=e.z-o.z,od=hyp(ox,oz),m=e.r+o.r;if(od<m&&od>1e-3){e.x+=ox/od*(m-od)*.5;e.z+=oz/od*(m-od)*.5}}{const px=e.x-P.x,pz=e.z-P.z,pd=hyp(px,pz),m=e.r+.5;if(pd<m&&pd>1e-3){e.x=P.x+px/pd*m;e.z=P.z+pz/pd*m}}collide(e,e.r)}
function doMove(e){const m=e.mv,c=e.c,p=P;if(!m)return;const mult=(1+.2*STG)*e.buf*(e.fx.weak?.75:1);
 if(m.b){e.blk+=m.b*2;txtAt(e.x,e.h+.4,e.z,'防御','#8ad0ff')}
 if(m.st){e.buf*=1.12;txtAt(e.x,e.h+.4,e.z,'筋力+','#ff9a6a')}
 if(m.hl){for(const o of EN)if(!o.dead&&hyp(o.x-e.x,o.z-e.z)<8){o.hp=Math.min(o.mhp,o.hp+m.hl*2);txtAt(o.x,o.h+.3,o.z,'+'+m.hl*2,'#7fe07f')}}
 if(m.smn&&Array.isArray(m.smn)&&EN.filter(o=>!o.dead).length<14){for(const k of m.smn.slice(0,2)){const o=spawnE(k,e.x+(R()-.5)*3,e.z+(R()-.5)*3,0);if(o){o.st='chase';collide(o,o.r)}}}
 if(m.a){const dmg=Math.round(m.a*1.35*mult*(e.big?1.8:1));const h=m.h||1;e.atkT=.25;
  if(TG.some(t=>t.e===e)){/* 地面の予告の範囲に当たる */for(const t of TG.filter(t=>t.e===e)){t.go=1;if(hyp(p.x-t.x,p.z-t.z)<t.r+.3)for(let i=0;i<h;i++)setTimeout(()=>hurtP(dmg,e),i*160)}snd(c.aoe||e.big?'eslam':'e'+(e.d.st||'slash'))}
  else if(c.shoot){for(let i=0;i<h;i++)setTimeout(()=>{if(!e.dead)shoot(e,dmg)},i*170);snd('emagic')}
  else{if(c.lunge){e.x+=(p.x-e.x)*.35;e.z+=(p.z-e.z)*.35;collide(e,e.r)}if(hyp(p.x-e.x,p.z-e.z)<c.rg+e.r+.8)for(let i=0;i<h;i++)setTimeout(()=>hurtP(dmg,e),i*160);snd('e'+(e.d.st||'slash'))}}
 if(m.wk&&hyp(p.x-e.x,p.z-e.z)<9){p.fx.weak=4;txtAt(p.x,2.4,p.z,'脆弱','#c08aff')}
 if(m.vu&&hyp(p.x-e.x,p.z-e.z)<9){p.fx.vuln=4;txtAt(p.x,2.4,p.z,'弱体','#c08aff')}}
function shoot(e,dmg){const p=P,dx=p.x-e.x,dz=p.z-e.z,d=hyp(dx,dz)||1;const o=glowSpr(e.tier===2?0xff5070:0xb070ff,1.1,1);o.position.set(e.x,1.1,e.z);world.add(o);PRJ.push({o,x:e.x,z:e.z,vx:dx/d*9,vz:dz/d*9,t:2,dmg,e})}
function addTG(x,z,r,t,e){const m=new THREE.Mesh(new THREE.RingGeometry(r*.94,r,40),new THREE.MeshBasicMaterial({color:0xff3030,transparent:true,opacity:.7,depthWrite:false}));m.rotation.x=-Math.PI/2;m.position.set(x,.04,z);const f=new THREE.Mesh(new THREE.CircleGeometry(r,40),new THREE.MeshBasicMaterial({color:0xff2020,transparent:true,opacity:.22,depthWrite:false}));f.rotation.x=-Math.PI/2;f.position.set(x,.035,z);f.scale.setScalar(.01);world.add(m,f);TG.push({x,z,r,t,t0:t,m,f,e})}
function hurtE(e,v,col,crit,dot){if(e.dead)return 0;let d=v;if(e.blk>0&&!dot){const b=Math.min(e.blk,d);e.blk-=b;d-=b;if(b)txtAt(e.x,e.h*.6,e.z,'防'+b,'#8ad0ff')}
 e.hp-=d;e.hit=.12;if(e.st==='idle')e.st='chase';txtAt(e.x+(R()-.5)*.6,e.h*.8+.3,e.z,String(Math.round(d)),col||'#fff',crit?1.5:dot?.8:1);if(e.hp<=0)killE(e);return d}
function killE(e){e.dead=1;e.dT=.5;KILLS++;snd(e.tier===2?'wn':'ea');const n=e.tier===2?40:e.tier===1?18:3+RI(5);for(let i=0;i<(e.tier?6:1);i++)drop('gold',e.x+(R()-.5)*1.5,e.z+(R()-.5)*1.5,Math.ceil(n/(e.tier?6:1)));
 if(e.tier===2){drop('wp',e.x-1.2,e.z+.6,mkWeapon(STG+1,3));drop('eq',e.x+1.2,e.z+.6);BOSS=null;music('m');setTimeout(openPortal,1200)}
 else if(e.tier===1){drop('eq',e.x,e.z+1);if(R()<.6)drop('wp',e.x+1,e.z,mkWeapon(STG+1))}
 else{if(R()<.07)drop('wp',e.x,e.z,mkWeapon(STG+1));else if(R()<.1)drop('pot',e.x,e.z);else if(R()<.04)drop('stone',e.x,e.z)}
 burst(e.x,e.h*.5,e.z,e.tier===2?0xff6080:0xffffff,e.tier?24:10)}

/* ===== 拾い物 ===== */
function drop(ty,x,z,v){const it={ty,x,z,v,t:0};collide(it,.3);
 if(ty==='gold'){it.o=glowSpr(0xffd040,.55,1);it.o.position.set(it.x,.3,it.z)}
 else if(ty==='pot'){it.o=glowSpr(0xff3050,.8,1);it.o.position.set(it.x,.4,it.z)}
 else if(ty==='stone'){it.o=glowSpr(0x80c0ff,.8,1);it.o.position.set(it.x,.4,it.z);it.n='砥石（武器を強化）'}
 else if(ty==='wp'){const s=billboard(A.spr[v.sp],86,86,.8);if(A.spr[v.sp]){const im=new Image();im.onload=()=>{s.scale.set(im.width/PPU*.8,im.height/PPU*.8,1)};im.src=A.spr[v.sp]}s.material.rotation=-.9;s.center.set(.5,.5);s.position.set(it.x,.6,it.z);it.o=s;it.g=glowSpr(new THREE.Color(WFX[v.fx].c),2.4,.5);it.g.position.set(it.x,.3,it.z);world.add(it.g)}
 else if(ty==='eq'){const k=v||pk(EQK.filter(k=>!P.eq.includes(k)))||pk(EQK);it.v=k;const s=billboard(A.rl[k].img,32,32,1.5);s.center.set(.5,.5);s.position.set(it.x,.8,it.z);it.o=s;it.g=glowSpr(0xffe0a0,1.8,.45);it.g.position.set(it.x,.5,it.z);world.add(it.g)}
 world.add(it.o);IT.push(it);return it}
const itName=it=>it.ty==='wp'?wName(it.v)+' '+'★'.repeat(it.v.star):it.ty==='eq'?A.rl[it.v].n:it.n||'';
function pickUp(it){const p=P;
 if(it.ty==='gold'){GOLD+=it.v;snd('pk')}
 else if(it.ty==='pot'){p.hp=Math.min(p.mhp,p.hp+Math.round(p.mhp*.25));txtAt(p.x,2.3,p.z,'回復','#7fe07f');snd('ps')}
 else if(it.ty==='stone'){p.w.lv++;recalc();banner(wName(p.w)+' に強化した');snd('tn')}
 else if(it.ty==='eq'){if(p.eq.length>=6){banner('装備の枠に空きがない');return 0}p.eq.push(it.v);recalc();banner(A.rl[it.v].n+'：'+EQ[it.v][0]);snd('tn')}
 else if(it.ty==='wp'){const w=it.v,o=p.w;if(w.n===o.n&&w.b===o.b){o.lv+=1+(w.star>=o.star?1:0);o.star=Math.max(o.star,w.star);recalc();banner(wName(o)+' に強化した');snd('tn')}
  else{p.w=w;recalc();banner(wName(w)+' を手にした');snd('tn');rmItem(it);drop('wp',p.x+.8,p.z+.8,o).cool=1.2;return 1}}
 rmItem(it);return 1}
function rmItem(it){world.remove(it.o);if(it.g)world.remove(it.g);IT.splice(IT.indexOf(it),1)}

/* ===== 自分 ===== */
function newRun(){STG=0;KILLS=0;GOLD=0;P={ch:'pl',base:CHR.pl.hp,eq:[],w:{b:'sw',n:'鉄の長剣',sp:'pl_wp',fx:'',star:1,lv:0,atk:14,as:1.15,rg:2.3},x:0,z:0,cd:[0,0,0,0],fx:{},shield:0,acd:0,ac:0,face:1,tgt:null,mv:null,spin:0,dash:0,hit:0};recalc();P.hp=P.mhp;P.mp=P.mmp;startStage()}
function startStage(){const k=window.FORCE||pk(LAYERS[STG]);AREA=Object.assign({},A.AR.find(a=>a.k===k));TM=TH[k];EN=[];IT=[];FX=[];TXT=[];PRJ=[];TG=[];BOSS=null;PORTAL=null;buildStage();
 const p=P;p.x=-SW*.72;p.z=0;p.mv=null;p.tgt=null;p.sp=billboard(A.ch.pl.img,A.ch.pl.w,A.ch.pl.h,.92);world.add(p.sp);p.shd=shadowOf(.5);world.add(p.shd);p.ring=new THREE.Mesh(new THREE.RingGeometry(.62,.75,32),new THREE.MeshBasicMaterial({color:0x50e070,transparent:true,opacity:.8,depthWrite:false}));p.ring.rotation.x=-Math.PI/2;world.add(p.ring);
 p.bub=new THREE.Mesh(new THREE.SphereGeometry(1.1,20,14),new THREE.MeshBasicMaterial({color:0x60b0ff,transparent:true,opacity:.18,depthWrite:false,blending:THREE.AdditiveBlending}));p.bub.visible=false;world.add(p.bub);
 // 敵の群れ（Card Trail の組み合わせをそのまま使う）
 const nm=AREA.nm,grp=8+STG*2;let tries=0;for(let i=0;i<grp&&tries<400;tries++){const x=(R()-.3)*SW*1.6,z=(R()-.5)*SD*1.7;if(hyp(x-p.x,z-p.z)<13)continue;const cnt=1+RI(STG>0?3:2);for(let j=0;j<cnt;j++){const e=spawnE(pk(nm),x+(R()-.5)*2.5,z+(R()-.5)*2.5,0);if(e)collide(e,e.r)}i++}
 for(const gr of AREA.el.slice().sort(()=>R()-.5).slice(0,1+(STG>0?1:0))){let x,z;do{x=(R()*.6+.2)*SW;z=(R()-.5)*SD*1.4}while(hyp(x-p.x,z-p.z)<20);gr.forEach((k,j)=>{const e=spawnE(k,x+(j-(gr.length-1)/2)*2.4,z,1);if(e)collide(e,e.r)})}
 drop('wp',p.x+3,p.z+1.5,mkWeapon(STG+1,STG?0:1));
 MODE='play';banner(['第一層','第二層','第三層'][STG]+'　'+AREA.n,3);music(AREA.bgm)}
function openPortal(){if(MODE!=='play')return;const x=BOSS0.x,z=BOSS0.z;const m=new THREE.Mesh(new THREE.RingGeometry(1,1.4,40),new THREE.MeshBasicMaterial({color:0x9fd0ff,transparent:true,opacity:.85,depthWrite:false,side:THREE.DoubleSide}));m.rotation.x=-Math.PI/2;m.position.set(x,.05,z);const gl=glowSpr(0x80b0ff,4,.6);gl.position.set(x,1,z);world.add(m,gl);PORTAL={x,z,m,gl};banner(STG<2?'先へ進む光が開いた':'最後の主を倒した')}
let BOSS0={x:0,z:0};
function summonBoss(){const gr=pk(AREA.bo);let x=SW*.55,z=0;const p=P;if(hyp(x-p.x,z-p.z)<10){x=-p.x*.6;z=-p.z*.6}BOSS0={x,z};const es=gr.map((k,j)=>spawnE(k,x+(j-(gr.length-1)/2)*3.2,z,gr.length>1&&j!==(gr.length>>1)?1:2)).filter(Boolean);BOSS=es.find(e=>e.tier===2)||es[0];if(BOSS)BOSS.tier=2;es.forEach(e=>{e.st='chase';collide(e,e.r)});
 banner((BOSS?BOSS.d.n:'主')+' が現れた',3);music(AREA.bx);burst(x,1,z,0xff4060,40);shake(.5)}

function useSkill(i){const p=P,s=CHR.pl.sk[i];if(MODE!=='play'||PAUSE)return;if(p.cd[i]>0){return}if(p.mp<s.mp){txtAt(p.x,2.4,p.z,'魔力が足りない','#8ab0ff',.8);return}
 p.mp-=s.mp;p.cd[i]=s.cd*(1-p.cdr);const a=aimDir();p.face=a.x>=0?1:-1;
 if(i===0){/* 斬り払い：前方120度・半径3.4 */const ang=Math.atan2(a.z,a.x);let n=0;for(const e of EN){if(e.dead)continue;const dx=e.x-p.x,dz=e.z-p.z,d=hyp(dx,dz);if(d>3.4+e.r)continue;let da=Math.abs(((Math.atan2(dz,dx)-ang+Math.PI*3)%(Math.PI*2))-Math.PI);if(da<1.1||d<e.r+.6){dealHit(e,1.7,12);n++}}arcFx(p.x,p.z,ang,3.4,2.2,0xffe0b0);p.lunge=.15;p.la=a;snd('spa')}
 else if(i===1){p.shield=Math.round(40+p.mhp*.18);p.shT=4;p.bub.visible=true;snd('tn');txtAt(p.x,2.4,p.z,'鉄壁','#8ad0ff')}
 else if(i===2){/* 踏み込み：6進み、通り道を斬る */const x0=p.x,z0=p.z;p.x+=a.x*6;p.z+=a.z*6;collide(p,.45);const len=hyp(p.x-x0,p.z-z0);for(const e of EN){if(e.dead)continue;const t=cl(((e.x-x0)*(p.x-x0)+(e.z-z0)*(p.z-z0))/(len*len||1),0,1),cx=x0+(p.x-x0)*t,cz=z0+(p.z-z0)*t;if(hyp(e.x-cx,e.z-cz)<e.r+.9)dealHit(e,1.3,8)}lineFx(x0,z0,p.x,p.z,0xffb050);p.mv=null;p.tgt=null;snd('spk')}
 else if(i===3){p.spin=1.3;p.spinTk=0;snd('wsw')}}
function aimDir(){const p=P;let tx,tz;if(MOUSE.ok){tx=MOUSE.gx;tz=MOUSE.gz}else{const e=nearE(12);if(e){tx=e.x;tz=e.z}else{tx=p.x+p.face;tz=p.z}}const dx=tx-p.x,dz=tz-p.z,d=hyp(dx,dz)||1;return{x:dx/d,z:dz/d}}
function nearE(r){let b=null,bd=r;for(const e of EN){if(e.dead)continue;const d=hyp(e.x-P.x,e.z-P.z)-e.r;if(d<bd){bd=d;b=e}}return b}
function dealHit(e,mul,add){const p=P;let v=(p.atk*mul+(add||0))*(p.fx.weak?.75:1);let cr=R()<p.crit;if(cr)v*=1.5+p.critD*.5;v=Math.round(v*(.92+R()*.16));const d=hurtE(e,v,cr?'#ffd23f':'#fff',cr);
 if(p.ls&&d)p.hp=Math.min(p.mhp,p.hp+d*p.ls);const f=p.w.fx;
 if(f==='fire'||p.burn){e.fx.burn={t:3,tk:.5,v:Math.max(2,Math.round(p.atk*.18))};if(R()<.35)txtAt(e.x+.6,e.h+.2,e.z,'燃焼','#ff8a3a',.8)}
 if(f==='ice'){e.fx.ice={t:2};}if(f==='bolt'&&R()<.25){const o=EN.find(o=>!o.dead&&o!==e&&hyp(o.x-e.x,o.z-e.z)<5);if(o){hurtE(o,Math.round(v*.6),'#ffe86a');lineFx(e.x,e.z,o.x,o.z,0xffe86a,1.2)}}
 hstop(v>=40?.06:v>=25?.035:0);return d}
function hurtP(v,e){const p=P;if(MODE!=='play'||p.dead)return;let d=Math.max(1,Math.round(v*(p.fx.vuln?1.25:1)-p.arm));if(p.shield>0){const b=Math.min(p.shield,d);p.shield-=b;d-=b;if(b)txtAt(p.x,2.2,p.z,'防'+b,'#8ad0ff',.8)}if(d<=0)return;
 p.hp-=d;p.hit=.15;txtAt(p.x+(R()-.5)*.5,2.1,p.z,String(d),'#ff5a5a',d>=25?1.3:1);snd('ea');if(d>=15)shake(.25);if(p.hp<=0){p.hp=0;p.dead=1;die(e)}}
function die(e){MODE='over';PAUSE=0;P.killer=e?e.d.n:'';music('m');snd('ls')}

/* ===== 演出 ===== */
function arcFx(x,z,ang,r,w,col){const m=new THREE.Mesh(new THREE.RingGeometry(r*.35,r,32,1,-w/2,w),new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:.75,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));m.rotation.x=-Math.PI/2;m.rotation.z=ang;m.position.set(x,.3,z);world.add(m);FX.push({o:m,t:.22,t0:.22,ty:'arc'})}
function lineFx(x0,z0,x1,z1,col,wd){const l=hyp(x1-x0,z1-z0);if(l<.1)return;const m=new THREE.Mesh(new THREE.PlaneGeometry(l,(wd||1)*.45),new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:.9,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));m.rotation.x=-Math.PI/2;m.rotation.z=-Math.atan2(z1-z0,x1-x0);m.position.set((x0+x1)/2,.9,(z0+z1)/2);world.add(m);FX.push({o:m,t:.3,t0:.3,ty:'line'})}
function ringFx(x,z,r,col,t){const m=new THREE.Mesh(new THREE.RingGeometry(r*.8,r,40),new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:.8,blending:THREE.AdditiveBlending,depthWrite:false}));m.rotation.x=-Math.PI/2;m.position.set(x,.2,z);world.add(m);FX.push({o:m,t:t||.3,t0:t||.3,ty:'ring'})}
function burst(x,y,z,col,n){for(let i=0;i<n;i++){const o=glowSpr(col,.25+R()*.3,1);o.position.set(x,y,z);world.add(o);const a=R()*6.28,s=2+R()*4;FX.push({o,t:.5+R()*.4,t0:.9,ty:'pt',vx:Math.cos(a)*s,vy:2+R()*4,vz:Math.sin(a)*s})}}
function txtAt(x,y,z,s,c,sz){TXT.push({x,y,z,s,c,sz:sz||1,t:.9})}
let SHK=0,HS=0;const shake=v=>SHK=Math.max(SHK,v),hstop=v=>HS=Math.max(HS,v);
function banner(s,t){MSG={s,t:t||2.2}}

/* ===== 入力 ===== */
const MOUSE={x:0,y:0,ok:0,gx:0,gz:0,rd:0},KEY={};const rc=new THREE.Raycaster(),gp=new THREE.Plane(new THREE.Vector3(0,1,0),0),v3=new THREE.Vector3(),v2=new THREE.Vector2();
function ground(sx,sy){v2.set(sx/W*2-1,-(sy/H)*2+1);rc.setFromCamera(v2,cam);return rc.ray.intersectPlane(gp,v3)?{x:v3.x,z:v3.z}:null}
function scr(x,y,z){v3.set(x,y,z).project(cam);return{x:(v3.x+1)/2*W,y:(1-v3.y)/2*H,ok:v3.z<1}}
function enemyAt(sx,sy){let b=null,bd=1e9;for(const e of EN){if(e.dead)continue;const a=scr(e.x,0,e.z),t=scr(e.x,e.h,e.z),cx=a.x,cy=(a.y+t.y)/2,hw=Math.max(18,(a.y-t.y)*.35),hh=(a.y-t.y)/2+6;if(Math.abs(sx-cx)<hw&&Math.abs(sy-cy)<hh){const d=hyp(sx-cx,sy-cy);if(d<bd){bd=d;b=e}}}return b}
let BTN=[];function hitBtn(x,y){for(let i=BTN.length-1;i>=0;i--){const b=BTN[i];if(x>=b.x&&x<=b.x+b.w&&y>=b.y&&y<=b.y+b.h){b.f();return 1}}return 0}
function cmdAt(sx,sy){const p=P;if(mmHit(sx,sy))return;const e=enemyAt(sx,sy);if(e){p.tgt=e;p.mv=null;return}const g0=ground(sx,sy);if(g0){p.mv={x:cl(g0.x,-SW,SW),z:cl(g0.z,-SD,SD)};p.tgt=null;ringFx(p.mv.x,p.mv.z,.45,0x60ff90,.35);const it=IT.find(i=>hyp(i.x-g0.x,i.z-g0.z)<1&&(i.ty==='wp'||i.ty==='eq'));if(it)p.pick=it}}
ui.addEventListener('contextmenu',e=>e.preventDefault());
ui.addEventListener('pointermove',e=>{MOUSE.x=e.clientX;MOUSE.y=e.clientY;if(e.pointerType==='mouse')MOUSE.ok=1;if(MOUSE.rd&&MODE==='play'&&!PAUSE&&e.pointerType==='mouse'){const g0=ground(e.clientX,e.clientY);if(g0&&!mmHit(e.clientX,e.clientY,1)){P.mv={x:g0.x,z:g0.z};P.tgt=null}}});
ui.addEventListener('pointerdown',e=>{audioOn();MOUSE.x=e.clientX;MOUSE.y=e.clientY;if(e.pointerType!=='mouse')MOUSE.ok=0;if(hitBtn(e.clientX,e.clientY))return;
 if(MODE==='title'){newRun();return}if(MODE==='over'||MODE==='win'){MODE='title';music('t');return}if(PAUSE)return;
 if(MODE==='play'){MOUSE.rd=1;cmdAt(e.clientX,e.clientY)}});
addEventListener('pointerup',()=>{MOUSE.rd=0});
addEventListener('keydown',e=>{audioOn();const k=e.key.toLowerCase();KEY[k]=1;if(MODE==='title'&&(k==='enter'||k===' ')){newRun();return}if((MODE==='over'||MODE==='win')&&(k==='enter'||k===' ')){MODE='title';music('t');return}
 if(MODE!=='play')return;if(k==='escape'||k==='p'){PAUSE=!PAUSE;return}const i='qwer'.indexOf(k);if(i>=0)useSkill(i);if(k==='f')tryPick();if(k==='m')toggleMute();if(k==='s'){P.mv=null;P.tgt=null}});
addEventListener('keyup',e=>{KEY[e.key.toLowerCase()]=0});
let AUD=0;function audioOn(){if(AUD){try{if(AC&&AC.state!=='running')initAudio()}catch(e){}return}AUD=1;try{newAC();music(MODE==='play'?AREA.bgm:'t')}catch(e){}}
function toggleMute(){try{setVol(VOL>0?0:10)}catch(e){}}
function tryPick(){const p=P;let b=null,bd=2.2;for(const it of IT){if(it.ty!=='wp'&&it.ty!=='eq')continue;const d=hyp(it.x-p.x,it.z-p.z);if(d<bd){bd=d;b=it}}if(b)pickUp(b)}

/* ===== 更新 ===== */
function update(dt){T+=dt;if(MSG){MSG.t-=dt;if(MSG.t<=0)MSG=null}if(MODE!=='play'||PAUSE)return;const p=P;
 for(let i=0;i<4;i++)p.cd[i]=Math.max(0,p.cd[i]-dt);p.mp=Math.min(p.mmp,p.mp+dt*(5+p.mmp*.02)*(1+p.mrM));p.hp=Math.min(p.mhp,p.hp+p.rgn*dt);for(const k in p.fx){p.fx[k]-=dt;if(p.fx[k]<=0)delete p.fx[k]}
 if(p.shT>0){p.shT-=dt;if(p.shT<=0||p.shield<=0){p.shield=0;p.bub.visible=false}}
 // 移動（矢印キーでも動ける）
 let kx=(KEY.arrowright?1:0)-(KEY.arrowleft?1:0),kz=(KEY.arrowdown?1:0)-(KEY.arrowup?1:0);let moving=0;
 if(p.spin>0){p.spin-=dt;p.spinTk-=dt;if(p.spinTk<=0){p.spinTk=.26;for(const e of EN)if(!e.dead&&hyp(e.x-p.x,e.z-p.z)<4+e.r)dealHit(e,.75,4);ringFx(p.x,p.z,4,0xffd0a0,.28);snd('spa')}}
 if(kx||kz){const d=hyp(kx,kz);p.x+=kx/d*p.spd*dt;p.z+=kz/d*p.spd*dt;p.mv=null;p.tgt=null;moving=1;p.face=kx?kx:p.face}
 else if(p.tgt&&!p.tgt.dead){const e=p.tgt,d=hyp(e.x-p.x,e.z-p.z);if(d>p.w.rg+e.r){mvTo(e.x,e.z,dt);moving=1}else attack(e,dt)}
 else if(p.mv){if(mvTo(p.mv.x,p.mv.z,dt))p.mv=null;else moving=1}
 if(!moving&&!p.mv){p.tgt=p.tgt&&!p.tgt.dead?p.tgt:null;const e=p.tgt||nearE(p.w.rg+.2);if(e&&hyp(e.x-p.x,e.z-p.z)<p.w.rg+e.r+.1)attack(e,dt)}
 p.acd-=dt;collide(p,.45);p.walk=moving?(p.walk||0)+dt:0;
 if(p.pick){if(hyp(p.pick.x-p.x,p.pick.z-p.z)<1.2){if(IT.includes(p.pick))pickUp(p.pick);p.pick=null}else if(!p.mv)p.pick=null}
 // 拾い物
 for(const it of IT.slice()){it.t+=dt;if(it.cool>0){it.cool-=dt;continue}const d=hyp(it.x-p.x,it.z-p.z);if(it.ty==='gold'&&d<2.4){it.x+=(p.x-it.x)*dt*8;it.z+=(p.z-it.z)*dt*8}if(d<.8&&(it.ty==='gold'||it.ty==='pot'||it.ty==='stone'||it.ty==='eq'&&p.eq.length<6))pickUp(it)}
 // 敵
 for(const e of EN){if(e.dead){e.dT-=dt;continue}eAct(e,dt);e.hit-=dt;e.atkT=(e.atkT||0)-dt;e.lbt-=dt}
 for(const e of EN.filter(e=>e.dead&&e.dT<=0)){world.remove(e.sp,e.shd);if(e.aura)world.remove(e.aura);EN.splice(EN.indexOf(e),1)}
 if(!BOSS&&!PORTAL&&!EN.some(e=>!e.dead)&&!AREA.bossDone){AREA.bossDone=1;setTimeout(()=>{if(MODE==='play')summonBoss()},1400);banner('辺りが静まった……',1.4)}
 // 弾
 for(const b of PRJ.slice()){b.t-=dt;b.x+=b.vx*dt;b.z+=b.vz*dt;b.o.position.set(b.x,1.1,b.z);let gone=b.t<=0||Math.abs(b.x)>SW||Math.abs(b.z)>SD||OBS.some(o=>!o.bx&&hyp(o.x-b.x,o.z-b.z)<o.r);if(!gone&&hyp(b.x-p.x,b.z-p.z)<.7){hurtP(b.dmg,b.e);gone=1;burst(b.x,1.1,b.z,0xb070ff,6)}if(gone){world.remove(b.o);PRJ.splice(PRJ.indexOf(b),1)}}
 // 地面の予告
 for(const t of TG.slice()){t.t-=dt;t.f.scale.setScalar(Math.max(.01,1-t.t/t.t0));if(t.go||t.t<-.05||t.e.dead){if(t.go){ringFx(t.x,t.z,t.r,0xff6040,.3);if(t.r>2.5)shake(.3)}world.remove(t.m,t.f);TG.splice(TG.indexOf(t),1)}}
 // 演出
 for(const f of FX.slice()){f.t-=dt;const k=f.t/f.t0;if(f.ty==='pt'){f.vy-=12*dt;f.o.position.x+=f.vx*dt;f.o.position.y=Math.max(.05,f.o.position.y+f.vy*dt);f.o.position.z+=f.vz*dt;f.o.material.opacity=k}else{f.o.material.opacity=k*.85;if(f.ty==='ring')f.o.scale.setScalar(1+(1-k)*.25)}if(f.t<=0){world.remove(f.o);FX.splice(FX.indexOf(f),1)}}
 for(const t of TXT.slice()){t.t-=dt;t.y+=dt*1.2;if(t.t<=0)TXT.splice(TXT.indexOf(t),1)}
 if(PORTAL&&hyp(PORTAL.x-p.x,PORTAL.z-p.z)<1.4){if(STG<2){STG++;startStage()}else{MODE='win';music('t');snd('wn')}}
 if(p.lunge>0)p.lunge-=dt;if(p.hit>0)p.hit-=dt}
function mvTo(x,z,dt){const p=P,dx=x-p.x,dz=z-p.z,d=hyp(dx,dz);if(d<.12)return 1;const s=Math.min(d,p.spd*(p.fx.slow?.6:1)*dt);p.x+=dx/d*s;p.z+=dz/d*s;if(Math.abs(dx)>.05)p.face=dx>0?1:-1;return 0}
function attack(e,dt){const p=P;if(Math.abs(e.x-p.x)>.05)p.face=e.x>p.x?1:-1;if(p.acd>0)return;p.acd=1/p.as;p.ac++;p.lunge=.12;p.la={x:(e.x-p.x)/(hyp(e.x-p.x,e.z-p.z)||1),z:(e.z-p.z)/(hyp(e.x-p.x,e.z-p.z)||1)};
 setTimeout(()=>{if(e.dead||MODE!=='play')return;dealHit(e,p.pen&&p.ac%10===0?2:1,0);arcFx(p.x,p.z,Math.atan2(e.z-p.z,e.x-p.x),p.w.rg+.4,1.2,new THREE.Color(WFX[p.w.fx].c).getHex());snd(p.w.b==='kt'?'spk':'spa');
  if(p.kunai&&p.ac%3===0){const o=EN.filter(o=>!o.dead&&o!==e&&hyp(o.x-p.x,o.z-p.z)<8)[0];if(o){dealHit(o,.6,0);lineFx(p.x,p.z,o.x,o.z,0xd0d0d0,.5)}}},90)}

/* ===== 描画（3D の位置合わせ） ===== */
function sync(dt){const p=P;if(!p)return;const bob=p.walk?Math.abs(Math.sin(p.walk*10))*.12:0;let lx=0,lz=0;if(p.lunge>0&&p.la){const k=Math.sin(p.lunge/.15*Math.PI)*.35;lx=p.la.x*k;lz=p.la.z*k}
 p.sp.position.set(p.x+lx,bob,p.z+lz);setFlip(p.sp,p.face<0?1:0);p.sp.material.rotation=p.spin>0?Math.sin(T*30)*.25:0;p.sp.material.color.setRGB(p.hit>0?3:1,p.hit>0?1.2:1,p.hit>0?1.2:1);
 p.shd.position.set(p.x,.02,p.z);p.ring.position.set(p.x,.03,p.z);p.bub.position.set(p.x,1,p.z);
 const tint=new THREE.Color(TM.tint);
 for(const e of EN){const fx=e.fly?.9+Math.sin(T*3+e.x)*.2:0,hop=e.c.hop&&e.walk?Math.abs(Math.sin(e.walk*3))*.4:0;let wob=0,sq=1;if(e.st==='wind'){wob=Math.sin(T*40)*.05;sq=1-Math.min(.12,(1-e.t/(e.c.wu||.5))*.12)}
  let ox=0,oz=0;if(e.atkT>0){const k=Math.sin(e.atkT/.25*Math.PI)*.5,d=hyp(P.x-e.x,P.z-e.z)||1;ox=(P.x-e.x)/d*k;oz=(P.z-e.z)/d*k}
  e.sp.position.set(e.x+wob+ox,fx+hop,e.z+oz);const u=e.sp.userData;e.sp.scale.set(u.w/PPU*u.sc*(2-sq),u.h/PPU*u.sc*sq,1);setFlip(e.sp,P.x>e.x?1:0);
  if(e.dead){const k=Math.max(0,e.dT/.5);e.sp.material.opacity=k;e.sp.scale.y*=k}
  const c=e.sp.material.color;if(e.hit>0)c.setRGB(3,3,3);else if(e.st==='wind'&&e.big)c.setRGB(1.6+Math.sin(T*30)*.4,.7,.7);else if(e.fx.ice)c.setRGB(.7,.9,1.4);else c.copy(tint);
  e.shd.position.set(e.x,.02,e.z);if(e.aura){e.aura.position.set(e.x,e.h*.45+fx,e.z);e.aura.material.opacity=.25+Math.sin(T*3)*.08}}
 for(const it of IT){const b=Math.sin(T*3+it.x)*.12;if(it.ty==='wp'){it.o.position.y=.7+b;it.g.material.opacity=.4+Math.sin(T*4)*.15}else if(it.ty==='eq'){it.o.position.y=.9+b;it.g.material.opacity=.35+Math.sin(T*4)*.12}else it.o.position.y=(it.ty==='gold'?.3:.45)+b*.6;it.o.position.x=it.x;it.o.position.z=it.z}
 if(PORTAL){PORTAL.m.rotation.z+=dt;PORTAL.gl.material.opacity=.5+Math.sin(T*3)*.2}
 for(const l of LIGHTS)l.intensity=16+Math.sin(T*9+l.position.x)*3+R()*2;
 // カメラは自分を追う（戦場の端では少し止める）
 const tx=cl(p.x,-SW+6,SW-6),tz=cl(p.z,-SD+3,SD-4);const s=SHK>0?SHK:0;SHK=Math.max(0,SHK-dt);cam.position.set(tx+CAMO.x+(R()-.5)*s,CAMO.y+(R()-.5)*s,tz+CAMO.z);cam.lookAt(tx,0,tz)}

/* ===== 2D の画面（HUD・小地図・文字） ===== */
const FONT=s=>Math.round(s)+'px "DotGothic16", monospace';
function tx(s,x,y,c,al,sz,sh){g.font=FONT(sz*U);g.textAlign=al||'left';if(sh!==0){g.fillStyle='rgba(0,0,0,.55)';g.fillText(s,x+1.5*U,y+1.5*U)}g.fillStyle=c;g.fillText(s,x,y)}
function panel(x,y,w,h,a){g.fillStyle=`rgba(12,14,20,${a==null?.82:a})`;g.fillRect(x,y,w,h)}
function bar(x,y,w,h,v,c,bg){g.fillStyle=bg||'#1a1c22';g.fillRect(x,y,w,h);g.fillStyle=c;g.fillRect(x,y,w*cl(v,0,1),h)}
function btn(x,y,w,h,f){BTN.push({x,y,w,h,f})}
function drawUI(){g.clearRect(0,0,W,H);BTN=[];if(MODE==='title')return drawTitle();
 if(MODE==='play'||MODE==='over'||MODE==='win'){drawWorldText();drawHUD();drawMini()}
 if(MSG){const a=Math.min(1,MSG.t*2);g.globalAlpha=a;const w=Math.max(300,MSG.s.length*20)*U;panel(W/2-w/2,70*U,w,40*U,.6);tx(MSG.s,W/2,97*U,'#f0e6c8','center',20);g.globalAlpha=1}
 if(PAUSE){panel(0,0,W,H,.55);tx('一時停止',W/2,H/2-10*U,'#fff','center',30);tx('Esc で再開',W/2,H/2+26*U,'#aab','center',15)}
 if(MODE==='over')drawEnd('力尽きた',P.killer?P.killer+' に倒された':'');if(MODE==='win')drawEnd('踏破','三つの層を越えた')}
function drawWorldText(){const p=P;
 // 敵のHPバー・技名
 for(const e of EN){if(e.dead)continue;const t=scr(e.x,e.h+(e.fly?1:0)+.1,e.z);if(!t.ok)continue;const w=(e.tier===2?70:e.tier?52:38)*U;if(e.tier===2&&e===BOSS)continue;bar(t.x-w/2,t.y-6*U,w,4*U,e.hp/e.mhp,e.tier?'#e06040':'#d03040','rgba(0,0,0,.6)');if(e.blk>0){g.fillStyle='#8ad0ff';g.fillRect(t.x-w/2,t.y-9*U,w*Math.min(1,e.blk/e.mhp),2*U)}
  if(e.lbt>0&&e.lb){g.globalAlpha=Math.min(1,e.lbt*2);tx(e.lb,t.x,t.y-14*U,e.big?'#ff7060':'#f0d8b0','center',13);g.globalAlpha=1}}
 // 自分の頭上
 {const t=scr(p.x,2.25,p.z);bar(t.x-24*U,t.y,48*U,5*U,p.hp/p.mhp,'#4cc060','rgba(0,0,0,.6)');if(p.shield>0){g.fillStyle='#9ad8ff';g.fillRect(t.x-24*U,t.y-3*U,48*U*Math.min(1,p.shield/p.mhp),2.5*U)}}
 // 拾い物の名前
 for(const it of IT){if(it.ty!=='wp'&&it.ty!=='eq'&&it.ty!=='stone')continue;const d=hyp(it.x-p.x,it.z-p.z);const t=scr(it.x,1.5,it.z);if(!t.ok)continue;const c=it.ty==='wp'?WFX[it.v.fx].c==='#d8d8d8'?'#f0e0b0':WFX[it.v.fx].c:'#f0e0b0';
  g.globalAlpha=d<10?1:.55;tx(itName(it),t.x,t.y,it.ty==='wp'&&it.v.star===3?'#ffd23f':c,'center',13);if(d<2.2&&(it.ty==='wp'||it.ty==='eq')){tx(it.ty==='wp'?'F：持ち替える':'F：拾う',t.x,t.y+16*U,'#c8d0e0','center',11)}g.globalAlpha=1}
 // ダメージの数字
 for(const t of TXT){const s=scr(t.x,t.y,t.z);if(!s.ok)continue;g.globalAlpha=Math.min(1,t.t*2.5);const k=t.t>.75?1+(t.t-.75)*2:1;tx(t.s,s.x,s.y,t.c,'center',20*t.sz*k);g.globalAlpha=1}
 // ボスのHP（上）
 if(BOSS&&!BOSS.dead){const w=420*U,x=W/2-w/2;panel(x-8*U,14*U,w+16*U,36*U,.7);tx(BOSS.d.n,W/2,30*U,'#f0d0c0','center',14);bar(x,36*U,w,8*U,BOSS.hp/BOSS.mhp,'#c02840','#2a1014')}}
function drawHUD(){const p=P,pw=470*U,ph=92*U,x0=W/2-pw/2,y0=H-ph-8*U;panel(x0,y0,pw,ph);
 // 顔
 const fi=img(A.ch.pl.img);g.imageSmoothingEnabled=false;g.fillStyle='#1c2030';g.fillRect(x0+8*U,y0+8*U,76*U,76*U);if(fi&&fi.complete){const s=Math.min(72*U/fi.width,72*U/fi.height)*1.25;g.save();g.beginPath();g.rect(x0+8*U,y0+8*U,76*U,76*U);g.clip();g.drawImage(fi,x0+46*U-fi.width*s/2,y0+10*U,fi.width*s,fi.height*s);g.restore()}
 // 技
 const sk=CHR.pl.sk;for(let i=0;i<4;i++){const x=x0+94*U+i*58*U,y=y0+8*U,s=52*U;g.fillStyle='#262a3a';g.fillRect(x,y,s,s);const ic=RIC(sk[i].ic);if(ic&&ic.complete)g.drawImage(ic,x+6*U,y+6*U,s-12*U,s-12*U);
  if(p.cd[i]>0){g.fillStyle='rgba(0,0,0,.62)';g.beginPath();g.moveTo(x+s/2,y+s/2);g.arc(x+s/2,y+s/2,s*.75,-Math.PI/2,-Math.PI/2+Math.PI*2*p.cd[i]/(sk[i].cd*(1-p.cdr)));g.closePath();g.save();g.beginPath();g.rect(x,y,s,s);g.clip();g.beginPath();g.moveTo(x+s/2,y+s/2);g.arc(x+s/2,y+s/2,s*.75,-Math.PI/2,-Math.PI/2+Math.PI*2*p.cd[i]/(sk[i].cd*(1-p.cdr)));g.closePath();g.fill();g.restore();tx(String(Math.ceil(p.cd[i])),x+s/2,y+s/2+8*U,'#fff','center',20)}
  else if(p.mp<sk[i].mp){g.fillStyle='rgba(20,30,80,.5)';g.fillRect(x,y,s,s)}
  tx(sk[i].k,x+3*U,y+12*U,'#f0e0b0','left',11);tx(String(sk[i].mp),x+s-3*U,y+s-3*U,'#8ab8ff','right',10);
  if(MOUSE.ok&&MOUSE.x>x&&MOUSE.x<x+s&&MOUSE.y>y&&MOUSE.y<y+s){panel(x-40*U,y-58*U,190*U,50*U,.92);tx(sk[i].n+'（'+sk[i].k+'）',x-32*U,y-38*U,'#f0d890','left',13);tx(sk[i].d,x-32*U,y-18*U,'#c8d0e0','left',11)}
  btn(x,y,s,s,()=>useSkill(i))}
 // HP・魔力
 const bx=x0+94*U,bw=230*U;bar(bx,y0+66*U,bw,9*U,p.hp/p.mhp,'#40b050');tx(Math.ceil(p.hp)+' / '+p.mhp,bx+bw/2,y0+75*U,'#fff','center',9,0);bar(bx,y0+78*U,bw,6*U,p.mp/p.mmp,'#3a70d0');
 // 装備
 for(let i=0;i<6;i++){const x=x0+336*U+(i%3)*42*U,y=y0+8*U+Math.floor(i/3)*42*U,s=38*U;g.fillStyle='#22263a';g.fillRect(x,y,s,s);const k=p.eq[i];if(k){const ic=RIC(k);if(ic&&ic.complete)g.drawImage(ic,x+3*U,y+3*U,s-6*U,s-6*U);if(MOUSE.ok&&MOUSE.x>x&&MOUSE.x<x+s&&MOUSE.y>y&&MOUSE.y<y+s){panel(x-150*U,y-50*U,220*U,44*U,.92);tx(A.rl[k].n,x-142*U,y-32*U,'#f0d890','left',13);tx(EQ[k][0],x-142*U,y-14*U,'#c8d0e0','left',11)}}}
 // 武器
 const w=p.w;panel(x0,y0-26*U,pw,22*U,.6);tx('武器　'+wName(w)+' '+'★'.repeat(w.star),x0+10*U,y0-10*U,w.star===3?'#ffd23f':WFX[w.fx].c==='#d8d8d8'?'#e8e0d0':WFX[w.fx].c,'left',13);tx('攻撃 '+p.atk+'　速さ '+p.as.toFixed(2)+'　会心 '+Math.round(p.crit*100)+'%',x0+pw-10*U,y0-10*U,'#b8c0d0','right',12);
 // 状態
 let sx=x0;for(const[k,n,c]of[['weak','脆弱','#c08aff'],['vuln','弱体','#c08aff']])if(p.fx[k]){tx(n,sx+4*U,y0-34*U,c,'left',12);sx+=40*U}
 // 右上
 const s=`${AREA.n}　撃破 ${KILLS}　G ${GOLD}`;g.font=FONT(14*U);const tw=g.measureText(s).width+24*U;panel(W-tw-10*U,10*U,tw,28*U,.7);tx(s,W-tw+2*U,29*U,'#f0e6c8','left',14);
 tx(['第一層','第二層','第三層'][STG],W-20*U,56*U,'#a8b0c0','right',12)}
function mmRect(){const w=190*U,h=w*SD/SW;return{x:W-w-12*U,y:H-h-12*U,w,h}}
function mmHit(sx,sy,q){const r=mmRect();if(sx<r.x||sx>r.x+r.w||sy<r.y||sy>r.y+r.h)return 0;if(!q&&P){P.mv={x:((sx-r.x)/r.w*2-1)*SW,z:((sy-r.y)/r.h*2-1)*SD};P.tgt=null}return 1}
function drawMini(){const r=mmRect(),m=(x,z)=>[r.x+(x/SW+1)/2*r.w,r.y+(z/SD+1)/2*r.h];panel(r.x-4*U,r.y-4*U,r.w+8*U,r.h+8*U,.85);g.fillStyle=TM.g[0];g.globalAlpha=.6;g.fillRect(r.x,r.y,r.w,r.h);g.globalAlpha=1;
 if(AREA.path){g.save();g.beginPath();g.rect(r.x,r.y,r.w,r.h);g.clip();const[c0,c1]=m(0,AREA.path.z);g.translate(c0,c1);g.rotate(AREA.path.a);g.fillStyle=TM.p[0];g.fillRect(-r.w,-2.5/SD*r.h/2,r.w*2,5/SD*r.h/2);g.restore()}
 g.fillStyle='rgba(0,0,0,.45)';for(const o of OBS){const[a,b]=m(o.x,o.z);const s=Math.max(2*U,o.r/SW*r.w/2*1.5);g.fillRect(a-s/2,b-s/2,s,s)}
 for(const it of IT)if(it.ty==='wp'||it.ty==='eq'){const[a,b]=m(it.x,it.z);g.fillStyle='#ffd040';g.fillRect(a-2*U,b-2*U,4*U,4*U)}
 for(const e of EN){if(e.dead)continue;const[a,b]=m(e.x,e.z),s=(e.tier===2?7:e.tier?5:3.5)*U;g.fillStyle=e.tier===2?'#ff3060':e.tier?'#ff9040':'#e03030';g.fillRect(a-s/2,b-s/2,s,s)}
 if(PORTAL){const[a,b]=m(PORTAL.x,PORTAL.z);g.fillStyle='#9fd0ff';g.fillRect(a-4*U,b-4*U,8*U,8*U)}
 const[px,pz]=m(P.x,P.z);g.fillStyle='#50ff80';g.fillRect(px-3*U,pz-3*U,6*U,6*U);
 // 見えている範囲
 const cs=[[0,0],[W,0],[W,H],[0,H]].map(([x,y])=>ground(x,y)).filter(Boolean);if(cs.length===4){g.strokeStyle='rgba(255,255,255,.8)';g.lineWidth=1.2*U;g.beginPath();cs.forEach((c,i)=>{const[a,b]=m(cl(c.x,-SW,SW),cl(c.z,-SD,SD));i?g.lineTo(a,b):g.moveTo(a,b)});g.closePath();g.stroke()}}
function drawEnd(t,s){panel(0,0,W,H,.6);tx(t,W/2,H/2-60*U,MODE==='win'?'#ffd23f':'#e05050','center',40);if(s)tx(s,W/2,H/2-24*U,'#d0c8c0','center',16);
 tx(`到達　${['第一層','第二層','第三層'][STG]} ${AREA.n}　　撃破 ${KILLS}　　G ${GOLD}`,W/2,H/2+14*U,'#e8e0d0','center',16);tx('武器　'+wName(P.w)+' '+'★'.repeat(P.w.star),W/2,H/2+42*U,'#c8c0b0','center',14);
 const n=P.eq.length;P.eq.forEach((k,i)=>{const ic=RIC(k);if(ic&&ic.complete)g.drawImage(ic,W/2+(i-n/2)*40*U,H/2+56*U,34*U,34*U)});
 tx('クリックで最初から',W/2,H/2+124*U,'#fff','center',16)}
function drawTitle(){g.fillStyle='#090b12';g.fillRect(0,0,W,H);const fi=img(A.ch.pl.img);g.imageSmoothingEnabled=false;
 const ks=['pl','si','sm','nn','hori','neb','seres'];ks.forEach((k,i)=>{const im=img(A.ch[k].img);if(!im||!im.complete)return;const s=1.3*U,x=W/2+(i-3)*120*U;g.globalAlpha=k==='pl'?1:.35;g.drawImage(im,x-im.width*s/2,H*.62-im.height*s,im.width*s,im.height*s);g.globalAlpha=1});
 tx('戦場（仮題）',W/2,H*.2,'#f0e6c8','center',42);tx('Card Trail の層を、自分の足で越えていく',W/2,H*.2+34*U,'#a8b0c0','center',15);
 tx('クリックで開始',W/2,H*.75,(T*2|0)%2?'#fff':'#c8c0b0','center',20);
 tx('右クリック／左クリック：移動・攻撃　Q W E R：技　F：武器を拾う　矢印キー：移動　Esc：一時停止　M：音',W/2,H*.75+40*U,'#8890a0','center',12);
 tx('今はユウキングだけ（ほかのキャラは後で）',W/2,H*.75+62*U,'#6a7080','center',11)}

/* ===== 回す ===== */
let last=performance.now();function loop(now){const dt=Math.min(.05,(now-last)/1000);last=now;let d=dt;if(HS>0){HS-=dt;d=dt*.08}update(d);if(MODE!=='title'&&P&&P.sp)sync(d);else{cam.position.set(0,20,14);cam.lookAt(0,0,0)}rd.render(scene,cam);drawUI();requestAnimationFrame(loop)}
requestAnimationFrame(loop);
// テスト用に外から触れるようにする
window.GM={get P(){return P},get EN(){return EN},get IT(){return IT},get MODE(){return MODE},set MODE(v){MODE=v},newRun,update,useSkill,summonBoss,startStage,pickUp,drop,mkWeapon,get STG(){return STG},set STG(v){STG=v},get BOSS(){return BOSS},get PORTAL(){return PORTAL},cmdAt};
