window.addEventListener("load", function(event) {
    let passwordInput = document.getElementById("password"),
        toDisplay = document.getElementById("password-warning");
    const minChars = passwordInput.getAttribute('minlength'),
          maxChars = passwordInput.getAttribute('maxlength'),
          regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/;
    passwordInput.addEventListener("blur", function(event) {
      let password = passwordInput.value;
      if (!password.match(regex)) {
        toDisplay.textContent = "Your password must be between 8-32 characters long and contain at least 1 lowercase letter, uppercase letter, number and symbol.";
      } else {
        toDisplay.textContent = "";
      }
    }, false);
  }, false);
