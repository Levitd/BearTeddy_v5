import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCurrentUserId } from "../store/users";
import ProductEditForm from "../components/ui/productEditForm";
import { nanoid } from "nanoid";

const ProductNew = () => {
    const param = useParams();

    const currentUser = useSelector(getCurrentUserId());

    // Active Product Loading

    let productId = ""; // nanoid();

    let activeProduct = {
        name: "",
        about: "",
        price: "",
        shipping: "",
        images: [],
        country: "",
        create: Date.now(),
        currency: 1,
        orderInfo: "The delivery time is 3-6 weeks, depending on the country of destination.",
        payment_options: "paypal",
        rrpolycy: "No return provided",
        user_id: currentUser
    };

    return (
        <>
            <ProductEditForm currentUser={currentUser} param={param} productId={productId} activeProduct={activeProduct} />
        </>
    );
}

export default ProductNew;
