"use client";
import { useState } from "react";
import { Scale, Ruler, TrendingDown, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { useUser } from "@/contexts/UserContext";
import { useWeightLogs, useBodyMeasurements } from "@/lib/supabase-hooks";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import ProgressRing from "@/components/ProgressRing";
import MilestoneToast from "@/components/MilestoneToast";
import Confetti from "@/components/Confetti";

export default function IlerlemePage() {
  const { profile, mounted: userMounted } = useUser();
  const { logs: weightLogs, upsert: upsertWeight } = useWeightLogs();
  const { measurements, upsert: upsertMeasurement } = useBodyMeasurements();
  const [inputWeight, setInputWeight] = useState("");
  const [measureInputs, setMeasureInputs] = useState<Record<string, string>>({});
  const [toast, setToast] = useState({ show: false, message: "" });
  const [confettiTrigger, setConfettiTrigger] = useState(false);

  if (!userMounted) {
    return <div className="animate-pulse p-8 text-center text-gray-400">Yükleniyor...</div>;
  }

  const { startingWeightKg, goalWeightKg } = profile;
  const totalToLose = startingWeightKg - goalWeightKg;

  // Get latest weight from logs
  const latestLog = weightLogs.length > 0 ? weightLogs[weightLogs.length - 1] : null;
  const currentWeight = latestLog ? latestLog.weight_kg : startingWeightKg;
  const totalLost = startingWeightKg - currentWeight;
  const progressPct = Math.min(100, Math.max(0, (totalLost / totalToLose) * 100));

  // Current week from program start
  const start = new Date(profile.programStartDate);
  const now = new Date();
  const currentWeek = Math.max(0, Math.min(11, Math.floor((now.getTime() - start.getTime()) / (7 * 24 * 60 * 60 * 1000))));

  // Expected weight per week (linear)
  const weeklyLoss = totalToLose / 12;
  const weeks = Array.from({ length: 12 }, (_, i) => {
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

  // Latest measurement
  const latestMeasure = measurements.length > 0 ? measurements[0] : null;

  const logWeight = async () => {
    const val = parseFloat(inputWeight);
    if (!val || val < 30 || val > 200) return;
    const today = new Date().toISOString().split("T")[0];
    await upsertWeight(today, val);
    setInputWeight("");

    // Check milestones
    const lost = startingWeightKg - val;
    if (lost >= totalToLose) {
      setToast({ show: true, message: "HEDEFE ULAŞTIN! Tebrikler!" });
      setConfettiTrigger(true);
      setTimeout(() => setConfettiTrigger(false), 100);
    } else if (lost >= totalToLose * 0.75) {
      setToast({ show: true, message: `%75 hedefe ulaştın! ${(totalToLose - lost).toFixed(1)} kg kaldı!` });
    } else if (lost >= totalToLose * 0.5) {
      setToast({ show: true, message: "Yarıya geldin! Harika gidiyorsun!" });
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
    setToast({ show: true, message: "Ölçüler kaydedildi!" });
  };

  const measureFields = [
    { key: "bel", label: "Bel", emoji: "📏", dbKey: "waist_cm" as const },
    { key: "gogus", label: "Göğüs", emoji: "📐", dbKey: "chest_cm" as const },
    { key: "kol", label: "Kol", emoji: "💪", dbKey: "arm_cm" as const },
    { key: "kalca", label: "Kalça", emoji: "📏", dbKey: "hip_cm" as const },
    { key: "bacak", label: "Bacak", emoji: "🦵", dbKey: "thigh_cm" as const },
  ];

  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-4">
      <Confetti trigger={confettiTrigger} />
      <MilestoneToast message={toast.message} show={toast.show} onClose={() => setToast({ show: false, message: "" })} />

      {/* Big progress card */}
      <motion.div variants={fadeInUp} className="bg-linear-to-br from-primary to-accent text-white rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-[-30%] right-[-5%] w-48 h-48 bg-white/5 rounded-full" />
        <div className="flex items-center gap-6 relative z-10">
          <ProgressRing
            value={Math.round(progressPct)}
            max={100}
            size={110}
            strokeWidth={10}
            color="#FFFFFF"
            label="Hedefe"
            sublabel="ilerleme"
          />
          <div className="flex-1">
            <div className="text-3xl font-bold mb-1">{totalLost.toFixed(1)} kg</div>
            <p className="text-sm opacity-80">verildi — {(totalToLose - totalLost).toFixed(1)} kg kaldı</p>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-xs bg-white/20 px-2 py-1 rounded-lg">{startingWeightKg} kg</span>
              <span className="text-xs opacity-60">→</span>
              <span className="text-xs bg-white/20 px-2 py-1 rounded-lg font-bold">{currentWeight.toFixed(1)} kg</span>
              <span className="text-xs opacity-60">→</span>
              <span className="text-xs bg-white/20 px-2 py-1 rounded-lg">{goalWeightKg} kg</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Weight input */}
      <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-5 shadow-sm">
        <h2 className="font-bold text-lg mb-3 flex items-center gap-2">
          <Scale size={20} className="text-primary" /> Kilo Kaydet
        </h2>
        <p className="text-sm text-gray-400 mb-3">Her Pazartesi sabahı, aç karnına tartıl:</p>
        <div className="flex gap-2">
          <input
            type="number"
            step="0.1"
            placeholder="Kilonuzu girin (kg)"
            value={inputWeight}
            onChange={(e) => setInputWeight(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && logWeight()}
            className="flex-1 px-4 py-3 border-2 border-primary/20 rounded-xl focus:border-primary focus:outline-none text-lg"
          />
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={logWeight}
            className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition"
          >
            Kaydet
          </motion.button>
        </div>
      </motion.div>

      {/* Weight table */}
      <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-5 shadow-sm overflow-x-auto">
        <h2 className="font-bold text-lg mb-3 flex items-center gap-2">
          <TrendingDown size={20} className="text-accent" /> Haftalık Takip
        </h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-primary text-white">
              <th className="p-2 text-left rounded-tl-lg">Hafta</th>
              <th className="p-2 text-center">Hedef</th>
              <th className="p-2 text-center">Gerçekleşen</th>
              <th className="p-2 text-center">Fark</th>
              <th className="p-2 text-center rounded-tr-lg">Grafik</th>
            </tr>
          </thead>
          <tbody>
            {weeks.map((w, i) => {
              const diff = w.actual ? (w.actual - Number(w.expected)).toFixed(1) : null;
              const barPct = w.actual ? Math.max(5, ((startingWeightKg - w.actual) / totalToLose) * 100) : 0;
              return (
                <tr
                  key={i}
                  className={`${i % 2 === 0 ? "bg-gray-50" : ""} ${i === currentWeek ? "ring-2 ring-primary/30 bg-primary/5" : ""}`}
                >
                  <td className="p-2 font-semibold">
                    Hafta {w.week}
                    {i === currentWeek && <span className="ml-1 text-xs text-primary">◀</span>}
                  </td>
                  <td className="p-2 text-center">{w.expected} kg</td>
                  <td className="p-2 text-center font-bold">{w.actual ? `${w.actual} kg` : "—"}</td>
                  <td
                    className={`p-2 text-center font-semibold ${diff ? (Number(diff) <= 0 ? "text-accent" : "text-danger") : "text-gray-300"}`}
                  >
                    {diff ? (Number(diff) <= 0 ? diff : `+${diff}`) : "—"}
                  </td>
                  <td className="p-2">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${barPct}%` }}
                        transition={{ duration: 0.5, delay: i * 0.05 }}
                        className="h-full bg-linear-to-r from-primary to-accent rounded-full"
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </motion.div>

      {/* Body measurements */}
      <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-5 shadow-sm">
        <h2 className="font-bold text-lg mb-3 flex items-center gap-2">
          <Ruler size={20} className="text-royal" /> Vücut Ölçüleri
        </h2>
        <p className="text-xs text-gray-400 mb-3">Her ayın 1'inde ölç ve güncelle:</p>

        {latestMeasure && (
          <div className="mb-4 p-3 bg-royal/5 rounded-xl border border-royal/10">
            <div className="text-xs text-royal font-semibold mb-2">Son Ölçüm: {latestMeasure.date}</div>
            <div className="flex flex-wrap gap-3 text-sm">
              {measureFields.map(({ label, dbKey }) => {
                const val = latestMeasure[dbKey];
                return val ? (
                  <span key={dbKey} className="text-gray-600">
                    {label}: <strong>{val} cm</strong>
                  </span>
                ) : null;
              })}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {measureFields.map(({ key, label, emoji }) => (
            <div key={key} className="bg-gray-50 rounded-xl p-4 text-center">
              <div className="text-2xl mb-1">{emoji}</div>
              <div className="text-xs text-gray-500 mb-2">{label}</div>
              <input
                type="number"
                placeholder="cm"
                value={measureInputs[key] || ""}
                onChange={(e) => setMeasureInputs((prev) => ({ ...prev, [key]: e.target.value }))}
                className="w-20 px-2 py-1.5 border rounded-lg text-center text-sm focus:border-primary focus:outline-none"
              />
              <div className="text-[10px] text-gray-400 mt-1">cm</div>
            </div>
          ))}
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={saveMeasurements}
          className="mt-4 w-full py-3 bg-royal text-white rounded-xl font-semibold hover:bg-royal/90 transition"
        >
          Ölçüleri Kaydet
        </motion.button>
      </motion.div>

      {/* Milestone badges */}
      <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-5 shadow-sm">
        <h2 className="font-bold text-lg mb-3 flex items-center gap-2">
          <Trophy size={20} className="text-warning" /> Kilometre Taşları
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "İlk Kilo", target: 1, emoji: "🎯" },
            { label: "5 Kg", target: 5, emoji: "🔥" },
            { label: "Yarı Yol", target: totalToLose / 2, emoji: "⭐" },
            { label: "Hedef!", target: totalToLose, emoji: "🏆" },
          ].map(({ label, target, emoji }) => {
            const achieved = totalLost >= target;
            return (
              <motion.div
                key={label}
                whileHover={{ scale: 1.05 }}
                className={`rounded-xl p-4 text-center border-2 transition-all ${
                  achieved ? "bg-warning/10 border-warning/30" : "bg-gray-50 border-gray-100 opacity-50"
                }`}
              >
                <div className="text-3xl mb-1">{emoji}</div>
                <div className={`text-sm font-bold ${achieved ? "text-warning" : "text-gray-400"}`}>{label}</div>
                <div className="text-xs text-gray-400">{target.toFixed(1)} kg</div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
