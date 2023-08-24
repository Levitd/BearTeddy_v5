import React from "react";
import { Formik, Form, useField } from 'formik';
import {FormattedMessage} from "react-intl";
const FormikText = ({ label, colorButton = "btn-primary",  noTranslate=false, type, ...props }) => {
    const [field, meta] = useField(props);
    // console.log()
    const defaultStyle = "shadow py-2 my-2 disabled:opacity-50 text-white w-full mx-auto rounded-md border-current focus:ring ";
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
    return (
        <>
            <button className={buttonStyle()} type={type} {...field} {...props}>
                {noTranslate ? label : <FormattedMessage id={label} />}
            </button>
            {/*{meta.touched && meta.error ? (*/}
            {/*    <div className="error"><FormattedMessage id={meta.error}/></div>*/}
            {/*) : null}*/}
        </>
    );
};

export default FormikText;
