import { defineConfig } from 'vitest/config'
import tsconfigPats from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPats()],
})
