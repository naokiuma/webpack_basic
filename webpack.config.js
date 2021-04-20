const Path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { Template } = require('ejs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
                         // compiles Sass to CSS, using Node Sass by default
                        {
                            loader :'html-loader',
                            options:{
                                minimize: false
                            },
                        },
                        {
                            loader:'ejs-plain-loader'
                        },
                        {
                            loader:"postcss-loader",
                            options:{
                                plugins:[
                                    require('autoprefixer')({
                                        browserslist:[
                                            "last 2 versions",
                                            "ie >= 11",
                                        ]
                                    })
                                ]
                            }
                        },
                        {//sassをcssへ変換
                            loader:"sass-loader",
                            options:{
                                //dart-sassを優先
                                implementation:require('sass'),
                                //sassOptions:{
                                    // fibers を使わない場合は以下で false を指定
                                    //fiber: require('fibers'),
                                //},
                                //ソースマップを有効に
                                sourceMap:true,
                                
                            },
                        },
                        
                    ]
            }
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({
            //抽出するcssのファイル名
            filename:style.css

        }),
        new HtmlWebpackPlugin(//ページを追加していく
            [
            {
                filename:'index.html',
                template:'src/index.ejs',
                minify: false,
            },
            {
                filename:'about.html',
                template:'src/about.ejs',
                minify: false,
            }
            
            ]
        )
    ],
    //ローカル開発環境を起動
    devServer: {
        contentBase:"build",
        open:true
    }
};