module.exports = (ObjectPagination, query, CountProduct) => {
  if (query.page) {
    ObjectPagination.currentPage = parseInt(query.page);
  }
  ObjectPagination.skip =
    (ObjectPagination.currentPage - 1) * ObjectPagination.limitItems;
  const TotalPage = Math.ceil(CountProduct / ObjectPagination.limitItems);
  ObjectPagination.TotalPage = TotalPage;
  ObjectPagination.CountProduct=CountProduct;
  return ObjectPagination;
};
