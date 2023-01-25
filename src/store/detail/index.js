// detail模块
// 引入请求数据函数
import { reqGoodsList, reqAddOrUpdateShopCart } from '@/api'
// 封装一个生成随机id（uuid）的函数
import { getUUID } from '@/utils/uuid_token'
//state 存放数据的地方
const state = {
    goodsList: {},
    // 游客临时身份
    uuid_token: getUUID()
}

//actions 书写逻辑，处理异步
const actions = {
    // 获取商品信息
    async getGoodsList({ commit }, skuId) {
        let result = await reqGoodsList(skuId)
        let { data } = result //result里面还有一个data，这里把需要的data解构出来
        if (data.code == 200) {
            commit('GETGOODSLIST', data.data)
        }
    },
    // 将商品添加购物车
    // 这里不需要派发commit，也不需要存储数据 因为这里只是将商品信息存到服务器里，服务器并没有返回数据，只返回code==200，代表存储成功
    async getAddToCart({ commit }, { skuId, skuNum }) {
        let result = await reqAddOrUpdateShopCart(skuId, skuNum)
        let { data } = result //result里面还有一个data，这里把需要的data解构出来
        if (data.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    }
}

//mutations 修改state数据的唯一途径
const mutations = {
    GETGOODSLIST(state, goodsList) {
        return state.goodsList = goodsList
    }
}

//getters 其作用与计算属性相似，用来简化state(仓库)里面的数据，让组件获取数据更加便捷
const getters = {
    // 简化路径导航数据
    categoryView(state) {
        return state.goodsList.categoryView || {}
    },
    // 简化产品信息数据
    skuInfo(state) {
        return state.goodsList.skuInfo || {}
    },
    // 产品售卖属性简化
    spuSaleAttrList(state) {
        return state.goodsList.spuSaleAttrList || []
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}