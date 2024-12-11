const slugify = require("slugify");
const mongoose = require("mongoose");
var mongoose_delete = require("mongoose-delete");
const Schema = mongoose.Schema;
const product = new Schema(
  {
    product_name: String,
    quantity: Number,
    img: {type:String,unique:true},
    slug: { type: String, unique: true },
    Price: Number,
    description: String,
    status: { type: String, default: "active" },
    deletedAt: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);
// Pre-save hook để tạo slug từ product_name

product.pre("save", function (next) {
  // Kiểm tra xem product_name có tồn tại không
  if (this.product_name) {
    this.slug = slugify(this.product_name, { lower: true }); // Tạo slug từ product_name
  }
  next(); // Chuyển tiếp đến middleware tiếp theo
});
product.plugin(mongoose_delete, { deletedAt: true });
module.exports = mongoose.model("products", product, "products");
