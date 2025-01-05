const ButtonStatus = document.querySelectorAll("[data-status]");
const Search = document.querySelector(".Search");
const Value = document.querySelector(".ValueSearch");
const CheckboxAll = document.getElementById("checkbox-all");
const Checkbox = document.querySelectorAll(".checkbox");
const selectElement = document.querySelector('select[name="type"]');
const Apply = document.querySelector(".apply");
const Fix = document.querySelectorAll(".fix");
const Delete = document.querySelectorAll(".delete");
const modal = document.querySelector("#modal");
const addPro = document.querySelector(".add-pro");
const sort = document.querySelector("[sort]");
if (ButtonStatus.length > 0) {
  const url = new URL(window.location.href);
  ButtonStatus.forEach((item) => {
    item.onclick = () => {
      const status = item.getAttribute("data-status");
      if (status) {
        url.searchParams.set("status", status);
      } else {
        url.searchParams.delete("status");
      }
      window.location.href = url.href;
    };
  });
}
if (Search) {
  const url = new URL(window.location.href);
  Search.addEventListener("submit", (e) => {
    e.preventDefault();
    const keyword = Value.value;
    if (keyword) {
      url.searchParams.set("keyword", keyword);
    } else {
      url.searchParams.delete("keyword");
    }
    window.location.href = url.href;
  });
}
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

/// change-multi-status and  soft delete multi
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
    if (status == "active" || status == "inactive") {
      fetch(`Products/change-status/${status}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: ids,
          status: status,
        }),
      })
        .then((response) => {
          return response.json(); // Chỉ gọi json nếu không có lỗi
        })
        .then(() => {
          location.reload(); // Tải lại trang nếu thành công
        })
        .catch((error) => {
          console.error("Lỗi:", error); // Ghi log chi tiết lỗi
          alert("Đã xảy ra lỗi: " + error.message); // Hiển thị thông báo lỗi cho người dùng
        });
    }
  });
}
/// end-change-multi-status and soft delete multi

/// soft delete
if (Delete) {
  Delete.forEach((item) => {
    item.addEventListener("click", () => {
      const id = item.value;
      Swal.fire({
        text: "Bạn có muốn xóa sản phẩm không?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          fetch(`Products/delete/${id}`, {
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
/// end soft delete

/// xử lý khi nhấn nút thêm sp
if (addPro) {
  addPro.addEventListener("click", (item) => {
    window.location.href = "product/create";
  });
}
// end thêm sp

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
          fetch("Products/delete-multi/", {
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
            .then(() => {
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

// sắp xếp
if (sort) {
  let url = new URL(window.location.href);
  const sortSelect = document.querySelector("[sort-select]");
  const clear = document.querySelector("[clear]");
  sortSelect.addEventListener("change", (e) => {
    const value = e.target.value;
    const [sortKey, sortValue] = value.split("-");
    url.searchParams.set("sortKey", sortKey);
    url.searchParams.set("sortValue", sortValue);
    window.location.href = url.href;
  });
  /// Xóa sắp xếp
  clear.addEventListener("click", () => {
    url.searchParams.delete("sortKey");
    url.searchParams.delete("sortValue");
    window.location.href = url.href;
  });
  /// xử lý selected
  const sortKey = url.searchParams.get("sortKey");
  const sortValue = url.searchParams.get("sortValue");
  const string = `${sortKey}-${sortValue}`;
  const selected = document.querySelector(`option[value='${string}']`);
  if (selected) {
    selected.selected = true;
  }
}
// end sắp xếp
