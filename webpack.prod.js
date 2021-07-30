const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer');
const { BundleAnalyzerPlugin } = WebpackBundleAnalyzer;
const modifyVars = require('./src/styles/modify-vars.js');
const HappyPack = require('happypack');

const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const createHappyPlugin = (id, loaders) =>
  new HappyPack({
    id: id,
    loaders: loaders,
    threadPool: happyThreadPool,
    verbose: true,
  });

if (!fs.existsSync(path.resolve(__dirname, '.env.prod'))) {
  console.warn(`DOTENV File: ${'.env.prod'} does not exists.`);
}
require('dotenv').config({ path: '.env.prod' });

const getHash = (str, length) => {
  const hashVersion = 'v1';
  const md5 = crypto.createHash('md5');
  const hex = md5.update(`${str}${hashVersion}`).digest('hex');
  return Buffer.from(hex)
    .toString('base64')
    .substr(0, length);
};

module.exports = env => ({
  mode: 'production',
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
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
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
        use: [MiniCssExtractPlugin.loader, 'happypack/loader?id=happy-css'],
      },
      {
        test: /\.styl$/,
        use: [
          MiniCssExtractPlugin.loader,
          'happypack/loader?id=happy-css',
          'stylus-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
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
              limit: 8192, //  8192 B
              name: '[name].[hash:5].[ext]',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all', // initial(初始模块)、async(按需加载模块)和all(全部模块)
      minSize: 500000, // 模块超过 500KB 自动被抽离成公共模块
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

            return getHash(packageName, 8).replace('@', '');
          },
        },
      },
    },
  },
  plugins: [
    new webpack.EnvironmentPlugin(Object.keys(process.env)),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
      __LOCAL__: false,
      __PRO__: true,
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

    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),

    new OptimizeCssAssetsPlugin({
      cssProcessor: require('cssnano'),
      cssProcessorOptions: {
        discardComments: {
          removeAll: true,
        },
      },
    }),

    new HtmlWebpackPlugin({
      favicon: './src/styles/images/favicon.png',
      template: './src/index.html',
      filename: 'index.html',
      hash: true,
    }),

    // 查看打包后 js 文件的大小和结构（一般不需要查看）
    // new BundleAnalyzerPlugin(),
  ],
});
