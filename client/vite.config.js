const path = require('path');

import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';

const rootPath = path.join(process.cwd(), 'src');;

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  console.log(command, mode);
  return {
    root: rootPath,
    plugins: [reactRefresh()],
  };
});
