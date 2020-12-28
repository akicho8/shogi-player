'use strict'
module.exports = {
  NODE_ENV: '"production"',
  FOO: '"a"',
}

if (process.env.STAGE === 'staging') {
  const merge = require('webpack-merge')

  module.exports = merge(module.exports, {
    FOO: '"b"',
  })
}

console.log("process.env.STAGE", process.env.STAGE)
console.log("module.exports", module.exports)
