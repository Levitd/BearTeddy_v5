import React from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";

const MessageP = ({ strongLabel, label, addStyle }) => {
    const intl = useIntl();
    const labelMessage = intl.messages[label];
    const labelStrongMessage = strongLabel ? intl.messages[strongLabel] : "";
    return (
        <div className={`mt-2 text-${addStyle}-600 text-sm`}>
            {labelStrongMessage ? `<strong>${labelStrongMessage}</strong>` : ""} {labelMessage}
        </div>
    );
};
MessageP.propTypes = {
    label: PropTypes.string,
    strongLabel: PropTypes.string,
    addStyle: PropTypes.string
};

export default MessageP;