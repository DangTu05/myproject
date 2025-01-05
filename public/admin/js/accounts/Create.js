const submit = document.querySelector("#createAccountForm");
const fullname = document.querySelector("#name");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const img = document.querySelector("#image");
const preview = document.querySelector(".preview");
const phone = document.querySelector("#phone");
const select = document.querySelector("#role_id");
if (submit) {
  submit.addEventListener("submit", (e) => {
    e.preventDefault(); // Ngăn chặn hành động gửi mẫu mặc định
    const formData = new FormData();
    formData.append("name", fullname.value);
    formData.append("email", email.value);
    formData.append("password", password.value);
    formData.append("phone", phone.value);
    formData.append("role_id", select.value);
    formData.append("img", img.files[0]); // Thêm tệp hình ảnh
    fetch("/admin/account/create", {
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
        if (res.message === "Bạn không có quyền tạo tài khoản") {
          alert(res.message);
          return;
        }
        if (
          res.message === "Họ không được để trống!" ||
          res.message === "Email không được để trống!" ||
          res.message === "Mật khẩu không được để trống!"
        ) {
          alert("Thông tin không được để trống!");
          return;
        }
        alert("Đã tạo thành công!");
        window.location.href = "/admin/account/accounts";
      })
      .catch((err) => {
        alert("Đã xảy ra lỗi khi tạo tài khoản.");
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
