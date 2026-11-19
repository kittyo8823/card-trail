# Ver4.64 密林の遺跡の描き直し（dev で実行：python3 mock/jungle/v2/patch2.py）
import re,os,sys
D=os.path.dirname(os.path.abspath(__file__));P=os.path.join(D,'..','..','..','index.html')
s=open(P,encoding='utf-8').read()
if 'SD.jdrum=' in s: sys.exit('済み')
rd=lambda f:open(os.path.join(D,f),encoding='utf-8').read().rstrip('\n')
def cut(start):
    global s
    i=s.index(start);j=s.index('}];\n',i)+4
    # 直前の説明の行も消す
    k=s.rfind('\n',0,i-1);ln=s[k+1:i]
    if ln.startswith('// '):i=k+1
    s=s[:i]+s[j:]
for k in ['SD.jlant=','SD.jhunt=','SD.jking=','SD.jmaw=']:cut(k)
s=re.sub(r"SD\.emb_jking=\[[^\n]*\n","",s);s=re.sub(r"SD\.emb_jmaw=\[[^\n]*\n","",s)
a="SD.emb_jmother=";i=s.index(a);s=s[:i]+rd('art2.js')+'\n'+s[i:]
def rep(a,b):
    global s
    assert s.count(a)==1,a;s=s.replace(a,b)
rep(" jking:{n:'冠角の獣王',hp:[360,360],el:2,lp:1,mv:[{gal:3,b:12,lb:'森の怒り'},{a:10,h:2,lb:'角の連撃'},{a:14,vu:1,lb:'踏み荒らし'},{b:18,vig:6,lb:'咆哮'},{a:26,nm:'角の裁き',fc:'#c8e070'}]},",
 " jdrum:{n:'鼓腹の楽師',hp:[250,250],el:2,ld:1,lp:1,mv:[{gal:3,b:12,lb:'雷鳴の太鼓'},{a:9,h:2,lb:'連打'},{ab:10,lb:'舞を促す'},{a:13,vu:1,lb:'響く一打'},{a:24,nm:'大地の鼓動',fc:'#e0a040'}]},\n jdancA:{n:'鈴の踊り子',hp:[68,72],mn:1,mv:[{a:6,lb:'鈴の舞'},{a:3,h:2},{vig:5,b:6,lb:'跳ねる'}]},\n jdancB:{n:'鈴の踊り子',hp:[68,72],mn:1,mv:[{a:3,h:2},{vig:5,b:6,lb:'跳ねる'},{a:6,lb:'鈴の舞'}]},")
rep("jmaw:{n:'沼の大顎',hp:[400,400],el:2,hlf:{b:30,vig:10,lb:'沼に潜る'},mv:[{a:14,lb:'噛みつき'},{tg:4,b:20,lb:'泥をまとう'},{a:5,h:3,lb:'泥礫'},{a:26,tl:4,nm:'呑み込み',fc:'#8a7a3a'}]}",
 "jmaw:{n:'石門の大顎',hp:[400,400],el:2,hlf:{b:30,vig:10,lb:'門を閉ざす'},mv:[{a:14,lb:'噛みつき'},{tg:4,b:20,lb:'苔の棘をまとう'},{a:5,h:3,lb:'石礫'},{a:26,tl:4,nm:'呑み込み',fc:'#a8b090'}]}")
rep("jlant:{n:'灯角の獣',","jlant:{n:'灯実の徘徊者',")
rep("jserp:{n:'鰭翼の蛇',hp:[38,44],","jserp:{n:'鰭翼の蛇',hp:[38,44],fly:26,")
rep("jshd:{n:'枝垂れの影',hp:[46,52],","jshd:{n:'枝垂れの影',hp:[46,52],fly:12,")
rep('const BOSSGJ=[["jking"],["jmother"],["jmaw"]],BICNJ=["jking","jmother","jmaw"];','const BOSSGJ=[["jdancB","jdrum","jdancA"],["jmother"],["jmaw"]],BICNJ=["jdrum","jmother","jmaw"];')
rep("bossN=()=>A1S()?[0,0]:A2J()?[0,0,0]:","bossN=()=>A1S()?[0,0]:A2J()?['鼓腹の楽師',0,0]:")
# 動き・分類
a=s.index("{n:'af',pv:[56,38],z:'f',r:'af'}]});");j=s.index("\n",a);s=s[:j+1]+rd('ept2.js')+'\n'+s[j+1:]
rep("['jking','heavy'],","['jdrum','heavy'],['jdancA','hum'],['jdancB','hum'],");rep("['jlant','beast']","['jlant','hum']");rep("['jhunt','beast']","['jhunt','hum']")
rep("['jking','bash'],","['jdrum','bash'],['jdancA','stab'],['jdancB','stab'],")
# 演出：獣王の分を消して楽師・踊り子を足す。大顎は泥を石に
i=s.index(" // 冠角の獣王：");j=s.index(" // 千根の母樹：",i);s=s[:i]+s[j:]
i=s.index("BFX.jking=");j=s.index("BFX.jmother=",i);s=s[:i]+s[j:]
rep("Object.assign(CHGT,{jhunt:'beast',jpod:'swamp',jshd:'dark',jking:'quake',jmother:'wood',jmaw:'swamp'});","Object.assign(CHGT,{jhunt:'beast',jpod:'swamp',jshd:'dark',jmother:'wood'});\n"+rd('fx2.js'))
i=s.index(" // 沼の大顎：");j=s.index("\n});",i);seg=s[i:j].replace('jgMud(','jgStone(').replace("'#4a4228'","'#6a6e60'").replace('沼の大顎：泥の礫／巨大な顎で噛みつく／泥をまとう','石門の大顎：石の礫／門の顎で噛みつく／苔の棘をまとう');s=s[:i]+seg+s[j:]
i=s.index("BFX.jmaw=");j=s.index("};",i);seg=s[i:j].replace('jgMud(','jgStone(').replace("'#4a4228'","'#6a6e60'").replace("'#2a2416'","'#2a2a22'");s=s[:i]+seg+s[j:]
rep("const GVER='4.61'","const GVER='4.64'")
open(P,'w',encoding='utf-8').write(s);print('ok')
