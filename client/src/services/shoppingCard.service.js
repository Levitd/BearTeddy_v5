import httpService from "./http.service";

const Endpoint = "shoppingCard/";

const ShoppingCardService = {
    create: async (payload) => {
        const { data } = await httpService.post(Endpoint, payload);
        return data;
    },
    patch: async (payload) => {
        const { data } = await httpService.patch(Endpoint, payload);
        return data;
    },
    get: async (_id) => {
        const { data } = await httpService.get(Endpoint, {
            params: {
                user_id: `${_id}`
            }
        });
        return data;
    },
    delete: async (product_id) => {
        const {data} = await httpService.delete(Endpoint, {
            params: {
                product_id: product_id
            }
        });
        return data;
    }
};

export default ShoppingCardService;
