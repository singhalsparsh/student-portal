document.getElementById("loginForm").addEventListener("submit", function (event) {
  event.preventDefault();

  var enteredUsername = document.getElementById("username").value;
  var enteredPassword = document.getElementById("password").value;
  var errorMessage = document.getElementById("errorMessage");
  errorMessage.textContent = "";

  fetch("xml/users.xml")
    .then(function (response) {
      return response.text();
    })
    .then(function (xmlText) {
      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(xmlText, "text/xml");
      var users = xmlDoc.getElementsByTagName("user");
      var isValid = false;

      for (var i = 0; i < users.length; i++) {
        var username = users[i].getElementsByTagName("username")[0].textContent;
        var password = users[i].getElementsByTagName("password")[0].textContent;

        if (username === enteredUsername && password === enteredPassword) {
          isValid = true;
          break;
        }
      }

      if (isValid) {
        window.location.href = "portal.html";
      } else {
        errorMessage.textContent = "Invalid username or password. Please try again.";
      }
    })
    .catch(function (error) {
      errorMessage.textContent = "Could not load user data.";
    });
});
