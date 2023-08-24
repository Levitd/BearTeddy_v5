import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { getCurrentUserId } from "../store/users";
import { getActiveProductIsLoading, getProductActive, getProductActiveDataLoaded, loadActiveProducts } from "../store/activeProduct";
import SpinnerLader from "../components/SpinnerLoader";
import ProductEditForm from "../components/ui/productEditForm";

const ProductEdit = () => {
    const dispatch = useDispatch();
    const param = useParams();

    const currentUser = useSelector(getCurrentUserId());

    const location = useLocation();
    const path = location.pathname;
    const productId = param._id

    // Active Product Loading
    const loadingAP = useSelector(getActiveProductIsLoading());
    const [isLoadingAP, setIsLoadingAP] = useState(loadingAP);

    const APLoadData = useSelector(getProductActiveDataLoaded());
    const [loadedDataAP, setloadedDataAP] = useState(APLoadData);

    let idActiveProduct = param._id;

    useEffect(() => {
        if (!isLoadingAP) {
            dispatch(loadActiveProducts(idActiveProduct));
        }
        setIsLoadingAP(loadingAP);
        setloadedDataAP(APLoadData);

    }, [loadingAP, path, dispatch, APLoadData, idActiveProduct])
    let activeProduct = useSelector(getProductActive());

    return (
        <>
            {!loadedDataAP && (
                <SpinnerLader />
            )}
            {loadedDataAP && (
                <ProductEditForm currentUser={currentUser} param={param} productId={productId} activeProduct={activeProduct} />
            )}
        </>
    );
}

export default ProductEdit;
