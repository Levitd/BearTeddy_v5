import React, { useState } from "react";
import PropTypes from "prop-types";
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import ButtonField from "./buttonField";

const TextField = ({ label, type, name, value, onChange, error, noValid, noLable, placeholder, regular, labelLeft, ...rest }) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    const getInputClasses = () => {
        const addClass = () => {
            if (type === "password") {
                return "rounded-l-md ";
            } else {
                return "rounded-md ";
            }
        };
        return addClass() + "peer border mt-1 block w-full px-3 py-2 bg-white text-sm shadow-sm placeholder-slate-400 disabled:border-slate-500 disabled:ring-slate-500 " + ((noValid) ? "" : (error) ? " border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500" : "border-green-400 focus:ring-1 focus:border-green-500 focus:ring-green-500 focus:ring-1");
    };
    const togleShowPassword = (e) => {
        setShowPassword((prevState) => !prevState);
    };
    return (<div className="mb-4 ">
        {!noLable ? <label className="block text-sm font-medium text-slate-700" htmlFor={name}>{label}</label> : ""}

        <div className="">
            {labelLeft && (<span className="input-group-text" >{labelLeft}</span>)}
            <div className="flex flex-row flex-nowrap">
                <input
                    type={showPassword ? "text" : type}
                    id={name}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    onChange={handleChange}
                    className={getInputClasses()}
                    regular={regular}
                    {...rest}
                />
                {type === "password" &&
                    (<ButtonField type="button" colorButton={error ? "btn-icon-error" : "btn-icon-green"} onClick={togleShowPassword} icon={showPassword ? <EyeSlashIcon className="h-6 w-6 text-blue-500" /> : <EyeIcon className="h-6 w-6 text-blue-500" />}>
                        {/* <button className="btn btn-outline-secondary" type="button" onClick={togleShowPassword}> */}
                        {showPassword ? <EyeSlashIcon className="h-6 w-6 text-blue-500" /> : <EyeIcon className="h-6 w-6 text-blue-500" />}

                        {/* <i className={"bi bi-eye" + (showPassword ? "-slash" : "")} ></i> */}
                        {/* </button> */}
                    </ButtonField>)}
            </div>
            {!noValid && error && <div className="mt-2 peer-invalid:visible text-pink-600 text-sm">{error}</div>}
            {/* {<div className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">{error}</div>} */}
        </div>
    </div >);
};

TextField.defaultProps = {
    type: "text",
    noLable: false,
    noValid: false,
    placeholder: ""
};

TextField.propTypes = {
    label: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    noLable: PropTypes.bool,
    noValid: PropTypes.bool,
    placeholder: PropTypes.string
};

export default React.memo(TextField);
