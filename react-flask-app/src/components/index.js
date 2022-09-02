
export { default as Navigation } from "./Navigation";
export { default as Footer } from "./Footer";
export { default as Home } from "./Home";
export { default as Query } from "./Query";
export { default as Report_gen } from "./Report_gen";

/* The burger button that transformed into a cross */
function burgerFunction(event) {
    if (event.classList.contains("change")) {
        event.classList.remove("change");
    } else {
        event.classList.add("change");
    }
    }