# Build multi-stage: a VPS compila a LP sozinha (não precisa de Node instalado
# no host) e serve os estáticos com nginx. Basta `docker compose up -d --build`.

# ---- Etapa 1: compila a LP com Node ----
FROM node:22-alpine AS build
WORKDIR /app

# Instala dependências primeiro para aproveitar o cache de camadas.
COPY package.json package-lock.json ./
RUN npm ci

# Copia o código e gera a build estática em /app/dist (base: /reforma/).
COPY . .
RUN npm run build

# ---- Etapa 2: serve os estáticos com nginx ----
FROM nginx:alpine

# A LP é servida em /reforma, então os arquivos ficam nessa subpasta.
# Para uma nova LP, troque "reforma" aqui (e a base no vite.config.js).
COPY --from=build /app/dist /usr/share/nginx/html/reforma
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
