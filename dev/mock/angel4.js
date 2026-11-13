// 天使のボスの見本4（追加しない）：見本3のデザインを、敵と同じ paint（平たい色＋自動の3段陰影と輪郭）で描いたもの
function angelBoss4(){const GL='#e0b040',GD='#b88428',GH='#fff0a0',TE='#2a9aa0',TD='#1a6a74',SK='#d6d0dc',SKD='#a8a0b4',RD='#c02838',WH='#ece6dc',DK='#140c1c',PU='#a03ac8';
const im=paint(76,64,({r,p,q,l,t,e,m,sh})=>{const X=36;
 // とげの光輪（後ろ）
 for(let k=0;k<16;k++){const a=k/16*6.283,r1=12,r2=k%2?17:21;t([[X+Math.cos(a-.12)*r1,15+Math.sin(a-.12)*r1],[X+Math.cos(a)*r2,15+Math.sin(a)*r2],[X+Math.cos(a+.12)*r1,15+Math.sin(a+.12)*r1]],k%2?GD:GL)}
 // 金の刃の翼（左右対称）
 m(()=>{for(let k=0;k<5;k++){const a=-2.55+k*.26,ln=30-k*2.6,ox=X-5,oy=27,ux=Math.cos(a),uy=Math.sin(a),px=-uy,py=ux;t([[ox+px*1.6,oy+py*1.6],[ox+ux*ln*.7+px*2.6,oy+uy*ln*.7+py*2.6],[ox+ux*ln,oy+uy*ln],[ox+ux*ln*.7-px*1.2,oy+uy*ln*.7-py*1.2],[ox-px*1.6,oy-py*1.6]],k%2?GD:GL)}});
 // 鱗の尾
 for(let i=24;i>=0;i--){const s=i/24,x=X+4+s*36,y=46+Math.sin(s*5)*3+s*6,rr=3.4*(1-s)+.8;e(x,y,rr+.3,rr,i%2?RD:WH);if(i%3==0&&i<22)t([[x-.6,y-rr],[x+1.2,y-rr-2.4],[x+1,y-rr]],GL)}
 // 細長い腕4本（肌＋金の輪）と金の爪
 const arm=(pts,cl)=>{for(let i=1;i<pts.length;i++)l(pts[i-1][0],pts[i-1][1],pts[i][0],pts[i][1],SK,1.6);for(let i=1;i<pts.length;i++){const[a,b]=pts[i-1],[c,d]=pts[i];e((a+c)/2,(b+d)/2,1.2,1.2,GL)}const[x,y]=pts[pts.length-1];for(const[dx,dy]of cl)t([[x,y-.6],[x+dx,y+dy],[x+.6,y+.8]],GL)};
 arm([[X-6,33],[X-15,38],[X-20,33]],[[-10,-6],[-11,-2],[-8,1]]);
 arm([[X-5,38],[X-13,46],[X-22,47]],[[-10,2],[-10,6],[-6,7]]);
 arm([[X+6,33],[X+15,38],[X+20,33]],[[10,-6],[11,-2]]);
 arm([[X+5,38],[X+13,46],[X+22,48]],[[9,3],[10,-1]]);
 // 胴：金の胸当て＋琺瑯の板
 t([[X-7,29],[X+7,29],[X+5,41],[X,49],[X-5,41]],GL);
 m(()=>t([[X-5.6,31],[X-1,31],[X-1,41],[X-3.6,40]],TE));
 // 頭巾（琺瑯）＋赤白の縁
 t([[X-11,22],[X-10,7],[X-5,2],[X+5,2],[X+10,7],[X+11,22],[X+7,29],[X-7,29]],TE);
 m(()=>{for(let i=0;i<6;i++)r(X-11.4+i*.15,7+i*3.4,1.6,2.4,i%2?RD:WH)});
 // 金の楕円枠と顔
 e(X,15,8.6,11.6,GL);e(X,15,7,10,SK);
 // 冠
 for(let k=-3;k<=3;k++){const a=-1.57+k*.3;t([[X+Math.cos(a-.1)*7,8+Math.sin(a-.1)*7],[X+Math.cos(a)*13,7+Math.sin(a)*13],[X+Math.cos(a+.1)*7,8+Math.sin(a+.1)*7]],k%2?GD:GL)}
 sh();
 // 細部（陰影の後）：顔の彫り、閉じた目、口、宝石、照り
 t([[X-.6,12],[X+.6,12],[X+1.4,18.4],[X,19.4],[X-1.4,18.4]],SKD);
 m(()=>{l(X-5,13.4,X-2,14,DK,.5);l(X-5.6,11,X-2,11.2,SKD,.4);t([[X-6.6,7],[X+6.6,7],[X+5.6,9],[X-5.6,9]],SKD)});
 l(X-2.4,21.6,X+2.4,21.6,'#5a2a3a',.5);
 for(let i=0;i<4;i++)e(X,32+i*3,.7,.9,PU);e(X,30,1.4,1.6,PU);q(X-.6,29.4,'#f4c8ff');
 e(X,2.4,1.6,1.6,RD);q(X-.6,1.8,'#ffd0d0');
 for(let k=0;k<20;k++){const a=k/20*6.283;q(X+Math.cos(a)*8.2,15+Math.sin(a)*11.2,k%2?GH:GL)}
 m(()=>{for(let k=0;k<5;k++)q(X-6.2+k*.3,30+k*2,GH)})},2.8);
return flipC(im)}
