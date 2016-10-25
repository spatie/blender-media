const path = require('path');

module.exports = {
    context: __dirname,
    entry: './app.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'app.js',
        publicPath: '/build/',
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loaders: ['vue'],
            },
            {
                test: /\.js/,
                loaders: ['babel'],
                exclude: ['node_modules'],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            vue: 'vue/dist/vue.js',
        },
    },
    devServer: {
        contentBase: __dirname,
        port: 2000,
    },
};
