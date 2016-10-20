var path = require('path');

var ROOT_DIR = __dirname;

function _path(relativePath) {
    return path.resolve(ROOT_DIR, relativePath);
}

function makeStyleLoader (preCssLoader) {
    preCssLoader = preCssLoader ? ('!' + preCssLoader) : '';
    return 'style!css' + preCssLoader;
}

module.exports = {
    entry: _path('src/index.ts'),
    output: {
        filename: 'bundle.js',
        path: _path('dist')
    },
    module: {
        loaders: [
            {
                test: /\.ts$/i,
                loader: 'ts'
            },
            {
                test: /\.less$/i,
                loader: makeStyleLoader('less')
            },
            {
                test: /\.css$/i,
                loader: makeStyleLoader()
            }
        ]
    },
    resolve: {
        extensions: ['', '.ts', '.js']
    }
};
