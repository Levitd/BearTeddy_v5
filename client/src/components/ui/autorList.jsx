import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getShops} from "../../store/shops";
import {getAutorsLoadingStatus, getUsersAutrors, loadUsersAutorByArray} from "../../store/users";
import SpinnerLader from "../SpinnerLoader";
import Autor from "./autor";

const AutorsList = ({ title, addStyle }) => {
    const dispatch = useDispatch();
    const shops = useSelector(getShops());
    const autors = useSelector(getUsersAutrors());
    const loadingAutors = useSelector(getAutorsLoadingStatus());
    const [loadData, setLoadData] = useState(loadingAutors)
    useEffect(()=>{
        if (!loadData && shops){
            const users = shops.map((s)=> s.user_id);
            dispatch(loadUsersAutorByArray(users));
        }
        setLoadData(loadingAutors);
    },[loadData, shops, dispatch]);

    if (autors) {
        const autorsShops = autors.map((autor)=>{
            return {...autor, ...shops.find((shop)=>shop.user_id===autor._id)}
        });
        return (
        <div key='autors' className={"flex flex-row flex-wrap gap-5 justify-between"}>
            {
                autorsShops.map((autorShop)=>{
                     return <Autor data={autorShop}/>
                })
            }
        </div>
        );
    }   else {
        return (
            <>
                { <SpinnerLader /> }
            </>
    );
}
}
export default AutorsList;