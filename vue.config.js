    // vue.config.js
    module.exports = {
        //调整 webpack 配置最简单的方式就是在 vue.config.js 中的 configureWebpack 选项提供一个对象：
        //该对象将会被 webpack-merge 合并入最终的 webpack 配置。
        configureWebpack: {
            //配置一个devServer 对象
            devServer: {
                //服务器可以通过配置proxy做后台代理
                proxy: {
                    "/api": {
                        target: "http://120.77.242.209",
                        //端口号如果变化就跟着改变
                        changeOrigin: true,
                        //pathRewrite:重写  地址栏上删除掉/api
                        pathRewrite: { "^/api": "" }
                    },
                   
                }
            }
        }
    }