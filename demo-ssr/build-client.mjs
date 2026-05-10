import process from 'node:process'
import { build } from 'esbuild'

build({
  entryPoints: ['src/client.tsx'],
  outfile: 'public/client.js',
  bundle: true,
  format: 'esm',
  platform: 'browser',
  sourcemap: true,
  target: ['es2020'],
  jsx: 'automatic',
})
  .then(() => {
    console.log('Client bundle built at public/client.js')
  })
  .catch((error) => {
    console.error('Build failed:', error)
    process.exit(1)
  })
