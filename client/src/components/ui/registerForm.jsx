import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { validator } from "../../utils/validator";
import FormComponent, { TextField, RadioField, CheckBoxField, GrouplButton, ButtonField } from "../common/form";
import { FormattedMessage, useIntl } from "react-intl";
import * as utils from "../../utils/util";
// import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import MessageP from "../common/form/mesageP";
import { useLocation } from "react-router-dom";
import { signUp } from "../../store/users";
// import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/solid'
// import { signUp } from "../../store/authSlice";
// import { getAuthErrors, signUp } from "../../store/users";

// https://t.me/Blackshadow_rus

const RegisterForm = ({ user, appFB }) => {
    const dispatch = useDispatch();
    const loginError = "";// useSelector(getAuthErrors());
    const today = utils.getDate("today");
    const location = useLocation();
    // console.log(today);
    const intl = useIntl();

    const [defaultData] = useState({
        flName: "",
        email: "",
        password: "",
        sex: "male",
        licence: false,
        dateOfBirth: 0,
        fullYears: "",
        telegram: "",
    });
    // const navigate = useNavigate();
    // const [errors, setErrors] = useState({});

    const validatorConfig = {
        flName: {
            isRequired: {
                message: <FormattedMessage id='flName_is_required' />
            },
            min: { message: <FormattedMessage id='flName_must_be_at_least_2_characters' />, value: 1 }
        },
        email: {
            isRequired: {
                message: <FormattedMessage id='email_is_required' />
            },
            isEmail: {
                message: <FormattedMessage id='email_entered_incorrectly' />
            },
            hasNotEmail: {
                message: <FormattedMessage id='the_specified_address_is_already_registered' />
            }
        },
        password: {
            isRequired: {
                message: <FormattedMessage id='password_is_required' />
            },
            isCapitalSymbol: { message: <FormattedMessage id='password_must_contain_at_least_1_capital_letter' /> },
            isContainDogit: { message: <FormattedMessage id='password_must_contain_at_least_1_number' /> },
            min: { message: <FormattedMessage id='password_must_be_at_least_8_characters' />, value: 8 }
        },
        licence: {
            isRequired: { message: <FormattedMessage id='registration_is_not_possible_without_accepting_the_license_agreement' /> }
        },
        dateOfBirth: {
            maxDate: { message: <FormattedMessage id='max_date_of_birth' /> }
        },
        telegram: {
            isLink: { message: <FormattedMessage id="link_is_incorrect" /> }
        }
    };
    const recalculation = (data) => {
        const [age, letter] = utils.getFullYearOfBirth(data.dateOfBirth);
        if (age && letter) {
            data.fullYears = `${age} ${intl.messages[letter]}`;
        }
    }
    const handleSubmit = async (data) => {
        // console.log('data', data.email);
        // const hasEmail = utils.hasEmail(data.email);
        const sexData = document.getElementsByName("sex")[0].value;
        data = { ...data, sex: sexData };
        console.log(data)
        const redirect = location.state
            ? location.state.referrer.pathname
            : "/successful_registration";
        dispatch(signUp(data, redirect));

        // try {
        // await signUp(data);
        // navigate("/successful_registration");
        // } catch (error) {
        // setErrors(error);
        // }

        // createUserWithEmailAndPassword(auth, data.email, data.password)
        //     .then((userCredential) => {
        //         // Signed in
        //         const userAut = userCredential.user;
        //         utils.setStorage('user_active', [userAut]);
        //         document.querySelector(".nav-item_login").classList.toggle("d-none");
        //         document.querySelector(".nav-item_personalArea").classList.toggle("d-none");
        //         navigate("/successful_registration");
        //     })
        //     .catch((error) => {
        //         const errorCode = error.code;
        //         const errorMessage = error.message;
        //         console.log(errorCode);
        //         let err_mess;
        //         if (errorCode==="auth/email-already-in-use") {
        //             err_mess = intl.messages["the_specified_address_is_already_registered"];
        //         } else {
        //             err_mess=intl.messages["error_has_occurred_please_try_again"];
        //         }
        //         toast.error(err_mess);
        //     });
    };
    return (<>
        <FormComponent onSubmit={handleSubmit}
            validatorConfig={validatorConfig}
            defaultData={defaultData}
            recalculation={recalculation}
        >
            <TextField
                label={<FormattedMessage id='your_first_and_last_name' />}
                name="flName"
            />
            <TextField
                label={<FormattedMessage id='email' />}
                name="email"
            />
            <TextField
                label={<FormattedMessage id='date_of_birth' />}
                name="dateOfBirth"
                type="date"
                max={today}
            />
            {/* <TextField
                label={<FormattedMessage id='full_years' />}
                name="fullYears"
                readOnly="readonly"
                disabled={true}
                noValid={true}
            /> */}
            <TextField
                label={<FormattedMessage id='password' />}
                type="password"
                name="password"
            />
            <RadioField
                options={[
                    { name: <FormattedMessage id='male' />, value: "male", description: "" },
                    { name: <FormattedMessage id='female' />, value: "female", description: "" }
                ]}
                // value={data.sex}
                label={<FormattedMessage id='choose_your_gender' />}
                name="sex"
                valueDefault={defaultData.sex}
            />
            <TextField
                label={<FormattedMessage id='your_telegram_profile' />}
                // labelLeft={<ChatBubbleBottomCenterTextIcon className="h-6 w-6" />}
                type="text"
                name="telegram"
            />
            <CheckBoxField
                name="licence"
            >
                <FormattedMessage id='accept' /> <a className="text-lg underline" href="/"><FormattedMessage id='license_agreement' /></a>
            </CheckBoxField>
            <GrouplButton>
                <ButtonField name="submit" type="submit" label="registration" />
            </GrouplButton>
            {loginError && <MessageP addStyle={"pink"} label={loginError} />}
        </FormComponent>
    </>
    );
};

export default RegisterForm;
