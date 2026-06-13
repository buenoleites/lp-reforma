import { useEffect, useRef, useState } from "react";
import { handleAnchorClick } from "../lib/scroll";
import "./Navbar.css";

const LINKS = [
  { href: "#para-quem", label: "Para quem" },
  { href: "#o-curso", label: "O curso" },
  { href: "#modulos", label: "Módulos" },
  { href: "#presencial", label: "Presencial" },
  { href: "#inscricao", label: "Inscrição" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef(null);

  // Fecha o menu mobile ao clicar fora do header.
  useEffect(() => {
    function onDocClick(e) {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  function onLinkClick(e) {
    handleAnchorClick(e);
    setOpen(false);
  }

  return (
    <header className={`navbar${open ? " is-open" : ""}`} ref={headerRef}>
      <div className="navbar__inner container">
        <a
          className="logo"
          href="#topo"
          onClick={onLinkClick}
          aria-label="Unyflex — início"
        >
          <img className="logo__img" src="/logo-unyflex.png" alt="Unyflex" />
        </a>

        <nav className="navbar__pill" aria-label="Navegação principal">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={onLinkClick}>
              {l.label}
            </a>
          ))}
        </nav>

        <a
          className="btn btn--primary btn--sm navbar__cta"
          href="#inscricao"
          onClick={onLinkClick}
        >
          Garanta sua vaga
        </a>

        <button
          type="button"
          className="navbar__toggle"
          aria-label="Abrir menu"
          aria-expanded={open}
          onClick={(e) => {
            e.stopPropagation();
            setOpen((v) => !v);
          }}
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          className={`navbar__drop${open ? " is-open" : ""}`}
          aria-label="Navegação"
        >
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={onLinkClick}>
              {l.label}
            </a>
          ))}
          <a className="navbar__drop-cta" href="#inscricao" onClick={onLinkClick}>
            Garanta sua vaga
          </a>
        </nav>
      </div>
    </header>
  );
}
