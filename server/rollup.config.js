// rollup.config.js
import { babel } from '@rollup/plugin-babel';

export default {
    input: 'index.js',
    output: {
      file: 'bundle.js',
      format: 'cjs'
    },
    plugins: [babel({ babelHelpers: 'bundled' })]
  };