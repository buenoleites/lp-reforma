import Carousel from "./Carousel";
import { useReveal } from "../lib/useReveal";
import "./Abordagem.css";

const CARDS = [
  {
    title: "Foco municipal",
    desc: "Conteúdo voltado à realidade das prefeituras e seus desafios operacionais.",
  },
  {
    title: "Aplicação prática",
    desc: "Discussão de procedimentos, rotinas e impactos concretos.",
  },
  {
    title: "Estratégia de transição",
    desc: "Planejamento para os próximos anos da implementação.",
  },
  {
    title: "Gestão pública",
    desc: "Linguagem compatível com a administração municipal.",
  },
];

export default function Abordagem() {
  const [ref, visible] = useReveal();

  return (
    <section
      id="abordagem"
      ref={ref}
      className={`section abordagem${visible ? " is-visible" : ""}`}
    >
      <div className="container">
        {/* FOTO (entra depois): ambiente de capacitação presencial com
            servidores em treinamento. Defina background-image em
            .abordagem-band__media. */}
        <div className="abordagem-band" data-reveal style={{ "--reveal-i": 0 }}>
          <div className="abordagem-band__media" aria-hidden="true" />
          <div className="abordagem-band__overlay" aria-hidden="true" />
          <div className="abordagem-band__content">
            <h2 className="abordagem-band__title">
              A Reforma Tributária exige mais do que entendimento conceitual.
            </h2>
            <p className="abordagem-band__text">
              Você precisa saber como ela afeta arrecadação, fiscalização,
              cadastros e decisões administrativas do município.
            </p>
          </div>
        </div>

        <div className="abordagem-carousel">
          <Carousel items={CARDS} ariaLabel="Como o curso aborda a transição" />
        </div>
      </div>
    </section>
  );
}
