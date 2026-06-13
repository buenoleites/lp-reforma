import { useReveal } from "../lib/useReveal";
import "./Presencial.css";

const ITEMS = [
  "Tirar dúvidas diretamente com os especialistas.",
  "Discutir cenários reais da sua prefeitura.",
  "Comparar estratégias adotadas por outros municípios.",
  "Construir uma visão mais clara da transição.",
];

export default function Presencial() {
  const [ref, visible] = useReveal();

  return (
    <section
      id="presencial"
      ref={ref}
      className={`section presencial${visible ? " is-visible" : ""}`}
    >
      <div className="container">
        <div className="presencial__grid">
          <div className="presencial__media" data-reveal style={{ "--reveal-i": 0 }}>
            <img
              className="presencial__img"
              src="/presencial.jpg"
              alt="Participantes durante a capacitação presencial, atentos à aula"
              loading="lazy"
            />
          </div>

          <div className="presencial__content">
            <h2
              className="presencial__title"
              data-reveal
              style={{ "--reveal-i": 1 }}
            >
              Aprenda discutindo os desafios reais do seu município.
            </h2>

            <p
              className="presencial__text"
              data-reveal
              style={{ "--reveal-i": 2 }}
            >
              A transição para o novo sistema tributário exige interpretação,
              debate e troca de experiências.
            </p>

            <p
              className="presencial__lead"
              data-reveal
              style={{ "--reveal-i": 3 }}
            >
              No formato presencial, você consegue:
            </p>

            <ul className="presencial__items">
              {ITEMS.map((item, i) => (
                <li
                  className="presencial__item"
                  key={item}
                  data-reveal
                  style={{ "--reveal-i": i + 4 }}
                >
                  <span className="presencial__check" aria-hidden="true">
                    <svg className="presencial__check-svg" viewBox="0 0 24 24">
                      <path d="M5 12.5l4.5 4.5L19 7" />
                    </svg>
                  </span>
                  <span className="presencial__item-text">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
