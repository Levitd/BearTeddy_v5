import { createSlice } from "@reduxjs/toolkit";
import localStorageService from "../services/localStorage.service";

const initialState = {
    listBay : [
        {id: 1, name: "the_newest"},
        {id: 2, name: "favorite"},
        {id: 3, name: "in_stock"},
        {id: 4, name: "adopted"},
    ],
    listPrice : [
        {id: 1, name: "any_price"},
        {id: 2, name: "up_to_100"},
        {id: 3, name: "from_100_to_250"},
        {id: 4, name: "from_250_to_500"},
        {id: 5, name: "from_500_and_up"},
    ],
    globalFilter: null
    };

const filterListSlice = createSlice({
    name: "filterList",
    initialState,
    reducers: {
        listReceved: (state, action) => {
            state.entities =action.payload;
        },
        settingGlobalFilter:(state, action) => {
            state.globalFilter=action.payload;
        }
    }
});

const { reducer: filterListReducer, actions } = filterListSlice;
const { settingGlobalFilter,listReceved } = actions;

export const setGlobalFilter =() => async (dispatch)=>{
    dispatch(settingGlobalFilter(localStorageService.getGlobalFilter()));
};


export const getFilterlistBay = () => (state) => state.filterList.listBay;
export const getFilterlistPrice = () => (state) => state.filterList.listPrice;
export const getGlobalFilter = () => (state) => state.filterList.globalFilter;

export default filterListReducer;