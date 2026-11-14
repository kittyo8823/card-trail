// 細かさ3＋はっきりした絵の見本（追加しない）：148x88・1ドット1画素。平たい色＋2〜3段の影＋暗い輪郭、光のにじみ・霧・ディザなし
const CL3={};
function mk3(f){const w=148,h=88,c=document.createElement('canvas');c.width=w;c.height=h;const g=c.getContext('2d');f(g);
 const d=g.getImageData(0,0,w,h),a=d.data,P=HMPP;for(let i=0;i<a.length;i+=4){let b=0,bd=1e9;for(let k=0;k<P.length;k++){const p=P[k],e=(a[i]-p[0])**2*.3+(a[i+1]-p[1])**2*.59+(a[i+2]-p[2])**2*.11;if(e<bd){bd=e;b=k}}a[i]=P[b][0];a[i+1]=P[b][1];a[i+2]=P[b][2];a[i+3]=255}g.putImageData(d,0,0);return c}
const q3=(g,pts,c,o)=>{g.beginPath();pts.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]));g.closePath();g.fillStyle=c;g.fill();if(o){g.strokeStyle=o;g.lineWidth=1.4;g.lineJoin='round';g.stroke()}};
const l3=(g,x1,y1,x2,y2,c,w)=>{g.strokeStyle=c;g.lineWidth=w||1;g.lineCap='round';g.beginPath();g.moveTo(x1,y1);g.lineTo(x2,y2);g.stroke()};
const e3=(g,x,y,rx,ry,c,o)=>{g.beginPath();g.ellipse(x,y,rx,ry,0,0,7);g.fillStyle=c;g.fill();if(o){g.strokeStyle=o;g.lineWidth=1.4;g.stroke()}};
const band=(g,cs,ys)=>{cs.forEach((c,i)=>{g.fillStyle=c;g.fillRect(0,ys[i],148,(ys[i+1]||88)-ys[i])})};
const spk=(g,x,y,n,r1,r2,c)=>{for(let i=0;i<n;i++){const a=i/n*6.283+.3;l3(g,x+Math.cos(a)*r1,y+Math.sin(a)*r1,x+Math.cos(a)*r2,y+Math.sin(a)*r2,c,1.4)}};
const OL='#17151e';
// 斬撃：昼の草原。角の生えた獣人が白い三日月の斬撃で斬られ、のけぞる
CL3['斬撃']=g=>{band(g,['#5a78b0','#86a0a4','#b4b8c0'],[0,30,48]);
 q3(g,[[0,60],[20,50],[44,56],[70,46],[100,54],[126,44],[148,52],[148,88],[0,88]],'#3e4a34');g.fillStyle='#5a6a48';g.fillRect(0,66,148,22);g.fillStyle='#4a7a34';for(let x=0;x<148;x+=6)q3(g,[[x,66],[x+3,62],[x+6,66]],'#4a7a34');
 g.fillStyle='#3e4a34';g.fillRect(0,80,148,8);
 // 獣人（右、のけぞる）
 const X=100,Y=76;q3(g,[[X-6,Y],[X-8,Y-14],[X-2,Y-14],[X,Y]],'#4e4250',OL);q3(g,[[X+4,Y],[X+2,Y-14],[X+8,Y-14],[X+12,Y]],'#3a3442',OL);
 q3(g,[[X-12,Y-14],[X+12,Y-14],[X+16,Y-36],[X-4,Y-40],[X-14,Y-32]],'#6a5458',OL);q3(g,[[X+2,Y-14],[X+12,Y-14],[X+16,Y-36],[X+4,Y-38]],'#4e4250');
 q3(g,[[X-14,Y-30],[X-26,Y-38],[X-28,Y-34],[X-16,Y-24]],'#6a5458',OL);q3(g,[[X+14,Y-32],[X+26,Y-44],[X+28,Y-40],[X+16,Y-26]],'#4e4250',OL);
 e3(g,X+4,Y-46,9,8,'#6a5458',OL);q3(g,[[X-2,Y-52],[X-10,Y-64],[X+1,Y-54]],'#e2ccae',OL);q3(g,[[X+8,Y-53],[X+12,Y-66],[X+11,Y-52]],'#c8a888',OL);
 e3(g,X-1,Y-46,2,1.4,'#e8b070');g.fillStyle=OL;g.fillRect(X-3,Y-42,6,1.4);
 // 白い三日月の斬撃
 g.beginPath();g.moveTo(14,74);g.quadraticCurveTo(70,18,138,26);g.quadraticCurveTo(76,30,20,78);g.closePath();g.fillStyle='#dcdee0';g.fill();
 g.beginPath();g.moveTo(30,66);g.quadraticCurveTo(76,26,136,27);g.quadraticCurveTo(80,29,34,67);g.closePath();g.fillStyle='#ffffff';g.fill();
 l3(g,16,76,22,70,'#86a0a4',1);spk(g,96,36,9,6,13,'#ffffff');e3(g,96,36,4,4,'#ffffff')};
