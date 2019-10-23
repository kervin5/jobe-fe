const sitemap = require("nextjs-sitemap-generator");

const generateSitemap = () =>
  sitemap({
    baseUrl: "https://www.myexactjobs.com",
    ignoredPaths: ["dashboard", "[", "]"],
    pagesDirectory: __dirname + "..\\..\\pages",
    targetDirectory: "static/",
    nextConfigPath: __dirname + "..\\..\\next.config.js",
    ignoredExtensions: ["png", "jpg"]
  });

module.exports = generateSitemap;
