import localStorageService from "../services/localStorage.service";

const getGlobalFilter = (path) => {
    if (path==="/myshop/products"){
        // на странице со своимо товарами фильтр не применяем
        return null;
    }
    const globalFilter = localStorageService.getGlobalFilter();
    let filterBay, filterPrice, filter = null;
    if (globalFilter && "listBay" in globalFilter) {
        switch (globalFilter.listBay) {
            case 3: // не проданные
                // filter = { filter: JSON.stringify({ quantity: { $gt: 0 } }) }
                filterBay = { quantity: { $gt: 0 }};
                break;
            case 4: // проданные
                // filter = { filter: JSON.stringify({ quantity: 0 }) }
                filterBay = { quantity: 0 };
                break;
            default:
                filterBay = null
        }

    }
    if (globalFilter && "listPrice" in globalFilter) {
        switch (globalFilter.listPrice) {
            case 2: // До 100
                filterPrice = {price: {$lt:100}};
                break;
            case 3: // До 250
                filterPrice =  {price: {$gte : 100, $lt:250}} ;
                break;
            case 4: // До 500
                filterPrice = {price: {$gte : 250, $lt:500}} ;
                    // { $and: [ {price: {$gte : 250}}, {price:{ $lt:500}} ]};
                break;
            case 5: // > 500
                filterPrice = {price: {$gte:500}};
                break;
            default:
                filterPrice=null;
        }
    }
    if (!filterBay && !filterPrice){
        filter=null
    } else if(filterBay && !filterPrice) {
        filter = {filter: JSON.stringify(filterBay)};
    } else if (!filterBay && filterPrice){
        filter = {filter: JSON.stringify(filterPrice)};
    } else if (filterBay && filterPrice){
        filterBay = JSON.stringify(filterBay);
        filterPrice = JSON.stringify(filterPrice);
        filter = {filter: JSON.stringify( {$and:[ { filterBay, filterPrice}]})};
    }
    return filter;
}
export default getGlobalFilter;
