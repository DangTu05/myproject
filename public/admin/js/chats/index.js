/// Client Send Message
const formSubmit = document.querySelector(".form-submit");
const content = document.querySelector(".content");
const chat_messages = document.querySelector(".chat-messages");
if (formSubmit) {
  socket.emit("admin_seen_message", {});
  formSubmit.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = content.value;
    if (data && data.trim() !== "") {
      socket.emit("admin-send-message", data);
      content.value = "";
    }
    socket.emit("client-typing", "hidden");
    chat_messages.scrollTop = chat_messages.scrollHeight;
  });
  chat_messages.scrollTop = chat_messages.scrollHeight;
}
// SEVER_RETURN__MESSAGE
socket.on("server-return-message", (data) => {
  const listTyping = document.querySelector(".list-typing");
  const my_id = document.querySelector("[my-id]").getAttribute("my-id");
  const div = document.createElement("div");
  let htmlName = "";
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
  socket.emit("client-typing", "show");
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    socket.emit("client-typing", "hidden");
  }, 3000);
}
/// Typing
content.addEventListener("keyup", (e) => {
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

/// Upload nhiều ảnh
// https://www.npmjs.com/package/file-upload-with-preview (gửi ảnh)
/// https://github.com/fengyuanchen/viewerjs (xem ảnh)
/// End Upload nhiều ảnh
