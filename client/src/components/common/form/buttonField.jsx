import React from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";

const ButtonField = ({ type, label, icon, colorButton = "btn-primary", addClass = "", ...rest }) => {

    const defaultStyle = "shadow py-2 disabled:opacity-50 text-white w-full mx-auto rounded-md border-current focus:ring ";

    const buttonStyle = () => {
        switch (colorButton) {
            case "btn-primary":
                return defaultStyle + "bg-blue-900";
            case "btn-icon-green":
                return "outline-green peer-focus:ring-1 peer-focus:ring-green-500 border-y border-r bg-white px-1 rounded-r-md border-green-500 text-green-600 align-center py-1 mt-1 shadow-sm";
            case "btn-icon-error":
                return "outline-green peer-focus:ring-1 peer-focus:ring-pink-500 border-y border-r bg-white px-1 rounded-r-md border-pink-500 text-pink-600 align-center py-1 mt-1 shadow-sm";
            case "btn-link":
                return "text-cyan-800 underline";
            default:
                break;
        }
    }
    const intl = useIntl();
    if (!label) {
        if (type === "submit") {
            label = "save";
        } else if (type === "cancel") {
            label = "cancel";
        } else {
            label = "label_not_transmitted";
        }
    }
    const labelButton = icon ? icon : intl.messages[label];
    return (
        <button type={type === "link" ? "button" : type} className={buttonStyle() + " " + addClass} {...rest}>{labelButton}</button>
    );
}
ButtonField.propTypes = {
    type: PropTypes.string,
    label: PropTypes.string,
    icon: PropTypes.element,
    colorButton: PropTypes.string,
    addClass: PropTypes.string
}

export default ButtonField;
