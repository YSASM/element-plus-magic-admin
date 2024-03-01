import type { TableData } from "@/type/TableData"
const data: TableData = {
    fetchFun(self, data) {
        return self.api?.getPromptList(data)
    },
    fliter: [
        {
            name: "ID",
            key: "id",
            type: "input"
        },
        {
            name: "提示词名称",
            key: "name",
            type: "input"
        },
        {
            name: "提示词场景",
            key: "scene",
            type: "input"
        },
        {
            name: '新建',
            type: "dialogForm",
            disableLabel: true,
            form: {
                title: "新建",
                subFun(self, data) {
                    return self.api?.addPromptList(data)
                },
                data: [
                    {
                        name: '提示词名称',
                        key: 'name',
                        type: 'input',
                        must: true
                    },
                    {
                        name: '提示词场景',
                        key: 'scene',
                        type: 'input',
                        must: true
                    },
                    {
                        name: '提示词内容',
                        key: 'prompt',
                        type: 'input',
                        rows: 10,
                        must: true
                    },
                ]
            },
        }
    ],
    tableColumns: [
        { key: "id", name: "ID", align: "center", width: "100px", fixed: "left", sort: "desc" },
        {
            key: "name", name: "提示词名称", align: "center", width: "250px", editor: {
                type: "input",
                subFun(self, data) {
                    return self.api?.editorPromptList(data)
                },
            }
        },
        {
            key: "scene", name: "提示词场景", align: "center", width: "200px", editor: {
                type: "input",
                subFun(self, data) {
                    return self.api?.editorPromptList(data)
                },
            }
        },
        {
            key: "prompt", name: "提示词内容", align: "center", width: "600px", editor: {
                type: "dialogForm",
                form: {
                    key: "prompt",
                    primary: "id",
                    title: "提示词内容",
                    type: "text",
                    data: [
                        {
                            name: "提示词内容",
                            type: "input",
                            key: "prompt",
                            rows:20
                        }
                    ],
                    subFun(self, data) {
                        return self.api?.editorPromptList(data)
                    },
                }
            }
        },
        { key: "create_time", name: "创建时间", align: "center", width: "200px", sort: "" },
        { key: "update_time", name: "更新时间    ", align: "center", width: "200px", sort: "" },
        {
            key: "table_tools", name: "操作",
            buttons: [
                {
                    type: "dialogForm",
                    form: {
                        primary: "id",
                        type: "warning",
                        title: "编辑",
                        subFun(self, data) {
                            return self.api?.editorPromptList(data)
                        },
                        data: [
                            {
                                name: '提示词名称',
                                key: 'name',
                                type: 'input',
                                must: true
                            },
                            {
                                name: '提示词场景',
                                key: 'scene',
                                type: 'input',
                                must: true
                            },
                            {
                                name: '提示词内容',
                                key: 'prompt',
                                type: 'input',
                                rows: 10,
                                must: true
                            },
                        ],
                    }
                },
                {
                    type: "dialogForm",
                    form: {
                        type: "info",
                        title: "克隆",
                        subFun(self, data) {
                            return self.api?.addPromptList(data)
                        },
                        data: [
                            {
                                name: '提示词名称',
                                key: 'name',
                                type: 'input',
                                must: true,
                                getValue(self, row) {
                                    return row.name
                                },
                            },
                            {
                                name: '提示词场景',
                                key: 'scene',
                                type: 'input',
                                must: true,
                                getValue(self, row) {
                                    return row.scene
                                },
                            },
                            {
                                name: '提示词内容',
                                key: 'prompt',
                                type: 'input',
                                rows: 10,
                                must: true,
                                getValue(self, row) {
                                    return row.prompt
                                },
                            },
                        ],
                    }
                },
                {
                    type: "popoverConfirm",
                    confirm: {
                        title: "删除",
                        primary: "id",
                        subFun(self, data) {
                            return self.api?.delPromptList(data)
                        },

                    }
                }
            ],
        },
    ],
}

export default data