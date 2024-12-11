const path = require("path");
const configViewEngine = (app) => {
  app.set("view engine", "pug");
  app.set("views", path.join(__dirname, "..", "views"));
};
module.exports = configViewEngine;
