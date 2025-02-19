const unidecode = require("unidecode");
module.exports = (query) => {
  let ObjectSearch = {
    keyword: "",
  };
  if (query.keyword) {
    ObjectSearch.keyword = query.keyword;
    ObjectSearch.slug = unidecode(ObjectSearch.keyword.trim());
    ObjectSearch.slug = ObjectSearch.slug.replace(/\s+/g, "-"); /// Thay thế khoảng trắng bằng "-"
    var regexKeyword = new RegExp(ObjectSearch.keyword, "i");
    var regexSlug = new RegExp(ObjectSearch.slug, "i");
    ObjectSearch.regexKeyword = regexKeyword;
    ObjectSearch.regexSlug = regexSlug;
  }
  return ObjectSearch;
};
