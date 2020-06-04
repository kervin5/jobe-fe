const withCSS = require("@zeit/next-css");
const getBackendUrl = require("./lib/backend");

module.exports = withCSS({
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.module.rules.push({
      test: /\.(png|svg|eot|otf|ttf|woff|woff2)$/,
      use: {
        loader: "url-loader",
        options: {
          limit: 8192,
          publicPath: "/",
          outputPath: "public/",
          name: "[name].[ext]"
        }
      }
    });

    return config;
  },
  experimental: {
    modern: true,
    async rewrites() {
      return [
        { source: "/sitemap.xml", destination: "/api/sitemap" },
        { source: "/graphql", destination: getBackendUrl() }
      ];
    },
    catchAllRouting: true
  }
});
