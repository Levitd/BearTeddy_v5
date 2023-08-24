import httpService from "./http.service";

const activeProductsEndpoint = "product/";

const ActiveProductsService = {
    getProductsById: async (_id) => {
        const { data } = await httpService.get(activeProductsEndpoint+_id);
        return data;
    },
};

export default ActiveProductsService;
