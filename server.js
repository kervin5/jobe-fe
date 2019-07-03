const next = require("next");
const routes = require("./routes");
const app = next({ dev: process.env.NODE_ENV !== "production" });
const handler = routes.getRequestHandler(app);
const express = require("express");
const compression = require("compression");
const server = express();

// const {createServer} = require('http');
// app.prepare().then(() => {
//   createServer(handler).listen( process.env.PORT || 3000);
// });

app.prepare().then(() => {
  server.use(handler);

  if (process.env.NODE_ENV === "production") {
    server.use(compression);
  }

  server.listen(process.env.PORT || 3000);
});
