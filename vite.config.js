import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      // Proxy API requests to the backend server during development
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true, // Recommended for virtual hosted sites
        secure: false,      // Can be set to false if the backend is on HTTP
      },
    },
  },
});
