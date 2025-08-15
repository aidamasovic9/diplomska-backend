// auth.ts (or utils/auth.ts)
export const getToken = (): string | null => {
    return sessionStorage.getItem('token'); // match the key you used in AuthProvider
};
