const submit = document.querySelector("#createRoleForm");
const title = document.querySelector("#name");
if (submit) {
  submit.addEventListener("submit", (e) => {
    e.preventDefault(); // Ngăn chặn hành động gửi mẫu mặc định
    // Lấy nội dung từ TinyMCE bên trong sự kiện gửi
    const description = tinymce.get("description").getContent();
    fetch("create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title.value,
        description: description, // Gửi nội dung
      }),
    })
      .then((res) => {
        if (res.message === "Bạn không có quyền tạo nhóm quyền") {
          alert(res.message);
          return;
        }
        alert("Tạo thành công!");
        window.location.href = "/admin/role/roles";
      })
      .catch(() => {
        alert("Đã xảy ra lỗi khi tạo !");
      });
  });
}
