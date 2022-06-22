export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '川崎市 ゴミ分別情報',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/icon.png' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    'plugins/axios'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'bootstrap-vue/nuxt',
    '@nuxtjs/auth'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    // baseURLは環境変数 API_URLで上書き
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    ////応急処置
    // babel: {
    //   babelrc: false,
    //   compact: false
    // },
    // extend(config) {
    //   config.performance.maxAssetSize = 800000;
    // }
  },

  auth: {
    redirect: {
      login: '/login',   // 未ログイン時に認証が必要なページにアクセスした際のリダイレクトURL
      logout: '/',  // ログアウト時のリダイレクトURL
      callback: '/callback',   // Oauth認証等で必要となる コールバックルート
      home: '/admin',         // ログイン後のリダイレクトURL
    },
    strategies: {
      local: {
        endpoints: {
          login: { url: '/api/v1/login', method: 'post', propertyName: 'jwt' },
          user: false,
          logout: false
        }
      },
    }
  },

  // ローディング画面用
  loading: './components/loading.vue'
  
}
