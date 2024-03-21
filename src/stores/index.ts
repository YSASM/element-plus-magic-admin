import { defineStore } from 'pinia'

export const indexStore = defineStore('index', {
    state: () => {
        return {
            title: "无标题",
            token: "",
            baseUrl: "",
            username:""
        }
    },
    actions:{
        logout(){
            this.token = ""
            this.username = ""
            location.reload()
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
