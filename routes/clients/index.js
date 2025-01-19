const show = require("./SiteRoute");
const products = require("./Product.route");
const search = require("./Search.route");
const cart = require("./cart.route");
const checkout = require("./checkout.route");
const cartIdMiddleware = require("../../middlewares/client/carts/Cart.Middleware");
const user = require("./user.route");
function route(app) {
  app.use("/home", cartIdMiddleware.cartId, show);
  app.use("/product", cartIdMiddleware.cartId, products);
  app.use("/search", cartIdMiddleware.cartId, search);
  app.use("/cart", cartIdMiddleware.cartId, cart);
  app.use("/checkout", cartIdMiddleware.cartId, checkout);
  app.use("/user", user);
}
module.exports = route;
