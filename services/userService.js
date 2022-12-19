import { get, put } from '../utils/request';

export const getUserInfo = async () => {
    try {
        const res = await get('/api/users/get-info-user');
        return res;
    } catch (error) {
        // console.log(error);
        return error;
    }
};

export const changePassword = async (info) => {
    try {
        const res = await put('/api/users/change-password', info);
        return res;
    } catch (error) {
        return error;
    }
};

export const UpdateInfo = async (info) => {
    try {
        const res = await put('/api/users/update-info', info);
        return res;
    } catch (error) {
        return error;
    }
};

export const changeAvatar = async (info) => {
    try {
        const res = await put('/api/users/change-avatar', info);
        return res;
    } catch (error) {
        return error;
    }
};
