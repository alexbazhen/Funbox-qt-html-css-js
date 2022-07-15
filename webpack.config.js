// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isProduction = process.env.NODE_ENV == 'production';


const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';

const pathSrc = path.resolve(__dirname, 'src');

const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        open: {
          app: {
            name: 'chrome'
          }
        },
        host: 'localhost',
        watchFiles: [
          `${pathSrc}/**/*.html`,
          `${pathSrc}/img/**/*.*`
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
          cleanOnceBeforeBuildPatterns: [
            '**/*',
            '!.git',
          ]
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
        }),
        new CopyWebpackPlugin({
          patterns: [
            {
              from: path.resolve(__dirname, 'src/favicon.ico'),
              to: path.resolve(__dirname, 'dist'),
              noErrorOnMissing: true
            },
            {
              from: path.resolve(__dirname, 'src/assets/img'),
              to: path.resolve(__dirname, 'dist/assets/img'),
              noErrorOnMissing: true,
              force: true
            },
            {
              from: path.resolve(__dirname, 'src/data'),
              to: path.resolve(__dirname, 'dist/data'),
              noErrorOnMissing: true,
              force: true
            },
          ]
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                loader: 'babel-loader',
            },
            {
                test: /\.s[ac]ss$/i,
                use: [stylesHandler, 'css-loader', 'postcss-loader', 'sass-loader'],
            },
            {
                test: /\.css$/i,
                use: [stylesHandler, 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/i,
                type: 'asset',
                generator: {
                  filename: 'assets/fonts/[hash][ext][query]'
                }
            },
            {
                test: /\.(svg|png|jpg|gif)$/i,
                type: 'asset',
                generator: {
                  filename: 'assets/img/[hash][ext][query]'
                }
            },

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
        
        config.plugins.push(new MiniCssExtractPlugin());
        
        
    } else {
        config.mode = 'development';
    }
    return config;
};