// ナイフ投げ：夜の屋根。手前を3本のナイフが飛び、向こうの屋根の上の盗賊の影の肩に1本刺さる
CL3['ナイフ投げ']=g=>{band(g,['#17151e','#1e2a5a','#2a2a44'],[0,26,50]);e3(g,120,18,10,10,'#dcdee0');e3(g,124,15,3,3,'#b4b8c0');
 for(let i=0;i<20;i++){g.fillStyle='#b4b8c0';g.fillRect((i*37)%148,(i*13)%40,1,1)}
 for(const[x,w,h]of[[0,30,26],[28,22,34],[48,30,22],[78,20,30],[96,28,24],[122,26,32]]){q3(g,[[x,88-h],[x+w/2,80-h],[x+w,88-h],[x+w,88],[x,88]],'#0e0d12');for(let k=0;k<2;k++){g.fillStyle='#d8902e';g.fillRect(x+5+k*9,96-h,3,3)}}
 // 盗賊の影（屋根の上）
 const X=112,Y=58;q3(g,[[X-7,Y],[X-5,Y-16],[X-8,Y-20],[X+8,Y-20],[X+5,Y-16],[X+7,Y]],'#2c2836',OL);e3(g,X,Y-24,5,5.4,'#2c2836',OL);q3(g,[[X-5,Y-26],[X,Y-32],[X+5,Y-26]],'#2c2836');e3(g,X-2,Y-24,1.2,.8,'#c8583a');
 g.save();g.translate(X-5,Y-17);g.rotate(.4);q3(g,[[-10,-1.4],[0,-1.4],[0,1.4],[-10,1.4]],'#b4b8c0',OL);g.restore();spk(g,X-5,Y-17,6,3,7,'#e8b070');
 // 飛ぶナイフ3本（大きく手前）
 for(const[x,y,s]of[[30,52,1.6],[62,36,1.2],[16,30,1]]){l3(g,x-40*s,y+8*s,x-6*s,y+1*s,'rgba(220,222,224,.55)',1);l3(g,x-30*s,y+10*s,x-8*s,y+4*s,'rgba(220,222,224,.35)',1);
  g.save();g.translate(x,y);g.rotate(-.2);q3(g,[[0,-3*s],[22*s,0],[0,3*s]],'#dcdee0',OL);q3(g,[[0,0],[22*s,0],[0,3*s]],'#848c9a');g.fillStyle='#8a6c34';g.fillRect(-2*s,-5*s,2*s,10*s);q3(g,[[-12*s,-2*s],[-2*s,-2*s],[-2*s,2*s],[-12*s,2*s]],'#4a3220',OL);for(let k=0;k<3;k++)l3(g,(-10+k*3)*s,-2*s,(-9+k*3)*s,2*s,'#2e1e14',1);g.restore()}};
// 月影・朧斬り：竹林の満月、斜めに斬られた竹の上半分がずれ落ち、月を細い一閃が横切る
CL3['月影・朧斬り']=g=>{band(g,['#0e0d12','#1e2a5a','#283a40'],[0,30,60]);e3(g,84,34,20,20,'#dcdee0');e3(g,90,40,4,4,'#b4b8c0');e3(g,78,28,3,3,'#b4b8c0');
 const bam=(x,w,c,d,cut)=>{for(let y=0;y<88;y+=16){g.fillStyle=c;g.fillRect(x,y,w,15);g.fillStyle=d;g.fillRect(x+w-2,y,2,15);g.fillStyle='#0e0d12';g.fillRect(x-1,y+15,w+2,1.4)}if(cut){g.save();g.beginPath();g.moveTo(x-2,0);g.lineTo(x+w+2,0);g.lineTo(x+w+2,cut-3);g.lineTo(x-2,cut+3);g.closePath();g.clip();g.fillStyle='#283a40';g.fillRect(x-2,0,w+4,cut+4);g.translate(5,-4);g.rotate(.12);for(let y=-16;y<cut;y+=16){g.fillStyle=c;g.fillRect(x,y,w,15);g.fillStyle=d;g.fillRect(x+w-2,y,2,15)}g.restore();l3(g,x-3,cut+3,x+w+3,cut-3,'#ffffff',1)}};
 bam(6,8,'#4a7a34','#2e5a2a');bam(26,6,'#3e4a34','#2a3426',40);bam(46,9,'#4a7a34','#2e5a2a',50);bam(118,7,'#4a7a34','#2e5a2a',36);bam(134,6,'#3e4a34','#2a3426');
 g.fillStyle='#17151e';g.fillRect(0,80,148,8);
 l3(g,0,58,148,26,'#ffffff',1.6);l3(g,10,57,140,28,'#86a0a4',.8);
 for(const[x,y,a]of[[66,70,.6],[96,62,-.4],[30,74,1.2],[120,70,.2]]){g.save();g.translate(x,y);g.rotate(a);q3(g,[[0,0],[5,-2],[10,0],[5,2]],'#5a6a48',OL);g.restore()}};
