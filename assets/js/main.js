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

// Отправляем данные на сервер(backend)
sendMessageButton.addEventListener('click', dataGeneration)
messageInput.addEventListener('keydown',(event) => event.code === "Enter" ?  dataGeneration() : '')


// Принимает данные с backend
socket.on('chat message', (data) => {
    const message = document.createElement("div");

    message.classList.add("message");
    message.textContent = data.message;
    wrapperMessage.appendChild(message);
})





