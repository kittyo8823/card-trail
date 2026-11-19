# v3 の背景を元に、楽師には奥行きを、大顎には密林らしさだけを足した v5.js を作る
import os
D=os.path.dirname(os.path.abspath(__file__));s=open(os.path.join(D,'..','v3','bossbg.js'),encoding='utf-8').read()
drum=s[s.index('BFULL.jdrum='):s.index('// 千根の母樹')]
maw=s[s.index('BFULL.jmaw='):s.index('// 背景の動き')]
ja=s[s.index('jdrum(){'):s.index(' jmother(){')]
def R(t,a,b):
    assert t.count(a)==1,a[:60];return t.replace(a,b)
drum=R(drum,"for(let k=0;k<30;k++){const cx=rn()*660-10,r=30+rn()*40;x.fillStyle=k%2?'#121a14':'#16201a';x.beginPath();x.arc(BF.F(cx),BF.F(40+rn()*50),r,0,6.3);x.fill()}",
 "for(const[n,y0,r0,c]of[[24,70,22,'#1e2a24'],[20,58,30,'#17211b'],[16,44,40,'#111814']]){for(let k=0;k<n;k++){const cx=rn()*680-20,r=r0*(.7+rn()*.6);x.fillStyle=c;x.beginPath();x.arc(BF.F(cx),BF.F(y0+rn()*24),r,0,6.3);x.fill()}for(let y=y0-20;y<y0+50;y+=2){x.fillStyle='rgba(130,110,90,.03)';x.fillRect(0,y,640,2)}}")
drum=R(drum,"x.fillStyle=WD[1];x.beginPath();x.ellipse(320,92,82,72,0,0,6.3);x.fill();x.fillStyle='#c8a060';x.beginPath();x.ellipse(320,92,72,64,0,0,6.3);x.fill();x.fillStyle='#a8844a';x.beginPath();x.ellipse(320,92,56,50,0,0,6.3);x.fill();",
 "for(let y=100;y<200;y+=2){x.fillStyle='rgba(150,120,90,'+(.07*Math.sin((y-100)/100*Math.PI)).toFixed(3)+')';x.fillRect(0,y,640,2)}BF.gl(x,320,96,120,96,'rgba(255,190,110,.2)');x.fillStyle=WD[1];x.beginPath();x.ellipse(320,96,66,58,0,0,6.3);x.fill();x.fillStyle='#c8a060';x.beginPath();x.ellipse(320,96,58,51,0,0,6.3);x.fill();x.fillStyle='#a8844a';x.beginPath();x.ellipse(320,96,44,39,0,0,6.3);x.fill();")
drum=R(drum,"x.arc(320,92,14+k*14,0,6.3)","x.arc(320,96,11+k*11,0,6.3)")
drum=R(drum,"R(320+Math.cos(a)*36-2,92+Math.sin(a)*32-2,4,4,'#2a1a10')","R(320+Math.cos(a)*29-2,96+Math.sin(a)*26-2,4,4,'#2a1a10')")
drum=R(drum,"x.moveTo(320+Math.cos(a)*74,92+Math.sin(a)*66);x.lineTo(320+Math.cos(a)*84,92+Math.sin(a)*74)","x.moveTo(320+Math.cos(a)*59,96+Math.sin(a)*52);x.lineTo(320+Math.cos(a)*67,96+Math.sin(a)*59)")
drum=R(drum,"BF.gl(x,320,92,110,90,'rgba(255,170,80,.18)');","BF.gl(x,320,96,90,72,'rgba(255,170,80,.18)');")
drum=R(drum,"for(const[px,s]of[[60,1],[130,.8],[510,.8],[580,1]]){","for(const[px,s]of[[60,1],[124,.78],[178,.58],[462,.58],[516,.78],[580,1]]){")
drum=R(drum,"R(0,200,640,160,'#2a1c14');for(let y=206;y<360;y+=12){R(0,y,640,2,'#1e140e')}R(0,200,640,6,'#3a2a1c');",
 "R(0,200,640,160,'#2a1c14');for(let i=0;i<12;i++){const t=i/11;R(0,206+Math.pow(t,1.6)*150,640,2,'#1e140e')}for(let k=-10;k<=10;k++){x.strokeStyle='#1e140e';x.lineWidth=2;x.beginPath();x.moveTo(320+k*16,204);x.lineTo(320+k*90,360);x.stroke()}R(0,200,640,6,'#3a2a1c');")
drum=R(drum," BF.vig(x,.55)};"," for(const[cx,cy,rot]of[[-14,6,.6],[56,-14,.9],[654,6,2.5],[594,-16,2.2]]){x.save();x.translate(cx,cy);x.rotate(rot);x.fillStyle='#0a100c';x.beginPath();x.ellipse(40,0,58,16,0,0,6.3);x.fill();x.restore()}\n BF.vig(x,.58)};")
ja=R(ja,"ctx.ellipse(320,92,20+u*60,18+u*54,0,0,6.3)","ctx.ellipse(320,96,16+u*48,14+u*43,0,0,6.3)")
maw=R(maw,"BF.sky(x,'#0c1210','#16201c','#24302a');","BF.sky(x,'#0c1210','#16201c','#24302a');\n for(let k=0;k<26;k++){const cx=rn()*680-20,r=22+rn()*30;x.fillStyle=k%2?'#1a2620':'#1e2c24';x.beginPath();x.arc(BF.F(cx),BF.F(66+rn()*30),r,0,6.3);x.fill();R(cx-3,66,6,140,'#18241e')}")
maw=R(maw," BF.vig(x,.6)};",open(os.path.join(D,'maw_add.js'),encoding='utf-8').read().rstrip('\n')+"\n BF.vig(x,.6)};")
body=ja[ja.index('{')+1:].rstrip().rstrip(',')
open(os.path.join(D,'v5.js'),'w',encoding='utf-8').write('// ===== Ver4.67 楽師はVer4.65の舞台に奥行きを足し、大顎はVer4.65の背景に密林らしさだけ足す =====\n'+drum+maw+'JGBA.jdrum=()=>{'+body+';\n')
print('ok')
