import React from "react";
import {ShoppingCartIcon, RocketLaunchIcon} from "@heroicons/react/24/solid"; // CurrencyDollarIcon
import {useDispatch, useSelector} from "react-redux";
import {addProductInShoppingCard, getShopCard} from "../store/shopingCard";
import {getUserId} from "../services/localStorage.service";
import {useLocation, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {FormattedNumber, useIntl} from "react-intl"; // MaximumFractionDigits={0}
import Message from "./message";
const PriceAndDelivery = ({price, shipping, product_id,quantity=0 }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const intl = useIntl();
    let shopCard = useSelector(getShopCard())
    const handleClickBuy = (e)=>{
        const user_id = getUserId();

        if (user_id) {
            if (shopCard && shopCard.length>0 && shopCard.find((sc)=>sc.product_id===product_id)){
                toast.warn(intl.messages["this_item_is_already_in_your_shopping_cart"]);
                return
            } else if(!shopCard || shopCard.length<1) {
                shopCard = {user_id, products:[{product_id:product_id, count:1}]}
            } else {
                shopCard=shopCard.map((sc)=>{
                    return {product_id:sc.product_id,count:sc.count}
                })
                shopCard = [...shopCard,{product_id:product_id, count:1}] ;
            }
            dispatch(addProductInShoppingCard( shopCard));
        } else {
            const redirect = location.state
                ? location.state.referrer.pathname
                : "/";
            navigate('/auth/login',redirect);
        }
    }
    return (
        <div className="block p-1 text-sm lg:text-base font-medium text-slate-700 text-center flex flex-row justify-around">
            {Number(quantity)!==0 &&
                <>
                <button data-product_id={product_id} onClick={handleClickBuy} className={"hover:scale-125 transition-transform duration-300"}><ShoppingCartIcon className="h-10 w-10 text-red-300 hover:text-red-800 pb-2" /></button>
                <p className={"text-lg font-semibold text-zinc-800 flex flex-row"}>
                    <FormattedNumber value={price} style={`currency`} currency='USD' />
                </p>
                <p className={"text-lg font-semibold text-zinc-800 flex flex-row"}>
                    <FormattedNumber value={shipping} style={`currency`} currency='USD'  />
                    <RocketLaunchIcon className="h-10 w-10 text-red-300 hover:text-red-800 pb-2" />
                </p>
                </>
            }
            {Number(quantity)===0 &&
            <>
            <Message message={'sales'} color={"red"}/>
            </>
            }
        </div>
    )
};

export default PriceAndDelivery;
