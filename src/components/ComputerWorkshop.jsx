import { useState } from 'react';
import { ComputerLab } from './ComputerLab';
import { ComputerSystemsLab } from './ComputerSystemsLab';
import { ProcessingLab } from './ProcessingLab';

export function ComputerWorkshop() {
  const [area, setArea] = useState('basics');
  return <details className="computer-workshop reading-more">
    <summary>Selbst ausprobieren</summary>
    <p>Wähle ein Experiment. Deine Einstellungen bleiben beim Wechsel erhalten. Ausprobieren zählt nicht als gelöste Wissensfrage.</p>
    <label className="computer-field">Werkstattbereich
      <select aria-label="Werkstattbereich" value={area} onChange={e => setArea(e.target.value)}>
        <option value="basics">Einstieg: Bits, Text und Speichern</option>
        <option value="systems">Vertiefung: Schaltungen, CPU und Netzwerk</option>
        <option value="processing">Vertiefung: Cache und Zeitverteilung</option>
      </select>
    </label>
    <div hidden={area !== 'basics'}><ComputerLab /></div>
    <div hidden={area !== 'systems'}><ComputerSystemsLab /></div>
    <div hidden={area !== 'processing'}><ProcessingLab /></div>
  </details>;
}
