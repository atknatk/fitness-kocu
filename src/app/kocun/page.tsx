"use client";
import { useState, useMemo } from "react";
import { BookOpen, ChevronDown, Lightbulb, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@/contexts/UserContext";
import { getTips } from "@/data/tips";
import { getWeekGoals, getMotivationalQuotes } from "@/data/weeks";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function KocunPage() {
  const { profile, mounted: userMounted } = useUser();
  const [openTip, setOpenTip] = useState<number | null>(null);

  const tips = useMemo(() => getTips(profile.programType), [profile.programType]);
  const weekGoals = useMemo(() => getWeekGoals(profile.programType), [profile.programType]);
  const quotes = useMemo(() => getMotivationalQuotes(profile.programType), [profile.programType]);

  // Current week
  const start = new Date(profile.programStartDate);
  const now = new Date();
  const currentWeek = Math.max(0, Math.min(11, Math.floor((now.getTime() - start.getTime()) / (7 * 24 * 60 * 60 * 1000))));

  if (!userMounted) {
    return <div className="animate-pulse p-8 text-center text-gray-400">Yükleniyor...</div>;
  }

  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-4">
      {/* Coach banner */}
      <motion.div
        variants={fadeInUp}
        className="bg-linear-to-br from-dark to-primary-dark text-white rounded-2xl p-6 relative overflow-hidden"
      >
        <div className="absolute top-[-30%] right-[-5%] w-48 h-48 bg-white/5 rounded-full" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-12 h-12 rounded-full bg-primary/30 flex items-center justify-center text-2xl"
            >
              🏋️
            </motion.div>
            <div>
              <h1 className="text-xl font-bold">{profile.name}, Koçun Konuşuyor</h1>
              <p className="text-xs text-blue-200">Bilgi + Motivasyon = Başarı</p>
            </div>
          </div>
          <p className="italic text-sm text-blue-100">
            &ldquo;Sana en iyi yaşam koçu kendini geliştirme isteğindir. Ben sadece yol gösteriyorum.&rdquo;
          </p>
        </div>
      </motion.div>

      {/* Knowledge base */}
      <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-5 shadow-sm">
        <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
          <BookOpen size={20} className="text-primary" /> Bilgi Bankası
          <span className="text-sm font-normal text-gray-400 ml-auto">{tips.length} ipucu</span>
        </h2>
        <div className="space-y-2">
          {tips.map((tip, i) => {
            const isOpen = openTip === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="border border-gray-100 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenTip(isOpen ? null : i)}
                  className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition text-left"
                >
                  <span className="text-2xl">{tip.icon}</span>
                  <span className="flex-1 font-semibold text-sm">{tip.title}</span>
                  <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={16} className="text-gray-400" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4">
                        <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
                          <p className="text-sm text-gray-600 leading-relaxed">{tip.content}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Weekly motivation messages */}
      <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-5 shadow-sm">
        <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
          <MessageCircle size={20} className="text-accent" /> Haftalık Motivasyon
        </h2>
        <div className="space-y-2">
          {weekGoals.map((goal, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className={`p-3 rounded-xl text-sm transition-all ${
                i === currentWeek
                  ? "bg-accent/10 border-2 border-accent/20 font-semibold"
                  : i < currentWeek
                    ? "bg-gray-50 opacity-60"
                    : "bg-gray-50"
              }`}
            >
              <span className="text-primary font-bold">Hafta {i + 1}:</span> {goal}
              {i === currentWeek && <span className="ml-2 text-xs text-accent">◀ Bu hafta</span>}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* All quotes */}
      <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-5 shadow-sm">
        <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
          <Lightbulb size={20} className="text-warning" /> Motivasyon Sözleri
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {quotes.map((q, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="bg-linear-to-br from-gray-50 to-primary/5 rounded-xl p-4 border border-gray-100"
            >
              <p className="italic text-sm text-gray-700">&ldquo;{q.q}&rdquo;</p>
              <p className="text-xs text-gray-400 mt-2">— {q.a}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
