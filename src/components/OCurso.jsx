import { useReveal } from "../lib/useReveal";
import { handleAnchorClick } from "../lib/scroll";
import { asset } from "../lib/asset";
import "./OCurso.css";

const ITEMS = [
  {
    title: "Novos tributos",
    desc: "Entenda como IBS, CBS, IS e IVS impactam a realidade municipal.",
  },
  {
    title: "Arrecadação e fiscalização",
    desc: "Compreenda como as rotinas operacionais serão afetadas pelo novo modelo.",
  },
  {
    title: "Cadastro econômico",
    desc: "Prepare as bases cadastrais para os novos fluxos de informação.",
  },
  {
    title: "Gestão da transição",
    desc: "Construa um plano para acompanhar as mudanças entre 2026 e 2033.",
  },
];

export default function OCurso() {
  const [ref, visible] = useReveal();

  return (
    <section
      id="o-curso"
      ref={ref}
      className={`section o-curso${visible ? " is-visible" : ""}`}
    >
      <div className="container">
        <h2 className="o-curso__heading" data-reveal style={{ "--reveal-i": 0 }}>
          O que este curso ajuda você a estruturar na prática.
        </h2>

        <div className="o-curso__grid">
          <div className="o-curso__content">
            <p className="o-curso__lead" data-reveal style={{ "--reveal-i": 1 }}>
              Mais clareza para compreender as mudanças, organizar equipes e
              construir uma estratégia de adaptação para o município.
            </p>

            <ul className="o-curso__items">
              {ITEMS.map((item, i) => (
                <li
                  className="o-curso__item"
                  key={item.title}
                  data-reveal
                  style={{ "--reveal-i": i + 2 }}
                >
                  <h3 className="o-curso__item-title">{item.title}</h3>
                  <p className="o-curso__item-desc">{item.desc}</p>
                </li>
              ))}
            </ul>

            <a
              className="btn btn--primary btn--md o-curso__cta"
              href="#inscricao"
              onClick={handleAnchorClick}
              data-reveal
              style={{ "--reveal-i": ITEMS.length + 2 }}
            >
              Garanta sua vaga
            </a>
          </div>

          <div className="o-curso__media" data-reveal style={{ "--reveal-i": 1 }}>
            <img
              className="o-curso__img"
              src={asset("o-curso.jpg")}
              alt="Servidor analisando documentos e indicadores financeiros em sua mesa de trabalho"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
