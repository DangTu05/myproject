const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const configViewEngine = require("./configs/ViewEngine");
const route = require("./routes/clients/index");
const routeAdmin = require("./routes/admin/index.route");
require("dotenv").config();
const app = express();
const port = process.env.PORT;
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));
const db = require("./configs/db");
const systemConfig = require("./configs/system");
db.connect();
///Hỗ trợ lấy được input gửi lên từ HTML
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(express.json());
//*HTTP Logger
app.use(morgan("combined"));
//* template engine
configViewEngine(app);
//* app locals variable
app.locals.prefixAdmin = systemConfig.prefixAdmin;
/// tinymce
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);
// end tinymce
//* route init
routeAdmin(app);
route(app);
app.listen(port, () => {
  console.log(` App listening at http://localhost:${port}/home`);
});
