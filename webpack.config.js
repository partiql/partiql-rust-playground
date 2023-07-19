HtmlWebpackPlugin = require('html-webpack-plugin');
path = require('path');
webpack = require('webpack');

module.exports = {
    mode: "development",
    devtool: false,
    entry: "./src/index.jsx",
    output: {
        filename: "playground.js",
        path: path.resolve(__dirname, "dist"),
        clean: true
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        historyApiFallback: { index: "/", disableDotRule: true }
    },
    experiments: {
        asyncWebAssembly: true,
        topLevelAwait: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            filename: 'index.html',
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            process: 'process/browser',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /\.(ts|tsx)$/,
                loader: "ts-loader",
            },
        ],
    }
    ,
    resolve: {
        extensions: [".*", ".js", ".jsx", ".ts", ".tsx"],
        alias: {
            'react-dom$': 'react-dom/profiling',
            'scheduler/tracing': 'scheduler/tracing-profiling',
        }
    }
    ,
}
