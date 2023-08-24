import React, { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import * as utils from "../../utils/util";
import { useNavigate } from "react-router-dom";
import FormComponent, {
    TextField,
    RadioField,
    SubmitCancelButton,
    ButtonField
} from "../common/form";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { apdateUser, getCurrentUserData, getIsLoggedIn } from "../../store/users";
import ImgFileld from "../common/form/img";
import Page from "../page";

const PersonalArea = () => {
    const intl = useIntl();
    const today = utils.getDate("today");
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(true);
    const dispatch = useDispatch();
    let savedData;

    const isLoggedIn = useSelector(getIsLoggedIn());

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/not-registered");
        }
        setLoading(false);
    }, [isLoggedIn, navigate]);
    const currentUser = useSelector(getCurrentUserData());

    if (!isLoading) {
        savedData = {...currentUser,
            dateOfBirth:currentUser.dateOfBirth.slice(0,10),
            telegram: currentUser.socialMedia[0].link
        };
    }
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
            }
        },
        password: {
            isRequired: {
                message: <FormattedMessage id='password_is_required' />
            },
            isCapitalSymbol: { message: <FormattedMessage id='password_must_contain_at_least_1_capital_letter' /> },
            isContainNumber: { message: <FormattedMessage id='password_must_contain_at_least_1_number' /> },
            min: { message: <FormattedMessage id='password_must_be_at_least_8_characters' />, value: 7 }
        },
        dateOfBirth: {
            maxDate: { message: <FormattedMessage id='max_date_of_birth' /> }
        },
        telegram: {
            isLink: { message: <FormattedMessage id="link_is_incorrect" /> }
        }
    };

    const handleSubmit = (data) => {
        const sexData = document.getElementsByName("sex")[0].value;
        const telegrammLink = document.getElementsByName("telegram")[0].value;
        const socialMedia = [{name:"telegramm", link: telegrammLink}];
        data = { ...data, sex: sexData, socialMedia: socialMedia };
        dispatch(apdateUser(data));
        toast.info(intl.messages["data_saved"]);
    };

    const recalculation = (data) => {
        // const [age, letter] = utils.getFullYearOfBirth(data.dateOfBirth)
        // if (age && letter) {
        //     data.fullYears = `${age} ${intl.messages[letter]}`;
        // }
    }

    if (!isLoading && savedData) {
        // console.log((savedData.image));
        return (
            <Page widthScreen="max-w-lg my-5 px-5 p-5 mx-auto bg-state-300 rounded border-2 shadow-md bg-slate-200" title={"personal_data"}>
                <FormComponent onSubmit={handleSubmit}
                    validatorConfig={validatorConfig}
                    defaultData={savedData}
                    recalculation={recalculation}
                >
                    <ImgFileld path="imgProfilePathFirebaseStorige" file={`${(savedData.image.length>0) ? savedData.image[0].name : "no-image-icon.png"}`} token={savedData.image.length>0 ? savedData.image[0].token : "f7499845-a9dc-49f5-80ff-bb444a933d15"} addClass="h-32 w-auto mx-left mb-2 rounded-md" />
                    <TextField
                        label={<FormattedMessage id='your_first_and_last_name' />}
                        name="flName"
                        autoFocus
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
                    <RadioField
                        options={[
                            { name: <FormattedMessage id='male' />, value: "male", description: "" },
                            { name: <FormattedMessage id='female' />, value: "female", description: "" }
                        ]}
                        name="sex"
                        label={<FormattedMessage id='choose_your_gender' />}
                        valueDefault={savedData.sex}
                    />
                    <TextField
                        label={<FormattedMessage id='your_telegram_profile' />}
                        labelLeft={<i className="bi bi-telegram icon-size-big"></i>}
                        type="text"
                        name="telegram"
                    />
                    <SubmitCancelButton name="submitCancelButton">
                        <ButtonField type="submit" name="submit" label="save_changes" />
                        <ButtonField type="cancel" name="cancel" label="cancel_changes" />
                    </SubmitCancelButton>
                    {/* <MessageWindow label="data_saved" name="message" type="message" /> */}
                </FormComponent>
            </Page>
        );
    }
    // if (!userActive) {
    //     userActive = utils.getStorage('user_activ');
    // }
    // useEffect(() => {
    //     if (!userActive) {
    //         navigate("../not-registered");
    //     }
    // });
    // if (userActive) {
    // }
}

export default PersonalArea;
