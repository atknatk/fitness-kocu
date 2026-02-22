"use client";

import { motion } from "framer-motion";

interface Props {
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
  sublabel?: string;
}

export default function ProgressRing({
  value,
  max,
  size = 100,
  strokeWidth = 8,
  color = "#2E75B6",
  label,
  sublabel,
}: Props) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedValue = Math.min(Math.max(value, 0), max);
  const progress = max > 0 ? clampedValue / max : 0;
  const strokeDashoffset = circumference * (1 - progress);

  const percentage = max > 0 ? Math.round((clampedValue / max) * 100) : 0;

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="-rotate-90"
        >
          {/* Background ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
          />

          {/* Animated progress ring */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          />
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="font-bold leading-none text-gray-900"
            style={{ fontSize: size * 0.2 }}
          >
            {clampedValue}
          </span>
          <span
            className="text-gray-400 leading-none"
            style={{ fontSize: size * 0.12 }}
          >
            / {max}
          </span>
        </div>
      </div>

      {/* Labels */}
      {label && (
        <span className="text-xs font-semibold text-gray-700 text-center leading-tight">
          {label}
        </span>
      )}
      {sublabel && (
        <span className="text-[10px] text-gray-400 text-center leading-tight">
          {sublabel}
        </span>
      )}
    </div>
  );
}
