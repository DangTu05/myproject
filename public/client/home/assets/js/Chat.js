import * as Popper from "https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js";
/// Client Send Message
const formSubmit = document.querySelector(".form-submit");
const content = document.querySelector(".content");
const chat_messages = document.querySelector(".chat-messages");
if (formSubmit) {
  formSubmit.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = content.value;
    if (data && data.trim() !== "") {
      socket.emit("client-send-message", data);
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
    htmlName = `<div class="inner-name">${data.name}</div>`;
  }
  div.innerHTML = `
  ${htmlName}
  <div class="message-content">${data.content}
  </div>`;
  chat_messages.insertBefore(div, listTyping);
  chat_messages.scrollTop = chat_messages.scrollHeight;
});
// END_SEVER_RETURN__MESSAGE

/// End Client Send Message

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
  });
}

/// End Icon Chat

/// Typing
var timeout;
content.addEventListener("keyup", (e) => {
  socket.emit("client-typing", "show");
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    socket.emit("client-typing", "hidden");
  }, 3000);
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
        boxTyping.innerHTML = `<div class="inner-name">${data.name}</div>
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
