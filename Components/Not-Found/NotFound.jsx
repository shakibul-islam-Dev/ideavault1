"use client";
import React from "react";
import { FiArrowLeft, FiSearch } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="relative min-h-[calc(100vh-160px)] w-full max-w-7xl mx-auto flex flex-col items-center justify-center overflow-hidden px-6 py-12 text-foreground">
      {/* Main Content Area */}
      <main className="flex flex-col items-center justify-center text-center px-4 z-10 max-w-2xl w-full">
        {/* Illustration Container */}
        <div className="bg-card border border-border rounded-3xl p-8 mb-8 shadow-sm w-full max-w-md aspect-[16/10] flex flex-col items-center justify-center gap-4">
          <div className="w-24 h-24 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 text-primary font-mono text-3xl font-extrabold tracking-tighter">
            404
          </div>
          <p className="text-xs tracking-widest text-muted-foreground font-mono uppercase">
            System Core Disconnected
          </p>
        </div>

        {/* Error Typography */}
        <h1 className="text-4xl md:text-5xl font-black tracking-tight uppercase text-foreground">
          404 - Lost in Void
        </h1>

        <p className="mt-4 text-muted-foreground max-w-md leading-relaxed text-sm md:text-base">
          Whoops! This page seems to have vanished into the digital void. It
          looks like you&apos;ve taken a wrong turn on the path.
        </p>

        {/* Action Buttons & Search */}
        <div className="mt-8 w-full flex flex-col items-center gap-4">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 bg-primary text-primary-foreground font-medium px-6 py-3 rounded-xl transition-all duration-300 hover:opacity-90 active:scale-[0.98]"
          >
            <FiArrowLeft className="w-4 h-4" />
            Go Back Home
          </button>

          <div className="relative mt-2 w-full max-w-xs">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Or try a search..."
              className="w-full bg-background border border-input rounded-xl pl-10 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
