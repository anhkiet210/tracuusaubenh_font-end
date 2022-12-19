import { post } from '../utils/request';

export const handleRegister = async (user) => {
    try {
        const res = await post('/api/users/register', user);
        return res;
    } catch (error) {
        // console.log(error.code);
        return error;
    }
};

export const handleLogin = async (user) => {
    try {
        const res = await post('/api/users/login', user);
        return res;
    } catch (error) {
        // console.log(error.code);
        return error;
    }
};
