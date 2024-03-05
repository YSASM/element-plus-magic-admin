import type { TableData } from "@/type/TableData"
import utils from "@/utils"
const data: TableData = {
    fetchFun(self, data) {
        self.showText = "基础表格演示"
        return self.api?.test1GetList(data)
    },
    fliter: [
        {
            key: "test_input",
            name: "测试",
            emptyLabel: "测试xxx",
            type: "input"
        },
        {
            key: "test_select1",
            name: "测试1",
            type: "select",
            items: [
                {
                    key: "",
                    name: "全部"
                },
                {
                    key: "1",
                    name: "测试1"
                },
                {
                    key: "2",
                    name: "测试2"
                },
            ],
            value: ""
        },
        {
            key: "test_select2",
            name: "测试2",
            type: "select",
            getItems() {
                return [
                    {
                        key: "",
                        name: "全部"
                    },
                    {
                        key: "1",
                        name: "测试1"
                    },
                    {
                        key: "2",
                        name: "测试2"
                    },
                ]
            },
            value: ""
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
        { key: "id", name: "ID", width: "200px", showJson: "*" },
        {
            key: "title", name: "标题", width: "200px", editor: {
                type: "dialogForm",
                form: {
                    type: "text",
                    key: "title",
                    primary: "id",
                    title: "编辑测试",
                    data: [
                        {
                            key: "title",
                            name: "标题",
                            type: "input"
                        }
                    ],
                    subFun(self, data) {
                        return self.api?.apiTest(data)
                    },
                }
            }
        },
        {
            key: "content", name: "正文", width: "200px", editor: {
                type: "input",
                subFun(self, data) {
                    return self.api?.apiTest(data)
                },
            }
        },
        {
            key: "status", name: "状态", width: "200px", editor: {
                type: "switch",
                openValue: "1",
                closeValue: "2",
                subFun(self, data) {
                    return self.api?.apiTest(data)
                },
            }
        },
        {
            key: "config", name: "配置", width: "400px", editor: {
                type: "json",
                subFun(self, data) {
                    return self.api?.apiTest(data)
                },
            }
        },
        { key: "fliter", name: "过滤", width: "400px", showJson: "fliter" },
        {
            key: "table_tools", name: "操作", buttons: [
                {
                    type: "dialogForm",
                    form: {
                        type: "warning",
                        primary: "id",
                        title: "编辑测试",
                        data: [
                            {
                                key: "title",
                                name: "标题",
                                type: "input"
                            },
                            {
                                key: "content",
                                name: "正文",
                                type: "input"
                            },
                            {
                                key: "num",
                                name: "只能输入数字",
                                type: "input",
                                must:true,
                                validator(self,data) {
                                    const value = data.num
                                    if (!self.methods?.utils?.isNumber(value)) {
                                        return "不是数字"
                                    }
                                    return ""
                                },
                                getValue(self, row) {
                                    return row.id
                                },
                            },
                            {
                                key: "status",
                                name: "状态",
                                type: "switch",
                                openValue: "1",
                                closeValue: "2",
                            }
                        ],
                        subFun(self, data) {
                            return self.api?.apiTest(data)
                        },
                    }
                },
                {
                    type:"popoverConfirm",
                    confirm:{
                        primary:"id",
                        title:"删除",
                        confirmContent:"删除测试",
                        subFun(self, data) {
                            return self.api?.apiTest(data)
                        },
                    }
                }
            ]
        }
    ]
}

export default data