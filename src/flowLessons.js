export const flowLessons = [
  {
    "id": "js-flow-async-iterable",
    "course": "js",
    "category": "Streams & Pipelines",
    "name": "async function*",
    "title": "Asynchrone Werte nacheinander sammeln",
    "description": "Ein async Generator kann Werte liefern, auf die for await wartet.",
    "syntax": "for await (const wert of quelle())",
    "parts": [
      [
        "yield",
        "Liefert den nächsten Wert."
      ],
      [
        "for await",
        "Wartet auf asynchrone Iterationsschritte."
      ]
    ],
    "note": "Die Quelle ist hier lokal und endlich; es gibt keine Netzwerkanfrage. Vollständiges Sammeln braucht Speicher für alle Ergebnisse.",
    "detail": "Erzeuge einen async Generator, der jedes Element aus daten über yield liefert, und sammle die Werte mit for await in ein neues Array.",
    "task": "Erzeuge einen async Generator, der jedes Element aus daten über yield liefert, und sammle die Werte mit for await in ein neues Array. Verändere die Eingabe nicht.",
    "functionName": "flowAsyncIterable",
    "parameter": "daten",
    "tests": [
      {
        "input": [
          0,
          false,
          ""
        ],
        "expected": [
          0,
          false,
          ""
        ]
      },
      {
        "input": [
          1,
          2
        ],
        "expected": [
          1,
          2
        ]
      },
      {
        "input": [],
        "expected": []
      }
    ],
    "starter": "async function flowAsyncIterable(daten) {\n  // Deine Lösung\n}",
    "solution": "async function flowAsyncIterable(daten) {\n  async function* quelle(){for(const value of daten)yield value;}\n  const out=[];for await(const value of quelle())out.push(value);return out;\n}",
    "example": "async function flowAsyncIterable(daten) {\n  async function* quelle(){for(const value of daten)yield value;}\n  const out=[];for await(const value of quelle())out.push(value);return out;\n}\n\nflowAsyncIterable([0, false, \"\"]).then(console.log);",
    "preserveInput": true,
    "hints": [
      "Ende der Iteration und falsche Werte sind unterschiedliche Dinge.",
      "Die äußere Funktion ist async, damit await beziehungsweise for await verwendet werden kann."
    ],
    "explanation": "Ein async Generator kann Werte liefern, auf die for await wartet. Die Quelle ist hier lokal und endlich; es gibt keine Netzwerkanfrage. Vollständiges Sammeln braucht Speicher für alle Ergebnisse."
  },
  {
    "id": "js-flow-serial",
    "course": "js",
    "category": "Parallele Arbeit",
    "name": "await im Ablauf",
    "title": "Abhängige Schritte ausdrücklich seriell ausführen",
    "description": "await innerhalb einer Schleife wartet pro Durchlauf, bevor der nächste Schritt beginnt.",
    "syntax": "for (...) { await schritt(); }",
    "parts": [
      [
        "Abhängigkeit",
        "Jeder Schritt erhält den aktuellen Stand."
      ]
    ],
    "note": "daten ist {start:number,schritte:number[]}. Jeder lokale Schritt löst ein Promise mit stand+delta auf; kein Timer oder Netz.",
    "detail": "Führe die Schritte seriell aus. Gib alle Zwischenstände nach jedem Schritt zurück.",
    "task": "Führe die Schritte seriell aus. Gib alle Zwischenstände nach jedem Schritt zurück. Verändere die Eingabe nicht.",
    "functionName": "flowSerial",
    "parameter": "daten",
    "tests": [
      {
        "input": {
          "start": 0,
          "schritte": [
            2,
            -1,
            4
          ]
        },
        "expected": [
          2,
          1,
          5
        ]
      },
      {
        "input": {
          "start": 10,
          "schritte": []
        },
        "expected": []
      },
      {
        "input": {
          "start": 1,
          "schritte": [
            0,
            0
          ]
        },
        "expected": [
          1,
          1
        ]
      }
    ],
    "starter": "async function flowSerial(daten) {\n  // Deine Lösung\n}",
    "solution": "async function flowSerial(daten) {\n  let stand=daten.start;const out=[];for(const delta of daten.schritte){stand=await Promise.resolve(stand+delta);out.push(stand);}return out;\n}",
    "example": "async function flowSerial(daten) {\n  let stand=daten.start;const out=[];for(const delta of daten.schritte){stand=await Promise.resolve(stand+delta);out.push(stand);}return out;\n}\n\nflowSerial({\"start\": 0, \"schritte\": [2, -1, 4]}).then(console.log);",
    "preserveInput": true,
    "hints": [
      "Nicht jeden Schritt vom ursprünglichen Startwert berechnen.",
      "Die äußere Funktion ist async, damit await beziehungsweise for await verwendet werden kann."
    ],
    "explanation": "await innerhalb einer Schleife wartet pro Durchlauf, bevor der nächste Schritt beginnt. daten ist {start:number,schritte:number[]}. Jeder lokale Schritt löst ein Promise mit stand+delta auf; kein Timer oder Netz."
  },
  {
    "id": "js-flow-readable",
    "course": "js",
    "category": "Streams & Pipelines",
    "name": "ReadableStream / read",
    "title": "Einen Datenstrom bis done lesen",
    "description": "Ein Reader liefert {value,done}; done signalisiert das Ende, nicht der Wahrheitswert von value.",
    "syntax": "const reader = stream.getReader()",
    "parts": [
      [
        "read",
        "Liefert ein Promise mit dem nächsten Chunk."
      ],
      [
        "done",
        "true markiert das Ende."
      ]
    ],
    "note": "Der lokale Stream enthält JSON-fähige Chunks und wird geschlossen. Ein Stream-Chunk muss kein Bytearray sein.",
    "detail": "Erzeuge einen ReadableStream aus daten und lies alle Chunks per Reader in ein neues Array. Gib auch 0, false und leere Strings zurück.",
    "task": "Erzeuge einen ReadableStream aus daten und lies alle Chunks per Reader in ein neues Array. Gib auch 0, false und leere Strings zurück. Verändere die Eingabe nicht.",
    "functionName": "flowReadable",
    "parameter": "daten",
    "tests": [
      {
        "input": [
          0,
          false,
          ""
        ],
        "expected": [
          0,
          false,
          ""
        ]
      },
      {
        "input": [],
        "expected": []
      },
      {
        "input": [
          "A",
          "B"
        ],
        "expected": [
          "A",
          "B"
        ]
      }
    ],
    "starter": "async function flowReadable(daten) {\n  // Deine Lösung\n}",
    "solution": "async function flowReadable(daten) {\n  const stream=new ReadableStream({start(c){for(const value of daten)c.enqueue(value);c.close();}});\n  const reader=stream.getReader(),out=[];try{while(true){const {value,done}=await reader.read();if(done)break;out.push(value);}}finally{reader.releaseLock();}return out;\n}",
    "example": "async function flowReadable(daten) {\n  const stream=new ReadableStream({start(c){for(const value of daten)c.enqueue(value);c.close();}});\n  const reader=stream.getReader(),out=[];try{while(true){const {value,done}=await reader.read();if(done)break;out.push(value);}}finally{reader.releaseLock();}return out;\n}\n\nflowReadable([0, false, \"\"]).then(console.log);",
    "preserveInput": true,
    "hints": [
      "Prüfe done statt value.",
      "Reader im finally freigeben.",
      "Die äußere Funktion ist async, damit await beziehungsweise for await verwendet werden kann."
    ],
    "explanation": "Ein Reader liefert {value,done}; done signalisiert das Ende, nicht der Wahrheitswert von value. Der lokale Stream enthält JSON-fähige Chunks und wird geschlossen. Ein Stream-Chunk muss kein Bytearray sein."
  },
  {
    "id": "js-flow-pull",
    "course": "js",
    "category": "Streams & Pipelines",
    "name": "pull(controller)",
    "title": "Chunks erst bei Nachfrage produzieren",
    "description": "pull kann neue Daten bereitstellen, wenn der Stream Nachfrage beziehungsweise freie Queuekapazität hat.",
    "syntax": "new ReadableStream({pull(controller){...}})",
    "parts": [
      [
        "close",
        "Beendet die Quelle nach dem letzten Wert."
      ]
    ],
    "note": "Die Testquelle ist endlich und nutzt normale Stream-Queue-Regeln; die Anzahl einzelner pull-Aufrufe wird nicht als universell fest vorausgesetzt.",
    "detail": "Erzeuge eine lokale Quelle mit einem Index, die in pull jeweils den nächsten Eingabewert einreiht oder schließt. Lies sie vollständig aus und gib die Werte zurück.",
    "task": "Erzeuge eine lokale Quelle mit einem Index, die in pull jeweils den nächsten Eingabewert einreiht oder schließt. Lies sie vollständig aus und gib die Werte zurück. Verändere die Eingabe nicht.",
    "functionName": "flowPull",
    "parameter": "daten",
    "tests": [
      {
        "input": [
          1,
          0,
          2
        ],
        "expected": [
          1,
          0,
          2
        ]
      },
      {
        "input": [],
        "expected": []
      },
      {
        "input": [
          false
        ],
        "expected": [
          false
        ]
      }
    ],
    "starter": "async function flowPull(daten) {\n  // Deine Lösung\n}",
    "solution": "async function flowPull(daten) {\n  let index=0;const stream=new ReadableStream({pull(c){if(index<daten.length)c.enqueue(daten[index++]);else c.close();}});\n  const reader=stream.getReader(),out=[];try{while(true){const r=await reader.read();if(r.done)break;out.push(r.value);}}finally{reader.releaseLock();}return out;\n}",
    "example": "async function flowPull(daten) {\n  let index=0;const stream=new ReadableStream({pull(c){if(index<daten.length)c.enqueue(daten[index++]);else c.close();}});\n  const reader=stream.getReader(),out=[];try{while(true){const r=await reader.read();if(r.done)break;out.push(r.value);}}finally{reader.releaseLock();}return out;\n}\n\nflowPull([1, 0, 2]).then(console.log);",
    "preserveInput": true,
    "hints": [
      "Vergleiche den Index mit length, nicht den aktuellen Wert.",
      "Die äußere Funktion ist async, damit await beziehungsweise for await verwendet werden kann."
    ],
    "explanation": "pull kann neue Daten bereitstellen, wenn der Stream Nachfrage beziehungsweise freie Queuekapazität hat. Die Testquelle ist endlich und nutzt normale Stream-Queue-Regeln; die Anzahl einzelner pull-Aufrufe wird nicht als universell fest vorausgesetzt."
  },
  {
    "id": "js-flow-cancel",
    "course": "js",
    "category": "Streams & Pipelines",
    "name": "reader.cancel",
    "title": "Eine Stream-Quelle bewusst abbrechen",
    "description": "cancel signalisiert, dass der Konsument keine weiteren Daten braucht. Die Quelle kann Ressourcen aufräumen.",
    "syntax": "await reader.cancel(grund)",
    "parts": [
      [
        "cancel(reason)",
        "Die Quelle bekommt den angegebenen Grund."
      ]
    ],
    "note": "Die lokale Quelle bleibt bis zum Abbruch offen. Nach cancel kann ein weiterer read das Ende feststellen. Dies ist kein fetch-Abbruch.",
    "detail": "Erzeuge einen offenen Stream mit einem cancel-Hook. Brich per Reader mit daten ab. Gib {grund,beendet} zurück, wobei beendet das done eines anschließenden read ist.",
    "task": "Erzeuge einen offenen Stream mit einem cancel-Hook. Brich per Reader mit daten ab. Gib {grund,beendet} zurück, wobei beendet das done eines anschließenden read ist. Verändere die Eingabe nicht.",
    "functionName": "flowCancel",
    "parameter": "daten",
    "tests": [
      {
        "input": "stop",
        "expected": {
          "grund": "stop",
          "beendet": true
        }
      },
      {
        "input": "",
        "expected": {
          "grund": "",
          "beendet": true
        }
      },
      {
        "input": null,
        "expected": {
          "grund": null,
          "beendet": true
        }
      }
    ],
    "starter": "async function flowCancel(daten) {\n  // Deine Lösung\n}",
    "solution": "async function flowCancel(daten) {\n  let grund=null;const stream=new ReadableStream({cancel(reason){grund=reason;}});const reader=stream.getReader();\n  await reader.cancel(daten);const next=await reader.read();reader.releaseLock();return {grund,beendet:next.done};\n}",
    "example": "async function flowCancel(daten) {\n  let grund=null;const stream=new ReadableStream({cancel(reason){grund=reason;}});const reader=stream.getReader();\n  await reader.cancel(daten);const next=await reader.read();reader.releaseLock();return {grund,beendet:next.done};\n}\n\nflowCancel(\"stop\").then(console.log);",
    "preserveInput": true,
    "hints": [
      "Auch ein leerer Abbruchgrund soll erhalten bleiben.",
      "Die äußere Funktion ist async, damit await beziehungsweise for await verwendet werden kann."
    ],
    "explanation": "cancel signalisiert, dass der Konsument keine weiteren Daten braucht. Die Quelle kann Ressourcen aufräumen. Die lokale Quelle bleibt bis zum Abbruch offen. Nach cancel kann ein weiterer read das Ende feststellen. Dies ist kein fetch-Abbruch."
  },
  {
    "id": "js-flow-lock",
    "course": "js",
    "category": "Streams & Pipelines",
    "name": "locked / releaseLock",
    "title": "Ein Reader sperrt seinen Stream",
    "description": "Ein Stream mit aktivem Reader ist gesperrt; releaseLock gibt ihn für einen anderen Reader frei.",
    "syntax": "reader.releaseLock()",
    "parts": [
      [
        "locked",
        "Beschreibt die Reader-Sperre, nicht einen Dateilock."
      ]
    ],
    "note": "Der Stream ist geschlossen und hat keine ausstehenden read-Aufrufe, bevor die Sperre freigegeben wird.",
    "detail": "Erzeuge einen geschlossenen leeren Stream. Lies locked vorher, mit Reader und nach releaseLock; gib {vorher,waehrend,nachher} zurück.",
    "task": "Erzeuge einen geschlossenen leeren Stream. Lies locked vorher, mit Reader und nach releaseLock; gib {vorher,waehrend,nachher} zurück. Verändere die Eingabe nicht.",
    "functionName": "flowLock",
    "parameter": "daten",
    "tests": [
      {
        "input": null,
        "expected": {
          "vorher": false,
          "waehrend": true,
          "nachher": false
        }
      },
      {
        "input": 0,
        "expected": {
          "vorher": false,
          "waehrend": true,
          "nachher": false
        }
      }
    ],
    "starter": "function flowLock(daten) {\n  // Deine Lösung\n}",
    "solution": "function flowLock(daten) {\n  const stream=new ReadableStream({start(c){c.close();}});const vorher=stream.locked;const reader=stream.getReader();const waehrend=stream.locked;reader.releaseLock();return {vorher,waehrend,nachher:stream.locked};\n}",
    "example": "function flowLock(daten) {\n  const stream=new ReadableStream({start(c){c.close();}});const vorher=stream.locked;const reader=stream.getReader();const waehrend=stream.locked;reader.releaseLock();return {vorher,waehrend,nachher:stream.locked};\n}\n\nconsole.log(flowLock(null));",
    "preserveInput": true,
    "hints": [
      "Ein neu erzeugter Stream ist zunächst nicht gesperrt."
    ],
    "explanation": "Ein Stream mit aktivem Reader ist gesperrt; releaseLock gibt ihn für einen anderen Reader frei. Der Stream ist geschlossen und hat keine ausstehenden read-Aufrufe, bevor die Sperre freigegeben wird."
  },
  {
    "id": "js-flow-transform",
    "course": "js",
    "category": "Streams & Pipelines",
    "name": "TransformStream",
    "title": "Einen Stream mit einer Pipeline verändern",
    "description": "TransformStream verbindet einen lesbaren und einen schreibbaren Teil mit einer Chunk-Transformation.",
    "syntax": "quelle.pipeThrough(transform)",
    "parts": [
      [
        "enqueue",
        "Gibt den transformierten Chunk weiter."
      ]
    ],
    "note": "Die lokale Eingabe sind endliche Zahlen. Die Aufgabe sammelt die fertige Ausgabe; echte große Daten können direkt weiterverarbeitet werden.",
    "detail": "Verdopple jeden Zahlen-Chunk mit einem TransformStream und gib alle transformierten Werte als Array zurück.",
    "task": "Verdopple jeden Zahlen-Chunk mit einem TransformStream und gib alle transformierten Werte als Array zurück. Verändere die Eingabe nicht.",
    "functionName": "flowTransform",
    "parameter": "daten",
    "tests": [
      {
        "input": [
          1,
          0,
          -2
        ],
        "expected": [
          2,
          0,
          -4
        ]
      },
      {
        "input": [],
        "expected": []
      },
      {
        "input": [
          0.5
        ],
        "expected": [
          1
        ]
      }
    ],
    "starter": "async function flowTransform(daten) {\n  // Deine Lösung\n}",
    "solution": "async function flowTransform(daten) {\n  const source=new ReadableStream({start(c){daten.forEach(n=>c.enqueue(n));c.close();}});\n  const output=source.pipeThrough(new TransformStream({transform(n,c){c.enqueue(n*2);}}));\n  const reader=output.getReader(),out=[];try{while(true){const r=await reader.read();if(r.done)break;out.push(r.value);}}finally{reader.releaseLock();}return out;\n}",
    "example": "async function flowTransform(daten) {\n  const source=new ReadableStream({start(c){daten.forEach(n=>c.enqueue(n));c.close();}});\n  const output=source.pipeThrough(new TransformStream({transform(n,c){c.enqueue(n*2);}}));\n  const reader=output.getReader(),out=[];try{while(true){const r=await reader.read();if(r.done)break;out.push(r.value);}}finally{reader.releaseLock();}return out;\n}\n\nflowTransform([1, 0, -2]).then(console.log);",
    "preserveInput": true,
    "hints": [
      "pipeThrough liefert den lesbaren Ausgabestream.",
      "Die äußere Funktion ist async, damit await beziehungsweise for await verwendet werden kann."
    ],
    "explanation": "TransformStream verbindet einen lesbaren und einen schreibbaren Teil mit einer Chunk-Transformation. Die lokale Eingabe sind endliche Zahlen. Die Aufgabe sammelt die fertige Ausgabe; echte große Daten können direkt weiterverarbeitet werden."
  },
  {
    "id": "js-flow-decoder-stream",
    "course": "js",
    "category": "Streams & Pipelines",
    "name": "TextDecoderStream",
    "title": "UTF-8-Zeichen über Chunkgrenzen dekodieren",
    "description": "TextDecoderStream behält unvollständige UTF-8-Sequenzen über Chunkgrenzen hinweg.",
    "syntax": "bytes.pipeThrough(new TextDecoderStream())",
    "parts": [
      [
        "Chunk",
        "Kann mitten in einem mehrbytekodierten Zeichen enden."
      ]
    ],
    "note": "daten ist ein Array von Bytearrays, die zusammen gültiges UTF-8 ergeben. Vergleiche den gesamten Text, nicht die Anzahl ausgegebener Text-Chunks.",
    "detail": "Erzeuge einen Stream aus den Bytearrays und dekodiere ihn mit TextDecoderStream. Gib den zusammengesetzten Text zurück.",
    "task": "Erzeuge einen Stream aus den Bytearrays und dekodiere ihn mit TextDecoderStream. Gib den zusammengesetzten Text zurück. Verändere die Eingabe nicht.",
    "functionName": "flowDecoderStream",
    "parameter": "daten",
    "tests": [
      {
        "input": [
          [
            65,
            195
          ],
          [
            164,
            240,
            159
          ],
          [
            152,
            128
          ]
        ],
        "expected": "Aä😀"
      },
      {
        "input": [
          [],
          [
            226
          ],
          [
            130
          ],
          [
            172
          ]
        ],
        "expected": "€"
      },
      {
        "input": [],
        "expected": ""
      },
      {
        "input": [
          [
            0
          ]
        ],
        "expected": "\u0000"
      }
    ],
    "starter": "async function flowDecoderStream(daten) {\n  // Deine Lösung\n}",
    "solution": "async function flowDecoderStream(daten) {\n  const source=new ReadableStream({start(c){daten.forEach(chunk=>c.enqueue(Uint8Array.from(chunk)));c.close();}});\n  const reader=source.pipeThrough(new TextDecoderStream(\"utf-8\")).getReader();let text=\"\";try{while(true){const r=await reader.read();if(r.done)break;text+=r.value;}}finally{reader.releaseLock();}return text;\n}",
    "example": "async function flowDecoderStream(daten) {\n  const source=new ReadableStream({start(c){daten.forEach(chunk=>c.enqueue(Uint8Array.from(chunk)));c.close();}});\n  const reader=source.pipeThrough(new TextDecoderStream(\"utf-8\")).getReader();let text=\"\";try{while(true){const r=await reader.read();if(r.done)break;text+=r.value;}}finally{reader.releaseLock();}return text;\n}\n\nflowDecoderStream([[65, 195], [164, 240, 159], [152, 128]]).then(console.log);",
    "preserveInput": true,
    "hints": [
      "Alle Bytearrays als Uint8Array einreihen.",
      "Die äußere Funktion ist async, damit await beziehungsweise for await verwendet werden kann."
    ],
    "explanation": "TextDecoderStream behält unvollständige UTF-8-Sequenzen über Chunkgrenzen hinweg. daten ist ein Array von Bytearrays, die zusammen gültiges UTF-8 ergeben. Vergleiche den gesamten Text, nicht die Anzahl ausgegebener Text-Chunks."
  },
  {
    "id": "js-flow-decoder-flush",
    "course": "js",
    "category": "Streams & Pipelines",
    "name": "decode / stream:true",
    "title": "Einen Streamingdecoder am Ende abschließen",
    "description": "decode mit stream:true behält einen unvollständigen Rest. Der abschließende Aufruf ohne stream:true prüft das Ende.",
    "syntax": "decoder.decode(chunk,{stream:true}); decoder.decode()",
    "parts": [
      [
        "flush",
        "Auch der letzte unvollständige Rest muss behandelt werden."
      ]
    ],
    "note": "daten sind Bytechunks; fatal:true soll ungültige oder am Ende abgeschnittene UTF-8-Sequenzen erkennen.",
    "detail": "Gib {ok:true,text} bei gültigem Gesamttext oder {ok:false,text:null} bei einem Dekodierfehler zurück.",
    "task": "Gib {ok:true,text} bei gültigem Gesamttext oder {ok:false,text:null} bei einem Dekodierfehler zurück. Verändere die Eingabe nicht.",
    "functionName": "flowDecoderFlush",
    "parameter": "daten",
    "tests": [
      {
        "input": [
          [
            195
          ],
          [
            164
          ]
        ],
        "expected": {
          "ok": true,
          "text": "ä"
        }
      },
      {
        "input": [
          [
            195
          ]
        ],
        "expected": {
          "ok": false,
          "text": null
        }
      },
      {
        "input": [
          [
            255
          ]
        ],
        "expected": {
          "ok": false,
          "text": null
        }
      },
      {
        "input": [],
        "expected": {
          "ok": true,
          "text": ""
        }
      }
    ],
    "starter": "function flowDecoderFlush(daten) {\n  // Deine Lösung\n}",
    "solution": "function flowDecoderFlush(daten) {\n  const decoder=new TextDecoder(\"utf-8\",{fatal:true});let text=\"\";try{for(const chunk of daten)text+=decoder.decode(Uint8Array.from(chunk),{stream:true});text+=decoder.decode();return {ok:true,text};}catch{return {ok:false,text:null};}\n}",
    "example": "function flowDecoderFlush(daten) {\n  const decoder=new TextDecoder(\"utf-8\",{fatal:true});let text=\"\";try{for(const chunk of daten)text+=decoder.decode(Uint8Array.from(chunk),{stream:true});text+=decoder.decode();return {ok:true,text};}catch{return {ok:false,text:null};}\n}\n\nconsole.log(flowDecoderFlush([[195], [164]]));",
    "preserveInput": true,
    "hints": [
      "Der abschließende decode-Aufruf darf nicht fehlen."
    ],
    "explanation": "decode mit stream:true behält einen unvollständigen Rest. Der abschließende Aufruf ohne stream:true prüft das Ende. daten sind Bytechunks; fatal:true soll ungültige oder am Ende abgeschnittene UTF-8-Sequenzen erkennen."
  },
  {
    "id": "js-flow-json-lines",
    "course": "js",
    "category": "Streams & Pipelines",
    "name": "JSON Lines",
    "title": "Zeilenweise JSON-Daten mit Fehlerposition lesen",
    "description": "Bei JSON Lines enthält jede nichtleere Zeile einen eigenen JSON-Wert.",
    "syntax": "JSON.parse(zeile)",
    "parts": [
      [
        "Zeilenindex",
        "Hier zählt die ursprüngliche Textzeile ab 1."
      ]
    ],
    "note": "daten ist ein vollständiger Text mit LF oder CRLF; leere Zeilen werden übersprungen. Die Aufgabe bricht beim ersten kaputten JSON-Wert ab.",
    "detail": "Gib {ok:true,werte} oder {ok:false,zeile} für die erste ungültige nichtleere Zeile zurück.",
    "task": "Gib {ok:true,werte} oder {ok:false,zeile} für die erste ungültige nichtleere Zeile zurück. Verändere die Eingabe nicht.",
    "functionName": "flowJsonLines",
    "parameter": "daten",
    "tests": [
      {
        "input": "0\nfalse\n{\"x\":1}",
        "expected": {
          "ok": true,
          "werte": [
            0,
            false,
            {
              "x": 1
            }
          ]
        }
      },
      {
        "input": "\n  \nkaputt",
        "expected": {
          "ok": false,
          "zeile": 3
        }
      },
      {
        "input": "",
        "expected": {
          "ok": true,
          "werte": []
        }
      },
      {
        "input": "1\r\n2",
        "expected": {
          "ok": true,
          "werte": [
            1,
            2
          ]
        }
      }
    ],
    "starter": "function flowJsonLines(daten) {\n  // Deine Lösung\n}",
    "solution": "function flowJsonLines(daten) {\n  const lines=daten.split(/\\r?\\n/),werte=[];for(let i=0;i<lines.length;i++){if(!lines[i].trim())continue;try{werte.push(JSON.parse(lines[i]));}catch{return {ok:false,zeile:i+1};}}return {ok:true,werte};\n}",
    "example": "function flowJsonLines(daten) {\n  const lines=daten.split(/\\r?\\n/),werte=[];for(let i=0;i<lines.length;i++){if(!lines[i].trim())continue;try{werte.push(JSON.parse(lines[i]));}catch{return {ok:false,zeile:i+1};}}return {ok:true,werte};\n}\n\nconsole.log(flowJsonLines(\"0\\nfalse\\n{\\\"x\\\":1}\"));",
    "preserveInput": true,
    "hints": [
      "Leere Zeilen überspringen, aber den ursprünglichen Index beibehalten."
    ],
    "explanation": "Bei JSON Lines enthält jede nichtleere Zeile einen eigenen JSON-Wert. daten ist ein vollständiger Text mit LF oder CRLF; leere Zeilen werden übersprungen. Die Aufgabe bricht beim ersten kaputten JSON-Wert ab."
  },
  {
    "id": "js-flow-batches",
    "course": "js",
    "category": "Parallele Arbeit",
    "name": "Promise.all / Batches",
    "title": "Parallelität mit kleinen Gruppen begrenzen",
    "description": "Kleine Gruppen begrenzen, wie viele Jobs gleichzeitig gestartet werden. Innerhalb jeder Gruppe wartet Promise.all auf alle Ergebnisse.",
    "syntax": "await Promise.all(gruppe.map(job))",
    "parts": [
      [
        "Limit",
        "Maximale Gruppengröße; keine neue Gruppe vor Abschluss der alten."
      ]
    ],
    "note": "daten hat {werte:number[],limit:1..4}. Lokale Jobs liefern n*2 über Promise.resolve. Dies ist ein Batch-Modell; ein gleitender Pool könnte freie Plätze früher nutzen.",
    "detail": "Verarbeite werte gruppenweise mit höchstens limit Jobs pro Gruppe. Gib ein Array der Ergebnisgruppen zurück; keine leere letzte Gruppe.",
    "task": "Verarbeite werte gruppenweise mit höchstens limit Jobs pro Gruppe. Gib ein Array der Ergebnisgruppen zurück; keine leere letzte Gruppe. Verändere die Eingabe nicht.",
    "functionName": "flowBatches",
    "parameter": "daten",
    "tests": [
      {
        "input": {
          "werte": [
            1,
            2,
            3,
            4,
            5
          ],
          "limit": 2
        },
        "expected": [
          [
            2,
            4
          ],
          [
            6,
            8
          ],
          [
            10
          ]
        ]
      },
      {
        "input": {
          "werte": [],
          "limit": 3
        },
        "expected": []
      },
      {
        "input": {
          "werte": [
            0,
            -1
          ],
          "limit": 1
        },
        "expected": [
          [
            0
          ],
          [
            -2
          ]
        ]
      },
      {
        "input": {
          "werte": [
            3
          ],
          "limit": 4
        },
        "expected": [
          [
            6
          ]
        ]
      }
    ],
    "starter": "async function flowBatches(daten) {\n  // Deine Lösung\n}",
    "solution": "async function flowBatches(daten) {\n  const out=[];for(let i=0;i<daten.werte.length;i+=daten.limit){out.push(await Promise.all(daten.werte.slice(i,i+daten.limit).map(n=>Promise.resolve(n*2))));}return out;\n}",
    "example": "async function flowBatches(daten) {\n  const out=[];for(let i=0;i<daten.werte.length;i+=daten.limit){out.push(await Promise.all(daten.werte.slice(i,i+daten.limit).map(n=>Promise.resolve(n*2))));}return out;\n}\n\nflowBatches({\"werte\": [1, 2, 3, 4, 5], \"limit\": 2}).then(console.log);",
    "preserveInput": true,
    "hints": [
      "Den Index pro Gruppe um limit erhöhen.",
      "Die äußere Funktion ist async, damit await beziehungsweise for await verwendet werden kann."
    ],
    "explanation": "Kleine Gruppen begrenzen, wie viele Jobs gleichzeitig gestartet werden. Innerhalb jeder Gruppe wartet Promise.all auf alle Ergebnisse. daten hat {werte:number[],limit:1..4}. Lokale Jobs liefern n*2 über Promise.resolve. Dies ist ein Batch-Modell; ein gleitender Pool könnte freie Plätze früher nutzen."
  },
  {
    "id": "js-flow-settled",
    "course": "js",
    "category": "Parallele Arbeit",
    "name": "allSettled / Ergebnisbericht",
    "title": "Parallele Jobs mit gemischten Ergebnissen auswerten",
    "description": "allSettled sammelt Erfolg und Ablehnung jeder Aufgabe in Eingabereihenfolge.",
    "syntax": "await Promise.allSettled(jobs)",
    "parts": [
      [
        "status",
        "fulfilled oder rejected."
      ]
    ],
    "note": "daten ist ein Array von {ok:boolean,wert:JSON-Wert}. Lokale Promises werden mit wert erfüllt beziehungsweise abgelehnt, ohne Netz oder Wartezeit.",
    "detail": "Gib pro Job {ok,wert} zurück; auch Ablehnungsgründe und falsche Werte sollen erhalten bleiben.",
    "task": "Gib pro Job {ok,wert} zurück; auch Ablehnungsgründe und falsche Werte sollen erhalten bleiben. Verändere die Eingabe nicht.",
    "functionName": "flowSettled",
    "parameter": "daten",
    "tests": [
      {
        "input": [
          {
            "ok": true,
            "wert": 0
          },
          {
            "ok": false,
            "wert": "fehler"
          }
        ],
        "expected": [
          {
            "ok": true,
            "wert": 0
          },
          {
            "ok": false,
            "wert": "fehler"
          }
        ]
      },
      {
        "input": [],
        "expected": []
      },
      {
        "input": [
          {
            "ok": false,
            "wert": false
          }
        ],
        "expected": [
          {
            "ok": false,
            "wert": false
          }
        ]
      }
    ],
    "starter": "async function flowSettled(daten) {\n  // Deine Lösung\n}",
    "solution": "async function flowSettled(daten) {\n  const results=await Promise.allSettled(daten.map(job=>job.ok?Promise.resolve(job.wert):Promise.reject(job.wert)));\n  return results.map(r=>({ok:r.status===\"fulfilled\",wert:r.status===\"fulfilled\"?r.value:r.reason}));\n}",
    "example": "async function flowSettled(daten) {\n  const results=await Promise.allSettled(daten.map(job=>job.ok?Promise.resolve(job.wert):Promise.reject(job.wert)));\n  return results.map(r=>({ok:r.status===\"fulfilled\",wert:r.status===\"fulfilled\"?r.value:r.reason}));\n}\n\nflowSettled([{\"ok\": true, \"wert\": 0}, {\"ok\": false, \"wert\": \"fehler\"}]).then(console.log);",
    "preserveInput": true,
    "hints": [
      "Nicht fulfilled und rejected Werte über || zusammenfassen.",
      "Die äußere Funktion ist async, damit await beziehungsweise for await verwendet werden kann."
    ],
    "explanation": "allSettled sammelt Erfolg und Ablehnung jeder Aufgabe in Eingabereihenfolge. daten ist ein Array von {ok:boolean,wert:JSON-Wert}. Lokale Promises werden mit wert erfüllt beziehungsweise abgelehnt, ohne Netz oder Wartezeit."
  },
  {
    "id": "js-flow-transfer",
    "course": "js",
    "category": "Worker & Nachrichten",
    "name": "structuredClone / transfer",
    "title": "Einen Buffer übertragen statt weiter teilen",
    "description": "Beim Transfer eines ArrayBuffer wird der Ausgangsbuffer abgetrennt und auf Empfängerseite nutzbar.",
    "syntax": "structuredClone(buffer,{transfer:[buffer]})",
    "parts": [
      [
        "transfer",
        "Überträgt Besitz des Puffers."
      ],
      [
        "byteLength",
        "Der Ausgangsbuffer hat danach Länge 0."
      ]
    ],
    "note": "Die Eingabe wird erst in einen frischen Uint8Array kopiert. Dies zeigt native Transfer-Semantik ohne zweiten Worker; die JSON-Eingabe bleibt unverändert.",
    "detail": "Übertrage einen frischen Buffer mit den Bytes aus daten. Gib {vorher,nachher,bytes} mit den Längen des Ausgangsbuffers und den empfangenen Bytewerten zurück.",
    "task": "Übertrage einen frischen Buffer mit den Bytes aus daten. Gib {vorher,nachher,bytes} mit den Längen des Ausgangsbuffers und den empfangenen Bytewerten zurück. Verändere die Eingabe nicht.",
    "functionName": "flowTransfer",
    "parameter": "daten",
    "tests": [
      {
        "input": [
          1,
          2,
          255
        ],
        "expected": {
          "vorher": 3,
          "nachher": 0,
          "bytes": [
            1,
            2,
            255
          ]
        }
      },
      {
        "input": [],
        "expected": {
          "vorher": 0,
          "nachher": 0,
          "bytes": []
        }
      },
      {
        "input": [
          0
        ],
        "expected": {
          "vorher": 1,
          "nachher": 0,
          "bytes": [
            0
          ]
        }
      }
    ],
    "starter": "function flowTransfer(daten) {\n  // Deine Lösung\n}",
    "solution": "function flowTransfer(daten) {\n  const buffer=Uint8Array.from(daten).buffer;const vorher=buffer.byteLength;const received=structuredClone(buffer,{transfer:[buffer]});return {vorher,nachher:buffer.byteLength,bytes:Array.from(new Uint8Array(received))};\n}",
    "example": "function flowTransfer(daten) {\n  const buffer=Uint8Array.from(daten).buffer;const vorher=buffer.byteLength;const received=structuredClone(buffer,{transfer:[buffer]});return {vorher,nachher:buffer.byteLength,bytes:Array.from(new Uint8Array(received))};\n}\n\nconsole.log(flowTransfer([1, 2, 255]));",
    "preserveInput": true,
    "hints": [
      "Die Transferliste muss denselben Buffer enthalten, den du klonst."
    ],
    "explanation": "Beim Transfer eines ArrayBuffer wird der Ausgangsbuffer abgetrennt und auf Empfängerseite nutzbar. Die Eingabe wird erst in einen frischen Uint8Array kopiert. Dies zeigt native Transfer-Semantik ohne zweiten Worker; die JSON-Eingabe bleibt unverändert."
  },
  {
    "id": "js-flow-message",
    "course": "js",
    "category": "Worker & Nachrichten",
    "name": "Nachrichtenprotokoll",
    "title": "Worker-Ergebnisse vor Übernahme prüfen",
    "description": "Eine Nachricht braucht einen bekannten Typ, eine passende Jobkennung und gültige Ergebnisdaten.",
    "syntax": "message.type === \"done\" && message.id === activeId",
    "parts": [
      [
        "Jobkennung",
        "Veraltete Antworten dürfen den aktuellen Stand nicht überschreiben."
      ]
    ],
    "note": "daten ist {aktiv:number,nachricht:JSON-Wert}. Nur type done, genau passende id und ein endlicher Number-Wert werden akzeptiert.",
    "detail": "Gib den Zahlenwert aus nachricht.wert zurück oder null, wenn die Nachricht ungültig oder veraltet ist.",
    "task": "Gib den Zahlenwert aus nachricht.wert zurück oder null, wenn die Nachricht ungültig oder veraltet ist. Verändere die Eingabe nicht.",
    "functionName": "flowMessage",
    "parameter": "daten",
    "tests": [
      {
        "input": {
          "aktiv": 1,
          "nachricht": {
            "type": "done",
            "id": 1,
            "wert": 0
          }
        },
        "expected": 0
      },
      {
        "input": {
          "aktiv": 2,
          "nachricht": {
            "type": "done",
            "id": 1,
            "wert": 9
          }
        },
        "expected": null
      },
      {
        "input": {
          "aktiv": 1,
          "nachricht": null
        },
        "expected": null
      },
      {
        "input": {
          "aktiv": 1,
          "nachricht": {
            "type": "done",
            "id": 1,
            "wert": "9"
          }
        },
        "expected": null
      },
      {
        "input": {
          "aktiv": 1,
          "nachricht": {
            "type": "progress",
            "id": 1,
            "wert": 9
          }
        },
        "expected": null
      }
    ],
    "starter": "function flowMessage(daten) {\n  // Deine Lösung\n}",
    "solution": "function flowMessage(daten) {\n  const m=daten.nachricht;return m!==null&&typeof m===\"object\"&&m.type===\"done\"&&m.id===daten.aktiv&&typeof m.wert===\"number\"&&Number.isFinite(m.wert)?m.wert:null;\n}",
    "example": "function flowMessage(daten) {\n  const m=daten.nachricht;return m!==null&&typeof m===\"object\"&&m.type===\"done\"&&m.id===daten.aktiv&&typeof m.wert===\"number\"&&Number.isFinite(m.wert)?m.wert:null;\n}\n\nconsole.log(flowMessage({\"aktiv\": 1, \"nachricht\": {\"type\": \"done\", \"id\": 1, \"wert\": 0}}));",
    "preserveInput": true,
    "hints": [
      "Den Werttyp explizit prüfen; 0 ist ein gültiges Ergebnis."
    ],
    "explanation": "Eine Nachricht braucht einen bekannten Typ, eine passende Jobkennung und gültige Ergebnisdaten. daten ist {aktiv:number,nachricht:JSON-Wert}. Nur type done, genau passende id und ein endlicher Number-Wert werden akzeptiert."
  },
  {
    "id": "js-flow-clone-error",
    "course": "js",
    "category": "Worker & Nachrichten",
    "name": "DataCloneError",
    "title": "Nicht jede Nutzlast ist klonbar",
    "description": "Funktionen können nicht mit structuredClone kopiert und nicht als normale Worker-Nutzlast versendet werden.",
    "syntax": "structuredClone(payload)",
    "parts": [
      [
        "JSON-Werte",
        "Sind in diesem Modell kopierbar."
      ],
      [
        "Funktion",
        "Ist hier ausdrücklich nicht kopierbar."
      ]
    ],
    "note": "daten ist {mitFunktion:boolean,wert:JSON-Wert}. Die Funktion wird nur im frischen lokalen Payload erzeugt.",
    "detail": "Erzeuge {wert:daten.wert} und ergänze bei mitFunktion eine Funktion callback. Versuche structuredClone und gib {ok:true,wert} oder {ok:false,fehler:error.name} zurück.",
    "task": "Erzeuge {wert:daten.wert} und ergänze bei mitFunktion eine Funktion callback. Versuche structuredClone und gib {ok:true,wert} oder {ok:false,fehler:error.name} zurück. Verändere die Eingabe nicht.",
    "functionName": "flowCloneError",
    "parameter": "daten",
    "tests": [
      {
        "input": {
          "mitFunktion": false,
          "wert": 0
        },
        "expected": {
          "ok": true,
          "wert": 0
        }
      },
      {
        "input": {
          "mitFunktion": true,
          "wert": "x"
        },
        "expected": {
          "ok": false,
          "fehler": "DataCloneError"
        }
      },
      {
        "input": {
          "mitFunktion": false,
          "wert": null
        },
        "expected": {
          "ok": true,
          "wert": null
        }
      }
    ],
    "starter": "function flowCloneError(daten) {\n  // Deine Lösung\n}",
    "solution": "function flowCloneError(daten) {\n  const payload={wert:daten.wert};if(daten.mitFunktion)payload.callback=()=>{};try{const copy=structuredClone(payload);return {ok:true,wert:copy.wert};}catch(error){return {ok:false,fehler:error.name};}\n}",
    "example": "function flowCloneError(daten) {\n  const payload={wert:daten.wert};if(daten.mitFunktion)payload.callback=()=>{};try{const copy=structuredClone(payload);return {ok:true,wert:copy.wert};}catch(error){return {ok:false,fehler:error.name};}\n}\n\nconsole.log(flowCloneError({\"mitFunktion\": false, \"wert\": 0}));",
    "preserveInput": true,
    "hints": [
      "Die Kopierbarkeit durch den tatsächlichen Clone-Aufruf prüfen."
    ],
    "explanation": "Funktionen können nicht mit structuredClone kopiert und nicht als normale Worker-Nutzlast versendet werden. daten ist {mitFunktion:boolean,wert:JSON-Wert}. Die Funktion wird nur im frischen lokalen Payload erzeugt."
  },
  {
    "id": "js-flow-round-robin",
    "course": "js",
    "category": "Parallele Arbeit",
    "name": "Round Robin",
    "title": "Rechenzeit in kleine Zeitscheiben verteilen",
    "description": "Round Robin lässt aktive Aufgaben reihum für eine Zeitscheibe laufen.",
    "syntax": "Queue: A → B → C → A ...",
    "parts": [
      [
        "Restzeit",
        "Nach einem Tick um 1 vermindern."
      ]
    ],
    "note": "daten ist ein Array ganzer Laufzeiten von 0 bis 4 für höchstens 4 Aufgaben. Alle kommen zum Start an; jeder Tick braucht eine Zeiteinheit ohne Umschaltkosten. Dies ist ein Modell, kein echter Thread-Scheduler.",
    "detail": "Gib die Aufgabenindizes pro Tick zurück. Leere Aufgaben mit Laufzeit 0 auslassen; unerledigte Aufgaben hinten wieder einreihen.",
    "task": "Gib die Aufgabenindizes pro Tick zurück. Leere Aufgaben mit Laufzeit 0 auslassen; unerledigte Aufgaben hinten wieder einreihen. Verändere die Eingabe nicht.",
    "functionName": "flowRoundRobin",
    "parameter": "daten",
    "tests": [
      {
        "input": [
          3,
          1,
          2
        ],
        "expected": [
          0,
          1,
          2,
          0,
          2,
          0
        ]
      },
      {
        "input": [
          0,
          2
        ],
        "expected": [
          1,
          1
        ]
      },
      {
        "input": [],
        "expected": []
      },
      {
        "input": [
          1,
          1
        ],
        "expected": [
          0,
          1
        ]
      }
    ],
    "starter": "function flowRoundRobin(daten) {\n  // Deine Lösung\n}",
    "solution": "function flowRoundRobin(daten) {\n  const queue=daten.map((rest,index)=>({rest,index})).filter(job=>job.rest>0),out=[];while(queue.length){const job=queue.shift();out.push(job.index);job.rest--;if(job.rest>0)queue.push(job);}return out;\n}",
    "example": "function flowRoundRobin(daten) {\n  const queue=daten.map((rest,index)=>({rest,index})).filter(job=>job.rest>0),out=[];while(queue.length){const job=queue.shift();out.push(job.index);job.rest--;if(job.rest>0)queue.push(job);}return out;\n}\n\nconsole.log(flowRoundRobin([3, 1, 2]));",
    "preserveInput": true,
    "hints": [
      "Eine lokale Kopie der Restzeiten anlegen."
    ],
    "explanation": "Round Robin lässt aktive Aufgaben reihum für eine Zeitscheibe laufen. daten ist ein Array ganzer Laufzeiten von 0 bis 4 für höchstens 4 Aufgaben. Alle kommen zum Start an; jeder Tick braucht eine Zeiteinheit ohne Umschaltkosten. Dies ist ein Modell, kein echter Thread-Scheduler."
  },
  {
    "id": "js-flow-header",
    "course": "js",
    "category": "Dateiformate praktisch",
    "name": "Signaturbytes",
    "title": "Den Anfang eines Dateiformats prüfen",
    "description": "Einige Formate beginnen mit festgelegten Signaturbytes. Eine Endung allein beweist das Format nicht.",
    "syntax": "PNG: 89 50 4E 47 0D 0A 1A 0A",
    "parts": [
      [
        "Signatur",
        "Nur ein erster Format-Hinweis."
      ]
    ],
    "note": "Die Aufgabe erkennt nur diese acht PNG-Startbytes und validiert nicht den gesamten Dateiinhalt.",
    "detail": "Gib true zurück, wenn daten mit der vollständigen acht Byte langen PNG-Signatur beginnt.",
    "task": "Gib true zurück, wenn daten mit der vollständigen acht Byte langen PNG-Signatur beginnt. Verändere die Eingabe nicht.",
    "functionName": "flowHeader",
    "parameter": "daten",
    "tests": [
      {
        "input": [
          137,
          80,
          78,
          71,
          13,
          10,
          26,
          10
        ],
        "expected": true
      },
      {
        "input": [
          137,
          80,
          78,
          71
        ],
        "expected": false
      },
      {
        "input": [
          137,
          80,
          78,
          71,
          13,
          10,
          26,
          0
        ],
        "expected": false
      },
      {
        "input": [],
        "expected": false
      }
    ],
    "starter": "function flowHeader(daten) {\n  // Deine Lösung\n}",
    "solution": "function flowHeader(daten) {\n  const signature=[137,80,78,71,13,10,26,10];return daten.length>=signature.length&&signature.every((byte,i)=>daten[i]===byte);\n}",
    "example": "function flowHeader(daten) {\n  const signature=[137,80,78,71,13,10,26,10];return daten.length>=signature.length&&signature.every((byte,i)=>daten[i]===byte);\n}\n\nconsole.log(flowHeader([137, 80, 78, 71, 13, 10, 26, 10]));",
    "preserveInput": true,
    "hints": [
      "Ein passender Anfang von nur vier Bytes genügt nicht."
    ],
    "explanation": "Einige Formate beginnen mit festgelegten Signaturbytes. Eine Endung allein beweist das Format nicht. Die Aufgabe erkennt nur diese acht PNG-Startbytes und validiert nicht den gesamten Dateiinhalt."
  },
  {
    "id": "js-flow-histogram",
    "course": "js",
    "category": "Dateiformate praktisch",
    "name": "Byte-Häufigkeiten",
    "title": "Bytewerte mit einem Histogramm zählen",
    "description": "Ein Histogramm zählt, wie oft jeder Bytewert vorkommt. Eine Zählstruktur kann 256 feste Plätze verwenden.",
    "syntax": "counts[byte] += 1",
    "parts": [
      [
        "Index",
        "Der Bytewert ist direkt ein gültiger Index 0–255."
      ]
    ],
    "note": "Die Eingabe enthält höchstens 64 Bytewerte. Histogramme bewahren keine ursprüngliche Reihenfolge und sind keine Kompressions- oder Formatgarantie.",
    "detail": "Gib alle vorkommenden Bytewerte als {byte,anzahl} zurück, aufsteigend nach byte sortiert.",
    "task": "Gib alle vorkommenden Bytewerte als {byte,anzahl} zurück, aufsteigend nach byte sortiert. Verändere die Eingabe nicht.",
    "functionName": "flowHistogram",
    "parameter": "daten",
    "tests": [
      {
        "input": [
          255,
          0,
          255,
          1
        ],
        "expected": [
          {
            "byte": 0,
            "anzahl": 1
          },
          {
            "byte": 1,
            "anzahl": 1
          },
          {
            "byte": 255,
            "anzahl": 2
          }
        ]
      },
      {
        "input": [],
        "expected": []
      },
      {
        "input": [
          0,
          0
        ],
        "expected": [
          {
            "byte": 0,
            "anzahl": 2
          }
        ]
      }
    ],
    "starter": "function flowHistogram(daten) {\n  // Deine Lösung\n}",
    "solution": "function flowHistogram(daten) {\n  const counts=new Uint32Array(256);for(const byte of daten)counts[byte]++;return Array.from(counts,(anzahl,byte)=>({byte,anzahl})).filter(row=>row.anzahl>0);\n}",
    "example": "function flowHistogram(daten) {\n  const counts=new Uint32Array(256);for(const byte of daten)counts[byte]++;return Array.from(counts,(anzahl,byte)=>({byte,anzahl})).filter(row=>row.anzahl>0);\n}\n\nconsole.log(flowHistogram([255, 0, 255, 1]));",
    "preserveInput": true,
    "hints": [
      "Auch Byte 0 muss gezählt werden."
    ],
    "explanation": "Ein Histogramm zählt, wie oft jeder Bytewert vorkommt. Eine Zählstruktur kann 256 feste Plätze verwenden. Die Eingabe enthält höchstens 64 Bytewerte. Histogramme bewahren keine ursprüngliche Reihenfolge und sind keine Kompressions- oder Formatgarantie."
  },
  {
    "id": "js-flow-decode-runs",
    "course": "js",
    "category": "Dateiformate praktisch",
    "name": "Läufe entpacken",
    "title": "Kodierte Wiederholungen begrenzt entpacken",
    "description": "Eine Laufkodierung kann aus wenig Eingabe sehr viel Ausgabe erzeugen. Vor dem Entpacken brauchst du eine Ausgabegrenze.",
    "syntax": "[wert,anzahl] → anzahl Wiederholungen",
    "parts": [
      [
        "Limit",
        "Hier höchstens 64 ausgegebene Bytes insgesamt."
      ]
    ],
    "note": "daten ist ein Array von Paaren. Werte müssen ganze Bytes 0–255 sein, Anzahlen ganze Zahlen 1–64. Ein ungültiger Lauf oder Gesamtgröße über 64 ergibt null.",
    "detail": "Gib die entpackten Bytes oder null zurück. Prüfe die gesamte Ausgabegröße, bevor du die Wiederholungen erzeugst.",
    "task": "Gib die entpackten Bytes oder null zurück. Prüfe die gesamte Ausgabegröße, bevor du die Wiederholungen erzeugst. Verändere die Eingabe nicht.",
    "functionName": "flowDecodeRuns",
    "parameter": "daten",
    "tests": [
      {
        "input": [
          [
            7,
            3
          ],
          [
            0,
            2
          ]
        ],
        "expected": [
          7,
          7,
          7,
          0,
          0
        ]
      },
      {
        "input": [],
        "expected": []
      },
      {
        "input": [
          [
            7,
            40
          ],
          [
            8,
            40
          ]
        ],
        "expected": null
      },
      {
        "input": [
          [
            0,
            0
          ]
        ],
        "expected": null
      },
      {
        "input": [
          [
            256,
            1
          ]
        ],
        "expected": null
      },
      {
        "input": [
          [
            1,
            1.5
          ]
        ],
        "expected": null
      }
    ],
    "starter": "function flowDecodeRuns(daten) {\n  // Deine Lösung\n}",
    "solution": "function flowDecodeRuns(daten) {\n  let total=0;for(const run of daten){if(!Array.isArray(run)||run.length!==2||!Number.isInteger(run[0])||run[0]<0||run[0]>255||!Number.isInteger(run[1])||run[1]<1||run[1]>64)return null;total+=run[1];if(total>64)return null;}\n  return daten.flatMap(([value,count])=>Array(count).fill(value));\n}",
    "example": "function flowDecodeRuns(daten) {\n  let total=0;for(const run of daten){if(!Array.isArray(run)||run.length!==2||!Number.isInteger(run[0])||run[0]<0||run[0]>255||!Number.isInteger(run[1])||run[1]<1||run[1]>64)return null;total+=run[1];if(total>64)return null;}\n  return daten.flatMap(([value,count])=>Array(count).fill(value));\n}\n\nconsole.log(flowDecodeRuns([[7, 3], [0, 2]]));",
    "preserveInput": true,
    "hints": [
      "Ein Limit pro Lauf ersetzt kein Limit für die Summe."
    ],
    "explanation": "Eine Laufkodierung kann aus wenig Eingabe sehr viel Ausgabe erzeugen. Vor dem Entpacken brauchst du eine Ausgabegrenze. daten ist ein Array von Paaren. Werte müssen ganze Bytes 0–255 sein, Anzahlen ganze Zahlen 1–64. Ein ungültiger Lauf oder Gesamtgröße über 64 ergibt null."
  },
  {
    "id": "js-flow-frames",
    "course": "js",
    "category": "Dateiformate praktisch",
    "name": "Längenpräfix",
    "title": "Byte-Nachrichten auch über Teilstücke lesen",
    "description": "Ein Längenpräfix legt fest, wie viele folgende Bytes zu einer Nachricht gehören. Unvollständige Frames bleiben als Rest.",
    "syntax": "[Laenge, ...Nutzlast]",
    "parts": [
      [
        "Null-Länge",
        "Eine gültige leere Nachricht."
      ]
    ],
    "note": "daten ist ein Array von Byte-Chunks mit insgesamt höchstens 64 Bytes. Ein erstes Byte zählt die unmittelbar folgenden Nutzlastbytes.",
    "detail": "Gib {nachrichten,rest} zurück. Sammle vollständige Nutzlasten und behalte ab dem ersten unvollständigen Längenpräfix alle Restbytes.",
    "task": "Gib {nachrichten,rest} zurück. Sammle vollständige Nutzlasten und behalte ab dem ersten unvollständigen Längenpräfix alle Restbytes. Verändere die Eingabe nicht.",
    "functionName": "flowFrames",
    "parameter": "daten",
    "tests": [
      {
        "input": [
          [
            2,
            65
          ],
          [
            66,
            0,
            3,
            1
          ]
        ],
        "expected": {
          "nachrichten": [
            [
              65,
              66
            ],
            []
          ],
          "rest": [
            3,
            1
          ]
        }
      },
      {
        "input": [],
        "expected": {
          "nachrichten": [],
          "rest": []
        }
      },
      {
        "input": [
          [
            1,
            0
          ]
        ],
        "expected": {
          "nachrichten": [
            [
              0
            ]
          ],
          "rest": []
        }
      },
      {
        "input": [
          [
            2
          ]
        ],
        "expected": {
          "nachrichten": [],
          "rest": [
            2
          ]
        }
      }
    ],
    "starter": "function flowFrames(daten) {\n  // Deine Lösung\n}",
    "solution": "function flowFrames(daten) {\n  const bytes=daten.flat(),nachrichten=[];let offset=0;while(offset<bytes.length){const length=bytes[offset];if(offset+1+length>bytes.length)break;nachrichten.push(bytes.slice(offset+1,offset+1+length));offset+=1+length;}return {nachrichten,rest:bytes.slice(offset)};\n}",
    "example": "function flowFrames(daten) {\n  const bytes=daten.flat(),nachrichten=[];let offset=0;while(offset<bytes.length){const length=bytes[offset];if(offset+1+length>bytes.length)break;nachrichten.push(bytes.slice(offset+1,offset+1+length));offset+=1+length;}return {nachrichten,rest:bytes.slice(offset)};\n}\n\nconsole.log(flowFrames([[2, 65], [66, 0, 3, 1]]));",
    "preserveInput": true,
    "hints": [
      "Ein Präfix mit 0 liefert eine leere Nachricht und verbraucht trotzdem ein Byte."
    ],
    "explanation": "Ein Längenpräfix legt fest, wie viele folgende Bytes zu einer Nachricht gehören. Unvollständige Frames bleiben als Rest. daten ist ein Array von Byte-Chunks mit insgesamt höchstens 64 Bytes. Ein erstes Byte zählt die unmittelbar folgenden Nutzlastbytes."
  }
];
