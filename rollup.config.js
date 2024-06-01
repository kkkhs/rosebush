import json from '@rollup/plugin-json'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
import scss from 'rollup-plugin-scss'
import excludeDependenciesFromBundle from 'rollup-plugin-exclude-dependencies-from-bundle'

const overrides = {
  compilerOptions: {
    declaration: true,
  },
  exclude: [
    'src/**/*.test.tsx',
    'src/**/*.stories.tsx',
    'src/**/*.mdx',
    'src/setupTests.ts',
  ],
}

const config = {
  input: 'src/index.tsx',
  output: {
    file: 'dist/index.es.js',
    format: 'es',
  },
  plugins: [
    json(),
    commonjs(),
    nodeResolve(),
    typescript({ tsconfigOverride: overrides }),
    excludeDependenciesFromBundle(), // 忽略依赖
    scss({ output: 'dist/index.css' }), // 编译 scss
  ],
}

export default config
