# レリックの16×16の絵（dev/tools/r16.txt）を index.html の R16 に埋め込む。使い方: python3 tools/r16.py [--sheet]
import re,sys,json,os
D=os.path.dirname(os.path.abspath(__file__));src=open(D+'/r16.txt').read()
ic={};cur=None;bad=[]
for ln in src.split('\n'):
    ln=ln.rstrip()
    if not ln or ln.startswith('#'):continue
    m=re.match(r'^\[(\w+)\]\s*(.*)$',ln)
    if m:cur=m.group(1);ic[cur]={'r':[],'p':{}}
    for a,b in re.findall(r'(\w)=(#[0-9a-fA-F]{6})',m.group(2)) if m else []:ic[cur]['p'][a]=b
    if m:continue
    if len(ln)!=16:bad.append((cur,len(ic[cur]['r']),len(ln)))
    ic[cur]['r'].append((ln+'.'*16)[:16])
for k,v in ic.items():
    if len(v['r'])!=16:bad.append((k,'rows',len(v['r'])))
    v['r']=(v['r']+['.'*16]*16)[:16]
print('icons',len(ic),'bad',bad)
js='const R16='+json.dumps({k:[''.join(v['r']),v['p']] for k,v in ic.items()},ensure_ascii=False,separators=(',',':'))+';'
p=D+'/../index.html';s=open(p).read()
if 'const R16=' in s:s=re.sub(r'const R16=.*?;\n',lambda _:js+'\n',s,count=1,flags=re.S)
else:
    i=s.index('function rIcon(');s=s[:i]+'// Ver2.54 レリックの16×16の絵（元は dev/tools/r16.txt、tools/r16.py で埋め込む）。R16P が共通の色、各絵の後ろの {} がその絵だけの色\n'+js+'\n'+s[i:]
open(p,'w').write(s)
