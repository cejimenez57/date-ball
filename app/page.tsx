"use client";

import { useRef, useState } from "react";
import SuggestionModal, { type Idea } from "@/components/SuggestionModal";
import AddSuggestionButton from "@/components/AddSuggestionButton";
import ScheduleModal from "@/components/ScheduleModal"; // <- make sure this file exists

export default function Home() {
  const [open, setOpen] = useState(false);          // add-suggestion modal
  const [ideas, setIdeas] = useState<Idea[]>([]);   // saved ideas
  const [picked, setPicked] = useState<Idea | null>(null);
  const [copied, setCopied] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const ballRef = useRef<HTMLElement | null>(null);

  function handleSave(idea: Idea) {
    setIdeas((prev) => [idea, ...prev]);
  }

  function pickRandom() {
    if (ideas.length === 0) return;
    const i = Math.floor(Math.random() * ideas.length);
    const choice = ideas[i];
    setPicked(choice);

    // spin ball fast once
    const el = ballRef.current;
    if (el) {
      el.classList.add("spin-fast");
      setTimeout(() => el.classList.remove("spin-fast"), 1200);
    }

    // open schedule modal
    setScheduleOpen(true);
  }

  async function copyPicked() {
    if (!picked) return;
    const text = `Title: ${picked.title}
Location: ${picked.location ?? "-"}
Cost: ${"$".repeat(picked.cost)}
URL: ${picked.url ?? "-"}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-white"
      style={{ backgroundColor: "#94d2bd" }}
    >
      {/* Random Date */}
      <button className="button mb-8" onClick={pickRandom}>
        <span className="text">Random Date!</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </button>

      {/* Ball */}
      <div className="stage my-8">
        <figure ref={ballRef as any} className="ball bubble">
          <span className="shadow"></span>
        </figure>
      </div>

      {/* Add Suggestion */}
      <AddSuggestionButton onClick={() => setOpen(true)} />

      {/* Add Suggestion Modal */}
      <SuggestionModal open={open} onClose={() => setOpen(false)} onSave={handleSave} />

      {/* Picked idea card + copy */}
      {picked && (
        <div className="mt-6 w-[92%] max-w-md rounded-xl bg-white/90 p-4 text-black">
          <div className="font-semibold text-lg">{picked.title}</div>
          <div className="text-sm text-zinc-700">
            {picked.location ? <>📍 {picked.location} · </> : null}
            {"$".repeat(picked.cost)}
            {picked.url ? (
              <>
                {" · "}
                <a className="text-[#274c77] underline" href={picked.url} target="_blank" rel="noreferrer">
                  link
                </a>
              </>
            ) : null}
          </div>
          <button
            onClick={copyPicked}
            className="mt-3 px-4 py-2 rounded-lg bg-[#274c77] text-white hover:bg-[#1f3b5c] transition"
          >
            {copied ? "Copied!" : "Copy to clipboard"}
          </button>
        </div>
      )}

      {/* Schedule (date/time + emails) */}
      <ScheduleModal
        open={scheduleOpen}
        onClose={() => setScheduleOpen(false)}
        idea={picked}
      />
    </div>
  );
}
