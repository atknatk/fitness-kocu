"use client";
import { useState, useEffect } from "react";
import { Scale, Ruler, TrendingDown } from "lucide-react";
import { getStorage, setStorage } from "@/lib/storage";

export default function IlerlemePage() {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [weightLog, setWeightLog] = useState<Record<string, number>>({});
  const [measures, setMeasures] = useState<Record<string, string>>({});
  const [inputWeight, setInputWeight] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setWeightLog(getStorage("weights", {}));
    setMeasures(getStorage("measures", {}));
    const start = new Date(2026, 1, 23);
    const now = new Date();
    const diffWeeks = Math.floor((now.getTime() - start.getTime()) / (7 * 24 * 60 * 60 * 1000));
    setCurrentWeek(Math.max(0, Math.min(11, diffWeeks)));
  }, []);

  if (!mounted) return <div className="animate-pulse p-8 text-center text-gray-400">Yükleniyor...</div>;

  const logWeight = () => {
    const val = parseFloat(inputWeight);
    if (!val || val < 50 || val > 150) return;
    const next = { ...weightLog, [`week_${currentWeek}`]: val };
    setWeightLog(next);
    setStorage("weights", next);
    setInputWeight("");
  };

  const updateMeasure = (key: string, val: string) => {
    const next = { ...measures, [key]: val };
    setMeasures(next);
    setStorage("measures", next);
  };

  const weeks = Array.from({ length: 12 }, (_, i) => ({
    week: i + 1,
    expected: (95 - (i + 1) * 0.83).toFixed(1),
    actual: weightLog[`week_${i}`],
  }));

  const latestWeight = weightLog[`week_${currentWeek}`] || 95 - currentWeek * 0.83;
  const totalLost = (95 - latestWeight).toFixed(1);
  const pct = Math.min(100, (Number(totalLost) / 20) * 100).toFixed(0);

  return (
    <div className="space-y-4">
      {/* Big progress card */}
      <div className="bg-gradient-to-br from-primary to-accent text-white rounded-2xl p-6 text-center">
        <div className="text-6xl font-bold mb-1">{pct}%</div>
        <div className="h-3 bg-white/20 rounded-full overflow-hidden max-w-xs mx-auto mb-3">
          <div className="h-full bg-white rounded-full transition-all duration-1000" style={{ width: `${pct}%` }} />
        </div>
        <p className="text-sm opacity-80">{totalLost} kg verildi — {(20 - Number(totalLost)).toFixed(1)} kg kaldı</p>
      </div>

      {/* Weight input */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h2 className="font-bold text-lg mb-3 flex items-center gap-2">
          <Scale size={20} className="text-primary" /> Kilo Kaydet
        </h2>
        <p className="text-sm text-gray-400 mb-3">Her Pazartesi sabahı, aç karnına tartıl:</p>
        <div className="flex gap-2">
          <input type="number" step="0.1" placeholder="Kilonuzu girin (kg)"
            value={inputWeight} onChange={(e) => setInputWeight(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && logWeight()}
            className="flex-1 px-4 py-3 border-2 border-primary/20 rounded-xl focus:border-primary focus:outline-none text-lg" />
          <button onClick={logWeight}
            className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition">
            Kaydet
          </button>
        </div>
      </div>

      {/* Weight table */}
      <div className="bg-white rounded-2xl p-5 shadow-sm overflow-x-auto">
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
              const barPct = w.actual ? Math.max(5, ((95 - w.actual) / 20) * 100) : 0;
              return (
                <tr key={i} className={`${i % 2 === 0 ? "bg-gray-50" : ""} ${i === currentWeek ? "ring-2 ring-primary/30 bg-primary/5" : ""}`}>
                  <td className="p-2 font-semibold">Hafta {w.week}</td>
                  <td className="p-2 text-center">{w.expected} kg</td>
                  <td className="p-2 text-center font-bold">{w.actual ? `${w.actual} kg` : "—"}</td>
                  <td className={`p-2 text-center font-semibold ${diff ? (Number(diff) <= 0 ? "text-accent" : "text-danger") : "text-gray-300"}`}>
                    {diff ? (Number(diff) <= 0 ? diff : `+${diff}`) : "—"}
                  </td>
                  <td className="p-2">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all" style={{ width: `${barPct}%` }} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Body measurements */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h2 className="font-bold text-lg mb-3 flex items-center gap-2">
          <Ruler size={20} className="text-royal" /> Vücut Ölçüleri
        </h2>
        <p className="text-xs text-gray-400 mb-3">Her ayın 1'inde ölç ve güncelle:</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { key: "bel", label: "Bel", emoji: "📏" },
            { key: "gogus", label: "Göğüs", emoji: "📐" },
            { key: "kol", label: "Kol", emoji: "💪" },
            { key: "kalca", label: "Kalça", emoji: "📏" },
          ].map(({ key, label, emoji }) => (
            <div key={key} className="bg-gray-50 rounded-xl p-4 text-center">
              <div className="text-2xl mb-1">{emoji}</div>
              <div className="text-xs text-gray-500 mb-2">{label}</div>
              <input type="number" placeholder="cm"
                value={measures[key] || ""}
                onChange={(e) => updateMeasure(key, e.target.value)}
                className="w-20 px-2 py-1.5 border rounded-lg text-center text-sm focus:border-primary focus:outline-none" />
              <div className="text-[10px] text-gray-400 mt-1">cm</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
