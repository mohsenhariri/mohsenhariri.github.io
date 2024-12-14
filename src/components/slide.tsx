"use client";
import { useEffect } from "react";

import "reveal.js/dist/reveal.css";
import "reveal.js/plugin/highlight/monokai.css";
import "reveal.js/dist/theme/black.css";

import Reveal from "reveal.js";
import RevealMarkdown from "reveal.js/plugin/markdown/markdown.esm";

interface RevealPresentationProps {
  content: string;
}

export default function RevealPresentation({
  content,
}: RevealPresentationProps) {
  useEffect(() => {
    let deck: Reveal.Api | null = null;

    try {
      deck = new Reveal({
        plugins: [RevealMarkdown],
        slideNumber: true,
        hash: true,
        progress: true,
        controls: true,
        controlsTutorial: true,
        width: "100%",
        height: "100%",
        margin: 0.04,
        minScale: 0.2,
        maxScale: 2.0,
        center: true,
        disableLayout: false,
        autoSlide: 0,
        autoSlideStoppable: true,
      });
      deck.initialize();
    } catch (error) {
      console.error("Failed to initialize Reveal", error);
    }

    return () => {
      if (deck) {
        deck.destroy();
      }
    };
  }, []);

  return (
    <div className="reveal">
      <div className="slides">
        <section
          data-markdown=""
          data-separator="^\n\n\n"
          data-separator-vertical="^\n\n"
          data-separator-notes="^Note:"
          data-charset="utf-8"
        >
          <textarea style={{ display: "none" }} defaultValue={content} />
        </section>
      </div>
    </div>
  );
}
