const ChangeStatus = document.querySelectorAll("[change-status]");
const Remove = document.querySelectorAll(".remove");

if (ChangeStatus) {
  ChangeStatus.forEach((item) => {
    item.onclick = () => {
      const StatusCurrent = item.getAttribute("data-status");
      const Id = item.getAttribute("data-id");
      const ChangeStatus = StatusCurrent == "active" ? "inactive" : "active";
      $.ajax({
        url: `customers/change-status/${ChangeStatus}/${Id}`,
        method: "PATCH",
        data: {
          _id: Id,
          status: ChangeStatus,
        },
        success: function () {
          location.reload();
        },
        error: function () {
          alert("Lỗi!!!");
        },
      });
    };
  });
}
/// Xóa tài khoản user
if (Remove) {
  Remove.forEach((item) => {
    item.addEventListener("click", () => {
      const id = item.getAttribute("data-id");
      Swal.fire({
        text: "Bạn có muốn xóa người dùng này không?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          fetch(`customer/delete/${id}`, {
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
            .then(() => {
              // if (res.message === "Bạn không có quyền xóa") {
              //   alert(res.message);
              //   return;
              // }
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
            });
        }
      });
    });
  });
}
