import { useEffect } from "react";
import { trackEvent } from "./lib/meta";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ParaQuem from "./components/ParaQuem";
import OCurso from "./components/OCurso";
import Abordagem from "./components/Abordagem";
import Modulos from "./components/Modulos";
import Presencial from "./components/Presencial";
import Resultados from "./components/Resultados";
import Faq from "./components/Faq";
import CtaFinal from "./components/CtaFinal";

export default function App() {
  useEffect(() => {
    trackEvent('PageView');
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ParaQuem />
        <OCurso />
        <Abordagem />
        <Modulos />
        <Presencial />
        <Resultados />
        <Faq />
        <CtaFinal />
        {/* As próximas seções entram aqui, uma a uma, após confirmação. */}
      </main>
    </>
  );
}
