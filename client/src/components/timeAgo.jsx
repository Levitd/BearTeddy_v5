import React from "react";
import {FormattedDate, FormattedRelativeTime} from "react-intl";

const TimeAgo = ({timeX }) => {
    return (
        <div className="text-xs lg:text-sm font-light text-gray-600 ">
            {
                ((Date.parse(timeX) - Date.now()) / 1000 > -2678400) &&
                <FormattedRelativeTime value={(Date.parse(timeX) - Date.now()) / 1000} numeric="auto" updateIntervalInSeconds={60} />
            }
            {
                ((Date.parse(timeX) - Date.now()) / 1000 < -2678400) &&
                <FormattedDate value={Date.parse(timeX)} year="numeric" month="long" day="2-digit" />
            }
        </div>
    )
};

export default TimeAgo;
