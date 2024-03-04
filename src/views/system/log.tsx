import type { TableData } from "@/type/TableData"
import utils from "@/utils"
const data: TableData = {
    fetchFun(self, data) {
        return self.api?.getLogList(data)
    },
    fliter: [
        {
            name: "操作人",
            key: "username",
            type: "input"
        },
        {
            name: "请求方法",
            key: "method",
            type: "select",
            items: [
                {
                    name: "全部方法",
                    key: ""
                },
                {
                    name: "POST",
                    key: "POST"
                },
                {
                    name: "PUT",
                    key: "PUT"
                },
                {
                    name: "DELETE",
                    key: "DELETE"
                },
            ],
            value: ""
        },
        {
            name: "请求路径",
            key: "path",
            type: "input"
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
        { key: "id", name: "ID", align: "center", width: "100px", showJson: "*" },
        { key: "create_time", name: "操作时间", align: "center", width: "300px" },
        { key: "username", name: "操作人", align: "center", width: "100px", },
        { key: "method", name: "请求方法", align: "center", width: "100px", },
        { key: "path", name: "请求路径", align: "center", width: "300px", },
        { key: "request", name: "请求参数", align: "center", width: "400px", },
        { key: "response", name: "返回参数", align: "center", width: "400px", },
    ],
}

export default data