import httpService from "./http.service";
import localStorageService from "./localStorage.service";

const userEndpoint = "user/";

const UserService = {
    get: async () => {
        const { data } = await httpService.get(userEndpoint);
        return data;
    },
    postArray: async (array) => {
        const { data } = await httpService.post(userEndpoint,{
            array:array
        });
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.patch(userEndpoint + payload._id, payload);
        return data;
    },
    getCurrentUser: async () => {
        const { data } = await httpService.get(userEndpoint + localStorageService.getUserId());
        return data;
    },
    patch: async (payload) => {
        const { data } = await httpService.patch(userEndpoint + payload._id, payload);
        return data;
    },
    getUser: async (_id) => {
        const { data } = await httpService.get(userEndpoint, {
            params: {
                _id: `${_id}`
            }
        });
        return data;
    }
};

export default UserService;
