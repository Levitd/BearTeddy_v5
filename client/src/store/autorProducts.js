import { createSlice } from "@reduxjs/toolkit";
import AutorProductsService from "../services/autorProducts.service";
import { orderBy } from "lodash";

const initialState = {
    entities: null,
    isLoading: false,
    error: null,
    dataLoaded: false,
    user_id: null
};
const autorProductsSlice = createSlice({
    name: "autorsProducts",
    initialState,
    reducers: {
        autorProductsRequested: (state, action) => {
            state.isLoading = true;
            state.user_id = action.payload;
        },
        autorProductsReceved: (state, action) => {
            state.entities = action.payload;
            state.dataLoaded = true;
            state.isLoading = false;
        },
        autorProductRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        logout: (state) => {
            state.entities = null;
            state.isLoading = false;
            state.error = null;
            state.dataLoaded = false;
            state.user_id = null;
        },
        updateAutorProducts: (state, action) => {
            state.entities.unshift(action.payload); // =  [action.payload, ...state.entities];
        }
    }
});

const { reducer: autorProductsReducer, actions } = autorProductsSlice;
const { updateAutorProducts, logout, autorProductsRequested, autorProductsReceved, autorProductRequestFiled } = actions;

export const loadAutorProducts = (id) => async (dispatch, getState) => {
    dispatch(autorProductsRequested(id));
    try {
        const { content } = await AutorProductsService.getProductsByIdUser(id);
        const orderContent = orderBy(content, "create", ['desc']);
        dispatch(autorProductsReceved(orderContent));
    } catch (error) {
        dispatch(autorProductRequestFiled(error.message));
    }
};
export const addedAutorProduct = (data) => (dispatch, getState) => {
    dispatch(updateAutorProducts(data));
}
export const logOutAutorProducts = () => (dispatch) => {
    dispatch(logout());
}
export const getAutorsProductList = () => (state) => state.autorsProducts.entities;
export const getAutorsProductLoaded = () => (state) => state.autorsProducts.dataLoaded;
export const getAutorsProductIsLoading = () => (state) => state.autorsProducts.isLoading;

export default autorProductsReducer;
