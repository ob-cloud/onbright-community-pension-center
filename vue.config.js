const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const isDeployState = ['production', 'development', 'test'].includes(process.env.NODE_ENV)

// vue.config.js
module.exports = {
  publicPath: isDeployState ? './' : '/',
  /*
    Vue-cli3:
    Crashed when using Webpack `import()` #2463
    https://github.com/vuejs/vue-cli/issues/2463
   */
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false,
  configureWebpack: config => {
    //生产环境取消 console.log
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@$', resolve('src'))
      .set('@api', resolve('src/api'))
      .set('@assets', resolve('src/assets'))
      .set('@components', resolve('src/components'))
      .set('@views', resolve('src/views'))
      .set('@layout', resolve('src/components/Layouts'))
      .set('@static', resolve('src/static'))
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          /* less 变量覆盖，用于自定义 ant design 主题 */

          /*
          'primary-color': '#F5222D',
          'link-color': '#F5222D',
          'border-radius-base': '4px',
          */
        },
        javascriptEnabled: true,
      }
    }
  },

  devServer: {
    port: 3001,
    proxy: {
      '/pro/cpc': { // 中台接口
        target: 'https://aliiot.on-bright.com/mock/42', //mock API接口系统
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/pro/cpc': '/cpc'  //默认所有请求都加了/pro前缀，需要去掉
        }
      },
     '/pro': { // 系统基础接口
        target: 'https://aliiot.on-bright.com/mock/13/pro', //mock API接口系统
        // target: 'http://192.168.200.125:8082/nurse',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '/pro': ''  //默认所有请求都加了/pro前缀，需要去掉
        }
      },
      '/nurse1': {
        target: 'http://192.168.200.241/nurse',
        // target: 'https://aliiot.on-bright.com/nurse',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '/nurse': ''  //默认所有请求都加了/pro前缀，需要去掉
        }
      },
    }
  },

  lintOnSave: true
}
