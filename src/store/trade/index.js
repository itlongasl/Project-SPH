// 订单模块
// 引入请求数据函数
import { reqTrade, reqUserAddressList } from "@/api"

const state = {
    tradeInfo: {},
    address: []
}
const actions = {
    async getUserAddressList({ commit }) {
        let result = await reqUserAddressList()
        let { data } = result
        if (data.code == 200) {
            commit('GETUSERADDRESSLIST', data.data)
        }
    },
    async getTrade({ commit }) {
        let result = await reqTrade()
        let { data } = result
        if (data.code == 200) {
            commit('GETTRADE', data.data)
        }
    }
}
const mutations = {
    GETTRADE(state, tradeInfo) {
        state.tradeInfo = tradeInfo
    },
    GETUSERADDRESSLIST(state, address) {
        state.address = address
    }
}
const getters = {}

export default {
    state,
    actions,
    mutations,
    getters
}