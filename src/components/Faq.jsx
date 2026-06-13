import { useState } from "react";
import { useReveal } from "../lib/useReveal";
import "./Faq.css";

const ITEMS = [
  {
    q: "Este curso é voltado apenas para fiscais de tributos?",
    a: "Não. Também é indicado para secretários de Fazenda, equipes de arrecadação, cadastro econômico, gestão tributária e demais profissionais envolvidos na adaptação municipal.",
  },
  {
    q: "O curso aborda apenas conceitos da Reforma Tributária?",
    a: "Não. O foco está na aplicação prática das mudanças na realidade dos municípios.",
  },
  {
    q: "O conteúdo trata da transição prevista para os próximos anos?",
    a: "Sim. O curso aborda estratégias de adaptação e planejamento para o período de transição.",
  },
  {
    q: "Recebo certificado?",
    a: "Sim. Todos os participantes recebem certificado de conclusão.",
  },
  {
    q: "Os materiais ficam disponíveis após o curso?",
    a: "Sim. O acesso aos materiais didáticos é ilimitado.",
  },
  {
    q: "Onde será realizado?",
    a: "Em Curitiba-PR.",
  },
];

export default function Faq() {
  const [ref, visible] = useReveal();
  const [open, setOpen] = useState(null);

  return (
    <section
      id="faq"
      ref={ref}
      className={`section faq${visible ? " is-visible" : ""}`}
    >
      <div className="container faq__container">
        <h2 className="faq__heading" data-reveal style={{ "--reveal-i": 0 }}>
          Perguntas frequentes
        </h2>

        <div className="faq__list">
          {ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                className={`faq__item${isOpen ? " is-open" : ""}`}
                key={item.q}
                data-reveal
                style={{ "--reveal-i": i + 1 }}
              >
                <button
                  type="button"
                  className="faq__question"
                  id={`faq-trigger-${i}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span className="faq__q-text">{item.q}</span>
                  <span className="faq__icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" className="faq__chevron">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </button>

                <div
                  className="faq__answer"
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${i}`}
                >
                  <div className="faq__answer-inner">
                    <p className="faq__a-text">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
