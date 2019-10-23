const next = require("next");
const proxy = require("http-proxy-middleware");
const app = next({ dev: process.env.NODE_ENV !== "production" });
const express = require("express");
const compression = require("compression");
var path = require("path");
const handle = app.getRequestHandler();
const generateSitemap = require("./lib/sitemap");
const endpoint = `http://localhost:4444/`;
const prodEndpoint = `https://myexactjobs-backend.herokuapp.com/`;

const isProduction = process.env.NODE_ENV === "production";
const backendUri = isProduction ? prodEndpoint : endpoint;

const mapboxUrl = location => {
  return (
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    location +
    ".json?access_token=pk.eyJ1Ijoia3Zhc3F1ZXppdCIsImEiOiJjandzNWtjcjUwMHh2NDJxa2toeWJ6N2FlIn0.Qa-IM4Em_QMvC2QWlMvieQ&types=country,region,postcode,place"
  );
};

app.prepare().then(() => {
  const server = express();

  if (process.env.NODE_ENV === "production") {
    server.use(compression());
  }

  server.use(
    "/graphql",
    proxy({
      target: backendUri,
      changeOrigin: true,
      pathRewrite: {
        "^/graphql": "/" // remove base path
      }
    })
  );

  server.use("/location/:name", (req, res, next) => {
    return proxy({
      target: mapboxUrl(req.params.name),
      changeOrigin: true,
      pathRewrite: () => ""
    })(req, res, next);
  });

  server.get("/sitemap.xml", function(req, res) {
    res.header("Content-Type", "application/xml");
    (async function sendXML() {
      await generateSitemap();

      // Send it to the browser
      res.sendFile(path.join(__dirname + "/static/sitemap.xml"));
      // Create a file on the selected destination
      // fs.writeFileSync(DESTINATION, xmlFile);
    })();
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(process.env.PORT || 3000);
});
