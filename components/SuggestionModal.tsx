"use client";
import { useEffect, useState } from "react";

export type Idea = {
  title: string;
  url?: string;
  location?: string;
  cost: number; // 1..5
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (idea: Idea) => void;
};

export default function SuggestionModal({ open, onClose, onSave }: Props) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [location, setLocation] = useState("");
  const [cost, setCost] = useState<number>(3);

  function resetForm() {
    setTitle("");
    setUrl("");
    setLocation("");
    setCost(3);
  }

  function handleSave() {
    const t = title.trim();
    if (!t) return;
    onSave({
      title: t,
      url: url.trim() || undefined,
      location: location.trim() || undefined,
      cost,
    });
    resetForm();
    onClose();
  }

  // close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 w-[92%] max-w-md rounded-2xl bg-white text-black shadow-xl"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold">Add a Suggestion</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-zinc-100"
            aria-label="Close"
            title="Close"
          >
            ✖
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">Name of Place</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Name of the place"
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#274c77]"
            />
          </div>

          {/* URL */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Video Reference
            </label>
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="URL..."
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#274c77]"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Where is it at.."
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#274c77]"
            />
          </div>

          {/* Cost meter */}
          <div>
            <label className="block text-sm font-medium mb-2">Cost Meter</label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setCost(n)}
                  className={`px-2 py-1 rounded-md border transition ${
                    cost >= n
                      ? "bg-emerald-500 text-white border-emerald-600"
                      : "bg-white text-zinc-700 border-zinc-300"
                  }`}
                  aria-label={`${n} dollar${n > 1 ? "s" : ""}`}
                  title={`${n} dollar${n > 1 ? "s" : ""}`}
                >
                  {"$".repeat(n)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 flex items-center justify-end gap-2 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-zinc-300 hover:bg-zinc-100"
          >
            Cancel
          </button>
          <button
            disabled={!title.trim()}
            onClick={handleSave}
            className="px-4 py-2 rounded-lg bg-[#274c77] text-white hover:bg-[#1f3b5c] disabled:opacity-50"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
