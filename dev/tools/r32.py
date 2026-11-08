# レリックの絵：r32eng.js（仕組み）と r32defs.js（形）を index.html の「// R32 ここから」〜「// R32 ここまで」に埋め込む。python3 tools/r32.py
import os,re
D=os.path.dirname(os.path.abspath(__file__))
blk='// R32 ここから\n'+open(D+'/r32eng.js').read().strip()+'\nconst RD={\n'+open(D+'/r32defs.js').read().strip()+'\n};\n// R32 ここまで\n'
p=D+'/../index.html';s=open(p).read()
if '// R32 ここから' in s:
    i=s.index('// R32 ここから');j=s.index('// R32 ここまで\n')+len('// R32 ここまで\n');s=s[:i]+blk+s[j:]
else:
    i=s.index('function rIcon(');s=s[:i]+blk+s[i:]
open(p,'w').write(s);print('ok',blk.count('\n'))
