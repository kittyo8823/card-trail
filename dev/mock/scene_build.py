# 使い方: python3 mock/scene_build.py（mock/scene.js・scene_spec.js・newart.js の中身を index.html の場面方式の区切りに埋め込み直す）
L=open('index.html').read().split('\n')
a=next(i for i,l in enumerate(L) if l.startswith('// ===== カードの絵・場面方式'))
b=next(i for i,l in enumerate(L) if l.startswith("for(const n of new Set([...Object.keys(SCS)"))
add=[L[a]]
for f in ['mock/scene.js','mock/scene_spec.js','mock/newart.js']:add+=open(f).read().rstrip('\n').split('\n')
L[a:b]=add
open('index.html','w').write('\n'.join(L))
