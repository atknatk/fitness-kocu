"use client";
import { motion } from "framer-motion";

interface Props {
  type: string;
  size?: number;
}

export default function StickmanAnimation({ type, size = 120 }: Props) {
  const s = size;
  const cx = s / 2;
  const headR = s * 0.08;
  const bodyTop = s * 0.22;
  const bodyBot = s * 0.52;
  const armY = s * 0.3;
  const legEnd = s * 0.82;

  const stickColor = "#2E75B6";
  const weightColor = "#E67E22";
  const sw = Math.max(2, s * 0.025);

  // Common stick figure parts
  const head = <circle cx={cx} cy={s * 0.14} r={headR} fill="none" stroke={stickColor} strokeWidth={sw} />;
  const body = <line x1={cx} y1={bodyTop} x2={cx} y2={bodyBot} stroke={stickColor} strokeWidth={sw} strokeLinecap="round" />;

  const animations: Record<string, JSX.Element> = {
    // SQUAT
    squat: (
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
        {head}
        <motion.g
          animate={{ y: [0, s * 0.12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <circle cx={cx} cy={s * 0.14} r={headR} fill="none" stroke={stickColor} strokeWidth={sw} />
          <line x1={cx} y1={bodyTop} x2={cx} y2={bodyBot} stroke={stickColor} strokeWidth={sw} strokeLinecap="round" />
          {/* Arms forward */}
          <line x1={cx} y1={armY} x2={cx - s * 0.2} y2={armY + s * 0.05} stroke={stickColor} strokeWidth={sw} strokeLinecap="round" />
          <line x1={cx} y1={armY} x2={cx + s * 0.2} y2={armY + s * 0.05} stroke={stickColor} strokeWidth={sw} strokeLinecap="round" />
        </motion.g>
        {/* Legs with squat motion */}
        <motion.line
          x1={cx} y1={bodyBot} x2={cx - s * 0.15}
          animate={{ y2: [legEnd, bodyBot + s * 0.15, legEnd] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          stroke={stickColor} strokeWidth={sw} strokeLinecap="round"
        />
        <motion.line
          x1={cx} y1={bodyBot} x2={cx + s * 0.15}
          animate={{ y2: [legEnd, bodyBot + s * 0.15, legEnd] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          stroke={stickColor} strokeWidth={sw} strokeLinecap="round"
        />
        {/* Barbell on shoulders */}
        <motion.g animate={{ y: [0, s * 0.12, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <line x1={cx - s * 0.25} y1={s * 0.17} x2={cx + s * 0.25} y2={s * 0.17} stroke={weightColor} strokeWidth={sw * 1.5} strokeLinecap="round" />
          <circle cx={cx - s * 0.25} cy={s * 0.17} r={s * 0.03} fill={weightColor} />
          <circle cx={cx + s * 0.25} cy={s * 0.17} r={s * 0.03} fill={weightColor} />
        </motion.g>
      </svg>
    ),

    // BENCH PRESS
    press: (
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
        {/* Bench */}
        <rect x={s * 0.15} y={s * 0.55} width={s * 0.7} height={s * 0.06} rx={3} fill="#95a5a6" />
        <rect x={s * 0.25} y={s * 0.61} width={s * 0.04} height={s * 0.2} fill="#7f8c8d" />
        <rect x={s * 0.7} y={s * 0.61} width={s * 0.04} height={s * 0.2} fill="#7f8c8d" />
        {/* Lying body */}
        <circle cx={s * 0.3} cy={s * 0.48} r={headR} fill="none" stroke={stickColor} strokeWidth={sw} />
        <line x1={s * 0.35} y1={s * 0.48} x2={s * 0.7} y2={s * 0.48} stroke={stickColor} strokeWidth={sw} strokeLinecap="round" />
        {/* Legs hanging */}
        <line x1={s * 0.7} y1={s * 0.48} x2={s * 0.78} y2={s * 0.65} stroke={stickColor} strokeWidth={sw} strokeLinecap="round" />
        <line x1={s * 0.78} y1={s * 0.65} x2={s * 0.78} y2={s * 0.8} stroke={stickColor} strokeWidth={sw} strokeLinecap="round" />
        {/* Arms pushing barbell */}
        <motion.g animate={{ y: [0, -s * 0.15, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <line x1={s * 0.45} y1={s * 0.48} x2={s * 0.45} y2={s * 0.35} stroke={stickColor} strokeWidth={sw} strokeLinecap="round" />
          <line x1={s * 0.55} y1={s * 0.48} x2={s * 0.55} y2={s * 0.35} stroke={stickColor} strokeWidth={sw} strokeLinecap="round" />
          {/* Barbell */}
          <line x1={s * 0.25} y1={s * 0.35} x2={s * 0.75} y2={s * 0.35} stroke={weightColor} strokeWidth={sw * 2} strokeLinecap="round" />
          <circle cx={s * 0.25} cy={s * 0.35} r={s * 0.035} fill={weightColor} />
          <circle cx={s * 0.75} cy={s * 0.35} r={s * 0.035} fill={weightColor} />
        </motion.g>
      </svg>
    ),

    // PULLDOWN
    pulldown: (
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
        {/* Cable machine */}
        <line x1={cx} y1={0} x2={cx} y2={s * 0.08} stroke="#95a5a6" strokeWidth={sw} />
        <rect x={cx - s * 0.15} y={s * 0.02} width={s * 0.3} height={s * 0.04} rx={2} fill={weightColor} />
        {/* Seated body */}
        <circle cx={cx} cy={s * 0.25} r={headR} fill="none" stroke={stickColor} strokeWidth={sw} />
        <line x1={cx} y1={s * 0.33} x2={cx} y2={s * 0.6} stroke={stickColor} strokeWidth={sw} strokeLinecap="round" />
        {/* Seat */}
        <rect x={cx - s * 0.12} y={s * 0.6} width={s * 0.24} height={s * 0.04} rx={2} fill="#95a5a6" />
        <line x1={cx} y1={s * 0.64} x2={cx - s * 0.12} y2={s * 0.82} stroke={stickColor} strokeWidth={sw} strokeLinecap="round" />
        <line x1={cx} y1={s * 0.64} x2={cx + s * 0.12} y2={s * 0.82} stroke={stickColor} strokeWidth={sw} strokeLinecap="round" />
        {/* Arms pulling */}
        <motion.g animate={{ y: [0, s * 0.15, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <line x1={cx} y1={s * 0.38} x2={cx - s * 0.2} y2={s * 0.15} stroke={stickColor} strokeWidth={sw} strokeLinecap="round" />
          <line x1={cx} y1={s * 0.38} x2={cx + s * 0.2} y2={s * 0.15} stroke={stickColor} strokeWidth={sw} strokeLinecap="round" />
          {/* Bar */}
          <line x1={cx - s * 0.22} y1={s * 0.14} x2={cx + s * 0.22} y2={s * 0.14} stroke={weightColor} strokeWidth={sw * 1.5} strokeLinecap="round" />
          {/* Cable */}
          <line x1={cx} y1={s * 0.06} x2={cx} y2={s * 0.14} stroke="#95a5a6" strokeWidth={1} strokeDasharray="3,2" />
        </motion.g>
      </svg>
    ),

    // OVERHEAD PRESS
    overhead: (
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
        <circle cx={cx} cy={s * 0.22} r={headR} fill="none" stroke={stickColor} strokeWidth={sw} />
        <line x1={cx} y1={s * 0.3} x2={cx} y2={s * 0.58} stroke={stickColor} strokeWidth={sw} strokeLinecap="round" />
        <line x1={cx} y1={s * 0.58} x2={cx - s * 0.14} y2={s * 0.82} stroke={stickColor} strokeWidth={sw} strokeLinecap="round" />
        <line x1={cx} y1={s * 0.58} x2={cx + s * 0.14} y2={s * 0.82} stroke={stickColor} strokeWidth={sw} strokeLinecap="round" />
        {/* Arms + barbell going up */}
        <motion.g animate={{ y: [s * 0.08, -s * 0.05, s * 0.08] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <line x1={cx} y1={s * 0.35} x2={cx - s * 0.18} y2={s * 0.18} stroke={stickColor} strokeWidth={sw} strokeLinecap="round" />
          <line x1={cx} y1={s * 0.35} x2={cx + s * 0.18} y2={s * 0.18} stroke={stickColor} strokeWidth={sw} strokeLinecap="round" />
          <line x1={cx - s * 0.25} y1={s * 0.16} x2={cx + s * 0.25} y2={s * 0.16} stroke={weightColor} strokeWidth={sw * 2} strokeLinecap="round" />
          <circle cx={cx - s * 0.25} cy={s * 0.16} r={s * 0.03} fill={weightColor} />
          <circle cx={cx + s * 0.25} cy={s * 0.16} r={s * 0.03} fill={weightColor} />
        </motion.g>
      </svg>
    ),

    // PLANK
    plank: (
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
        <motion.g animate={{ y: [0, -2, 0, 2, 0] }} transition={{ duration: 3, repeat: Infinity }}>
          {/* Head */}
          <circle cx={s * 0.2} cy={s * 0.45} r={headR} fill="none" stroke={stickColor} strokeWidth={sw} />
          {/* Body horizontal */}
          <line x1={s * 0.28} y1={s * 0.48} x2={s * 0.75} y2={s * 0.48} stroke={stickColor} strokeWidth={sw} strokeLinecap="round" />
          {/* Arms (elbows on ground) */}
          <line x1={s * 0.32} y1={s * 0.48} x2={s * 0.28} y2={s * 0.62} stroke={stickColor} strokeWidth={sw} strokeLinecap="round" />
          {/* Legs */}
          <line x1={s * 0.75} y1={s * 0.48} x2={s * 0.85} y2={s * 0.62} stroke={stickColor} strokeWidth={sw} strokeLinecap="round" />
        </motion.g>
        {/* Ground */}
        <line x1={s * 0.1} y1={s * 0.65} x2={s * 0.9} y2={s * 0.65} stroke="#bdc3c7" strokeWidth={1} strokeDasharray="4,3" />
        {/* Timer effect */}
        <motion.text
          x={cx} y={s * 0.85} textAnchor="middle" fontSize={s * 0.09} fill={weightColor} fontWeight="bold"
          animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
        >
          HOLD!
        </motion.text>
      </svg>
    ),

    // CURL
    curl: (
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
        <circle cx={cx} cy={s * 0.14} r={headR} fill="none" stroke={stickColor} strokeWidth={sw} />
        <line x1={cx} y1={bodyTop} x2={cx} y2={bodyBot} stroke={stickColor} strokeWidth={sw} strokeLinecap="round" />
        <line x1={cx} y1={bodyBot} x2={cx - s * 0.14} y2={legEnd} stroke={stickColor} strokeWidth={sw} strokeLinecap="round" />
        <line x1={cx} y1={bodyBot} x2={cx + s * 0.14} y2={legEnd} stroke={stickColor} strokeWidth={sw} strokeLinecap="round" />
        {/* Left arm static */}
        <line x1={cx} y1={armY} x2={cx - s * 0.15} y2={bodyBot} stroke={stickColor} strokeWidth={sw} strokeLinecap="round" />
        {/* Right arm curling */}
        <motion.line
          x1={cx} y1={armY}
          animate={{
            x2: [cx + s * 0.15, cx + s * 0.08, cx + s * 0.15],
            y2: [bodyBot, armY - s * 0.02, bodyBot],
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          stroke={stickColor} strokeWidth={sw} strokeLinecap="round"
        />
        {/* Dumbbell */}
        <motion.g
          animate={{
            x: [cx + s * 0.15, cx + s * 0.08, cx + s * 0.15],
            y: [bodyBot, armY - s * 0.02, bodyBot],
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <rect x={-s * 0.04} y={-s * 0.015} width={s * 0.08} height={s * 0.03} rx={2} fill={weightColor} />
        </motion.g>
      </svg>
    ),

    // RUNNING
    run: (
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
        <motion.g animate={{ x: [0, 3, 0, -3, 0] }} transition={{ duration: 0.6, repeat: Infinity }}>
          <circle cx={cx} cy={s * 0.18} r={headR} fill="none" stroke={stickColor} strokeWidth={sw} />
        </motion.g>
        <line x1={cx} y1={bodyTop + s * 0.04} x2={cx} y2={bodyBot} stroke={stickColor} strokeWidth={sw} strokeLinecap="round" />
        {/* Running arms */}
        <motion.line
          x1={cx} y1={armY + s * 0.04}
          animate={{ x2: [cx - s * 0.15, cx + s * 0.1, cx - s * 0.15], y2: [armY - s * 0.05, armY + s * 0.15, armY - s * 0.05] }}
          transition={{ duration: 0.6, repeat: Infinity }} stroke={stickColor} strokeWidth={sw} strokeLinecap="round"
        />
        <motion.line
          x1={cx} y1={armY + s * 0.04}
          animate={{ x2: [cx + s * 0.15, cx - s * 0.1, cx + s * 0.15], y2: [armY - s * 0.05, armY + s * 0.15, armY - s * 0.05] }}
          transition={{ duration: 0.6, repeat: Infinity }} stroke={stickColor} strokeWidth={sw} strokeLinecap="round"
        />
        {/* Running legs */}
        <motion.line
          x1={cx} y1={bodyBot}
          animate={{ x2: [cx + s * 0.18, cx - s * 0.12, cx + s * 0.18], y2: [legEnd - s * 0.05, legEnd, legEnd - s * 0.05] }}
          transition={{ duration: 0.6, repeat: Infinity }} stroke={stickColor} strokeWidth={sw} strokeLinecap="round"
        />
        <motion.line
          x1={cx} y1={bodyBot}
          animate={{ x2: [cx - s * 0.12, cx + s * 0.18, cx - s * 0.12], y2: [legEnd, legEnd - s * 0.05, legEnd] }}
          transition={{ duration: 0.6, repeat: Infinity }} stroke={stickColor} strokeWidth={sw} strokeLinecap="round"
        />
        {/* Ground */}
        <line x1={s * 0.1} y1={s * 0.88} x2={s * 0.9} y2={s * 0.88} stroke="#bdc3c7" strokeWidth={1} strokeDasharray="4,3" />
      </svg>
    ),

    // CRUNCH
    crunch: (
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
        {/* Ground */}
        <line x1={s * 0.05} y1={s * 0.7} x2={s * 0.95} y2={s * 0.7} stroke="#bdc3c7" strokeWidth={1} strokeDasharray="4,3" />
        <motion.g animate={{ rotate: [0, -30, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} style={{ originX: `${s * 0.5}px`, originY: `${s * 0.65}px` }}>
          {/* Upper body */}
          <circle cx={s * 0.35} cy={s * 0.52} r={headR} fill="none" stroke={stickColor} strokeWidth={sw} />
          <line x1={s * 0.4} y1={s * 0.55} x2={s * 0.55} y2={s * 0.65} stroke={stickColor} strokeWidth={sw} strokeLinecap="round" />
          {/* Hands behind head */}
          <line x1={s * 0.42} y1={s * 0.58} x2={s * 0.32} y2={s * 0.48} stroke={stickColor} strokeWidth={sw} strokeLinecap="round" />
        </motion.g>
        {/* Legs static bent */}
        <line x1={s * 0.55} y1={s * 0.65} x2={s * 0.7} y2={s * 0.45} stroke={stickColor} strokeWidth={sw} strokeLinecap="round" />
        <line x1={s * 0.7} y1={s * 0.45} x2={s * 0.75} y2={s * 0.65} stroke={stickColor} strokeWidth={sw} strokeLinecap="round" />
      </svg>
    ),

    // ROW
    row: (
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
        {/* Bench */}
        <rect x={s * 0.1} y={s * 0.48} width={s * 0.35} height={s * 0.04} rx={2} fill="#95a5a6" />
        <rect x={s * 0.2} y={s * 0.52} width={s * 0.04} height={s * 0.28} fill="#7f8c8d" />
        {/* Body bent over */}
        <circle cx={s * 0.45} cy={s * 0.28} r={headR} fill="none" stroke={stickColor} strokeWidth={sw} />
        <line x1={s * 0.48} y1={s * 0.35} x2={s * 0.65} y2={s * 0.48} stroke={stickColor} strokeWidth={sw} strokeLinecap="round" />
        {/* Support arm */}
        <line x1={s * 0.52} y1={s * 0.38} x2={s * 0.38} y2={s * 0.48} stroke={stickColor} strokeWidth={sw} strokeLinecap="round" />
        {/* Legs */}
        <line x1={s * 0.65} y1={s * 0.48} x2={s * 0.72} y2={s * 0.75} stroke={stickColor} strokeWidth={sw} strokeLinecap="round" />
        <line x1={s * 0.65} y1={s * 0.48} x2={s * 0.82} y2={s * 0.75} stroke={stickColor} strokeWidth={sw} strokeLinecap="round" />
        {/* Pulling arm with dumbbell */}
        <motion.g animate={{ y: [s * 0.12, 0, s * 0.12] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
          <line x1={s * 0.58} y1={s * 0.42} x2={s * 0.58} y2={s * 0.58} stroke={stickColor} strokeWidth={sw} strokeLinecap="round" />
          <rect x={s * 0.54} y={s * 0.56} width={s * 0.08} height={s * 0.03} rx={2} fill={weightColor} />
        </motion.g>
      </svg>
    ),

    // BIKE
    bike: (
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
        {/* Bike frame */}
        <circle cx={s * 0.35} cy={s * 0.65} r={s * 0.12} fill="none" stroke="#95a5a6" strokeWidth={sw} />
        <circle cx={s * 0.7} cy={s * 0.65} r={s * 0.12} fill="none" stroke="#95a5a6" strokeWidth={sw} />
        <line x1={s * 0.35} y1={s * 0.65} x2={s * 0.52} y2={s * 0.45} stroke="#95a5a6" strokeWidth={sw} />
        <line x1={s * 0.7} y1={s * 0.65} x2={s * 0.52} y2={s * 0.45} stroke="#95a5a6" strokeWidth={sw} />
        <line x1={s * 0.52} y1={s * 0.45} x2={s * 0.52} y2={s * 0.35} stroke="#95a5a6" strokeWidth={sw} />
        <line x1={s * 0.45} y1={s * 0.35} x2={s * 0.58} y2={s * 0.35} stroke="#95a5a6" strokeWidth={sw * 1.5} strokeLinecap="round" />
        {/* Rider */}
        <circle cx={s * 0.5} cy={s * 0.2} r={headR} fill="none" stroke={stickColor} strokeWidth={sw} />
        <line x1={s * 0.5} y1={s * 0.28} x2={s * 0.52} y2={s * 0.42} stroke={stickColor} strokeWidth={sw} strokeLinecap="round" />
        <line x1={s * 0.5} y1={s * 0.32} x2={s * 0.52} y2={s * 0.35} stroke={stickColor} strokeWidth={sw} strokeLinecap="round" />
        {/* Pedaling legs */}
        <motion.line
          x1={s * 0.52} y1={s * 0.42}
          animate={{ x2: [s * 0.45, s * 0.58, s * 0.45], y2: [s * 0.58, s * 0.55, s * 0.58] }}
          transition={{ duration: 0.8, repeat: Infinity }} stroke={stickColor} strokeWidth={sw} strokeLinecap="round"
        />
        <motion.line
          x1={s * 0.52} y1={s * 0.42}
          animate={{ x2: [s * 0.58, s * 0.45, s * 0.58], y2: [s * 0.55, s * 0.58, s * 0.55] }}
          transition={{ duration: 0.8, repeat: Infinity }} stroke={stickColor} strokeWidth={sw} strokeLinecap="round"
        />
      </svg>
    ),

    // DEADLIFT
    deadlift: (
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
        <motion.g animate={{ rotate: [30, 0, 30] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} style={{ originX: `${cx}px`, originY: `${s * 0.6}px` }}>
          <circle cx={cx} cy={s * 0.2} r={headR} fill="none" stroke={stickColor} strokeWidth={sw} />
          <line x1={cx} y1={s * 0.28} x2={cx} y2={s * 0.55} stroke={stickColor} strokeWidth={sw} strokeLinecap="round" />
          {/* Arms down */}
          <line x1={cx} y1={s * 0.35} x2={cx - s * 0.05} y2={s * 0.55} stroke={stickColor} strokeWidth={sw} strokeLinecap="round" />
          <line x1={cx} y1={s * 0.35} x2={cx + s * 0.05} y2={s * 0.55} stroke={stickColor} strokeWidth={sw} strokeLinecap="round" />
        </motion.g>
        {/* Legs */}
        <line x1={cx} y1={s * 0.58} x2={cx - s * 0.12} y2={s * 0.82} stroke={stickColor} strokeWidth={sw} strokeLinecap="round" />
        <line x1={cx} y1={s * 0.58} x2={cx + s * 0.12} y2={s * 0.82} stroke={stickColor} strokeWidth={sw} strokeLinecap="round" />
        {/* Barbell */}
        <motion.g animate={{ y: [s * 0.08, -s * 0.05, s * 0.08] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}>
          <line x1={cx - s * 0.3} y1={s * 0.72} x2={cx + s * 0.3} y2={s * 0.72} stroke={weightColor} strokeWidth={sw * 2} strokeLinecap="round" />
          <circle cx={cx - s * 0.3} cy={s * 0.72} r={s * 0.035} fill={weightColor} />
          <circle cx={cx + s * 0.3} cy={s * 0.72} r={s * 0.035} fill={weightColor} />
        </motion.g>
      </svg>
    ),

    // LUNGE
    lunge: (
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
        <circle cx={cx} cy={s * 0.15} r={headR} fill="none" stroke={stickColor} strokeWidth={sw} />
        <line x1={cx} y1={s * 0.23} x2={cx} y2={s * 0.5} stroke={stickColor} strokeWidth={sw} strokeLinecap="round" />
        {/* Arms holding dumbbells */}
        <line x1={cx} y1={s * 0.32} x2={cx - s * 0.1} y2={s * 0.5} stroke={stickColor} strokeWidth={sw} strokeLinecap="round" />
        <line x1={cx} y1={s * 0.32} x2={cx + s * 0.1} y2={s * 0.5} stroke={stickColor} strokeWidth={sw} strokeLinecap="round" />
        <rect x={cx - s * 0.14} y={s * 0.48} width={s * 0.06} height={s * 0.025} rx={1} fill={weightColor} />
        <rect x={cx + s * 0.08} y={s * 0.48} width={s * 0.06} height={s * 0.025} rx={1} fill={weightColor} />
        {/* Front leg bent */}
        <motion.g animate={{ y: [0, s * 0.05, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <line x1={cx} y1={s * 0.5} x2={cx + s * 0.15} y2={s * 0.7} stroke={stickColor} strokeWidth={sw} strokeLinecap="round" />
          <line x1={cx + s * 0.15} y1={s * 0.7} x2={cx + s * 0.15} y2={s * 0.85} stroke={stickColor} strokeWidth={sw} strokeLinecap="round" />
          {/* Back leg */}
          <line x1={cx} y1={s * 0.5} x2={cx - s * 0.18} y2={s * 0.72} stroke={stickColor} strokeWidth={sw} strokeLinecap="round" />
          <line x1={cx - s * 0.18} y1={s * 0.72} x2={cx - s * 0.22} y2={s * 0.85} stroke={stickColor} strokeWidth={sw} strokeLinecap="round" />
        </motion.g>
      </svg>
    ),
  };

  // Fallback: use a generic "standing with dumbbells" for unmatched types
  const fallback = (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
      <circle cx={cx} cy={s * 0.14} r={headR} fill="none" stroke={stickColor} strokeWidth={sw} />
      <line x1={cx} y1={bodyTop} x2={cx} y2={bodyBot} stroke={stickColor} strokeWidth={sw} strokeLinecap="round" />
      <line x1={cx} y1={bodyBot} x2={cx - s * 0.14} y2={legEnd} stroke={stickColor} strokeWidth={sw} strokeLinecap="round" />
      <line x1={cx} y1={bodyBot} x2={cx + s * 0.14} y2={legEnd} stroke={stickColor} strokeWidth={sw} strokeLinecap="round" />
      <motion.line x1={cx} y1={armY}
        animate={{ x2: [cx - s * 0.18, cx - s * 0.12, cx - s * 0.18], y2: [bodyBot - s * 0.05, armY - s * 0.05, bodyBot - s * 0.05] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} stroke={stickColor} strokeWidth={sw} strokeLinecap="round" />
      <motion.line x1={cx} y1={armY}
        animate={{ x2: [cx + s * 0.18, cx + s * 0.12, cx + s * 0.18], y2: [bodyBot - s * 0.05, armY - s * 0.05, bodyBot - s * 0.05] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} stroke={stickColor} strokeWidth={sw} strokeLinecap="round" />
      <motion.circle cx={cx - s * 0.18} animate={{ cy: [bodyBot - s * 0.03, armY - s * 0.03, bodyBot - s * 0.03] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} r={s * 0.025} fill={weightColor} />
      <motion.circle cx={cx + s * 0.18} animate={{ cy: [bodyBot - s * 0.03, armY - s * 0.03, bodyBot - s * 0.03] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} r={s * 0.025} fill={weightColor} />
    </svg>
  );

  return (
    <div className="flex items-center justify-center">
      {animations[type] || fallback}
    </div>
  );
}
