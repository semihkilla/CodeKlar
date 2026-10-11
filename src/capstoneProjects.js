export const capstoneProjects = [
  {
    "id": "js-capstone-cards",
    "course": "js",
    "language": "JavaScript",
    "title": "Lernkarten-Trainer",
    "description": "Baue eine eigene Lern-App mit automatisch geprüften Antworten, fälligen Karten und einer Wiederholungsplanung.",
    "files": {
      "index.html": "<!doctype html><html lang=\"de\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>Lernkarten-Trainer</title><style>body{background:#101625;color:#eee;font:16px system-ui;padding:20px;max-width:780px;margin:auto}button,input,select{font:inherit;min-height:44px;border-radius:8px;padding:8px;margin:4px;max-width:100%;box-sizing:border-box}button{background:#9b87ff;color:#101625;border:0;cursor:pointer}label{display:block;margin:10px 0}table{width:100%;border-collapse:collapse}td,th{text-align:left;padding:10px;border-bottom:1px solid #38435a}pre{white-space:pre-wrap;overflow-wrap:anywhere}p{line-height:1.6}#status{min-height:48px}input{background:#172033;color:#eee;border:1px solid #56617a}section{padding:12px;border:1px solid #38435a;border-radius:8px;margin:16px 0}</style></head><body><h1>Lernkarten-Trainer</h1><p>Beantworte drei Karten. Die Tage werden bewusst simuliert; es läuft kein echter Kalender.</p><p id=\"day\"></p><section><h2 id=\"question\"></h2><form id=\"form\"><label>Deine Antwort<input id=\"answer\" autocomplete=\"off\"></label><button id=\"check\">Antwort prüfen</button></form></section><p id=\"status\" role=\"status\"></p><button id=\"next\">Nächster Tag</button><button id=\"reset\">Neu starten</button><h2>Wiederholungsplan</h2><pre id=\"plan\"></pre><script type=\"module\" src=\"main.js\"></script></body></html>",
      "domain.js": "export function createDeck() {\n  return [{id:'null',question:'Welcher Operator ersetzt nur null und undefined?',answer:'??',streak:0,due:0},{id:'map',question:'Welche Array-Methode verwandelt jedes Element?',answer:'map',streak:0,due:0},{id:'fifo',question:'Wie heißt zuerst rein, zuerst raus?',answer:'fifo',streak:0,due:0}];\n}\nexport function nextCard(cards, day) {\n  return cards.filter(card=>card.due<=day).sort((a,b)=>a.due-b.due||(a.id<b.id?-1:a.id>b.id?1:0))[0] ?? null;\n}\nexport function answerCard(cards, id, text, day) {\n  const card=cards.find(card=>card.id===id);\n  if(!card || !Number.isSafeInteger(day) || day<0 || typeof text!=='string') return {cards,correct:false,accepted:false};\n  const correct=text.trim().toLowerCase()===card.answer.toLowerCase();\n  const streak=correct?card.streak+1:0;\n  const interval=correct?[1,3,7,14][Math.min(streak-1,3)]:0;\n  return {accepted:true,correct,cards:cards.map(item=>item.id===id?{...item,streak,due:day+interval}:item)};\n}\n",
      "main.js": "import {createDeck,nextCard,answerCard} from './domain.js';\nlet cards=createDeck(), day=0;\nconst status=document.querySelector('#status'), input=document.querySelector('#answer');\nfunction render(){\n  const card=nextCard(cards,day);\n  document.querySelector('#day').textContent=`Simulierter Lerntag ${day} · ${cards.filter(c=>c.due<=day).length} Karten fällig`;\n  document.querySelector('#question').textContent=card?card.question:'Für heute fertig! Springe zum nächsten Tag.';\n  input.disabled=!card;document.querySelector('#check').disabled=!card;\n  document.querySelector('#plan').textContent=cards.map(c=>`${c.id}: Tag ${c.due}, Serie ${c.streak}`).join('\\n');\n}\nconst submit=event=>{event.preventDefault();const card=nextCard(cards,day);if(!card)return;const result=answerCard(cards,card.id,input.value,day);cards=result.cards;status.textContent=result.correct?'Richtig! Die Wiederholung wird später fällig.':'Noch nicht richtig. Erwartet: '+card.answer;input.value='';render();};\nconst form=document.querySelector('#form');\nform.addEventListener('submit',submit);\nconst submitButton=form.querySelector('button');submitButton.type='button';submitButton.addEventListener('click',submit);\nform.addEventListener('keydown',event=>{if(event.key==='Enter'){event.preventDefault();submit(event);}});\ndocument.querySelector('#next').addEventListener('click',()=>{day++;status.textContent='Ein simulierter Tag weiter.';render();});\ndocument.querySelector('#reset').addEventListener('click',()=>{cards=createDeck();day=0;status.textContent='Neue Lernrunde.';render();});\nrender();\n",
      "domain.test.js": "import {test} from 'node:test';\nimport assert from 'node:assert/strict';\nimport {createDeck,nextCard,answerCard} from './domain.js';\ntest('fresh decks are independent',()=>{const a=createDeck(),b=createDeck();assert.equal(a.length,3);a[0].due=99;assert.equal(b[0].due,0);});\ntest('inclusive due dates and stable ties',()=>{assert.equal(nextCard([{id:'b',due:1},{id:'a',due:1}],1).id,'a');assert.equal(nextCard([{id:'a',due:2}],1),null);assert.equal(nextCard([],0),null);});\ntest('correct answer normalizes case and advances date without mutation',()=>{const cards=createDeck(),before=structuredClone(cards);const result=answerCard(cards,'fifo',' FIFO ',3);assert.equal(result.correct,true);assert.equal(result.cards.find(c=>c.id==='fifo').due,4);assert.deepEqual(cards,before);});\ntest('wrong answer resets success series',()=>{const cards=[{id:'a',answer:'x',streak:3,due:2}];const result=answerCard(cards,'a','y',5);assert.equal(result.correct,false);assert.equal(result.cards[0].streak,0);assert.equal(result.cards[0].due,5);});\ntest('interval cap and rejected identity',()=>{assert.equal(answerCard([{id:'a',answer:'x',streak:9,due:0}],'a','x',1).cards[0].due,15);const cards=createDeck();assert.equal(answerCard(cards,'missing','x',0).accepted,false);assert.equal(answerCard(cards,'fifo','fifo',-1).accepted,false);});\n",
      "package.json": "{\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": {\n    \"test\": \"node --test domain.test.js\"\n  }\n}"
    },
    "demo": "<!doctype html><html lang=\"de\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>Lernkarten-Trainer</title><style>body{background:#101625;color:#eee;font:16px system-ui;padding:20px;max-width:780px;margin:auto}button,input,select{font:inherit;min-height:44px;border-radius:8px;padding:8px;margin:4px;max-width:100%;box-sizing:border-box}button{background:#9b87ff;color:#101625;border:0;cursor:pointer}label{display:block;margin:10px 0}table{width:100%;border-collapse:collapse}td,th{text-align:left;padding:10px;border-bottom:1px solid #38435a}pre{white-space:pre-wrap;overflow-wrap:anywhere}p{line-height:1.6}#status{min-height:48px}input{background:#172033;color:#eee;border:1px solid #56617a}section{padding:12px;border:1px solid #38435a;border-radius:8px;margin:16px 0}</style></head><body><h1>Lernkarten-Trainer</h1><p>Beantworte drei Karten. Die Tage werden bewusst simuliert; es läuft kein echter Kalender.</p><p id=\"day\"></p><section><h2 id=\"question\"></h2><form id=\"form\"><label>Deine Antwort<input id=\"answer\" autocomplete=\"off\"></label><button id=\"check\">Antwort prüfen</button></form></section><p id=\"status\" role=\"status\"></p><button id=\"next\">Nächster Tag</button><button id=\"reset\">Neu starten</button><h2>Wiederholungsplan</h2><pre id=\"plan\"></pre><script>function createDeck() {\n  return [{id:'null',question:'Welcher Operator ersetzt nur null und undefined?',answer:'??',streak:0,due:0},{id:'map',question:'Welche Array-Methode verwandelt jedes Element?',answer:'map',streak:0,due:0},{id:'fifo',question:'Wie heißt zuerst rein, zuerst raus?',answer:'fifo',streak:0,due:0}];\n}\nfunction nextCard(cards, day) {\n  return cards.filter(card=>card.due<=day).sort((a,b)=>a.due-b.due||(a.id<b.id?-1:a.id>b.id?1:0))[0] ?? null;\n}\nfunction answerCard(cards, id, text, day) {\n  const card=cards.find(card=>card.id===id);\n  if(!card || !Number.isSafeInteger(day) || day<0 || typeof text!=='string') return {cards,correct:false,accepted:false};\n  const correct=text.trim().toLowerCase()===card.answer.toLowerCase();\n  const streak=correct?card.streak+1:0;\n  const interval=correct?[1,3,7,14][Math.min(streak-1,3)]:0;\n  return {accepted:true,correct,cards:cards.map(item=>item.id===id?{...item,streak,due:day+interval}:item)};\n}\n\nlet cards=createDeck(), day=0;\nconst status=document.querySelector('#status'), input=document.querySelector('#answer');\nfunction render(){\n  const card=nextCard(cards,day);\n  document.querySelector('#day').textContent=`Simulierter Lerntag ${day} · ${cards.filter(c=>c.due<=day).length} Karten fällig`;\n  document.querySelector('#question').textContent=card?card.question:'Für heute fertig! Springe zum nächsten Tag.';\n  input.disabled=!card;document.querySelector('#check').disabled=!card;\n  document.querySelector('#plan').textContent=cards.map(c=>`${c.id}: Tag ${c.due}, Serie ${c.streak}`).join('\\n');\n}\nconst submit=event=>{event.preventDefault();const card=nextCard(cards,day);if(!card)return;const result=answerCard(cards,card.id,input.value,day);cards=result.cards;status.textContent=result.correct?'Richtig! Die Wiederholung wird später fällig.':'Noch nicht richtig. Erwartet: '+card.answer;input.value='';render();};\nconst form=document.querySelector('#form');\nform.addEventListener('submit',submit);\nconst submitButton=form.querySelector('button');submitButton.type='button';submitButton.addEventListener('click',submit);\nform.addEventListener('keydown',event=>{if(event.key==='Enter'){event.preventDefault();submit(event);}});\ndocument.querySelector('#next').addEventListener('click',()=>{day++;status.textContent='Ein simulierter Tag weiter.';render();});\ndocument.querySelector('#reset').addEventListener('click',()=>{cards=createDeck();day=0;status.textContent='Neue Lernrunde.';render();});\nrender();</script></body></html>",
    "steps": [
      "ZIP entpacken und den Ordner im Editor öffnen.",
      "Node.js 24 oder neuer: npm test prüft die Logik ohne zusätzliche Pakete.",
      "Im Projektordner python -m http.server 8000 starten; danach http://localhost:8000 öffnen. ES-Module brauchen einen lokalen Webserver."
    ],
    "concepts": [
      {
        "name": "filter / sort",
        "explanation": "Wählt fällige Karten nachvollziehbar aus."
      },
      {
        "name": "map / Spread",
        "explanation": "Ändert nur die bewertete Karte ohne Eingabemutation."
      },
      {
        "name": "submit / textContent",
        "explanation": "Verbindet Antworten mit sicherer Anzeige."
      }
    ],
    "ideas": [
      "Speichere einen validierten, versionierten Lernstand lokal.",
      "Ergänze mehrere Antwortmöglichkeiten.",
      "Füge JSON-Import und -Export mit Größenlimit hinzu."
    ],
    "build": {
      "goal": "Baue eine eigene Lern-App mit automatisch geprüften Antworten, fälligen Karten und einer Wiederholungsplanung. Implementiere zuerst die Logik, danach die Bedienung.",
      "checkpoints": [
        {
          "id": "0",
          "title": "Kartenmodell",
          "check": "Jeder Aufruf erzeugt unabhängige Karten mit id, question, answer, streak und due.",
          "hint": "Erzeuge die Objekte innerhalb der Funktion."
        },
        {
          "id": "1",
          "title": "Fällige Auswahl",
          "check": "Gleichstände werden nach id entschieden; zukünftige Karten sind nicht auswählbar.",
          "hint": "filter und eine Vergleichsfunktion kombinieren."
        },
        {
          "id": "2",
          "title": "Antwort und Planung",
          "check": "Richtige Antworten verlängern die Wiederholung; Fehler setzen die Serie zurück. Alle Node-Tests bestehen.",
          "hint": "Trenne accepted von correct und kopiere das geänderte Kartenobjekt."
        },
        {
          "id": "3",
          "title": "Bedienung",
          "check": "Absenden, Tagwechsel und Neustart aktualisieren Frage, Plan und Rückmeldung.",
          "hint": "Jede Aktion ändert zuerst den Zustand, dann render."
        },
        {
          "id": "4",
          "title": "Eigene Erweiterung",
          "check": "Ergänze zwei eigene Fragen und Tests für leere Antworten sowie mehrere Tagwechsel.",
          "hint": "Die Antworten werden hier nur als normalisierter Text verglichen, nicht semantisch bewertet."
        }
      ],
      "starterFiles": {
        "index.html": "<!doctype html><html lang=\"de\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>Lernkarten-Trainer</title><style>body{background:#101625;color:#eee;font:16px system-ui;padding:20px;max-width:780px;margin:auto}button,input,select{font:inherit;min-height:44px;border-radius:8px;padding:8px;margin:4px;max-width:100%;box-sizing:border-box}button{background:#9b87ff;color:#101625;border:0;cursor:pointer}label{display:block;margin:10px 0}table{width:100%;border-collapse:collapse}td,th{text-align:left;padding:10px;border-bottom:1px solid #38435a}pre{white-space:pre-wrap;overflow-wrap:anywhere}p{line-height:1.6}#status{min-height:48px}input{background:#172033;color:#eee;border:1px solid #56617a}section{padding:12px;border:1px solid #38435a;border-radius:8px;margin:16px 0}</style></head><body><h1>Lernkarten-Trainer</h1><p>Beantworte drei Karten. Die Tage werden bewusst simuliert; es läuft kein echter Kalender.</p><p id=\"day\"></p><section><h2 id=\"question\"></h2><form id=\"form\"><label>Deine Antwort<input id=\"answer\" autocomplete=\"off\"></label><button id=\"check\">Antwort prüfen</button></form></section><p id=\"status\" role=\"status\"></p><button id=\"next\">Nächster Tag</button><button id=\"reset\">Neu starten</button><h2>Wiederholungsplan</h2><pre id=\"plan\"></pre><script type=\"module\" src=\"main.js\"></script></body></html>",
        "domain.js": "export function createDeck(){ /* TODO: drei Karten */ return []; }\nexport function nextCard(cards,day){ /* TODO: Fälligkeit */ return null; }\nexport function answerCard(cards,id,text,day){ /* TODO: prüfen und planen */ return {cards,correct:false,accepted:false}; }\n",
        "main.js": "// TODO: Verknüpfe deine domain.js-Exporte mit den Formularen und Buttons.\n// Nutze textContent für nutzerseitige Texte und render nach jeder Zustandsänderung.\n",
        "domain.test.js": "import {test} from 'node:test';\nimport assert from 'node:assert/strict';\nimport {createDeck,nextCard,answerCard} from './domain.js';\ntest('fresh decks are independent',()=>{const a=createDeck(),b=createDeck();assert.equal(a.length,3);a[0].due=99;assert.equal(b[0].due,0);});\ntest('inclusive due dates and stable ties',()=>{assert.equal(nextCard([{id:'b',due:1},{id:'a',due:1}],1).id,'a');assert.equal(nextCard([{id:'a',due:2}],1),null);assert.equal(nextCard([],0),null);});\ntest('correct answer normalizes case and advances date without mutation',()=>{const cards=createDeck(),before=structuredClone(cards);const result=answerCard(cards,'fifo',' FIFO ',3);assert.equal(result.correct,true);assert.equal(result.cards.find(c=>c.id==='fifo').due,4);assert.deepEqual(cards,before);});\ntest('wrong answer resets success series',()=>{const cards=[{id:'a',answer:'x',streak:3,due:2}];const result=answerCard(cards,'a','y',5);assert.equal(result.correct,false);assert.equal(result.cards[0].streak,0);assert.equal(result.cards[0].due,5);});\ntest('interval cap and rejected identity',()=>{assert.equal(answerCard([{id:'a',answer:'x',streak:9,due:0}],'a','x',1).cards[0].due,15);const cards=createDeck();assert.equal(answerCard(cards,'missing','x',0).accepted,false);assert.equal(answerCard(cards,'fifo','fifo',-1).accepted,false);});\n",
        "package.json": "{\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": {\n    \"test\": \"node --test domain.test.js\"\n  }\n}"
      }
    },
    "lessonIds": [
      "js-practice-flashcards",
      "js-practice-review-plan",
      "js-practice-save-version"
    ]
  },
  {
    "id": "js-capstone-stock",
    "course": "js",
    "language": "JavaScript",
    "title": "Inventar-Dashboard",
    "description": "Baue eine kleine Warenverwaltung mit Bestandsprüfung, Verkäufen, Nachlieferungen und einem Lagerwert in Cents.",
    "files": {
      "index.html": "<!doctype html><html lang=\"de\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>Inventar-Dashboard</title><style>body{background:#101625;color:#eee;font:16px system-ui;padding:20px;max-width:780px;margin:auto}button,input,select{font:inherit;min-height:44px;border-radius:8px;padding:8px;margin:4px;max-width:100%;box-sizing:border-box}button{background:#9b87ff;color:#101625;border:0;cursor:pointer}label{display:block;margin:10px 0}table{width:100%;border-collapse:collapse}td,th{text-align:left;padding:10px;border-bottom:1px solid #38435a}pre{white-space:pre-wrap;overflow-wrap:anywhere}p{line-height:1.6}#status{min-height:48px}input{background:#172033;color:#eee;border:1px solid #56617a}section{padding:12px;border:1px solid #38435a;border-radius:8px;margin:16px 0}</style></head><body><h1>Inventar-Dashboard</h1><table><thead><tr><th>Artikel</th><th>Bestand</th><th>Preis</th></tr></thead><tbody id=\"rows\"></tbody></table><p id=\"value\"></p><form id=\"form\" novalidate><label>Artikel<select id=\"item\"><option value=\"a\">Tastatur</option><option value=\"b\">Maus</option></select></label><label>Buchung<select id=\"operation\"><option value=\"sell\">Verkaufen</option><option value=\"restock\">Nachliefern</option></select></label><label>Menge<input id=\"quantity\" type=\"number\" value=\"1\" min=\"1\" step=\"1\"></label><button>Buchen</button></form><p id=\"status\" role=\"status\"></p><button id=\"reset\">Zurücksetzen</button><script type=\"module\" src=\"main.js\"></script></body></html>",
      "domain.js": "export function initialStock(){return [{id:'a',name:'Tastatur',stock:5,price:2500},{id:'b',name:'Maus',stock:3,price:1500}];}\nexport function sell(items,id,quantity){\n  const item=items.find(item=>item.id===id);\n  if(!item||!Number.isSafeInteger(quantity)||quantity<=0||quantity>item.stock)return {ok:false,items};\n  return {ok:true,items:items.map(item=>item.id===id?{...item,stock:item.stock-quantity}:item)};\n}\nexport function restock(items,id,quantity){\n  const item=items.find(item=>item.id===id);\n  if(!item||!Number.isSafeInteger(quantity)||quantity<=0||!Number.isSafeInteger(item.stock+quantity))return {ok:false,items};\n  const next=items.map(item=>item.id===id?{...item,stock:item.stock+quantity}:item);\n  if(!Number.isSafeInteger(stockValue(next)))return {ok:false,items};\n  return {ok:true,items:next};\n}\nexport function stockValue(items){return items.reduce((total,item)=>total+item.stock*item.price,0);}\n",
      "main.js": "import {initialStock,sell,restock,stockValue} from './domain.js';\nlet items=initialStock();\nconst status=document.querySelector('#status'),body=document.querySelector('#rows');\nconst euro=cents=>new Intl.NumberFormat('de-DE',{style:'currency',currency:'EUR'}).format(cents/100);\nfunction render(){\n  body.replaceChildren();\n  for(const item of items){const row=document.createElement('tr');for(const value of [item.name,item.stock,euro(item.price)]){const cell=document.createElement('td');cell.textContent=value;row.append(cell);}body.append(row);}\n  document.querySelector('#value').textContent='Lagerwert: '+euro(stockValue(items));\n}\nconst submit=event=>{event.preventDefault();const id=document.querySelector('#item').value;const quantity=Number(document.querySelector('#quantity').value);const operation=document.querySelector('#operation').value;const result=(operation==='sell'?sell:restock)(items,id,quantity);items=result.items;status.textContent=result.ok?'Buchung erfolgreich.':'Abgelehnt: Menge, Bestand oder Lagerwert außerhalb der gültigen Grenzen.';render();};\nconst form=document.querySelector('#form');\nform.addEventListener('submit',submit);\nconst submitButton=form.querySelector('button');submitButton.type='button';submitButton.addEventListener('click',submit);\nform.addEventListener('keydown',event=>{if(event.key==='Enter'){event.preventDefault();submit(event);}});\ndocument.querySelector('#reset').addEventListener('click',()=>{items=initialStock();status.textContent='Beispielbestand zurückgesetzt.';render();});render();\n",
      "domain.test.js": "import {test} from 'node:test';import assert from 'node:assert/strict';import {initialStock,sell,restock,stockValue} from './domain.js';\ntest('complete sale without mutation',()=>{const a=initialStock(),before=structuredClone(a);const r=sell(a,'a',5);assert.equal(r.ok,true);assert.equal(r.items[0].stock,0);assert.deepEqual(a,before);assert.deepEqual(r.items[1],a[1]);});\ntest('overselling and unknown identities leave state untouched',()=>{const a=initialStock();for(const [id,n] of [['a',6],['missing',1]])assert.deepEqual(sell(a,id,n),{ok:false,items:a});});\ntest('integer quantity contract',()=>{const a=initialStock();for(const n of [0,-1,1.5,NaN,Infinity]){assert.equal(sell(a,'a',n).ok,false);assert.equal(restock(a,'a',n).ok,false);}});\ntest('restock and repeated sale',()=>{const a=initialStock();const r=restock(a,'b',2);assert.equal(r.items[1].stock,5);assert.equal(a[1].stock,3);assert.equal(sell(r.items,'b',5).items[1].stock,0);});\ntest('cent valuation includes zeros',()=>{assert.equal(stockValue(initialStock()),17000);assert.equal(stockValue([]),0);assert.equal(stockValue([{stock:0,price:100},{stock:3,price:0}]),0);});\ntest('stock overflow rejected',()=>{assert.equal(restock([{id:'a',stock:Number.MAX_SAFE_INTEGER,price:1}],'a',1).ok,false);});\ntest('unsafe total cent value is rejected without mutation',()=>{const a=initialStock(),before=structuredClone(a);assert.equal(restock(a,'a',Number.MAX_SAFE_INTEGER-10).ok,false);assert.deepEqual(a,before);});\n",
      "package.json": "{\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": {\n    \"test\": \"node --test domain.test.js\"\n  }\n}"
    },
    "demo": "<!doctype html><html lang=\"de\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>Inventar-Dashboard</title><style>body{background:#101625;color:#eee;font:16px system-ui;padding:20px;max-width:780px;margin:auto}button,input,select{font:inherit;min-height:44px;border-radius:8px;padding:8px;margin:4px;max-width:100%;box-sizing:border-box}button{background:#9b87ff;color:#101625;border:0;cursor:pointer}label{display:block;margin:10px 0}table{width:100%;border-collapse:collapse}td,th{text-align:left;padding:10px;border-bottom:1px solid #38435a}pre{white-space:pre-wrap;overflow-wrap:anywhere}p{line-height:1.6}#status{min-height:48px}input{background:#172033;color:#eee;border:1px solid #56617a}section{padding:12px;border:1px solid #38435a;border-radius:8px;margin:16px 0}</style></head><body><h1>Inventar-Dashboard</h1><table><thead><tr><th>Artikel</th><th>Bestand</th><th>Preis</th></tr></thead><tbody id=\"rows\"></tbody></table><p id=\"value\"></p><form id=\"form\" novalidate><label>Artikel<select id=\"item\"><option value=\"a\">Tastatur</option><option value=\"b\">Maus</option></select></label><label>Buchung<select id=\"operation\"><option value=\"sell\">Verkaufen</option><option value=\"restock\">Nachliefern</option></select></label><label>Menge<input id=\"quantity\" type=\"number\" value=\"1\" min=\"1\" step=\"1\"></label><button>Buchen</button></form><p id=\"status\" role=\"status\"></p><button id=\"reset\">Zurücksetzen</button><script>function initialStock(){return [{id:'a',name:'Tastatur',stock:5,price:2500},{id:'b',name:'Maus',stock:3,price:1500}];}\nfunction sell(items,id,quantity){\n  const item=items.find(item=>item.id===id);\n  if(!item||!Number.isSafeInteger(quantity)||quantity<=0||quantity>item.stock)return {ok:false,items};\n  return {ok:true,items:items.map(item=>item.id===id?{...item,stock:item.stock-quantity}:item)};\n}\nfunction restock(items,id,quantity){\n  const item=items.find(item=>item.id===id);\n  if(!item||!Number.isSafeInteger(quantity)||quantity<=0||!Number.isSafeInteger(item.stock+quantity))return {ok:false,items};\n  const next=items.map(item=>item.id===id?{...item,stock:item.stock+quantity}:item);\n  if(!Number.isSafeInteger(stockValue(next)))return {ok:false,items};\n  return {ok:true,items:next};\n}\nfunction stockValue(items){return items.reduce((total,item)=>total+item.stock*item.price,0);}\n\nlet items=initialStock();\nconst status=document.querySelector('#status'),body=document.querySelector('#rows');\nconst euro=cents=>new Intl.NumberFormat('de-DE',{style:'currency',currency:'EUR'}).format(cents/100);\nfunction render(){\n  body.replaceChildren();\n  for(const item of items){const row=document.createElement('tr');for(const value of [item.name,item.stock,euro(item.price)]){const cell=document.createElement('td');cell.textContent=value;row.append(cell);}body.append(row);}\n  document.querySelector('#value').textContent='Lagerwert: '+euro(stockValue(items));\n}\nconst submit=event=>{event.preventDefault();const id=document.querySelector('#item').value;const quantity=Number(document.querySelector('#quantity').value);const operation=document.querySelector('#operation').value;const result=(operation==='sell'?sell:restock)(items,id,quantity);items=result.items;status.textContent=result.ok?'Buchung erfolgreich.':'Abgelehnt: Menge, Bestand oder Lagerwert außerhalb der gültigen Grenzen.';render();};\nconst form=document.querySelector('#form');\nform.addEventListener('submit',submit);\nconst submitButton=form.querySelector('button');submitButton.type='button';submitButton.addEventListener('click',submit);\nform.addEventListener('keydown',event=>{if(event.key==='Enter'){event.preventDefault();submit(event);}});\ndocument.querySelector('#reset').addEventListener('click',()=>{items=initialStock();status.textContent='Beispielbestand zurückgesetzt.';render();});render();</script></body></html>",
    "steps": [
      "ZIP entpacken und den Ordner im Editor öffnen.",
      "Node.js 24 oder neuer: npm test prüft die Logik ohne zusätzliche Pakete.",
      "Im Projektordner python -m http.server 8000 starten; danach http://localhost:8000 öffnen. ES-Module brauchen einen lokalen Webserver."
    ],
    "concepts": [
      {
        "name": "Number.isSafeInteger",
        "explanation": "Validiert Mengen und verhindert Bestandsüberlauf."
      },
      {
        "name": "find / map",
        "explanation": "Findet einen Artikel und ersetzt genau seinen Zustand."
      },
      {
        "name": "Intl.NumberFormat",
        "explanation": "Formatiert Cents als Euro, ohne die gespeicherten Zahlen zu verändern."
      }
    ],
    "ideas": [
      "Füge Suchfilter und Warnungen für niedrigen Bestand hinzu.",
      "Exportiere einen CSV-Bestandsbericht.",
      "Speichere Buchungen in einem Journal für Rückgängigmachen."
    ],
    "build": {
      "goal": "Baue eine kleine Warenverwaltung mit Bestandsprüfung, Verkäufen, Nachlieferungen und einem Lagerwert in Cents. Implementiere zuerst die Logik, danach die Bedienung.",
      "checkpoints": [
        {
          "id": "0",
          "title": "Datenmodell",
          "check": "Tastatur: 5 Stück zu 2500 Cent; Maus: 3 Stück zu 1500 Cent. Initialisierung ist unabhängig.",
          "hint": "Speichere Geld in ganzen Cents."
        },
        {
          "id": "1",
          "title": "Transaktionen",
          "check": "Verkauf und Nachlieferung prüfen die Menge vor der Änderung und mutieren die Eingabe nicht.",
          "hint": "Validiere eine positive sichere Ganzzahl und den Artikel."
        },
        {
          "id": "2",
          "title": "Grenzen testen",
          "check": "Überverkauf, 0, negative Mengen, Brüche und Überlauf werden abgelehnt. Alle Tests bestehen.",
          "hint": "Eine fehlgeschlagene Buchung gibt den bisherigen Zustand zurück."
        },
        {
          "id": "3",
          "title": "Dashboard",
          "check": "Tabelle und Gesamtwert aktualisieren sich direkt nach einer gültigen Buchung; Fehler werden angezeigt.",
          "hint": "DOM mit createElement und textContent bauen."
        },
        {
          "id": "4",
          "title": "Eigene Tests",
          "check": "Ergänze einen dritten Artikel und Tests für mehrere Buchungen nacheinander.",
          "hint": "Teste die Ergebnisse der vorherigen Aktion als nächste Eingabe."
        }
      ],
      "starterFiles": {
        "index.html": "<!doctype html><html lang=\"de\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>Inventar-Dashboard</title><style>body{background:#101625;color:#eee;font:16px system-ui;padding:20px;max-width:780px;margin:auto}button,input,select{font:inherit;min-height:44px;border-radius:8px;padding:8px;margin:4px;max-width:100%;box-sizing:border-box}button{background:#9b87ff;color:#101625;border:0;cursor:pointer}label{display:block;margin:10px 0}table{width:100%;border-collapse:collapse}td,th{text-align:left;padding:10px;border-bottom:1px solid #38435a}pre{white-space:pre-wrap;overflow-wrap:anywhere}p{line-height:1.6}#status{min-height:48px}input{background:#172033;color:#eee;border:1px solid #56617a}section{padding:12px;border:1px solid #38435a;border-radius:8px;margin:16px 0}</style></head><body><h1>Inventar-Dashboard</h1><table><thead><tr><th>Artikel</th><th>Bestand</th><th>Preis</th></tr></thead><tbody id=\"rows\"></tbody></table><p id=\"value\"></p><form id=\"form\" novalidate><label>Artikel<select id=\"item\"><option value=\"a\">Tastatur</option><option value=\"b\">Maus</option></select></label><label>Buchung<select id=\"operation\"><option value=\"sell\">Verkaufen</option><option value=\"restock\">Nachliefern</option></select></label><label>Menge<input id=\"quantity\" type=\"number\" value=\"1\" min=\"1\" step=\"1\"></label><button>Buchen</button></form><p id=\"status\" role=\"status\"></p><button id=\"reset\">Zurücksetzen</button><script type=\"module\" src=\"main.js\"></script></body></html>",
        "domain.js": "export function initialStock(){ /* TODO */ return []; }\nexport function sell(items,id,quantity){ /* TODO */ return {ok:false,items}; }\nexport function restock(items,id,quantity){ /* TODO */ return {ok:false,items}; }\nexport function stockValue(items){ /* TODO */ return 0; }\n",
        "main.js": "// TODO: Verknüpfe deine domain.js-Exporte mit den Formularen und Buttons.\n// Nutze textContent für nutzerseitige Texte und render nach jeder Zustandsänderung.\n",
        "domain.test.js": "import {test} from 'node:test';import assert from 'node:assert/strict';import {initialStock,sell,restock,stockValue} from './domain.js';\ntest('complete sale without mutation',()=>{const a=initialStock(),before=structuredClone(a);const r=sell(a,'a',5);assert.equal(r.ok,true);assert.equal(r.items[0].stock,0);assert.deepEqual(a,before);assert.deepEqual(r.items[1],a[1]);});\ntest('overselling and unknown identities leave state untouched',()=>{const a=initialStock();for(const [id,n] of [['a',6],['missing',1]])assert.deepEqual(sell(a,id,n),{ok:false,items:a});});\ntest('integer quantity contract',()=>{const a=initialStock();for(const n of [0,-1,1.5,NaN,Infinity]){assert.equal(sell(a,'a',n).ok,false);assert.equal(restock(a,'a',n).ok,false);}});\ntest('restock and repeated sale',()=>{const a=initialStock();const r=restock(a,'b',2);assert.equal(r.items[1].stock,5);assert.equal(a[1].stock,3);assert.equal(sell(r.items,'b',5).items[1].stock,0);});\ntest('cent valuation includes zeros',()=>{assert.equal(stockValue(initialStock()),17000);assert.equal(stockValue([]),0);assert.equal(stockValue([{stock:0,price:100},{stock:3,price:0}]),0);});\ntest('stock overflow rejected',()=>{assert.equal(restock([{id:'a',stock:Number.MAX_SAFE_INTEGER,price:1}],'a',1).ok,false);});\ntest('unsafe total cent value is rejected without mutation',()=>{const a=initialStock(),before=structuredClone(a);assert.equal(restock(a,'a',Number.MAX_SAFE_INTEGER-10).ok,false);assert.deepEqual(a,before);});\n",
        "package.json": "{\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": {\n    \"test\": \"node --test domain.test.js\"\n  }\n}"
      }
    },
    "lessonIds": [
      "js-practice-inventory",
      "js-practice-stock-value",
      "js-practice-money"
    ]
  },
  {
    "id": "js-capstone-maze",
    "course": "js",
    "language": "JavaScript",
    "title": "Schlüssel-Labyrinth",
    "description": "Baue ein spielbares Raster-Abenteuer mit Kollisionen, Inventar, Siegzustand sowie Tastatur- und Touch-Bedienung.",
    "files": {
      "index.html": "<!doctype html><html lang=\"de\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>Schlüssel-Labyrinth</title><style>body{background:#101625;color:#eee;font:16px system-ui;padding:20px;max-width:780px;margin:auto}button,input,select{font:inherit;min-height:44px;border-radius:8px;padding:8px;margin:4px;max-width:100%;box-sizing:border-box}button{background:#9b87ff;color:#101625;border:0;cursor:pointer}label{display:block;margin:10px 0}table{width:100%;border-collapse:collapse}td,th{text-align:left;padding:10px;border-bottom:1px solid #38435a}pre{white-space:pre-wrap;overflow-wrap:anywhere}p{line-height:1.6}#status{min-height:48px}input{background:#172033;color:#eee;border:1px solid #56617a}section{padding:12px;border:1px solid #38435a;border-radius:8px;margin:16px 0}</style></head><body><h1>Schlüssel-Labyrinth</h1><p>P = du · # = Wand · K = Schlüssel · E = Ausgang. Ohne Schlüssel bleibt der Ausgang verschlossen.</p><pre id=\"board\" aria-label=\"Spielfeld\" style=\"font:32px/1.3 monospace\"></pre><div aria-label=\"Bewegung\"><button data-direction=\"oben\">Oben</button><button data-direction=\"links\">Links</button><button data-direction=\"unten\">Unten</button><button data-direction=\"rechts\">Rechts</button></div><p id=\"status\" role=\"status\"></p><button id=\"reset\">Neue Runde</button><script type=\"module\" src=\"main.js\"></script></body></html>",
      "domain.js": "export const BOARD=['#####','#..K#','#.#.#','#E..#','#####'];\nexport function initialGame(){return {x:1,y:1,key:false,won:false,moves:0};}\nexport function moveGame(state,direction){\n  if(state.won)return {...state};\n  const offsets={links:[-1,0],rechts:[1,0],oben:[0,-1],unten:[0,1]};\n  if(!Object.hasOwn(offsets,direction))return {...state};\n  const [dx,dy]=offsets[direction],x=state.x+dx,y=state.y+dy;\n  const tile=BOARD[y]?.[x];if(!tile||tile==='#')return {...state};\n  const key=state.key||tile==='K';return {x,y,key,won:key&&tile==='E',moves:state.moves+1};\n}\nexport function drawBoard(state){return BOARD.map((row,y)=>Array.from(row,(tile,x)=>x===state.x&&y===state.y?'P':tile==='K'&&state.key?'.':tile).join('')).join('\\n');}\n",
      "main.js": "import {initialGame,moveGame,drawBoard} from './domain.js';\nlet state=initialGame();\nfunction render(){document.querySelector('#board').textContent=drawBoard(state);document.querySelector('#status').textContent=`Züge: ${state.moves} · Schlüssel: ${state.key?'ja':'nein'} · ${state.won?'Gewonnen!':'Finde K und gehe zu E.'}`;}\nfunction move(direction){state=moveGame(state,direction);render();}\nfor(const button of document.querySelectorAll('[data-direction]'))button.addEventListener('click',()=>move(button.dataset.direction));\nwindow.addEventListener('keydown',event=>{const keys={ArrowLeft:'links',ArrowRight:'rechts',ArrowUp:'oben',ArrowDown:'unten'};if(Object.hasOwn(keys,event.key)){event.preventDefault();move(keys[event.key]);}});\ndocument.querySelector('#reset').addEventListener('click',()=>{state=initialGame();render();});render();\n",
      "domain.test.js": "import {test} from 'node:test';import assert from 'node:assert/strict';import {initialGame,moveGame,drawBoard} from './domain.js';\ntest('wall and invalid directions',()=>{const s=initialGame();for(const d of ['oben','links','toString','bad'])assert.deepEqual(moveGame(s,d),s);});\ntest('movement keeps old state',()=>{const s=initialGame(),r=moveGame(s,'rechts');assert.equal(r.x,2);assert.equal(r.moves,1);assert.equal(s.x,1);});\ntest('exit without key does not win',()=>{let s=initialGame();s=moveGame(moveGame(s,'unten'),'unten');assert.equal(s.y,3);assert.equal(s.won,false);});\ntest('collect key and finish game',()=>{let s=initialGame();for(const d of ['rechts','rechts','unten','unten','links','links'])s=moveGame(s,d);assert.equal(s.key,true);assert.equal(s.won,true);assert.equal(s.moves,6);assert.deepEqual(moveGame(s,'oben'),s);});\ntest('drawing is pure and marks player once',()=>{const s=initialGame();assert.equal(drawBoard(s).split('P').length-1,1);assert.equal(drawBoard(s).split('\\n').length,5);const k={...s,key:true};assert.equal(drawBoard(k).includes('K'),false);assert.equal(s.key,false);});\n",
      "package.json": "{\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": {\n    \"test\": \"node --test domain.test.js\"\n  }\n}"
    },
    "demo": "<!doctype html><html lang=\"de\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>Schlüssel-Labyrinth</title><style>body{background:#101625;color:#eee;font:16px system-ui;padding:20px;max-width:780px;margin:auto}button,input,select{font:inherit;min-height:44px;border-radius:8px;padding:8px;margin:4px;max-width:100%;box-sizing:border-box}button{background:#9b87ff;color:#101625;border:0;cursor:pointer}label{display:block;margin:10px 0}table{width:100%;border-collapse:collapse}td,th{text-align:left;padding:10px;border-bottom:1px solid #38435a}pre{white-space:pre-wrap;overflow-wrap:anywhere}p{line-height:1.6}#status{min-height:48px}input{background:#172033;color:#eee;border:1px solid #56617a}section{padding:12px;border:1px solid #38435a;border-radius:8px;margin:16px 0}</style></head><body><h1>Schlüssel-Labyrinth</h1><p>P = du · # = Wand · K = Schlüssel · E = Ausgang. Ohne Schlüssel bleibt der Ausgang verschlossen.</p><pre id=\"board\" aria-label=\"Spielfeld\" style=\"font:32px/1.3 monospace\"></pre><div aria-label=\"Bewegung\"><button data-direction=\"oben\">Oben</button><button data-direction=\"links\">Links</button><button data-direction=\"unten\">Unten</button><button data-direction=\"rechts\">Rechts</button></div><p id=\"status\" role=\"status\"></p><button id=\"reset\">Neue Runde</button><script>const BOARD=['#####','#..K#','#.#.#','#E..#','#####'];\nfunction initialGame(){return {x:1,y:1,key:false,won:false,moves:0};}\nfunction moveGame(state,direction){\n  if(state.won)return {...state};\n  const offsets={links:[-1,0],rechts:[1,0],oben:[0,-1],unten:[0,1]};\n  if(!Object.hasOwn(offsets,direction))return {...state};\n  const [dx,dy]=offsets[direction],x=state.x+dx,y=state.y+dy;\n  const tile=BOARD[y]?.[x];if(!tile||tile==='#')return {...state};\n  const key=state.key||tile==='K';return {x,y,key,won:key&&tile==='E',moves:state.moves+1};\n}\nfunction drawBoard(state){return BOARD.map((row,y)=>Array.from(row,(tile,x)=>x===state.x&&y===state.y?'P':tile==='K'&&state.key?'.':tile).join('')).join('\\n');}\n\nlet state=initialGame();\nfunction render(){document.querySelector('#board').textContent=drawBoard(state);document.querySelector('#status').textContent=`Züge: ${state.moves} · Schlüssel: ${state.key?'ja':'nein'} · ${state.won?'Gewonnen!':'Finde K und gehe zu E.'}`;}\nfunction move(direction){state=moveGame(state,direction);render();}\nfor(const button of document.querySelectorAll('[data-direction]'))button.addEventListener('click',()=>move(button.dataset.direction));\nwindow.addEventListener('keydown',event=>{const keys={ArrowLeft:'links',ArrowRight:'rechts',ArrowUp:'oben',ArrowDown:'unten'};if(Object.hasOwn(keys,event.key)){event.preventDefault();move(keys[event.key]);}});\ndocument.querySelector('#reset').addEventListener('click',()=>{state=initialGame();render();});render();</script></body></html>",
    "steps": [
      "ZIP entpacken und den Ordner im Editor öffnen.",
      "Node.js 24 oder neuer: npm test prüft die Logik ohne zusätzliche Pakete.",
      "Im Projektordner python -m http.server 8000 starten; danach http://localhost:8000 öffnen. ES-Module brauchen einen lokalen Webserver."
    ],
    "concepts": [
      {
        "name": "Objekte und Referenzen",
        "explanation": "Jeder Spielzug erzeugt einen neuen Zustand."
      },
      {
        "name": "Rasterzugriff / Kollision",
        "explanation": "Erlaubt nur freie Ziele und sammelt den Schlüssel."
      },
      {
        "name": "keydown / click",
        "explanation": "Verbindet dieselbe Spielregel mit Tastatur und Touch."
      }
    ],
    "ideas": [
      "Zeichne das Raster mit Canvas und erkläre die Umrechnung in Pixel.",
      "Füge Türen und mehrere Schlüssel hinzu.",
      "Zeige den kürzesten Weg mit Breitensuche."
    ],
    "build": {
      "goal": "Baue ein spielbares Raster-Abenteuer mit Kollisionen, Inventar, Siegzustand sowie Tastatur- und Touch-Bedienung. Implementiere zuerst die Logik, danach die Bedienung.",
      "checkpoints": [
        {
          "id": "0",
          "title": "Welt und Zustand",
          "check": "Definiere Spielfeld, Startposition, Schlüssel, Sieg und Zugzahl.",
          "hint": "Das Spielfeld beschreibt die Welt; state beschreibt deine Figur."
        },
        {
          "id": "1",
          "title": "Bewegung",
          "check": "Wände und unbekannte Richtungen lassen Position und Zugzahl gleich; freie Schritte erhöhen sie.",
          "hint": "Erst den Kandidaten berechnen und prüfen, dann Zustand ändern."
        },
        {
          "id": "2",
          "title": "Schlüssel und Sieg",
          "check": "Der sechs Schritte lange Referenzweg gewinnt; ohne Schlüssel gewinnt der Ausgang nicht.",
          "hint": "Ein gewonnenes Spiel ignoriert spätere Bewegungen."
        },
        {
          "id": "3",
          "title": "Anzeige und Eingabe",
          "check": "Buttons und Pfeiltasten steuern die Figur; Schlüssel, Züge und Sieg werden sichtbar.",
          "hint": "Trenne moveGame von DOM-Anzeige und Ereignissen."
        },
        {
          "id": "4",
          "title": "Level erweitern",
          "check": "Baue ein zweites Level und ergänze Tests für Außenränder und Neustart. Alle Node-Tests bestehen.",
          "hint": "Die Welt muss rechteckig bleiben; prüfe jeden Zugriff vor der Bewegung."
        }
      ],
      "starterFiles": {
        "index.html": "<!doctype html><html lang=\"de\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>Schlüssel-Labyrinth</title><style>body{background:#101625;color:#eee;font:16px system-ui;padding:20px;max-width:780px;margin:auto}button,input,select{font:inherit;min-height:44px;border-radius:8px;padding:8px;margin:4px;max-width:100%;box-sizing:border-box}button{background:#9b87ff;color:#101625;border:0;cursor:pointer}label{display:block;margin:10px 0}table{width:100%;border-collapse:collapse}td,th{text-align:left;padding:10px;border-bottom:1px solid #38435a}pre{white-space:pre-wrap;overflow-wrap:anywhere}p{line-height:1.6}#status{min-height:48px}input{background:#172033;color:#eee;border:1px solid #56617a}section{padding:12px;border:1px solid #38435a;border-radius:8px;margin:16px 0}</style></head><body><h1>Schlüssel-Labyrinth</h1><p>P = du · # = Wand · K = Schlüssel · E = Ausgang. Ohne Schlüssel bleibt der Ausgang verschlossen.</p><pre id=\"board\" aria-label=\"Spielfeld\" style=\"font:32px/1.3 monospace\"></pre><div aria-label=\"Bewegung\"><button data-direction=\"oben\">Oben</button><button data-direction=\"links\">Links</button><button data-direction=\"unten\">Unten</button><button data-direction=\"rechts\">Rechts</button></div><p id=\"status\" role=\"status\"></p><button id=\"reset\">Neue Runde</button><script type=\"module\" src=\"main.js\"></script></body></html>",
        "domain.js": "export const BOARD=['#####','#..K#','#.#.#','#E..#','#####'];\nexport function initialGame(){ /* TODO */ return {x:1,y:1,key:false,won:false,moves:0}; }\nexport function moveGame(state,direction){ /* TODO */ return {...state}; }\nexport function drawBoard(state){ /* TODO */ return ''; }\n",
        "main.js": "// TODO: Verknüpfe deine domain.js-Exporte mit den Formularen und Buttons.\n// Nutze textContent für nutzerseitige Texte und render nach jeder Zustandsänderung.\n",
        "domain.test.js": "import {test} from 'node:test';import assert from 'node:assert/strict';import {initialGame,moveGame,drawBoard} from './domain.js';\ntest('wall and invalid directions',()=>{const s=initialGame();for(const d of ['oben','links','toString','bad'])assert.deepEqual(moveGame(s,d),s);});\ntest('movement keeps old state',()=>{const s=initialGame(),r=moveGame(s,'rechts');assert.equal(r.x,2);assert.equal(r.moves,1);assert.equal(s.x,1);});\ntest('exit without key does not win',()=>{let s=initialGame();s=moveGame(moveGame(s,'unten'),'unten');assert.equal(s.y,3);assert.equal(s.won,false);});\ntest('collect key and finish game',()=>{let s=initialGame();for(const d of ['rechts','rechts','unten','unten','links','links'])s=moveGame(s,d);assert.equal(s.key,true);assert.equal(s.won,true);assert.equal(s.moves,6);assert.deepEqual(moveGame(s,'oben'),s);});\ntest('drawing is pure and marks player once',()=>{const s=initialGame();assert.equal(drawBoard(s).split('P').length-1,1);assert.equal(drawBoard(s).split('\\n').length,5);const k={...s,key:true};assert.equal(drawBoard(k).includes('K'),false);assert.equal(s.key,false);});\n",
        "package.json": "{\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": {\n    \"test\": \"node --test domain.test.js\"\n  }\n}"
      }
    },
    "lessonIds": [
      "js-practice-maze-move",
      "js-practice-maze-key",
      "js-practice-shared-rows"
    ]
  }
];
