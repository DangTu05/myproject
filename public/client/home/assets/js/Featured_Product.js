const sort_option = document.querySelectorAll(".sort-option");
const filter_price = document.querySelectorAll("[filter-price]");
if (sort_option) {
  sort_option.forEach((item) => {
    item.onclick = () => {
      let url = new URL(window.location.href);
      const value = item.getAttribute("value");
      const [sortKey, sortValue] = value.split("-");
      url.searchParams.set("sortKey", sortKey);
      url.searchParams.set("sortValue", sortValue);
      window.location.href = url.href;
    };
  });
}
if (filter_price) {
  filter_price.forEach((item) => {
    item.addEventListener("change", (e) => {
      const url = new URL(window.location.href);
      const value = e.target.value;
      const [price_from, price_to] = value.split("-");
      url.searchParams.set("price_from", price_from);
      url.searchParams.set("price_to", price_to);
      window.location.href = url.href;
    });
  });
}
/// Nhận dạng giọng nói
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const searchForm = document.querySelector(".search_form");
const searchInput = document.querySelector(".search_input");
if (SpeechRecognition) {
  const recognition = new SpeechRecognition();
  recognition.continuous = true; // Kiểm soát việc có thu thập kết quả liên tục ( true) hay chỉ một kết quả duy nhất mỗi lần bắt đầu nhận dạng ( false).
  recognition.interimResults = true; // Cho phép nhận diện kết quả tạm thời
  searchForm.insertAdjacentHTML(
    "beforeend",
    "<button class=\"mic\" type=\"button\"><i class=\"fas fa-microphone\"></i></button>"
  );
  searchInput.style.paddingRight = "50px";
  const micBtn = searchForm.querySelector(".mic");
  const micIcon = micBtn.firstElementChild;
  micBtn.addEventListener("click", () => {
    if (micIcon.classList.contains("fa-microphone")) {
      // eslint-disable-next-line no-console
      console.log("Nhận diện giọng nói đã kích hoạt, NÓI");

      recognition.start(); // Bắt đầu nhận diện giọng nói
    } else {
      recognition.stop(); // Dừng nhận diện giọng nói
    }
  });
  recognition.addEventListener("start", () => {
    micIcon.classList.remove("fa-microphone");
    micIcon.classList.add("fa-microphone-slash");
    searchInput.focus();
    // eslint-disable-next-line no-console
    console.log("Nhận diện giọng nói đã kích hoạt, NÓI");
  });
  recognition.addEventListener("end", () => {
    micIcon.classList.remove("fa-microphone-slash");
    micIcon.classList.add("fa-microphone");
    searchInput.focus();
    // eslint-disable-next-line no-console
    console.log("Dịch vụ nhận diện giọng nói đã ngắt kết nối");
  });
  recognition.addEventListener("result", (event) => {
    let transcript = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript;
    }
    searchInput.value = transcript; // Cập nhật giá trị trường nhập liệu với kết quả
  });
}
/// End nhận dạng giọng nói
