import React from "react";
import Title from "./title";
import { FormattedMessage } from "react-intl";

const Page = ({ backArrow=false, children, addStyleTitle = "", addStyle = "", border = " rounded border-2 shadow-md", widthScreen = "", title, pageMargin = " my-2 lg:my-5", noTranslate = false, container = " container xl:container lg:container md:container sm:container" }) => {
    return (
        <div className={container + " mx-auto bg-state-300  p-2" + border + pageMargin + addStyle}>
            {/* <div className={"my-2 px-2 p-2 lg:my-5 lg:px-5 lg:p-5 mx-auto bg-state-300 rounded border-2 shadow-md"}> */}
            {title &&
                <Title backArrow={backArrow} addStyleTitle={addStyleTitle}>{noTranslate ? title : <FormattedMessage id={title} />}</Title>
            }
            <div className={widthScreen}>
                {children}
            </div>
            {/* </div> */}
        </div>
    )
};

export default Page;
