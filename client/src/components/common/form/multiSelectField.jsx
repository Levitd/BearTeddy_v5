import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultiSelectField = ({ options, onChange, name, label, defaultValue }) => {
    const optionsArray = !Array.isArray(options) && typeof options === "object"
        ? Object.keys(options).map(optionName => (
            {
                label: options[optionName].name,
                value: options[optionName]._id
            }
        ))
        : options;
    const handleChange = (value) => {
        onChange({ name, value }); // name: name - ругается, что надо короткую запись
    };

    return (
        <div className="mb-4 ">
            <label className="form-label">{label}</label>
            <Select
                defaultValue={defaultValue}
                isMulti
                closeMenuOnSelect={false}
                options={optionsArray}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleChange}
                name={name}
            />
        </div>
    );
};
MultiSelectField.propTypes = {
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onChange: PropTypes.func,
    name: PropTypes.string,
    label: PropTypes.string,
    defaultValue: PropTypes.array
};

export default MultiSelectField;
