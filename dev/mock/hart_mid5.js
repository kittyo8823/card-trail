// 細かさ「2」の見本5枚（兜割り・鉄壁・大回転・粉砕・魔の力）。hart_mid.js の hmMk / HMP を使う
const HPAL=['#0e0d12','#17151e','#211e2a','#2c2836','#3a3442','#4e4250','#6a5458','#8a6a5e','#a8846c','#c8a888','#e2ccae',
 '#2a3038','#3c4450','#5a6272','#848c9a','#b4b8c0','#dcdee0','#5a4424','#8a6c34','#b8984e','#2e1e14','#4a3220','#6a4a30',
 '#3a1414','#5a1e1c','#7e2a24','#a63a2c','#c8583a','#2a3426','#3e4a34','#283a40','#3a5058','#5a7078','#d8c8b0'];
const hLine=(g,x1,y1,x2,y2,c,w)=>{g.strokeStyle=c;g.lineWidth=w||1;g.beginPath();g.moveTo(x1,y1);g.lineTo(x2,y2);g.stroke()};
const hGlow=(g,x,y,r,c,a)=>{const q=g.createRadialGradient(x,y,.5,x,y,r);q.addColorStop(0,c.replace('A',a));q.addColorStop(1,c.replace('A',0));g.fillStyle=q;g.fillRect(x-r,y-r,r*2,r*2)};
const hSparks=(g,x,y,L)=>{for(const[a,l]of L)hLine(g,x+Math.cos(a)*3,y+Math.sin(a)*3,x+Math.cos(a)*(3+l),y+Math.sin(a)*(3+l),'#e2ccae',.8)};
// 兜割り：振り下ろされた剣が角付きの兜を割る
const artKabuto=()=>hmMk(HPAL,(g,W,H)=>{let q=g.createLinearGradient(0,0,0,H);q.addColorStop(0,'#211e2a');q.addColorStop(1,'#5a1e1c');g.fillStyle=q;g.fillRect(0,0,W,H);
 hGlow(g,38,22,26,'rgba(168,132,108,A)',.35);
 // 兜（鉄の丸い鉢・角・のぞき穴）
 g.save();g.translate(37,31);HMP(g,[[-16,8],[-15,-2],[-10,-9],[0,-12],[10,-9],[15,-2],[16,8]],'#3c4450');HMP(g,[[-15,-2],[-10,-9],[0,-12],[0,8],[-16,8]],'#5a6272');g.fillStyle='#848c9a';g.fillRect(-9,-8,6,1);g.fillStyle='#17151e';g.fillRect(-12,1,24,2);g.fillStyle='#2a3038';g.fillRect(-1,-12,2,20);
 for(const d of[-1,1]){g.fillStyle='#c8a888';g.beginPath();g.moveTo(d*14,-3);g.quadraticCurveTo(d*24,-6,d*26,-18);g.quadraticCurveTo(d*21,-8,d*14,1);g.fill();g.fillStyle='#8a6a5e';g.beginPath();g.moveTo(d*15,0);g.quadraticCurveTo(d*22,-4,d*25,-14);g.lineTo(d*24,-12);g.quadraticCurveTo(d*20,-5,d*14,1);g.fill()}
 // 割れ目
 g.strokeStyle='#0e0d12';g.lineWidth=1.2;g.beginPath();g.moveTo(2,-12);g.lineTo(0,-7);g.lineTo(3,-3);g.lineTo(0,2);g.lineTo(2,8);g.stroke();g.strokeStyle='#848c9a';g.lineWidth=.5;g.beginPath();g.moveTo(3,-12);g.lineTo(1,-7);g.lineTo(4,-3);g.stroke();g.restore();
 // 剣（右上から）
 g.save();g.translate(39,18);g.rotate(-2.3);HMP(g,[[2,-2.6],[50,-2.4],[50,2.4],[2,2.6]],'#5a6272');HMP(g,[[2,-2.6],[50,-2.4],[50,0],[2,0]],'#b4b8c0');g.fillStyle='#dcdee0';g.fillRect(8,-2.6,22,.8);HMP(g,[[46,-8],[49,-8],[49,8],[46,8]],'#8a6c34');g.restore();
 hGlow(g,39,19,9,'rgba(226,204,174,A)',.8);hSparks(g,39,19,[[-.3,6],[.4,5],[-1.2,4],[2.8,5],[3.6,4],[-2.2,4]]);
 for(let i=0;i<6;i++){g.fillStyle='#848c9a';g.fillRect(24+i*5,16+((i*7)%5),1,1)}});
