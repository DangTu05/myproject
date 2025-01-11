const sort_option = document.querySelectorAll(".sort-option");
const filter_price = document.querySelectorAll("[filter-price]");
if (sort_option) {
  sort_option.forEach((item) => {
    item.onclick = (e) => {
      let url = new URL(window.location.href);
      const value = item.getAttribute("value");
      const [sortKey, sortValue] = value.split("-");
      url.searchParams.set("sortKey", sortKey);
      url.searchParams.set("sortValue", sortValue);
      window.location.href = url.href;
    };
  });
}
if (filter_price) {
  filter_price.forEach((item) => {
    item.addEventListener("change", (e) => {
      const url = new URL(window.location.href);
      const value = e.target.value;
      const [price_from, price_to] = value.split("-");
      url.searchParams.set("price_from", price_from);
      url.searchParams.set("price_to", price_to);
      window.location.href = url.href;
    });
  });
}
