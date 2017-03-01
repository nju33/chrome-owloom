const path = require('path');

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Owloom',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/earlyaccess/notosansjapanese.css'
      },
      {rel: 'icon', type: 'image/png', href: '/app/favicon-32x32.png'},
      {rel: 'icon', type: 'image/png', href: '/app/favicon-16x16.png'}
    ]
    // link: [
    //   {rel: 'icon', type: 'image/png', href: '/app/favicon-32x32.png'}
    // ]
    // link: [
    //   {rel: 'icon', type: 'image/png', href: '/app/favicon-16x16.png'}
    // ]
  },
  /*
  ** Global CSS
  */
  css: ['~assets/css/main.css'],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },

  // router: {
  //   extendRoutes(routes) {
  //     routes.push({
  //       name: 'index',
  //       path: '/',
  //       component: '~pages/index.vue'
  //     });
  //     routes.push({
  //       name: 'show',
  //       path: '/bookmark/:id/',
  //       component: '~pages/show.vue'
  //     });
  //     routes.push({
  //       name: 'notfound',
  //       path: '*',
  //       component: '~pages/404.vue'
  //     });
  //   }
  // },
  router: {
    base: '/app/'
  },

  generate: {
    dir: '../extension/app'
  },

  /*
  ** Build configuration
  */
  build: {
    vender: [
      'lodash',
      'vue-octicon',
      'fuse.js'
    ],
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      const babelLoaderRule = config.module.rules.find(rule => (
        rule.loader === 'babel-loader'
      ));
      babelLoaderRule.exclude = /node_modules(?![\\/]vue-octicon[\\/])/
      // babelLoaderRule.exclude = /_/
      babelLoaderRule.include = [
        path.resolve('.'),
        path.resolve('node_modules/vue-octicon')
      ];

      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }

      // console.log(config.module.rules);
    }
  }
}
