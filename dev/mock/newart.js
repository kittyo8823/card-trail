// カードの絵・新方針の見本（追加しない）：名前の物を真ん中に置くのでなく「その瞬間の場面」を描く。手は描かない。構図をカードごとに変える（引き・見上げ・真上・寄り・遠景の人影）
const NA={};
const nGr=(g,x0,y0,x1,y1,cs)=>{const q=g.createLinearGradient(x0,y0,x1,y1);cs.forEach((c,i)=>q.addColorStop(i/(cs.length-1),c));return q};
const nSky=(g,cs)=>{g.fillStyle=nGr(g,0,0,0,44,cs);g.fillRect(0,0,74,44)};
// ユウキング：薙ぎ払い（引きの構図：夕暮れの戦場、横一文字の軌跡に敵の影がまとめて吹き飛ぶ）
// ユウキング：鋼の肉体（見上げ：嵐の中に立つ鎧の大きな影、矢が当たって火花を散らし折れて落ちる）
// 坂井：ナイフの雨（真上から：石畳に影を落として降り注ぎ、刺さる刃）
NA['ナイフの雨']=g=>{g.fillStyle='#3a3442';g.fillRect(0,0,74,44);for(let y=0;y<44;y+=6)for(let x=(y/6)%2*4;x<74;x+=8){g.fillStyle=(x+y)%3?'#4e4250':'#443a48';g.fillRect(x+.5,y+.5,7,5)}
 hG(g,37,22,30,'90,40,110',.35);
 for(let i=0;i<14;i++){const x=6+(i*29)%64,y=5+(i*17)%36,s=.6+(i%3)*.25,st=i%3===0;
  // 影（細長い楕円）
  g.save();g.translate(x+3*s,y+2*s);g.rotate(.6);g.fillStyle='rgba(14,13,18,.5)';g.fillRect(-1,-5*s,2,10*s);g.restore();
  if(st){fxSparks(g,x,y,5,2.6,'#dcdee0');g.fillStyle='#17151e';g.fillRect(x-1,y-1,2.4,2.4);g.fillStyle='#b4b8c0';g.fillRect(x-.5,y-.5,1.4,1.4);hL(g,x-3,y+1,x+3,y-1,'#5a4424',.7)}
  else{g.save();g.translate(x,y);g.rotate(.6);hP(g,[[0,-4*s],[1.4*s,1],[0,3*s],[-1.4*s,1]],'#dcdee0');hP(g,[[0,-4*s],[1.4*s,1],[0,1.4*s]],'#848c9a');g.fillStyle='#5a4424';g.fillRect(-1.6*s,2.6*s,3.2*s,1);g.restore()}}
 for(let i=0;i<20;i++){g.fillStyle='rgba(220,222,224,.25)';g.fillRect((i*37)%74,(i*23)%44,.6,3)}
 for(const[x,y,s]of[[16,14,2.6],[50,10,3],[34,30,2.2]]){g.save();g.translate(x+6,y+4);g.rotate(.6);g.fillStyle='rgba(14,13,18,.45)';g.fillRect(-1.6,-5*s,3.2,10*s);g.restore();g.save();g.translate(x,y);g.rotate(.6);hP(g,[[0,-4*s],[1.4*s,1],[0,3*s],[-1.4*s,1]],'#dcdee0');hP(g,[[0,-4*s],[1.4*s,1],[0,1.4*s]],'#848c9a');g.fillStyle='#5a4424';g.fillRect(-1.6*s,2.6*s,3.2*s,1.4);g.fillStyle='#6a3e8e';g.fillRect(-.5*s,3.4*s,s,2.6*s);g.restore()}};
// 坂井：毒の雲（引き：夜の沼地に紫の霧が這い、霧の奥で光る二つの目）
NA['毒の雲']=g=>{nSky(g,['#0e0d12','#2a2a44','#3e3e66']);g.fillStyle='#211e2a';g.fillRect(0,30,74,14);
 for(const x of[6,18,62,70]){hL(g,x,30,x+1,8,'#17151e',1.6);for(let k=0;k<4;k++)hL(g,x+.5,14+k*4,x+(k%2?6:-6),10+k*4,'#17151e',.7)}
 for(let i=0;i<9;i++){const x=(i*17)%80-4,y=24+(i*7)%14;hG(g,x,y,10+(i%3)*3,'140,90,160',.45)}
 for(let i=0;i<6;i++)hG(g,10+i*12,36,9,'100,150,80',.25);
 hG(g,42,20,6,'200,230,120',.4);g.fillStyle='#c8e070';g.fillRect(39,19,2,1);g.fillRect(44,19,2,1);
 for(let i=0;i<10;i++){g.fillStyle='rgba(180,200,120,.6)';g.fillRect(8+(i*31)%60,26+(i*11)%14,1,1)}
 hP(g,[[28,44],[30,38],[33,38],[35,44]],'#17151e');hP(g,[[52,44],[54,40],[57,40],[58,44]],'#17151e')};
