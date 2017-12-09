const glob = require("glob");

module.exports = {
    entry: glob.sync("./openNote/**/*.js"),//Emulate loading all them sequentually via script tags as one did in 2015
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
        rules: [
            {
                test: /\.exec\.js$/,//So we dont have to use concat too
                use: ["script-loader"]
            }
        ]
    },
};
