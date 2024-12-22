var count = 0;
function buildCategoryTree(categories, parent_id = "") {
  let tree = [];
  for (let category of categories) {
    if (category.parent_id === parent_id) {
      count++;
      category.index = count;
      const children = buildCategoryTree(categories, category.id);
      if (children.length) {
        category.children = children; // Thêm mảng con vào danh mục
      }
      tree.push(category);
    }
  }
  return tree;
}
module.exports = (categories, parent_id = "") => {
  count = 0;
  const tree = buildCategoryTree(categories, parent_id);
  return tree;
};
