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
    chat_messages.scrollTop = chat_messages.scrollHeight;
  });
  chat_messages.scrollTop = chat_messages.scrollHeight;
}
// SEVER_RETURN__MESSAGE
socket.on("server-return-message", (data) => {
  const my_id = document.querySelector("[my-id]").getAttribute("my-id");
  const div = document.createElement("div");
  let htmlName = "";
  if (my_id == data.user_id) {
    div.classList.add("message", "sent");
  } else {
    div.classList.add("message", "received");
    htmlName = `<div class-"inner-name>${data.name}</div>`;
  }
  div.innerHTML = `
  ${htmlName}
  <div class="message-content">${data.content}
  </div>`;
  chat_messages.appendChild(div);
  chat_messages.scrollTop = chat_messages.scrollHeight;
});
// END_SEVER_RETURN__MESSAGE

/// End Client Send Message
