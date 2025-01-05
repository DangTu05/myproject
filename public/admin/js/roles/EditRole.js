const submit = document.querySelector("#editRoleForm");
const title = document.querySelector("#name");
/// lấy ra id gửi lên từ url
const id = window.location.pathname.split("/").pop();
if (submit) {
  submit.addEventListener("submit", (e) => {
    e.preventDefault(); // Ngăn chặn hành động gửi mẫu mặc định
    // Lấy nội dung từ TinyMCE bên trong sự kiện gửi
    const description = tinymce.get("description").getContent();
    fetch(`/admin/role/edit/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title.value,
        description: description, // Gửi nội dung
      }),
    })
      .then((res) => {
        if(res.message === "Bạn không có quyền sửa nhóm quyền"){
          alert(res.message);
          return;
        }
        alert("Cập nhật thành công!");
        window.location.href = `/admin/role/edit/${id}`;
      })
      .catch((err) => {
        alert("Đã xảy ra lỗi khi cập !");
      });
  });
}
