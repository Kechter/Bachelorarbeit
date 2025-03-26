$(document).ready(function () {
  checkAuth();

  $("#login-form").on("submit", function (event) {
    event.preventDefault();
    loginUser();
  });

  $("#signup-form").on("submit", function (event) {
    event.preventDefault();
    signupUser();
  });
});

function checkAuth() {
  let authToken = localStorage.getItem("authToken");
  if (authToken) {
    let currentPage = window.location.pathname.split("/").pop();
    if (currentPage === "login.html" || currentPage === "signup.html") {
      window.location.href = "products.html";
    }
  } else {
    let restrictedPages = ["products.html", "cart.html"];
    let currentPage = window.location.pathname.split("/").pop();
    if (restrictedPages.includes(currentPage)) {
      window.location.href = "login.html";
    }
  }
}

function loginUser() {
  let email = $("#email").val();
  let password = $("#password").val();

  const requestData = { email, password };

  $.ajax({
    url: "http://localhost:3001/api/login",
    method: "POST",
    contentType: "application/json",
    dataType: "json",
    data: JSON.stringify(requestData),
    success: function (response) {
      localStorage.setItem("authToken", response.token);
      localStorage.setItem("userId", response.user.id);
      window.location.href = "products.html";
    },
  });
}

function signupUser() {
  let email = $("#signup-email").val();
  let password = $("#signup-password").val();

  const requestData = { email, password };

  $.ajax({
    url: "http://localhost:3001/api/signup",
    method: "POST",
    contentType: "application/json",
    dataType: "json",
    data: JSON.stringify(requestData),
    success: function () {
      window.location.href = "login.html";
    },
  });
}

function logoutUser() {
  localStorage.removeItem("authToken");
  window.location.href = "login.html";
}
