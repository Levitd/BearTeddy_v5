// import authReducer from "./authSlice";
import activeAutorReducer from "./activeAutor";
import activeProductsReducer from "./activeProduct";
import autorProductsReducer from "./autorProducts";
import messageReducer from "./messageSlice";
import productReducer from "./products";
import shopReducer from "./shops";
import statisticsReducer from "./statistics";
import usersReducer from "./users";
import viewedReducer from "./viewed";
import shopCardReducer from "./shopingCard";
import commentReducer from "./comment";

// import postsReducer from "./postsSlice";

const { combineReducers, configureStore } = require("@reduxjs/toolkit");

const rootReducer = combineReducers({
    // auth: authReducer,
    message: messageReducer,
    users: usersReducer,
    shops: shopReducer,
    products: productReducer,
    viewed: viewedReducer,
    autorsProducts: autorProductsReducer,
    activeProduct: activeProductsReducer,
    activeAutor: activeAutorReducer,
    statistics: statisticsReducer,
    shoppingCard: shopCardReducer,
    comment: commentReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer,
    });
}
