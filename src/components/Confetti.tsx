"use client";

import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

const COLORS = ["#4F8EF7", "#00E676", "#FF6D00", "#B388FF", "#00D4FF", "#FFD740"];

interface Props {
  trigger: boolean;
}

export default function Confetti({ trigger }: Props) {
  const prevTrigger = useRef(false);

  useEffect(() => {
    // Only fire when trigger transitions from false to true
    if (trigger && !prevTrigger.current) {
      const burst = (angle: number, origin: { x: number; y: number }) => {
        confetti({
          particleCount: 60,
          angle,
          spread: 55,
          origin,
          colors: COLORS,
          ticks: 200,
          gravity: 1.2,
          scalar: 1.1,
          drift: 0,
        });
      };

      // Fire multiple bursts from different positions
      burst(60, { x: 0.25, y: 0.6 });
      burst(90, { x: 0.5, y: 0.7 });
      burst(120, { x: 0.75, y: 0.6 });

      // Second wave slightly delayed
      setTimeout(() => {
        burst(80, { x: 0.4, y: 0.65 });
        burst(100, { x: 0.6, y: 0.65 });
      }, 150);
    }

    prevTrigger.current = trigger;
  }, [trigger]);

  // No visible UI
  return null;
}
