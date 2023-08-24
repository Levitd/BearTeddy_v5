import React from "react";
import { useField } from 'formik';
import {FormattedMessage} from "react-intl";
const FormikTextArea = ({ label, noTranslate=false, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <div className={"w-full"}>
            {label ? (
            <label htmlFor={props.id || props.name}>{noTranslate ? label : <FormattedMessage id={label} />}</label>
                ) : null}
            <textarea className="w-full" {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="my-2 p-1 text-red-600 text-sm bg-fuchsia-200"><FormattedMessage id={meta.error}/></div>
            ) : null}
            </div>
        </>
    );
};

export default FormikTextArea;
