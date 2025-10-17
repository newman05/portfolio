"use client";

import { useEffect, useRef, useState } from "react";
import Image from 'next/image';

const projects = [
  {
    title: "PdfParse",
    description: "A webtool that parses PDF files into a structured format, with an interactive chatbot.",
    tags: ["Next.js", "TypeScript", "TailwindCSS", "tRPC", "Prisma"],
    link: "https://github.com/newman05/pdfparse",
  },
  {
    title: "ForumSite",
    description: "A discussion forum web application with user authentication and real-time updates.",
    tags: ["Next.js", "TypeScript", "Upstash Redis", "TailwindCSS", "NextAuth"],
    link: "https://github.com/newman05/forumsite",
  },
];

export default function Projects() {
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
      id="projects"
      ref={sectionRef}
      className="min-h-screen flex items-center py-20"
    >
      <div className="max-w-6xl w-full px-6">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-5xl md:text-7xl font-light tracking-tight mb-12">
            Projects.
          </h2>

          <p className="text-lg text-gray-400 font-light leading-relaxed mb-16">
            A selection of my recent work and side projects.
          </p>

          <div className="space-y-8">
            {projects.map((project, index) => (
              <a
                key={project.title}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`group block relative border border-gray-800 p-8 hover:border-white transition-all duration-500 ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-10"
                }`}
                style={{
                  transitionDelay: isVisible ? `${index * 150}ms` : "0ms",
                }}
              >
                {project.title === "PdfParse" && (
                  <div className="absolute inset-0 -z-10 opacity-10 pointer-events-none">
                    <Image src="/parseblur.png" alt="" fill className="object-cover" priority={false} />
                  </div>
                )}

                {project.title === "ForumSite" && (
                  <div className="absolute inset-0 -z-10 opacity-10 pointer-events-none">
                    <Image src="/newfr.png" alt="" fill className="object-cover" priority={false} />
                  </div>
                )}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                  <h3 className="text-2xl md:text-3xl font-light tracking-wide group-hover:text-gray-300 transition-colors">
                    {project.title}
                  </h3>
                  <svg
                    className="w-6 h-6 text-gray-400 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
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

                <p className="text-gray-400 font-light leading-relaxed mb-6">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs border border-gray-800 text-gray-400 group-hover:border-gray-600 group-hover:text-gray-300 transition-all duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}