const webpack = require('webpack');
const path = require('path');

module.exports = {  
    entry: {
        'terminal': './src/terminal.ts',
        'terminal.min': './src/terminal.ts'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        libraryTarget: 'umd',
        library: 'terminal',
        umdNamedDefine: true
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    devtool: 'source-map',
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            sourceMap: true,
            include: /\.min\.js$/,
        })
    ],
    module: {
        loaders: [
            { 
                test: /\.ts$/,
                loader: 'awesome-typescript-loader',
                exclude: /node_modules/,
                query: {
                    declaration: false,
                }
            }
        ] 
    }
}