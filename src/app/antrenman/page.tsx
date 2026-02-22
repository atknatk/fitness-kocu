"use client";
import { useState, useEffect } from "react";
import { ChevronDown, Check, Printer, CalendarPlus, Flame, Snowflake, Zap } from "lucide-react";
import WeekSelector from "@/components/WeekSelector";
import StickmanAnimation from "@/components/StickmanAnimation";
import RestTimer from "@/components/RestTimer";
import { WEEKS, WEEK_GOALS, MOTIVATIONAL_QUOTES } from "@/data/weeks";
import { EXERCISES } from "@/data/exercises";
import { getStorage, setStorage, generateICS, downloadICS } from "@/lib/storage";

export default function AntrenmanPage() {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [openDays, setOpenDays] = useState<Set<number>>(new Set());
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCompleted(getStorage("completed", {}));
    const start = new Date(2026, 1, 23);
    const now = new Date();
    const diffWeeks = Math.floor((now.getTime() - start.getTime()) / (7 * 24 * 60 * 60 * 1000));
    const w = Math.max(0, Math.min(11, diffWeeks));
    setCurrentWeek(w);
    // Auto-open today
    const todayIdx = new Date().getDay();
    setOpenDays(new Set([todayIdx === 0 ? 6 : todayIdx - 1]));
  }, []);

  if (!mounted) return <div className="animate-pulse p-8 text-center text-gray-400">Yükleniyor...</div>;

  const week = WEEKS[currentWeek];
  const quote = MOTIVATIONAL_QUOTES[currentWeek % MOTIVATIONAL_QUOTES.length];

  const toggleDay = (i: number) => {
    const next = new Set(openDays);
    next.has(i) ? next.delete(i) : next.add(i);
    setOpenDays(next);
  };

  const toggleExercise = (key: string) => {
    const next = { ...completed, [key]: !completed[key] };
    setCompleted(next);
    setStorage("completed", next);
  };

  const handleCalendar = () => {
    const days = week.days.map((d) => ({
      ...d,
      exercises: d.exercises.map((e) => ({
        name: EXERCISES[e.exerciseId]?.name || e.exerciseId,
        sets: e.sets,
        reps: e.reps,
      })),
    }));
    const ics = generateICS(currentWeek + 1, days);
    downloadICS(ics, currentWeek + 1);
  };

  const dayCompletionPct = (dayIdx: number) => {
    const day = week.days[dayIdx];
    if (!day.exercises.length) return -1;
    const total = day.exercises.length;
    const done = day.exercises.filter((_, ei) => completed[`w${currentWeek}d${dayIdx}e${ei}`]).length;
    return Math.round((done / total) * 100);
  };

  return (
    <div className="space-y-4">
      {/* Motivation banner */}
      <div className="bg-gradient-to-br from-dark to-primary-dark text-white rounded-2xl p-5 relative overflow-hidden">
        <div className="absolute top-[-30%] right-[-5%] w-48 h-48 bg-white/5 rounded-full" />
        <p className="italic text-sm leading-relaxed relative z-10">&ldquo;{quote.q}&rdquo;</p>
        <div className="mt-3 bg-white/10 rounded-xl p-3 text-xs relative z-10">
          <span className="text-blue-300 font-semibold">Bu Hafta: </span>
          {WEEK_GOALS[currentWeek]}
        </div>
      </div>

      <WeekSelector currentWeek={currentWeek} onChange={setCurrentWeek} />

      {/* Days */}
      {week.days.map((day, di) => {
        const isOpen = openDays.has(di);
        const isRest = day.type === "rest";
        const pct = dayCompletionPct(di);
        const borderColor = isRest ? "border-l-gray-300" : day.type === "cardio" ? "border-l-warning" : "border-l-accent";
        const typeColors = {
          workout: "bg-accent/10 text-accent",
          cardio: "bg-warning/10 text-warning",
          rest: "bg-gray-100 text-gray-500",
        };

        return (
          <div key={di} className={`bg-white rounded-2xl shadow-sm overflow-hidden border-l-4 ${borderColor} transition-all`}>
            {/* Day Header */}
            <button onClick={() => toggleDay(di)} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition">
              <div className="flex items-center gap-3">
                <div className="text-left">
                  <div className="font-bold text-sm">{day.name}</div>
                  {pct >= 0 && (
                    <div className="w-16 h-1.5 bg-gray-100 rounded-full mt-1 overflow-hidden">
                      <div className="h-full bg-accent rounded-full transition-all" style={{ width: `${pct}%` }} />
                    </div>
                  )}
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${typeColors[day.type]}`}>{day.label}</span>
              </div>
              <ChevronDown size={18} className={`text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Day Body */}
            {isOpen && (
              <div className="px-4 pb-4 space-y-3">
                {isRest || (!day.exercises.length && day.note) ? (
                  <div className="text-center py-8">
                    <div className="text-5xl mb-3">{isRest ? "😴" : "🏃"}</div>
                    <p className="text-gray-500 text-sm">{day.note}</p>
                  </div>
                ) : (
                  <>
                    {/* Warmup */}
                    {day.warmup && (
                      <div className="flex items-start gap-2 p-3 bg-primary/5 rounded-xl border border-primary/10">
                        <Flame size={16} className="text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-xs font-bold text-primary uppercase tracking-wider">Isınma</div>
                          <div className="text-sm text-gray-600 mt-1">{day.warmup}</div>
                        </div>
                      </div>
                    )}

                    {/* Main label */}
                    <div className="flex items-center gap-2">
                      <Zap size={14} className="text-accent" />
                      <span className="text-xs font-bold text-accent uppercase tracking-wider">Ana Antrenman</span>
                    </div>

                    {/* Exercises */}
                    {day.exercises.map((ex, ei) => {
                      const exData = EXERCISES[ex.exerciseId];
                      if (!exData) return null;
                      const exKey = `w${currentWeek}d${di}e${ei}`;
                      const isDone = completed[exKey];
                      const isSelected = selectedExercise === exKey;

                      return (
                        <div key={ei} className={`rounded-xl border transition-all ${isDone ? "bg-accent/5 border-accent/20 opacity-70" : "bg-gray-50 border-gray-100"}`}>
                          <div className="flex items-start gap-3 p-3">
                            {/* Checkbox */}
                            <button onClick={() => toggleExercise(exKey)}
                              className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${isDone ? "bg-accent border-accent text-white" : "border-gray-300 hover:border-accent"}`}>
                              {isDone && <Check size={14} />}
                            </button>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <button onClick={() => setSelectedExercise(isSelected ? null : exKey)} className="text-left">
                                    <div className="font-semibold text-sm text-primary-dark">{exData.name}</div>
                                    <div className="text-xs text-gray-400">{exData.muscle}</div>
                                  </button>
                                </div>
                                <div className="text-right flex-shrink-0">
                                  <div className="text-sm font-bold text-accent">{ex.sets}×{ex.reps}</div>
                                  <div className="text-[10px] text-gray-400">Dinlenme: {ex.rest}</div>
                                </div>
                              </div>

                              {ex.duration && (
                                <div className="text-xs text-warning font-medium mt-1 bg-warning/5 px-2 py-1 rounded-lg inline-block">
                                  {ex.duration}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Expanded exercise detail with stickman */}
                          {isSelected && (
                            <div className="border-t border-gray-100 p-4 space-y-3">
                              <div className="flex items-center gap-4">
                                <div className="bg-white rounded-xl p-2 shadow-sm border">
                                  <StickmanAnimation type={exData.stickmanAnimation} size={100} />
                                </div>
                                <div className="flex-1">
                                  <div className="text-xs font-bold text-warning uppercase tracking-wider mb-1">Form İpucu</div>
                                  <p className="text-sm text-gray-600 leading-relaxed">{exData.tip}</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}

                    {/* Cooldown */}
                    {day.cooldown && (
                      <div className="flex items-start gap-2 p-3 bg-royal/5 rounded-xl border border-royal/10">
                        <Snowflake size={16} className="text-royal mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-xs font-bold text-royal uppercase tracking-wider">Soğuma & Esneme</div>
                          <div className="text-sm text-gray-600 mt-1">{day.cooldown}</div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        );
      })}

      {/* Rest Timer */}
      <RestTimer />

      {/* Actions */}
      <div className="flex gap-3 no-print">
        <button onClick={() => window.print()} className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary-dark transition">
          <Printer size={16} /> Yazdır
        </button>
        <button onClick={handleCalendar} className="flex-1 flex items-center justify-center gap-2 py-3 bg-accent text-white rounded-xl font-semibold text-sm hover:bg-green-600 transition">
          <CalendarPlus size={16} /> Takvime Ekle
        </button>
      </div>
    </div>
  );
}
