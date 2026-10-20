import { physicsNotation } from './physicsNotation.js';
import curriculum from './physicsCurriculum.json' with { type: 'json' };
import { makeKnowledge } from './learningFactory.js';
export const physicsAreas = curriculum.areas;
export const physicsCompassLessons = makeKnowledge('physics', curriculum.lessons.map(row => [
  row.id, row.category, row.name, row.introduction, row.steps, row.worked,
  row.question, row.choices, row.explanation,
  { difficulty: ['quantum','relativity','nuclear'].includes(row.area) ? 'Vertiefung' : 'Grundlage',
    useCase: row.application,
    physicsStudy: {area:row.area,expression:row.expression,legend:physicsNotation(row),worked:row.worked,practice:row.practice},
  },
]), 'Prüfe Einheiten, Systemgrenze und Voraussetzungen. Die Modelle zeigen Zusammenhänge; sie bilden reale Geräte nicht vollständig ab.');
