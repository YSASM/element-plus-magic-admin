import type { TableData } from "@/type/TableData"
const data: TableData = {
    async fetchFun(self) {
        self.showText = "只想展示一个固定数据的表格"
        const items = [
            {
                id: "1",
                name: "张三",
                time: Math.floor((new Date().getTime()) / 1000)
            },
            {
                id: "2",
                name: "李四",
                time: Math.floor((new Date().getTime()) / 1000)
            },
            {
                id: "3",
                name: "王五",
                time: Math.floor((new Date().getTime()) / 1000)
            },
            {
                id: "4",
                name: "阿巴",
                time: Math.floor((new Date().getTime()) / 1000)
            },
            {
                id: "5",
                name: "阿巴阿巴",
                time: Math.floor((new Date().getTime()) / 1000)
            }
        ]
        return {
            data: {
                total: items.length,
                items,
            }
        }
    },
    tableColumns: [
        {
            key: "id", name: "id"
        },
        {
            key: "name", name: "名字", editor: {
                type: "onlyFun",
                hidePoint: true,
                onlyFun: {
                    type: "primary",
                    key: "name",
                    fun: (_, row) => {
                        alert(row.name)
                    }
                }
            }
        },
        {
            key: "time", name: "时间", editor: {
                type: "onlyFun",
                hidePoint: true,
                onlyFun: {
                    type: "info",
                    key: "time",
                    fun: (_, row) => {
                        alert(row.time)
                    }
                }
            }
        }
    ]
}

export default data