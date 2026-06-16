import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // A LP é servida em https://mkt.unyflex.com.br/reforma — todos os assets
  // (JS, CSS, imagens) precisam carregar a partir desse subcaminho.
  // Para uma nova LP, troque APENAS este valor (ex.: "/licitacoes/").
  base: '/reforma/',
  plugins: [react()],
})
