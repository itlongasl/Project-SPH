// 统一管理项目接口的模块
// 引入二次封装的axios（带有请求、响应拦截器）
import instance from './request'
import mockInstance from './mockRequest'

// 三级菜单的请求地址  /api/product/getBaseCategoryList   GET请求  没有任何参数
export const reqCategoryList = () => {
    return instance({ url: 'product/getBaseCategoryList', method: 'get' })
}

// Banner轮播图请求地址 /mock/banner  模拟数据  GET请求  没有参数
export const reqBannerList = () => {
    return mockInstance({ url: '/banner', method: 'get' })
}

// Floor楼层请求地址 /mock/floor  模拟数据  GET请求  没有参数
export const reqFloorList = () => {
    return mockInstance({ url: '/floor', method: 'get' })
}

//Search模块请求地址 /api/list  POST请求  需携带参数  (给服务器传递的参数params至少是一个空对象)
export const reqSearchInfo = (params) => {
    return instance({ url: '/list', method: 'post', data: params })
}

//商品详情请求地址 /api/item/{ skuId }  GET请求  携带商品的id
export const reqGoodsList = (skuId) => {
    return instance({ url: `/item/${skuId}`, method: 'get' })
}

// 将商品添加到购物车中 请求地址 /api/cart/addToCart/{ skuId }/{ skuNum } POST请求  传递商品的id及商品数量
export const reqAddOrUpdateShopCart = (skuId, skuNum) => {
    return instance({ url: `/cart/addToCart/${ skuId }/${ skuNum }`, method: 'post' })
}

//获取购物车数据请求地址 /api/cart/cartList  GET请求  无携带参数
export const reqCartList = () => {
    return instance({ url: '/cart/cartList', method: 'get' })
}

// 删除购物车商品请求地址 /api/cart/deleteCart/{skuId}  DELETE请求  携带商品Id
export const reqDeleteCart = (skuId) => {
    return instance({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })
}

// 切换商品选中状态请求地址 /api/cart/checkCart/{skuID}/{isChecked}  GET请求  携带商品Id 与 isChecked：商品选中状态 0代表取消选中 1代表选中
export const reqCheckCart = (skuId, isChecked) => {
    return instance({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' })
}

//表单获取验证码请求地址 /api/user/passport/sendCode/{phone}  GET请求  携带参数：手机号码
export const reqGetCode = (phone) => {
    return instance({ url: `/user/passport/sendCode/${phone}`, method: 'get' })
}

// 注册用户请求地址 /api/user/passport/register  POST请求  携带参数：phone（手机号） code（验证码） password（密码）
export const reqUserRegister = (data) => {
    return instance({ url: '/user/passport/register', data, method: 'post' })
}

// 用户登录接口请求地址 /api/user/passport/login  POST请求  携带参数：phone（手机号/用户名） password（密码）
export const reqUserLogin = (data) => {
    return instance({ url: '/user/passport/login', data, method: 'post' })
}

// 获取用户信息，需要带用户的token向服务器要用户数据
// 请求地址：/api/user/passport/auth/getUserInfo  GET请求  携带参数：token
export const reqGetUserInfo = () => {
    return instance({ url: '/user/passport/auth/getUserInfo', method: 'get' })
}

// 退出登录请求地址 /api/user/passport/logout  GET请求  无参数
export const reqLogout = () => {
    return instance({ url: '/user/passport/logout', method: 'get' })
}

// 获取用户地址信息 /api/user/userAddress/auth/findUserAddressList  GET请求 无参数
export const reqUserAddressList = () => {
    return instance({ url: '/user/userAddress/auth/findUserAddressList', method: 'get' })
}

//获取订单交易页数据 /api/order/auth/trade GET请求 无参数
export const reqTrade = () => {
    return instance({ url: '/order/auth/trade', method: 'get' })
}

// 提交订单请求地址 /api/order/auth/submitOrder?tradeNo={tradeNo}  POST请求
// traderNo	           string	Y	订单编号(拼接在路径中)
// consignee	       string	Y	收件人姓名
// consigneeTel	       string	Y	收件人电话
// deliveryAddress	   string	Y	收件地址
// paymentWay	       string	Y	支付方式(ONLINE代表在线)   
// orderComment	       string	Y	订单备注
// orderDetailList	   Array	Y	存储多个商品对象的数组
export const reqSubmitOrder = (data, tradeNo) => {
    return instance({ url: `/order/auth/submitOrder?tradeNo=${tradeNo} `, data, method: 'post' })
}

// 获取订单支付信息 /api/payment/weixin/createNative/{orderId}  GET请求
// orderId	string	Y	支付订单ID(通过提交订单得到)
export const reqPayInfo = (orderId) => {
    return instance({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' })
}

//获取订单支付状态 /api/payment/weixin/queryPayStatus/{orderId} GET请求  参数：orderId
export const reqPayStatus = (orderId) => {
    return instance({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' })
}

// 获取我的订单列表 /api/order/auth/{page}/{limit}  GET请求
export const reqMyOrderList = (page, limit) => {
    return instance({ url: `/order/auth/${page}/${limit}`, method: 'get' })
}