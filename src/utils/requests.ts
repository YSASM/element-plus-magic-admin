import axios from 'axios'
import app from '@/main';
import {getConfig} from "@/config"
import { indexStore } from '@/stores/index'
import { useRouter } from 'vue-router';
import qs from 'qs'
const router = useRouter()
const invalidCode = getConfig("invalidCode")
const noPermissionCode = getConfig("noPermissionCode")
const store = indexStore()
const handleCode = (code:any, msg:any) => {
    if (invalidCode.includes(code)) {
        app.config.globalProperties.$message.error(msg || `后端接口${code}异常`)
        store.$patch({
            token:""
        })
        location.reload()
    } else if (code == noPermissionCode) {
        router.push({ path: '/401' }).catch(() => { })
    } else {
        app.config.globalProperties.$message.error(msg || `后端接口${code}异常`)
    }
}
const requestTimeout = getConfig("requestTimeout")
const instance = axios.create({
    timeout: requestTimeout,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
    },
})

instance.interceptors.request.use(
    (config) => {
        if (store.$state.token) {
            config.headers["x-token"] = store.$state.token
        }
        if (config.data && config.headers['Content-Type'] === 'application/x-www-form-urlencoded;charset=UTF-8')
            config.data = qs.stringify(config.data)
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

instance.interceptors.response.use(
    (response) => {
        const { data, config } = response
        const { code, message } = data
        const msg = message.split(",")[0] + "[" + code + "]"
        // 操作正常Code数组
        const successCode = getConfig("successCode")
        // 是否操作正常
        if (successCode.includes(code)) {
            return data
        } else {
            handleCode(code, msg)
            return Promise.reject(
                `请求异常拦截:${JSON.stringify({
                    url: config.url,
                    code,
                    message: msg,
                })}` || 'Error'
            )
        }
    },
    (error) => {
        const { response, message } = error
        if (error.response && error.response.data) {
            const { status, data } = response
            handleCode(status, data || message)
            return Promise.reject(error)
        } else {
            let { message } = error
            if (message === 'Network Error') {
                message = '后端接口连接异常'
            }
            if (message.includes('timeout')) {
                message = '后端接口请求超时'
            }
            if (message.includes('Request failed with status code')) {
                const code = message.substr(message.length - 3)
                message = `后端接口${code}异常`
            }
            app.config.globalProperties.$message.error(message || `后端接口未知异常`)
            return Promise.reject(error)
        }
    }
)

function Request(info:any) {
    try {
        info.baseURL = store.$state.baseUrl
    } catch (e) {
        app.config.globalProperties.$message.error(`获取baseURL失败:` + e)
    }
    // console.log(info)
    return instance(info)
}

export default Request
