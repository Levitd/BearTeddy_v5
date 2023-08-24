import React, { useState } from "react";
import { useParams } from "react-router-dom";
import LoginForm from "../components/ui/loginForm";
import RegisterForm from "../components/ui/registerForm";
import { FormattedMessage } from "react-intl";
import MessageP from "../components/common/form/mesageP";
import { ButtonField } from "../components/common/form";
import Page from "../components/page";
import Title from "../components/title";
// import { activeLink } from './utils/utils_dom';

// <FormattedMessage id='login_or_register' />

const Login = ({ user }) => {
    const { type } = useParams();
    const [formType, setFormType] = useState(type === "register" ? type : "login");

    const togleFormType = () => {
        setFormType(prevState => prevState === "register" ? "login" : "register");
    };
    return (
        <Page widthScreen="max-w-md mx-auto p-1 lg:p-5 bg-slate-200">
            {formType === "register"
                ? <>
                    <Title><FormattedMessage id='registration' /></Title>

                    <RegisterForm user={user} />
                    <div className="flex flex-row gap-1 items-end">
                        <MessageP addStyle="neutral" label="already_registered" />
                        <ButtonField colorButton="btn-link" type="link" label="login" onClick={togleFormType} />
                    </div>
                </>
                : <>
                    <Title><FormattedMessage id='login' /></Title>
                    <LoginForm user={user} />
                    <div className="flex flex-row gap-1 items-end">
                        <MessageP addStyle="neutral" label="not_registered" />
                        <ButtonField colorButton="btn-link" type="link" label="registration" onClick={togleFormType} />
                    </div>
                </>}
        </Page>
    );
};

export default Login;