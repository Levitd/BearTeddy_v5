import React, { useEffect, useState } from "react";
import Page from "../page";
import { useDispatch, useSelector } from "react-redux";
import { getProductList } from "../../store/products";
import configFile from "../../config.json";
// import { HeartIcon } from '@heroicons/react/24/solid';
import { NavLink, useNavigate } from "react-router-dom";
import { getAutorsProductIsLoading, getAutorsProductList, getAutorsProductLoaded, loadAutorProducts } from "../../store/autorProducts";
import { UserPlusIcon } from '@heroicons/react/24/solid';
import { getCurrentUserId, getIsLoggedIn } from "../../store/users";
import SpinnerLader from "../SpinnerLoader";
import { getShops } from "../../store/shops";
import TimeAgo from "../timeAgo";
import EyeView from "../EyeView";
import Heart from "../Heart";
import PriceAndDelivery from "../priceAndDelivery";
// 
const ProductList = ({ title, list, noTranslate=false }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getIsLoggedIn());

    const handleNewProduct = () => {
        navigate("/myshop/products/new");
    }
    // Выкачаем занового товары??? на случай, когда добавили новый товар
    const currentUser = useSelector(getCurrentUserId());

    const loadingProductAutor = useSelector(getAutorsProductIsLoading());
    const [isLoadingProductAutor, setIsLoadingProductAutor] = useState(loadingProductAutor);

    const loadData = useSelector(getAutorsProductLoaded());
    const [loadedData, setloadedData] = useState(loadData);

    const products_autor = useSelector(getAutorsProductList());
    const shops = useSelector(getShops());
    const products_list = useSelector(getProductList());
    useEffect(() => {
        if (isLoggedIn && !isLoadingProductAutor) {
            dispatch(loadAutorProducts(currentUser));
        }
        setIsLoadingProductAutor(loadingProductAutor);
        setloadedData(loadData);
    }, [isLoggedIn, dispatch, loadData, loadedData, products_list, title]);

    const products_ = (list === "autor") ? products_autor : products_list;
    // console.log(list, products_)
    if (products_ && products_!== "undefined" && products_.length>0 && shops && shops.length>0) {
        const products = products_.map((p_) => {
            // console.log(shops,p_)
            const shopName=shops.find((s) => s.user_id === p_.user_id)?.name || "???"
            return { ...p_, nameShop: shopName };
        });
        return (
            <Page title={title} noTranslate={noTranslate} widthScreen="flex flex-row flex-wrap gap-5 mt-2 mb-20 lg:mb-2">
                {(list === "autor") &&
                    <div key={"add_prod"} className="w-40 sm:w-56 md:w-64 mx-auto  rounded-b-md border-2 shadow-inner">
                        <img className="inline-block h-auto" src="https://firebasestorage.googleapis.com/v0/b/bearteddy-263cb.appspot.com/o/img%2Fprofile%2F3d-animal-png.png?alt=media&token=be289e29-e59a-4a19-9555-35bd00be925e" alt="" key={`newProduct`} />
                        <UserPlusIcon onClick={handleNewProduct} className="bg-white h-24 w-24 mt-10 mx-auto text-slate-400 hover:text-slate-800 cursor-pointer hover:scale-150 transition-transform duration-300" />
                    </div>
                }
                {
                    products.map((prod) => {
                        const firebaseStorigeUrl = configFile.imgPreviewPathFirebaseStorige;
                        const background = `'${firebaseStorigeUrl}${prod.image[0].name}?alt=media&token=${prod.image[0].token}'`;
                        return (
                            <div key={prod._id} className="w-80 sm:w-64 md:w-64 mx-auto">
                                <div className="flex flex-col w-full">
                                    <NavLink to={"/myshop/products/" + prod._id}>
                                        {prod.image.length>0 &&
                                        <div style={{backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' }} className="w-80 h-[28rem] sm:w-64 sm:h-[22rem] md:w-64 md:h-[22rem] ">
                                            {/*<img className="inline-block rounded-t-md h-auto border-2 shadow-inner" src={`${firebaseStorigeUrl}${prod.image[0].name}?alt=media&token=${prod.image[0].token}`} alt="" key={`activeProductImage_${prod.image[0].name}`} />*/}

                                        </div>
                                        }
                                    </NavLink>
                                    <div className="px-2 bg-slate-100  rounded-b-md border-2 shadow-inner">

                                        <NavLink to={"/myshop/products/" + prod._id}>
                                            <p className="line-clamp-1 text-sm lg:text-base font-normal text-sky-800 text-center hover:scale-125 transition-transform duration-300">{prod.name}</p>
                                        </NavLink>
                                        <div className="block text-xs lg:text-sm font-medium text-pink-950 text-center">{`by ${prod.nameShop}`}</div>
                                        <div className="block text-xs lg:text-sm font-light text-slate-500 text-center">{prod.country}</div>
                                        {/*<div className="block text-sm lg:text-base font-medium text-slate-700 text-center">{prod.price} USD</div>*/}
                                        <PriceAndDelivery price={prod.price} shipping={prod.shipping} product_id={prod._id} quantity={prod.quantity}/>
                                        <div className="flex flex-row flex-nowrap justify-between content-center">
                                            <TimeAgo timeX={prod.createdAt}/>
                                            <EyeView viewed={prod.viewed}/>
                                            <Heart product_id={prod._id} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </Page>
        );
    } else {
        { <SpinnerLader /> }
    }
}

export default ProductList;