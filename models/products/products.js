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
    description: {type:String,default:""},
    status: { type: String, default: "active" },
    deleted: { type: Boolean, default: false },
    category_id:String,
    createdBy: String,
    deletedBy: String,
    updatedBy: [{ user_id: String, updateAt: Date }],
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
