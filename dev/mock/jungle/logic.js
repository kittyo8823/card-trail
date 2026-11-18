// ===== Ver4.63 2層のもう一つの場所「密林の遺跡」（ユーザー指定：ジャングル遺跡に実在しない生き物。形と色を1体ずつ変える。筋力は上げない） =====
// 新しい敵の仕組み（スレスパ2のまだ使っていない行動を参考）
// 行動：vig 気合（次の攻撃のダメージ+。攻撃で消える）／tg 棘を逆立てる（反射+）・tl 棘を放つ（攻撃のあと反射-）／smg 眩惑（次のこちらのターン、スキルは smg 枚まで）
//       tai 汚染（この敵が生きている間、スキルを使うたびHP-）／gal 帯電（この敵が生きている間、パワーを使うたびHP-）／bm 自爆（攻撃して自分は弾けて消える）
// 特性：skt 臆病（毎ターン最初にHPを失った時ブロック+）／hiv 巣（攻撃を受けるたび山札に目眩。1ターン2枚まで）／shr 怯み（初めてHPが半分以下になると次の行動ができない）
//       stc 出直し（倒れても、その場から同じ者が出直してくる。回数。出直した者はブロック6・気合4）／hlf 半分の大技（初めてHPが半分以下になると、次の行動がその技になる）
Object.assign(E,{
 jfang:{n:'牙果',hp:[34,40],mv:[{vig:7,b:6,lb:'熟す'},{a:8,lb:'噛み砕く'},{a:5,h:2}]},
 jroot:{n:'根の巫子',hp:[38,44],mv:[{smn:['jseed'],sn:1,lb:'種を蒔く'},{a:9},{b:8,wk:1,lb:'呪いの根'}]},
 jseed:{n:'種の小鬼',hp:[5,6],mv:[{a:8,bm:1,lb:'弾ける'}]},
 jshell:{n:'殻負い',hp:[52,58],skt:7,mv:[{a:13},{a:5,h:2},{b:12}]},
 jlant:{n:'灯角の獣',hp:[42,48],mv:[{smg:1,a:7,lb:'眩む灯'},{a:12},{a:4,h:3}]},
 jserp:{n:'鰭翼の蛇',hp:[38,44],stl:12,lp:3,mv:[{a:9,lb:'掠め取り'},{sor:1,b:6,lb:'舞い上がる'},{a:13},{fl:1,lb:'逃走'}]},
 jthorn:{n:'棘玉',hp:[40,46],mv:[{tg:3,b:8,lb:'棘を逆立てる'},{a:15,tl:3,lb:'棘を放つ'},{a:8}]},
 jmask:{n:'石面の跳ね手',hp:[20,24],stc:2,mv:[{a:5,h:2},{a:8,fr:1}]},
 jvine:{n:'蔓の絞め手',hp:[44,50],mv:[{tai:2,a:6,lb:'絡む蔓'},{a:11},{b:9,wk:1}]},
 jmoss:{n:'苔の塊',hp:[48,54],hiv:1,mv:[{a:8},{b:10,lb:'苔むす'},{a:4,h:3}]},
 jhunt:{n:'縞爪の狩人',hp:[150,160],el:1,hlf:{a:28,lb:'捨て身の跳躍'},mv:[{a:16,lb:'切り裂き'},{vig:6,b:12,lb:'身を沈める'},{a:7,h:2},{a:24,sx:1,lb:'飛びかかり'}]},
 jpod:{n:'莢の母',hp:[140,150],el:1,shr:1,mv:[{smn:['jegg'],sn:2,lb:'莢を産む'},{a:14},{a:6,vu:1,lb:'酸を吐く'},{a:22,sx:1}]},
 jegg:{n:'莢',hp:[6,7],mv:[{b:4,lb:'脈打つ'},{hch:'jgrub',lb:'孵る'}]},
 jgrub:{n:'莢の幼生',hp:[9,11],mv:[{a:5},{a:3,h:2}]},
 jshd:{n:'枝垂れの影',hp:[46,52],el:1,skt:5,mv:[{a:3,h:3},{b:8,vig:5,lb:'枝に潜む'},{a:7},{a:10,fr:1,sx:1}]},
 jking:{n:'冠角の獣王',hp:[360,360],el:2,lp:1,mv:[{gal:3,b:12,lb:'森の怒り'},{a:10,h:2,lb:'角の連撃'},{a:14,vu:1,lb:'踏み荒らし'},{b:18,vig:6,lb:'咆哮'},{a:26,nm:'角の裁き',fc:'#c8e070'}]},
 jmother:{n:'千根の母樹',hp:[380,380],el:2,plt:8,mv:[{smn:['jseed','jseed'],sn:2,lb:'種の雨'},{a:8,h:2,lb:'根の鞭'},{tai:2,b:16,lb:'根を張る'},{a:24,nm:'大地の締め付け',fc:'#a0d070'},{a:12,wk:1,lb:'棘の蔓'}]},
 jmaw:{n:'沼の大顎',hp:[400,400],el:2,hlf:{b:30,vig:10,lb:'沼に潜る'},mv:[{a:14,lb:'噛みつき'},{tg:4,b:20,lb:'泥をまとう'},{a:5,h:3,lb:'泥礫'},{a:26,tl:4,nm:'呑み込み',fc:'#8a7a3a'}]}
});
const FI2J=[[['jfang'],['jshell'],['jmask','jmask'],['jmoss'],['jserp']],[['jroot'],['jlant'],['jthorn'],['jvine'],['jfang','jmask'],['jserp','jmoss']],[['jshell','jroot'],['jlant','jfang'],['jthorn','jvine'],['jmoss','jmask','jmask'],['jroot','jthorn'],['jvine','jserp'],['jlant','jmoss'],['jshell','jmask']]],ELJ=['jhunt','jpod',['jshd','jshd','jshd']];
const BOSSGJ=[["jking"],["jmother"],["jmaw"]],BICNJ=["jking","jmother","jmaw"];
const A2J=()=>!!(P&&P.act===2&&P.v2==='j');
// 行動のうち、こちら側（各プレイヤー）にかかるもの：眩惑
function jgAct1(e,m){if(m.smg){B.smgN=m.smg;nmb(110,108,'眩惑：次のターン スキルは'+m.smg+'枚まで','#e8d070');sfx('ps')}}
// 行動のうち、敵自身にかかるもの（攻撃のあと）
function jgAct2(e,m){if(e.dead)return;if(m.a&&e.vig&&!m.vig){e.vig=0}if(m.vig){e.vig=(e.vig||0)+m.vig;pop(e,'気合+'+m.vig,'#ffb050')}if(m.tg){e.thr=(e.thr||0)+m.tg;pop(e,'棘+'+m.tg,'#c8e070')}if(m.tl&&m.a){e.thr=Math.max(0,(e.thr||0)-m.tl);pop(e,'棘-'+m.tl,'#c8e070')}if(m.tai){e.tai=Math.min(4,(e.tai||0)+m.tai);pop(e,'汚染'+e.tai,'#9ac060')}if(m.gal){e.gal=Math.min(6,(e.gal||0)+m.gal);pop(e,'帯電'+e.gal,'#c8e8ff')}if(m.bm){e.hp=0;e.dS='splat';pop(e,'弾けた','#ff9a40');killE(e)}}
// 敵がHPを失った時（hitE から）：臆病・巣・怯み・半分の大技
function jgHit(e,a,atk){if(e.dead||e.hp<=0)return;if(e.skt&&e.sktT!==B.turn){e.sktT=B.turn;e.blk+=e.skt;pop(e,'臆病 ブロック+'+e.skt,'#7ec8ff')}if(atk&&e.hiv){if(e.hivT!==B.turn){e.hivT=B.turn;e.hivN=0}if(e.hivN<2){e.hivN++;const o={i:CI('目眩'),u:0};B.dr.splice(Math.floor(R()*(B.dr.length+1)),0,o);pop(e,'巣：山札に目眩','#b8c890')}}
 if(e.shr&&!e.shrd&&e.hp<=e.mh/2){e.shrd=1;e.stn=1;pop(e,'怯んだ','#ffd23f');sfx('ch')}const H=E[e.k]&&E[e.k].hlf;if(H&&!e.hlfd&&e.hp<=e.mh/2){e.hlfd=1;e.i=-1;e.it=H;pop(e,'次は「'+H.lb+'」','#ff8a40');sfx('bf')}}
