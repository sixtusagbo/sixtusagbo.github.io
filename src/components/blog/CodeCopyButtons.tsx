"use client";

import { useEffect } from "react";

/** Adds a copy button to every code block inside the rendered article. */
export default function CodeCopyButtons() {
  useEffect(() => {
    const figures = document.querySelectorAll<HTMLElement>(
      ".blog-prose [data-rehype-pretty-code-figure]"
    );
    const cleanups: (() => void)[] = [];

    for (const figure of figures) {
      if (figure.querySelector("[data-copy-button]")) continue;
      const pre = figure.querySelector("pre");
      if (!pre) continue;

      const button = document.createElement("button");
      button.type = "button";
      button.dataset.copyButton = "";
      button.setAttribute("aria-label", "Copy code");
      button.textContent = "Copy";
      button.className =
        "absolute top-3 right-3 px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg text-xs text-neutral-300 transition-colors";

      let resetTimer: ReturnType<typeof setTimeout>;
      const onClick = async () => {
        await navigator.clipboard.writeText(pre.innerText);
        button.textContent = "Copied!";
        clearTimeout(resetTimer);
        resetTimer = setTimeout(() => {
          button.textContent = "Copy";
        }, 2000);
      };

      button.addEventListener("click", onClick);
      figure.style.position = "relative";
      figure.appendChild(button);
      cleanups.push(() => {
        clearTimeout(resetTimer);
        button.removeEventListener("click", onClick);
        button.remove();
      });
    }

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  return null;
}
