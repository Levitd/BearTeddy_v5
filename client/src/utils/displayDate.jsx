import { useIntl } from "react-intl";

const DisplayDate = ({ data }) => {
    const intl = useIntl();
    const date = new Date(parseInt(data));
    const dateNow = new Date();
    const yearDif = dateNow.getFullYear() - date.getFullYear();
    if (yearDif === 0) {
        const dayDif = dateNow.getDay() - date.getDay();
        if (dayDif === 0) {
            const hourDif = dateNow.getHours() - date.getHours();
            if (hourDif === 0) {
                const minutesDif = dateNow.getMinutes() - date.getMinutes();
                if (minutesDif >= 0 && minutesDif <= 1) return ("1 " + intl.messages["minute_ago_1"]);
                if ((minutesDif > 1 && minutesDif <= 4) || (minutesDif > 10 && minutesDif % 10 >= 1 && minutesDif % 10 <= 4)) return (minutesDif + " " + intl.messages["minute_ago_2"]);
                if (minutesDif > 4 && minutesDif <= 60) return (minutesDif + " " + intl.messages["minute_ago_5"]);

            }
            return `${date.getHours()}:${date.getMinutes()}`;
        }
        return `${date.getDay()} ${date.toLocaleString("default", { month: "long" })}`;
    }
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
}

export default DisplayDate;

