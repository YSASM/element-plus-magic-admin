/* eslint-disable no-undef */
const initService = () => {
    const http = require('http')
    const router = require("./core/router/index.cjs")
    // const logger = console
    const logger = require('./core/utils/log.cjs')
    const server = http.createServer()
    const PORT = 9272
    server.on('request', router)
    server.listen(PORT, function () {
        logger.info(`server start at 0.0.0.0:${PORT}`)
    })
}
try {
    initService()
} catch (e) {
    console.error(e)
}