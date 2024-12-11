const button_pagination = document.querySelectorAll("[button-pagination]");
if (button_pagination) {
  let url = new URL(window.location.href);
  button_pagination.forEach((button) => {
    button.addEventListener("click", () => {
      const page = button.getAttribute("button-pagination");
      url.searchParams.set("page", page);
      window.location.href = url.href;
    });
  });
}
