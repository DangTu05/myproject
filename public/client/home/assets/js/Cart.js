const quantity = document.querySelector(".quantity");
const submit = document.querySelector("#submitForm");
const id = window.location.pathname.split("/").pop();
if (submit) {
  submit.addEventListener("submit", (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Bạn chắc chứ?",
      text: "Bạn muốn thêm sản phẩm này",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Thêm",
    }).then((result) => {
      fetch(`/cart/add/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quantity: quantity.value,
        }),
      })
        .then((res) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "Thành công",
              text: "Bạn đã thêm thành công.",
              icon: "success",
            });
          }
        })
        .catch(() => {
          alert("Đã xảy ra lỗi!");
        });
    });
  });
}
