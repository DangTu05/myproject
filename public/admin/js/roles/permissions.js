/// permissions
const tablePermission = document.querySelector("[table-permissions]");
const buttonSubmit = document.querySelector(".update-btn");
if (tablePermission) {
  buttonSubmit.addEventListener("click", () => {
    let permissions = [];
    const rows = tablePermission.querySelectorAll("[data-name]");
    rows.forEach((row) => {
      const data_name = row.getAttribute("data-name");
      const inputs = row.querySelectorAll("input");
      if (data_name == "id") {
        inputs.forEach((input) => {
          const id = input.value;
          permissions.push({
            _id: id,
            permissions: [],
          });
        });
      } else {
        inputs.forEach((item, index) => {
          const checked = item.checked;
          if (checked) {
            permissions[index].permissions.push(data_name);
          }
        });
      }
    });
    Swal.fire({
      text: "Bạn có muốn cập nhật không?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch("", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            permissions: permissions,
          }),
        })
          .then((response) => {
            {
              return response.json();
            }
          })
          .then((res) => {
            if(res.message === "Bạn không có quyền cập nhật quyền"){
              alert(res.message);
              return;
            }
            Swal.fire({
              title: "Thành công!",
              text: "Bạn đã cập nhật thành công!",
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
}
/// end permission

/// checked
const data = JSON.parse(
  document.querySelector(".content-container").getAttribute("data")
);
if (data) {
  const tablePermission = document.querySelector("[table-permissions]");
  data.forEach((item, index) => {
    const permissions = item.permissions;
    permissions.forEach((permission) => {
      const row = tablePermission.querySelector(`[data-name="${permission}"]`);
      const input = row.querySelectorAll("input")[index];
      input.checked = true;
    });
  });
}

/// end checked
