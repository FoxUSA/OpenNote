const glob = require("glob");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: glob.sync("./openNote/**/*.js"), //Emulate loading all them sequentually via script tags as one did in 2015
    output: {
        filename: "./openNote.bundle.js"
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        overlay: true,
    },
    devtool: "#eval-source-map",
    module: {
        rules: [{
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",//css-loader and style-loader used
                    use: "css-loader"
                })
            },
            {
                test: /\.exec\.js$/, //So we dont have to use concat too
                use: ["script-loader"]
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,//Need url-loader and file-loader for this
                loader: "url-loader?limit=100000&name=./webpack_files/[hash].[ext]"
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("openNote.bundle.css"),
    ]
};
