import React, { useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
// Language
import { IntlProvider } from "react-intl";
import { LOCALES } from "../src/i18n/locales";
import { messages } from "../src/i18n/messages";
//Message
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
//pages
import MainPage from "./layout/mainPage";
import AutorsPage from "./layout/autorsPage";
import NavBar from "./components/NavBar/NavBar";
import Login from "./layout/login";

import withRedux from "./hoc/withRedux";
import AppLoader from "./hoc/appLoader";
import PersonalArea from "./components/ui/personalArea";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "./store/users";
import withRouter from "./hoc/withRouter";
import MyShopPage from "./layout/myShopPage";
import MyProductsPage from "./layout/myProductsPage";
import { getUserShop } from "./services/localStorage.service";
import ProductPage from "./layout/productPage";
import ProductEdit from "./layout/productEdit";
// import { getAutorsProductList } from "./store/autorProducts";
// import { getProductList } from "./store/products";
import ProductNew from "./layout/productNew";
import Basket from "./layout/basket";



function App() {
    // const dispatch = useDispatch();
    function getInitialLocale() {
        const savedLocale = JSON.parse(localStorage.getItem('locale'));
        return savedLocale || LOCALES.ENGLISH;
    }
    const [currentLocale, setCurrentLocale] = useState(getInitialLocale());
    const handleChangeLang = ({ target }) => {
        const value = target.dataset.value;
        if (value) setCurrentLocale(value);
        if (value) localStorage.setItem('locale', JSON.stringify(value));
    };
    const isLoggedIn = useSelector(getIsLoggedIn());
    const shop = getUserShop();

    const location = useLocation();
    return (
        <>
            <AppLoader>
                {/* {shopLoading && */}
                <IntlProvider messages={messages[currentLocale]} locale={currentLocale} defaultLocale={LOCALES.ENGLISH}>
                    <NavBar handleChange={handleChangeLang} shop={shop} isLoggedIn={isLoggedIn} />
                    <div className={"bg-slate-700"}>
                    <Routes>
                        <Route path="/" element={<MainPage locale={currentLocale} />} />
                        <Route path="basket" element={<Basket />} />
                        <Route path="autors" element={<AutorsPage />} />
                        <Route path="myshop">
                            <Route index element={!isLoggedIn ? <Navigate to="/auth/login" state={{ referrer: location }} /> : shop ? <MyShopPage shop={shop} /> : <Navigate to="/create_myshop" state={{ referrer: location }} />} />
                            {/* <Route path="products" element={<MyProductsPage shop={shop} />} > */}
                            <Route path="products" >
                                <Route index element={!isLoggedIn ? <Navigate to="/auth/login" state={{ referrer: location }} /> : shop ? <MyProductsPage shop={shop} list="autor" /> : <Navigate to="/create_myshop" state={{ referrer: location }} />} />
                                <Route path="new" element={!isLoggedIn ? <Navigate to="/auth/login" state={{ referrer: location }} /> : <ProductNew />} />
                                <Route path=":_id" element={<ProductPage />} />
                                <Route path=":_id/edit" element={!isLoggedIn ? <Navigate to="/auth/login" state={{ referrer: location }} /> : <ProductEdit />} />
                            </Route>
                        </Route>

                        <Route path="/create_myshop" element={!isLoggedIn ? <Navigate to="/auth/login" state={{ referrer: location }} /> : !shop ? <MyShopPage shop={shop} /> : <Navigate to="/myshop" state={{ referrer: location }} />} />
                        <Route path="auth/login" element={isLoggedIn ? <Navigate to="/" /> : <Login />} />
                        <Route path="personalArea" element={isLoggedIn ? <PersonalArea /> : <Navigate to="/auth/login" state={{ referrer: location }} />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                    </div>
                </IntlProvider>
                {/* } */}
            </AppLoader>
            <ToastContainer />
        </>
    );
}

const AppWithStoreAndRoutes = withRedux(withRouter(App));
export default AppWithStoreAndRoutes;
