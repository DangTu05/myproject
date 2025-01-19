document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.querySelector("#registerForm");
  const passwordInput = document.getElementById("password");
  const buttonToggle = document.querySelector(".password-toggle");
  const toggleIcon = document.getElementById("toggleIcon");
  if (buttonToggle) {
    buttonToggle.addEventListener("click", () => {
      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleIcon.classList.remove("fa-eye");
        toggleIcon.classList.add("fa-eye-slash");
      } else {
        passwordInput.type = "password";
        toggleIcon.classList.remove("fa-eye-slash");
        toggleIcon.classList.add("fa-eye");
      }
    });
  }
  function validate() {
    const name = document.querySelector("#fullname");
    const phone = document.querySelector("#phone");
    const email = document.querySelector("#email");
    const password = document.querySelector("#password");
    if (
      (name.value =
        "" || phone.value == "" || email.value == "" || password.value == "")
    ) {
      alert("Vui lòng nhập đầy đủ thông tin");
    } else {
      registerForm.submit();
    }
  }
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    validate();
  });
});
