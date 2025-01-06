const product_name = document.querySelector("#name");
const quantity = document.querySelector("#quantity");
const price = document.querySelector("#price");
const img = document.querySelector("#image");
const submit = document.querySelector("#createProductForm");
const option = document.querySelector("#optionSelect");
const preview = document.querySelector(".preview");
const category_id = document.querySelector("#category_id");
if (submit) {
  submit.addEventListener("submit", (e) => {
    e.preventDefault();
    const featured = document.querySelector("input[name='featured']:checked");
    const description = tinymce.get("description").getContent();
    const formData = new FormData();
    formData.append("product_name", product_name.value);
    formData.append("quantity", quantity.value);
    formData.append("description", description);
    formData.append("featured", featured.value);
    formData.append("Price", price.value);
    formData.append("category_id", category_id.value);
    formData.append("img", img.files[0]); // Thêm tệp hình ảnh
    if (quantity.value && price.value) {
      fetch("/admin/product/create", {
        method: "POST",
        body: formData,
      })
        .then(async (response) => {
          if (!response.ok) {
            const err = await response.json();
            throw new Error(err.message); // Ném lỗi với thông điệp từ server
          }
          return response.json(); // Chuyển đổi phản hồi thành JSON nếu thành công
        })
        .then((res) => {
          if (res.message === "Tên sản phẩm không được để trống!") {
            alert("Tên sản phẩm không được trống!");
            return;
          }
          if (res.message === "Giá không được để trống!") {
            alert("Giá không được để trống!");
            return;
          }
          if (res.message === "Giá không được âm!") {
            alert("Giá không được âm!");
            return;
          }
          if (res.message === "Số lượng không được để trống!") {
            alert("Số lượng không được để trống!");
            return;
          }
          if (res.message === "Số lượng không được âm!") {
            alert("Số lượng không được âm!");
            return;
          }
          if (res.message === "Danh mục không được để trống!") {
            alert("Danh mục không được để trống!");
            return;
          }
          if (res.message === "Bạn không có quyền tạo sản phẩm") {
            alert(res.message);
            return;
          }
          alert("Đã tạo thành công!");
          window.location.href = "/admin/Products";
        })
        .catch((err) => {
          alert("Đã xảy ra lỗi khi tạo sản phẩm.");
        });
    }
  });
}

/// xử lý preview img
img.addEventListener("change", () => {
  if (img.type === "file") {
    const [file] = img.files;
    preview.src = URL.createObjectURL(file);
  }
});
///end preview img
