import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript';

export default [{
  input: 'src/browser.ts',
  output: {
    format: 'umd',
    file: 'browser/es6.js',
    name: 'geoPattern',
    sourcemap: true,
  },
  plugins: [
    nodeResolve({ browser: true, preferBuiltins: false }),
    commonjs(),
    typescript({ tsconfig: 'tsconfig.browser.json' }),
  ],
}, {
  input: 'src/browser.ts',
  output: {
    format: 'umd',
    file: 'browser/es5.js',
    name: 'geoPattern',
    sourcemap: true,
  },
  plugins: [
    nodeResolve({ browser: true, preferBuiltins: false }),
    commonjs(),
    typescript({ tsconfig: 'tsconfig.browser.es5.json' }),
  ],
}, {
  input: 'src/browser-native.ts',
  output: {
    format: 'umd',
    file: 'browser/native.js',
    name: 'geoPattern',
    sourcemap: true,
  },
  plugins: [
    nodeResolve({ browser: true, preferBuiltins: false }),
    commonjs(),
    typescript({ tsconfig: 'tsconfig.browser.json' }),
  ],
}];
