// index.html を作る：node tools/build.js [Card Trail の index.html]
// 1) Card Trail の「音」の区切り（曲の譜面・鳴らす関数・埋め込みの音源）をそのまま切り出す
// 2) src/game.js（three.js と assets.json を含む）を esbuild で1つにまとめる
const fs=require('fs'),path=require('path'),es=require('esbuild');
const SRC=path.resolve(process.argv[2]||path.join(__dirname,'../../card-trail/dev/index.html'));
const h=fs.readFileSync(SRC,'utf8'),a=h.indexOf('/* ===== 音 ===== */'),z=h.indexOf('/* ===== 描画ヘルパー ===== */');
if(a<0||z<0)throw new Error('音の区切りが見つからない');
const audio=h.slice(a,z);
const js=es.buildSync({entryPoints:[path.join(__dirname,'../src/game.js')],bundle:true,minify:true,format:'iife',write:false,loader:{'.json':'json'},target:'es2020',legalComments:'none'}).outputFiles[0].text;
const html=`<!DOCTYPE html>
<html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no">
<title>戦場（仮題）</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=DotGothic16&display=swap" rel="stylesheet">
<style>html,body{margin:0;height:100%;background:#090b12;overflow:hidden;touch-action:none;user-select:none;-webkit-user-select:none}canvas{position:fixed;left:0;top:0;display:block}#ui{z-index:2}</style>
</head><body>
<script>
// Card Trail の音の部品が参照する値（このゲームでは使わないものはダミー）
let S='game',QT=0,RNG=null;
${audio}
</script>
<script>${js.replace(/<\/script/g,'<\\/script')}</script>
</body></html>`;
fs.mkdirSync(path.join(__dirname,'../dist'),{recursive:true});fs.writeFileSync(path.join(__dirname,'../index.html'),html);
// アーティファクト用（外側の html/head/body は公開時に付く）
const art=html.replace(/^[\s\S]*?<title>/,'<title>').replace('</head><body>','').replace('</body></html>','').replace(/<meta charset[^>]*>/,'');fs.writeFileSync(path.join(__dirname,'../dist/artifact.html'),art);
console.log('index.html',(html.length/1e6).toFixed(2)+'MB','(js',(js.length/1e6).toFixed(2)+'MB)');
