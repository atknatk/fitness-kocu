"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import type { WeekPlan } from "@/types";

interface Props {
  currentWeek: number;
  weeks: WeekPlan[];
  onChange: (week: number) => void;
}

export default function WeekSelector({ currentWeek, weeks, onChange }: Props) {
  const week = weeks[currentWeek];
  const phaseColors: Record<number, string> = {
    1: "bg-accent/10 text-accent border-accent/30",
    2: "bg-primary/10 text-primary border-primary/30",
    3: "bg-royal/10 text-royal border-royal/30",
  };

  const handleSwipe = (dir: number) => {
    const next = currentWeek + dir;
    if (next >= 0 && next < weeks.length) onChange(next);
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragEnd={(_, info) => {
        if (info.offset.x > 60) handleSwipe(-1);
        else if (info.offset.x < -60) handleSwipe(1);
      }}
      className="flex items-center justify-between bg-white rounded-2xl p-4 shadow-sm mb-4 select-none touch-pan-y"
    >
      <motion.button
        whileTap={{ scale: 0.85 }}
        onClick={() => handleSwipe(-1)}
        disabled={currentWeek === 0}
        className="p-2 rounded-xl hover:bg-gray-100 transition disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronLeft size={24} />
      </motion.button>

      <motion.div
        key={currentWeek}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="text-center"
      >
        <div className="text-2xl font-bold text-primary-dark">Hafta {currentWeek + 1}</div>
        <div
          className={`text-xs font-semibold px-3 py-1 rounded-full border inline-block mt-1 ${phaseColors[week.phase]}`}
        >
          {week.phaseLabel}
        </div>
      </motion.div>

      <motion.button
        whileTap={{ scale: 0.85 }}
        onClick={() => handleSwipe(1)}
        disabled={currentWeek === weeks.length - 1}
        className="p-2 rounded-xl hover:bg-gray-100 transition disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronRight size={24} />
      </motion.button>
    </motion.div>
  );
}
