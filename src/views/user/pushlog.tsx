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
        { key: "id", name: "ID", align: "center", width: "250px", fixed: "left", sort: "desc", showJson: "*" },
        { key: "user_id", name: "用户ID", align: "center", width: "250px", },
        { key: "title", name: "标题", align: "center", width: "280px", },
        { key: "message", name: "正文", align: "center", width: "280px", },
        {
            key: "status", name: "状态", align: "center", width: "280px", showTag: {
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
        { key: "create_time", name: "创建时间", align: "center", width: "290px", sort: "" },
        { key: "update_time", name: "更新时间", align: "center", width: "290px", sort: "" },
    ]
}

export default data