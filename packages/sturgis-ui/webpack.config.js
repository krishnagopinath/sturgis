const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { sass } = require('svelte-preprocess-sass')
const path = require('path')

const mode = process.env.NODE_ENV || 'development'
const prod = mode === 'production'

const cssLoaders = [
    {
        loader: MiniCssExtractPlugin.loader,
        options: { hmr: !prod },
    },
    'css-loader',
]

module.exports = {
    entry: {
        bundle: ['./src/main.js'],
    },
    resolve: {
        alias: {
            svelte: path.resolve('node_modules', 'svelte'),
        },
        extensions: ['.mjs', '.js', '.svelte'],
        mainFields: ['svelte', 'browser', 'module', 'main'],
    },
    output: {
        path: path.join(__dirname, 'public'),
        filename: '[name].js',
        chunkFilename: '[name].[id].js',
    },
    devServer: {
        port: 3000,
        overlay: true,
        liveReload: true,
        watchContentBase: true,
        contentBase: 'public',
        proxy: {
            // Proxy the API urls so client and API could be served from the same port!
            // In production, some sort of reverse proxy will have to be used.
            '/api/': { target: 'http://localhost:12345/' },
        },
        stats: {
            colors: true,
            hash: false,
            timings: true,
            chunks: false,
            chunkModules: false,
            modules: false,
        },
        watchOptions: {
            ignored: /node_modules/,
        },
    },
    module: {
        rules: [
            {
                test: /\.svelte$/,
                use: {
                    loader: 'svelte-loader',
                    options: {
                        emitCss: true,
                        hotReload: true,
                        preprocess: [
                            {
                                style: sass(
                                    {
                                        includePaths: [
                                            // Allow imports from 'node_modules'
                                            path.join(
                                                __dirname,
                                                'node_modules',
                                            ),
                                        ],
                                    },
                                    { name: 'scss' },
                                ),
                            },
                        ],
                    },
                },
            },
            {
                test: /\.css$/,
                use: cssLoaders,
            },
            {
                test: /\.scss$/,
                use: [...cssLoaders, 'sass-loader'],
            },
        ],
    },
    mode,
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name].[id].css',
        }),
    ],
    devtool: prod ? false : 'source-map',
}
