declare module '*.vue' { //declare声明宣告， 声明一个ambient module(即:没有内部实现的 module声明)
    import Vue from 'vue'
    export default Vue
}

declare module 'vue-clipboard3'
declare module 'element-plus/dist/locale/zh-cn.mjs'
declare module 'monaco-editor' {
    export {
        editor
    }
}