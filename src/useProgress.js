import { applySessionResults } from "./studySession";
import { useCallback, useEffect, useState } from "react";
import { lessonById } from "./data";
import { cleanReviews, nextReview } from "./review";

const key = "codeklar-progress-v1";
const empty = () => ({ solved: {}, attempted: {}, reviews: {} });

function read() {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    if (!value || typeof value !== "object") return empty();
    const clean = empty();
    for (const field of ["solved", "attempted"]) {
      for (const [id, date] of Object.entries(value[field] || {})) {
        if (
          lessonById[id] &&
          typeof date === "string" &&
          !Number.isNaN(Date.parse(date))
        )
          clean[field][id] = date;
      }
    }
    clean.sessionReceipts = Array.isArray(value.sessionReceipts) ? [...new Set(value.sessionReceipts.filter(id => typeof id === "string" && /^round-\d+-\d+$/.test(id)))].slice(-200) : [];
    clean.reviews = cleanReviews(value.reviews, lessonById);
    return clean;
  } catch {
    return empty();
  }
}

export function useProgress() {
  const [progress, setProgress] = useState(read);
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(progress));
      setSaved(true);
    } catch {
      setSaved(false);
    }
  }, [progress]);
  function record(id, passed) {
    if (!Object.hasOwn(lessonById, id)) return;
    const now = Date.now();
    setProgress((previous) => ({
      ...previous,
      reviews: { ...previous.reviews, [id]: nextReview(previous.reviews[id], passed, now) },
      attempted: { ...previous.attempted, [id]: new Date(now).toISOString() },
      solved: passed
        ? {
            ...previous.solved,
            [id]: previous.solved[id] || new Date(now).toISOString(),
          }
        : previous.solved,
    }));
  }
  const recordSession = useCallback(session => setProgress(previous => applySessionResults(previous, session, lessonById)), []);
  return { progress, saved, record, recordSession };
}
