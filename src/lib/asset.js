// Resolve o caminho de um arquivo da pasta public/ respeitando a base do Vite.
//
// As imagens ficam em public/ e são referenciadas por caminho absoluto.
// Como a LP é servida em um subcaminho (ex.: /reforma/), um "/hero-bg.jpg"
// cru apontaria para a raiz do domínio e quebraria. Este helper prefixa o
// import.meta.env.BASE_URL ("/reforma/" no build, "/" em dev) para que o
// mesmo código funcione em qualquer base, sem hardcode do nome da LP.
//
//   asset("hero-bg.jpg")  -> "/reforma/hero-bg.jpg"
//   asset("/card-1.jpg")  -> "/reforma/card-1.jpg"
export function asset(path) {
  return `${import.meta.env.BASE_URL}${String(path).replace(/^\//, "")}`;
}
