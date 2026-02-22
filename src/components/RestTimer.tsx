"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import { Play, Pause, RotateCcw, Timer } from "lucide-react";

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
          // Try to play a beep
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

  return (
    <div className="bg-dark rounded-2xl p-6 text-white text-center">
      <div className="flex items-center justify-center gap-2 mb-3">
        <Timer size={20} />
        <span className="font-semibold text-sm uppercase tracking-wider opacity-70">Dinlenme Zamanlayıcı</span>
      </div>

      {/* Circular progress */}
      <div className="relative w-32 h-32 mx-auto mb-4">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
          <circle cx="50" cy="50" r="42" fill="none" stroke={seconds <= 5 && seconds > 0 ? "#E74C3C" : "#2E75B6"} strokeWidth="6"
            strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 42}`}
            strokeDashoffset={`${2 * Math.PI * 42 * (1 - pct / 100)}`}
            className="transition-all duration-1000" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-3xl font-mono font-bold ${seconds <= 5 && seconds > 0 ? "text-red-400 animate-pulse" : ""} ${seconds === 0 ? "text-red-400" : ""}`}>
            {String(min).padStart(2, "0")}:{String(sec).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Preset buttons */}
      <div className="flex gap-2 justify-center mb-4">
        {PRESETS.map((p) => (
          <button key={p} onClick={() => setPreset(p)}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white/10 hover:bg-white/20 transition border border-white/10">
            {p >= 60 ? `${p / 60}dk` : `${p}sn`}
          </button>
        ))}
      </div>

      {/* Control buttons */}
      <div className="flex gap-3 justify-center">
        {!running ? (
          <button onClick={start} className="flex items-center gap-1.5 px-5 py-2 bg-accent rounded-lg font-semibold text-sm hover:bg-green-600 transition">
            <Play size={16} /> Başlat
          </button>
        ) : (
          <button onClick={stop} className="flex items-center gap-1.5 px-5 py-2 bg-warning rounded-lg font-semibold text-sm hover:bg-orange-600 transition">
            <Pause size={16} /> Durdur
          </button>
        )}
        <button onClick={reset} className="flex items-center gap-1.5 px-5 py-2 bg-white/10 rounded-lg font-semibold text-sm hover:bg-white/20 transition">
          <RotateCcw size={16} /> Sıfırla
        </button>
      </div>
    </div>
  );
}
