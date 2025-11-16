const TOKEN_KEY = 'auth_token'
const USER_KEY = 'auth_user'

// ===== TOKEN =====
export const getToken = () => localStorage.getItem(TOKEN_KEY)
export const setToken = (val) => localStorage.setItem(TOKEN_KEY, val)
export const clearToken = () => localStorage.removeItem(TOKEN_KEY)

// ===== USER =====
export const getUser = () => {
    const raw = localStorage.getItem(USER_KEY)
    return raw ? JSON.parse(raw) : null
}

export const setUser = (userObj) => {
    localStorage.setItem(USER_KEY, JSON.stringify(userObj))
}

export const clearUser = () => localStorage.removeItem(USER_KEY)
