const edit=document.querySelectorAll(".edit");
const remove=document.querySelectorAll(".remove");

/// Xử lý khi click sửa sản phẩm
if(edit){
  edit.forEach((item)=>{
    item.addEventListener("click",()=>{
      const id=item.getAttribute("data-id");
      window.location.href=`/admin/account/edit/${id}`
    })
  })
}
/// End click sửa sản phẩm
