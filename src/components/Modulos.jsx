import { useReveal } from "../lib/useReveal";
import { handleAnchorClick } from "../lib/scroll";
import "./Modulos.css";

const MODULOS = [
  {
    n: "Módulo 1",
    title: "A Reforma Tributária e o Novo Federalismo Fiscal",
    desc: "Entenda os fundamentos da reforma e os impactos para a distribuição de competências e receitas.",
  },
  {
    n: "Módulo 2",
    title: "Os Novos Tributos na Prática",
    desc: "IBS, CBS, IS e IVS aplicados ao cotidiano municipal.",
  },
  {
    n: "Módulo 3",
    title: "O IVA Dual Brasileiro",
    desc: "Estrutura, funcionamento e efeitos na gestão tributária.",
  },
  {
    n: "Módulo 4",
    title: "Fiscalização, Arrecadação e Rotinas Administrativas",
    desc: "Adequações necessárias para operação do novo sistema.",
  },
  {
    n: "Módulo 5",
    title: "Cadastro Econômico e Cadastro Financeiro",
    desc: "Organização das informações que sustentarão a arrecadação municipal.",
  },
  {
    n: "Módulo 6",
    title: "Transição, Riscos e Estratégias Municipais de Adaptação",
    desc: "Planejamento prático para os desafios de 2026 a 2033.",
  },
];

export default function Modulos() {
  const [ref, visible] = useReveal();

  return (
    <section
      id="modulos"
      ref={ref}
      className={`section modulos${visible ? " is-visible" : ""}`}
    >
      <div className="container">
        <h2 className="modulos__heading" data-reveal style={{ "--reveal-i": 0 }}>
          Os 6 módulos do curso.
        </h2>

        <div className="modulos__grid">
          {MODULOS.map((m, i) => (
            <article
              className="modulo"
              key={m.n}
              data-reveal
              style={{ "--reveal-i": i + 1 }}
            >
              <span className="modulo__num">{m.n}</span>
              <h3 className="modulo__title">{m.title}</h3>
              <p className="modulo__desc">{m.desc}</p>
            </article>
          ))}
        </div>

        <div
          className="modulos__media"
          data-reveal
          style={{ "--reveal-i": MODULOS.length + 1 }}
        >
          <img
            className="modulos__img"
            src="/modulos.jpg"
            alt="Instrutor conduzindo a capacitação presencial sobre a Reforma Tributária"
            loading="lazy"
          />
        </div>

        <div
          className="modulos__cta"
          data-reveal
          style={{ "--reveal-i": MODULOS.length + 2 }}
        >
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
