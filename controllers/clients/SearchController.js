const Products = require("../../models/products/products");
const SearchHelper = require("../../helpers/products/Search");
const SortHepler = require("../../helpers/client/Sort.helper");
class Search {
  async index(req, res) {
    let find = {
      deleted: false,
      status: "active",
    };
    const ObjectSearch = SearchHelper(req.query);
    if (ObjectSearch.regex) {
      find.product_name = ObjectSearch.regex;
    } /// Lấy ra thông tin của sort bên helper
    const Sort = SortHepler.Sort(req.query);
    /// Lấy ra các sản phẩm nổi bật và sắp xếp
    let cost = [];
    let sort = {};
    if (req.query.sortKey && req.query.sortValue) {
      sort[req.query.sortKey] = req.query.sortValue;
    } else {
      sort.product_name = "asc";
    }
    let from_to = "";
    // Kiểm tra xem có price_from và price_to trong params không
    if (req.query.price_from || req.query.price_to) {
      find.Price = {};
      if (req.query.price_from) {
        find.Price.$gte = parseFloat(req.query.price_from); // Giá từ
      }
      if (req.query.price_to) {
        find.Price.$lte = parseFloat(req.query.price_to); // Giá đến
      }
      from_to = req.query.price_from + "-" + req.query.price_to;
    }
    const products = await Products.find(find).sort(sort);
    products.forEach((item) => {
      const price = item.Price.toLocaleString("vi-VN");
      cost.push(price);
    });
    /// End lấy ra sản phẩm nổi bật và sắp xếp
    res.render("./clients/pages/search/index", {
      Products: products,
      keyword: ObjectSearch.keyword,
      Sort: Sort,
      from_to: from_to,
      cost: cost,
    });
  }
}
module.exports = new Search();
