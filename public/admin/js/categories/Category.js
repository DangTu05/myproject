const ChangeStatus = document.querySelectorAll("[change-status]");
const Delete = document.querySelectorAll(".delete");
const Checkbox = document.querySelectorAll(".checkbox");
const CheckboxAll = document.getElementById("checkbox-all");
const Add_Category = document.querySelector(".add-category");
const Apply = document.querySelector(".apply");
const selectElement = document.querySelector('select[name="type"]');
/// Đẩy về trang tạo danh mục
Add_Category.onclick = (e) => {
  window.location.href = "/admin/category/create";
};
// end đẩy về trang tạo danh mục
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
          if (response.message === "Bạn không có quyền sửa danh mục sản phẩm") {
            alert(res.message);
            return;
          }
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
/// CheckboxMulti
if (CheckboxAll) {
  /// Lấy sự kiện checkbox tất cả
  CheckboxAll.addEventListener("click", function () {
    var isCheckboxAll = this.checked;
    Checkbox.forEach((item) => {
      item.checked = isCheckboxAll;
    });
  });
}
Checkbox.forEach((item, index) => {
  item.addEventListener("change", function () {
    // Kiểm tra xem tất cả checkbox có được chọn không
    /// from(check) để chuyển check về mảng và dùng filter
    var isCheckedAll =
      Checkbox.length ===
      Array.from(Checkbox).filter((cb) => cb.checked).length;
    CheckboxAll.checked = isCheckedAll;
  });
});
/// End CheckboxMulti
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
            .then((res) => {
              if (res.message === "Bạn không có quyền xóa danh mục sản phẩm") {
                alert(res.message);
                return;
              }
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

/// change-multi-status and  soft delete multi
if (Apply) {
  Apply.onclick = (e) => {
    const CheckboxChecked = document.querySelectorAll(".checkbox:checked");
    const status = selectElement.value;
    let ids = [];
    if (CheckboxChecked.length == 0) {
      Swal.fire({
        title: "Lỗi!",
        text: "Vui lòng chọn ít nhất một sản phẩm",
        icon: "error",
      });
      return;
    } else {
      CheckboxChecked.forEach((item) => {
        let id = item.value;
        ids.push(id);
      });
    }
    if (status == "active" || status == "inactive") {
      fetch(`/admin/category/change-status/${status}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ids: ids,
          status: status,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((res) => {
          if (res.message === "Bạn không có quyền sửa danh mục sản phẩm") {
            alert(res.message);
            return;
          }
          location.reload();
        })
        .catch((err) => {
          alert("Lỗi!!!");
        });
    }
  };
}
/// soft delete multi
if (Apply) {
  Apply.addEventListener("click", (e) => {
    const CheckboxChecked = document.querySelectorAll(".checkbox:checked");
    const status = selectElement.value;
    let ids = [];
    if (CheckboxChecked.length == 0) {
      Swal.fire({
        title: "Lỗi!",
        text: "Bạn chưa chọn bất kì sản phẩm nào!",
        icon: "error",
      });
      return;
    } else {
      CheckboxChecked.forEach((item) => {
        let id = item.value;
        ids.push(id);
      });
    }
    if (status == "delete-all") {
      Swal.fire({
        text: "Bạn có muốn xóa sản phẩm không?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          fetch("/admin/category/delete-multi/", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              _id: ids,
            }),
          })
            .then((response) => {
              {
                return response.json();
              }
            })
            .then((res) => {
              if (res.message === "Bạn không có quyền xóa danh mục sản phẩm") {
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
    }
  });
}
/// end-soft-delete-multi

/// end-change-multi-status and soft delete multi
