const sort_option = document.querySelectorAll(".sort-option");
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
