'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  SERVER_API: '"https://zylc1.gtdreamlife.com/"',
  SERVER_URL: '"https://zylc1.gtdreamlife.com/manager/3.0/"',
  BASE_API: '"http://10.100.25.126:8180/manager/3.0/"',
  LW_API: '"http://10.100.26.247:8180/manager/3.0/"',
  HWB_API: '"http://10.100.24.205:8180/manager/3.0/"',
  YBY_API: '"http://10.100.27.129:8180/manager/3.0/"',
  Y_API: '"http://10.100.25.136:8180/manager/3.0/"'
})
