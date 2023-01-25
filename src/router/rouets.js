//引入路由组件
//一级路由
// import Home from '@/pages/Home'
// import Login from '@/pages/Login'
// import Register from '@/pages/Register'
// import Search from '@/pages/Search'
// import Detail from '@/pages/Detail'
// import AddCartSuccess from '@/pages/AddCartSuccess'
// import ShopCart from '@/pages/ShopCart'
// import Trade from '@/pages/Trade'
// import Pay from '@/pages/Pay'
// import PaySuccess from '@/pages/PaySuccess'
// import Center from '@/pages/Center'
// // 二级路由
// import MyOrder from '@/pages/Center/MyOrder'
// import GroupOrder from '@/pages/Center/GroupOrder'
export default [{
        name: 'home',
        path: "/home",
        // 不直接在上面引入组件了，而是当访问该路由时调用箭头函数引入组件，这就是路由懒加载
        //好处：没有访问该路由时不引入组件，让代码更高效
        component: () =>
            import ('@/pages/Home'),
        meta: { isShow: true }
    },
    {
        path: "/login",
        component: () =>
            import ('@/pages/Login'),

    },
    {
        path: "/register",
        component: () =>
            import ('@/pages/Register'),
    },
    {
        name: 'search',
        // 如何指定params参数可传可不传？
        path: "/search/:keyword?", //使用params传递参数时这里需要占位，当我们不知道会不会有参数传进来的时候，在占位后面加个问号表示参数可传可不传
        component: () =>
            import ('@/pages/Search'),
        meta: { isShow: true },
        /* 路由能否使用props传参？  可以
        使用props传参的第一种写法 布尔值写法
        props:true
        使用props传参的第二种写法 对象写法
        props: { a: 1, b: 2 }
        使用props传参的第三种写法 函数写法
        props: ($route) => {
            return { keyword: $route.params.keyword, k: $route.query.k }
        } */
    },
    {
        //需要传参，点击某个商品传入该商品的id，这里提前占位
        path: '/detail/:skuId?',
        component: () =>
            import ('@/pages/Detail'),
        meta: { isShow: true },
    },
    {
        name: 'addcartsuccess',
        path: '/addcartsuccess',
        component: () =>
            import ('@/pages/AddCartSuccess'),
        meta: { isShow: true },
    },
    {
        name: 'shopcart',
        path: '/shopcart',
        component: () =>
            import ('@/pages/ShopCart'),
        meta: { isShow: true },
    },
    {
        name: 'trade',
        path: '/trade',
        component: () =>
            import ('@/pages/Trade'),
        meta: { isShow: true },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            // 只有在购物车的时候才能正常跳转交易
            if (from.path == '/shopcart') {
                next();
            } else {
                // 如果不是在购物车访问交易页面，中断跳转
                next(false)
            }
        }
    },
    {
        name: 'pay',
        path: '/pay',
        component: () =>
            import ('@/pages/Pay'),
        meta: { isShow: true },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            // 只有在交易页提交订单才能支付
            if (from.path == '/trade') {
                next();
            } else {
                next(false)
            }
        }
    },
    {
        name: 'paysuccess',
        path: '/paysuccess',
        component: () =>
            import ('@/pages/PaySuccess'),
        meta: { isShow: true },
    },
    {
        name: 'center',
        path: '/center',
        component: () =>
            import ('@/pages/Center'),
        meta: { isShow: true },
        children: [{
                name: 'myorder',
                path: 'myorder',
                component: () =>
                    import ('@/pages/Center/MyOrder'),
            },
            {
                path: 'grouporder',
                component: () =>
                    import ('@/pages/Center/GroupOrder'),
            },
            {
                path: '/center',
                redirect: { name: 'myorder' }
            },
        ]
    },
    {
        // 路由重定向，当访问路径为 / 时，立马定向到home（首页）路径
        path: "/",
        redirect: { name: 'home' },
        meta: { isShow: true },
    },
]