import { configureStore, isPending } from '@reduxjs/toolkit';
import postSlice from './slice/postSlice';
import loadingSlice from './slice/loadingSlice';
import modalSlice from './slice/modalSlice';
import tokenSlice from './slice/tokenSlice';
import userSlice from './slice/userSlice';
import pestSlice from './slice/pestSlice';
import questionSlice from './slice/questionSlice';
import answerSlice from './slice/answerSlice';

const rootReducer = {
    post: postSlice,
    loading: loadingSlice,
    modal: modalSlice,
    token: tokenSlice,
    user: userSlice,
    pest: pestSlice,
    question: questionSlice,
    answer: answerSlice,
};

const store = configureStore({
    reducer: rootReducer,
});

export default store;
