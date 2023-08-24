import React from "react";
import PropTypes from "prop-types";

const CheckBoxField = ({ name, value, onChange, children, error, ...rest }) => {
    const handleChange = () => {
        onChange({
            name: name,
            value: !value
        });
    };
    const getInputClasses = () => {
        return "border-2" + (error ? " border-rose-800 checked:focus:text-rose-800 " : " mb-1 border-green-800 checked:focus:text-green-800");
    };
    const getLabelClasses = () => {
        return (error ? "text-rose-800" : "text-green-800");
    };
    return (
        <div className="form-check mb-4">
            <input
                className={getInputClasses()}
                type="checkbox"
                value=""
                id={name}
                onChange={handleChange}
                checked={value}
                {...rest}
            ></input>
            <label className={getLabelClasses() + " ml-2"} htmlFor={name}>
                {children}
            </label>
            {
                error && <div className={getLabelClasses()}>
                    {error}
                </div>
            }
        </div>
    );
};

CheckBoxField.propTypes = {
    name: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    onChange: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    error: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
};

export default React.memo(CheckBoxField);
