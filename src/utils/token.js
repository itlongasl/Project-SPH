// 对外暴露函数

// 本地存储token
export const setToken = (token) => {
    localStorage.setItem('TOKEN', token)
}

// 本地获取token
export const getToken = () => {
    return localStorage.getItem('TOKEN')
}

//清楚用户本地存储token
export const removeToken = () => {
    localStorage.removeItem('TOKEN')
}