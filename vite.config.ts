import vueJsx from '@vitejs/plugin-vue-jsx';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 15767,
    host: '0.0.0.0'
  },
  plugins: [
    vue(),
    vueJsx(),
  ],
});
