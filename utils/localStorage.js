export const setItem = (name, value) => {
    localStorage.setItem(name, value);
};

export const getItem = (name) => {
    if (typeof window !== 'undefined') {
        // return localStorage.getItem(name);
    }
};
