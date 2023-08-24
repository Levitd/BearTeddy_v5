import { useDispatch, useSelector } from "react-redux";
import { getIsLoggedIn, getUsersLoadingStatus, loadUserById } from "../store/users";
import { useEffect } from "react";
import PropTypes from "prop-types";
import localStorageService from "../services/localStorage.service";
import { loadShops } from "../store/shops";
import { getProductIsLoading, loadProducts } from "../store/products";
import SpinnerLader from "../components/SpinnerLoader";
import { loadAutorProducts } from "../store/autorProducts";
import { loadShopCard } from "../store/shopingCard";
import getGlobalFilter from "../utils/globalFilterProducts";
import {useLocation} from "react-router-dom";


const AppLoader = ({ children }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const isLoggedIn = useSelector(getIsLoggedIn());
    const userStatusLoading = useSelector(getUsersLoadingStatus());
    const isLoadingProducts = useSelector(getProductIsLoading());

    const globalFilterProducts = getGlobalFilter(location.pathname);
    if (!isLoadingProducts) dispatch(loadProducts(globalFilterProducts));
    useEffect(() => {
        if (isLoggedIn) {
            const userId = localStorageService.getUserId();
            dispatch(loadUserById(userId));
            dispatch(loadShops(userId));
            dispatch(loadShopCard(userId));
            dispatch(loadAutorProducts(userId));
        } else {
            dispatch(loadShops());
        }
    }, [isLoggedIn, dispatch]);
    // if (userStatusLoading) return "Loading...";
    return (
        <>
            {userStatusLoading && <SpinnerLader />}
            {!userStatusLoading &&
                children
            }
        </>
    );
};

AppLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node])
};

export default AppLoader;
