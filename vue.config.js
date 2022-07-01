module.exports = {
  configureWebpack: {
    // other webpack options to merge in ...
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = '场地预约'
      return args
    })
  },

  // devServer Options don't belong into `configureWebpack`
  publicPath: './',
  devServer: {
    // public: '192.1.2.110:4399',
    // hot: true,
    // disableHostCheck: true,
    // proxy: {
    //   '/api': {
    //     // 这个aaa 要与 axios.js 文件中的 baseURL 值对应
    //     target: 'http://www.paytunnel.cn/venueReservationServerRH', // 你接口的域名
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/api': '',
    //     },
    //   },
    // },
  },
  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        // lessOptions: {
        modifyVars: {
          // 直接覆盖变量
          // '@skeleton-row-height': '5rem',
          // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
          // hack: `true; @import "your-less-file-path.less";`,
          hack: 'true; @import "/src/assets/style/myvant.less"',
        },
        // },
      },
    },
  },
}
