import httpService from "./http.service";
// import localStorageService from "./localStorage.service";

const productEndpoint = "product/";

const ProductService = {
    get: async () => {
        const { data } = await httpService.get(productEndpoint);
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.post(productEndpoint, payload);
        return data;
    },
    createLike: async (payload) => {
        const { data } = await httpService.post(productEndpoint,  {
            like: payload
        });
        return data;
    },
    // getCurrentUser: async () => {
    //     const { data } = await httpService.get(userEndpoint + localStorageService.getUserId());
    //     return data;
    // },
    patch: async (payload) => {
        const { data } = await httpService.patch(productEndpoint + payload._id, payload);
        return data;
    },
    getArray: async (array) => {
        const newArray = JSON.stringify(array)
        const { data } = await httpService.get(productEndpoint + 'array?array=' + newArray);
        return data;
    },
    getProducts: async () => {
        const { data } = await httpService.get(productEndpoint);
        return data;
    },
    getProductsFilter: async (payload) => {
        const { data } = await httpService.get(productEndpoint, { params: payload });
        return data;
    },
    getProductsById: async (_id) => {
        const { data } = await httpService.get(productEndpoint, {
            params: {
                _id: `${_id}`
            }
        });
        return data;
    },
    getProductsByIdAutor: async (_id) => {
        const { data } = await httpService.get(productEndpoint, {
            params: {
                user_id: `${_id}`
            }
        });
        return data;
    },
};

export default ProductService;
