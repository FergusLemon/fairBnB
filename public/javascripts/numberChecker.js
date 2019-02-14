window.addEventListener("load", function(event) {
    const LOW = 20,
          HIGH = 1000;
    let price = document.getElementById('price');
    price.addEventListener("blur", function(event) {
      let priceEntered = price.value,
          isPriceEmpty = price.value.length === 0,
          isLowOrHighPrice = priceEntered < LOW || priceEntered >= HIGH,
          shouldWarn = !isPriceEmpty && isLowOrHighPrice,
          toDisplay = document.getElementById("price-warning"),
          prettyPrice = parseInt(priceEntered).toLocaleString();
          if (shouldWarn) {
            toDisplay.textContent = "Are you sure £" + prettyPrice + " per night is correct?";
          } else {
            toDisplay.textContent = "";
          }
    }, false);
  }, false);
