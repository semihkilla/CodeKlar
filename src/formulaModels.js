import { variable as v, number as n, unit as u, operator as o, row as r, fraction as f, power as p, root } from './scienceMath.js';
const quantity=(name,symbol,unit,value)=>({name,symbol,unit,value});
const q=quantity;
const eq=(a,b)=>r(a,o('='),b),mul=(a,b)=>r(a,o('·'),b);
const model=(id,course,name,type,quantities,note,lessonIds=[id])=>({id,course,name,type,quantities,note,lessonIds});
export const formulaModels=[
 model('physics-speed','physics','Geschwindigkeit, Strecke und Zeit','ratio',[q('Geschwindigkeit','v','m/s',5),q('Strecke','s','m',100),q('Zeit','t','s',20)],'Weg pro Zeit: mittlere Weggeschwindigkeit. Eine positive Dauer ist erforderlich.'),
 model('physics-acceleration','physics','Beschleunigung und Änderungen','ratio',[q('Beschleunigungsbetrag','a','m/s²',2),q('Geschwindigkeitsänderungsbetrag','Δv','m/s',10),q('Zeitintervall','Δt','s',5)],'Hier werden nichtnegative Beträge einer eindimensionalen Änderung verwendet; keine Richtungsrechnung.'),
 model('physics-force','physics','Kraft, Masse und Beschleunigung','product',[q('Kraftbetrag','F','N',6),q('Masse','m','kg',2),q('Beschleunigungsbetrag','a','m/s²',3)],'Klassisches Modell der resultierenden Kraft; hier nur Beträge.'),
 model('physics-work','physics','Arbeit, Kraft und Weg','product',[q('Arbeit','W','J',20),q('Kraftbetrag','F','N',10),q('Weg','s','m',2)],'Konstante Kraft in Bewegungsrichtung.'),
 model('physics-power','physics','Leistung, Energie und Zeit','ratio',[q('Mittlere Leistung','P','W',20),q('Energie','E','J',100),q('Dauer','t','s',5)],'Mittlere Leistung im betrachteten Zeitraum; Dauer positiv.'),
 model('physics-density','physics','Dichte, Masse und Volumen','ratio',[q('Dichte','ρ','kg/m³',2000),q('Masse','m','kg',2),q('Volumen','V','m³',0.001)],'Mittlere Dichte des Körpers; Volumen positiv.'),
 model('physics-pressure','physics','Druck, Kraft und Fläche','ratio',[q('Druck','p','Pa',10000),q('Senkrechte Kraft','F','N',100),q('Fläche','A','m²',0.01)],'Gleichmäßig verteilter Druck; Fläche positiv.'),
 model('physics-momentum','physics','Impuls, Masse und Geschwindigkeit','product',[q('Impulsbetrag','p','kg·m/s',6),q('Masse','m','kg',2),q('Geschwindigkeitsbetrag','v','m/s',3)],'Klassischer Impuls; hier Beträge statt gerichteter Vektoren.'),
 model('physics-waves','physics','Welle, Wellenlänge und Frequenz','product',[q('Ausbreitungsgeschwindigkeit','v','m/s',6),q('Wellenlänge','λ','m',2),q('Frequenz','f','Hz',3)],'Periodische Welle im betrachteten Medium.'),
 model('physics-spring','physics','Federkraft, Federkonstante und Auslenkung','product',[q('Federkraftbetrag','F','N',2),q('Federkonstante','k','N/m',100),q('Auslenkungsbetrag','x','m',0.02)],'Lineare Feder; die Rückstellkraft wirkt entgegen der Auslenkung.'),
 model('physics-torque','physics','Drehmoment, Kraft und Hebelarm','product',[q('Drehmomentbetrag','M','N·m',2),q('Kraftbetrag','F','N',10),q('Senkrechter Hebelarm','l','m',0.2)],'Der Hebelarm ist senkrecht zur Kraftlinie gemessen.'),
 model('physics-kinetic','physics','Bewegungsenergie, Masse und Geschwindigkeit','square',[q('Bewegungsenergie','E','J',9),q('Masse','m','kg',2),q('Geschwindigkeitsbetrag','v','m/s',3)],'Klassisches Modell. Beim Wurzelziehen wird hier der nichtnegative Geschwindigkeitsbetrag gesucht.'),
 model('physics-accelerated-distance','physics','Beschleunigter Weg, Beschleunigung und Zeit','square',[q('Wegbetrag','s','m',9),q('Beschleunigungsbetrag','a','m/s²',2),q('Dauer','t','s',3)],'Konstante Beschleunigung aus dem Stillstand; keine Richtungswechsel.'),
 model('electrical-ohm','electrical','Ohmsches Gesetz: Strom, Spannung und Widerstand','ratio',[q('Stromstärke','I','A',0.005),q('Spannung','U','V',5),q('Widerstand','R','Ω',1000)],'Idealer ohmscher Gleichstromwiderstand; R positiv.', ['electrical-ohm','electrical-resistance']),
 model('electrical-power','electrical','Elektrische Leistung, Spannung und Strom','product',[q('Leistung','P','W',0.1),q('Spannung','U','V',5),q('Stromstärke','I','A',0.02)],'Konstante Gleichspannung und konstanter Strom; Beträge.'),
 model('electrical-current','electrical','Strom, Ladung und Zeit','ratio',[q('Mittlere Stromstärke','I','A',2),q('Ladungsbetrag','Q','C',10),q('Dauer','t','s',5)],'Mittlerer Ladungsfluss im Zeitraum; Dauer positiv.'),
 model('electrical-voltage','electrical','Spannung, Energie und Ladung','ratio',[q('Spannungsbetrag','U','V',5),q('Energiebetrag','E','J',10),q('Ladungsbetrag','Q','C',2)],'Energie pro übertragener Ladung im betrachteten Modell; hier Beträge.'),
 model('electrical-capacitor','electrical','Kondensator: Ladung, Kapazität und Spannung','product',[q('Ladungsbetrag','Q','C',0.0005),q('Kapazität','C','F',0.0001),q('Spannungsbetrag','U','V',5)],'Konstante ideale Kapazität. C als Einheit heißt Coulomb; C als Formelzeichen hier Kapazität.'),
 model('electrical-energy','electrical','Elektrische Energie, Leistung und Dauer','product',[q('Energie','E','J',21600),q('Leistung','P','W',2),q('Dauer','t','s',10800)],'Konstante Leistung. Hier Sekunden und Joule: 3 h = 10.800 s, 6 Wh = 21.600 J.'),
 model('electrical-rc','electrical','RC-Zeitkonstante, Widerstand und Kapazität','product',[q('Zeitkonstante','τ','s',0.1),q('Widerstand','R','Ω',1000),q('Kapazität','C','F',0.0001)],'Einfaches ideales RC-Netzwerk; keine Entladeprüfung realer Bauteile.'),
 model('electrical-capacitor-energy','electrical','Kondensatorenergie, Kapazität und Spannung','square',[q('Gespeicherte Energie','E','J',0.00125),q('Kapazität','C','F',0.0001),q('Spannungsbetrag','U','V',5)],'Konstante ideale Kapazität; gesucht wird ein nichtnegativer Spannungsbetrag.'),
 model('electrical-inductor-energy','electrical','Spulenenergie, Induktivität und Strom','square',[q('Gespeicherte Energie','E','J',0.2),q('Induktivität','L','H',0.1),q('Strombetrag','I','A',2)],'Konstante lineare Induktivität; gesucht wird ein nichtnegativer Strombetrag.'),
];
const lessonTargets={
 'physics-algebra-numerator':['physics-speed',1], 'physics-algebra-denominator':['physics-speed',2],
 'physics-algebra-factor':['physics-force',1], 'physics-algebra-square':['physics-kinetic',2], 'physics-algebra-units':['physics-speed',2],
 'electrical-algebra-numerator':['electrical-ohm',1], 'electrical-algebra-denominator':['electrical-ohm',2],
 'electrical-algebra-factor':['electrical-power',2], 'electrical-algebra-square':['electrical-capacitor-energy',2], 'electrical-algebra-zero':['electrical-power',2],
};
export function formulaForLesson(id){
 const alias=lessonTargets[id];
 if(alias)return {...formulaModels.find(model=>model.id===alias[0]),initialTarget:alias[1]};
 return formulaModels.find(model=>model.lessonIds.includes(id));
}
export function parseQuantity(raw){
 const text=String(raw).trim().replace(',','.');
 return /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i.test(text)?Number(text):NaN;
}
export const formatQuantity=value=>new Intl.NumberFormat('de-DE',{maximumSignificantDigits:10}).format(value);
export function formulaExpression(model,target=0,values){
 const [z,x,y]=model.quantities.map((q,i)=>values && i!==target?r(n(formatQuantity(values[i])),u(q.unit)):v(q.symbol));
 const rhs=model.type==='ratio'?[f(x,y),mul(z,y),f(x,z)]:model.type==='product'?[mul(x,y),f(z,y),f(z,x)]:[mul(r(f(n(1),n(2)),o('·'),x),p(y,2)),f(mul(n(2),z),p(y,2)),root(f(mul(n(2),z),x))];
 return eq([z,x,y][target],rhs[target]);
}
export function rearrangementSteps(model,target){
 const [z,x,y]=model.quantities.map(q=>v(q.symbol));const label=i=>model.quantities[i].symbol;
 const initial={text:'Ausgangsformel: Jede Änderung muss auf beiden Seiten der Gleichung gelten.',expression:formulaExpression(model)};
 if(target===0)return [initial,{text:`${label(0)} steht bereits allein. Zuerst die Einheiten der gegebenen Werte anpassen.`,expression:formulaExpression(model)}];
 if(model.type==='ratio')return [initial,{text:`Beide Seiten mit ${label(2)} multiplizieren. Das hebt den Bruch auf; ${label(2)} darf in der Ausgangsformel nicht null sein.`,expression:eq(mul(z,y),x)},target===1?{text:`Die Seiten tauschen: ${label(1)} steht allein.`,expression:formulaExpression(model,target)}:{text:`Beide Seiten durch ${label(0)} teilen. Dafür muss ${label(0)} ungleich null sein.`,expression:formulaExpression(model,target)}];
 if(model.type==='product')return [initial,{text:`Beide Seiten durch ${label(target===1?2:1)} teilen; dieser Wert muss ungleich null sein.`,expression:formulaExpression(model,target)}];
 return [initial,{text:'Beide Seiten mit 2 multiplizieren.',expression:eq(mul(n(2),z),mul(x,p(y,2)))},target===1?{text:`Durch ${label(2)}² teilen; ${label(2)} darf nicht null sein.`,expression:formulaExpression(model,target)}:{text:`Durch ${label(1)} teilen und die Quadratwurzel ziehen. Mathematisch sind ± möglich; hier wird der nichtnegative Betrag gewählt.`,expression:formulaExpression(model,target)}];
}
export function solveFormula(model,target,raw){
 const values=raw.map(parseQuantity),known=values.filter((_,i)=>i!==target);
 if(known.some(value=>!Number.isFinite(value)||value<0||value>1e12))return {error:'Gib endliche, nichtnegative Werte bis 10¹² ein. Dezimalkomma ist erlaubt; keine Tausendertrennzeichen.'};
 const [z,x,y]=values;
 const divisor=model.type==='ratio'?(target===0?y:target===2?z:null):model.type==='product'?(target===1?y:target===2?x:null):(target===1?y*y:target===2?x:null);
 if(divisor!==null && divisor<=0)return {error:'Durch null darfst du nicht teilen. Mit diesen Angaben ist die gesuchte Größe nicht eindeutig berechenbar.'};
 if(model.type==='ratio' && target!==2 && y<=0)return {error:'Der Nenner der Ausgangsformel muss positiv sein.'};
 const result=model.type==='ratio'?[()=>x/y,()=>z*y,()=>x/z][target]():model.type==='product'?[()=>x*y,()=>z/y,()=>z/x][target]():[()=>0.5*x*y*y,()=>2*z/(y*y),()=>Math.sqrt(2*z/x)][target]();
 if(!Number.isFinite(result))return {error:'Diese Werte ergeben kein endliches Ergebnis.'};
 if(model.type==='ratio' && target===2 && result<=0)return {error:'Die Umstellung ergibt keinen positiven Nenner. Damit gilt die Ausgangsformel nicht.'};
 return {result,values};
}
export const answerMatches=(answer,result)=>Number.isFinite(answer)&&Math.abs(answer-result)<=Math.max(1e-12,Math.abs(result)*1e-4);
