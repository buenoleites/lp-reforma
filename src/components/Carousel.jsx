import { useCallback, useEffect, useRef, useState } from "react";
import { useReveal } from "../lib/useReveal";
import "./Carousel.css";

const getPerView = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(max-width: 520px)").matches
    ? 1
    : 2;

/**
 * Carrossel no estilo da LP original: mostra 2 cards por vez (1 no mobile),
 * com setas que aparecem no hover, autoplay e wrap-around.
 *
 * props:
 *  - items: array de dados dos cards
 *  - renderItem(item, i): conteúdo interno do card (opcional; por padrão
 *    renderiza item.title + item.desc)
 *  - autoplayMs: intervalo do autoplay (padrão 4200)
 *  - ariaLabel: rótulo acessível
 */
export default function Carousel({
  items,
  renderItem,
  autoplayMs = 4200,
  ariaLabel = "Carrossel",
}) {
  const [revealRef, visible] = useReveal({ threshold: 0.2 });
  const [current, setCurrent] = useState(0);
  const [perView, setPerView] = useState(getPerView);
  const [resizeTick, setResizeTick] = useState(0);

  const trackRef = useRef(null);
  const firstCardRef = useRef(null);

  const maxIndex = Math.max(0, items.length - perView);

  const move = useCallback(
    (dir) => {
      setCurrent((c) => {
        let next = c + dir;
        if (next > maxIndex) next = 0;
        if (next < 0) next = maxIndex;
        return next;
      });
    },
    [maxIndex]
  );

  // Aplica o deslocamento do track de forma imperativa (transição via CSS).
  useEffect(() => {
    const track = trackRef.current;
    const card = firstCardRef.current;
    if (!track || !card) return;
    const cardWidth = card.getBoundingClientRect().width;
    const styles = window.getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap || "0") || 0;
    track.style.transform = `translate3d(-${current * (cardWidth + gap)}px, 0, 0)`;
  }, [current, perView, resizeTick]);

  // Resize: recalcula cards-por-view, limita o índice e remede o offset.
  useEffect(() => {
    let timer;
    const onResize = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        const pv = getPerView();
        setPerView(pv);
        setCurrent((c) => Math.min(c, Math.max(0, items.length - pv)));
        setResizeTick((x) => x + 1);
      }, 120);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.clearTimeout(timer);
    };
  }, [items.length]);

  // Autoplay (reinicia a cada mudança de slide).
  useEffect(() => {
    if (items.length <= perView) return undefined;
    const id = window.setInterval(() => move(1), autoplayMs);
    return () => window.clearInterval(id);
  }, [move, autoplayMs, current, items.length, perView]);

  return (
    <div
      ref={revealRef}
      className={`carousel${visible ? " is-inview" : ""}`}
      aria-roledescription="carrossel"
      aria-label={ariaLabel}
    >
      <button
        className="carousel__arrow carousel__arrow--prev"
        type="button"
        aria-label="Card anterior"
        onClick={() => move(-1)}
      >
        ‹
      </button>

      <div className="carousel__viewport">
        <div className="carousel__track" ref={trackRef}>
          {items.map((item, i) => (
            <article
              className="carousel__card"
              key={i}
              ref={i === 0 ? firstCardRef : null}
            >
              {renderItem ? (
                renderItem(item, i)
              ) : (
                <>
                  <p className="carousel__title">{item.title}</p>
                  {item.desc ? (
                    <p className="carousel__desc">{item.desc}</p>
                  ) : null}
                </>
              )}
            </article>
          ))}
        </div>
      </div>

      <button
        className="carousel__arrow carousel__arrow--next"
        type="button"
        aria-label="Próximo card"
        onClick={() => move(1)}
      >
        ›
      </button>
    </div>
  );
}
