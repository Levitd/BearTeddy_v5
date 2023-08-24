import React from "react";
import ButtonField from "../common/form/buttonField";

const MakePurchase=({...rest})=>{
    return (
        <ButtonField label={"make_purchase"} {...rest}/>
    )
};

export default MakePurchase;
