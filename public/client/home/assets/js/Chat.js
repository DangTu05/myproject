import * as Popper from "https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js";
/// Client Send Message
const formSubmit = document.querySelector(".form-submit");
const content = document.querySelector(".content");
const chat_messages = document.querySelector(".chat-messages");
const room_id = document.querySelector("[room-id]").getAttribute("room-id");
if (formSubmit) {
  /// Phát sự kiện client-join
  socket.emit("client-join-room", room_id);
  /// Phát sự kiện client_seen_message
  socket.emit("client_seen_message", {});
  /// submit tin nhắn được gửi
  formSubmit.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = content.value;
    if (data && data.trim() !== "") {
      /// Phát ra sự kiện client-send-message và gửi lên nội dung tin nhắn đã submit
      socket.emit("client-send-message", data);
      content.value = "";
    }
    /// Khi nhập xong phát ra sự client tắt typing
    socket.emit("client-typing", {
      room_id: room_id,
      type: "hidden",
    });
    chat_messages.scrollTop = chat_messages.scrollHeight;
  });
  chat_messages.scrollTop = chat_messages.scrollHeight;
}
// SEVER_RETURN__MESSAGE
/// Nhận data từ sự kiện "server-return-message"
socket.on("server-return-message", (data) => {
  const listTyping = document.querySelector(".list-typing");
  const my_id = document.querySelector("[my-id]").getAttribute("my-id");
  const div = document.createElement("div");
  let htmlName = "";
  /// Kiểm tra xem user_id nhận từ server là id người gửi hay nhận
  if (my_id == data.user_id) {
    div.classList.add("message", "sent");
  } else {
    div.classList.add("message", "received");
    htmlName = `<div class="inner-name">${data.name}</div>`;
  }
  div.innerHTML = `
  ${htmlName}
  <div class="message-content">${data.content}
  </div>`;
  /// insert nội dung đó trên class typing
  chat_messages.insertBefore(div, listTyping);
  chat_messages.scrollTop = chat_messages.scrollHeight;
});
// END_SEVER_RETURN__MESSAGE

/// End Client Send Message
// function showTyping
/// set thời gian show typing
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

/// Icon Chat
const iconChat = document.querySelector("emoji-picker");
const icon = document.querySelector(".icon-button");
const tooltip = document.querySelector(".tooltip");
Popper.createPopper(icon, tooltip);
icon.onclick = () => {
  tooltip.classList.toggle("shown");
};
if (iconChat) {
  iconChat.addEventListener("emoji-click", (e) => {
    const data = e.detail.unicode;
    content.value += data;
    content.setSelectionRange(content.value.length, content.value.length);
    content.focus();
    showTyping();
  });
}

/// End Icon Chat

/// Typing
/// Khi người dùng nhập tin nhắn thì kích hoạt show typing
content.addEventListener("keyup", (e) => {
  showTyping();
});

///Server return typing
const listTyping = document.querySelector(".list-typing");
if (listTyping) {
  /// nhận data từ sự kiện "server-return-typing"
  socket.on("server-return-typing", (data) => {
    if (data.type === "show") {
      /// nếu data type trả về là show thì sẽ tìm xem đã xó typing chưa
      const existBoxTyping = document.querySelector(
        `.box-typing[user-id="${data.user_id}"]`
      );
      // nếu chưa có thì tạo typing
      if (!existBoxTyping) {
        const boxTyping = document.createElement("div");
        boxTyping.classList.add("box-typing");
        boxTyping.setAttribute("user-id", data.user_id);
        boxTyping.innerHTML = `<div class="inner-name">${data.name}</div>
    <div class="typing-indicator">
      <span class="dot"></span>
      <span class="dot"></span>
      <span class="dot"></span>
    </div>`;
        listTyping.appendChild(boxTyping);
        chat_messages.scrollTop = chat_messages.scrollHeight;
      }
    }
    /// Nếu data type trả về không == show thì kiểm tra xem có typing chưa có thì xóa
    else {
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

/// Upload nhiều ảnh
// https://www.npmjs.com/package/file-upload-with-preview (gửi ảnh)
/// https://github.com/fengyuanchen/viewerjs (xem ảnh)
/// End Upload nhiều ảnh
