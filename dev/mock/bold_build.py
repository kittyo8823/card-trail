# 使い方: python3 mock/bold_build.py（mock/bold.js・bold5.js の中身を index.html のはっきり方式の区切りに埋め込み直す）
L=open('index.html').read().split('\n')
a=next(i for i,l in enumerate(L) if l.startswith('// ===== カードの絵・はっきり方式'))
b=next(i for i,l in enumerate(L) if l.startswith("for(const n of new Set([...Object.keys(BOS)"))
add=[L[a]]
for f in ['mock/bold.js','mock/bold5.js']:add+=open(f).read().rstrip('\n').split('\n')
L[a:b]=add
open('index.html','w').write('\n'.join(L))
