const next = require("next");
const proxy = require("http-proxy-middleware");
const app = next({ dev: process.env.NODE_ENV !== "production" });
const express = require("express");
const compression = require("compression");
const handle = app.getRequestHandler();
const endpoint = `http://localhost:4444/`;
const prodEndpoint = `https://myexactjobs-graphql-api.herokuapp.com/`;

const backendUri =
  process.env.NODE_ENV === "production" ? prodEndpoint : endpoint;

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

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(process.env.PORT || 3000);
});
