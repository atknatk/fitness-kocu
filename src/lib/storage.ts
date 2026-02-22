"use client";

export function getStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const item = localStorage.getItem(`fitkocu_${key}`);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

export function setStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(`fitkocu_${key}`, JSON.stringify(value));
  } catch {
    // quota exceeded, silently fail
  }
}

export function generateICS(weekNum: number, days: { name: string; type: string; label: string; exercises?: { name: string; sets: number; reps: string }[] }[]): string {
  const START_DATE = new Date(2026, 1, 23); // Feb 23, 2026
  const weekStart = new Date(START_DATE);
  weekStart.setDate(weekStart.getDate() + (weekNum - 1) * 7);

  let ics = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Atakan Fitness Kocu//TR\nCALSCALE:GREGORIAN\nX-WR-CALNAME:Fitness Koçu - Hafta ${weekNum}\nX-WR-TIMEZONE:Europe/Istanbul\n`;

  days.forEach((day, di) => {
    if (day.type === "rest") return;
    const dayDate = new Date(weekStart);
    dayDate.setDate(dayDate.getDate() + di);
    const y = dayDate.getFullYear();
    const m = String(dayDate.getMonth() + 1).padStart(2, "0");
    const d = String(dayDate.getDate()).padStart(2, "0");

    let desc = day.label + "\\n\\n";
    if (day.exercises) {
      day.exercises.forEach((ex) => {
        desc += `${ex.name}: ${ex.sets}x${ex.reps}\\n`;
      });
    }

    ics += `BEGIN:VEVENT\nDTSTART:${y}${m}${d}T120000\nDTEND:${y}${m}${d}T131500\nSUMMARY:${day.label} — Fitness Koçu\nDESCRIPTION:${desc}\nLOCATION:Spor Salonu\nSTATUS:CONFIRMED\nBEGIN:VALARM\nTRIGGER:-PT30M\nACTION:DISPLAY\nDESCRIPTION:30 dk sonra antrenman!\nEND:VALARM\nEND:VEVENT\n`;
  });

  ics += "END:VCALENDAR";
  return ics;
}

export function downloadICS(ics: string, weekNum: number) {
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `fitness-kocu-hafta-${weekNum}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}
