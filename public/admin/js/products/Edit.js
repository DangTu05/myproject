const product_name = document.querySelector("#name");
const quantity = document.querySelector("#quantity");
const description = document.querySelector("#description");
const price = document.querySelector("#price");
const img = document.querySelector("#image");
const submit = document.querySelector("#EditProductForm");
const option = document.querySelector("#optionSelect");
const preview = document.querySelector(".preview");
/// lấy ra id gửi lên từ url
const id = window.location.pathname.split('/').pop();

if (submit) {
  submit.addEventListener("submit", (e) => {    
    e.preventDefault();
    const formData = new FormData();
    formData.append("product_name", product_name.value);
    formData.append("quantity", quantity.value);
    formData.append("description", description.value);
    formData.append("Price", price.value);
    if (img.type === "file") {
      formData.append("img", img.files[0]); // Thêm tệp hình ảnh
    } else {
      formData.append("img", img.value);
    }
    if (product_name.value && quantity.value && price.value ) {
      fetch(`/admin/edit/${id}`, {
        method: "PATCH",
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
          alert("Đã cập nhật thành công!");
          window.location.href = "";
        })
        .catch((err) => {
          alert("Đã xảy ra lỗi khi cập nhật sản phẩm.");
        });
    }
  });
}

/// xử lý preview img
img.addEventListener("change", () => {
  if (img.type === "create") {
    const [file] = img.files;
    preview.src = URL.createObjectURL(file);
  } else {
    preview.src = img.value;
  }
});
///end preview img
