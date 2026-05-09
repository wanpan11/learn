import { build } from 'esbuild';

await build({
  entryPoints: ['src/client.tsx'],
  outfile: 'public/client.js',
  bundle: true,
  format: 'esm',
  platform: 'browser',
  sourcemap: true,
  target: ['es2020'],
  jsx: 'automatic'
});

console.log('Client bundle built at public/client.js');
