const next = require("next");
const routes = require("./routes");
const app = next({ dev: process.env.NODE_ENV !== "production" });
const handler = routes.getRequestHandler(app);
const express = require("express");
const compression = require("compression");
const fs = require("fs");
// const {createServer} = require('http');
// app.prepare().then(() => {
//   createServer(handler).listen( process.env.PORT || 3000);
// });

const isDev = process.env.NODE_ENV !== "production";
const isProd = !isDev;
const buildId = isProd
  ? fs.readFileSync("./.next/BUILD_ID", "utf8").toString()
  : null;

app.prepare().then(() => {
  const server = express();
  server.use(handler);

  if (isProd) {
    server.get("/_next/-/app.js", (req, res) =>
      app.serveStatic(req, res, path.resolve("./.next/app.js"))
    );

    const hash = buildId;

    server.get(`/_next/${hash}/app.js`, (req, res) =>
      app.serveStatic(req, res, path.resolve("./.next/app.js"))
    );
  }

  server.use(
    compression({
      filter: function() {
        return true;
      }
    })
  );
  server.listen(process.env.PORT || 3000);
});
