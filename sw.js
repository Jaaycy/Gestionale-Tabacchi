const C='casse-v50',F=['./','index.html','manifest.json','icon-180.png','icon-192.png','icon-512.png'];
// casse-v50: foglia di tabacco dettagliata (anche nell'avvio, disegnata nella pagina: niente ritardo) + avvio senza scatto
// casse-v49: effetto d'errore sui campi (ondeggia, bordo terracotta, messaggio sotto il campo)
// casse-v48: barra e goccia in un unico pezzo (effetto liquido, scatto a dente), tendine a goccia, calendario di Tabby, annullo timbrato al salvataggio, avvio più grande
// casse-v47: barra con linguetta e lampada di bottega; la linguetta e Giorno/Mese... seguono il dito; pagina disegnata dopo l'avvio dell'animazione
// casse-v45: Tabby si apre SUBITO con i file salvati sul telefono (anche con internet lento o assente)
// e intanto scarica in sottofondo la versione nuova: dopo un aggiornamento su GitHub si vede dalla seconda apertura.
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
const net=fetch(e.request).then(r=>{if(r&&r.ok){const c=r.clone();caches.open(C).then(x=>x.put(e.request,c))}return r});
e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(h=>h||net).catch(()=>caches.match('index.html')));
e.waitUntil(net.then(()=>{},()=>{}))});
