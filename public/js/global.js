const img = document.querySelector("#image");
const preview = document.querySelector(".preview");

/// xử lý preview img
img.addEventListener("change", () => {
  if (img.type === "file") {
    const [file] = img.files;
    preview.src = URL.createObjectURL(file);
  }
});
///end preview img
/// Show alert
const notification = document.querySelector(".notification");
if (notification) {
  const time = notification.getAttribute("data-time");
  setTimeout(() => {
    notification.classList.add("alert-hidden");
  }, time);
}
/// End show alert
