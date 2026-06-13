import { useEffect, useRef, useState } from "react";

const SUPPORTS_IO =
  typeof window !== "undefined" && "IntersectionObserver" in window;

/**
 * Revela uma seção quando ela entra na viewport.
 * Retorna [ref, visible]: aplique ref na seção e a classe .is-visible
 * quando visible for true. Os filhos com [data-reveal] animam em cascata.
 */
export function useReveal({ threshold = 0.18, once = true } = {}) {
  const ref = useRef(null);
  // Sem IntersectionObserver, já começa visível (fallback).
  const [visible, setVisible] = useState(!SUPPORTS_IO);

  useEffect(() => {
    const el = ref.current;
    if (!el || !SUPPORTS_IO) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) io.unobserve(entry.target);
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { threshold }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold, once]);

  return [ref, visible];
}
