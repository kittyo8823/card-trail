// セレス（霊騎士・霊光）の仕組みの確認: node tests/seres.js
const {chromium}=require('playwright'),path=require('path');
(async()=>{const b=await chromium.launch();const p=await b.newPage();const er=[];p.on('pageerror',e=>er.push(e.message));await p.route('**/fonts.googleapis.com/**',r=>r.abort());await p.goto('file://'+path.resolve(__dirname,'../index.html'));await p.waitForTimeout(300);
const r=await p.evaluate(()=>{const out=[],ok=(c,m)=>out.push((c?'OK ':'NG ')+m);newRun(10);go('map');fight(['gargoyle'],0);B.bn=null;B.tut=null;
 ok(PS.kn===8&&PS.knm===8,'白い頭巾で霊騎士8');PS.kn=PS.knm=6;const e=B.en[0];e.hp=e.mh=999;
 B.blk=2;const h0=P.hp;hitP(e,5);ok(B.blk===0&&PS.kn===3&&P.hp===h0&&PS.rl===1,'ブロックの後に騎士が受ける・霊光+1');
 hitP(e,7);ok(PS.kn===0&&P.hp===h0-4&&PS.rl===2,'騎士が崩れ、残りはセレスへ');
 const giv=n=>{B.hand=[{i:CI(n),u:0}];B.me=9;play(0,0)};
 let hp=e.hp;giv('槍の柄打ち');ok(hp-e.hp===3,'崩れていると半減 '+(hp-e.hp));e.vuln=0;
 giv('霊騎士召喚');ok(PS.kn===5&&PS.knm===5,'崩れた騎士を召喚5で立て直す');giv('霊騎士召喚');ok(PS.kn===10&&PS.knm===10,'立っている時は+5');
 hp=e.hp;giv('光の三叉');ok(hp-e.hp===12&&PS.rl===0,'光の三叉 8+霊光2×2、霊光は0に '+(hp-e.hp));
 PS.rl=3;hp=e.hp;giv('光の雨');ok(hp-e.hp===15&&PS.rl===0,'光の雨 3×(3+2)回 '+(hp-e.hp));
 PS.rl=4;B.blk=0;giv('霊光の結界');ok(B.blk===12&&PS.rl===4,'霊光の結界 霊光×3、霊光は減らない');
 giv('霊の盾');B.blk=0;PS.kn=10;hitP(e,8);ok(PS.kn===6,'霊の盾で騎士の被ダメ半分 '+PS.kn);
 PS.kund=1;hitP(e,30);ok(PS.kn===10&&PS.kund===0,'不滅：一度だけHP10で立つ');
 hp=e.hp;giv('魂の解放');ok(hp-e.hp===10&&PS.kn===0&&PS.kund===0,'魂の解放：残りHP分を全体に');
 PS.kn=PS.knm=5;PS.kth=4;hp=e.hp;hitP(e,2);ok(hp-e.hp===4,'霊の反撃');
 PS.kreg=3;PS.krb=1;PS.rl=5;serTurn();ok(PS.kn===6+0&&true||PS.kn>=6,'守護の契り');
 PS.kpr=1;const r0=PS.rl;serEnd();ok(PS.rl===r0+1,'魂の灯');
 const cs=C.filter(c=>c.k===10);ok(cs.length===65,'カード65枚 '+cs.length);hp=e.hp;PS.kn=0;giv('白い光');ok(hp-e.hp>=6,'白い光は騎士なしでも6');for(const c of cs){const t=dl(c).join(' ')+dl(up(c)).join(' ');if(/undefined|NaN/.test(t))ok(0,'説明 '+c.n+' '+t)}
 return out});
console.log(r.join('\n'));console.log('ページエラー:',er.length?er:'なし');await b.close();process.exit(er.length||r.some(x=>x.startsWith('NG'))?1:0)})();
