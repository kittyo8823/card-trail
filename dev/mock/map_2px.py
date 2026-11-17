import json,math
def blank(n):return [['.']*n for _ in range(n)]
G={}
# battle 12
g=blank(12)
def P(g,x,y,c):
    if 0<=x<len(g) and 0<=y<len(g):g[y][x]=c
for f in (lambda a:a,lambda a:11-a):
    for k in range(7):
        P(g,f(k),k,'4')
        if k<6:P(g,f(k+1),k,'3')
    for a,b in[(8,6),(7,7),(6,8)]:P(g,f(a),b,'2')
    P(g,f(8),8,'1');P(g,f(9),9,'1');P(g,f(10),10,'2')
G['b']=g
# elite 14
H=["1......","21.....",".21....","..21.22","...1233","...2333","...3113","...3333","...2333","....331","....333","....323","....3.3","......."]
G['e']=[list(h+h[::-1]) for h in H]
# coin 12
g=blank(12)
for y in range(12):
    for x in range(12):
        dx,dy=x-5.5,y-5.5;d=math.hypot(dx,dy)
        if d<=5.9:
            c='1' if d>4.9 else '3'
            if 3.6<d<=4.9 and dx+dy<-3:c='4'
            a=math.degrees(math.atan2(dy,dx))
            if 1.5<=d<=3.2 and not(-50<a<50):c='1'
            g[y][x]=c
G['s']=g
# fire 12
g=blank(12)
for y in range(9):
    w=[0.5,1,1.4,2,2.5,3,3.3,3.4,3.2][y]
    for x in range(12):
        dx=x-5.5+(0.6 if y<4 else 0)
        if abs(dx)<=w:
            g[y][x]='4' if abs(dx)<w*.45 and y>2 else '3' if abs(dx)<w*.8 else '2'
for x,y in[(2,9),(3,9),(4,10),(5,10),(6,10),(7,10),(8,9),(9,9),(1,10),(10,10),(2,11),(9,11)]:g[y][x]='1'
G['r']=g
G['q']=[list(r) for r in ["...222222...","..23333332..",".2332222332.",".232....232.","........232.",".......2332.","......2332..",".....2332...",".....232....","............",".....232....",".....222...."]]
G['c']=[list(r) for r in ["............","..22222222..",".2333333332.",".2333333332.",".1111111111.",".2331441332.",".2333113332.",".2333333332.",".2333333332.",".2222222222.","............","............"]]
open('/tmp/claude-0/ser/g12.json','w').write(json.dumps({k:[''.join(r) for r in v] for k,v in G.items()}))
for k,v in G.items():
    print(k);print('\n'.join(''.join(r) for r in v))
