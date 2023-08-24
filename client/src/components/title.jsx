import React from "react";
// import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid';
import { BackspaceIcon } from '@heroicons/react/24/solid';
import {useNavigate} from "react-router-dom";

const Title = ({ label, addStyleTitle = "", children, backArrow=false }) => {
    const navigate = useNavigate();
    const handleClickBack = ()=>{
        navigate(-1);
    }
    return (
        <div className={"py-2 "+(backArrow ? "ps-10" : "ps-2")+ "ps-10 pe-2 mb-4 bg-slate-200 text-blue-700 font-semibold text-center relative " + addStyleTitle}>
            {backArrow &&
            <BackspaceIcon onClick={handleClickBack} className="h-10 w-10 text-slate-600 hover:text-red-900 absolute cursor-pointer hover:scale-125 transition-transform duration-300 left-3 top-0" />
            }
            {label || children}
        </div>
    )
};

export default Title;
