import React from "react";
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import {useDispatch, useSelector} from "react-redux";
import {getProductList, loadFindProduct} from "../store/products";
import localStorageService from "../services/localStorage.service";
import {getGlobalFilter, setGlobalFilter} from "../store/filterList";

const InputSearch = ({ placeholder }) => {
    const dispatch = useDispatch();
    const products=useSelector(getProductList());
    const search=useSelector(getGlobalFilter()).search;
    // const search = null
    const handleFind= () =>{
        const searchValue = document.querySelector('#search').value.trim();
        // if (searchValue){
            localStorageService.setGlobalFilter("search",searchValue || null)
            dispatch(setGlobalFilter());
            dispatch(loadFindProduct(searchValue,products));
        // } else {
        //     localStorageService.setGlobalFilter("search",null)
        // }
    };
    return (
        <div className="search_line flex-row flex-nowrap w-11/12 lg:w-full py-2 pr-2 mx-auto hidden lg:flex">
            <input id="search" type="search" className="w-full mt-1 max-h-60 overflow-auto rounded-md bg-white my-2 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm" placeholder={placeholder} defaultValue={search}></input>
            <button className="w-10 text-center" type="button" id="button-addon2" onClick={handleFind} >
                <MagnifyingGlassIcon className="h-6 w-6 text-blue-500" />
            </button>
        </div>
    );
}

export default InputSearch;