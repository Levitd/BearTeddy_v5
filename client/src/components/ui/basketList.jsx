import React, {useEffect, useState, useRef } from "react";
import Page from "../page";
import configFile from "../../config.json";
import {FormattedNumber} from "react-intl";
import { NavLink } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    getShopCard,
    getShopCardProduct,
    getShopLoading,
    loadBasketProductArray,
    trashProductFromBasket
} from "../../store/shopingCard";
import { TrashIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';
import {useIntl} from "react-intl";
import {toast} from "react-toastify";
import MakePurchase from "./makePurchase";

const BasketList = ({ title, addStyle }) => {
    const basketList = useSelector(getShopCard());
    //Имеем массив объектом с Id товаров в корзине, нам нужен просто массив для передачи в запрос

    const dispatch = useDispatch();
    const basket = useSelector(getShopCardProduct())
    const loadingBasket =useSelector(getShopLoading());
    const [loadedData, setloadedData] = useState(loadingBasket);
    const intl = useIntl();
    const basketArray=useRef([]);
    useEffect(()=>{
        if (basketList && basketList.length>0) {
            basketArray.current = basketList.map(v => v.product_id);
        }
        if (!loadingBasket && basketList && basketList.length>0){
            dispatch(loadBasketProductArray(basketArray.current));
        }
        setloadedData(loadingBasket)
    },[basketList,loadedData,dispatch])
    const firebaseStorigeUrl = configFile.imgPreviewPathFirebaseStorige;
    if (basket && basket.length>0 && basketList && basketList.length>0 && basket.length===basketList.length) {
        const basketNew=basket.map((b,i)=>{
            return {...b,count:basketList[i].count}
        })
        const style = "mx-2 lg:mx-5 text-xs lg:text-base";
        const HeaderBasket=()=>{
            const styleEl=" col-span-2 lg:col-span-1 text-xs lg:text-base";
            return (
                <>
                    <div className={styleEl+" text-clip"}>{intl.messages["quantity"]}</div>
                    <div className={styleEl}>{intl.messages["price"]}</div>
                    <div className={styleEl}>{intl.messages["shipping_short"]}</div>
                    <div className={styleEl}>{intl.messages["total"]}</div>
                    <div className={"hidden lg:block"}></div>
                </>
            )
        }
        const TotalBasket=({total})=>{
            return (<>
                <div key={"totalBasket"} className="grid grid-cols-10 grid-rows-2 items-center justify-items-center content-start bg-slate-100 ">
                    <div className="col-span-2 lg:col-span-1 row-span-2"></div>
                    <div className={"hidden lg:block col-span-4"}></div>
                    <HeaderBasket/>
                    <div className={"hidden lg:block col-span-4"}></div>
                    <div className={style+" col-span-2 lg:col-span-1"}>
                        {total.count}
                    </div>
                    <div className={style+" col-span-2 lg:col-span-1"}>
                        <FormattedNumber value={total.price} style={`currency`} currency='USD' />
                    </div>
                    <div className={style+" col-span-2 lg:col-span-1"}>
                        <FormattedNumber value={total.shipping} style={`currency`} currency='USD' />
                    </div>
                    <div className={style+" col-span-2 lg:col-span-1"}>
                        <FormattedNumber value={(total.price + total.shipping)} style={`currency`} currency='USD' />
                    </div>
                </div>
            </>)
        }
        const handleTrashProductFromBasket= (e)=>{
            const butEl = (e.target.nodeName!=='button') ? e.target.closest('button') : e.target;
            const product_id = butEl.dataset.product;
            dispatch(trashProductFromBasket(product_id));
        }
        const handleInfoCount =(e) => {
            console.log('info')
            toast.error(intl.messages["sorry_but_already_sold"]);
        }
        const handleMakePurchase = ()=>{
            console.log('handleMakePurchase');
            toast.info('Тут пока все... дальше надо адреса, оплаты...');
        }
        const total ={count:0,price:0,shipping:0};
        return (
            <Page title={title} addStyle={addStyle} widthScreen="flex flex-col flex-wrap gap-5 mb-2" pageMargin="">
                {
                    basketNew.map((prod) => {
                        total.count+=prod.count;
                        total.price+=prod.price;
                        total.shipping+=prod.shipping;

                         return (
                                 <div key={"b1_" + prod._id} className="grid grid-cols-10 grid-rows-4 items-center justify-items-center content-start bg-slate-100 ">
                                         <div className="col-span-2 lg:col-span-1 row-span-4 " key={"b3_" + prod._id}>
                                             <NavLink to={"/myshop/products/" + prod._id} key={"nl_" + prod._id}>
                                                {prod.image && prod.image.length > 0 &&
                                                    <img className="inline-block border-0 shadow-inner" src={`${firebaseStorigeUrl}${prod.image[0].name}?alt=media&token=${prod.image[0].token}`} alt="" key={`activeProductImage_${prod.image[0].name}`} />
                                                }
                                             </NavLink>
                                         </div>
                                         <div className="col-span-8 lg:col-span-4 row-span-2 lg:row-span-4 px-2 bg-slate-100 w-full h-full text-sm lg:text-base font-normal text-sky-800 " key={"v4_" + prod._id}>
                                             {prod.name}
                                         </div>
                                     <HeaderBasket/>
                                     <div className={style+" col-span-2 lg:col-span-1 flex flex-row items-center"}>
                                         {prod.count}
                                         {(!prod.quantity || prod.quantity<1) &&
                                            <ExclamationCircleIcon onClick={handleInfoCount} className="ms-2 h-6 w-6 lg:h-10 lg:w-10 text-red-400 hover:text-red-800 cursor-pointer hover:scale-150 transition-transform duration-300" key={`0info_${prod._id}`} />
                                         }
                                     </div>
                                     <div className={style+" col-span-2 lg:col-span-1"}>
                                         <FormattedNumber value={prod.price} style={`currency`} currency='USD' />
                                     </div>
                                     <div className={style+" col-span-2 lg:col-span-1"}>
                                         <FormattedNumber value={prod.shipping} style={`currency`} currency='USD' />
                                     </div>
                                     <div className={style+" col-span-2 lg:col-span-1 flex flex-row relative"}>
                                         <FormattedNumber value={(Number(prod.price)+Number(prod.shipping))*Number(prod.count)} style={`currency`} currency='USD' />
                                         <button data-product={prod._id} onClick={handleTrashProductFromBasket} className={"absolute lg:hidden -right-1 -top-14"}>
                                             <TrashIcon className="h-8 w-8 text-red-400 hover:text-red-800 cursor-pointer hover:scale-150 transition-transform duration-300" key={`0trash_${prod._id}`} />
                                         </button>
                                     </div>
                                     <div className={style+" col-span-1 lg:col-span-1 relative"}>
                                         {/* desktop*/}
                                         <button data-product={prod._id} className={"hidden lg:block"}>
                                             <TrashIcon onClick={handleTrashProductFromBasket} className="h-12 w-12 text-red-400 hover:text-red-800 cursor-pointer hover:scale-150 transition-transform duration-300" key={`0trash_${prod._id}`} />
                                         </button>
                                     </div>
                                 </div>
                         );
                     })
                 }
                 <TotalBasket total={total}/>
                <MakePurchase onClick = {handleMakePurchase}/>
            </Page>
        )
    } else {
        return (
            <>
                { <Page title={"shopping_cart_is_empty"}/> }
            </>
        )
    }
}

export default BasketList;
