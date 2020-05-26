    // vue.config.js
    module.exports = {
        configureWebpack: {
            devServer: {
                proxy: {
                    "/api": {
                        target: "http://120.77.242.209",
                        changeOrigin: true,
                        pathRewrite: { "^/api": "" }
                    },
                   
                }
            }
        }
    }