// 出直し：倒れた枠から同じ者が出てくる（出たターンは行動しない）
function stcE(e){const n=e.stc-1,o=spawnE(e.k);if(!o)return;o.stc=n;o.blk+=6;o.vig=4;pop(o,'出直し 気合+4','#c8b890')}
// カードを使った後：眩惑の数・汚染・帯電
function jgPlay(c){if(!B||!c)return;if(c.t===1)B.skN=(B.skN||0)+1;let d=0,w='';if(c.t===1){d=alive().reduce((s,x)=>s+(x.tai||0),0);w='汚染'}else if(c.t===2){d=alive().reduce((s,x)=>s+(x.gal||0),0);w='帯電'}if(d>0){P.killer=w;P.hp-=d;nmb(110,150,'-'+d+'（'+w+'）',c.t===1?'#9ac060':'#c8e8ff');if(!QT)fxs('pz',110,165,{d:.6,c:c.t===1?'#7a9a40':'#a8d8ff'});if(P.hp<=0)lose()}}
const jgSkOk=(c,b)=>!(c.t===1&&b.smg&&(b.skN||0)>=b.smg);
// 予告の札・行動の説明・特性・状態の札
function jgInt(e,m,t){if(m.vig)t.push(['気+'+m.vig,'#ffb050']);if(m.tg)t.push(['棘+'+m.tg,'#c8e070']);if(m.smg)t.push(['眩','#e8d070']);if(m.tai)t.push(['汚+'+m.tai,'#9ac060']);if(m.gal)t.push(['雷+'+m.gal,'#c8e8ff']);if(m.bm)t.push(['爆','#ff8a40'])}
function jgMv(m,t){if(m.vig)t.push('気合+'+m.vig);if(m.tg)t.push('棘+'+m.tg);if(m.tl)t.push('（攻撃のあと棘-'+m.tl+'）');if(m.smg)t.push('眩惑（次のターン スキル'+m.smg+'枚まで）');if(m.tai)t.push('汚染+'+m.tai);if(m.gal)t.push('帯電+'+m.gal);if(m.bm)t.push('弾けて消える')}
function jgTr(d,a){a(d.skt,'臆病'+d.skt+'（毎ターン最初にHPを失うとブロック）');a(d.hiv,'巣（攻撃を受けるたび山札に目眩）');a(d.shr,'怯み（初めてHP半分以下で行動不能）');a(d.stc,'出直し'+d.stc);a(d.hlf,d.hlf&&'HP半分で「'+d.hlf.lb+'」')}
function jgChips(o,a){if(o.vig>0)a('気合'+o.vig,'#ffb050','気合：次の攻撃のダメージ+'+o.vig+'（攻撃すると消える）');if(o.skt)a('臆病'+o.skt,'#7ec8ff','臆病：毎ターン最初にHPを失った時、ブロック+'+o.skt);if(o.hiv)a('巣','#b8c890','巣：攻撃を受けるたび、こちらの山札に目眩を1枚混ぜる（1ターン2枚まで）');if(o.shr&&!o.shrd)a('怯み','#ffd23f','怯み：初めてHPが半分以下になると、次の行動ができない');if(o.stc>0)a('出直し'+o.stc,'#c8b890','出直し：倒れても、同じ者があと'+o.stc+'回出直してくる（ブロック6・気合4）');if(o.tai>0)a('汚染'+o.tai,'#9ac060','汚染：この敵が生きている間、スキルを使うたびHP-'+o.tai);if(o.gal>0)a('帯電'+o.gal,'#c8e8ff','帯電：この敵が生きている間、パワーを使うたびHP-'+o.gal);{const H=E[o.k]&&E[o.k].hlf;if(H&&!o.hlfd)a('大技','#ff8a40','HPが半分以下になると、次の行動が「'+H.lb+'」になる')}}
