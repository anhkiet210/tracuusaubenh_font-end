import { get } from '../utils/request';

export const getAllCrops = async () => {
    try {
        const res = await get('/api/crop');
        return res;
    } catch (error) {
        // console.log(error);
        return error.response.data;
    }
};
