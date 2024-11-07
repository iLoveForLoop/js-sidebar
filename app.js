const alertPop = document.getElementById("alert");

let usersList = JSON.parse(localStorage.getItem("users")) || [];

const storeToStorage = () => {
  localStorage.setItem("users", JSON.stringify(usersList));
};

const alert = (type, message) => {
  alertPop.classList.add(type);
  alertPop.innerHTML = message;
  alertPop.classList.add("visible-element");
  setTimeout(() => {
    alertPop.classList.remove("visible-element");
    alertPop.classList.remove(type);
  }, 2000);
};

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();
      const errorMessage = document.getElementById("error-message");

      try {
        if (username === "" || password === "") {
          throw new Error("Please fill in both fields.");
        }

        if (
          usersList.some((data) => data.username === username) &&
          usersList.some((data) => data.password === password)
        ) {
          alert("alert-success", "Log in successfull.");

          document.getElementById("username").value = "";
          document.getElementById("password").value = "";
          window.location.href = "crypto.html";
        } else {
          alert("alert-danger", "Invalid username or password.");
          //   throw new Error("Invalid username or password.");
        }
      } catch (error) {
        alert("alert-danger", error.message);
      }
    });
  }

  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const sUsername = document.getElementById("s-username").value;
      const sPassword = document.getElementById("s-password").value;
      const csPassword = document.getElementById("cs-password").value;
      let message = "Account created successfully.";
      const checker = () => {
        if (sPassword !== csPassword) {
          message = "Passsword doesn't match";
          return false;
        } else if (usersList.some((obj) => obj.username === sUsername)) {
          message = "Username already exist!";
          return false;
        }

        return true;
      };

      if (checker()) {
        let newUser = { username: sUsername, password: sPassword };
        usersList.push(newUser);
        storeToStorage();
        alert("alert-success", message);
        document.getElementById("s-username").value = "";
        document.getElementById("s-password").value = "";
        document.getElementById("cs-password").value = "";
      } else {
        alert("alert-danger", message);
      }
    });
  }
});
