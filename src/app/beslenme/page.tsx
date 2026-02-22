"use client";
import { useState, useEffect } from "react";
import { Droplets, Check, AlertTriangle, ThumbsUp } from "lucide-react";
import { MEAL_SECTIONS } from "@/data/meals";
import { getStorage, setStorage } from "@/lib/storage";

const DAILY_CHECKLIST = [
  "Sabah 1 bardak ılık su içtim",
  "Kahvaltıda protein aldım",
  "Antrenman öncesi atıştırmalık yedim",
  "Antrenmandan sonra 30 dk içinde yedim",
  "Bugün şekerli içecek içmedim",
  "En az 2.5L su içtim",
  "Akşam yemeğini 20:00'den önce yedim",
];

export default function BeslenmePage() {
  const [water, setWater] = useState(0);
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    setMounted(true);
    const wl = getStorage<Record<string, number>>("water", {});
    setWater(wl[today] || 0);
    setChecks(getStorage("checks", {}));
  }, [today]);

  if (!mounted) return <div className="animate-pulse p-8 text-center text-gray-400">Yükleniyor...</div>;

  const logWater = (count: number) => {
    const wl = getStorage<Record<string, number>>("water", {});
    wl[today] = count;
    setStorage("water", wl);
    setWater(count);
  };

  const toggleCheck = (key: string) => {
    const next = { ...checks, [key]: !checks[key] };
    setChecks(next);
    setStorage("checks", next);
  };

  return (
    <div className="space-y-4">
      {/* Macro targets */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h2 className="font-bold text-lg mb-3 flex items-center gap-2">
          <span className="text-2xl">🎯</span> Günlük Hedefler
        </h2>
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: "Kalori", value: "1800-2000", unit: "kcal", color: "bg-primary/10 text-primary" },
            { label: "Protein", value: "~135", unit: "g", color: "bg-accent/10 text-accent" },
            { label: "Karb", value: "~200", unit: "g", color: "bg-warning/10 text-warning" },
            { label: "Yağ", value: "~65", unit: "g", color: "bg-royal/10 text-royal" },
          ].map(({ label, value, unit, color }) => (
            <div key={label} className={`${color} rounded-xl p-3 text-center`}>
              <div className="text-lg font-bold">{value}</div>
              <div className="text-[10px] font-medium opacity-70">{unit}</div>
              <div className="text-xs mt-1">{label}</div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-3 text-center">
          Tabağının yarısı sebze, çeyreği protein, çeyreği karbonhidrat olsun.
        </p>
      </div>

      {/* Water tracker */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h2 className="font-bold text-lg mb-3 flex items-center gap-2">
          <Droplets size={20} className="text-blue-400" /> Su Takibi
          <span className="text-sm font-normal text-gray-400 ml-auto">{water}/10 bardak</span>
        </h2>
        <div className="flex gap-2 flex-wrap">
          {Array.from({ length: 10 }, (_, i) => (
            <button key={i} onClick={() => logWater(i + 1)}
              className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center text-lg transition-all hover:scale-110 ${
                i < water ? "bg-blue-400 border-blue-400 text-white" : "border-blue-200 text-blue-200"
              }`}>
              💧
            </button>
          ))}
        </div>
        <div className="h-2 bg-gray-100 rounded-full mt-3 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-300 to-blue-500 rounded-full transition-all" style={{ width: `${water * 10}%` }} />
        </div>
      </div>

      {/* Daily checklist */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h2 className="font-bold text-lg mb-3 flex items-center gap-2">
          <span className="text-2xl">✅</span> Günlük Kontrol
        </h2>
        <div className="space-y-2">
          {DAILY_CHECKLIST.map((item, i) => {
            const key = `${today}_c${i}`;
            const isDone = checks[key];
            return (
              <button key={i} onClick={() => toggleCheck(key)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left ${isDone ? "bg-accent/5 opacity-60" : "bg-gray-50 hover:bg-gray-100"}`}>
                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition ${isDone ? "bg-accent border-accent text-white" : "border-gray-300"}`}>
                  {isDone && <Check size={12} />}
                </div>
                <span className={`text-sm ${isDone ? "line-through text-gray-400" : ""}`}>{item}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Meal sections */}
      {MEAL_SECTIONS.map((section) => (
        <div key={section.key} className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="font-bold text-lg mb-3">
            {section.icon} {section.title} <span className="text-sm font-normal text-gray-400">({section.time})</span>
          </h2>
          <div className="space-y-3">
            {section.meals.map((meal, mi) => (
              <div key={mi} className="p-4 bg-gray-50 rounded-xl border-l-3 border-l-accent">
                <div className="flex justify-between items-start">
                  <div className="font-semibold text-sm text-primary-dark">{meal.title}</div>
                  <div className="text-xs text-accent font-bold">{meal.cal}</div>
                </div>
                <p className="text-sm text-gray-600 mt-1">{meal.items}</p>
                <div className="text-xs text-gray-400 mt-1">Protein: {meal.protein}</div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Avoid / Allowed */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-red-50 rounded-2xl p-5 border border-red-100">
          <h3 className="font-bold flex items-center gap-2 text-red-600 mb-2">
            <AlertTriangle size={18} /> Uzak Dur!
          </h3>
          <p className="text-sm text-red-700/80">
            Gazlı içecekler, meyve suları, cips, çikolata, beyaz ekmek (fazla), kızarmış yiyecekler, fast food, alkol
          </p>
        </div>
        <div className="bg-green-50 rounded-2xl p-5 border border-green-100">
          <h3 className="font-bold flex items-center gap-2 text-green-600 mb-2">
            <ThumbsUp size={18} /> Serbest!
          </h3>
          <p className="text-sm text-green-700/80">
            Su, yeşil çay, sade kahve (2 fincan max), tüm sebzeler, meyveler (2-3 porsiyon), kuruyemişler (ölçülü)
          </p>
        </div>
      </div>
    </div>
  );
}
