import { createSlice } from "@reduxjs/toolkit";
import CommentService from "../services/comment.service";
import UserService from "../services/user.service";

const initialState = {
        entities: null,
        usersComment:null,
        isLoading: false,
        error: null,
        dataLoaded: false
    };

const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
        commentRequested: (state) => {
            state.isLoading = true;
            state.dataLoaded = false;
            state.usersComment = null;
        },
        commentReceved: (state, action) => {
            state.entities.push(action.payload);
            state.dataLoaded = true;
            state.isLoading = false;
        },
        commentsReceved: (state, action) => {
            state.entities = action.payload;
            state.dataLoaded = true;
            state.isLoading = false;
        },
        usersCommentReceved: (state, action) => {
            state.usersComment = action.payload;
            state.dataLoaded = true;
            state.isLoading = false;
        },
        commentRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
    }
});

const { reducer: commentReducer, actions } = commentSlice;
const { commentReceved, usersCommentReceved,commentRequestFiled,commentRequested, commentsReceved } = actions;

export const commentCreate =(data) => async (dispatch)=>{
        dispatch(commentRequested());
        try {
            const { content } = await CommentService.create(data);
            dispatch(commentReceved(content))
        } catch (error) {
            dispatch(commentRequestFiled(error.message));
        }
};

export const loadCommentByProduct=(product_id)=>async (dispatch)=>{
    dispatch(commentRequested());
    try {
        const { content } = await CommentService.getProduct(product_id);
        dispatch(commentsReceved(content));
        const userArrayDub = content.map((l)=> l.user_id );
        const userArray = Array.from(new Set(userArrayDub)); //без дубликатов
        const data = await UserService.postArray(userArray);
        dispatch(usersCommentReceved(data.content))

    } catch (error) {
        dispatch(commentRequestFiled(error.message));
    }
}

export const getCommentIsLoading = () => (state) => state.comment.isLoading;
export const getComment = () => (state) => state.comment.entities;
export const getCommentsUsers = () => (state) => state.comment.usersComment;
export const getCommentDataLoaded = () => (state) => state.comment.dataLoaded;
export const getCommentError = () => (state) => state.comment.error;

export default commentReducer;