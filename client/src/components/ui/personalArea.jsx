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
import {uploadImageActiveProductStart} from "../../services/localStorage.service";
import {UploadFileToFireBaseStorage} from "../../utils/filesToFromFirebaseStorage";
import {TrashIcon} from "@heroicons/react/24/solid";

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
    let newData = { ...savedData };
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
        const haveImage = data.image ? [...data.image] : [];
        const files = document.querySelector(`#image`).files;
        if (files && files.length > 0) {
            uploadImageActiveProductStart();
            UploadFileToFireBaseStorage(files, "imgProfilePath");
            let upFiles = false;
            waitUp();
            function waitUp() {
                setTimeout(() => {
                    upFiles = JSON.parse(localStorage.getItem("uploadToFitebaseEnd"));
                    if (upFiles) {
                        const newImage = JSON.parse(localStorage.getItem("uploadToFitebaseFiles"));
                        newImage.forEach((ni) => {
                            haveImage.unshift(ni);
                        })
                        data.image = [...haveImage];
                        savedData.image = [...haveImage];
                        UpLoad(data,true);
                    } else {
                        waitUp();
                    }
                }, 500);
            }
        } else {
            UpLoad(data);
        }
    };

    function UpLoad(data, reload=false) {
        dispatch(apdateUser(data));
        if (reload){
            window.location.reload(true);
        } else {
            toast.info(intl.messages["data_saved"]);
        }
    };

    const recalculation = (data) => {
    }
    const HandleTrash=(e)=>{
        e.preventDefault();
        let el = e.target.parentNode;
        if (el.tagName === "svg") el = el.parentNode;
        let images = [];
        newData.image.forEach((f) => {
            if (f.name !== el.id) images.push(f);
        });
        newData = { ...newData, image: images }
        dispatch(apdateUser(newData));
    }

    if (!isLoading && savedData) {
        return (
            <Page widthScreen="max-w-lg my-5 px-5 p-5 mx-auto bg-state-300 rounded border-2 shadow-md bg-slate-200" title={"personal_data"}>
                <FormComponent onSubmit={handleSubmit}
                    validatorConfig={validatorConfig}
                    defaultData={savedData}
                    recalculation={recalculation}
                >
                    <div className={"flex flex-row gap-1"}>
                    {savedData.image.length>0 && savedData.image.map((im)=>{
                                return (
                                    <div className={"relative"} key={`d_${im.name}`}>
                                    <ImgFileld
                                        path="imgProfilePathFirebaseStorige"
                                        file={`${im.name}`}
                                        token={im.token}
                                        addClass="h-32 w-auto mx-left mb-2 rounded-md" />
                                        <button key={`b_${im.name}`} onClick={HandleTrash} id={im.name} >
                                            <TrashIcon className="bg-white h-8 w-8 text-red-400 hover:text-red-800 absolute left-0 top-0 cursor-pointer hover:scale-150 transition-transform duration-300" key={`0trash_${im.name}`} />
                                        </button>
                                    </div>
                                )
                            })
                    }
                    {savedData.image.length===0 &&
                        <ImgFileld path="imgProfilePathFirebaseStorige" file={`${"no-image-icon.png"}`} token={"f7499845-a9dc-49f5-80ff-bb444a933d15"} addClass="h-32 w-auto mx-left mb-2 rounded-md" />
                    }
                    </div>

                    <input type="file"
                        id="image" name="image"
                        accept="image/png, image/jpeg"></input>

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
