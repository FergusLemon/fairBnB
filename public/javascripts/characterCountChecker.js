window.addEventListener("load", function(event) {
    let textArea = document.getElementById('description');
    const maxChars = textArea.getAttribute('maxlength');
    textArea.addEventListener("keyup", function(event) {
      let charCount = textArea.value.length,
          remainingChars = maxChars - charCount,
          toDisplay = document.getElementById("character-count");
      toDisplay.textContent = "You have " + remainingChars + " characters remaining.";
    }, false);
  }, false);
