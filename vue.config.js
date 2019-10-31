const path = require('path')
const entryPath = (appName) => {
  return path.resolve(__dirname, 'src/apps/', appName, 'index.js')
}

module.exports = {
  configureWebpack: config => { // 生产环境取消console
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    }
  },
  pages: {
    index: {
      entry: entryPath('login'),
      template: './public/index.html',
      filename: 'index.html',
      title: '登陆页面'
    },
    home: entryPath('home'),
    system: entryPath('system')
  },
  publicPath: '/',
  productionSourceMap: false,
  css: { // sass全局变量
    loaderOptions: {
      sass: {
        data: `@import "~@/styles/index.scss";`
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.31.249:8080',
        // target: 'http://evidence.zxyinfo.com',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': '/wms'
        }
      }
    }
  }
}
