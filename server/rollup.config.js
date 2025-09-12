// rollup.config.js
import { babel } from '@rollup/plugin-babel'

export default {
  input: './server_demo/pkg_server.js',
  output: {
    file: 'bundle.js',
    format: 'cjs',
  },
  plugins: [babel({ babelHelpers: 'bundled' })],
}
