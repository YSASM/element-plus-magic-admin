import type { TableData } from "@/type/TableData"
const data: TableData = {
    fetchFun(self, data) {
        self.showText = "表格嵌套演示"
        return self.api?.test2GetList(data)
    },
    fliter: [
        {
            type: "input",
            key: "t",
            name: "测试"
        }
    ],
    tableColumns: [
        {
            key: "id", name: "id", editor: {
                type: "dialogTable",
                tableData: {
                    type: "text",
                    title: "用户信息",
                    key: "id",
                    path: "/test/test1",
                    renderRow: {
                        fliter: [
                            {
                                key: "id",
                                getValue(self) {
                                    return self.row.id
                                },
                            },
                            {
                                key: "test_input",
                                value: "测试2传入的"
                            },
                            {
                                key: "test_select1",
                                value: "1"
                            },
                            {
                                key: "test_select2",
                                value: "2"
                            },
                            {
                                key: "time",
                                value: [1709615081000, 1709615090000]
                            },
                        ]
                    }
                }
            }
        },
        {
            key: "id", name: "id", showPre: "id"
        },
        {
            key: "table_tools", name: "操作", buttons: [
                {
                    type: "dialogTable",
                    tableData: {
                        type: "warning",
                        title: "用户信息",
                        key: "id",
                        path: "/test/test1",
                        renderRow: {
                            fliter: [
                                {
                                    key: "id",
                                    name: "ID",
                                    emptyLabel: "id",
                                    type: "input",
                                    getValue(self) {
                                        return self.row.id
                                    },
                                },
                                {
                                    key: "test_input",
                                    value: "测试2传入的"
                                },
                                {
                                    key: "test_select1",
                                    value: "1"
                                },
                                {
                                    key: "test_select2",
                                    value: "2"
                                }
                            ]
                        }
                    }
                }
            ]
        }
    ]
}

export default data