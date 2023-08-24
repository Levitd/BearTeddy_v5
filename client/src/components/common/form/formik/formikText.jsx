import React from "react";
import { useField } from 'formik';
import {FormattedMessage} from "react-intl";
const FormikText = ({ label,noTranslate=false, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.id || props.name}>{noTranslate ? label : <FormattedMessage id={label} />}</label>
            <input className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="mt-2 text-red-600 text-sm"><FormattedMessage id={meta.error}/></div>
            ) : null}
        </>
    );
};

export default FormikText;
