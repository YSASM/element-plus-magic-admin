import type { JSX } from "vue/jsx-runtime"
export interface FormData {
    hide?: boolean
    name?: string
    key: string
    unsub?: boolean
    rows?: number
    items?: Array<{
        name: string
        key: string
        [prop: string]: any
    }>,
    getItems?: (((self: TableData) => Array<{
        key: any
        name: string
    }>))
    form?: Form
    emptyLabel?: string
    opt?: any
    getValue?: (((self: TableData, row: {
        [prop: string]: any
    }) => any))
    onChange?: (self: TableData, form: Form, formData: FormData, row_id: any) => void
    openValue?: any
    closeValue?: any
    openStr?: string
    closeStr?: string
    disableLabel?: boolean
    [prop: string]: any
    values?: {
        [prop: string]: any
    }
    type: "input" | "select" | "cascader" | "datetimerange" | "switch" | "datetime" | "json" | "jsonInput" | "none"
    disable?: boolean
    getDisable?: ((self: TableData, data: {
        [prop: string]: any
    }) => boolean)
    must?: boolean
    validator?: ((self: TableData, data: {
        [prop: string]: any
    }) => string)
}

export interface Form {
    primary?: string
    type?: "" | "primary" | "success" | "info" | "danger" | "warning" | "text" | ((self: TableData, row: {
        [prop: string]: any
    }) => any)
    [prop: string]: any
    key?: string
    disable?: boolean
    unflash?: boolean,
    successMsg?: string
    getDisable?: ((self: TableData, row: {
        [prop: string]: any
    }) => boolean)
    title?: string
    data: Array<FormData>,
    show?: any
    subFun: ((self: TableData, data: { [prop: string]: any }) => Promise<any>)
}
export interface Confirm {
    [prop: string]: any
    key?: string
    disable?: boolean
    getDisable?: ((self: TableData, row: {
        [prop: string]: any
    }) => boolean)
    primary: string
    title: string
    confirmContent?: string
    type?: "" | "primary" | "success" | "info" | "danger" | "warning" | ((self: TableData, row: {
        [prop: string]: any
    }) => any)
    confirmButton?: {
        type?: "" | "primary" | "success" | "info" | "danger" | "warning" | ((self: TableData, row: {
            [prop: string]: any
        }) => any)
        text?: string
    }
    cancelButton?: {
        type?: "" | "primary" | "success" | "info" | "danger" | "warning" | ((self: TableData, row: {
            [prop: string]: any
        }) => any)
        text?: string
    }
    subFun: ((self: TableData, data: { [prop: string]: any }) => Promise<any>)
}
export interface Methods {
    getNode?: (item: any) => JSX.Element
    fetchData?: () => void
    getSort?: (sortItem: any) => string
    getPoint?: (str: string) => JSX.Element
    getEditor?: (str: string) => JSX.Element
    message?: {
        success: (msg: string) => void
        warning: (msg: string) => void
        error: (msg: string) => void
    }
    utils?: {
        [prop: string]: any
    }
    [prop: string]: any
}

export interface OnlyFun {
    key?: string
    disable?: boolean
    getDisable?: ((self: TableData, row: {
        [prop: string]: any
    }) => boolean)
    title?: string
    type?: "" | "primary" | "success" | "info" | "danger" | "warning" | "text" | ((self: TableData, row: {
        [prop: string]: any
    }) => any)
    fun: ((self: TableData, row: {
        [prop: string]: any
    }) => void)
}

