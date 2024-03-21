/* eslint-disable no-undef */
const fs = require("fs")
const logger = require("../utils/log.cjs")
const isDev = fs.existsSync("service/dev")
logger.info("DEV:" + isDev)
module.exports = {
    '/api': {
        target: isDev ? 'http://xxx.com' : "http://127.0.0.1:8888",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
    },
}
