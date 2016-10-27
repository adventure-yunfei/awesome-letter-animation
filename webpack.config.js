var path = require('path');

var ROOT_DIR = __dirname;

function _path(relativePath) {
    return path.resolve(ROOT_DIR, relativePath);
}

module.exports = {
    entry: _path('src/index.ts'),
    output: {
        filename: 'bundle.module.js',
        path: _path('dist'),
        libraryTarget: 'commonjs2'
    },
    module: {
        loaders: [
            {
                test: /\.ts$/i,
                loader: 'ts'
            }
        ]
    },
    resolve: {
        extensions: ['', '.ts', '.js']
    }
};
