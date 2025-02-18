/// Client Send Message
const formSubmit = document.querySelector(".form-submit");
const content = document.querySelector(".content");
const chat_messages = document.querySelector(".chat-messages");
const room_id = document.querySelector("[room-id]").getAttribute("room-id");
if (formSubmit) {
  socket.emit("admin-join-room", room_id);
  socket.emit("admin_seen_message", {});
  formSubmit.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = content.value;
    if (data && data.trim() !== "") {
      socket.emit("admin-send-message", data);
      content.value = "";
    }
    socket.emit("client-typing", {
      room_id: room_id,
      type: "hidden",
    });
    chat_messages.scrollTop = chat_messages.scrollHeight;
  });
  chat_messages.scrollTop = chat_messages.scrollHeight;
}
// SEVER_RETURN__MESSAGE
socket.on("server-return-message", (data) => {
  const listTyping = document.querySelector(".list-typing");
  const my_id = document.querySelector("[my-id]").getAttribute("my-id");
  const div = document.createElement("div");
  if (my_id == data.user_id) {
    div.classList.add("message", "sent");
  } else {
    div.classList.add("message", "received");
  }
  div.innerHTML = `
  <div class="message-content">${data.content}
  </div>`;
  chat_messages.insertBefore(div, listTyping);
  chat_messages.scrollTop = chat_messages.scrollHeight;
});
// END_SEVER_RETURN__MESSAGE

/// End Client Send Message
// function showTyping
var timeout;
function showTyping() {
  socket.emit("client-typing", {
    room_id: room_id,
    type: "show",
  });
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    socket.emit("client-typing", {
      room_id: room_id,
      type: "hidden",
    });
  }, 3000);
}
/// Typing
content.addEventListener("keyup", () => {
  showTyping();
});

///Server return typing
const listTyping = document.querySelector(".list-typing");
if (listTyping) {
  socket.on("server-return-typing", (data) => {
    if (data.type === "show") {
      const existBoxTyping = document.querySelector(
        `.box-typing[user-id="${data.user_id}"]`
      );
      if (!existBoxTyping) {
        const boxTyping = document.createElement("div");
        boxTyping.classList.add("box-typing");
        boxTyping.setAttribute("user-id", data.user_id);
        boxTyping.innerHTML = `
    <div class="typing-indicator">
      <span class="dot"></span>
      <span class="dot"></span>
      <span class="dot"></span>
    </div>`;
        listTyping.appendChild(boxTyping);
        chat_messages.scrollTop = chat_messages.scrollHeight;
      }
    } else {
      const existBoxTyping = document.querySelector(
        `.box-typing[user-id="${data.user_id}"]`
      );
      if (existBoxTyping) {
        listTyping.removeChild(existBoxTyping);
      }
    }
  });
}

/// End Server return typing
/// End Typing

/// Xóa tin nhắn
const action = document.querySelector(".action");
if (action) {
  const deleteChat = document.querySelector("[delete-chat]");
  deleteChat.onclick = () => {
    Swal.fire({
      text: "Bạn có muốn xóa đoạn chat này không?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch("", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            {
              return response.json();
            }
          })
          .then((res) => {
            if (res.message === "Bạn không có quyền xóa") {
              alert(res.message);
              return;
            }
            if (res.code === 200) {
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
            }
          })
          .catch((err) => {
            alert("Đã xảy ra lỗi: " + err.message); // Hiển thị thông báo lỗi cho người dùng
          });
      }
    });
  };
}
/// End xóa tin nhắn

/// Upload nhiều ảnh
// https://www.npmjs.com/package/file-upload-with-preview (gửi ảnh)
/// https://github.com/fengyuanchen/viewerjs (xem ảnh)
/// End Upload nhiều ảnh
