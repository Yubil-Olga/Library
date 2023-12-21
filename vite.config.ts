import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import path from 'path';

export default defineConfig(() => {
  return {
    plugins: [svgr(), react()],
    resolve: {
      alias: {
        src: path.resolve('src/'),
      },
    },
  };
});
