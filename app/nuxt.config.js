module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: ['~assets/css/main.css'],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },

  router: {
    extendRoutes(routes) {
      routes.push({
        name: 'index',
        path: '/',
        component: '~pages/index.vue'
      });
      routes.push({
        name: 'show',
        path: '/bookmark/:id/',
        component: '~pages/show.vue'
      });
      routes.push({
        name: 'notfound',
        path: '*',
        component: '~pages/404.vue'
      });
    }
  },

  generate: {
    dir: '../extension/app'
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
