module.exports = {
    'use': [
        'postcss-easy-import',
        'postcss-nested',
        'postcss-simple-vars',
        'autoprefixer',
    ],
    'input': './src/scss/media.scss',
    'autoprefixer': {
        'browsers': '> 5%',
    },
    'postcss-easy-import': {
        'extensions': '.scss',
        'glob': true,
        'onImport': function (sources) {
            global.watchCSS(sources);
        },
    },
};
