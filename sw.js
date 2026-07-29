const C='misgastos-v2';
const F=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(F).catch(()=>{})))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const esDoc = e.request.mode==='navigate' || e.request.destination==='document';
  if(esDoc){
    /* la app: red primero, para que al subir una version nueva a GitHub se vea nada mas abrirla */
    e.respondWith(fetch(e.request).then(res=>{
      const cp=res.clone();caches.open(C).then(c=>c.put('./index.html',cp).catch(()=>{}));return res;
    }).catch(()=>caches.match('./index.html').then(r=>r||caches.match('./'))));
    return;
  }
  /* el resto (iconos, manifest): cache primero */
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{
    const cp=res.clone();caches.open(C).then(c=>c.put(e.request,cp).catch(()=>{}));return res;
  }).catch(()=>caches.match('./index.html'))));
});
