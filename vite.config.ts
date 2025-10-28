/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // Import path (useful if needed elsewhere, kept from previous edits)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts', // Ruta relativa simple funciona bien aquí
    css: true, // Mantenemos esto si tus componentes importan CSS

    // --- 👇 SECCIÓN DE COBERTURA AÑADIDA 👇 ---
    coverage: {
      provider: 'v8', // Especifica el proveedor de cobertura
      reporter: ['text', 'json', 'html'], // Formatos de informe (texto en terminal, json, html interactivo)
      // Qué archivos incluir en el informe de cobertura
      include: ['src/**/*.{ts,tsx}'],
      // Qué archivos excluir del informe
      exclude: [
        'src/main.tsx',
        'src/vite-env.d.ts',
        'src/context', // Puedes ajustar esto si pruebas tus contextos
        'src/**/types.ts', // Excluye archivos que solo definen tipos
        '**/node_modules/**',
        '**/dist/**',
        '**/tests/**', // Excluye los propios archivos de prueba
        'src/setupTests.ts', // Excluye el archivo de configuración de pruebas
      ],
      // Opcional: Establecer umbrales mínimos de cobertura
      // thresholds: {
      //   lines: 70,
      //   functions: 70,
      //   branches: 70,
      //   statements: 70
      // }
    }
    // --- 👆 FIN SECCIÓN DE COBERTURA 👆 ---
  },
});