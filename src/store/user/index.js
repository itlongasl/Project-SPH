// 登录 - 注册 模块
// 引入请求数据函数
import { reqGetCode, reqUserRegister, reqUserLogin, reqGetUserInfo, reqLogout } from "@/api"
// 此函数用于本地存储token
import { setToken, getToken, removeToken } from '@/utils/token'

//state 存放数据的地方
const state = {
    code: '',
    token: getToken(),
    userInfo: {}
}

//actions 书写逻辑，处理异步
const actions = {
    // 获取验证码actions
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone)
        let { data } = result
        if (data.code == 200) {
            commit('GETCODE', data.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 注册用户actions
    async userRegister({ commit }, user) {
        let result = await reqUserRegister(user)
        let { data } = result
        if (data.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 登录业务
    async userLogin({ commit }, user) {
        let result = await reqUserLogin(user)
        let { data } = result
        if (data.code == 200) {
            // 成功登录并成功获取用户token
            commit('USERLOGIN', data.data.token)

            // 并且存储到本地存储，因为vuex仓库数据存储不是持久化，刷新用户数据就没了
            setToken(data.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 获取用户信息
    async getUserInfo({ commit }) {
        let result = await reqGetUserInfo()
        let { data } = result
        if (data.code == 200) {
            commit('GETUSERINFO', data.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 退出登录
    async userLogout({ commit }) {
        let result = await reqLogout()
        let { data } = result
        if (data.code == 200) {
            // 通过mutation删除state里面相关的用户信息及用户token
            commit('CLEAR')
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    }
}

//mutations 修改state数据的唯一途径
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    USERLOGIN(state, token) {
        state.token = token
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    CLEAR(state) {
        state.token = ''
        state.userInfo = ''
        removeToken()
    }
}

//getters 其作用与计算属性相似，用来简化state(仓库)里面的数据，让组件获取数据更加便捷
const getters = {}

export default {
    state,
    actions,
    mutations,
    getters
}