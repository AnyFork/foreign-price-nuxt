export default {
  server: {
    port: 9000,
    host: '127.0.0.1'
  },
  target: 'server',
  //mode属性已经过期，使用ssr:true表示universal支持ssr,使用ssr:false表示spa,不支持ssr
  ssr: true,
  //页面loading配置
  loading: {
    color: '#1d953f',
    height: '1px'
  },
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1' },
      { hid: 'keywords', name: 'keywords', content: '汇率,外汇牌价,美元,人民币' },
      { hid: 'description', name: 'description', content: '美元对人民币汇率网为您提供今日美金,欧元,日元,港币等世界各国上百种主要兑换货币的外汇牌价,汇率换算工具和查询服务、实时汇率表走势即时资讯。' },
      { hid: 'copyright', name: 'copyright', content: '人民币汇率网，http://www.cnyrate.com/' },
      { 'http-equiv': 'Cache-Control', content: 'no-transform' },
      { 'http-equiv': 'Cache-Control', content: 'no-siteapp' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  router: {
    extendRoutes(routes) {
      routes.forEach((item) => {
        if (item.path != '/') {
          item.path = item.path + '.html'
        }
      })
    }
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['ant-design-vue/dist/antd.css', './assets/css/global.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/antd-ui', '@/plugins/axios'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    { path: '~/components', prefix: '', extensions: ['vue'] },
    { path: '~/components/Layouts/', prefix: '', extensions: ['vue'] },
    { path: '~/components/LinkItem/', prefix: '', extensions: ['vue'] },
    { path: '~/components/RateItem/', prefix: '', extensions: ['vue'] }
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxtjs/style-resources'],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/axios', '@nuxtjs/proxy'],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true,
    prefix: '/api',
    progress: true,
    //开发模式下开启debug
    debug: process.env.NODE_ENV == 'production' ? false : true,
    withCredentials: true
  },
  proxy: {
    '/api': {
      target: 'https://route.showapi.com/',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/'
      }
    }
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    //为防止重复打包
    vendor: ['axios'],
    //将css文件合并成一个文件
    extractCSS: true,
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(css|vue)$/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    }
  },
  styleResources: {
    less: ['~/assets/css/variable.less']
  }
}
