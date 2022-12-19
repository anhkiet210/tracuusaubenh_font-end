import { createSlice } from '@reduxjs/toolkit';

const answerSlice = createSlice({
    name: 'answer',
    initialState: {
        allAnsers: [],
    },
    reducers: {
        setAllAnswers: (state, action) => {
            state.allAnsers = action.payload;
        },
        addAnswer: (state, action) => {
            state.allAnsers = [action.payload, ...state.allAnsers];
        },
    },
});

const { reducer, actions } = answerSlice;

export const { setAllAnswers, addAnswer } = actions;

export default reducer;
