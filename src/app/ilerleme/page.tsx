"use client";
import { useState, useEffect } from "react";
import { Scale, Ruler, TrendingDown, Trophy, ChevronDown, Save } from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useUser } from "@/contexts/UserContext";
import { useWeightLogs, useBodyMeasurements } from "@/lib/supabase-hooks";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { getWeeks } from "@/data/weeks";
import ProgressRing from "@/components/ProgressRing";
import MilestoneToast from "@/components/MilestoneToast";
import Confetti from "@/components/Confetti";

function AnimatedNumber({ value, decimals = 1, className }: { value: number; decimals?: number; className?: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => v.toFixed(decimals));

  useEffect(() => {
    const controls = animate(count, value, { duration: 1.2, ease: "easeOut" });
    return controls.stop;
  }, [value, count]);

  return <motion.span className={className}>{rounded}</motion.span>;
}

export default function IlerlemePage() {
  const { profile, mounted: userMounted } = useUser();
  const { logs: weightLogs, upsert: upsertWeight } = useWeightLogs();
  const { measurements, upsert: upsertMeasurement } = useBodyMeasurements();
  const [inputWeight, setInputWeight] = useState("");
  const [measureInputs, setMeasureInputs] = useState<Record<string, string>>({});
  const [toast, setToast] = useState({ show: false, message: "" });
  const [confettiTrigger, setConfettiTrigger] = useState(false);
  const [showTable, setShowTable] = useState(false);

  if (!userMounted) {
    return (
      <div className="space-y-3">
        <div className="skeleton-shimmer rounded-xl h-36" />
        <div className="skeleton-shimmer rounded-xl h-14" />
        <div className="skeleton-shimmer rounded-xl h-44" />
        <div className="skeleton-shimmer rounded-xl h-32" />
      </div>
    );
  }

  const { startingWeightKg, goalWeightKg } = profile;
  const totalToLose = startingWeightKg - goalWeightKg;

  const latestLog = weightLogs.length > 0 ? weightLogs[weightLogs.length - 1] : null;
  const currentWeight = latestLog ? latestLog.weight_kg : startingWeightKg;
  const totalLost = startingWeightKg - currentWeight;
  const progressPct = Math.min(100, Math.max(0, Math.round((totalLost / totalToLose) * 100)));

  const programWeeks = getWeeks(profile.programType);
  const totalWeeks = programWeeks.length;

  const start = new Date(profile.programStartDate);
  const now = new Date();
  const currentWeek = Math.max(0, Math.min(totalWeeks - 1, Math.floor((now.getTime() - start.getTime()) / (7 * 24 * 60 * 60 * 1000))));

  const weeklyLoss = totalToLose / totalWeeks;
  const weeks = Array.from({ length: totalWeeks }, (_, i) => {
    const expected = (startingWeightKg - (i + 1) * weeklyLoss).toFixed(1);
    const log = weightLogs.find((l) => {
      const logDate = new Date(l.date);
      const weekStart = new Date(start);
      weekStart.setDate(weekStart.getDate() + i * 7);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 7);
      return logDate >= weekStart && logDate < weekEnd;
    });
    return { week: i + 1, expected, actual: log?.weight_kg };
  });

  const chartData = weeks.map((w) => ({
    name: `H${w.week}`,
    hedef: Number(w.expected),
    gercek: w.actual || null,
  }));

  const latestMeasure = measurements.length > 0 ? measurements[0] : null;

  const logWeight = async () => {
    const val = parseFloat(inputWeight);
    if (!val || val < 30 || val > 200) return;
    const today = new Date().toISOString().split("T")[0];
    await upsertWeight(today, val);
    setInputWeight("");

    const lost = startingWeightKg - val;
    if (lost >= totalToLose) {
      setToast({ show: true, message: "HEDEFE ULASTIN! Tebrikler!" });
      setConfettiTrigger(true);
      setTimeout(() => setConfettiTrigger(false), 100);
    } else if (lost >= totalToLose * 0.75) {
      setToast({ show: true, message: `%75 hedefe ulastin! ${(totalToLose - lost).toFixed(1)} kg kaldi!` });
    } else if (lost >= totalToLose * 0.5) {
      setToast({ show: true, message: "Yariya geldin! Harika gidiyorsun!" });
    }
  };

  const saveMeasurements = async () => {
    const today = new Date().toISOString().split("T")[0];
    await upsertMeasurement({
      date: today,
      waist_cm: measureInputs.bel ? parseFloat(measureInputs.bel) : undefined,
      chest_cm: measureInputs.gogus ? parseFloat(measureInputs.gogus) : undefined,
      arm_cm: measureInputs.kol ? parseFloat(measureInputs.kol) : undefined,
      hip_cm: measureInputs.kalca ? parseFloat(measureInputs.kalca) : undefined,
      thigh_cm: measureInputs.bacak ? parseFloat(measureInputs.bacak) : undefined,
    });
    setMeasureInputs({});
    setToast({ show: true, message: "Olculer kaydedildi!" });
  };

  const measureFields = [
    { key: "bel", label: "Bel", color: "bg-accent-blue", dbKey: "waist_cm" as const },
    { key: "gogus", label: "Gogus", color: "bg-accent-green", dbKey: "chest_cm" as const },
    { key: "kol", label: "Kol", color: "bg-accent-orange", dbKey: "arm_cm" as const },
    { key: "kalca", label: "Kalca", color: "bg-accent-purple", dbKey: "hip_cm" as const },
    { key: "bacak", label: "Bacak", color: "bg-accent-cyan", dbKey: "thigh_cm" as const },
  ];

  const milestones = [
    { label: "Ilk Kilo", target: 1, emoji: "🎯" },
    { label: "5 Kg", target: 5, emoji: "🔥" },
    { label: "Yari Yol", target: totalToLose / 2, emoji: "⭐" },
    { label: "Hedef!", target: totalToLose, emoji: "🏆" },
  ];

  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-3">
      <Confetti trigger={confettiTrigger} />
      <MilestoneToast message={toast.message} show={toast.show} onClose={() => setToast({ show: false, message: "" })} />

      {/* Hero progress card */}
      <motion.div variants={fadeInUp} className="animated-gradient text-white rounded-xl p-4 relative overflow-hidden">
        <motion.div
          animate={{ opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-40%] right-[-15%] w-56 h-56 bg-accent-blue/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[-30%] left-[-10%] w-40 h-40 bg-accent-green/15 rounded-full blur-2xl"
        />

        <div className="flex items-center gap-5 relative z-10">
          <div className="relative shrink-0">
            <motion.div
              animate={{ opacity: [0.15, 0.3, 0.15] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -inset-3 rounded-full bg-accent-blue/15 blur-xl"
            />
            <ProgressRing
              value={progressPct}
              max={100}
              size={120}
              strokeWidth={10}
              gradient
              label={`%${progressPct}`}
              sublabel="ilerleme"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="text-2xl font-display font-bold">
              <AnimatedNumber value={totalLost} /> kg
            </div>
            <p className="text-xs text-white/60 mt-0.5">
              verildi — {(totalToLose - totalLost).toFixed(1)} kg kaldi
            </p>

            <div className="flex items-center gap-1.5 mt-2">
              <span className="text-[10px] bg-white/15 px-1.5 py-0.5 rounded">{startingWeightKg}</span>
              <span className="text-[10px] text-white/40">&rarr;</span>
              <span className="text-[10px] bg-white/25 px-1.5 py-0.5 rounded font-bold">{currentWeight.toFixed(1)}</span>
              <span className="text-[10px] text-white/40">&rarr;</span>
              <span className="text-[10px] bg-accent-green/30 px-1.5 py-0.5 rounded">{goalWeightKg}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Weight input - compact inline */}
      <motion.div variants={fadeInUp} className="bg-bg-card rounded-xl p-4 border border-white/4">
        <div className="flex items-center gap-3">
          <Scale size={16} className="text-accent-blue shrink-0" />
          <h2 className="font-display font-bold text-sm text-text-primary shrink-0">Kilo Kaydet</h2>
          <div className="flex-1 flex gap-2 ml-auto">
            <input
              type="number"
              step="0.1"
              placeholder="92.5"
              value={inputWeight}
              onChange={(e) => setInputWeight(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && logWeight()}
              className="w-24 px-3 py-2 bg-bg-secondary border border-white/10 rounded-lg focus:border-accent-blue focus:outline-none text-sm text-text-primary placeholder:text-text-muted text-center"
            />
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={logWeight}
              className="px-3 py-2 bg-accent-blue rounded-lg text-white transition hover:bg-accent-blue/80"
            >
              <Save size={16} />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Weight Chart */}
      <motion.div variants={fadeInUp} className="bg-bg-card rounded-xl p-4 border border-white/4">
        <h2 className="font-display font-bold text-sm mb-3 flex items-center gap-2 text-text-primary">
          <TrendingDown size={16} className="text-accent-green" /> Haftalik Takip
        </h2>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="weightGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4F8EF7" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#4F8EF7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="#4A4A5A" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#4A4A5A" fontSize={10} tickLine={false} axisLine={false} domain={["dataMin - 2", "dataMax + 2"]} />
              <Tooltip
                contentStyle={{
                  background: "#1A1A24",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "8px",
                  color: "#F0F0F5",
                  fontSize: "11px",
                  padding: "6px 10px",
                }}
                labelStyle={{ color: "#8E8EA0", fontSize: "10px" }}
              />
              <Area type="monotone" dataKey="hedef" stroke="#4A4A5A" strokeDasharray="4 4" fill="none" name="Hedef" />
              <Area type="monotone" dataKey="gercek" stroke="#4F8EF7" fill="url(#weightGrad)" strokeWidth={2} dot={{ r: 3, fill: "#4F8EF7", stroke: "#1A1A24", strokeWidth: 2 }} name="Gerceklesen" connectNulls={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Mini stat badges */}
        <div className="flex gap-2 mt-3">
          {[
            { label: "Hafta", value: `H${currentWeek + 1}` },
            { label: "Mevcut", value: `${currentWeight.toFixed(1)} kg` },
            { label: "Hedef", value: `${goalWeightKg} kg` },
          ].map((s) => (
            <div key={s.label} className="flex-1 glass-card rounded-lg px-2 py-1.5 text-center">
              <div className="text-[10px] text-text-muted">{s.label}</div>
              <div className="text-xs font-bold text-text-primary">{s.value}</div>
            </div>
          ))}
        </div>

        {/* Collapsible table */}
        <button
          onClick={() => setShowTable(!showTable)}
          className="flex items-center gap-1.5 text-[11px] text-text-muted mt-2 hover:text-text-secondary transition"
        >
          <motion.div animate={{ rotate: showTable ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown size={12} />
          </motion.div>
          Detayli tablo
        </button>
        <AnimatePresence>
          {showTable && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="overflow-hidden"
            >
              <table className="w-full text-xs mt-2">
                <thead>
                  <tr className="bg-accent-blue/10 text-accent-blue">
                    <th className="p-1.5 text-left rounded-tl-lg">Hafta</th>
                    <th className="p-1.5 text-center">Hedef</th>
                    <th className="p-1.5 text-center">Gercek</th>
                    <th className="p-1.5 text-center rounded-tr-lg">Fark</th>
                  </tr>
                </thead>
                <tbody>
                  {weeks.map((w, i) => {
                    const diff = w.actual ? (w.actual - Number(w.expected)).toFixed(1) : null;
                    return (
                      <tr key={i} className={`border-b border-white/4 ${i === currentWeek ? "bg-accent-blue/5" : ""}`}>
                        <td className="p-1.5 font-semibold text-text-primary">
                          H{w.week}{i === currentWeek && <span className="ml-1 text-accent-blue">◀</span>}
                        </td>
                        <td className="p-1.5 text-center text-text-secondary">{w.expected}</td>
                        <td className="p-1.5 text-center font-bold text-text-primary">{w.actual || "—"}</td>
                        <td className={`p-1.5 text-center font-semibold ${diff ? (Number(diff) <= 0 ? "text-accent-green" : "text-accent-red") : "text-text-muted"}`}>
                          {diff ? (Number(diff) <= 0 ? diff : `+${diff}`) : "—"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Body measurements - professional list */}
      <motion.div variants={fadeInUp} className="bg-bg-card rounded-xl p-4 border border-white/4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display font-bold text-sm flex items-center gap-2 text-text-primary">
            <Ruler size={16} className="text-accent-purple" /> Vucut Olculeri
          </h2>
          {latestMeasure && (
            <span className="text-[10px] text-text-muted">Son: {latestMeasure.date}</span>
          )}
        </div>

        <div className="space-y-2">
          {measureFields.map(({ key, label, color, dbKey }) => {
            const lastVal = latestMeasure?.[dbKey];
            return (
              <div key={key} className="flex items-center gap-3 bg-bg-secondary rounded-lg px-3 py-2 border border-white/4">
                <div className={`w-2 h-2 rounded-full ${color} shrink-0`} />
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-medium text-text-primary">{label}</span>
                  {lastVal && <span className="text-[10px] text-text-muted ml-2">son: {lastVal} cm</span>}
                </div>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    placeholder={lastVal ? String(lastVal) : "—"}
                    value={measureInputs[key] || ""}
                    onChange={(e) => setMeasureInputs((prev) => ({ ...prev, [key]: e.target.value }))}
                    className="w-16 px-2 py-1 bg-bg-card border border-white/10 rounded text-center text-xs text-text-primary focus:border-accent-purple focus:outline-none"
                  />
                  <span className="text-[10px] text-text-muted">cm</span>
                </div>
              </div>
            );
          })}
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={saveMeasurements}
          className="mt-3 w-full py-2 bg-accent-purple/15 text-accent-purple rounded-lg font-semibold text-xs hover:bg-accent-purple/25 transition border border-accent-purple/20"
        >
          Olculeri Kaydet
        </motion.button>
      </motion.div>

      {/* Milestone badges - compact */}
      <motion.div variants={fadeInUp} className="bg-bg-card rounded-xl p-4 border border-white/4">
        <h2 className="font-display font-bold text-sm mb-3 flex items-center gap-2 text-text-primary">
          <Trophy size={16} className="text-accent-gold" /> Kilometre Taslari
        </h2>
        <div className="grid grid-cols-4 gap-2">
          {milestones.map(({ label, target, emoji }) => {
            const achieved = totalLost >= target;
            return (
              <motion.div
                key={label}
                whileHover={achieved ? { scale: 1.05 } : {}}
                className={`rounded-xl p-3 text-center transition-all border relative overflow-hidden ${
                  achieved
                    ? "gradient-border border-transparent"
                    : "bg-bg-secondary border-white/4 opacity-25"
                }`}
              >
                {achieved && (
                  <motion.div
                    animate={{ opacity: [0.1, 0.25, 0.1] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-accent-gold/5 rounded-xl"
                  />
                )}
                <div className="text-2xl mb-1 relative z-10">{emoji}</div>
                <div className={`text-[10px] font-display font-bold relative z-10 ${achieved ? "text-accent-gold" : "text-text-muted"}`}>
                  {label}
                </div>
                <div className="text-[9px] text-text-muted relative z-10">{target.toFixed(1)} kg</div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
