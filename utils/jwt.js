let inMemoryToken = '';

export const setToken = (token) => {
    inMemoryToken = token;
};

export const getToken = () => inMemoryToken;
