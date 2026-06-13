import { useReveal } from "../lib/useReveal";
import "./Resultados.css";

// Municípios/órgãos atendidos — fotos do prédio + logo branca por cartão.
// Imagens em /public/muni/<slug>-bg.jpg e /public/muni/<slug>-logo.png
const MUNICIPIOS = [
  { slug: "curitiba", nome: "Câmara de Curitiba" },
  { slug: "maringa", nome: "Prefeitura de Maringá" },
  { slug: "araucaria", nome: "Prefeitura Municipal de Araucária/PR" },
  { slug: "campo-largo", nome: "Prefeitura Municipal de Campo Largo" },
  { slug: "pinhais", nome: "Prefeitura Municipal de Pinhais/PR" },
  { slug: "umuarama", nome: "Prefeitura de Umuarama" },
];

export default function Resultados() {
  const [ref, visible] = useReveal();

  return (
    <section
      id="resultados"
      ref={ref}
      className={`section resultados${visible ? " is-visible" : ""}`}
    >
      <div className="container">
        <h2 className="resultados__heading" data-reveal style={{ "--reveal-i": 0 }}>
          Presença construída na gestão pública.
        </h2>

        <p className="resultados__text" data-reveal style={{ "--reveal-i": 1 }}>
          A Unyflex atua com capacitações voltadas à rotina de órgãos, equipes e
          profissionais que precisam se preparar, adaptar rotinas e decidir com
          mais segurança.
        </p>

        <div className="resultados__grid">
          {MUNICIPIOS.map((m, i) => (
            <article
              className="muni"
              key={m.slug}
              data-reveal
              style={{ "--reveal-i": i + 2 }}
            >
              <div
                className="muni__media"
                style={{ backgroundImage: `url("/muni/${m.slug}-bg.jpg")` }}
                aria-hidden="true"
              />
              <div className="muni__overlay" aria-hidden="true" />
              <div
                className="muni__logo"
                style={{ backgroundImage: `url("/muni/${m.slug}-logo.png")` }}
                role="img"
                aria-label={m.nome}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
