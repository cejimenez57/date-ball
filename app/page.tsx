export default function Home() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-white"
      style={{ backgroundColor: '#94d2bd' }}
    >
  {/* Ball */}
  <div className="stage">
        <figure className="ball bubble">
          <span className="shadow"></span>
        </figure>
  </div>


  {/* Button */}
<button className="button mt-12">
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


  {/* Text Box */}
      <div className="mt-6 relative w-80">
        <input
          type="text"
          placeholder="suggestions.."
          className="w-full px-4 py-2 pr-12 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#274c77] shadow"
        />
        <img
          src="/turtle.png" 
          alt="Send"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 cursor-pointer hover:opacity-80 transition"
        />
      </div>
    </div>
  )
}
