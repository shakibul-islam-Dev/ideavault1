"use client";
import React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function SearchIdea() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Helper function to update URL params
  const updateParams = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  const inputClass =
    "w-full p-4 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors";

  return (
    <div className="w-full max-w-2xl mx-auto mb-10 flex flex-col md:flex-row gap-4">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search ideas..."
        defaultValue={searchParams.get("q") || ""}
        onChange={(e) => updateParams("q", e.target.value)}
        className={`md:w-2/3 ${inputClass}`}
      />

      {/* Category Select */}
      <select
        defaultValue={searchParams.get("category") || ""}
        onChange={(e) => updateParams("category", e.target.value)}
        className={`md:w-1/3 ${inputClass}`}
      >
        <option value="">All Categories</option>
        <option value="AI">AI</option>
        <option value="Technology">Technology</option>
        <option value="Education">Education</option>
        <option value="Health">Health</option>
        <option value="Business">Business</option>
      </select>
    </div>
  );
}
