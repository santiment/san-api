const withCSS = require('@zeit/next-css')

module.exports = withCSS({
  publicRuntimeConfig: {
    backendUrl: process.env.BACKEND_URL,
    requiredSanStakeFullAccess: process.env.REQUIRED_SAN_STAKE_FULL_ACCESS
  }
})
