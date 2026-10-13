// Native MathML expressions: no external scripts, fonts or formula parser required.
export const variable = value => ['mi',value];
export const number = value => ['mn',String(value)];
export const unit = value => ['unit',value];
export const operator = value => ['mo',value];
export const row = (...items) => ['mrow',...items];
export const fraction = (top,bottom) => ['mfrac',top,bottom];
export const power = (base,exponent) => ['msup',base,number(exponent)];
export const root = value => ['msqrt',value];
export const index = (base,label) => ['msub',base,['text',label]];
const v=variable,n=number,u=unit,o=operator,r=row,f=fraction,p=power,s=index;
const eq=(left,right)=>r(left,o('='),right);
const mul=(...items)=>r(...items.flatMap((item,i)=>i?[o('·'),item]:[item]));
const val=(value,symbol)=>r(n(value),u(symbol));
const records=(formula,example,legend=[])=>({formula,example,legend});
const e=index(v('E'),'kin'),potential=index(v('E'),'pot');
export const scienceMath = {
 'physics-algebra-balance':records(eq(r(v('x'),o('+'),n(3)),n(8)),eq(v('x'),r(n(8),o('−'),n(3),o('='),n(5)))),
 'physics-algebra-numerator':records(eq(v('s'),mul(v('v'),v('t'))),eq(mul(val(4,'m/s'),val(3,'s')),val(12,'m')),['s: Strecke','v: mittlere Weggeschwindigkeit','t: Dauer']),
 'physics-algebra-denominator':records(eq(v('t'),f(v('s'),v('v'))),eq(f(val(12,'m'),val(4,'m/s')),val(3,'s')),['t: Dauer','s: Strecke','v: hier positive Weggeschwindigkeit']),
 'physics-algebra-factor':records(eq(v('m'),f(v('F'),v('a'))),eq(f(val(12,'N'),val(3,'m/s²')),val(4,'kg')),['m: Masse','F: resultierende Kraft','a: positive Beschleunigung im Beispiel']),
 'physics-algebra-square':records(eq(v('v'),root(f(mul(n(2),v('E')),v('m')))),eq(root(f(mul(n(2),val(16,'J')),val(2,'kg'))),val(4,'m/s')),['v: nichtnegativer Geschwindigkeitsbetrag','E: kinetische Energie','m: positive Masse']),
 'physics-algebra-units':records(eq(v('t'),f(v('s'),v('v'))),eq(f(val(100,'m'),val(10,'m/s')),val(10,'s')),['t: Dauer','s: Strecke','v: mittlere Weggeschwindigkeit','36 km/h = 10 m/s']),
 'electrical-algebra-numerator':records(eq(v('U'),mul(v('I'),v('R'))),eq(mul(val('0,01','A'),val(500,'Ω')),val(5,'V')),['U: Spannung','I: Strom','R: idealer ohmscher Widerstand']),
 'electrical-algebra-denominator':records(eq(v('R'),f(v('U'),v('I'))),eq(f(val(6,'V'),val('0,02','A')),val(300,'Ω')),['R: Widerstand','U: Spannung','I: hier positiver Strom']),
 'electrical-algebra-factor':records(eq(v('I'),f(v('P'),v('U'))),eq(f(val('0,6','W'),val(3,'V')),val('0,2','A')),['I: Strom','P: konstante Gleichstromleistung','U: positive Gleichspannung']),
 'electrical-algebra-square':records(eq(v('U'),root(f(mul(n(2),v('E')),v('C')))),eq(root(f(mul(n(2),val('0,00125','J')),val('0,0001','F'))),val(5,'V')),['U: Spannungsbetrag','E: Kondensatorenergie','C: positive konstante ideale Kapazität']),
 'electrical-algebra-zero':records(eq(v('P'),mul(v('U'),v('I'))),eq(val(0,'W'),mul(val(0,'V'),v('I'))),['I: hier nicht eindeutig aus P und U bestimmbar','0/0 ist nicht definiert']),
 'electrical-algebra-difference':records(eq(s(v('U'),'0'),r(s(v('U'),'K'),o('+'),mul(v('I'),s(v('R'),'i')))),eq(r(val('5,8','V'),o('+'),mul(val('0,1','A'),val(2,'Ω'))),val(6,'V')),['U₀: Leerlaufspannung','U K: Klemmenspannung','I: Laststrom','R i: Quelleninnenwiderstand im Modell']),
 'physics-accelerated-distance':records(eq(v('s'),mul(f(n(1),n(2)),v('a'),p(v('t'),2))),eq(mul(f(n(1),n(2)),val(2,'m/s²'),p(r(o('('),val(3,'s'),o(')')),2)),val(9,'m')),['s: Ortsänderung ab dem Start','a: konstante Beschleunigung','t: Dauer','Startgeschwindigkeit null; eine Dimension']),
 'physics-free-fall':records(eq(v('s'),mul(f(n(1),n(2)),v('g'),p(v('t'),2))),r(mul(f(n(1),n(2)),val('9,81','m/s²'),p(r(o('('),val(1,'s'),o(')')),2)),o('≈'),val('4,905','m')),['s: Fallweg aus der Ruhe vor dem Aufprall','g: konstante Fallbeschleunigung','t: Falldauer','Ohne Luftwiderstand, nahe der Erdoberfläche']),
 'physics-spring':records(eq(v('F'),mul(v('k'),v('x'))),eq(mul(val(100,'N/m'),val('0,02','m')),val(2,'N')),['F: Betrag der Federkraft','k: Federkonstante','x: Betrag der Auslenkung','Richtung der Rückstellkraft entgegen der Auslenkung']),
 'physics-torque':records(eq(v('M'),mul(v('F'),v('l'))),eq(mul(val(10,'N'),val('0,2','m')),val(2,'N·m')),['M: Drehmomentbetrag','F: Kraftbetrag','l: senkrechter Abstand zur Kraftlinie']),
 'physics-lever-balance':records(eq(mul(s(v('F'),'1'),s(v('l'),'1')),mul(s(v('F'),'2'),s(v('l'),'2'))),eq(f(mul(val(20,'N'),val('0,1','m')),val('0,2','m')),val(10,'N')),['F₁ und F₂: Kraftbeträge','l₁ und l₂: jeweilige senkrechte Hebelarme','Entgegengesetzte Drehwirkungen; Eigengewicht hier vernachlässigt']),
 'physics-circular-motion':records(eq(s(v('a'),'z'),f(p(v('v'),2),v('r'))),eq(f(p(r(o('('),val(2,'m/s'),o(')')),2),val(2,'m')),val(2,'m/s²')),['a z: zum Zentrum gerichteter Beschleunigungsbetrag','v: konstanter Geschwindigkeitsbetrag','r: Kreisradius']),
 'physics-buoyancy':records(eq(s(v('F'),'A'),mul(v('ρ'),v('V'),v('g'))),r(mul(val('1 000','kg/m³'),val('0,001','m³'),val('9,81','m/s²')),o('≈'),val('9,81','N')),['F A: Auftriebskraftbetrag','ρ: Dichte des Fluids','V: verdrängtes Volumen','g: Fallbeschleunigung']),
 'physics-ideal-gas':records(eq(mul(v('p'),v('V')),mul(v('n'),v('R'),v('T'))),eq(mul(val(100,'kPa'),f(val(600,'K'),val(300,'K'))),val(200,'kPa')),['p: absoluter Druck','V: Volumen','n: Stoffmenge in Mol','R: universelle Gaskonstante','T: absolute Temperatur in Kelvin','Vergleich bei gleicher Stoffmenge und gleichem Volumen']),
 'physics-thermal-expansion':records(eq(r(o('Δ'),v('l')),mul(v('α'),s(v('l'),'0'),r(o('Δ'),v('T')))),r(mul(val('0,00001','1/K'),val(1,'m'),val(20,'K')),o('='),val('0,0002','m'),o('='),val('0,2','mm')),['Δl: Längenänderung','α: linearer Ausdehnungskoeffizient','l₀: Anfangslänge','ΔT: Temperaturänderung; gleicher Zahlenwert in K und °C']),
 'physics-latent-heat':records(eq(v('Q'),mul(v('m'),s(v('L'),'S'))),eq(mul(val('0,1','kg'),val('334 000','J/kg')),val('33 400','J')),['Q: Wärmeenergie für den Phasenwechsel','m: schmelzende Masse','L S: spezifische Schmelzwärme','Eis bereits bei der Schmelztemperatur; keine Wärmeverluste']),
 'electrical-wire-resistance':records(eq(v('R'),f(mul(v('ρ'),v('l')),v('A'))),eq(f(mul(v('ρ'),mul(n(2),v('l'))),v('A')),mul(n(2),v('R'))),['R: Leitungswiderstand','ρ: spezifischer elektrischer Widerstand (hier nicht Dichte)','l: Leitungslänge','A: gleichförmige Querschnittsfläche']),
 'electrical-mixed-resistors':records(eq(s(v('R'),'gesamt'),r(s(v('R'),'1'),o('+'),f(mul(s(v('R'),'2'),s(v('R'),'3')),r(s(v('R'),'2'),o('+'),s(v('R'),'3'))))),eq(r(val(100,'Ω'),o('+'),f(mul(val(200,'Ω'),val(200,'Ω')),val(400,'Ω'))),val(200,'Ω')),['R₁: Reihenwiderstand','R₂ und R₃: parallele Widerstände','Ideale ohmsche Widerstände']),
 'electrical-capacitors-parallel':records(eq(s(v('C'),'gesamt'),r(s(v('C'),'1'),o('+'),s(v('C'),'2'))),eq(r(val(100,'µF'),o('+'),val(200,'µF')),val(300,'µF')),['C: Kapazität','µF: Mikrofarad; ein Millionstel Farad','Gleiche Spannung an idealen parallelen Kondensatoren']),
 'electrical-capacitors-series':records(eq(f(n(1),s(v('C'),'gesamt')),r(f(n(1),s(v('C'),'1')),o('+'),f(n(1),s(v('C'),'2')))),eq(f(mul(val(100,'µF'),val(100,'µF')),r(val(100,'µF'),o('+'),val(100,'µF'))),val(50,'µF')),['C: Kapazität','Idealer Reihenpfad ohne zusätzliche Nettoladung am Verbindungsknoten']),
 'electrical-rc-discharge':records(eq(r(v('U'),o('('),v('t'),o(')')),mul(s(v('U'),'0'),['msup',v('e'),r(o('−'),f(v('t'),v('τ')))])),r(mul(val(5,'V'),['msup',v('e'),n('−1')]),o('≈'),val('1,84','V')),['U(t): Spannung nach Zeit t','U₀: Anfangsspannung','τ: Zeitkonstante R·C','e: Eulersche Zahl, ungefähr 2,718','Einfacher RC-Entladepfad ohne weitere Quelle']),
 'electrical-inductor-energy':records(eq(v('E'),mul(f(n(1),n(2)),v('L'),p(v('I'),2))),eq(mul(f(n(1),n(2)),val('0,1','H'),p(r(o('('),val(2,'A'),o(')')),2)),val('0,2','J')),['E: gespeicherte Energie','L: konstante ideale Induktivität in Henry','I: Strom in Ampere']),
 'electrical-capacitive-reactance':records(eq(s(v('X'),'C'),f(n(1),mul(n(2),v('π'),v('f'),v('C')))),r(f(n(1),mul(n(2),v('π'),val(50,'Hz'),val('0,0001','F'))),o('≈'),val('31,83','Ω')),['X C: Betrag des kapazitiven Blindwiderstands','π: Kreiszahl, ungefähr 3,14159','f: Frequenz','C: ideale Kapazität','Sinusförmiger eingeschwungener Zustand']),
 'electrical-pwm':records(eq(s(v('U'),'mittel'),mul(v('D'),s(v('U'),'High'))),eq(mul(n('0,25'),val(5,'V')),val('1,25','V')),['U mittel: zeitlicher Mittelwert','D: Tastgrad als Anteil zwischen 0 und 1','U High: eingeschaltete Spannung','Ausgeschalteter Pegel hier 0 V; ideale Rechteckpulse']),
 'electrical-pullup':records(eq(v('I'),f(s(v('U'),'Versorgung'),v('R'))),r(f(val('3,3','V'),val('10 000','Ω')),o('='),val('0,00033','A'),o('='),val('0,33','mA')),['I: Strom im Widerstand bei geschlossenem idealen Schalter nach Masse','R: Pull-up-Widerstand','Eingangsstrom hier vernachlässigt']),
 'physics-unit-check':records(eq(f(u('m'),u('s')),u('m/s')),eq(f(val(10,'m'),val(2,'s')),val(5,'m/s')),['m: Meter','s als Einheit: Sekunde']),
 'physics-area-volume':records(eq(p(u('m'),2),mul(n('10 000'),p(u('cm'),2))),eq(p(u('m'),3),mul(n('1 000 000'),p(u('cm'),3))),['Quadrat: Fläche','Dritte Potenz: Volumen']),
 'physics-uniform-motion':records(eq(v('x'),r(s(v('x'),'0'),o('+'),mul(v('v'),v('t')))),eq(r(val(0,'m'),o('+'),mul(val(3,'m/s'),val(4,'s'))),val(12,'m')),['x: Ort','x mit Index 0: Startort','v: konstante gerichtete Geschwindigkeit','t: Dauer']),
 'physics-graphs':records(eq(v('v'),f(r(o('Δ'),v('x')),r(o('Δ'),v('t')))),eq(f(val(10,'m'),val(2,'s')),val(5,'m/s')),['Δx: Ortsänderung','Δt: Zeitintervall','v: mittlere gerichtete Geschwindigkeit']),
 'physics-friction':records(eq(s(v('F'),'R'),mul(v('μ'),s(v('F'),'N'))),eq(mul(n('0,2'),val(10,'N')),val(2,'N')),['F mit Index R: Gleitreibkraftbetrag','μ: Gleitreibungskoeffizient ohne Einheit','F mit Index N: Normalkraftbetrag']),
 'physics-pressure':records(eq(v('p'),f(v('F'),v('A'))),eq(f(val(100,'N'),r(n('0,01'),p(u('m'),2))),val('10 000','Pa')),['p: Druck','F: senkrechte Kraft','A: Fläche','Pa: Pascal']),
 'physics-momentum':records(eq(v('p'),mul(v('m'),v('v'))),eq(mul(val(2,'kg'),val(3,'m/s')),val(6,'kg·m/s')),['p: gerichteter Impuls (hier eine Dimension)','m: Masse','v: gerichtete Geschwindigkeit']),
 'physics-efficiency':records(eq(v('η'),f(s(v('E'),'nutz'),s(v('E'),'zu'))),eq(f(val(80,'J'),val(100,'J')),r(n('0,8'),o('='),val(80,'%'))),['η: Wirkungsgrad ohne Einheit','E nutz: Nutzenergie','E zu: zugeführte Energie']),
 'physics-specific-heat':records(eq(v('Q'),mul(v('m'),v('c'),r(o('Δ'),v('T')))),eq(mul(val(1,'kg'),val('4 180','J/(kg·K)'),val(2,'K')),val('8 360','J')),['Q: zugeführte Wärmeenergie','m: Masse','c: spezifische Wärmekapazität','ΔT: Temperaturänderung; hier kein Phasenwechsel']),
 'physics-waves':records(eq(v('v'),mul(v('λ'),v('f'))),eq(mul(val(2,'m'),val(3,'Hz')),val(6,'m/s')),['v: Ausbreitungsgeschwindigkeit','λ: Wellenlänge','f: Frequenz']),
 'electrical-divider':records(eq(s(v('U'),'aus'),mul(s(v('U'),'ein'),f(s(v('R'),'2'),r(s(v('R'),'1'),o('+'),s(v('R'),'2'))))),eq(mul(val(6,'V'),f(val('1 000','Ω'),val('2 000','Ω'))),val(3,'V')),['U ein: Quellenspannung','U aus: Spannung über R₂','R₁ und R₂: Reihenwiderstände; Ausgang unbelastet']),
 'electrical-internal-resistance':records(eq(s(v('U'),'K'),r(s(v('U'),'0'),o('−'),mul(v('I'),s(v('R'),'i')))),eq(r(val(6,'V'),o('−'),mul(val('0,1','A'),val(2,'Ω'))),val('5,8','V')),['U K: Klemmenspannung','U₀: Leerlaufspannung','I: Laststrom','R i: Innenwiderstand im Modell']),
 'electrical-energy':records(eq(v('E'),mul(v('P'),v('t'))),eq(mul(val(2,'W'),val(3,'h')),val(6,'Wh')),['E: Energie','P: konstante Leistung','t: Dauer','1 Wh entspricht 3.600 J']),
 'electrical-resistor-power':records(eq(v('P'),f(p(v('U'),2),v('R'))),eq(f(p(r(o('('),val(5,'V'),o(')')),2),val(100,'Ω')),val('0,25','W')),['P: Verlustleistung im idealen ohmschen Gleichstrommodell','U: Spannung','R: Widerstand']),
 'electrical-tolerance':records(eq(r(o('Δ'),v('R')),mul(s(v('R'),'N'),v('ε'))),eq(mul(val('1 000','Ω'),n('0,05')),val(50,'Ω')),['ΔR: maximaler Abweichungsbetrag','R N: Nennwiderstand','ε: relative Toleranz; 5 % = 0,05']),
 'electrical-potentiometer':records(eq(s(v('U'),'aus'),mul(n('0,5'),s(v('U'),'ein'))),eq(mul(n('0,5'),val(5,'V')),val('2,5','V')),['Nur linearer Schleifer in der Mitte und unbelasteter Ausgang','U ein: Spannung zwischen Bahnenden','U aus: Schleiferspannung relativ zum unteren Bahnende']),
 'electrical-rc':records(eq(v('τ'),mul(v('R'),v('C'))),eq(mul(val('1 000','Ω'),val('0,0001','F')),val('0,1','s')),['τ: Zeitkonstante','R: Widerstand','C: Kapazität','100 µF = 0,0001 F']),
 'electrical-capacitor-energy':records(eq(v('E'),mul(f(n(1),n(2)),v('C'),p(v('U'),2))),eq(mul(f(n(1),n(2)),val('0,0001','F'),p(r(o('('),val(5,'V'),o(')')),2)),val('0,00125','J')),['E: gespeicherte Energie','C: konstante ideale Kapazität','U: Kondensatorspannung']),
 'electrical-dc-ac':records(eq(v('T'),f(n(1),v('f'))),eq(f(n(1),val(50,'Hz')),val('0,02','s')),['T: Periodendauer','f: Frequenz']),
 'electrical-rms':records(eq(s(v('U'),'eff'),f(s(v('U'),'Spitze'),root(n(2)))),r(f(val(10,'V'),root(n(2))),o('≈'),val('7,07','V')),['U eff: Effektivwert','U Spitze: Spitzenbetrag','Gilt hier ausschließlich für eine reine Sinusspannung']),
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
