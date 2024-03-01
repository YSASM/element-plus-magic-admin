import type { TableData } from "@/type/TableData"
import utils from "@/utils"

const data: TableData = {
    fetchFun(self, data) {
        return self.api?.getPushMessage(data)
    },
    fliter: [
        {
            name: '用户ID',
            key: 'user_id',
            type: "input",
        },
        {
            name: "状态",
            key: "status",
            type: "select",
            items: [
                {
                    name: '所有状态',
                    key: ''
                },
                {
                    name: '已发送',
                    key: '1'
                },
                {
                    name: '已曝光',
                    key: '2'
                },
                {
                    name: '已点击',
                    key: '3'
                }
            ]
        },
        {
            name: '时间',
            startKey: 'start_time',
            endKey: 'end_time',
            type: "datetimerange",
            value: utils.defaultDate()
        },
    ],
    tableColumns: [
        { key: "id", name: "ID", align: "center", width: "100px", fixed: "left", sort: "desc", showJson: "*" },
        { key: "user_id", name: "用户ID", align: "center", width: "180px", },
        { key: "title", name: "标题", align: "center", width: "180px", },
        { key: "message", name: "正文", align: "center", width: "180px", },
        { key: "intent", name: "启动页面", align: "center", width: "180px", },
        { key: "payload", name: "启动参数", align: "center", width: "200px", showJson: "payload" },
        {
            key: "status", name: "状态", align: "center", width: "100px", showTag: {
                "已发送": {
                    type: 'success',
                    content: '已发送'
                },
                "已曝光": {
                    type: 'warning',
                    content: '已曝光'
                },
                "已点击": {
                    type: '',
                    content: '已点击'
                },
            }
        },
        { key: "create_time", name: "创建时间", align: "center", width: "200px", sort: "" },
        { key: "update_time", name: "更新时间", align: "center", width: "200px", sort: "" },
        {
            key: "table_tools", name: "操作",
            buttons: [
                {
                    type: "dialogForm",
                    form: {
                        type: "primary",
                        title: "重发",
                        successMsg: "推送成功",
                        subFun(self, data) {
                            return self.api?.apiTest(data)
                        },
                        data: [
                            {
                                key: "msgid",
                                type: "none",
                                getValue: (self, row) => row.id,
                            },
                            {
                                name: '标题',
                                key: 'title',
                                type: 'input',
                                must: true,
                            },
                            {
                                name: '正文',
                                key: 'message',
                                type: 'input',
                                must: true
                            },
                            {
                                name: '启动页面',
                                key: 'intent',
                                type: 'input',
                                rows: 2,
                                must: true
                            },
                            {
                                name: "启动参数",
                                key: "payload",
                                type: "jsonInput",
                                getValue(self, row) {
                                    return self.methods?.utils?.parseJson(row.payload) || {
                                        "page": "跳转页面",
                                        "params": "跳转参数"
                                    }
                                },
                            }
                        ]
                    }
                },
            ]
        }
    ]
}

export default data