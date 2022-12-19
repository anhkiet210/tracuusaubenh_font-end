import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        showFormCreatePost: false,
        showFormLogin: false,
        showPass: false,
        showNote: false,
        showFormChangeAvatar: false,
        showSelectCrop: false,
        showSelectLa: false,
        showSelectThan: false,
        showSelectRe: false,
    },
    reducers: {
        setShowFormCreatePost: (state, action) => {
            state.showFormCreatePost = action.payload;
        },
        setShowFormLogin: (state, action) => {
            state.showFormLogin = action.payload;
        },
        setShowPass: (state, action) => {
            state.showPass = action.payload;
        },
        setShowNote: (state, action) => {
            state.showNote = action.payload;
        },
        setShowFormChangeAvatar: (state, action) => {
            state.showFormChangeAvatar = action.payload;
        },
        setShowSelectCrop: (state, action) => {
            state.showSelectCrop = action.payload;
        },
        setShowSelectLa: (state, action) => {
            state.showSelectLa = action.payload;
        },
        setShowSelectThan: (state, action) => {
            state.showSelectThan = action.payload;
        },
        setShowSelectRe: (state, action) => {
            state.showSelectRe = action.payload;
        },
    },
});

const { reducer, actions } = modalSlice;
export const {
    setShowFormCreatePost,
    setShowFormLogin,
    setShowPass,
    setShowNote,
    setShowFormChangeAvatar,
    setShowSelectCrop,
    setShowSelectLa,
    setShowSelectThan,
    setShowSelectRe,
} = actions;
export default reducer;
