import { createSlice } from "@reduxjs/toolkit";
import StatisticsService from "../services/statistics.service";
import { deleteLastViwed } from "../services/localStorage.service";
import {viewedProduct} from "./products";

const initialState = {
    entities: null,
    isLoading: false,
    error: null,
    dataLoaded: false
};

const statisticsSlice = createSlice({
    name: "statistics",
    initialState,
    reducers: {
        statisticsRequested: (state) => {
            state.isLoading = true;
        },
        statisticsCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload);
        },
        statisticsReceved: (state, action) => {
            state.entities = action.payload;
            state.dataLoaded = true;
            state.isLoading = false;
        },
        statisticsRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
    }
});
const { reducer: statisticsReducer, actions } = statisticsSlice;
const { statisticsRequested, statisticsCreated, statisticsReceved, statisticsRequestFiled } = actions;

export const updateStatistics = (payload) => async (dispatch, getState) => {
    try {
        dispatch(statisticsRequested());
        const { content } = await StatisticsService.put(payload);
        dispatch(statisticsReceved());
        if (!Array.isArray(content)){
            dispatch(statisticsCreated(content));
            dispatch(viewedProduct(content.product_id));
        }
        deleteLastViwed();
    } catch (error) {
        deleteLastViwed();
        dispatch(statisticsRequestFiled(error.message));
    }
};

export default statisticsReducer;
