import { createAction, createSlice } from "@reduxjs/toolkit";
import UserService from "../services/user.service";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
// import getRandomInt from "../utils/getRandomInt";
import history from "../utils/history";
import { generateAuthError } from "../utils/generateAuthError";
import { loadShops, logOutShop } from "./shops";
import { logOutAutorProducts } from "./autorProducts";
import { clearAutorPageData } from "./activeAutor";
import { clearActivePageData } from "./activeProduct";

const initialState = (localStorageService.getAccessToken())
    ? {
        entities: null,
        isLoading: true,
        error: null,
        auth: { userId: localStorageService.getUserId() },
        isloggedIn: true,
        dataLoaded: false,
        createShop: "",
        shopAutors: null,
        isLoadingAutors: false
    }
    : {
        entities: null,
        isLoading: false,
        error: null,
        auth: null,
        isloggedIn: false,
        dataLoaded: false,
        createShop: false,
        shopAutors: null,
        isLoadingAutors: false
    };

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        usersRequested: (state) => {
            state.isLoading = true;
        },
        usersAutorsRequested: (state) => {
            state.isLoadingAutors = true;
        },
        usersReceved: (state, action) => {
            state.entities = action.payload;
            state.dataLoaded = true;
            state.isLoading = false;
        },
        usersAutorsReceved: (state, action) => {
            state.shopAutors = action.payload;
            state.dataLoaded = true;
            state.isLoadingAutors = false;
        },
        usersRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        authRequestSuccess: (state, action) => {
            // console.log(state);
            state.auth = action.payload;
            state.isloggedIn = true;
        },
        authRequestFailed: (state, action) => {
            state.error = action.payload;
        },
        userCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload);
        },
        userUpdated: (state, action) => {
            state.entities = state.entities.map(e => {
                if (e._id === action.payload._id) {
                    return action.payload;
                }
                return e;
            });
        },
        userUpdatedFailed: (state, action) => {
            state.error = action.payload;
        },
        userLogOut: (state) => {
            state.entities = null;
            state.isloggedIn = false;
            state.auth = null;
            state.dataLoaded = false;
        },
        authRequest: (state) => {
            state.error = null;
        }
    }
});

const { reducer: usersReducer, actions } = usersSlice;
const { usersAutorsRequested, usersAutorsReceved, usersRequested, usersReceved, usersRequestFiled, authRequestSuccess, authRequestFailed, userCreated, userUpdated, userUpdatedFailed, userLogOut } = actions;

const authRequested = createAction("users/authRequested");
const userCreateRequested = createAction("users/userCreateRequested");
const createUserFailed = createAction("users/createUserFailed");

export const logIn = ({ payload, redirect }) => async (dispatch) => {
    const { email, password } = payload;
    dispatch(authRequested());
    try {
        const data = await authService.login({ email, password });
        dispatch(loadShops(data.localId));
        dispatch(authRequestSuccess({ userId: data.localId, email: email }));
        localStorageService.setTokens(data);
        history.push(redirect);
        // history.push("/");
    } catch (error) {
        console.log(error)
        const { code, message } = error.response.data.error;
        console.log(code, message);
        if (code === 400) {
            const errorMessage = generateAuthError(message);
            dispatch(authRequestFailed(errorMessage));
        } else {
            dispatch(authRequestFailed(error.message));
        }
    }
};

export const signUp = ({ email, password, ...rest }, redirect) => async (dispatch) => {
    dispatch(authRequested());
    try {
        const data = await authService.register({ email, password });
        localStorageService.setTokens(data);
        dispatch(authRequestSuccess({ userId: data.localId }));
        dispatch(createUser({
            _id: data.localId,
            email,
            ...rest
        }));
        // history.push(redirect);
    } catch (error) {
        const { code, message } = error.response.data.error;
        if (code === 400) {
            const errorMessage = generateAuthError(message);
            dispatch(authRequestFailed(errorMessage));
        } else {
            dispatch(authRequestFailed(error.message));
        }
    }
};

export const logOut = () => async (dispatch) => {
    await dispatch(logOutShop());
    await dispatch(userLogOut());
    await dispatch(logOutAutorProducts());
    dispatch(clearAutorPageData());
    dispatch(clearActivePageData());
    localStorageService.removeAuthData();
    // history.push("/");
};

function createUser(payload) {
    return async function (dispatch) {
        dispatch(userCreateRequested());
        try {
            const { content } = await UserService.create(payload);
            dispatch(userCreated(content));
            // history.push("/users");
        } catch (error) {
            dispatch(createUserFailed(error.message));
        }
    };
};

export const apdateUser = (payload) => async (dispatch, getState) => {
    try {
        const { content } = await UserService.patch(payload);
        dispatch(userUpdated(content));
    } catch (error) {
        dispatch(userUpdatedFailed(error.message));
    }
};

export const loadUsersList = () => async (dispatch, getState) => {
    dispatch(usersRequested());
    try {
        const { content } = await UserService.get();
        dispatch(usersReceved(content));
    } catch (error) {
        dispatch(usersRequestFiled(error.message));
    }
};
// export const loadUsersListByArray = (array) => async (dispatch, getState) => {
//     dispatch(usersRequested());
//     try {
//         const { content } = await UserService.postArray(array);
//         dispatch(usersCommentReceved(content));
//     } catch (error) {
//         dispatch(usersRequestFiled(error.message));
//     }
// };
export const loadUserById = (id) => async (dispatch, getState) => {
    dispatch(usersRequested());
    try {
        const { content } = await UserService.getUser(id);
        dispatch(usersReceved(content));
    } catch (error) {
        dispatch(usersRequestFiled(error.message));
    }
};
export const loadUsersAutorByArray = (array) => async (dispatch, getState) => {
    dispatch(usersAutorsRequested());
    try {
        const { content } = await UserService.postArray(array);
        dispatch(usersAutorsReceved(content));
    } catch (error) {
        dispatch(usersRequestFiled(error.message));
    }
};
export const getUserById = (userId) => state => {
    if (state.users.entities) {
        return state.users.entities.find(u => u._id === userId);
    }
};

export const getUsersList = () => state => state.users.entities;
export const getCurrentUserData = () => (state) => {
    return state.users.entities
        ? state.users.entities.find(u => u._id === state.users.auth.userId)
        : null;
    ;
};
export const getIsLoggedIn = () => state => state.users.isloggedIn;
export const getDataStatus = () => state => state.users.dataLoaded;
export const getUsersLoadingStatus = () => state => state.users.isLoading;
export const getCurrentUserId = () => state => state.users.auth?.userId;
export const getCurrentUserEmail = () => state => state.users.auth?.email;
export const getAuthErrors = () => (state) => state.users.error;
// export const getShopUser = () => (state) => state.users.error;
export const getCurrentUser = () => (state) => state.users.entities;
export const getUsersAutrors = () => (state) => state.users.shopAutors;
export const getAutorsLoadingStatus = () => state => state.users.isLoadingAutors;
export default usersReducer;
