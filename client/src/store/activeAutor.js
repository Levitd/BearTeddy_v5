import { createSlice } from "@reduxjs/toolkit";
import ActiveAutorService from "../services/activeAutor.service";

const initialState = {
    entities: null,
    isLoading: false,
    error: null,
    dataLoaded: false
};
const activeAutorSlice = createSlice({
    name: "activeAutor",
    initialState,
    reducers: {
        activeAutorRequested: (state) => {
            state.isLoading = true;
            state.dataLoaded = false;
        },
        activeAutorReceved: (state, action) => {
            state.entities = action.payload[0];
            state.isLoading = false;
            state.dataLoaded = true;
        },
        activeAutorRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        clearData: (state) => {
            state.entities = null;
            state.isLoading = false;
            state.error = null;
            state.dataLoaded = false;
        }
    }
});

const { reducer: activeAutorReducer, actions } = activeAutorSlice;
const { clearData, activeAutorRequested, activeAutorReceved, activeAutorRequestFiled } = actions;

export const loadActiveAutor = (id) => async (dispatch, getState) => {
    dispatch(activeAutorRequested());
    try {
        const { content } = await ActiveAutorService.getAutorById(id);
        dispatch(activeAutorReceved(content));
    } catch (error) {
        dispatch(activeAutorRequestFiled(error.message));
    }

};
export const clearAutorPageData = () => dispatch => {
    dispatch(clearData());
}
export const getActiveAutorIsLoading = () => (state) => state.activeAutor.isLoading;
export const getAutorActive = () => (state) => state.activeAutor.entities;
export const getAutorActiveDataLoaded = () => (state) => state.activeAutor.dataLoaded;

export default activeAutorReducer;
