const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack')

module.exports = {
    entry: {
        popup: path.join(__dirname, 'src/index.tsx'),
    },
    output: {
        path: path.join(__dirname, 'dist/js'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.tsx?$/,
                use: 'ts-loader',
            },
            {
                exclude: /node_modules/,
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        },
                    },
                ],
            },
            {
                test: /\.(jpg|png|gif|svg|ttf|eot|woff)$/,
                use: {
                    loader: 'url-loader',
                },
            },
        ],
    },
    plugins: [
        new Dotenv({
            silent: true,
        }),
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
};
