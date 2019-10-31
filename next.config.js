const withCSS = require("@zeit/next-css");

module.exports = withCSS({
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.module.rules.push({
      test: /\.(png|svg|eot|otf|ttf|woff|woff2)$/,
      use: {
        loader: "url-loader",
        options: {
          limit: 8192,
          publicPath: "/_next/static/",
          outputPath: "static/",
          name: "[name].[ext]"
        }
      }
    });

    return config;
  }
});
