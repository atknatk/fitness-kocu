"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { WEEKS } from "@/data/weeks";

interface Props {
  currentWeek: number;
  onChange: (week: number) => void;
}

export default function WeekSelector({ currentWeek, onChange }: Props) {
  const week = WEEKS[currentWeek];
  const phaseColors: Record<number, string> = {
    1: "bg-accent/10 text-accent border-accent/30",
    2: "bg-primary/10 text-primary border-primary/30",
    3: "bg-royal/10 text-royal border-royal/30",
  };

  return (
    <div className="flex items-center justify-between bg-white rounded-2xl p-4 shadow-sm mb-4">
      <button onClick={() => onChange(Math.max(0, currentWeek - 1))} disabled={currentWeek === 0}
        className="p-2 rounded-xl hover:bg-gray-100 transition disabled:opacity-30 disabled:cursor-not-allowed">
        <ChevronLeft size={24} />
      </button>

      <div className="text-center">
        <div className="text-2xl font-bold text-primary-dark">Hafta {currentWeek + 1}</div>
        <div className={`text-xs font-semibold px-3 py-1 rounded-full border inline-block mt-1 ${phaseColors[week.phase]}`}>
          {week.phaseLabel}
        </div>
      </div>

      <button onClick={() => onChange(Math.min(11, currentWeek + 1))} disabled={currentWeek === 11}
        className="p-2 rounded-xl hover:bg-gray-100 transition disabled:opacity-30 disabled:cursor-not-allowed">
        <ChevronRight size={24} />
      </button>
    </div>
  );
}
