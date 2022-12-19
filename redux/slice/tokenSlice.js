import { createSlice } from '@reduxjs/toolkit';

const tokenSlice = createSlice({
    name: 'token',
    initialState: {
        accessToken: null,
    },
    reducers: {
        setTokenRedux: (state, action) => {
            state.accessToken = action.payload;
        },
    },
});

const { reducer, actions } = tokenSlice;
export const { setTokenRedux } = actions;
export default reducer;