// 鉄壁：地面に突き立てた大盾。矢が刺さって止まっている
const artTeppeki=()=>hmMk(HPAL,(g,W,H)=>{let q=g.createLinearGradient(0,0,0,H);q.addColorStop(0,'#2c2836');q.addColorStop(.7,'#3a5058');q.addColorStop(1,'#283a40');g.fillStyle=q;g.fillRect(0,0,W,H);
 g.fillStyle='#2e1e14';g.fillRect(0,36,W,8);g.fillStyle='#4a3220';for(let i=0;i<W;i+=3)g.fillRect(i,36+((i*5)%3),2,1);
 // 飛んでくる矢の筋
 for(const[y,x]of[[10,2],[18,6],[26,0]])hLine(g,x,y,x+12,y+1,'rgba(200,180,150,.35)',.6);
 // 大盾（上が丸い長方形・鉄の帯・鋲・下の杭）
 const L=24,R=50,T=4,B=40;HMP(g,[[L,B],[L,T+6],[L+4,T+1],[37,T],[R-4,T+1],[R,T+6],[R,B]],'#4a3220');g.save();g.beginPath();g.moveTo(L,B);g.lineTo(L,T+6);g.lineTo(L+4,T+1);g.lineTo(37,T);g.lineTo(R-4,T+1);g.lineTo(R,T+6);g.lineTo(R,B);g.closePath();g.clip();
 for(let x=L;x<R;x+=5){g.fillStyle='#6a4a30';g.fillRect(x+1,T,2,B);g.fillStyle='#2e1e14';g.fillRect(x+4,T,1,B)}g.fillStyle='rgba(14,13,18,.35)';g.fillRect(40,T,R-40,B);g.restore();
 for(const y of[9,22,34]){g.fillStyle='#3c4450';g.fillRect(L,y,R-L,3);g.fillStyle='#848c9a';g.fillRect(L,y,R-L,1);for(let x=L+2;x<R;x+=6){g.fillStyle='#b4b8c0';g.fillRect(x,y+1,1,1)}}
 HMP(g,[[L,T+6],[L+4,T+1],[37,T],[37,T+2],[L+5,T+3],[L+2,T+7]],'#848c9a');
 // 刺さった矢
 for(const[x,y,a]of[[30,15,3.0],[44,27,3.25],[35,30,2.9]]){const ex=x+Math.cos(a)*12,ey=y+Math.sin(a)*12;hLine(g,x,y,ex,ey,'#8a6a5e',1);g.fillStyle='#c8a888';g.fillRect(ex-1,ey-1,2,1);g.fillRect(ex-1,ey+1,2,1);g.fillStyle='#17151e';g.fillRect(x-.5,y-.5,1.5,1.5)}
 // 土ぼこり
 for(let i=0;i<10;i++){g.fillStyle='rgba(138,106,94,.6)';g.beginPath();g.ellipse(18+i*4,39,4,1.6,0,0,7);g.fill()}});
