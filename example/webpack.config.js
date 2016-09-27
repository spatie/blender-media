module.exports = {
    context: __dirname,
    entry: './app.js',
    output: {
        path: __dirname + '/build',
        filename: 'app.js',
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
    },
    devServer: {
        contentBase: __dirname,
        port: 2000,
    },
};
