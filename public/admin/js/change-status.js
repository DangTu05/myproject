const ChangeStatus = document.querySelectorAll("[change-status]");
if (ChangeStatus) {
  ChangeStatus.forEach((item) => {
    item.onclick = () => {
      const StatusCurrent = item.getAttribute("data-status");
      const Id = item.getAttribute("data-id");
      const ChangeStatus = StatusCurrent == "active" ? "inactive" : "active";
      $.ajax({
        url: `Products/change-status/${ChangeStatus}/${Id}`,
        method: "PATCH",
        data: {
          _id: Id,
          status: ChangeStatus,
        },
        success: function (response) {
          if (response.message === "Bạn không có quyền sửa") {
            alert(res.message);
            return;
          } else {
            location.reload();
          }
        },
        error: function () {
          alert("Lỗi!!!");
        },
      });
    };
  });
}
