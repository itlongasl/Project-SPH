//search模块
// 引入请求数据函数
import { reqSearchInfo } from '@/api'
//state 存放数据的地方
const state = {
    searchList: {}
}

//actions 书写逻辑，处理异步
const actions = {
    //默认形参：当没有传入参数，params默认为空对象
    async getSearchList({ commit }, params = {}) {
        let result = await reqSearchInfo(params)
        if (result.data.code == 200) {
            commit('GETSEARCHLIST', result.data.data)
        }
    }
}

//mutations 修改state数据的唯一途径
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList
    }
}

//getters 其作用与计算属性相似，用来简化state(仓库)里面的数据，让组件获取数据更加便捷
const getters = {
    goodsList(state) {
        //当没有网络请求不到数据的情况下返回空数组[]
        return state.searchList.goodsList || []
    },
    attrsList(state) {
        //当没有网络请求不到数据的情况下返回空数组[]
        return state.searchList.attrsList || []
    },
    trademarkList(state) {
        //当没有网络请求不到数据的情况下返回空数组[]
        return state.searchList.trademarkList || []
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}