let form = document.querySelector(".payment-form");
let first_name = document.querySelector("#first-name");
let first_name_error = document.querySelector(".first-name-error");
let last_name = document.querySelector("#last-name");
let last_name_error = document.querySelector(".last-name-error");
let email = document.querySelector("#email");
let email_error = document.querySelector(".email-error");
let contact = document.querySelector("#contact");
let contact_error = document.querySelector(".contact-error");
let pin = document.querySelector("#pin");
let pin_error = document.querySelector(".pin-error");
let card_number = document.querySelector("#card-number");
let card_number_error = document.querySelector(".card-number-error");
let card_expiry = document.querySelector("#card-expiry");
let card_expiry_error = document.querySelector(".card-expiry-error");
let cvv = document.querySelector("#cvv");
let cvv_error = document.querySelector(".cvv-error");
let complete_button = document.querySelector(".complete-payment");

let name_regex = /^[a-zA-Z]{1,30}$/
let email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let contact_regex = /^\d{10}$/
let pin_regex = /^[1-9]{2}\d{3}[1-9]$/
let card_num_regex = /^4\d{15}$/
let card_expiry_regex = /^\d{4}$/
let cvv_regex = /^\d{3,4}$/

function error_message(error, input, message) {
    error.textContent = message;
    error.style.color = "#a51818";
    input.style.border = "1px solid #a51818";
}

function clear_error(error, input) {
    error.textContent = "";
    input.style.border = "";
}

function validate(error, input, message, regex) {
    if (input.value === "") {
        error_message(error, input, `${message} is required`);
    }
    else if (!(regex.test(input.value))) {
        error_message(error, input, `${message} is not valid`);
    }
    else {
        clear_error(error, input);
    }
}

function validateExpiry(error, input, message, regex) {
    let todate = new Date();
    let year = todate.getFullYear();
    console.log(year);

    if (input.value === "") {
        error_message(error, input, `${message} is required`);
    }
    else if (!(regex.test(input.value)) || !(parseInt(input.value) >= year)) {
        error_message(error, input, `${message} is not valid`);
    }
    else {
        clear_error(error, input);
    }
}


complete_button.addEventListener("click", () => {
    validate(first_name_error, first_name, "First Name", name_regex);
    validate(last_name_error, last_name, "Last Name", name_regex);
    validate(email_error, email, "Email Address", email_regex);
    validate(contact_error, contact, "Contact Number", contact_regex);
    validate(pin_error, pin, "PIN Code", pin_regex);
    validate(card_number_error, card_number, "Card Number", card_num_regex);
    validateExpiry(card_expiry_error, card_expiry, "Card Expiry", card_expiry_regex);
    validate(cvv_error, cvv, "CVV", cvv_regex);
})

// || !(name_regex.test(first_name))


