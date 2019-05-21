'use strict'

const u = require('universalify').fromCallback
const fs = require('graceful-fs')
const path = require('path')
const mkdir = require('../mkdirs')
const pathExists = require('../path-exists').pathExists

function appendFile (file, data, encoding, callback) {
  if (typeof encoding === 'function') {
    callback = encoding
    encoding = 'utf8'
  }

  const dir = path.dirname(file)
  pathExists(dir, (err, itDoes) => {
    if (err) return callback(err)
    if (itDoes) return fs.appendFile(file, data, encoding, callback)

    mkdir.mkdirs(dir, err => {
      if (err) return callback(err)

      fs.appendFile(file, data, encoding, callback)
    })
  })
}

function appendFileSync (file, ...args) {
  const dir = path.dirname(file)
  if (fs.existsSync(dir)) {
    return fs.appendFileSync(file, ...args)
  }
  mkdir.mkdirsSync(dir)
  fs.appendFileSync(file, ...args)
}

module.exports = {
  appendFile: u(appendFile),
  appendFileSync
}
