export function decodeBytes(raw){
 const tokens=raw.trim().split(/\s+/);
 if(!raw.trim()||tokens.length>4||tokens.some(token=>! /^[0-9a-f]{2}$/i.test(token)))return {error:'Gib ein bis vier Bytes mit je zwei Hexstellen ein, getrennt durch Leerzeichen. Beispiel: 01 02.'};
 const bytes=tokens.map(token=>parseInt(token,16)),decode=values=>values.reduce((value,byte)=>value*256+byte,0);
 const big=decode(bytes),little=decode([...bytes].reverse()),width=bytes.length*8,signed=value=>value>=2**(width-1)?value-2**width:value;
 return {bytes,big,little,width,signedBig:signed(big),signedLittle:signed(little),ascii:bytes.map(byte=>byte>=32&&byte<=126?String.fromCharCode(byte):'·').join(''),
  bigSteps:bytes.map((byte,i)=>`${byte} × ${256**(bytes.length-1-i)}`).join(' + '),littleSteps:[...bytes].reverse().map((byte,i)=>`${byte} × ${256**(bytes.length-1-i)}`).join(' + ')};
}
function parseIPv4(raw){
 const octets=raw.trim().split('.');if(octets.length!==4||octets.some(part=>! /^(0|[1-9]\d{0,2})$/.test(part)||Number(part)>255))return null;
 return octets.reduce((value,part)=>value*256+Number(part),0);
}
const formatIPv4=value=>[24,16,8,0].map(bits=>Math.floor(value/(2**bits))%256).join('.');
export function comparePrefix(source,target,prefix){
 const first=parseIPv4(source),second=parseIPv4(target),bits=Number(prefix);
 if(first===null||second===null||String(prefix).trim()===''||!Number.isInteger(bits)||bits<0||bits>32)return {error:'Verwende zwei IPv4-Adressen mit vier Zahlen von 0 bis 255 und eine Präfixlänge von 0 bis 32. Keine führenden Nullen.'};
 const count=2**(32-bits),start=Math.floor(first/count)*count;
 return {start:formatIPv4(start),end:formatIPv4(start+count-1),count,same:Math.floor(second/count)*count===start};
}
export function estimateCloud(instances,hours,rate,connections){
 const raw=[instances,hours,rate,connections],values=raw.map(Number),[count,duration,price,pool]=values;
 if(raw.some(value=>String(value).trim()==='')||values.some(value=>!Number.isFinite(value))||!Number.isInteger(count)||count<1||count>1000||duration<0||duration>744||price<0||price>1000||!Number.isInteger(pool)||pool<0||pool>10000)return {error:'Gib 1–1.000 ganze Instanzen, 0–744 Stunden, 0–1.000 €/h und 0–10.000 ganze Poolverbindungen pro Instanz ein.'};
 return {cost:count*duration*price,pool:count*pool};
}
export function checkPermission(identity,action,visibility){
 if(!['guest','owner','other','admin'].includes(identity)||!['read','change'].includes(action)||!['private','public'].includes(visibility))return {error:'Die Auswahl passt nicht zum vorgegebenen Rechtemodell.'};
 const privileged=identity==='owner'||identity==='admin',allowed=privileged||(action==='read'&&visibility==='public');
 return {allowed,reason:privileged?'Besitzer und Administrator dürfen im vorgegebenen Modell lesen und ändern.':allowed?'Öffentliche Dokumente dürfen im Modell von allen gelesen, aber nicht von allen geändert werden.':'Für diese Aktion fehlen im Modell die nötigen Rechte. Auch ein anderer angemeldeter Benutzer erhält keinen automatischen Zugriff.'};
}
