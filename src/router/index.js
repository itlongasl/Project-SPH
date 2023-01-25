//配置路由
import Vue from 'vue'
//引入路由器router
import VueRouter from 'vue-router'
// 引入仓库
import store from '@/store'
//应用插件
Vue.use(VueRouter)

// 引入路由配置规则
import routes from './rouets'

//重写push与replace
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

VueRouter.prototype.push = function(location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => {}, () => {})
    }
}

VueRouter.prototype.replace = function(location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => {}, () => {})
    }
}

// 创建路由器
let router = new VueRouter({
    //配置路由规则
    routes,
    //滚动行为
    scrollBehavior(to, from, savedPosition) {
        // return 期望滚动到哪个的位置
        return { y: 0 }
    },
    mode: 'hash'
})

// 全局守卫：前置守卫（路由跳转前判断）
router.beforeEach(async(to, from, next) => {
    /* to:跳转到哪个路由 
       from：从哪个路由跳转
       next：放行函数  next()放行  next('/home')放行到指定路由  next(false)终止跳转
    */
    // 获取用户token
    let token = store.state.user.token
        // 获取用户名
    let name = store.state.user.userInfo.name
        // 用户已经登陆
    if (token) {
        // 如果登录状态去login（登录页面） 直接跳转到home
        // 因为已经登陆不需要登陆
        if (to.path == '/login') {
            next('/home')
        } else {
            // 登录后去的不是login，判断是否有name
            if (name) {
                // 直接放行
                next()
            } else {
                try {
                    // 没有用户信息
                    //派发actions，获取用户信息
                    await store.dispatch("getUserInfo");
                    // 再放行
                    next()
                } catch (error) {
                    //  获取用户信息失败 -- token失效
                    // 清除token
                    await store.dispatch('userLogout')
                    next('/login')
                }
            }
        }
    } else {
        // 未登录
        let toPath = to.path
        if (toPath == '/trade' || toPath == '/pay' || toPath == '/paysuccess' || toPath == '/center/myorder') {
            next('/login?rediect=' + toPath)
        } else {
            next()
        }
    }
})

export default router