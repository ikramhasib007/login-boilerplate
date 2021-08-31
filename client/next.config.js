module.exports = {
  serverRuntimeConfig: {
    secret: 'my-secret'
  },
  publicRuntimeConfig: {
    BASE_PATH: process.env.BASE_URL,
    API_PATH: process.env.API_URL,
    SUBSCRIPTION_PATH: process.env.SUBSCRIPTION_URL,
    EMAIL_FROM: process.env.EMAIL_FROM,
    STATIC_PATH: process.env.STATIC_URL,
    FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
  },
  images: {
    domains: ['tailwindui.com'],
  },
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       has: [
  //         {
  //           type: 'header',
  //           key: 'x-authorized',
  //           value: '(?<authorized>yes|true)'
  //         }
  //       ],
  //       destination: '/dashboard?authorized=:authorized',
  //       permanent: false
  //     }
  //   ]
  // }
  
}