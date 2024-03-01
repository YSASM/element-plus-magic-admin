import type { TableData } from "@/type/TableData";
import utils from "@/utils";

const data: TableData = {
    fetchFun(self, data) {
        return self.api?.getUserEventList(data)
    },
    fliter: [
        {
            name: '用户ID',
            key: 'user_id',
            type: "input"
        },
        {
            name: '版本',
            key: 'version',
            type: "input"
        },
        {
            name: '渠道',
            key: 'channel',
            type: "input"
        },
        {
            name: '关键字',
            key: 'ekey',
            type: "input"
        },
        {
            name: '内容',
            key: 'value',
            type: "input"
        },
        {
            name: '事件来源',
            key: 'source',
            type: "select",
            items: [
                {
                    name: '全部来源',
                    key: ''
                },
                {
                    name: '客户端',
                    key: 'client'
                },
                {
                    name: '服务端',
                    key: 'server'
                }
            ],
            value: 'client'
        },
        {
            name: '事件来源',
            key: 'type',
            type: "select",
            items: [
                {
                    name: '全部类型',
                    key: ''
                },
                {
                    name: 'click',
                    key: 'click'
                },
                {
                    name: 'event',
                    key: 'event'
                },
                {
                    name: 'error',
                    key: 'error'
                },
                {
                    name: 'api',
                    key: 'api'
                }
            ],
            value: ''
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
            name: 'query_es',
            key: 'query_es',
            type: "switch",
            openValue: "1",
            openStr: "ES",
            closeValue: "null",
            closeStr: "DB",
            value: '1',
        },
        {
            name: '时间',
            startKey: 'start_time',
            endKey: 'end_time',
            type: "datetimerange",
            value: utils.defaultDate()
        }
    ],
    tableColumns: [
        { key: "create_time", name: "创建时间", align: "center", width: "150px", sort: "desc" },
    { key: "id", name: "ID", align: "center", width: "80px", sort: "", fixed: "left", showJson:"*"},
    { key: "user_id", name: "用户ID", align: "center", width: "100px", },
    { key: "channel", name: "渠道", align: "center", width: "100px", },
    { key: "version", name: "版本", align: "center", width: "100px", },
    { key: "platform", name: "平台", align: "center", width: "100px", },
    { key: "day", name: "日期", align: "center", width: "150px", sort: "" },
    { key: "source", name: "来源", align: "center", width: "100px", },
    { key: "type", name: "类型", align: "center", width: "100px", },
    {
        key: "ename", name: "关键词", align: "center", width: "150px",
        editor: {
            type: "dialogForm",
            form: {
                type: "text",
                key:"ename",
                subFun(self, data) {
                    return self.api?.editorUserEventList(data)
                },
                data: [
                    {
                        name: '关键字',
                        key: 'ekey',
                        type: 'input',
                        disable: true
                    },
                    {
                        name: '关键词',
                        must: true,
                        key: 'ename',
                        type: 'input',
                    }
                ],
            }
        }
    },
    { key: "ekey", name: "关键字", align: "center", width: "150px", },
    { key: "value", name: "内容", align: "center", width: "200px", },
    { key: "extra", name: "拓展内容", align: "center", width: "300px", showJson:"extra"}]
}

export default data