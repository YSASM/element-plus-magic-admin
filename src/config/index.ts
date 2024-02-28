const config: any = {
    baseUrlList: [
        {
            name: '招标快报',
            url: '/bid',
            appid: "10020"
        },
        {
            name: '桃李教资',
            url: '/jzapi',
            appid: "10027"
        }, {
            name: '快存图',
            url: '/kctapi',
            appid: "10024"
        }, {
            name: 'MBTI',
            url: '/mbtiapi',
            appid: "10029"
        }
        , {
            name: '极光写作',
            url: '/jgapi',
            appid: "10030"
        }
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