// 大回転：ユウキングが剣を振って回る。体の周りに大きな輪の軌跡
const artDaikaiten=()=>hmMk(HPAL,(g,W,H)=>{let q=g.createLinearGradient(0,0,0,H);q.addColorStop(0,'#17151e');q.addColorStop(1,'#3e4a34');g.fillStyle=q;g.fillRect(0,0,W,H);
 g.fillStyle='#2a3426';g.fillRect(0,36,W,8);
 const cx=37,cy=26;
 // 後ろ側の軌跡
 g.strokeStyle='#6a5458';g.lineWidth=2;g.beginPath();g.ellipse(cx,cy+2,30,8,-.08,Math.PI,Math.PI*2);g.stroke();
 // 騎士（四角い大兜・赤い羽根飾り・白銀の鎧・赤い外套）
 HMP(g,[[cx-6,cy-6],[cx-10,cy+10],[cx-3,cy+8]],'#7e2a24');
 HMP(g,[[cx-4,cy-4],[cx+4,cy-4],[cx+5,cy+6],[cx-5,cy+6]],'#b4b8c0');HMP(g,[[cx,cy-4],[cx+4,cy-4],[cx+5,cy+6],[cx,cy+6]],'#848c9a');g.fillStyle='#a63a2c';g.fillRect(cx-1,cy-3,2,7);g.fillRect(cx-3,cy-1,6,2);
 HMP(g,[[cx-4,cy+6],[cx-1,cy+6],[cx-2,cy+12],[cx-5,cy+12]],'#848c9a');HMP(g,[[cx+1,cy+6],[cx+4,cy+6],[cx+6,cy+12],[cx+3,cy+12]],'#5a6272');
 HMP(g,[[cx-3,cy-11],[cx+3,cy-11],[cx+3,cy-4],[cx-3,cy-4]],'#b4b8c0');g.fillStyle='#17151e';g.fillRect(cx-1,cy-8,4,1);g.fillStyle='#848c9a';g.fillRect(cx+1,cy-11,2,7);
 HMP(g,[[cx-1,cy-11],[cx-8,cy-15],[cx-12,cy-12],[cx-5,cy-10]],'#a63a2c');
 // 腕と剣（右へ水平に振り抜く）
 HMP(g,[[cx+3,cy-2],[cx+9,cy-1],[cx+9,cy+1],[cx+3,cy+1]],'#b4b8c0');g.fillStyle='#8a6c34';g.fillRect(cx+9,cy-3,1.5,6);HMP(g,[[cx+10,cy-1],[cx+34,cy-.6],[cx+34,cy+.8],[cx+10,cy+1]],'#b4b8c0');g.fillStyle='#dcdee0';g.fillRect(cx+12,cy-1,16,.6);
 // 手前側の軌跡（振り抜いた所ほど明るい）
 for(let a=0;a<=Math.PI;a+=.02){const t=1-a/Math.PI,x=cx+Math.cos(a)*30,y=cy+2+Math.sin(a)*8;g.globalAlpha=.25+t*.7;g.fillStyle=t>.7?'#e2ccae':t>.4?'#c8a888':'#8a6a5e';g.fillRect(x,y,1.4,1.4+t)}g.globalAlpha=1;
 hGlow(g,cx+34,cy,7,'rgba(226,204,174,A)',.5);
 // 舞う土ぼこり
 for(let i=0;i<14;i++){const a=i/14*6.28,x=cx+Math.cos(a)*(26+(i%3)*3),y=37+Math.sin(a)*2.5;g.fillStyle='#6a5458';g.fillRect(x,y,2,1)}});
// 粉砕：巨大な大剣が地面に叩きつけられ、地面が砕けて石が飛ぶ
const artFunsai=()=>hmMk(HPAL,(g,W,H)=>{let q=g.createLinearGradient(0,0,0,H);q.addColorStop(0,'#211e2a');q.addColorStop(1,'#4e4250');g.fillStyle=q;g.fillRect(0,0,W,H);
 hGlow(g,37,32,30,'rgba(200,168,136,A)',.3);
 // 衝撃の横に走る線
 for(const[y,l]of[[30,26],[33,32],[27,18]]){hLine(g,37-l,y,37-8,y,'rgba(200,168,136,.45)',.7);hLine(g,37+8,y,37+l,y,'rgba(200,168,136,.45)',.7)}
 // 割れた地面
 g.fillStyle='#2c2836';g.fillRect(0,33,W,11);for(const[x,w,h,c]of[[22,9,4,'#4e4250'],[32,7,6,'#3a3442'],[42,10,5,'#4e4250'],[12,8,3,'#3a3442'],[54,8,3,'#3a3442']]){HMP(g,[[x,33],[x+w,33-h*.4],[x+w-1,33+h*.6],[x+1,33+h]],c);g.fillStyle='#6a5458';g.fillRect(x,33-h*.4+.5,w*.6,.8)}
 g.strokeStyle='#0e0d12';g.lineWidth=.8;for(const a of[-2.8,-2.2,-.9,-.3,3.0]){g.beginPath();g.moveTo(37,36);g.lineTo(37+Math.cos(a)*-20,36+Math.abs(Math.sin(a))*7);g.stroke()}
 // 大剣（ほぼ垂直に突き刺さる、幅広の刃）
 g.save();g.translate(38,34);g.rotate(-1.48);HMP(g,[[0,-5],[30,-5],[34,-3.5],[34,3.5],[30,5],[0,5]],'#5a6272');HMP(g,[[0,-5],[30,-5],[34,-3.5],[34,0],[0,0]],'#b4b8c0');g.fillStyle='#848c9a';g.fillRect(2,-1,30,1.2);g.fillStyle='#dcdee0';g.fillRect(6,-5,18,1);
 HMP(g,[[34,-12],[38,-12],[38,12],[34,12]],'#8a6c34');g.fillStyle='#b8984e';g.fillRect(34,-12,1.2,24);HMP(g,[[38,-2.5],[48,-2.5],[48,2.5],[38,2.5]],'#4a3220');g.fillStyle='#2e1e14';for(let k=39;k<48;k+=2.6)g.fillRect(k,-2.5,.9,5);g.restore();
 // 飛び散る石
 for(const[x,y,s]of[[18,22,2.5],[26,16,2],[50,18,2.5],[58,25,2],[12,28,1.6],[63,14,1.5],[30,24,1.4],[46,12,1.6]]){HMP(g,[[x,y-s],[x+s,y],[x+s*.4,y+s],[x-s,y+s*.3]],'#6a5458');g.fillStyle='#8a6a5e';g.fillRect(x-s*.5,y-s*.6,s*.8,.8)}
 for(let i=0;i<12;i++){g.fillStyle='rgba(138,106,94,.55)';g.beginPath();g.ellipse(10+i*5,34-((i*3)%4),4,2,0,0,7);g.fill()}});
