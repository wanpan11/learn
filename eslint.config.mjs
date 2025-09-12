// eslint.config.mjs
import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'no-console': 0,
    'unused-imports/no-unused-vars': 0,
    'no-unused-vars': 0,
    'no-restricted-properties': 0,
    'no-proto': 0,
    'no-useless-constructor': 0,
    'prefer-rest-params': 0,
    'no-restricted-globals': 0,
    'no-new': 0,
    'no-extend-native': 0,
    'symbol-description': 0,
    'no-debugger': 0,
  },
})
