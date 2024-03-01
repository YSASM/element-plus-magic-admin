import { defineStore } from 'pinia'

export const indexStore = defineStore('index', {
    state: () => {
        return {
            title: "测试",
            token: "",
            baseUrl: "",
            username:""
        }
    },
    persist: {
        storage: localStorage,
        serializer: {
            deserialize: JSON.parse,
            serialize: JSON.stringify
        }
    }
})
