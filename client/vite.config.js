import path from 'path'
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'

const rootPath = path.join(process.cwd(), 'src');;

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // console.log(command, mode);
  return {
    root: rootPath,
    plugins: [react({
      babel: {
        presets: ['@babel/preset-react'],
      }
    })],
  };
});
