import React, { useState } from "react";
import FormComponent, { TextField, ButtonField, SubmitCancelButton } from "../common/form";
import { FormattedMessage, useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import MessageP from "../common/form/mesageP";
import { getCurrentUserId } from "../../store/users";
import { createShop, getCurrentShop, getShopErrors, updateShop } from "../../store/shops";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";
import { getDate } from "../../utils/util";
import TextAreaField from "../common/form/textAreaField";
import ImgFileld from "../common/form/img";

const MyShopForm = ({ shop }) => {
    const dispatch = useDispatch();
    const user_id = useSelector(getCurrentUserId());
    const myShopArray = useSelector(getCurrentShop());
    const myShop = (myShopArray) ? myShopArray[0] : {};

    const [enterError, setEnterError] = useState(null);
    const shopError = useSelector(getShopErrors());
    const intl = useIntl();

    const [data, setData] = useState(
        (!myShop)
            ? {
                _id: nanoid(),
                name: "",
                url: "",
                user_id: user_id,
                aboutShop: "",
                dateCreate: "",
                country: "",
                logo: ""
            }
            : {
                _id: myShop._id,
                name: myShop.name,
                url: myShop.url,
                user_id: myShop.user_id,
                aboutShop: myShop.aboutShop ? myShop.aboutShop : "",
                dateCreate: myShop.dateCreate ? getDate(myShop.dateCreate) : getDate("today"),
                country: myShop.country,
                logo: myShop.logo
            }

    );

    const savedData = data;
    const validatorConfig = {
        name: {
            isRequired: {
                message: <FormattedMessage id='name_shop' />
            }
        }
        // country: {
        //     isRequired: {
        //         message: <FormattedMessage id='country_required' />
        //     }
        // }
    };

    const handleSubmit = (data) => {
        // aboutShop - value ????
        // data = { ...data, aboutShop: document.getElementsByName("aboutShop")[0].value };

        // const haveImage = data.image ? [...data.image] : [];
        // const files = document.querySelector(`#avatar`).files;

        //TODO Добавить иконку магазина
        // if (files && files.length > 0) {
        //     uploadImageActiveProductStart();
        //     UploadFileToFireBaseStorage(files);
        //     let upFiles = false;//localStorage.getItem("uploadToFitebaseEnd");
        //     let i = 0
        //     waitUp();
        //     function waitUp() {
        //         setTimeout(() => {
        //             upFiles = JSON.parse(localStorage.getItem("uploadToFitebaseEnd"));
        //             console.log(upFiles);
        //             if (upFiles) {
        //                 const newImage = JSON.parse(localStorage.getItem("uploadToFitebaseFiles"));
        //                 newImage.map((ni) => {
        //                     haveImage.push(ni);
        //                 })
        //                 data.image = { ...haveImage };
        //                 console.log(data);
        //                 UpLoad(data)
        //             } else {
        //                 waitUp();
        //             }
        //         }, 500)
        //     }
        // } else {
        //     UpLoad(data);
        // }

        if (myShop) {
            const answerData = dispatch(updateShop(data));
            if (answerData) toast.info(intl.messages["data_saved"]);
        } else {
            const answerData = dispatch(createShop(data));
            if (answerData) toast.info(intl.messages["created_shop"]);
        }
    };
    const handleChange = (target) => {
        console.log("form", target.name, target.value);
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
        if (enterError) setEnterError(null);
    };

    const recalculation = (data) => {
        return (data);
    }
    return (<>
        <FormComponent onSubmit={handleSubmit}
            validatorConfig={validatorConfig}
            defaultData={shop ? savedData : data}
            recalculation={recalculation}
        >
            <ImgFileld path="imgProfilePathFirebaseStorige" file={`${(savedData.image) ? savedData.image[0].name : "no-logo-icon.gif"}`} token={savedData.image ? savedData.image[0].token : "8c2dc400-eb84-4829-b8ab-f395633723f4"} addClass="h-32 w-auto mx-left mb-2 rounded-md" />
            <input type="file"
                id="avatar" name="avatar"
                accept="image/png, image/jpeg"></input>

            <TextField
                label={<FormattedMessage id='name_of_shop' />}
                name="name"
                autoFocus
                onChange={handleChange}
                type="text"
            />
            <TextField
                label={<FormattedMessage id='url_site_shop' />}
                type="url"
                name="url"
                onChange={handleChange}
                placeholder={"https://examle.com"}
            />
            <TextAreaField
                label={<FormattedMessage id='about_shop' />}
                type="textarea"
                name="aboutShop"
                onChange={handleChange}
            />
            <TextField
                label={<FormattedMessage id='country' />}
                type="country"
                name="country"
                onChange={handleChange}
            />
            {shop &&
                <TextField
                    label={<FormattedMessage id='date_create' />}
                    type="date"
                    name="dateCreate"
                    disabled={true}
                />
            }
            <SubmitCancelButton name="submitCancelButton">
                <ButtonField type="submit" name="submit" label={myShop ? "save_changes" : "create_shop"} />
                <ButtonField type="cancel" name="cancel" label="cancel_changes" />
            </SubmitCancelButton>
            {shopError && <MessageP addStyle={"pink"} label={shopError} />}
        </FormComponent>
    </>
    );
};

export default MyShopForm;
