import React from "react";
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

const InputSearch = ({ placeholder }) => {
    return (
        <div className="search_line flex-row flex-nowrap w-11/12 lg:w-full py-2 pr-2 mx-auto hidden lg:flex ">
            <input type="search" className="w-full mt-1 max-h-60 overflow-auto rounded-md bg-white my-2 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm" placeholder={placeholder}></input>
            <button className="w-10 text-center" type="button" id="button-addon2">
                <MagnifyingGlassIcon className="h-6 w-6 text-blue-500" />
            </button>
        </div>
    );
}

export default InputSearch;