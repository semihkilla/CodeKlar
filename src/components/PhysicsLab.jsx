import { useState } from 'react';
import { physicsModels, formatPhysics as fmt } from '../physicsModels.js';
function Plot({result}) {
 const {points,xmax,ymax,ymin=0,marker,compare}=result;
 const x=v=>52+v/xmax*350,y=v=>188-(v-ymin)/(ymax-ymin)*154;
 const path=list=>list.map(([a,b],i)=>`${i?'L':'M'}${x(a).toFixed(2)},${y(b).toFixed(2)}`).join(' ');
 return <svg className="physics-plot" viewBox="0 0 440 240" role="img" aria-label={`${result.xLabel}; ${result.yLabel}. ${result.summary}`}>
  <title>{result.xLabel} und {result.yLabel}</title><desc>{result.summary}</desc>
  {[0,.5,1].map(t=><g key={t}><line x1="52" x2="402" y1={y(ymin+t*(ymax-ymin))} y2={y(ymin+t*(ymax-ymin))} className="physics-grid"/><text x="45" y={y(ymin+t*(ymax-ymin))+4} textAnchor="end">{fmt(ymin+t*(ymax-ymin))}</text><text x={x(t*xmax)} y="209" textAnchor="middle">{fmt(t*xmax)}</text></g>)}
  <path d="M52,30V188H407" className="physics-axis"/>
  <text x="52" y="18">{result.yLabel}</text><text x="227" y="232" textAnchor="middle">{result.xLabel}</text>
  {compare?<path d={path(compare)} className="physics-reference"/>:null}
  <path d={path(points)} className="physics-curve"/>
  {marker?<g><circle cx={x(marker[0])} cy={y(marker[1])} r="7" className="physics-marker"/><path d={`M${x(marker[0])},188V${y(marker[1])}`} className="physics-reference"/></g>:null}
 </svg>;
}
export function PhysicsLab({area}) {
 const model=physicsModels[area];
 const [a,setA]=useState(model.a[1]),[b,setB]=useState(model.b[1]);
 const result=model.calculate(a,b);
 return <details className="reading-more physics-lab"><summary>Ausprobieren: {model.title}</summary>
  <p>{model.prompt}</p>
  <div className="physics-controls">{[[model.a,a,setA],[model.b,b,setB]].map(([config,value,set])=><label key={config[0]}>{config[0]}<output>{fmt(value)} {config[5]}</output><input type="range" aria-label={config[0]} min={config[2]} max={config[3]} step={config[4]} value={value} onChange={e=>set(Number(e.target.value))}/></label>)}</div>
  <div className="physics-result" aria-live="polite"><span>{result.label}</span><strong>{fmt(result.value)} {result.unit}</strong></div>
  <Plot result={{...result,xLabel:model.x,yLabel:model.y}}/>
  {result.legend?<p>{result.legend}</p>:null}<p>{result.summary}</p>
  <details><summary>Kurvendaten als Tabelle</summary><div className="physics-table"><table><caption>Ausgewählte Modellwerte</caption><thead><tr><th>{model.x}</th><th>{model.y}</th></tr></thead><tbody>{result.points.filter((_,i)=>i===0||i===result.points.length-1||i%Math.max(1,Math.round(result.points.length/6))===0).map(([x,y],i)=><tr key={i}><td>{fmt(x)}</td><td>{fmt(y)}</td></tr>)}</tbody></table></div></details>
  <p className="physics-limit"><strong>Modellgrenzen</strong> {model.limit}</p>
  <button className="text-button" onClick={()=>{setA(model.a[1]);setB(model.b[1]);}}>Modell zurücksetzen</button>
 </details>;
}
