const emailInput = document.querySelector("#phone-or-email");
const passwordInput = document.querySelector("#password");
const form = document.querySelector(".form");
const statusElement = document.querySelector(".status");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  registerUser(email, password);
});

const registerUser = (email, password) => {
  fetch("https://auth-js-gmtn.onrender.com/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then(async (response) => {
      const data = await response.json();

      if (response.ok) {
        statusElement.textContent = data.message;
        statusElement.classList.remove("error");
        statusElement.classList.add("success");
        form.reset();
      } else {
        statusElement.textContent = data.error || data.message;
        statusElement.classList.remove("success");
        statusElement.classList.add("error");
      }
    })
    .catch((error) => console.error("Erro na requisição:", error));
};
