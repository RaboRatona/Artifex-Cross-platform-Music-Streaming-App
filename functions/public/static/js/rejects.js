function doesMyStringContainOnlyNumbers(myString) {
    return /^[0-9]+$/.test(myString);
}

function doesMyStringContainOnlyLetters(myString) {
    return /^[a-zA-Z]+$/.test(myString);
}

function doesMyStringContainOnlySpecials(myString) {
    return /^[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]+$/.test(myString);
}

function doesMyStringContainSpecial(myString) {
    return /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(myString);
}

function doesMyStringContainNumber(myString) {
    return /\d/.test(myString);
}

function isMyStringNull(myString) {
    return myString == null;
}

function isMyStringEmpty(myString) {
    return myString == "";
}

function isValidEmail(myString) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(myString);
}