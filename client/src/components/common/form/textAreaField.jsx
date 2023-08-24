import React from "react";
import PropTypes from "prop-types";

const TextAreaField = ({ label, name, value, onChange, error, noLable, rows = 3 }) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };

    const getInputClasses = () => {
        return "w-full peer border mt-1 block px-3 py-2 bg-white text-sm shadow-sm placeholder-slate-400 disabled:border-slate-800 disabled:ring-slate-800 " + ((error) ? " border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500" : "border-green-400 focus:ring-1 focus:border-green-500 focus:ring-green-500 focus:ring-1");
    };
    return (<div className="mb-4 ">
        {!noLable ? <label className="block text-sm font-medium text-slate-700" htmlFor={name}>{label}</label> : ""}
        <div>
            <textarea
                id={name}
                name={name}
                value={value}
                onChange={handleChange}
                className={getInputClasses()}
                rows={rows}
            />
        </div>
    </div >);
};

TextAreaField.defaultProps = {
    noLable: false,
    type: "text"
};

TextAreaField.propTypes = {
    label: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    noLable: PropTypes.bool
};

export default TextAreaField;
