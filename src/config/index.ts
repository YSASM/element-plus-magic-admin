const config: any = {
    baseUrlList: [
        // {
        //     name: '应用名',
        //     url: '/test',
        //     appid: "000"
        // },
    ],
    //消息框消失时间
    messageDuration: 3000,
    //最长请求时间
    requestTimeout: 60000,
    //操作正常code，支持String、Array、int多种类型
    successCode: [200, 0],
    //登录失效code
    invalidCode: [1001106, 1001003],
    //无权限code
    noPermissionCode: 401,
}
const getConfig = (key: string) => {
    return config[key]
}
export {
    getConfig
}
