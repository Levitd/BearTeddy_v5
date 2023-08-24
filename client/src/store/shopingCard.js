import { createSlice } from "@reduxjs/toolkit";
import { generateAuthError } from "../utils/generateAuthError";
import ShoppingCardService from "../services/shoppingCard.service";
import ProductService from "../services/product.service";

const initialState = {
    entities: null,
    products: null,
    isLoading: false,
    error: null,
    dataLoaded: false
};

const shopCardSlice = createSlice({
    name: "shoppingCard",
    initialState,
    reducers: {
        shopCardRequested: (state) => {
            state.isLoading = true;
        },
        shopCardCreated: (state, action) => {
            state.entities =action.payload;
        },
        shopCardProducts: (state, action) => {
            state.products =action.payload;
        },
        shopCardRequestSuccess: (state) => {
            state.dataLoaded = true;
            state.isLoading = false;
        },
        shopCardRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        shopCardLogOut: (state) => {
            state.entities = null;
            state.dataLoaded = false;
        },
        shopCardUpdated: (state, action) => {
            state.entities = state.entities.map(e => {
                if (e._id === action.payload._id) {
                    return action.payload;
                }
                return e;
            });
        },
        shopCardUpdatedFailed: (state, action) => {
            state.error = action.payload;
        },
        // shopCardTrashProduct: (state, action)=>{
        //     console.log(action.payload)
        //     state.entities = state.entities.map((en)=> {
        //         if (en.product_id !== action.payload) return en;
        //     });
        //     state.products = state.products.map((pr)=> {
        //         if (pr._id !== action.payload) return pr;
        //     });
        // }
    }
});
const { reducer: shopCardReducer, actions } = shopCardSlice;
const { shopCardProducts, shopCardRequested, shopCardCreated,shopCardRequestSuccess, shopCardRequestFiled, shopCardLogOut,shopCardUpdatedFailed} = actions;

export const createShopCard = (payload, redirect) => async (dispatch) => {
    dispatch(shopCardRequested());
    try {
        const { content } = await ShoppingCardService.create(payload);
        if (content) {
            dispatch(shopCardRequestSuccess());
            dispatch(shopCardCreated(content));
        }
    } catch (error) {
        const { code, message } = error.response.data.error;
        if (code === 400) {
            const errorMessage = generateAuthError(message);
            dispatch(shopCardRequestFiled(errorMessage));
        } else {
            dispatch(shopCardRequestFiled(error.message));
        }
    }
};
export const addProductInShoppingCard=(payload) =>async (dispatch)=>{

    dispatch(shopCardRequested());
    try {
        const { content } = await ShoppingCardService.patch(payload);
        dispatch(shopCardCreated(content.products))
        //сразу запрошу обновление массива с полной информацией о товарах в корзине, иначе, при переходе в корзину не обновляется массив
        dispatch(loadBasketProductArray( content.products.map(v => v.product_id)))
    } catch (error) {
        console.log( error.response)
        const { code, message } = error.response.data;
        if (code === 400) {
            const errorMessage = generateAuthError(message);
            dispatch(shopCardRequestFiled(errorMessage));
        } else {
            dispatch(shopCardRequestFiled(error.message));
        }
    }
}
export const loadShopCard = (id) => async (dispatch, getState) => {
    dispatch(shopCardRequested());
    try {
        const { content } = await ShoppingCardService.get(id);
        dispatch(shopCardCreated(content[0].products));
        dispatch(shopCardRequestSuccess())
    } catch (error) {
        dispatch(shopCardRequestFiled(error.message));
    }
};
export const loadBasketProductArray =(array) => async (dispatch)=>{
    if (Array.isArray(array)){
        dispatch(shopCardRequested());
        try {
            const { content } = await ProductService.getArray(array);
            dispatch(shopCardProducts(content))
            dispatch(shopCardRequestSuccess())
        } catch (error) {
            dispatch(shopCardUpdatedFailed(error.message));
        }
    }
}
export const trashProductFromBasket = (_id) => async (dispatch) =>{
    try {
        dispatch(shopCardRequested());
        const { content } = await ShoppingCardService.delete(_id);
        dispatch(shopCardCreated(content.products))
        dispatch(loadBasketProductArray(content.products.map(v => v.product_id)))
    } catch (error) {
        dispatch(shopCardUpdatedFailed(error.message));
    }
}
export const logOutShoppingCard = () => (dispatch) => {
    dispatch(shopCardLogOut());
};

export const getShopCard = () => (state) => state.shoppingCard.entities;
export const getShopCardProduct = () => (state) => state.shoppingCard.products;
export const getShopCardLength = () => (state) => state.shoppingCard?.entities?.length;
export const getShopLoading = () => (state) => state.shoppingCard.isLoading;
export const getShopErrors = () => (state) => state.shoppingCard.error;

export default shopCardReducer;
