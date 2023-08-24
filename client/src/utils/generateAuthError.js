/* eslint-disable */
// eslint ругается на кол-во отступов...

export function generateAuthError(message) {
    switch (message) {
        case "EMAIL_NOT_FOUND":
            return "the_specified_address_is_not_registered";
        case "INVALID_PASSWORD":
            return "password_is_incorrect";
        case "EMAIL_EXISTS":
            return "the_specified_address_is_already_registered";
        case "TOO_MANY_ATTEMPTS_TRY_LATER":
            return "TOO_MANY_ATTEMPTS_TRY_LATER";
        default:
            return "Error...";
    }
}
