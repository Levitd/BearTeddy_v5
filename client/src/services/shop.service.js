import httpService from "./http.service";
// import localStorageService from "./localStorage.service";

const shopEndpoint = "shop/";

const ShopService = {
    get: async () => {
        const { data } = await httpService.get(shopEndpoint);
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.post(shopEndpoint, payload);
        return data;
    },
    // getCurrentUser: async () => {
    //     const { data } = await httpService.get(userEndpoint + localStorageService.getUserId());
    //     return data;
    // },
    patch: async (payload) => {
        const { data } = await httpService.patch(shopEndpoint + payload._id, payload);
        return data;
    },
    getShop: async (_id) => {
        const { data } = await httpService.get(shopEndpoint, {
            params: {
                user_id: `${_id}`
            }
        });
        return data;
    },
};

export default ShopService;
