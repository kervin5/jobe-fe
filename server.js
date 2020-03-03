const next = require("next");
const proxy = require("http-proxy-middleware");
const app = next({ dev: process.env.NODE_ENV !== "production" });
const express = require("express");
const compression = require("compression");
const axios = require("axios");
const fs = require("fs");
const handle = app.getRequestHandler();
const endpoint = `http://localhost:4444/`;
const prodEndpoint = `https://myexactjobs-backend.herokuapp.com/`;

const { DESTINATION, createSitemap } = require("./lib/sitemap");

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

  server.use("/iplocation", (req, res, next) => {
    return proxy({
      target:
        "https://freegeoip.app/json/" +
        (req.headers["x-forwarded-for"] || req.connection.remoteAddress),
      changeOrigin: true,
      pathRewrite: () => ""
    })(req, res, next);
  });

  server.use("/location/:name", (req, res, next) => {
    return proxy({
      target: mapboxUrl(req.params.name),
      changeOrigin: true,
      pathRewrite: () => ""
    })(req, res, next);
  });

  server.use(express.json());

  server.get("/sitemap.xml", function(req, res) {
    res.header("Content-Type", "application/xml");
    (async function sendXML() {
      let xmlFile = await createSitemap();
      // Send it to the browser
      res.send(xmlFile);
      // Create a file on the selected destination
      fs.writeFileSync(DESTINATION, xmlFile);
    })();
  });

  server.all("/translate", async (req, res, next) => {
    try {
      const result = await axios.post(
        "https://exactstafftranslate.cognitiveservices.azure.com/sts/v1.0/issuetoken?Subscription-Key=23f89154a2b64b9c86a3ba511e5c6acb"
      );
      const translationResult = await axios({
        method: req.method,
        url: req.query.url || req.body.url,
        data: req.body.data || {},
        headers: { Authorization: `Bearer ${result.data}` }
      });

      res.send({ data: translationResult.data });
    } catch (ex) {
      console.log(ex);
      next();
    }
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(process.env.PORT || 3000);
});
