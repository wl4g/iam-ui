var merge = require('webpack-merge')
var baseEnv = require('./base.env')

module.exports = merge(baseEnv, {
  NODE_ENV: '"development"',
  RUNNING_MODE: `"local"`, // cluster | local
})
