const express = require("express");

//Подключаем библиотеку для генерации id
const { v4: uuidv4 } = require("uuid");

const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);


// app.use(express.json()); // Включаем парсинг JSON

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/assets/authorization/authorization.html");
});

app.get("/index.html", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});


// Показываем по умолчанию, откуда нам брать статические файлы
app.use(express.static(__dirname + "/assets/js"));
app.use(express.static(__dirname + "/assets/css"));
app.use(express.static(__dirname + "/assets/img"));
app.use(express.static(__dirname + "/assets/authorization"));



// autorization
app.post('/index', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;


  console.log('Received data from client:');
  console.log('Username:', username);
  console.log('Password:', password);
  // Здесь вы можете выполнить логику проверки учетных данных
  // Например, сверить их с данными из вашей базы данных

  // Отправка ответа об успешной авторизации или ошибке


    io.emit('authorizationSuccess', {
      username: username,
      password: password
    })

    res.status(200).json({ url: '/index.html' });


});


io.on("connection", (socket) => {
  // Генерируем и отправляем id на клиентскую сторону
  const userId = uuidv4();
  socket.emit("userId", userId);

  // Прослушиваем событие "chat message", переданное с клиентской стороны
  socket.on("chat message", (data) => {
    // Обрабатываем сообщение и отправляем его на клиентскую сторону
    io.emit("chat message", {
      message: data.message,
      sender: data.sender, // Используем переданный идентификатор пользователя
    });
  });
});

http.listen(3000, () => {
  console.log("Сервер стартанул");
});
