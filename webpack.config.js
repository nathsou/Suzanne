const path = require('path');
const dist = path.resolve(__dirname, 'dist');

module.exports = {
    entry: './src/index.ts',
    module: {
        rules: [{
            test: /\.ts$/,
            use: 'ts-loader',
            exclude: [
                /node_modules/,
            ]
        }]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        filename: 'suzanne.js',
        path: dist,
        library: 'suzanne',
        libraryTarget: 'umd',
        globalObject: "(typeof window !== 'undefined' ? window : this)"
    },
    // devtool: 'source-map'
};