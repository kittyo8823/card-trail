// 密林の遺跡の新しい敵の仕組みの確認: node tests/jungle_mech.js
const {chromium}=require('playwright'),path=require('path');
(async()=>{const b=await chromium.launch();const p=await b.newPage();const er=[];p.on('pageerror',e=>er.push(e.message));await p.route('**/fonts.googleapis.com/**',r=>r.abort());await p.goto('file://'+path.resolve(__dirname,'../index.html'));await p.waitForTimeout(600);
const r=await p.evaluate(()=>{const out={},ok=(k,v)=>out[k]=v;const st=(g,kind)=>{newRun(0);P.v2='j';P.act=2;P.mhp=P.hp=999;go('map');fight(g,kind);B.tut=null;for(let k=0;k<20;k++)update(.05)};
 const et=()=>{endTurn();for(let j=0;j<200&&B.ph!=='p';j++)update(.05)};
 // 気合：牙果の「熟す」の後、次の攻撃の予告が 8+7
 st(['jfang'],0);let e=B.en[0];e.i=0;e.it=xIt(e);et();ok('vig',[e.vig,calcP(e,8)]);et();ok('vigUsed',e.vig||0);
 // 臆病：1ターン目の最初の被弾でブロック
 st(['jshell'],0);e=B.en[0];hitE(e,5,0,0,1);const b1=e.blk;hitE(e,5,0,0,1);ok('skt',[b1,e.blk]);
 // 巣：攻撃を受けると山札に目眩（1ターン2枚まで）
 st(['jmoss'],0);e=B.en[0];const d0=B.dr.length;for(let k=0;k<4;k++)hitE(e,1,0,0,1);ok('hiv',B.dr.length-d0);
 // 出直し：石面の跳ね手は倒れると出直す
 st(['jmask'],0);e=B.en[0];hitE(e,999,0,0,1);ok('stc',B.en.filter(x=>!x.dead).map(x=>[x.k,x.stc,x.vig,x.blk]));
 // 自爆：種の小鬼は攻撃して消える
 st(['jroot'],0);e=B.en[0];e.i=0;e.it=xIt(e);et();const sd=B.en.find(x=>x.k==='jseed');ok('seedSpawn',!!sd);const hp0=P.hp;et();et();ok('seedBoom',[sd&&sd.dead,hp0-P.hp]);
 // 眩惑：次のターンはスキル1枚まで
 st(['jlant'],0);e=B.en[0];e.i=0;e.it=xIt(e);et();ok('smg',[B.smg,jgSkOk({t:1},B)]);B.skN=1;ok('smg2',jgSkOk({t:1},B));
 // 汚染・帯電：スキル・パワーでHP-
 st(['jvine'],0);e=B.en[0];e.i=0;e.it=xIt(e);et();const h1=P.hp;jgPlay({t:1});ok('tai',[e.tai,h1-P.hp]);
 st(['jking'],2);e=B.en[0];et();const h2=P.hp;jgPlay({t:2});ok('gal',[e.gal,h2-P.hp]);
 // 棘：棘玉は棘を逆立てると反射
 st(['jthorn'],0);e=B.en[0];e.i=0;e.it=xIt(e);et();ok('tg',e.thr);
 // 怯み：莢の母はHP半分で行動不能
 st(['jpod'],1);e=B.en[0];hitE(e,Math.ceil(e.hp/2)+1,0,0,1);ok('shr',[e.stn,e.shrd]);
 // 半分の大技：縞爪の狩人
 st(['jhunt'],1);e=B.en[0];hitE(e,Math.ceil(e.hp/2)+1,0,0,1);ok('hlf',[e.i,e.it.lb]);et();ok('hlfAfter',[e.i,e.it.lb||e.it.a]);
 // 莢が孵る
 st(['jpod'],1);e=B.en[0];e.i=0;e.it=xIt(e);et();const eg=B.en.filter(x=>x.k==='jegg').length;et();et();ok('egg',[eg,B.en.filter(x=>x.k==='jgrub'&&!x.dead).length]);
 // 筋力：エリートも2回まで
 st(['hgrif'],1);e=B.en[0];for(let k=0;k<12;k++)et();ok('eliteStr',e.str);
 return out});
console.log(JSON.stringify(r));console.log('errors',JSON.stringify(er));await b.close()})();
