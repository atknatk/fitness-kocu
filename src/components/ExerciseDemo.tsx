"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Dumbbell, Play, Info } from "lucide-react";
import type { Exercise } from "@/types";

interface Props {
  exercise: Exercise;
}

export default function ExerciseDemo({ exercise }: Props) {
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});

  const hasImages = exercise.images && exercise.images.length > 0;
  const visibleImages = hasImages
    ? exercise.images.filter((_, i) => !imgErrors[i])
    : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="rounded-2xl border border-white/4 bg-bg-card overflow-hidden"
    >
      {/* Exercise Images (side by side) */}
      <div className="relative w-full bg-bg-secondary overflow-hidden">
        {visibleImages.length > 0 ? (
          <div className="flex">
            {exercise.images.map((src, i) =>
              imgErrors[i] ? null : (
                <img
                  key={i}
                  src={src}
                  alt={`${exercise.name} - ${i + 1}`}
                  loading="lazy"
                  onError={() => setImgErrors((prev) => ({ ...prev, [i]: true }))}
                  className="w-1/2 object-contain max-h-[200px]"
                />
              )
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-text-muted gap-2">
            <Dumbbell size={48} strokeWidth={1.5} />
            <span className="text-sm font-medium">{exercise.name}</span>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="p-4 space-y-3">
        {/* Name + Muscle Badge */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <h3 className="font-display font-semibold text-text-primary text-base leading-tight">
            {exercise.name}
          </h3>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent-blue/10 text-accent-blue">
            {exercise.muscle}
          </span>
        </div>

        {/* YouTube Button */}
        {exercise.youtubeUrl && (
          <a
            href={exercise.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-red/10 text-accent-red text-sm font-semibold hover:bg-accent-red/20 transition-colors"
          >
            <Play size={16} fill="currentColor" />
            YouTube&apos;da Izle
          </a>
        )}

        {/* Form Tip */}
        {exercise.tip && (
          <div className="flex gap-2.5 p-3 rounded-xl bg-accent-blue/5 border border-accent-blue/10 text-sm text-text-secondary leading-relaxed">
            <Info size={16} className="text-accent-blue shrink-0 mt-0.5" />
            <span>{exercise.tip}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
