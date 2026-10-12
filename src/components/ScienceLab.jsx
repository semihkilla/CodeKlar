import { useState } from 'react';
import { MathFormula } from './MathFormula';
import { scienceMath, row, variable, number, unit, operator, fraction } from '../scienceMath';
const format = value => new Intl.NumberFormat('de-DE',{maximumFractionDigits:8}).format(value);
export function ScienceLab({ course }) {
  const electrical = course === 'electrical';
  const [first,setFirst] = useState(electrical ? '5' : '100'), [second,setSecond] = useState(electrical ? '1000' : '20');
  const a=Number(first),b=Number(second);
  const valid = first.trim() !== '' && second.trim() !== '' && Number.isFinite(a) && Number.isFinite(b) && a>=0 && a <= (electrical?24:100000) && b >= (electrical?1:0.1) && b <= 1000000;
  return <details className="computer-workshop reading-more"><summary>{electrical?'Ohm-Labor: Spannung, Widerstand und Strom':'Bewegungs-Labor: Strecke und Zeit'}</summary>
    <section aria-label={electrical?'Ohm-Labor':'Bewegungs-Labor'}>
      <p>{electrical?'Verändere die Werte im idealen Gleichstrommodell.':'Berechne Weg pro Zeit. Die Rechnung liefert einen Durchschnitt und beschreibt keinen vollständigen Bewegungsverlauf.'}</p>
      <MathFormula expression={scienceMath[electrical?'electrical-ohm':'physics-speed'].formula} label={electrical?'Ohmsches Gesetz':'Durchschnittsgeschwindigkeit'}/>
      {electrical && <MathFormula expression={scienceMath['electrical-power'].formula} label="Elektrische Leistung"/>}
      <div className="tool-controls"><label>{electrical?'Spannung in Volt':'Strecke in Metern'}<input aria-label={electrical?'Spannung in Volt':'Strecke in Metern'} type="number" min="0" max={electrical?24:100000} step="any" value={first} onChange={e=>setFirst(e.target.value)} /></label><label>{electrical?'Widerstand in Ohm':'Zeit in Sekunden'}<input aria-label={electrical?'Widerstand in Ohm':'Zeit in Sekunden'} type="number" min={electrical?1:0.1} max="1000000" step="any" value={second} onChange={e=>setSecond(e.target.value)} /></label></div>
      {valid && <MathFormula expression={row(variable(electrical?'I':'v'),operator('='),fraction(row(number(format(a)),unit(electrical?'V':'m')),row(number(format(b)),unit(electrical?'Ω':'s'))))} label="Eingesetzte Werte"/>}
      {valid?<div className="computer-results" aria-label="Modellergebnis" aria-live="polite">{electrical?<><span>Strom <strong>{format(a/b)} A = {format(a/b*1000)} mA</strong></span><span>Leistung <strong>{format(a*a/b)} W</strong></span></>:<><span>Durchschnitt <strong>{format(a/b)} m/s</strong></span><span>Umgerechnet <strong>{format(a/b*3.6)} km/h</strong></span></>}</div>:<p role="alert">{electrical?'Gib 0–24 V und 1–1.000.000 Ω ein.':'Gib 0–100.000 m und 0,1–1.000.000 s ein. Die Zeit muss positiv sein.'}</p>}
      <p>Dies ist eine Modellrechnung, keine Messung. Ausprobieren zählt nicht als gelöste Wissensfrage.</p>
    </section>
  </details>;
}
