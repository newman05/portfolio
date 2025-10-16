"use client";

import { useEffect, useRef, useState } from "react";
import { links } from "./Links"; // Import links from Links.tsx

export default function Profiles() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <section
      id="profiles"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center py-20"
    >
      <div className="max-w-4xl mx-auto px-6 w-full">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-5xl md:text-7xl font-light tracking-tight mb-12">
            Profiles.
          </h2>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {links.map((link, index) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative overflow-hidden border border-gray-800 p-6 hover:border-white transition-all duration-500 ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-10"
                }`}
                style={{
                  transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
                }}
              >
                <div className="relative z-10 flex items-start gap-4">
                  {/* Avatar: render image if provided, otherwise fall back to SVG logo */}
                  <div className="flex-shrink-0">
                    {link.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={link.image}
                        alt={`${link.name} avatar`}
                        className="w-12 h-12 rounded-full object-cover border border-gray-700"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-900 border border-gray-700">
                        {link.logo}
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-light tracking-wide">
                        {link.name}
                      </h3>
                      <svg
                        className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-400 font-light text-sm group-hover:text-gray-300 transition-colors">
                      {link.description || `Follow me on ${link.name}`}
                    </p>
                  </div>
                </div>

                {/* Hover effect background */}
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}