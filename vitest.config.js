// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';  // Importando o plugin Vue

// Definindo a configuração do Vite
export default defineConfig({
  plugins: [vue()],  // Adicionando o plugin Vue
  test: {
    globals: true,  // Permite o uso de describe, it, expect, etc.
    environment: 'jsdom',  // Ambiente de teste para Vue
  },
});
