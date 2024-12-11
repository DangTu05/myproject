const express = require("express");
const morgan = require("morgan");
const configViewEngine = require("./configs/ViewEngine");
const route=require('./routes/clients/index');
const routeAdmin=require('./routes/admin/index.route');
const app = express();
require('dotenv').config();
const port = process.env.PORT;
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));
const db = require("./configs/db");
const systemConfig=require('./configs/system');
db.connect();
///Hỗ trợ lấy được input gửi lên từ HTML
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
//*HTTP Logger
app.use(morgan("combined"));
//* template engine
configViewEngine(app);
//* app locals variable
app.locals.prefixAdmin=systemConfig.prefixAdmin;
//* route init
routeAdmin(app);
route(app);
app.listen(port, () => {
  console.log(` App listening at http://localhost:${port}/home`);
});
