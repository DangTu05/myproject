// function isHidden(element) {
//   if (!element) return true;

//   if (window.getComputedStyle(element).display === "none") {
//     return true;
//   }

//   let parent = element.parentElement;
//   while (parent) {
//     if (window.getComputedStyle(parent).display === "none") {
//       return true;
//     }
//     parent = parent.parentElement;
//   }

//   return false;
// }

window.addEventListener("template-loaded", initJsToggle);
function initJsToggle() {
  $$(".js-toggle").forEach((button) => {
    const target = button.getAttribute("toggle-target");
    if (!target) {
      document.body.innerText = `Cần thêm toggle-target cho: ${button.outerHTML}`;
    }
    button.onclick = (e) => {
      e.preventDefault();

      if (!$(target)) {
        return (document.body.innerText = `Không tìm thấy phần tử "${target}"`);
      }
      if (target === "#Edit-new-address") {
        const edit = document.querySelector(".edit_submit");
        const name = document.querySelector("[edit_name]");
        const phone = document.querySelector("[edit_phone]");
        const address = document.querySelector("[edit_address]");
        if (edit && name && phone && address) {
          const action = `/checkout/address/edit/${button.getAttribute("data-id")}?_method=PATCH`;
          const dataphone = button.getAttribute("data-phone");
          const dataaddress = button.getAttribute("data-address");
          const dataname = button.getAttribute("data-name");
          edit.setAttribute("action", action);
          phone.setAttribute("value", dataphone);
          address.setAttribute("value", dataaddress);
          name.setAttribute("value", dataname);
          address.innerText = address.getAttribute("value");
        }
      }
      const isHidden = $(target).classList.contains("hide");

      requestAnimationFrame(() => {
        $(target).classList.toggle("hide", !isHidden);
        $(target).classList.toggle("show", isHidden);
      });
    };
    document.onclick = function (e) {
      if (!e.target.closest(target)) {
        const isHidden = $(target).classList.contains("hide");
        if (!isHidden) {
          button.click();
        }
      }
    };
  });
}
