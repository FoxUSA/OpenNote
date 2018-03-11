const webpack = require("webpack");
const Uglify = require("uglifyjs-webpack-plugin");
let baseConfig = require("./webpack.common.config.js");

baseConfig.devtool = "#source-map";//Helps with size
baseConfig.plugins = (baseConfig.plugins || []).concat([
    new webpack.DefinePlugin({
        "process.env": {
            NODE_ENV: "\"production\""
        }
    }),
    new Uglify({ //Minify
        uglifyOptions:{
            mangle:false
        }
    })
]);

module.exports = baseConfig;
