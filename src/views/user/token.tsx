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
            showJson: "*",
            width:"100px"
        },
        {
            name: "用户ID",
            key: "user_id",
            width:"100px"
        },
        {
            name: "平台",
            key: "platform",
            width:"100px"
        },
        {
            name: "版本",
            key: "version",
            width:"100px"
        },
        {
            name: "设备",
            key: "device",
            width:"200px"
        },
        {
            name: "token",
            key: "token",
            width:"300px"
        },
        {
            name: "访问次数",
            key: "count",
            width:"100px"
        },
        {
            name: "创建时间",
            key: "create_time",
            width:"200px"
        },
        {
            name: "最后访问时间",
            key: "last_time",
            width:"200px"
        },
        {
            name: "超时时间",
            key: "expire_time",
            width:"200px"
        },
        {
            key: "table_tools",
            name: "操作",
            buttons: [
                {
                    type: "dialogForm",
                    form: {
                        primary:"id",
                        title: "token更新",
                        data: [
                            {
                                type: "datetime",
                                key: "expire_time",
                                name: "超时时间"
                            }
                        ],
                        subFun(self, data) {
                            console.log(data.expire_time)
                            data.expire_time = self.methods?.utils?.hmTsTos(data.expire_time)
                            return self.api?.updateToken(data)
                        },
                    }
                },
                {
                    type: "popoverConfirm",
                    confirm: {
                        primary: "id",
                        title: "删除",
                        subFun(self, data) {
                            return self.api?.delToken(data)
                        },
                    }
                }
            ]
        }
    ]
}
export default data