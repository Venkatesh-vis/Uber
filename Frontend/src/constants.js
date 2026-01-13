export const isAuthenticated = () => {
    return Boolean(localStorage.getItem("token"));
};


export const isAdmin = () => {
    return Boolean(localStorage.getItem("Admin"));
};