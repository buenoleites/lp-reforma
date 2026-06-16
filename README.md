# LP Reforma Tributária — Unyflex

Landing page (React + Vite) servida em **https://mkt.unyflex.com.br/reforma**.

Na VPS, a página roda como um contêiner Docker atrás do Traefik (mesma rede do
n8n). O Traefik roteia **por caminho**: cada LP fica em um subcaminho do mesmo
domínio (`/reforma`, `/licitacoes`, `/ouvidoria`, ...).

---

## Desenvolvimento local

```bash
npm install
npm run dev      # http://localhost:5173/reforma/
npm run build    # gera a pasta dist/
npm run preview  # serve o build em http://localhost:4173/reforma/
```

> A LP é servida em um subcaminho, então o endereço local inclui `/reforma/`.
> Isso é definido por `base` no [vite.config.js](vite.config.js).

---

## Deploy na VPS

A imagem **compila a LP sozinha** (build multi-stage no [Dockerfile](deploy/Dockerfile)),
então **não é preciso ter Node instalado na VPS** — só Docker. A pasta `dist/`
**não** vai para o Git: ela é gerada dentro da imagem.

Para publicar ou atualizar (a partir da raiz do repositório, na VPS):

```bash
git pull
docker compose -f deploy/docker-compose.yml up -d --build
```

Pronto — a página fica disponível em https://mkt.unyflex.com.br/reforma.

---

## Como funciona o roteamento

- O **Traefik** recebe `mkt.unyflex.com.br/reforma` e encaminha para este
  contêiner (label `PathPrefix(/reforma)` em [deploy/docker-compose.yml](deploy/docker-compose.yml)).
- Dentro do contêiner, o **nginx** serve os arquivos a partir de
  `/usr/share/nginx/html/reforma` ([deploy/nginx.conf](deploy/nginx.conf)).
- O **Vite** compila com `base: '/reforma/'`, então todo asset (JS, CSS,
  imagens) é referenciado a partir desse subcaminho.
- Imagens da pasta `public/` são resolvidas pelo helper
  [src/lib/asset.js](src/lib/asset.js), que prefixa a base automaticamente —
  por isso o código não tem o nome "reforma" escrito à mão.

---

## Criar uma nova LP (ex.: `/licitacoes`)

Cada LP é **um repositório próprio** + **um contêiner próprio**. Para começar,
copie este projeto e ajuste 4 pontos (troque `reforma` por `licitacoes`):

| Onde | O que mudar |
|------|-------------|
| [vite.config.js](vite.config.js) | `base: '/licitacoes/'` |
| [deploy/Dockerfile](deploy/Dockerfile) | pasta de destino `.../html/licitacoes` |
| [deploy/docker-compose.yml](deploy/docker-compose.yml) | nome do serviço/contêiner, `image:` e as labels `reforma` → `licitacoes` (inclusive o `PathPrefix(/licitacoes)`) |

O arquivo [deploy/nginx.conf](deploy/nginx.conf) é genérico e **não precisa ser
alterado**. Depois, na VPS:

```bash
git clone <repo-da-nova-lp> && cd <pasta>
docker compose -f deploy/docker-compose.yml up -d --build
```

A nova LP sobe em `https://mkt.unyflex.com.br/licitacoes` sem afetar as demais.

> Observação: a raiz `https://mkt.unyflex.com.br/` (sem caminho) não aponta para
> nenhuma LP. Se quiser que ela redirecione para uma página específica, dá para
> adicionar uma regra no Traefik depois.
