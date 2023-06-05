const express = require("express");

//Подключаем библиотеку для генерации id
const { v4: uuidv4 } = require("uuid");

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

io.on("connection", (socket) => {
  // Генерируем и отправляем id на клиентскую сторону
  const userId = uuidv4();
  socket.emit("userId", userId);

  // Прослушиваем событие "chat message", переданное с клиентской стороны
  socket.on("chat message", (data) => {
    // Обрабатываем сообщение и отправляем его на клиентскую сторону
    io.emit("chat message", {
      message: data.message,
      sender: data.userId, // Используем переданный идентификатор пользователя
    });
  });
});

http.listen(4000, () => {
  console.log("Сервер стартанул");
});
