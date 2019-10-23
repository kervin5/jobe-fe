const sitemap = require("nextjs-sitemap-generator");
path = require("path");

const generateSitemap = () =>
  sitemap({
    baseUrl: "https://www.myexactjobs.com",
    ignoredPaths: ["dashboard", "[", "]"],
    pagesDirectory: path.join(__dirname, "../pages"),
    targetDirectory: "static/",
    nextConfigPath: path.join(__dirname, "../next.config.js"),
    ignoredExtensions: ["png", "jpg"]
  });

module.exports = generateSitemap;
