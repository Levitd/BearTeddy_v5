import React, { useState } from "react";
// import { validator } from "../../utils/validator";
import FormComponent, { TextField, CheckBoxField, GrouplButton, ButtonField } from "../common/form";

import { FormattedMessage } from "react-intl";
// import { toast } from "react-toastify";

// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
// import { login } from "../../store/authSlice";
import { getAuthErrors, logIn } from "../../store/users";
import { useLocation } from "react-router-dom";
import MessageP from "../common/form/mesageP";

// import * as yup from "yup";

const LoginForm = () => {
    const dispatch = useDispatch();
    const loginError = useSelector(getAuthErrors());
    const location = useLocation();
    // const navigate = useNavigate();
    // const [loading, setLoading] = useState(false);

    // const [errors, setErrors] = useState({});
    const [setEnterError] = useState(null);

    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false
    });

    // const validateScheme = yup.object().shape({
    //     password: yup.string().required("Пароль обязателен для заполнения").matches(/^(?=.*[A-Z])/, "Пароль должен содержать хотя бы 1 заглавную букву")
    //         .matches(/(?=.*[0-9])/, "Пароль должен содержать хотя бы 1 цифру")
    //         .matches(/(?=.*[!@#$%^&*])/, "Пароль должен содержать один спец символов: !@#$%^&* ")
    //         .matches(/(?=.{8,})/, "Пароль должен быть не менее 8 символов"),
    //     email: yup.string().required("Электронная почта обязательна для заполнения").email("Email введен некорректно")
    // });

    const validatorConfig = {
        email: {
            isRequired: {
                message: <FormattedMessage id='email_is_required' />
            },
            isEmail: {
                message: <FormattedMessage id='email_entered_incorrectly' />
            }
            // hasEmail: {
            //     message: <FormattedMessage id='the_specified_address_is_not_registered' />
            // }
        },
        password: {
            isRequired: {
                message: <FormattedMessage id='password_is_required' />
            },
            isCapitalSymbol: { message: <FormattedMessage id='password_must_contain_at_least_1_capital_letter' /> },
            isContainNumber: { message: <FormattedMessage id='password_must_contain_at_least_1_number' /> },
            min: { message: <FormattedMessage id='password_must_be_at_least_8_characters' />, value: 8 }
        }
    };

    // const { foundUser, findUser } = useUser();

    const handleSubmit = (data) => {
        // setLoading(true);
        const redirect = location.state
            ? location.state.referrer.pathname
            : "/";
        // const redirect = "/"; // history.location.state ? history.location.state.from.pathname : "/";
        dispatch(logIn({ payload: data, redirect }));
        // .unwrap()
        // .then(() => {
        //     navigate(redirect, { replace: true });
        // })
        // .catch((error) => {
        //     console.log(error);
        //     const { code, message } = error.response.data.error;
        //     // setLoading(false);
        // });
        // navigate(navigate.location.state ? navigate.location.state.from.pathname : "/");
    };
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
        setEnterError(null);
    };

    const recalculation = (data) => {
        return (data);
    }
    return (<>
        <FormComponent onSubmit={handleSubmit}
            validatorConfig={validatorConfig}
            defaultData={data}
            recalculation={recalculation}
        >
            <TextField
                label={<FormattedMessage id='email' />}
                name="email"
                autoFocus
                onChange={handleChange}
                type="email"
                regular="^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$"
            />
            <TextField
                label={<FormattedMessage id='password' />}
                type="password"
                name="password"
                onChange={handleChange}
            />
            <CheckBoxField
                name="stayOn"
            >
                <FormattedMessage id='remain_in_the_system' />
            </CheckBoxField>
            <GrouplButton>
                <ButtonField name="submit" type="submit" label="login" />
            </GrouplButton>
            {loginError && <MessageP addStyle={"pink"} label={loginError} />}
        </FormComponent>
    </>
    );
};

export default LoginForm;
