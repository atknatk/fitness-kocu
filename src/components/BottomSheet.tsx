"use client";

import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

const sheetVariants = {
  hidden: { y: "100%" },
  visible: { y: 0 },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const springTransition = {
  type: "spring" as const,
  damping: 30,
  stiffness: 300,
};

export default function BottomSheet({ isOpen, onClose, title, children }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="bottomsheet-overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Sheet */}
          <motion.div
            key="bottomsheet-content"
            variants={sheetVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={springTransition}
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={0.2}
            onDragEnd={(_e, info) => {
              if (info.offset.y > 100 || info.velocity.y > 500) {
                onClose();
              }
            }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-bg-card rounded-t-2xl border-t border-white/6"
            style={{ maxHeight: "85vh" }}
          >
            {/* Drag Handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1.5 rounded-full bg-white/20" />
            </div>

            {/* Title */}
            {title && (
              <div className="px-5 pb-3 pt-1">
                <h2 className="text-lg font-display font-bold text-text-primary">{title}</h2>
              </div>
            )}

            {/* Scrollable Content */}
            <div className="px-5 pb-6 overflow-y-auto" style={{ maxHeight: "calc(85vh - 80px)" }}>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
