// セレス（霊騎士・葬列・魂）の仕組みの確認: node tests/seres.js
const {chromium}=require('playwright'),path=require('path');
(async()=>{const b=await chromium.launch();const p=await b.newPage();const er=[];p.on('pageerror',e=>er.push(e.message));await p.route('**/fonts.googleapis.com/**',r=>r.abort());await p.goto('file://'+path.resolve(__dirname,'../index.html'));await p.waitForTimeout(300);
const r=await p.evaluate(()=>{const out=[],ok=(c,m)=>out.push((c?'OK ':'NG ')+m);newRun(10);go('map');fight(['gargoyle','imp'],0);B.bn=null;B.tut=null;
 ok(PS.kn===6&&PS.knm===6,'白い頭巾で霊騎士6');const[e,f]=B.en;for(const x of B.en){x.hp=x.mh=999;x.blk=0}
 B.blk=2;const h0=P.hp;hitP(e,5);ok(B.blk===0&&PS.kn===3&&P.hp===h0,'ブロックの後に騎士が受ける');hitP(e,7);ok(PS.kn===0&&P.hp===h0-4,'騎士が崩れ、残りはセレスへ');
 const giv=(n,t)=>{B.hand=[{i:CI(n),u:0}];B.me=9;play(0,t||0)};
 let hp=e.hp;giv('槍の突き');ok(hp-e.hp===3,'崩れていると騎士の攻撃は半減 '+(hp-e.hp));hp=e.hp;giv('白い光');ok(hp-e.hp===6,'白い光は騎士なしでも6');
 giv('霊騎士召喚');ok(PS.kn===5,'召喚5で立て直す');giv('霊騎士召喚');ok(PS.kn===10&&PS.knm===10,'立っている時は+5');
 hp=e.hp;giv('霊槍の解放');ok(hp-e.hp===16,'霊槍の解放 6+騎士のHP10 '+(hp-e.hp));
 giv('葬鐘');ok(e.fun===3,'葬列3');hp=e.hp;giv('葬列の刃');ok(hp-e.hp===11&&e.fun===2,'葬列の刃 (3+3)+(3+2)、当たるたび1減り、そのあと葬列+1 '+(hp-e.hp));
 e.fun=5;e.hp=1;e.blk=0;giv('白い光');ok(e.dead&&f.fun===2,'倒れると半分が移る '+f.fun);f.fun=4;
 f.hp=1;f.blk=0;const k0=PS.kn;giv('白い光',1);ok(f.dead&&PS.kn===k0+1,'移る先が無い時は騎士を召喚 '+(PS.kn-k0));
 fight(['gargoyle'],0);B.bn=null;const g=B.en[0];g.hp=g.mh=999;g.blk=0;
 const d0=B.dr.length;giv('墓守');ok(B.dr.length===d0+1&&B.dr.some(o=>o.i===SOUL),'魂を山札へ');
 PS.kn=PS.knm=8;B.blk=0;giv('犠牲');ok(B.blk===24&&PS.kn===0,'犠牲 最大HP×3のブロック');
 giv('霊騎士召喚');hp=g.hp;giv('鎧の破片');ok(hp-g.hp===9&&PS.kn===0,'鎧の破片');
 B.ethN=0;giv('穢れの刃');giv('畏れ');hp=g.hp;g.vuln=0;giv('下からの手');ok(hp-g.hp===10,'下からの手 5×エセリアル2 '+(hp-g.hp));
 hp=g.hp;giv('吊るす');giv('吊るす');ok(hp-g.hp===30,'吊るす 10+20 '+(hp-g.hp));
 const cs=C.filter(c=>c.k===10&&!c.fa);ok(cs.length===66,'カード66枚（魂を含む） '+cs.length);for(const c of cs){const t=dl(c).join(' ')+dl(up(c)).join(' ');if(/undefined|NaN/.test(t))ok(0,'説明 '+c.n+' '+t)}
 return out});
console.log(r.join('\n'));console.log('ページエラー:',er.length?er:'なし');await b.close();process.exit(er.length||r.some(x=>x.startsWith('NG'))?1:0)})();
