"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate 100 random dots
  const dots = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: Math.random() * 2 + 1, // Random size between 1-3px
    opacity: Math.random() * 0.5 + 0.2, // Random opacity between 0.2-0.7
  }));

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Decorative dots filling the background */}
      {dots.map((dot) => (
        <div
          key={dot.id}
          className="absolute bg-white rounded-full"
          style={{
            top: `${dot.top}%`,
            left: `${dot.left}%`,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            opacity: dot.opacity,
          }}
        />
      ))}

      <div
        className={`max-w-4xl mx-auto px-6 text-center transition-all duration-1000 relative z-10 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tight mb-6">
          Hi, I am Naman.
        </h1>
        <p className="text-xl md:text-2xl lg:text-3xl text-gray-400 font-light mb-8">
          3rd year computer science student at KIIT, passionate about building web applications. 
        </p>
        <p className="text-base md:text-lg text-gray-500 font-light max-w-2xl mx-auto">
          ...
        </p>

        <button
          onClick={() => {
            document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="mt-12 border border-white px-8 py-3 hover:bg-white hover:text-black transition-all duration-300 font-light tracking-wide"
        >
          Explore
        </button>
      </div>
    </section>
  );
}