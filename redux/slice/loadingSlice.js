import { createSlice } from '@reduxjs/toolkit';

const loadingSlice = createSlice({
    name: 'loading',
    initialState: {
        loading: false,
        loadingLoadMore: false,
        loadingDetail: false,
        loadingAvatar: false,
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setLoadingLoadMore: (state, action) => {
            state.loadingLoadMore = action.payload;
        },
        setLoadingDetail: (state, action) => {
            state.loadingDetail = action.payload;
        },
        setLoadingAvatar: (state, action) => {
            state.loadingAvatar = action.payload;
        },
    },
});

const { reducer, actions } = loadingSlice;

export const { setLoading, setLoadingLoadMore, setLoadingDetail, setLoadingAvatar } = actions;

export default reducer;
