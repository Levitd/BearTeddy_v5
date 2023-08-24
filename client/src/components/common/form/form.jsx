import React, { useState, useEffect, useCallback } from "react";
import { validator } from "../../../utils/validator";
import PropTypes from "prop-types";
const FormComponent = ({
    children,
    validatorConfig,
    onSubmit,
    defaultData,
    recalculation
}) => {
    // console.log(recalculation);
    const [data, setData] = useState(defaultData || {});
    const [errors, setErrors] = useState({});
    const handleChange = useCallback((target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    }, []);
    const validate = useCallback(
        (data) => {
            const errors = validator(data, validatorConfig);
            setErrors(errors);
            return Object.keys(errors).length === 0;
        },
        [validatorConfig, setErrors]
    );
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log("Нажали Submit");
        const isValid = validate();
        if (!isValid) return;
        onSubmit(data);
    };
    useEffect(() => {
        // if (Object.keys(data).length > 0) {
            validate(data);
            recalculation(data, setData);
        // }
    }, [data, validate, recalculation]);
    const handleCancel = (e) => {
        e.preventDefault();
        setData(defaultData);
    }
    const handleKeyDown = useCallback((event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            const form = event.target.form;
            const indexField = Array.prototype.indexOf.call(form, event.target);
            form.elements[indexField + 1].focus();
        }
    }, []);
    const isValid = Object.keys(errors).length === 0;

    const clonedElements = React.Children.map(children, (child) => {
        if (!child) return;
        const childType = typeof child.type;
        // console.log(childType);
        // console.log(child);
        let config = {};
        // console.log(child.props, child.props.name, childType, child.props.type);
        if (childType === "object") {
            // console.log(child.props.name);
            if (!child.props.name) {
                throw new Error(
                    "Name property is required for field components",
                    child
                );
            }
            // if (child.props.name !== "submit" && child.props.name !== "cancel" && child.props.name !== "submitCancelButton") {
            // console.log(child.props, child.props.name);
            config = {
                ...child.props,
                onChange: handleChange,
                value: data[child.props.name] || "",
                error: errors[child.props.name],
                onKeyDown: handleKeyDown
            };
            // } else {
            //     console.log(childType, child.props.name, child.props.type);
            //     if (
            //         child.props.type === "submit" ||
            //         child.props.type === undefined
            //     ) {
            //         config = { ...child.props, disabled: !isValid };
            //     } else if (child.props.type === "cancel") {
            //         console.log("cancel", child.props);
            //         config = { ...child.props, onClick: handleCancel };
            //         console.log("cancel", child, child.props, config);
            //     }
            // }
            return React.cloneElement(child, config);
        }
        if (childType === "string") {
            // console.log(child.type, child.props.children);
            if (child.type === "button") { // кнопки без обертки
                if (
                    child.props.type === "submit" ||
                    child.props.type === undefined
                ) {
                    config = { ...child.props, disabled: !isValid };
                } else if (child.props.type === "cancel") {
                    // console.log("cancel");
                    config = { ...child.props, onClick: handleCancel };
                }
            }
            return React.cloneElement(child, config);
        }
        if (childType === "function") { //Кнопки пришли в обертке
            let configBut = {};
            if (child.props.type === "textarea") {
                // console.log(child.props, child.props.type);
                config = {
                    ...child.props,
                    onChange: handleChange,
                    value: data[child.props.name] || "",
                    error: errors[child.props.name],
                    onKeyDown: handleKeyDown
                };
                return React.cloneElement(child, config);
            }
            if (child.props.children !== "undefined" && typeof child.props.children !== "string") {
                // console.log(childType, child.props.children);
                const cloneButtonElement = React.Children.map(child.props.children, (butChild, idx) => {
                    // console.log(butChild.props);
                    if (butChild.props.name === "submit") {
                        // console.log('disabled',!isValid)
                        configBut = { ...butChild.props, disabled: !isValid, key: "s_" + idx + 1 };
                    } else if (butChild.props.name === "cancel") {
                        configBut = { ...butChild.props, onClick: handleCancel, key: "c_" + idx + 1 };
                    } else if (butChild.props.name === "button") {
                        configBut = { ...butChild.props, key: "b_" + idx + 1 };
                    } else {
                        return;
                    }
                    return React.cloneElement(butChild, configBut);
                })
                if (cloneButtonElement) {
                    return React.cloneElement(child, config, ...cloneButtonElement);
                } else {
                    return child;
                }
            }
        }
        if (childType !== "string" && childType !== "object" && childType !== "function") {
            console.log(child, child.props, child.props.name);
        }

    });
    // console.log(clonedElements);
    return <form onSubmit={handleSubmit}>{clonedElements}</form>;
};
FormComponent.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    defaultData: PropTypes.object,
    onSubmit: PropTypes.func,
    validatorConfig: PropTypes.object
};

export default FormComponent;
