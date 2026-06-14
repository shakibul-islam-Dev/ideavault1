"use client";

import { useState, useEffect } from "react";
import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

export default function IdeaContainer({ query, category }) {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // এখানে cache: 'no-store' ব্যবহার করা হয়েছে যাতে ডাটা ক্যাশ না হয়
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/idea?search=${query}&category=${category}`,
      { cache: "no-store" },
    )
      .then((res) => res.json())
      .then((data) => {
        setIdeas(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching ideas:", err);
        setLoading(false);
      });
  }, [query, category]);

  if (loading) {
    return (
      <div className="text-center py-20 text-muted-foreground">Loading...</div>
    );
  }

  if (ideas.length === 0) {
    return (
      <div className="text-center text-4xl font-bold text-muted-foreground py-20">
        No ideas found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {ideas.map((idea) => (
        <div
          key={idea._id}
          className="flex flex-col bg-card border border-border rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
        >
          {/* Image Section */}
          <div className="relative w-full h-48 bg-muted overflow-hidden">
            {idea.imageUrl ? (
              <Image
                src={idea.imageUrl}
                alt={idea.ideaTitle || "Idea Image"}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                No Image
              </div>
            )}
            <span className="absolute top-3 left-3 z-10 bg-black/60 backdrop-blur-md text-white text-[11px] uppercase font-bold px-3 py-1 rounded-full">
              {idea.category || "Uncategorized"}
            </span>
          </div>

          {/* Content Section */}
          <div className="p-5 flex flex-col flex-grow">
            <h3 className="text-lg font-bold text-foreground line-clamp-1 mb-2">
              {idea.ideaTitle}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-grow">
              {idea.shortDescription}
            </p>

            {/* Action Button */}
            <Link href={`/ideadetails/${idea._id}`} className="w-full mt-auto">
              <Button className="w-full bg-primary text-primary-foreground font-medium py-2.5 rounded-xl transition-all hover:opacity-90">
                View Details
              </Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
