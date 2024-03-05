import type { TableData } from "@/type/TableData"
const data: TableData = {
    fetchFun(self, data) {
        self.showText = "启动任务,自定义函数和自定义弹窗等演示"
        return self.api?.test3GetList(data)
    },
    launchTask: [
        async (self) => {
            if (self.bean) {
                self.bean.items = [
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
            }
        }
    ],
    methods: {
        test_method() {
            return "hello_world"
        }
    },
    addNods: [
        (self) => {
            return (<el-dialog
                modelValue={self.bean && self.bean.show}
                title="测试"
                appendToBody={true}
                close-on-click-modal={false}
                onClose={() => {
                    if (self.bean && self.bean.show) {
                        self.bean.show = false
                    }
                }}
                width="1800"
                v-slots={{
                    default: () => {
                        if (self.bean && self.bean.content) {
                            return self.bean.content
                        }
                        return <div>123</div>
                    }
                }}
            ></el-dialog>)
        }
    ],
    fliter: [
        {
            key: "test_select2",
            name: "测试2",
            type: "select",
            getItems(self) {
                if (self.bean) {
                    return self.bean.items
                }
                return []
            },
            value: ""
        }
    ],
    tableColumns: [
        {
            key: "id", name: "id", width: "1000px", editor: {
                type: "onlyFun",
                onlyFun: {
                    type: "text",
                    key: "id",
                    fun: (self) => {
                        alert(self.methods?.test_method())
                    }
                }
            }
        },
        {
            key: "table_tools", name: "操作", buttons: [
                {
                    type: "onlyFun",
                    onlyFun: {
                        title:"alert",
                        type: "warning",
                        fun: (self) => {
                            alert(self.methods?.test_method())
                        }
                    }
                }
            ]
        }
    ]
}

export default data