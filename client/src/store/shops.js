import { createSlice } from "@reduxjs/toolkit";
import ShopService from "../services/shop.service";
import { generateAuthError } from "../utils/generateAuthError";
import localStorageService from "../services/localStorage.service";

const initialState = {
    entities: null,
    myShops: null,
    isLoading: false,
    error: null,
    dataLoaded: false
};

const shopsSlice = createSlice({
    name: "shops",
    initialState,
    reducers: {
        shopRequested: (state) => {
            state.isLoading = true;
        },
        shopCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload);
        },
        shopReceved: (state, action) => {
            state.myShops = action.payload;
        },
        shopsReceved: (state, action) => {
            state.entities = action.payload;
            state.dataLoaded = true;
            state.isLoading = false;
        },
        shopRequestSuccess: (state) => {
            state.dataLoaded = true;
        },
        shopRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        shopLogOut: (state) => {
            state.entities = null;
            state.dataLoaded = false;
        },
        shopUpdated: (state, action) => {
            state.entities = state.entities.map(e => {
                if (e._id === action.payload._id) {
                    return action.payload;
                }
                return e;
            });
        },
        shopUpdatedFailed: (state, action) => {
            state.error = action.payload;
        },
    }
});
const { reducer: shopReducer, actions } = shopsSlice;
const { shopRequested, shopCreated, shopReceved, shopsReceved, shopRequestFiled, shopLogOut, shopUpdated, shopUpdatedFailed, shopRequestSuccess } = actions;

// const shopCreateRequested = createAction("shops/shopCreateRequested");
// const createShopFailed = createAction("shops/createShopFailed");

export const createShop = (payload, redirect) => async (dispatch) => {
    dispatch(shopRequested());
    try {
        const { content } = await ShopService.create(payload);
        if (content) {
            dispatch(shopRequestSuccess());
            dispatch(shopCreated(content));
        }
    } catch (error) {
        const { code, message } = error.response.data.error;
        if (code === 400) {
            const errorMessage = generateAuthError(message);
            dispatch(shopRequestFiled(errorMessage));
        } else {
            dispatch(shopRequestFiled(error.message));
        }
    }
};

export const updateShop = (payload) => async (dispatch, getState) => {
    try {
        const { content } = await ShopService.patch(payload);
        dispatch(shopUpdated(content));
    } catch (error) {
        dispatch(shopUpdatedFailed(error.message));
    }
};
export const loadShops = (id) => async (dispatch, getState) => {
    dispatch(shopRequested());
    try {
        const { content } = await ShopService.get();
        dispatch(shopsReceved(content));
        if (id) {
            const myShops = content.filter((c) => c.user_id === id);
            dispatch(shopReceved(myShops));
            localStorageService.setUserShop(myShops[0]._id);
        }
    } catch (error) {
        dispatch(shopRequestFiled(error.message));
    }
};

export const loadShopByIdUser = (id) => async (dispatch, getState) => {
    dispatch(shopRequested());
    try {
        const { content } = await ShopService.getShop(id);
        localStorageService.setUserShop(content[0]._id);
        dispatch(shopReceved(content));
    } catch (error) {
        dispatch(shopRequestFiled(error.message));
    }
};
export const logOutShop = () => (dispatch) => {
    dispatch(shopLogOut());
};

export const getShops = () => (state) => state.shops.entities;
export const getCurrentShop = () => (state) => state.shops.myShops;
export const getShopLoading = () => (state) => state.shops.isLoading;
export const getShopErrors = () => (state) => state.shops.error;
export const getShopNameByAutor = (userId) => (state) => state.shops.find((s) => s.user_id === userId).name;

export default shopReducer;
