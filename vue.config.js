const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    publicPath: './',
    productionSourceMap: false,
    transpileDependencies: true,
    lintOnSave: false,
    devServer: {
        proxy: {
            '/api': {
                // target: 'http://gmall-h5-api.atguigu.cn',
                // pathRewrite: { '^/api': '' }, //重写路径
                // ws: true, //用于支持websocket
                // changeOrigin: true //用于控制请求头中的host值
            }
        }
    }
})