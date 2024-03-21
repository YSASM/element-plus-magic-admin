/* eslint-disable no-undef */

const logger = require("../utils/log.cjs")
const routes = require("./routes.cjs")
const proxys = require("./proxy.cjs")
const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer({});
const fs = require("fs")
const dist = "dist"
var mime
import("mime").then(res=>{
    mime = res.default
})

const mastchProxy = (resurl) => {
    const match = resurl.split("/")[1]
    const proxyInfo = proxys["/" + match]
    if (proxyInfo) {
        return {
            target: proxyInfo.target,
            changeOrigin:proxyInfo.changeOrigin,
            rewrite: proxyInfo.rewrite
        };
    } else {
        return null
    }
}
const matchRouter = (resurl) => {
    const [url, params] = resurl.split("?")
    let route = routes
    let url_sp = url.split("/")
    for (let i in url_sp) {
        let p = url_sp[i]
        if (!p) {
            continue
        }
        if (!route) {
            return
        }
        route = route[p]
        if (!route) {
            return null
        }
    }

    let params_data = {}
    try {
        let params_sp = params.split("&")
        for (let i in params_sp) {
            const [key, value] = params_sp[i].split("=")
            params_data[key] = decodeURIComponent(value)
        }
    } catch (e) {
        // 
    }
    return route(params_data)
}
const matchFile = (res_url) => {
    const path = res_url.split("?")[0]
    let file = null
    try {
        file = fs.readFileSync(dist + path)
    } catch (e) {
        return null
    }
    return file
}

const httpService = (request, response) => {
    let code = 200
    let type = "html"
    let res_info = ""
    try {
        if (request.url === "/") {
            res_info = dist + "/index.html"
            const html = fs.readFileSync(res_info)
            response.writeHead(code, { "Content-type": "text/html;charset=utf-8" });
            response.end(html)
            logger.info(`${request.method} ${code} ${request.url} ${type} ${res_info}`)
            return
        }
        const res = matchRouter(request.url)
        if (res) {
            res_info = JSON.stringify({
                code: 0,
                msg: "操作成功",
                data: res
            })
            type = "json"
            response.writeHead(code, { "Content-Type": "application/json" });
            response.end(res_info)
            logger.info(`${request.method} ${code} ${request.url} ${type} ${res_info}`)
            return
        }
        let proxyInfo = mastchProxy(request.url)
        if (proxyInfo) {
            type = "proxy"
            delete request.headers.host;
            res_info = JSON.stringify(proxyInfo)
            request.url = proxyInfo.rewrite(request.url)
            delete proxyInfo.rewrite
            proxy.web(request, response, proxyInfo)
            logger.info(`${request.method} ${code} ${request.url} ${type} ${res_info}`)
            return
        }
        let file = matchFile(request.url)
        if (file) {
            type = "file"
            const mimetype= mime.getType(request.url)
            response.writeHead(code, { "Content-Type": mimetype });
            response.end(file)
            logger.info(`${request.method} ${code} ${request.url} ${type} ${res_info}`)
            return
        }
        type = "json"
        code = 404
        res_info = JSON.stringify({
            code: -1,
            msg: "空页面"
        })
        response.writeHead(code, { "Content-Type": "application/json" });
        response.end(res_info)
        logger.info(`${request.method} ${code} ${request.url} ${type} ${res_info}`)
    } catch (e) {
        type = "json"
        code = 500
        res_info = JSON.stringify({
            code: -1,
            msg: String(e)
        })
        response.writeHead(code, { "Content-Type": "application/json" });
        response.end(res_info)
        logger.info(`${request.method} ${code} ${request.url} ${type} ${res_info}`)
    }
}
module.exports = httpService