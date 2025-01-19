const submit = document.querySelector("#submit");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

if (submit) {
  submit.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch("/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
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
          res.message === "email không được để trống" ||
          res.message === "password không được để trống"
        ) {
          alert("Thông tin không được để trống!");
          return;
        }
        if (res.message === "Tài khoản không tồn tại!") {
          alert("Tài khoản không tồn tại!");
          return;
        }
        if (res.message === "Mật khẩu không đúng!") {
          alert("Mật khẩu không đúng!");
          return;
        }
        if (res.message === "Tài khoản này đã bị khóa") {
          alert("Tài khoản này đã bị khóa!");
          return;
        }
        alert("Đăng nhập thành công!");
        window.location.href = "/home";
      })
      .catch((err) => {
        alert("Đã xảy ra lỗi khi tạo tài khoản.");
      });
  });
}
