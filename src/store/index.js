import Vue from 'vue'
// 引入vuex
import Vuex from 'vuex'
// 应用插件
Vue.use(Vuex)
    // 引入home与search仓库
import home from './home'
import search from './search'
import detail from './detail'
import shopcart from './shopcart'
import user from './user'
import trade from './trade'

export default new Vuex.Store({
    modules: {
        home,
        search,
        detail,
        shopcart,
        user,
        trade
    }
})