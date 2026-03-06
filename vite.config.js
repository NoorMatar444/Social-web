// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'
// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(),tailwindcss()],
// })


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'https://linked-posts.routemisr.com',
        changeOrigin: true,
        // هذا السطر مهم جداً لإزالة كلمة /api من الرابط قبل إرساله للسيرفر
        rewrite: (path) => path.replace(/^\/api/, ''), 
      },
    },
  },
})