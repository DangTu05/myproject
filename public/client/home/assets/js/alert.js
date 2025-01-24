/// Show alert
const notification = document.querySelector(".notification");
if (notification) {
  const time = notification.getAttribute("data-time");
  setTimeout(() => {
    notification.classList.add("alert-hidden");
  }, time);
}
/// End show alert
