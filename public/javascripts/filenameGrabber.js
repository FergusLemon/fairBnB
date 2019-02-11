window.onload = function() {
  let imageFile = document.getElementById("image");
  let toDisplay = document.getElementById("filename");
  imageFile.onchange = function() {
    let rawFilename = imageFile.value;
    let regex = /(?<=fakepath\\).*/;
    let trimmedFilename = rawFilename.match(regex);
    toDisplay.textContent = trimmedFilename;
  };
};
