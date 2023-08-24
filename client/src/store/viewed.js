/*
Храним 10 товаров с localSrogage и если зарегистрирован, то дублируем в БД
*/
import { createSlice } from "@reduxjs/toolkit";
import ViewedService from "../services/viewed.service";
import { deleteLastViwed, getLastViwed, getViewedProduct, setLastViwed, setViewedProducts, setViewedProductsFromServer } from "../services/localStorage.service";
import { updateStatistics } from "./statistics";
import { nanoid } from "nanoid";
import ProductService from "../services/product.service";

const initialState = {
    entities: null,
    isLoading: false,
    isUpdating: false,
    error: null,
    dataLoaded: false,
    dataUpload: false
};

const viewedSlice = createSlice({
    name: "viewed",
    initialState,
    reducers: {
        viewedRequested: (state) => {
            state.isLoading = true;
            state.dataLoaded = false;
        },
        viewedUpdate: (state) => {
            state.isUpdating = "updating";
            state.dataUpload = false;
        },
        viewedReceved: (state, action) => {
            state.entities = action.payload;
            state.dataLoaded = true;
            state.isLoading = false;
        },
        viewedNowUpdated: (state, action) => {
            state.entities = action.payload;
            state.dataUpload = true;
            state.isUpdating = false;
        },
        viewedRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        viewedUpdatedFailed: (state, action) => {
            state.error = action.payload;
        },
    }
});
const { reducer: viewedReducer, actions } = viewedSlice;
const { viewedRequested, viewedUpdate, viewedNowUpdated, viewedReceved, viewedRequestFiled, viewedUpdatedFailed } = actions;

export const loadViewProductArray =(array) => async (dispatch)=>{
    if (Array.isArray(array)){
        dispatch(viewedRequested());
        try {
            const { content } = await ProductService.getArray(array);
            const newContent= array.map((a)=> content[content.findIndex((c)=>a===c._id)]);
            dispatch(viewedReceved(newContent))
        } catch (error) {
            dispatch(viewedRequestFiled(error.message));
        }
    }
}

// export const loadViewedProductsByIdUser = (id) => async (dispatch, getState) => {
//     dispatch(viewedRequested());
//     try {
//         const { content } = await ViewedService.getViewed(id);
//         const localContent = getViewedProduct();
//         let newContent = [];
//         if (content && localContent) {
//             newContent = content.map((c) => {
//                 const lc = localContent.find((l) => c._id === l._id);
//                 if (lc && lc.time_viewed > c.time_viewed) return lc;
//                 return c;
//             });
//         } else if (!content) {
//             newContent = localContent;
//         } else if (!localContent) {
//             newContent = content;
//         }
//         if (newContent[0].listViewedProducts.length > 10) {
//             newContent[0].listViewedProducts = newContent[0].listViewedProducts.splice(10, newContent[0].listViewedProducts.length - 1 - 10);
//         }
//         setViewedProductsFromServer(newContent[0].listViewedProducts);
//         dispatch(viewedReceved(newContent));
//     } catch (error) {
//         dispatch(viewedRequestFiled(error.message));
//     }
// };
export const updateViewedProducts = (data, _id, activeProductId) => async (dispatch, getState) => {
    if (!data || data._id !== activeProductId) return; // второе условие возникает когда находимся на странице и выбираем другой товар и data осталась от предыдущего
    const listViewedProducts = setViewedProducts(data);
    setLastViwed(activeProductId);
    if (_id) {
        // dispatch(updateViewedProductsServer({ user_id: _id, product_id: activeProductId }));
    }
    if (data.user_id !== _id) { // В статистику помещаем, только просмотры не своих товаров
        // console.log(getLastViwed(), activeProductId);
        dispatch(updateStatistics({
            _id: nanoid(),
            product_id: activeProductId,
            user_id: _id ? _id : "unlogged",
        }));
    } else {
        deleteLastViwed();
    }

    return;
};
// export const updateViewedProductsServer = (data) => async (dispatch, getState) => {
//     dispatch(viewedUpdate());
//     try {
//         const { content } = await ViewedService.put(data);
//         dispatch(viewedNowUpdated(content));
//     } catch (error) {
//         dispatch(viewedUpdatedFailed(error.message));
//     }
// };

export const getViewedIsLoading = () => (state) => state.viewed.dataLoaded;
export const getViewedList = () => (state) => state.viewed.entities;
export const getViewedLoading = () => (state) => state.viewed.isLoading;
export const getViewedUpdating = () => (state) => state.viewed.isUpdating;
export const getViewedUpdated = () => (state) => state.viewed.dataUpload;

export default viewedReducer;