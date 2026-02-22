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
  gradient?: boolean;
}

export default function ProgressRing({
  value,
  max,
  size = 100,
  strokeWidth = 8,
  color = "#4F8EF7",
  label,
  sublabel,
  gradient = false,
}: Props) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedValue = Math.min(Math.max(value, 0), max);
  const progress = max > 0 ? clampedValue / max : 0;
  const strokeDashoffset = circumference * (1 - progress);
  const gradId = `ring-grad-${size}`;
  const glowId = `ring-glow-${size}`;

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="-rotate-90"
        >
          <defs>
            {gradient && (
              <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4F8EF7" />
                <stop offset="100%" stopColor="#00E676" />
              </linearGradient>
            )}
            <filter id={glowId}>
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={strokeWidth}
          />

          {/* Animated progress ring */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={gradient ? `url(#${gradId})` : color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            filter={gradient ? `url(#${glowId})` : undefined}
          />
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="font-display font-bold leading-none text-text-primary"
            style={{ fontSize: size * 0.2 }}
          >
            {clampedValue}
          </span>
          <span
            className="text-text-muted leading-none"
            style={{ fontSize: size * 0.12 }}
          >
            / {max}
          </span>
        </div>
      </div>

      {/* Labels */}
      {label && (
        <span className="text-xs font-semibold text-text-secondary text-center leading-tight">
          {label}
        </span>
      )}
      {sublabel && (
        <span className="text-[10px] text-text-muted text-center leading-tight">
          {sublabel}
        </span>
      )}
    </div>
  );
}
