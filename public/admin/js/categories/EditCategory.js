const category_name = document.querySelector("#name");
const parent_id = document.querySelector("#parent_id");
const description = document.querySelector("#description");
const img = document.querySelector("#image");
const submit = document.querySelector("#editProductForm");
const preview = document.querySelector(".preview");
const Delete = document.querySelector(".delete");
/// lấy ra id gửi lên từ url
const id = window.location.pathname.split('/').pop();
if (submit) {
  submit.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("category_name", category_name.value);
    formData.append("parent_id", parent_id.value);
    formData.append("description", description.value);
    formData.append("img", img.files[0]); // Thêm tệp hình ảnh
    fetch(`${id}`, {
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
        if (res.message === "Tên danh mục không được để trống!") {
          alert("Tên danh mục không được trống!");
          return;
        }
        alert("Sửa thành công!");
        window.location.href = "";
      })
      .catch((err) => {
        alert("Đã xảy ra lỗi khi sửa sản phẩm.");
      });
  });
}

/// xử lý preview img
img.addEventListener("change", () => {
  const [file] = img.files;
  preview.src = URL.createObjectURL(file);
});
///end preview img
