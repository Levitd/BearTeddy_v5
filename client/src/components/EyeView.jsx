import React from "react";
import {FormattedDate, FormattedRelativeTime} from "react-intl";
import {EyeIcon} from "@heroicons/react/24/solid";

const EyeView = ({viewed }) => {
    return (
        <div className="flex flex-row flex-nowrap items-center pb-2">
            <EyeIcon className="h-6 w-6 text-green-600 hover:text-green-800 pe-0.5" />
            <div className=" text-xs lg:text-lg font-mono font-light text-slate-400 text-left">{viewed || 0}</div>
        </div>
    )
};

export default EyeView;
