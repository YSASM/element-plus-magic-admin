import type { TableData } from "@/type/TableData"
const data: TableData = {
    fetchFun(self, data) {
        return self.api?.getToken(data)
    },
    fliter: [
        {
            name: "用户ID",
            key: "user_id",
            type: "input",
            value: ""
        }
    ],
    tableColumns: [
        {
            name: "ID",
            key: "id",
            showJson: "*"
        },
        {
            name: "用户ID",
            key: "user_id",
            width:"100px"
        },
        {
            name: "平台",
            key: "platform"
        },
        {
            name: "版本",
            key: "version"
        },
        {
            name: "设备",
            key: "device"
        },
        {
            name: "token",
            key: "token"
        },
        {
            name: "访问次数",
            key: "count"
        },
        {
            name: "创建时间",
            key: "create_time"
        },
        {
            name: "最后访问时间",
            key: "last_time"
        },
        {
            name: "超时时间",
            key: "expire_time"
        },
        {
            key: "table_tools",
            name: "操作",
            buttons: [
                {
                    type: "dialogForm",
                    form: {
                        title: "token更新",
                        data: [
                            {
                                type: "datetime",
                                key: "expire_time",
                                name: "超时时间"
                            }
                        ],
                        subFun(self, data) {
                            data.expire_time = self.methods?.utils?.hmTsTos(data.expire_time)
                            return self.api?.apiTest(data)
                        },
                    }
                }
            ]
        }
    ]
}
export default data