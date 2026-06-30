import { defineConfig } from "vite";
import path from "node:path"; // Импортируем модуль 'path' для работы с путями

// https://vite.dev/config/
export default defineConfig({
  base: "/dura-at-home/",
  build: {
    outDir: "docs"
  },
  server: {
    port: 8080,
    open: true,
  },
  resolve: {
    alias: {
      // Создаем алиас '@app', ведущий в папку 'src/app'
      '@app': path.resolve(__dirname, 'src/app'),
      '@shared': path.resolve(__dirname, 'src/shared'),
      '@entities': path.resolve(__dirname, 'src/entities'),
    }
  },
});