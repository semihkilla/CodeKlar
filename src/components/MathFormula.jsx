import { scienceMath } from '../scienceMath';
function MathNode({ expression }) {
  const [type,...children]=expression;
  if(type==='unit')return <mi mathvariant="normal">{children[0]}</mi>;
  if(type==='text')return <mtext>{children[0]}</mtext>;
  if(['mi','mn','mo'].includes(type)){const Tag=type;return <Tag>{children[0]}</Tag>;}
  const Tag=type;
  return <Tag>{children.map((child,index)=><MathNode key={index} expression={child}/>)}</Tag>;
}
function spoken([type,...children]) {
  if (type === 'mfrac') return `${spoken(children[0])} geteilt durch ${spoken(children[1])}`;
  if (type === 'msup') return `${spoken(children[0])} hoch ${spoken(children[1])}`;
  if (type === 'msub') return `${spoken(children[0])} mit Index ${spoken(children[1])}`;
  if (type === 'mrow') return children.map(spoken).join(' ');
  if (type === 'mo') return ({'=':'gleich','·':'mal','−':'minus','+':'plus','≈':'ungefähr gleich','Δ':'Änderung'})[children[0]] || children[0];
  return children[0];
}
export function MathFormula({ expression, label }) {
  return <div className="math-expression"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block" aria-label={`${label}: ${spoken(expression)}`}><MathNode expression={expression}/></math></div>;
}
export function ScienceExample({ lesson, compact=false }) {
  const content=scienceMath[lesson.id];
  return <div className="science-example">
    {content?<>
      <MathFormula expression={content.formula} label={`${lesson.name}: Formel`}/>
      {!compact && <><span className="math-example-label">Eingesetzte Werte oder Zusammenhang</span><MathFormula expression={content.example} label={`${lesson.name}: Beispiel`}/>
        {content.legend.length>0 && <ul className="math-legend">{content.legend.map(text=><li key={text}>{text}</li>)}</ul>}</>}
    </>:lesson.example.split('\n').map((line,index)=><p key={index}>{line}</p>)}
  </div>;
}
