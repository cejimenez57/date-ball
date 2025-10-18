"use client";

import { useState } from "react";
import SuggestionModal, { type Idea } from "@/components/SuggestionModal";
import AddSuggestionButton from "@/components/AddSuggestionButton";
// import IdeaList from "@/components/IdeaList";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [ideas, setIdeas] = useState<Idea[]>([]);

  function handleSave(idea: Idea) {
    setIdeas((prev) => [idea, ...prev]);
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-white"
      style={{ backgroundColor: "#94d2bd" }}
    >
      {/* Top button */}
      <button className="button mb-8">
        <span className="text">Random Date!</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </button>

      {/* Ball */}
      <div className="stage my-8">
        <figure className="ball bubble">
          <span className="shadow"></span>
        </figure>
      </div>

      {/* Bottom button */}
      <AddSuggestionButton onClick={() => setOpen(true)} />

      {/* Modal */}
      <SuggestionModal
        open={open}
        onClose={() => setOpen(false)}
        onSave={handleSave}
      />

    </div>
  );
}
