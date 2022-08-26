/* The burger button that transformed into a cross */
    function burgerFunction(event) {
    if (event.classList.contains("change")) {
        event.classList.remove("change");
    } else {
        event.classList.add("change");
    }
    }