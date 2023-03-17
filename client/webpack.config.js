const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // added mini css extract plugin for css extraction
const WorkboxPlugin = require('workbox-webpack-plugin'); // added workbox plugin for service worker and manifest file generation.



module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({template: "./index.html", title: "JATE"}),
      new WebpackPwaManifest({ fingerprints: false, name: 'Just Another Text Editor', short_name: 'JATE', description: 'Somewhere to type things', background_color: '#01579b', theme_color: '#ffffff', start_url: '/', icons: [{ src: path.resolve('src/images/icon.png'), sizes: [96, 128, 192, 256, 384, 512] }] }),
      new InjectManifest({ swSrc: './src/sw.js', swDest: 'src-sw.js' }),
      new MiniCssExtractPlugin()
    ],

    module: {
      rules: [
        {test: /\.css$/i, use: ["style-loader", "css-loader"]},
        {test: /\.(png|svg|jpg|jpeg|gif)$/i, type: "asset/resource"},
        {test: /\.m?js$/, exclude: /node_modules/, use: {
            loader: "babel-loader",
            options: {presets: ["@babel/preset-env"],plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/transform-runtime",
                "@babel/plugin-transform-runtime"
              ]}
          }
        },
      ],
    },
  };
};
