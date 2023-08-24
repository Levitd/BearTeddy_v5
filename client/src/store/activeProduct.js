import { createSlice } from "@reduxjs/toolkit";
import ActiveProductsService from "../services/activeProducts.service";

const initialState = {
    entities: null,
    isLoading: false,
    error: null,
    dataLoaded: false,
};
const activeProductsSlice = createSlice({
    name: "activeProduct",
    initialState,
    reducers: {
        activeProductsRequested: (state) => {
            state.isLoading = true;
            state.dataLoaded = false;
        },
        activeProductsReceved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
            state.dataLoaded = true;
        },
        activeProductRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        clearData: (state) => {
            state.entities = null;
            state.isLoading = false;
            state.error = null;
            state.dataLoaded = false;
        },
        deleteFile: (state, action) => {
            console.log(state.entities.image, action.payload);
            state.entities.image = state.entities.image.filter((f) => f.name !== action.payload);
        },
        activeProductsUpdate: (state, action) => {
            state.entities = action.payload;
        }
    }
});

const { reducer: activeProductsReducer, actions } = activeProductsSlice;
const { activeProductsUpdate, deleteFile, clearData, activeProductsRequested, activeProductsReceved, activeProductRequestFiled } = actions;

export const loadActiveProducts = (id) => async (dispatch, getState) => {
    dispatch(activeProductsRequested());
    try {
        const { content } = await ActiveProductsService.getProductsById(id);
        dispatch(activeProductsReceved(content));
    } catch (error) {
        dispatch(activeProductRequestFiled(error.message));
    }

};
export const deleteFileInActiveProduct = (fileName) => (dispatch, getState) => {
    dispatch(deleteFile(fileName));
}
export const updateActiveProduct = (data) => (dispatch, getState) => {
    // console.log(data);
    dispatch(activeProductsUpdate(data));
}
export const clearActivePageData = () => dispatch => {
    dispatch(clearData());
}
export const getActiveProductIsLoading = () => (state) => state.activeProduct.isLoading;
export const getProductActive = () => (state) => state.activeProduct.entities;
export const getProductActiveDataLoaded = () => (state) => state.activeProduct.dataLoaded;
export const getAutorOfProduct = () => (state) => state.activeProduct.entities?.user_id;

export default activeProductsReducer;
