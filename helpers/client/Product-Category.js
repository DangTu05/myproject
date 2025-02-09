const Categories = require("../../models/categories/category.model");
module.exports.getSubCategory = async (parent_id) => {
  const getCategory = async (parent_id) => {
    const subs = await Categories.find({
      parent_id: parent_id,
      deleted: false,
      status: "active",
    });
    let allSubs = [...subs];
    for (const sub of subs) {
      const childs = await getCategory(sub._id);
      allSubs = allSubs.concat(childs);
    }
    return allSubs;
  };
  const subs = await getCategory(parent_id);
  return subs;
};
