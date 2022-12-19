import { createSlice } from '@reduxjs/toolkit';

const pestSlice = createSlice({
    name: 'pest',
    initialState: {
        la: [],
        than: [],
        re: [],
        allPests: [],
        detectPest: {},
    },
    reducers: {
        setAllPests: (state, action) => {
            const temp = action.payload;
            state.allPests = temp;
            let arrLa = [];
            let arrThan = [];
            let arrRe = [];
            for (let i of temp) {
                const { la, than, re } = i.pest.trieuchungnhandang;

                arrLa.push(la);
                arrThan.push(than);
                arrRe.push(re);
            }

            arrLa = arrLa.filter((item) => item !== '' && item !== undefined && item !== 'không có');
            arrLa = Array.from(new Set(arrLa));

            arrThan = arrThan.filter((item) => item !== '' && item !== undefined && item !== 'không có');
            arrThan = Array.from(new Set(arrThan));

            arrRe = arrRe.filter((item) => item !== '' && item !== undefined && item !== 'không có');
            arrRe = Array.from(new Set(arrRe));

            state.la = arrLa;
            state.than = arrThan;
            state.re = arrRe;
        },
        detectPestRedux: (state, action) => {
            state.detectPest = action.payload;
        },
    },
});

const { reducer, actions } = pestSlice;

export const { setAllPests, detectPestRedux } = actions;

export default reducer;
