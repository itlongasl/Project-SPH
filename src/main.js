import Vue from 'vue'
import App from './App.vue'
// 引入插件
import VueLazyload from 'vue-lazyload'

// or with options
// const loadimage = require('@/assets/1.gif')
import loadimage from '@/assets/1.gif'

// const errorimage = require('./assets/error.gif')

Vue.use(VueLazyload, {
    // preLoad: 1.3,
    // error: errorimage,
    loading: loadimage,
    // attempt: 1
})

// 注册全局组件 --- 三级联动
import TypeNav from '@/components/TypeNav'
// 注册全局组件 --- 轮播图
import Carousel from '@/components/Carousel'
// 注册全局组件 --- 分页器
import Pagination from '@/components/Pagination'
// 第一个参数为组件的name ，第二个组件指哪一个组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)

// 引入vuex仓库
import store from '@/store'

// 引入mockServer.js---mock数据
import '@/mock/mockServer'

// 引入swiper样式
import 'swiper/css/swiper.css'

// 统一引入所有api接口
import * as API from '@/api'
//*代表全部引入，并命名为API

// 按需引入element-ui
import { MessageBox } from 'element-ui'

// element-ui的第二种注册方法：挂载在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

import '@/plugins/validate'

Vue.config.productionTip = false

//引入路由router
import router from '@/router'
new Vue({
    render: h => h(App),
    // 注册仓库vuex 此时所有组件身上多了$store属性
    store,
    // 注册路由router 此时所有组件身上多了$route与$router属性
    router,
    beforeCreate() {
        Vue.prototype.$bus = this //安装全局事件总线，$bus就是当前应用的vm
        Vue.prototype.$API = API //将所有api接口全部挂在到Vue原型身上,这样所有组件都能直接使用所有api，不需要一个个引入
    },
}).$mount('#app')