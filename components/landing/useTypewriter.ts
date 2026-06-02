// Small typewriter hook for the landing hero/demo animations.
"use client";

import { useEffect, useState } from "react";

/**
 * Types `text` out character-by-character. When it finishes, waits `pauseMs`
 * then clears and restarts (if `loop`). Resets whenever `text` changes
 * (e.g. on language toggle), so it always reflects the current copy.
 */
export function useTypewriter(text: string, speedMs = 45, pauseMs = 2200, loop = true) {
  const [shown, setShown] = useState("");

  useEffect(() => {
    setShown("");
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;

    function tick() {
      if (i <= text.length) {
        setShown(text.slice(0, i));
        i += 1;
        timer = setTimeout(tick, speedMs);
      } else if (loop) {
        timer = setTimeout(() => {
          i = 0;
          tick();
        }, pauseMs);
      }
    }

    tick();
    return () => clearTimeout(timer);
  }, [text, speedMs, pauseMs, loop]);

  return shown;
}
