import axios from 'axios'

import nprogress from 'nprogress' // nprogress进度条： nprogress.start 开始 nprogress.done 结束
import 'nprogress/nprogress.css'

//利用axios的create方法创建一个axios的实例
//现在mockInstance就是axios，只不过稍微配置一下
const mockInstance = axios.create({
    //配置对象
    //基础路径，发请求的时候，路径自带/api
    baseURL: "/mock",
    // 代表请求超时的时间5s
    timeout: 5000
});

// 请求拦截器 在请求发送出去之前会被检测到 可以写一些相关的逻辑
mockInstance.interceptors.request.use(function(config) {
    //config 配置对象 ，里面有一个属性很重要 header请求头
    nprogress.start() //进度条开始
    return config;
}, function(error) {
    return Promise.reject(error);
});

// 响应拦截器
mockInstance.interceptors.response.use(function(response) {
    //响应成功的回调函数 服务器响应数据回来会被检测到，这里可以写一些逻辑
    nprogress.done() //进度条结束
    return response;
}, function(error) {
    //响应失败的回调函数
    return Promise.reject(error);
});

export default mockInstance