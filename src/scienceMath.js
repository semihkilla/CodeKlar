// Native MathML expressions: no external scripts, fonts or formula parser required.
export const variable = value => ['mi',value];
export const number = value => ['mn',String(value)];
export const unit = value => ['unit',value];
export const operator = value => ['mo',value];
export const row = (...items) => ['mrow',...items];
export const fraction = (top,bottom) => ['mfrac',top,bottom];
export const power = (base,exponent) => ['msup',base,number(exponent)];
export const index = (base,label) => ['msub',base,['text',label]];
const v=variable,n=number,u=unit,o=operator,r=row,f=fraction,p=power,s=index;
const eq=(left,right)=>r(left,o('='),right);
const mul=(...items)=>r(...items.flatMap((item,i)=>i?[o('·'),item]:[item]));
const val=(value,symbol)=>r(n(value),u(symbol));
const records=(formula,example,legend=[])=>({formula,example,legend});
const e=index(v('E'),'kin'),potential=index(v('E'),'pot');
export const scienceMath = {
 'physics-units':records(eq(v('s'),val(10,'m')),eq(v('t'),val(2,'s')),['s: Strecke','t: Zeit']),
 'physics-prefix':records(eq(val(1,'km'),val('1 000','m')),eq(val(1,'ms'),val('0,001','s'))),
 'physics-speed':records(eq(v('v'),f(v('s'),v('t'))),eq(f(val(100,'m'),val(20,'s')),r(n(5),f(u('m'),u('s')))),['v: durchschnittliche Weggeschwindigkeit','s: Strecke','t: Zeit']),
 'physics-acceleration':records(eq(v('a'),f(r(o('Δ'),v('v')),r(o('Δ'),v('t')))),eq(f(r(val(10,'m/s'),o('−'),val(0,'m/s')),val(5,'s')),r(n(2),f(u('m'),p(u('s'),2)))),['a: Beschleunigung','Δv: Änderung der Geschwindigkeit','Δt: Zeitintervall']),
 'physics-force':records(eq(v('F'),mul(v('m'),v('a'))),eq(mul(val(2,'kg'),r(n(3),f(u('m'),p(u('s'),2)))),val(6,'N')),['F: resultierende Kraft','m: Masse','a: Beschleunigung']),
 'physics-gravity':records(eq(s(v('F'),'G'),mul(v('m'),v('g'))),r(mul(val(1,'kg'),r(n('9,81'),f(u('m'),p(u('s'),2)))),o('≈'),val('9,81','N')),['F mit Index G: Gewichtskraft','g: Fallbeschleunigung']),
 'physics-work':records(eq(v('W'),mul(v('F'),v('s'))),eq(mul(val(10,'N'),val(2,'m')),val(20,'J')),['W: Arbeit','F: konstante Kraft entlang des Weges','s: Weg']),
 'physics-kinetic':records(eq(e,mul(f(n(1),n(2)),v('m'),p(v('v'),2))),eq(mul(f(n(1),n(2)),val(2,'kg'),p(r(o('('),val(3,'m/s'),o(')')),2)),val(9,'J')),['E mit Index kin: kinetische Energie','m: Masse','v: Geschwindigkeit']),
 'physics-potential':records(eq(r(o('Δ'),potential),mul(v('m'),v('g'),r(o('Δ'),v('h')))),r(mul(val(1,'kg'),val('9,81','m/s²'),val(2,'m')),o('≈'),val('19,62','J')),['Δ: Änderung beziehungsweise Unterschied','Δh: Höhenunterschied']),
 'physics-power':records(eq(v('P'),f(v('E'),v('t'))),eq(f(val(100,'J'),val(5,'s')),val(20,'W')),['P: mittlere Leistung','E: umgesetzte Energie','t: Zeit']),
 'physics-density':records(eq(v('ρ'),f(v('m'),v('V'))),eq(f(val(2,'kg'),r(n('0,001'),p(u('m'),3))),r(n('2 000'),f(u('kg'),p(u('m'),3)))),['ρ: Dichte','m: Masse','V: Volumen']),
 'physics-frequency':records(eq(v('f'),f(n(1),v('T'))),eq(f(n(1),val('0,02','s')),val(50,'Hz')),['f: Frequenz','T: Periodendauer']),
 'physics-temperature':records(eq(r(v('T'),o('/'),u('K')),r(v('ϑ'),o('/'),u('°C'),o('+'),n('273,15'))),eq(val(20,'°C'),val('293,15','K')),['T: Temperatur in Kelvin','ϑ: Celsius-Temperatur','Die Umrechnung gilt für die Zahlenwerte in diesen Einheiten.']),
 'electrical-voltage':records(eq(v('U'),f(v('E'),v('Q'))),eq(val(1,'V'),r(n(1),f(u('J'),u('C')))),['U: Spannung','E: übertragene Energie','Q: Ladung in Coulomb']),
 'electrical-current':records(eq(v('I'),f(v('Q'),v('t'))),eq(val(1,'A'),r(n(1),f(u('C'),u('s')))),['I: mittlere Stromstärke','Q: Ladung in Coulomb','t: Zeit']),
 'electrical-resistance':records(eq(v('R'),f(v('U'),v('I'))),eq(f(val(5,'V'),val('0,01','A')),val(500,'Ω')),['R: Widerstand','U: Spannung','I: Stromstärke']),
 'electrical-ohm':records(eq(v('I'),f(v('U'),v('R'))),r(f(val(5,'V'),val('1 000','Ω')),o('='),val('0,005','A'),o('='),val(5,'mA')),['I: Stromstärke','U: Spannung','R: Widerstand']),
 'electrical-power':records(eq(v('P'),mul(v('U'),v('I'))),eq(mul(val(5,'V'),val('0,02','A')),val('0,1','W')),['P: Gleichstromleistung','U: Spannung','I: Stromstärke']),
 'electrical-series':records(eq(s(v('R'),'gesamt'),r(s(v('R'),'1'),o('+'),s(v('R'),'2'))),eq(r(val(100,'Ω'),o('+'),val(200,'Ω')),val(300,'Ω'))),
 'electrical-parallel':records(eq(f(n(1),s(v('R'),'gesamt')),r(f(n(1),s(v('R'),'1')),o('+'),f(n(1),s(v('R'),'2')))),eq(s(v('R'),'gesamt'),val(50,'Ω')),['Im Beispiel sind beide Widerstände 100 Ω.']),
 'electrical-nodes':records(eq(s(v('I'),'hinein'),s(v('I'),'heraus')),eq(val(10,'mA'),r(val(4,'mA'),o('+'),val(6,'mA'))),['I hinein und I heraus stehen hier jeweils für die Summe der betreffenden Ströme.']),
 'electrical-loop':records(eq(r(s(v('U'),'Quelle'),o('−'),s(v('U'),'1'),o('−'),s(v('U'),'2')),val(0,'V')),eq(r(val(5,'V'),o('−'),val(2,'V'),o('−'),val(3,'V')),val(0,'V'))),
 'electrical-capacitor':records(eq(v('Q'),mul(v('C'),v('U'))),eq(v('C'),f(v('Q'),v('U'))),['C als Formelzeichen: Kapazität in Farad','Q: Ladung in Coulomb','U: Spannung in Volt']),
 'electrical-led':records(eq(v('R'),f(r(s(v('U'),'Quelle'),o('−'),s(v('U'),'LED')),v('I'))),eq(f(r(val(5,'V'),o('−'),val(2,'V')),val('0,01','A')),val(300,'Ω')),['U Quelle: Versorgungsspannung','U LED: angenommene LED-Spannung beim betrachteten Strom','I: gewünschter Strom im Modell']),
};
