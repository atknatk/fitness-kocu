"use client";
import { useState, useEffect } from "react";
import { Target, Flame, TrendingDown, Calendar, Dumbbell, Droplets, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useUser } from "@/contexts/UserContext";
import { useWeightLogs, useStreaks } from "@/lib/supabase-hooks";
import { getWeeks, getMotivationalQuotes, getWeekGoals } from "@/data/weeks";
import { EXERCISES } from "@/data/exercises";
import { fadeInUp, staggerContainer } from "@/lib/animations";

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
    setCurrentWeek(Math.max(0, Math.min(11, diffWeeks)));
  }, [profile.programStartDate]);

  if (!userMounted) {
    return <div className="animate-pulse p-8 text-center text-gray-400">Yükleniyor...</div>;
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

  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-5">
      {/* Hero */}
      <motion.div
        variants={fadeInUp}
        className="bg-linear-to-br from-dark to-primary-dark text-white rounded-3xl p-6 md:p-8 relative overflow-hidden"
      >
        <div className="absolute top-[-50%] right-[-10%] w-72 h-72 bg-white/5 rounded-full" />
        <div className="absolute bottom-[-30%] left-[-5%] w-48 h-48 bg-primary/10 rounded-full" />
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-bold mb-1">
            Merhaba {profile.name}! 👋
          </h1>
          <p className="text-blue-200 text-sm mb-1">
            {profile.startingWeightKg} kg → {profile.goalWeightKg} kg | Hafta {currentWeek + 1}/12
          </p>
          {workoutStreak > 0 && (
            <p className="text-yellow-300 text-xs font-semibold">
              🔥 {workoutStreak} gün üst üste antrenman!
            </p>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
            {[
              { icon: Target, label: "Hedef", value: `${profile.goalWeightKg} kg`, color: "bg-blue-500/20" },
              { icon: TrendingDown, label: "Değişim", value: `${totalChange.toFixed(1)} kg`, color: "bg-green-500/20" },
              { icon: Flame, label: "İlerleme", value: `%${pct}`, color: "bg-orange-500/20" },
              { icon: Calendar, label: "Hafta", value: `${currentWeek + 1}/12`, color: "bg-purple-500/20" },
            ].map(({ icon: Icon, label, value, color }) => (
              <motion.div
                key={label}
                whileTap={{ scale: 0.95 }}
                className={`${color} rounded-2xl p-4 backdrop-blur-sm`}
              >
                <Icon size={18} className="mb-1 opacity-70" />
                <div className="text-lg font-bold">{value}</div>
                <div className="text-xs opacity-60">{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Motivational Quote */}
      <motion.div
        variants={fadeInUp}
        className="bg-linear-to-r from-primary/5 to-accent/5 border border-primary/10 rounded-2xl p-5"
      >
        <p className="italic text-gray-700 text-sm leading-relaxed">&ldquo;{quote.q}&rdquo;</p>
        <p className="text-xs text-gray-400 mt-2">— {quote.a}</p>
        <div className="mt-3 bg-white/60 rounded-xl p-3 border border-primary/10">
          <p className="text-xs font-semibold text-primary">Bu Haftanın Hedefi</p>
          <p className="text-sm text-gray-600 mt-1">{weekGoals[currentWeek]}</p>
        </div>
      </motion.div>

      {/* Today's Plan Quick View */}
      {today && (
        <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-lg flex items-center gap-2">
              <Dumbbell size={20} className="text-primary" />
              Bugünkü Program
            </h2>
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full ${
                today.type === "workout"
                  ? "bg-accent/10 text-accent"
                  : today.type === "cardio"
                    ? "bg-warning/10 text-warning"
                    : "bg-gray-100 text-gray-500"
              }`}
            >
              {today.label}
            </span>
          </div>

          {today.type === "rest" ? (
            <div className="text-center py-6">
              <div className="text-4xl mb-3">😴</div>
              <p className="text-gray-500">{today.note || "Bugün dinlenme günü. Vücudun onarım yapıyor."}</p>
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
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">
                        {exerciseData?.name || ex.exerciseId}
                      </div>
                      <div className="text-xs text-gray-400">
                        {ex.sets}×{ex.reps}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
              {today.exercises.length > 3 && (
                <p className="text-xs text-gray-400 text-center">
                  +{today.exercises.length - 3} egzersiz daha
                </p>
              )}
              <Link
                href="/antrenman"
                className="flex items-center justify-center gap-2 mt-3 py-3 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary-dark transition"
              >
                Tam Programı Gör <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </motion.div>
      )}

      {/* Quick Links */}
      <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-3">
        {[
          { href: "/antrenman", icon: Dumbbell, label: "Antrenman", desc: "Haftalık program", color: "from-accent to-green-600" },
          { href: "/beslenme", icon: Droplets, label: "Beslenme", desc: "Öğün planları", color: "from-primary to-blue-600" },
        ].map(({ href, icon: Icon, label, desc, color }) => (
          <motion.div key={href} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href={href}
              className={`block bg-linear-to-br ${color} text-white rounded-2xl p-5`}
            >
              <Icon size={24} className="mb-2 opacity-80" />
              <div className="font-bold">{label}</div>
              <div className="text-xs opacity-70">{desc}</div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Progress bar */}
      <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-5 shadow-sm">
        <div className="flex justify-between text-sm mb-2">
          <span className="font-semibold">{profile.startingWeightKg} kg</span>
          <span className="font-semibold text-accent">{profile.goalWeightKg} kg</span>
        </div>
        <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className="h-full bg-linear-to-r from-primary to-accent rounded-full"
          />
        </div>
        <p className="text-center text-xs text-gray-400 mt-2">
          {totalChange.toFixed(1)} kg değişim — {Math.abs(goalDiff - totalChange).toFixed(1)} kg kaldı
        </p>
      </motion.div>
    </motion.div>
  );
}
