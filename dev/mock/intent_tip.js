// Ver4.69 敵の次の行動の札を押すと、行動の中身と言葉の意味を出す（ユーザー指定）
function cdTxt(n){const i=CI(n);if(i<0)return'';try{return String(dl(C[i])).replace(/\n/g,' ')}catch(e){return''}}
function intDet(e,m){const L=[],A=s=>L.push(s);
 if(e.stn){A('行動不能：このターンは何もしない');return L}if(e.sl>0){A('睡眠：ダメージを受けるか、'+e.sl+'ターンたつと目覚める');return L}if(e.reb){A('再起動：次の行動で新しい姿になって起き上がる');return L}
 if(m.nm)A('必殺「'+m.nm+'」：ためてから放つ大技');else if(m.sx)A('強攻撃：ためてから強く攻撃する');
 if(m.wf)A('即死級の一撃：ブロックをすべて剥がして攻撃する');
 if(m.a){const d=calcP(e,m.a),h=m.h||1;A('攻撃：'+d+'ダメージ'+(h>1?'×'+h+'回（合計'+d*h+'）':'')+(PS&&PS.vuln>0?'（あなたは弱体中のため1.5倍で計算）':''));if(e.vig>0)A('（気合'+e.vig+'込み。攻撃すると気合は消える）')}
 if(m.b)A('ブロック+'+m.b+'：この敵が受けるダメージを先に防ぐ');
 if(m.st&&stG(e,m))A('筋力+'+m.st+'：この敵の攻撃のダメージが'+m.st+'増える');
 if(m.wk)A('脆弱+'+m.wk+'：あなたが与えるダメージが0.75倍になる（'+m.wk+'ターン）');
 if(m.vu)A('弱体+'+m.vu+'：あなたが受けるダメージが1.5倍になる（'+m.vu+'ターン）');
 if(m.fr)A('虚弱+'+m.fr+'：カードで得るブロックが0.75倍になる（'+m.fr+'ターン）');
 if(m.ps)A('毒+'+m.ps+'：あなたのターン終了時に毒の数だけダメージ。毎ターン1ずつ減る');
 if(m.sc)A('捨て札に「'+m.sc[0]+'」×'+m.sc[1]+'：'+cdTxt(m.sc[0]));
 if(m.sch)A('手札に「'+m.sch[0]+'」×'+m.sch[1]+'：'+cdTxt(m.sch[0]));
 if(m.ab)A('護衛：仲間全員にブロック+'+m.ab);if(m.hl)A('回復：傷ついた仲間のHPを'+m.hl+'回復');if(m.smn)A('召喚：仲間を呼び出す（出たターンは動かない）');
 if(m.rt)A('儀式+'+m.rt+'：行動するたびに筋力+'+m.rt);if(m.dd)A('次のドロー-'+m.dd+'：次のターンに引くカードが減る');if(m.fl)A('逃走：戦闘から逃げ去る');if(m.sor)A('飛翔：次に攻撃するまで、受ける攻撃のダメージが半分');if(m.bur)A('潜る：ブロックが消えなくなる。ブロックを削り切ると行動不能');if(m.hch)A('孵化：別の姿にかわる');if(m.sa)A('仲間の筋力+'+m.sa);if(m.cp)A('写し取り：あなたの筋力と同じだけ筋力を得る');if(m.gzA)A('視線+'+m.gzA+'：溜まると瞳から光線を撃つ');
 if(m.tnd)A('軟化+'+m.tnd+'：このターン、カードを使うたびに筋力・敏捷-1（ターン終わりに戻る）');if(m.tng)A('もつれ+'+m.tng+'：攻撃カードのコスト+1');if(m.cst)A('束縛+'+m.cst+'：この敵が生きている間、あなたのターン終わりにダメージ（ブロック無視）');if(m.stS)A('筋力を奪う'+m.stS+'：あなたの筋力-'+m.stS+'、この敵の筋力+'+m.stS+'（倒すと戻る）');if(m.art)A('加護+'+m.art+'：あなたのカードによる悪い効果を'+m.art+'回打ち消す');if(m.esc)A('高揚：この攻撃は使うたびに+'+m.esc+'（3回まで）');
 if(m.drn)A('エナジーを奪う：次のターンのエナジー-'+m.drn);if(m.crs)A('呪いの刻印：デッキに呪いを1枚加える');if(m.bst)A('ブロックを奪う：攻撃の前に、あなたのブロックを奪って自分のものにする');if(m.ex2)A('山札を焼く：山札の上から'+m.ex2+'枚を廃棄する');if(m.rvv)A('蘇生：倒れた仲間をHP半分で起こす');if(m.chg)A('溜め：'+m.cb+'ダメージを与えると崩れて行動不能になる');
 if(m.vig)A('気合+'+m.vig+'：次の攻撃のダメージ+'+m.vig);if(m.tg)A('棘+'+m.tg+'：この敵を攻撃すると、そのたびに'+((e.thr||0)+m.tg)+'ダメージを受ける');if(m.tl)A('攻撃のあと棘-'+m.tl);if(m.smg)A('眩惑：次のターン、スキルは'+m.smg+'枚しか使えない');if(m.tai)A('汚染+'+m.tai+'：この敵が生きている間、スキルを使うたびにHP-');if(m.gal)A('帯電+'+m.gal+'：この敵が生きている間、パワーを使うたびにHP-');if(m.bm)A('自爆：攻撃したあと弾けて消える');
 if(!L.length)A(mvTxt(m)||'行動');return L}
function intHit(e,m,t,cx,y){if(has('dome')||!t.length)return;ctx.font='13px DotGothic16,sans-serif';const tot=t.reduce((s,a)=>s+ctx.measureText(a[0]).width+6,0),x0=cx-tot/2-4;hit(x0,y-15,tot+8,18,()=>tipAt(m.nm?'必殺「'+m.nm+'」':(m.lb||'次の行動'),intDet(e,m).join('\n'),x0,y-15,18,'#ffd23f');TIP2.w=250})}
