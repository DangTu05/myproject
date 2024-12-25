const ChangeStatus = document.querySelectorAll("[change-status]");
const Delete = document.querySelectorAll(".delete");
/// Thay đổi trạng thái
if (ChangeStatus) {
  ChangeStatus.forEach((item) => {
    item.onclick = (e) => {
      const StatusCurrent = item.getAttribute("data-status");
      const Id = item.getAttribute("data-id");
      const ChangeStatus = StatusCurrent == "active" ? "inactive" : "active";
      $.ajax({
        url: `/admin/category/change-status/${ChangeStatus}/${Id}`,
        method: "PATCH",
        data: {
          _id: Id,
          status: ChangeStatus,
        },
        success: function (response) {
          location.reload();
        },
        error: function () {
          alert("Lỗi!!!");
        },
      });
    };
  });
}
/// end thay đổi trạng thái

/// xóa mềm
if (Delete) {
  Delete.forEach((item) => {
    item.onclick = (e) => {
      const _id = item.value;
      Swal.fire({
        text: "Bạn có muốn xóa sản phẩm không?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          fetch(`/admin/category/delete/${_id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              _id: _id,
            }),
          })
            .then(async (response) => {
              if (!response.ok) {
                // Nếu HTTP status không phải 200-299, trả về lỗi
                const err = await response.json();
                throw new Error(err.message || "Đã xảy ra lỗi");
              }
              return response.json(); // Đọc dữ liệu JSON nếu thành công
            })
            .then((data) => {
              // Xử lý khi thành công
              Swal.fire({
                title: "Xóa!",
                text: "Bạn đã xóa thành công!",
                icon: "success",
              }).then((res) => {
                document.addEventListener("click", (e) => {
                  if (
                    e.target.matches(".swal2-confirm") ||
                    e.target.matches(".swal2-container")
                  ) {
                    location.reload();
                  }
                });
              });
            })
            .catch((err) => {
              // Xử lý khi lỗi
                Swal.fire({
                  title: "Lỗi!",
                  text: `Đã xảy ra lỗi!`,
                  icon: "error",
                });
            });
        }
      });
    };
  });
}
/// end xóa mềm