// 火球の頁：夜の路地。浮かぶ本から大きな火の玉が飛び、粘液の魔物に迫る
CL3['火球の頁']=g=>{g.fillStyle='#17151e';g.fillRect(0,0,148,88);for(let y=0;y<66;y+=8)for(let x=(y/8)%2*10;x<148;x+=20){g.fillStyle='#2c2836';g.fillRect(x+1,y+1,18,6)}g.fillStyle='#3a3442';g.fillRect(0,66,148,22);for(let x=0;x<148;x+=16)l3(g,x,66,x-6,88,'#2c2836',1);
 // 魔物（右）
 q3(g,[[104,72],[108,52],[118,42],[130,44],[138,56],[142,72]],'#4a7a34',OL);q3(g,[[124,44],[130,44],[138,56],[142,72],[126,72]],'#2e5a2a');e3(g,116,56,4,5,'#f2dccc',OL);e3(g,117,57,2,2.4,OL);e3(g,128,55,3,4,'#f2dccc',OL);e3(g,129,56,1.4,2,OL);q3(g,[[112,66],[132,66],[128,70],[116,70]],'#17151e');
 // 本（左）
 g.save();g.translate(24,46);g.rotate(-.15);q3(g,[[-16,0],[0,4],[0,-8],[-16,-12]],'#e2ccae',OL);q3(g,[[16,0],[0,4],[0,-8],[16,-12]],'#f2dccc',OL);q3(g,[[-17,1],[0,6],[17,1],[17,3],[0,8],[-17,3]],'#58161e',OL);for(let k=0;k<3;k++){l3(g,-13,-8+k*3,-3,-5+k*3,'#8a6a5e',1);l3(g,3,-5+k*3,13,-8+k*3,'#8a6a5e',1)}g.restore();
 // 火の玉（層を重ねた炎、尾は分かれた舌）
 const fx=78,fy=40;for(const[c,s]of[['#7e2a24',1],['#c8583a',.8],['#d88a48',.6],['#e8b070',.4]]){q3(g,[[fx+16*s,fy],[fx+8*s,fy-12*s],[fx-10*s,fy-14*s],[fx-34*s,fy-8*s],[fx-24*s,fy-2*s],[fx-44*s,fy+2*s],[fx-22*s,fy+6*s],[fx-30*s,fy+14*s],[fx-8*s,fy+13*s],[fx+8*s,fy+11*s]],c,s===1?OL:null)}e3(g,fx+4,fy,5,4,'#f2dccc');
 for(let i=0;i<6;i++){g.fillStyle=i%2?'#e8b070':'#d88a48';g.fillRect(40+i*7,30+(i*7)%22,2,2)}};
// ベンチプレス：見上げ。ジムの照明を背に、たわむバーベル。プレートの重さが分かる大きさ
CL3['ベンチプレス']=g=>{band(g,['#17151e','#2a3426','#3e4a34'],[0,30,62]);for(let i=0;i<4;i++){g.fillStyle='#dcdee0';g.fillRect(8+i*38,4,22,3);q3(g,[[8+i*38,7],[30+i*38,7],[36+i*38,30],[2+i*38,30]],'rgba(220,230,180,.15)')}
 g.fillStyle='#211e2a';g.fillRect(0,72,148,16);q3(g,[[40,88],[48,66],[100,66],[108,88]],'#2c2836',OL);
 // バー（たわむ）
 g.strokeStyle=OL;g.lineWidth=5;g.beginPath();g.moveTo(14,36);g.quadraticCurveTo(74,48,134,36);g.stroke();g.strokeStyle='#b4b8c0';g.lineWidth=3;g.stroke();g.strokeStyle='#dcdee0';g.lineWidth=1;g.beginPath();g.moveTo(14,35);g.quadraticCurveTo(74,47,134,35);g.stroke();
 for(const[x,d]of[[30,-1],[118,1]])for(let k=0;k<3;k++){const xx=x+d*k*6,hh=26-k*5;q3(g,[[xx-3,36-hh],[xx+3,36-hh],[xx+3,36+hh],[xx-3,36+hh]],k%2?'#3a3442':'#211e2a',OL);g.fillStyle='#5a6272';g.fillRect(xx-2,37-hh,1.4,hh*2-2)}
 for(const x of[22,126]){g.fillStyle='#848c9a';g.fillRect(x-3,30,6,12)}
 for(let i=0;i<14;i++){g.fillStyle='#dcdee0';g.fillRect(50+(i*13)%48,40+(i*7)%22,1.4,1.4)}};
