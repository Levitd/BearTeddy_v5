import { createSlice } from "@reduxjs/toolkit";
import ProductService from "../services/product.service";
import { generateAuthError } from "../utils/generateAuthError";
import { orderBy } from "lodash";
import { DeleteFileInFireBaseStorage } from "../utils/filesToFromFirebaseStorage";
import { addedAutorProduct } from "./autorProducts";
import {updateActiveProduct} from "./activeProduct";

const initialState = {
    entities: null,
    isLoading: false,
    error: null,
    dataLoaded: false,
};

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        productRequested: (state) => {
            state.isLoading = true;
            state.dataLoaded = false;
        },
        productCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.unshift(action.payload);
        },
        productReceved: (state, action) => {
            state.entities = action.payload;
            state.dataLoaded = true;
            state.isLoading = false;
        },
        productRequestSuccess: (state) => {
            state.dataLoaded = true;
        },
        productRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        productLogOut: (state) => {
            state.entities = null;
            state.dataLoaded = false;
        },
        productUpdated: (state, action) => {
            state.entities = state.entities.map(e => {
                if (e._id === action.payload._id) {
                    return action.payload;
                }
                return e;
            });
        },
        productUpdatedFailed: (state, action) => {
            state.error = action.payload;
        },
        productViewed: (state, action) => {
            state.entities = state.entities.map((s) => {
                if (s._id === action.payload) {
                    return { ...s, viewed: !('viewed' in s) ? 1 : s.viewed + 1 };
                } else {
                    return { ...s };
                }
            })
        },
        likeReceved: (state, action) => {
            state.entities = state.entities.map((st)=>{
                if (st._id===action.payload._id){
                    return action.payload;
                } else {
                    return st;
                }
            });
            state.dataLoaded = true;
            state.isLoading = false;
        },
        setAutProducts: (state, action) => {
            state.entities=action.payload;
        }
    }
});
const { reducer: productReducer, actions } = productsSlice;
const { setAutProducts, likeReceved, productViewed, productRequested, productCreated, productReceved, productRequestFiled, productLogOut, productUpdated, productUpdatedFailed, productRequestSuccess } = actions;

// const productCreateRequested = createAction("products/productCreateRequested");
// const createproductFailed = createAction("products/createproductFailed");

export const createLike =(payload) => async (dispatch) =>{
    dispatch(productRequested());
    try {
        const { content } = await ProductService.createLike(payload);
        dispatch(likeReceved(content));
    } catch (error) {
        const { code, message } = error.response.data.error;
        if (code === 400) {
            const errorMessage = generateAuthError(message);
            dispatch(productRequestFiled(errorMessage));
        } else {
            dispatch(productRequestFiled(error.message));
        }
    }
}
export const createProduct = (payload, redirect) => async (dispatch) => {
    dispatch(productRequested());
    try {
        const { content } = await ProductService.create(payload);
        if (content) {
            dispatch(productRequestSuccess());
            dispatch(productCreated(content));
            //еще надо вставить в массив продуктов от автора
            dispatch(addedAutorProduct())
            dispatch(updateActiveProduct(content));
        }
    } catch (error) {
        const { code, message } = error.response.data.error;
        if (code === 400) {
            const errorMessage = generateAuthError(message);
            dispatch(productRequestFiled(errorMessage));
        } else {
            dispatch(productRequestFiled(error.message));
        }
    }
};

export const updateProduct = (payload, nameFile) => async (dispatch, getState) => {
    try {
        const { content } = await ProductService.patch(payload);
        dispatch(productUpdated(content));
        dispatch(addedAutorProduct(content));
        if (nameFile) DeleteFileInFireBaseStorage(nameFile, "imgPreviewPath");

    } catch (error) {
        dispatch(productUpdatedFailed(error.message));
    }
};

export const setAutorProducts =(autorProducts) => (dispatch)=>{
    dispatch(setAutProducts(autorProducts))
}
export const loadProducts = (filter) => async (dispatch, getState) => {
    if (!dispatch(getProductLoading())) {
        dispatch(productRequested());
        try {
            const { content } = await ProductService.getProductsFilter(filter);
            const orderContent = orderBy(content, "create", ['desc']);
            dispatch(productReceved(orderContent));
        } catch (error) {
            dispatch(productRequestFiled(error.message));
        }
    }
};
export const viewedProduct = (_id) => async (dispatch) => {
    dispatch(productViewed(_id));
}
// export const loadProductById = (id) => async (dispatch, getState) => {
//     if (!dispatch(getActiveProductLoading())) {
//         dispatch(productActiveRequested());
//         try {
//             const { content } = await ProductService.getProductsById(id);
//             const orderContent = orderBy(content, "create", ['desc']);
//             dispatch(activeProductReceved(orderContent));
//         } catch (error) {
//             dispatch(productRequestFiled(error.message));
//         }
//     }
// };
// //Todo
// export const loadProductByIdAutor = (id) => async (dispatch, getState) => {
//     dispatch(productActiveRequested());
//     try {
//         const { content } = await ProductService.getProductsByIdAutor(id);
//         dispatch(activeProductReceved(content));
//     } catch (error) {
//         dispatch(productRequestFiled(error.message));
//     }
// };
export const logOutProduct = () => (dispatch) => {
    dispatch(productLogOut());
};

export const getProductErrors = () => (state) => state.products.error;
export const getProductLoading = () => (state, dispatch) => dispatch(state).products.isLoading;
export const getProductIsLoading = () => (state, dispatch) => state.products.dataLoaded;
export const getProductList = () => (state, dispatch) => state.products.entities;
// export const getActiveProductLoading = () => (state, dispatch) => dispatch(state).products.isLoadingActiveProduct;
// export const getUserActiveProduct = () => (state, dispatch) => dispatch(state).products.activeProduct.user_id;
export default productReducer;
