import type { TableData } from "@/type/TableData"
import utils from "@/utils"
const data: TableData = {
    fetchFun: (self, data) => {
        return new Promise((resolve) => {
            self.api?.getBillList(data).then((res: any) => {
                const tf = res.data.total_amount
                for (const i in res.data.items) {
                    if (res.data.items[i].sign_id < 0) {
                        res.data.items[i].sign_type = -1
                    } else if (res.data.items[i].sign_id === 0 || res.data.items[i].sign_id === "0") {
                        res.data.items[i].sign_type = 0
                    } else {
                        res.data.items[i].sign_type = 1
                    }
                }
                if (tf) {
                    self.showText = `总金额：${tf}元`
                }
                resolve(res)
            })
        })
    },
    fliter: [
        {
            name: '用户ID',
            key: 'user_id',
            type: "input"
        },
        {
            name: '订单号',
            key: 'out_trade_no',
            type: "input"
        },
        {
            name: '商品名称',
            key: 'goods_name',
            type: "input"
        },
        {
            name: '商品来源',
            key: 'goods_source',
            type: "input"
        },
        {
            name: '用户版本',
            key: 'version',
            type: "input"
        },
        {
            name: '用户渠道',
            key: 'channel',
            type: "input"
        },
        {
            name: '手机品牌',
            key: 'brand',
            type: "input"
        },
        {
            name: '手机型号',
            key: 'model',
            type: "input"
        },
        {
            name: '支付类型',
            key: 'pay_type',
            type: "select",
            items: [
                {
                    name: '全部类型',
                    key: ''
                },
                {
                    name: '微信',
                    key: 'weixin'
                },
                {
                    name: '支付宝',
                    key: 'alipay'
                }
            ],
            value: ''
        },
        {
            name: '订单状态',
            key: 'status',
            type: "select",
            items: [
                {
                    name: '全部状态',
                    key: ''
                },
                {
                    name: '待支付',
                    key: '1'
                },
                {
                    name: '已支付',
                    key: '2'
                },
                {
                    name: '已退款',
                    key: '3'
                },
                {
                    name: '已取消',
                    key: '4'
                },
                {
                    name: '已超时',
                    key: '5'
                }
            ],
            value: '2'
        },
        {
            name: '用户平台',
            key: 'platform',
            type: "select",
            items: [
                {
                    name: '全部平台',
                    key: ''
                },
                {
                    name: '安卓',
                    key: 'android'
                },
                {
                    name: '苹果',
                    key: 'ios'
                },
                {
                    name: '电脑端',
                    key: 'pc'
                },
                {
                    name: '电脑端网页',
                    key: 'web'
                },
                {
                    name: '小程序',
                    key: 'wx-mp'
                },
                {
                    name: '移动端网页',
                    key: 'h5'
                }
            ],
            value: ''
        },
        {
            name: '推广平台',
            key: 'source',
            type: "select",
            items: [
                {
                    name: '全部来源',
                    key: ''
                },
                {
                    name: '自然流量',
                    key: 'free'
                },
                {
                    name: '百度推广',
                    key: 'baidu'
                },
                {
                    name: '巨量推广',
                    key: 'ocean'
                },
                {
                    name: '腾讯推广',
                    key: 'tencent'
                },
                {
                    name: '快手推广',
                    key: 'kuaishou'
                },
                {
                    name: 'vivo推广',
                    key: 'vivo'
                },
                {
                    name: 'oppo推广',
                    key: 'oppo'
                },
                {
                    name: '华为推广',
                    key: 'huawei'
                },
                {
                    name: '星图推广',
                    key: 'xingtu'
                }
            ],
            value: ''
        },
        {
            name: '时间',
            key:"time",
            startKey: 'start_time',
            endKey: 'end_time',
            type: "datetimerange",
            value: utils.defaultDate()
        },
    ],
    tableColumns: [
        { field: "id", key: "id", name: "ID", align: "center", width: "80px", sort: "", fixed: "left", },
        {
            field: "user_id", key: "user_id", name: "用户ID", align: "center", width: "80px", editor: {
                type: "dialogTable",
                tableData: {
                    type: "text",
                    title: "用户信息",
                    key: "user_id",
                    path: "/user/list",
                    renderRow: {
                        fliter: [
                            {
                                key: "id",
                                value: {
                                    row: "user_id"
                                }
                            },
                            {
                                key: "time",
                                value: ""
                            }
                        ]
                    }
                }
            }
        },
        { field: "create_time", key: "create_time", name: "创建时间", align: "center", width: "180px", sort: "desc" },
        { field: "user_name", key: "user_name", name: "用户名", align: "center", width: "80px", },
        { field: "goods_id", key: "goods_id", name: "商品ID", align: "center", width: "80px" },
        { field: "goods_name", key: "goods_name", name: "商品名", align: "center", width: "80px" },
        { field: "goods_source", key: "goods_source", name: "商品来源", align: "center", width: "80px" },
        { field: "out_trade_no", key: "out_trade_no", name: "订单号", align: "center", width: "250px", },
        { field: "total_fee", key: "total_fee", name: "付款金额", align: "center", width: "80px", endStr: '元' },
        {
            field: "pay_type", key: "pay_type", name: "支付方式", align: "center", width: "100px", showTag: {
                "微信": {
                    type: 'success',
                    content: '微信支付'
                },
                "支付宝": {
                    type: 'primary',
                    content: '支付宝支付'
                }
            }
        },
        {
            field: "sign_type", key: "sign_type", name: "签约", align: "center", width: "100px", showTag: {
                "-1": {
                    type: 'danger',
                    content: '已解约'
                },
                "0": {
                    type: 'info',
                    content: '未签约'
                },
                "1": {
                    type: 'success',
                    content: '已签约'
                }
            }
        },
        { field: "pay_channel", key: "pay_channel", name: "支付渠道", align: "center", width: "80px" },
        { field: "user_source", key: "user_source", name: "推广来源", align: "center", width: "80px" },
        { field: "platform", key: "platform", name: "平台", align: "center", width: "80px" },
        { field: "channel", key: "channel", name: "用户渠道", align: "center", width: "100px" },
        { field: "version", key: "version", name: "用户版本", align: "center", width: "80px" },
        {
            field: "status", key: "status", name: "订单状态", align: "center", width: "80px", showTag: {
                "1": {
                    type: '',
                    content: '待支付'
                },
                "2": {
                    type: 'success',
                    content: '已支付'
                },
                "3": {
                    type: 'danger',
                    content: '已退款'
                },
                "4": {
                    type: 'warning',
                    content: '已取消'
                },
                "5": {
                    type: 'info',
                    content: '已超时'
                },
            }
        },
        { field: "pay_time", key: "pay_time", name: "支付时间", align: "center", width: "180px", sort: "" },
    ]
}

export default data