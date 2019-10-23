const withCSS = require("@zeit/next-css");
const axios = require("axios");
const getPages = require("./lib/getPages");

const endpoint = `http://localhost:4444/`;
const prodEndpoint = `https://myexactjobs-backend.herokuapp.com/`;

const isProduction = process.env.NODE_ENV === "production";
const backendUri = isProduction ? prodEndpoint : endpoint;

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
  },
  async exportPathMap() {
    // we fetch our list of posts, this allow us to dynamically generate the exported pages
    let pages = {};
    try {
      const response = await axios.post(backendUri, {
        query: `
    query AllJobs {
      jobs {
        id
        title
        location {
          name
        }
      }
    }
    `
      });

      // tranform the list of posts into a map of pages with the pathname `/post/:id`

      response.data.data.jobs.forEach(job => {
        const jobTitle = job.title.replace(/[\W_]+/g, "-");
        const jobLocation = job.location.name.replace(/[\W_]+/g, "-");
        pages[`/jobs/${jobTitle}-${jobLocation}-${job.id}`] = {
          page: "/jobs",
          query: { id: job.id }
        };
      });
    } catch (ex) {
      console.log(ex);
    }
    const exclude = ["dashboard", "_app", "_document", "_error"];
    const staticPages = getPages();
    const mappedPages = Object.keys(staticPages).forEach(pageName => {
      if (
        !pageName
          .split("/")
          .some(
            pagePart =>
              exclude.includes(pagePart) ||
              pagePart.includes("]") ||
              pagePart.includes("[")
          )
      ) {
        pages[pageName] = { page: staticPages[pageName] };
      }
    });
    return { ...pages, ...mappedPages, "/": { page: "/" } };
  }
});
