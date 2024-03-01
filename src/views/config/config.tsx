import type { Form, TableData } from "@/type/TableData"

const data: TableData = {
    fetchFun(self, data) {
        return self.api?.getConfigList(data)
    },
    fliter: [
        {
            name: '配置名称',
            key: 'name',
            type: "input",
            value: ""
        },
        {
            name: '配置内容',
            key: 'params',
            type: "input",
            rows: 1,
            value: ""
        },
        {
            name: '状态',
            key: 'status',
            type: "switch",
            openValue: "1",
            openStr: "查看开启",
            closeValue: "0",
            closeStr: "查看所有",
            value: '',
        },
        {
            name: '新建',
            type: "dialogForm",
            disableLabel: true,
            form: {
                title: "新建",
                data: [
                    {
                        name: '配置名称',
                        key: 'name',
                        type: 'input',
                        must: true,
                    },
                    {
                        name: '配置描述',
                        key: 'desc',
                        type: 'input',
                        rows: 3,
                        must: true
                    }
                ],
                subFun: [
                    "[FUNC]",
                    "[ARGS:self,data]",
                    "vars['res']=vars[names['self']].api?.addConfigList(vars[names['data]])",
                    "[ENDFUNC:res]"
                ]
                // subFun(self, data) {
                //     return self.api?.addConfigList(data)
                // },
            }
        }
    ],
    tableColumns: [
        { key: "id", name: "ID", width: "100px", sort: "", fixed: "left", showJson: "*" },
        { key: "name", name: "名称", width: "200px", },
        {
            key: "params", name: "配置参数", width: "250px", editor: {
                type: "json",
                subFun(self, data) {
                    return self.api?.editorConfigList(data)
                },
            }
        },
        // { field: "desc", key: "desc", title: "描述",  width: 20 },
        { key: "layer", name: "层数", width: "100px" },
        {
            key: "platform", name: "平台", width: "150px", editor: {
                type: "select",
                items: [
                    {
                        name: '全部平台',
                        key: ''
                    },
                    {
                        name: '安卓',
                        key: 'android'
                    },
                    {
                        name: '苹果',
                        key: 'ios'
                    },
                    {
                        name: '电脑端',
                        key: 'pc'
                    },
                    {
                        name: '电脑端网页',
                        key: 'web'
                    },
                    {
                        name: '小程序',
                        key: 'wx-mp'
                    },
                    {
                        name: '移动端网页',
                        key: 'h5'
                    }
                ],
                subFun: (self, data) => {
                    return self.api?.editorConfigList(data)
                },
            }
        },
        {
            key: "channel", name: "渠道", width: "100px", editor: {
                type: "input",
                subFun: (self, data) => {
                    return self.api?.editorConfigList(data)
                },
            }
        },
        {
            key: "version", name: "版本", width: "100px", editor: {
                type: "input",
                subFun: (self, data) => {
                    return self.api?.editorConfigList(data)
                },
            }
        },
        {
            key: "extra", name: "其他", width: "200px", editor: {
                type: "json",
                subFun(self, data) {
                    return self.api?.editorConfigList(data)
                },
            }
        },
        {
            key: "status", name: "状态", width: "100px", editor: {
                type: "switch",
                openValue: "1",
                closeValue: "2",
                subFun: (self, data) => {
                    return self.api?.editorConfigList(data)
                },
            }
        },
        {
            key: "bucket", name: "流量区间", width: "100px",
            renderBodyCell: ({ row }) => {
                row.bucket = row.start_bucket + '~' + row.end_bucket
                return (<span>{row.bucket}</span>)
            },
        },
        {
            key: "bucketBFS", name: "流量百分比", width: "100px",
            renderBodyCell: ({ row }) => {
                row.bucketBFS = row.end_bucket - row.start_bucket + 1 + '%'
                return (<span>{row.bucketBFS}</span>)
            }
        },
        { key: "create_time", name: "创建时间", width: "150px", sort: "desc" },
        { key: "update_time", name: "更新时间", width: "150px", sort: "" },
        {
            key: "table_tools", name: "操作", buttons: [
                {
                    type: "dialogForm",
                    createForm() {
                        const form: Form = {
                            title: "白名单",
                            primary: "id",
                            data: [
                                {
                                    name: "白名单",
                                    type: "input",
                                    key: "white_list",
                                }
                            ],
                            type: (self, row) => {
                                if (!row.white_list || row.white_list == " ") {
                                    return ""
                                }
                                return "success"
                            },
                            subFun(self, data) {
                                return self.api?.editorConfigList(data)
                            },
                        }
                        return form
                    },
                },
                {
                    type: "dialogForm",
                    createForm(self) {
                        const form: Form = {
                            title: "编辑",
                            type: "warning",
                            subFun(self, data) {
                                return self.api?.editorConfigList(data)
                            },
                            data: [
                                {
                                    name: '配置名称',
                                    key: 'name',
                                    type: 'input',
                                    must: true
                                },
                                {
                                    name: '配置描述',
                                    key: 'desc',
                                    type: 'input',
                                    rows: 3,
                                    must: true
                                },
                                {
                                    name: '生效渠道',
                                    key: 'channel',
                                    type: 'input',
                                },
                                {
                                    name: '生效版本',
                                    key: 'version',
                                    type: 'input',
                                },
                                {
                                    name: '配置层数',
                                    key: 'layer',
                                    type: 'input',
                                    must: true,
                                    emptyLabel: "1-10数字",
                                    validator(data) {
                                        const value = data.layer
                                        if (!self.methods?.utils?.isNumber(value)) {
                                            return "不是数字"
                                        }
                                        if (!self.methods?.utils?.inRange(1, 10, Number(value))) {
                                            return "不在1-10范围内"
                                        }
                                        return ""
                                    },
                                },
                                {
                                    name: '开始桶号',
                                    key: 'start_bucket',
                                    type: 'input',
                                    must: true,
                                    emptyLabel: "0-100数字",
                                    validator(data) {
                                        const value = data.start_bucket
                                        if (!self.methods?.utils?.isNumber(value)) {
                                            return "不是数字"
                                        }
                                        if (!self.methods?.utils?.inRange(0, 100, Number(value))) {
                                            return "不在0-100范围内"
                                        }
                                        if (value > data.end_bucket) {
                                            return "开始桶号要小于结束桶号"
                                        }
                                        return ""
                                    },
                                },
                                {
                                    name: '结束桶号',
                                    key: 'end_bucket',
                                    type: 'input',
                                    must: true,
                                    emptyLabel: "0-100数字",
                                    validator(data) {
                                        const value = data.end_bucket
                                        if (!self.methods?.utils?.isNumber(value)) {
                                            return "不是数字"
                                        }
                                        if (!self.methods?.utils?.inRange(0, 100, Number(value))) {
                                            return "不在0-100范围内"
                                        }
                                        if (value < data.start_bucket) {
                                            return "结束桶号要大于开始桶号"
                                        }
                                        return ""
                                    },
                                },
                                {
                                    name: '用户平台',
                                    key: 'platform',
                                    type: "select",
                                    items: [
                                        {
                                            name: '全部平台',
                                            key: ''
                                        },
                                        {
                                            name: '安卓',
                                            key: 'android'
                                        },
                                        {
                                            name: '苹果',
                                            key: 'ios'
                                        },
                                        {
                                            name: '电脑端',
                                            key: 'pc'
                                        },
                                        {
                                            name: '电脑端网页',
                                            key: 'web'
                                        },
                                        {
                                            name: '小程序',
                                            key: 'wx-mp'
                                        },
                                        {
                                            name: '移动端网页',
                                            key: 'h5'
                                        }
                                    ],
                                },
                                {
                                    name: '状态',
                                    key: 'status',
                                    type: 'switch',
                                    openValue: "1",
                                    closeValue: "2",
                                },
                            ],
                        }
                        return form
                    },
                },
                {
                    type: "popoverConfirm",
                    confirm: {
                        primary: "id",
                        title: "删除",
                        subFun(self, data) {
                            return self.api?.delConfigList(data)
                        },
                    }
                }
            ]
        }
    ],

}

export default data