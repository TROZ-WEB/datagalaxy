const path = require('path');

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
                test: /\.(jpg|png)$/,
                use: {
                    loader: 'url-loader',
                },
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
};
