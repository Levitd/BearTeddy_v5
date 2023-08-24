import React from "react";
// import { ButtonField } from "./fields";

const GrouplButton = ({ children, name = "GrouplButton" }) => {
    return (
        <div id="submitCancel" className="flex flex-row" name={name}  >
            {children}
        </div>
    );
}

export default GrouplButton;
