const edit = document.querySelectorAll(".edit");
const remove = document.querySelectorAll(".remove");

/// Xử lý khi click sửa sản phẩm
if (edit) {
  edit.forEach((item) => {
    item.addEventListener("click", () => {
      const id = item.getAttribute("data-id");
      window.location.href = `/admin/account/edit/${id}`;
    });
  });
}
/// End click sửa sản phẩm

/// Xử lý khi click vào xóa sản phẩm
if (remove) {
  remove.forEach((item) => {
    item.addEventListener("click", () => {
      const id = item.getAttribute("data-id");
      Swal.fire({
        text: "Bạn có muốn xóa tài khoản không?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          fetch(`/admin/account/delete/${id}`, {
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
              if (res.message === "Bạn không có quyền xóa tài khoản") {
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
    });
  });
}
/// End xử lý xóa sản phẩm
