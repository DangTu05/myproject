const show = require("./SiteRoute");
const products = require("./Product.route");
const search = require("./Search.route");
const cart = require("./cart.route");
const cartIdMiddleware = require("../../middlewares/client/carts/Cart.Middleware");
function route(app) {
  app.use("/home", cartIdMiddleware.cartId, show);
  app.use("/product", cartIdMiddleware.cartId, products);
  app.use("/search", cartIdMiddleware.cartId, search);
  app.use("/cart", cartIdMiddleware.cartId, cart);
}
module.exports = route;
