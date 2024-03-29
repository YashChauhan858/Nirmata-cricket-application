import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@Components': '/src/Components',
      '@Pages': '/src/Pages',
      '@Utils': '/src/Utils',
      '@Assets': '/src/assets',
    },
  },
})
