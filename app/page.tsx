"use client";

export default function Home() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-white relative"
      style={{ backgroundColor: '#94d2bd' }}
    >

      {/* Random Date Button */}
      <button className="button mb-8">
        <span className="text">Random Date!</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </button>

      {/* Ball */}
      <div className="stage my-8">
        <figure className="ball bubble">
          <span className="shadow"></span>
        </figure>
      </div>

      {/* Suggestion Button */}
      <button
        onClick={() => console.log("Open suggestion modal")}
        className="button mt-8 cursor-pointer hover:bg-[#1f3b5c]"
      >
        <span>Add Suggestion</span>
        <img
          src="/turtle.png"
          alt="Turtle"
          className="w-6 h-6"
        />
      </button>

    </div>
  );
}
