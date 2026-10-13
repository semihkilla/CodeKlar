const technologyCourses=new Set(['networking','cloud','cybersecurity','reverse']);
export const isTechnologyCourse=course=>technologyCourses.has(course);
export function KnowledgeExample({ lesson,compact=false }){
 const value=compact?lesson.syntax:lesson.example;
 if(lesson.id==='cybersecurity-sql-parameters')return <pre className="syntax-strip">{value}</pre>;
 return <div className="knowledge-example">{value.split('\n').map((line,index)=><p key={index}>{line}</p>)}</div>;
}