// 坪内丸：月影・朧斬り（竹林の夜、満月を細い一閃が横切り、斜めに斬られた竹がずれ落ちる）
NA['月影・朧斬り']=g=>{nSky(g,['#0e0d12','#1e2a5a','#283a40']);hG(g,48,16,16,'220,226,240',.5);g.fillStyle='#dcdee0';g.beginPath();g.arc(48,16,8,0,7);g.fill();g.fillStyle='#b4b8c0';g.beginPath();g.arc(50,18,2,0,7);g.arc(45,13,1.4,0,7);g.fill();
 for(let i=0;i<4;i++)hG(g,10+i*20,30,14,'90,110,140',.25);
 const bam=(x,w,c,cut)=>{for(let y=0;y<44;y+=9){g.fillStyle=c;g.fillRect(x,y,w,8.4);g.fillStyle='rgba(0,0,0,.35)';g.fillRect(x,y+8.4,w,.6)}if(cut){const y=cut;g.fillStyle=nGr(g,0,0,0,44,['#0e0d12','#1e2a5a','#283a40']);g.save();g.beginPath();g.rect(x-1,0,w+2,y+1);g.clip();g.fillRect(x-1,0,w+2,y+1);g.restore();g.save();g.translate(3,-2);g.rotate(.12);g.beginPath();g.rect(x,0,w,y);g.fillStyle=c;g.fill();g.restore()}};
 bam(4,4,'#2e5a2a');bam(14,3,'#3e4a34',20);bam(25,5,'#2e5a2a',24);bam(60,4,'#2e5a2a',18);bam(68,3,'#3e4a34');
 g.save();g.translate(37,21);g.rotate(-.18);const q=g.createLinearGradient(-40,0,40,0);q.addColorStop(0,'rgba(220,230,255,0)');q.addColorStop(.5,'rgba(240,244,255,.95)');q.addColorStop(1,'rgba(220,230,255,0)');g.fillStyle=q;g.fillRect(-40,-.6,80,1.2);g.restore();
 for(let i=0;i<8;i++){g.save();g.translate(10+i*8,30+(i*5)%10);g.rotate(i);hP(g,[[0,0],[3,-1],[5,0],[3,1]],'#4a7a34');g.restore()}};
// 坪内丸：明鏡止水（寄り：鏡のような水面に月が映り、一枚の葉が落ちて波紋が一つ）
NA['明鏡止水']=g=>{nSky(g,['#17151e','#283a40','#3a5058']);hG(g,22,8,12,'220,226,240',.45);g.fillStyle='#dcdee0';g.beginPath();g.arc(22,8,4.4,0,7);g.fill();
 g.fillStyle=nGr(g,0,20,0,44,['#2a3038','#1e2a5a','#17151e']);g.fillRect(0,20,74,24);hL(g,0,20,74,20,'#86a0a4',.6);
 for(const[x,w]of[[0,14],[20,10],[52,22]])hP(g,[[x,20],[x+w*.4,13],[x+w*.7,15],[x+w,20]],'#211e2a');
 hG(g,22,32,9,'200,214,220',.55);g.fillStyle='#b4b8c0';g.beginPath();g.ellipse(22,32,4.4,1.6,0,0,7);g.fill();
 for(let r=3;r<26;r+=4.4){g.strokeStyle='rgba(200,220,228,'+Math.max(.15,.75-r*.025)+')';g.lineWidth=.7;g.beginPath();g.ellipse(46,31,r,r*.3,0,0,7);g.stroke()}
 hG(g,46,31,4,'240,244,250',.7);
 g.save();g.translate(46,26);g.rotate(.5);hP(g,[[-5,0],[0,-2.6],[6,0],[0,2.6]],'#d8902e');hP(g,[[-5,0],[0,-2.6],[6,0]],'#b06a20');hL(g,-6,0,6,0,'#5a4424',.5);g.restore();
 for(let i=0;i<8;i++){g.fillStyle='rgba(134,160,164,.5)';g.fillRect(4+i*9,38+(i%3),5,.6)}};
// 名無し：隕星の頁（遠景：夜の街の屋根の向こうに巨大な隕石が落ちてくる。手前に浮かぶ開いた本の小さな影）
NA['隕星の頁']=g=>{nSky(g,['#17151e','#4a2a6a','#a63a2c']);for(let i=0;i<14;i++){g.fillStyle='rgba(242,220,204,.7)';g.fillRect((i*29)%74,(i*13)%22,.8,.8)}
 fxStreak(g,8,0,46,22,6,'255,180,100');hG(g,48,24,14,'255,200,120',.8);g.fillStyle='#4e4250';g.beginPath();g.arc(48,24,5,0,7);g.fill();g.fillStyle='#e8b070';g.beginPath();g.arc(46.6,22.6,3,0,7);g.fill();g.fillStyle='#f2dccc';g.beginPath();g.arc(46,22,1.4,0,7);g.fill();
 for(let i=0;i<6;i++)fxStreak(g,20+i*4,2+i*2,34+i*4,14+i*2,.8,'255,200,140');
 // 屋根の並び
 g.fillStyle='#0e0d12';for(const[x,w,h]of[[0,12,10],[11,9,14],[19,14,9],[32,8,16],[39,13,11],[51,10,13],[60,14,10]]){g.fillRect(x,44-h,w,h);hP(g,[[x-1,44-h],[x+w/2,40-h],[x+w+1,44-h]],'#0e0d12')}
 for(let i=0;i<9;i++){g.fillStyle='#d8902e';g.fillRect(3+i*8,36+(i%3)*2,1.2,1.4)}
 // 手前に浮かぶ開いた本の影
 g.save();g.translate(14,24);g.rotate(-.15);hP(g,[[-6,0],[0,1.6],[0,-2],[-6,-3.4]],'#211e2a');hP(g,[[6,0],[0,1.6],[0,-2],[6,-3.4]],'#2c2836');g.restore();hG(g,14,23,5,'255,200,140',.4)};
