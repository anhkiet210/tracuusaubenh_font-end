import { get, post } from '../utils/request';

export const getAllPest = async () => {
    try {
        const res = await get('/api/pest');
        return res;
    } catch (error) {
        // console.log(error);
        return error;
    }
};

export const detectPest = async (data) => {
    try {
        const res = await post('/api/pest/detect-pest', data);
        return res;
    } catch (error) {
        console.log(error);
        return error;
    }
};
