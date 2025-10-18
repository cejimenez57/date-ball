"use client";

type Props = { onClick: () => void };

export default function AddSuggestionButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="button mt-8 cursor-pointer hover:bg-[#1f3b5c]"
    >
      <span>Add Suggestion</span>
      <img src="/turtle.png" alt="Turtle" className="w-6 h-6" />
    </button>
  );
}
