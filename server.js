const next = require("next");
const routes = require("./routes");
const app = next({ dev: process.env.NODE_ENV !== "production" });
const handler = routes.getRequestHandler(app);
const express = require("express");
const compression = require("compression");

// const {createServer} = require('http');
// app.prepare().then(() => {
//   createServer(handler).listen( process.env.PORT || 3000);
// });

app.prepare().then(() => {
  const server = express();

  // server.use(handler);
  server.use(compression());
  server.listen(process.env.PORT || 3000);
});
