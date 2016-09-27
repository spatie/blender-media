module.exports = {
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
};
