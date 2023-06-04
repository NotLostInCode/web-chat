const socket = io()
const sendMessageButton = document.querySelector(".message-send");
const wrapperMessage = document.querySelector(".incoming-message");
const messageInput = document.querySelector(".message-input");


// Отправляем на backend
function dataGeneration() {
    if(messageInput.value) {
        socket.emit('chat message', {
            message: messageInput.value
        })
        messageInput.value = "";
    }
}

//
sendMessageButton.addEventListener('click', dataGeneration)
messageInput.addEventListener('keydown',(event) => event.code === "Enter" ?  dataGeneration() : '')
//


// Получаем id с сервера
let currentUserId;

socket.on('userId', (userId) => {
    currentUserId = userId;
  });
//


// Принимает данные с backend
socket.on('chat message', (data) => {
    console.log(currentUserId)
    const message = document.createElement("div");

    message.classList.add("message");
    message.textContent = data.message;
    wrapperMessage.appendChild(message);
})
//

