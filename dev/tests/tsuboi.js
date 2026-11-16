// 坪内丸の刀魂（Ver3.44）の確認: node tests/tsuboi.js
const {chromium}=require('playwright'),path=require('path');
(async()=>{const b=await chromium.launch();const p=await b.newPage();const er=[];p.on('pageerror',e=>er.push(e.message));await p.route('**/fonts.googleapis.com/**',r=>r.abort());await p.goto('file://'+path.resolve(__dirname,'../index.html'));await p.waitForTimeout(300);
const r=await p.evaluate(()=>{const out=[],ok=(c,m)=>out.push((c?'OK ':'NG ')+m);newRun(2);go('map');fight(['gargoyle'],0);B.bn=null;B.tut=null;const e=B.en[0];e.hp=e.mh=999;e.blk=0;
 ok(PS.ki===3,'朧の鞘で刀魂3');const giv=(n,me)=>{B.hand=[{i:CI(n),u:0}];B.me=me==null?9:me;B.pl=0;play(0,0);return B.hand.length===0};
 let hp=e.hp;ok(giv('抜刀・閃華',0)&&PS.ki===2,'抜刀・閃華はエナジー0・刀魂2');
 PS.ki=0;ok(!giv('抜刀・閃華'),'刀魂が足りないと使えない');
 giv('呼吸・凪');ok(PS.ki===2,'呼吸・凪 刀魂+2');B.tkG=0;giv('残月');hp=e.hp;e.vuln=0;giv('星落とし');ok(hp-e.hp===3,'星落とし 3×このターン得た刀魂1 '+(hp-e.hp));
 PS.ki=4;hp=e.hp;giv('奥義・無間');ok(hp-e.hp===24&&PS.ki===0,'奥義・無間 6×刀魂4 '+(hp-e.hp));
 PS.ki=10;PS.tkB=2;B.blk=0;giv('天の魂');ok(B.blk===6&&PS.ki===7,'心眼：払った刀魂3×2のブロック '+B.blk);PS.tkB=0;
 giv('練魂');const k0=PS.ki;newTurn0();ok(PS.ki===k0+3,'練魂：次ターン刀魂+3');
 const cs=C.filter(c=>c.k===2);for(const c of cs){const t=dl(c).join(' ')+dl(up(c)).join(' ');if(/undefined|NaN|気(?!・)/.test(t.replace(/剣気/g,'')))ok(0,'説明 '+c.n+' '+t)}ok(1,'説明文');
 return out});
console.log(r.join('\n'));console.log('ページエラー:',er.length?er:'なし');await b.close();process.exit(er.length||r.some(x=>x.startsWith('NG'))?1:0)})();