// 名無し：焚き火（引き：路地裏の夜、ドラム缶の焚き火、壁に揺れる影、置かれた酒瓶と古い本）
NA['焚き火']=g=>{g.fillStyle='#17151e';g.fillRect(0,0,74,44);for(let y=0;y<34;y+=4)for(let x=(y/4)%2*5;x<74;x+=10){g.fillStyle='#211e2a';g.fillRect(x+.5,y+.5,9,3)}
 g.fillStyle='#2c2836';g.fillRect(0,34,74,10);hG(g,36,26,28,'232,140,60',.55);
 // ドラム缶と火
 hP(g,[[30,34],[42,34],[41,24],[31,24]],'#4a3220');hL(g,31,28,41,28,'#2e1e14',.8);hL(g,30.6,31,41.4,31,'#2e1e14',.8);
 for(const[x,h,c]of[[33,9,'#c8583a'],[36,12,'#d88a48'],[39,8,'#c8583a'],[36,7,'#e8b070']])hP(g,[[x-2.4,24],[x,24-h],[x+2.4,24]],c);
 for(let i=0;i<8;i++){g.fillStyle='#e8b070';g.fillRect(30+(i*7)%14,8+(i*5)%12,.8,.8)}
 // 酒瓶と本
 hP(g,[[20,34],[23,34],[23,28],[22,26],[22,24],[21,24],[21,26],[20,28]],'#2e7a74');g.fillStyle='#86a0a4';g.fillRect(20.4,29,.6,4);
 hP(g,[[46,34],[54,34],[54,32],[46,32]],'#5a1e1c');hP(g,[[46,32],[54,32],[54,31.4],[46,31.4]],'#e2ccae')};
// ホーリー大輔：ベンチプレス（見上げ：ジムの照明を背に、たわむバーベルの影。光の粉が舞う）
// ホーリー大輔：45分睡眠（真上から：夜の部屋、乱れた布団、枕元の目覚ましが緑に光る、窓の月明かりが床に）
NA['45分睡眠']=g=>{g.fillStyle='#211e2a';g.fillRect(0,0,74,44);for(let x=0;x<74;x+=6)hL(g,x,0,x,44,'#2c2836',.5);
 // 月明かりの窓の形
 g.fillStyle='rgba(134,160,190,.35)';hP(g,[[46,0],[74,0],[74,22],[56,26]],'rgba(134,160,190,.3)');hL(g,60,0,64,24,'rgba(30,30,50,.6)',1);hL(g,48,12,74,10,'rgba(30,30,50,.6)',1);
 // 布団（真上から）
 hP(g,[[6,6],[40,4],[44,40],[8,42]],'#2e4486');hP(g,[[8,6],[40,4],[41,12],[9,14]],'#dcdee0');
 g.fillStyle='#1e2a5a';for(let i=0;i<5;i++){g.beginPath();g.moveTo(10,16+i*5);g.quadraticCurveTo(26,20+i*5-(i%2)*4,42,16+i*5);g.lineTo(42,17+i*5);g.quadraticCurveTo(26,21+i*5-(i%2)*4,10,17+i*5);g.fill()}
 hP(g,[[20,15],[30,14],[34,24],[22,26]],'#5a78b0');
 // 目覚まし
 hG(g,52,34,9,'120,255,140',.5);hP(g,[[46,30],[58,30],[58,38],[46,38]],'#17151e');g.fillStyle='#5aff7a';for(const[x,s]of[[47.6,'4'],[51.6,'5']]){}
 g.fillStyle='#86ff9a';g.fillRect(48,32,1,2.4);g.fillRect(48,33.2,2,.8);g.fillRect(49.4,32,.8,4);g.fillRect(52,32,2.4,.8);g.fillRect(52,32,.8,1.8);g.fillRect(52,33.4,2.4,.8);g.fillRect(53.6,33.4,.8,2.4);g.fillRect(52,35.4,2.4,.8);g.fillRect(51,32.6,.6,.6);g.fillRect(51,34.4,.6,.6);
 for(let i=0;i<3;i++){g.fillStyle='rgba(220,222,224,.55)';g.font='bold 4px sans-serif';g.fillText('z',36+i*4,8-i*2)}};
