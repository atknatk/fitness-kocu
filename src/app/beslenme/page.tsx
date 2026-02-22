"use client";
import { useState, useMemo } from "react";
import { Droplets, Check, AlertTriangle, ThumbsUp, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@/contexts/UserContext";
import { useWaterIntake, useDailyChecklist } from "@/lib/supabase-hooks";
import { getMeals, getMacroTargets } from "@/data/meals";
import { getChecklist } from "@/data/checklist";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import ProgressRing from "@/components/ProgressRing";

export default function BeslenmePage() {
  const { profile, mounted: userMounted } = useUser();
  const [openSection, setOpenSection] = useState<string | null>(null);

  const today = new Date().toISOString().split("T")[0];
  const checklist = useMemo(() => getChecklist(profile.programType), [profile.programType]);
  const meals = useMemo(() => getMeals(profile.programType), [profile.programType]);
  const macros = useMemo(() => getMacroTargets(profile.programType), [profile.programType]);

  const { glasses: water, update: setWater } = useWaterIntake(today);
  const { checks, toggle: toggleCheck } = useDailyChecklist(today, checklist.length);

  if (!userMounted) {
    return <div className="animate-pulse p-8 text-center text-gray-400">Yükleniyor...</div>;
  }

  const waterTarget = profile.programType === "female_recomp" ? 8 : 10;
  const checkedCount = checks.filter(Boolean).length;

  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-4">
      {/* Macro targets */}
      <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-5 shadow-sm">
        <h2 className="font-bold text-lg mb-3 flex items-center gap-2">
          <span className="text-2xl">🎯</span> Günlük Hedefler
        </h2>
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: "Kalori", value: macros.calories, unit: "kcal", color: "bg-primary/10 text-primary" },
            { label: "Protein", value: macros.protein, unit: "g", color: "bg-accent/10 text-accent" },
            { label: "Karb", value: macros.carbs, unit: "g", color: "bg-warning/10 text-warning" },
            { label: "Yağ", value: macros.fat, unit: "g", color: "bg-royal/10 text-royal" },
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
      </motion.div>

      {/* Water tracker */}
      <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-5 shadow-sm">
        <h2 className="font-bold text-lg mb-3 flex items-center gap-2">
          <Droplets size={20} className="text-blue-400" /> Su Takibi
          <span className="text-sm font-normal text-gray-400 ml-auto">{water}/{waterTarget} bardak</span>
        </h2>
        <div className="flex items-center gap-4">
          <ProgressRing
            value={water}
            max={waterTarget}
            size={90}
            strokeWidth={8}
            color="#60A5FA"
            label="Su"
            sublabel="bardak"
          />
          <div className="flex-1">
            <div className="flex gap-2 flex-wrap">
              {Array.from({ length: waterTarget }, (_, i) => (
                <motion.button
                  key={i}
                  whileTap={{ scale: 0.8 }}
                  onClick={() => setWater(i + 1)}
                  className={`w-9 h-9 rounded-xl border-2 flex items-center justify-center text-sm transition-all ${
                    i < water ? "bg-blue-400 border-blue-400 text-white" : "border-blue-200 text-blue-200"
                  }`}
                >
                  💧
                </motion.button>
              ))}
            </div>
          </div>
        </div>
        <div className="h-2 bg-gray-100 rounded-full mt-3 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(100, (water / waterTarget) * 100)}%` }}
            transition={{ duration: 0.5 }}
            className="h-full bg-linear-to-r from-blue-300 to-blue-500 rounded-full"
          />
        </div>
      </motion.div>

      {/* Daily checklist */}
      <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-5 shadow-sm">
        <h2 className="font-bold text-lg mb-3 flex items-center gap-2">
          <span className="text-2xl">✅</span> Günlük Kontrol
          <span className="text-sm font-normal text-gray-400 ml-auto">{checkedCount}/{checklist.length}</span>
        </h2>
        <div className="space-y-2">
          {checklist.map((item, i) => {
            const isDone = checks[i];
            return (
              <motion.button
                key={i}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleCheck(i)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left ${isDone ? "bg-accent/5 opacity-70" : "bg-gray-50 hover:bg-gray-100"}`}
              >
                <motion.div
                  animate={isDone ? { scale: [1, 1.3, 1] } : {}}
                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition ${isDone ? "bg-accent border-accent text-white" : "border-gray-300"}`}
                >
                  {isDone && <Check size={12} />}
                </motion.div>
                <span className={`text-sm ${isDone ? "line-through text-gray-400" : ""}`}>{item}</span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Meal sections */}
      {meals.map((section) => {
        const isOpen = openSection === section.key;
        return (
          <motion.div key={section.key} variants={fadeInUp} className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <button
              onClick={() => setOpenSection(isOpen ? null : section.key)}
              className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition"
            >
              <h2 className="font-bold text-lg flex items-center gap-2">
                <span className="text-2xl">{section.icon}</span> {section.title}
                <span className="text-sm font-normal text-gray-400">({section.time})</span>
              </h2>
              <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown size={18} className="text-gray-400" />
              </motion.div>
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 space-y-3">
                    {section.meals.map((meal, mi) => (
                      <motion.div
                        key={mi}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: mi * 0.05 }}
                        className="p-4 bg-gray-50 rounded-xl border-l-3 border-l-accent"
                      >
                        <div className="flex justify-between items-start">
                          <div className="font-semibold text-sm text-primary-dark">{meal.title}</div>
                          <div className="text-xs text-accent font-bold">{meal.cal}</div>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{meal.items}</p>
                        <div className="text-xs text-gray-400 mt-1">Protein: {meal.protein}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}

      {/* Avoid / Allowed */}
      <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
      </motion.div>
    </motion.div>
  );
}
