const slugify = require("slugify");
const mongoose = require("mongoose");
var mongoose_delete = require("mongoose-delete");
const Schema = mongoose.Schema;
const productCategory = new Schema(
  {
    category_name: String,
    parent_id: String,
    img: { type: String, unique: true },
    slug: { type: String, unique: true },
    description: { type: String, default: "" },
    position: Number,
    status: { type: String, default: "active" },
    deleted: { type: Boolean, default: false },
    createdBy: String,
    deletedBy: String,
    updatedBy: [{ user_id: String, updateAt: Date }],
  },
  {
    timestamps: true,
  }
);
// Pre-save hook để tạo slug từ product_name

productCategory.pre("save", function (next) {
  // Kiểm tra xem product_name có tồn tại không
  if (this.category_name) {
    this.slug = slugify(this.category_name, { lower: true }); // Tạo slug từ product_name
  }
  next(); // Chuyển tiếp đến middleware tiếp theo
});
productCategory.plugin(mongoose_delete, { deletedAt: true });
module.exports = mongoose.model(
  "productCategory",
  productCategory,
  "productCategory"
);
