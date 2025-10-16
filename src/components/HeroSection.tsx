"use client";
import React from 'react';
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "./ui/hero-highlight";

export function HeroSection() {
    return (
        <HeroHighlight>
            <motion.h1
                initial={{
                    opacity: 0,
                    y: 20,
                }}
                animate={{
                    opacity: 1,
                    y: [20, -5, 0],
                }}
                transition={{
                    duration: 0.5,
                    ease: [0.4, 0.0, 0.2, 1],
                }}
                className="text-4xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto"
            >
                Passionate about Code.<br />
                Driven by Creativity.<br />
                Hi! I am{" "}
                <Highlight className="text-black dark:text-white">
                    Naman
                </Highlight>
            </motion.h1>
            <div className='flex flex-col justify-center items-center mt-4'>
                <div>
                    <p className="text-lg px-4 md:text-lg lg:text-xl text-neutral-500 dark:text-neutral-400 max-w-2xl leading-relaxed lg:leading-snug text-center mx-auto mt-4">
                        Computer Science student with a passion for creating meaningful web applications and solving complex problems.
                    </p>
                </div>
                <div>
                    <button className="mt-4 px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-300 font-semibold">
                        <a href="https://drive.google.com/your-resume-link" target="_blank" rel="noopener noreferrer">
                            View Resume
                        </a>
                    </button>
                </div>
            </div>
        </HeroHighlight>
    );
}