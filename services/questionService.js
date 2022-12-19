import { get, post } from '../utils/request';

export const getAllQuestion = async () => {
    try {
        const res = await get('/api/question');
        return res;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const getQuestionById = async (id) => {
    try {
        const res = await get(`api/question/${id}`);
        return res;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const CreateQueston = async (data) => {
    try {
        const res = await post('/api/question/create', data);
        return res;
    } catch (error) {
        console.log(error);
        return error;
    }
};
