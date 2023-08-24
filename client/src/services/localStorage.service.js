const TOKEN_KEY = "jwt-token";
const REFRESH_KEY = "jwt-refresh-token";
const EXPIRES_KEY = "wt-expires";
const USERID_KEY = "user-local-id";
const USER_SHOP = "user-shop-id";

export function setTokens({ refreshToken, idToken, localId, expiresIn = 3600, ...rest }) {
    const expiresDate = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem(USERID_KEY, localId);
    localStorage.setItem(TOKEN_KEY, idToken);
    localStorage.setItem(REFRESH_KEY, refreshToken);
    localStorage.setItem(EXPIRES_KEY, expiresDate);
    setLoadingRefreshToken(false);
};
export function getAccessToken() {
    return localStorage.getItem(TOKEN_KEY);
}
export function getRefreshToken() {
    return localStorage.getItem(REFRESH_KEY);
}
export function getTokenExpiresDate() {
    return localStorage.getItem(EXPIRES_KEY);
}
export function getUserId() {
    return localStorage.getItem(USERID_KEY);
}
// shop
export function setUserShop(shopI) {
    localStorage.setItem(USER_SHOP, shopI);
}
export function getUserShop() {
    return localStorage.getItem(USER_SHOP);
}
// endShop
// ViewedProduct
export function setViewedProductsFromServer(data) {
    localStorage.setItem("viewed", JSON.stringify(data));
}
export function setViewedProducts(product) {
    if (product) {
        let viewedProducts = getViewedProduct();
        if (!viewedProducts) viewedProducts = [];
        const viewed = viewedProducts.findIndex((f) => f.product_id === product._id);
        if (viewed > -1) {
            viewedProducts.splice(viewed, 1);
        } else if (viewedProducts.length === 14) {
            viewedProducts.splice(9, 1);
        }
        viewedProducts.unshift({ product_id: product._id, time_viewed: Date.now() });
        localStorage.setItem("viewed", JSON.stringify(viewedProducts));
        return viewedProducts;
    }
}
export function getViewedProduct() {
    return JSON.parse(localStorage.getItem("viewed")) || [];
}
export function setLastViwed(product_id) {
    localStorage.setItem("lastViewed", JSON.stringify(product_id));
}
export function getLastViwed() {
    return JSON.parse(localStorage.getItem("lastViewed"));
}
export function deleteLastViwed() {
    localStorage.removeItem("lastViewed");
}
// end Viewed
//add file too fireBase
export const uploadImageActiveProductStart = () => {
    localStorage.setItem("uploadToFitebaseStart", JSON.stringify(true));
    localStorage.setItem("uploadToFitebaseEnd", JSON.stringify(false));
    localStorage.removeItem("uploadToFitebaseFiles");
}
export const uploadOneImageActiveProduct = (content) => {
    const UploadArray = JSON.parse(localStorage.getItem("uploadToFitebaseFiles")) || [];
    UploadArray.push(content);
    localStorage.setItem("uploadToFitebaseFiles", JSON.stringify(UploadArray));
}
export const uploadImageActiveProductEnd = () => {
    localStorage.setItem("uploadToFitebaseStart", JSON.stringify(false));
    localStorage.setItem("uploadToFitebaseEnd", JSON.stringify(true));
}
export function removeRefreshToken() {
    localStorage.removeItem(REFRESH_KEY);
}
export function setLoadingRefreshToken(state) {
    localStorage.setItem("loadingRefreshToken", JSON.stringify(state));
}
export function getLoadingRefreshToken(e) {
    return JSON.parse(localStorage.getItem("loadingRefreshToken"));
}
export function removeAuthData() {
    localStorage.removeItem(USERID_KEY);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(EXPIRES_KEY);
    localStorage.removeItem(USER_SHOP);
    // localStorage.removeItem("viewed");
}

function setGlobalFilter(nameFilter, dataFilter) {
    let filter = getGlobalFilter() || {};
    filter[nameFilter] = dataFilter;
    localStorage.setItem("globalFilter", JSON.stringify(filter));
}
function getGlobalFilter() {
    return JSON.parse(localStorage.getItem("globalFilter"));
}

const localStorageService = {
    setTokens,
    getAccessToken,
    getRefreshToken,
    getTokenExpiresDate,
    getUserId,
    removeAuthData,
    setUserShop,
    getUserShop,
    setViewedProducts,
    setViewedProductsFromServer,
    setGlobalFilter,
    getGlobalFilter
};

export default localStorageService;
