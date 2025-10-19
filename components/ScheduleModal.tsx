"use client";
import { useEffect, useState } from "react";
import type { Idea } from "./SuggestionModal";

type Props = {
  open: boolean;
  onClose: () => void;
  idea: Idea | null;
};

export default function ScheduleModal({ open, onClose, idea }: Props) {
  const [when, setWhen] = useState<string>("");
  const [youEmail, setYouEmail] = useState("");
  const [partnerEmail, setPartnerEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const valid = !!idea && !!when && !!youEmail && !!partnerEmail;

  useEffect(() => {
    if (!open) {
      setWhen("");
      setYouEmail("");
      setPartnerEmail("");
      setSending(false);
      setSent(false);
      setError(null);
    }
  }, [open]);

  if (!open || !idea) return null;

  async function sendEmails() {
    if (!valid || sending) return;
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idea,
          whenISO: new Date(when).toISOString(),
          youEmail,
          partnerEmail,
        }),
      });

      // Robust parse: prefer JSON, but fall back to text to surface framework errors
      let data: any;
      const ct = res.headers.get("content-type") || "";
      if (ct.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();
        throw new Error(
          text?.slice(0, 300) || "Server did not return JSON response."
        );
      }

      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || res.statusText || "Failed to send");
      }

      setSent(true);
      // Optional: auto-close after success
      // setTimeout(onClose, 1000);
    } catch (e: any) {
      setError(e?.message || "Failed to send email. Check server logs.");
      console.error("sendEmails error:", e);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-[92%] max-w-md rounded-2xl bg-white text-black shadow-xl">
        <div className="px-5 py-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold">Schedule this date</h2>
          <button onClick={onClose} className="p-2 rounded-md hover:bg-zinc-100">✖</button>
        </div>

        <div className="px-5 py-4 space-y-4">
          <div className="text-sm text-zinc-700">
            <div className="font-semibold">{idea.title}</div>
            <div>
              {idea.location ? <>📍 {idea.location} · </> : null}
              {"$".repeat(idea.cost)}
              {idea.url ? (
                <> · <a className="text-[#274c77] underline" href={idea.url} target="_blank" rel="noreferrer">link</a></>
              ) : null}
            </div>
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">Date & time</label>
            <input
              type="datetime-local"
              value={when}
              onChange={(e) => setWhen(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#274c77]"
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">Your email</label>
              <input
                type="email"
                value={youEmail}
                onChange={(e) => setYouEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#274c77]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Partner’s email</label>
              <input
                type="email"
                value={partnerEmail}
                onChange={(e) => setPartnerEmail(e.target.value)}
                placeholder="partner@example.com"
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#274c77]"
                required
              />
            </div>
          </div>
        </div>

        <div className="px-5 py-4 flex items-center justify-end gap-2 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-zinc-300 hover:bg-zinc-100"
            disabled={sending}
          >
            Cancel
          </button>
          <button
            disabled={!valid || sending}
            onClick={sendEmails}
            className="px-4 py-2 rounded-lg bg-[#274c77] text-white hover:bg-[#1f3b5c] disabled:opacity-50"
          >
            {sending ? "Sending..." : sent ? "Sent!" : "Send emails"}
          </button>
        </div>
      </div>
    </div>
  );
}
