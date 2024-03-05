import type { TableData } from "@/type/TableData"
const data:TableData = {
    fetchFun(self, data) {
        self.showText = "启动任务,自定义函数和自定义弹窗演示"
        return self.api?.test3GetList(data)
    },
    launchTask:[
        async (self)=>{
            alert(self.methods?.test_method())
            if(self.bean){
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
    methods:{
        test_method(){
            return "hello_world"
        }
    },
    fliter:[
        {
            key: "test_select2",
            name: "测试2",
            type: "select",
            getItems(self) {
                if(self.bean){
                    return self.bean.items
                }
                return []
            },
            value: ""
        }
    ],
    tableColumns:[
        { key: "id", name: "id", width: "1000px", }
    ]
}

export default data