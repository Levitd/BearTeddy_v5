import React from "react";
import { FormattedMessage } from "react-intl";
const Message = ({message, noTranslate=false, color="black",messageAdd, colorAdd="black" }) => {
    // если в стиль добавить цвет через ${color}, то он не применяется!!!! ?????
    const styleEl=`text-xs lg:text-sm font-light h-10 flex items-center bg-gray-200 px-5 rounded-md `;
    const styleMessage = `text-${color}-600`;
    return (
        <div className={styleEl}>
            <p className={`m-0`}><span className={styleMessage}>{noTranslate ? message : <FormattedMessage id={message} />}</span><span className={colorAdd}>{messageAdd && messageAdd}</span></p>
        </div>
    )
};

export default Message;
