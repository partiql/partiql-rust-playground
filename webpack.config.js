HtmlWebpackPlugin = require('html-webpack-plugin');
path = require('path');
webpack = require('webpack');

module.exports = {
    mode: "development",
    devtool: false,
    entry: "./website/js/index.js",
    output: {
        filename: "playground.js",
        path: path.resolve(__dirname, "dist")
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist')
        }
    },
    experiments: {
        asyncWebAssembly: true,
        topLevelAwait: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./website/static/template.html",
            filename: 'index.html',
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            }
        ]
    }
}
