import React from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";

const MessageWindow = ({ strongLabel, label }) => {
    const intl = useIntl();
    // warning - show
    const labelMessage = intl.messages[label];
    const labelStrongMessage = intl.messages[strongLabel];

    return (
        <div className={"message-window alert alert-dismissible fade d-none"} role="alert">
            {labelStrongMessage ? `<strong>${labelStrongMessage}</strong>` : ""} {labelMessage}
            {/* <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> */}
        </div>
    );
};
MessageWindow.propTypes = {
    label: PropTypes.string,
    strongLabel: PropTypes.string
};

export default MessageWindow;