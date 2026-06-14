"use client";
import React from "react";
import { motion } from "framer-motion";
import { FiLoader } from "react-icons/fi";

export default function LoadingSpinner() {
  const dotVariants = {
    animate: (i) => ({
      scale: [1, 1.2, 1],
      opacity: [0.4, 1, 0.4],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: i * 0.2,
      },
    }),
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[300px] w-full bg-background border border-border rounded-2xl p-8 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Spinner */}
      <div className="relative flex items-center justify-center w-24 h-24">
        {/* Outer Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }} // স্পিড কমিয়েছি
          className="absolute inset-0 rounded-full border-2 border-t-primary border-r-primary/50 border-b-transparent border-l-transparent"
        />

        {/* Inner Ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }} // স্পিড কমিয়েছি
          className="absolute inset-3 rounded-full border border-t-transparent border-r-transparent border-b-primary/60 border-l-primary/60"
        />

        {/* Core Icon */}
        <motion.div
          animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="text-primary"
        >
          <FiLoader className="w-6 h-6" />
        </motion.div>
      </div>

      {/* Loading Text */}
      <div className="mt-6 flex flex-col items-center gap-2 z-10">
        <span className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
          Connecting
        </span>

        <div className="flex items-center gap-1.5 h-2">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              custom={index}
              variants={dotVariants}
              animate="animate"
              className="w-1.5 h-1.5 rounded-full bg-primary"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
