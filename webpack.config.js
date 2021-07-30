const fs = require('fs');
const path = require('path');
const os = require('os');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const modifyVars = require('./src/styles/modify-vars.js');
const HappyPack = require('happypack');

const happyThreadPool = HappyPack.ThreadPool({
  size: os.cpus().length,
});
const createHappyPlugin = (id, loaders) =>
  new HappyPack({
    id: id,
    loaders: loaders,
    threadPool: happyThreadPool,
    verbose: true,
  });

if (!fs.existsSync(path.resolve(__dirname, '.env.dev'))) {
  console.warn(`DOTENV File: ${'.env.dev'} does not exists.`);
}
require('dotenv').config({
  path: '.env.dev',
});

module.exports = env => ({
  mode: 'development',
  entry: {
    app: ['babel-polyfill', './src/index.tsx'],
  },
  output: {
    path: `${__dirname}/dist`,
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    publicPath: '/',
  },
  resolve: {
    modules: ['node_modules'],
    // 引入模块的时候，可以不使用扩展名
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.ts[x]?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        use: 'happypack/loader?id=happy-babel',
      },
      {
        test: /\.css$/,
        use: [
          'css-hot-loader',
          'style-loader',
          'happypack/loader?id=happy-css',
        ],
      },
      {
        test: /\.styl$/,
        use: [
          'css-hot-loader',
          'style-loader',
          'happypack/loader?id=happy-css',
          'stylus-loader',
        ],
      },
      {
        test: /\.less/,
        use: [
          'css-hot-loader',
          'style-loader',
          'happypack/loader?id=happy-css',
          {
            loader: 'less-loader',
            options: {
              modifyVars,
              javascriptEnabled: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico|eot|woff|ttf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[name].[hash:5].[ext]',
            },
          },
        ],
      },
    ],
  },
  devServer: {
    disableHostCheck: true,
    port: process.env.DEV_SERVER_PORT,
    historyApiFallback: true,
    hot: true,
    proxy: {
      [process.env.API_PATH]: {
        target: process.env.DEV_SERVER_PROXY,
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/API'
        },
        logLevel: 'debug',
      },
      [process.env.API_PATH]: {
        target: process.env.DEV_OTHER_PROXY,
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/API'
        },
        logLevel: 'debug',
      },
    },
  },
  optimization: {
    minimize: false,
    splitChunks: {
      chunks: 'all', // initial(初始模块)、async(按需加载模块)和all(全部模块)
      minSize: 500000, // 模块超过 300KB 自动被抽离成公共模块
      maxAsyncRequests: 5, // 异步加载 chunk 的并发请求最大数量
      maxInitialRequests: 8, // 一个入口并发加载的 chunk 最大数量
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          filename: '[name].bundle.js',
          name(module) {
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
            )[1];

            return packageName;
          },
        },
      },
    },
  },
  plugins: [
    new webpack.EnvironmentPlugin(Object.keys(process.env)),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"',
      },
      __LOCAL__: true,
      __PRO__: false,
    }),

    createHappyPlugin('happy-babel', [
      {
        loader: 'babel-loader',
        options: {
          babelrc: true,
          cacheDirectory: true,
        },
      },
    ]),

    createHappyPlugin('happy-css', ['css-loader', 'postcss-loader']),

    new HtmlWebpackPlugin({
      favicon: './src/styles/images/favicon.png',
      template: './src/index.html',
      filename: 'index.html',
    }),
  ],
});