// 魔の力：握りしめた籠手の拳から、赤黒い力が煙のように立ちのぼる
const artManochikara=()=>hmMk(HPAL,(g,W,H)=>{let q=g.createRadialGradient(37,26,2,37,26,44);q.addColorStop(0,'#3a1414');q.addColorStop(1,'#0e0d12');g.fillStyle=q;g.fillRect(0,0,W,H);
 // 立ちのぼる煙
 for(let k=0;k<7;k++){const x0=26+k*3.5;g.strokeStyle=k%2?'#5a1e1c':'#3a1414';g.lineWidth=3-k%2;g.beginPath();g.moveTo(x0,26);g.bezierCurveTo(x0+Math.sin(k)*6,16,x0-Math.cos(k)*7,8,x0+Math.sin(k*2)*5,-2);g.stroke()}
 hGlow(g,37,24,16,'rgba(166,58,44,A)',.5);
 // 籠手の拳（指の節・手甲の板・手首の帯）
 g.save();g.translate(37,28);HMP(g,[[-10,-6],[9,-7],[11,-2],[11,6],[7,10],[-8,10],[-11,4]],'#3c4450');HMP(g,[[-10,-6],[9,-7],[10,-3],[-11,-1]],'#848c9a');
 for(let k=0;k<4;k++){const x=-9+k*5;HMP(g,[[x,-7],[x+4.5,-7.5],[x+4.5,-2.5],[x,-2]],'#5a6272');g.fillStyle='#b4b8c0';g.fillRect(x+.5,-7.2,3.5,1)}
 HMP(g,[[-11,-1],[-6,-3],[-5,3],[-10,5]],'#5a6272');g.fillStyle='#848c9a';g.fillRect(-10,-1,4,1);
 g.fillStyle='#2a3038';g.fillRect(-8,2,16,1);g.fillRect(-8,6,16,1);HMP(g,[[-8,10],[7,10],[8,16],[-9,16]],'#2a3038');g.fillStyle='#5a6272';g.fillRect(-8,11,15,1);
 // 籠手の継ぎ目から漏れる赤い光
 g.strokeStyle='#c8583a';g.lineWidth=.7;g.beginPath();g.moveTo(-6,0);g.lineTo(-2,1.5);g.lineTo(3,0);g.lineTo(7,2);g.stroke();g.beginPath();g.moveTo(-4,4);g.lineTo(2,5);g.stroke();g.restore();
 // 舞う火の粉
 for(const[x,y]of[[22,12],[50,10],[30,6],[46,18],[56,22],[18,20],[42,4]]){g.fillStyle='#c8583a';g.fillRect(x,y,1,1);g.fillStyle='#7e2a24';g.fillRect(x,y+1,1,1)}});
