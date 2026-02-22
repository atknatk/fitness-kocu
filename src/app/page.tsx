"use client";
import { useState, useEffect } from "react";
import { Target, Flame, TrendingDown, Calendar, Dumbbell, Droplets, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getStorage } from "@/lib/storage";
import { WEEKS, MOTIVATIONAL_QUOTES, WEEK_GOALS } from "@/data/weeks";

export default function Dashboard() {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [weightLog, setWeightLog] = useState<Record<string, number>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setWeightLog(getStorage("weights", {}));
    // Calculate current week from start date
    const start = new Date(2026, 1, 23);
    const now = new Date();
    const diffWeeks = Math.floor((now.getTime() - start.getTime()) / (7 * 24 * 60 * 60 * 1000));
    setCurrentWeek(Math.max(0, Math.min(11, diffWeeks)));
  }, []);

  if (!mounted) return <div className="animate-pulse p-8 text-center text-gray-400">Yükleniyor...</div>;

  const latestWeight = weightLog[`week_${currentWeek}`] || 95 - currentWeek * 0.83;
  const totalLost = (95 - latestWeight).toFixed(1);
  const pct = Math.min(100, (Number(totalLost) / 20) * 100).toFixed(0);
  const quote = MOTIVATIONAL_QUOTES[currentWeek % MOTIVATIONAL_QUOTES.length];
  const week = WEEKS[currentWeek];
  const todayIdx = new Date().getDay();
  const todayDay = todayIdx === 0 ? 6 : todayIdx - 1;
  const today = week?.days[todayDay];

  return (
    <div className="space-y-5">
      {/* Hero */}
      <div className="bg-gradient-to-br from-dark to-primary-dark text-white rounded-3xl p-6 md:p-8 relative overflow-hidden">
        <div className="absolute top-[-50%] right-[-10%] w-72 h-72 bg-white/5 rounded-full" />
        <div className="absolute bottom-[-30%] left-[-5%] w-48 h-48 bg-primary/10 rounded-full" />
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-bold mb-1">Merhaba Atakan!</h1>
          <p className="text-blue-200 text-sm mb-6">95 kg → 75 kg | Hafta {currentWeek + 1}/12</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: Target, label: "Hedef", value: "75 kg", color: "bg-blue-500/20" },
              { icon: TrendingDown, label: "Verilen", value: `${totalLost} kg`, color: "bg-green-500/20" },
              { icon: Flame, label: "İlerleme", value: `%${pct}`, color: "bg-orange-500/20" },
              { icon: Calendar, label: "Hafta", value: `${currentWeek + 1}/12`, color: "bg-purple-500/20" },
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} className={`${color} rounded-2xl p-4 backdrop-blur-sm`}>
                <Icon size={18} className="mb-1 opacity-70" />
                <div className="text-lg font-bold">{value}</div>
                <div className="text-xs opacity-60">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Motivational Quote */}
      <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10 rounded-2xl p-5">
        <p className="italic text-gray-700 text-sm leading-relaxed">&ldquo;{quote.q}&rdquo;</p>
        <p className="text-xs text-gray-400 mt-2">— {quote.a}</p>
        <div className="mt-3 bg-white/60 rounded-xl p-3 border border-primary/10">
          <p className="text-xs font-semibold text-primary">Bu Haftanın Hedefi</p>
          <p className="text-sm text-gray-600 mt-1">{WEEK_GOALS[currentWeek]}</p>
        </div>
      </div>

      {/* Today's Plan Quick View */}
      {today && (
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-lg flex items-center gap-2">
              <Dumbbell size={20} className="text-primary" />
              Bugünkü Program
            </h2>
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
              today.type === "workout" ? "bg-accent/10 text-accent" :
              today.type === "cardio" ? "bg-warning/10 text-warning" :
              "bg-gray-100 text-gray-500"
            }`}>
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
              {today.exercises.slice(0, 3).map((ex, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">{i + 1}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">{ex.exerciseId.replace(/_/g, " ")}</div>
                    <div className="text-xs text-gray-400">{ex.sets}×{ex.reps}</div>
                  </div>
                </div>
              ))}
              {today.exercises.length > 3 && (
                <p className="text-xs text-gray-400 text-center">+{today.exercises.length - 3} egzersiz daha</p>
              )}
              <Link href="/antrenman"
                className="flex items-center justify-center gap-2 mt-3 py-3 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary-dark transition">
                Tam Programı Gör <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Quick Links */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { href: "/antrenman", icon: Dumbbell, label: "Antrenman", desc: "Haftalık program", color: "from-accent to-green-600" },
          { href: "/beslenme", icon: Droplets, label: "Beslenme", desc: "Öğün planları", color: "from-primary to-blue-600" },
        ].map(({ href, icon: Icon, label, desc, color }) => (
          <Link key={href} href={href}
            className={`bg-gradient-to-br ${color} text-white rounded-2xl p-5 hover:scale-[1.02] transition-transform`}>
            <Icon size={24} className="mb-2 opacity-80" />
            <div className="font-bold">{label}</div>
            <div className="text-xs opacity-70">{desc}</div>
          </Link>
        ))}
      </div>

      {/* Progress bar */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <div className="flex justify-between text-sm mb-2">
          <span className="font-semibold">95 kg</span>
          <span className="font-semibold text-accent">75 kg</span>
        </div>
        <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000"
            style={{ width: `${pct}%` }} />
        </div>
        <p className="text-center text-xs text-gray-400 mt-2">{totalLost} kg verildi — {(20 - Number(totalLost)).toFixed(1)} kg kaldı</p>
      </div>
    </div>
  );
}
