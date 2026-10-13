import { learningTerms } from './learningTerms.js';
// Every row teaches an idea, gives a bounded example and checks understanding.
export function makeKnowledge(course, rows, note) {
  return rows.map(([id, category, name, introduction, steps, example, question, choices, explanation, extras = {}], index) => {
    const answer = index % 3, options = [...choices.slice(1)]; options.splice(answer,0,choices[0]);
    return { id:`${course}-${id}`, course, kind:'theory', difficulty:'Grundlage', category, name, title:name,
      description:introduction, guide:[introduction,steps], syntax:example.split('\n')[0], example,
      parts:[['Merke',steps[0]]], detail:explanation, note, question, task:question, options, answer,
      hints:[steps[0],steps[1]], explanation,
      terms:learningTerms(course,[introduction,...steps,explanation].join(" ")), ...extras };
  });
}
