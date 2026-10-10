export const buildProjects = [
  {
    "id": "js-file-explorer",
    "course": "js",
    "language": "JavaScript",
    "title": "Datei-Explorer",
    "description": "Lies echte lokale Dateien ein, zeige ihren Text sicher an und exportiere ihn als JSON.",
    "files": {
      "index.html": "<!doctype html><html lang=\"de\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>Datei-Explorer</title><style>body{background:#101625;color:#eef2ff;font:16px system-ui;margin:0;padding:16px}button,input,select{font:inherit;padding:10px;margin:4px;border-radius:8px;max-width:100%;box-sizing:border-box}button{background:#a18aff;border:0;color:#111827;cursor:pointer}input,select{background:#202c41;color:white;border:1px solid #64748b}pre{white-space:pre-wrap;overflow-wrap:anywhere}canvas{display:block;max-width:100%;height:auto;border:1px solid #64748b;touch-action:none}img{max-width:100%}label{display:block;margin:8px 0}*{box-sizing:border-box}[role=status]{min-height:24px}</style></head><body><h1>Datei-Explorer</h1><p>Wähle eine lokale Text- oder JSON-Datei bis 1 MB. Ihr Inhalt bleibt in diesem Browser.</p><label>Datei auswählen<input id=\"datei\" type=\"file\" accept=\".txt,.json,text/plain,application/json\"></label><p id=\"status\" role=\"status\"></p><pre id=\"inhalt\"></pre><button id=\"export\" disabled>Als JSON herunterladen</button><script>\nconst input=document.querySelector('#datei'),status=document.querySelector('#status'),inhalt=document.querySelector('#inhalt'),exportButton=document.querySelector('#export');\nlet text='',version=0;\ninput.addEventListener('change',async()=>{\n  const current=++version,file=input.files[0];exportButton.disabled=true;text='';inhalt.textContent='';\n  if(!file){status.textContent='Keine Datei ausgewählt.';return;}\n  if(file.size>1_000_000){status.textContent='Datei zu groß: maximal 1 MB.';return;}\n  try{const gelesen=await file.text();if(current!==version)return;text=gelesen;inhalt.textContent=text;status.textContent=`${file.name}: ${file.size} Bytes`;exportButton.disabled=false;}\n  catch{if(current===version)status.textContent='Datei konnte nicht gelesen werden.';}\n});\nexportButton.addEventListener('click',()=>{\n  const blob=new Blob([JSON.stringify({text},null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),link=document.createElement('a');\n  link.href=url;link.download='export.json';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);\n});</script></body></html>"
    },
    "steps": [
      "index.html im Browser öffnen.",
      "Eine kleine .txt- oder .json-Datei wählen; Export als JSON herunterladen."
    ],
    "concepts": [
      {
        "name": "input.files / File.text()",
        "explanation": "Liest nur eine vom Benutzer ausgewählte Datei."
      },
      {
        "name": "textContent",
        "explanation": "Zeigt Text an, ohne eingebettetes HTML auszuführen."
      },
      {
        "name": "Blob / Object URL",
        "explanation": "Erzeugt einen Download und gibt die URL danach frei."
      }
    ],
    "ideas": [
      "Ergänze einen eigenen Randfalltest.",
      "Erweitere das Projekt um eine Funktion und erkläre ihre Wirkung."
    ],
    "demo": "<!doctype html><html lang=\"de\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>Datei-Explorer</title><style>body{background:#101625;color:#eef2ff;font:16px system-ui;margin:0;padding:16px}button,input,select{font:inherit;padding:10px;margin:4px;border-radius:8px;max-width:100%;box-sizing:border-box}button{background:#a18aff;border:0;color:#111827;cursor:pointer}input,select{background:#202c41;color:white;border:1px solid #64748b}pre{white-space:pre-wrap;overflow-wrap:anywhere}canvas{display:block;max-width:100%;height:auto;border:1px solid #64748b;touch-action:none}img{max-width:100%}label{display:block;margin:8px 0}*{box-sizing:border-box}[role=status]{min-height:24px}</style></head><body><h1>Datei-Explorer</h1><p>Wähle eine lokale Text- oder JSON-Datei bis 1 MB. Ihr Inhalt bleibt in diesem Browser.</p><label>Datei auswählen<input id=\"datei\" type=\"file\" accept=\".txt,.json,text/plain,application/json\"></label><p id=\"status\" role=\"status\"></p><pre id=\"inhalt\"></pre><button id=\"export\" disabled>Als JSON herunterladen</button><script>\nconst input=document.querySelector('#datei'),status=document.querySelector('#status'),inhalt=document.querySelector('#inhalt'),exportButton=document.querySelector('#export');\nlet text='',version=0;\ninput.addEventListener('change',async()=>{\n  const current=++version,file=input.files[0];exportButton.disabled=true;text='';inhalt.textContent='';\n  if(!file){status.textContent='Keine Datei ausgewählt.';return;}\n  if(file.size>1_000_000){status.textContent='Datei zu groß: maximal 1 MB.';return;}\n  try{const gelesen=await file.text();if(current!==version)return;text=gelesen;inhalt.textContent=text;status.textContent=`${file.name}: ${file.size} Bytes`;exportButton.disabled=false;}\n  catch{if(current===version)status.textContent='Datei konnte nicht gelesen werden.';}\n});\nexportButton.addEventListener('click',()=>{\n  const blob=new Blob([JSON.stringify({text},null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),link=document.createElement('a');\n  link.href=url;link.download='export.json';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);\n});</script></body></html>",
    "build": {
      "goal": "Lies echte lokale Dateien ein, zeige ihren Text sicher an und exportiere ihn als JSON.",
      "checkpoints": [
        {
          "id": "etappe-0",
          "title": "Dateiauswahl",
          "check": "Ein Dateifeld zeigt den Namen deiner ausgewählten Datei.",
          "hint": "input.files[0] liefert die gewählte Datei."
        },
        {
          "id": "etappe-1",
          "title": "Text lesen",
          "check": "Eine UTF-8-Datei zeigt Umlaute und mehrere Zeilen richtig.",
          "hint": "await file.text() wartet auf den Inhalt."
        },
        {
          "id": "etappe-2",
          "title": "Größe begrenzen",
          "check": "Eine Datei über 1 MB wird abgewiesen.",
          "hint": "Vergleiche file.size mit 1_000_000."
        },
        {
          "id": "etappe-3",
          "title": "Sicher anzeigen",
          "check": "<img src=x> erscheint als Text.",
          "hint": "Schreibe in textContent statt innerHTML."
        },
        {
          "id": "etappe-4",
          "title": "Export",
          "check": "Der Download enthält ein Objekt mit dem eingelesenen Text.",
          "hint": "JSON.stringify, Blob, createObjectURL und download bilden den Export."
        }
      ],
      "starterFiles": {
        "index.html": "<!doctype html><html lang=\"de\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>Datei-Explorer</title><style>body{background:#101625;color:#eef2ff;font:16px system-ui;margin:0;padding:16px}button,input,select{font:inherit;padding:10px;margin:4px;border-radius:8px;max-width:100%;box-sizing:border-box}button{background:#a18aff;border:0;color:#111827;cursor:pointer}input,select{background:#202c41;color:white;border:1px solid #64748b}pre{white-space:pre-wrap;overflow-wrap:anywhere}canvas{display:block;max-width:100%;height:auto;border:1px solid #64748b;touch-action:none}img{max-width:100%}label{display:block;margin:8px 0}*{box-sizing:border-box}[role=status]{min-height:24px}</style></head><body><h1>Datei-Explorer</h1><input id=\"datei\" type=\"file\"><p id=\"status\" role=\"status\"></p><pre id=\"inhalt\"></pre><button id=\"export\">Export</button><script>// TODO: Datei lesen, Größe prüfen, sicher anzeigen, exportieren.</script></body></html>"
      }
    }
  },
  {
    "id": "js-image-studio",
    "course": "js",
    "language": "JavaScript",
    "title": "Bildwerkstatt",
    "description": "Skaliere echte Bilder mit Canvas, schalte Graustufen ein und lade das Ergebnis als PNG herunter.",
    "files": {
      "index.html": "<!doctype html><html lang=\"de\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>Bildwerkstatt</title><style>body{background:#101625;color:#eef2ff;font:16px system-ui;margin:0;padding:16px}button,input,select{font:inherit;padding:10px;margin:4px;border-radius:8px;max-width:100%;box-sizing:border-box}button{background:#a18aff;border:0;color:#111827;cursor:pointer}input,select{background:#202c41;color:white;border:1px solid #64748b}pre{white-space:pre-wrap;overflow-wrap:anywhere}canvas{display:block;max-width:100%;height:auto;border:1px solid #64748b;touch-action:none}img{max-width:100%}label{display:block;margin:8px 0}*{box-sizing:border-box}[role=status]{min-height:24px}</style></head><body><h1>Bildwerkstatt</h1><p>Wähle PNG oder JPEG bis 5 MB. Das Bild wird auf höchstens 320 × 240 Pixel eingepasst.</p><label>Bild auswählen<input id=\"bild\" type=\"file\" accept=\"image/png,image/jpeg\"></label><button id=\"grau\" disabled>Graustufen umschalten</button><button id=\"speichern\" disabled>PNG herunterladen</button><p id=\"status\" role=\"status\"></p><canvas id=\"canvas\" width=\"320\" height=\"240\" aria-label=\"Bildvorschau\"></canvas><script>\nconst canvas=document.querySelector('#canvas'),ctx=canvas.getContext('2d'),status=document.querySelector('#status'),grauButton=document.querySelector('#grau'),save=document.querySelector('#speichern');\nlet bild,grau=false,version=0;\nfunction render(){ctx.clearRect(0,0,canvas.width,canvas.height);ctx.filter=grau?'grayscale(1)':'none';ctx.drawImage(bild,0,0,canvas.width,canvas.height);ctx.filter='none';}\ndocument.querySelector('#bild').addEventListener('change',async event=>{\n  const current=++version,file=event.target.files[0];grauButton.disabled=save.disabled=true;bild=null;ctx.clearRect(0,0,canvas.width,canvas.height);\n  if(!file)return;\n  if(!['image/png','image/jpeg'].includes(file.type)||file.size>5_000_000){status.textContent='Bitte PNG oder JPEG bis 5 MB wählen.';return;}\n  const url=URL.createObjectURL(file);\n  try{const image=new Image();image.src=url;await image.decode();if(current!==version)return;\n    const faktor=Math.min(320/image.naturalWidth,240/image.naturalHeight,1);canvas.width=Math.max(1,Math.floor(image.naturalWidth*faktor));canvas.height=Math.max(1,Math.floor(image.naturalHeight*faktor));bild=image;grau=false;render();grauButton.disabled=save.disabled=false;status.textContent=`${canvas.width} × ${canvas.height} Pixel`;\n  }catch{if(current===version)status.textContent='Bild konnte nicht geöffnet werden.';}finally{URL.revokeObjectURL(url);}\n});\ngrauButton.addEventListener('click',()=>{grau=!grau;render();status.textContent=grau?'Graustufen aktiv':'Originalfarben';});\nsave.addEventListener('click',()=>canvas.toBlob(blob=>{if(!blob)return;const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='bild.png';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);},'image/png'));</script></body></html>"
    },
    "steps": [
      "index.html im Browser öffnen.",
      "PNG/JPEG wählen, Graustufen umschalten und PNG exportieren."
    ],
    "concepts": [
      {
        "name": "Image.decode()",
        "explanation": "Wartet, bis das gewählte Bild gezeichnet werden kann."
      },
      {
        "name": "drawImage / filter",
        "explanation": "Zeichnet skalierte Pixel und verändert ihre Farben."
      },
      {
        "name": "canvas.toBlob()",
        "explanation": "Kodiert den Canvas-Inhalt als PNG-Datei."
      }
    ],
    "ideas": [
      "Ergänze einen eigenen Randfalltest.",
      "Erweitere das Projekt um eine Funktion und erkläre ihre Wirkung."
    ],
    "demo": "<!doctype html><html lang=\"de\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>Bildwerkstatt</title><style>body{background:#101625;color:#eef2ff;font:16px system-ui;margin:0;padding:16px}button,input,select{font:inherit;padding:10px;margin:4px;border-radius:8px;max-width:100%;box-sizing:border-box}button{background:#a18aff;border:0;color:#111827;cursor:pointer}input,select{background:#202c41;color:white;border:1px solid #64748b}pre{white-space:pre-wrap;overflow-wrap:anywhere}canvas{display:block;max-width:100%;height:auto;border:1px solid #64748b;touch-action:none}img{max-width:100%}label{display:block;margin:8px 0}*{box-sizing:border-box}[role=status]{min-height:24px}</style></head><body><h1>Bildwerkstatt</h1><p>Wähle PNG oder JPEG bis 5 MB. Das Bild wird auf höchstens 320 × 240 Pixel eingepasst.</p><label>Bild auswählen<input id=\"bild\" type=\"file\" accept=\"image/png,image/jpeg\"></label><button id=\"grau\" disabled>Graustufen umschalten</button><button id=\"speichern\" disabled>PNG herunterladen</button><p id=\"status\" role=\"status\"></p><canvas id=\"canvas\" width=\"320\" height=\"240\" aria-label=\"Bildvorschau\"></canvas><script>\nconst canvas=document.querySelector('#canvas'),ctx=canvas.getContext('2d'),status=document.querySelector('#status'),grauButton=document.querySelector('#grau'),save=document.querySelector('#speichern');\nlet bild,grau=false,version=0;\nfunction render(){ctx.clearRect(0,0,canvas.width,canvas.height);ctx.filter=grau?'grayscale(1)':'none';ctx.drawImage(bild,0,0,canvas.width,canvas.height);ctx.filter='none';}\ndocument.querySelector('#bild').addEventListener('change',async event=>{\n  const current=++version,file=event.target.files[0];grauButton.disabled=save.disabled=true;bild=null;ctx.clearRect(0,0,canvas.width,canvas.height);\n  if(!file)return;\n  if(!['image/png','image/jpeg'].includes(file.type)||file.size>5_000_000){status.textContent='Bitte PNG oder JPEG bis 5 MB wählen.';return;}\n  const url=URL.createObjectURL(file);\n  try{const image=new Image();image.src=url;await image.decode();if(current!==version)return;\n    const faktor=Math.min(320/image.naturalWidth,240/image.naturalHeight,1);canvas.width=Math.max(1,Math.floor(image.naturalWidth*faktor));canvas.height=Math.max(1,Math.floor(image.naturalHeight*faktor));bild=image;grau=false;render();grauButton.disabled=save.disabled=false;status.textContent=`${canvas.width} × ${canvas.height} Pixel`;\n  }catch{if(current===version)status.textContent='Bild konnte nicht geöffnet werden.';}finally{URL.revokeObjectURL(url);}\n});\ngrauButton.addEventListener('click',()=>{grau=!grau;render();status.textContent=grau?'Graustufen aktiv':'Originalfarben';});\nsave.addEventListener('click',()=>canvas.toBlob(blob=>{if(!blob)return;const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='bild.png';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);},'image/png'));</script></body></html>",
    "build": {
      "goal": "Skaliere echte Bilder mit Canvas, schalte Graustufen ein und lade das Ergebnis als PNG herunter.",
      "checkpoints": [
        {
          "id": "etappe-0",
          "title": "Bild laden",
          "check": "PNG/JPEG wird angezeigt; ungültige Dateien zeigen einen Fehler.",
          "hint": "Erzeuge für das File eine temporäre URL."
        },
        {
          "id": "etappe-1",
          "title": "Einpassen",
          "check": "800 × 400 wird zu 320 × 160.",
          "hint": "Verwende einen gemeinsamen Skalierungsfaktor."
        },
        {
          "id": "etappe-2",
          "title": "Graustufen",
          "check": "Der Knopf verändert die sichtbaren Farben.",
          "hint": "Setze ctx.filter vor drawImage."
        },
        {
          "id": "etappe-3",
          "title": "Export",
          "check": "Die PNG-Datei enthält die skalierten Pixel.",
          "hint": "toBlob liefert die exportierbaren Bildbytes."
        }
      ],
      "starterFiles": {
        "index.html": "<!doctype html><html lang=\"de\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>Bildwerkstatt</title><style>body{background:#101625;color:#eef2ff;font:16px system-ui;margin:0;padding:16px}button,input,select{font:inherit;padding:10px;margin:4px;border-radius:8px;max-width:100%;box-sizing:border-box}button{background:#a18aff;border:0;color:#111827;cursor:pointer}input,select{background:#202c41;color:white;border:1px solid #64748b}pre{white-space:pre-wrap;overflow-wrap:anywhere}canvas{display:block;max-width:100%;height:auto;border:1px solid #64748b;touch-action:none}img{max-width:100%}label{display:block;margin:8px 0}*{box-sizing:border-box}[role=status]{min-height:24px}</style></head><body><h1>Bildwerkstatt</h1><input id=\"bild\" type=\"file\" accept=\"image/png,image/jpeg\"><canvas id=\"canvas\" width=\"320\" height=\"240\"></canvas><button id=\"grau\">Graustufen</button><button id=\"speichern\">PNG</button><p id=\"status\"></p><script>// TODO: Bild laden, einpassen, zeichnen und exportieren.</script></body></html>"
      }
    }
  },
  {
    "id": "js-canvas-paint",
    "course": "js",
    "language": "JavaScript",
    "title": "Canvas-Malstudio",
    "description": "Zeichne mit Maus oder Finger, wähle Farben und exportiere deine Zeichnung als PNG.",
    "files": {
      "index.html": "<!doctype html><html lang=\"de\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>Canvas-Malstudio</title><style>body{background:#101625;color:#eef2ff;font:16px system-ui;margin:0;padding:16px}button,input,select{font:inherit;padding:10px;margin:4px;border-radius:8px;max-width:100%;box-sizing:border-box}button{background:#a18aff;border:0;color:#111827;cursor:pointer}input,select{background:#202c41;color:white;border:1px solid #64748b}pre{white-space:pre-wrap;overflow-wrap:anywhere}canvas{display:block;max-width:100%;height:auto;border:1px solid #64748b;touch-action:none}img{max-width:100%}label{display:block;margin:8px 0}*{box-sizing:border-box}[role=status]{min-height:24px}</style></head><body><h1>Canvas-Malstudio</h1><label>Farbe<input id=\"farbe\" type=\"color\" value=\"#a18aff\"></label><button id=\"leeren\">Leeren</button><button id=\"export\">PNG herunterladen</button><canvas id=\"canvas\" width=\"480\" height=\"240\" aria-label=\"Zeichenfläche\"></canvas><p id=\"status\" role=\"status\">Mit Finger oder Maus zeichnen.</p><script>\nconst canvas=document.querySelector('#canvas'),ctx=canvas.getContext('2d');let pointer=null;\nfunction punkt(e){const r=canvas.getBoundingClientRect();return {x:(e.clientX-r.left)*canvas.width/r.width,y:(e.clientY-r.top)*canvas.height/r.height};}\nfunction leeren(){ctx.fillStyle='#101625';ctx.fillRect(0,0,canvas.width,canvas.height);}leeren();\ncanvas.addEventListener('pointerdown',e=>{if(pointer!==null)return;pointer=e.pointerId;canvas.setPointerCapture(pointer);const p=punkt(e);ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineWidth=6;ctx.lineCap='round';ctx.strokeStyle=document.querySelector('#farbe').value;});\ncanvas.addEventListener('pointermove',e=>{if(e.pointerId!==pointer)return;const p=punkt(e);ctx.lineTo(p.x,p.y);ctx.stroke();document.querySelector('#status').textContent='Strich gezeichnet.';});\nfunction ende(e){if(e.pointerId===pointer){pointer=null;ctx.closePath();}}\ncanvas.addEventListener('pointerup',ende);canvas.addEventListener('pointercancel',ende);canvas.addEventListener('lostpointercapture',ende);\ndocument.querySelector('#leeren').addEventListener('click',()=>{pointer=null;leeren();document.querySelector('#status').textContent='Zeichenfläche geleert.';});\ndocument.querySelector('#export').addEventListener('click',()=>canvas.toBlob(blob=>{if(!blob)return;const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='zeichnung.png';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);},'image/png'));</script></body></html>"
    },
    "steps": [
      "index.html öffnen.",
      "Auf der Zeichenfläche ziehen; Farbe wählen oder Zeichnung herunterladen."
    ],
    "concepts": [
      {
        "name": "Pointer-Events",
        "explanation": "Eine gemeinsame Eingabe für Maus, Stift und Finger."
      },
      {
        "name": "setPointerCapture",
        "explanation": "Behält die Eingabe beim Verlassen der Fläche bei."
      },
      {
        "name": "beginPath / lineTo / stroke",
        "explanation": "Baut einen Pfad auf und zeichnet ihn."
      }
    ],
    "ideas": [
      "Ergänze einen eigenen Randfalltest.",
      "Erweitere das Projekt um eine Funktion und erkläre ihre Wirkung."
    ],
    "demo": "<!doctype html><html lang=\"de\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>Canvas-Malstudio</title><style>body{background:#101625;color:#eef2ff;font:16px system-ui;margin:0;padding:16px}button,input,select{font:inherit;padding:10px;margin:4px;border-radius:8px;max-width:100%;box-sizing:border-box}button{background:#a18aff;border:0;color:#111827;cursor:pointer}input,select{background:#202c41;color:white;border:1px solid #64748b}pre{white-space:pre-wrap;overflow-wrap:anywhere}canvas{display:block;max-width:100%;height:auto;border:1px solid #64748b;touch-action:none}img{max-width:100%}label{display:block;margin:8px 0}*{box-sizing:border-box}[role=status]{min-height:24px}</style></head><body><h1>Canvas-Malstudio</h1><label>Farbe<input id=\"farbe\" type=\"color\" value=\"#a18aff\"></label><button id=\"leeren\">Leeren</button><button id=\"export\">PNG herunterladen</button><canvas id=\"canvas\" width=\"480\" height=\"240\" aria-label=\"Zeichenfläche\"></canvas><p id=\"status\" role=\"status\">Mit Finger oder Maus zeichnen.</p><script>\nconst canvas=document.querySelector('#canvas'),ctx=canvas.getContext('2d');let pointer=null;\nfunction punkt(e){const r=canvas.getBoundingClientRect();return {x:(e.clientX-r.left)*canvas.width/r.width,y:(e.clientY-r.top)*canvas.height/r.height};}\nfunction leeren(){ctx.fillStyle='#101625';ctx.fillRect(0,0,canvas.width,canvas.height);}leeren();\ncanvas.addEventListener('pointerdown',e=>{if(pointer!==null)return;pointer=e.pointerId;canvas.setPointerCapture(pointer);const p=punkt(e);ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineWidth=6;ctx.lineCap='round';ctx.strokeStyle=document.querySelector('#farbe').value;});\ncanvas.addEventListener('pointermove',e=>{if(e.pointerId!==pointer)return;const p=punkt(e);ctx.lineTo(p.x,p.y);ctx.stroke();document.querySelector('#status').textContent='Strich gezeichnet.';});\nfunction ende(e){if(e.pointerId===pointer){pointer=null;ctx.closePath();}}\ncanvas.addEventListener('pointerup',ende);canvas.addEventListener('pointercancel',ende);canvas.addEventListener('lostpointercapture',ende);\ndocument.querySelector('#leeren').addEventListener('click',()=>{pointer=null;leeren();document.querySelector('#status').textContent='Zeichenfläche geleert.';});\ndocument.querySelector('#export').addEventListener('click',()=>canvas.toBlob(blob=>{if(!blob)return;const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='zeichnung.png';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);},'image/png'));</script></body></html>",
    "build": {
      "goal": "Zeichne mit Maus oder Finger, wähle Farben und exportiere deine Zeichnung als PNG.",
      "checkpoints": [
        {
          "id": "etappe-0",
          "title": "Koordinaten",
          "check": "Ein Strich folgt dem Finger auch bei schmaler Darstellung.",
          "hint": "Skaliere vom DOM-Rechteck auf Canvas-Koordinaten."
        },
        {
          "id": "etappe-1",
          "title": "Zeichnen",
          "check": "Ziehen erzeugt einen durchgehenden Strich.",
          "hint": "pointerdown startet einen Pfad; pointermove erweitert ihn."
        },
        {
          "id": "etappe-2",
          "title": "Farbe und Leeren",
          "check": "Die Farbe ändert neue Striche; Leeren entfernt alle.",
          "hint": "Lies die Farbe beim Start eines neuen Strichs."
        },
        {
          "id": "etappe-3",
          "title": "Export",
          "check": "PNG enthält die Zeichnung.",
          "hint": "Nutze toBlob statt eines Screenshots."
        }
      ],
      "starterFiles": {
        "index.html": "<!doctype html><html lang=\"de\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>Canvas-Malstudio</title><style>body{background:#101625;color:#eef2ff;font:16px system-ui;margin:0;padding:16px}button,input,select{font:inherit;padding:10px;margin:4px;border-radius:8px;max-width:100%;box-sizing:border-box}button{background:#a18aff;border:0;color:#111827;cursor:pointer}input,select{background:#202c41;color:white;border:1px solid #64748b}pre{white-space:pre-wrap;overflow-wrap:anywhere}canvas{display:block;max-width:100%;height:auto;border:1px solid #64748b;touch-action:none}img{max-width:100%}label{display:block;margin:8px 0}*{box-sizing:border-box}[role=status]{min-height:24px}</style></head><body><h1>Canvas-Malstudio</h1><input id=\"farbe\" type=\"color\"><canvas id=\"canvas\" width=\"480\" height=\"240\"></canvas><button id=\"leeren\">Leeren</button><button id=\"export\">PNG</button><script>// TODO: Pointer-Events und Canvas-Pfade verbinden.</script></body></html>"
      }
    }
  },
  {
    "id": "js-canvas-pong",
    "course": "js",
    "language": "JavaScript",
    "title": "Pong mit Touchsteuerung",
    "description": "Baue ein Canvas-Spiel mit Ballphysik, Schläger, Punkten, Neustart und Pause.",
    "files": {
      "index.html": "<!doctype html><html lang=\"de\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>Pong mit Touchsteuerung</title><style>body{background:#101625;color:#eef2ff;font:16px system-ui;margin:0;padding:16px}button,input,select{font:inherit;padding:10px;margin:4px;border-radius:8px;max-width:100%;box-sizing:border-box}button{background:#a18aff;border:0;color:#111827;cursor:pointer}input,select{background:#202c41;color:white;border:1px solid #64748b}pre{white-space:pre-wrap;overflow-wrap:anywhere}canvas{display:block;max-width:100%;height:auto;border:1px solid #64748b;touch-action:none}img{max-width:100%}label{display:block;margin:8px 0}*{box-sizing:border-box}[role=status]{min-height:24px}</style></head><body><h1>Pong mit Touchsteuerung</h1><p>Fange den Ball mit dem Schläger. Pfeiltasten oder die Touchknöpfe bewegen ihn.</p><button id=\"start\">Start / Neustart</button><button id=\"pause\">Pause / Weiter</button><button id=\"links\">← Links</button><button id=\"rechts\">Rechts →</button><p id=\"status\" role=\"status\">Bereit · Punkte: 0</p><canvas id=\"canvas\" width=\"480\" height=\"280\" aria-label=\"Pong-Spielfeld\"></canvas><script>\nconst canvas=document.querySelector('#canvas'),ctx=canvas.getContext('2d'),status=document.querySelector('#status');\nlet x=240,y=60,vx=140,vy=160,paddle=200,points=0,state='bereit',previous=null,frame,held=new Set();\nconst width=80,radius=7,paddleY=250;\nfunction render(){ctx.fillStyle='#101625';ctx.fillRect(0,0,480,280);ctx.fillStyle='#a18aff';ctx.fillRect(paddle,paddleY,width,12);ctx.beginPath();ctx.arc(x,y,radius,0,Math.PI*2);ctx.fillStyle='#6ee7b7';ctx.fill();status.textContent=`${state} · Punkte: ${points}`;}\nfunction tick(now){const dt=previous===null?0:Math.min((now-previous)/1000,.04);previous=now;\n if(state==='laeuft'){\n  const direction=Number(held.has('rechts'))-Number(held.has('links'));paddle=Math.max(0,Math.min(400,paddle+direction*260*dt));\n  const oldY=y;x+=vx*dt;y+=vy*dt;\n  if(x<radius){x=radius;vx=Math.abs(vx);}if(x>480-radius){x=480-radius;vx=-Math.abs(vx);}if(y<radius){y=radius;vy=Math.abs(vy);}\n  if(vy>0&&oldY+radius<=paddleY&&y+radius>=paddleY&&x>=paddle&&x<=paddle+width){y=paddleY-radius;vy=-Math.abs(vy);points++;}\n  if(y-radius>280){state='beendet';held.clear();}\n }render();if(state==='laeuft')frame=requestAnimationFrame(tick);\n}\nfunction loop(){cancelAnimationFrame(frame);previous=null;frame=requestAnimationFrame(tick);}\ndocument.querySelector('#start').addEventListener('click',()=>{x=240;y=60;vx=140;vy=160;paddle=200;points=0;held.clear();state='laeuft';loop();});\ndocument.querySelector('#pause').addEventListener('click',()=>{if(state==='laeuft'){state='pausiert';cancelAnimationFrame(frame);held.clear();render();}else if(state==='pausiert'){state='laeuft';loop();}});\nfor(const direction of ['links','rechts']){const button=document.querySelector('#'+direction);button.addEventListener('pointerdown',e=>{button.setPointerCapture(e.pointerId);held.add(direction);});for(const event of ['pointerup','pointercancel','lostpointercapture'])button.addEventListener(event,()=>held.delete(direction));}\ndocument.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();held.add(e.key==='ArrowLeft'?'links':'rechts');}});document.addEventListener('keyup',e=>{if(e.key==='ArrowLeft')held.delete('links');if(e.key==='ArrowRight')held.delete('rechts');});window.addEventListener('blur',()=>held.clear());render();</script></body></html>"
    },
    "steps": [
      "index.html öffnen und Start drücken.",
      "Pfeiltasten oder gehaltene Touchknöpfe verwenden.",
      "Pause hält die Simulation an; Neustart setzt Punkte und Positionen zurück."
    ],
    "concepts": [
      {
        "name": "requestAnimationFrame / Delta-Zeit",
        "explanation": "Bewegt den Ball anhand der verstrichenen Sekunden."
      },
      {
        "name": "Kollision / Vorzeichen",
        "explanation": "Kehrt beim Wand- und Schlägertreffer die Richtung um."
      },
      {
        "name": "Zustandsmaschine",
        "explanation": "Trennt bereit, laeuft, pausiert und beendet."
      }
    ],
    "ideas": [
      "Ergänze einen eigenen Randfalltest.",
      "Erweitere das Projekt um eine Funktion und erkläre ihre Wirkung."
    ],
    "demo": "<!doctype html><html lang=\"de\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>Pong mit Touchsteuerung</title><style>body{background:#101625;color:#eef2ff;font:16px system-ui;margin:0;padding:16px}button,input,select{font:inherit;padding:10px;margin:4px;border-radius:8px;max-width:100%;box-sizing:border-box}button{background:#a18aff;border:0;color:#111827;cursor:pointer}input,select{background:#202c41;color:white;border:1px solid #64748b}pre{white-space:pre-wrap;overflow-wrap:anywhere}canvas{display:block;max-width:100%;height:auto;border:1px solid #64748b;touch-action:none}img{max-width:100%}label{display:block;margin:8px 0}*{box-sizing:border-box}[role=status]{min-height:24px}</style></head><body><h1>Pong mit Touchsteuerung</h1><p>Fange den Ball mit dem Schläger. Pfeiltasten oder die Touchknöpfe bewegen ihn.</p><button id=\"start\">Start / Neustart</button><button id=\"pause\">Pause / Weiter</button><button id=\"links\">← Links</button><button id=\"rechts\">Rechts →</button><p id=\"status\" role=\"status\">Bereit · Punkte: 0</p><canvas id=\"canvas\" width=\"480\" height=\"280\" aria-label=\"Pong-Spielfeld\"></canvas><script>\nconst canvas=document.querySelector('#canvas'),ctx=canvas.getContext('2d'),status=document.querySelector('#status');\nlet x=240,y=60,vx=140,vy=160,paddle=200,points=0,state='bereit',previous=null,frame,held=new Set();\nconst width=80,radius=7,paddleY=250;\nfunction render(){ctx.fillStyle='#101625';ctx.fillRect(0,0,480,280);ctx.fillStyle='#a18aff';ctx.fillRect(paddle,paddleY,width,12);ctx.beginPath();ctx.arc(x,y,radius,0,Math.PI*2);ctx.fillStyle='#6ee7b7';ctx.fill();status.textContent=`${state} · Punkte: ${points}`;}\nfunction tick(now){const dt=previous===null?0:Math.min((now-previous)/1000,.04);previous=now;\n if(state==='laeuft'){\n  const direction=Number(held.has('rechts'))-Number(held.has('links'));paddle=Math.max(0,Math.min(400,paddle+direction*260*dt));\n  const oldY=y;x+=vx*dt;y+=vy*dt;\n  if(x<radius){x=radius;vx=Math.abs(vx);}if(x>480-radius){x=480-radius;vx=-Math.abs(vx);}if(y<radius){y=radius;vy=Math.abs(vy);}\n  if(vy>0&&oldY+radius<=paddleY&&y+radius>=paddleY&&x>=paddle&&x<=paddle+width){y=paddleY-radius;vy=-Math.abs(vy);points++;}\n  if(y-radius>280){state='beendet';held.clear();}\n }render();if(state==='laeuft')frame=requestAnimationFrame(tick);\n}\nfunction loop(){cancelAnimationFrame(frame);previous=null;frame=requestAnimationFrame(tick);}\ndocument.querySelector('#start').addEventListener('click',()=>{x=240;y=60;vx=140;vy=160;paddle=200;points=0;held.clear();state='laeuft';loop();});\ndocument.querySelector('#pause').addEventListener('click',()=>{if(state==='laeuft'){state='pausiert';cancelAnimationFrame(frame);held.clear();render();}else if(state==='pausiert'){state='laeuft';loop();}});\nfor(const direction of ['links','rechts']){const button=document.querySelector('#'+direction);button.addEventListener('pointerdown',e=>{button.setPointerCapture(e.pointerId);held.add(direction);});for(const event of ['pointerup','pointercancel','lostpointercapture'])button.addEventListener(event,()=>held.delete(direction));}\ndocument.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();held.add(e.key==='ArrowLeft'?'links':'rechts');}});document.addEventListener('keyup',e=>{if(e.key==='ArrowLeft')held.delete('links');if(e.key==='ArrowRight')held.delete('rechts');});window.addEventListener('blur',()=>held.clear());render();</script></body></html>",
    "build": {
      "goal": "Baue ein Canvas-Spiel mit Ballphysik, Schläger, Punkten, Neustart und Pause.",
      "checkpoints": [
        {
          "id": "etappe-0",
          "title": "Zeichnen",
          "check": "Ball und Schläger sind auf dem Canvas sichtbar.",
          "hint": "Zeichne jeden Frame nach dem Leeren neu."
        },
        {
          "id": "etappe-1",
          "title": "Steuern",
          "check": "Pfeiltasten und Touchknöpfe bewegen den begrenzten Schläger.",
          "hint": "Speichere gedrückte Richtungen in einem Set."
        },
        {
          "id": "etappe-2",
          "title": "Kollision",
          "check": "Wände reflektieren den Ball, Schlägertreffer geben Punkte.",
          "hint": "Prüfe beim Schläger das Überqueren seiner Oberkante."
        },
        {
          "id": "etappe-3",
          "title": "Spielende",
          "check": "Ein verpasster Ball beendet die Runde.",
          "hint": "Beende den Loop beim Zustand beendet."
        },
        {
          "id": "etappe-4",
          "title": "Pause und Neustart",
          "check": "Pause friert die Position ein; Neustart beginnt mit 0 Punkten.",
          "hint": "Speichere die Frame-ID und verhindere mehrere Loops."
        }
      ],
      "starterFiles": {
        "index.html": "<!doctype html><html lang=\"de\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>Pong mit Touchsteuerung</title><style>body{background:#101625;color:#eef2ff;font:16px system-ui;margin:0;padding:16px}button,input,select{font:inherit;padding:10px;margin:4px;border-radius:8px;max-width:100%;box-sizing:border-box}button{background:#a18aff;border:0;color:#111827;cursor:pointer}input,select{background:#202c41;color:white;border:1px solid #64748b}pre{white-space:pre-wrap;overflow-wrap:anywhere}canvas{display:block;max-width:100%;height:auto;border:1px solid #64748b;touch-action:none}img{max-width:100%}label{display:block;margin:8px 0}*{box-sizing:border-box}[role=status]{min-height:24px}</style></head><body><h1>Pong mit Touchsteuerung</h1><button id=\"start\">Start</button><button id=\"pause\">Pause</button><button id=\"links\">Links</button><button id=\"rechts\">Rechts</button><p id=\"status\"></p><canvas id=\"canvas\" width=\"480\" height=\"280\"></canvas><script>// TODO: Spielzustand, Zeichnen, Eingaben, Delta-Zeit und Kollisionen.</script></body></html>"
      }
    }
  },
  {
    "id": "js-node-notes",
    "course": "js",
    "language": "JavaScript",
    "title": "Node.js-Notizbuch",
    "description": "Erstelle und lies echte JSON-Dateien, nutze Terminalargumente und interaktive Eingaben und teste den Ablauf.",
    "files": {
      "cli.mjs": "import { readFile, writeFile, mkdir, rename } from 'node:fs/promises';\nimport { dirname, resolve } from 'node:path';\nimport { createInterface } from 'node:readline/promises';\nconst path=resolve(process.env.NOTES_FILE || './data/notizen.json');\nasync function lesen(){try{const liste=JSON.parse(await readFile(path,'utf8'));if(!Array.isArray(liste)||!liste.every(e=>Number.isInteger(e.id)&&typeof e.text==='string'))throw new Error('Ungültiges Dateiformat');return liste;}catch(e){if(e.code==='ENOENT')return [];throw e;}}\nasync function speichern(liste){await mkdir(dirname(path),{recursive:true});const temp=path+'.tmp';await writeFile(temp,JSON.stringify(liste,null,2),'utf8');await rename(temp,path);}\nasync function main(){const [command,...args]=process.argv.slice(2);let liste=await lesen();\n if(command==='list'){console.log(JSON.stringify(liste));return;}\n if(command==='add'||command==='prompt'){let text=args.join(' ').trim();if(command==='prompt'){const input=createInterface({input:process.stdin,output:process.stdout});try{text=(await input.question('Neue Notiz: ')).trim();}finally{input.close();}}if(!text)throw new Error('Notiz darf nicht leer sein');const id=liste.reduce((max,e)=>Math.max(max,e.id),0)+1;liste.push({id,text});await speichern(liste);console.log(JSON.stringify({id,text}));return;}\n if(command==='remove'){if(!/^[1-9]\\d*$/.test(args[0]||''))throw new Error('Positive ID angeben');const id=Number(args[0]),neu=liste.filter(e=>e.id!==id);if(neu.length===liste.length)throw new Error('Notiz nicht gefunden');await speichern(neu);console.log('Entfernt');return;}\n console.log('Befehle: node cli.mjs add \"Text\" | list | remove ID | prompt');\n}\nmain().catch(error=>{console.error(error.message);process.exitCode=1;});\n",
      "cli.test.mjs": "import test from 'node:test';\nimport assert from 'node:assert/strict';\nimport {mkdtemp,rm,writeFile} from 'node:fs/promises';\nimport {tmpdir} from 'node:os';\nimport {join} from 'node:path';\nimport {spawnSync} from 'node:child_process';\ntest('CLI persistiert, entfernt und schützt beschädigte Daten',async()=>{\n const dir=await mkdtemp(join(tmpdir(),'codeklar-cli-')),file=join(dir,'notizen.json');\n const run=(...args)=>spawnSync(process.execPath,['cli.mjs',...args],{encoding:'utf8',env:{...process.env,NOTES_FILE:file}});\n try{assert.deepEqual(JSON.parse(run('list').stdout),[]);assert.equal(run('add','').status,1);assert.deepEqual(JSON.parse(run('add','Hallo').stdout),{id:1,text:'Hallo'});assert.equal(JSON.parse(run('list').stdout).length,1);assert.equal(run('remove','1').status,0);assert.deepEqual(JSON.parse(run('list').stdout),[]);assert.equal(run('remove','99').status,1);await writeFile(file,'kaputt');assert.equal(run('add','nicht überschreiben').status,1);}finally{await rm(dir,{recursive:true,force:true});}\n});\n"
    },
    "steps": [
      "Node.js 24 oder neuer installieren; keine npm-Pakete nötig.",
      "node cli.mjs add \"Meine erste Notiz\"",
      "node cli.mjs list",
      "node cli.mjs prompt für eine interaktive Eingabe.",
      "node cli.mjs remove 1",
      "node --test cli.test.mjs"
    ],
    "concepts": [
      {
        "name": "node:fs/promises",
        "explanation": "Erstellt Ordner, liest Dateien und schreibt über eine temporäre Datei."
      },
      {
        "name": "process.argv / process.env",
        "explanation": "Liest Befehle und einen optionalen Dateipfad."
      },
      {
        "name": "readline/promises",
        "explanation": "Fragt Text im Terminal ab; close beendet die Eingabe."
      },
      {
        "name": "node:test",
        "explanation": "Prüft echte Prozesse und persistierte Dateien in einem temporären Ordner."
      }
    ],
    "ideas": [
      "Ergänze einen eigenen Randfalltest.",
      "Erweitere das Projekt um eine Funktion und erkläre ihre Wirkung."
    ],
    "demo": null,
    "build": {
      "goal": "Erstelle und lies echte JSON-Dateien, nutze Terminalargumente und interaktive Eingaben und teste den Ablauf.",
      "checkpoints": [
        {
          "id": "etappe-0",
          "title": "Argumente",
          "check": "add \"Hallo\" erkennt Befehl und Text.",
          "hint": "process.argv.slice(2) liefert deine Argumente."
        },
        {
          "id": "etappe-1",
          "title": "Datei schreiben",
          "check": "Eine JSON-Datei entsteht im Ordner data.",
          "hint": "mkdir mit recursive erstellt fehlende Ordner."
        },
        {
          "id": "etappe-2",
          "title": "Lesen und Löschen",
          "check": "Ein neuer Prozess liest dieselben Notizen; remove entfernt eine ID.",
          "hint": "Behandle nur ENOENT als leere Liste."
        },
        {
          "id": "etappe-3",
          "title": "Terminaleingabe",
          "check": "prompt nimmt eine Zeile entgegen.",
          "hint": "question liefert ein Promise; schließe das Interface im finally."
        },
        {
          "id": "etappe-4",
          "title": "Fehler und Tests",
          "check": "Leerer Text und beschädigte Dateien schlagen fehl; node --test besteht.",
          "hint": "Teste mit temporärem NOTES_FILE und echten Kindprozessen."
        }
      ],
      "starterFiles": {
        "cli.mjs": "// TODO: node:fs/promises, node:path und node:readline/promises importieren.\n// Befehle add/list/remove/prompt implementieren.\nconsole.log(process.argv.slice(2));\n",
        "cli.test.mjs": "import test from 'node:test';\nimport assert from 'node:assert/strict';\n// TODO: CLI in einem temporären Ordner starten und Ergebnisse prüfen.\n"
      }
    }
  },
  {
    "id": "js-node-sqlite",
    "course": "js",
    "language": "JavaScript",
    "title": "Aufgaben-API mit SQLite",
    "description": "Verbinde ein Browser-Frontend mit einem echten Node-Server und einer persistenten SQL-Datenbank.",
    "files": {
      "api.mjs": "import {createServer} from 'node:http';\nimport {readFile} from 'node:fs/promises';\nimport {DatabaseSync} from 'node:sqlite';\nexport function createApp(path='aufgaben.db'){\n const db=new DatabaseSync(path);\n db.exec(\"CREATE TABLE IF NOT EXISTS aufgaben (id INTEGER PRIMARY KEY AUTOINCREMENT, titel TEXT NOT NULL CHECK(length(titel) BETWEEN 1 AND 80), fertig INTEGER NOT NULL DEFAULT 0 CHECK(fertig IN (0,1)))\");\n function antwort(res,status,body){res.writeHead(status,{'Content-Type':'application/json; charset=utf-8'});res.end(JSON.stringify(body));}\n async function body(req){const parts=[];let size=0;for await(const part of req){size+=part.length;if(size>8192){const e=new Error('Anfrage zu groß');e.status=413;throw e;}parts.push(part);}try{return JSON.parse(Buffer.concat(parts).toString('utf8'));}catch{const e=new Error('Ungültiges JSON');e.status=400;throw e;}}\n const server=createServer(async(req,res)=>{try{\n  const url=new URL(req.url,'http://localhost'),path=url.pathname,match=/^\\/aufgaben\\/([1-9]\\d*)$/.exec(path);\n  if(req.method==='GET'&&path==='/'){res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});res.end(await readFile(new URL('./index.html',import.meta.url)));return;}\n  if(req.method==='GET'&&path==='/aufgaben'){const offen=url.searchParams.get('offen')==='1';antwort(res,200,db.prepare(offen?'SELECT * FROM aufgaben WHERE fertig=0 ORDER BY id DESC':'SELECT * FROM aufgaben ORDER BY id DESC').all());return;}\n  if(req.method==='POST'&&path==='/aufgaben'){const data=await body(req);if(!data||typeof data.titel!=='string'||!data.titel.trim()||data.titel.trim().length>80){antwort(res,400,{error:'Titel mit 1 bis 80 Zeichen erforderlich'});return;}const info=db.prepare('INSERT INTO aufgaben (titel) VALUES (?)').run(data.titel.trim());antwort(res,201,db.prepare('SELECT * FROM aufgaben WHERE id=?').get(Number(info.lastInsertRowid)));return;}\n  if(match&&req.method==='PATCH'){const data=await body(req);if(!data||typeof data.fertig!=='boolean'){antwort(res,400,{error:'fertig muss Boolean sein'});return;}const info=db.prepare('UPDATE aufgaben SET fertig=? WHERE id=?').run(Number(data.fertig),Number(match[1]));antwort(res,info.changes?200:404,info.changes?{ok:true}:{error:'Nicht gefunden'});return;}\n  if(match&&req.method==='DELETE'){const info=db.prepare('DELETE FROM aufgaben WHERE id=?').run(Number(match[1]));antwort(res,info.changes?200:404,info.changes?{ok:true}:{error:'Nicht gefunden'});return;}\n  antwort(res,404,{error:'Nicht gefunden'});\n }catch(error){antwort(res,error.status||500,{error:error.status?error.message:'Interner Serverfehler'});}});\n return {server,db};\n}\n",
      "server.mjs": "import {createApp} from './api.mjs';\nconst text=process.env.PORT||'3000';\nif(!/^\\d+$/.test(text)||Number(text)<1||Number(text)>65535)throw new Error('Ungültiger PORT');\nconst {server,db}=createApp(process.env.DB_FILE||'aufgaben.db');\nserver.listen(Number(text),'127.0.0.1',()=>console.log(`http://127.0.0.1:${text}`));\nserver.on('error',error=>{console.error(error.message);db.close();process.exitCode=1;});\nprocess.on('SIGINT',()=>server.close(()=>{db.close();process.exit(0);}));\n",
      "index.html": "<!doctype html><html lang=\"de\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>Aufgaben mit SQLite</title><style>body{background:#101625;color:#eef2ff;font:16px system-ui;margin:0;padding:16px}button,input,select{font:inherit;padding:10px;margin:4px;border-radius:8px;max-width:100%;box-sizing:border-box}button{background:#a18aff;border:0;color:#111827;cursor:pointer}input,select{background:#202c41;color:white;border:1px solid #64748b}pre{white-space:pre-wrap;overflow-wrap:anywhere}canvas{display:block;max-width:100%;height:auto;border:1px solid #64748b;touch-action:none}img{max-width:100%}label{display:block;margin:8px 0}*{box-sizing:border-box}[role=status]{min-height:24px}</style></head><body><h1>Aufgaben mit SQLite</h1><form id=\"form\"><label>Neue Aufgabe<input id=\"titel\" maxlength=\"80\" required></label><button>Speichern</button></form><button id=\"laden\">Neu laden</button><label><input id=\"offen\" type=\"checkbox\">Nur offene Aufgaben</label><p id=\"status\" role=\"status\"></p><ul id=\"liste\"></ul><script>\nconst status=document.querySelector('#status'),liste=document.querySelector('#liste');let busy=false;\nasync function request(path,options){const res=await fetch(path,options),data=await res.json();if(!res.ok)throw new Error(data.error||`HTTP ${res.status}`);return data;}\nasync function laden(){const data=await request('/aufgaben'+(document.querySelector('#offen').checked?'?offen=1':''));liste.replaceChildren();for(const item of data){const li=document.createElement('li'),text=document.createElement('span'),toggle=document.createElement('button'),del=document.createElement('button');text.textContent=item.titel+(item.fertig?' ✓':'');toggle.textContent=item.fertig?'Öffnen':'Erledigen';del.textContent='Löschen';toggle.addEventListener('click',()=>aktion(()=>request('/aufgaben/'+item.id,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({fertig:!item.fertig})})));del.addEventListener('click',()=>aktion(()=>request('/aufgaben/'+item.id,{method:'DELETE'})));li.append(text,toggle,del);liste.append(li);}}\nasync function aktion(fn){if(busy)return;busy=true;try{await fn();await laden();status.textContent='Gespeichert.';}catch(e){status.textContent=e.message;}finally{busy=false;}}\ndocument.querySelector('#form').addEventListener('submit',event=>{event.preventDefault();aktion(async()=>{await request('/aufgaben',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({titel:document.querySelector('#titel').value})});document.querySelector('#titel').value='';});});\ndocument.querySelector('#laden').addEventListener('click',()=>aktion(async()=>{}));document.querySelector('#offen').addEventListener('change',()=>aktion(async()=>{}));laden().catch(e=>status.textContent=e.message);\n</script></body></html>",
      "api.test.mjs": "import test from 'node:test';\nimport assert from 'node:assert/strict';\nimport {once} from 'node:events';\nimport {mkdtemp,rm} from 'node:fs/promises';\nimport {tmpdir} from 'node:os';\nimport {join} from 'node:path';\nimport {createApp} from './api.mjs';\ntest('HTTP, CRUD, Parameterbindung und Persistenz',async()=>{\n const dir=await mkdtemp(join(tmpdir(),'codeklar-db-')),path=join(dir,'test.db');const {server,db}=createApp(path);server.listen(0,'127.0.0.1');await once(server,'listening');const url=`http://127.0.0.1:${server.address().port}`;\n const send=(path,method='GET',data)=>fetch(url+path,{method,...(data!==undefined?{headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}:{})});\n try{assert.equal((await send('/')).status,200);assert.deepEqual(await(await send('/aufgaben')).json(),[]);assert.equal((await send('/aufgaben','POST',{titel:' '})).status,400);assert.equal((await send('/aufgaben','POST',{titel:'x'.repeat(81)})).status,400);assert.equal((await fetch(url+'/aufgaben',{method:'POST',body:'kaputt'})).status,400);assert.equal((await fetch(url+'/aufgaben',{method:'POST',body:'x'.repeat(9000)})).status,413);\n const titel=\"'); DROP TABLE aufgaben; --\",created=await send('/aufgaben','POST',{titel});assert.equal(created.status,201);const entry=await created.json();assert.equal(entry.titel,titel);assert.equal((await send('/aufgaben','POST',{titel:'Weiterlernen'})).status,201);assert.equal((await send('/aufgaben/'+entry.id,'PATCH',{fertig:'ja'})).status,400);assert.equal((await send('/aufgaben/'+entry.id,'PATCH',{fertig:true})).status,200);assert.equal((await(await send('/aufgaben?offen=1')).json()).length,1);assert.equal((await send('/aufgaben/'+entry.id,'DELETE')).status,200);assert.equal((await send('/aufgaben/'+entry.id,'DELETE')).status,404);\n }finally{await new Promise(resolve=>server.close(resolve));db.close();}\n try{const next=createApp(path);assert.equal(next.db.prepare('SELECT count(*) AS n FROM aufgaben').get().n,1);next.db.close();}finally{await rm(dir,{recursive:true,force:true});}\n});\n",
      "sql-rezepte.sql": "-- Diese Rezepte kannst du mit einem SQLite-Werkzeug oder db.prepare ausführen.\n-- CRUD verwendet feste Anweisungen und getrennt gebundene Werte.\nSELECT id, titel FROM aufgaben WHERE fertig = 0 ORDER BY id DESC;\nSELECT * FROM aufgaben ORDER BY id LIMIT 10 OFFSET 0;\n-- Zusatzübung: Relationen und LEFT JOIN. In einer eigenen Übungsdatenbank ausführen.\nCREATE TABLE nutzer (id INTEGER PRIMARY KEY, name TEXT NOT NULL);\nCREATE TABLE eintraege (id INTEGER PRIMARY KEY, titel TEXT NOT NULL, nutzer_id INTEGER REFERENCES nutzer(id));\nINSERT INTO nutzer VALUES (1, 'Ada');\nINSERT INTO eintraege VALUES (1, 'Canvas lernen', 1), (2, 'SQL lernen', NULL);\nSELECT e.titel, n.name FROM eintraege e LEFT JOIN nutzer n ON e.nutzer_id = n.id;\n-- Transaktionen gehören in try/catch: bei Fehler ROLLBACK, sonst COMMIT.\nBEGIN;\nUPDATE eintraege SET titel = 'Canvas anwenden' WHERE id = 1;\nCOMMIT;\n"
    },
    "steps": [
      "Node.js 24 oder neuer installieren; node:sqlite ist darin enthalten. Es können Experimental-Warnungen erscheinen.",
      "node server.mjs starten, dann http://127.0.0.1:3000 öffnen.",
      "Aufgaben anlegen, erledigen und löschen. aufgaben.db speichert den Stand nach Neustart.",
      "node --test api.test.mjs prüft HTTP, Fehler, SQL-Parameter und Persistenz.",
      "sql-rezepte.sql enthält zusätzliche JOIN-, LIMIT- und Transaktionsübungen."
    ],
    "concepts": [
      {
        "name": "node:http",
        "explanation": "Nimmt echte HTTP-Anfragen entgegen."
      },
      {
        "name": "DatabaseSync / prepare",
        "explanation": "Führt SQLite-Anweisungen mit gebundenen Werten aus."
      },
      {
        "name": "fetch / response.ok",
        "explanation": "Verbindet das Frontend mit dem Server und behandelt Fehler."
      },
      {
        "name": "node:test / temporäre DB",
        "explanation": "Testet CRUD und Persistenz ohne deine Daten zu überschreiben."
      }
    ],
    "ideas": [
      "Ergänze einen eigenen Randfalltest.",
      "Erweitere das Projekt um eine Funktion und erkläre ihre Wirkung."
    ],
    "demo": null,
    "build": {
      "goal": "Verbinde ein Browser-Frontend mit einem echten Node-Server und einer persistenten SQL-Datenbank.",
      "checkpoints": [
        {
          "id": "etappe-0",
          "title": "Server",
          "check": "GET /aufgaben liefert eine JSON-Liste.",
          "hint": "createServer verarbeitet Methode und URL."
        },
        {
          "id": "etappe-1",
          "title": "SQL anlegen",
          "check": "POST legt einen Titel mit gebundenem SQL-Parameter an.",
          "hint": "CREATE TABLE, prepare und run trennen Struktur von Daten."
        },
        {
          "id": "etappe-2",
          "title": "Frontend",
          "check": "Ein Formular zeigt Aufgaben und Fehlermeldungen.",
          "hint": "Prüfe response.ok und zeige Titel über textContent."
        },
        {
          "id": "etappe-3",
          "title": "Ändern und Löschen",
          "check": "PATCH erledigt eine Aufgabe; DELETE entfernt sie.",
          "hint": "UPDATE und DELETE verwenden WHERE id=?."
        },
        {
          "id": "etappe-4",
          "title": "Persistenz und Tests",
          "check": "Neustart behält Aufgaben; echte HTTP-Tests bestehen.",
          "hint": "Verwende eine temporäre Datenbank pro Test."
        }
      ],
      "starterFiles": {
        "server.mjs": "import {createServer} from 'node:http';\nimport {DatabaseSync} from 'node:sqlite';\n// TODO: Tabelle, GET/POST/PATCH/DELETE und Fehlerbehandlung.\ncreateServer((req,res)=>{res.writeHead(501);res.end('Noch implementieren');}).listen(3000,'127.0.0.1');\n",
        "index.html": "<!doctype html><html lang=\"de\"><meta charset=\"utf-8\"><h1>Meine Aufgaben</h1><!-- TODO: Formular und fetch --></html>",
        "api.test.mjs": "import test from 'node:test';\nimport assert from 'node:assert/strict';\n// TODO: Server auf zufälligem Port starten und echte Anfragen prüfen.\n"
      }
    }
  },
  {
    "id": "js-tested-budget",
    "course": "js",
    "language": "JavaScript",
    "title": "Haushaltsbuch mit Tests",
    "description": "Baue eine App aus getrennten Modulen für Geldbeträge, Datenänderungen, Speicher und Oberfläche.",
    "files": {
      "index.html": "<!doctype html><html lang=\"de\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>Haushaltsbuch mit Tests</title><style>body{background:#101625;color:#eef2ff;font:16px system-ui;margin:0;padding:16px}button,input,select{font:inherit;padding:10px;margin:4px;border-radius:8px;max-width:100%;box-sizing:border-box}button{background:#a18aff;border:0;color:#111827;cursor:pointer}input,select{background:#202c41;color:white;border:1px solid #64748b}pre{white-space:pre-wrap;overflow-wrap:anywhere}canvas{display:block;max-width:100%;height:auto;border:1px solid #64748b;touch-action:none}img{max-width:100%}label{display:block;margin:8px 0}*{box-sizing:border-box}[role=status]{min-height:24px}</style></head><body><h1>Haushaltsbuch mit Tests</h1><form id=\"form\"><label>Titel<input id=\"titel\" required></label><label>Betrag in Euro<input id=\"betrag\" inputmode=\"decimal\" placeholder=\"-12,50\" required></label><button>Eintrag speichern</button></form><p>Saldo: <strong id=\"saldo\"></strong></p><p id=\"status\" role=\"status\"></p><ul id=\"liste\"></ul><script type=\"module\" src=\"main.js\"></script></body></html>",
      "main.js": "import {parseCent,aendern,saldo} from './budget.js';\nimport {laden,speichern} from './speicher.js';\nlet liste=[];const status=document.querySelector('#status');\ntry{liste=laden(localStorage);}catch(e){status.textContent=e.message;}\nfunction render(){document.querySelector('#saldo').textContent=(saldo(liste)/100).toFixed(2)+' €';const ul=document.querySelector('#liste');ul.replaceChildren();for(const e of liste){const li=document.createElement('li'),text=document.createElement('span'),del=document.createElement('button');text.textContent=e.titel+': '+(e.betragCent/100).toFixed(2)+' €';del.textContent='Löschen';del.addEventListener('click',()=>change({typ:'remove',id:e.id}));li.append(text,del);ul.append(li);}}\nfunction change(aktion){try{const neu=aendern(liste,aktion);speichern(localStorage,neu);liste=neu;render();status.textContent='Gespeichert.';}catch(e){status.textContent=e.message;}}\ndocument.querySelector('#form').addEventListener('submit',e=>{e.preventDefault();try{const titel=document.querySelector('#titel').value.trim();if(!titel)throw new Error('Titel fehlt');const betragCent=parseCent(document.querySelector('#betrag').value),id=liste.reduce((max,e)=>Math.max(max,e.id),0)+1;change({typ:'add',eintrag:{id,titel,betragCent}});}catch(e){status.textContent=e.message;}});render();\n",
      "budget.js": "export function parseCent(text){\n const match=/^(-?)(\\d+)(?:[.,](\\d{1,2}))?$/.exec(text.trim());\n if(!match)throw new Error('Betrag als Euro mit höchstens zwei Nachkommastellen eingeben');\n const cent=Number(match[2])*100+Number((match[3]||'').padEnd(2,'0'));\n if(!Number.isSafeInteger(cent))throw new Error('Betrag zu groß');return match[1]? -cent:cent;\n}\nexport function aendern(liste,aktion){\n let neu=liste.map(e=>({...e}));\n if(aktion.typ==='add'){if(neu.some(e=>e.id===aktion.eintrag.id))throw new Error('ID existiert bereits');neu.push({...aktion.eintrag});}\n if(aktion.typ==='remove')neu=neu.filter(e=>e.id!==aktion.id);\n return neu;\n}\nexport function saldo(liste){return liste.reduce((sum,e)=>sum+e.betragCent,0);}\n",
      "speicher.js": "export function laden(storage){try{const data=JSON.parse(storage.getItem('codeklar-budget')||'[]');if(!Array.isArray(data)||!data.every(e=>Number.isInteger(e.id)&&Number.isSafeInteger(e.betragCent)&&typeof e.titel==='string'))throw new Error('Ungültiger gespeicherter Stand');return data;}catch(error){throw new Error('Gespeicherte Daten beschädigt: '+error.message);}}\nexport function speichern(storage,liste){storage.setItem('codeklar-budget',JSON.stringify(liste));}\n",
      "budget.test.js": "import test from 'node:test';\nimport assert from 'node:assert/strict';\nimport {parseCent,aendern,saldo} from './budget.js';\nimport {laden,speichern} from './speicher.js';\ntest('Centparser prüft gesamte Eingabe und Grenzen',()=>{assert.equal(parseCent('12,50'),1250);assert.equal(parseCent('-0.05'),-5);assert.equal(parseCent('0'),0);for(const text of ['12abc','1.234','','NaN','9007199254740992'])assert.throws(()=>parseCent(text));});\ntest('Reducer und Saldo verändern keine Eingaben',()=>{const liste=[Object.freeze({id:1,titel:'Start',betragCent:500})];Object.freeze(liste);const neu=aendern(liste,{typ:'add',eintrag:{id:2,titel:'Essen',betragCent:-200}});assert.equal(saldo(neu),300);assert.equal(liste.length,1);assert.equal(saldo([]),0);assert.equal(aendern(neu,{typ:'remove',id:1}).length,1);assert.throws(()=>aendern(liste,{typ:'add',eintrag:{id:1}}));});\ntest('Speicherfehler werden weitergegeben und ungültige Daten erkannt',()=>{let value=null;const storage={getItem:()=>value,setItem:(key,data)=>value=data};assert.deepEqual(laden(storage),[]);speichern(storage,[{id:1,titel:'Test',betragCent:0}]);assert.equal(laden(storage)[0].betragCent,0);value='kaputt';assert.throws(()=>laden(storage));assert.throws(()=>speichern({setItem(){throw new Error('Kein Platz');}},[]));});\n",
      "package.json": "{\n  \"type\": \"module\",\n  \"scripts\": {\n    \"test\": \"node --test budget.test.js\"\n  }\n}"
    },
    "steps": [
      "Node.js 24 oder neuer und Python 3 installieren. Keine npm-Pakete nötig.",
      "python3 -m http.server 8000 im Projektordner starten; http://localhost:8000 öffnen.",
      "Einnahmen positiv und Ausgaben negativ eingeben.",
      "npm test oder node --test budget.test.js ausführen."
    ],
    "concepts": [
      {
        "name": "ES-Module",
        "explanation": "Trennen Parser, Geschäftslogik, Speicherung und DOM."
      },
      {
        "name": "Ganzzahlige Cent",
        "explanation": "Summieren Beträge ohne Rundungsfehler durch Dezimalgeld."
      },
      {
        "name": "node:assert / node:test",
        "explanation": "Prüfen Ergebnisse, Fehler und unveränderte Eingaben."
      },
      {
        "name": "localStorage",
        "explanation": "Bewahrt den Stand lokal und meldet Speicherfehler."
      }
    ],
    "ideas": [
      "Ergänze einen eigenen Randfalltest.",
      "Erweitere das Projekt um eine Funktion und erkläre ihre Wirkung."
    ],
    "demo": null,
    "build": {
      "goal": "Baue eine App aus getrennten Modulen für Geldbeträge, Datenänderungen, Speicher und Oberfläche.",
      "checkpoints": [
        {
          "id": "etappe-0",
          "title": "Parser",
          "check": "12,50 wird 1250; 12abc und zu viele Stellen werden abgewiesen.",
          "hint": "Prüfe den ganzen Text vor dem Umwandeln."
        },
        {
          "id": "etappe-1",
          "title": "Reducer",
          "check": "Anlegen und Löschen verändern die ursprüngliche Liste nicht.",
          "hint": "Kopiere Liste und Einträge."
        },
        {
          "id": "etappe-2",
          "title": "Oberfläche",
          "check": "Formular und Saldo reagieren auf Einträge.",
          "hint": "Verwende textContent und berechne den Saldo in Cent."
        },
        {
          "id": "etappe-3",
          "title": "Speicher",
          "check": "Neuladen behält Einträge; Fehler werden sichtbar.",
          "hint": "Speichere den neuen Stand vor dem Wechsel der Anzeige."
        },
        {
          "id": "etappe-4",
          "title": "Tests",
          "check": "Normalfälle, Grenzen, Mutation und Speicherfehler sind geprüft.",
          "hint": "Teste ohne DOM die reine Logik mit node:test."
        }
      ],
      "starterFiles": {
        "index.html": "<!doctype html><html lang=\"de\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>Haushaltsbuch mit Tests</title><style>body{background:#101625;color:#eef2ff;font:16px system-ui;margin:0;padding:16px}button,input,select{font:inherit;padding:10px;margin:4px;border-radius:8px;max-width:100%;box-sizing:border-box}button{background:#a18aff;border:0;color:#111827;cursor:pointer}input,select{background:#202c41;color:white;border:1px solid #64748b}pre{white-space:pre-wrap;overflow-wrap:anywhere}canvas{display:block;max-width:100%;height:auto;border:1px solid #64748b;touch-action:none}img{max-width:100%}label{display:block;margin:8px 0}*{box-sizing:border-box}[role=status]{min-height:24px}</style></head><body><h1>Haushaltsbuch mit Tests</h1><form id=\"form\"><label>Titel<input id=\"titel\" required></label><label>Betrag in Euro<input id=\"betrag\" inputmode=\"decimal\" placeholder=\"-12,50\" required></label><button>Eintrag speichern</button></form><p>Saldo: <strong id=\"saldo\"></strong></p><p id=\"status\" role=\"status\"></p><ul id=\"liste\"></ul><script type=\"module\" src=\"main.js\"></script></body></html>",
        "main.js": "// TODO: budget.js und speicher.js importieren und DOM verbinden.\n",
        "budget.js": "export function parseCent(text) { throw new Error('TODO'); }\nexport function aendern(liste,aktion) { throw new Error('TODO'); }\nexport function saldo(liste) { throw new Error('TODO'); }\n",
        "speicher.js": "export function laden(storage) { throw new Error('TODO'); }\nexport function speichern(storage,liste) { throw new Error('TODO'); }\n",
        "budget.test.js": "import test from 'node:test';\nimport assert from 'node:assert/strict';\nimport {parseCent,aendern,saldo} from './budget.js';\n// TODO: Normalfälle, leere Liste, Grenzen und Mutation prüfen.\n",
        "package.json": "{\n  \"type\": \"module\",\n  \"scripts\": {\n    \"test\": \"node --test budget.test.js\"\n  }\n}"
      }
    }
  }
];
