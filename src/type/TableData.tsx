import type { JSX } from "vue/jsx-runtime"
export interface FormData {
    hide?: boolean
    name?: string
    key: string
    rows?: number
    items?: Array<{
        name: string
        key: string
        [prop: string]: any
    }>,
    getItems?: (((self: TableData) => Array<{
        key: any
        name: string
    }>)) | Array<string>
    form?: Form
    emptyLabel?: string
    opt?: any
    getValue?: (((self: TableData, row: {
        [prop: string]: any
    }) => any)) | Array<string>
    openValue?: any
    closeValue?: any
    openStr?: string
    closeStr?: string
    disableLabel?: boolean
    [prop: string]: any
    type: "input" | "select" | "cascader" | "datetimerange" | "switch" | "datetime" | "json" | "jsonInput" | "none"
    disable?: boolean
    getDisable?: ((self: TableData, data: {
        [prop: string]: any
    }) => boolean) | Array<string>
    must?: boolean
    validator?: ((self: TableData, data: {
        [prop: string]: any
    }) => string) | Array<string>
}

export interface Form {
    primary?: string
    type?: "" | "primary" | "success" | "info" | "danger" | "warning" | "text" | ((self: TableData, row: {
        [prop: string]: any
    }) => any) | Array<string>
    [prop: string]: any
    key?: string
    disable?: boolean
    unflash?: boolean,
    successMsg?: string
    getDisable?: ((self: TableData, row: {
        [prop: string]: any
    }) => boolean) | Array<string>
    title?: string
    data: Array<FormData>,
    show?: any
    subFun: ((self: TableData, data: { [prop: string]: any }) => Promise<any>) | Array<string>
}
export interface Confirm {
    [prop: string]: any
    disable?: boolean
    getDisable?: ((self: TableData, row: {
        [prop: string]: any
    }) => boolean) | Array<string>
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
    subFun: ((self: TableData, data: { [prop: string]: any }) => Promise<any>) | Array<string>
}
export interface Methods {
    getNode?: (item: any) => JSX.Element
    fetchData?: () => void
    getSort?: (sortItem: any) => string
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
    key?:string
    disable?: boolean
    getDisable?: ((self: TableData, row: {
        [prop: string]: any
    }) => boolean) | Array<string>
    title?: string
    type?: "" | "primary" | "success" | "info" | "danger" | "warning" | "text" | ((self: TableData, row: {
        [prop: string]: any
    }) => any) | Array<string>
    fun:((self: TableData, row: {
        [prop: string]: any
    }) => void) | Array<string>
}

export interface TableColumn {
    [prop: string]: any
    hide?: boolean
    key: "table_tools" | string
    name: string
    buttons?: Array<{
        type: "dialogForm" | "popoverConfirm" | "dialogTable" | "onlyFun"
        onlyFun?:OnlyFun
        hide?: boolean
        createTable?: ((self: TableData, row: {
            [prop: string]: any
        }) => TableData) | Array<string>
        tableData?: TableData
        createForm?: ((self: TableData, row: {
            [prop: string]: any
        }) => Form) | Array<string>
        form?: Form
        createConfirm?: ((self: TableData, row: {
            [prop: string]: any
        }) => Confirm) | Array<string>
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
    editor?: {
        type: "json" | "select" | "switch" | "input" | "dialogForm" | "dialogTable" | "onlyFun"
        onlyFun?:OnlyFun
        createForm?: ((self: TableData, row: {
            [prop: string]: any
        }) => Form) | Array<string>
        form?: Form
        createTable?: ((self: TableData, row: {
            [prop: string]: any
        }) => TableData) | Array<string>
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
        }>)) | Array<string>
        emptyLabel?: string
        editoring?: string | boolean
        beforeShow?: ((data: TableColumn) => void) | Array<string>
        subFun?: ((self: TableData, data: { [prop: string]: any }) => Promise<any>) | Array<string>
    }
    renderBodyCell?: ((data: { row: any, column: any, rowIndex: any, self: TableColumn }) => any) | Array<string | JSX.Element>
    node?: JSX.Element
}

export interface Fliter {
    [prop: string]: any
    hide?: boolean
    name?: string
    key?: string
    startKey?: string
    endKey?: string
    type?: "input" | "select" | "cascader" | "datetimerange" | "switch" | "dialogForm"
    rows?: number
    items?: Array<{
        name: string
        key: string
        [prop: string]: any
    }>,
    getItems?: (((self: TableData) => Array<{
        key: any
        name: string
    }>)) | Array<string>
    createForm?: ((self: TableData) => Form) | Array<string>
    form?: Form
    emptyLabel?: string
    opt?: any
    value?: any
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
    key?:string
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
    }) => boolean) | Array<string>
    launchTask?: (Array<(self: TableData) => Promise<any>>) | Array<Array<string>>
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
    beforeFetch?: ((self: TableData, fliter: { [prop: string]: any }) => void) | Array<string>
    fetchFun?: ((self: TableData, data: { [prop: string]: any }) => Promise<any>) | Array<string>
    fetchDataitems?: any
    tableColumns?: Array<TableColumn> | null
    addNods?: Array<(self: TableData) => JSX.Element>
    renderRow?: TableData
}