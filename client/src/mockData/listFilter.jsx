import {useIntl} from "react-intl";

const ListFilter =()=> {
    const intl = useIntl();

    const listBay = [
        {id: 1, name: intl.messages.the_newest},
        {id: 2, name: intl.messages.favorite, disabled: true},
        {id: 3, name: "Еще не проданные"},
        {id: 4, name: "Нашедшие свой дом"},
        // { id: 5, name: "Ищут новый дом" },
    ];
    const listSize = [
        {id: 1, name: intl.messages.all_sizes},
        {id: 2, name: "до 14 см"},
        {id: 3, name: "от 14 см до 20 см"},
        {id: 4, name: "от 20 см до 35 см"},
        {id: 5, name: "от 35 см и выше"},
    ];
    const listPrice = [
        {id: 1, name: intl.messages.any_price},
        {id: 2, name: "до 100$"},
        {id: 3, name: "от 100$ до 250$"},
        {id: 4, name: "от 250$ до 500$"},
        {id: 5, name: "от 500$ и выше"},
    ];
    return {listBay,listSize,listPrice};
}
export default ListFilter;