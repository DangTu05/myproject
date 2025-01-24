const Cart = require("../../../models/carts/cart.model");
module.exports.cartId = async (req, res, next) => {
  if (!req.cookies.cartId) {
    const cart = new Cart();
    await cart.save();
    const time = 1000 * 60 * 60 * 24 * 365;
    res.cookie("cartId", cart._id, { maxAge: time });
  } else {
    const cart = await Cart.findOne({
      _id: req.cookies.cartId,
    });
    if(cart){
    if (cart.products.length>0 ) {
      let totalQuantity = cart.products.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      res.locals.miniCart = totalQuantity;
    }
    }
  }
  next();
};
