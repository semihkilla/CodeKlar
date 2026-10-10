export const buildLessons = [
  {
    "id": "js-build-blob-text",
    "course": "js",
    "category": "Dateien & Bilder",
    "name": "Blob / text()",
    "title": "Text aus einem Blob lesen",
    "description": "Ein Blob enthält Bytes. text() liest diese Bytes asynchron als UTF-8-Text.",
    "syntax": "const blob = new Blob([\"Hallo\"], {type: \"text/plain\"});\nconst text = await blob.text();",
    "parts": [
      [
        "new Blob([text])",
        "Erzeugt ein Dateiobjekt ohne Zugriff auf eine Festplatte."
      ],
      [
        "await blob.text()",
        "Wartet auf das Lesen und liefert einen String."
      ]
    ],
    "note": "Ein File aus einem Dateifeld ist ein Blob mit zusätzlichem Namen und Änderungsdatum. Der ZIP-Datei-Explorer zeigt die echte Dateiauswahl.",
    "detail": "daten ist ein String. Erzeuge einen Blob daraus und gib den mit text() gelesenen Inhalt zurück.",
    "task": "daten ist ein String. Erzeuge einen Blob daraus und gib den mit text() gelesenen Inhalt zurück. Verändere die Eingabe nicht.",
    "functionName": "baueBlobText",
    "parameter": "daten",
    "tests": [
      {
        "input": "Hallo",
        "expected": "Hallo"
      },
      {
        "input": "",
        "expected": ""
      },
      {
        "input": "Grüße 🎮\nZeile 2",
        "expected": "Grüße 🎮\nZeile 2"
      }
    ],
    "hints": [
      "Übergib ein Array mit dem Text an new Blob.",
      "text() liefert ein Promise: Verwende await."
    ],
    "solution": "async function baueBlobText(daten) {\n  const blob = new Blob([daten], { type: \"text/plain;charset=utf-8\" });\n  return await blob.text();\n}",
    "starter": "function baueBlobText(daten) {\n  // Deine Lösung\n}",
    "example": "async function baueBlobText(daten) {\n  const blob = new Blob([daten], { type: \"text/plain;charset=utf-8\" });\n  return await blob.text();\n}\nconsole.log(await baueBlobText(\"Hallo\"));",
    "explanation": "Die Lösung trennt Eingabe, Verarbeitung und Ausgabe. text() liefert ein Promise: Verwende await.",
    "preserveInput": true
  },
  {
    "id": "js-build-utf8",
    "course": "js",
    "category": "Dateien & Bilder",
    "name": "TextEncoder / byteLength",
    "title": "Dateigröße bei Unicode verstehen",
    "description": "Zeichenanzahl und Byteanzahl sind verschieden. UTF-8 kodiert manche Zeichen mit mehreren Bytes.",
    "syntax": "new TextEncoder().encode(\"ä\").byteLength; // 2",
    "parts": [
      [
        "encode(text)",
        "Wandelt Text in ein Uint8Array um."
      ],
      [
        "byteLength",
        "Misst Bytes, nicht sichtbare Zeichen."
      ]
    ],
    "note": "Emoji können aus mehreren Unicode-Zeichen bestehen. String.length ist keine verlässliche Dateigröße.",
    "detail": "Gib die UTF-8-Byteanzahl des Strings daten zurück.",
    "task": "Gib die UTF-8-Byteanzahl des Strings daten zurück. Verändere die Eingabe nicht.",
    "functionName": "baueUtf8",
    "parameter": "daten",
    "tests": [
      {
        "input": "abc",
        "expected": 3
      },
      {
        "input": "ä",
        "expected": 2
      },
      {
        "input": "🎮",
        "expected": 4
      },
      {
        "input": "",
        "expected": 0
      }
    ],
    "hints": [
      "Verwende TextEncoder.",
      "Lies byteLength am Ergebnis von encode."
    ],
    "solution": "function baueUtf8(daten) {\n  return new TextEncoder().encode(daten).byteLength;\n}",
    "starter": "function baueUtf8(daten) {\n  // Deine Lösung\n}",
    "example": "function baueUtf8(daten) {\n  return new TextEncoder().encode(daten).byteLength;\n}\nconsole.log(baueUtf8(\"abc\"));",
    "explanation": "Die Lösung trennt Eingabe, Verarbeitung und Ausgabe. Lies byteLength am Ergebnis von encode.",
    "preserveInput": true
  },
  {
    "id": "js-build-file-filter",
    "course": "js",
    "category": "Dateien & Bilder",
    "name": "filter / size / type",
    "title": "Dateiauswahl nach Typ und Größe prüfen",
    "description": "Bei einem Upload prüfst du die Metadaten der ausgewählten Dateien vor dem Lesen.",
    "syntax": "[...input.files].filter(file => file.size <= limit);",
    "parts": [
      [
        "File.size",
        "Dateigröße in Bytes."
      ],
      [
        "File.type",
        "Gemeldeter MIME-Typ, der auch leer sein kann."
      ]
    ],
    "note": "Client-Prüfungen erleichtern die Bedienung. Ein Server muss Uploads unabhängig prüfen; Dateiendung und MIME-Angabe beweisen keinen sicheren Inhalt.",
    "detail": "daten enthält dateien (name, type, size) und limit. Gib die Namen von image/png und image/jpeg zurück, deren Größe zwischen 0 und einschließlich limit liegt.",
    "task": "daten enthält dateien (name, type, size) und limit. Gib die Namen von image/png und image/jpeg zurück, deren Größe zwischen 0 und einschließlich limit liegt. Verändere die Eingabe nicht.",
    "functionName": "baueFileFilter",
    "parameter": "daten",
    "tests": [
      {
        "input": {
          "dateien": [
            {
              "name": "a.png",
              "type": "image/png",
              "size": 10
            },
            {
              "name": "b.jpg",
              "type": "image/jpeg",
              "size": 11
            },
            {
              "name": "c.txt",
              "type": "text/plain",
              "size": 1
            }
          ],
          "limit": 10
        },
        "expected": [
          "a.png"
        ]
      },
      {
        "input": {
          "dateien": [],
          "limit": 100
        },
        "expected": []
      },
      {
        "input": {
          "dateien": [
            {
              "name": "leer",
              "type": "",
              "size": 0
            },
            {
              "name": "bild",
              "type": "image/jpeg",
              "size": 0
            }
          ],
          "limit": 0
        },
        "expected": [
          "bild"
        ]
      }
    ],
    "hints": [
      "Filtere Typ und Größe gemeinsam.",
      "map wandelt die verbleibenden Dateien in ihre Namen um."
    ],
    "solution": "function baueFileFilter(daten) {\n  return daten.dateien.filter(file => [\"image/png\", \"image/jpeg\"].includes(file.type) && file.size >= 0 && file.size <= daten.limit).map(file => file.name);\n}",
    "starter": "function baueFileFilter(daten) {\n  // Deine Lösung\n}",
    "example": "function baueFileFilter(daten) {\n  return daten.dateien.filter(file => [\"image/png\", \"image/jpeg\"].includes(file.type) && file.size >= 0 && file.size <= daten.limit).map(file => file.name);\n}\nconsole.log(baueFileFilter({\"dateien\": [{\"name\": \"a.png\", \"type\": \"image/png\", \"size\": 10}, {\"name\": \"b.jpg\", \"type\": \"image/jpeg\", \"size\": 11}, {\"name\": \"c.txt\", \"type\": \"text/plain\", \"size\": 1}], \"limit\": 10}));",
    "explanation": "Die Lösung trennt Eingabe, Verarbeitung und Ausgabe. map wandelt die verbleibenden Dateien in ihre Namen um.",
    "preserveInput": true
  },
  {
    "id": "js-build-json-import",
    "course": "js",
    "category": "Dateien & Bilder",
    "name": "JSON.parse / Array.isArray",
    "title": "Importierte Aufgaben validieren",
    "description": "JSON.parse prüft die JSON-Syntax; danach musst du die Form deiner Daten prüfen.",
    "syntax": "const data = JSON.parse(text);\nif (!Array.isArray(data)) throw new Error(\"Liste erwartet\");",
    "parts": [
      [
        "JSON.parse",
        "Liest Daten; führt keinen JavaScript-Code aus."
      ],
      [
        "typeof / trim",
        "Prüfen Pflichtfelder nach dem Einlesen."
      ]
    ],
    "note": "Eine erfolgreiche JSON-Konvertierung sagt noch nichts über das Datenschema aus.",
    "detail": "daten ist JSON-Text. Gib eine neue Liste getrimmter Titel zurück, wenn jedes Element ein Objekt mit nichtleerem String titel ist. Bei falscher Syntax oder Form gib null zurück.",
    "task": "daten ist JSON-Text. Gib eine neue Liste getrimmter Titel zurück, wenn jedes Element ein Objekt mit nichtleerem String titel ist. Bei falscher Syntax oder Form gib null zurück. Verändere die Eingabe nicht.",
    "functionName": "baueJsonImport",
    "parameter": "daten",
    "tests": [
      {
        "input": "[{\"titel\":\" Hallo \"}]",
        "expected": [
          "Hallo"
        ]
      },
      {
        "input": "[]",
        "expected": []
      },
      {
        "input": "{\"titel\":\"x\"}",
        "expected": null
      },
      {
        "input": "[{\"titel\":\" \"}]",
        "expected": null
      },
      {
        "input": "kaputt",
        "expected": null
      },
      {
        "input": "[null]",
        "expected": null
      }
    ],
    "hints": [
      "Fange Syntaxfehler mit try/catch ab.",
      "Prüfe zuerst Array.isArray, dann jedes Element."
    ],
    "solution": "function baueJsonImport(daten) {\n  try {\n    const liste = JSON.parse(daten);\n    if (!Array.isArray(liste) || !liste.every(item => item && typeof item.titel === \"string\" && item.titel.trim())) return null;\n    return liste.map(item => item.titel.trim());\n  } catch { return null; }\n}",
    "starter": "function baueJsonImport(daten) {\n  // Deine Lösung\n}",
    "example": "function baueJsonImport(daten) {\n  try {\n    const liste = JSON.parse(daten);\n    if (!Array.isArray(liste) || !liste.every(item => item && typeof item.titel === \"string\" && item.titel.trim())) return null;\n    return liste.map(item => item.titel.trim());\n  } catch { return null; }\n}\nconsole.log(baueJsonImport(\"[{\\\"titel\\\":\\\" Hallo \\\"}]\"));",
    "explanation": "Die Lösung trennt Eingabe, Verarbeitung und Ausgabe. Prüfe zuerst Array.isArray, dann jedes Element.",
    "preserveInput": true
  },
  {
    "id": "js-build-image-fit",
    "course": "js",
    "category": "Dateien & Bilder",
    "name": "Math.min / Skalierung",
    "title": "Bilder ohne Verzerrung einpassen",
    "description": "Ein gemeinsamer Skalierungsfaktor bewahrt das Seitenverhältnis.",
    "syntax": "const faktor = Math.min(maxBreite / breite, maxHoehe / hoehe, 1);",
    "parts": [
      [
        "Math.min(..., 1)",
        "Wählt die engste Grenze und verhindert Hochskalieren."
      ],
      [
        "Math.floor",
        "Wandelt die Zielgröße in ganze Pixel um."
      ]
    ],
    "note": "Diese Aufgabe berechnet Größen. Das Canvas-Bildprojekt zeichnet ein echtes ausgewähltes Bild und exportiert es als PNG.",
    "detail": "daten enthält positive ganze breite, hoehe, maxBreite und maxHoehe. Gib {breite, hoehe} eingepasst ohne Hochskalieren zurück.",
    "task": "daten enthält positive ganze breite, hoehe, maxBreite und maxHoehe. Gib {breite, hoehe} eingepasst ohne Hochskalieren zurück. Verändere die Eingabe nicht.",
    "functionName": "baueImageFit",
    "parameter": "daten",
    "tests": [
      {
        "input": {
          "breite": 800,
          "hoehe": 400,
          "maxBreite": 200,
          "maxHoehe": 200
        },
        "expected": {
          "breite": 200,
          "hoehe": 100
        }
      },
      {
        "input": {
          "breite": 100,
          "hoehe": 200,
          "maxBreite": 500,
          "maxHoehe": 500
        },
        "expected": {
          "breite": 100,
          "hoehe": 200
        }
      },
      {
        "input": {
          "breite": 300,
          "hoehe": 900,
          "maxBreite": 100,
          "maxHoehe": 150
        },
        "expected": {
          "breite": 50,
          "hoehe": 150
        }
      }
    ],
    "hints": [
      "Berechne einen Faktor für beide Seiten.",
      "Begrenze mit 1 und runde beide Zielmaße ab."
    ],
    "solution": "function baueImageFit(daten) {\n  const faktor = Math.min(daten.maxBreite / daten.breite, daten.maxHoehe / daten.hoehe, 1);\n  return { breite: Math.max(1, Math.floor(daten.breite * faktor)), hoehe: Math.max(1, Math.floor(daten.hoehe * faktor)) };\n}",
    "starter": "function baueImageFit(daten) {\n  // Deine Lösung\n}",
    "example": "function baueImageFit(daten) {\n  const faktor = Math.min(daten.maxBreite / daten.breite, daten.maxHoehe / daten.hoehe, 1);\n  return { breite: Math.max(1, Math.floor(daten.breite * faktor)), hoehe: Math.max(1, Math.floor(daten.hoehe * faktor)) };\n}\nconsole.log(baueImageFit({\"breite\": 800, \"hoehe\": 400, \"maxBreite\": 200, \"maxHoehe\": 200}));",
    "explanation": "Die Lösung trennt Eingabe, Verarbeitung und Ausgabe. Begrenze mit 1 und runde beide Zielmaße ab.",
    "preserveInput": true
  },
  {
    "id": "js-build-export-json",
    "course": "js",
    "category": "Dateien & Bilder",
    "name": "JSON.stringify / Blob",
    "title": "Einen JSON-Download vorbereiten",
    "description": "Downloads trennen das Serialisieren von der Browseraktion mit Blob und einem temporären Link.",
    "syntax": "const blob = new Blob([JSON.stringify(data, null, 2)], {type:\"application/json\"});\nconst url = URL.createObjectURL(blob);",
    "parts": [
      [
        "JSON.stringify(data, null, 2)",
        "Erzeugt gut lesbaren JSON-Text."
      ],
      [
        "URL.revokeObjectURL(url)",
        "Gibt die temporäre URL nach der Nutzung frei."
      ]
    ],
    "note": "Die Übung prüft den exportierten Text. Im Datei-Explorer funktioniert der Download mit Blob, URL und download-Link.",
    "detail": "daten ist eine JSON-kompatible Liste. Erzeuge einen JSON-Blob mit Einrückung 2 und gib dessen Text zurück.",
    "task": "daten ist eine JSON-kompatible Liste. Erzeuge einen JSON-Blob mit Einrückung 2 und gib dessen Text zurück. Verändere die Eingabe nicht.",
    "functionName": "baueExportJson",
    "parameter": "daten",
    "tests": [
      {
        "input": [],
        "expected": "[]"
      },
      {
        "input": [
          1,
          2
        ],
        "expected": "[\n  1,\n  2\n]"
      },
      {
        "input": [
          {
            "titel": "ä"
          }
        ],
        "expected": "[\n  {\n    \"titel\": \"ä\"\n  }\n]"
      }
    ],
    "hints": [
      "Serialisiere mit Einrückung 2.",
      "Lies den Blob mit await text()."
    ],
    "solution": "async function baueExportJson(daten) {\n  const blob = new Blob([JSON.stringify(daten, null, 2)], { type: \"application/json\" });\n  return await blob.text();\n}",
    "starter": "function baueExportJson(daten) {\n  // Deine Lösung\n}",
    "example": "async function baueExportJson(daten) {\n  const blob = new Blob([JSON.stringify(daten, null, 2)], { type: \"application/json\" });\n  return await blob.text();\n}\nconsole.log(await baueExportJson([]));",
    "explanation": "Die Lösung trennt Eingabe, Verarbeitung und Ausgabe. Lies den Blob mit await text().",
    "preserveInput": true
  },
  {
    "id": "js-build-canvas-point",
    "course": "js",
    "category": "Canvas & Spiele",
    "name": "Koordinaten / getBoundingClientRect",
    "title": "Touchpunkte auf Canvas umrechnen",
    "description": "Canvas hat eine interne Auflösung und eine dargestellte Größe. Eingabekoordinaten müssen passend skaliert werden.",
    "syntax": "const x = (event.clientX - rect.left) * canvas.width / rect.width;",
    "parts": [
      [
        "clientX / clientY",
        "Position im sichtbaren Browserfenster."
      ],
      [
        "rect.width / canvas.width",
        "CSS-Größe und Zeichnungsauflösung können abweichen."
      ]
    ],
    "note": "Die Aufgabe verwendet positive Größen. Im Malprojekt übernehmen Pointer-Events Maus und Touch.",
    "detail": "daten enthält clientX, clientY, left, top, cssBreite, cssHoehe, breite und hoehe. Gib {x,y} in internen Canvas-Koordinaten zurück.",
    "task": "daten enthält clientX, clientY, left, top, cssBreite, cssHoehe, breite und hoehe. Gib {x,y} in internen Canvas-Koordinaten zurück. Verändere die Eingabe nicht.",
    "functionName": "baueCanvasPoint",
    "parameter": "daten",
    "tests": [
      {
        "input": {
          "clientX": 60,
          "clientY": 40,
          "left": 10,
          "top": 20,
          "cssBreite": 100,
          "cssHoehe": 50,
          "breite": 200,
          "hoehe": 100
        },
        "expected": {
          "x": 100,
          "y": 40
        }
      },
      {
        "input": {
          "clientX": 0,
          "clientY": 0,
          "left": 0,
          "top": 0,
          "cssBreite": 300,
          "cssHoehe": 150,
          "breite": 300,
          "hoehe": 150
        },
        "expected": {
          "x": 0,
          "y": 0
        }
      },
      {
        "input": {
          "clientX": 50,
          "clientY": 100,
          "left": 0,
          "top": 0,
          "cssBreite": 100,
          "cssHoehe": 200,
          "breite": 400,
          "hoehe": 800
        },
        "expected": {
          "x": 200,
          "y": 400
        }
      }
    ],
    "hints": [
      "Ziehe den linken und oberen Rand ab.",
      "Skaliere danach mit interner Größe geteilt durch CSS-Größe."
    ],
    "solution": "function baueCanvasPoint(daten) {\n  return { x: (daten.clientX-daten.left)*daten.breite/daten.cssBreite, y: (daten.clientY-daten.top)*daten.hoehe/daten.cssHoehe };\n}",
    "starter": "function baueCanvasPoint(daten) {\n  // Deine Lösung\n}",
    "example": "function baueCanvasPoint(daten) {\n  return { x: (daten.clientX-daten.left)*daten.breite/daten.cssBreite, y: (daten.clientY-daten.top)*daten.hoehe/daten.cssHoehe };\n}\nconsole.log(baueCanvasPoint({\"clientX\": 60, \"clientY\": 40, \"left\": 10, \"top\": 20, \"cssBreite\": 100, \"cssHoehe\": 50, \"breite\": 200, \"hoehe\": 100}));",
    "explanation": "Die Lösung trennt Eingabe, Verarbeitung und Ausgabe. Skaliere danach mit interner Größe geteilt durch CSS-Größe.",
    "preserveInput": true
  },
  {
    "id": "js-build-canvas-commands",
    "course": "js",
    "category": "Canvas & Spiele",
    "name": "fillRect / clearRect",
    "title": "Zeichenbefehle aus Spielzustand erzeugen",
    "description": "Deine Spiellogik liefert Daten; ein Renderer setzt sie mit Canvas-Methoden um.",
    "syntax": "ctx.clearRect(0, 0, canvas.width, canvas.height);\nctx.fillRect(x, y, breite, hoehe);",
    "parts": [
      [
        "clearRect",
        "Entfernt den alten Frame."
      ],
      [
        "fillRect",
        "Zeichnet ein gefülltes Rechteck mit aktueller fillStyle."
      ]
    ],
    "note": "Die Übung erzeugt Zeichenbefehle. Echte Canvas-Pixel siehst du im Malprojekt und im Pong-Spiel.",
    "detail": "daten ist eine Liste von Rechtecken mit x,y,breite,hoehe,sichtbar. Gib für sichtbar===true die Befehle [\"fillRect\",x,y,breite,hoehe] zurück.",
    "task": "daten ist eine Liste von Rechtecken mit x,y,breite,hoehe,sichtbar. Gib für sichtbar===true die Befehle [\"fillRect\",x,y,breite,hoehe] zurück. Verändere die Eingabe nicht.",
    "functionName": "baueCanvasCommands",
    "parameter": "daten",
    "tests": [
      {
        "input": [],
        "expected": []
      },
      {
        "input": [
          {
            "x": 1,
            "y": 2,
            "breite": 3,
            "hoehe": 4,
            "sichtbar": true
          }
        ],
        "expected": [
          [
            "fillRect",
            1,
            2,
            3,
            4
          ]
        ]
      },
      {
        "input": [
          {
            "x": 0,
            "y": 0,
            "breite": 5,
            "hoehe": 5,
            "sichtbar": false
          }
        ],
        "expected": []
      }
    ],
    "hints": [
      "Filtere explizit auf true.",
      "Bewahre die Reihenfolge der sichtbaren Rechtecke."
    ],
    "solution": "function baueCanvasCommands(daten) {\n  return daten.filter(r => r.sichtbar === true).map(r => [\"fillRect\",r.x,r.y,r.breite,r.hoehe]);\n}",
    "starter": "function baueCanvasCommands(daten) {\n  // Deine Lösung\n}",
    "example": "function baueCanvasCommands(daten) {\n  return daten.filter(r => r.sichtbar === true).map(r => [\"fillRect\",r.x,r.y,r.breite,r.hoehe]);\n}\nconsole.log(baueCanvasCommands([]));",
    "explanation": "Die Lösung trennt Eingabe, Verarbeitung und Ausgabe. Bewahre die Reihenfolge der sichtbaren Rechtecke.",
    "preserveInput": true
  },
  {
    "id": "js-build-circle-hit",
    "course": "js",
    "category": "Canvas & Spiele",
    "name": "Math.hypot / Kreis",
    "title": "Treffer in einem Kreis erkennen",
    "description": "Bei einem runden Ziel vergleichst du den Abstand vom Mittelpunkt mit dem Radius.",
    "syntax": "Math.hypot(x - mitteX, y - mitteY) <= radius;",
    "parts": [
      [
        "Math.hypot",
        "Berechnet den euklidischen Abstand."
      ],
      [
        "<= radius",
        "Bezieht die Kreisgrenze ein."
      ]
    ],
    "note": "Ein Rechteck um einen Kreis würde in den Ecken falsche Treffer melden.",
    "detail": "daten enthält x,y,mitteX,mitteY und nichtnegativen radius. Gib true zurück, wenn der Punkt im Kreis oder auf seiner Grenze liegt.",
    "task": "daten enthält x,y,mitteX,mitteY und nichtnegativen radius. Gib true zurück, wenn der Punkt im Kreis oder auf seiner Grenze liegt. Verändere die Eingabe nicht.",
    "functionName": "baueCircleHit",
    "parameter": "daten",
    "tests": [
      {
        "input": {
          "x": 3,
          "y": 4,
          "mitteX": 0,
          "mitteY": 0,
          "radius": 5
        },
        "expected": true
      },
      {
        "input": {
          "x": 5,
          "y": 5,
          "mitteX": 0,
          "mitteY": 0,
          "radius": 5
        },
        "expected": false
      },
      {
        "input": {
          "x": 1,
          "y": 1,
          "mitteX": 1,
          "mitteY": 1,
          "radius": 0
        },
        "expected": true
      }
    ],
    "hints": [
      "Verwende beide Koordinatendifferenzen.",
      "Vergleiche den Abstand mit <=."
    ],
    "solution": "function baueCircleHit(daten) {\n  return Math.hypot(daten.x-daten.mitteX,daten.y-daten.mitteY) <= daten.radius;\n}",
    "starter": "function baueCircleHit(daten) {\n  // Deine Lösung\n}",
    "example": "function baueCircleHit(daten) {\n  return Math.hypot(daten.x-daten.mitteX,daten.y-daten.mitteY) <= daten.radius;\n}\nconsole.log(baueCircleHit({\"x\": 3, \"y\": 4, \"mitteX\": 0, \"mitteY\": 0, \"radius\": 5}));",
    "explanation": "Die Lösung trennt Eingabe, Verarbeitung und Ausgabe. Vergleiche den Abstand mit <=.",
    "preserveInput": true
  },
  {
    "id": "js-build-wall-bounce",
    "course": "js",
    "category": "Canvas & Spiele",
    "name": "Geschwindigkeit / Spiegelung",
    "title": "Einen Ball an einer Wand spiegeln",
    "description": "Beim Abprallen ändert sich die Bewegungsrichtung; ein kleiner Übertritt kann an der Wand gespiegelt werden.",
    "syntax": "if (x > max) { x = 2 * max - x; vx = -Math.abs(vx); }",
    "parts": [
      [
        "2 * max - x",
        "Spiegelt die Übertrittsstrecke."
      ],
      [
        "Math.abs",
        "Setzt die Richtung unabhängig vom vorherigen Vorzeichen."
      ]
    ],
    "note": "Diese Aufgabe behandelt genau einen Wandübertritt; die neue Position liegt zwischen -max und 2*max.",
    "detail": "daten enthält x, vx und positives max. x<0: spiegele x und setze vx positiv. x>max: spiegele x an max und setze vx negativ. Sonst behalte beide Werte. Gib {x,vx} zurück.",
    "task": "daten enthält x, vx und positives max. x<0: spiegele x und setze vx positiv. x>max: spiegele x an max und setze vx negativ. Sonst behalte beide Werte. Gib {x,vx} zurück. Verändere die Eingabe nicht.",
    "functionName": "baueWallBounce",
    "parameter": "daten",
    "tests": [
      {
        "input": {
          "x": -3,
          "vx": -5,
          "max": 100
        },
        "expected": {
          "x": 3,
          "vx": 5
        }
      },
      {
        "input": {
          "x": 104,
          "vx": 5,
          "max": 100
        },
        "expected": {
          "x": 96,
          "vx": -5
        }
      },
      {
        "input": {
          "x": 100,
          "vx": 5,
          "max": 100
        },
        "expected": {
          "x": 100,
          "vx": 5
        }
      },
      {
        "input": {
          "x": 50,
          "vx": -5,
          "max": 100
        },
        "expected": {
          "x": 50,
          "vx": -5
        }
      }
    ],
    "hints": [
      "Prüfe beide Wände getrennt.",
      "Nutze Math.abs für die gewünschte Richtung."
    ],
    "solution": "function baueWallBounce(daten) {\n  if (daten.x < 0) return { x: -daten.x, vx: Math.abs(daten.vx) };\n  if (daten.x > daten.max) return { x: 2*daten.max-daten.x, vx: -Math.abs(daten.vx) };\n  return { x: daten.x, vx: daten.vx };\n}",
    "starter": "function baueWallBounce(daten) {\n  // Deine Lösung\n}",
    "example": "function baueWallBounce(daten) {\n  if (daten.x < 0) return { x: -daten.x, vx: Math.abs(daten.vx) };\n  if (daten.x > daten.max) return { x: 2*daten.max-daten.x, vx: -Math.abs(daten.vx) };\n  return { x: daten.x, vx: daten.vx };\n}\nconsole.log(baueWallBounce({\"x\": -3, \"vx\": -5, \"max\": 100}));",
    "explanation": "Die Lösung trennt Eingabe, Verarbeitung und Ausgabe. Nutze Math.abs für die gewünschte Richtung.",
    "preserveInput": true
  },
  {
    "id": "js-build-snake-step",
    "course": "js",
    "category": "Canvas & Spiele",
    "name": "Array / Spielzustand",
    "title": "Den nächsten Snake-Schritt berechnen",
    "description": "Eine Schlange ist eine geordnete Liste: Der neue Kopf kommt vorne hinzu, ohne Wachstum fällt der Schwanz weg.",
    "syntax": "const next = [neuerKopf, ...schlange];\nif (!waechst) next.pop();",
    "parts": [
      [
        "Neuer Kopf",
        "Alte Kopfposition plus eine Gitterrichtung."
      ],
      [
        "pop()",
        "Entfernt das letzte Segment nur beim normalen Schritt."
      ]
    ],
    "note": "Diese Aufgabe prüft die Bewegung, nicht Wand- oder Eigenkollision. Die Richtung ist bereits gültig.",
    "detail": "daten enthält nichtleere schlange als [x,y]-Paare, richtung als [dx,dy] und waechst als Boolean. Gib die nächste Schlange ohne Mutation zurück.",
    "task": "daten enthält nichtleere schlange als [x,y]-Paare, richtung als [dx,dy] und waechst als Boolean. Gib die nächste Schlange ohne Mutation zurück. Verändere die Eingabe nicht.",
    "functionName": "baueSnakeStep",
    "parameter": "daten",
    "tests": [
      {
        "input": {
          "schlange": [
            [
              2,
              1
            ],
            [
              1,
              1
            ]
          ],
          "richtung": [
            1,
            0
          ],
          "waechst": false
        },
        "expected": [
          [
            3,
            1
          ],
          [
            2,
            1
          ]
        ]
      },
      {
        "input": {
          "schlange": [
            [
              2,
              1
            ],
            [
              1,
              1
            ]
          ],
          "richtung": [
            0,
            1
          ],
          "waechst": true
        },
        "expected": [
          [
            2,
            2
          ],
          [
            2,
            1
          ],
          [
            1,
            1
          ]
        ]
      },
      {
        "input": {
          "schlange": [
            [
              0,
              0
            ]
          ],
          "richtung": [
            0,
            -1
          ],
          "waechst": false
        },
        "expected": [
          [
            0,
            -1
          ]
        ]
      }
    ],
    "hints": [
      "Berechne den Kopf aus Position und Richtung.",
      "Kopiere auch die inneren Koordinatenpaare."
    ],
    "solution": "function baueSnakeStep(daten) {\n  const [x,y] = daten.schlange[0];\n  const neu = [[x+daten.richtung[0],y+daten.richtung[1]],...daten.schlange.map(p=>[...p])];\n  if (!daten.waechst) neu.pop();\n  return neu;\n}",
    "starter": "function baueSnakeStep(daten) {\n  // Deine Lösung\n}",
    "example": "function baueSnakeStep(daten) {\n  const [x,y] = daten.schlange[0];\n  const neu = [[x+daten.richtung[0],y+daten.richtung[1]],...daten.schlange.map(p=>[...p])];\n  if (!daten.waechst) neu.pop();\n  return neu;\n}\nconsole.log(baueSnakeStep({\"schlange\": [[2, 1], [1, 1]], \"richtung\": [1, 0], \"waechst\": false}));",
    "explanation": "Die Lösung trennt Eingabe, Verarbeitung und Ausgabe. Kopiere auch die inneren Koordinatenpaare.",
    "preserveInput": true
  },
  {
    "id": "js-build-game-state",
    "course": "js",
    "category": "Canvas & Spiele",
    "name": "Zustandsmaschine",
    "title": "Start Pause und Spielende unterscheiden",
    "description": "Ein Spiel reagiert abhängig vom aktuellen Zustand auf dieselbe Eingabe unterschiedlich.",
    "syntax": "if (zustand === \"bereit\" && event === \"start\") return \"laeuft\";",
    "parts": [
      [
        "Zustand",
        "Merkt, ob ein Spiel bereit, laufend, pausiert oder beendet ist."
      ],
      [
        "Übergang",
        "Erlaubt nur passende Kombinationen."
      ]
    ],
    "note": "Weitere Events sollen den Zustand unverändert lassen.",
    "detail": "daten enthält zustand und event. bereit+start→laeuft, laeuft+pause→pausiert, pausiert+start→laeuft, laeuft+treffer→beendet. reset setzt jeden Zustand auf bereit. Sonst bleibt der Zustand gleich.",
    "task": "daten enthält zustand und event. bereit+start→laeuft, laeuft+pause→pausiert, pausiert+start→laeuft, laeuft+treffer→beendet. reset setzt jeden Zustand auf bereit. Sonst bleibt der Zustand gleich. Verändere die Eingabe nicht.",
    "functionName": "baueGameState",
    "parameter": "daten",
    "tests": [
      {
        "input": {
          "zustand": "bereit",
          "event": "start"
        },
        "expected": "laeuft"
      },
      {
        "input": {
          "zustand": "laeuft",
          "event": "pause"
        },
        "expected": "pausiert"
      },
      {
        "input": {
          "zustand": "pausiert",
          "event": "start"
        },
        "expected": "laeuft"
      },
      {
        "input": {
          "zustand": "laeuft",
          "event": "treffer"
        },
        "expected": "beendet"
      },
      {
        "input": {
          "zustand": "beendet",
          "event": "start"
        },
        "expected": "beendet"
      },
      {
        "input": {
          "zustand": "beendet",
          "event": "reset"
        },
        "expected": "bereit"
      }
    ],
    "hints": [
      "Behandle reset zuerst.",
      "Erlaube Übergänge nur im passenden Ausgangszustand."
    ],
    "solution": "function baueGameState(daten) {\n  if (daten.event === \"reset\") return \"bereit\";\n  if ([\"bereit\",\"pausiert\"].includes(daten.zustand) && daten.event === \"start\") return \"laeuft\";\n  if (daten.zustand === \"laeuft\" && daten.event === \"pause\") return \"pausiert\";\n  if (daten.zustand === \"laeuft\" && daten.event === \"treffer\") return \"beendet\";\n  return daten.zustand;\n}",
    "starter": "function baueGameState(daten) {\n  // Deine Lösung\n}",
    "example": "function baueGameState(daten) {\n  if (daten.event === \"reset\") return \"bereit\";\n  if ([\"bereit\",\"pausiert\"].includes(daten.zustand) && daten.event === \"start\") return \"laeuft\";\n  if (daten.zustand === \"laeuft\" && daten.event === \"pause\") return \"pausiert\";\n  if (daten.zustand === \"laeuft\" && daten.event === \"treffer\") return \"beendet\";\n  return daten.zustand;\n}\nconsole.log(baueGameState({\"zustand\": \"bereit\", \"event\": \"start\"}));",
    "explanation": "Die Lösung trennt Eingabe, Verarbeitung und Ausgabe. Erlaube Übergänge nur im passenden Ausgangszustand.",
    "preserveInput": true
  },
  {
    "id": "js-build-cli-options",
    "course": "js",
    "category": "Node.js & Terminal",
    "name": "process.argv",
    "title": "Terminalargumente auswerten",
    "description": "Node.js stellt den Programmnamen und Argumente in process.argv bereit. Eigene Optionen liest du ab Index 2.",
    "syntax": "const args = process.argv.slice(2);",
    "parts": [
      [
        "slice(2)",
        "Entfernt Node-Pfad und Skriptpfad."
      ],
      [
        "--name Wert",
        "Eine Option besteht aus einem Schlüssel und einem folgenden Wert."
      ]
    ],
    "note": "Die Aufgabe prüft den Parser im Browser. Im Node-CLI-ZIP wird process.argv tatsächlich aus dem Terminal gelesen.",
    "detail": "daten ist eine Argumentliste ohne Node- und Skriptpfad. --name verwendet den folgenden nicht mit -- beginnenden Wert. Ohne Wert gilt Welt. --laut aktiviert Großbuchstaben. Gib Hallo NAME! zurück.",
    "task": "daten ist eine Argumentliste ohne Node- und Skriptpfad. --name verwendet den folgenden nicht mit -- beginnenden Wert. Ohne Wert gilt Welt. --laut aktiviert Großbuchstaben. Gib Hallo NAME! zurück. Verändere die Eingabe nicht.",
    "functionName": "baueCliOptions",
    "parameter": "daten",
    "tests": [
      {
        "input": [],
        "expected": "Hallo Welt!"
      },
      {
        "input": [
          "--name",
          "Semih"
        ],
        "expected": "Hallo Semih!"
      },
      {
        "input": [
          "--name",
          "--laut"
        ],
        "expected": "HALLO WELT!"
      },
      {
        "input": [
          "--laut",
          "--name",
          "Ada"
        ],
        "expected": "HALLO ADA!"
      }
    ],
    "hints": [
      "Prüfe, ob ein Wert folgt.",
      "--laut kann an jeder Position stehen."
    ],
    "solution": "function baueCliOptions(daten) {\n  let name = \"Welt\";\n  for (let i=0;i<daten.length;i++) if (daten[i] === \"--name\" && daten[i+1] && !daten[i+1].startsWith(\"--\")) name=daten[++i];\n  const text = `Hallo ${name}!`;\n  return daten.includes(\"--laut\") ? text.toUpperCase() : text;\n}",
    "starter": "function baueCliOptions(daten) {\n  // Deine Lösung\n}",
    "example": "function baueCliOptions(daten) {\n  let name = \"Welt\";\n  for (let i=0;i<daten.length;i++) if (daten[i] === \"--name\" && daten[i+1] && !daten[i+1].startsWith(\"--\")) name=daten[++i];\n  const text = `Hallo ${name}!`;\n  return daten.includes(\"--laut\") ? text.toUpperCase() : text;\n}\nconsole.log(baueCliOptions([]));",
    "explanation": "Die Lösung trennt Eingabe, Verarbeitung und Ausgabe. --laut kann an jeder Position stehen.",
    "preserveInput": true
  },
  {
    "id": "js-build-line-report",
    "course": "js",
    "category": "Node.js & Terminal",
    "name": "readFile / split",
    "title": "Eine gelesene Datei analysieren",
    "description": "readFile mit utf8 liefert Text. Danach kannst du Zeilen zerlegen und zählen.",
    "syntax": "import {readFile} from \"node:fs/promises\";\nconst text = await readFile(\"notizen.txt\", \"utf8\");",
    "parts": [
      [
        "readFile(path, \"utf8\")",
        "Liest eine echte Datei in Node.js."
      ],
      [
        "split(/\\r?\\n/)",
        "Behandelt Unix- und Windows-Zeilenenden."
      ]
    ],
    "note": "Node-Dateizugriff läuft im heruntergeladenen Projekt. In dieser Aufgabe wird der gelesene Text übergeben.",
    "detail": "daten ist Text. Gib die Zahl nichtleerer Zeilen zurück; reine Leerzeichen zählen nicht. Ein abschließender Zeilenumbruch erzeugt keinen weiteren Eintrag.",
    "task": "daten ist Text. Gib die Zahl nichtleerer Zeilen zurück; reine Leerzeichen zählen nicht. Ein abschließender Zeilenumbruch erzeugt keinen weiteren Eintrag. Verändere die Eingabe nicht.",
    "functionName": "baueLineReport",
    "parameter": "daten",
    "tests": [
      {
        "input": "",
        "expected": 0
      },
      {
        "input": "a\nb\n",
        "expected": 2
      },
      {
        "input": "a\r\n \r\nb",
        "expected": 2
      },
      {
        "input": "  ",
        "expected": 0
      }
    ],
    "hints": [
      "Zerlege beide üblichen Zeilenenden.",
      "Filtere getrimmte leere Zeilen heraus."
    ],
    "solution": "function baueLineReport(daten) {\n  return daten.split(/\\r?\\n/).filter(zeile=>zeile.trim()!==\"\").length;\n}",
    "starter": "function baueLineReport(daten) {\n  // Deine Lösung\n}",
    "example": "function baueLineReport(daten) {\n  return daten.split(/\\r?\\n/).filter(zeile=>zeile.trim()!==\"\").length;\n}\nconsole.log(baueLineReport(\"\"));",
    "explanation": "Die Lösung trennt Eingabe, Verarbeitung und Ausgabe. Filtere getrimmte leere Zeilen heraus.",
    "preserveInput": true
  },
  {
    "id": "js-build-env-port",
    "course": "js",
    "category": "Node.js & Terminal",
    "name": "process.env / Number",
    "title": "Einen Serverport prüfen",
    "description": "Umgebungsvariablen sind Strings. Bevor ein Server sie verwendet, prüfst du Werte und Grenzen.",
    "syntax": "const port = Number(process.env.PORT ?? 3000);",
    "parts": [
      [
        "process.env",
        "Liest Konfiguration aus der Prozessumgebung."
      ],
      [
        "Number.isInteger",
        "Prüft nach der Umwandlung auf eine ganze Zahl."
      ]
    ],
    "note": "Geheimnisse gehören nicht in Browsercode. Die Übung übergibt nur einen Port-String oder null.",
    "detail": "daten ist null oder ein String. Null oder nur Leerzeichen liefern 3000. Dezimalziffern mit Wert 1 bis 65535 liefern den Port. Andere Werte liefern null; keine Exponenten, Vorzeichen oder Nachkommastellen.",
    "task": "daten ist null oder ein String. Null oder nur Leerzeichen liefern 3000. Dezimalziffern mit Wert 1 bis 65535 liefern den Port. Andere Werte liefern null; keine Exponenten, Vorzeichen oder Nachkommastellen. Verändere die Eingabe nicht.",
    "functionName": "baueEnvPort",
    "parameter": "daten",
    "tests": [
      {
        "input": null,
        "expected": 3000
      },
      {
        "input": " 8080 ",
        "expected": 8080
      },
      {
        "input": "0",
        "expected": null
      },
      {
        "input": "65536",
        "expected": null
      },
      {
        "input": "3e3",
        "expected": null
      },
      {
        "input": "",
        "expected": 3000
      },
      {
        "input": "65535",
        "expected": 65535
      }
    ],
    "hints": [
      "Prüfe zuerst den gesamten String mit einem regulären Ausdruck.",
      "Grenze das numerische Ergebnis auf gültige Ports ein."
    ],
    "solution": "function baueEnvPort(daten) {\n  if (daten === null || daten.trim() === \"\") return 3000;\n  const text=daten.trim();\n  if (!/^\\d+$/.test(text)) return null;\n  const port=Number(text);\n  return Number.isInteger(port) && port>=1 && port<=65535 ? port : null;\n}",
    "starter": "function baueEnvPort(daten) {\n  // Deine Lösung\n}",
    "example": "function baueEnvPort(daten) {\n  if (daten === null || daten.trim() === \"\") return 3000;\n  const text=daten.trim();\n  if (!/^\\d+$/.test(text)) return null;\n  const port=Number(text);\n  return Number.isInteger(port) && port>=1 && port<=65535 ? port : null;\n}\nconsole.log(baueEnvPort(null));",
    "explanation": "Die Lösung trennt Eingabe, Verarbeitung und Ausgabe. Grenze das numerische Ergebnis auf gültige Ports ein.",
    "preserveInput": true
  },
  {
    "id": "js-build-file-operation",
    "course": "js",
    "category": "Node.js & Terminal",
    "name": "ENOENT / catch",
    "title": "Fehlende Dateien gezielt behandeln",
    "description": "Dateioperationen können fehlschlagen. Nicht jeder Fehler bedeutet, dass die Datei fehlt.",
    "syntax": "try { return await readFile(path,\"utf8\"); }\ncatch (error) { if (error.code === \"ENOENT\") return \"\"; throw error; }",
    "parts": [
      [
        "ENOENT",
        "Datei oder Pfad wurde nicht gefunden."
      ],
      [
        "Andere Fehler",
        "Berechtigungen und Datenträgerfehler dürfen nicht still ignoriert werden."
      ]
    ],
    "note": "Die Aufgabe entscheidet über Fehlercodes. Das CLI-Projekt verwendet echte readFile- und writeFile-Aufrufe.",
    "detail": "daten ist ein Fehlercode als String. ENOENT liefert neu anlegen, EACCES liefert Zugriff verweigert, alles andere liefert Fehler weitergeben.",
    "task": "daten ist ein Fehlercode als String. ENOENT liefert neu anlegen, EACCES liefert Zugriff verweigert, alles andere liefert Fehler weitergeben. Verändere die Eingabe nicht.",
    "functionName": "baueFileOperation",
    "parameter": "daten",
    "tests": [
      {
        "input": "ENOENT",
        "expected": "neu anlegen"
      },
      {
        "input": "EACCES",
        "expected": "Zugriff verweigert"
      },
      {
        "input": "ENOSPC",
        "expected": "Fehler weitergeben"
      },
      {
        "input": "",
        "expected": "Fehler weitergeben"
      }
    ],
    "hints": [
      "Vergleiche die Codes exakt.",
      "Behandle unbekannte Fehler als Fehler, nicht als leere Datei."
    ],
    "solution": "function baueFileOperation(daten) {\n  if (daten === \"ENOENT\") return \"neu anlegen\";\n  if (daten === \"EACCES\") return \"Zugriff verweigert\";\n  return \"Fehler weitergeben\";\n}",
    "starter": "function baueFileOperation(daten) {\n  // Deine Lösung\n}",
    "example": "function baueFileOperation(daten) {\n  if (daten === \"ENOENT\") return \"neu anlegen\";\n  if (daten === \"EACCES\") return \"Zugriff verweigert\";\n  return \"Fehler weitergeben\";\n}\nconsole.log(baueFileOperation(\"ENOENT\"));",
    "explanation": "Die Lösung trennt Eingabe, Verarbeitung und Ausgabe. Behandle unbekannte Fehler als Fehler, nicht als leere Datei.",
    "preserveInput": true
  },
  {
    "id": "js-build-route",
    "course": "js",
    "category": "APIs & SQL",
    "name": "Methode / Pfad",
    "title": "API-Routen nach Methode auswählen",
    "description": "Ein Pfad allein bestimmt nicht die Aktion: GET liest, POST legt an und DELETE entfernt.",
    "syntax": "if (method === \"GET\" && path === \"/aufgaben\") { /* lesen */ }",
    "parts": [
      [
        "HTTP-Methode",
        "Beschreibt die beabsichtigte Aktion."
      ],
      [
        "URL.pathname",
        "Enthält den Pfad ohne Query-Parameter."
      ]
    ],
    "note": "Die Aufgabe erkennt Routen. Das API/SQLite-Projekt startet einen echten lokalen HTTP-Server.",
    "detail": "daten enthält methode und pfad. GET /aufgaben→liste, POST /aufgaben→anlegen, DELETE /aufgaben/<positive ID ohne führende Null>→loeschen. Sonst nicht gefunden.",
    "task": "daten enthält methode und pfad. GET /aufgaben→liste, POST /aufgaben→anlegen, DELETE /aufgaben/<positive ID ohne führende Null>→loeschen. Sonst nicht gefunden. Verändere die Eingabe nicht.",
    "functionName": "baueRoute",
    "parameter": "daten",
    "tests": [
      {
        "input": {
          "methode": "GET",
          "pfad": "/aufgaben"
        },
        "expected": "liste"
      },
      {
        "input": {
          "methode": "POST",
          "pfad": "/aufgaben"
        },
        "expected": "anlegen"
      },
      {
        "input": {
          "methode": "DELETE",
          "pfad": "/aufgaben/12"
        },
        "expected": "loeschen"
      },
      {
        "input": {
          "methode": "GET",
          "pfad": "/aufgaben/12"
        },
        "expected": "nicht gefunden"
      },
      {
        "input": {
          "methode": "DELETE",
          "pfad": "/aufgaben/0"
        },
        "expected": "nicht gefunden"
      }
    ],
    "hints": [
      "Prüfe Methode und Pfad zusammen.",
      "Verankere das ID-Muster am Anfang und Ende."
    ],
    "solution": "function baueRoute(daten) {\n  if (daten.pfad === \"/aufgaben\" && daten.methode === \"GET\") return \"liste\";\n  if (daten.pfad === \"/aufgaben\" && daten.methode === \"POST\") return \"anlegen\";\n  if (daten.methode === \"DELETE\" && /^\\/aufgaben\\/[1-9]\\d*$/.test(daten.pfad)) return \"loeschen\";\n  return \"nicht gefunden\";\n}",
    "starter": "function baueRoute(daten) {\n  // Deine Lösung\n}",
    "example": "function baueRoute(daten) {\n  if (daten.pfad === \"/aufgaben\" && daten.methode === \"GET\") return \"liste\";\n  if (daten.pfad === \"/aufgaben\" && daten.methode === \"POST\") return \"anlegen\";\n  if (daten.methode === \"DELETE\" && /^\\/aufgaben\\/[1-9]\\d*$/.test(daten.pfad)) return \"loeschen\";\n  return \"nicht gefunden\";\n}\nconsole.log(baueRoute({\"methode\": \"GET\", \"pfad\": \"/aufgaben\"}));",
    "explanation": "Die Lösung trennt Eingabe, Verarbeitung und Ausgabe. Verankere das ID-Muster am Anfang und Ende.",
    "preserveInput": true
  },
  {
    "id": "js-build-body-validation",
    "course": "js",
    "category": "APIs & SQL",
    "name": "Validierung / trim",
    "title": "Anfragen vor dem Speichern validieren",
    "description": "Ein Server nimmt JSON entgegen, muss aber Form, Typ und Länge selbst prüfen.",
    "syntax": "if (typeof body.titel !== \"string\") return {status:400};",
    "parts": [
      [
        "400",
        "Die Anfrage enthält ungültige Daten."
      ],
      [
        "201",
        "Ein neuer Datensatz wurde angelegt."
      ]
    ],
    "note": "Die Aufgabe liefert nur die Entscheidung, noch keine Datenbankänderung.",
    "detail": "daten ist ein beliebiger JSON-Wert. Ein Objekt mit titel als getrimmtem String von 1 bis 80 Zeichen liefert {status:201,titel}. Sonst {status:400}.",
    "task": "daten ist ein beliebiger JSON-Wert. Ein Objekt mit titel als getrimmtem String von 1 bis 80 Zeichen liefert {status:201,titel}. Sonst {status:400}. Verändere die Eingabe nicht.",
    "functionName": "baueBodyValidation",
    "parameter": "daten",
    "tests": [
      {
        "input": {
          "titel": " Lesen "
        },
        "expected": {
          "status": 201,
          "titel": "Lesen"
        }
      },
      {
        "input": {
          "titel": " "
        },
        "expected": {
          "status": 400
        }
      },
      {
        "input": null,
        "expected": {
          "status": 400
        }
      },
      {
        "input": {
          "titel": 1
        },
        "expected": {
          "status": 400
        }
      },
      {
        "input": {
          "titel": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
        },
        "expected": {
          "status": 400
        }
      }
    ],
    "hints": [
      "Prüfe den Typ vor trim.",
      "Prüfe die Länge nach dem Trimmen."
    ],
    "solution": "function baueBodyValidation(daten) {\n  if (!daten || Array.isArray(daten) || typeof daten.titel !== \"string\") return { status:400 };\n  const titel=daten.titel.trim();\n  return titel.length>=1 && titel.length<=80 ? {status:201,titel} : {status:400};\n}",
    "starter": "function baueBodyValidation(daten) {\n  // Deine Lösung\n}",
    "example": "function baueBodyValidation(daten) {\n  if (!daten || Array.isArray(daten) || typeof daten.titel !== \"string\") return { status:400 };\n  const titel=daten.titel.trim();\n  return titel.length>=1 && titel.length<=80 ? {status:201,titel} : {status:400};\n}\nconsole.log(baueBodyValidation({\"titel\": \" Lesen \"}));",
    "explanation": "Die Lösung trennt Eingabe, Verarbeitung und Ausgabe. Prüfe die Länge nach dem Trimmen.",
    "preserveInput": true
  },
  {
    "id": "js-build-sql-params",
    "course": "js",
    "category": "APIs & SQL",
    "name": "prepare / run / ?",
    "title": "SQL-Werte als Parameter übergeben",
    "description": "SQL-Struktur und Benutzerdaten werden getrennt übertragen. Platzhalter verhindern, dass Text als SQL ausgeführt wird.",
    "syntax": "db.prepare(\"INSERT INTO aufgaben (titel) VALUES (?)\").run(titel);",
    "parts": [
      [
        "prepare(sql)",
        "Bereitet eine feste SQL-Anweisung vor."
      ],
      [
        "run(wert)",
        "Bindet den Wert getrennt an den Platzhalter."
      ]
    ],
    "note": "Die Übung gibt SQL und Parameter zurück. Das SQLite-Projekt führt dieselbe Anweisung gegen eine echte Datenbank aus.",
    "detail": "daten ist der Aufgabentitel. Gib {sql:\"INSERT INTO aufgaben (titel) VALUES (?)\",params:[daten]} zurück. Auch Anführungszeichen müssen unverändert in params bleiben.",
    "task": "daten ist der Aufgabentitel. Gib {sql:\"INSERT INTO aufgaben (titel) VALUES (?)\",params:[daten]} zurück. Auch Anführungszeichen müssen unverändert in params bleiben. Verändere die Eingabe nicht.",
    "functionName": "baueSqlParams",
    "parameter": "daten",
    "tests": [
      {
        "input": "Lesen",
        "expected": {
          "sql": "INSERT INTO aufgaben (titel) VALUES (?)",
          "params": [
            "Lesen"
          ]
        }
      },
      {
        "input": "O'Brien",
        "expected": {
          "sql": "INSERT INTO aufgaben (titel) VALUES (?)",
          "params": [
            "O'Brien"
          ]
        }
      },
      {
        "input": "'); DROP TABLE aufgaben; --",
        "expected": {
          "sql": "INSERT INTO aufgaben (titel) VALUES (?)",
          "params": [
            "'); DROP TABLE aufgaben; --"
          ]
        }
      }
    ],
    "hints": [
      "Baue keinen Titel in den SQL-String ein.",
      "Übergebe alle Werte im separaten Parameterarray."
    ],
    "solution": "function baueSqlParams(daten) {\n  return {sql:\"INSERT INTO aufgaben (titel) VALUES (?)\",params:[daten]};\n}",
    "starter": "function baueSqlParams(daten) {\n  // Deine Lösung\n}",
    "example": "function baueSqlParams(daten) {\n  return {sql:\"INSERT INTO aufgaben (titel) VALUES (?)\",params:[daten]};\n}\nconsole.log(baueSqlParams(\"Lesen\"));",
    "explanation": "Die Lösung trennt Eingabe, Verarbeitung und Ausgabe. Übergebe alle Werte im separaten Parameterarray.",
    "preserveInput": true
  },
  {
    "id": "js-build-sql-filter",
    "course": "js",
    "category": "APIs & SQL",
    "name": "WHERE / ORDER BY",
    "title": "Filtern und Sortieren einer SQL-Abfrage verstehen",
    "description": "SQL kann Datensätze auswählen und ihre Reihenfolge bestimmen. Der Browser kann dieselbe Logik an einer Liste nachvollziehen.",
    "syntax": "SELECT id, titel FROM aufgaben WHERE fertig = 0 ORDER BY id DESC;",
    "parts": [
      [
        "WHERE fertig = 0",
        "Lässt nur offene Aufgaben zu."
      ],
      [
        "ORDER BY id DESC",
        "Zeigt die höchste ID zuerst."
      ]
    ],
    "note": "Hier werden JSON-Zeilen verarbeitet. Die echte SQL-Abfrage steht im API-Projekt; diese Aufgabe ist keine SQL-Engine.",
    "detail": "daten ist eine Liste mit id,titel,fertig als 0 oder 1. Gib offene Aufgaben als {id,titel} in absteigender ID-Reihenfolge zurück.",
    "task": "daten ist eine Liste mit id,titel,fertig als 0 oder 1. Gib offene Aufgaben als {id,titel} in absteigender ID-Reihenfolge zurück. Verändere die Eingabe nicht.",
    "functionName": "baueSqlFilter",
    "parameter": "daten",
    "tests": [
      {
        "input": [],
        "expected": []
      },
      {
        "input": [
          {
            "id": 1,
            "titel": "a",
            "fertig": 0
          },
          {
            "id": 3,
            "titel": "b",
            "fertig": 1
          },
          {
            "id": 2,
            "titel": "c",
            "fertig": 0
          }
        ],
        "expected": [
          {
            "id": 2,
            "titel": "c"
          },
          {
            "id": 1,
            "titel": "a"
          }
        ]
      },
      {
        "input": [
          {
            "id": 0,
            "titel": "Null",
            "fertig": 0
          }
        ],
        "expected": [
          {
            "id": 0,
            "titel": "Null"
          }
        ]
      }
    ],
    "hints": [
      "Filter liefert eine neue Liste und schützt die Eingabe vor sort-Mutation.",
      "Vergleiche numerische IDs mit b.id-a.id."
    ],
    "solution": "function baueSqlFilter(daten) {\n  return daten.filter(item=>item.fertig===0).sort((a,b)=>b.id-a.id).map(({id,titel})=>({id,titel}));\n}",
    "starter": "function baueSqlFilter(daten) {\n  // Deine Lösung\n}",
    "example": "function baueSqlFilter(daten) {\n  return daten.filter(item=>item.fertig===0).sort((a,b)=>b.id-a.id).map(({id,titel})=>({id,titel}));\n}\nconsole.log(baueSqlFilter([]));",
    "explanation": "Die Lösung trennt Eingabe, Verarbeitung und Ausgabe. Vergleiche numerische IDs mit b.id-a.id.",
    "preserveInput": true
  },
  {
    "id": "js-build-sql-join",
    "course": "js",
    "category": "APIs & SQL",
    "name": "LEFT JOIN / Map",
    "title": "Datensätze mit optionalem Besitzer verbinden",
    "description": "Ein LEFT JOIN bewahrt alle Einträge auf der linken Seite, auch wenn kein Besitzer gefunden wird.",
    "syntax": "SELECT a.id, u.name FROM aufgaben a LEFT JOIN nutzer u ON a.nutzer_id=u.id;",
    "parts": [
      [
        "LEFT JOIN",
        "Fehlende rechte Werte werden null."
      ],
      [
        "Map.get",
        "Ermöglicht die vergleichbare Zuordnung im Browser."
      ]
    ],
    "note": "Nutzer-IDs sind eindeutig. Die Übung verarbeitet Listen; das Download-Projekt dokumentiert die SQL-Entsprechung.",
    "detail": "daten enthält aufgaben mit id,nutzerId und nutzer mit id,name. Gib für jede Aufgabe {id,name} zurück; ohne passenden Nutzer ist name null. Bewahre die Aufgabenreihenfolge.",
    "task": "daten enthält aufgaben mit id,nutzerId und nutzer mit id,name. Gib für jede Aufgabe {id,name} zurück; ohne passenden Nutzer ist name null. Bewahre die Aufgabenreihenfolge. Verändere die Eingabe nicht.",
    "functionName": "baueSqlJoin",
    "parameter": "daten",
    "tests": [
      {
        "input": {
          "aufgaben": [
            {
              "id": 1,
              "nutzerId": 2
            },
            {
              "id": 2,
              "nutzerId": 3
            }
          ],
          "nutzer": [
            {
              "id": 2,
              "name": "Ada"
            }
          ]
        },
        "expected": [
          {
            "id": 1,
            "name": "Ada"
          },
          {
            "id": 2,
            "name": null
          }
        ]
      },
      {
        "input": {
          "aufgaben": [],
          "nutzer": []
        },
        "expected": []
      },
      {
        "input": {
          "aufgaben": [
            {
              "id": 0,
              "nutzerId": 0
            }
          ],
          "nutzer": [
            {
              "id": 0,
              "name": ""
            }
          ]
        },
        "expected": [
          {
            "id": 0,
            "name": ""
          }
        ]
      }
    ],
    "hints": [
      "Verwende has statt eines Truthiness-Fallbacks.",
      "Mappe alle Aufgaben, auch ohne Treffer."
    ],
    "solution": "function baueSqlJoin(daten) {\n  const nutzer=new Map(daten.nutzer.map(u=>[u.id,u.name]));\n  return daten.aufgaben.map(a=>({id:a.id,name:nutzer.has(a.nutzerId)?nutzer.get(a.nutzerId):null}));\n}",
    "starter": "function baueSqlJoin(daten) {\n  // Deine Lösung\n}",
    "example": "function baueSqlJoin(daten) {\n  const nutzer=new Map(daten.nutzer.map(u=>[u.id,u.name]));\n  return daten.aufgaben.map(a=>({id:a.id,name:nutzer.has(a.nutzerId)?nutzer.get(a.nutzerId):null}));\n}\nconsole.log(baueSqlJoin({\"aufgaben\": [{\"id\": 1, \"nutzerId\": 2}, {\"id\": 2, \"nutzerId\": 3}], \"nutzer\": [{\"id\": 2, \"name\": \"Ada\"}]}));",
    "explanation": "Die Lösung trennt Eingabe, Verarbeitung und Ausgabe. Mappe alle Aufgaben, auch ohne Treffer.",
    "preserveInput": true
  },
  {
    "id": "js-build-pagination",
    "course": "js",
    "category": "APIs & SQL",
    "name": "LIMIT / OFFSET",
    "title": "Seiten einer Ergebnismenge bestimmen",
    "description": "Pagination begrenzt die Daten pro Anfrage. Seite 1 startet bei Offset 0.",
    "syntax": "SELECT * FROM aufgaben ORDER BY id LIMIT ? OFFSET ?;",
    "parts": [
      [
        "LIMIT",
        "Maximale Anzahl zurückgegebener Zeilen."
      ],
      [
        "OFFSET",
        "Anzahl übersprungener Zeilen."
      ]
    ],
    "note": "Die Sortierung muss stabil sein. Für große Datenmengen ist später eine Pagination nach IDs sinnvoll.",
    "detail": "daten enthält positive ganze seite und groesse. Gib {limit:groesse,offset:(seite-1)*groesse} zurück.",
    "task": "daten enthält positive ganze seite und groesse. Gib {limit:groesse,offset:(seite-1)*groesse} zurück. Verändere die Eingabe nicht.",
    "functionName": "bauePagination",
    "parameter": "daten",
    "tests": [
      {
        "input": {
          "seite": 1,
          "groesse": 20
        },
        "expected": {
          "limit": 20,
          "offset": 0
        }
      },
      {
        "input": {
          "seite": 3,
          "groesse": 5
        },
        "expected": {
          "limit": 5,
          "offset": 10
        }
      },
      {
        "input": {
          "seite": 2,
          "groesse": 1
        },
        "expected": {
          "limit": 1,
          "offset": 1
        }
      }
    ],
    "hints": [
      "Seite 1 überspringt nichts.",
      "Multipliziere die vorherigen Seiten mit der Seitengröße."
    ],
    "solution": "function bauePagination(daten) {\n  return {limit:daten.groesse,offset:(daten.seite-1)*daten.groesse};\n}",
    "starter": "function bauePagination(daten) {\n  // Deine Lösung\n}",
    "example": "function bauePagination(daten) {\n  return {limit:daten.groesse,offset:(daten.seite-1)*daten.groesse};\n}\nconsole.log(bauePagination({\"seite\": 1, \"groesse\": 20}));",
    "explanation": "Die Lösung trennt Eingabe, Verarbeitung und Ausgabe. Multipliziere die vorherigen Seiten mit der Seitengröße.",
    "preserveInput": true
  },
  {
    "id": "js-build-status-check",
    "course": "js",
    "category": "APIs & SQL",
    "name": "response.ok / status",
    "title": "HTTP-Ergebnisse sinnvoll melden",
    "description": "fetch lehnt bei einem HTTP-Fehler nicht automatisch ab. Der Status muss separat geprüft werden.",
    "syntax": "const response = await fetch(\"/aufgaben\");\nif (!response.ok) throw new Error(`HTTP ${response.status}`);",
    "parts": [
      [
        "2xx",
        "Erfolgreiche HTTP-Antwort."
      ],
      [
        "404 / 500",
        "Fehlende Ressource und Serverfehler sind unterschiedliche Situationen."
      ]
    ],
    "note": "Netzwerkfehler und HTTP-Statuscodes sind verschiedene Fehlerarten.",
    "detail": "daten ist ein HTTP-Status 100 bis 599. 2xx liefert erfolgreich, 404 liefert nicht gefunden, 4xx liefert Anfrage prüfen, 5xx liefert Serverfehler, sonst weitere Antwort.",
    "task": "daten ist ein HTTP-Status 100 bis 599. 2xx liefert erfolgreich, 404 liefert nicht gefunden, 4xx liefert Anfrage prüfen, 5xx liefert Serverfehler, sonst weitere Antwort. Verändere die Eingabe nicht.",
    "functionName": "baueStatusCheck",
    "parameter": "daten",
    "tests": [
      {
        "input": 200,
        "expected": "erfolgreich"
      },
      {
        "input": 204,
        "expected": "erfolgreich"
      },
      {
        "input": 404,
        "expected": "nicht gefunden"
      },
      {
        "input": 400,
        "expected": "Anfrage prüfen"
      },
      {
        "input": 503,
        "expected": "Serverfehler"
      },
      {
        "input": 302,
        "expected": "weitere Antwort"
      }
    ],
    "hints": [
      "Prüfe 404 vor dem allgemeinen 4xx-Fall.",
      "Erfolg umfasst alle 2xx-Statuscodes."
    ],
    "solution": "function baueStatusCheck(daten) {\n  if (daten>=200 && daten<300) return \"erfolgreich\";\n  if (daten===404) return \"nicht gefunden\";\n  if (daten>=400 && daten<500) return \"Anfrage prüfen\";\n  if (daten>=500) return \"Serverfehler\";\n  return \"weitere Antwort\";\n}",
    "starter": "function baueStatusCheck(daten) {\n  // Deine Lösung\n}",
    "example": "function baueStatusCheck(daten) {\n  if (daten>=200 && daten<300) return \"erfolgreich\";\n  if (daten===404) return \"nicht gefunden\";\n  if (daten>=400 && daten<500) return \"Anfrage prüfen\";\n  if (daten>=500) return \"Serverfehler\";\n  return \"weitere Antwort\";\n}\nconsole.log(baueStatusCheck(200));",
    "explanation": "Die Lösung trennt Eingabe, Verarbeitung und Ausgabe. Erfolg umfasst alle 2xx-Statuscodes.",
    "preserveInput": true
  },
  {
    "id": "js-build-project-ledger",
    "course": "js",
    "category": "Projekte & Tests",
    "name": "Reducer / Centbeträge",
    "title": "Die Kernlogik einer Haushalts-App bauen",
    "description": "Eine größere App wird leichter testbar, wenn ihre Datenänderungen in einer reinen Funktion stehen.",
    "syntax": "const neu = [...eintraege, {id, betragCent}];",
    "parts": [
      [
        "Reine Funktion",
        "Verändert weder Eingabe noch Speicher."
      ],
      [
        "Ganzzahlige Cent",
        "Vermeiden Nachkommastellen bei Geldsummen."
      ]
    ],
    "note": "Diese Funktion bildet die Grundlage des herunterladbaren Haushaltsprojekts mit getrennten Modulen und node:test.",
    "detail": "daten enthält liste (id,betragCent) und aktion. typ=add mit eintrag fügt ihn nur bei neuer ID hinzu; typ=remove mit id entfernt die ID. Andere Aktionen lassen die Liste gleich. Gib {liste,saldoCent} mit einer neuen Liste zurück.",
    "task": "daten enthält liste (id,betragCent) und aktion. typ=add mit eintrag fügt ihn nur bei neuer ID hinzu; typ=remove mit id entfernt die ID. Andere Aktionen lassen die Liste gleich. Gib {liste,saldoCent} mit einer neuen Liste zurück. Verändere die Eingabe nicht.",
    "functionName": "baueProjectLedger",
    "parameter": "daten",
    "tests": [
      {
        "input": {
          "liste": [],
          "aktion": {
            "typ": "add",
            "eintrag": {
              "id": 1,
              "betragCent": 500
            }
          }
        },
        "expected": {
          "liste": [
            {
              "id": 1,
              "betragCent": 500
            }
          ],
          "saldoCent": 500
        }
      },
      {
        "input": {
          "liste": [
            {
              "id": 1,
              "betragCent": -200
            }
          ],
          "aktion": {
            "typ": "remove",
            "id": 1
          }
        },
        "expected": {
          "liste": [],
          "saldoCent": 0
        }
      },
      {
        "input": {
          "liste": [
            {
              "id": 0,
              "betragCent": 1
            }
          ],
          "aktion": {
            "typ": "add",
            "eintrag": {
              "id": 0,
              "betragCent": 999
            }
          }
        },
        "expected": {
          "liste": [
            {
              "id": 0,
              "betragCent": 1
            }
          ],
          "saldoCent": 1
        }
      },
      {
        "input": {
          "liste": [
            {
              "id": 1,
              "betragCent": 500
            },
            {
              "id": 2,
              "betragCent": -200
            }
          ],
          "aktion": {
            "typ": "none"
          }
        },
        "expected": {
          "liste": [
            {
              "id": 1,
              "betragCent": 500
            },
            {
              "id": 2,
              "betragCent": -200
            }
          ],
          "saldoCent": 300
        }
      }
    ],
    "hints": [
      "Kopiere die Einträge vor der Änderung.",
      "Prüfe doppelte IDs, dann berechne die Summe mit reduce."
    ],
    "solution": "function baueProjectLedger(daten) {\n  let liste=daten.liste.map(e=>({...e}));\n  if (daten.aktion.typ===\"add\" && !liste.some(e=>e.id===daten.aktion.eintrag.id)) liste.push({...daten.aktion.eintrag});\n  if (daten.aktion.typ===\"remove\") liste=liste.filter(e=>e.id!==daten.aktion.id);\n  return {liste,saldoCent:liste.reduce((sum,e)=>sum+e.betragCent,0)};\n}",
    "starter": "function baueProjectLedger(daten) {\n  // Deine Lösung\n}",
    "example": "function baueProjectLedger(daten) {\n  let liste=daten.liste.map(e=>({...e}));\n  if (daten.aktion.typ===\"add\" && !liste.some(e=>e.id===daten.aktion.eintrag.id)) liste.push({...daten.aktion.eintrag});\n  if (daten.aktion.typ===\"remove\") liste=liste.filter(e=>e.id!==daten.aktion.id);\n  return {liste,saldoCent:liste.reduce((sum,e)=>sum+e.betragCent,0)};\n}\nconsole.log(baueProjectLedger({\"liste\": [], \"aktion\": {\"typ\": \"add\", \"eintrag\": {\"id\": 1, \"betragCent\": 500}}}));",
    "explanation": "Die Lösung trennt Eingabe, Verarbeitung und Ausgabe. Prüfe doppelte IDs, dann berechne die Summe mit reduce.",
    "preserveInput": true
  },
  {
    "id": "js-build-test-cases",
    "course": "js",
    "category": "Projekte & Tests",
    "name": "Grenzwerte / Testfälle",
    "title": "Testlücken vor der Implementierung erkennen",
    "description": "Gute Tests decken unterschiedliche Situationen ab statt nur ähnliche Standardwerte zu wiederholen.",
    "syntax": "assert.equal(port(\"0\"), null);\nassert.equal(port(\"65535\"), 65535);",
    "parts": [
      [
        "Normalfall",
        "Ein üblicher gültiger Wert."
      ],
      [
        "Grenzfall",
        "Direkt an, unter und über der Grenze."
      ]
    ],
    "note": "Die Aufgabe bewertet Kategorien, nicht die Qualität beliebiger eigener Testprogramme. Das Projekt liefert echte ausführbare Testdateien.",
    "detail": "daten ist eine Liste mit Testkategorien als Strings. Prüfe die Pflichtkategorien normal, leer, grenze, ungueltig. Gib fehlende Kategorien in genau dieser Reihenfolge zurück.",
    "task": "daten ist eine Liste mit Testkategorien als Strings. Prüfe die Pflichtkategorien normal, leer, grenze, ungueltig. Gib fehlende Kategorien in genau dieser Reihenfolge zurück. Verändere die Eingabe nicht.",
    "functionName": "baueTestCases",
    "parameter": "daten",
    "tests": [
      {
        "input": [],
        "expected": [
          "normal",
          "leer",
          "grenze",
          "ungueltig"
        ]
      },
      {
        "input": [
          "normal",
          "grenze"
        ],
        "expected": [
          "leer",
          "ungueltig"
        ]
      },
      {
        "input": [
          "ungueltig",
          "normal",
          "leer",
          "grenze"
        ],
        "expected": []
      },
      {
        "input": [
          "normal",
          "normal"
        ],
        "expected": [
          "leer",
          "grenze",
          "ungueltig"
        ]
      }
    ],
    "hints": [
      "Gehe die Pflichtliste durch, nicht die Eingabeliste.",
      "includes prüft, ob eine Kategorie bereits abgedeckt ist."
    ],
    "solution": "function baueTestCases(daten) {\n  return [\"normal\",\"leer\",\"grenze\",\"ungueltig\"].filter(k=>!daten.includes(k));\n}",
    "starter": "function baueTestCases(daten) {\n  // Deine Lösung\n}",
    "example": "function baueTestCases(daten) {\n  return [\"normal\",\"leer\",\"grenze\",\"ungueltig\"].filter(k=>!daten.includes(k));\n}\nconsole.log(baueTestCases([]));",
    "explanation": "Die Lösung trennt Eingabe, Verarbeitung und Ausgabe. includes prüft, ob eine Kategorie bereits abgedeckt ist.",
    "preserveInput": true
  },
  {
    "id": "js-build-test-api",
    "course": "js",
    "category": "Eigene Tests",
    "name": "API-Validierung testen",
    "title": "Mit eigenen Tests fehlerhafte API-Prüfungen finden",
    "description": "Schreibe eine Testsuite, die korrekten Code akzeptiert und typische Validierungsfehler entdeckt.",
    "syntax": "gleich(validiere({titel:' '}), {status:400}, 'Leerer Titel');",
    "parts": [
      [
        "gleich",
        "Vergleicht vollständige Rückgabeobjekte."
      ],
      [
        "Grenzen 80/81",
        "Prüfen die inklusive Obergrenze."
      ]
    ],
    "note": "gleich ist die Testhilfe von CodeKlar. Im API-ZIP prüft node:test zusätzlich echte HTTP-Anfragen und SQLite.",
    "detail": "Teste den Parameter validiere. Beim Prüfen wird er durch fehlerhafte Varianten ersetzt.",
    "task": "Schreibe in main.js Tests für validiere. Gültiger Titel: getrimmt, 1 bis 80 Zeichen, Ergebnis {status:201,titel}. Ungültiger Titel oder null: {status:400}. Finde leere Titel, fehlendes Trimmen, die falsche Grenze und überlange Titel.",
    "functionName": "pruefe",
    "tests": [
      {
        "input": "Korrekter Code",
        "expected": true
      },
      {
        "input": "Leerer Titel akzeptiert",
        "expected": true
      },
      {
        "input": "Titel nicht getrimmt",
        "expected": true
      },
      {
        "input": "Grenze 80 ausgeschlossen",
        "expected": true
      },
      {
        "input": "Überlange Titel erlaubt",
        "expected": true
      }
    ],
    "testWorkshop": {
      "target": "validiere",
      "correct": "export function validiere(daten) {\n  if (!daten || Array.isArray(daten) || typeof daten.titel !== \"string\") return { status:400 };\n  const titel=daten.titel.trim();\n  return titel.length>=1 && titel.length<=80 ? {status:201,titel} : {status:400};\n}",
      "mutations": [
        {
          "name": "Leerer Titel akzeptiert",
          "code": "function validiere(d){return d && typeof d.titel==='string' && d.titel.trim().length<=80?{status:201,titel:d.titel.trim()}:{status:400};}"
        },
        {
          "name": "Titel nicht getrimmt",
          "code": "function validiere(d){return d && typeof d.titel==='string' && d.titel.trim().length>=1 && d.titel.trim().length<=80?{status:201,titel:d.titel}:{status:400};}"
        },
        {
          "name": "Grenze 80 ausgeschlossen",
          "code": "function validiere(daten) {\n  if (!daten || Array.isArray(daten) || typeof daten.titel !== \"string\") return { status:400 };\n  const titel=daten.titel.trim();\n  return titel.length>=1 && titel.length<80 ? {status:201,titel} : {status:400};\n}"
        },
        {
          "name": "Überlange Titel erlaubt",
          "code": "function validiere(daten) {\n  if (!daten || Array.isArray(daten) || typeof daten.titel !== \"string\") return { status:400 };\n  const titel=daten.titel.trim();\n  return titel.length>=1 ? {status:201,titel} : {status:400};\n}"
        }
      ]
    },
    "starter": "import { validiere } from './funktion.js';\nexport { validiere };\nexport function pruefe(validiere, { gleich }) {\n  // TODO: gültige Anfrage, leeren Titel, Trim und die Grenzen 80/81 testen.\n}",
    "solution": "import { validiere } from './funktion.js';\nexport { validiere };\nexport function pruefe(validiere, { gleich }) {\n  gleich(validiere({titel:' Hallo '}), {status:201,titel:'Hallo'}, 'Trimmen');\n  gleich(validiere({titel:' '}), {status:400}, 'Leer');\n  gleich(validiere({titel:'a'.repeat(80)}), {status:201,titel:'a'.repeat(80)}, 'Grenze 80');\n  gleich(validiere({titel:'a'.repeat(81)}), {status:400}, 'Über Grenze');\n  gleich(validiere(null), {status:400}, 'Null');\n}",
    "example": "import { validiere } from './funktion.js';\nexport { validiere };\nexport function pruefe(validiere, { gleich }) {\n  gleich(validiere({titel:' Hallo '}), {status:201,titel:'Hallo'}, 'Trimmen');\n  gleich(validiere({titel:' '}), {status:400}, 'Leer');\n  gleich(validiere({titel:'a'.repeat(80)}), {status:201,titel:'a'.repeat(80)}, 'Grenze 80');\n  gleich(validiere({titel:'a'.repeat(81)}), {status:400}, 'Über Grenze');\n  gleich(validiere(null), {status:400}, 'Null');\n}",
    "starterFiles": {
      "main.js": "import { validiere } from './funktion.js';\nexport { validiere };\nexport function pruefe(validiere, { gleich }) {\n  // TODO: gültige Anfrage, leeren Titel, Trim und die Grenzen 80/81 testen.\n}",
      "funktion.js": "export function validiere(daten) {\n  if (!daten || Array.isArray(daten) || typeof daten.titel !== \"string\") return { status:400 };\n  const titel=daten.titel.trim();\n  return titel.length>=1 && titel.length<=80 ? {status:201,titel} : {status:400};\n}"
    },
    "solutionFiles": {
      "main.js": "import { validiere } from './funktion.js';\nexport { validiere };\nexport function pruefe(validiere, { gleich }) {\n  gleich(validiere({titel:' Hallo '}), {status:201,titel:'Hallo'}, 'Trimmen');\n  gleich(validiere({titel:' '}), {status:400}, 'Leer');\n  gleich(validiere({titel:'a'.repeat(80)}), {status:201,titel:'a'.repeat(80)}, 'Grenze 80');\n  gleich(validiere({titel:'a'.repeat(81)}), {status:400}, 'Über Grenze');\n  gleich(validiere(null), {status:400}, 'Null');\n}",
      "funktion.js": "export function validiere(daten) {\n  if (!daten || Array.isArray(daten) || typeof daten.titel !== \"string\") return { status:400 };\n  const titel=daten.titel.trim();\n  return titel.length>=1 && titel.length<=80 ? {status:201,titel} : {status:400};\n}"
    },
    "exampleFiles": {
      "main.js": "import { validiere } from './funktion.js';\nexport { validiere };\nexport function pruefe(validiere, { gleich }) {\n  gleich(validiere({titel:' Hallo '}), {status:201,titel:'Hallo'}, 'Trimmen');\n  gleich(validiere({titel:' '}), {status:400}, 'Leer');\n  gleich(validiere({titel:'a'.repeat(80)}), {status:201,titel:'a'.repeat(80)}, 'Grenze 80');\n  gleich(validiere({titel:'a'.repeat(81)}), {status:400}, 'Über Grenze');\n  gleich(validiere(null), {status:400}, 'Null');\n}",
      "funktion.js": "export function validiere(daten) {\n  if (!daten || Array.isArray(daten) || typeof daten.titel !== \"string\") return { status:400 };\n  const titel=daten.titel.trim();\n  return titel.length>=1 && titel.length<=80 ? {status:201,titel} : {status:400};\n}"
    },
    "hints": [
      "Prüfe ganze Rückgabeobjekte.",
      "Teste 80 und 81 Zeichen sowie einen Titel mit umgebenden Leerzeichen."
    ],
    "explanation": "Die Tests berechnen ihre Erwartungen unabhängig und unterscheiden gültige Grenzwerte von ungültigen Eingaben."
  },
  {
    "id": "js-build-test-sql",
    "course": "js",
    "category": "Eigene Tests",
    "name": "Parameterbindung testen",
    "title": "SQL-Struktur und Daten mit eigenen Tests schützen",
    "description": "Prüfe, dass Text unverändert als Parameter übergeben wird und niemals die SQL-Struktur verändert.",
    "syntax": "gleich(sqlPlan(\"O'Brien\"), {sql:'INSERT INTO aufgaben (titel) VALUES (?)',params:[\"O'Brien\"]});",
    "parts": [
      [
        "SQL-String",
        "Bleibt unabhängig vom Titel gleich."
      ],
      [
        "params",
        "Enthält den unveränderten Benutzertitel."
      ]
    ],
    "note": "Die Übung prüft einen Abfrageplan, keine ausgeführte SQL-Abfrage. Der API-Download testet die tatsächliche Datenbank.",
    "detail": "Teste gewöhnlichen Text und Sonderzeichen statt nur eines Standardtitels.",
    "task": "Schreibe Tests für sqlPlan(titel). Erwartet werden immer {sql:\"INSERT INTO aufgaben (titel) VALUES (?)\",params:[titel]}. Entdecke eingebauten SQL-Text, veränderte Apostrophe und einen festen Parameter.",
    "functionName": "pruefe",
    "tests": [
      {
        "input": "Korrekter Code",
        "expected": true
      },
      {
        "input": "Text in SQL eingebaut",
        "expected": true
      },
      {
        "input": "Apostrophe aus Titel entfernt",
        "expected": true
      },
      {
        "input": "Fester Parameter",
        "expected": true
      }
    ],
    "testWorkshop": {
      "target": "sqlPlan",
      "correct": "export function sqlPlan(daten) {\n  return {sql:\"INSERT INTO aufgaben (titel) VALUES (?)\",params:[daten]};\n}",
      "mutations": [
        {
          "name": "Text in SQL eingebaut",
          "code": "function sqlPlan(t){return {sql:`INSERT INTO aufgaben (titel) VALUES ('${t}')`,params:[]};}"
        },
        {
          "name": "Apostrophe aus Titel entfernt",
          "code": "function sqlPlan(t){return {sql:'INSERT INTO aufgaben (titel) VALUES (?)',params:[t.replaceAll(\"'\",'')]};}"
        },
        {
          "name": "Fester Parameter",
          "code": "function sqlPlan(t){return {sql:'INSERT INTO aufgaben (titel) VALUES (?)',params:['Hallo']};}"
        }
      ]
    },
    "starter": "import { sqlPlan } from './funktion.js';\nexport { sqlPlan };\nexport function pruefe(sqlPlan, { gleich }) {\n  // TODO: gewöhnlichen Text, Apostroph und SQL-artigen Text prüfen.\n}",
    "solution": "import { sqlPlan } from './funktion.js';\nexport { sqlPlan };\nexport function pruefe(sqlPlan, { gleich }) {\n  for (const titel of ['Hallo', \"O'Brien\", \"'); DROP TABLE aufgaben; --\"]) gleich(sqlPlan(titel), {sql:'INSERT INTO aufgaben (titel) VALUES (?)',params:[titel]}, 'Werte getrennt binden');\n}",
    "example": "import { sqlPlan } from './funktion.js';\nexport { sqlPlan };\nexport function pruefe(sqlPlan, { gleich }) {\n  for (const titel of ['Hallo', \"O'Brien\", \"'); DROP TABLE aufgaben; --\"]) gleich(sqlPlan(titel), {sql:'INSERT INTO aufgaben (titel) VALUES (?)',params:[titel]}, 'Werte getrennt binden');\n}",
    "starterFiles": {
      "main.js": "import { sqlPlan } from './funktion.js';\nexport { sqlPlan };\nexport function pruefe(sqlPlan, { gleich }) {\n  // TODO: gewöhnlichen Text, Apostroph und SQL-artigen Text prüfen.\n}",
      "funktion.js": "export function sqlPlan(daten) {\n  return {sql:\"INSERT INTO aufgaben (titel) VALUES (?)\",params:[daten]};\n}"
    },
    "solutionFiles": {
      "main.js": "import { sqlPlan } from './funktion.js';\nexport { sqlPlan };\nexport function pruefe(sqlPlan, { gleich }) {\n  for (const titel of ['Hallo', \"O'Brien\", \"'); DROP TABLE aufgaben; --\"]) gleich(sqlPlan(titel), {sql:'INSERT INTO aufgaben (titel) VALUES (?)',params:[titel]}, 'Werte getrennt binden');\n}",
      "funktion.js": "export function sqlPlan(daten) {\n  return {sql:\"INSERT INTO aufgaben (titel) VALUES (?)\",params:[daten]};\n}"
    },
    "exampleFiles": {
      "main.js": "import { sqlPlan } from './funktion.js';\nexport { sqlPlan };\nexport function pruefe(sqlPlan, { gleich }) {\n  for (const titel of ['Hallo', \"O'Brien\", \"'); DROP TABLE aufgaben; --\"]) gleich(sqlPlan(titel), {sql:'INSERT INTO aufgaben (titel) VALUES (?)',params:[titel]}, 'Werte getrennt binden');\n}",
      "funktion.js": "export function sqlPlan(daten) {\n  return {sql:\"INSERT INTO aufgaben (titel) VALUES (?)\",params:[daten]};\n}"
    },
    "hints": [
      "Vergleiche SQL und Parameter zusammen.",
      "Ein Titel mit Apostroph findet das unerwünschte Entfernen von Zeichen."
    ],
    "explanation": "Sonderzeichen bleiben Daten. Die Erwartung an den SQL-String ist fest und unabhängig von den eingegebenen Titeln."
  }
];
