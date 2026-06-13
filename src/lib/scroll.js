/* Scroll suave compartilhado pela navbar e por todos os CTAs da página. */

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/** Rola suavemente até o elemento com o id informado. */
export function scrollToId(id, { offset } = {}) {
  const target = document.getElementById(id);
  if (!target) return;

  const headerOffset = offset ?? (window.innerWidth <= 800 ? 80 : 72);
  const startTop = window.pageYOffset;
  const endTop = target.getBoundingClientRect().top + startTop - headerOffset;

  // Respeita "prefers-reduced-motion": pula direto para o destino.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo(0, endTop);
    return;
  }

  const distance = endTop - startTop;
  const duration = 900;
  let startTime = null;

  function step(now) {
    if (startTime === null) startTime = now;
    const progress = Math.min((now - startTime) / duration, 1);
    window.scrollTo(0, startTop + distance * easeInOutCubic(progress));
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

/**
 * Handler para <a href="#id">. Faz scroll suave quando a seção existe.
 * Se a seção ainda não foi criada, mantém o comportamento padrão do link.
 */
export function handleAnchorClick(event) {
  const href = event.currentTarget.getAttribute("href") || "";
  if (href.charAt(0) !== "#" || href.length < 2) return;

  const id = href.slice(1);
  if (!document.getElementById(id)) return;

  event.preventDefault();
  scrollToId(id);
}
