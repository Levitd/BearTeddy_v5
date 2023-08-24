import React from "react";
// import { ButtonField } from "./fields";

const SubmitCancelButton = ({ children, name = "submitCancelButton" }) => {
    return (
        <div id="submitCancel" className="flex flex-row gap-2" name={name}  >
            {children}
        </div>
    );
}

export default SubmitCancelButton;
