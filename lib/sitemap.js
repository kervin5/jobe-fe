const sitemap = require("nextjs-sitemap-generator");

const generateSitemap = () =>
  sitemap({
    baseUrl: "https://www.myexactjobs.com",
    ignoredPaths: ["dashboard", "[", "]"],
    pagesDirectory: join(__dirname, "../../") + "pages",
    targetDirectory: "static/",
    nextConfigPath: join(__dirname, "../../") + "next.config.js",
    ignoredExtensions: ["png", "jpg"]
  });

module.exports = generateSitemap;
