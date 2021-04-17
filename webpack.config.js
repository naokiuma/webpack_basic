const Path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { Template } = require('ejs');

module.exports = {
    // モード値を production に設定すると最適化された状態で、
    // development に設定するとソースマップ有効でJSファイルが出力される
    mode: "development",
    //読み込み元
    entry: `./src/index.js`,
    //出力先
    output: {
        path: `${__dirname}/build`,
        filename: 'main.js'
    },
    module:{
        rules:[
            {
                test: /(\.s[ac]ss)$/,
                use: [
                        "style-loader", //creates style nodes from JS strings
                        "css-loader", //translates CSS into CommonJS
                        "postcss-loader",
                        "sass-loader", // compiles Sass to CSS, using Node Sass by default
                        {
                        loader :'html-loader',
                        options:{
                            minimize: false
                        },
                        },
                        {
                            loader:'ejs-plain-loader'
                        }
                    ]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:'src/index.ejs',
            minify: false,
        })
    ],
    //ローカル開発環境を起動
    devServer: {
        contentBase:"build",
        open:true
    }
};