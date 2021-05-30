const path = require('path')
const auth = {
  admin_secret: 'admin-token',
  tokenKey: 'Token-Auth',
  whiteList: ['login', 'client_api'],
  blackList: ['admin_demo_api']
}

const log = {
  logLevel: 'debug',
  dir: path.resolve(__dirname, './logs'),
  projectName: 'blog',
  ip: '0.0.0.0'
}

const port = process.env.NODE_ENV === 'production' ? '80' : '3000'

module.exports = {
  env: process.env.NODE_ENV,
  port,
  auth,
  log,
  mongodb: {
    username: 'admin',
    pwd: 'admin',
    address: '113.31.147.73:27017',
    db: 'blog',
    authSource: 'blog'
  }
}
