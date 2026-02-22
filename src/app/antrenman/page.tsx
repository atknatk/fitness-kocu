"use client";
import { useState, useEffect, useCallback, useRef } from "react";
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

function ExerciseGif({ images, name }: { images: string[]; name: string }) {
  const [idx, setIdx] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (images.length <= 1) return;
    timerRef.current = setInterval(() => {
      setIdx((prev) => (prev + 1) % images.length);
    }, 1200);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [images]);

  return (
    <div className="relative w-full max-w-52 mx-auto rounded-xl bg-bg-elevated overflow-hidden">
      {/* First image always in flow to hold container height */}
      <img
        src={images[0]}
        alt={`${name} - 1`}
        className="w-full h-auto block invisible"
        loading="lazy"
      />
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`${name} - ${i + 1}`}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
          style={{ opacity: i === idx ? 1 : 0 }}
          loading="lazy"
        />
      ))}
    </div>
  );
}

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
    const w = Math.max(0, Math.min(weeks.length - 1, diffWeeks));
    setCurrentWeek(w);
    const todayIdx = new Date().getDay();
    setOpenDays(new Set([todayIdx === 0 ? 6 : todayIdx - 1]));
  }, [profile.programStartDate, weeks.length]);

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
    return (
      <div className="space-y-4">
        <div className="skeleton-shimmer rounded-2xl h-32" />
        <div className="skeleton-shimmer rounded-2xl h-14" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="skeleton-shimmer rounded-2xl h-20" />
        ))}
      </div>
    );
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
        className="animated-gradient text-white rounded-2xl p-5 relative overflow-hidden"
      >
        <motion.div
          animate={{ y: [0, -15, 0], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-30%] right-[-5%] w-48 h-48 bg-accent-blue/15 rounded-full blur-2xl"
        />
        <p className="italic text-sm leading-relaxed relative z-10 text-text-secondary">&ldquo;{quote.q}&rdquo;</p>
        <div className="mt-3 bg-white/5 rounded-xl p-3 text-xs relative z-10 border border-white/6">
          <span className="text-accent-blue font-semibold">Bu Hafta: </span>
          <span className="text-text-secondary">{weekGoals[currentWeek]}</span>
        </div>
      </motion.div>

      <WeekSelector currentWeek={currentWeek} weeks={weeks} onChange={(w) => { setCurrentWeek(w); refreshLogs(); }} />

      {/* Days */}
      {week.days.map((day, di) => {
        const isOpen = openDays.has(di);
        const isRest = day.type === "rest";
        const pct = dayCompletionPct(di);
        const borderColor = isRest ? "border-l-text-muted" : day.type === "cardio" ? "border-l-accent-orange" : "border-l-accent-green";
        const typeColors = {
          workout: "bg-accent-green/15 text-accent-green",
          cardio: "bg-accent-orange/15 text-accent-orange",
          rest: "bg-white/5 text-text-muted",
        };

        return (
          <motion.div
            key={di}
            variants={fadeInUp}
            className={`bg-bg-card rounded-2xl overflow-hidden border-l-4 ${borderColor} border border-white/4 transition-all`}
          >
            {/* Day Header */}
            <motion.button
              whileTap={{ scale: 0.99 }}
              onClick={() => toggleDay(di)}
              className="w-full flex items-center justify-between p-4 hover:bg-bg-card-hover transition"
            >
              <div className="flex items-center gap-3">
                <div className="text-left">
                  <div className="font-display font-bold text-sm text-text-primary">{day.name}</div>
                  {pct >= 0 && (
                    <div className="w-16 h-1.5 bg-white/6 rounded-full mt-1 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.5 }}
                        className={`h-full rounded-full ${pct === 100 ? "bg-accent-green shadow-[0_0_8px_rgba(0,230,118,0.4)]" : "bg-accent-blue"}`}
                      />
                    </div>
                  )}
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${typeColors[day.type]}`}>{day.label}</span>
                {pct === 100 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className="text-xs"
                  >
                    ✅
                  </motion.span>
                )}
              </div>
              <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown size={18} className="text-text-muted" />
              </motion.div>
            </motion.button>

            {/* Day Body */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
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
                        <p className="text-text-muted text-sm">{day.note}</p>
                      </div>
                    ) : (
                      <>
                        {/* Warmup */}
                        {day.warmup && (
                          <div className="flex items-start gap-2 p-3 bg-accent-blue/5 rounded-xl border border-accent-blue/10">
                            <Flame size={16} className="text-accent-blue mt-0.5 shrink-0" />
                            <div>
                              <div className="text-xs font-bold text-accent-blue uppercase tracking-wider">Isinma</div>
                              <div className="text-sm text-text-secondary mt-1">{day.warmup}</div>
                            </div>
                          </div>
                        )}

                        <div className="flex items-center gap-2">
                          <Zap size={14} className="text-accent-green" />
                          <span className="text-xs font-bold text-accent-green uppercase tracking-wider">Ana Antrenman</span>
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
                              className={`rounded-xl border transition-all ${isDone ? "bg-accent-green/5 border-accent-green/20" : "bg-bg-secondary border-white/4"}`}
                            >
                              <div className="flex items-start gap-3 p-3">
                                {/* Checkbox */}
                                <motion.button
                                  whileTap={{ scale: 0.7 }}
                                  onClick={() => toggleExercise(di, ei, ex.exerciseId)}
                                  className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${isDone ? "bg-linear-to-br from-accent-green to-accent-cyan border-transparent shadow-[0_0_12px_rgba(0,230,118,0.3)]" : "border-text-muted hover:border-accent-green"}`}
                                >
                                  <AnimatePresence>
                                    {isDone && (
                                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                                        <Check size={14} className="text-white" />
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </motion.button>

                                {/* Exercise thumbnail */}
                                {exData.images?.[0] && (
                                  <img
                                    src={exData.images[0]}
                                    alt={exData.name}
                                    className="w-10 h-10 rounded-lg object-cover bg-bg-elevated shrink-0"
                                    loading="lazy"
                                  />
                                )}

                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-2">
                                    <div>
                                      <button onClick={() => setSelectedExercise(isSelected ? null : exKey)} className="text-left">
                                        <div className={`font-semibold text-sm ${isDone ? "line-through text-text-muted" : "text-text-primary"}`}>{exData.name}</div>
                                        <div className="text-xs text-text-muted">{exData.muscle}</div>
                                      </button>
                                    </div>
                                    <div className="text-right shrink-0">
                                      <div className="text-sm font-bold text-accent-green">{ex.sets}&times;{ex.reps}</div>
                                      <div className="text-[10px] text-text-muted">Dinlenme: {ex.rest}</div>
                                    </div>
                                  </div>

                                  {ex.duration && (
                                    <div className="text-xs text-accent-orange font-medium mt-1 bg-accent-orange/5 px-2 py-1 rounded-lg inline-block">
                                      {ex.duration}
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Expanded exercise detail */}
                              <AnimatePresence>
                                {isSelected && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    className="overflow-hidden"
                                  >
                                    <div className="border-t border-white/4 p-4 space-y-3">
                                      {/* Exercise Images - animated GIF style */}
                                      {exData.images && exData.images.length > 0 && (
                                        <ExerciseGif images={exData.images} name={exData.name} />
                                      )}

                                      {/* Form Tip */}
                                      <div className="bg-accent-orange/5 border border-accent-orange/10 rounded-xl p-3">
                                        <div className="text-xs font-bold text-accent-orange uppercase tracking-wider mb-1">Form Ipucu</div>
                                        <p className="text-sm text-text-secondary leading-relaxed">{exData.tip}</p>
                                      </div>

                                      {/* YouTube Link */}
                                      {exData.youtubeUrl && (
                                        <a
                                          href={exData.youtubeUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="flex items-center justify-center gap-2 py-2.5 bg-accent-red text-white rounded-xl font-semibold text-sm hover:bg-accent-red/80 transition"
                                        >
                                          <ExternalLink size={16} />
                                          YouTube&apos;da Nasil Yapilir?
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
                          <div className="flex items-start gap-2 p-3 bg-accent-purple/5 rounded-xl border border-accent-purple/10">
                            <Snowflake size={16} className="text-accent-purple mt-0.5 shrink-0" />
                            <div>
                              <div className="text-xs font-bold text-accent-purple uppercase tracking-wider">Soguma & Esneme</div>
                              <div className="text-sm text-text-secondary mt-1">{day.cooldown}</div>
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
