const express = require("express");
const flash = require("express-flash");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const configViewEngine = require("./configs/ViewEngine");
const route = require("./routes/clients/index");
const routeAdmin = require("./routes/admin/index.route");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();
const methodOverride = require("method-override");
const app = express();
const port = process.env.PORT;
const path = require("path");
/// socket io
const server = http.createServer(app);
const io = new Server(server);
global._io = io;
/// End socket io
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

app.use(methodOverride("_method"));
app.use(cookieParser());
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
server.listen(port, () => {
  console.log(` App listening at http://localhost:${port}/home`);
});
