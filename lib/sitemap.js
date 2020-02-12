const path = require("path");
const glob = require("glob");
const fs = require("fs");
const axios = require("axios");

// If you use Dotenv you can include your .env variables uncommenting the following line
// require("dotenv").config();

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

// SITE_ROOT is the domain of your app
// Update example.com with your domain or set the env variable
const SITE_ROOT = process.env.SITE_ROOT || "https://www.myexactjobs.com";

// SOURCE is where are stored all pages files
// By default it tracks all files in the pages folder
// without considering the ones starting with `_` (e.g. _document.js and _app.js)
const SOURCE =
  process.env.SOURCE || path.join(resolveApp("pages"), "/**/!(_*).js");

// API_SOURCE is the endpoint of you api
// Update example.com/api with your endpoint or set the env variable
const API_SOURCE =
  process.env.API_SOURCE || "https://myexactjobs-backend.herokuapp.com/";

// DESTINATION is where the real file is exported
// By default is .next/static/sitemap.xml
const DESTINATION =
  process.env.DESTINATION ||
  path.join(resolveApp(".next/public"), "sitemap.xml");

console.log(DESTINATION);

const createSitemap = () => {
  /**
   * STEP 1: Store all static pages url
   **/
  let diskPages = glob.sync(SOURCE);
  let xml = "";
  xml += '<?xml version="1.0" encoding="UTF-8"?>';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

  diskPages.forEach(page => {
    if (!page.includes("[") && !page.includes("dashboard")) {
      let stats = fs.statSync(page);
      let modDate = new Date(stats.mtime);
      let lastMod = `${modDate.getFullYear()}-${(
        "0" +
        (modDate.getMonth() + 1)
      ).slice(-2)}-${("0" + modDate.getDate()).slice(-2)}`;

      page = page.replace(resolveApp("pages"), "");
      page = page.replace(/.js$/, "");
      page = page.split("/pages").pop();
      page = `${SITE_ROOT}${page}`;
      page = page.trimRight("/");

      if (page.match(/.*\/index$/)) {
        page = page.replace("/index", "");
      }

      xml += "<url>";
      xml += `<loc>${page}</loc>`;
      xml += `<lastmod>${lastMod}</lastmod>`;
      xml += `<changefreq>always</changefreq>`;
      xml += `<priority>0.5</priority>`;
      xml += "</url>";
    }
  });

  /**
   * STEP 2: Store all dynamic pages url
   * In the following snippet we gather all products available
   * TODO: Add <lastmod>${lastMod}</lastmod> tag and set priority order
   **/
  return axios
    .post(API_SOURCE, {
      query: `{
        jobs {
            id 
            title
            location {
                name
            }
        } 
      }`
    })
    .then(resp => {
      let {
        data: { jobs }
      } = resp.data;

      jobs.forEach((job, index) => {
        xml += "<url><loc>";
        xml += `${SITE_ROOT}/jobs/${job.title.replace(
          /[\W_]+/g,
          "-"
        )}-${job.location.name.replace(/[\W_]+/g, "-")}-${job.id}`;
        xml +=
          "</loc><changefreq>always</changefreq><priority>0.5</priority></url>";
        if (index === jobs.length - 1) {
          xml += "</urlset>";
        }
      });
      return xml;
    })
    .catch(error => {
      console.log(error.message, error.name, "test");
    });
};

module.exports = { DESTINATION, createSitemap };
