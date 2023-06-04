const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Показываем по умолчанию, откуда нам брать статические файлы
app.use(express.static(__dirname + "/assets/js"));
app.use(express.static(__dirname + "/assets/css"));
app.use(express.static(__dirname + "/assets/img"));

// Принимаем сообщение
io.on("connection", (socket) => {
  // Прослушиваем событие, которое передаем с фронтенда
  socket.on("chat message", (data) => {
    // Обрабатываем и отправляем на фронтенд
    io.emit('chat message', {
      message: data.message
    })
  });
});

http.listen(4000, () => {
  console.log("Сервер стартанул");
});
