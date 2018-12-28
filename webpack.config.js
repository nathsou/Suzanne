const path = require('path');

module.exports = {
    entry: './src/index.ts',
    module: {
        rules: [{
            test: /\.ts$/,
            use: 'ts-loader',
            exclude: [
                /node_modules/,
                /lib/,
                /dist/
            ]
        }]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        filename: 'suzanne.js',
        path: path.join(__dirname, 'dist'),
        library: 'suz',
        libraryTarget: 'umd',
        globalObject: "(typeof window !== 'undefined' ? window : this)"
    },
    devtool: 'source-map'
};