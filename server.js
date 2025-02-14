const express = require("express");
const flash = require("express-flash");
const cors = require("cors");
const cookieParser = require("cookie-parser");
var session = require("express-session");
const morgan = require("morgan");
const configViewEngine = require("./configs/ViewEngine");
const route = require("./routes/clients/index");
const routeAdmin = require("./routes/admin/index.route");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();
const methodOverride = require("method-override");
const errorHandlingMiddleware = require("./middlewares/errorHandling.middleware");
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
app.use(cors());
app.use(express.json());
//*HTTP Logger
app.use(morgan("combined"));
app.use(cookieParser(process.env.PASS_COOKIE));
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Thay thế bằng secret của bạn
    resave: false, // Không lưu lại phiên nếu không thay đổi
    saveUninitialized: false, // Chỉ lưu phiên đã thay đổi
    cookie: {
      maxAge: 600000, // Thời gian sống của cookie
    },
  })
);
app.use(flash());
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
/// Middleware xử lý lỗi tập chung
app.use(errorHandlingMiddleware);
app.get("*", (req, res) => {
  res.render("./clients/layouts/404");
});
server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(` App listening at http://localhost:${port}/home`);
});
