export const webProjects = [
  {
    "id": "js-url-catalog",
    "course": "js",
    "language": "JavaScript",
    "title": "URL-Katalog",
    "description": "Baue eine durchsuchbare Liste mit Sortierung, Pagination, Euro-Ausgabe und teilbarer URL.",
    "files": {
      "index.html": "<!doctype html><html lang=\"de\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>URL-Katalog</title><style>body{background:#101625;color:#eef2ff;font:16px system-ui;padding:16px;margin:0}*{box-sizing:border-box}button,input,select{font:inherit;padding:10px;margin:4px;max-width:100%;border-radius:8px}button{background:#a18aff;color:#111827;border:0;cursor:pointer}button:disabled{opacity:.5}input,select{background:#202c41;color:white;border:1px solid #64748b}label{display:block}ul{padding-left:22px}li{margin:12px 0}pre{white-space:pre-wrap;overflow-wrap:anywhere}[role=status]{min-height:24px}</style></head><body><h1>URL-Katalog</h1><label>Suche<input id=\"suche\" maxlength=\"80\" placeholder=\"Kurs oder Projekt\"></label><label>Sortierung<select id=\"sort\"><option value=\"titel\">Titel</option><option value=\"preis\">Preis</option></select></label><p id=\"status\" role=\"status\"></p><ul id=\"liste\"></ul><button id=\"vorher\">Zurück</button><button id=\"weiter\">Weiter</button><p>Teilbarer Suchzustand:</p><pre id=\"link\"></pre><script type=\"module\" src=\"main.js\"></script></body></html>",
      "main.js": "import {lesen,schreiben,auswahl} from './katalog.js';\nconst data=[{\"titel\": \"Canvas-Kurs\", \"cent\": 1250}, {\"titel\": \"JavaScript-Kurs\", \"cent\": 0}, {\"titel\": \"SQL-Kurs\", \"cent\": 750}, {\"titel\": \"Pong-Projekt\", \"cent\": 500}, {\"titel\": \"Generator-Workshop\", \"cent\": 450}, {\"titel\": \"API-Workshop\", \"cent\": 2000}];\nlet state=lesen(location.search);const input=document.querySelector('#suche'),sort=document.querySelector('#sort'),liste=document.querySelector('#liste');input.value=state.q;sort.value=state.sort;\nfunction render(){const result=auswahl(data,state);state.page=result.page;liste.replaceChildren();const money=new Intl.NumberFormat('de-DE',{style:'currency',currency:'EUR'});for(const item of result.eintraege){const li=document.createElement('li');li.textContent=`${item.titel} · ${money.format(item.cent/100)}`;liste.append(li);}document.querySelector('#status').textContent=`${result.gesamt} Treffer · Seite ${result.page} von ${result.seiten}`;document.querySelector('#vorher').disabled=state.page<=1;document.querySelector('#weiter').disabled=state.page>=result.seiten;const url=new URL(location.protocol.startsWith('http')?location.href:'https://example.com/katalog');url.search=schreiben(state);document.querySelector('#link').textContent=url.href;try{if(location.protocol.startsWith('http'))history.replaceState(null,'',url);}catch{}}\ninput.addEventListener('input',()=>{state.q=input.value.trim().slice(0,80);state.page=1;render();});sort.addEventListener('change',()=>{state.sort=sort.value;state.page=1;render();});document.querySelector('#vorher').addEventListener('click',()=>{state.page--;render();});document.querySelector('#weiter').addEventListener('click',()=>{state.page++;render();});render();\n",
      "katalog.js": "export function lesen(query){const p=new URLSearchParams(query),raw=p.get('page')||'1',page=/^[1-9]\\d*$/.test(raw)&&Number(raw)<=1000?Number(raw):1;return {q:(p.get('q')||'').trim().slice(0,80),sort:p.get('sort')==='preis'?'preis':'titel',page};}\nexport function schreiben(state){const p=new URLSearchParams();if(state.q)p.set('q',state.q);if(state.sort==='preis')p.set('sort','preis');if(state.page>1)p.set('page',String(state.page));return p.toString();}\nexport function auswahl(data,state){const q=state.q.toLocaleLowerCase('de-DE'),collator=new Intl.Collator('de-DE');const alle=data.filter(item=>item.titel.toLocaleLowerCase('de-DE').includes(q)).sort((a,b)=>state.sort==='preis'?a.cent-b.cent||collator.compare(a.titel,b.titel):collator.compare(a.titel,b.titel));const seiten=Math.max(1,Math.ceil(alle.length/3)),page=Math.min(seiten,Math.max(1,state.page));return {eintraege:alle.slice((page-1)*3,page*3),page,seiten,gesamt:alle.length};}\n",
      "katalog.test.js": "import test from 'node:test';import assert from 'node:assert/strict';import {lesen,schreiben,auswahl} from './katalog.js';\ntest('Query-Zustand erhält Sonderzeichen und prüft Seiten',()=>{assert.deepEqual(lesen('q=C%2B%2B+%26+Spiele&sort=preis&page=2'),{q:'C++ & Spiele',sort:'preis',page:2});for(const page of ['0','01','1e2','1001'])assert.equal(lesen('page='+page).page,1);const state={q:'C++ & Spiele',sort:'preis',page:2};assert.deepEqual(lesen(schreiben(state)),state);});\ntest('Filtern Sortieren und Pagination verändern die Quelle nicht',()=>{const data=[{titel:'B',cent:20},{titel:'A',cent:10},{titel:'C',cent:0},{titel:'D',cent:5}];const before=structuredClone(data);assert.deepEqual(auswahl(data,{q:'',sort:'preis',page:1}).eintraege.map(x=>x.cent),[0,5,10]);assert.equal(auswahl(data,{q:'kein Treffer',sort:'titel',page:99}).page,1);assert.equal(auswahl(data,{q:'a',sort:'titel',page:1}).gesamt,1);assert.deepEqual(data,before);});\n",
      "package.json": "{\n  \"type\": \"module\",\n  \"scripts\": {\n    \"test\": \"node --test katalog.test.js\"\n  }\n}"
    },
    "steps": [
      "Python 3 und Node.js 24 oder neuer für Tests installieren; keine npm-Pakete nötig.",
      "python3 -m http.server 8000 im entpackten Ordner starten.",
      "http://localhost:8000 öffnen, suchen und den Link kopieren.",
      "Der Link stellt Suche, Sortierung und Seite bei einem erneuten Aufruf wieder her.",
      "npm test oder node --test katalog.test.js ausführen."
    ],
    "concepts": [
      {
        "name": "URLSearchParams",
        "explanation": "Liest und schreibt kodierte Suchwerte ohne manuelle Stringverkettung."
      },
      {
        "name": "history.replaceState",
        "explanation": "Aktualisiert die echte URL ohne Seitenneuladen."
      },
      {
        "name": "Intl.NumberFormat / Collator",
        "explanation": "Formatiert Eurobeträge und sortiert Titel für de-DE."
      },
      {
        "name": "Reine Module",
        "explanation": "Ermöglichen Tests für Query und Pagination ohne DOM."
      }
    ],
    "ideas": [
      "Ergänze einen eigenen Randfalltest.",
      "Erweitere die Darstellung, ohne die Datenlogik zu verändern."
    ],
    "demo": "<!doctype html><html lang=\"de\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>URL-Katalog</title><style>body{background:#101625;color:#eef2ff;font:16px system-ui;padding:16px;margin:0}*{box-sizing:border-box}button,input,select{font:inherit;padding:10px;margin:4px;max-width:100%;border-radius:8px}button{background:#a18aff;color:#111827;border:0;cursor:pointer}button:disabled{opacity:.5}input,select{background:#202c41;color:white;border:1px solid #64748b}label{display:block}ul{padding-left:22px}li{margin:12px 0}pre{white-space:pre-wrap;overflow-wrap:anywhere}[role=status]{min-height:24px}</style></head><body><h1>URL-Katalog</h1><p>Die Vorschau zeigt eine Beispiel-URL. Im Download wird die echte Adresszeile aktualisiert.</p><label>Suche<input id=\"suche\" maxlength=\"80\" placeholder=\"Kurs oder Projekt\"></label><label>Sortierung<select id=\"sort\"><option value=\"titel\">Titel</option><option value=\"preis\">Preis</option></select></label><p id=\"status\" role=\"status\"></p><ul id=\"liste\"></ul><button id=\"vorher\">Zurück</button><button id=\"weiter\">Weiter</button><p>Teilbarer Suchzustand:</p><pre id=\"link\"></pre><script>function lesen(query){const p=new URLSearchParams(query),raw=p.get('page')||'1',page=/^[1-9]\\d*$/.test(raw)&&Number(raw)<=1000?Number(raw):1;return {q:(p.get('q')||'').trim().slice(0,80),sort:p.get('sort')==='preis'?'preis':'titel',page};}\nfunction schreiben(state){const p=new URLSearchParams();if(state.q)p.set('q',state.q);if(state.sort==='preis')p.set('sort','preis');if(state.page>1)p.set('page',String(state.page));return p.toString();}\nfunction auswahl(data,state){const q=state.q.toLocaleLowerCase('de-DE'),collator=new Intl.Collator('de-DE');const alle=data.filter(item=>item.titel.toLocaleLowerCase('de-DE').includes(q)).sort((a,b)=>state.sort==='preis'?a.cent-b.cent||collator.compare(a.titel,b.titel):collator.compare(a.titel,b.titel));const seiten=Math.max(1,Math.ceil(alle.length/3)),page=Math.min(seiten,Math.max(1,state.page));return {eintraege:alle.slice((page-1)*3,page*3),page,seiten,gesamt:alle.length};}\nconst data=[{\"titel\": \"Canvas-Kurs\", \"cent\": 1250}, {\"titel\": \"JavaScript-Kurs\", \"cent\": 0}, {\"titel\": \"SQL-Kurs\", \"cent\": 750}, {\"titel\": \"Pong-Projekt\", \"cent\": 500}, {\"titel\": \"Generator-Workshop\", \"cent\": 450}, {\"titel\": \"API-Workshop\", \"cent\": 2000}];\nlet state=lesen(location.search);const input=document.querySelector('#suche'),sort=document.querySelector('#sort'),liste=document.querySelector('#liste');input.value=state.q;sort.value=state.sort;\nfunction render(){const result=auswahl(data,state);state.page=result.page;liste.replaceChildren();const money=new Intl.NumberFormat('de-DE',{style:'currency',currency:'EUR'});for(const item of result.eintraege){const li=document.createElement('li');li.textContent=`${item.titel} · ${money.format(item.cent/100)}`;liste.append(li);}document.querySelector('#status').textContent=`${result.gesamt} Treffer · Seite ${result.page} von ${result.seiten}`;document.querySelector('#vorher').disabled=state.page<=1;document.querySelector('#weiter').disabled=state.page>=result.seiten;const url=new URL(location.protocol.startsWith('http')?location.href:'https://example.com/katalog');url.search=schreiben(state);document.querySelector('#link').textContent=url.href;try{if(location.protocol.startsWith('http'))history.replaceState(null,'',url);}catch{}}\ninput.addEventListener('input',()=>{state.q=input.value.trim().slice(0,80);state.page=1;render();});sort.addEventListener('change',()=>{state.sort=sort.value;state.page=1;render();});document.querySelector('#vorher').addEventListener('click',()=>{state.page--;render();});document.querySelector('#weiter').addEventListener('click',()=>{state.page++;render();});render();\n</script></body></html>",
    "build": {
      "goal": "Baue eine durchsuchbare Liste mit Sortierung, Pagination, Euro-Ausgabe und teilbarer URL.",
      "checkpoints": [
        {
          "id": "etappe-0",
          "title": "Suchen",
          "check": "Kurs findet drei Einträge, unbekannter Text keine.",
          "hint": "Filtere normalisierte Titel."
        },
        {
          "id": "etappe-1",
          "title": "Sortieren",
          "check": "Preis zeigt 0 Cent zuerst.",
          "hint": "Sortiere eine gefilterte Kopie numerisch nach Cent."
        },
        {
          "id": "etappe-2",
          "title": "Seiten",
          "check": "Weiter zeigt die nächste Gruppe; zu große Seiten werden begrenzt.",
          "hint": "Berechne die Seitenzahl mit Math.ceil."
        },
        {
          "id": "etappe-3",
          "title": "URL",
          "check": "Sonderzeichen bleiben beim Kopieren und Wiederöffnen erhalten.",
          "hint": "Nutze URLSearchParams und replaceState."
        },
        {
          "id": "etappe-4",
          "title": "Tests",
          "check": "Query-Rundlauf, Grenzen und unveränderte Daten sind geprüft.",
          "hint": "Teste Datenlogik getrennt von der Darstellung."
        }
      ],
      "starterFiles": {
        "index.html": "<!doctype html><html lang=\"de\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>URL-Katalog</title><style>body{background:#101625;color:#eef2ff;font:16px system-ui;padding:16px;margin:0}*{box-sizing:border-box}button,input,select{font:inherit;padding:10px;margin:4px;max-width:100%;border-radius:8px}button{background:#a18aff;color:#111827;border:0;cursor:pointer}button:disabled{opacity:.5}input,select{background:#202c41;color:white;border:1px solid #64748b}label{display:block}ul{padding-left:22px}li{margin:12px 0}pre{white-space:pre-wrap;overflow-wrap:anywhere}[role=status]{min-height:24px}</style></head><body><h1>URL-Katalog</h1><label>Suche<input id=\"suche\" maxlength=\"80\" placeholder=\"Kurs oder Projekt\"></label><label>Sortierung<select id=\"sort\"><option value=\"titel\">Titel</option><option value=\"preis\">Preis</option></select></label><p id=\"status\" role=\"status\"></p><ul id=\"liste\"></ul><button id=\"vorher\">Zurück</button><button id=\"weiter\">Weiter</button><p>Teilbarer Suchzustand:</p><pre id=\"link\"></pre><script type=\"module\" src=\"main.js\"></script></body></html>",
        "main.js": "// TODO: Query lesen, filtern, rendern und URL aktualisieren.\n",
        "katalog.js": "export function lesen(query) { throw new Error(\"TODO\"); }\nexport function schreiben(state) { throw new Error(\"TODO\"); }\nexport function auswahl(data,state) { throw new Error(\"TODO\"); }\n",
        "katalog.test.js": "import test from \"node:test\";\nimport assert from \"node:assert/strict\";\n// TODO: Sonderzeichen, Nullpreis, Seiten und Mutation testen.\n",
        "package.json": "{\n  \"type\": \"module\",\n  \"scripts\": {\n    \"test\": \"node --test katalog.test.js\"\n  }\n}"
      }
    }
  },
  {
    "id": "js-request-lab",
    "course": "js",
    "language": "JavaScript",
    "title": "Anfrage-Labor",
    "description": "Erlebe echte AbortController-Signale, Ladezustände, HTTP-Fehler und den Schutz vor verspäteten Antworten.",
    "files": {
      "index.html": "<!doctype html><html lang=\"de\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>Anfrage-Labor</title><style>body{background:#101625;color:#eef2ff;font:16px system-ui;padding:16px;margin:0}*{box-sizing:border-box}button,input,select{font:inherit;padding:10px;margin:4px;max-width:100%;border-radius:8px}button{background:#a18aff;color:#111827;border:0;cursor:pointer}button:disabled{opacity:.5}input,select{background:#202c41;color:white;border:1px solid #64748b}label{display:block}ul{padding-left:22px}li{margin:12px 0}pre{white-space:pre-wrap;overflow-wrap:anywhere}[role=status]{min-height:24px}</style></head><body><h1>Anfrage-Labor</h1><label>Antwort<select id=\"typ\"><option value=\"ok\">Erfolg</option><option value=\"fehler\">HTTP-Fehler 503</option></select></label><label>Verzögerung<select id=\"delay\"><option value=\"100\">100 ms</option><option value=\"1500\">1500 ms</option></select></label><button id=\"laden\">Anfrage starten</button><button id=\"abbrechen\" disabled>Abbrechen</button><p id=\"status\" role=\"status\">Bereit</p><pre id=\"ergebnis\"></pre><script>\nlet active,sequence=0;const status=document.querySelector('#status'),ergebnis=document.querySelector('#ergebnis'),stop=document.querySelector('#abbrechen');\ndocument.querySelector('#laden').addEventListener('click',async()=>{active?.abort();const id=++sequence,controller=new AbortController();active=controller;stop.disabled=false;status.textContent='Lädt …';ergebnis.textContent='';const params=new URLSearchParams({typ:document.querySelector('#typ').value,delay:document.querySelector('#delay').value});\ntry{const response=await fetch('/api?'+params,{signal:controller.signal});if(!response.ok)throw new Error('HTTP '+response.status);const data=await response.json();if(id!==sequence||controller.signal.aborted)return;status.textContent='Erfolg';ergebnis.textContent=JSON.stringify(data,null,2);}catch(error){if(id!==sequence)return;status.textContent=error.name==='AbortError'?'Abgebrochen':error.message;}finally{if(id===sequence){stop.disabled=true;active=null;}}});\nstop.addEventListener('click',()=>active?.abort());\n</script></body></html>",
      "server.mjs": "import {createServer} from 'node:http';import {readFile} from 'node:fs/promises';import {pathToFileURL} from 'node:url';\nexport function createApp(){const timers=new Set();const server=createServer(async(req,res)=>{const url=new URL(req.url,'http://localhost');if(req.method==='GET'&&url.pathname==='/'){try{res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});res.end(await readFile(new URL('./index.html',import.meta.url)));}catch{res.end('Seite nicht gefunden');}return;}if(req.method!=='GET'||url.pathname!=='/api'){res.writeHead(404);res.end();return;}const delay=Math.min(2000,Math.max(0,Number(url.searchParams.get('delay'))||0)),typ=url.searchParams.get('typ');const timer=setTimeout(()=>{timers.delete(timer);res.writeHead(typ==='fehler'?503:200,{'Content-Type':'application/json'});res.end(JSON.stringify({nachricht:'Echte lokale API-Antwort',typ}));},delay);timers.add(timer);res.on('close',()=>{clearTimeout(timer);timers.delete(timer);});});server.on('close',()=>{for(const timer of timers)clearTimeout(timer);});return server;}\nif(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const app=createApp();app.listen(3000,'127.0.0.1',()=>console.log('http://127.0.0.1:3000'));app.on('error',error=>{console.error(error.message);process.exitCode=1;});}\n",
      "server.test.mjs": "import test from 'node:test';import assert from 'node:assert/strict';import {once} from 'node:events';import {createApp} from './server.mjs';\ntest('API liefert Erfolg Fehler und reagiert auf echten Fetch-Abbruch',async()=>{const server=createApp();server.listen(0,'127.0.0.1');await once(server,'listening');const url=`http://127.0.0.1:${server.address().port}`;try{const ok=await fetch(url+'/api?typ=ok&delay=1');assert.equal(ok.status,200);assert.equal((await ok.json()).nachricht,'Echte lokale API-Antwort');assert.equal((await fetch(url+'/api?typ=fehler&delay=1')).status,503);const controller=new AbortController();const pending=fetch(url+'/api?typ=ok&delay=1500',{signal:controller.signal});controller.abort();await assert.rejects(pending,error=>error.name==='AbortError');assert.equal((await fetch(url+'/falsch')).status,404);}finally{server.closeAllConnections();await new Promise(resolve=>server.close(resolve));}});\n"
    },
    "steps": [
      "Node.js 24 oder neuer installieren; keine npm-Pakete nötig.",
      "node server.mjs starten und http://127.0.0.1:3000 öffnen.",
      "1500 ms wählen, eine Anfrage starten und abbrechen.",
      "Während einer langsamen Anfrage eine schnellere starten; die alte darf das Ergebnis nicht überschreiben.",
      "node --test server.test.mjs prüft echte HTTP-Antworten und Fetch-Abbruch."
    ],
    "concepts": [
      {
        "name": "AbortController / fetch(signal)",
        "explanation": "Beendet die Client-Anfrage, wenn sie nicht mehr gebraucht wird."
      },
      {
        "name": "Anfragekennung",
        "explanation": "Verhindert, dass alte Antworten einen neuen Zustand ersetzen."
      },
      {
        "name": "response.ok / try-catch-finally",
        "explanation": "Unterscheidet Erfolg, HTTP-Fehler und Abbruch und räumt die UI auf."
      },
      {
        "name": "node:http",
        "explanation": "Liefert im Download echte verzögerte lokale HTTP-Antworten."
      }
    ],
    "ideas": [
      "Ergänze einen eigenen Randfalltest.",
      "Erweitere die Darstellung, ohne die Datenlogik zu verändern."
    ],
    "demo": "<!doctype html><html lang=\"de\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>Anfrage-Labor</title><style>body{background:#101625;color:#eef2ff;font:16px system-ui;padding:16px;margin:0}*{box-sizing:border-box}button,input,select{font:inherit;padding:10px;margin:4px;max-width:100%;border-radius:8px}button{background:#a18aff;color:#111827;border:0;cursor:pointer}button:disabled{opacity:.5}input,select{background:#202c41;color:white;border:1px solid #64748b}label{display:block}ul{padding-left:22px}li{margin:12px 0}pre{white-space:pre-wrap;overflow-wrap:anywhere}[role=status]{min-height:24px}</style></head><body><h1>Anfrage-Labor</h1><p>Lokale Beispieldaten: Antwortzeiten und HTTP-Status sind hier simuliert. Im ZIP läuft eine echte lokale API.</p><label>Antwort<select id=\"typ\"><option value=\"ok\">Erfolg</option><option value=\"fehler\">HTTP-Fehler 503</option></select></label><label>Verzögerung<select id=\"delay\"><option value=\"100\">100 ms</option><option value=\"1500\">1500 ms</option></select></label><button id=\"laden\">Anfrage starten</button><button id=\"abbrechen\" disabled>Abbrechen</button><p id=\"status\" role=\"status\">Bereit</p><pre id=\"ergebnis\"></pre><script>\n// Nur für die eingebettete Demo: lokaler Transport mit simulierten Antworten.\nconst fetch=(path,{signal}={})=>new Promise((resolve,reject)=>{const params=new URL(path,'https://example.com').searchParams;const fail=()=>{clearTimeout(timer);reject(new DOMException('Abgebrochen','AbortError'));};const timer=setTimeout(()=>{signal?.removeEventListener('abort',fail);const status=params.get('typ')==='fehler'?503:200;resolve({ok:status===200,status,json:async()=>({nachricht:'Lokale Beispielantwort',typ:params.get('typ')})});},Number(params.get('delay')));if(signal?.aborted)fail();else signal?.addEventListener('abort',fail,{once:true});});\n\nlet active,sequence=0;const status=document.querySelector('#status'),ergebnis=document.querySelector('#ergebnis'),stop=document.querySelector('#abbrechen');\ndocument.querySelector('#laden').addEventListener('click',async()=>{active?.abort();const id=++sequence,controller=new AbortController();active=controller;stop.disabled=false;status.textContent='Lädt …';ergebnis.textContent='';const params=new URLSearchParams({typ:document.querySelector('#typ').value,delay:document.querySelector('#delay').value});\ntry{const response=await fetch('/api?'+params,{signal:controller.signal});if(!response.ok)throw new Error('HTTP '+response.status);const data=await response.json();if(id!==sequence||controller.signal.aborted)return;status.textContent='Erfolg';ergebnis.textContent=JSON.stringify(data,null,2);}catch(error){if(id!==sequence)return;status.textContent=error.name==='AbortError'?'Abgebrochen':error.message;}finally{if(id===sequence){stop.disabled=true;active=null;}}});\nstop.addEventListener('click',()=>active?.abort());\n</script></body></html>",
    "build": {
      "goal": "Erlebe echte AbortController-Signale, Ladezustände, HTTP-Fehler und den Schutz vor verspäteten Antworten.",
      "checkpoints": [
        {
          "id": "etappe-0",
          "title": "Laden",
          "check": "Start zeigt Lädt und aktiviert Abbrechen.",
          "hint": "Erzeuge pro Anfrage einen neuen Controller."
        },
        {
          "id": "etappe-1",
          "title": "Abbruch",
          "check": "Abbrechen zeigt Abgebrochen und verhindert eine spätere Erfolgsmeldung.",
          "hint": "Übergebe signal an fetch."
        },
        {
          "id": "etappe-2",
          "title": "Fehler",
          "check": "HTTP 503 wird sichtbar angezeigt.",
          "hint": "fetch lehnt bei 503 nicht automatisch ab: Prüfe ok."
        },
        {
          "id": "etappe-3",
          "title": "Neue Anfrage",
          "check": "Eine neue Anfrage ersetzt die laufende ohne altes Ergebnis.",
          "hint": "Vergleiche die Kennung vor jeder UI-Änderung."
        },
        {
          "id": "etappe-4",
          "title": "Tests",
          "check": "Ein echter lokaler Fetch-Abbruch ist automatisiert geprüft.",
          "hint": "Starte den Server auf einem freien Testport."
        }
      ],
      "starterFiles": {
        "index.html": "<!doctype html><html lang=\"de\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>Anfrage-Labor</title><style>body{background:#101625;color:#eef2ff;font:16px system-ui;padding:16px;margin:0}*{box-sizing:border-box}button,input,select{font:inherit;padding:10px;margin:4px;max-width:100%;border-radius:8px}button{background:#a18aff;color:#111827;border:0;cursor:pointer}button:disabled{opacity:.5}input,select{background:#202c41;color:white;border:1px solid #64748b}label{display:block}ul{padding-left:22px}li{margin:12px 0}pre{white-space:pre-wrap;overflow-wrap:anywhere}[role=status]{min-height:24px}</style></head><body><h1>Anfrage-Labor</h1><label>Antwort<select id=\"typ\"><option value=\"ok\">Erfolg</option><option value=\"fehler\">HTTP-Fehler 503</option></select></label><label>Verzögerung<select id=\"delay\"><option value=\"100\">100 ms</option><option value=\"1500\">1500 ms</option></select></label><button id=\"laden\">Anfrage starten</button><button id=\"abbrechen\" disabled>Abbrechen</button><p id=\"status\" role=\"status\">Bereit</p><pre id=\"ergebnis\"></pre><script>// TODO: Controller, Kennung, fetch und Fehlerzustände verbinden.</script></body></html>",
        "server.mjs": "import {createServer} from 'node:http';import {readFile} from 'node:fs/promises';import {pathToFileURL} from 'node:url';\nexport function createApp(){const timers=new Set();const server=createServer(async(req,res)=>{const url=new URL(req.url,'http://localhost');if(req.method==='GET'&&url.pathname==='/'){try{res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});res.end(await readFile(new URL('./index.html',import.meta.url)));}catch{res.end('Seite nicht gefunden');}return;}if(req.method!=='GET'||url.pathname!=='/api'){res.writeHead(404);res.end();return;}const delay=Math.min(2000,Math.max(0,Number(url.searchParams.get('delay'))||0)),typ=url.searchParams.get('typ');const timer=setTimeout(()=>{timers.delete(timer);res.writeHead(typ==='fehler'?503:200,{'Content-Type':'application/json'});res.end(JSON.stringify({nachricht:'Echte lokale API-Antwort',typ}));},delay);timers.add(timer);res.on('close',()=>{clearTimeout(timer);timers.delete(timer);});});server.on('close',()=>{for(const timer of timers)clearTimeout(timer);});return server;}\nif(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const app=createApp();app.listen(3000,'127.0.0.1',()=>console.log('http://127.0.0.1:3000'));app.on('error',error=>{console.error(error.message);process.exitCode=1;});}\n",
        "server.test.mjs": "import test from \"node:test\";\nimport assert from \"node:assert/strict\";\n// TODO: Erfolg, HTTP-Fehler und Abbruch prüfen.\n"
      }
    }
  }
];
