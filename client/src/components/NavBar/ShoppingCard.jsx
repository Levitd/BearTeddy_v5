import React from "react";
import {ShoppingCartIcon} from "@heroicons/react/24/solid";
import {useSelector} from "react-redux";
import {getShopCardLength} from "../../store/shopingCard";
import {useLocation, useNavigate} from "react-router-dom";
import {getUserId} from "../../services/localStorage.service";
import {useIntl} from "react-intl";
import {toast} from "react-toastify";

const ShoppingCard = ({timeX }) => {
    const countProductsInShopCard = useSelector(getShopCardLength());
    const navigate = useNavigate();
    const location = useLocation();
    const redirect = location.state
        ? location.state.referrer.pathname
        : "/";
    const intl = useIntl();
    const handleClickGoBasket =()=>{
        if (countProductsInShopCard) {
            const user_id = getUserId();
            if (user_id) {
                navigate('/basket', redirect);
            } else {
                navigate('/auth/login', redirect);
            }
        } else {
            toast.info(intl.messages["shopping_cart_is_empty"]);
        }
    }
    const class_ = "flex flex-row items-center "+ (!countProductsInShopCard ? "disabled:opacity-75":"hover:text-red-800 hover:scale-150 transition-transform duration-300");
    return (
        <div className="text-xs lg:text-sm font-light text-gray-600 border-2 bg-white rounded-full p-1">
            <button onClick={handleClickGoBasket} className={class_}>
                <ShoppingCartIcon className="h-10 w-10 text-red-300  relative" />
                <p className={"text-xl absolute mx-3.5 font-bold text-red-900"}>{countProductsInShopCard}</p>
            </button>
        </div>
    )
};

export default ShoppingCard;
