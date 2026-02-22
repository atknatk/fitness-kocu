"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import { Play, Pause, RotateCcw, Timer } from "lucide-react";
import { motion } from "framer-motion";

const PRESETS = [30, 60, 90, 120];

export default function RestTimer() {
  const [seconds, setSeconds] = useState(60);
  const [running, setRunning] = useState(false);
  const [initial, setInitial] = useState(60);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const stop = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setRunning(false);
  }, []);

  const start = useCallback(() => {
    if (running || seconds <= 0) return;
    setRunning(true);
  }, [running, seconds]);

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          stop();
          try {
            const ctx = new AudioContext();
            const osc = ctx.createOscillator();
            osc.frequency.value = 800;
            osc.connect(ctx.destination);
            osc.start();
            setTimeout(() => osc.stop(), 200);
          } catch {}
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running, stop]);

  const reset = () => { stop(); setSeconds(initial); };
  const setPreset = (s: number) => { stop(); setSeconds(s); setInitial(s); };

  const pct = initial > 0 ? (seconds / initial) * 100 : 0;
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  const isLow = seconds <= 5 && seconds > 0;

  return (
    <div className="bg-bg-card rounded-2xl p-6 text-white text-center border border-white/4">
      <div className="flex items-center justify-center gap-2 mb-3">
        <Timer size={20} className="text-accent-blue" />
        <span className="font-semibold text-sm uppercase tracking-wider text-text-muted">Dinlenme Zamanlayici</span>
      </div>

      {/* Circular progress */}
      <div className="relative w-32 h-32 mx-auto mb-4">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="timer-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4F8EF7" />
              <stop offset="100%" stopColor="#00D4FF" />
            </linearGradient>
            {running && (
              <filter id="timer-glow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            )}
          </defs>
          <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
          <circle
            cx="50" cy="50" r="42" fill="none"
            stroke={isLow ? "#FF3D71" : "url(#timer-grad)"}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 42}`}
            strokeDashoffset={`${2 * Math.PI * 42 * (1 - pct / 100)}`}
            className="transition-all duration-1000"
            filter={running ? "url(#timer-glow)" : undefined}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-3xl font-mono font-bold ${isLow ? "text-accent-red animate-pulse" : seconds === 0 ? "text-accent-red" : "text-text-primary"}`}>
            {String(min).padStart(2, "0")}:{String(sec).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Preset buttons */}
      <div className="flex gap-2 justify-center mb-4">
        {PRESETS.map((p) => (
          <motion.button
            key={p}
            whileTap={{ scale: 0.9 }}
            onClick={() => setPreset(p)}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg glass-card hover:bg-white/10 transition text-text-secondary"
          >
            {p >= 60 ? `${p / 60}dk` : `${p}sn`}
          </motion.button>
        ))}
      </div>

      {/* Control buttons */}
      <div className="flex gap-3 justify-center">
        {!running ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={start}
            className="flex items-center gap-1.5 px-5 py-2 bg-linear-to-r from-accent-green to-accent-cyan rounded-lg font-semibold text-sm text-white shadow-[0_4px_15px_rgba(0,230,118,0.3)] transition"
          >
            <Play size={16} /> Baslat
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={stop}
            className="flex items-center gap-1.5 px-5 py-2 bg-accent-orange rounded-lg font-semibold text-sm text-white transition"
          >
            <Pause size={16} /> Durdur
          </motion.button>
        )}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={reset}
          className="flex items-center gap-1.5 px-5 py-2 glass-card rounded-lg font-semibold text-sm text-text-secondary hover:bg-white/10 transition"
        >
          <RotateCcw size={16} /> Sifirla
        </motion.button>
      </div>
    </div>
  );
}
