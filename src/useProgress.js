import { useEffect, useState } from "react";
import { lessonById } from "./data";

const key = "codeklar-progress-v1";
const empty = () => ({ solved: {}, attempted: {} });

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
    setProgress((previous) => ({
      attempted: { ...previous.attempted, [id]: new Date().toISOString() },
      solved: passed
        ? {
            ...previous.solved,
            [id]: previous.solved[id] || new Date().toISOString(),
          }
        : previous.solved,
    }));
  }
  return { progress, saved, record };
}
