import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

// Plain Vitest rather than a Nuxt runtime environment: the units under test
// are framework-free modules. The aliases below mirror Nuxt's so imports read
// identically in tests and in application code.
export default defineConfig({
  test: {
    environment: 'node',
    include: ['test/**/*.test.ts'],
  },
  resolve: {
    alias: {
      '#shared': fileURLToPath(new URL('./shared', import.meta.url)),
      '~': fileURLToPath(new URL('./app', import.meta.url)),
    },
  },
})
