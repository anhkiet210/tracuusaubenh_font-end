import { get, post } from '../utils/request';
export const getAnswerByIdQuestion = async (id) => {
    try {
        const res = await get(`/api/answer/get-answer-by-id-question/${id}`);
        return res;
    } catch (error) {
        // console.log(error);
        return error;
    }
};

export const createAnswer = async (data) => {
    try {
        const res = await post('/api/answer/create', data);
        return res;
    } catch (error) {
        // console.log(error);
        return error;
    }
};
