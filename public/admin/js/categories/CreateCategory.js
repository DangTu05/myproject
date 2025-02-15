const category_name = document.querySelector("#name");
const parent_id = document.querySelector("#parent_id");
const img = document.querySelector("#image");
const submit = document.querySelector("#createProductForm");
const preview = document.querySelector(".preview");

if (submit) {
  submit.addEventListener("submit", (e) => {
    e.preventDefault();
    const description = tinymce.get("description").getContent();
    const formData = new FormData();
    formData.append("category_name", category_name.value);
    formData.append("parent_id", parent_id.value);
    formData.append("description", description);
    formData.append("img", img.files[0]); // Thêm tệp hình ảnh
    formData.append("img", img.value);
    fetch("create", {
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
        if (res.message === "Bạn không có quyền tạo danh mục sản phẩm") {
          alert(res.message);
          return;
        }
        alert("Đã tạo thành công!");
        window.location.href = "/admin/category";
      })
      .catch(() => {
        alert("Đã xảy ra lỗi khi tạo sản phẩm.");
      });
  });
}

/// xử lý preview img
img.addEventListener("change", () => {
  const [file] = img.files;
  preview.src = URL.createObjectURL(file);
});
///end preview img
