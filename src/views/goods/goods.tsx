import type { TableData } from "@/type/TableData"
import utils from "@/utils"
const data: TableData = {
    fetchFun(self, data) {
        return self.api?.getGoodsList(data)
    },
    fliter: [
        {
            name: '商品ID',
            key: 'id',
            type: "input"
        },
        {
            name: '商品名称',
            key: 'name',
            type: "input"
        },
        {
            name: '商品类型',
            key: 'type',
            type: "input"
        },
        {
            name: '新建',
            type: "dialogForm",
            disableLabel: true,
            form: {
                title: "新建",
                subFun(self, data) {
                    return self.api?.addGoodsList(data)
                },
                data: [
                    {
                        name: '商品名称',
                        key: 'name',
                        type: 'input',
                        must: true
                    },
                    {
                        name: '商品类型',
                        key: 'type',
                        type: 'input',
                        must: true
                    },
                    {
                        name: '商品价格',
                        key: 'price',
                        type: 'input',
                        emptyLabel: '单位：分',
                        must: true,
                        validator(self, data) {
                            const value = data.price
                            if (!self.methods?.utils?.isNumber(value)) {
                                return "不是数字"
                            }
                            return ""
                        },
                    },
                    {
                        name: '商品原价',
                        key: 'origin_price',
                        type: 'input',
                        emptyLabel: '单位：分',
                        must: true,
                        validator(self, data) {
                            const value = data.price
                            if (!self.methods?.utils?.isNumber(value)) {
                                return "不是数字"
                            }
                            return ""
                        },
                    },
                    {
                        name: '签约时间',
                        key: 'sign_value',
                        type: 'input',
                        emptyLabel: '1m、3m、12m等'
                    },
                    {
                        name: '是否选中',
                        key: 'checked',
                        type: 'switch',
                        openValue: "true",
                        closeValue: "false",
                    }
                ]
            }
        }
    ],
    methods: {
        yuanToFen: utils.yuanToFen
    },
    tableColumns: [
        { key: "id", name: "ID", align: "center", width: "100px", sort: "desc", fixed: "left", showJson: "*" },
        {
            key: "name", name: "名称", align: "center", width: "200px", html: true
        },
        {
            key: "type", name: "类型", align: "center", width: "200px",
            editor: {
                type: "input",
                subFun(self, data) {
                    return self.api?.editorGoodsList(data)
                },
            }
        },
        { key: "price", name: "价格", align: "center", width: "200px", endStr: "元" },
        { key: "origin_price", name: "原价", align: "center", width: "200px", endStr: "元" },
        {
            key: "checked", name: "是否选中", align: "center", width: "200px",
            editor: {
                type: "switch",
                openValue: "true",
                closeValue: "false",
                subFun(self, data) {
                    return self.api?.editorGoodsList(data)
                },
            }
        },
        {
            key: "sign_value", name: "签约时间", align: "center", width: "200px",
            editor: {
                type: "input",
                subFun(self, data) {
                    return self.api?.editorGoodsList(data)
                },
            }
        },
        {
            key: "params", name: "配置参数", align: "center", width: "370px",
            editor: {
                type: "json",
                subFun(self, data) {
                    return self.api?.editorGoodsList(data)
                },
            }
        },
        {
            key: "table_tools", name: "操作", buttons: [
                {
                    type: "dialogForm",
                    form: {
                        title: "编辑",
                        type: "warning",
                        primary: "id",
                        subFun(self, data) {
                            return self.api?.editorGoodsList(data)
                        },
                        data: [
                            {
                                name: '商品名称',
                                key: 'name',
                                type: 'input',
                                must: true
                            },
                            {
                                name: '商品类型',
                                key: 'type',
                                type: 'input',
                                must: true
                            },
                            {
                                name: '商品价格',
                                key: 'price',
                                getValue(self, row) {
                                    return self.methods?.yuanToFen(row.price)
                                },
                                type: 'input',
                                emptyLabel: "单位：分",
                                must: true,
                                validator(self, data) {
                                    const value = data.price
                                    if (!self.methods?.utils?.isNumber(value)) {
                                        return "不是数字"
                                    }
                                    return ""
                                },
                            },
                            {
                                name: '商品原价',
                                key: 'origin_price',
                                type: 'input',
                                must: true,
                                emptyLabel: "单位：分",
                                getValue(self, row) {
                                    return self.methods?.yuanToFen(row.origin_price)
                                },
                                validator(self, data) {
                                    const value = data.price
                                    if (!self.methods?.utils?.isNumber(value)) {
                                        return "不是数字"
                                    }
                                    return ""
                                },
                            },
                            {
                                name: '签约时间',
                                key: 'sign_value',
                                type: 'input',
                                emptyLabel: "1m、3m、12m等"
                            },
                            {
                                name: '是否选中',
                                key: 'checked',
                                type: 'switch',
                                openValue: "true",
                                closeValue: "false",
                            },
                        ]
                    }
                },
                {
                    type: "popoverConfirm",
                    confirm: {
                        primary: "id",
                        title: "删除",
                        subFun(self, data) {
                            return self.api?.delGoodsList(data)
                        },
                    }
                }
            ]
        }
    ]
}

export default data