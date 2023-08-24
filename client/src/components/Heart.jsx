import React, {useEffect, useState} from "react";
import {EyeIcon, HeartIcon} from "@heroicons/react/24/solid";
import {getUserId} from "../services/localStorage.service";
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {createLike, getProductByIdFromState, getProductList} from "../store/products";
import { toast } from "react-toastify";
import {useIntl} from "react-intl";
import {getAutorsProductList} from "../store/autorProducts";

const Heart = ({product_id }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const products_all = useSelector(getProductList());
    const autor_products = useSelector(getAutorsProductList());
    let products ;
    const user_id = getUserId();
    const [product, setProduct] = useState([]);
    const intl = useIntl();
    useEffect(()=>{
        products = (location.pathname=== "/myshop/products") ? autor_products : products_all;
        if (products && products.length>0) {
            setProduct(products.find((prds) => prds._id === product_id))
        }
    },[products_all,autor_products])

    // console.log(product,products,product_id)
    let action=1
    if (user_id && ("liked_statistic" in product)){
        // лайкал ли ранее?, тогда убрать лайк
        for (let i=product.liked_statistic.length-1;i>=0;i--){
            if (product.liked_statistic[i].user_id===user_id){
                action=-product.liked_statistic[i].action;
                break;
            }
        }
    }
    const handleClickLike=()=>{
        if (user_id) {
            dispatch(createLike({user_id, product_id, action:action}));
            toast.info(intl.messages[action===1 ? "thank_you" : "it_s_a_pity"]);
        } else {
            const redirect = location.state
                ? location.state.referrer.pathname
                : "/";
            navigate('/auth/login',redirect);
        }
    };
    const styleHear = action===1 ? "h-6 w-6 text-red-300 hover:text-red-800 hover:scale-125" : "h-6 w-6 text-red-800 hover:text-red-500 hover:scale-75"
    return (
        <div className="flex flex-row flex-nowrap items-center pb-2">
            <button key={`like_${product_id}`} onClick={handleClickLike}>
            <HeartIcon className={styleHear+" transition-transform duration-300 pe-0.5"} />
            </button>
            <div className=" text-xs lg:text-lg font-mono font-light text-slate-400 text-left">{product.liked || 0}</div>
        </div>
    )
};

export default Heart;
