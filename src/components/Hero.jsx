import { handleAnchorClick } from "../lib/scroll";
import { asset } from "../lib/asset";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero" id="topo">
      {/* FOTO (entra depois): servidor ou equipe da área fazendária em reunião,
          analisando números, relatórios ou arrecadação municipal.
          Basta definir background-image em .hero__media. */}
      <div
        className="hero__media"
        style={{ "--media-bg": `url(${asset("hero-bg.jpg")})` }}
        aria-hidden="true"
      />
      <div className="hero__overlay" aria-hidden="true" />

      <div className="container hero__inner">
        <div className="hero__content">
          <h1 className="hero__title">
            Passo a passo para preparar seu município para a{" "}
            <u>Reforma Tributária</u>.
          </h1>

          <p className="hero__subtitle">
            Curso presencial em Curitiba para quem precisa entender os novos
            tributos, adaptar rotinas, organizar a transição e proteger a
            arrecadação municipal diante das mudanças que já começaram.
          </p>

          <p className="hero__tags">
            Fiscalização • arrecadação • cadastro econômico • gestão tributária •
            estratégia municipal
          </p>

          <a
            className="btn btn--primary btn--lg hero__cta"
            href="#inscricao"
            onClick={handleAnchorClick}
          >
            Garanta sua vaga
          </a>

          <p className="hero__microcopy">
            04 a 07 de agosto de 2026 • 17 horas • Curitiba-PR
          </p>
        </div>
      </div>
    </section>
  );
}
