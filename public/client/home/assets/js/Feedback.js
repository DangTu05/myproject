const commentForm = document.querySelector(".comment");
if (commentForm) {
  commentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const comment = tinymce.get("comment").getContent();
    /// Phát ra sự kiện client-feedback và gửi lên nội dung tin nhắn đã submit
    socket.emit("client_feedback", comment);
    commentForm.reset();
  });
}
/// Client nhận về feedback
socket.on("client_return_feedback", (data) => {
  const feedbacks = document.querySelector(".feedbacks");
  const div = document.createElement("div");
  div.classList.add("col");
  div.style.marginBottom = "10px";
  div.innerHTML = `
  <div class="review-card">
    <div class="review-card__content">
      <img class="review-card__avatar" src=${data.img}>
      <div class="review-card__info">
        <h4 class="review-card__title">${data.name}</h4>
        <p class="review-card__desc">${data.feedback}</p>
      </div>
    </div>
    <div class="review-card__rating">
      <div class="review-card__star-list">
        <img class="review-card__star" src="/client/home/assets/icons/star.svg", alt="">
        <img class="review-card__star" src="/client/home/assets/icons/star.svg", alt="">
        <img class="review-card__star" src="/client/home/assets/icons/star.svg", alt="">
        <img class="review-card__star" src="/client/home/assets/icons/star.svg", alt="">
        <img class="review-card__star" src="/client/home/assets/icons/star.svg", alt="">
      </div>
      <span class="review-card__rating-title"> (3.5) Review</span>
    </div>
  </div>`;
  feedbacks.prepend(div);
});
