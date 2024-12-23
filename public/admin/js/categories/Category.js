const category_name = document.querySelector("#name");
const parent_id = document.querySelector("#parent_id");
const description = document.querySelector("#description");
const img = document.querySelector("#image");
const submit = document.querySelector("#createProductForm");
const option = document.querySelector("#optionSelect");
const preview = document.querySelector(".preview");

/// Xử lý lựa chọn file
option.addEventListener("change", () => {
  if (option.value === "text") {
    img.type = "text";
  } else {
    img.type = "file";
    img.accept = "image/*";
  }
});

/// end

if (submit) {
  submit.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(); 
    formData.append("category_name", category_name.value);
    formData.append("parent_id", parent_id.value);
    formData.append("description", description.value);
    if (img.type === "file") {
      formData.append("img", img.files[0]); // Thêm tệp hình ảnh
    } else {
      formData.append("img", img.value);
    }
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
        if (res.message === "Tên danh mục không được để trống!") {
          alert("Tên danh mục không được trống!");
          return;
        }
        alert("Đã tạo thành công!");
        // window.location.href = "product-category";
      })
      .catch((err) => {
        alert("Đã xảy ra lỗi khi tạo sản phẩm.");
      });
  });
}

/// xử lý preview img
img.addEventListener("change", () => {
  if (img.type === "file") {
    const [file] = img.files;
    preview.src = URL.createObjectURL(file);
  } else {
    preview.src = img.value;
  }
});
///end preview img