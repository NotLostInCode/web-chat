const login = document.querySelector(".login");
const password = document.querySelector(".passwords");
const form = document.querySelector(".form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  fetch("/index", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: login.value,
      password: password.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      const url = data.url;
      window.location.href = url;
    })
    .catch((error) => {
      // Обработка ошибок
    });
});
