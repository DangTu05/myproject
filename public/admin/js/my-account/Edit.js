const edit = document.getElementById("editAccountForm");
const img = document.getElementById("image");
const preview = document.querySelector(".preview");
if (edit) {
  edit.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", document.getElementById("name").value);
    formData.append("email", document.getElementById("email").value);
    formData.append("password", document.getElementById("password").value);
    formData.append("phone", document.getElementById("phone").value);
    formData.append("img", img.files[0]); // Thêm tệp hình ảnh
    fetch("/admin/my-account/edit", {
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
        if (
          res.message === "Họ tên không được để trống!" ||
          res.message === "Email không được để trống!"
        ) {
          alert("Thông tin không được để trống!");
          return;
        }
        if (res.message === "Email đã tồn tại") {
          alert(res.message); // Hiển thị thông báo email đã tồn tại
          return;
        }
        alert("Đã sửa thành công!");
        window.location.href = "";
      })
      .catch((err) => {
        alert("Đã xảy ra lỗi khi cập nhật tài khoản.");
      });
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
