/* eslint-disable no-unused-vars */
import path from 'path';
import fs from 'fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { LOADIPHLPAPI } from 'dns';

const rootPath = path.join(process.cwd(), 'src');
const outDir = path.resolve(process.cwd(), './dist');

const fileRegex = /\.html$/;
function myPlugin() {
  return {
    name: 'transform-file',
    writeBundle(outputOptions) {
      const output = outputOptions.dir;

      const files = fs.readdirSync(output);
      files.forEach(el => {
        if (fileRegex.test(el)) {
          const htmlStr = fs.readFileSync(output + '/' + el).toString();

          const bodySt = '<body>';
          const insetInd = htmlStr.indexOf(bodySt);

          const bodyStart = htmlStr.slice(0, insetInd + 6);
          const bodyEnd = htmlStr.slice(insetInd + 6);

          const newHtmlstr = `${bodyStart}<div>1111111</div>${bodyEnd}`;

          fs.writeFile(output + '/index.ftl', newHtmlstr, () => {});
          fs.unlink(output + '/index.html', () => {});
        }
      });
    },
  };
}

export default defineConfig(({ command, mode }) => {
  console.log(command, mode);
  return {
    root: rootPath,
    plugins: [
      react({
        babel: {
          presets: ['@babel/preset-react'],
        },
      }),
      // myPlugin(),
    ],
    build: {
      outDir,
      emptyOutDir: true,
      // rollupOptions: {
      //   input: 'index.html',
      // },
    },
  };
});
