const DAY = 86400000;
export const REVIEW_DAYS = [1, 3, 7, 14];

export function cleanReviews(value, known) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  return Object.fromEntries(Object.entries(value).filter(([id, item]) =>
    Object.hasOwn(known, id) && item && typeof item === 'object' &&
    typeof item.lastResult === 'boolean' && Number.isSafeInteger(item.streak) && item.streak >= 0 &&
    Number.isSafeInteger(item.attempts) && item.attempts > 0 &&
    typeof item.due === 'string' && Number.isFinite(Date.parse(item.due))
  ).map(([id, item]) => [id, { lastResult: item.lastResult, streak: item.streak, attempts: item.attempts, due: item.due }]));
}

export function nextReview(previous, passed, now = Date.now()) {
  const streak = passed ? Math.min((previous?.streak || 0) + 1, 1000000) : 0;
  const days = passed ? REVIEW_DAYS[Math.min(streak - 1, REVIEW_DAYS.length - 1)] : 0;
  return {
    lastResult: passed,
    streak,
    attempts: Math.min((previous?.attempts || 0) + 1, 1000000),
    due: new Date(now + days * DAY).toISOString(),
  };
}

export function reviewQueue(lessons, progress, now = Date.now()) {
  return lessons.flatMap(lesson => {
    const review = progress.reviews?.[lesson.id];
    const retry = review?.lastResult === false || (!progress.solved[lesson.id] && !!progress.attempted[lesson.id]);
    // Old progress has no repetition history. Offer solved lessons after a week.
    const due = review?.due || (progress.solved[lesson.id] ? new Date(Date.parse(progress.solved[lesson.id]) + 7 * DAY).toISOString() : null);
    if (!retry && (!due || Date.parse(due) > now)) return [];
    return [{ lesson, retry, due: due || progress.attempted[lesson.id] }];
  }).sort((a, b) => Number(b.retry) - Number(a.retry) || Date.parse(a.due) - Date.parse(b.due) || a.lesson.id.localeCompare(b.lesson.id));
}
