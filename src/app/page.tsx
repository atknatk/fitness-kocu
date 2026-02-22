"use client";
import { useState, useEffect } from "react";
import { Target, Flame, TrendingDown, Calendar, Dumbbell, Droplets, ArrowRight } from "lucide-react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import Link from "next/link";
import { useUser } from "@/contexts/UserContext";
import { useWeightLogs, useStreaks } from "@/lib/supabase-hooks";
import { getWeeks, getMotivationalQuotes, getWeekGoals } from "@/data/weeks";
import { EXERCISES } from "@/data/exercises";
import { fadeInUp, staggerContainer } from "@/lib/animations";

function AnimatedNumber({ value, decimals = 1 }: { value: number; decimals?: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => v.toFixed(decimals));

  useEffect(() => {
    const controls = animate(count, value, { duration: 1.2, ease: "easeOut" });
    return controls.stop;
  }, [value, count]);

  return <motion.span>{rounded}</motion.span>;
}

export default function Dashboard() {
  const { profile, mounted: userMounted } = useUser();
  const { logs: weightLogs } = useWeightLogs();
  const { streaks } = useStreaks();
  const [currentWeek, setCurrentWeek] = useState(0);

  const weeks = getWeeks(profile.programType);
  const quotes = getMotivationalQuotes(profile.programType);
  const weekGoals = getWeekGoals(profile.programType);

  useEffect(() => {
    const start = new Date(profile.programStartDate);
    const now = new Date();
    const diffWeeks = Math.floor((now.getTime() - start.getTime()) / (7 * 24 * 60 * 60 * 1000));
    setCurrentWeek(Math.max(0, Math.min(weeks.length - 1, diffWeeks)));
  }, [profile.programStartDate, weeks.length]);

  if (!userMounted) {
    return (
      <div className="space-y-5">
        <div className="skeleton-shimmer rounded-3xl h-56" />
        <div className="skeleton-shimmer rounded-2xl h-24" />
        <div className="grid grid-cols-2 gap-3">
          <div className="skeleton-shimmer rounded-2xl h-32" />
          <div className="skeleton-shimmer rounded-2xl h-32" />
        </div>
        <div className="skeleton-shimmer rounded-2xl h-20" />
      </div>
    );
  }

  const latestWeight = weightLogs.length > 0
    ? weightLogs[weightLogs.length - 1].weight_kg
    : profile.startingWeightKg;
  const totalChange = profile.startingWeightKg - latestWeight;
  const goalDiff = profile.startingWeightKg - profile.goalWeightKg;
  const pct = goalDiff > 0 ? Math.min(100, Math.round((totalChange / goalDiff) * 100)) : 0;
  const quote = quotes[currentWeek % quotes.length];
  const week = weeks[currentWeek];
  const todayIdx = new Date().getDay();
  const todayDay = todayIdx === 0 ? 6 : todayIdx - 1;
  const today = week?.days[todayDay];
  const workoutStreak = streaks["workout"]?.current_streak || 0;

  const statCards = [
    { icon: Target, label: "Hedef", value: `${profile.goalWeightKg} kg`, color: "from-accent-blue/20 to-accent-cyan/10", accent: "bg-accent-blue" },
    { icon: TrendingDown, label: "Degisim", value: `${totalChange.toFixed(1)} kg`, color: "from-accent-green/20 to-accent-lime/10", accent: "bg-accent-green" },
    { icon: Flame, label: "Ilerleme", value: `%${pct}`, color: "from-accent-orange/20 to-accent-gold/10", accent: "bg-accent-orange" },
    { icon: Calendar, label: "Hafta", value: `${currentWeek + 1}/${weeks.length}`, color: "from-accent-purple/20 to-accent-blue/10", accent: "bg-accent-purple" },
  ];

  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-5">
      {/* Hero */}
      <motion.div
        variants={fadeInUp}
        className="animated-gradient text-white rounded-3xl p-6 md:p-8 relative overflow-hidden"
      >
        {/* Floating blur orbs */}
        <motion.div
          animate={{ y: [0, -20, 0], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-20%] right-[-10%] w-72 h-72 bg-accent-blue/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 15, 0], opacity: [0.05, 0.12, 0.05] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[-20%] left-[-5%] w-48 h-48 bg-accent-green/15 rounded-full blur-2xl"
        />
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-display font-bold mb-1">
            Merhaba {profile.name}!
          </h1>
          <p className="text-accent-blue/70 text-sm mb-1">
            {profile.startingWeightKg} kg &rarr; {profile.goalWeightKg} kg | Hafta {currentWeek + 1}/{weeks.length}
          </p>

          {/* Streak counter with fire animation */}
          {workoutStreak > 0 && (
            <motion.div
              className="flex items-center gap-2 mt-2"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.span
                animate={{
                  scale: [1, 1.25, 1],
                  rotate: [0, -8, 8, 0],
                }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="text-2xl"
              >
                🔥
              </motion.span>
              <span className="text-accent-gold font-display font-bold text-lg text-glow-gold">
                {workoutStreak} gun seri!
              </span>
            </motion.div>
          )}

          {/* Stat cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
            {statCards.map(({ icon: Icon, label, value, color, accent }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.08, type: "spring", stiffness: 300, damping: 25 }}
                whileTap={{ scale: 0.95 }}
                className="glass-card rounded-2xl p-4 relative overflow-hidden"
              >
                <div className={`absolute top-0 left-0 right-0 h-0.5 ${accent}`} />
                <Icon size={18} className="mb-1 text-text-secondary" />
                <div className="text-lg font-display font-bold text-text-primary">{value}</div>
                <div className="text-xs text-text-muted">{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Motivational Quote */}
      <motion.div
        variants={fadeInUp}
        className="glass-card rounded-2xl p-5"
      >
        <p className="italic text-text-secondary text-sm leading-relaxed">&ldquo;{quote.q}&rdquo;</p>
        <p className="text-xs text-text-muted mt-2">&mdash; {quote.a}</p>
        <div className="mt-3 bg-accent-blue/5 rounded-xl p-3 border border-accent-blue/10">
          <p className="text-xs font-semibold text-accent-blue">Bu Haftanin Hedefi</p>
          <p className="text-sm text-text-secondary mt-1">{weekGoals[currentWeek]}</p>
        </div>
      </motion.div>

      {/* Today's Plan Quick View */}
      {today && (
        <motion.div variants={fadeInUp} className="bg-bg-card rounded-2xl p-5 border border-white/4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display font-bold text-lg flex items-center gap-2 text-text-primary">
              <Dumbbell size={20} className="text-accent-blue" />
              Bugunku Program
            </h2>
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full ${
                today.type === "workout"
                  ? "bg-accent-green/15 text-accent-green"
                  : today.type === "cardio"
                    ? "bg-accent-orange/15 text-accent-orange"
                    : "bg-white/5 text-text-muted"
              }`}
            >
              {today.label}
            </span>
          </div>

          {today.type === "rest" ? (
            <div className="text-center py-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-4xl mb-3"
              >
                😴
              </motion.div>
              <p className="text-text-muted">{today.note || "Bugun dinlenme gunu. Vucudun onarim yapiyor."}</p>
            </div>
          ) : (
            <div className="space-y-2">
              {today.exercises.slice(0, 3).map((ex, i) => {
                const exerciseData = EXERCISES[ex.exerciseId];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 p-3 bg-bg-secondary rounded-xl border border-white/4"
                  >
                    {/* Exercise thumbnail */}
                    {exerciseData?.images?.[0] && (
                      <img
                        src={exerciseData.images[0]}
                        alt={exerciseData.name}
                        className="w-10 h-10 rounded-lg object-cover bg-bg-elevated"
                        loading="lazy"
                      />
                    )}
                    <div className="w-8 h-8 rounded-lg bg-accent-blue/10 flex items-center justify-center text-accent-blue font-bold text-sm">
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm text-text-primary truncate">
                        {exerciseData?.name || ex.exerciseId}
                      </div>
                      <div className="text-xs text-text-muted">
                        {ex.sets}&times;{ex.reps}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
              {today.exercises.length > 3 && (
                <p className="text-xs text-text-muted text-center">
                  +{today.exercises.length - 3} egzersiz daha
                </p>
              )}
              <Link
                href="/antrenman"
                className="flex items-center justify-center gap-2 mt-3 py-3 bg-linear-to-r from-accent-blue to-accent-green text-white rounded-xl font-semibold text-sm shadow-[0_4px_20px_rgba(79,142,247,0.3)] hover:shadow-[0_4px_30px_rgba(79,142,247,0.5)] transition-shadow"
              >
                Tam Programi Gor <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </motion.div>
      )}

      {/* Quick Links */}
      <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-3">
        {[
          { href: "/antrenman", icon: Dumbbell, label: "Antrenman", desc: "Haftalik program", color: "from-accent-green to-green-600" },
          { href: "/beslenme", icon: Droplets, label: "Beslenme", desc: "Ogun planlari", color: "from-accent-blue to-blue-600" },
        ].map(({ href, icon: Icon, label, desc, color }) => (
          <motion.div key={href} whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.97 }}>
            <Link
              href={href}
              className={`block bg-linear-to-br ${color} text-white rounded-2xl p-5 relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-black/10" />
              <div className="relative z-10">
                <Icon size={24} className="mb-2 opacity-80" />
                <div className="font-display font-bold">{label}</div>
                <div className="text-xs opacity-70">{desc}</div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Progress bar */}
      <motion.div variants={fadeInUp} className="bg-bg-card rounded-2xl p-5 border border-white/4">
        <div className="flex justify-between text-sm mb-2">
          <span className="font-semibold text-text-secondary">{profile.startingWeightKg} kg</span>
          <span className="font-semibold text-accent-green">{profile.goalWeightKg} kg</span>
        </div>
        <div className="h-4 bg-white/6 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            className="h-full bg-linear-to-r from-accent-blue to-accent-green rounded-full shadow-[0_0_12px_rgba(0,230,118,0.4)]"
          />
        </div>
        <p className="text-center text-xs text-text-muted mt-2">
          <AnimatedNumber value={totalChange} /> kg degisim &mdash; {Math.abs(goalDiff - totalChange).toFixed(1)} kg kaldi
        </p>
      </motion.div>
    </motion.div>
  );
}
