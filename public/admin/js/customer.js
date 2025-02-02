const ChangeStatus = document.querySelectorAll("[change-status]");
if (ChangeStatus) {
  ChangeStatus.forEach((item) => {
    item.onclick = (e) => {
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
