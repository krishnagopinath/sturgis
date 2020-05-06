import svelte from 'rollup-plugin-svelte'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import livereload from 'rollup-plugin-livereload'
import { terser } from 'rollup-plugin-terser'
import dev from 'rollup-plugin-dev'
import postcss from 'rollup-plugin-postcss'
import path from 'path'

const production = !process.env.ROLLUP_WATCH

export default {
    input: 'src/main.js',
    output: {
        sourcemap: true,
        format: 'iife',
        name: 'app',
        file: 'public/build/bundle.js',
    },
    // https://stackoverflow.com/a/43556986/1217785
    onwarn: function (warning) {
        if (warning.code === 'THIS_IS_UNDEFINED') return
        console.warn(warning.message)
    },
    plugins: [
        svelte({
            // enable run-time checks when not in production
            dev: !production,
            // we'll extract any component CSS out into
            // a separate file - better for performance
            emitCss: true,
        }),
        postcss({
            extract: true,
            minimize: production,
            sourceMap: !production,
        }),

        // If you have external dependencies installed from
        // npm, you'll most likely need these plugins. In
        // some cases you'll need additional configuration -
        // consult the documentation for details:
        // https://github.com/rollup/plugins/tree/master/packages/commonjs
        resolve({
            browser: true,
            dedupe: ['svelte'],
        }),
        commonjs(),

        // In dev mode, serve API under a proxy, so we needn't inject
        // api url into the app.
        !production &&
            dev({
                dirs: ['public'],
                port: 3000,
                proxy: { '/api/*': 'http://localhost:12345/' },
                spa: path.join('public', 'index.html'),
            }),

        // Watch the `public` directory and refresh the
        // browser on changes when not in production
        !production && livereload('public'),

        // If we're building for production (npm run build
        // instead of npm run dev), minify
        production && terser(),
    ],
    watch: {
        clearScreen: false,
    },
}
