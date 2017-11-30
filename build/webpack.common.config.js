const glob = require("glob");

module.exports = {
    entry: glob.sync("./openNote/**/*.js"),
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
