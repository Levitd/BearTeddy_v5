import httpService from "./http.service";
// import localStorageService from "./localStorage.service";

const endPoint = "statistic/";

const StatisticsService = {
    get: async () => {
        const { data } = await httpService.get(endPoint);
        return data;
    },
    put: async (payload) => {
        const { data } = await httpService.post(endPoint, payload);
        return data;
    }
};

export default StatisticsService;
