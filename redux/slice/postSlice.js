import { createSlice } from '@reduxjs/toolkit';

const postSlice = createSlice({
    name: 'post',
    initialState: {
        myPosts: [],
        myPostPending: [],
        myPostDenied: [],
        allPosts: [],
        postManyViews: [],
        postDetail: null,
        notePost: '',
    },
    reducers: {
        setMyPosts: (state, action) => {
            state.myPosts = action.payload;
        },
        setMyPostPending: (state, action) => {
            state.myPostPending = action.payload;
        },
        setMyPostDenied: (state, action) => {
            state.myPostDenied = action.payload;
        },
        setAllPosts: (state, action) => {
            state.allPosts = action.payload;
        },
        addPost: (state, action) => {
            state.allPosts = [action.payload, ...state.allPosts];
        },
        setNotePost: (state, action) => {
            state.notePost = action.payload;
        },
        setPostManyViews: (state, action) => {
            state.postManyViews = action.payload;
        },
        setPostDetail: (state, action) => {
            state.postDetail = action.payload;
        },
        deleteMyPost: (state, action) => {
            state.myPosts = state.myPosts.filter((item) => item._id !== action.payload);
        },
        deleteMyPostPending: (state, action) => {
            state.myPostPending = state.myPostPending.filter((item) => item._id !== action.payload);
        },
        deleteMyPostDenied: (state, action) => {
            state.myPostDenied = state.myPostDenied.filter((item) => item._id !== action.payload);
        },
    },
});

const { reducer, actions } = postSlice;

export const {
    setMyPostPending,
    setMyPosts,
    setAllPosts,
    addPost,
    setPostManyViews,
    setPostDetail,
    deleteMyPost,
    setMyPostDenied,
    deleteMyPostPending,
    deleteMyPostDenied,
    setNotePost,
} = actions;

export default reducer;
