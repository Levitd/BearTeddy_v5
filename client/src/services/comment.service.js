import httpService from "./http.service";

const endpoint = "comment/";

const CommentService = {
    get: async () => {
        const {data} = await httpService.get(endpoint);
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.post(endpoint, payload);
        return data;
    },
    getProduct: async (payload) => {
        const {data} = await httpService.get(endpoint+payload);
        return data;
    },

}

export default CommentService;
