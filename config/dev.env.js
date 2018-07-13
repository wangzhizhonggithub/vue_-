'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT:'"/api"',
  K_URL: "'http://node.chainshome.com'",
  UPLOAD_HOST: "'https://bf-upload.oss-cn-qingdao.aliyuncs.com'",

  PUBLIC_INFO : "'https://bf-public.oss-cn-qingdao.aliyuncs.com'"
})
