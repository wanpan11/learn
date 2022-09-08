const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const baseConfig = {
  context: path.resolve(__dirname, "./src"),
  entry: "./main.js",
  output: {
    path: path.resolve(__dirname, "./dist"), //必须是绝对路径
    filename: "[name]_[contenthash].js",
    chunkFilename: "js/[name]_[contenthash].js",
    clean: true,
    publicPath: "./",
  },
  devtool: false,
  // loader 规则
  module: {
    rules: [
      {
        test: /\.(c|le)ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
      },
      {
        test: /.js/, // 配置js和jsx的loader
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
  // 模块解析
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    extensions: [".jsx", "..."], // 自动不全文件后缀
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      title: "react",
      template: path.resolve(__dirname, "./public/index.html"),
      filename: "index.html",
    }),
    // css 分离
    new MiniCssExtractPlugin({
      filename: "[chunkhash]_[name].css",
    }),
    // new webpack.SourceMapDevToolPlugin({}),
  ],
};

module.exports = (env, argv) => {
  const isDev = argv.mode === "development";

  if (isDev) {
    const devServer = {
      historyApiFallback: true,
      client: {
        logging: "error",
        progress: true,
        overlay: true,
      },
      // proxy: {
      //   "/proxy": {
      //     target: "https://xxxxx.xxxx",
      //     pathRewrite: { "^/proxy": "" },
      //     changeOrigin: true, // 控制服务器接收到的请求头中host字段的值
      //     secure: false,
      //   },
      // },
      open: true,
      port: 2001,
    };
    baseConfig.devServer = devServer;
  }

  if (isDev) {
    const optimization = {
      // minimize: true,
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
            filename: "[contenthash].vendor.js",
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
          react: {
            name: "ReactAbout",
            test: /.jsx/,
            priority: 1,
          },
        },
      },
    };
    baseConfig.optimization = optimization;
  }

  console.log(`运行环境 ${argv.mode}`);

  return baseConfig;
};