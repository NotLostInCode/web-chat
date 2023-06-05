const socket = io();
const sendMessageButton = document.querySelector(".message-send");
const wrapperMessage = document.querySelector(".wrapper-message");
const messageInput = document.querySelector(".message-input");
const body = document.querySelector("body");

// Объявляем глобальные переменные
let currentUserId; // Идентификатор текущего пользователя
let senderId; // Идентификатор отправителя сообщения

// Отправляем сообщение на сервер
function dataGeneration() {
  if (messageInput.value) {
    socket.emit("chat message", {
      message: messageInput.value,
      userId: currentUserId, // Передаем идентификатор пользователя
    });
    messageInput.value = "";
  }
}
//

// Получаем идентификатор пользователя с сервера
socket.on("userId", (userId) => {
  currentUserId = userId; // Сохраняем идентификатор пользователя
});
//

// Принимаем сообщения с сервера
socket.on("chat message", (data) => {
  body.dataset.id = currentUserId; // Присваиваем идентификатор пользователя атрибуту `data-id` в теге body
  // console.log(body.dataset.id);

  const message = document.createElement("div");
  message.classList.add("message");
  const messageText = document.createElement("p");
  messageText.classList.add("message-text");
  messageText.textContent = data.message;

  senderId = data.sender; // Сохраняем идентификатор отправителя

  if (data.sender === currentUserId) {
    message.classList.add("outgoing-message");
  } else {
    message.classList.add("incoming-message");
  }

  wrapperMessage.appendChild(message);
  message.appendChild(messageText);
});
//

//
sendMessageButton.addEventListener("click", dataGeneration);
messageInput.addEventListener("keydown", (event) =>
  event.code === "Enter" ? dataGeneration() : ""
);
//
