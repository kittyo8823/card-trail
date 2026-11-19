# Ver4.66 （dev で実行：python3 mock/jungle/v4/patch4.py）
import os,sys
D=os.path.dirname(os.path.abspath(__file__));P=os.path.join(D,'..','..','..','index.html');s=open(P,encoding='utf-8').read()
if 'function jgSlab' in s: sys.exit('済み')
blk=open(os.path.join(D,'v4.js'),encoding='utf-8').read().rstrip('\n')+'\n'
a='function bossBg(base,ks){';assert s.count(a)==1;s=s.replace(a,blk+a)
a="const GVER='4.65'";assert s.count(a)==1;s=s.replace(a,"const GVER='4.66'")
open(P,'w',encoding='utf-8').write(s);print('ok')
