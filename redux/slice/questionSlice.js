import { createSlice } from '@reduxjs/toolkit';

const questionSlice = createSlice({
    name: 'question',
    initialState: {
        allQuestions: [],
        questionDetail: {},
    },
    reducers: {
        setAllQuestions: (state, action) => {
            state.allQuestions = action.payload;
        },
        addQuestion: (state, action) => {
            state.allQuestions = [action.payload, ...state.allQuestions];
        },
        setQuestionDetail: (state, action) => {
            state.questionDetail = action.payload;
        },
    },
});

const { reducer, actions } = questionSlice;

export const { setAllQuestions, addQuestion, setQuestionDetail } = actions;

export default reducer;
