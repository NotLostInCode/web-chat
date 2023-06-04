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


// Принимаем сообщение
io.on("connection", (socket) => {

  // Отправляем id на фронтенд
  const userId = uuidv4();
  socket.emit("userId", userId);


  // Прослушиваем событие, которое передаем с фронтенда
  socket.on("chat message", (data) => {
    // Обрабатываем и отправляем на фронтенд
    io.emit("chat message", {
      message: data.message,
      sender: data.userId
    });
  });
});

http.listen(4000, () => {
  console.log("Сервер стартанул");
});
