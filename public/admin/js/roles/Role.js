const add = document.querySelector("#add");
const deleteRole = document.querySelectorAll(".btn-delete");
/// Xử lý khi người dùng thêm quyền
if (add) {
  add.onclick = (e) => {
    window.location.href = "/admin/role/create";
  };
}
/// End xử lý khi người dùng thêm quyền

/// Xử lý khi người dùng xóa quyền
if (deleteRole) {
  deleteRole.forEach((item) => {
    item.onclick = (e) => {
      const id = item.getAttribute("data-id");
      Swal.fire({
        text: "Bạn có muốn xóa sản phẩm không?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          fetch(`/admin/role/delete/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              _id: id,
            }),
          })
            .then((response) => {
              {
                return response.json();
              }
            })
            .then((res) => {
              if(res.message==="Bạn không có quyền xóa nhóm quyền"){
                alert(res.message);
                return;
              }
              Swal.fire({
                title: "Xóa!",
                text: "Bạn đã xóa thành công!",
                icon: "success",
              });
              document.addEventListener("click", (e) => {
                if (
                  e.target.matches(".swal2-confirm") ||
                  e.target.matches(".swal2-container")
                ) {
                  location.reload();
                }
              });
            })
            .catch((err) => {
              alert("Đã xảy ra lỗi: " + err.message); // Hiển thị thông báo lỗi cho người dùng
            });
        }
      });
    };
  });
}
/// End xử lý khi người dùng xóa quyền
