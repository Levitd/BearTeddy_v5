import httpService from "./http.service";
// import localStorageService from "./localStorage.service";

const viewedEndpoint = "statistic/";

const ViewedService = {
    get: async () => {
        const { data } = await httpService.get(viewedEndpoint);
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.put(viewedEndpoint + payload._id, payload);
        return data;
    },
    // getCurrentUser: async () => {
    //     const { data } = await httpService.get(userEndpoint + localStorageService.getUserId());
    //     return data;
    // },
    put: async (payload) => {
        const { data } = await httpService.post(viewedEndpoint, payload);
        return data;
    },
    getViewed: async (_id) => {
        const { data } = await httpService.get(viewedEndpoint, {
            params: {
                user_id: `${_id}`
            }
        });
        return data;
    },
};

export default ViewedService;
