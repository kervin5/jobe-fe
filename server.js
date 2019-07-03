const next = require("next");
const routes = require("./routes");
const app = next({ dev: process.env.NODE_ENV !== "production" });
// const handler = routes.getRequestHandler(app);
const express = require("express");
const compression = require("compression");
const handle = app.getRequestHandler();

// const {createServer} = require('http');
// app.prepare().then(() => {
//   createServer(handler).listen( process.env.PORT || 3000);
// });

app.prepare().then(() => {
  const server = express();

  if (process.env.NODE_ENV === "production") {
    server.use(compression());
  }

  server.get("/jobs/view/:slug", (req, res) => {
    const actualPage = "/jobs/view";
    const queryParams = { slug: req.params.slug };
    app.render(req, res, actualPage, queryParams);
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });
  // server.use(handler);

  server.listen(process.env.PORT || 3000);
});
