import { useReveal } from "../lib/useReveal";
import { handleAnchorClick } from "../lib/scroll";
import "./ParaQuem.css";

const CARDS = [
  {
    img: "/card-1.jpg",
    title: "Responder ao impacto da reforma",
    items: [
      "Impacto na arrecadação.",
      "IBS e CBS na prática.",
      "Decisões para orientar a gestão.",
    ],
  },
  {
    img: "/card-2.jpg",
    title: "Preparar a operação do município",
    items: [
      "Evolução dos cadastros.",
      "Adaptação das rotinas administrativas.",
      "Planejamento para a transição.",
    ],
  },
];

export default function ParaQuem() {
  const [ref, visible] = useReveal();

  return (
    <section
      id="para-quem"
      ref={ref}
      className={`section para-quem${visible ? " is-visible" : ""}`}
    >
      <div className="container">
        {/* FOTO (entra depois): equipe técnica municipal em reunião, análise de
            indicadores ou discussão de planejamento. Defina background-image
            em .pq-band__media. */}
        <div className="pq-band" data-reveal style={{ "--reveal-i": 0 }}>
          <div className="pq-band__media" aria-hidden="true" />
          <div className="pq-band__overlay" aria-hidden="true" />
          <div className="pq-band__content">
            <h2 className="pq-band__title">
              Para quem está sendo cobrado por respostas que ainda não vieram
              prontas.
            </h2>
            <p className="pq-band__text">
              A Reforma Tributária já saiu do debate teórico. Agora ela chegou à
              rotina dos municípios. Enquanto a transição avança, surgem perguntas
              que afetam diretamente arrecadação, fiscalização, cadastro econômico
              e planejamento financeiro.
            </p>
          </div>
        </div>

        <div className="pq-cards">
          {CARDS.map((card, i) => (
            <article
              className="pq-card"
              key={card.title}
              data-reveal
              style={{ "--reveal-i": i + 1 }}
            >
              <div
                className="pq-card__media"
                style={{ backgroundImage: `url("${card.img}")` }}
                aria-hidden="true"
              />
              <div className="pq-card__overlay" aria-hidden="true" />
              <div className="pq-card__content">
                <h3 className="pq-card__title">{card.title}</h3>
                <ul className="pq-card__list">
                  {card.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <p className="pq-closing" data-reveal style={{ "--reveal-i": 3 }}>
          Este curso foi desenvolvido para quem precisa{" "}
          <strong>transformar incerteza em plano de ação.</strong>
        </p>

        <div className="pq-cta" data-reveal style={{ "--reveal-i": 4 }}>
          <a
            className="btn btn--primary btn--md"
            href="#inscricao"
            onClick={handleAnchorClick}
          >
            Garanta sua vaga
          </a>
        </div>
      </div>
    </section>
  );
}
