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
    return (
      <div className="space-y-4">
        <div className="skeleton-shimmer rounded-2xl h-32" />
        <div className="skeleton-shimmer rounded-2xl h-28" />
        <div className="skeleton-shimmer rounded-2xl h-36" />
      </div>
    );
  }

  const waterTarget = profile.programType === "female_recomp" ? 8 : 10;
  const checkedCount = checks.filter(Boolean).length;

  const macroCards = [
    { label: "Kalori", value: macros.calories, unit: "kcal", accent: "bg-accent-blue", textColor: "text-accent-blue" },
    { label: "Protein", value: macros.protein, unit: "g", accent: "bg-accent-green", textColor: "text-accent-green" },
    { label: "Karb", value: macros.carbs, unit: "g", accent: "bg-accent-orange", textColor: "text-accent-orange" },
    { label: "Yag", value: macros.fat, unit: "g", accent: "bg-accent-purple", textColor: "text-accent-purple" },
  ];

  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-4">
      {/* Macro targets */}
      <motion.div variants={fadeInUp} className="bg-bg-card rounded-2xl p-5 border border-white/4">
        <h2 className="font-display font-bold text-lg mb-3 flex items-center gap-2 text-text-primary">
          <span className="text-2xl">🎯</span> Gunluk Hedefler
        </h2>
        <div className="grid grid-cols-4 gap-2">
          {macroCards.map(({ label, value, unit, accent, textColor }) => (
            <div key={label} className="glass-card rounded-xl p-3 text-center relative overflow-hidden">
              <div className={`absolute top-0 left-0 right-0 h-0.5 ${accent}`} />
              <div className={`text-lg font-display font-bold ${textColor}`}>{value}</div>
              <div className="text-[10px] font-medium text-text-muted">{unit}</div>
              <div className={`text-xs mt-1 ${textColor}`}>{label}</div>
            </div>
          ))}
        </div>
        <p className="text-xs text-text-muted mt-3 text-center">
          Tabaginin yarisi sebze, ceyregi protein, ceyregi karbonhidrat olsun.
        </p>
      </motion.div>

      {/* Water tracker */}
      <motion.div variants={fadeInUp} className="bg-bg-card rounded-2xl p-5 border border-white/4">
        <h2 className="font-display font-bold text-lg mb-3 flex items-center gap-2 text-text-primary">
          <Droplets size={20} className="text-accent-cyan" /> Su Takibi
          <span className="text-sm font-normal text-text-muted ml-auto">{water}/{waterTarget} bardak</span>
        </h2>
        <div className="flex items-center gap-4">
          <ProgressRing
            value={water}
            max={waterTarget}
            size={90}
            strokeWidth={8}
            color="#00D4FF"
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
                    i < water
                      ? "bg-accent-cyan border-accent-cyan text-white shadow-[0_0_8px_rgba(0,212,255,0.3)]"
                      : "border-white/10 text-white/20 hover:border-accent-cyan/40"
                  }`}
                >
                  💧
                </motion.button>
              ))}
            </div>
          </div>
        </div>
        <div className="h-2 bg-white/6 rounded-full mt-3 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(100, (water / waterTarget) * 100)}%` }}
            transition={{ duration: 0.5 }}
            className="h-full bg-linear-to-r from-accent-cyan to-accent-blue rounded-full shadow-[0_0_8px_rgba(0,212,255,0.3)]"
          />
        </div>
      </motion.div>

      {/* Daily checklist */}
      <motion.div variants={fadeInUp} className="bg-bg-card rounded-2xl p-5 border border-white/4">
        <h2 className="font-display font-bold text-lg mb-3 flex items-center gap-2 text-text-primary">
          <span className="text-2xl">✅</span> Gunluk Kontrol
          <span className="text-sm font-normal text-text-muted ml-auto">{checkedCount}/{checklist.length}</span>
        </h2>
        <div className="space-y-2">
          {checklist.map((item, i) => {
            const isDone = checks[i];
            return (
              <motion.button
                key={i}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleCheck(i)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left ${isDone ? "bg-accent-green/5 opacity-70" : "bg-bg-secondary hover:bg-bg-card-hover"}`}
              >
                <motion.div
                  animate={isDone ? { scale: [1, 1.3, 1] } : {}}
                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition ${isDone ? "bg-linear-to-br from-accent-green to-accent-cyan border-transparent shadow-[0_0_8px_rgba(0,230,118,0.3)]" : "border-text-muted"}`}
                >
                  {isDone && <Check size={12} className="text-white" />}
                </motion.div>
                <span className={`text-sm ${isDone ? "line-through text-text-muted" : "text-text-secondary"}`}>{item}</span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Meal sections */}
      {meals.map((section) => {
        const isOpen = openSection === section.key;
        return (
          <motion.div key={section.key} variants={fadeInUp} className="bg-bg-card rounded-2xl overflow-hidden border border-white/4">
            <button
              onClick={() => setOpenSection(isOpen ? null : section.key)}
              className="w-full flex items-center justify-between p-5 hover:bg-bg-card-hover transition"
            >
              <h2 className="font-display font-bold text-lg flex items-center gap-2 text-text-primary">
                <span className="text-2xl">{section.icon}</span> {section.title}
                <span className="text-sm font-normal text-text-muted">({section.time})</span>
              </h2>
              <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown size={18} className="text-text-muted" />
              </motion.div>
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 space-y-3">
                    {section.meals.map((meal, mi) => (
                      <motion.div
                        key={mi}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: mi * 0.05 }}
                        className="p-4 bg-bg-secondary rounded-xl border-l-3 border-l-accent-green"
                      >
                        <div className="flex justify-between items-start">
                          <div className="font-semibold text-sm text-text-primary">{meal.title}</div>
                          <div className="text-xs text-accent-green font-bold">{meal.cal}</div>
                        </div>
                        <p className="text-sm text-text-secondary mt-1">{meal.items}</p>
                        <div className="text-xs text-text-muted mt-1">Protein: {meal.protein}</div>
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
        <div className="bg-accent-red/5 rounded-2xl p-5 border border-accent-red/20">
          <h3 className="font-display font-bold flex items-center gap-2 text-accent-red mb-2">
            <AlertTriangle size={18} /> Uzak Dur!
          </h3>
          <p className="text-sm text-text-secondary">
            Gazli icecekler, meyve sulari, cips, cikolata, beyaz ekmek (fazla), kizarmis yiyecekler, fast food, alkol
          </p>
        </div>
        <div className="bg-accent-green/5 rounded-2xl p-5 border border-accent-green/20">
          <h3 className="font-display font-bold flex items-center gap-2 text-accent-green mb-2">
            <ThumbsUp size={18} /> Serbest!
          </h3>
          <p className="text-sm text-text-secondary">
            Su, yesil cay, sade kahve (2 fincan max), tum sebzeler, meyveler (2-3 porsiyon), kuruyemisler (olculu)
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
