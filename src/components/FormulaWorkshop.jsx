import { useState } from 'react';
import { MathFormula } from './MathFormula';
import { formulaModels, formulaForLesson, formulaExpression, rearrangementSteps, solveFormula, formatQuantity, parseQuantity, answerMatches } from '../formulaModels.js';
function FormulaExercise({ model,target }) {
 const [raw,setRaw]=useState(model.quantities.map(q=>String(q.value)));
 const [mode,setMode]=useState('calculate'),[answer,setAnswer]=useState(''),[feedback,setFeedback]=useState(''),[revealed,setRevealed]=useState(false);
 const solution=solveFormula(model,target,raw),quantity=model.quantities[target];
 const reset=()=>{setFeedback('');setRevealed(false);};
 const check=()=>{
  if(solution.error)return;
  const given=parseQuantity(answer);
  setFeedback(!Number.isFinite(given)?'Gib zuerst eine Zahl für dein Ergebnis ein.':answerMatches(given,solution.result)?'Richtig umgeformt und eingesetzt!':'Das Ergebnis passt noch nicht. Prüfe die Umstellung und die Einheiten; runde erst am Ende.');
 };
 const showResult=mode==='calculate'||revealed||feedback==='Richtig umgeformt und eingesetzt!';
 return <>
  <div className="formula-modes" aria-label="Arbeitsweise"><button type="button" aria-pressed={mode==='calculate'} onClick={()=>{setMode('calculate');reset();}}>Rechnen</button><button type="button" aria-pressed={mode==='practice'} onClick={()=>{setMode('practice');reset();}}>Selbst lösen</button></div>
  <p>{model.note}</p>
  <h3 className="reading-label">So stellst du um</h3>
  <ol className="formula-steps">{rearrangementSteps(model,target).map((step,i)=><li key={i}><p>{step.text}</p><MathFormula expression={step.expression} label={`Umstellung Schritt ${i+1}`}/></li>)}</ol>
  <div className="tool-controls">{model.quantities.map((q,i)=>i!==target&&<label key={q.symbol}>Gegeben: {q.name} {q.symbol} ({q.unit})<input type="text" inputMode="decimal" value={raw[i]} onChange={e=>{setRaw(raw.map((value,index)=>index===i?e.target.value:value));reset();}}/></label>)}</div>
  <p className="formula-unit-note">Alle Werte in den angezeigten Einheiten einsetzen. Zum Beispiel: 10 mA = 0,01 A; 100 µF = 0,0001 F. Dezimalkomma ist erlaubt, Tausendertrennzeichen bitte weglassen.</p>
  {solution.error?<p role="alert">{solution.error}</p>:<>
   <MathFormula expression={formulaExpression(model,target,solution.values)} label="Umgestellte Formel mit gegebenen Werten"/>
   {mode==='practice'&&<div className="formula-answer"><label>Dein Ergebnis in {quantity.unit}<input type="text" inputMode="decimal" value={answer} onChange={e=>{setAnswer(e.target.value);setFeedback('');setRevealed(false);}}/></label><div className="formula-actions"><button type="button" className="primary-button" onClick={check}>Umform-Ergebnis prüfen</button><button type="button" onClick={()=>setRevealed(true)}>Lösung anzeigen</button></div><p role="status">{feedback}</p><small>Eine Rundungsabweichung bis 0,01 % wird akzeptiert.</small></div>}
   {showResult&&<div className="computer-results" aria-label="Umform-Ergebnis" aria-live="polite"><span>Gesucht: {quantity.name}<strong>{quantity.symbol} = {formatQuantity(solution.result)} {quantity.unit}</strong></span></div>}
  </>}
  <p className="formula-unit-note">Dieses freie Training verändert deinen Quiz-Fortschritt nicht. Die Umform-Lektionen unter Übungen zählen zum Fortschritt.</p>
 </>;
}
function SelectedFormula({ model }) {
 const [target,setTarget]=useState(model.initialTarget??0);
 return <><label className="formula-select">Gesuchte Größe<select value={target} onChange={e=>setTarget(Number(e.target.value))}>{model.quantities.map((q,i)=><option key={q.symbol} value={i}>{q.name} {q.symbol} ({q.unit})</option>)}</select></label><FormulaExercise key={target} model={model} target={target}/></>;
}
export function FormulaWorkshop({ course,lessonId }) {
 const available=formulaModels.filter(model=>model.course===course),fixed=lessonId?formulaForLesson(lessonId):null;
 const [selected,setSelected]=useState(available[0]?.id);
 if(lessonId&&!fixed)return null;
 const model=fixed||available.find(item=>item.id===selected)||available[0];
 return <details className="reading-more formula-workshop"><summary>{lessonId?'Diese Formel umstellen & üben':'Formeln umstellen & üben'}</summary><section aria-label="Formelwerkstatt">
  <p>Gesucht kann auch der Zähler, der Nenner oder ein Faktor sein. Stelle zuerst nach dieser Größe um und setze danach die gegebenen Werte ein.</p>
  {!fixed&&<label className="formula-select">Formel wählen<select value={model.id} onChange={e=>setSelected(e.target.value)}>{available.map(item=><option key={item.id} value={item.id}>{item.name}</option>)}</select></label>}
  <SelectedFormula key={model.id} model={model}/>
 </section></details>;
}