export interface TableColumn {
    [prop: string]: any
    hide?: boolean
    key: "table_tools" | string
    name: string
    buttons?: Array<{
        type: "dialogForm" | "popoverConfirm" | "dialogTable" | "onlyFun"
        onlyFun?: OnlyFun
        hide?: boolean
        createTable?: ((self: TableData, row: {
            [prop: string]: any
        }) => TableData)
        tableData?: TableData
        createForm?: ((self: TableData, row: {
            [prop: string]: any
        }) => Form)
        form?: Form
        createConfirm?: ((self: TableData, row: {
            [prop: string]: any
        }) => Confirm)
        confirm?: Confirm
    }>
    width?: "auto" | number | string
    html?: boolean
    sort?: string
    fixed?: "auto" | "left" | "right"
    showTag?: {
        [prop: string]: {
            type: "" | "primary" | "success" | "info" | "danger" | "warning" | ((self: TableData, row: {
                [prop: string]: any
            }) => any)
            content: string
        }
    }
    showJson?: string
    showOverflow?: string
    unflash?: boolean
    editor?: {
        type: "json" | "html" | "select" | "switch" | "input" | "dialogForm" | "dialogTable" | "onlyFun" | "popoverConfirm"
        onlyFun?: OnlyFun
        hidePoint?: boolean //只对"dialogTable" | "onlyFun" | "popoverConfirm"生效
        createConfirm?: ((self: TableData, row: {
            [prop: string]: any
        }) => Confirm)
        confirm?: Confirm
        createForm?: ((self: TableData, row: {
            [prop: string]: any
        }) => Form)
        form?: Form
        createTable?: ((self: TableData, row: {
            [prop: string]: any
        }) => TableData)
        tableData?: TableData
        primary?: string
        openValue?: any
        closeValue?: any
        items?: Array<{
            name: string
            key: string
            [prop: string]: any
        }>,
        getItems?: (((self: TableData) => Array<{
            key: any
            name: string
        }>))
        emptyLabel?: string
        editoring?: string | boolean
        beforeShow?: ((data: TableColumn) => void)
        subFun?: ((self: TableData, data: { [prop: string]: any }) => Promise<any>)
    }
    renderBodyCell?: ((data: { row: any, column: any, rowIndex: any, self: TableData }) => any)
    node?: JSX.Element
}

export interface Fliter {
    [prop: string]: any
    hide?: boolean
    name?: string
    key?: string
    startKey?: string
    endKey?: string
    type?: "input" | "select" | "cascader" | "datetimerange" | "switch" | "dialogForm" | "dialogTable" | "onlyFun"
    onlyFun?: OnlyFun
    createTable?: ((self: TableData) => TableData)
    tableData?: TableData
    rows?: number
    items?: Array<{
        name: string
        key: string
        [prop: string]: any
    }>,
    getItems?: (((self: TableData) => Array<{
        key: any
        name: string
    }>))
    createForm?: ((self: TableData) => Form)
    form?: Form
    emptyLabel?: string
    opt?: any
    value?: any
    getValue?: (self: TableData) => any
    values?: {
        [prop: string]: any
    }
    openValue?: any
    closeValue?: any
    openStr?: string
    closeStr?: string
    disableLabel?: boolean
}



export interface TableData {
    [prop: string]: any
    key?: string
    showText?: string
    show?: boolean
    title?: string
    path?: string
    type?: "" | "primary" | "success" | "info" | "danger" | "warning" | "text" | ((self: TableData, row: {
        [prop: string]: any
    }) => any)
    disable?: boolean
    getDisable?: ((self: TableData, row: {
        [prop: string]: any
    }) => boolean)
    launchTask?: Array<(self: TableData) => Promise<any>>
    bean?: {
        [prop: string]: any,
    }
    ready?: boolean
    methods?: Methods
    api?: {
        [prop: string]: any,
        apiTest: (data: any) => any
    }
    // pageFliter?: {
    //     key: string
    //     value: number
    // }
    // sizeFliter?: {
    //     key: string
    //     value: number
    // }
    // sortFliter?: {
    //     tableDefault: {
    //         prop: string
    //         order: string
    //     }
    //     key: string
    //     value: string
    // }
    pageFliter?: any
    sizeFliter?: any
    sortFliter?: any
    total?: any
    sizeOption?: Array<number>
    fliter?: Array<Fliter>
    beforeFetch?: ((self: TableData, fliter: { [prop: string]: any }) => void)
    fetchFun?: ((self: TableData, data: { [prop: string]: any }) => Promise<any>)
    fetchDataitems?: any
    tableColumns?: Array<TableColumn> | null
    addNods?: Array<(self: TableData) => JSX.Element>
    renderRow?: TableData
}