"use client";

import { useState } from "react";
import { Toaster, toast } from "sonner";
import { Rocket, Send } from "lucide-react";
import { DateField, Label } from "@heroui/react";
import { getLocalTimeZone } from "@internationalized/date";
import { authClient } from "@/lib/auth-client";

export default function SubmitIdeaForm() {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formElement = e.currentTarget;
    try {
      const formData = new FormData(formElement);
      const rawPayload = Object.fromEntries(formData);

      const formPayload = {
        title: rawPayload.title,
        ideaTitle: rawPayload.title,
        shortDescription: rawPayload.shortDesc,
        content: rawPayload.detailedDesc,
        category: rawPayload.category,
        tags: rawPayload.tags,
        budget: rawPayload.budget,
        imageUrl: rawPayload.imageUrl,
        audience: rawPayload.audience,
        problem: rawPayload.problem,
        solution: rawPayload.solution,
      };

      if (value) {
        formPayload.date = value.toDate(getLocalTimeZone()).toISOString();
      }

      const { data } = await authClient.getSession();
      if (!data?.user?.id) throw new Error("User not authenticated.");

      formPayload.userId = data.user.id;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/idea`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${data?.session?.token}`,
          },
          body: JSON.stringify(formPayload),
        },
      );

      if (!response.ok) throw new Error("Submission failed");

      toast.success("Idea submitted successfully!");
      formElement.reset();
      setValue(null);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  const inputBase =
    "w-full p-3 rounded-lg border border-input bg-background text-foreground outline-none focus:ring-2 focus:ring-primary transition-all";
  const labelStyle = "block text-sm font-medium mb-1 text-muted-foreground";

  return (
    <div className="min-h-screen bg-background py-12 px-4 transition-colors">
      <Toaster position="top-right" richColors />
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-foreground flex items-center gap-2">
          <Rocket className="text-primary" /> Submit Startup Idea
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-card border border-border rounded-2xl p-8 shadow-sm space-y-5"
        >
          <div>
            <label className={labelStyle}>Idea Title</label>
            <input name="title" required className={inputBase} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelStyle}>Short Description</label>
              <textarea
                name="shortDesc"
                required
                rows={2}
                className={inputBase}
              />
            </div>
            <div>
              <label className={labelStyle}>Category</label>
              <select name="category" className={inputBase}>
                <option value="tech">Tech</option>
                <option value="health">Health</option>
                <option value="ai">AI</option>
                <option value="education">Education</option>
              </select>
            </div>
          </div>

          <div>
            <label className={labelStyle}>Detailed Description</label>
            <textarea
              name="detailedDesc"
              required
              rows={4}
              className={inputBase}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelStyle}>Tags (Optional)</label>
              <input name="tags" className={inputBase} />
            </div>
            <div>
              <label className={labelStyle}>Estimated Budget</label>
              <input name="budget" type="number" className={inputBase} />
            </div>
          </div>

          <div>
            <label className={labelStyle}>Image URL</label>
            <input name="imageUrl" type="url" className={inputBase} />
          </div>

          <div>
            <label className={labelStyle}>Target Audience</label>
            <input name="audience" className={inputBase} />
          </div>

          <div>
            <label className={labelStyle}>Problem Statement</label>
            <textarea name="problem" required rows={3} className={inputBase} />
          </div>

          <div>
            <label className={labelStyle}>Proposed Solution</label>
            <textarea name="solution" required rows={3} className={inputBase} />
          </div>

          <div className="flex flex-col gap-2">
            <DateField
              value={value}
              onChange={setValue}
              className="text-foreground"
            >
              <Label className="text-sm font-semibold text-muted-foreground">
                Date
              </Label>
              <DateField.Group className="flex w-full p-3 rounded-xl border border-input bg-background">
                <DateField.Input className="flex w-full outline-none">
                  {(segment) => (
                    <DateField.Segment
                      segment={segment}
                      className="px-0.5 text-foreground focus:bg-primary/20 rounded"
                    />
                  )}
                </DateField.Input>
              </DateField.Group>
            </DateField>
          </div>

          <button
            disabled={loading}
            className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-50"
          >
            {loading ? (
              "Saving..."
            ) : (
              <>
                <Send size={18} /> Submit Idea
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
