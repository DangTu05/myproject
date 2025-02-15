const action = document.querySelector(".action");
if (action) {
  const block = action.querySelector("#block");
  block.onclick = () => {
    const data = block.getAttribute("data-user_id");
    socket.emit("block", { data });
  };
}
socket.on("server-return-block", (data) => {
  alert(data);
});
