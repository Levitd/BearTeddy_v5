import React from "react";
import Page from "../page";
import { FormattedMessage, useIntl } from "react-intl";
import FormComponent, { ButtonField, SubmitCancelButton } from "../common/form";
import TextField from "../common/form/textField";
import TextAreaField from "../common/form/textAreaField";
import {createProduct, updateProduct} from "../../store/products";
import { toast } from "react-toastify";
import {useDispatch} from "react-redux";
import configFile from "../../config.json";
import { UploadFileToFireBaseStorage } from "../../utils/filesToFromFirebaseStorage";
import {uploadImageActiveProductStart} from "../../services/localStorage.service";
import { useNavigate } from "react-router-dom";
import { TrashIcon } from '@heroicons/react/24/solid';
import { deleteFileInActiveProduct, updateActiveProduct } from "../../store/activeProduct";
import Title from "../title";
import {loadAutorProducts} from "../../store/autorProducts";

const ProductEditForm = ({ path, currentUser, param, productId, activeProduct }) => {
    const intl = useIntl();
    const dispatch = useDispatch();
    const savedData = { ...activeProduct, quantity: String(activeProduct.quantity), price: String(activeProduct.price), shipping: String(activeProduct.shipping)  };
    const navigate = useNavigate();

    let newAP = { ...savedData };

    const validatorConfig = {
        name: {
            isRequired: {
                message: <FormattedMessage id='name_is_required' />
            },
            min: { message: <FormattedMessage id='name_must_be_at_least_2_characters' />, value: 2 }
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
        const haveImage = data.image ? [...data.image] : [];
        data.currencies = "USD"
        // console.log(data)
        const files = document.querySelector(`#avatar`).files;

        if (files && files.length > 0) {
            uploadImageActiveProductStart();
            UploadFileToFireBaseStorage(files, "imgPreviewPath");
            let upFiles = false;//localStorage.getItem("uploadToFitebaseEnd");
            waitUp();
            function waitUp() {
                setTimeout(() => {
                    upFiles = JSON.parse(localStorage.getItem("uploadToFitebaseEnd"));
                    if (upFiles) {
                        const newImage = JSON.parse(localStorage.getItem("uploadToFitebaseFiles"));
                        newImage.map((ni) => {
                            haveImage.push(ni);
                        })
                        data.image = [...haveImage];
                        savedData.image = [...haveImage];
                        UpLoad(data)
                    } else {
                        waitUp();
                    }
                }, 500)
            }
        } else {
            UpLoad(data);
        }
    };
    function UpLoad(data) {
        toast.info(intl.messages["data_saved"]);
        if(data._id) {
            dispatch(updateProduct(data));
            dispatch(updateActiveProduct(data));
            navigate(-1);
        } else {
            dispatch(createProduct(data));
            // console.log(currentUser);
            dispatch(loadAutorProducts(currentUser));
            // TODO надо перекидывать на "/myshop/products" (но там еще нет этого товара в списке), а лучше на страницу товара, но нет _id, и как его тут поймать, не придумал.
            navigate("/");
        }
    };
    const recalculation = (data, setData) => {
        if (newAP.image !== data.image) {
            setData({ ...data, image: newAP.image });
        }
    };

    const HandleTrash = (e) => {
        let el = e.target.parentNode;
        if (el.tagName === "svg") el = el.parentNode;

        let images = [];
        activeProduct.image.map((f) => {
            if (f.name !== el.id) images.push(f);
        });
        newAP = { ...activeProduct, image: images }
        dispatch(deleteFileInActiveProduct(el.id));
        dispatch(updateProduct(newAP, el.id));
    }

    const firebaseStorigeUrl = configFile.imgPreviewPathFirebaseStorige;
    //
    const images = (activeProduct.image) ? activeProduct.image : [];
    //TODO сделать перетаскиванием установку главного фото
    const imageMain = images.length > 0 ? [images[0]] : [];
    const imagesNext = images.length > 1 ? images.filter((i, idx) => idx > 0) : [];
    return (
        <Page backArrow={true} title={activeProduct.name ? activeProduct.name : "Добавление нового товара"} noTranslate={true} widthScreen="w-full lg:my-5 lg:px-5 lg:p-5 mx-auto bg-state-300 rounded border-2 shadow-md">
            <div className="flex flex-col lg:grid lg:grid-cols-3 lg:grid-rows-2 gap-5 relative">

                <div className="w-full lg:col-span-2 lg:row-span-2 lg:p-5 bg-slate-200 p-2">
                    <FormComponent onSubmit={handleSubmit}
                        validatorConfig={validatorConfig}
                        defaultData={savedData}
                        recalculation={recalculation}
                    >
                        <input type="file"
                            id="avatar" name="avatar" multiple
                            accept="image/png, image/jpeg"></input>

                        {/*<img src={firebaseStorigeUrl + activeProduct.image[0].name + "?alt=media&token=" + activeProduct.image[0].token} alt="" /> */}

                        {/* <ImgFileld path="imgProfilePath" file={savedData.profile} addClass="h-32 w-auto mx-left mb-2 rounded-md" /> */}
                        <TextField
                            label={<FormattedMessage id='name' />}
                            name="name"
                            autoFocus
                            required

                        />
                        <TextAreaField
                            label={<FormattedMessage id='description' />}
                            name="about"
                            type="textarea"
                            rows={10}
                        />
                        <TextField
                            label={<FormattedMessage id='price' />}
                            name="price"
                            type={"number"}
                            required
                        />
                        <TextField
                            label={<FormattedMessage id='shipping' />}
                            name="shipping"
                            type={"number"}
                        />
                        <TextField
                            label={<FormattedMessage id='quantity' />}
                            name="quantity"
                            type={"number"}
                        />
                        <TextField
                            label={<FormattedMessage id='country' />}
                            name="country"
                        />
                        <SubmitCancelButton name="submitCancelButton">
                            <ButtonField type="submit" name="submit" label="save_changes" />
                            <ButtonField type="cancel" name="cancel" label="cancel_changes" />
                        </SubmitCancelButton>
                        {/* <MessageWindow label="data_saved" name="message" type="message" /> */}
                    </FormComponent>
                </div>
                <div className="w-full lg:row-span-2">

                    <div className="flex flex-col gap-3 lg:max-w-[350px] mx-auto">
                        {imageMain && imageMain.map((p) => {
                            return (
                                    <div key={`div_${p.name}`} className="relative mx-auto">
                                        <Title label={"Основное фото"} addStyleTitle="mb-0" key={"title_photo"}></Title>
                                        <button key={`b_${p.name}`} onClick={HandleTrash} id={p.name} >
                                            <TrashIcon className="bg-white h-12 w-12 text-red-400 hover:text-red-800 absolute left-4 top-20 cursor-pointer hover:scale-150 transition-transform duration-300" key={`0trash_${p.name}`} />
                                        </button>
                                        <img src={`${firebaseStorigeUrl}${p.name}?alt=media&token=${p.token}`} alt="" key={`activeProductImage_${p._id}`} />
                                    </div>
                            )
                        })}
                    </div>
                </div>
                {imagesNext && imagesNext.map((p) => {
                    return (
                        <div key={`_div_${p.name}`} className="flex flex-col gap-3 lg:max-w-[350px] mx-auto">
                            <div key={`div_${p.name}`} className="relative">
                                <button key={`i_${p.name}`} onClick={HandleTrash} id={p.name} >
                                    <TrashIcon className="bg-white h-12 w-12 text-red-400 hover:text-red-800 absolute left-4 top-10 cursor-pointer hover:scale-150 transition-transform duration-300" key={`trash_${p.name}`} />
                                </button>
                                <img src={`${firebaseStorigeUrl}${p.name}?alt=media&token=${p.token}`} alt="" key={`activeProductImage_${p._id}`} />
                            </div>
                        </div>
                    )
                })}
            </div>


        </Page>
    );
}

export default ProductEditForm;