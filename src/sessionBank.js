import { lessons } from './data';
import bank from './sessionQuestionBank.json' with { type: 'json' };
// Knowledge checks reuse lesson IDs for repetition but never replace code tests.
export const sessionLessons = lessons.map(lesson => Object.hasOwn(bank, lesson.id) ? { ...lesson, ...bank[lesson.id] } : lesson);
export const sessionById = Object.fromEntries(sessionLessons.map(lesson => [lesson.id, lesson]));
