//home模块
// 引入请求数据函数
import { reqCategoryList, reqBannerList, reqFloorList } from '@/api'
//state 存放数据的地方
const state = {
    // 三级联动菜单数据
    categoryList: [],
    // 首页轮播图数据
    bannerList: [],
    // floor楼层数据
    floorList: []
}

//actions 书写逻辑，处理异步
const actions = {
    async categoryList({ commit }) {
        let result = await reqCategoryList()
        if (result.data.code == 200) {
            commit('CATEGORYLIST', result.data.data)
        }
    },
    // 获取首页轮播图数据
    async getBannerList({ commit }) {
        let result = await reqBannerList()
        if (result.data.code == 200) {
            commit('GETBANNERLIST', result.data.data)
        }
    },
    // 获取floor数据
    async getFloorList({ commit }) {
        let result = await reqFloorList()
        if (result.data.code == 200) {
            commit('GETFLOORLIST', result.data.data)
        }
    }
}

//mutations 修改state数据的唯一途径
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
    },
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList
    },
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList
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