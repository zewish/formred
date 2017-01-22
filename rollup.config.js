import sourceMaps from 'rollup-plugin-sourcemaps';
import nodeResolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-js';

const plugins = [
    sourceMaps()
    , nodeResolve({
        module: true
        , jsnext: true
        , main: true
    })
];

if (process.env.ROLLUP_ENV == 'min') {
    plugins.push(
        uglify({ mangle: true }, minify)
    );
}

export default {
    plugins
    , entry: 'es/index.js'
    , format: 'umd'
    , moduleName: 'FormRed'
    , globals: {
        react: 'React'
        , 'react-redux': 'ReactRedux'
    }
    , external: [
        'react'
        , 'react-redux'
    ]
    , sourceMap: true
};