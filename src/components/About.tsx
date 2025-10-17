"use client";

import { useEffect, useRef, useState } from "react";

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center py-20"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
        >
          <h2 className="text-5xl md:text-7xl font-light tracking-tight mb-12">
            About.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <p className="leading-relaxed">
                I like keeping things simple, fast, and easy to use.
                I also spend a good amount of time on DSA and competitive programming to sharpen my logic.
              </p>

              <p>
                I am constantly looking for opportunities and collaborative work.
                If you have an exciting idea in mind, please feel free to reach out to me for a chat!
              </p>

              <p className="leading-relaxed">
                Apart from coding, I enjoy speedcubing, vibing to DHH tracks and keeping up with new tech.

              </p>
            </div>

            <div className="space-y-6">

              <div className="border border-gray-800 p-6 hover:border-gray-600 transition-all duration-300">
                <h3 className="text-xl mb-3 font-light">Development</h3>
                <p className="text-gray-400 font-light text-sm leading-relaxed">
                  React, Next.js, TypeScript, Tailwind CSS, Node.js, MongoDB, Express.js, tRPC
                </p>
              </div>

              <div className="border border-gray-800 p-6 hover:border-gray-600 transition-all duration-300">
                <h3 className="text-xl mb-3 font-light">Tools</h3>
                <p className="text-gray-400 font-light text-sm leading-relaxed">
                  Git, Vercel, Upstash Redis, Postman
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}