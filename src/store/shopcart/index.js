// shopcart模块
// 引入请求数据函数
import { reqCartList, reqDeleteCart, reqCheckCart } from '@/api'

//state 存放数据的地方
const state = {
    cartList: []
}

//actions 书写逻辑，处理异步
const actions = {
    // 获取购物车数据的actions
    async getCartList({ commit }) {
        let result = await reqCartList();
        let { data } = result
        if (data.code == 200) {
            commit('GETCARTLIST', data.data)
        }
    },
    // 删除商品actions
    async deleteCart({ commit }, skuId) {
        let result = await reqDeleteCart(skuId)
        let { data } = result //result里面还有一个data，这里把需要的data解构出来
        if (data.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 修改商品选中状态actions
    async checkCart({ commit }, { skuId, isChecked }) {
        let result = await reqCheckCart(skuId, isChecked)
        let { data } = result //result里面还有一个data，这里把需要的data解构出来
        if (data.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    updateAllCartChecked({ dispatch, state }, isChecked) {
        let promiseAll = []
            // 遍历数组
        state.cartList[0].cartInfoList.forEach(item => {
            // 将所有商品的选中状态变成和全选框一致
            // 返回一个Promise对象
            let promise = dispatch('checkCart', { skuId: item.skuId, isChecked })
                // 将每一个Promise对象追加到promiseAll数组里
            promiseAll.push(promise)
        });
        // Promise.all：里面存的每一项都是promise对象，如果有一个promise对象失败则返回失败，只有全部promise对象全部执行成功时才会返回成功
        return Promise.all(promiseAll)
    }
}

//mutations 修改state数据的唯一途径
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
    }
}

//getters 其作用与计算属性相似，用来简化state(仓库)里面的数据，让组件获取数据更加便捷
const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}