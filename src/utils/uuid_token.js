import { v4 as uuidv4 } from 'uuid'
// 生成一个游客身份id且不能变化，id持久存储
export const getUUID = () => {
    // 先从本地存储获取uuid看有没有
    let uuid_token = localStorage.getItem('UUIDTOKEN')
        // 如果没有则执行if
    if (!uuid_token) {
        // 使用uuid插件生成游客id
        uuid_token = uuidv4();
        // 并且存到本地存储
        localStorage.setItem('UUIDTOKEN', uuid_token)
    }
    return uuid_token
}