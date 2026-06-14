"use client";

import Image from "next/image";
import { Card } from "@heroui/react";
import InteractionButton from "@/Components/InteractionButton/InteractionButton";

const IdeaDetails = ({ idea }) => {
  // প্রপার্টি destructuring
  const {
    _id,
    ideaTitle,
    detailedDescription,
    category,
    tags,
    imageUrl,
    estimatedBudget,
    audience = idea.targetAudience,
    problem = idea.problemStatement,
    solution = idea.proposedSolution,
  } = idea;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 bg-background min-h-screen">
      <Card className="w-full p-8 flex flex-col gap-6 border border-border bg-card shadow-lg rounded-3xl">
        {/* Image Section */}
        <div className="relative h-[280px] sm:h-[350px] w-full overflow-hidden rounded-2xl bg-muted flex items-center justify-center">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={ideaTitle || "Idea Preview"}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 50vw"
              fill
            />
          )}
        </div>

        {/* Content Section */}
        <div className="flex flex-1 flex-col justify-between gap-4">
          <div className="flex flex-col items-start w-full gap-2">
            {category && (
              <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-md">
                {category}
              </span>
            )}
            <h1 className="text-2xl sm:text-4xl font-black text-foreground">
              {ideaTitle}
            </h1>
          </div>

          <div className="flex flex-col gap-5 w-full">
            <p className="text-base leading-relaxed text-muted-foreground whitespace-pre-line">
              {detailedDescription}
            </p>

            {/* Problem & Solution Sections */}
            <div className="grid md:grid-cols-2 gap-4">
              {problem && (
                <div className="p-4 rounded-xl bg-destructive/5 border border-destructive/10">
                  <strong className="block text-xs font-bold uppercase text-destructive mb-1">
                    The Problem:
                  </strong>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    {problem}
                  </p>
                </div>
              )}
              {solution && (
                <div className="p-4 rounded-xl bg-success/5 border border-success/10">
                  <strong className="block text-xs font-bold uppercase text-success mb-1">
                    Proposed Solution:
                  </strong>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    {solution}
                  </p>
                </div>
              )}
            </div>

            {audience && (
              <p className="text-sm text-muted-foreground">
                <span className="font-bold text-foreground">
                  Target Audience:{" "}
                </span>
                {audience}
              </p>
            )}
          </div>

          {/* Footer Section */}
          <div className="mt-4 flex w-full flex-col sm:flex-row sm:items-center sm:justify-between pt-6 border-t border-border gap-4">
            <div className="flex flex-col gap-2">
              {estimatedBudget && (
                <span className="text-xs font-bold text-success bg-success/10 px-3 py-1 rounded-md w-max">
                  Budget: {estimatedBudget}
                </span>
              )}
              {tags?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs font-semibold text-muted-foreground bg-muted px-2.5 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <InteractionButton
              ideaData={{ _id, ideaTitle, category, tags, estimatedBudget }}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default IdeaDetails;
