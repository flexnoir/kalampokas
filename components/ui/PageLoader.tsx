"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed inset-0 z-[100] bg-ivory flex items-center justify-center"
        >
          <div className="text-center">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="h-px bg-gold/50 mx-auto"
            />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="block mt-5 font-serif text-xl md:text-2xl font-light text-charcoal tracking-[0.1em]"
            >
              Kalampokas
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="block mt-1 text-[10px] uppercase tracking-[0.4em] text-warm-gray/50 font-sans font-light"
            >
              Fotografia
            </motion.span>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ duration: 1.2, delay: 1.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="h-px bg-gold/50 mx-auto mt-5"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
