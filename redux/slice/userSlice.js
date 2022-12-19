import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: null,
        infoLogin: null,
    },
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        },
        setInfoLogin: (state, action) => {
            state.infoLogin = action.payload;
        },
    },
});

const { reducer, actions } = userSlice;
export const { setCurrentUser, setInfoLogin } = actions;
export default reducer;
