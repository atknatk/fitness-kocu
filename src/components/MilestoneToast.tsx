"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy } from "lucide-react";
import { useEffect } from "react";

interface Props {
  message: string;
  show: boolean;
  onClose: () => void;
}

export default function MilestoneToast({ message, show, onClose }: Props) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 3500);
      if (typeof navigator !== "undefined" && navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
      }
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="fixed bottom-28 md:bottom-8 left-1/2 -translate-x-1/2 z-[100]
            bg-linear-to-r from-accent-green to-accent-blue text-white
            px-5 py-3 rounded-2xl shadow-[0_0_40px_rgba(0,230,118,0.3)] flex items-center gap-3
            max-w-[90vw]"
        >
          <motion.div
            animate={{ rotate: [0, -15, 15, -10, 10, 0] }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Trophy className="w-6 h-6 text-accent-gold" />
          </motion.div>
          <span className="font-semibold text-sm">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
