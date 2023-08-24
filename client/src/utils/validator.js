import * as utils from "./util";
export function validator(data, config) {
    const errors = {};
    function validate(validateMethod, data, config) {
        if (!data) {
            // console.log(validateMethod, config, data);
            // return;
        }
        // Поменял switch на if - eslint ругается на неправильное кол-во пробелов, пока не смог его правильно считать пробелы для switch
        let statusValidate;
        if (validateMethod === "isRequired") {
            if (typeof data === "boolean") {
                statusValidate = !data;
            } else {
                statusValidate = data && data.trim() === "";
            }
        } else if (validateMethod === "isEmail") {
            const emailRegExp = /^\S+@\S+\.\S+$/g;
            statusValidate = !emailRegExp.test(data);
        } else if (validateMethod === "isCapitalSymbol") {
            const capitalRegExp = /[A-Z]+/g;
            statusValidate = !capitalRegExp.test(data);
        } else if (validateMethod === "isContainNumber") {
            const digitRegExp = /\d/g;
            statusValidate = !digitRegExp.test(data);
        } else if (validateMethod === "min") {
            statusValidate = data.length < config.value;
        } else if (validateMethod === "hasNotEmail") {
            statusValidate = utils.hasEmail(data) > -1;
        } else if (validateMethod === "hasEmail") {
            statusValidate = utils.hasEmail(data) === -1;
        } else if (validateMethod === "maxDate") {
            statusValidate = utils.maxDateOfToday(data);
        } else if (validateMethod === "isLink") {
            const linkRegExp = /([a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}/g;
            statusValidate = data ? !linkRegExp.test(data) : false;
        }
        // console.log(statusValidate,config.message)
        if (statusValidate) return config.message;
    }

    for (const fieldName in data) {
        for (const validateMethod in config[fieldName]) {
            const error = validate(validateMethod, data[fieldName], config[fieldName][validateMethod]);
            if (error && !errors[fieldName]) {
                errors[fieldName] = error;
            }
        }
    }
    return errors;
}
