const next = require("next");
const routes = require("./routes");
const app = next({ dev: process.env.NODE_ENV !== "production" });
const handler = routes.getRequestHandler(app);
const express = require("express");
const compression = require("compression");
const expressApp = express();

// const {createServer} = require('http');
// app.prepare().then(() => {
//   createServer(handler).listen( process.env.PORT || 3000);
// });
if (process.env.NODE_ENV === "production") {
  expressApp.use(compression);
}

app.prepare().then(() => {
  expressApp.use(handler).listen(process.env.PORT || 3000);
});
