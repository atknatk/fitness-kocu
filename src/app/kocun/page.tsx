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
    return (
      <div className="space-y-4">
        <div className="skeleton-shimmer rounded-2xl h-36" />
        <div className="skeleton-shimmer rounded-2xl h-48" />
        <div className="skeleton-shimmer rounded-2xl h-40" />
      </div>
    );
  }

  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-4">
      {/* Coach banner */}
      <motion.div
        variants={fadeInUp}
        className="animated-gradient text-white rounded-2xl p-6 relative overflow-hidden"
      >
        <motion.div
          animate={{ y: [0, -15, 0], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-30%] right-[-5%] w-48 h-48 bg-accent-blue/15 rounded-full blur-2xl"
        />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-12 h-12 rounded-full bg-accent-blue/20 flex items-center justify-center text-2xl"
            >
              🏋️
            </motion.div>
            <div>
              <h1 className="text-xl font-display font-bold">{profile.name}, Kocun Konusuyor</h1>
              <p className="text-xs text-accent-blue/70">Bilgi + Motivasyon = Basari</p>
            </div>
          </div>
          <p className="italic text-sm text-text-secondary">
            &ldquo;Sana en iyi yasam kocu kendini gelistirme istegindir. Ben sadece yol gosteriyorum.&rdquo;
          </p>
        </div>
      </motion.div>

      {/* Knowledge base */}
      <motion.div variants={fadeInUp} className="bg-bg-card rounded-2xl p-5 border border-white/4">
        <h2 className="font-display font-bold text-lg mb-4 flex items-center gap-2 text-text-primary">
          <BookOpen size={20} className="text-accent-blue" /> Bilgi Bankasi
          <span className="text-sm font-normal text-text-muted ml-auto">{tips.length} ipucu</span>
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
                className="border border-white/4 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenTip(isOpen ? null : i)}
                  className="w-full flex items-center gap-3 p-4 hover:bg-bg-card-hover transition text-left"
                >
                  <span className="text-2xl">{tip.icon}</span>
                  <span className="flex-1 font-semibold text-sm text-text-primary">{tip.title}</span>
                  <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={16} className="text-text-muted" />
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
                      <div className="px-4 pb-4">
                        <div className="bg-accent-blue/5 rounded-xl p-4 border border-accent-blue/10">
                          <p className="text-sm text-text-secondary leading-relaxed">{tip.content}</p>
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
      <motion.div variants={fadeInUp} className="bg-bg-card rounded-2xl p-5 border border-white/4">
        <h2 className="font-display font-bold text-lg mb-4 flex items-center gap-2 text-text-primary">
          <MessageCircle size={20} className="text-accent-green" /> Haftalik Motivasyon
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
                  ? "bg-accent-green/10 border-2 border-accent-green/20 font-semibold shadow-[0_0_20px_rgba(0,230,118,0.1)]"
                  : i < currentWeek
                    ? "bg-bg-secondary opacity-50"
                    : "bg-bg-secondary"
              }`}
            >
              <span className="text-accent-blue font-bold">Hafta {i + 1}:</span>{" "}
              <span className="text-text-secondary">{goal}</span>
              {i === currentWeek && <span className="ml-2 text-xs text-accent-green">◀ Bu hafta</span>}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* All quotes */}
      <motion.div variants={fadeInUp} className="bg-bg-card rounded-2xl p-5 border border-white/4">
        <h2 className="font-display font-bold text-lg mb-4 flex items-center gap-2 text-text-primary">
          <Lightbulb size={20} className="text-accent-gold" /> Motivasyon Sozleri
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {quotes.map((q, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card rounded-xl p-4"
            >
              <p className="italic text-sm text-text-secondary">&ldquo;{q.q}&rdquo;</p>
              <p className="text-xs text-text-muted mt-2">&mdash; {q.a}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
