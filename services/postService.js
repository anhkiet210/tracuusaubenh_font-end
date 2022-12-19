import { post, get, put, deleteMethod } from '../utils/request';

export const createPost = async (data) => {
    try {
        const res = await post('/api/post/create', data);
        return res;
    } catch (error) {
        return error;
    }
};

export const getAllPosts = async () => {
    try {
        const res = await get('/api/post');
        return res;
    } catch (error) {
        return error;
    }
};

export const getPostDetail = async (id) => {
    try {
        const res = await get(`/api/post/get-post-by-id/${id}`);
        return res;
    } catch (error) {
        return error;
    }
};

export const increaseViews = async (id) => {
    try {
        const res = await put(`/api/post/increase-views/${id}`);
        return res;
    } catch (error) {
        return error;
    }
};

export const getPostManyViews = async () => {
    try {
        const res = await get('/api/post/get-post-many-view');
        return res;
    } catch (error) {
        return error;
    }
};

export const getMyPosts = async () => {
    try {
        const res = await get('/api/post/get-post-by-user');
        return res;
    } catch (error) {
        return error;
    }
};

export const getMyPostPending = async () => {
    try {
        const res = await get('/api/post/get-my-post-pending');
        return res;
    } catch (error) {
        return error;
    }
};

export const getMyPostDenied = async () => {
    try {
        const res = await get('/api/post/get-my-post-denied');
        return res;
    } catch (error) {
        return error;
    }
};

export const deletePostMethod = async (id) => {
    try {
        const res = await deleteMethod(`/api/post/delete/${id}`);
        return res;
    } catch (error) {
        return error;
    }
};
