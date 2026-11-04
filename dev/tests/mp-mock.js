// claude.ai の room を BroadcastChannel で真似る。window.__viewer=true のページは emit できない（presence で送る）
(()=>{const me=Math.random().toString(36).slice(2,10);const ch0=new BroadcastChannel('mockroom'),ch={post:null,set onmessage(f){ch0.onmessage=f},postMessage:d=>{const l=window.__lat||0;if(l)setTimeout(()=>ch0.postMessage(d),l);else ch0.postMessage(d)}};const hs={},ps=[],peers={};let myP={};
 const snap=()=>Object.values(peers).concat([{peer:me,isMe:true,sameTab:true,presence:myP,kind:'viewer',guest:false,by:null,updatedAt:Date.now()}]);
 const fire=(j,u,l)=>{const c={peers:snap(),joined:j,updated:u,left:l};ps.forEach(f=>setTimeout(()=>f(c),0))};
 ch.onmessage=e=>{const d=e.data;if(d.t==='emit'){(hs[d.topic]||[]).forEach(f=>f({topic:d.topic,data:d.data,peer:d.peer,isMe:false,sameTab:false,kind:'viewer',guest:false,by:null}))}
  else if(d.t==='pres'){const isNew=!peers[d.peer];peers[d.peer]={peer:d.peer,isMe:false,sameTab:false,presence:d.presence,kind:'viewer',guest:false,by:null,updatedAt:Date.now()};fire(isNew?[peers[d.peer]]:[],isNew?[]:[peers[d.peer]],[])}
  else if(d.t==='hi'){ch.postMessage({t:'pres',peer:me,presence:myP})}
  else if(d.t==='left'&&peers[d.peer]){const q=peers[d.peer];delete peers[d.peer];fire([],[],[q])}};
 addEventListener('pagehide',()=>{try{ch0.postMessage({t:'left',peer:me})}catch(e){}});
 const room={emit:async(topic,data)=>{if(window.__viewer)throw {code:'not_permitted',message:'x'};if(JSON.stringify(data).length>4096)throw {code:'invalid_argument'};ch.postMessage({t:'emit',topic,data,peer:me});(hs[topic]||[]).forEach(f=>f({topic,data,peer:me,isMe:true,sameTab:true}))},
  on:(topic,f)=>{(hs[topic]=hs[topic]||[]).push(f);return()=>{}},
  presence:async(patch)=>{for(const k in patch){if(patch[k]===null)delete myP[k];else myP[k]=patch[k]}if(new TextEncoder().encode(JSON.stringify(myP)).length>4096)throw {code:'invalid_argument'};ch.postMessage({t:'pres',peer:me,presence:JSON.parse(JSON.stringify(myP))})},
  peers:()=>snap(),onPeers:(f)=>{ps.push(f);setTimeout(()=>f({peers:snap(),joined:snap(),updated:[],left:[]}),0);return()=>{}},connected:()=>true,onConnection:(f)=>{setTimeout(()=>f(true),0);return()=>{}}};
 ch.postMessage({t:'hi'});
 window.claude={use:async n=>n==='room'?room:null}})();
