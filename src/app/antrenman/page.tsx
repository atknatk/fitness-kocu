"use client";
import { useState, useEffect, useCallback } from "react";
import { ChevronDown, Check, Flame, Snowflake, Zap, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import WeekSelector from "@/components/WeekSelector";
import RestTimer from "@/components/RestTimer";
import Confetti from "@/components/Confetti";
import { useUser } from "@/contexts/UserContext";
import { useAllWorkoutLogs } from "@/lib/supabase-hooks";
import { getWeeks, getWeekGoals, getMotivationalQuotes } from "@/data/weeks";
import { EXERCISES } from "@/data/exercises";
import { supabase } from "@/lib/supabase";
import { getUserKey } from "@/lib/user";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function AntrenmanPage() {
  const { profile, mounted: userMounted } = useUser();
  const [currentWeek, setCurrentWeek] = useState(0);
  const [openDays, setOpenDays] = useState<Set<number>>(new Set());
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [localCompleted, setLocalCompleted] = useState<Record<string, boolean>>({});
  const [confettiTrigger, setConfettiTrigger] = useState(false);

  const weeks = getWeeks(profile.programType);
  const weekGoals = getWeekGoals(profile.programType);
  const quotes = getMotivationalQuotes(profile.programType);
  const { logs: workoutLogs, refresh: refreshLogs } = useAllWorkoutLogs(currentWeek);

  useEffect(() => {
    const start = new Date(profile.programStartDate);
    const now = new Date();
    const diffWeeks = Math.floor((now.getTime() - start.getTime()) / (7 * 24 * 60 * 60 * 1000));
    const w = Math.max(0, Math.min(11, diffWeeks));
    setCurrentWeek(w);
    const todayIdx = new Date().getDay();
    setOpenDays(new Set([todayIdx === 0 ? 6 : todayIdx - 1]));
  }, [profile.programStartDate]);

  // Merge remote logs into local state
  useEffect(() => {
    setLocalCompleted(workoutLogs);
  }, [workoutLogs]);

  const toggleExercise = useCallback(
    async (dayIndex: number, exerciseIndex: number, exerciseId: string) => {
      const key = `w${currentWeek}d${dayIndex}e${exerciseIndex}`;
      const newVal = !localCompleted[key];
      setLocalCompleted((prev) => ({ ...prev, [key]: newVal }));

      if (newVal && navigator.vibrate) navigator.vibrate(50);

      const today = new Date().toISOString().split("T")[0];
      await supabase.from("workout_logs").upsert(
        {
          user_key: getUserKey(),
          date: today,
          week_number: currentWeek,
          day_index: dayIndex,
          exercise_id: exerciseId,
          exercise_index: exerciseIndex,
          completed: newVal,
        },
        { onConflict: "user_key,date,week_number,day_index,exercise_index" }
      );

      // Check if all exercises in the day are done
      const day = weeks[currentWeek].days[dayIndex];
      const allDone = day.exercises.every((_, ei) => {
        const k = `w${currentWeek}d${dayIndex}e${ei}`;
        return ei === exerciseIndex ? newVal : localCompleted[k];
      });
      if (allDone && day.exercises.length > 0) {
        setConfettiTrigger(true);
        setTimeout(() => setConfettiTrigger(false), 100);
      }
    },
    [currentWeek, localCompleted, weeks]
  );

  if (!userMounted) {
    return <div className="animate-pulse p-8 text-center text-gray-400">Yükleniyor...</div>;
  }

  const week = weeks[currentWeek];
  const quote = quotes[currentWeek % quotes.length];

  const toggleDay = (i: number) => {
    const next = new Set(openDays);
    next.has(i) ? next.delete(i) : next.add(i);
    setOpenDays(next);
  };

  const dayCompletionPct = (dayIdx: number) => {
    const day = week.days[dayIdx];
    if (!day.exercises.length) return -1;
    const total = day.exercises.length;
    const done = day.exercises.filter((_, ei) => localCompleted[`w${currentWeek}d${dayIdx}e${ei}`]).length;
    return Math.round((done / total) * 100);
  };

  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-4">
      <Confetti trigger={confettiTrigger} />

      {/* Motivation banner */}
      <motion.div
        variants={fadeInUp}
        className="bg-linear-to-br from-dark to-primary-dark text-white rounded-2xl p-5 relative overflow-hidden"
      >
        <div className="absolute top-[-30%] right-[-5%] w-48 h-48 bg-white/5 rounded-full" />
        <p className="italic text-sm leading-relaxed relative z-10">&ldquo;{quote.q}&rdquo;</p>
        <div className="mt-3 bg-white/10 rounded-xl p-3 text-xs relative z-10">
          <span className="text-blue-300 font-semibold">Bu Hafta: </span>
          {weekGoals[currentWeek]}
        </div>
      </motion.div>

      <WeekSelector currentWeek={currentWeek} weeks={weeks} onChange={(w) => { setCurrentWeek(w); refreshLogs(); }} />

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
          <motion.div
            key={di}
            variants={fadeInUp}
            className={`bg-white rounded-2xl shadow-sm overflow-hidden border-l-4 ${borderColor} transition-all`}
          >
            {/* Day Header */}
            <motion.button
              whileTap={{ scale: 0.99 }}
              onClick={() => toggleDay(di)}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-3">
                <div className="text-left">
                  <div className="font-bold text-sm">{day.name}</div>
                  {pct >= 0 && (
                    <div className="w-16 h-1.5 bg-gray-100 rounded-full mt-1 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.5 }}
                        className="h-full bg-accent rounded-full"
                      />
                    </div>
                  )}
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${typeColors[day.type]}`}>{day.label}</span>
                {pct === 100 && <span className="text-xs">✅</span>}
              </div>
              <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown size={18} className="text-gray-400" />
              </motion.div>
            </motion.button>

            {/* Day Body */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 space-y-3">
                    {isRest || (!day.exercises.length && day.note) ? (
                      <div className="text-center py-8">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                          className="text-5xl mb-3"
                        >
                          {isRest ? "😴" : "🏃"}
                        </motion.div>
                        <p className="text-gray-500 text-sm">{day.note}</p>
                      </div>
                    ) : (
                      <>
                        {/* Warmup */}
                        {day.warmup && (
                          <div className="flex items-start gap-2 p-3 bg-primary/5 rounded-xl border border-primary/10">
                            <Flame size={16} className="text-primary mt-0.5 shrink-0" />
                            <div>
                              <div className="text-xs font-bold text-primary uppercase tracking-wider">Isınma</div>
                              <div className="text-sm text-gray-600 mt-1">{day.warmup}</div>
                            </div>
                          </div>
                        )}

                        <div className="flex items-center gap-2">
                          <Zap size={14} className="text-accent" />
                          <span className="text-xs font-bold text-accent uppercase tracking-wider">Ana Antrenman</span>
                        </div>

                        {/* Exercises */}
                        {day.exercises.map((ex, ei) => {
                          const exData = EXERCISES[ex.exerciseId];
                          if (!exData) return null;
                          const exKey = `w${currentWeek}d${di}e${ei}`;
                          const isDone = localCompleted[exKey];
                          const isSelected = selectedExercise === exKey;

                          return (
                            <motion.div
                              key={ei}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: ei * 0.05 }}
                              className={`rounded-xl border transition-all ${isDone ? "bg-accent/5 border-accent/20" : "bg-gray-50 border-gray-100"}`}
                            >
                              <div className="flex items-start gap-3 p-3">
                                {/* Checkbox */}
                                <motion.button
                                  whileTap={{ scale: 0.8 }}
                                  onClick={() => toggleExercise(di, ei, ex.exerciseId)}
                                  className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${isDone ? "bg-accent border-accent text-white" : "border-gray-300 hover:border-accent"}`}
                                >
                                  <AnimatePresence>
                                    {isDone && (
                                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                                        <Check size={14} />
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </motion.button>

                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-2">
                                    <div>
                                      <button onClick={() => setSelectedExercise(isSelected ? null : exKey)} className="text-left">
                                        <div className={`font-semibold text-sm ${isDone ? "line-through text-gray-400" : "text-primary-dark"}`}>{exData.name}</div>
                                        <div className="text-xs text-gray-400">{exData.muscle}</div>
                                      </button>
                                    </div>
                                    <div className="text-right shrink-0">
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

                              {/* Expanded exercise detail with GIF + YouTube */}
                              <AnimatePresence>
                                {isSelected && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden"
                                  >
                                    <div className="border-t border-gray-100 p-4 space-y-3">
                                      {/* Exercise Images */}
                                      {exData.images && exData.images.length > 0 && (
                                        <div className="flex gap-2 justify-center">
                                          {exData.images.map((src, imgIdx) => (
                                            <img
                                              key={imgIdx}
                                              src={src}
                                              alt={`${exData.name} - ${imgIdx + 1}`}
                                              className="w-1/2 max-w-[160px] object-contain rounded-xl"
                                              loading="lazy"
                                            />
                                          ))}
                                        </div>
                                      )}

                                      {/* Form Tip */}
                                      <div className="bg-warning/5 border border-warning/10 rounded-xl p-3">
                                        <div className="text-xs font-bold text-warning uppercase tracking-wider mb-1">Form İpucu</div>
                                        <p className="text-sm text-gray-600 leading-relaxed">{exData.tip}</p>
                                      </div>

                                      {/* YouTube Link */}
                                      {exData.youtubeUrl && (
                                        <a
                                          href={exData.youtubeUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="flex items-center justify-center gap-2 py-2.5 bg-red-500 text-white rounded-xl font-semibold text-sm hover:bg-red-600 transition"
                                        >
                                          <ExternalLink size={16} />
                                          YouTube&apos;da Nasıl Yapılır?
                                        </a>
                                      )}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </motion.div>
                          );
                        })}

                        {/* Cooldown */}
                        {day.cooldown && (
                          <div className="flex items-start gap-2 p-3 bg-royal/5 rounded-xl border border-royal/10">
                            <Snowflake size={16} className="text-royal mt-0.5 shrink-0" />
                            <div>
                              <div className="text-xs font-bold text-royal uppercase tracking-wider">Soğuma & Esneme</div>
                              <div className="text-sm text-gray-600 mt-1">{day.cooldown}</div>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}

      {/* Rest Timer */}
      <motion.div variants={fadeInUp}>
        <RestTimer />
      </motion.div>
    </motion.div>
  );
}
