const KEY = 'auth_token'

export const getToken = () => localStorage.getItem(KEY)
export const setToken = (val) => localStorage.setItem(KEY, val)
export const clearToken = () => localStorage.removeItem(KEY)
